/**
 * Records how a deployment actually responds to every URL in the contract.
 *
 * Run it against production first to freeze today's behaviour, then against the
 * Next.js preview, then diff the two with compare.js. The point is to catch
 * routing regressions by measurement rather than by reading diffs and hoping.
 *
 *   node migration/capture-baseline.js --base https://globalprofessionalcertifications.com --out migration/baseline/prod.json
 *   node migration/capture-baseline.js --base http://localhost:3000 --out migration/baseline/next.json
 *
 * Note on what this can and cannot see: the pre-migration site is a client-
 * rendered SPA, so its served HTML carries only the static index.html <head> --
 * the real title/description are written by react-helmet-async after hydration
 * and are invisible to an HTTP fetch. So treat the head fields here as
 * "what a crawler sees without running JS". That number going UP after the
 * migration is the SEO win we are making; it is not a regression.
 *
 * The status codes, redirect chains and query-string handling, by contrast, are
 * exact and are the part that protects ad spend.
 */

import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
import dotenv from 'dotenv';

import {
    CAMPAIGN_ROUTES,
    CONTENT_ROUTES,
    DYNAMIC_ROUTES,
    REWRITE_ROUTES,
    EDGE_CASE_ROUTES,
} from './routes.manifest.js';

dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

// ---------------------------------------------------------------- arguments

