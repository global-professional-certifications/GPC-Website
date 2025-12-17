import React, { useState, useRef, useEffect } from "react";
import { client } from "../../lib/sanity/client";
import { urlFor } from "../../lib/sanity/imageBuilder";
import { GiConqueror } from "react-icons/gi";

import MetaTags from "../MetaTags";
import { height } from "../Notifications/NotificationBanner";

import { Helmet } from 'react-helmet-async';

// Hero Images
import agmIiaDelhiChapterOne from "../../assets/AGM-IIA-Delhi/AGM-IIA-Delhi-9-success.png"
import agmIiaDelhiChapterTwo from "../../assets/AGM-IIA-Delhi/AGM-IIA-Delhi-7-success.png"
import passoutStudents from "../../assets/Passout-students.jpeg"
import wofaFive from "../../assets/wofa-2025/wofa-5.jpeg"
import iiaHyderabadOne from "../../assets/iia-hyderabad/iia-hyderabad-1.jpeg"

import pinkyPhoto from "../../assets/pinky-photo.jpg";
import akshdeepSingh from "../../assets/akshdeep-singh.png";
import testimonialTwo from "../../assets/testimonial-2.png";

import { MotionConfig, motion, AnimatePresence } from "motion/react";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";

// Helper function to handle negative modulo correctly
const safeModulo = (n, m) => ((n % m) + m) % m;

