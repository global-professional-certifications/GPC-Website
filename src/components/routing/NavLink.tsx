'use client';

import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import type { CSSProperties, ComponentProps, ReactNode } from 'react';

/** State react-router hands to NavLink's callback props. */
interface NavLinkRenderProps {
    isActive: boolean;
    isPending: boolean;
    isTransitioning?: boolean;
}

/**
 * Mirrors react-router's NavLink API: `to`/`href` are alternatives, and
 * className/style/children may each be a value or a function of the active
 * state.
 */
type NavLinkProps = Omit<ComponentProps<typeof NextLink>, 'href' | 'className' | 'style' | 'children'> & {
    to?: string;
    href?: string;
    end?: boolean;
    className?: string | ((props: NavLinkRenderProps) => string);
    style?: CSSProperties | ((props: NavLinkRenderProps) => CSSProperties);
    children?: ReactNode | ((props: NavLinkRenderProps) => ReactNode);
};

/**
 * react-router's NavLink API, reimplemented on next/link.
 *
 * next/link has no active-state concept, but 37 call sites depend on
 * react-router's, and four of them pass the callback form:
 *
 *     <NavLink to="/blogs" className={({ isActive }) => isActive ? 'on' : ''} />
 *
 * Reimplementing that here keeps those call sites working unchanged. Without
 * it, a `className` function would be passed straight through to the DOM and
 * React would stringify it into the class attribute -- the link would still
 * navigate correctly, so this would survive a click-through test and only show
 * up as quietly broken nav highlighting.
 *
 * Matching semantics follow react-router:
 *   - `end` requires an exact path match.
 *   - Without `end`, a link is active for its own path and any descendant, so
 *     /courses stays highlighted while on /courses/cia.
 *   - "/" is special-cased to exact matching, since every path is a descendant
 *     of it and it would otherwise always be active.
 *
 * `isPending` is always false. It backs react-router's data-router navigation
 * state, which has no Next.js equivalent; no call site in this codebase reads
 * it.
 */
export default function NavLink({
    to,
    href,
    end = false,
    className,
    style,
    children,
    ...props
}: NavLinkProps) {
    const pathname = usePathname();
    const destination = href ?? to;

    // Same guard as Link: next/link throws on an undefined href, and a
    // prerendered page turns that into a build failure. See the note in Link.jsx.
    if (!destination) {
        const staticClassName = typeof className === 'function' ? className({ isActive: false, isPending: false }) : className;
        const staticStyle = typeof style === 'function' ? style({ isActive: false, isPending: false }) : style;
        return (
            <a className={staticClassName} style={staticStyle} {...props}>
                {typeof children === 'function' ? children({ isActive: false, isPending: false }) : children}
            </a>
        );
    }

    // Compare paths only. A destination carrying a hash or query (/events#upcoming-event)
    // must still light up when sitting on /events.
    const targetPath = String(destination).split(/[?#]/)[0];

    const normalize = (value) =>
        value.length > 1 && value.endsWith('/') ? value.slice(0, -1) : value;

    const current = normalize(pathname || '/');
    const target = normalize(targetPath || '/');

    const isActive =
        end || target === '/'
            ? current === target
            : current === target || current.startsWith(`${target}/`);

    const renderProps = { isActive, isPending: false, isTransitioning: false };
    const resolve = (value) => (typeof value === 'function' ? value(renderProps) : value);

    return (
        <NextLink
            href={destination}
            className={resolve(className)}
            style={resolve(style)}
            aria-current={isActive ? 'page' : undefined}
            {...props}
        >
            {typeof children === 'function' ? children(renderProps) : children}
        </NextLink>
    );
}
