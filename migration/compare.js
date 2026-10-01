/**
 * Diffs a candidate deployment against the pre-migration baseline.
 *
 *   node migration/compare.js migration/baseline/prod.json migration/baseline/next-local.json
 *
 * The rule this encodes: URL behaviour must not regress, but head content is
 * expected to improve.
 *
 * Status codes, redirect chains and query-string survival are compared
 * strictly -- those are the URL contract, and a regression there is lost ad
 * spend. Head tags are compared loosely and only ever reported as gains,
 * because the pre-migration site wrote them client-side, so the baseline
 * captured almost nothing. Flagging every newly-populated <title> as a "diff"
 * would bury the real signal.
 *
 * Exits non-zero if anything in the contract regressed, so it can gate a deploy.
 */

import { readFileSync } from 'node:fs';

const [, , baselinePath, candidatePath] = process.argv;

if (!baselinePath || !candidatePath) {
    console.error('Usage: node migration/compare.js <baseline.json> <candidate.json>');
    process.exit(2);
}

const baseline = JSON.parse(readFileSync(baselinePath, 'utf8'));
const candidate = JSON.parse(readFileSync(candidatePath, 'utf8'));

const CRITICAL_GROUPS = new Set(['campaign', 'rewrites']);

/**
 * Changes we intend to make, so the run can still gate a deploy.
 *
 * Without this the script cries wolf on its own documented decisions, and a
 * report that is always red is a report nobody reads. Each entry names the
 * finding that authorised the change.
 */
const EXPECTED_CHANGES = [
    {
        path: '/this-route-does-not-exist',
        matches: (before, after) => before.status === 200 && after.status === 404,
        reason:
            'soft 404 -> real 404. The SPA fallback served index.html with a 200 for every ' +
            'unmatched path and let React Router render NotFound client-side. See FINDINGS.md #3.',
    },
];

function expectedChange(path, before, after) {
    return EXPECTED_CHANGES.find((e) => e.path === path && e.matches(before, after)) ?? null;
}

/** Status codes that mean "the visitor reaches the page", collapsing redirects. */
function reachable(result) {
    if (!result?.ok) return false;
    return result.status >= 200 && result.status < 400;
}

const regressions = [];
const warnings = [];
const gains = [];
const expected = [];

for (const [groupName, baseResults] of Object.entries(baseline.groups)) {
    const candResults = candidate.groups[groupName] ?? [];
    const candByPath = new Map(candResults.map((r) => [r.path, r]));

    for (const before of baseResults) {
        const after = candByPath.get(before.path);
        const critical = CRITICAL_GROUPS.has(groupName);
        const label = `${critical ? '[CRITICAL] ' : ''}${before.path}`;

        if (!after) {
            regressions.push(`${label}: missing from candidate capture entirely`);
            continue;
        }

        if (!after.ok) {
            regressions.push(`${label}: unreachable (${after.error})`);
            continue;
        }

        // --- the contract -------------------------------------------------

        // A page that used to render must still render. Compare reachability
        // rather than the exact code, since 200 -> 308 -> 200 is an intended
        // change (trailing slash, lowercase redirect) and not a regression.
        if (reachable(before) && !reachable(after)) {
            const intended = expectedChange(before.path, before, after);
            if (intended) {
                expected.push(`${before.path}: ${before.status} -> ${after.status} -- ${intended.reason}`);
            } else {
                regressions.push(
                    `${label}: was ${before.status}, now ${after.status} -- page no longer reachable`,
                );
            }
            continue;
        }

        // Where the visitor actually lands.
        if (before.finalPath.toLowerCase() !== after.finalPath.toLowerCase()) {
            const msg = `${label}: lands on a different path (${before.finalPath} -> ${after.finalPath})`;
            (critical ? regressions : warnings).push(msg);
        }

        // UTM/gclid survival. A campaign URL that loads but loses its query
        // string breaks attribution while looking perfectly healthy.
        if (before.queryPreserved && !after.queryPreserved) {
            regressions.push(
                `${label}: query string dropped (was "${before.finalSearch}", now "${after.finalSearch}")`,
            );
        }

        // New redirect hops are fine, but worth seeing.
        if (after.hops > before.hops) {
            warnings.push(
                `${label}: gained a redirect hop (${before.hops} -> ${after.hops}, now ${after.status})`,
            );
        }

        // --- head content, improvements only -------------------------------

        const b = before.head ?? {};
        const a = after.head ?? {};

        for (const field of ['title', 'description', 'canonical', 'ogTitle', 'ogImage']) {
            const had = Boolean(b[field]);
            const has = Boolean(a[field]);
            if (!had && has) gains.push(`${before.path}: ${field} now server-rendered`);
            if (had && !has) {
                warnings.push(`${before.path}: ${field} was present in baseline HTML but is missing now`);
            }
        }

        // Metadata that exists but sits outside <head> is invisible to link
        // unfurlers, which parse <head> and never run JS. A browser hoists it,
        // so this never shows up in a screenshot -- only here.
        if (a.inHead) {
            for (const field of ['title', 'canonical', 'ogTitle']) {
                if (a[field] && a.inHead[field] === false) {
                    warnings.push(
                        `${before.path}: ${field} is present but rendered AFTER </head> -- ` +
                        'browsers hoist it, non-JS link unfurlers will not see it',
                    );
                }
            }
        }

        const bTypes = b.jsonLdTypes?.length ?? 0;
        const aTypes = a.jsonLdTypes?.length ?? 0;
        if (aTypes > bTypes) gains.push(`${before.path}: JSON-LD blocks ${bTypes} -> ${aTypes}`);
        if (aTypes < bTypes) {
            warnings.push(`${before.path}: JSON-LD blocks dropped ${bTypes} -> ${aTypes}`);
        }
    }
}

const rule = '-'.repeat(72);
console.log(`\n${rule}\nBaseline : ${baseline.base}  (${baseline.capturedAt})`);
console.log(`Candidate: ${candidate.base}  (${candidate.capturedAt})\n${rule}\n`);

if (regressions.length) {
    console.log(`REGRESSIONS (${regressions.length})`);
    for (const r of regressions) console.log(`  x ${r}`);
    console.log('');
}

if (warnings.length) {
    console.log(`WARNINGS (${warnings.length}) -- review, may be intended`);
    for (const w of warnings) console.log(`  ! ${w}`);
    console.log('');
}

if (expected.length) {
    console.log(`EXPECTED CHANGES (${expected.length}) -- intended, documented`);
    for (const e of expected) console.log(`  = ${e}`);
    console.log('');
}

if (gains.length) {
    console.log(`IMPROVEMENTS (${gains.length})`);
    const shown = gains.slice(0, 12);
    for (const g of shown) console.log(`  + ${g}`);
    if (gains.length > shown.length) console.log(`  ... and ${gains.length - shown.length} more`);
    console.log('');
}

if (!regressions.length) {
    console.log('No regressions in the URL contract.\n');
}

process.exit(regressions.length ? 1 : 0);
