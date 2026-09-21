/**
 * Fails if any module reachable from app/ still imports react-router-dom.
 *
 *   node migration/check-router-imports.js
 *
 * Exists because of a bug that got all the way through a clean build and a
 * 42-URL crawl: BlogFilters.jsx kept `useSearchParams` from react-router, which
 * throws without a <Router> ancestor.
 *
 * Nothing caught it. The build succeeded because BlogList returns an early
 * loading state while its Sanity fetch is in flight, so BlogFilters never
 * rendered during prerender. /blogs returned a clean 200 for the same reason.
 * The crash would only have appeared in a real browser, a second after the
 * posts loaded -- on a page no HTTP check can reach.
 *
 * So this walks the import graph statically instead of trusting the runtime.
 * It reports reachability, not mere presence: the orphaned AdminPanel, Login
 * and Register components and the legacy Vite entry files still import
 * react-router-dom, and that is fine -- nothing routes to them. Only code the
 * app can actually reach is a failure.
 */

import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, dirname, resolve, relative } from 'node:path';

const ROOT = process.cwd();
const FORBIDDEN = 'react-router-dom';
const EXTENSIONS = ['.jsx', '.js', '.ts', '.tsx'];

/** Every page/layout/route under app/ is an entry point into the graph. */
function findEntryPoints(dir, found = []) {
    for (const name of readdirSync(dir)) {
        const full = join(dir, name);
        if (statSync(full).isDirectory()) {
            findEntryPoints(full, found);
        } else if (/^(page|layout|route|not-found|error|loading|template)\.(jsx?|tsx?)$/.test(name)) {
            found.push(full);
        }
    }
    return found;
}

/** Resolves a relative import specifier to a file on disk. */
function resolveImport(fromFile, spec) {
    if (!spec.startsWith('.')) return null; // bare specifier -> node_modules

    const base = resolve(dirname(fromFile), spec);

    if (existsSync(base) && statSync(base).isFile()) return base;
    for (const ext of EXTENSIONS) {
        if (existsSync(base + ext)) return base + ext;
    }
    // Directory import -> its index file.
    for (const ext of EXTENSIONS) {
        const idx = join(base, `index${ext}`);
        if (existsSync(idx)) return idx;
    }
    return null;
}

const IMPORT_RE = /(?:^|\n)\s*import\s+(?:[\s\S]*?\s+from\s+)?['"]([^'"]+)['"]/g;
const DYNAMIC_IMPORT_RE = /import\(\s*['"]([^'"]+)['"]\s*\)/g;

const visited = new Set();
const offenders = [];

/** Depth-first walk of the import graph, recording who reached each offender. */
function walk(file, chain) {
    const key = resolve(file);
    if (visited.has(key)) return;
    visited.add(key);

    let source;
    try {
        source = readFileSync(file, 'utf8');
    } catch {
        return;
    }

    const specs = [
        ...[...source.matchAll(IMPORT_RE)].map((m) => m[1]),
        ...[...source.matchAll(DYNAMIC_IMPORT_RE)].map((m) => m[1]),
    ];

    // Only count a real import statement, not a mention in a comment.
    const importsForbidden = specs.includes(FORBIDDEN);
    if (importsForbidden) {
        offenders.push({ file: relative(ROOT, file), chain: chain.map((c) => relative(ROOT, c)) });
    }

    for (const spec of specs) {
        const target = resolveImport(file, spec);
        if (target) walk(target, [...chain, file]);
    }
}

const entries = findEntryPoints(join(ROOT, 'app'));
for (const entry of entries) walk(entry, []);

console.log(`\nWalked ${visited.size} modules reachable from ${entries.length} app/ entry points.\n`);

if (!offenders.length) {
    console.log(`No reachable module imports ${FORBIDDEN}.\n`);
    process.exit(0);
}

console.log(`REACHABLE ${FORBIDDEN} IMPORTS (${offenders.length}) -- these WILL crash at runtime:\n`);
for (const o of offenders) {
    console.log(`  x ${o.file}`);
    // The chain shows which route drags it in, which is the part you need to
    // reproduce it in a browser.
    if (o.chain.length) console.log(`      reached via: ${o.chain.join('  ->  ')}`);
}
console.log('');
process.exit(1);
