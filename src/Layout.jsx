import React, { useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import { useLocation } from "react-router-dom";
import NotificationBanner from "./components/Notifications/NotificationBanner";

const ScrolltoTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
};

export default function Layout() {
    return (
        <>
            <NotificationBanner />
            <Navbar topOffset={"12"}/> {/* height of notification banner */}
            <ScrolltoTop />
            <Outlet />
            <Footer />
        </>
    );
}