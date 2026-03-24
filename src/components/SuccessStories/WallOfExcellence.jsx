import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { examTestimonialsData } from './constant';

const getInitials = (name) => {
    if (!name) return '?';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    return name.substring(0, 2).toUpperCase();
};

// Course-specific badge colors
const courseBadgeColors = {
    cia: { bg: 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)', text: '#92400E', icon: '🏆', glow: 'rgba(251,191,36,0.15)' },
    cisa: { bg: 'linear-gradient(135deg, #DBEAFE 0%, #BFDBFE 100%)', text: '#1E40AF', icon: '🛡️', glow: 'rgba(59,130,246,0.15)' },
    cma: { bg: 'linear-gradient(135deg, #D1FAE5 0%, #A7F3D0 100%)', text: '#065F46', icon: '📊', glow: 'rgba(16,185,129,0.15)' },
    acca: { bg: 'linear-gradient(135deg, #EDE9FE 0%, #DDD6FE 100%)', text: '#5B21B6', icon: '📋', glow: 'rgba(139,92,246,0.15)' },
    crma: { bg: 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)', text: '#B45309', icon: '🎯', glow: 'rgba(217,119,6,0.15)' },
    iap: { bg: 'linear-gradient(135deg, #CCFBF1 0%, #99F6E4 100%)', text: '#0F766E', icon: '✅', glow: 'rgba(20,184,166,0.15)' },
};

const getCourseBadge = (slug) => courseBadgeColors[slug] || courseBadgeColors.cia;

