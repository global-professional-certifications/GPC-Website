import React, { useState, useEffect, useMemo } from "react";
import { client } from "../../lib/sanity/client";
import { urlFor } from "../../lib/sanity/imageBuilder";
import { Link } from "react-router-dom";

import MetaTags from "../MetaTags";
import { SchemaMarkup, getBreadcrumbSchema, getWebPageSchema, getAggregateRatingSchema } from "../Schema";

// Consolidated Components
import HeroSection from "./HeroSection";
import WallOfExcellence from "./WallOfExcellence";
import { VideoVault, WrittenStories, VoicesOfExcellence } from "./StorySections";
import TestimonialsShowcase from "../Testimonials/TestimonialsShowcase";


export default function SuccessStories() {
    // Dynamic courses from Sanity
    const [courses, setCourses] = useState([]);
    const [activeCourse, setActiveCourse] = useState('all');

    // All stories from Sanity
    const [allStories, setAllStories] = useState([]);
    const [wallOfExcellenceEntries, setWallOfExcellenceEntries] = useState([]);
    const [pageSettings, setPageSettings] = useState(null);
    const [loading, setLoading] = useState(true);
 
    // Fetch page settings (titles, subtitles)
    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const query = `*[_type == "successPageSettings"][0]`;
                const data = await client.fetch(query);
                setPageSettings(data);
            } catch (error) {
                console.error("Error fetching page settings:", error);
            }
        };
        fetchSettings();
    }, []);

    // Fetch courses on mount - only courses that have at least one testimonial
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                // Get courses that have at least one testimonial
                const query = `*[_type == "testimonialCourse" && isActive != false] | order(order asc) {
                    _id,
                    name,
                    fullName,
                    "slug": slug.current,
                    "sections": coalesce(sections, ['video', 'written', 'image', 'wallOfExcellence']),
                    "category": category,
                    "testimonialCount": count(*[_type == "successStory" && course._ref == ^._id]),
                    "wallCount": count(*[_type == "wallOfExcellence" && course._ref == ^._id])
                }`;
                const data = await client.fetch(query);
                // Filter to only show courses with testimonials OR wall of excellence entries
                const coursesWithContent = data.filter(c => c.testimonialCount > 0 || c.wallCount > 0);
                console.log("Fetched courses with content:", coursesWithContent);
                setCourses(coursesWithContent);
                if (coursesWithContent.length > 0) {
                    setActiveCourse('all');
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
                const query = `*[_type == "successStory"] | order(_createdAt desc) {
                    _id,
                    name,
                    company,
                    location,
                    designation,
                    batch,
                    "courseSlug": course->slug.current,
                    "courseName": course->name,
                    category,
                    quote,
                    excerpt,
                    "thumbnailUrl": thumbnail.asset->url,
                    "videoUrl": video.asset->url,
                    "imageUrl": image.asset->url,
                    "companyLogo": companyLogo.asset->url
                }`;
                const data = await client.fetch(query);
                console.log("Fetched success stories:", data);
                setAllStories(data);
            } catch (error) {
                console.error("Error fetching success stories:", error);
            } finally {
                // We keep loading handled here, but wait for courses too if possible
                // For now, let's just make sure it sets false
                setLoading(false);
            }
        };
        fetchStories();
    }, []);

    // Fetch Wall of Excellence entries from Sanity
    useEffect(() => {
        const fetchWallEntries = async () => {
            try {
                const query = `*[_type == "wallOfExcellence"] | order(order asc) {
                    _id,
                    name,
                    company,
                    designation,
                    "imageUrl": photo.asset->url,
                    "companyLogo": companyLogo.asset->url,
                    "courseSlug": course->slug.current,
                    "courseName": course->name
                }`;
                const data = await client.fetch(query);
                console.log("Fetched Wall of Excellence entries:", data);
                setWallOfExcellenceEntries(data);
            } catch (error) {
                console.error("Error fetching Wall of Excellence entries:", error);
            }
        };
        fetchWallEntries();
    }, []);

    // Filter stories by active course
    const courseStories = useMemo(() => {
        if (!activeCourse) return [];
        if (activeCourse === 'all') return allStories;
        return allStories.filter(story => story.courseSlug === activeCourse);
    }, [allStories, activeCourse]);

    // Derived filtered data
    const videoStories = useMemo(() => courseStories.filter(s => s.category === 'video'), [courseStories]);
    const writtenStories = useMemo(() => courseStories.filter(s => s.category === 'written'), [courseStories]);
    const imageStories = useMemo(() => courseStories.filter(s => s.category === 'image'), [courseStories]);

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

    if (loading && allStories.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-blue"></div>
            </div>
        );
    }

    return (
        <>
            <SchemaMarkup schema={[breadcrumbSchema, webPageSchema, aggregateRatingSchema]} />
            <MetaTags
                title="CIA Exam Success Stories – Real Achievements"
                description="Hear from professionals who passed the CIA Challenge Exam with our guidance. Discover how our course made a difference in their careers."
                canonicalUrl="https://globalprofessionalcertifications.com/success"
            />

            <HeroSection />

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
                courses={courses}
                activeCourse={activeCourse}
                setActiveCourse={setActiveCourse}
                stories={courseStories}
                wallEntries={wallOfExcellenceEntries}
            />

            <section className="pb-32 bg-gray-50">
                {/* Testimonials Section */}
                <TestimonialsShowcase />
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
