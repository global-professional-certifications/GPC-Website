/**
 * Strips <MetaTags> from components now that Next.js `metadata` exports own the
 * document head.
 *
 *   node migration/codemod-metatags.js --dry
 *   node migration/codemod-metatags.js
 *
 * This is not optional cleanup. MetaTags renders through react-helmet-async,
 * which is being removed along with its provider -- any surviving call site
 * would throw at runtime. Every value being removed here was already
 * transcribed into a page's `metadata` export by generate-routes.js, from the
 * same extraction, so nothing is lost.
 *
 * Removes both the JSX element and the now-unused import, and leaves an empty
 * expression container behind only if one was already there.
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { execSync } from 'node:child_process';

const DRY_RUN = process.argv.includes('--dry');

const files = execSync('git grep -l "MetaTags" -- "src/**/*.jsx"', { encoding: 'utf8' })
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean)
    .filter((f) => !f.endsWith('src/components/MetaTags.jsx'));

const results = [];

for (const file of files) {
    const original = readFileSync(file, 'utf8');
    let updated = original;
    let removedElements = 0;

    // Self-closing <MetaTags ... /> across any number of lines, including any
    // leading indentation and the trailing newline, so no blank gap is left.
    updated = updated.replace(/^[ \t]*<MetaTags\b[\s\S]*?\/>[ \t]*\r?\n/gm, () => {
        removedElements += 1;
        return '';
    });

    // Import of the component itself.
    const importRe = /^[ \t]*import\s+MetaTags\s+from\s+['"][^'"]*MetaTags(?:\.jsx)?['"];?[ \t]*\r?\n/gm;
    const removedImports = (updated.match(importRe) || []).length;
    updated = updated.replace(importRe, '');

    if (updated === original) {
        results.push({ file, status: 'unchanged' });
        continue;
    }

    // Refuse to half-convert. A leftover reference means the regex missed a
    // form (a spread, a conditional render) and the file needs human eyes --
    // writing it out anyway would leave a component that throws on render.
    //
    // Commented-out code does not count. Terms, Privacy and RefundPolicy each
    // carry a fully commented-out earlier version of themselves at the top of
    // the file, MetaTags element and all. That is inert text, and treating it
    // as a live reference would block three files that converted cleanly.
    const live = updated
        .replace(/\/\*[\s\S]*?\*\//g, '') // block comments
        .replace(/^[ \t]*\/\/.*$/gm, ''); // line comments

    if (/<MetaTags\b/.test(live)) {
        results.push({ file, status: 'MANUAL', detail: 'a live <MetaTags> element survived the pass' });
        continue;
    }
    if (/\bMetaTags\b/.test(live)) {
        results.push({ file, status: 'MANUAL', detail: 'MetaTags still referenced in live code' });
        continue;
    }

    if (!DRY_RUN) writeFileSync(file, updated);
    results.push({ file, status: 'cleaned', detail: `${removedElements} element(s), ${removedImports} import(s)` });
}

console.log(`\n${DRY_RUN ? 'DRY RUN -- no files written' : 'Applying changes'}\n`);
for (const r of results.filter((x) => x.status === 'cleaned')) {
    console.log(`  cleaned  ${r.file}  [${r.detail}]`);
}
for (const r of results.filter((x) => x.status === 'MANUAL')) {
    console.log(`  MANUAL   ${r.file}  -- ${r.detail}`);
}
for (const r of results.filter((x) => x.status === 'unchanged')) {
    console.log(`  no-op    ${r.file}`);
}
console.log('');
