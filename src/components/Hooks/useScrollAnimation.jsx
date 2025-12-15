import { useEffect, useState, useRef } from 'react';

/**
 * Custom hook for scroll-triggered animations using Intersection Observer
 * @param {Object} options - Intersection Observer options
 * @param {number} options.threshold - Visibility threshold (0-1)
 * @param {string} options.rootMargin - Root margin for early/late triggering
 * @returns {Array} [ref, isVisible] - Ref to attach to element and visibility state
 */
const useScrollAnimation = (options = {}) => {
    const {
        threshold = 0.1,
        rootMargin = '0px',
    } = options;

    const [isVisible, setIsVisible] = useState(false);
    const elementRef = useRef(null);

    useEffect(() => {
        // Check for prefers-reduced-motion
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (prefersReducedMotion) {
            // If user prefers reduced motion, immediately set as visible
            setIsVisible(true);
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    // Optionally unobserve after first intersection
                    // observer.unobserve(entry.target);
                }
            },
            {
                threshold,
                rootMargin,
            }
        );

        const currentElement = elementRef.current;
        if (currentElement) {
            observer.observe(currentElement);
        }

        return () => {
            if (currentElement) {
                observer.unobserve(currentElement);
            }
        };
    }, [threshold, rootMargin]);

    return [elementRef, isVisible];
};

export default useScrollAnimation;
