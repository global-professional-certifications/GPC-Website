'use client';

import { usePathname } from 'next/navigation';

import Navbar from '../../src/components/Navbar/Navbar';
import Footer from '../../src/components/Footer/Footer';
import NotificationBanner from '../../src/components/Notifications/NotificationBanner';
import EventCountdownBar from '../../src/components/Events/EventCountdownBar';
import EnquireStickyDrawer from '../../src/components/Enquiry/EnquireStickyDrawer';
import ScrollBehaviour from '../../src/components/routing/ScrollBehaviour';
import { BreadcrumbsSEO } from '../../src/components/Schema';
import { useLayout } from '../../src/contexts/LayoutContext';

/**
 * Site chrome, ported from src/Layout.jsx.
 *
 * Changes from the original, all verified against call sites first:
 *
 *  - <Outlet context={{ showCountdownBar }} /> became {children}. The context
 *    payload is dropped because useOutletContext() has zero call sites -- it was
 *    being computed and passed to nobody.
 *  - useLocation() became usePathname().
 *  - The Organization schema moved to the root layout so it server-renders.
 *    BreadcrumbsSEO stays here and stays client-side; see the note at its
 *    render site below.
 */
export default function SiteChrome({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const {
        upcomingEvent,
        showCountdownBar,
        handleCountdownComplete,
        loading,
        topOffset,
        navbarTopOffset,
        countdownBarTopOffset,
        isEnquiryDrawerOpen,
        openEnquiryDrawer,
        closeEnquiryDrawer,
    } = useLayout();

    const isHomePage = pathname === '/';
    // Boolean(...) rather than the bare && chain: `upcomingEvent` is an object
    // or null, so the chain's type was `boolean | UpcomingEvent | null` and it
    // was being passed to props expecting a boolean.
    const shouldShowCountdown = Boolean(isHomePage && showCountdownBar && upcomingEvent && !loading);

    return (
        <>
            {/*
              Still client-rendered, unlike the rest of the schema markup.
              Breadcrumbs derive from the current path, which a layout cannot
              read on the server without calling headers() -- and that would opt
              every page out of static rendering to serve one JSON-LD block.
              Parity with today's behaviour; server-rendering it per route is
              tracked as a follow-up.
            */}
            <BreadcrumbsSEO />
            <ScrollBehaviour />

            <NotificationBanner />
            {/*
              showCountdownBar is deliberately NOT passed here. Navbar's
              signature is ({ topOffset = 48 }) -- it has never accepted the
              prop, so the original src/Layout.jsx was passing a value that went
              nowhere. Inherited dead code, surfaced by typing SiteChrome.
              Restore it only alongside a Navbar that actually reads it.
            */}
            <Navbar topOffset={navbarTopOffset} />

            {shouldShowCountdown && upcomingEvent && (
                <EventCountdownBar
                    eventName={upcomingEvent.eventName}
                    targetDate={upcomingEvent.eventStartDateTime}
                    tagText="Upcoming Event"
                    buttonText="View Event"
                    buttonLink="/events#upcoming-event"
                    onComplete={handleCountdownComplete}
                    topOffset={countdownBarTopOffset}
                />
            )}

            <main id="main-content" style={{ paddingTop: `${topOffset}px` }} className="min-h-screen">
                {children}
            </main>

            <Footer />

            <EnquireStickyDrawer
                isOpen={isEnquiryDrawerOpen}
                onOpen={openEnquiryDrawer}
                onClose={closeEnquiryDrawer}
            />
        </>
    );
}