export default function SuccessStories() {

    const [videoStories, setVideoStories] = useState([]);
    const [writtenStories, setWrittenStories] = useState([]);
    const [imageStories, setImageStories] = useState([]);

    useEffect(() => {
        const fetchStories = async () => {
            try {
                const query = `*[_type == "successStory"] | order(order asc) {
                    _id,
                    name,
                    category,
                    "thumbnailUrl": thumbnail.asset->url,
                    "videoUrl": video.asset->url
                }`;
                const data = await client.fetch(query);

                console.log("Fetched success stories:", data);
                console.log("Total stories:", data.length);

                const videoData = data.filter(story => story.category === 'video');
                const writtenData = data.filter(story => story.category === 'written');
                const imageData = data.filter(story => story.category === 'image');

                console.log("Video stories:", videoData.length, videoData);
                console.log("Written stories:", writtenData.length, writtenData);
                console.log("Image stories:", imageData.length, imageData);

                setVideoStories(videoData);
                setWrittenStories(writtenData);
                setImageStories(imageData);
            } catch (error) {
                console.error("Error fetching success stories:", error);
            }
        };
        fetchStories();
    }, []);

    const heroImages = [
        agmIiaDelhiChapterOne,
        agmIiaDelhiChapterTwo,
        iiaHyderabadOne,
        passoutStudents,
        wofaFive,
    ]


    const [activeVideoIndex, setActiveVideoIndex] = useState(null);
    const [activeWrittenIndex, setActiveWrittenIndex] = useState(null);

    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(0);

    // Refs to manage video playback
    const videoRefs = useRef({});
    const writtenVideoRefs = useRef({});

    const handlePrev = () => {
        setCurrentVideoIndex((prev) => prev - 1);
    };

    const handleNext = () => {
        setCurrentVideoIndex((prev) => prev + 1);
    };

    const handleWrittenPrev = () => {
        setCurrentIndex((prev) => prev - 1);
    };

    const handleWrittenNext = () => {
        setCurrentIndex((prev) => prev + 1);
    };

    // Handle infinite loop for video carousel
    useEffect(() => {
        if (videoStories.length > 0) {
            if (currentVideoIndex >= videoStories.length) {
                setTimeout(() => setCurrentVideoIndex(0), 300);
            } else if (currentVideoIndex < 0) {
                setTimeout(() => setCurrentVideoIndex(videoStories.length - 1), 300);
            }
        }
    }, [currentVideoIndex, videoStories.length]);

    // Handle infinite loop for written carousel
    useEffect(() => {
        if (writtenStories.length > 0) {
            if (currentIndex >= writtenStories.length) {
                setTimeout(() => setCurrentIndex(0), 300);
            } else if (currentIndex < 0) {
                setTimeout(() => setCurrentIndex(writtenStories.length - 1), 300);
            }
        }
    }, [currentIndex, writtenStories.length]);

    const [currentHeroIndex, setCurrentHeroIndex] = useState(0)
    const [isAnimating, setIsAnimating] = useState(true)
    // const timeoutRef = useRef(null)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentHeroIndex(prev => prev + 1);
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        // if (currentHeroIndex === heroImages.length) {
        // // Temporarily disable animation
        //     setTimeout(() => {
        //     setIsAnimating(false);
        //     setCurrentHeroIndex(0);
        // }, 501); // Wait for slide transition to finish
        // } 
        // else {
        //     setIsAnimating(true);
        // }

        if (currentHeroIndex === heroImages.length) {
            setCurrentHeroIndex(0);
        }
    }, [currentHeroIndex]);

    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768)
        }
        handleResize()
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [window.innerWidth])

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

    const articleSchema = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "Success Stories of Global Professional Certifications",
        "description": "Read inspiring success stories of students who cleared CIA, CISA, CRMA, and IAP certifications with Global Professional Certifications.",
        "author": {
            "@type": "Organization",
            "name": "Global Professional Certifications"
        },
        "publisher": {
            "@type": "Organization",
            "name": "Global Professional Certifications",
            "logo": {
                "@type": "ImageObject",
                "url": "https://globalprofessionalcertifications.com/logo.png"
            }
        },
        "url": "https://globalprofessionalcertifications.com/success",
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": "https://globalprofessionalcertifications.com/success"
        },
        "datePublished": "2025-10-07",
        "dateModified": "2025-10-07"

    };

    // const [loadedVideoIndexes, setLoadedVideoIndexes] = useState(
    //     Array(testimonialVideos.length).fill(false)
    // )
    // const [loadedWrittenIndexes, setLoadedWrittenIndexes] = useState(
    //     Array(writtenTestimonials.length).fill(false)
    // )

    // const handleVideoThumbnailClick = (index) => {
    //     setLoadedVideoIndexes((prev) => {
    //         const updated = [...prev];
    //         updated[index] = true;
    //         return updated;
    //     });
    // };
    // const handleWrittenThumbnailClick = (index) => {
    //     setLoadedWrittenIndexes((prev) => {
    //         const updated = [...prev];
    //         updated[index] = true;
    //         return updated;
    //     });
    // };

    // const videoRefs = useRef(testimonialVideos.map(() => React.createRef()));
    // const writtenRefs = useRef(writtenTestimonials.map(() => React.createRef()));

    // const handleVideoPlay = (currentIndex) => {
    //     videoRefs.current.forEach((ref, index) => {
    //         if (index !== currentIndex && ref.current) {
    //             ref.current.pause(); // Pause all other videos
    //         }
    //     });
    // };
    // const handleWrittenPlay = (currentIndex) => {
    //     writtenRefs.current.forEach((ref, index) => {
    //         if (index !== currentIndex && ref.current) {
    //             ref.current.pause(); // Pause all other videos
    //         }
    //     });
    // };

    return (
        <>
            <Helmet>
                <script type="application/ld+json">
                    {JSON.stringify(articleSchema)}
                </script>
            </Helmet>
            <MetaTags
                title="CIA Exam Success Stories – Real Achievements"
                description="Hear from professionals who passed the CIA Challenge Exam with our guidance. Discover how our course made a difference in their careers."
                canonicalUrl="https://globalprofessionalcertifications.com/success"
            />

            {/* Hero Section  */}

            <section className={`min-h-screen w-full bg-brand-blue flex items-center justify-center px-4 sm:px-6 md:px-8 pt-${height.toString()}`}>
                <div className="w-full max-w-7xl mx-auto py-20 md:py-24 flex flex-col lg:grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-0 items-center pl-0 lg:pl-12 mt-12">
                    {/* Left Content */}
                    <div className="w-full flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white max-w-2xl">
                            Ready to create <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">your own</span> success story?
                        </h1>

                        <h2 className="text-base sm:text-lg md:text-xl text-gray-200 max-w-xl leading-relaxed">
                            Discover our <span className='font-bold text-orange-400'>certification programs</span> and take the next step to <span className='font-bold text-orange-400'>advance your career</span> today!
                        </h2>

                        <div className="pt-2">
                            <button
                                onClick={() => {
                                    document.getElementById("testimonials").scrollIntoView({ behavior: "smooth" });
                                }}
                                className="inline-flex items-center justify-center px-6 sm:px-8 py-3 text-base sm:text-lg font-semibold text-white 
                                        rounded-lg shadow-lg transition-all duration-300 
                                        bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 
                                        hover:scale-105 hover:shadow-xl focus:outline-none"
                            >
                                Read Testimonials
                            </button>
                        </div>
                    </div>

                    {/* Right Image Carousel */}
                    <div className="w-full flex flex-col items-center justify-center space-y-4">
                        <div className={`overflow-hidden rounded-xl shadow-2xl ${isMobile ? 'w-full max-w-sm' : 'w-full max-w-md'}`}>
                            <motion.div
                                animate={{ x: `-${(currentHeroIndex % heroImages.length) * 100}%` }}
                                transition={{ duration: isAnimating ? 0.5 : 0, ease: "easeInOut" }}
                                className="flex"
                            >
                                {[...heroImages, ...heroImages].map((image, index) => (
                                    <img
                                        src={image}
                                        key={index}
                                        className="w-full flex-shrink-0 rounded-xl"
                                        alt={`Success story ${(index % heroImages.length) + 1}`}
                                    />
                                ))}
                            </motion.div>
                        </div>
                        <p className="font-light text-center text-gray-300 text-sm md:text-base px-4">
                            (Our industrious alumni who have made us proud)
                        </p>
                    </div>
                </div>
            </section>



            <section ref={sectionRef} className="bg-gray-50 py-12 md:py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    <div className="bg-[url('assets/bg.jpg')] border border-gray-300 rounded-xl shadow-lg p-6 md:p-10">
                        <div className="flex flex-col justify-center items-center space-y-6">
                            <h3 className="text-2xl sm:text-3xl md:text-4xl text-brand-blue font-bold text-center">
                                Celebrating Our CIA Champions!{" "}
                                {!isMobile && <span><GiConqueror className="inline h-12 w-12 md:h-16 md:w-16 text-brand-dark" /></span>}
                            </h3>
                            <p className="text-lg sm:text-xl md:text-2xl text-brand-blue font-bold text-center px-4">
                                Join the Legacy of Success with Our Elite Alumni!
                            </p>
                            <hr className="border-2 border-solid border-gray-300 w-5/6" />

                            <div className="px-4 py-2 md:px-6 md:py-3 bg-[#EFECFF] text-brand-blue border border-brand-blue rounded-lg text-lg md:text-2xl font-bold">
                                Hear from those who made it!
                            </div>

                            {/* Video Testimonials */}
                            <div className="relative flex flex-col items-center w-full pt-6">
                                <div className="overflow-hidden w-full max-w-[90vw] sm:max-w-[420px] md:max-w-[860px]">
                                    <motion.div
                                        className="flex gap-2 md:gap-4"
                                        animate={{
                                            x: `${-(currentVideoIndex * (isMobile ? 208 : 216))}px`
                                        }}
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    >
                                        {videoStories.length > 0 && [...videoStories, ...videoStories, ...videoStories].map((story, index) => {
                                            const actualIndex = index % videoStories.length;
                                            const isActive = activeVideoIndex === actualIndex;
                                            const uniqueKey = `video-${index}`;
                                            // Only render video for the FIRST matching instance
                                            const shouldRenderVideo = isActive && (index < videoStories.length || (activeVideoIndex >= videoStories.length && index >= videoStories.length && index < videoStories.length * 2) || (activeVideoIndex >= videoStories.length * 2 && index >= videoStories.length * 2));

                                            return (
                                                <div
                                                    key={uniqueKey}
                                                    className="relative h-[350px] w-[200px] flex-shrink-0 cursor-pointer"
                                                >
                                                    {shouldRenderVideo ? (
                                                        <video
                                                            ref={(el) => {
                                                                if (el) {
                                                                    videoRefs.current[uniqueKey] = el;
                                                                    // Autoplay when video element is created
                                                                    el.play().catch(err => console.log('Autoplay prevented:', err));
                                                                }
                                                            }}
                                                            src={story.videoUrl}
                                                            className="w-full h-full object-contain rounded-lg"
                                                            controls
                                                            playsInline
                                                            onPlay={() => {
                                                                // Pause all other videos when this one plays
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
                                                                // Pause all videos first
                                                                Object.values(videoRefs.current).forEach((video) => {
                                                                    if (video) video.pause();
                                                                });
                                                                Object.values(writtenVideoRefs.current).forEach((video) => {
                                                                    if (video) video.pause();
                                                                });
                                                                setActiveVideoIndex(actualIndex);
                                                                setActiveWrittenIndex(null);
                                                            }}
                                                        >
                                                            <img
                                                                src={story.thumbnailUrl}
                                                                alt={`Thumbnail for video ${actualIndex + 1}`}
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
                                <div className="flex justify-center gap-3 items-center w-full mt-6">
                                    <button
                                        type="button"
                                        className="p-2 md:p-3 rounded-full bg-brand-dark text-white hover:bg-brand-purple transition duration-300 ease-in-out"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            // Pause all videos when navigating
                                            Object.values(videoRefs.current).forEach((video) => {
                                                if (video) video.pause();
                                            });
                                            setActiveVideoIndex(null);
                                            handlePrev();
                                        }}
                                        aria-label="Previous video"
                                    >
                                        <FaChevronLeft />
                                    </button>
                                    <button
                                        type="button"
                                        className="p-2 md:p-3 rounded-full bg-brand-dark text-white hover:bg-brand-purple transition duration-300 ease-in-out"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            // Pause all videos when navigating
                                            Object.values(videoRefs.current).forEach((video) => {
                                                if (video) video.pause();
                                            });
                                            setActiveVideoIndex(null);
                                            handleNext();
                                        }}
                                        aria-label="Next video"
                                    >
                                        <FaChevronRight />
                                    </button>
                                </div>
                            </div>

                            <hr className="border-2 border-solid border-gray-300 w-5/6" />

                            <div className="px-4 py-2 md:px-6 md:py-3 bg-[#EFECFF] text-brand-blue border border-brand-blue rounded-lg text-lg md:text-2xl font-bold">
                                Read their journey!
                            </div>

                            {/* Written Testimonials */}
                            <div className="relative flex flex-col items-center w-full pt-6">
                                <div className="overflow-hidden w-full max-w-[90vw] sm:max-w-[420px] md:max-w-[860px]">
                                    <motion.div
                                        className="flex gap-2 md:gap-4"
                                        animate={{
                                            x: `${-(currentIndex * (isMobile ? 208 : 216))}px`
                                        }}
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    >
                                        {writtenStories.length > 0 && [...writtenStories, ...writtenStories, ...writtenStories].map((story, index) => {
                                            const actualIndex = index % writtenStories.length;
                                            const isActive = activeWrittenIndex === actualIndex;
                                            const uniqueKey = `written-${index}`;
                                            // Only render video for the FIRST matching instance
                                            const shouldRenderVideo = isActive && (index < writtenStories.length || (activeWrittenIndex >= writtenStories.length && index >= writtenStories.length && index < writtenStories.length * 2) || (activeWrittenIndex >= writtenStories.length * 2 && index >= writtenStories.length * 2));

                                            return (
                                                <div
                                                    key={uniqueKey}
                                                    className="relative h-[350px] w-[200px] flex-shrink-0"
                                                >
                                                    {shouldRenderVideo ? (
                                                        <video
                                                            ref={(el) => {
                                                                if (el) {
                                                                    writtenVideoRefs.current[uniqueKey] = el;
                                                                    // Autoplay when video element is created
                                                                    el.play().catch(err => console.log('Autoplay prevented:', err));
                                                                }
                                                            }}
                                                            src={story.videoUrl}
                                                            className="w-full h-full object-contain rounded-lg"
                                                            controls
                                                            playsInline
                                                            onPlay={() => {
                                                                // Pause all other videos when this one plays
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
                                                            className="absolute top-0 left-0 w-full h-full cursor-pointer rounded-lg overflow-hidden"
                                                            onClick={() => {
                                                                // Pause all videos first
                                                                Object.values(videoRefs.current).forEach((video) => {
                                                                    if (video) video.pause();
                                                                });
                                                                Object.values(writtenVideoRefs.current).forEach((video) => {
                                                                    if (video) video.pause();
                                                                });
                                                                setActiveWrittenIndex(actualIndex);
                                                                setActiveVideoIndex(null);
                                                            }}
                                                        >
                                                            <img
                                                                src={story.thumbnailUrl}
                                                                alt={`Thumbnail for video ${actualIndex + 1}`}
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

                                <div className="flex justify-center gap-3 items-center w-full mt-6">
                                    <button
                                        type="button"
                                        className="p-2 md:p-3 rounded-full bg-brand-dark text-white hover:bg-brand-purple transition duration-300 ease-in-out"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            // Pause all videos when navigating
                                            Object.values(writtenVideoRefs.current).forEach((video) => {
                                                if (video) video.pause();
                                            });
                                            setActiveWrittenIndex(null);
                                            handleWrittenPrev();
                                        }}
                                        aria-label="Previous story"
                                    >
                                        <FaChevronLeft />
                                    </button>
                                    <button
                                        type="button"
                                        className="p-2 md:p-3 rounded-full bg-brand-dark text-white hover:bg-brand-purple transition duration-300 ease-in-out"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            // Pause all videos when navigating
                                            Object.values(writtenVideoRefs.current).forEach((video) => {
                                                if (video) video.pause();
                                            });
                                            setActiveWrittenIndex(null);
                                            handleWrittenNext();
                                        }}
                                        aria-label="Next story"
                                    >
                                        <FaChevronRight />
                                    </button>
                                </div>
                            </div>

                            <p className="text-sm sm:text-base md:text-lg text-gray-800 text-center max-w-3xl font-semibold px-4 pt-4">
                                Join a growing network of accomplished CIA professionals who began their journey with us. Through discipline,
                                dedication, and our expert support, they turned their goals into success stories. Now, it's your turn to take the
                                first step.
                            </p>
                        </div>
                    </div>
                </div>
            </section>



            <div className="mx-auto text-center py-12 md:py-20 bg-gray-50 px-4">
                <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-brand-blue">
                    What Our Students Say
                </h2>
            </div>

            <SuccessTestimonials stories={imageStories} start={0} end={8} />
            <ExamTestimonials />
            <h2 className="font-display text-center text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-brand-blue py-12 px-4 bg-gray-50">
                More Success Stories
            </h2>
            <SuccessTestimonials stories={imageStories} start={8} end={20} />


        </>
    );
}

const SuccessTestimonials = ({ stories, start, end }) => {
    const displayedTestimonials = stories.slice(start, end);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isMobileView, setIsMobileView] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobileView(window.innerWidth < 768);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleImagePrev = () => {
        console.log('Prev clicked, current index:', currentImageIndex);
        setCurrentImageIndex((prev) => {
            const newIndex = prev - 1;
            console.log('New index:', newIndex);
            return newIndex;
        });
    };

    const handleImageNext = () => {
        console.log('Next clicked, current index:', currentImageIndex);
        setCurrentImageIndex((prev) => {
            const newIndex = prev + 1;
            console.log('New index:', newIndex);
            return newIndex;
        });
    };

    const cardWidth = isMobileView ? 280 : 250;
    const gap = isMobileView ? 16 : 24;

    // Safety check: if no testimonials, don't render carousel
    if (!displayedTestimonials || displayedTestimonials.length === 0) {
        return null;
    }

    return (
        <section className="py-8 md:py-12 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative flex flex-col items-center">
                    {/* Carousel Container */}
                    <div className={`overflow-hidden ${isMobileView ? 'w-full max-w-[280px]' : 'w-full max-w-[1064px]'}`}>
                        <motion.div
                            animate={{ x: `-${(currentImageIndex % displayedTestimonials.length) * (cardWidth + gap)}px` }}
                            transition={{ type: "spring", stiffness: 120, damping: 20 }}
                            className={`flex ${isMobileView ? 'gap-4' : 'gap-6'}`}
                            onAnimationComplete={() => {
                                if (currentImageIndex >= displayedTestimonials.length || currentImageIndex < 0) {
                                    setCurrentImageIndex(currentImageIndex % displayedTestimonials.length);
                                }
                            }}
                        >
                            {[...displayedTestimonials, ...displayedTestimonials, ...displayedTestimonials].map((testimonial, index) => (
                                <div
                                    key={index}
                                    className={`relative overflow-hidden transition-transform transform hover:scale-105 flex-shrink-0 ${isMobileView ? 'w-[280px]' : 'w-[250px]'}`}
                                >
                                    <img
                                        src={testimonial.thumbnailUrl}
                                        alt={testimonial.name || `Success story ${index + 1}`}
                                        className="w-full h-auto object-contain py-4"
                                    />
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Navigation Arrows */}
                    <div className="relative z-50 flex justify-center gap-3 items-center w-full mt-6">
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
                </div>
            </div>
        </section>
    );
};

const ExamTestimonials = () => {
    const testimonials = [
        {
            name: "Pinky Agarwal",
            designation: "Head Internal Audit | Emami Limited",
            text: "For anyone preparing for the CIA Challenge Exam, I cannot recommend the Prep Course enough. This program is designed to simplify the learning process and help you stay disciplined with your studies. Arpit Garg, who led the sessions, brought an incredible level of dedication, passion, enthusiasm and expertise to the table.",
            image: pinkyPhoto,
        },
        {
            name: "Akshdeep Singh",
            designation: "Manager | KPMG",
            text: "The CIA Challenge Exam Crash Course, offered and delivered by faculty member Arpit Garg, played a key role in helping me clear the CIA Challenge Exam on my first attempt after just 2 months of preparation. The crash course sessions, held over weekends, were well-planned, thorough, and provided attendees with opportunities.",
            image: akshdeepSingh,
        },
        {
            name: "Starwin PJ",
            designation: "AVP | Wells Fargo",
            text: "Attended the “CIA Challenge Exam” crash course conducted by Mr. Arpit, and it was truly an outstanding learning experience. The sessions were thoughtfully structured, covering the entire syllabus with a perfect balance of depth and clarity. The interactive approach ensured key topics were highlighted.",
            image: testimonialTwo,
        },
    ];

    return (
        <section id="testimonials" aria-label="What our customers are saying" className="bg-gray-50 py-12 md:py-20 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
                <div className="mx-auto max-w-2xl text-center mb-12 md:mb-16">
                    <h2 className="font-display text-2xl sm:text-3xl font-bold text-brand-blue">
                        Real Results from CIA Challenge Exam Training
                    </h2>
                </div>
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {testimonials.map((testimonial, index) => (
                        <li key={index}>
                            <figure className="relative border border-gray-300 rounded-2xl bg-white p-6 shadow-xl shadow-slate-900/10 h-full flex flex-col">
                                <svg
                                    aria-hidden="true"
                                    width="105"
                                    height="78"
                                    className="absolute left-6 top-6 fill-slate-100"
                                >
                                    <path d="M25.086 77.292c-4.821 0-9.115-1.205-12.882-3.616..." />
                                </svg>
                                <blockquote className="relative flex-1">
                                    <p className="text-base md:text-lg text-slate-900">{testimonial.text}</p>
                                </blockquote>
                                <figcaption className="relative mt-6 flex items-center justify-between border-t border-slate-100 pt-6">
                                    <div>
                                        <div className="font-display text-base text-slate-900">{testimonial.name}</div>
                                        <div className="font-display text-sm text-brand-gray">{testimonial.designation}</div>
                                    </div>
                                    <div className="overflow-hidden rounded-full bg-slate-50 flex-shrink-0">
                                        <img
                                            alt=""
                                            className="h-14 w-14 object-cover"
                                            src={testimonial.image}
                                        />
                                    </div>
                                </figcaption>
                            </figure>
                        </li>
                    ))}
                </ul>
            </div>
        </section>


    )
}
