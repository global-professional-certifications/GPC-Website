import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { GiConqueror } from "react-icons/gi";

export const VideoWrittenStories = ({ 
    courses, 
    activeCourse, 
    setActiveCourse, 
    videoStories, 
    writtenStories, 
    isMobile 
}) => {
    const [activeVideoIndex, setActiveVideoIndex] = useState(null);
    const [activeWrittenIndex, setActiveWrittenIndex] = useState(null);
    
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(0);

    // Reset carousel indices when course changes
    useEffect(() => {
        setCurrentVideoIndex(0);
        setCurrentIndex(0);
        setActiveVideoIndex(null);
        setActiveWrittenIndex(null);
    }, [activeCourse]);

    // Refs to manage video playback
    const videoRefs = useRef({});
    const writtenVideoRefs = useRef({});

    const sectionRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (sectionRef.current && sectionRef.current.contains(event.target)) {
                setActiveVideoIndex(null);
                setActiveWrittenIndex(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <section id="testimonials" ref={sectionRef} className="bg-gray-50 py-12 md:py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-8">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl text-brand-blue font-bold">
                        Success Stories
                    </h2>
                    <p className="text-gray-600 mt-2 text-sm md:text-base">
                        Hear from our successful alumni across different certification programs
                    </p>
                </div>

                {/* Content Area */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeCourse}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        {/* Course Header */}
                        <div className="bg-gradient-to-r from-brand-blue to-brand-purple px-6 py-5 md:px-8 md:py-6 rounded-t-2xl text-white text-center">
                            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold flex items-center justify-center gap-3">
                                {activeCourse === 'all' ? 'All' : (courses.find(c => c.slug === activeCourse)?.name || 'Course')} Champions
                                <GiConqueror className="h-8 w-8 md:h-10 md:w-10 text-yellow-300" />
                            </h3>
                            <p className="text-white/80 mt-1 text-sm md:text-base">
                                Join the Legacy of Success with Our Elite Alumni!
                            </p>
                        </div>

                        {/* Content */}
                        <div className="bg-white border border-gray-200 border-t-0 rounded-b-2xl p-4 md:p-6 lg:p-8 space-y-8">

                            {/* Video Testimonials Section - Only show if has content */}
                            {videoStories.length > 0 && (
                                <>
                                    <div className="px-4 py-2 md:px-6 md:py-3 bg-[#EFECFF] text-brand-blue border border-brand-blue rounded-lg text-lg md:text-2xl font-bold text-center">
                                        Hear from those who made it!
                                    </div>

                                    <div className="relative flex flex-col items-center w-full pt-6">
                                        <div className="overflow-hidden w-full max-w-[320px] sm:max-w-[400px] md:max-w-[1080px]">
                                            <motion.div
                                                className={`flex gap-4 md:gap-4 ${(isMobile ? videoStories.length <= 1 : videoStories.length <= 5) ? 'justify-center' : ''}`}
                                                animate={{
                                                    x: (isMobile ? videoStories.length <= 1 : videoStories.length <= 5) ? 0 : `-${(currentVideoIndex * (isMobile ? 216 : 216))}px`
                                                }}
                                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                            >
                                                {videoStories.map((story, index) => {
                                                    const isActive = activeVideoIndex === index;
                                                    const uniqueKey = `video-${activeCourse}-${index}`;

                                                    return (
                                                        <div
                                                            key={uniqueKey}
                                                            className="relative h-[320px] md:h-[350px] w-[200px] flex-shrink-0 cursor-pointer"
                                                        >
                                                            {isActive ? (
                                                                <video
                                                                    ref={(el) => {
                                                                        if (el) {
                                                                            videoRefs.current[uniqueKey] = el;
                                                                            el.play().catch(err => console.log('Autoplay prevented:', err));
                                                                        }
                                                                    }}
                                                                    src={story.videoUrl}
                                                                    className="w-full h-full object-contain rounded-lg"
                                                                    controls
                                                                    playsInline
                                                                    onPlay={() => {
                                                                        Object.entries(videoRefs.current).forEach(([key, video]) => {
                                                                            if (key !== uniqueKey && video) {
                                                                                video.pause();
                                                                            }
                                                                        });
                                                                        Object.values(writtenVideoRefs.current).forEach((video) => {
                                                                            if (video) video.pause();
                                                                        });
                                                                    }}
                                                                />
                                                            ) : (
                                                                <div
                                                                    className="absolute inset-0"
                                                                    onClick={() => {
                                                                        Object.values(videoRefs.current).forEach((video) => {
                                                                            if (video) video.pause();
                                                                        });
                                                                        Object.values(writtenVideoRefs.current).forEach((video) => {
                                                                            if (video) video.pause();
                                                                        });
                                                                        setActiveVideoIndex(index);
                                                                        setActiveWrittenIndex(null);
                                                                    }}
                                                                >
                                                                    <img
                                                                        src={story.thumbnailUrl}
                                                                        alt={`Thumbnail for video ${index + 1}`}
                                                                        className="w-full h-full object-cover rounded-lg"
                                                                    />
                                                                    <div className="absolute rounded-lg bottom-3 left-3">
                                                                        <button className="bg-white/90 text-black px-3 py-1.5 rounded-full text-xl font-bold shadow-md hover:scale-110 transition-transform duration-300">
                                                                            ▶
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    );
                                                })}
                                            </motion.div>
                                        </div>

                                        {/* Carousel Arrows */}
                                        {videoStories.length > 5 && (
                                            <div className="flex justify-center gap-3 items-center w-full mt-6">
                                                <button
                                                    type="button"
                                                    className="p-2 md:p-3 rounded-full bg-brand-dark text-white hover:bg-brand-purple transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
                                                    disabled={currentVideoIndex === 0}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        Object.values(videoRefs.current).forEach((video) => {
                                                            if (video) video.pause();
                                                        });
                                                        setActiveVideoIndex(null);
                                                        setCurrentVideoIndex(prev => Math.max(0, prev - 1));
                                                    }}
                                                >
                                                    <FaChevronLeft />
                                                </button>
                                                <button
                                                    type="button"
                                                    className="p-2 md:p-3 rounded-full bg-brand-dark text-white hover:bg-brand-purple transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
                                                    disabled={currentVideoIndex >= videoStories.length - 5}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        Object.values(videoRefs.current).forEach((video) => {
                                                            if (video) video.pause();
                                                        });
                                                        setActiveVideoIndex(null);
                                                        setCurrentVideoIndex(prev => Math.min(videoStories.length - 5, prev + 1));
                                                    }}
                                                >
                                                    <FaChevronRight />
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                    <hr className="border-2 border-solid border-gray-300 w-5/6 mx-auto" />
                                </>
                            )}

                            {/* Written Testimonials Section - Only show if has content */}
                            {writtenStories.length > 0 && (
                                <>
                                    <div className="px-4 py-2 md:px-6 md:py-3 bg-[#EFECFF] text-brand-blue border border-brand-blue rounded-lg text-lg md:text-2xl font-bold text-center">
                                        Read their journey!
                                    </div>

                                    <div className="relative flex flex-col items-center w-full pt-6">
                                        <div className="overflow-hidden w-full max-w-[320px] sm:max-w-[400px] md:max-w-[1080px]">
                                            <motion.div
                                                className={`flex gap-4 md:gap-4 ${(isMobile ? writtenStories.length <= 1 : writtenStories.length <= 5) ? 'justify-center' : ''}`}
                                                animate={{
                                                    x: (isMobile ? writtenStories.length <= 1 : writtenStories.length <= 5) ? 0 : `-${(currentIndex * (isMobile ? 216 : 216))}px`
                                                }}
                                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                            >
                                                {writtenStories.map((story, index) => {
                                                    const isActive = activeWrittenIndex === index;
                                                    const uniqueKey = `written-${activeCourse}-${index}`;

                                                    return (
                                                        <div
                                                            key={uniqueKey}
                                                            className="relative h-[320px] md:h-[350px] w-[200px] flex-shrink-0 cursor-pointer"
                                                        >
                                                            {isActive ? (
                                                                <video
                                                                    ref={(el) => {
                                                                        if (el) {
                                                                            writtenVideoRefs.current[uniqueKey] = el;
                                                                            el.play().catch(err => console.log('Autoplay prevented:', err));
                                                                        }
                                                                    }}
                                                                    src={story.videoUrl}
                                                                    className="w-full h-full object-contain rounded-lg"
                                                                    controls
                                                                    playsInline
                                                                    onPlay={() => {
                                                                        Object.entries(writtenVideoRefs.current).forEach(([key, video]) => {
                                                                            if (key !== uniqueKey && video) {
                                                                                video.pause();
                                                                            }
                                                                        });
                                                                        Object.values(videoRefs.current).forEach((video) => {
                                                                            if (video) video.pause();
                                                                        });
                                                                    }}
                                                                />
                                                            ) : (
                                                                <div
                                                                    className="absolute inset-0 cursor-pointer rounded-lg overflow-hidden"
                                                                    onClick={() => {
                                                                        Object.values(videoRefs.current).forEach((video) => {
                                                                            if (video) video.pause();
                                                                        });
                                                                        Object.values(writtenVideoRefs.current).forEach((video) => {
                                                                            if (video) video.pause();
                                                                        });
                                                                        setActiveWrittenIndex(index);
                                                                        setActiveVideoIndex(null);
                                                                    }}
                                                                >
                                                                    <img
                                                                        src={story.thumbnailUrl}
                                                                        alt={`Thumbnail for video ${index + 1}`}
                                                                        className="w-full h-full object-cover rounded-lg"
                                                                    />
                                                                    <div className="absolute bottom-3 left-3">
                                                                        <button className="bg-white/90 text-black px-3 py-1.5 rounded-full text-xl font-bold shadow-md hover:scale-110 transition-transform duration-300">
                                                                            ▶
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    );
                                                })}
                                            </motion.div>
                                        </div>

                                        {/* Carousel Arrows */}
                                        {writtenStories.length > 5 && (
                                            <div className="flex justify-center gap-3 items-center w-full mt-4">
                                                <button
                                                    type="button"
                                                    className="p-2 md:p-3 rounded-full bg-brand-dark text-white hover:bg-brand-purple transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
                                                    disabled={currentIndex === 0}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        Object.values(writtenVideoRefs.current).forEach((video) => {
                                                            if (video) video.pause();
                                                        });
                                                        setActiveWrittenIndex(null);
                                                        setCurrentIndex(prev => Math.max(0, prev - 1));
                                                    }}
                                                >
                                                    <FaChevronLeft />
                                                </button>
                                                <button
                                                    type="button"
                                                    className="p-2 md:p-3 rounded-full bg-brand-dark text-white hover:bg-brand-purple transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
                                                    disabled={currentIndex >= writtenStories.length - 5}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        Object.values(writtenVideoRefs.current).forEach((video) => {
                                                            if (video) video.pause();
                                                        });
                                                        setActiveWrittenIndex(null);
                                                        setCurrentIndex(prev => Math.min(writtenStories.length - 5, prev + 1));
                                                    }}
                                                >
                                                    <FaChevronRight />
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </>
                            )}

                            <p className="text-sm sm:text-base md:text-lg text-gray-600 text-center max-w-3xl mx-auto font-medium pt-4 leading-relaxed">
                                Join a growing network of accomplished {courses.find(c => c.slug === activeCourse)?.name || 'certified'} professionals who began their journey with us. Through discipline and expert support, they turned their goals into success stories.
                            </p>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
};
