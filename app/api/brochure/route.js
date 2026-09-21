import { NextResponse } from 'next/server';

import { client } from '../../../src/lib/sanity/client';

/**
 * Resolves a course brochure to its Sanity-hosted PDF and redirects there.
 *
 * Ported from the root api/brochure.js Vercel function. The port is required,
 * not cosmetic: in a Next.js project Vercel routes through Next, so a bare
 * api/*.js at the repo root is no longer picked up as a serverless function and
 * these URLs would 404 silently.
 *
 * Reached two ways:
 *   1. Directly, as /api/brochure?course=cisa
 *   2. Via the rewrites in next.config.js, which map the public .pdf URLs
 *      (/CIA-Brochure.pdf, /CISA-Brochure.pdf, /:course-Brochure.pdf) onto it.
 *
 * Those .pdf URLs appear in marketing material and on course pages, so they are
 * part of the URL contract even though they were never React routes.
 */

// Redirect target depends on CMS state, so it must not be cached at build time.
export const dynamic = 'force-dynamic';

/** Matches the public brochure URLs, e.g. /CISA-Brochure.pdf -> "CISA". */
const BROCHURE_PATH = /^\/(.+)-Brochure\.pdf$/i;

/**
 * Works out which course was asked for.
 *
 * The query string is checked first, then the request path. The fallback is not
 * belt-and-braces -- it is the path that actually carries the value for every
 * real visitor, and getting this wrong served the wrong PDF.
 *
 * A Next.js rewrite does NOT expose its destination's query string to the route
 * handler. Verified against a running production build: a request to
 * /CISA-Brochure.pdf rewritten to /api/brochure?course=cisa arrives with
 *
 *     request.url                    "http://host/CISA-Brochure.pdf"
 *     nextUrl.search                 ""
 *     searchParams.get('course')     null
 *
 * so `course` fell through to the 'cia' default and /CISA-Brochure.pdf served
 * the CIA brochure while still returning a healthy 302. /CRMA-Brochure.pdf,
 * which should 404, served the CIA brochure too.
 *
 * This differs from the pre-migration setup, where the rewrite was handled by
 * Vercel's platform layer before the function ran, so the function did see the
 * rewritten query. Nothing in the build or the status codes flags the
 * difference -- only comparing the redirect targets against production caught
 * it.
 *
 * Reading the path keeps the handler correct regardless of how the rewrite
 * behaves, and leaves the direct ?course= form working unchanged.
 */
function resolveCourse(request) {
    const fromQuery = request.nextUrl.searchParams.get('course');
    if (fromQuery) return fromQuery.toLowerCase();

    const fromPath = request.nextUrl.pathname.match(BROCHURE_PATH);
    if (fromPath) return fromPath[1].toLowerCase();

    return 'cia';
}

export async function GET(request) {
    const course = resolveCourse(request);

    // Three naming conventions are accepted because existing brochure documents
    // in the CMS use different ones. Carried over exactly from the original --
    // narrowing this would break whichever links depend on the looser forms.
    const slug1 = course;
    const slug2 = `${course}-brochure`;
    const slug3 = `${course}-course-brochure`;

    const query = `*[_type == "brochure" && (
      slug.current == $slug1 ||
      slug.current == $slug2 ||
      slug.current == $slug3 ||
      _id == $slug1 ||
      _id == $slug2
    )][0] {
      "url": pdfFile.asset->url
    }`;

    try {
        const result = await client.fetch(query, { slug1, slug2, slug3 });

        if (result?.url) {
            // 302, matching the original. Deliberately not 308: the mapping from
            // course to asset changes whenever the content team uploads a new
            // brochure, and a permanent redirect would be cached by browsers
            // and pin visitors to a stale PDF.
            return NextResponse.redirect(result.url, 302);
        }

        return new NextResponse(
            `Brochure file for "${course}" not found in Sanity. Please ensure you have created a Brochure document with ID or slug matching "${course}", "${course}-brochure", or "${course}-course-brochure".`,
            { status: 404, headers: { 'Content-Type': 'text/plain' } },
        );
    } catch (error) {
        console.error('Error fetching brochure:', error);
        return new NextResponse(`Error fetching brochure: ${error.message}`, {
            status: 500,
            headers: { 'Content-Type': 'text/plain' },
        });
    }
}
