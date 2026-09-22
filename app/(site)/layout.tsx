import { SiteChromeProvider } from '../providers';
import SiteChrome from './SiteChrome';

/**
 * Layout for every page that carries the site chrome -- navbar, notification
 * banner, footer, enquiry drawer.
 *
 * `(site)` is a route group: the parentheses keep it out of the URL, so
 * app/(site)/about/page.jsx serves /about, not /site/about. That is what lets
 * the chrome/no-chrome split from the old React Router tree survive without any
 * path changing. The campaign landing pages live in (bare) alongside this and
 * render without chrome, exactly as they did outside <Layout> before.
 */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
    return (
        <SiteChromeProvider>
            <SiteChrome>{children}</SiteChrome>
        </SiteChromeProvider>
    );
}