function parseArgs(argv) {
    const args = { base: 'http://localhost:3000', out: null, concurrency: 4, timeout: 30000 };
    for (let i = 2; i < argv.length; i += 1) {
        const key = argv[i];
        const value = argv[i + 1];
        if (key === '--base') { args.base = value.replace(/\/$/, ''); i += 1; }
        else if (key === '--out') { args.out = value; i += 1; }
        else if (key === '--concurrency') { args.concurrency = Number(value); i += 1; }
        else if (key === '--timeout') { args.timeout = Number(value); i += 1; }
    }
    if (!args.out) {
        const label = args.base.replace(/^https?:\/\//, '').replace(/[^a-z0-9]/gi, '-');
        args.out = `migration/baseline/${label}.json`;
    }
    return args;
}

// ------------------------------------------------------------ head scraping

/**
 * Pulls the SEO-relevant metadata out of raw HTML.
 *
 * Deliberately regex-based rather than a DOM parse: we are comparing two
 * captures produced by this same function, so consistency matters far more than
 * correctness on adversarial markup, and this keeps the script dependency-free.
 *
 * Scans the WHOLE document, not just up to </head>, and separately records
 * whether each tag was actually inside <head> (`inHead` below).
 *
 * That distinction is not pedantry. Next.js streams a dynamically-rendered
 * route's metadata into the body, after </head> -- on /blogs/[slug] the <title>
 * lands around byte 55,000 while </head> closes at byte 5,000. React 19 and
 * browsers hoist those tags, and Google executes JS so it sees them, but
 * link unfurlers (Slack, WhatsApp, LinkedIn, Facebook) parse <head> only and
 * never run scripts. Metadata below the fold is invisible to exactly the
 * consumers that Open Graph tags exist for.
 *
 * Truncating at </head> hid this completely: the tags were reported as absent
 * when they were present-but-misplaced, which is a different bug with a
 * different fix.
 */
function extractHead(html) {
    if (!html) return null;

    const headEnd = html.indexOf('</head>');

    /** True if `value` appears within <head> rather than later in the body. */
    const isInHead = (needle) => {
        if (!needle) return false;
        const at = html.indexOf(needle);
        return at >= 0 && headEnd > 0 && at < headEnd;
    };

    const meta = (attr, name) => {
        const re = new RegExp(`<meta[^>]+${attr}=["']${name}["'][^>]*content=["']([^"']*)["']`, 'i');
        const reReversed = new RegExp(`<meta[^>]+content=["']([^"']*)["'][^>]*${attr}=["']${name}["']`, 'i');
        const match = html.match(re) || html.match(reReversed);
        return match?.[1] ?? null;
    };

    const jsonLd = [...html.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)]
        .map((m) => {
            try {
                return JSON.parse(m[1].trim());
            } catch {
                return { __unparseable: m[1].trim().slice(0, 200) };
            }
        })
        // @type is the part we actually care about keeping stable across the
        // migration; full payloads would make every diff unreadable.
        .map((obj) => (Array.isArray(obj) ? obj.map((o) => o?.['@type']) : obj?.['@type']))
        .filter(Boolean)
        .sort();

    const title = (html.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [])[1]?.trim() ?? null;
    const canonical = (html.match(/<link[^>]+rel=["']canonical["'][^>]*href=["']([^"']*)["']/i) || [])[1] ?? null;

    return {
        title,
        description: meta('name', 'description'),
        robots: meta('name', 'robots'),
        canonical,
        // Where the tags physically sit. Anything false here is invisible to
        // non-JS link unfurlers even though a browser would hoist it.
        inHead: {
            title: isInHead(title ? `<title>${title}</title>` : null) || isInHead('<title>'),
            canonical: isInHead(canonical ? `href="${canonical}"` : null),
            ogTitle: isInHead('og:title'),
        },
        ogTitle: meta('property', 'og:title'),
        ogDescription: meta('property', 'og:description'),
        ogUrl: meta('property', 'og:url'),
        ogImage: meta('property', 'og:image'),
        twitterCard: meta('name', 'twitter:card'),
        jsonLdTypes: jsonLd,
    };
}

// ------------------------------------------------------------------ probing

/**
 * Walks the redirect chain by hand instead of letting fetch follow it, so we
 * record every hop. A campaign URL that still returns 200 but now arrives via
 * an extra hop that drops the query string is exactly the kind of silent
 * failure this whole script exists to catch.
 */
async function probe(base, path, { timeout }) {
    const startedAt = Date.now();
    const url = `${base}${path}`;
    const chain = [];
    let current = url;
    let response = null;

    try {
        for (let hop = 0; hop < 10; hop += 1) {
            const controller = new AbortController();
            const timer = setTimeout(() => controller.abort(), timeout);

            try {
                response = await fetch(current, {
                    redirect: 'manual',
                    signal: controller.signal,
                    headers: { 'User-Agent': 'gpc-migration-baseline/1.0' },
                });
            } finally {
                clearTimeout(timer);
            }

            const location = response.headers.get('location');
            chain.push({ url: current, status: response.status, location: location ?? null });

            if (!location || response.status < 300 || response.status >= 400) break;
            current = new URL(location, current).toString();
        }

        const finalUrl = new URL(current);
        const contentType = response.headers.get('content-type') ?? null;
        const isHtml = contentType?.includes('text/html') ?? false;
        const body = isHtml ? await response.text() : null;

        return {
            path,
            ok: true,
            status: response.status,
            finalPath: finalUrl.pathname,
            finalSearch: finalUrl.search || '',
            // Redirects that silently drop UTM/gclid are the specific failure we
            // are guarding against, so this gets its own flag.
            queryPreserved: (new URL(url).search || '') === (finalUrl.search || ''),
            redirected: chain.length > 1,
            hops: chain.length - 1,
            chain,
            contentType,
            bytes: body?.length ?? null,
            head: isHtml ? extractHead(body) : null,
            ms: Date.now() - startedAt,
        };
    } catch (error) {
        return {
            path,
            ok: false,
            error: error.name === 'AbortError' ? `timeout after ${timeout}ms` : error.message,
            chain,
            ms: Date.now() - startedAt,
        };
    }
}

/** Bounded-concurrency map, so we probe quickly without hammering the origin. */
async function mapLimit(items, limit, fn) {
    const results = new Array(items.length);
    let cursor = 0;

    const workers = Array.from({ length: Math.min(limit, items.length) }, async () => {
        while (cursor < items.length) {
            const index = cursor;
            cursor += 1;
            results[index] = await fn(items[index], index);
        }
    });

    await Promise.all(workers);
    return results;
}

// ------------------------------------------------- dynamic route sampling

/**
 * Resolves dynamic patterns like /blogs/:slug into concrete URLs using real
 * content from Sanity. Falls back to skipping the pattern rather than guessing
 * a slug, since a guessed slug would produce a meaningless 404 in both captures
 * and quietly give us false confidence.
 */
async function resolveDynamicRoutes() {
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.VITE_SANITY_PROJECT_ID;
    const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.VITE_SANITY_DATASET || 'production';
    const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || process.env.VITE_SANITY_API_VERSION || '2024-12-05';

    if (!projectId) {
        console.warn('  ! No Sanity project id in env -- skipping dynamic routes.');
        return [];
    }

    const resolved = [];
    for (const route of DYNAMIC_ROUTES) {
        try {
            const endpoint = `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}?query=${encodeURIComponent(route.sampleFrom)}`;
            const res = await fetch(endpoint);
            const { result } = await res.json();
            const samples = (Array.isArray(result) ? result : [result]).filter(Boolean);

            if (!samples.length) {
                console.warn(`  ! No live content for ${route.pattern} -- skipping.`);
                continue;
            }
            for (const sample of samples) {
                resolved.push({ path: route.toPath(sample), pattern: route.pattern, component: route.component });
            }
        } catch (error) {
            console.warn(`  ! Could not sample ${route.pattern}: ${error.message}`);
        }
    }
    return resolved;
}

// --------------------------------------------------------------------- main

async function main() {
    const args = parseArgs(process.argv);

    console.log(`\nCapturing baseline from ${args.base}\n`);

    console.log('Resolving dynamic routes from Sanity...');
    const dynamicRoutes = await resolveDynamicRoutes();
    if (dynamicRoutes.length) {
        console.log(`  Resolved ${dynamicRoutes.length}: ${dynamicRoutes.map((r) => r.path).join(', ')}`);
    }

    const groups = [
        { name: 'campaign', label: 'Ad-campaign routes (CRITICAL)', routes: CAMPAIGN_ROUTES },
        { name: 'content', label: 'Content routes', routes: CONTENT_ROUTES },
        { name: 'dynamic', label: 'Dynamic routes', routes: dynamicRoutes },
        { name: 'rewrites', label: 'Vercel rewrites (brochure PDFs)', routes: REWRITE_ROUTES },
        { name: 'edgeCases', label: 'URL edge cases', routes: EDGE_CASE_ROUTES },
    ];

    const capture = {
        base: args.base,
        capturedAt: new Date().toISOString(),
        groups: {},
    };

    for (const group of groups) {
        if (!group.routes.length) continue;
        console.log(`\n${group.label}`);

        const results = await mapLimit(group.routes, args.concurrency, (route) =>
            probe(args.base, route.path, { timeout: args.timeout }),
        );

        for (const result of results) {
            if (!result.ok) {
                console.log(`  FAIL ${result.path}  -> ${result.error}`);
                continue;
            }
            const redirect = result.redirected ? ` -> ${result.finalPath}${result.finalSearch}` : '';
            const queryWarning = !result.queryPreserved ? '  [QUERY DROPPED]' : '';
            console.log(`  ${String(result.status).padEnd(3)} ${result.path}${redirect}${queryWarning}`);
        }

        // Attach the manifest metadata so compare.js can report on a failure in
        // terms of which component and which campaign it belongs to.
        capture.groups[group.name] = results.map((result, i) => ({ ...result, meta: group.routes[i] }));
    }

    mkdirSync(dirname(args.out), { recursive: true });
    writeFileSync(args.out, JSON.stringify(capture, null, 2));

    const all = Object.values(capture.groups).flat();
    const failed = all.filter((r) => !r.ok);
    const droppedQuery = all.filter((r) => r.ok && !r.queryPreserved);

    console.log(`\n---\nProbed ${all.length} URLs. ${failed.length} unreachable, ${droppedQuery.length} dropped their query string.`);
    console.log(`Written to ${args.out}\n`);
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
