/**
 * Studio layout.
 *
 * Exists to keep the Studio out of the site chrome. Without it the Studio would
 * still inherit the root layout, which is what we want (html/body, global CSS),
 * but this file lets the Studio own the full viewport without the marketing
 * navbar and footer bracketing the editor.
 *
 * The Studio manages its own <head>, so metadata here is limited to keeping it
 * out of search results -- it is an auth-gated internal tool.
 */
export const metadata = {
    title: 'Sanity Studio',
    robots: { index: false, follow: false },
};

export const viewport = {
    width: 'device-width',
    initialScale: 1,
    // The Studio is an application UI, not a document: pinch-zooming its
    // toolbars on mobile does more harm than good.
    maximumScale: 1,
};

export default function StudioLayout({ children }) {
    return children;
}
