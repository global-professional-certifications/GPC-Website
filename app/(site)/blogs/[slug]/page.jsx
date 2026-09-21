import BlogPage from '../../../../src/components/Blogs/BlogPage';
import { client } from '../../../../src/lib/sanity/client';
import { urlFor } from '../../../../src/lib/sanity/imageBuilder';

/*
 * /blogs/:slug
 *
 * Hand-written rather than generated, because its metadata depends on CMS
 * content and has to be fetched per request.
 *
 * This is the biggest single SEO gain in the migration. Every blog post
 * previously served the same generic <head> from index.html, with the real
 * title and description written by react-helmet-async only after hydration.
 * Crawlers, link unfurlers and social previews that do not execute JavaScript
 * saw none of it -- so every post shared one title across the whole blog.
 */

/**
 * Prerender every published post at build time.
 *
 * Not a performance tweak -- it is what puts this page's metadata inside
 * <head>. A dynamically-rendered route streams its <head> tags into the body
 * instead: measured on this very page, </head> closed at byte 5,073 while the
 * <title> arrived at byte 55,409. React 19 and browsers hoist those tags, and
 * Google runs JS so it sees them, but link unfurlers (Slack, WhatsApp,
 * LinkedIn, Facebook) parse <head> and never execute scripts. Open Graph tags
 * below the fold are invisible to precisely the clients they exist for.
 *
 * Prerendering resolves the metadata at build time, so it lands in <head> like
 * every static route.
 *
 * Posts published after a build still work: `dynamicParams` defaults to true,
 * so an unknown slug renders on demand and is then cached.
 *
 * Failing soft on a CMS error is deliberate. Returning [] falls back to
 * on-demand rendering for every post, which is the pre-migration behaviour --
 * strictly better than failing the deploy because Sanity was briefly
 * unreachable.
 */
export async function generateStaticParams() {
    try {
        const slugs = await client.fetch(
            `*[_type == "post" && defined(slug.current)].slug.current`,
        );
        return (slugs ?? []).filter(Boolean).map((slug) => ({ slug }));
    } catch (error) {
        console.error('generateStaticParams: could not list blog slugs, falling back to on-demand rendering:', error);
        return [];
    }
}

/**
 * Re-resolve a prerendered post at most once an hour.
 *
 * Only affects the <head> metadata and the prerendered shell. The visible
 * article is still fetched client-side by BlogPage on every load, exactly as
 * before, so editors keep seeing content changes immediately -- this window
 * applies to the title and OG tags alone.
 */
export const revalidate = 3600;

const METADATA_QUERY = `*[_type == "post" && slug.current == $slug][0] {
  title,
  "description": coalesce(shortDescription, description),
  mainImage,
  publishedAt,
  "author": author->name,
  "meta": {
    "metaTitle": seoTitle,
    "metaDescription": metaDescription
  }
}`;

export async function generateMetadata({ params }) {
    // params is a Promise in Next.js 15.
    const { slug } = await params;

    let post = null;
    try {
        post = await client.fetch(METADATA_QUERY, { slug });
    } catch (error) {
        // A CMS outage must not take the page down with it. Falling through
        // with post == null yields the generic metadata below, and the
        // component still renders and retries client-side exactly as before.
        console.error(`Failed to fetch blog metadata for "${slug}":`, error);
    }

    if (!post) {
        return {
            title: 'Blog | Global Professional Certifications',
            alternates: { canonical: `/blogs/${slug}` },
        };
    }

    // Same precedence the old <MetaTags> used: explicit SEO fields from the CMS
    // win, otherwise fall back to the post's own title/description.
    const title = post.meta?.metaTitle || `${post.title} | GPC Blog`;
    const description = post.meta?.metaDescription || post.description || '';
    const canonical = `/blogs/${slug}`;
    const image = post.mainImage ? urlFor(post.mainImage).url() : undefined;

    return {
        title,
        description,
        alternates: { canonical },
        openGraph: {
            title,
            description,
            url: canonical,
            // 'article' rather than 'website' -- these are dated, authored
            // posts, and the richer type is what unfurlers expect.
            type: 'article',
            publishedTime: post.publishedAt,
            authors: post.author ? [post.author] : undefined,
            images: image ? [image] : undefined,
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: image ? [image] : undefined,
        },
    };
}

export default async function Page({ params }) {
    const { slug } = await params;

    // Passed as a prop rather than read via useParams(). BlogPage is a client
    // component and Next's useParams() would work, but taking it as a prop
    // keeps the component agnostic about how it was routed to.
    return <BlogPage slug={slug} />;
}
