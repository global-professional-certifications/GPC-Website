/**
 * THE URL CONTRACT.
 *
 * Single source of truth for every public URL this site serves, transcribed
 * directly from the React Router tree in src/main.jsx as it existed before the
 * Next.js migration (commit 94d268b).
 *
 * Several of these routes are live ad-campaign landing pages. Their URLs are
 * baked into paid creative we do not control and cannot re-issue, so a route
 * that 404s or redirects here is lost spend, not just a broken page. Nothing in
 * this file may be renamed or removed as part of the migration; it may only
 * grow.
 *
 * Used by capture-baseline.js (record current behaviour) and compare.js (diff
 * the Next.js build against it).
 */

/** Ad-campaign landing pages. Rendered OUTSIDE the site chrome (no Navbar/Footer). */
export const CAMPAIGN_ROUTES = [
    { path: '/cisa-enrollment', component: 'LandingPages/CisaEnrolmentLandingPage', chrome: false },
    { path: '/lp/cisa-enrollment', component: 'LandingPages/CisaEnrolmentLandingPage', chrome: false },
    { path: '/cia-enrollment', component: 'LandingPages/CiaEnrolmentLandingPage', chrome: false },
    { path: '/lp/cia-enrollment', component: 'LandingPages/CiaEnrolmentLandingPage', chrome: false },
    // Inside the Layout chrome, but still campaign traffic.
    { path: '/cia-campaign', component: 'Courses/CiaCampaign', chrome: true },
];

/** Standard marketing + content pages. All rendered INSIDE the Layout chrome. */
export const CONTENT_ROUTES = [
    { path: '/', component: 'Home/Home', chrome: true },
    { path: '/about', component: 'About/AboutUs', chrome: true },
    { path: '/terms', component: 'Terms/Terms', chrome: true },
    { path: '/privacy', component: 'Privacy/PrivacyPolicy', chrome: true },
    { path: '/contact', component: 'Contact/ContactUs', chrome: true },
    { path: '/refund', component: 'Refund/RefundPolicy', chrome: true },
    { path: '/faq', component: 'FaqPage/FaqPage', chrome: true },
    { path: '/glossary', component: 'Glossary/Glossary', chrome: true },
    { path: '/success', component: 'SuccessStories/SuccessStories', chrome: true },
    { path: '/video-gallery', component: 'SuccessStories/VideoGalleryPage', chrome: true },
    { path: '/written-gallery', component: 'SuccessStories/WrittenGalleryPage', chrome: true },
    { path: '/our-journey', component: 'Journey/Journey', chrome: true },
    { path: '/courses', component: 'CoursesOverview/CoursesOverview', chrome: true },
    { path: '/courses/cia', component: 'Courses/Cia', chrome: true },
    { path: '/courses/crma', component: 'Courses/Crma', chrome: true },
    { path: '/courses/cisa', component: 'Courses/Cisa', chrome: true },
    { path: '/courses/iap', component: 'Courses/Iap', chrome: true },
    { path: '/events', component: 'Events/Events', chrome: true },
    { path: '/corporate/qaip', component: 'Corporate/Qaip', chrome: true },
    { path: '/corporate/gtm-trainings', component: 'Corporate/GtmTrainings', chrome: true },
    { path: '/blogs', component: 'Blogs/BlogList', chrome: true },
    { path: '/upcoming', component: 'Upcoming/Upcoming', chrome: true },
];

/**
 * Dynamic routes. `sampleFrom` tells capture-baseline.js how to pull real live
 * values out of Sanity, so we exercise the pattern against content that exists
 * rather than a guessed slug.
 */
export const DYNAMIC_ROUTES = [
    {
        pattern: '/blogs/:slug',
        component: 'Blogs/BlogPage',
        chrome: true,
        sampleFrom: '*[_type == "post" && defined(slug.current)][0...3].slug.current',
        toPath: (slug) => `/blogs/${slug}`,
    },
];

/**
 * Routes that exist but are deliberately excluded from the automated crawl.
 * Documented so nobody assumes they were forgotten.
 */
export const EXCLUDED_ROUTES = [
    {
        path: '/studio',
        component: 'Studio/StudioPage',
        reason: 'Sanity Studio SPA. Auth-gated and renders entirely client-side, so an HTTP crawl proves nothing. Verified manually.',
    },
];

/**
 * Vercel rewrites from vercel.json. These are NOT React Router routes -- they
 * are edge rewrites onto the /api/brochure serverless function, which 302s to a
 * Sanity-hosted PDF. Easy to lose in a migration because they live in config
 * rather than in code.
 */
export const REWRITE_ROUTES = [
    { path: '/CIA-Brochure.pdf', destination: '/api/brochure?course=cia', expectRedirect: true },
    { path: '/CISA-Brochure.pdf', destination: '/api/brochure?course=cisa', expectRedirect: true },
    { path: '/CRMA-Brochure.pdf', destination: '/api/brochure?course=CRMA', expectRedirect: true },
];

/**
 * URL-shape edge cases that behave one way under React Router and a different
 * way under Next.js. Each is a real way ad traffic can die silently, so we
 * measure them before and after rather than reasoning about them.
 *
 *  - trailing slash: React Router treats /about/ and /about as the same route.
 *    Next.js 308-redirects one to the other. A 308 preserves the query string,
 *    so UTM parameters survive -- but that needs proving, not assuming.
 *  - casing: React Router matches case-insensitively by default, so /About
 *    renders the about page today. Next.js is case-sensitive and would 404.
 *    If any live creative uses non-lowercase paths, this is a silent outage.
 *  - query params: campaign URLs always carry UTM/gclid. They must survive
 *    every redirect hop intact.
 */
export const EDGE_CASE_ROUTES = [
    { path: '/about/', note: 'trailing slash on a content route' },
    { path: '/courses/cia/', note: 'trailing slash on a nested route' },
    { path: '/cia-enrollment/', note: 'trailing slash on a CAMPAIGN route' },
    { path: '/About', note: 'mixed case -- React Router matches, Next.js does not' },
    { path: '/Courses/CIA', note: 'mixed case on a nested route' },
    { path: '/CIA-Enrollment', note: 'mixed case on a CAMPAIGN route' },
    { path: '/cia-enrollment?utm_source=google&utm_medium=cpc&gclid=TEST123', note: 'campaign route with UTM + gclid -- params must survive' },
    { path: '/lp/cia-enrollment?utm_source=meta&utm_campaign=test', note: '/lp/ campaign variant with UTM' },
    { path: '/this-route-does-not-exist', note: 'unmatched route -- 404 handling' },
];

/** Every statically-known path, in one list. */
export const ALL_STATIC_ROUTES = [...CAMPAIGN_ROUTES, ...CONTENT_ROUTES];

/** Paths that must never regress. Used to fail the comparison loudly. */
export const CRITICAL_PATHS = new Set(CAMPAIGN_ROUTES.map((r) => r.path));

export default {
    CAMPAIGN_ROUTES,
    CONTENT_ROUTES,
    DYNAMIC_ROUTES,
    EXCLUDED_ROUTES,
    REWRITE_ROUTES,
    EDGE_CASE_ROUTES,
    ALL_STATIC_ROUTES,
    CRITICAL_PATHS,
};
