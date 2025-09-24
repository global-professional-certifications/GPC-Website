import React, { useState, useRef, useEffect } from "react";
import studentTestimonialOne from "../../assets/testimonial-mobile-screenshot-1.png"
import studentTestimonialTwo from "../../assets/testimonial-mobile-screenshot-2.png"
import studentTestimonialThree from "../../assets/testimonial-mobile-screenshot-3.png"
import studentTestimonialFour from "../../assets/testimonial-mobile-screenshot-4.png"
import studentTestimonialSix from "../../assets/Testimonial-screenshot-1.png"
import studentTestimonialEight from "../../assets/Testimonial-screenshot-3.png"
import studentTestimonialNine from "../../assets/Testimonial-screenshot-4.png"
import studentTestimonialTen from "../../assets/Testimonial-screenshot-5.png"
import studentTestimonialEleven from "../../assets/Testimonial-screenshot-6.png"
import studentTestimonialTwelve from "../../assets/Testimonial-screenshot-7.png"
import studentTestimonialThirteen from "../../assets/Testimonial-screenshot-8.png"
import studentTestimonialFourteen from "../../assets/Testimonial-screenshot-9.png"
import studentTestimonialFifteen from "../../assets/Testimonial-screenshot-10.png"
import studentTestimonialSixteen from "../../assets/Testimonial-screenshot-11.png"
import studentTestimonialSeventeen from "../../assets/Testimonial-screenshot-12.png"
import studentTestimonialEighteen from "../../assets/Testimonial-screenshot-13.png"
import studentTestimonialNineteen from "../../assets/Testimonial-screenshot-14.png"
import studentTestimonialTwenty from "../../assets/Testimonial-screenshot-15.png"
import studentTestimonialTwentyOne from "../../assets/Testimonial-screenshot-16.png"
import vinodKumarTestimonial from "../../assets/Vinod-kumar-testimonial-wapp.png"
import { GiConqueror } from "react-icons/gi";
import pinkyPhoto from "../../assets/pinky-photo.jpg";
import akshdeepSingh from "../../assets/akshdeep-singh.png";
import testimonialTwo from "../../assets/testimonial-2.png";

import MetaTags from "../MetaTags";
import { height } from "../Notifications/NotificationBanner";



// Thumbnails

import ranveerThumbnail from "../../assets/thumbnails/Ranveer-thumbnail.png"
import bhargavThumbnail from "../../assets/thumbnails/Bhargav-thumbnail.png"
import archanaThumbnail from "../../assets/thumbnails/Archana-thumbnail.png"
import sachinThumbnail from "../../assets/thumbnails/Sachin-thumbnail.png"
import jigneshThumbnail from "../../assets/thumbnails/Jignesh-thumbnail.png"
import wajihaThumbnail from "../../assets/thumbnails/Wajiha-thumbnail.png"
import ajayThumbnail from "../../assets/thumbnails/Ajay-kumar-thumbnail.png"
import harishankarThumbnail from "../../assets/thumbnails/Harishankar-thumbnail.png"
import fazilThumbnail from "../../assets/thumbnails/Fazil-thumbnail.png"
import amitThumbnail from "../../assets/thumbnails/Amit-mayani-thumbnail.png"
import vijayThumbnail from "../../assets/thumbnails/Vijay-thumbnail.png"
import vishalThumbnail from "../../assets/thumbnails/Vishal-thumbnail.png"
import danishThumbnail from "../../assets/thumbnails/Danish-thumbnail.png"
import simranThumbnail from "../../assets/thumbnails/Simran-garg-thumbnail.png"
import sivaThumbnail from "../../assets/thumbnails/Siva-subramanian-thumbnail.png"
import sanjeevThumbnail from "../../assets/thumbnails/Sanjeev-kumar-thumbnail.png"
import murtuzaThumbnail from "../../assets/thumbnails/Murtuza-quresh-thumbnail.png"
import prathwiThumbnail from "../../assets/thumbnails/Prathwi-shetty-thumbnail.png"
import pramodThumbnail from "../../assets/thumbnails/Pramod-pujari-thumbnail.png"
import simranjeetThumbnail from "../../assets/thumbnails/Simranjeet-thumbnail.png"
import deepakThumbnail from "../../assets/thumbnails/Deepak-thumbnail.png"
import priyankaThumbnail from "../../assets/thumbnails/Priyanka-thumbnail.png"
import deepakGargThumbnail from "../../assets/thumbnails/Deepak-garg-thumbnail.png"
import hemaThumbnail from "../../assets/thumbnails/hema-chavan-thumbnail.png"
import lokeshwarThumbnail from "../../assets/thumbnails/lokeshwar-raju-thumbnail.png"



