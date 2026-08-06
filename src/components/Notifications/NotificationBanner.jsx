import React, { useState, useEffect, useLayoutEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaExternalLinkAlt,
  FaArrowRight,
} from "react-icons/fa";
import { client } from "../../lib/sanity/client";
import { useLayout } from "../../contexts/LayoutContext";

const slideVariants = {
  enter: (direction) => ({
    y: direction > 0 ? 20 : -20,
    opacity: 0,
  }),
  center: {
    y: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    y: direction < 0 ? 20 : -20,
    opacity: 0,
  }),
};

export default function NotificationBanner() {
  const [notifications, setNotifications] = useState([]);
  const [[currentIndex, direction], setPage] = useState([0, 1]);
  const [isPaused, setIsPaused] = useState(false);
  const [loading, setLoading] = useState(true);
  const bannerRef = useRef(null);
  const { setNotificationBarHeight } = useLayout();

  // Fetch published active notifications from Sanity
  useEffect(() => {
    let isMounted = true;
    const fetchSanityNotifications = async () => {
      try {
        const data = await client.fetch(
          `*[_type == "notificationBanner" && isActive == true] | order(order asc)`
        );

        if (isMounted) {
          if (data && data.length > 0) {
            const formatted = data.map((item, idx) => ({
              id: item._id || `banner-${idx}`,
              highlightTitle: item.highlightTitle || "",
              notification: item.notification || "",
              buttons: item.buttons || [],
            }));
            setNotifications(formatted);
          } else {
            setNotifications([]);
          }
        }
      } catch (err) {
        console.error("Error fetching notifications from Sanity:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchSanityNotifications();
    return () => {
      isMounted = false;
    };
  }, []);

  // Navigation callbacks
  const paginate = useCallback(
    (newDirection) => {
      setPage(([prevIndex]) => {
        let nextIndex = prevIndex + newDirection;
        if (nextIndex < 0) nextIndex = notifications.length - 1;
        if (nextIndex >= notifications.length) nextIndex = 0;
        return [nextIndex, newDirection];
      });
    },
    [notifications.length]
  );

  // Auto rotation timer
  useEffect(() => {
    if (isPaused || notifications.length <= 1) return;
    const timer = setInterval(() => {
      paginate(1);
    }, 4500);
    return () => clearInterval(timer);
  }, [isPaused, notifications.length, paginate]);

  // Keep the shared layout context in sync with whether the banner is
  // actually taking up space, so the Navbar/page content don't leave a gap
  // (or overlap) when there is nothing to show.
  useEffect(() => {
    if (loading || !notifications || notifications.length === 0) {
      setNotificationBarHeight(0);
    }
  }, [loading, notifications, setNotificationBarHeight]);

  // Measure the banner's real rendered height and report it to LayoutContext.
  // The banner's height is content-driven (it grows on narrow screens when
  // the announcement text wraps to multiple lines), so this can't be a fixed
  // constant - the Navbar and page content need to know the true height.
  useLayoutEffect(() => {
    const el = bannerRef.current;
    if (!el) return;

    const reportHeight = () => setNotificationBarHeight(el.offsetHeight);
    reportHeight();

    const observer = new ResizeObserver(reportHeight);
    observer.observe(el);
    return () => observer.disconnect();
  }, [notifications, currentIndex, setNotificationBarHeight]);

  // If loading or no active notifications, do not render banner
  if (loading || !notifications || notifications.length === 0) {
    return null;
  }

  const currentNotification = notifications[currentIndex] || notifications[0];

  return (
    <div
      ref={bannerRef}
      className="fixed top-0 left-0 w-screen bg-slate-900 border-b border-white/10 text-white flex items-center justify-between min-h-12 z-50 px-2 sm:px-4 md:px-8 py-1.5 sm:py-0 select-none shadow-md"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Gradient Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-blue via-slate-900 to-brand-blue opacity-90 pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex items-center justify-between gap-2">
        {/* Left Arrow Button (shown if >1 notification) */}
        {notifications.length > 1 ? (
          <button
            onClick={() => paginate(-1)}
            className="p-1.5 rounded-full hover:bg-white/15 active:scale-95 transition-all text-white/80 hover:text-white flex-shrink-0"
            aria-label="Previous notification"
          >
            <FaChevronLeft className="text-xs md:text-sm" />
          </button>
        ) : (
          <div className="w-6 flex-shrink-0" />
        )}

        {/* Content Slider Window */}
        <div className="relative flex-1 min-h-8 py-1 flex items-center justify-center">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentNotification.id || currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="relative w-full flex items-center justify-center text-center flex-wrap gap-2 md:gap-3 px-1"
            >
              {/* Highlight Title Tag */}
              {currentNotification.highlightTitle && (
                <span className="hidden sm:inline-flex items-center text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 uppercase tracking-wider flex-shrink-0">
                  {currentNotification.highlightTitle}
                </span>
              )}

              {/* Text & Buttons */}
              <div className="text-xs md:text-sm font-medium flex items-center justify-center flex-wrap gap-1.5 leading-snug">
                <span className="text-gray-100 font-normal">
                  {currentNotification.highlightTitle && (
                    <span className="sm:hidden font-bold text-amber-300 mr-1">
                      {currentNotification.highlightTitle}:
                    </span>
                  )}
                  {currentNotification.notification}
                </span>

                {/* Render Buttons (Max 2) */}
                {currentNotification.buttons && currentNotification.buttons.length > 0 && (
                  <div className="inline-flex items-center gap-1.5 ml-1">
                    {currentNotification.buttons.slice(0, 2).map((btn, idx) => {
                      const isExternal = btn.isExternal || (btn.pageLink && btn.pageLink.startsWith("http"));
                      if (isExternal) {
                        return (
                          <a
                            key={idx}
                            href={btn.pageLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-brand-purple/80 hover:bg-brand-purple border border-white/20 text-white rounded-lg text-xs font-semibold hover:shadow-sm hover:scale-[1.02] active:scale-95 transition-all"
                          >
                            {btn.buttonText}
                            <FaExternalLinkAlt className="text-[9px] opacity-80" />
                          </a>
                        );
                      }
                      return (
                        <Link
                          key={idx}
                          to={btn.pageLink}
                          className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-brand-purple/80 hover:bg-brand-purple border border-white/20 text-white rounded-lg text-xs font-semibold hover:shadow-sm hover:scale-[1.02] active:scale-95 transition-all"
                        >
                          {btn.buttonText}
                          <FaArrowRight className="text-[9px] opacity-80" />
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Arrow Button & Indicator (shown if >1 notification) */}
        {notifications.length > 1 ? (
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <span className="hidden md:inline-block text-[10px] text-gray-400 font-semibold tracking-wider px-1">
              {currentIndex + 1}/{notifications.length}
            </span>
            <button
              onClick={() => paginate(1)}
              className="p-1.5 rounded-full hover:bg-white/15 active:scale-95 transition-all text-white/80 hover:text-white"
              aria-label="Next notification"
            >
              <FaChevronRight className="text-xs md:text-sm" />
            </button>
          </div>
        ) : (
          <div className="w-6 flex-shrink-0" />
        )}
      </div>
    </div>
  );
}

export const height = 12;