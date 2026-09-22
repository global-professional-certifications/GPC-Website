/**
 * Next.js configuration.
 *
 * Carries over the behaviour that currently lives in vercel.json. That file's
 * rewrites still apply on Vercel and run *before* Next.js routing, so its
 * catch-all SPA fallback (`/(.*) -> /index.html`) has to be removed at cutover
 * or every Next route is swallowed by it. See migration/CUTOVER.md.
 */

/** Mirrors an existing VITE_* variable onto its NEXT_PUBLIC_* name. */
function mapped(nextName, viteName, fallback) {
    const value = process.env[nextName] || process.env[viteName] || fallback;
    if (!value) {
        throw new Error(
            `Missing environment variable: set ${nextName} or ${viteName}. ` +
            `Next.js needs it at build time to inline into the client bundle.`,
        );
    }
    return value;
}

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,

    eslint: {
        // `next build` runs ESLint by default; `vite build` never did, so the
        // repo has accumulated a few hundred pre-existing violations (unused
        // React imports from the pre-JSX-transform era, missing prop-types).
        // None are migration regressions, and blocking the framework swap on
        // unrelated lint debt would mean touching ~100 files for reasons that
        // have nothing to do with routing.
        //
        // This preserves the previous arrangement exactly: linting stays a
        // separate, explicit `pnpm lint`. Worth turning back on and burning
        // down once the cutover is stable.
        ignoreDuringBuilds: true,
    },

    // Read by src/lib/sanity/env.js. Mapping the VITE_* vars here rather than
    // renaming them in the Vercel dashboard means the deployment's existing
    // configuration keeps working untouched -- there is no window where the
    // site is deployed against a variable that has not been created yet.
    env: {
        NEXT_PUBLIC_SANITY_PROJECT_ID: mapped('NEXT_PUBLIC_SANITY_PROJECT_ID', 'VITE_SANITY_PROJECT_ID'),
        NEXT_PUBLIC_SANITY_DATASET: mapped('NEXT_PUBLIC_SANITY_DATASET', 'VITE_SANITY_DATASET', 'production'),
        NEXT_PUBLIC_SANITY_API_VERSION: mapped('NEXT_PUBLIC_SANITY_API_VERSION', 'VITE_SANITY_API_VERSION', '2024-12-05'),
    },

    // false is the default, but it is stated explicitly because it is part of
    // the URL contract: /about/ 308-redirects to /about. React Router served
    // both without a redirect, so this is a deliberate, measured change.
    // See migration/FINDINGS.md #2.
    trailingSlash: false,

    images: {
        /*
         * Static image imports are handled by our own webpack rule below, not
         * by next-image-loader.
         *
         * This is load-bearing, not a preference. With Next's loader active,
         * `import hero from './hero.webp'` evaluates to a StaticImageData
         * OBJECT ({src, width, height, blurDataURL}); under Vite it was a URL
         * string. Every one of the ~148 asset imports in this codebase is
         * passed straight to a plain <img src={hero}>, so React stringified the
         * object and emitted src="[object Object]".
         *
         * Every locally-imported image on the site was broken -- homepage,
         * course pages, and both ad-campaign landing pages -- while the build
         * passed and every URL returned 200. Only a browser or a type checker
         * would have caught it.
         *
         * Disabling the loader restores the Vite behaviour exactly, with no
         * change to any component. next/image is unaffected for remote Sanity
         * images (remotePatterns below); it simply cannot take a static import
         * as its src, which nothing here does.
         */
        disableStaticImages: true,

        // Sanity-hosted media. The pre-migration site rendered these as plain
        // <img> via @sanity/image-url, which already applies width/format/quality
        // transforms at the CDN. Components keep doing that during the port;
        // this block only enables next/image for the pages we opt in later.
        remotePatterns: [
            { protocol: 'https', hostname: 'cdn.sanity.io' },
            { protocol: 'https', hostname: 'i.ytimg.com' },
            { protocol: 'https', hostname: 'img.youtube.com' },
        ],
        formats: ['image/webp'],
    },

    webpack(config) {
        // Vite resolved any imported file to a URL. webpack only knows the types
        // Next configures, and Qaip.jsx imports a PDF directly
        // (src/assets/corporate/qaip-brochure.pdf), which otherwise fails the
        // build with "no loaders are configured to process this file".
        //
        // asset/resource emits the file and yields its URL as a string, which is
        // exactly the shape the component already expects.
        config.module.rules.push({
            test: /\.pdf$/i,
            type: 'asset/resource',
            generator: { filename: 'static/media/[name].[hash:8][ext]' },
        });

        /*
         * Images resolve to a URL string, matching Vite and matching what every
         * <img src={imported}> in this codebase expects. Paired with
         * images.disableStaticImages above -- see the note there for why.
         *
         * asset/resource emits the file and yields its public URL, so the
         * content-hashed filenames keep long-term caching working.
         */
        config.module.rules.push({
            test: /\.(png|jpe?g|gif|webp|avif|svg|ico)$/i,
            type: 'asset/resource',
            generator: { filename: 'static/media/[name].[hash:8][ext]' },
        });

        return config;
    },

    async rewrites() {
        return [
            // Brochure PDFs. These URLs are handed out in marketing material and
            // are linked from course pages, so they are part of the URL contract
            // even though they are not React routes. Transcribed from vercel.json.
            //
            // Ordering matters: the specific CIA/CISA entries are redundant with
            // the :course pattern below, but they are kept because that is how
            // production is configured today and this migration is not the place
            // to prove they are equivalent.
            { source: '/CIA-Brochure.pdf', destination: '/api/brochure?course=cia' },
            { source: '/CISA-Brochure.pdf', destination: '/api/brochure?course=cisa' },
            { source: '/:course-Brochure.pdf', destination: '/api/brochure?course=:course' },
        ];
    },

    async headers() {
        return [
            {
                // Matches vercel.json. Aggressive, but changing cache policy and
                // framework at the same time would make any regression
                // impossible to attribute. Revisit after cutover is stable.
                source: '/:path*',
                headers: [{ key: 'Cache-Control', value: 'no-cache, must-revalidate' }],
            },
            {
                source: '/thumbnails/:path*',
                headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
            },
        ];
    },
};

export default nextConfig;
