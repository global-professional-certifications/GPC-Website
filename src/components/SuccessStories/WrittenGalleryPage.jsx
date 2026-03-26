import React, { useState, useEffect, useMemo } from 'react';
import { client } from "../../lib/sanity/client";
import { Link } from "react-router-dom";
import MetaTags from "../MetaTags";

import { VideoGridCard, VideoModal } from "./StorySections";

const getInitials = (name) => {
    if (!name) return '??';
    const parts = name.split(' ');
    if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    return name.substring(0, 2).toUpperCase();
};

export default function WrittenGalleryPage() {
    const [stories, setStories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('all');
    const [selectedVideo, setSelectedVideo] = useState(null);

    useEffect(() => {
        const fetchStories = async () => {
            try {
                const query = `*[_type == "successStory" && category == "written"] | order(_createdAt desc) {
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

                const processedStories = data.map(s => ({
                    ...s,
                    initials: getInitials(s.name),
                }));

                setStories(processedStories);
            } catch (error) {
                console.error("Error fetching written stories:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchStories();
    }, []);

    // Build tabs from fetched stories (ALL + one per course)
    const tabs = useMemo(() => {
        if (stories.length === 0) return [];
        const courseMap = new Map();
        stories.forEach(s => {
            const slug = (s.courseSlug || '').toLowerCase().trim();
            const name = s.courseName || slug;
            if (!slug) return;
            if (!courseMap.has(slug)) courseMap.set(slug, { label: name, slug, count: 0 });
            courseMap.get(slug).count += 1;
        });
        const courseTabs = Array.from(courseMap.values());
        return [{ label: 'ALL', slug: 'all', count: stories.length }, ...courseTabs];
    }, [stories]);

    const filteredStories = useMemo(() => {
        if (activeTab === 'all') return stories;
        return stories.filter(s => (s.courseSlug || '').toLowerCase().trim() === activeTab);
    }, [stories, activeTab]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-blue"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white flex flex-col">
            <MetaTags
                title="Written Testimonials - GPC Success Stories"
                description="Read written testimonials and success stories from our students who transformed their careers."
            />
            <section className="w-full pt-8 pb-16 px-4 md:px-8 max-w-[1280px] mx-auto flex-1">
                <div className="mb-8 md:mb-12">
                    <Link
                        to="/success"
                        onClick={() => sessionStorage.setItem("scrollToTarget", "written-stories")}
                        className="text-brand-blue font-medium hover:text-blue-500 hover:-translate-x-1 flex items-center gap-2 w-fit mb-6 transition-all duration-300"
                    >
                        ← Back
                    </Link>
                    <div className="text-center max-w-3xl mx-auto">
                        <h1 className="text-gray-900 text-3xl md:text-5xl font-bold leading-tight mb-4">
                            Read their <span className="text-brand-blue font-normal italic relative">journeys</span>
                        </h1>
                        <p className="text-gray-600 text-sm md:text-base leading-relaxed font-poppins">
                            Inspiring stories from professionals who transformed their careers with GPC.
                        </p>
                    </div>
                </div>

                {/* Course Tabs */}
                {tabs.length > 1 && (
                    <div className="relative border-b border-gray-100 mb-10">
                        <div className="flex gap-8 overflow-x-auto pb-1 no-scrollbar">
                            {tabs.map(tab => (
                                <button
                                    key={tab.slug}
                                    onClick={() => setActiveTab(tab.slug)}
                                    className="pb-4 text-[13px] transition-colors relative whitespace-nowrap uppercase tracking-widest font-bold"
                                    style={{ color: activeTab === tab.slug ? '#111827' : '#6B7280' }}
                                >
                                    {tab.label}
                                    <span className="ml-2 font-medium opacity-60">· {tab.count}</span>
                                    {activeTab === tab.slug && (
                                        <span className="absolute -bottom-[1px] left-0 right-0 h-[3px] bg-brand-blue" />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                <div className="grid gap-[24px] grid-cols-2 lg:grid-cols-6 items-start">
                    {filteredStories.map((story, idx) => (
                        <div key={story._id || idx} className="col-span-1 h-full">
                            <VideoGridCard video={story} index={idx} onClick={setSelectedVideo} />
                        </div>
                    ))}
                </div>

                {filteredStories.length === 0 && (
                    <div className="text-center text-gray-500 py-12">No stories available at the moment.</div>
                )}
            </section>

            <VideoModal video={selectedVideo} onClose={() => setSelectedVideo(null)} />
        </div>
    );
}
