import NextLink from 'next/link';

/**
 * next/link with react-router's `to` prop accepted as an alias for `href`.
 *
 * This exists to keep the framework swap separate from a cosmetic rename. There
 * are 77 <Link> call sites across 45 files; rewriting `to=` to `href=` in all of
 * them *in the same commit* that changes the router would bury any real routing
 * regression in a wall of attribute churn. Accepting both lets the risky change
 * land as an import-line-only diff that is trivial to review, with the rename
 * following as its own separately revertable commit.
 *
 * Verified before writing this: every `to` in the codebase is a plain string.
 * react-router also accepts an object form (`to={{ pathname, hash }}`) which
 * next/link does not, so that case is rejected loudly rather than silently
 * producing `href="[object Object]"`.
 *
 * Deliberately has no 'use client' directive: it holds no state and calls no
 * hooks, so it renders in server components too. Adding one would drag every
 * page that links anywhere into the client bundle.
 */
export default function Link({ to, href, children, ...props }) {
    const destination = href ?? to;

    if (process.env.NODE_ENV !== 'production' && destination && typeof destination !== 'string') {
        throw new Error(
            `<Link> received a non-string destination (${JSON.stringify(destination)}). ` +
            "next/link needs a string href. Build the path with a template literal instead of react-router's object form.",
        );
    }

    /*
     * No destination -> render a plain anchor instead of next/link.
     *
     * react-router tolerated <Link to={undefined}> by resolving it against the
     * current location, so it rendered a link that went nowhere. next/link
     * instead throws from its internal formatUrl:
     *
     *     TypeError: Cannot destructure property 'auth' of 'a' as it is undefined
     *
     * and because pages are prerendered, that is a hard build failure rather
     * than a runtime warning. Card.jsx hits this: it wraps its image and title
     * in <Link to={linkTo}>, and Cia, CiaCampaign and CoursesShowcase all
     * render <Card> without passing linkTo. Those links have been dead the
     * whole time -- React Router just never said so.
     *
     * Rendering an <a> with no href keeps the DOM shape and styling identical
     * while dropping the navigation that never worked. Flagged for the team to
     * decide whether those cards should link somewhere.
     */
    if (!destination) {
        return <a {...props}>{children}</a>;
    }

    return (
        <NextLink href={destination} {...props}>
            {children}
        </NextLink>
    );
}
