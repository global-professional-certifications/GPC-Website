/**
 * Generates the app/ route tree from the URL contract.
 *
 *   node migration/generate-routes.js --dry
 *   node migration/generate-routes.js
 *
 * Every page is a thin server component that exports `metadata` and renders the
 * existing component untouched. That is the whole shape of this migration: the
 * <head> moves to the server (where crawlers can finally see it) while page
 * bodies keep rendering exactly the code that ships today.
 *
 * Titles, descriptions and canonical URLs are read from metadata-inventory.json
 * -- lifted mechanically out of the old <MetaTags> props -- rather than retyped.
 * A mistyped description is cosmetic; a mistyped canonical can deindex a page,
 * and neither would fail a build or show up in a screenshot.
 *
 * Route paths come from routes.manifest.js, so a route cannot be silently
 * dropped here without the manifest and the verification script disagreeing.
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';

const DRY_RUN = process.argv.includes('--dry');
const inventory = JSON.parse(readFileSync('migration/metadata-inventory.json', 'utf8'));

/**
 * route            - URL path. MUST match routes.manifest.js.
 * group            - (site) renders inside the chrome, (bare) without it.
 * component        - source component, relative to src/components/.
 * source           - file whose <MetaTags> supplies this page's metadata.
 * canonical        - overrides the extracted value. Only used where the
 *                    extracted one was wrong or absent; each is justified.
 */
const ROUTES = [
    { route: '/', group: '(site)', component: 'Home/Home', source: 'src/components/Home/Home.jsx' },
    { route: '/about', group: '(site)', component: 'About/AboutUs', source: 'src/components/About/AboutUs.jsx' },
    { route: '/terms', group: '(site)', component: 'Terms/Terms', source: 'src/components/Terms/Terms.jsx' },
    { route: '/privacy', group: '(site)', component: 'Privacy/PrivacyPolicy', source: 'src/components/Privacy/PrivacyPolicy.jsx' },
    { route: '/contact', group: '(site)', component: 'Contact/ContactUs', source: 'src/components/Contact/ContactUs.jsx' },
    { route: '/refund', group: '(site)', component: 'Refund/RefundPolicy', source: 'src/components/Refund/RefundPolicy.jsx' },
    { route: '/faq', group: '(site)', component: 'FaqPage/FaqPage', source: 'src/components/FaqPage/FaqPage.jsx' },
    { route: '/glossary', group: '(site)', component: 'Glossary/Glossary', source: 'src/components/Glossary/Glossary.jsx' },
    { route: '/success', group: '(site)', component: 'SuccessStories/SuccessStories', source: 'src/components/SuccessStories/SuccessStories.jsx' },

    // No canonical existed on either gallery page. Added as self-referencing,
    // per the decision recorded in migration/FINDINGS.md.
    { route: '/video-gallery', group: '(site)', component: 'SuccessStories/VideoGalleryPage', source: 'src/components/SuccessStories/VideoGalleryPage.jsx', canonical: '/video-gallery' },
    { route: '/written-gallery', group: '(site)', component: 'SuccessStories/WrittenGalleryPage', source: 'src/components/SuccessStories/WrittenGalleryPage.jsx', canonical: '/written-gallery' },

    // Was canonical="/journey-celebration", which is not a route and renders the
    // 404 page. Corrected to self-referencing.
    { route: '/our-journey', group: '(site)', component: 'Journey/Journey', source: 'src/components/Journey/Journey.jsx', canonical: '/our-journey' },

    { route: '/courses', group: '(site)', component: 'CoursesOverview/CoursesOverview', source: 'src/components/CoursesOverview/CoursesOverview.jsx' },
    { route: '/courses/cia', group: '(site)', component: 'Courses/Cia', source: 'src/components/Courses/Cia.jsx' },

    // Was canonical="/cia-certification-training", which is not a route. This is
    // a live ad-campaign page, so a canonical pointing at a 404 is the most
    // damaging instance of the bug. Corrected to self-referencing.
    { route: '/cia-campaign', group: '(site)', component: 'Courses/CiaCampaign', source: 'src/components/Courses/CiaCampaign.jsx', canonical: '/cia-campaign' },

    { route: '/courses/crma', group: '(site)', component: 'Courses/Crma', source: 'src/components/Courses/Crma.jsx' },
    { route: '/courses/cisa', group: '(site)', component: 'Courses/Cisa', source: 'src/components/Courses/Cisa.jsx' },
    { route: '/courses/iap', group: '(site)', component: 'Courses/Iap', source: 'src/components/Courses/Iap.jsx' },
    { route: '/events', group: '(site)', component: 'Events/Events', source: 'src/components/Events/Events.jsx' },
    { route: '/corporate/qaip', group: '(site)', component: 'Corporate/Qaip', source: 'src/components/Corporate/Qaip.jsx' },
    { route: '/corporate/gtm-trainings', group: '(site)', component: 'Corporate/GtmTrainings', source: 'src/components/Corporate/GtmTrainings.jsx' },

    // BlogList reads ?category= via useSearchParams, which forces a Suspense
    // boundary -- see the note in the generated file.
    { route: '/blogs', group: '(site)', component: 'Blogs/BlogList', source: 'src/components/Blogs/BlogList.jsx', needsSuspense: true },

    // Upcoming carried its metadata in a raw <Helmet> block rather than
    // <MetaTags>, so its values are inlined here.
    {
        route: '/upcoming',
        group: '(site)',
        component: 'Upcoming/Upcoming',
        title: 'Upcoming Batches & Webinars | Global Professional Certifications',
        description:
            'Stay updated with upcoming CIA, CISA, CRMA, and IAP certification batches. Join our global webinars on Risk Management and Internal Audit excellence.',
        canonical: '/upcoming',
    },

    // --- Ad-campaign landing pages: no site chrome ---------------------------
    // /lp/* and the bare paths render the same component and both canonicalise
    // to the non-/lp/ URL. That is inherited from the original MetaTags and is
    // correct duplicate-content handling, so it is preserved deliberately.
    { route: '/cisa-enrollment', group: '(bare)', component: 'LandingPages/CisaEnrolmentLandingPage', source: 'src/components/LandingPages/CisaEnrolmentLandingPage.jsx' },
    { route: '/lp/cisa-enrollment', group: '(bare)', component: 'LandingPages/CisaEnrolmentLandingPage', source: 'src/components/LandingPages/CisaEnrolmentLandingPage.jsx' },
    { route: '/cia-enrollment', group: '(bare)', component: 'LandingPages/CiaEnrolmentLandingPage', source: 'src/components/LandingPages/CiaEnrolmentLandingPage.jsx' },
    { route: '/lp/cia-enrollment', group: '(bare)', component: 'LandingPages/CiaEnrolmentLandingPage', source: 'src/components/LandingPages/CiaEnrolmentLandingPage.jsx' },
];

