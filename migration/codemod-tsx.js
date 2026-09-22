/**
 * Renames remaining .jsx/.js source files to .tsx/.ts, in batches.
 *
 *   node migration/codemod-tsx.js --list                 # what is left
 *   node migration/codemod-tsx.js --dir src/components/Card
 *   node migration/codemod-tsx.js --all
 *
 * Rename only. It does not touch markup, logic, styling or props -- the UI must
 * come out byte-identical, so every change after the rename is a type
 * annotation and nothing else.
 *
 * `.tsx` for anything containing JSX, `.ts` otherwise; a `.ts` file with JSX in
 * it will not compile.
 *
 * Uses `git mv` so history follows the file and the diff reads as a rename
 * rather than a delete plus an add.
 */

import { execSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

const args = process.argv.slice(2);
const DRY_RUN = args.includes('--dry');
const ALL = args.includes('--all');
const LIST = args.includes('--list');
const dirIndex = args.indexOf('--dir');
const DIR = dirIndex !== -1 ? args[dirIndex + 1] : null;

/**
 * Unreachable from app/, so converting them would be churn with no benefit and
 * would drag react-router-dom back into the type graph.
 *
 *   AdminPanel / Login / Register -- orphaned components, no route, no importer
 *   main, App, Layout, ScrollToHash -- the Vite entry point and its helpers,
 *     superseded by app/layout.tsx, app/(site)/SiteChrome.tsx and
 *     src/components/routing/ScrollBehaviour.jsx
 *
 * These should be deleted at cleanup rather than converted. Listed explicitly
 * so that decision stays visible instead of looking like an oversight.
 */
const EXCLUDED = [
    'src/components/AdminPanel/',
    'src/components/Login/',
    'src/components/login/',
    'src/components/Register/',
    'src/components/register/',
    'src/main.jsx',
    'src/App.jsx',
    'src/Layout.jsx',
    'src/ScrollToHash.jsx',
];

function remaining() {
    return execSync('git ls-files "src/*.jsx" "src/*.js"', { encoding: 'utf8' })
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean)
        .filter((f) => !EXCLUDED.some((x) => f.startsWith(x) || f === x));
}

/** JSX means .tsx; plain modules become .ts. */
function targetFor(file) {
    const source = readFileSync(file, 'utf8');
    // A return/arrow followed by a tag, or any obvious element literal.
    const hasJsx = /<[A-Za-z][\w.]*[\s/>]/.test(source) || /<>/.test(source);
    const ext = hasJsx ? '.tsx' : '.ts';
    return file.replace(/\.jsx$|\.js$/, ext);
}

const files = remaining();

if (LIST) {
    console.log(`\n${files.length} files left to convert:\n`);
    const byDir = {};
    for (const f of files) {
        const d = f.replace(/\/[^/]*$/, '');
        (byDir[d] ||= []).push(f);
    }
    for (const [dir, list] of Object.entries(byDir).sort()) {
        console.log(`  ${dir}  (${list.length})`);
    }
    console.log('');
    process.exit(0);
}

let batch = files;
if (DIR) batch = files.filter((f) => f.startsWith(DIR));
else if (!ALL) {
    console.error('Specify --dir <path>, --all, or --list.');
    process.exit(2);
}

if (!batch.length) {
    console.log('\nNothing to convert for that selection.\n');
    process.exit(0);
}

console.log(`\n${DRY_RUN ? 'DRY RUN -- ' : ''}Converting ${batch.length} files\n`);
for (const file of batch) {
    const target = targetFor(file);
    console.log(`  ${file}  ->  ${target.replace(/^.*\//, '')}`);
    if (!DRY_RUN) execSync(`git mv "${file}" "${target}"`);
}
console.log(`\n${files.length - batch.length} files still remaining after this batch.\n`);
