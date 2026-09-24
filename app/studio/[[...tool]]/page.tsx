'use client';

import dynamic from 'next/dynamic';

/**
 * Sanity Studio, embedded at /studio.
 *
 * The optional catch-all segment [[...tool]] matches /studio and every path
 * beneath it, which the Studio needs because it does its own client-side
 * routing for tools, document types and individual documents
 * (/studio/structure/post;abc123). A plain /studio/page.tsx would serve the
 * shell and then 404 on every deep link into it.
 *
 * `basePath: '/studio'` in sanity.config.ts must keep matching this directory.
 *
 * Loaded with ssr:false because the Studio's dependency graph reaches jsdom
 * (sanity -> isomorphic-dompurify -> jsdom). Webpack bundles jsdom into the
 * server render pass, where it throws "i is not a function" at require time
 * and every /studio URL 500s. ssr:false keeps that graph out of the server
 * bundle entirely; the Studio is a client-only SPA regardless.
 */
const NextStudio = dynamic(
    () => import('./StudioClient'),
    { ssr: false },
);

export default function StudioPage() {
    return <NextStudio />;
}
