import React, { useLayoutEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import NotificationBanner from "./components/Notifications/NotificationBanner";
import EventCountdownBar from "./components/Events/EventCountdownBar";
import ScrollToHash from "./ScrollToHash";
import { SchemaMarkup, getOrganizationSchema } from "./components/Schema";

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useLayoutEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "instant"
        });
    }, [pathname]);

    return null;
};

export default function Layout() {
    const { pathname } = useLocation();
    const isHomePage = pathname === "/";

    return (
        <>
            <SchemaMarkup schema={getOrganizationSchema()} />
            <ScrollToHash />
            <ScrollToTop />
            <NotificationBanner />
            <Navbar topOffset={"12"} /> {/* height of notification banner */}
            {/* {isHomePage && (
                <EventCountdownBar
                    eventName="IIA Bombay Chapter 2026"
                    targetDate="2026-01-08T11:00:00"
                    tagText="Upcoming Event"
                    buttonText="Check Event"
                    buttonLink="upcoming-event"
                />
            )} */}
            <Outlet />
            <Footer />
        </>
    );
}
