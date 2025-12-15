import React, { useLayoutEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import NotificationBanner from "./components/Notifications/NotificationBanner";

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useLayoutEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "instant" // this overrides the default smooth scroll in CSS
        });
    }, [pathname]);

    return null;
};

export default function Layout() {
    return (
        <>
            <ScrollToTop />
            <NotificationBanner />
            <Navbar topOffset={"12"} /> {/* height of notification banner */}
            <Outlet />
            <Footer />
        </>
    );
}