// Video Testimonials

import bhargavTestimonial from "../../assets/video-testimonials/bhargav-tej.mp4"
import harishankarTestimonial from "../../assets/video-testimonials/harishankar-joshi.mp4"
import sachinTestimonial from "../../assets/video-testimonials/Sachin-testimonial.mp4"
import jigneshTestimonial from "../../assets/video-testimonials/Jignesh-testimonial.mp4"
import archanaTestimonial from "../../assets/video-testimonials/archana-tiwari.mp4"
import ranveerTestimonial from "../../assets/video-testimonials/ranveer-singh-negi.mp4"
import amitTestimonial from "../../assets/video-testimonials/amit-mayani.mp4"
import vishalTestimonial from "../../assets/video-testimonials/vishal-gupta.mp4"
import pramodTestimonial from "../../assets/video-testimonials/pramod-pujari.mp4"
import simranGargTestimonial from "../../assets/video-testimonials/simran-garg.mp4"
import murtuzaTestimonial from "../../assets/video-testimonials/murtaza-quresh.mp4"
import sivaSubramanianCiaTestimonial from "../../assets/video-testimonials/siva-subramanian.mp4"
import sanjeevKumarTestimonialVideo from "../../assets/video-testimonials/sanjeev-kumar.mp4"
import prathwiShettyTestimonial from "../../assets/video-testimonials/prathwi-shetty.mp4"
import hemaTestimonial from "../../assets/video-testimonials/hema-chavan.mp4"
import lokeshwarTestimonial from "../../assets/video-testimonials/lokeshwar-raju.mp4"



// Written Testimonials

import priyankaWrittenTestimonial from "../../assets/written-testimonials/priyanka-paul.mp4"
import deepakWrittenTestimonial from "../../assets/written-testimonials/deepak-kumar-garg.mp4"
import simranjeetWrittenTestimonial from "../../assets/written-testimonials/simranjeet-kaur.mp4"
import danishTestimonial from "../../assets/written-testimonials/md-danish.mp4"
import vijayTestimonial from "../../assets/written-testimonials/vijay-singhal.mp4"
import fazilTestimonial from "../../assets/written-testimonials/fazil-musthafa.mp4"
import deepakGargTestimonial from "../../assets/written-testimonials/deepak-garg.mp4"
import wajihaTestimonial from "../../assets/written-testimonials/wajiha-ansari.mp4"
import ajayTestimonial from "../../assets/written-testimonials/ajay-kumar-sharma.mp4"


import agmIiaDelhiChapterOne from "../../assets/AGM-IIA-Delhi/AGM-IIA-Delhi-9-success.png"
import agmIiaDelhiChapterTwo from "../../assets/AGM-IIA-Delhi/AGM-IIA-Delhi-7-success.png"

import { GoDotFill } from "react-icons/go";

import passoutStudents from "../../assets/Passout-students.jpeg"
import wofaFive from "../../assets/wofa-2025/wofa-5.jpeg"
import iiaHyderabadOne from "../../assets/iia-hyderabad/iia-hyderabad-1.jpeg"

import { MotionConfig, motion, AnimatePresence } from "motion/react";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";

