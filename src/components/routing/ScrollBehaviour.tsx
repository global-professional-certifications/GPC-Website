'use client';

import type { CmsData } from '../../types/cms';
import { useEffect, useLayoutEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Scroll-to-hash and scroll-to-top, ported from src/ScrollToHash.jsx and the
 * ScrollToTop helper that lived inside src/Layout.jsx.
 *
 * Two behaviours from the original were dropped after checking every call site:
 *
 *  1. The `location.state?.target` branch. react-router let a navigation carry
 *     arbitrary state, and ScrollToHash read `state.target` to pick a scroll
 *     target. Nothing in the codebase ever set it -- no `navigate(..., {state})`
 *     and no `<Link state={...}>` anywhere -- so the branch was unreachable.
 *     Next.js has no equivalent to route state, so reimplementing a dead code
 *     path would have meant inventing a mechanism to serve nothing.
 *
 *  2. The `navigate(pathname, { replace: true, state: ... })` call that cleared
 *     that state afterwards. Unreachable for the same reason.
 *
 * The two live paths are preserved exactly: a real URL hash, and the
 * sessionStorage handoff that VideoGalleryPage and WrittenGalleryPage use to
 * scroll to a section after a cross-page navigation.
 */
export default function ScrollBehaviour() {
    const pathname = usePathname();

    // Restore scroll on navigation, unless the URL targets a section.
    // useLayoutEffect so the jump happens before paint -- with useEffect the
    // new page is briefly visible at the old scroll position.
    useLayoutEffect(() => {
        if (!window.location.hash) {
            window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        }
    }, [pathname]);

    useEffect(() => {
        // Next.js does not expose the hash through any router hook -- fragments
        // are never sent to the server -- so it is read from the live URL.
        const hash = window.location.hash;
        const sessionTarget = sessionStorage.getItem('scrollToTarget');
        const targetId = hash || (sessionTarget ? `#${sessionTarget}` : null);

        if (!targetId) return;

        let cancelled = false;
        const timers: CmsData[] = [];

        // Retry, because several targets live inside sections that only exist
        // once a Sanity fetch resolves. Same budget as the original: 10 attempts
        // at 200ms, then give up.
        const tryScroll = (attempts = 0) => {
            if (cancelled) return;

            let el: Element | null = null;
            try {
                el = document.querySelector(targetId);
            } catch {
                // A malformed fragment (e.g. "#123") is not a valid selector.
                // The original threw here; swallow it so a bad inbound link
                // cannot break the page it lands on.
                return;
            }

            if (el) {
                timers.push(
                    setTimeout(() => {
                        if (cancelled) return;
                        el.scrollIntoView({ behavior: 'smooth', block: 'start' });

                        if (sessionTarget) sessionStorage.removeItem('scrollToTarget');

                        // Drop the fragment so a refresh does not re-scroll,
                        // without triggering a navigation.
                        if (hash) window.history.replaceState(null, '', pathname);
                    }, 100),
                );
            } else if (attempts < 10) {
                timers.push(setTimeout(() => tryScroll(attempts + 1), 200));
            }
        };

        tryScroll();

        // The original leaked its timers: navigating away mid-retry left the
        // chain running and could scroll the *next* page. Cleanup added here.
        return () => {
            cancelled = true;
            timers.forEach(clearTimeout);
        };
    }, [pathname]);

    return null;
}