const WallOfExcellence = ({ courses, activeCourse, setActiveCourse, stories, wallEntries }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 12;

    const hasWallEntries = wallEntries && wallEntries.length > 0;

    // Derive data source
    const allData = useMemo(() => {
        if (hasWallEntries) return wallEntries;
        // Fallback: merge stories prop with dummy data
        const combined = [...(stories || []), ...examTestimonialsData];
        return Array.from(new Map(combined.map(item => [item.name, item])).values());
    }, [hasWallEntries, wallEntries, stories]);

    // Build tabs ONLY from courses that have at least 1 entry in the data
    const tabs = useMemo(() => {
        const courseSlugsWithEntries = new Set(
            allData.map(s => (s.courseSlug || '').toLowerCase().trim()).filter(Boolean)
        );
        const courseTabs = (courses || [])
            .filter(c => courseSlugsWithEntries.has(c.slug.toLowerCase().trim()))
            .map(c => ({ name: c.name, slug: c.slug }));

        // Only show ALL tab if there are entries
        if (courseTabs.length === 0 && allData.length === 0) return [];
        return [{ name: 'ALL', slug: 'all' }, ...courseTabs];
    }, [courses, allData]);

    // Filter by active course
    const displayStories = useMemo(() => {
        return allData.filter(
            s => activeCourse === 'all' || (s.courseSlug || '').toLowerCase().trim() === (activeCourse || '').toLowerCase().trim()
        );
    }, [allData, activeCourse]);

    const totalPages = Math.ceil(displayStories.length / ITEMS_PER_PAGE);
    const pagedStories = displayStories.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    const handleTabChange = (slug) => {
        setActiveCourse(slug);
        setCurrentPage(1);
    };

    // Don't render section if no data at all
    if (allData.length === 0) return null;

    return (
        <section className="w-full py-16 md:py-24 font-sans relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #F8FAFC 0%, #F1F5F9 100%)' }}>
            <div className="max-w-[1400px] mx-auto px-4 flex flex-col items-center relative z-10">
                <h2 className="text-center text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-4">
                    Wall of <span className="text-brand-blue font-normal italic"> Excellence</span>
                </h2>
                <p className="text-center text-sm md:text-base text-gray-500 mb-10 max-w-lg">Real professionals. Real companies. Real results — across CIA, CISA, CMA & ACCA.</p>

                {/* Tabs — only shows courses with entries */}
                {tabs.length > 1 && (
                    <div className="inline-flex items-center p-1 rounded-full mb-12 overflow-x-auto max-w-full no-scrollbar" style={{ backgroundColor: '#E2E5EF' }}>
                        {tabs.map((tab) => (
                            <button key={tab.slug} onClick={() => handleTabChange(tab.slug)} className="px-5 md:px-7 py-2 md:py-2.5 rounded-full text-[12px] md:text-sm font-semibold uppercase tracking-wide transition-all duration-200 whitespace-nowrap" style={activeCourse === tab.slug ? { backgroundColor: '#111827', color: '#fff' } : { color: '#6B7280' }}>
                                {tab.name}
                            </button>
                        ))}
                    </div>
                )}

                {/* Cards Grid */}
                <div className="w-full grid gap-y-12 gap-x-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 mb-12 mt-8">
                    <AnimatePresence mode="wait">
                        {displayStories.length > 0 ? (
                            pagedStories.map((story, index) => {
                                const courseSlug = (story.courseSlug || 'cia').toLowerCase();
                                const initials = getInitials(story.name);
                                const role = story.role || story.designation || '';
                                const badge = getCourseBadge(courseSlug);

                                return (
                                    <motion.div
                                        key={story._id || index}
                                        initial={{ opacity: 0, y: 15 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ duration: 0.3, delay: index * 0.02 }}
                                        className="relative mt-8 mb-2"
                                    >
                                        <div className="flex flex-col items-center text-center bg-white rounded-[28px] p-5 pt-[72px] shadow-sm border border-gray-100/60 hover:shadow-2xl hover:shadow-brand-blue/10 transition-all duration-500 group h-full">
                                            {/* Student Photo (Overlapping) */}
                                            <div className="absolute -top-12 left-1/2 -translate-x-1/2 z-20">
                                                <div className="w-24 h-24 md:w-[104px] md:h-[104px] rounded-full overflow-hidden border-4 border-white shadow-xl bg-gray-50 flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
                                                    {story.imageUrl ? (
                                                        <img
                                                            src={story.imageUrl}
                                                            alt={story.name}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-2xl md:text-3xl font-bold text-brand-blue/15 bg-gray-50 uppercase tracking-tighter">
                                                            {initials}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Student Name — centered */}
                                            <h4 className="w-full text-center text-[15px] md:text-[18px] font-bold text-gray-900 leading-snug mb-3 tracking-tight group-hover:text-brand-blue transition-colors duration-300 line-clamp-2">
                                                {story.name}
                                            </h4>

                                            {/* Divider */}
                                            <div className="w-16 h-[1px] bg-gray-200 mb-4" />

                                            {/* Company + Designation Area */}
                                            <div className="flex-1 flex flex-col items-center justify-center w-full mb-4">
                                                {/* Company Logo */}
                                                <div className="h-12 w-full flex items-center justify-center overflow-hidden">
                                                    {story.companyLogo ? (
                                                        <img
                                                            src={story.companyLogo}
                                                            alt={story.company}
                                                            className="h-full max-w-[110px] object-contain transition-all duration-500"
                                                        />
                                                    ) : (
                                                        <span className="text-[10px] font-black text-gray-300 tracking-[0.2em] uppercase italic">
                                                            {story.company || 'GPC ALUMNI'}
                                                        </span>
                                                    )}
                                                </div>

                                                {/* Company Name — shown below logo */}
                                                {story.company && (
                                                    <p className="font-poppins text-[14px] text-gray-700 my-2 text-center">
                                                        {story.company}
                                                    </p>
                                                )}


                                                {/* Designation */}
                                                {role && (
                                                    <span className="font-poppins text-[10px] md:text-[14px] text-gray-500 text-center">
                                                        {role}
                                                    </span>
                                                )}
                                            </div>

                                            {/* Certification Badge — Premium Redesign */}
                                            <div className="mt-auto w-full">
                                                <div
                                                    className="relative flex items-center justify-center gap-1 w-full px-3 py-2.5 rounded-2xl transition-all duration-300 bg-brand-blue text-white group-hover:scale-[1.03] group-hover:shadow-md"
                                                >
                                                    <span className="text-[12px] md:text-[13px] font-bold uppercase tracking-wider leading-none">
                                                        {(story.courseName || courseSlug.toUpperCase())} Cleared
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="col-span-full text-center text-gray-500 py-20 bg-white/50 rounded-3xl border-2 border-dashed border-gray-200"
                            >
                                No success stories found for this certification yet.
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex items-center gap-2 md:gap-4 mt-8">
                        <button
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                            className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 bg-white text-gray-400 hover:text-brand-blue hover:border-brand-blue hover:shadow-md transition-all duration-300 disabled:opacity-30 disabled:hover:shadow-none"
                        >
                            <span className="text-xl">←</span>
                        </button>

                        <div className="flex items-center gap-2">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                <button
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-bold transition-all duration-300 ${currentPage === page
                                        ? 'bg-brand-blue text-white shadow-lg shadow-blue-900/20 scale-110'
                                        : 'bg-white text-gray-500 border border-gray-200 hover:border-brand-blue hover:text-brand-blue'
                                        }`}
                                >
                                    {page}
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                            className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 bg-white text-gray-400 hover:text-brand-blue hover:border-brand-blue hover:shadow-md transition-all duration-300 disabled:opacity-30 disabled:hover:shadow-none"
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
