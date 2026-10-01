/**
 * Rewrites `react-router-dom` imports onto the Next.js routing shims.
 *
 *   node migration/codemod-router.js --dry    # report only
 *   node migration/codemod-router.js          # apply
 *
 * Only touches files whose react-router usage is limited to Link and NavLink --
 * a pure import-path swap, since src/components/routing preserves both prop
 * APIs. Anything importing a hook is listed as needing manual work and left
 * alone, because the Next.js equivalents differ in ways a regex cannot resolve
 * (useSearchParams in particular returns a read-only object rather than a
 * tuple, so a mechanical rewrite would produce code that silently does nothing).
 *
 * Deliberately conservative: it would rather refuse a file than half-convert it.
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { relative, dirname, join } from 'node:path';

const DRY_RUN = process.argv.includes('--dry');

const ROUTING_MODULE = join('src', 'components', 'routing');

/**
 * Orphaned components: present in src/ but unreachable -- no route in the old
 * React Router tree and no importer anywhere in the app. Left exactly as they
 * are, because converting dead code adds diff noise and risks implying it is
 * supported.
 *
 * Login and Register additionally sit on a git case-collision: the index tracks
 * both components/Login/ and components/login/ (likewise Register), while a
 * case-insensitive filesystem only has one directory of each. Writing to them
 * from Windows would update one path and leave the other stale. Untangling that
 * is repo hygiene, not migration work.
 */
const ORPHANED = [
    'src/components/AdminPanel/',
    'src/components/Login/',
    'src/components/login/',
    'src/components/Register/',
    'src/components/register/',
];

/** Hooks with no drop-in equivalent. Their presence disqualifies a file. */
const MANUAL_HOOKS = [
    'useLocation',
    'useNavigate',
    'useParams',
    'useSearchParams',
    'useOutletContext',
    'Outlet',
    'useNavigation',
    'Navigate',
];

function listCandidates() {
    const output = execSync('git grep -l "react-router-dom" -- "src/*.jsx" "src/**/*.jsx"', {
        encoding: 'utf8',
    });
    return output.split('\n').map((s) => s.trim()).filter(Boolean);
}

/** Import specifier for the routing shim, relative to the importing file. */
function shimPath(file) {
    let rel = relative(dirname(file), ROUTING_MODULE).split('\\').join('/');
    if (!rel.startsWith('.')) rel = `./${rel}`;
    return rel;
}

const IMPORT_RE = /import\s*\{([^}]*)\}\s*from\s*['"]react-router-dom['"]\s*;?/g;

function processFile(file) {
    if (ORPHANED.some((prefix) => file.startsWith(prefix))) {
        return { file, status: 'orphaned', reason: 'unreachable component, intentionally untouched' };
    }

    const source = readFileSync(file, 'utf8');
    const matches = [...source.matchAll(IMPORT_RE)];

    if (!matches.length) {
        return { file, status: 'skipped', reason: 'no named import from react-router-dom' };
    }

    const imported = matches
        .flatMap((m) => m[1].split(','))
        .map((s) => s.trim())
        .filter(Boolean);

    const blockers = imported.filter((name) => MANUAL_HOOKS.includes(name.split(/\s+as\s+/)[0]));
    if (blockers.length) {
        return { file, status: 'manual', reason: `uses ${blockers.join(', ')}` };
    }

    const unknown = imported.filter((name) => !['Link', 'NavLink'].includes(name));
    if (unknown.length) {
        return { file, status: 'manual', reason: `unrecognised import: ${unknown.join(', ')}` };
    }

    let updated = source;
    for (const match of matches) {
        const names = match[1].split(',').map((s) => s.trim()).filter(Boolean);
        updated = updated.replace(match[0], `import { ${names.join(', ')} } from '${shimPath(file)}';`);
    }

    if (updated === source) {
        return { file, status: 'skipped', reason: 'no change produced' };
    }

    if (!DRY_RUN) writeFileSync(file, updated);
    return { file, status: 'converted', reason: imported.join(', ') };
}

const results = listCandidates().map(processFile);

const byStatus = (status) => results.filter((r) => r.status === status);

console.log(`\n${DRY_RUN ? 'DRY RUN -- no files written' : 'Applying changes'}\n`);

console.log(`Converted (${byStatus('converted').length}):`);
for (const r of byStatus('converted')) console.log(`  ${r.file}  [${r.reason}]`);

console.log(`\nNeeds manual conversion (${byStatus('manual').length}):`);
for (const r of byStatus('manual')) console.log(`  ${r.file}  -- ${r.reason}`);

const orphaned = byStatus('orphaned');
if (orphaned.length) {
    console.log(`\nOrphaned, left untouched (${orphaned.length}):`);
    for (const r of orphaned) console.log(`  ${r.file}`);
}

const skipped = byStatus('skipped');
if (skipped.length) {
    console.log(`\nSkipped (${skipped.length}):`);
    for (const r of skipped) console.log(`  ${r.file}  -- ${r.reason}`);
}

console.log('');
