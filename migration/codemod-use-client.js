/**
 * Adds 'use client' to the route-level components that need it.
 *
 *   node migration/codemod-use-client.js --dry
 *   node migration/codemod-use-client.js
 *
 * Only the top of each client tree is marked. 'use client' declares a boundary,
 * not a per-file setting: everything a client component imports becomes part of
 * the client bundle automatically. So marking Cia.jsx is enough to cover the
 * whole subtree it pulls in, and sprinkling the directive over all ~100
 * component files would be noise that implies a constraint that is not real.
 *
 * Components with no interactivity are deliberately left as server components
 * so they ship zero JavaScript.
 *
 * Note that 'use client' does NOT disable server rendering. These components are
 * still pre-rendered to HTML on the server and then hydrated, so page content
 * remains in the initial response for crawlers -- which is why the client-first
 * port still delivers the SEO win.
 */

import { readFileSync, writeFileSync } from 'node:fs';

/** Route-level components, mirroring the ROUTES table in generate-routes.js. */
const ROUTE_COMPONENTS = [
    'src/components/Home/Home.jsx',
    'src/components/About/AboutUs.jsx',
    'src/components/Terms/Terms.jsx',
    'src/components/Privacy/PrivacyPolicy.jsx',
    'src/components/Contact/ContactUs.jsx',
    'src/components/Refund/RefundPolicy.jsx',
    'src/components/FaqPage/FaqPage.jsx',
    'src/components/Glossary/Glossary.jsx',
    'src/components/SuccessStories/SuccessStories.jsx',
    'src/components/SuccessStories/VideoGalleryPage.jsx',
    'src/components/SuccessStories/WrittenGalleryPage.jsx',
    'src/components/Journey/Journey.jsx',
    'src/components/CoursesOverview/CoursesOverview.jsx',
    'src/components/Courses/Cia.jsx',
    'src/components/Courses/CiaCampaign.jsx',
    'src/components/Courses/Crma.jsx',
    'src/components/Courses/Cisa.jsx',
    'src/components/Courses/Iap.jsx',
    'src/components/Events/Events.jsx',
    'src/components/Corporate/Qaip.jsx',
    'src/components/Corporate/GtmTrainings.jsx',
    'src/components/Blogs/BlogList.jsx',
    'src/components/Blogs/BlogPage.jsx',
    'src/components/Upcoming/Upcoming.jsx',
    'src/components/LandingPages/CisaEnrolmentLandingPage.jsx',
    'src/components/LandingPages/CiaEnrolmentLandingPage.jsx',
    'src/components/NotFound/NotFound.jsx',
];

/**
 * Anything here means the component cannot render on the server.
 * Deliberately broad: a false positive costs a few KB of JS, while a false
 * negative is a build error or a component that silently loses its behaviour.
 */
const CLIENT_SIGNALS = [
    /\buseState\s*\(/,
    /\buseEffect\s*\(/,
    /\buseLayoutEffect\s*\(/,
    /\buseRef\s*\(/,
    /\buseMemo\s*\(/,
    /\buseCallback\s*\(/,
    /\buseContext\s*\(/,
    /\buseReducer\s*\(/,
    /\buse[A-Z]\w*\s*\(/, // custom hooks: useLayout, useFetch, useCurrency...
    /\son[A-Z]\w*\s*=\s*\{/, // onClick, onChange, onSubmit...
    /\bwindow\./,
    /\bdocument\./,
    /\blocalStorage\b/,
    /\bsessionStorage\b/,
    /\bnavigator\./,
    /from ['"]motion\/react['"]/,
    /from ['"]react-slick['"]/,
    /from ['"]canvas-confetti['"]/,
    /from ['"]intl-tel-input/,
    /from ['"]react-countdown['"]/,
];

const DRY_RUN = process.argv.includes('--dry');
const results = [];

for (const file of ROUTE_COMPONENTS) {
    const source = readFileSync(file, 'utf8');

    if (/^\s*['"]use client['"]/.test(source)) {
        results.push({ file, status: 'already' });
        continue;
    }

    const matched = CLIENT_SIGNALS.filter((re) => re.test(source));
    if (!matched.length) {
        results.push({ file, status: 'server', detail: 'no client-only signals found' });
        continue;
    }

    if (!DRY_RUN) writeFileSync(file, `'use client';\n\n${source}`);
    results.push({ file, status: 'marked', detail: `${matched.length} signal(s)` });
}

console.log(`\n${DRY_RUN ? 'DRY RUN -- no files written' : 'Applying changes'}\n`);
for (const r of results.filter((x) => x.status === 'marked')) console.log(`  + 'use client'  ${r.file}  [${r.detail}]`);
for (const r of results.filter((x) => x.status === 'already')) console.log(`  already        ${r.file}`);
for (const r of results.filter((x) => x.status === 'server')) console.log(`  SERVER         ${r.file}  -- ${r.detail}`);
console.log('');
