'use client';

import React, { useState, useMemo } from 'react';
import { urlFor } from "../../lib/sanity/imageBuilder";
import { Link } from '../routing';

import { VideoGridCard, VideoModal } from "./StorySections";
import type { CmsData, ComponentProps } from '../../types/cms';

const getInitials = (name) => {
    if (!name) return '??';
    const parts = name.split(' ');
    if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    return name.substring(0, 2).toUpperCase();
};

export default function VideoGalleryPage({ stories = [] }: ComponentProps) {
    // Stories arrive from app/(site)/video-gallery/page.tsx, fetched on the
    // server. Prepared here exactly as before; the same inputs give the same
    // result on the server and in the browser.
    const videos = useMemo(() => stories.map(s => ({
        ...s,
        initials: getInitials(s.name),
        thumbnailUrl: s.thumbnail ? urlFor(s.thumbnail).url() : null,
        imageUrl: s.image ? urlFor(s.image).url() : null,
        companyLogo: s.companyLogo ? urlFor(s.companyLogo).url() : null,
    })), [stories]);
    const [selectedVideo, setSelectedVideo] = useState<CmsData>(null);
    const [activeTab, setActiveTab] = useState('all');

    // Build tabs from fetched videos (ALL + one per course)
    const tabs = useMemo(() => {
        if (videos.length === 0) return [];
        const courseMap = new Map();
        videos.forEach(v => {
            const slug = (v.courseSlug || '').toLowerCase().trim();
            const name = v.courseName || slug;
            if (!slug) return;
            if (!courseMap.has(slug)) courseMap.set(slug, { label: name, slug, count: 0 });
            courseMap.get(slug).count += 1;
        });
        const courseTabs = Array.from(courseMap.values());
        return [{ label: 'ALL', slug: 'all', count: videos.length }, ...courseTabs];
    }, [videos]);

    const filteredVideos = useMemo(() => {
        if (activeTab === 'all') return videos;
        return videos.filter(v => (v.courseSlug || '').toLowerCase().trim() === activeTab);
    }, [videos, activeTab]);

    const handleVideoClick = (video) => {
        setSelectedVideo(video);
    };

    return (
        <div className="min-h-screen bg-white flex flex-col">
            <section className="w-full pt-8 pb-16 px-4 md:px-8 max-w-[1280px] mx-auto flex-1">
                <div className="mb-8 md:mb-12">
                    <Link
                        to="/success"
                        onClick={() => sessionStorage.setItem("scrollToTarget", "video-vault")}
                        className="text-brand-blue font-medium hover:text-blue-500 hover:-translate-x-1 flex items-center gap-2 w-fit mb-6 transition-all duration-300"
                    >
                        ← Back
                    </Link>
                    <div className="text-center max-w-3xl mx-auto">
                        <h1 className="text-gray-900 text-3xl md:text-5xl font-bold leading-tight mb-4">
                            Hear from our <span className="text-brand-blue font-normal italic relative">Students</span>
                        </h1>
                        <p className="text-gray-600 text-sm md:text-base leading-relaxed font-poppins">
                            Discover inspiring video testimonials from professionals who transformed their careers.
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

                {/* Desktop Grid */}
                <div className="hidden lg:grid gap-[24px] lg:grid-cols-6 items-start">
                    {filteredVideos.map((video, idx) => (
                        <div key={video._id || idx} className="col-span-1 h-full">
                            <VideoGridCard video={video} index={idx} onClick={handleVideoClick} />
                        </div>
                    ))}
                </div>
                {/* Mobile Horizontal Scroll */}
                <div className="lg:hidden flex gap-3 overflow-x-auto no-scrollbar snap-x snap-mandatory -mx-4 px-4 pb-2">
                    {filteredVideos.map((video, idx) => (
                        <div key={video._id || idx} className="flex-none w-[40vw] snap-start">
                            <VideoGridCard video={video} index={idx} onClick={handleVideoClick} />
                        </div>
                    ))}
                </div>
                {filteredVideos.length === 0 && (
                    <div className="text-center text-gray-500 py-12">No videos available at the moment.</div>
                )}
            </section>

            <VideoModal video={selectedVideo} onClose={() => setSelectedVideo(null)} />
        </div>
    );
}
