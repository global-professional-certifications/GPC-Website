'use client';

import { NextStudio } from 'next-sanity/studio';

import config from '../../../sanity.config';

/**
 * Sanity Studio, embedded at /studio.
 *
 * The optional catch-all segment [[...tool]] matches /studio and every path
 * beneath it, which the Studio needs because it does its own client-side
 * routing for tools, document types and individual documents
 * (/studio/structure/post;abc123). A plain /studio/page.jsx would serve the
 * shell and then 404 on every deep link into it.
 *
 * `basePath: '/studio'` in sanity.config.ts must keep matching this directory.
 *
 * Content editors keep the same URL and the same bookmarks they use today.
 */
export default function StudioPage() {
    return <NextStudio config={config} />;
}
