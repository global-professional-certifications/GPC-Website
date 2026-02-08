import React, { useState, useRef, useEffect, useMemo } from "react";
import { client } from "../../lib/sanity/client";
import { urlFor } from "../../lib/sanity/imageBuilder";
import { GiConqueror } from "react-icons/gi";

import MetaTags from "../MetaTags";
import { height } from "../Notifications/NotificationBanner";

import { SchemaMarkup, getBreadcrumbSchema, getWebPageSchema, getReviewSchema, getAggregateRatingSchema } from "../Schema";

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

// Course Toggle Component - horizontal toggle buttons
const CourseToggle = ({ courses, activeCourse, setActiveCourse }) => {
    if (courses.length === 0) return null;

    return (
        <div className="flex flex-wrap justify-center gap-2 md:gap-3">
            {courses.map((course) => (
                <button
                    key={course._id}
                    onClick={() => setActiveCourse(course.slug)}
                    className={`px-4 py-2 md:px-6 md:py-2.5 rounded-full font-semibold text-sm md:text-base transition-all duration-300
                        ${activeCourse === course.slug
                            ? 'bg-brand-blue text-white shadow-lg scale-105'
                            : 'bg-white text-gray-700 hover:bg-gray-100 hover:text-brand-blue border border-gray-300'
                        }`}
                >
                    {course.name}
                </button>
            ))}
        </div>
    );
};

