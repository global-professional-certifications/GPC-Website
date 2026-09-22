'use client';

import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import type { ReactNode } from 'react';
import type { SanityImageSource } from '@sanity/image-url';

import { client } from '../lib/sanity/client';
import { urlFor } from '../lib/sanity/imageBuilder';

// Constants for layout heights (in pixels)
export const LAYOUT_HEIGHTS = {
    NOTIFICATION_BAR: 48, // h-12 = 48px
    NAVBAR: 64, // md:px-8 px-0 + inner py-2 + logo/links ... actually it's about 64px
    COUNTDOWN_BAR: 0, // Currently disabled in Layout.jsx
} as const;

/**
 * An `upcomingEvent` document, shaped by the projection in the query below.
 *
 * Everything except `_id` and `eventStartDateTime` is optional: these are
 * CMS-authored fields with no enforced requirement, and the countdown bar has
 * to survive a half-filled document rather than crash the whole site chrome.
 */
export interface UpcomingEvent {
    _id: string;
    eventName?: string;
    title?: string;
    description?: string;
    venue?: string;
    date?: string;
    eventStartDateTime: string;
    registrationLink?: string;
    registrationButtonText?: string;
    coverImage?: SanityImageSource;
    /** Resolved from `coverImage` after fetching; not present on the raw document. */
    coverImageUrl?: string | null;
}

export interface LayoutContextValue {
    upcomingEvents: UpcomingEvent[];
    upcomingEvent: UpcomingEvent | null;
    showCountdownBar: boolean;
    setShowCountdownBar: React.Dispatch<React.SetStateAction<boolean>>;
    handleCountdownComplete: () => void;
    loading: boolean;
    topOffset: number;
    navbarTopOffset: number;
    countdownBarTopOffset: number;
    notificationBarHeight: number;
    setNotificationBarHeight: React.Dispatch<React.SetStateAction<number>>;
    heights: typeof LAYOUT_HEIGHTS;
    isEnquiryDrawerOpen: boolean;
    setIsEnquiryDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
    openEnquiryDrawer: () => void;
    closeEnquiryDrawer: () => void;
}

const LayoutContext = createContext<LayoutContextValue | null>(null);

export function LayoutProvider({ children }: { children: ReactNode }) {
    const [upcomingEvents, setUpcomingEvents] = useState<UpcomingEvent[]>([]);
    const [upcomingEvent, setUpcomingEvent] = useState<UpcomingEvent | null>(null);
    const [showCountdownBar, setShowCountdownBar] = useState(false);
    const [loading, setLoading] = useState(true);
    // Real, measured height of the notification banner (it can grow taller on
    // narrow screens when the announcement text wraps to multiple lines).
    // Defaults to the old fixed value until NotificationBanner reports its
    // actual rendered height.
    const [notificationBarHeight, setNotificationBarHeight] = useState<number>(
        LAYOUT_HEIGHTS.NOTIFICATION_BAR,
    );

    // Fetch upcoming event from Sanity
    useEffect(() => {
        const fetchUpcomingEvent = async () => {
            try {
                // Fetch active upcoming events separated by start date
                const query = `*[_type == "upcomingEvent" && isActive == true] | order(eventStartDateTime asc) {
                    _id,
                    eventName,
                    title,
                    description,
                    venue,
                    date,
                    eventStartDateTime,
                    registrationLink,
                    registrationButtonText,
                    coverImage
                }`;

                const data = await client.fetch<UpcomingEvent[]>(query);

                if (data && data.length > 0) {
                    const now = new Date();
                    // Process images and filter out truly past events (safety check)
                    const validEvents = data
                        .filter((event) => new Date(event.eventStartDateTime) > now)
                        .map((event) => ({
                            ...event,
                            coverImageUrl: event.coverImage ? urlFor(event.coverImage).url() : null,
                        }));

                    if (validEvents.length > 0) {
                        setUpcomingEvents(validEvents);

                        // the first event is the closest one since they are ordered ascending
                        const closestEvent = validEvents[0];
                        setUpcomingEvent(closestEvent);

                        const startDate = new Date(closestEvent.eventStartDateTime);

                        // Calculate difference in days
                        const diffTime = Math.abs(startDate.getTime() - now.getTime());
                        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                        // Show countdown bar only if the event is strictly within the next 15 days
                        setShowCountdownBar(diffDays <= 15);
                    } else {
                        setUpcomingEvents([]);
                        setUpcomingEvent(null);
                        setShowCountdownBar(false);
                    }
                } else {
                    setUpcomingEvents([]);
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
        let offset = notificationBarHeight + LAYOUT_HEIGHTS.NAVBAR;
        if (showCountdownBar) {
            offset += LAYOUT_HEIGHTS.COUNTDOWN_BAR;
        }
        return offset;
    }, [notificationBarHeight, showCountdownBar]);

    // Navbar top offset (just after notification bar)
    const navbarTopOffset = notificationBarHeight;

    // Countdown bar top offset (after notification bar + navbar)
    const countdownBarTopOffset = notificationBarHeight + LAYOUT_HEIGHTS.NAVBAR;

    // Sticky Enquiry Drawer state
    const [isEnquiryDrawerOpen, setIsEnquiryDrawerOpen] = useState(false);
    const openEnquiryDrawer = () => setIsEnquiryDrawerOpen(true);
    const closeEnquiryDrawer = () => setIsEnquiryDrawerOpen(false);

    const value: LayoutContextValue = {
        upcomingEvents,
        upcomingEvent,
        showCountdownBar,
        setShowCountdownBar,
        handleCountdownComplete,
        loading,
        topOffset,
        navbarTopOffset,
        countdownBarTopOffset,
        notificationBarHeight,
        setNotificationBarHeight,
        heights: LAYOUT_HEIGHTS,
        isEnquiryDrawerOpen,
        setIsEnquiryDrawerOpen,
        openEnquiryDrawer,
        closeEnquiryDrawer,
    };

    return <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>;
}

export function useLayout(): LayoutContextValue {
    const context = useContext(LayoutContext);
    if (!context) {
        throw new Error('useLayout must be used within a LayoutProvider');
    }
    return context;
}

export default LayoutContext;
