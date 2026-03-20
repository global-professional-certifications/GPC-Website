import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import arpitGarg from '../../assets/arpit-garg.png';
import akshdeepSingh from '../../assets/akshdeep-singh.png';
import { heroStudents } from './constant';

// --- Custom Hook for Real-Time Number Animation ---
const AnimatedCounter = ({ end, suffix = "", duration = 2.5 }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let startTime;
        let animationFrame;

        const updateCounter = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);

            const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            setCount(Math.floor(easeOut * end));

            if (progress < 1) {
                animationFrame = requestAnimationFrame(updateCounter);
            }
        };

        animationFrame = requestAnimationFrame(updateCounter);
        return () => cancelAnimationFrame(animationFrame);
    }, [end, duration]);

    return <>{count}{suffix}</>;
};

// --- Organisation Data ---
const alumniCompanies = [
    "KPMG",
    "GRANT THORNTON",
    "WELLS FARGO",
    "ALLSTATE INSURANCE",
    "GENPACT",
    "EMAMI LIMITED",
    "HEIDELBERGCEMENT",
    "SOBHA REALTY"
];

// --- Hall of Champions Mock Data (Based on PDF) ---
const championsData = [
    { id: 1, initials: 'AS', name: 'Akshdeep Singh', role: 'Internal Audit Specialist', bg: 'bg-yellow-100 text-yellow-600', category: 'CIA' },
    { id: 2, initials: 'WA', name: 'Wajiha Ansari', role: 'IT Audit Manager', bg: 'bg-blue-100 text-blue-600', category: 'CISA' },
    { id: 3, initials: 'RK', name: 'Rahul Kumar', role: 'Senior Associate', bg: 'bg-yellow-100 text-yellow-600', category: 'CMA' },
    { id: 4, initials: 'CB', name: 'Chahat Bhatia', role: 'Compliance Head', bg: 'bg-orange-100 text-orange-600', category: 'CIA' },
    { id: 5, initials: 'VS', name: 'Vijay Sharma', role: 'IT Auditor', bg: 'bg-indigo-100 text-indigo-600', category: 'CISA' },
    { id: 6, initials: 'NR', name: 'Nitin Rawat', role: 'Finance Controller', bg: 'bg-orange-100 text-orange-600', category: 'CMA' },
    { id: 7, initials: 'SK', name: 'Simranjeet Kaur', role: 'Risk Analyst', bg: 'bg-blue-100 text-blue-600', category: 'CIA' },
    { id: 8, initials: 'DM', name: 'Divya Mehta', role: 'Audit Executive', bg: 'bg-yellow-100 text-yellow-600', category: 'ACCA' },
    { id: 9, initials: 'SS', name: 'Shakti Sharma', role: 'Risk Advisory', bg: 'bg-yellow-100 text-yellow-600', category: 'CIA' },
    { id: 10, initials: 'MD', name: 'Md Danish', role: 'Information Security', bg: 'bg-blue-100 text-blue-600', category: 'CISA' },
];