const SITE_URL = 'https://globalprofessionalcertifications.com';

/** Last <MetaTags> in a file wins -- earlier hits are inside commented-out blocks. */
function metaFor(sourceFile) {
    const entries = inventory.filter((e) => e.file === sourceFile && e.component === 'MetaTags');
    return entries[entries.length - 1] ?? null;
}

function literal(field) {
    if (!field) return null;
    if (field.kind !== 'literal') return null;
    return field.value;
}

/** Strips the origin so canonicals are stored as paths and resolved via metadataBase. */
function toPath(url) {
    if (!url) return null;
    return url.startsWith(SITE_URL) ? url.slice(SITE_URL.length) || '/' : url;
}

const js = (value) => JSON.stringify(value);

function buildPage(entry) {
    const meta = entry.source ? metaFor(entry.source) : null;

    const title = entry.title ?? literal(meta?.title);
    const description = entry.description ?? literal(meta?.description);
    const canonical = entry.canonical ?? toPath(literal(meta?.canonicalUrl));

    if (!title) throw new Error(`No title resolved for ${entry.route} (source: ${entry.source})`);
    if (!description) throw new Error(`No description resolved for ${entry.route}`);
    if (!canonical) throw new Error(`No canonical resolved for ${entry.route}`);

    // Depth back to the repo root from app/<group>/<segments...>/page.jsx.
    // Two fixed levels -- app/ and the route-group folder, which is a real
    // directory even though the parentheses keep it out of the URL -- plus one
    // per URL segment. The homepage has zero segments and sits two levels down.
    const segments = entry.route.split('/').filter(Boolean).length;
    const up = '../'.repeat(segments + 2);
    const importPath = `${up}src/components/${entry.component}`;
    const componentName = entry.component.split('/').pop();

    const dir = join('app', entry.group, ...entry.route.split('/').filter(Boolean));
    const file = join(dir, 'page.jsx');

    const body = entry.needsSuspense
        ? `        <Suspense fallback={null}>
            <${componentName} />
        </Suspense>`
        : `        <${componentName} />`;

    const contents = `${entry.needsSuspense ? "import { Suspense } from 'react';\n\n" : ''}import ${componentName} from '${importPath}';

/*
 * ${entry.route}
 *
 * Generated by migration/generate-routes.js from the pre-migration
 * <MetaTags> props. These tags used to be written by react-helmet-async after
 * hydration; they are now in the server response.
 */
export const metadata = {
    title: ${js(title)},
    description: ${js(description)},
    alternates: { canonical: ${js(canonical)} },
    openGraph: {
        title: ${js(title)},
        description: ${js(description)},
        url: ${js(canonical)},
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: ${js(title)},
        description: ${js(description)},
    },
};

export default function Page() {
    return (
${entry.needsSuspense ? `        /*
         * ${componentName} calls useSearchParams() to read ?category=. Without a
         * Suspense boundary Next.js refuses to statically render the route and
         * the build fails. fallback={null} because the component renders its own
         * loading state.
         */
` : ''}${body}
    );
}
`;

    return { file, dir, contents, route: entry.route, canonical };
}

const built = ROUTES.map(buildPage);

for (const page of built) {
    const status = existsSync(page.file) ? 'overwrite' : 'create';
    console.log(`  ${status.padEnd(9)} ${page.file.padEnd(52)} -> ${page.canonical}`);
    if (!DRY_RUN) {
        mkdirSync(dirname(page.file), { recursive: true });
        writeFileSync(page.file, page.contents);
    }
}

console.log(`\n${DRY_RUN ? 'DRY RUN -- nothing written.' : 'Wrote'} ${built.length} route files.\n`);
