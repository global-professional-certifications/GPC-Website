import React, { useState, useEffect, useMemo } from "react";
import { client } from "../../lib/sanity/client";
import { urlFor } from "../../lib/sanity/imageBuilder";

import MetaTags from "../MetaTags";
import { SchemaMarkup, getBreadcrumbSchema, getWebPageSchema, getReviewSchema, getAggregateRatingSchema } from "../Schema";

import  HeroSection  from "./HeroSection";
import Testimonials from "./testimonials";
import VideoVault from "./VideoVault";
import WrittenStories from "./WrittenStories";
import VoicesOfExcellence from "./VoicesOfExcellence";

import { VideoWrittenStories } from "./VideoWrittenStories";
import { SuccessTestimonials } from "./SuccessTestimonials";
import { ExamTestimonials } from "./ExamTestimonials";

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
                const query = `*[_type == "successStory"] | order(order asc) {
                    _id,
                    name,
                    company,
                    location,
                    designation,
                    batch,
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

    return (
        <>
            <SchemaMarkup schema={[breadcrumbSchema, webPageSchema, aggregateRatingSchema]} />
            <MetaTags
                title="CIA Exam Success Stories – Real Achievements"
                description="Hear from professionals who passed the CIA Challenge Exam with our guidance. Discover how our course made a difference in their careers."
                canonicalUrl="https://globalprofessionalcertifications.com/success"
            />

            <HeroSection />

            <VideoVault />

            <WrittenStories />

            <Testimonials 
                courses={courses} 
                activeCourse={activeCourse} 
                setActiveCourse={setActiveCourse} 
                stories={courseStories} 
            />

            <VoicesOfExcellence />

            {/* Note: Video Vault sections are temporarily hidden as per user instructions
            <VideoWrittenStories 
                courses={courses} 
                activeCourse={activeCourse} 
                setActiveCourse={setActiveCourse} 
                videoStories={videoStories} 
                writtenStories={writtenStories} 
                isMobile={isMobile} 
            />

            {imageStories.length > 0 && (
                <>
                    <div className="mx-auto text-center bg-gray-50 px-4 mt-8 md:mt-12">
                        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-brand-blue">
                            What Our Students Say
                        </h2>
                    </div>
                    <SuccessTestimonials stories={imageStories} start={0} end={8} activeCourse={activeCourse} />
                    <SuccessTestimonials stories={imageStories} start={8} end={20} activeCourse={activeCourse} />
                </>
            )}

            {activeCourse === 'cia' && <ExamTestimonials />}
            */}

        </>
    );
}