export default function SuccessStories() {
    // Dynamic courses from Sanity
    const [courses, setCourses] = useState([]);
    const [activeCourse, setActiveCourse] = useState(null);

    // All stories from Sanity
    const [allStories, setAllStories] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch courses on mount - only courses that have at least one testimonial
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                // Get courses that have at least one testimonial
                const query = `*[_type == "testimonialCourse" && isActive == true] | order(order asc) {
                    _id,
                    name,
                    fullName,
                    "slug": slug.current,
                    "testimonialCount": count(*[_type == "successStory" && course._ref == ^._id])
                }`;
                const data = await client.fetch(query);
                // Filter to only show courses with testimonials
                const coursesWithContent = data.filter(c => c.testimonialCount > 0);
                console.log("Fetched courses with content:", coursesWithContent);
                setCourses(coursesWithContent);
                if (coursesWithContent.length > 0) {
                    setActiveCourse(coursesWithContent[0].slug);
                }
            } catch (error) {
                console.error("Error fetching courses:", error);
            }
        };
        fetchCourses();
    }, []);

    // Fetch all stories on mount
    useEffect(() => {
        const fetchStories = async () => {
            try {
                const query = `*[_type == "successStory"] | order(order asc) {
                    _id,
                    name,
                    "courseSlug": course->slug.current,
                    "courseName": course->name,
                    category,
                    "thumbnailUrl": thumbnail.asset->url,
                    "videoUrl": video.asset->url
                }`;
                const data = await client.fetch(query);
                console.log("Fetched success stories:", data);
                setAllStories(data);
            } catch (error) {
                console.error("Error fetching success stories:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchStories();
    }, []);

    // Filter stories by active course
    const courseStories = useMemo(() => {
        if (!activeCourse) return [];
        return allStories.filter(story => story.courseSlug === activeCourse);
    }, [allStories, activeCourse]);

    // Derived filtered data
    const videoStories = useMemo(() => courseStories.filter(s => s.category === 'video'), [courseStories]);
    const writtenStories = useMemo(() => courseStories.filter(s => s.category === 'written'), [courseStories]);
    const imageStories = useMemo(() => courseStories.filter(s => s.category === 'image'), [courseStories]);

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

    const [currentHeroIndex, setCurrentHeroIndex] = useState(0)
    const [isAnimating, setIsAnimating] = useState(true)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentHeroIndex(prev => prev + 1);
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
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

    // Breadcrumb Schema
    const breadcrumbSchema = getBreadcrumbSchema([
        { name: "Home", url: "https://globalprofessionalcertifications.com" },
        { name: "Success Stories", url: "https://globalprofessionalcertifications.com/success" }
    ]);

    // WebPage Schema  
    const webPageSchema = getWebPageSchema({
        name: "CIA Exam Success Stories – Real Achievements",
        description: "Read inspiring success stories of students who cleared CIA, CISA, CRMA, and IAP certifications with Global Professional Certifications.",
        url: "https://globalprofessionalcertifications.com/success"
    });

    // Aggregate Rating Schema for GPC courses
    const aggregateRatingSchema = getAggregateRatingSchema({
        ratingValue: "4.9",
        reviewCount: "150",
        bestRating: "5",
        worstRating: "1"
    });

    return (
        <>
            <SchemaMarkup schema={[breadcrumbSchema, webPageSchema, aggregateRatingSchema]} />
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


            {/* Testimonials Section - Toggle Layout */}
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

                    {/* Course Toggle */}
                    <div className="mb-8">
                        <CourseToggle
                            courses={courses}
                            activeCourse={activeCourse}
                            setActiveCourse={setActiveCourse}
                        />
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
                                    {courses.find(c => c.slug === activeCourse)?.name || 'Course'} Champions
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
                                        <div className="px-4 py-2 md:px-6 md:py-3 bg-[#EFECFF] text-brand-blue border border-brand-blue rounded-lg text-lg md:text-2xl font-bold">
                                            Hear from those who made it!
                                        </div>

                                        <div className="relative flex flex-col items-center w-full pt-6">
                                            {/* Container for 5 videos */}
                                            <div className="overflow-hidden w-full max-w-[280px] sm:max-w-[400px] md:max-w-[1080px]">
                                                <motion.div
                                                    className="flex gap-2 md:gap-4"
                                                    animate={{
                                                        x: `${-(currentVideoIndex * (isMobile ? 288 : 216))}px`
                                                    }}
                                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                                >
                                                    {videoStories.map((story, index) => {
                                                        const isActive = activeVideoIndex === index;
                                                        const uniqueKey = `video-${activeCourse}-${index}`;

                                                        return (
                                                            <div
                                                                key={uniqueKey}
                                                                className="relative h-[350px] w-[200px] flex-shrink-0 cursor-pointer"
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

                                            {/* Carousel Arrows - only show if more than 5 videos */}
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
                                                        aria-label="Previous video"
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
                                                        aria-label="Next video"
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
                                        <div className="px-4 py-2 md:px-6 md:py-3 bg-[#EFECFF] text-brand-blue border border-brand-blue rounded-lg text-lg md:text-2xl font-bold">
                                            Read their journey!
                                        </div>

                                        <div className="relative flex flex-col items-center w-full pt-6">
                                            {/* Container for 5 videos */}
                                            <div className="overflow-hidden w-full max-w-[280px] sm:max-w-[400px] md:max-w-[1080px]">
                                                <motion.div
                                                    className="flex gap-2 md:gap-4"
                                                    animate={{
                                                        x: `${-(currentIndex * (isMobile ? 288 : 216))}px`
                                                    }}
                                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                                >
                                                    {writtenStories.map((story, index) => {
                                                        const isActive = activeWrittenIndex === index;
                                                        const uniqueKey = `written-${activeCourse}-${index}`;

                                                        return (
                                                            <div
                                                                key={uniqueKey}
                                                                className="relative h-[350px] w-[200px] flex-shrink-0 cursor-pointer"
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

                                            {/* Carousel Arrows - only show if more than 5 videos */}
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
                                                        aria-label="Previous story"
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
                                                        aria-label="Next story"
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


            {/* Mobile Screenshots Section - Only show if has content */}
            {imageStories.length > 0 && (
                <>
                    <div className="mx-auto text-center py-12 md:py-20 bg-gray-50 px-4">
                        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-brand-blue">
                            What Our Students Say
                        </h2>
                    </div>
                    <SuccessTestimonials stories={imageStories} start={0} end={8} activeCourse={activeCourse} />
                    <SuccessTestimonials stories={imageStories} start={8} end={20} activeCourse={activeCourse} />
                </>
            )}


            <ExamTestimonials />


        </>
    );
}

const SuccessTestimonials = ({ stories, start, end, activeCourse }) => {
    const displayedTestimonials = stories.slice(start, end);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isMobileView, setIsMobileView] = useState(false);

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
                                    key={`${activeCourse}-${index}`}
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
            text: "Attended the 'CIA Challenge Exam' crash course conducted by Mr. Arpit, and it was truly an outstanding learning experience. The sessions were thoughtfully structured, covering the entire syllabus with a perfect balance of depth and clarity. The interactive approach ensured key topics were highlighted.",
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
