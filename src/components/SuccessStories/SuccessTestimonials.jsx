import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export const SuccessTestimonials = ({ stories, start, end, activeCourse }) => {
    const displayedTestimonials = stories.slice(start, end);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isMobileView, setIsMobileView] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    // Close lightbox on Escape key
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') setSelectedImage(null);
        };
        if (selectedImage) {
            document.addEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
        };
    }, [selectedImage]);

    // Reset index when course changes
    useEffect(() => {
        setCurrentImageIndex(0);
    }, [activeCourse]);

    useEffect(() => {
        const handleResize = () => {
            setIsMobileView(window.innerWidth < 768);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleImagePrev = () => {
        setCurrentImageIndex((prev) => prev - 1);
    };

    const handleImageNext = () => {
        setCurrentImageIndex((prev) => prev + 1);
    };

    const cardWidth = isMobileView ? 180 : 250;
    const gap = isMobileView ? 12 : 24;
    // How many cards fit in the visible container without scrolling
    const maxVisible = isMobileView ? 1 : 4;
    const fitsWithoutScroll = displayedTestimonials.length <= maxVisible;

    // Safety check: if no testimonials, don't render carousel
    if (!displayedTestimonials || displayedTestimonials.length === 0) {
        return null;
    }

    return (
        <section className="py-8 md:pt-12 md:pb-24 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative flex flex-col items-center">
                    {/* Carousel Container */}
                    <div className={`overflow-hidden ${isMobileView ? 'w-full max-w-[280px]' : 'w-full max-w-[1064px]'}`}>
                        <motion.div
                            animate={{ x: fitsWithoutScroll ? 0 : `-${(currentImageIndex % displayedTestimonials.length) * (cardWidth + gap)}px` }}
                            transition={{ type: "spring", stiffness: 120, damping: 20 }}
                            className={`flex ${isMobileView ? 'gap-4' : 'gap-6'} ${fitsWithoutScroll ? 'justify-center' : ''}`}
                            onAnimationComplete={() => {
                                if (!fitsWithoutScroll && (currentImageIndex >= displayedTestimonials.length || currentImageIndex < 0)) {
                                    setCurrentImageIndex(currentImageIndex % displayedTestimonials.length);
                                }
                            }}
                        >
                            {(fitsWithoutScroll ? displayedTestimonials : [...displayedTestimonials, ...displayedTestimonials, ...displayedTestimonials]).map((testimonial, index) => (
                                <div
                                    key={`${activeCourse}-${index}`}
                                    className={`relative overflow-hidden transition-transform transform hover:scale-105 flex-shrink-0 cursor-pointer ${isMobileView ? 'w-[180px]' : 'w-[250px]'}`}
                                    onClick={() => setSelectedImage({ url: testimonial.thumbnailUrl, name: testimonial.name || `Success story ${index + 1}` })}
                                >
                                    <img
                                        src={testimonial.thumbnailUrl}
                                        alt={testimonial.name || `Success story ${index + 1}`}
                                        className="w-full h-auto object-contain py-2"
                                    />
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Navigation Arrows - only show when scrolling is needed */}
                    {!fitsWithoutScroll && (
                        <div className="relative z-10 flex justify-center gap-3 items-center w-full mt-6">
                            <button
                                type="button"
                                className="p-2 md:p-3 rounded-full bg-brand-dark text-white hover:bg-brand-purple transition duration-300 ease-in-out cursor-pointer"
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    handleImagePrev();
                                }}
                                aria-label="Previous testimonials"
                            >
                                <FaChevronLeft />
                            </button>
                            <button
                                type="button"
                                className="p-2 md:p-3 rounded-full bg-brand-dark text-white hover:bg-brand-purple transition duration-300 ease-in-out cursor-pointer"
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    handleImageNext();
                                }}
                                aria-label="Next testimonials"
                            >
                                <FaChevronRight />
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
                        onClick={() => setSelectedImage(null)}
                    >
                        {/* Close Button */}
                        <button
                            className="absolute top-4 right-4 md:top-6 md:right-6 text-white bg-white/20 hover:bg-white/40 rounded-full w-10 h-10 flex items-center justify-center text-2xl font-bold transition-colors duration-200 z-10"
                            onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }}
                            aria-label="Close image"
                        >
                            ✕
                        </button>

                        {/* Enlarged Image */}
                        <motion.img
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                            src={selectedImage.url}
                            alt={selectedImage.name}
                            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};
