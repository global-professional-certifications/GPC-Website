import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { client } from '../lib/sanity/client';

const LayoutContext = createContext(null);

// Constants for layout heights (in pixels)
export const LAYOUT_HEIGHTS = {
    NOTIFICATION_BAR: 48, // h-12 = 48px
    NAVBAR: 64, // md:px-8 px-0 + inner py-2 + logo/links ... actually it's about 64px
    COUNTDOWN_BAR: 0, // Currently disabled in Layout.jsx
};

export function LayoutProvider({ children }) {
    const [upcomingEvent, setUpcomingEvent] = useState(null);
    const [showCountdownBar, setShowCountdownBar] = useState(false);
    const [loading, setLoading] = useState(true);

    // Fetch upcoming event from Sanity
    useEffect(() => {
        const fetchUpcomingEvent = async () => {
            try {
                // Fetch active upcoming event
                const query = `*[_type == "upcomingEvent" && isActive == true] | order(eventStartDateTime asc)[0] {
                    _id,
                    eventName,
                    title,
                    description,
                    venue,
                    date,
                    eventStartDateTime,
                    registrationLink,
                    registrationButtonText,
                    "coverImage": coverImage.asset->url
                }`;

                const data = await client.fetch(query);

                if (data) {
                    setUpcomingEvent(data);
                    // Show countdown bar if the event start time is in the future
                    const now = new Date();
                    const startDate = new Date(data.eventStartDateTime);
                    setShowCountdownBar(startDate > now);
                } else {
                    setUpcomingEvent(null);
                    setShowCountdownBar(false);
                }
            } catch (error) {
                console.error('Error fetching upcoming event:', error);
                setUpcomingEvent(null);
                setShowCountdownBar(false);
            } finally {
                setLoading(false);
            }
        };

        fetchUpcomingEvent();
    }, []);

    // Handle countdown completion - hide the bar when event ends
    const handleCountdownComplete = () => {
        setShowCountdownBar(false);
    };

    // Calculate total top offset based on visible elements
    const topOffset = useMemo(() => {
        let offset = LAYOUT_HEIGHTS.NOTIFICATION_BAR + LAYOUT_HEIGHTS.NAVBAR;
        if (showCountdownBar) {
            offset += LAYOUT_HEIGHTS.COUNTDOWN_BAR;
        }
        return offset;
    }, [showCountdownBar]);

    // Navbar top offset (just after notification bar)
    const navbarTopOffset = LAYOUT_HEIGHTS.NOTIFICATION_BAR;

    // Countdown bar top offset (after notification bar + navbar)
    const countdownBarTopOffset = LAYOUT_HEIGHTS.NOTIFICATION_BAR + LAYOUT_HEIGHTS.NAVBAR;

    const value = {
        upcomingEvent,
        showCountdownBar,
        setShowCountdownBar,
        handleCountdownComplete,
        loading,
        topOffset,
        navbarTopOffset,
        countdownBarTopOffset,
        heights: LAYOUT_HEIGHTS,
    };

    return (
        <LayoutContext.Provider value={value}>
            {children}
        </LayoutContext.Provider>
    );
}

export function useLayout() {
    const context = useContext(LayoutContext);
    if (!context) {
        throw new Error('useLayout must be used within a LayoutProvider');
    }
    return context;
}

export default LayoutContext;
