import Script from 'next/script';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

import '../src/index.css';
import { MotionProvider } from './providers';
import {
    BASE_URL as SITE_URL,
    getOrganizationSchema,
    getWebSiteSchema,
} from '../src/components/Schema/schemas';

/**
 * Site-wide defaults. Individual routes override title/description via their own
 * `metadata` export; anything they omit falls back to here.
 *
 * This is the headline win of the migration. Until now every one of these tags
 * was written by react-helmet-async *after* hydration, so the HTML served to a
 * crawler carried one identical <head> for all 29 routes. They are now in the
 * server response.
 */
export const metadata = {
    metadataBase: new URL(SITE_URL),
    // No `template` here on purpose. Every page's title was transcribed from
    // its old <MetaTags title="..."> and already carries its own branding --
    // "Blog & Expert Insights | Global Professional Certifications", and so on.
    // A template would append the brand a second time and change all 25 titles,
    // which is exactly the kind of silent SEO drift this migration must avoid.
    title: 'Global Professional Certifications®',
    description:
        'Global Professional Certifications® — CIA, CISA, CRMA and IAP certification training, corporate audit trainings and QAIP services.',
    robots: { index: true, follow: true },
    icons: { icon: '/logo.png' },
    alternates: { canonical: '/' },
    openGraph: {
        type: 'website',
        siteName: 'Global Professional Certifications®',
        url: SITE_URL,
    },
    twitter: { card: 'summary_large_image' },
};

export const viewport = {
    width: 'device-width',
    initialScale: 1,
    colorScheme: 'light',
};

/**
 * Organisation and WebSite JSON-LD.
 *
 * The pre-migration site emitted these twice, differently. index.html hardcoded
 * a thin `Organization` into the served HTML, while Layout.jsx injected the much
 * richer `EducationalOrganization` from schemas.js on the client -- complete
 * with postal address, contact point and founder, none of which a non-JS crawler
 * ever saw.
 *
 * Consolidated onto the rich versions from schemas.js, now server-rendered. One
 * source of truth, and the detailed markup finally reaches crawlers.
 *
 * Emitted as real <script> tags rather than through the Metadata API because
 * Next has no first-class JSON-LD field.
 */
const ORGANIZATION_SCHEMA = getOrganizationSchema();
const WEBSITE_SCHEMA = getWebSiteSchema();

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                {/*
                  Fonts are loaded exactly as index.html did -- preload + onload
                  swap to stylesheet, with a <noscript> fallback -- rather than
                  via next/font. next/font would self-host and is measurably
                  better, but it changes which files exist and when they load,
                  and this migration deliberately holds rendering behaviour
                  constant. Worth revisiting once cutover is stable.
                */}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
                <link
                    rel="preload"
                    as="style"
                    href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap"
                />
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap"
                    media="print"
                    // eslint-disable-next-line react/no-unknown-property
                    onLoad="this.media='all'"
                />
                <link
                    rel="preload"
                    as="style"
                    href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Noto+Sans:wght@100..900&family=Poppins:wght@100..900&display=swap"
                />
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Noto+Sans:wght@100..900&family=Poppins:wght@100..900&display=swap"
                    media="print"
                    // eslint-disable-next-line react/no-unknown-property
                    onLoad="this.media='all'"
                />

                {/* LCP hero image on the homepage. Kept from index.html. */}
                <link
                    rel="preload"
                    as="image"
                    href="/hero-girl-opt.webp"
                    type="image/webp"
                    fetchPriority="high"
                />

                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBSITE_SCHEMA) }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_SCHEMA) }}
                />
            </head>
            <body>
                {/* GTM noscript, carried over from index.html. */}
                <noscript>
                    <iframe
                        src="https://www.googletagmanager.com/ns.html?id=GTM-NC8J7N42"
                        height="0"
                        width="0"
                        style={{ display: 'none', visibility: 'hidden' }}
                    />
                </noscript>

                <MotionProvider>{children}</MotionProvider>

                <Analytics />
                <SpeedInsights />

                {/*
                  GTM and Zoho SalesIQ, deferred until the first user interaction.

                  This is a deliberate performance decision made before the
                  migration -- loading either eagerly measurably hurt page speed
                  -- so the original logic is carried over as-is rather than
                  replaced with next/script's `afterInteractive`, which would
                  load them on every page load regardless of interaction.

                  `lazyOnload` here only defers when *this* bootstrap runs; the
                  listeners inside still gate the actual third-party loads.
                */}
                <Script id="third-party-on-interaction" strategy="lazyOnload">
                    {`
(function () {
  let scriptLoaded = false;
  function loadScripts() {
    if (scriptLoaded) return;
    scriptLoaded = true;

    (function (w, d, s, l, i) {
      w[l] = w[l] || []; w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
      var f = d.getElementsByTagName(s)[0],
        j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : '';
      j.async = true;
      j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
      f.parentNode.insertBefore(j, f);
    })(window, document, 'script', 'dataLayer', 'GTM-NC8J7N42');

    window.$zoho = window.$zoho || {};
    $zoho.salesiq = $zoho.salesiq || {
      ready: function () {
        $zoho.salesiq.floatbutton.visible("show");
        $zoho.salesiq.floatwindow.visible("hide");
        $zoho.salesiq.teaser.visible("hide");
      }
    };
    var s = document.createElement("script");
    s.id = "zsiqscript";
    s.src = "https://salesiq.zohopublic.in/widget?wc=siqf35804132e65c49b7d29d4a0685cd42d624236b97d32b42c0c692f0601766c17f529b5932a53b4ef8a440086e89cf8ae";
    s.defer = true;
    document.body.appendChild(s);

    window.removeEventListener('scroll', loadScripts);
    window.removeEventListener('mousemove', loadScripts);
    window.removeEventListener('touchstart', loadScripts);
    window.removeEventListener('keydown', loadScripts);
    window.removeEventListener('click', loadScripts);
  }

  window.addEventListener('scroll', loadScripts, { passive: true, once: true });
  window.addEventListener('mousemove', loadScripts, { passive: true, once: true });
  window.addEventListener('touchstart', loadScripts, { passive: true, once: true });
  window.addEventListener('keydown', loadScripts, { passive: true, once: true });
  window.addEventListener('click', loadScripts, { passive: true, once: true });
})();
                    `}
                </Script>
            </body>
        </html>
    );
}