export default function SuccessStories() {

    const testimonialVideos = [
        bhargavTestimonial,
        ranveerTestimonial,
        archanaTestimonial,
        jigneshTestimonial,
        sachinTestimonial,
        harishankarTestimonial,
        amitTestimonial,
        simranGargTestimonial,
        murtuzaTestimonial,
        prathwiShettyTestimonial,
        pramodTestimonial,
        vishalTestimonial,
        sanjeevKumarTestimonialVideo,
        sivaSubramanianCiaTestimonial,
        hemaTestimonial,
        lokeshwarTestimonial
    ]

    const writtenTestimonials = [
        ajayTestimonial,
        wajihaTestimonial,
        deepakGargTestimonial,
        fazilTestimonial,
        vijayTestimonial,
        danishTestimonial,
        priyankaWrittenTestimonial,
        simranjeetWrittenTestimonial,
        deepakWrittenTestimonial,
    ]

    const videoThumbnails = [
        bhargavThumbnail,
        ranveerThumbnail,
        archanaThumbnail,
        jigneshThumbnail,
        sachinThumbnail,
        harishankarThumbnail,
        amitThumbnail,
        simranThumbnail,
        murtuzaThumbnail,
        prathwiThumbnail,
        pramodThumbnail,
        vishalThumbnail,
        sanjeevThumbnail,
        sivaThumbnail,
        hemaThumbnail,
        lokeshwarThumbnail
    ]

    const writtenThumbnails = [
        ajayThumbnail,
        wajihaThumbnail,
        deepakGargThumbnail,
        fazilThumbnail,
        vijayThumbnail,
        danishThumbnail,
        priyankaThumbnail,
        simranjeetThumbnail,
        deepakThumbnail,
    ]

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
        setCurrentVideoIndex((prev) => (prev === 0 ? testimonialVideos.length - 4 : prev - 1));
    };

    const handleNext = () => {
        setCurrentVideoIndex((prev) => (prev === testimonialVideos.length - 4 ? 0 : prev + 1));
    };

    const handleWrittenPrev = () => {
        setCurrentIndex((prev) => (prev === 0 ? writtenTestimonials.length - 4 : prev - 1));
    };

    const handleWrittenNext = () => {
        setCurrentIndex((prev) => (prev === writtenTestimonials.length - 4 ? 0 : prev + 1));
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
            <MetaTags
                title="CIA Exam Success Stories – Real Achievements"
                description="Hear from professionals who passed the CIA Challenge Exam with our guidance. Discover how our course made a difference in their careers."
                canonicalUrl="https://globalprofessionalcertifications.com/success"
            />
            <section className={`h-screen w-full bg-brand-blue flex justify-center items-center md:h-screen md:pt-${height.toString()}`}>
                <div className="md:py-[161px] flex flex-col gap-6 max-w-[25rem] md:grid md:grid-cols-2 md:max-w-[72rem] md:gap-8 md:mx-auto">
                    <div className="relative flex justify-center h-full items-center md:gap-32">
                        <div className="px-4 md:px-0">
                            <h1 className="font-bold text-2xl md:text-4xl pt-12 md:pt-0 pb-4 md:pb-8 text-gray-50">Success Stories: CIA-Certified Professionals on Career Growth</h1>
                            <h3 className="font-semibold text-lg md:text-2xl pb-4 md:pb-8 text-gray-50">Join over 250 professionals who have elevated their careers with the Certified Internal Auditor (CIA) certification.</h3>
                            <div className="flex justify-center md:justify-start">
                                <a href="#testimonials"><button className="px-6 py-2 md:py-3 md:px-6 md:text-xl bg-orange-500 text-gray-50 font-semibold transition ease-in-out duration-300 hover:bg-gray-50 hover:text-black rounded-lg">Read Testimonials below</button></a>
                            </div>
                        </div>
                    </div>
                    {!isMobile ? <div className="relative flex flex-col items-center">
                        <div className="overflow-hidden w-[560px] rounded-xl">
                            <motion.div
                                animate={{ x: `-${currentHeroIndex * 560}px` }}
                                transition={{ duration: isAnimating ? 0.5 : 0, ease: "easeInOut" }}
                                className="flex rounded-xl">
                                {heroImages.map((image, index) => (
                                    <img src={image} key={index} className="w-[560px] rounded-xl shrink-0 mb-2" />
                                ))}
                            </motion.div>
                        </div>
                        <p className="text-gray-300 text-sm font-semibold">Our industrious alumni who have made us proud!</p>
                    </div> : <div className="relative flex flex-col items-center">
                        <div className="overflow-hidden w-[400px] rounded-xl">
                                <motion.div
                                    animate={{ x: `-${currentHeroIndex * 400}px` }}
                                    transition={{ duration: isAnimating ? 0.5 : 0, ease: "easeInOut" }}
                                    className="flex rounded-xl">
                                {heroImages.map((image, index) => (
                                    <img src={image} key={index} className="w-[560px] rounded-xl shrink-0 mb-2" />
                                ))}
                            </motion.div>
                        </div>
                        <p className="text-gray-300 text-sm font-semibold">Our industrious alumni who have made us proud!</p>
                    </div>}

                </div>
            </section>


            <section ref={sectionRef} className="bg-gray-50 pb-10 pt-20">
                <div className="bg-[url('assets/bg.jpg')] max-w-5xl mx-auto border border-gray-300 pb-10 rounded-xl shadow-lg">
                    <div className="md:flex md:flex-col justify-center items-center">
                        <h1 className="text-2xl sm:text-3xl text-brand-blue font-bold pt-10 px-4 md:px-0 text-center">
                            Celebrating Our CIA Champions!{" "}
                            {!isMobile ? <span><GiConqueror className="inline h-16 w-16 pb-4 text-brand-dark" /></span> : null}
                        </h1>
                        <h2 className="text-xl sm:text-2xl text-brand-blue font-bold pt-1 px-12 md:px-0 text-center">
                            Join the Legacy of Success with Our Elite Alumni!
                        </h2>
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
                                    {testimonialVideos.map((video, index) => (
                                        <motion.div
                                            key={index}
                                            className="relative h-[350px] w-[200px] flex-shrink-0 cursor-pointer"
                                        >
                                            <AnimatePresence>
                                                {activeVideoIndex === index ? (
                                                    <motion.video
                                                        key="video"
                                                        src={video}
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
                                                                src={videoThumbnails[index]}
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
                                {writtenTestimonials.map((video, index) => (
                                    <motion.div
                                        key={index}
                                        className="relative h-[350px] w-[200px] flex-shrink-0"
                                    >
                                        <AnimatePresence>
                                            {activeWrittenIndex === index ? (
                                                <motion.video
                                                    key="video"
                                                    src={video}
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
                                                            src={writtenThumbnails[index]}
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
                                {writtenTestimonials.map((video, index) => (
                                    <motion.div
                                        key={index}
                                        className="relative h-[350px] w-[200px] flex-shrink-0"
                                    >
                                        <AnimatePresence>
                                            {activeWrittenIndex === index ? (
                                                <motion.video
                                                    key="video"
                                                    src={video}
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
                                                            src={writtenThumbnails[index]}
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

            <SuccessTestimonials start={0} end={8} /> {/* First 8 testimonials */}
            <ExamTestimonials />
            <h2 className="font-display text-center text-3xl font-bold tracking-tight text-brand-blue sm:text-4xl pb-12 bg-gray-50">
                    More Success Stories
            </h2>
            <SuccessTestimonials start={8} end={20} /> {/* Remaining 13 testimonials */}
            <div className="pb-20 bg-gray-50"></div>  

        </>
    );
}

const SuccessTestimonials = ({ start, end }) => {
    const testimonialsData = [
        { id: 1, image: studentTestimonialNine, alt: "Testimonial 1" },
        { id: 2, image: studentTestimonialEleven, alt: "Testimonial 2" },
        { id: 3, image: studentTestimonialTwelve, alt: "Testimonial 3" },
        { id: 4, image: studentTestimonialFour, alt: "Testimonial 4" },
        { id: 5, image: studentTestimonialFifteen, alt: "Testimonial 5" },
        { id: 6, image: studentTestimonialNineteen, alt: "Testimonial 6" },
        { id: 8, image: studentTestimonialEight, alt: "Testimonial 8" },
        { id: 7, image: vinodKumarTestimonial, alt: "Testimonial 7" },
        { id: 9, image: studentTestimonialOne, alt: "Testimonial 9" },
        { id: 10, image: studentTestimonialTen, alt: "Testimonial 10" },
        { id: 11, image: studentTestimonialTwo, alt: "Testimonial 11" },
        { id: 12, image: studentTestimonialThree, alt: "Testimonial 12" },
        { id: 13, image: studentTestimonialThirteen, alt: "Testimonial 13" },
        { id: 14, image: studentTestimonialFourteen, alt: "Testimonial 14" },
        { id: 15, image: studentTestimonialTwentyOne, alt: "Testimonial 15" },
        { id: 16, image: studentTestimonialSixteen, alt: "Testimonial 16" },
        { id: 17, image: studentTestimonialSeventeen, alt: "Testimonial 17" },
        { id: 18, image: studentTestimonialEighteen, alt: "Testimonial 18" },
        { id: 19, image: studentTestimonialSix, alt: "Testimonial 19" },
        { id: 20, image: studentTestimonialTwenty, alt: "Testimonial 20" },
        { id: 21, image: studentTestimonialTwentyOne, alt: "Testimonial 21" },
    ];

    // Slice the array based on start and end props
    const displayedTestimonials = testimonialsData.slice(start, end);

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
                                src={testimonial.image}
                                alt={testimonial.alt}
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
