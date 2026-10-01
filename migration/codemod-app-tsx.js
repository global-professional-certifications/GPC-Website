/**
 * Converts the app/ route tree from .jsx to .tsx and types its metadata.
 *
 *   node migration/codemod-app-tsx.js --dry
 *   node migration/codemod-app-tsx.js
 *
 * These files are the highest-value conversion in the codebase relative to
 * their size: 35 thin files where Next's own types do nearly all the work.
 *
 * The payoff is `metadata: Metadata`. The Metadata type rejects unknown keys,
 * so a typo in `alternates`/`canonical`/`openGraph` becomes a compile error
 * instead of a tag that silently never renders. 29 of these objects were
 * hand-written during the migration; nothing was checking them.
 *
 * Renames are done with `git mv` so history follows the file.
 */

import { execSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';

const DRY_RUN = process.argv.includes('--dry');

const files = execSync('git ls-files "app/*.jsx"', { encoding: 'utf8' })
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean);

const results = [];

for (const file of files) {
    let source = readFileSync(file, 'utf8');
    const target = file.replace(/\.jsx$/, '.tsx');
    const notes = [];

    const hasMetadata = /export const metadata = \{/.test(source);
    const hasGenerateMetadata = /export async function generateMetadata\(/.test(source);
    const hasViewport = /export const viewport = \{/.test(source);
    const hasChildrenProp = /\{ children \}/.test(source);

    // --- type the metadata exports ---
    if (hasMetadata) {
        source = source.replace(
            'export const metadata = {',
            'export const metadata: Metadata = {',
        );
        notes.push('metadata: Metadata');
    }

    if (hasViewport) {
        source = source.replace(
            'export const viewport = {',
            'export const viewport: Viewport = {',
        );
        notes.push('viewport: Viewport');
    }

    // --- type the dynamic-route helpers ---
    // params is a Promise in Next 15, and both helpers receive it.
    if (hasGenerateMetadata) {
        source = source.replace(
            'export async function generateMetadata({ params }) {',
            'export async function generateMetadata({ params }: RouteProps): Promise<Metadata> {',
        );
        notes.push('generateMetadata typed');
    }

    source = source.replace(
        'export default async function Page({ params }) {',
        'export default async function Page({ params }: RouteProps) {',
    );

    // --- layouts take children ---
    if (hasChildrenProp) {
        source = source.replace(
            /export default function (\w+)\(\{ children \}\) \{/,
            'export default function $1({ children }: { children: React.ReactNode }) {',
        );
        notes.push('children typed');
    }

    // --- add the type imports the above needs ---
    const typeImports = [];
    if (hasMetadata || hasGenerateMetadata) typeImports.push('Metadata');
    if (hasViewport) typeImports.push('Viewport');

    if (typeImports.length) {
        source = `import type { ${typeImports.join(', ')} } from 'next';\n${source}`;
    }

    // Local params type for dynamic routes. Declared per-file rather than
    // shared, because each route's param names differ and a shared alias would
    // be less accurate than the thing it replaces.
    if (/RouteProps/.test(source)) {
        const paramNames = [...file.matchAll(/\[(\.{3})?(\w+)\]/g)].map((m) => m[2]);
        const paramType = paramNames.length
            ? `{ ${paramNames.map((p) => `${p}: string`).join('; ')} }`
            : 'Record<string, string>';
        const decl = `\n/** Next 15 passes route params as a Promise. */\ntype RouteProps = { params: Promise<${paramType}> };\n`;

        // Insert after the import block so the type sits above its first use.
        const lastImport = source.lastIndexOf("\nimport ");
        const insertAt = lastImport === -1 ? 0 : source.indexOf('\n', source.indexOf(';', lastImport)) + 1;
        source = source.slice(0, insertAt) + decl + source.slice(insertAt);
        notes.push(`RouteProps ${paramType}`);
    }

    results.push({ file, target, notes });

    if (!DRY_RUN) {
        writeFileSync(file, source);
        execSync(`git mv "${file}" "${target}"`);
    }
}

console.log(`\n${DRY_RUN ? 'DRY RUN -- nothing written' : 'Converted'} ${results.length} files\n`);
for (const r of results) {
    console.log(`  ${r.target}`);
    if (r.notes.length) console.log(`      ${r.notes.join(', ')}`);
}
console.log('');
