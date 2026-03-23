import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { examTestimonialsData } from './constant';

const getInitials = (name) => {
    if (!name) return '?';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    return name.substring(0, 2).toUpperCase();
};

const avatarStyle = (courseSlug) => {
    const map = {
        cia: { bg: '#FEF9C3', text: '#92400E' },
        cisa: { bg: '#DBEAFE', text: '#1E40AF' },
        cma: { bg: '#FEF9C3', text: '#92400E' },
        acca: { bg: '#EDE9FE', text: '#5B21B6' },
        crma: { bg: '#FEF9C3', text: '#92400E' },
        iap: { bg: '#D1FAE5', text: '#065F46' },
    };
    return map[courseSlug] || { bg: '#FEF9C3', text: '#92400E' };
};

const badgeStyle = (courseSlug) => {
    const map = {
        cia: { bg: '#FEF3C7', text: '#B45309', border: '#FCD34D' },
        cisa: { bg: '#DBEAFE', text: '#1D4ED8', border: '#93C5FD' },
        cma: { bg: '#FEF9C3', text: '#92400E', border: '#FCD34D' },
        acca: { bg: '#EDE9FE', text: '#6D28D9', border: '#C4B5FD' },
        crma: { bg: '#FEF3C7', text: '#B45309', border: '#FCD34D' },
        iap: { bg: '#D1FAE5', text: '#065F46', border: '#6EE7B7' },
    };
    return map[courseSlug] || { bg: '#FEF3C7', text: '#B45309', border: '#FCD34D' };
};

const WallOfExcellence = ({ courses, activeCourse, setActiveCourse, stories }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 12; // 2 rows of 6 for a wall effect

    const tabs = [
        { name: 'ALL', slug: 'all' },
        ...(courses?.map(c => ({ name: c.name, slug: c.slug })) || []),
    ];

    // Merge Sanity stories with dummy data to ensure high-quality preview
    const combinedStories = [
        ...(stories || []),
        ...examTestimonialsData
    ];

    // Simple deduplication by name just for the preview (if we have both Sanity and Dummy)
    const displayStories = Array.from(new Map(combinedStories.map(item => [item.name, item])).values())
        .filter(s => activeCourse === 'all' || s.courseSlug === activeCourse);

    const totalPages = Math.ceil(displayStories.length / ITEMS_PER_PAGE);
    const pagedStories = displayStories.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    const handleTabChange = (slug) => {
        setActiveCourse(slug);
        setCurrentPage(1);
    };

    return (
        <section className="w-full py-16 md:py-24 font-sans relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #F8FAFC 0%, #F1F5F9 100%)' }}>
            {/* Top Accent Bar (Inspired by image) */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-brand-blue opacity-90" />
            
            <div className="max-w-[1400px] mx-auto px-4 flex flex-col items-center relative z-10">
                <div className="flex items-center gap-3 mb-5">
                    <div className="h-[1.5px] w-10 bg-[#D4AF37]" />
                    <span className="text-[#D4AF37] text-[10px] font-bold uppercase tracking-[0.2em]">Wall of Excellence</span>
                    <div className="h-[1.5px] w-10 bg-[#D4AF37]" />
                </div>
                <h2 className="text-center text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-4">
                    Where Ambition Meets<br />
                    <span className="text-brand-blue font-normal italic">Certification</span>
                </h2>
                <p className="text-center text-sm md:text-base text-gray-500 mb-10 max-w-lg">Real professionals. Real companies. Real results — across CIA, CISA, CMA & ACCA.</p>
                <div className="inline-flex items-center p-1 rounded-full mb-12 overflow-x-auto max-w-full no-scrollbar" style={{ backgroundColor: '#E2E5EF' }}>
                    {tabs.map((tab) => (
                        <button key={tab.slug} onClick={() => handleTabChange(tab.slug)} className="px-5 md:px-7 py-2 md:py-2.5 rounded-full text-[12px] md:text-sm font-semibold uppercase tracking-wide transition-all duration-200 whitespace-nowrap" style={activeCourse === tab.slug ? { backgroundColor: '#111827', color: '#fff' } : { color: '#6B7280' }}>
                            {tab.name}
                        </button>
                    ))}
                </div>
                <div className="w-full grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 mb-12">
                    <AnimatePresence mode="wait">
                        {displayStories.length > 0 ? (
                            pagedStories.map((story, index) => {
                                const courseSlug = (story.courseSlug || 'cia').toLowerCase();
                                const badge = badgeStyle(courseSlug);
                                const initials = getInitials(story.name);
                                const role = story.role || story.designation || 'Cleared';
                                
                                return (
                                    <motion.div
                                        key={story._id || index}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ duration: 0.4, delay: index * 0.03 }}
                                        className="relative mt-12 mb-4"
                                    >
                                        <div className="flex flex-col items-center bg-white rounded-[32px] p-6 pt-20 shadow-sm border border-gray-100/50 hover:shadow-2xl hover:shadow-brand-blue/10 transition-all duration-500 group h-full">
                                            {/* Student Photo (Overlapping) */}
                                            <div className="absolute -top-12 left-1/2 -translate-x-1/2 z-20">
                                                <div className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-4 border-white shadow-xl bg-gray-50 flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
                                                    {story.imageUrl ? (
                                                        <img 
                                                            src={story.imageUrl} 
                                                            alt={story.name} 
                                                            className="w-full h-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-3xl font-bold text-brand-blue/10 bg-gray-50 uppercase tracking-tighter">
                                                            {initials}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Student Name */}
                                            <h4 className="text-[18px] font-bold text-[#111827] leading-tight mb-4 tracking-tight group-hover:text-brand-blue transition-colors duration-300">
                                                {story.name}
                                            </h4>
                                            
                                            {/* Company Area (Logo Focused) */}
                                            <div className="flex-1 flex flex-col items-center justify-center w-full mb-6">
                                                <div className="h-12 w-full flex items-center justify-center mb-2 overflow-hidden">
                                                    {story.companyLogo ? (
                                                        <img 
                                                            src={story.companyLogo} 
                                                            alt={story.company} 
                                                            className="h-full max-w-[120px] object-contain transition-all duration-500 group-hover:scale-110 opacity-100"
                                                        />
                                                    ) : (
                                                        <span className="text-[11px] font-black text-gray-300 tracking-[0.2em] uppercase italic">
                                                            {story.company || 'GPC ALUMNI'}
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-[10px] font-medium text-gray-400 uppercase tracking-widest opacity-60">
                                                    {role}
                                                </p>
                                            </div>

                                            {/* Cleared Certification - Premium Badge */}
                                            <div className="mt-auto w-full px-2">
                                                <div className="group/badge relative inline-flex items-center w-full justify-center px-4 py-2.5 rounded-xl bg-[#F8FAFC] text-brand-blue border border-gray-100 transition-all duration-300 group-hover:bg-brand-blue group-hover:text-white group-hover:border-brand-blue group-hover:shadow-lg group-hover:shadow-brand-blue/20">
                                                    <span className="text-[10px] font-bold uppercase tracking-wider">
                                                        {story.courseName || courseSlug.toUpperCase()}
                                                    </span>
                                                    <div className="mx-2 h-3 w-[1px] bg-brand-blue/20 group-hover:bg-white/30" />
                                                    <span className="text-[8px] font-semibold tracking-[0.1em] opacity-70 group-hover:opacity-100">
                                                        CLEARED
                                                    </span>
                                                    {/* Subtle Checkmark on hover */}
                                                    <span className="absolute right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[10px]">
                                                        ✓
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
                                    className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-bold transition-all duration-300 ${
                                        currentPage === page 
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
