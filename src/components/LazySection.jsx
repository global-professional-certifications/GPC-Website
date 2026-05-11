import React, { useState, useEffect, useRef, Suspense } from 'react';

/**
 * LazySection component that only renders its children when they enter the viewport.
 * Useful for reducing initial JS execution and rendering work for below-the-fold content.
 */
const LazySection = ({ children, placeholder = null, threshold = 0.1, rootMargin = '200px' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return (
    <div ref={sectionRef} className="min-h-[100px]">
      {isVisible ? children : placeholder}
    </div>
  );
};

export default LazySection;
