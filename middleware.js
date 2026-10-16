import { NextResponse } from 'next/server';

/**
 * Preserves case-insensitive URL matching.
 *
 * React Router matched routes case-insensitively by default, so every one of
 * these renders the real page on the pre-migration site (verified directly
 * against the installed react-router-dom, see migration/FINDINGS.md #1):
 *
 *     /About          -> AboutUs
 *     /Courses/CIA    -> Cia
 *     /CIA-Enrollment -> CiaEnrolmentLandingPage
 *
 * Next.js filesystem routing is case-sensitive, so without this middleware all
 * three become hard 404s the moment we cut over.
 *
 * That last one is why this file exists. It is a paid landing page. We do not
 * control the creative linking to it and cannot re-issue live ads, so if any of
 * it uses non-lowercase the traffic lands on a 404 and nothing in the build,
 * the tests, or the deploy logs would tell us. The failure is silent and it
 * costs money.
 *
 * 308 rather than 302 because it is permanent and preserves both the request
 * method and the query string -- UTM and gclid parameters must survive the hop
 * or the campaign attribution breaks even when the page itself loads fine.
 *
 * This is strictly better than what we have today: one canonical lowercase URL
 * per page, with link equity consolidated onto it instead of split across
 * casings.
 */
export function middleware(request) {
    const { pathname, search } = request.nextUrl;

    // Fast path: already canonical. This is every real request, so it must not
    // allocate or clone anything.
    if (pathname === pathname.toLowerCase()) {
        return NextResponse.next();
    }

    const url = request.nextUrl.clone();
    url.pathname = pathname.toLowerCase();
    // `search` carries over via clone(), but reassigning documents the intent:
    // losing it here is the exact failure this redirect exists to avoid.
    url.search = search;

    return NextResponse.redirect(url, 308);
}

export const config = {
    /*
     * Runs on everything except:
     *   /studio    - Sanity Studio builds its own deep links and some contain
     *                uppercase document ids and type names. Lowercasing those
     *                breaks the editor. It is auth-gated and not indexed, so it
     *                gains nothing from canonicalisation anyway.
     *   /api       - route handlers do their own casing (the brochure handler
     *                already lowercases its course param).
     *   /_next     - build output, never user-facing.
     *   files with an extension - static assets in /public. Several are
     *                deliberately capitalised: /CIA-Brochure.pdf is a rewrite
     *                source and must reach next.config.js with its casing
     *                intact, or the brochure links break.
     */
    matcher: ['/((?!studio|api|_next/static|_next/image|.*\\.[^/]+$).*)'],
};
