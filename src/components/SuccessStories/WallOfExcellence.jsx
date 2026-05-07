import React, { useState, useMemo, useEffect } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { examTestimonialsData } from './constant';

const getInitials = (name) => {
    if (!name) return '?';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    return name.substring(0, 2).toUpperCase();
};



const WallOfExcellence = ({ wallEntries, stories }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [activeTab, setActiveTab] = useState('all');
    const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const ITEMS_PER_PAGE = isMobile ? 12 : 18; // mobile: 3×4, desktop: 6×3

    const hasWallEntries = wallEntries && wallEntries.length > 0;

    // Derive data source
    const displayStories = useMemo(() => {
        if (hasWallEntries) return wallEntries;
        // Fallback: merge stories prop with dummy data
        const combined = [...(stories || []), ...examTestimonialsData];
        return Array.from(new Map(combined.map(item => [item.name, item])).values());
    }, [hasWallEntries, wallEntries, stories]);

    // Build tabs from unique courses in displayStories
    const tabs = useMemo(() => {
        const courseMap = new Map();
        displayStories.forEach(s => {
            const coursesArray = s.courses?.length > 0 ? s.courses : (s.courseSlug ? [{ slug: s.courseSlug, name: s.courseName }] : []);
            coursesArray.forEach(c => {
                const slug = (c.slug || '').toLowerCase().trim();
                const name = c.name || slug.toUpperCase();
                if (!slug) return;
                if (!courseMap.has(slug)) courseMap.set(slug, { slug, name, count: 0 });
                courseMap.get(slug).count += 1;
            });
        });
        const courseTabs = Array.from(courseMap.values());
        if (courseTabs.length <= 1) return []; // No tabs needed for single course
        return [{ slug: 'all', name: 'ALL', count: displayStories.length }, ...courseTabs];
    }, [displayStories]);

    // Interleave stories round-robin across courses so "All" shows a mix on every page
    const interleavedAll = useMemo(() => {
        const groups = new Map();
        displayStories.forEach(s => {
            const coursesArray = s.courses?.length > 0 ? s.courses : (s.courseSlug ? [{ slug: s.courseSlug, name: s.courseName }] : [{ slug: 'unknown', name: 'UNKNOWN' }]);
            const firstSlug = (coursesArray[0]?.slug || 'unknown').toLowerCase().trim();
            if (!groups.has(firstSlug)) groups.set(firstSlug, []);
            groups.get(firstSlug).push(s);
        });
        const queues = Array.from(groups.values());
        const result = [];
        let i = 0;
        while (result.length < displayStories.length) {
            const queue = queues[i % queues.length];
            const item = queue.shift();
            if (item !== undefined) result.push(item);
            i++;
            // Stop if all queues are empty
            if (queues.every(q => q.length === 0)) break;
        }
        return result;
    }, [displayStories]);

    // Filter stories by active tab
    const filteredStories = useMemo(() => {
        if (activeTab === 'all') return interleavedAll;
        return displayStories.filter(s => {
            const coursesArray = s.courses?.length > 0 ? s.courses : (s.courseSlug ? [{ slug: s.courseSlug, name: s.courseName }] : []);
            return coursesArray.some(c => (c.slug || '').toLowerCase().trim() === activeTab);
        });
    }, [displayStories, interleavedAll, activeTab]);

    // Reset to page 1 when tab changes
    useEffect(() => {
        setCurrentPage(1);
    }, [activeTab]);

    const totalPages = Math.ceil(filteredStories.length / ITEMS_PER_PAGE);
    const pagedStories = filteredStories.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    // Don't render section if no data at all
    if (displayStories.length === 0) return null;

    return (
        <section className="w-full py-16 md:py-24 px-4 md:px-12 font-sans relative overflow-hidden bg-brand-blue">
            <div className="max-w-[1400px] mx-auto px-0 md:px-4 flex flex-col items-center relative z-10">
                <h2 className="text-center text-2xl md:text-4xl font-bold text-white leading-tight mb-4">
                    Wall of <span className="text-orange-300 font-normal italic"> Excellence</span>
                </h2>
                <p className="text-center text-xs md:text-base lg:text-base text-blue-100 mb-10 max-w-lg">Real professionals. Real companies. Real results.</p>

                {/* Course Tabs */}
                {tabs.length > 0 && (
                    <div className="w-full relative border-b border-white/20 mb-4">
                        <div className="flex gap-6 md:gap-10 overflow-x-auto pb-1 no-scrollbar justify-center">
                            {tabs.map(tab => (
                                <button
                                    key={tab.slug}
                                    onClick={() => setActiveTab(tab.slug)}
                                    className="pb-4 text-[13px] transition-colors relative whitespace-nowrap uppercase tracking-widest font-bold"
                                    style={{ color: activeTab === tab.slug ? '#ffffff' : 'rgba(255,255,255,0.5)' }}
                                >
                                    {tab.name}
                                    <span className="ml-2 font-medium opacity-60">· {tab.count}</span>
                                    {activeTab === tab.slug && (
                                        <span className="absolute -bottom-[1px] left-0 right-0 h-[3px] bg-orange-300 rounded-full" />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Cards Grid */}
                <div className="w-full grid gap-y-10 gap-x-2 md:gap-y-12 md:gap-x-4 grid-cols-3 md:grid-cols-4 lg:grid-cols-6 mb-10 md:mb-12 mt-6 md:mt-8">
                    <AnimatePresence mode="wait">
                        {pagedStories.length > 0 ? (
                            pagedStories.map((story, index) => {
                                const courseSlug = (story.courseSlug || 'cia').toLowerCase();
                                const initials = getInitials(story.name);
                                const role = story.role || story.designation || '';

                                return (
                                    <m.div
                                        key={story._id || `${activeTab}-${index}`}
                                        initial={{ opacity: 0, y: 15 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ duration: 0.3, delay: index * 0.02 }}
                                        className="relative mt-7 md:mt-8 mb-1 md:mb-2"
                                    >
                                        <div className="flex flex-col items-center text-center bg-white rounded-2xl md:rounded-[28px] p-2 pt-11 md:p-3 md:pt-[72px] shadow-sm border border-gray-100/60 hover:shadow-2xl hover:shadow-brand-blue/10 transition-all duration-500 group h-full">
                                            {/* Student Photo (Overlapping) */}
                                            <div className="absolute -top-7 md:-top-12 left-1/2 -translate-x-1/2 z-20">
                                                <div className="w-14 h-14 md:w-24 md:h-24 rounded-full overflow-hidden border-2 md:border-4 border-white shadow-lg md:shadow-xl bg-gray-50 flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
                                                    {story.imageUrl ? (
                                                        <img
                                                            src={story.imageUrl}
                                                            alt={story.name}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-base md:text-2xl font-bold text-brand-blue/15 bg-gray-50 uppercase tracking-tighter">
                                                            {initials}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Student Name — centered */}
                                            <h4 className="w-full text-center text-[11px] md:text-[15px] font-bold text-gray-900 mb-1.5 md:mb-3 leading-tight">
                                                {story.name}
                                            </h4>

                                            {/* Divider */}
                                            <div className="w-10 md:w-16 h-[1px] bg-gray-200 mb-2 md:mb-4" />

                                            {/* Company + Designation Area */}
                                            <div className="flex-1 flex flex-col items-center justify-center w-full mb-2 md:mb-4">
                                                {/* Company Logo */}
                                                <div className="h-7 md:h-10 w-full flex items-center justify-center overflow-hidden">
                                                    {story.companyLogo ? (
                                                        <img
                                                            src={story.companyLogo}
                                                            alt={story.company}
                                                            className="h-full max-w-[65px] md:max-w-[110px] object-contain transition-all duration-500"
                                                        />
                                                    ) : (
                                                        <span className="text-[8px] md:text-[10px] font-black text-gray-300 tracking-[0.1em] md:tracking-[0.2em] uppercase italic">
                                                            {story.company || 'GPC ALUMNI'}
                                                        </span>
                                                    )}
                                                </div>

                                                {/* Company Name — shown below logo */}
                                                {story.company && (
                                                    <p className="font-poppins text-[9px] md:text-[12px] text-gray-700 my-1 md:my-2 text-center leading-tight">
                                                        {story.company}
                                                    </p>
                                                )}

                                                {/* Designation */}
                                                {role && (
                                                    <span className="font-poppins text-[8px] md:text-[10px] text-gray-500 text-center leading-tight">
                                                        {role}
                                                    </span>
                                                )}
                                            </div>

                                            {/* Certification Badge */}
                                            <div className="mt-auto w-full">
                                                <div className="relative flex items-center justify-center w-full px-1 py-1.5 md:px-3 md:py-2.5 rounded-xl md:rounded-2xl transition-all duration-300 bg-brand-blue text-white group-hover:scale-[1.03] group-hover:shadow-md">
                                                    <span className="text-[7px] md:text-[10px] font-bold uppercase tracking-normal md:tracking-wider leading-tight text-center">
                                                        {(() => {
                                                            const cList = (story.courses?.length > 0 ? story.courses : [{ name: story.courseName || courseSlug.toUpperCase() }]).map(c => c.name);
                                                            if (cList.length === 1) return `${cList[0]} Cleared`;
                                                            const last = cList.pop();
                                                            return `${cList.join(', ')} & ${last} Cleared`;
                                                        })()}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </m.div>
                                );
                            })
                        ) : (
                            <m.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="col-span-full text-center text-gray-500 py-20 bg-white/50 rounded-3xl border-2 border-dashed border-gray-200"
                            >
                                No success stories found for this certification yet.
                            </m.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex items-center gap-2 md:gap-4 mt-8">
                        <button
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                            className="w-10 h-10 flex items-center justify-center rounded-full border border-white/20 bg-white/10 text-white/70 hover:bg-white hover:text-brand-blue hover:shadow-md transition-all duration-300 disabled:opacity-30 disabled:hover:shadow-none disabled:hover:bg-white/10 disabled:hover:text-white/70"
                        >
                            <span className="text-xl">←</span>
                        </button>

                        <div className="flex items-center gap-2">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                <button
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-bold transition-all duration-300 ${currentPage === page
                                        ? 'bg-white text-brand-blue shadow-lg shadow-black/20 scale-110'
                                        : 'bg-white/10 text-white/70 border border-white/20 hover:border-white/50 hover:bg-white hover:text-brand-blue'
                                        }`}
                                >
                                    {page}
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                            className="w-10 h-10 flex items-center justify-center rounded-full border border-white/20 bg-white/10 text-white/70 hover:bg-white hover:text-brand-blue hover:shadow-md transition-all duration-300 disabled:opacity-30 disabled:hover:shadow-none disabled:hover:bg-white/10 disabled:hover:text-white/70"
                        >
                            <span className="text-xl">→</span>
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default WallOfExcellence;
