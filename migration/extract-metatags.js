/**
 * Extracts every <MetaTags .../> and <Helmet>...</Helmet> payload from the
 * component tree, so the values can be transcribed into Next.js `metadata`
 * exports without retyping them.
 *
 *   node migration/extract-metatags.js > migration/metadata-inventory.json
 *
 * Retyping 25 titles, descriptions and canonical URLs by hand is exactly the
 * kind of task where a silent typo ships and nobody notices for months -- a
 * wrong canonical URL in particular can quietly deindex a page. So they are
 * lifted mechanically and diffed against the source afterwards.
 */

import { readFileSync } from 'node:fs';
import { execSync } from 'node:child_process';

const files = execSync('git grep -l "MetaTags\\|react-helmet-async" -- "src/**/*.jsx"', {
    encoding: 'utf8',
})
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean)
    .filter((f) => !f.endsWith('MetaTags.jsx'));

/** Pulls `name={...}` or `name="..."` out of a JSX opening tag. */
function attr(tag, name) {
    // Double-quoted or single-quoted literal.
    const literal = tag.match(new RegExp(`${name}\\s*=\\s*("([^"]*)"|'([^']*)')`));
    if (literal) return { kind: 'literal', value: literal[2] ?? literal[3] };

    // Braced expression -- template literal, concatenation, variable.
    const braced = tag.match(new RegExp(`${name}\\s*=\\s*\\{`));
    if (braced) {
        const start = braced.index + braced[0].length - 1;
        let depth = 0;
        for (let i = start; i < tag.length; i += 1) {
            if (tag[i] === '{') depth += 1;
            else if (tag[i] === '}') {
                depth -= 1;
                if (depth === 0) {
                    return { kind: 'expression', value: tag.slice(start + 1, i).trim() };
                }
            }
        }
    }
    return null;
}

const inventory = [];

for (const file of files) {
    const source = readFileSync(file, 'utf8');

    // <MetaTags ... /> including multi-line forms.
    for (const match of source.matchAll(/<MetaTags\b[\s\S]*?\/>/g)) {
        const tag = match[0];
        inventory.push({
            file,
            component: 'MetaTags',
            line: source.slice(0, match.index).split('\n').length,
            title: attr(tag, 'title'),
            description: attr(tag, 'description'),
            canonicalUrl: attr(tag, 'canonicalUrl'),
            raw: tag.replace(/\s+/g, ' ').trim(),
        });
    }

    // <Helmet> blocks, which carry hand-written tags rather than props.
    for (const match of source.matchAll(/<Helmet>[\s\S]*?<\/Helmet>/g)) {
        inventory.push({
            file,
            component: 'Helmet',
            line: source.slice(0, match.index).split('\n').length,
            raw: match[0],
        });
    }
}

console.log(JSON.stringify(inventory, null, 2));
