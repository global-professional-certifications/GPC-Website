import React, { useState } from 'react';
import { examTestimonialsData } from './constant';

// Helper: get two-letter initials
const getInitials = (name) => {
    if (!name) return '?';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    return name.substring(0, 2).toUpperCase();
};

// Avatar background + text colour per course
const avatarStyle = (courseSlug) => {
    const map = {
        cia: { bg: '#FEF9C3', text: '#92400E' }, // warm yellow
        cisa: { bg: '#DBEAFE', text: '#1E40AF' }, // soft blue
        cma: { bg: '#FEF9C3', text: '#92400E' },
        acca: { bg: '#EDE9FE', text: '#5B21B6' },
        crma: { bg: '#FEF9C3', text: '#92400E' },
        iap: { bg: '#D1FAE5', text: '#065F46' },
    };
    return map[courseSlug] || { bg: '#FEF9C3', text: '#92400E' };
};

// Course badge colour per course
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

const Testimonials = ({ courses, activeCourse, setActiveCourse, stories }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 8;

    const tabs = [
        { name: 'ALL', slug: 'all' },
        ...(courses?.map(c => ({ name: c.name, slug: c.slug })) || []),
    ];

    // Use Sanity data only if it has the card detail fields (company/location/designation)
    const hasSanityStories = stories && stories.length > 0 &&
        stories.some(s => s.company || s.designation || s.location);
    const displayStories = hasSanityStories
        ? stories.filter(s => activeCourse === 'all' || s.courseSlug === activeCourse)
        : examTestimonialsData.filter(
            s => activeCourse === 'all' || s.courseSlug === activeCourse
        );

    const totalPages = Math.ceil(displayStories.length / ITEMS_PER_PAGE);
    const pagedStories = displayStories.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const handleTabChange = (slug) => {
        setActiveCourse(slug);
        setCurrentPage(1);
    };

    return (
        <section
            style={{ background: 'linear-gradient(135deg, #EEF0F8 0%, #E8E6F5 50%, #EFF0F9 100%)' }}
            className="w-full py-16 md:py-20 font-sans"
        >
            <div className="max-w-[1400px] mx-auto px-4 flex flex-col items-center">

                {/* ── Top Label ── */}
                <div className="flex items-center gap-3 mb-5">
                    <div className="h-[1.5px] w-10 bg-[#D4AF37]" />
                    <span className="text-[#D4AF37] text-[10px] font-bold uppercase tracking-[0.2em]">Wall of Excellence</span>
                    <div className="h-[1.5px] w-10 bg-[#D4AF37]" />
                </div>

                {/* ── Heading ── */}
                <h2 className="text-center text-3xl md:text-4xl font-semibold text-gray-900 leading-tight mb-3">
                    Where Ambition Meets<br />
                    <span className="italic font-semibold" style={{ color: '#C9A227', fontFamily: "'Playfair Display', serif" }}>Certification</span>
                </h2>

                {/* ── Subtitle ── */}
                <p className="text-center text-sm md:text-base text-gray-500 mb-10 max-w-lg">
                    Real professionals. Real companies. Real results — across CIA, CISA, CMA &amp; ACCA.
                </p>

                {/* ── Toggle Bar ── */}
                <div
                    className="inline-flex items-center p-1 rounded-full mb-12"
                    style={{ backgroundColor: '#E2E5EF' }}
                >
                    {tabs.map((tab) => (
                        <button
                            key={tab.slug}
                            onClick={() => handleTabChange(tab.slug)}
                            className="px-7 py-2.5 rounded-full text-sm font-semibold uppercase tracking-wide transition-all duration-200 whitespace-nowrap"
                            style={
                                activeCourse === tab.slug
                                    ? { backgroundColor: '#111827', color: '#fff' }
                                    : { color: '#6B7280' }
                            }
                        >
                            {tab.name}
                        </button>
                    ))}
                </div>

                {/* ── Card Grid ── */}
                <div
                    className="w-full grid gap-4"
                    style={{
                        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                    }}
                >
                    {displayStories.length > 0 ? (
                        pagedStories.map((story, index) => {
                            const courseSlug = story.courseSlug || 'cia';
                            const av = avatarStyle(courseSlug);
                            const badge = badgeStyle(courseSlug);
                            const initials = getInitials(story.name);
                            // Sanity uses 'designation'; fallback data uses 'role'
                            const role = story.role || story.designation || '';

                            return (
                                <div
                                    key={story._id || index}
                                    className="flex flex-col bg-white rounded-2xl p-5 shadow-sm hover:shadow-xl hover:shadow-[#2D1B69]/10 hover:scale-[1.03] transition-all duration-300"
                                    style={{ minHeight: '220px' }}
                                >
                                    {/* ── Row 1: Avatar + Badge ── */}
                                    <div className="flex items-start justify-between mb-4">
                                        {/* Avatar circle */}
                                        <div
                                            className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                                            style={{ backgroundColor: av.bg }}
                                        >
                                            <span
                                                className="text-base font-bold"
                                                style={{ color: av.text }}
                                            >
                                                {initials}
                                            </span>
                                        </div>

                                        {/* Course badge */}
                                        <span
                                            className="text-[10px] font-bold px-2 py-0.5 rounded"
                                            style={{
                                                backgroundColor: badge.bg,
                                                color: badge.text,
                                                border: `1px solid ${badge.border}`,
                                            }}
                                        >
                                            {courseSlug.toUpperCase()}
                                        </span>
                                    </div>

                                    {/* ── Name ── */}
                                    <p className="text-sm font-bold text-gray-900 leading-snug mb-0.5">
                                        {story.name}
                                    </p>

                                    {/* ── Company • Location ── */}
                                    <p className="text-xs text-gray-500 mb-2">
                                        {story.company}
                                        {story.location ? ` • ${story.location}` : ''}
                                    </p>

                                    {/* ── Role (italic) ── */}
                                    <p className="text-xs italic text-gray-700 flex-1">
                                        {role}
                                    </p>

                                    {/* ── Bottom: Batch + Cleared ── */}
                                    <div
                                        className="flex items-center justify-end mt-4 pt-3"
                                        style={{ borderTop: '1px solid #F3F4F6' }}
                                    >
                                        {/* <span className="text-[10px] font-semibold text-gray-500 tracking-wide">
                                            {story.batch || `BATCH 2023-A`}
                                        </span> */}
                                        <span className="flex items-center gap-1">
                                            <span
                                                className="w-2 h-2 rounded-full"
                                                style={{ backgroundColor: '#22C55E' }}
                                            />
                                            <span className="text-[10px] font-semibold text-green-600">
                                                Cleared
                                            </span>
                                        </span>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="col-span-full text-center text-gray-500 py-12">
                            No success stories found for this certification yet.
                        </div>
                    )}
                </div>

                {/* ── Pagination ── */}
                {totalPages > 1 && (
                    <div className="flex items-center gap-3 mt-10">
                        {/* Prev */}
                        <button
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                            className="w-9 h-9 flex items-center justify-center rounded-xl border transition-all duration-200"
                            style={{
                                borderColor: currentPage === 1 ? '#D1D5DB' : '#2D1B69',
                                color: currentPage === 1 ? '#D1D5DB' : '#2D1B69',
                                backgroundColor: 'white',
                                boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
                            }}
                        >
                            &#8592;
                        </button>

                        {/* Page dots / numbers */}
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                            <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className="w-9 h-9 flex items-center justify-center rounded-xl text-sm font-semibold transition-all duration-200"
                                style={{
                                    backgroundColor: currentPage === page ? '#2D1B69' : 'white',
                                    color: currentPage === page ? '#fff' : '#6B7280',
                                    border: currentPage === page ? '2px solid #2D1B69' : '1.5px solid #D1D5DB',
                                    boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
                                }}
                            >
                                {page}
                            </button>
                        ))}

                        {/* Next */}
                        <button
                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                            className="w-9 h-9 flex items-center justify-center rounded-xl border transition-all duration-200"
                            style={{
                                borderColor: currentPage === totalPages ? '#D1D5DB' : '#2D1B69',
                                color: currentPage === totalPages ? '#D1D5DB' : '#2D1B69',
                                backgroundColor: 'white',
                                boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
                            }}
                        >
                            &#8594;
                        </button>
                    </div>
                )}

            </div>
        </section>
    );
};

export default Testimonials;