const GPCSuccessHero = () => {
    const [activeCategory, setActiveCategory] = useState('ALL');
    const [studentIdx, setStudentIdx] = useState(0);

    // Auto-cycle students every 3 seconds
    useEffect(() => {
        const timer = setInterval(() => {
            setStudentIdx(prev => (prev + 1) % heroStudents.length);
        }, 3000);
        return () => clearInterval(timer);
    }, []);

    const student = heroStudents[studentIdx];

    // Independent floating animations for all four bubbles
    const floatTopRight = { animate: { y: [0, -8, 0], x: [0, 4, 0], transition: { duration: 4.5, repeat: Infinity, ease: "easeInOut" } } };
    const floatMiddleLeft = { animate: { y: [0, 6, 0], x: [0, -3, 0], transition: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 } } };
    const floatTopLeft = { animate: { y: [0, -8, 0], x: [0, -4, 0], transition: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 } } };
    const floatMiddleRight = { animate: { y: [0, 8, 0], x: [0, 5, 0], transition: { duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 } } };
    const floatBottomRight = { animate: { y: [0, -6, 0], x: [0, 3, 0], transition: { duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 0.8 } } };

    const filteredChampions = activeCategory === 'ALL'
        ? championsData
        : championsData.filter(champ => champ.category === activeCategory);

    return (
        // Global wrapper applies Inter, sans-serif at 400 weight for everything
        <div
            className="bg-[#FFFFFF] w-full overflow-x-hidden flex flex-col text-slate-800"
            style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 400 }}
        >

            {/* ========================================================= */}
            {/* 1. MAIN HERO + STATS WRAPPER */}
            {/* ========================================================= */}
            <div className="min-h-screen flex flex-col justify-between">

                {/* MAIN HERO SECTION */}
                <div className="flex-1 max-w-[1400px] mx-auto w-full px-4 md:px-8 pt-6 lg:pt-8 pb-4 flex flex-col lg:flex-row items-start justify-center gap-12 lg:gap-4">

                    {/* --- LEFT RING: MENTOR SECTION --- */}
                    <div className="relative w-full lg:flex-1 flex flex-col items-center pt-10">
                        <div className="relative">
                            <div className="absolute inset-[-12px] md:inset-[-18px] rounded-full border-[1.5px] border-dashed border-slate-200" />
                            <div className="w-[240px] h-[240px] md:w-[280px] md:h-[280px] rounded-full border-[10px] md:border-[12px] border-white shadow-[0_10px_40px_rgba(0,0,0,0.08)] overflow-hidden relative z-10 bg-slate-50">
                                <img src={arpitGarg} alt="Arpit Garg" className="w-full h-full object-cover" />
                            </div>

                            <motion.div {...floatTopRight} className="absolute -top-2 -right-2 md:-right-6 z-20 bg-white px-3 md:px-4 py-2.5 rounded-2xl shadow-[0_8px_25px_rgba(0,0,0,0.06)] border border-slate-50 min-w-[110px] md:min-w-[130px]">
                                <p className="text-[8px] md:text-[9px] text-[#F59E0B] uppercase tracking-wide mb-0.5">TOP MENTOR</p>
                                <p className="text-[13px] md:text-[15px] font-extrabold text-[#2D1B69] leading-tight tracking-tight">Corporate Finance</p>
                            </motion.div>

                            <motion.div {...floatMiddleLeft} className="absolute left-[-15px] md:left-[-25px] top-1/2 -translate-y-1/2 z-20 bg-white px-3 py-1.5 md:py-2 rounded-xl shadow-[0_8px_25px_rgba(0,0,0,0.06)] border border-slate-50 text-[10px] md:text-[11px] font-bold text-[#2D1B69]">
                                15+ Yrs Exp.
                            </motion.div>

                            <motion.div {...floatBottomRight} className="absolute bottom-5 md:bottom-8 -right-2 md:-right-4 bg-white px-4 py-2 md:py-2.5 rounded-full shadow-xl border border-slate-50 z-20 flex items-center gap-1.5 text-[12px] md:text-[14px] font-extrabold text-slate-800 tracking-tight">
                                4.9 <span className="text-[#F59E0B] text-[15px] md:text-[17px] leading-none mb-0.5" style={{ filter: 'drop-shadow(0 2px 4px rgba(245, 158, 11, 0.3))' }}>★</span>
                            </motion.div>

                            <div className="absolute -bottom-6 left-0 md:left-2 z-30 bg-[#2D1B69] text-white p-3 md:p-4 rounded-2xl shadow-2xl w-[180px] md:w-[220px]">
                                <p className="text-[9px] md:text-[10px] leading-relaxed italic">
                                    "The goal isn't just a certificate; it's a career transformation."
                                </p>
                            </div>
                        </div>

                        <div className="mt-16 md:mt-20 text-center">
                            <h4 className="text-[15px] md:text-[16px] font-extrabold text-[#2D1B69]">Arpit Garg</h4>
                            <p className="text-[11px] md:text-[12px] text-slate-500">Lead Mentor, GPC</p>
                        </div>
                    </div>

                    {/* --- CENTER: TYPOGRAPHY & HEADLINES --- */}
                    <div className="w-full lg:flex-[1.2] text-center z-10 flex flex-col items-center">
                        <span className="bg-[#FAF5E6] text-[#B89838] px-4 py-1.5 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-[0.15em] mb-4 md:mb-5">
                            HALL OF CHAMPIONS
                        </span>

                        <h1
                            className="text-[40px] md:text-[52px] lg:text-[64px] leading-[0.9] font-black text-[#2D1B69] tracking-[-0.02em] flex flex-col items-center"
                            style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                            <span>Real people.</span>
                            <span>Real careers.</span>
                            <span className="font-bold italic text-[#B89838] text-[32px] md:text-[42px] lg:text-[50px] mt-1 lg:mt-1.5 pr-2 lg:pr-4">Transformed.</span>
                        </h1>

                        <p className="text-slate-600 font-medium text-[13px] md:text-[14px] max-w-sm mx-auto mt-4 md:mt-5 leading-relaxed px-2">
                            Join thousands of professionals who breached their career glass ceilings through GPC's specialized guidance and global curriculum.
                        </p>

                        <div className="flex flex-col sm:flex-row justify-center gap-3 mt-5 md:mt-6 w-full px-4 sm:px-0">
                            <button className="bg-[#2D1B69] text-white px-6 md:px-7 py-2.5 md:py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-shadow text-[13px] md:text-[14px]">
                                Explore Stories →
                            </button>
                            <button className="bg-white border-[1.5px] border-slate-200 px-6 md:px-7 py-2.5 md:py-3 rounded-xl font-bold text-slate-700 flex items-center justify-center gap-2 shadow-sm hover:bg-slate-50 transition-colors text-[13px] md:text-[14px]">
                                <span className="text-[#F59E0B] text-lg leading-none">▶</span> Watch Videos
                            </button>
                        </div>
                    </div>

                    {/* --- RIGHT RING: STUDENT SECTION (SLIDESHOW) --- */}
                    <div className="relative w-full lg:flex-1 flex flex-col items-center mt-10 lg:mt-0 pt-10">
                        <div className="relative">
                            <div className="absolute inset-[-12px] md:inset-[-18px] rounded-full border-[1.5px] border-dashed border-slate-200" />

                            {/* Photo / Avatar ring — crossfade with mode="sync" + absolute children */}
                            <div className="w-[240px] h-[240px] md:w-[280px] md:h-[280px] rounded-full border-[10px] md:border-[12px] border-white shadow-[0_10px_40px_rgba(0,0,0,0.08)] overflow-hidden relative z-10 bg-slate-50">
                                <AnimatePresence mode="sync">
                                    {student.image ? (
                                        <motion.img
                                            key={`img-${studentIdx}`}
                                            src={student.image}
                                            alt={student.name}
                                            className="absolute inset-0 w-full h-full object-cover"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.7, ease: 'easeInOut' }}
                                        />
                                    ) : (
                                        <motion.div
                                            key={`avatar-${studentIdx}`}
                                            className="absolute inset-0 w-full h-full flex items-center justify-center"
                                            style={{ background: student.avatarBg }}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.7, ease: 'easeInOut' }}
                                        >
                                            <span
                                                className="text-white font-black select-none"
                                                style={{ fontSize: '90px', fontFamily: "'Outfit', sans-serif", opacity: 0.85, letterSpacing: '-4px' }}
                                            >
                                                {student.initials}
                                            </span>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Top-left badge: course + attempt */}
                            <motion.div {...floatTopLeft} className="absolute -top-2 -left-2 md:-left-6 z-20 bg-white px-3 md:px-4 py-2.5 rounded-2xl shadow-[0_8px_25px_rgba(0,0,0,0.06)] border border-slate-50 text-center min-w-[100px] md:min-w-[120px]">
                                <AnimatePresence mode="sync">
                                    <motion.div
                                        key={`badge-${studentIdx}`}
                                        className="absolute inset-0 flex flex-col items-center justify-center"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.5, ease: 'easeInOut' }}
                                    >
                                        <p className="text-[8px] md:text-[9px] text-[#059669] uppercase tracking-wide mb-0.5">{student.courseTag}</p>
                                        <p className="text-[13px] md:text-[15px] font-extrabold text-[#2D1B69] leading-none tracking-tight">{student.attempt}</p>
                                    </motion.div>
                                </AnimatePresence>
                                {/* invisible placeholder so the container keeps its size */}
                                <p className="text-[8px] invisible">X</p>
                                <p className="text-[13px] invisible">X</p>
                            </motion.div>

                            {/* Right bubble: placed at company */}
                            <motion.div {...floatMiddleRight} className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-8 z-20 bg-white px-4 md:px-5 py-2.5 rounded-2xl shadow-[0_8px_25px_rgba(0,0,0,0.06)] border border-slate-50 text-center min-w-[90px] md:min-w-[110px]">
                                <AnimatePresence mode="sync">
                                    <motion.div
                                        key={`company-${studentIdx}`}
                                        className="absolute inset-0 flex flex-col items-center justify-center"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.5, ease: 'easeInOut' }}
                                    >
                                        <p className="text-[8px] md:text-[9px] text-black uppercase tracking-wide mb-0.5">PLACED AT</p>
                                        <p className="text-[16px] md:text-[18px] font-extrabold text-[#2D1B69] leading-none tracking-tight">{student.company}</p>
                                    </motion.div>
                                </AnimatePresence>
                                {/* invisible placeholder */}
                                <p className="text-[8px] invisible">X</p>
                                <p className="text-[18px] invisible">X</p>
                            </motion.div>

                            {/* Quote card */}
                            <div className="absolute -bottom-6 right-0 md:-right-2 z-30 bg-[#2D1B69] text-white rounded-2xl shadow-2xl w-[190px] md:w-[230px] min-h-[52px] flex items-center justify-center">
                                <AnimatePresence mode="sync">
                                    <motion.div
                                        key={`quote-${studentIdx}`}
                                        className="absolute inset-0 flex flex-col items-center justify-center p-3 md:p-4 text-center"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.5, ease: 'easeInOut' }}
                                    >
                                        <p className="text-[9px] md:text-[10px] leading-relaxed italic">
                                            "{student.quote}"
                                        </p>
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* Name + designation — fixed height to prevent stats from jumping */}
                        <div className="mt-16 md:mt-20 flex flex-col items-center justify-center relative w-full" style={{ minHeight: '60px' }}>
                            <AnimatePresence mode="sync">
                                <motion.div
                                    key={`name-${studentIdx}`}
                                    className="absolute inset-0 flex flex-col items-center justify-start"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                                >
                                    <h4 className="text-[15px] md:text-[16px] font-extrabold text-[#2D1B69]">{student.name}</h4>
                                    <p className="text-[11px] md:text-[12px] text-slate-500">
                                        {student.designation}, <span className="font-bold text-slate-700">{student.company}</span>
                                    </p>
                                </motion.div>
                            </AnimatePresence>

                            {/* Dot indicators */}
                            <div className="flex justify-center gap-1.5 mt-10">
                                {heroStudents.map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setStudentIdx(i)}
                                        className="rounded-full transition-all duration-300"
                                        style={{
                                            width: i === studentIdx ? '18px' : '6px',
                                            height: '6px',
                                            backgroundColor: i === studentIdx ? '#2D1B69' : '#CBD5E1',
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- BOTTOM STATS STRIP --- */}
                {/* 
                <div className="bg-[#2D1B69] py-6 md:py-8 w-full relative z-20 mt-auto">
                    <div className="w-full max-w-[1200px] mx-auto px-6 flex items-center justify-between">
                        <div className="flex-1 text-white flex flex-col items-center">
                            <h2 className="text-[32px] md:text-[38px] font-bold leading-none"><AnimatedCounter end={1200} suffix="+" /></h2>
                            <p className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.15em] text-[#A78BFA] mt-1.5">CHAMPIONS</p>
                        </div>
                        <div className="w-px self-stretch bg-white/20" />
                        <div className="flex-1 text-white flex flex-col items-center">
                            <h2 className="text-[32px] md:text-[38px] font-bold leading-none"><AnimatedCounter end={94} suffix="%" /></h2>
                            <p className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.15em] text-[#A78BFA] mt-1.5">PASS RATE</p>
                        </div>
                        <div className="w-px self-stretch bg-white/20" />
                        <div className="flex-1 text-white flex flex-col items-center">
                            <h2 className="text-[32px] md:text-[38px] font-bold leading-none"><AnimatedCounter end={38} suffix="+" /></h2>
                            <p className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.15em] text-[#A78BFA] mt-1.5">COUNTRIES</p>
                        </div>
                        <div className="w-px self-stretch bg-white/20" />
                        <div className="flex-1 text-white flex flex-col items-center">
                            <h2 className="text-[32px] md:text-[38px] font-bold leading-none"><AnimatedCounter end={42} suffix="%" /></h2>
                            <p className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.15em] text-[#A78BFA] mt-1.5">SALARY HIKE</p>
                        </div>
                    </div>
                </div>
                */}

            </div>

            {/* ========================================================= */}
            {/* 2. ORGANISATIONS MARQUEE (RUNNING EFFECT) */}
            {/* ========================================================= */}
            <div className="bg-[#F8F9FA] py-10 md:py-12 w-full overflow-hidden flex flex-col items-center relative z-10">
                <p className="text-center text-[10px] md:text-[12px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-8 md:mb-10">
                    Our Alumni Now Work At World-Class Organisations
                </p>

                <div className="flex overflow-hidden relative w-full max-w-[1600px]">
                    <style>{`
                        @keyframes marquee-infinite {
                            0% { transform: translateX(0%); }
                            100% { transform: translateX(-50%); }
                        }
                        .animate-marquee-infinite {
                            animation: marquee-infinite 35s linear infinite;
                        }
                        .animate-marquee-infinite:hover {
                            animation-play-state: paused;
                        }
                    `}</style>
                    <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-[#F8F9FA] to-transparent z-10 pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-[#F8F9FA] to-transparent z-10 pointer-events-none" />

                    <div className="flex whitespace-nowrap items-center gap-4 md:gap-6 px-4 animate-marquee-infinite">
                        {[...alumniCompanies, ...alumniCompanies].map((company, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-center min-w-[180px] md:min-w-[220px] h-[60px] md:h-[70px] bg-white border border-slate-200 shadow-[0_4px_12px_rgba(0,0,0,0.03)] rounded-xl md:rounded-2xl shrink-0 transition-shadow hover:shadow-[0_6px_16px_rgba(0,0,0,0.06)]"
                            >
                                <span className="text-[13px] md:text-[15px] font-bold text-slate-400 tracking-wider">
                                    {company}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>



        </div>
    );
};

export default GPCSuccessHero;