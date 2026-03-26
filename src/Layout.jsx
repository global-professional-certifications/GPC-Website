import React, { useLayoutEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import NotificationBanner from "./components/Notifications/NotificationBanner";
import EventCountdownBar from "./components/Events/EventCountdownBar";
import ScrollToHash from "./ScrollToHash";
import { SchemaMarkup, getOrganizationSchema } from "./components/Schema";
import { useLayout, LAYOUT_HEIGHTS } from "./contexts/LayoutContext";

const ScrollToTop = () => {
    const { pathname, hash } = useLocation();

    useLayoutEffect(() => {
        if (!hash) {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: "instant"
            });
        }
    }, [pathname, hash]);

    return null;
};

export default function Layout() {
    const { pathname } = useLocation();
    const {
        upcomingEvent,
        showCountdownBar,
        handleCountdownComplete,
        loading,
        topOffset
    } = useLayout();

    // Show countdown bar on homepage if there's an active upcoming event
    const isHomePage = pathname === "/";
    const shouldShowCountdown = isHomePage && showCountdownBar && upcomingEvent && !loading;

    return (
        <>
            <SchemaMarkup schema={getOrganizationSchema()} />
            <ScrollToHash />
            <ScrollToTop />
            <NotificationBanner />
            <Navbar topOffset={12} showCountdownBar={shouldShowCountdown} />
            {shouldShowCountdown && upcomingEvent && (
                <EventCountdownBar
                    eventName={upcomingEvent.eventName}
                    targetDate={upcomingEvent.eventStartDateTime}
                    tagText="Upcoming Event"
                    buttonText="View Event"
                    buttonLink="/events#upcoming-event"
                    onComplete={handleCountdownComplete}
                />
            )}
            <div style={{ paddingTop: `${topOffset}px` }} className="min-h-screen">
                <Outlet context={{ showCountdownBar: shouldShowCountdown }} />
            </div>
            <Footer />
        </>
    );
}
