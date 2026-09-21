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
 * Reached via the rewrites in next.config.js:
 *   /CIA-Brochure.pdf      -> /api/brochure?course=cia
 *   /CISA-Brochure.pdf     -> /api/brochure?course=cisa
 *   /:course-Brochure.pdf  -> /api/brochure?course=:course
 *
 * Those .pdf URLs appear in marketing material and on course pages, so they are
 * part of the URL contract even though they were never React routes.
 *
 * The original built its own Sanity client from a chain of four possible env
 * var names; this shares the app's configured client instead, so there is one
 * place where Sanity credentials are resolved.
 */

// Redirect target depends on CMS state, so it must not be cached at build time.
export const dynamic = 'force-dynamic';

export async function GET(request) {
    const course = (request.nextUrl.searchParams.get('course') || 'cia').toLowerCase();

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
