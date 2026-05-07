import React, { useState, useEffect, useCallback } from 'react';
import { m, AnimatePresence } from 'framer-motion';

export default function MobileGallery({ images = [] }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedImageIndex, setSelectedImageIndex] = useState(null);

    const ITEMS_PER_PAGE = 8;
    const totalPages = Math.ceil(images.length / ITEMS_PER_PAGE);

    const activeImages = images.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    // Keyboard Navigation for Lightbox
    const handleKeyDown = useCallback((e) => {
        if (selectedImageIndex === null) return;
        if (e.key === 'Escape') setSelectedImageIndex(null);
        if (e.key === 'ArrowRight') handleNext(e);
        if (e.key === 'ArrowLeft') handlePrev(e);
    }, [selectedImageIndex, images.length]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);

    const handleNext = (e) => {
        if (e) e.stopPropagation();
        setSelectedImageIndex((prev) => (prev + 1) % images.length);
    };

    const handlePrev = (e) => {
        if (e) e.stopPropagation();
        setSelectedImageIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    if (images.length === 0) return null;

    return (
        <div className="w-full max-w-[1280px] mx-auto px-4 mt-8">
            {/* 4-Column Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {activeImages.map((img, i) => {
                    const globalIndex = (currentPage - 1) * ITEMS_PER_PAGE + i;
                    return (
                        <m.div
                            key={img._id || globalIndex}
                            whileHover={{ scale: 1.02, y: -4 }}
                            className="relative overflow-hidden cursor-pointer group transition-all hover:shadow-xl hover:shadow-brand-blue/10"
                            onClick={() => setSelectedImageIndex(globalIndex)}
                        >
                            <div className="w-full h-auto overflow-hidden bg-gray-50 relative">
                                <img
                                    src={img.thumbnailUrl}
                                    alt={img.name || "WhatsApp Showcase"}
                                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500 will-change-transform"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                                {/* Check Out Overlay */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="bg-brand-blue/90 px-6 py-2 md:px-8 md:py-3 shadow-lg text-white font-bold text-sm md:text-base uppercase tracking-widest scale-75 group-hover:scale-100 transition-transform duration-300">
                                        Check Out
                                    </div>
                                </div>
                            </div>
                        </m.div>
                    );
                })}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 md:gap-4 mt-12 mb-4">
                    <button
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 bg-white text-gray-400 hover:text-brand-blue hover:border-brand-blue hover:shadow-md transition-all duration-300 disabled:opacity-30 disabled:hover:shadow-none"
                    >
                        <span className="text-xl">←</span>
                    </button>

                    <div className="flex items-center gap-2">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                            <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-bold transition-all duration-300 ${currentPage === page
                                    ? 'bg-brand-blue text-white shadow-lg shadow-blue-900/20 scale-110'
                                    : 'bg-white text-gray-500 border border-gray-200 hover:border-brand-blue hover:text-brand-blue'
                                    }`}
                            >
                                {page}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 bg-white text-gray-400 hover:text-brand-blue hover:border-brand-blue hover:shadow-md transition-all duration-300 disabled:opacity-30 disabled:hover:shadow-none"
                    >
                        <span className="text-xl">→</span>
                    </button>
                </div>
            )}

            {/* Full Screen Lightbox Modal */}
            <AnimatePresence>
                {selectedImageIndex !== null && (
                    <m.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md p-4 md:p-8"
                        onClick={() => setSelectedImageIndex(null)}
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setSelectedImageIndex(null)}
                            className="absolute top-4 right-4 md:top-8 md:right-8 text-white/50 hover:text-white hover:rotate-90 transition-all duration-300 p-2 z-50 bg-white/10 rounded-full"
                        >
                            <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>

                        {/* Prev Button */}
                        <button
                            onClick={handlePrev}
                            className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white p-3 md:p-4 z-50 bg-white/5 hover:bg-white/10 rounded-full transition-all duration-300"
                        >
                            <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                        </button>

                        {/* Image Container */}
                        <m.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="relative w-full h-full max-h-[85vh] flex items-center justify-center"
                            onClick={(e) => e.stopPropagation()} // Prevent close on image click
                        >
                            <img
                                src={images[selectedImageIndex].thumbnailUrl}
                                alt={images[selectedImageIndex].name || "Fullscreen Showcase"}
                                className="max-w-full max-h-full object-contain rounded-md shadow-2xl"
                            />
                            {/* Optional student name badge */}
                            {images[selectedImageIndex].name && (
                                <div className="absolute bottom-[-40px] left-1/2 -translate-x-1/2 text-white/80 text-sm md:text-base font-medium tracking-wide whitespace-nowrap">
                                    {images[selectedImageIndex].name} - {images[selectedImageIndex].courseName || 'GPC'}
                                </div>
                            )}
                        </m.div>

                        {/* Next Button */}
                        <button
                            onClick={handleNext}
                            className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white p-3 md:p-4 z-50 bg-white/5 hover:bg-white/10 rounded-full transition-all duration-300"
                        >
                            <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                        </button>
                    </m.div>
                )}
            </AnimatePresence>
        </div>
    );
}
