'use client';

import { LazyMotion, domAnimation } from 'motion/react';

import { LayoutProvider } from '../src/contexts/LayoutContext';

/**
 * Animation features, loaded lazily. Global because `motion` components appear
 * on campaign landing pages as well as inside the site chrome.
 *
 * Carried over unchanged from main.jsx.
 */
export function MotionProvider({ children }) {
    return <LazyMotion features={domAnimation}>{children}</LazyMotion>;
}

/**
 * Site-chrome state: notification banner height, countdown bar, enquiry drawer.
 *
 * Deliberately NOT in the root layout, unlike the pre-migration main.jsx which
 * wrapped everything including the campaign landing pages.
 *
 * LayoutProvider fires a Sanity query for upcoming events on mount. Only
 * Layout, NotificationBanner and UpcomingEventCard consume it, and all three
 * live inside the site chrome -- no landing page calls useLayout(). So mounting
 * it globally meant every paid-traffic landing page paid for a CMS round-trip
 * it never read.
 *
 * Scoping it to the (site) group removes that request from exactly the pages
 * where load time is most expensive, with no consumer left without a provider.
 */
export function SiteChromeProvider({ children }) {
    return <LayoutProvider>{children}</LayoutProvider>;
}
