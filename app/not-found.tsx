import type { Metadata } from 'next';
import NotFound from '../src/components/NotFound/NotFound';
import { SiteChromeProvider } from './providers';
import SiteChrome from './(site)/SiteChrome';

/**
 * 404 page.
 *
 * Behaviour change worth stating plainly: the pre-migration site served
 * index.html with a **200** for every unmatched path (the Vercel SPA fallback)
 * and let React Router render this component client-side. Every 404 on the site
 * was therefore a soft 404. Next.js returns a real 404 status here.
 *
 * That is the correct behaviour and better for SEO, but it means Search Console
 * will likely show a jump in reported 404s shortly after cutover. Those URLs
 * were already broken -- they were just claiming to be fine.
 *
 * The chrome is mounted explicitly because a root-level not-found.jsx sits
 * outside the (site) route group and so does not inherit its layout. Without
 * this, a 404 would render as bare text with no navbar or footer, stranding the
 * visitor with no way back into the site.
 */

export const metadata: Metadata = {
    title: 'Page Not Found | Global Professional Certifications®',
    description: 'The page you are looking for could not be found.',
    // Keep 404s out of the index while still letting crawlers follow the links
    // back into the real site.
    robots: { index: false, follow: true },
};

export default function NotFoundPage() {
    return (
        <SiteChromeProvider>
            <SiteChrome>
                <NotFound />
            </SiteChrome>
        </SiteChromeProvider>
    );
}
