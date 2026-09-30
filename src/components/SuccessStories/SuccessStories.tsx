'use client';

import React, { useState, useEffect, useMemo } from "react";
import { urlFor } from "../../lib/sanity/imageBuilder";
import { Link } from '../routing';

import { SchemaMarkup, generateBreadcrumbSchema, getCollectionPageSchema, getAggregateRatingSchema, getOrganizationSchema, getVideoSchema, getReviewSchema } from "../Schema";

// Consolidated Components
import HeroSection from "./HeroSection";
import WallOfExcellence from "./WallOfExcellence";
import { VideoVault, WrittenStories, VoicesOfExcellence } from "./StorySections";
import MobileGallery from "./MobileGallery";
import testimonialCover from "../../assets/home/testimonial-cover.webp";
import type { ComponentProps } from '../../types/cms';



export default function SuccessStories({
    pageSettings = null,
    heroData = null,
    courses: serverCourses = [],
    stories: serverStories = [],
    wallEntries: serverWallEntries = [],
    generatedAt,
}: ComponentProps) {
    // All five pieces arrive from app/(site)/success/page.tsx, fetched on the
    // server. Prepared here exactly as before; the same inputs give the same
    // result on the server and in the browser.

    // Dynamic courses from Sanity.
    // Filter to only show courses with testimonials OR wall of excellence entries
    const courses = useMemo(
        () => serverCourses.filter(c => c.testimonialCount > 0 || c.wallCount > 0),
        [serverCourses]
    );
    const [activeCourse, setActiveCourse] = useState('all');

    // All stories from Sanity
    const allStories = useMemo(() => serverStories.map(story => ({
        ...story,
        thumbnailUrl: story.thumbnail ? urlFor(story.thumbnail).url() : null,
        imageUrl: story.image ? urlFor(story.image).url() : null,
        companyLogo: story.companyLogo ? urlFor(story.companyLogo).url() : null,
    })), [serverStories]);

    // Wall of Excellence entries from Sanity
    const wallOfExcellenceEntries = useMemo(() => serverWallEntries.map(entry => ({
        ...entry,
        imageUrl: entry.photo ? urlFor(entry.photo).url() : null,
        companyLogo: entry.companyLogo ? urlFor(entry.companyLogo).url() : null,
    })), [serverWallEntries]);

    // Filter stories by active course
    const courseStories = useMemo(() => {
        if (!activeCourse) return [];
        if (activeCourse === 'all') return allStories;
        return allStories.filter(story => story.courseSlug === activeCourse);
    }, [allStories, activeCourse]);

    // Derived filtered data straight from allStories (prevents filtering bug if activeCourse changes)
    const videoStories = useMemo(() => allStories.filter(s => s.category === 'video'), [allStories]);
    const writtenStories = useMemo(() => allStories.filter(s => s.category === 'written'), [allStories]);
    const imageStories = useMemo(() => allStories.filter(s => s.category === 'image').slice(0, 4), [allStories]);

    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768)
        }
        handleResize()
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    // Breadcrumb Schema
    const breadcrumbSchema = generateBreadcrumbSchema("/success");

    // CollectionPage Schema
    const collectionPageSchema = getCollectionPageSchema({
        name: "CIA Exam Success Stories – Real Achievements",
        description: "Read inspiring success stories of students who cleared CIA, CISA, CRMA, and IAP certifications with Global Professional Certifications."
    });

    // Organization Schema
    const orgSchema = getOrganizationSchema();

    // Aggregate Rating Schema for GPC courses
    const aggregateRatingSchema = getAggregateRatingSchema({
        ratingValue: "4.9",
        reviewCount: "150",
        bestRating: "5",
        worstRating: "1"
    });

    // VideoObject Schemas
    const videoSchemas = videoStories.slice(0, 3).map(story => getVideoSchema({
        name: `${story.name} - ${story.courseName} Success Story`,
        description: story.excerpt || story.quote || "Hear about their success journey with GPC.",
        thumbnailUrl: story.thumbnailUrl || "https://globalprofessionalcertifications.com/logo.png",
        uploadDate: generatedAt, // Time the page was generated (stamped once on the server)
        embedUrl: story.videoUrl || "https://globalprofessionalcertifications.com/success"
    }));

    // Review Schemas
    const reviewSchemas = writtenStories.slice(0, 3).map(story => getReviewSchema({
        name: story.name,
        designation: story.designation,
        text: story.quote || story.excerpt || "Great experience with GPC.",
        rating: "5",
        courseName: story.courseName
    }));

    return (
        <>
            <SchemaMarkup schema={[breadcrumbSchema, collectionPageSchema, aggregateRatingSchema, orgSchema, ...videoSchemas, ...reviewSchemas]} />

            <HeroSection hero={heroData} />

            <VideoVault
                allStories={allStories}
                courses={courses}
                settings={pageSettings}
            />

            <WrittenStories
                allStories={allStories}
                courses={courses}
                settings={pageSettings}
            />

            <WallOfExcellence
                stories={allStories}
                wallEntries={wallOfExcellenceEntries}
            />

            {/* Whatsapp Message Showcase */}
            <section className="bg-gray-50 pb-40 md:pb-64 overflow-hidden">

                {/* People Image Display & Headings */}
                <div className="w-full max-w-[1280px] mx-auto pt-16 px-4 md:px-8 flex flex-col items-center">

                    {/* Centered Cover Image */}
                    <img
                        src={testimonialCover}
                        alt="Testimonial Cover"
                        className="w-full max-w-[1200px] h-auto object-contain mx-auto mb-8 md:mb-12"
                    />

                    {/* Section Headings */}
                    <div className="flex flex-col gap-2 justify-center items-center mb-8 md:mb-12 w-full">
                        <h2 className="text-2xl md:text-4xl text-center font-bold">
                            What Our{" "}
                            <span className="text-brand-blue font-normal italic">Learners </span>
                            Say
                        </h2>
                        <p className="text-xs md:text-base lg:text-base font-poppins leading-relaxed max-w-xl md:max-w-2xl lg:max-w-2xl text-center text-gray-600 mt-4 md:mt-6 px-4 md:px-0">
                            Discover how Global Professional Certifications' expert-led programs
                            empower professionals to achieve global certification and career
                            growth
                        </p>
                    </div>

                </div>

                {/* Mobile Gallery Grid */}
                <MobileGallery images={imageStories} />

            </section>

            {/* Radial Gradient Banner */}

            <div className="relative">
                <div className="absolute left-1/2 -translate-x-1/2 -top-28 z-20 h-56 md:h-56 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)] rounded-2xl py-2 md:py-8 w-full md:max-w-2xl lg:max-w-5xl flex items-center justify-center scale-90 md:scale-100">
                    <div className="flex flex-col md:flex-row justify-between items-center mx-8 gap-4 md:gap-8 lg:gap-12">
                        {/* Text Content */}
                        <div className="text-center md:text-left mb-6 md:mb-0">
                            <h3 className="text-white text-lg md:text-2xl lg:text-4xl font-bold">
                                Your name could be next on this page!
                            </h3>
                            <p className="text-gray-400 text-xs md:text-sm lg:text-base mt-2 max-w-2xl">
                                Join 1,200+ professionals who have accelerated their careers through GPC's globally recognized certification programs and expert mentorship.
                            </p>
                        </div>

                        {/* Button */}
                        <Link
                            to="/contact"
                            className="bg-brand-blue text-white text-sm lg:text-base py-2 px-4 lg:px-6 rounded-full hover:bg-brand-purple  transition-all duration-300"
                        >
                            Contact Us
                        </Link>
                    </div>
                </div>
            </div>
            <div className="bg-black">
                <div className="bg-black h-16 md:h-36 relative"></div>
            </div>

        </>
    );
}
