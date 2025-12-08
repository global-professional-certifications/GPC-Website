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

    const handlePrev = () => {
        setCurrentVideoIndex((prev) => (prev === 0 ? Math.max(0, videoStories.length - 4) : prev - 1));
    };

    const handleNext = () => {
        setCurrentVideoIndex((prev) => (prev >= videoStories.length - 4 ? 0 : prev + 1));
    };

    const handleWrittenPrev = () => {
        setCurrentIndex((prev) => (prev === 0 ? Math.max(0, writtenStories.length - 4) : prev - 1));
    };

    const handleWrittenNext = () => {
        setCurrentIndex((prev) => (prev >= writtenStories.length - 4 ? 0 : prev + 1));
    };

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

            <section className={`h-screen w-full bg-brand-blue flex justify-cennter items-center md:h-screen md:pt-${height.toString()}`}>
                <div className="md:py-[161px] flex flex-col gap-6 max-w-[25rem] md:grid md:grid-cols-2 md:max-w-[72rem] md:gap-8 md:mx-auto mt-16">
                    <div className="relative flex justify-center h-full items-center md:gap-32">
                        <div className="relative z-10 flex flex-col justify-center items-start h-full">

                            <h1 className="mt-6 text-xl sm:text-4xl md:text-6xl font-bold leading-tight text-white">
                                Ready to create <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">your own</span> success story?
                            </h1>

                            <h2 className="mt-4 text-base sm:text-lg md:text-lg text-gray-200 max-w-lg leading-relaxed">Discover our <span className='font-bold text-orange-400'>certification programs</span> and take the next step to <span className='font-bold text-orange-400'>advance your career</span> today!
                            </h2>

                            <div className="mt-8">
                                <button
                                    onClick={() => {
                                        document.getElementById("testimonials").scrollIntoView({ behavior: "smooth" });
                                    }}
                                    className="inline-flex items-center justify-center px-8 py-3 text-lg font-semibold text-white 
                                            rounded-lg shadow-lg transition-all duration-300 
                                            bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 
                                            hover:scale-105 hover:shadow-xl focus:outline-none"
                                >
                                    Read Testimonials

                                </button>
                            </div>
                        </div>
                    </div>
                    {!isMobile ? <div className="relative flex flex-col justify-center items-center h-96">
                        <div className="overflow-hidden w-[460px] rounded-xl shadow-2xl">
                            <motion.div
                                animate={{ x: `-${currentHeroIndex * 460}px` }}
                                transition={{ duration: isAnimating ? 0.5 : 0, ease: "easeInOut" }}
                                className="flex rounded-xl">
                                {heroImages.map((image, index) => (
                                    <img src={image} key={index} className="w-[460px] rounded-xl shrink-0 mb-2" />
                                ))}
                            </motion.div>
                        </div>
                        <p className=" font-light text-center text-gray-300 text-sm md:text-base mt-4">(Our industrious alumni who have made us proud)</p>
                    </div> : <div className="relative flex flex-col items-center">
                        <div className="overflow-hidden w-[300px] rounded-xl">
                            <motion.div
                                animate={{ x: `-${currentHeroIndex * 300}px` }}
                                transition={{ duration: isAnimating ? 0.5 : 0, ease: "easeInOut" }}
                                className="flex rounded-xl">
                                {heroImages.map((image, index) => (
                                    <img src={image} key={index} className="w-[300px] rounded-xl shrink-0 mb-2" />
                                ))}
                            </motion.div>
                        </div>
                        <p className="font-poppins font-light text-white text-sm mt-4">(Our industrious alumni who have made us proud)</p>
                    </div>}

                </div>
            </section>


            <section ref={sectionRef} className="bg-gray-50 pb-10 pt-20">
                <div className="bg-[url('assets/bg.jpg')] max-w-5xl mx-auto border border-gray-300 pb-10 rounded-xl shadow-lg">
                    <div className="md:flex md:flex-col justify-center items-center">
                        <h3 className="text-2xl sm:text-3xl text-brand-blue font-bold pt-10 px-4 md:px-0 text-center">
                            Celebrating Our CIA Champions!{" "}
                            {!isMobile ? <span><GiConqueror className="inline h-16 w-16 pb-4 text-brand-dark" /></span> : null}
                        </h3>
                        <p className="text-xl sm:text-2xl text-brand-blue font-bold pt-1 px-12 md:px-0 text-center">
                            Join the Legacy of Success with Our Elite Alumni!
                        </p>
                        <hr className="mt-6 mb-4 border-2 border-solid border-gray-300 w-5/6 mx-auto"></hr>
                        {/* <h3 className="text-3xl sm:text-2xl text-brand-blue font-bold pt-3">
                        Hear from those who made it!
                    </h3> */}
                        <div className="md:mt-6 px-3 py-1.5 md:px-6 md:py-1.5 bg-[#EFECFF] text-brand-blue border border-brand-blue rounded-lg md:text-2xl font-bold block mx-auto md:inline">Hear from those who made it!</div>

                        {/* Video Testimonials */}

                        <div className="relative flex flex-col items-center pt-10">
                            <div className={`${!isMobile ? "w-[848px]" : "w-[408px]"} overflow-hidden`}>

                                < motion.div className="flex gap-4"
                                    animate={{ x: `-${currentVideoIndex * (200 + (!isMobile ? 16 : 8))}px` }}
                                    transition={{ type: "spring", stiffness: 120, damping: 20 }}
                                >
                                    {videoStories.map((story, index) => (
                                        <motion.div
                                            key={index}
                                            className="relative h-[350px] w-[200px] flex-shrink-0 cursor-pointer"
                                        >
                                            <AnimatePresence>
                                                {activeVideoIndex === index ? (
                                                    <motion.video
                                                        key="video"
                                                        src={story.videoUrl}
                                                        className="w-full h-full object-contain rounded-lg fullscreen:h-screen fullscreen:w-screen fullscreen:object-contain"
                                                        controls
                                                        autoPlay
                                                        playsInline
                                                        initial={{ opacity: 0, scale: 0.95 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        exit={{ opacity: 0, scale: 0.95 }}
                                                        transition={{ duration: 0.3 }}
                                                    />
                                                ) : (
                                                    <motion.div
                                                        key="thumbnail"
                                                        className="absolute inset-0"
                                                        onClick={() => {
                                                            setActiveVideoIndex(index);
                                                            setActiveWrittenIndex(null);
                                                        }}
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        exit={{ opacity: 0 }}
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
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </div>

                            {/* Carousel Arrows */}
                            <div className="flex justify-center gap-2 items-center px-4 w-full mt-6">
                                <div className="p-2 rounded-full bg-brand-dark text-white hover:cursor-pointer hover:bg-brand-purple transition duration-300 ease-in-out" onClick={handlePrev}>
                                    <FaChevronLeft />
                                </div>
                                <div className="p-2 rounded-full bg-brand-dark text-white hover:cursor-pointer hover:bg-brand-purple transition duration-300 ease-in-out" onClick={handleNext}>
                                    <FaChevronRight />
                                </div>
                            </div>
                        </div>


                        <hr className="mt-6 border-2 border-solid border-gray-300 w-5/6 mx-auto"></hr>

                        {/* <h4 className="text-3xl sm:text-2xl text-brand-blue font-bold mt-8">Read their journey!</h4> */}
                        <div className="block md:inline mx-auto mt-4 md:mt-10 px-3 py-1.5 md:px-6 md:py-1.5 bg-[#EFECFF] text-brand-blue border border-brand-blue rounded-lg md:text-2xl font-bold">Read their journey!</div>

                        {/* Written Testimonials */}

                        {!isMobile ? (
                            <div className="relative flex flex-col items-center pt-10">
                                <div className="overflow-hidden w-[848px]">
                                    <motion.div
                                        animate={{ x: `-${currentIndex * (200 + 16)}px` }}
                                        transition={{ type: "spring", stiffness: 120, damping: 20 }}
                                        className="flex gap-4"
                                    >
                                        {writtenStories.map((story, index) => (
                                            <motion.div
                                                key={index}
                                                className="relative h-[350px] w-[200px] flex-shrink-0"
                                            >
                                                <AnimatePresence>
                                                    {activeWrittenIndex === index ? (
                                                        <motion.video
                                                            key="video"
                                                            src={story.videoUrl}
                                                            className="w-full h-full object-contain rounded-lg fullscreen:h-screen fullscreen:w-screen fullscreen:object-screen"
                                                            controls
                                                            autoPlay
                                                            playsInline
                                                            initial={{ opacity: 0, scale: 0.95 }}
                                                            animate={{ opacity: 1, scale: 1 }}
                                                            exit={{ opacity: 0, scale: 0.95 }}
                                                            transition={{ duration: 0.3 }}
                                                        />
                                                    ) : (
                                                        <motion.div
                                                            key="thumbnail"
                                                            className="absolute top-0 left-0 w-full h-full cursor-pointer rounded-lg overflow-hidden"
                                                            onClick={() => {
                                                                setActiveWrittenIndex(index);
                                                                setActiveVideoIndex(null);
                                                            }}
                                                            initial={{ opacity: 0.6 }}
                                                            animate={{ opacity: 1 }}
                                                            exit={{ opacity: 0.6 }}
                                                            transition={{ duration: 0.3 }}
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
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                </div>

                                <div className="flex justify-center gap-2 items-center px-4 w-full mt-6">
                                    <div
                                        className="p-2 rounded-full bg-brand-dark text-white hover:cursor-pointer hover:bg-brand-purple transition duration-300 ease-in-out"
                                        onClick={handleWrittenPrev}
                                    >
                                        <FaChevronLeft />
                                    </div>
                                    <div
                                        className="p-2 rounded-full bg-brand-dark text-white hover:cursor-pointer hover:bg-brand-purple transition duration-300 ease-in-out"
                                        onClick={handleWrittenNext}
                                    >
                                        <FaChevronRight />
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="relative flex flex-col items-center pt-10">
                                <div className="overflow-hidden w-[408px]">
                                    <motion.div
                                        animate={{ x: `-${currentIndex * (200 + 8)}px` }}
                                        transition={{ type: "spring", stiffness: 120, damping: 20 }}
                                        className="flex gap-2"
                                    >
                                        {writtenStories.map((story, index) => (
                                            <motion.div
                                                key={index}
                                                className="relative h-[350px] w-[200px] flex-shrink-0"
                                            >
                                                <AnimatePresence>
                                                    {activeWrittenIndex === index ? (
                                                        <motion.video
                                                            key="video"
                                                            src={story.videoUrl}
                                                            className="w-full h-full object-cover rounded"
                                                            controls
                                                            autoPlay
                                                            playsInline
                                                            initial={{ opacity: 0, scale: 0.95 }}
                                                            animate={{ opacity: 1, scale: 1 }}
                                                            exit={{ opacity: 0, scale: 0.95 }}
                                                            transition={{ duration: 0.3 }}
                                                        />
                                                    ) : (
                                                        <motion.div
                                                            key="thumbnail"
                                                            className="absolute top-0 left-0 w-full h-full cursor-pointer rounded-lg overflow-hidden"
                                                            onClick={() => setActiveWrittenIndex(index)}
                                                            initial={{ opacity: 0.6 }}
                                                            animate={{ opacity: 1 }}
                                                            exit={{ opacity: 0.6 }}
                                                            transition={{ duration: 0.3 }}
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
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                </div>

                                <div className="flex justify-center gap-2 items-center px-4 w-full mt-6">
                                    <div
                                        className="p-2 rounded-full bg-brand-dark text-white hover:cursor-pointer hover:bg-brand-purple transition duration-300 ease-in-out"
                                        onClick={handleWrittenPrev}
                                    >
                                        <FaChevronLeft />
                                    </div>
                                    <div
                                        className="p-2 rounded-full bg-brand-dark text-white hover:cursor-pointer hover:bg-brand-purple transition duration-300 ease-in-out"
                                        onClick={handleWrittenNext}
                                    >
                                        <FaChevronRight />
                                    </div>
                                </div>
                            </div>
                        )}




                        <p className="select-none px-2 sm:px-0 sm:text-lg sm:text-xl text-gray-800 mt-8 text-center max-w-3xl font-semibold">
                            Join a growing network of accomplished CIA professionals who began their journey with us. Through discipline,
                            dedication, and our expert support, they turned their goals into success stories. Now, it's your turn to take the
                            first step.
                        </p>
                    </div>
                </div >
            </section >



            <div className="mx-auto text-center pt-[80px] pb-20 bg-gray-50">
                <h2 className="font-display text-3xl font-bold tracking-tight text-brand-blue sm:text-4xl">
                    What Our Students Say
                </h2>
            </div>

            <SuccessTestimonials stories={imageStories} start={0} end={8} /> {/* First 8 testimonials */}
            <ExamTestimonials />
            <h2 className="font-display text-center text-3xl font-bold tracking-tight text-brand-blue sm:text-4xl pb-12 bg-gray-50">
                More Success Stories
            </h2>
            <SuccessTestimonials stories={imageStories} start={8} end={20} /> {/* Remaining 13 testimonials */}
            <div className="pb-20 bg-gray-50"></div>

        </>
    );
}

const SuccessTestimonials = ({ stories, start, end }) => {
    // Slice the array based on start and end props
    const displayedTestimonials = stories.slice(start, end);

    return (
        <section className="py-12 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {displayedTestimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className="relative overflow-hidden border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
                        >
                            <img
                                src={testimonial.thumbnailUrl}
                                alt={testimonial.name}
                                className="w-full h-[338.4px] object-contain py-4"
                            />
                        </div>
                    ))}
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
        <section id="testimonials" aria-label="What our customers are saying" className="bg-gray-50 pb-20 md:pb-[140px] pt-20 ">
            <div className="mx-auto max-w-sm md:max-w-[76rem] px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="font-display text-3xl font-bold text-brand-blue sm:text-3xl">
                        Real Results from CIA Challenge Exam Training
                    </h2>
                </div>
                <ul className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:gap-8 lg:mt-20 lg:max-w-none lg:grid-cols-3">
                    {testimonials.map((testimonial, index) => (
                        <li key={index}>
                            <figure className="relative border border-gray-300 rounded-2xl bg-white p-6 shadow-xl shadow-slate-900/10">
                                <svg
                                    aria-hidden="true"
                                    width="105"
                                    height="78"
                                    className="absolute left-6 top-6 fill-slate-100"
                                >
                                    <path d="M25.086 77.292c-4.821 0-9.115-1.205-12.882-3.616..." />
                                </svg>
                                <blockquote className="relative">
                                    <p className="text-lg text-slate-900">{testimonial.text}</p>
                                </blockquote>
                                <figcaption className="relative mt-6 flex items-center justify-between border-t border-slate-100 pt-6">
                                    <div>
                                        <div className="font-display text-base text-slate-900">{testimonial.name}</div>
                                        <div className="font-display text-sm text-brand-gray">{testimonial.designation}</div>
                                    </div>
                                    <div className="overflow-hidden rounded-full bg-slate-50">
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
