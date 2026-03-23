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

    // Static student (Akshdeep Singh) instead of slideshow
    const student = heroStudents.find(s => s.name === 'Akshdeep Singh') || heroStudents[0];

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
            className="bg-brand-blue w-full overflow-x-hidden flex flex-col text-white pt-16 md:pt-20 pb-24"
            style={{ fontWeight: 400 }}
        >


            <div className="flex flex-col justify-between">

                {/* MAIN HERO SECTION */}
                <div className="flex-1 max-w-[1400px] mx-auto w-full px-4 md:px-8 pt-6 lg:pt-8 pb-4 flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-8">

                    {/* --- LEFT RING: MENTOR SECTION --- */}
                    <div className="relative w-full lg:flex-1 flex flex-col items-center">
                        <div className="relative">
                            <div className="absolute inset-[-12px] md:inset-[-18px] rounded-full border-[1.5px] border-dashed border-white/20" />
                            <div className="w-[240px] h-[240px] md:w-[280px] md:h-[280px] rounded-full border-[10px] md:border-[12px] border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.2)] overflow-hidden relative z-10 bg-brand-blue/50">
                                <img src={arpitGarg} alt="Arpit Garg" className="w-full h-full object-cover" />
                            </div>

                            <motion.div {...floatTopRight} className="absolute -top-2 -right-2 md:-right-6 z-20 bg-white px-3 md:px-4 py-2.5 rounded-2xl shadow-xl border border-white/10 min-w-[110px] md:min-w-[130px]">
                                <p className="text-[8px] md:text-[9px] text-orange-600 uppercase tracking-wide mb-0.5">TOP MENTOR</p>
                                <p className="text-[13px] md:text-[15px] font-extrabold text-brand-blue leading-tight tracking-tight">Corporate Finance</p>
                            </motion.div>

                            <motion.div {...floatMiddleLeft} className="absolute left-[-15px] md:left-[-25px] top-1/2 -translate-y-1/2 z-20 bg-white px-3 py-1.5 md:py-2 rounded-xl shadow-xl border border-white/10 text-[10px] md:text-[11px] font-bold text-brand-blue">
                                15+ Yrs Exp.
                            </motion.div>

                            <motion.div {...floatBottomRight} className=" text-brand-blue absolute bottom-5 md:bottom-8 -right-2 md:-right-4 bg-white px-4 py-2 md:py-2.5 rounded-full shadow-xl border border-white/10 z-20 flex items-center gap-1.5 text-[12px] md:text-[14px] font-extrabold text-slate-800 tracking-tight">
                                5/5 <span className="text-[#F59E0B] text-[15px] md:text-[17px] leading-none mb-0.5" style={{ filter: 'drop-shadow(0 2px 4px rgba(245, 158, 11, 0.3))' }}>★</span>
                            </motion.div>

                            <div className="absolute -bottom-12 left-0 z-30 bg-[#2D1B69] text-center text-white p-3 md:p-3 rounded-2xl shadow-2xl w-[180px] md:w-[280px]">
                                <p className="text-[9px] md:text-sm leading-relaxed italic">
                                    "The goal isn't just a certificate; it's a career transformation."
                                </p>
                            </div>
                        </div>

                        <div className="mt-16 md:mt-20 text-center">
                            <h4 className="text-[16px] md:text-[18px] font-bold text-white">Arpit Garg</h4>
                            <p className="text-[12px] md:text-[13px] text-gray-300">Lead Mentor, GPC</p>
                        </div>
                    </div>

                    {/* --- CENTER: TYPOGRAPHY & HEADLINES --- */}
                    <div className="w-full lg:flex-[1.2] text-center z-10 flex flex-col items-center">
                        <h1
                            className="text-3xl md:text-6xl font-bold leading-tight text-white flex flex-col items-center"
                        >
                            <span>Real <span className="text-orange-400">people.</span></span>
                            <span><span className="text-orange-400">Real</span> careers.</span>
                        </h1>
                        <p className="mt-4 text-base sm:text-sm md:text-base text-gray-200 max-w-lg leading-relaxed">
                            Join thousands of professionals who breached their career glass ceilings through <span className='font-bold text-orange-400'>Global Professional Certifications'</span> specialized guidance and global curriculum.
                        </p>

                        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8 md:mt-10 w-full px-4 sm:px-0">
                            <button className="inline-flex items-center justify-center px-8 py-3 text-lg font-semibold text-white rounded-lg shadow-lg transition-all duration-300 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 hover:scale-105 hover:shadow-xl">
                                Explore Stories
                            </button>
                            <button className="bg-transparent border-2 border-white/30 px-8 py-3 rounded-lg font-semibold text-white flex items-center justify-center gap-2 hover:bg-white/10 transition-all hover:scale-105 text-lg shadow-lg">
                                Watch Videos
                            </button>
                        </div>
                    </div>

                    {/* --- RIGHT RING: STUDENT SECTION (SLIDESHOW) --- */}
                    <div className="relative w-full lg:flex-1 flex flex-col items-center mt-12 lg:mt-0">
                        <div className="relative">
                            <div className="absolute inset-[-12px] md:inset-[-18px] rounded-full border-[1.5px] border-dashed border-white/20" />

                            {/* Photo / Avatar ring — crossfade with mode="sync" + absolute children */}
                            <div className="w-[240px] h-[240px] md:w-[280px] md:h-[280px] rounded-full border-[10px] md:border-[12px] border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.2)] overflow-hidden relative z-10 bg-brand-blue/50">
                                <AnimatePresence mode="sync">
                                    {student.image ? (
                                        <motion.img
                                            key="img-static"
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
                                            key="avatar-static"
                                            className="absolute inset-0 w-full h-full flex items-center justify-center"
                                            style={{ background: student.avatarBg }}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.7, ease: 'easeInOut' }}
                                        >
                                            <span
                                                className="text-white font-black select-none"
                                                style={{ fontSize: '90px', opacity: 0.85, letterSpacing: '-4px' }}
                                            >
                                                {student.initials}
                                            </span>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Top-left badge: course + attempt */}
                            <motion.div {...floatTopLeft} className="absolute -top-2 -left-2 md:-left-6 z-20 bg-white px-3 md:px-4 py-2.5 rounded-2xl shadow-xl border border-white/10 text-center min-w-[100px] md:min-w-[120px]">
                                <AnimatePresence mode="sync">
                                    <motion.div
                                        key="badge-static"
                                        className="absolute inset-0 flex flex-col items-center justify-center"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.5, ease: 'easeInOut' }}
                                    >
                                        <p className="text-[8px] md:text-[9px] text-[#059669] uppercase tracking-wide mb-0.5 font-bold">{student.courseTag}</p>
                                        <p className="text-[13px] md:text-[15px] font-extrabold text-[#2D1B69] leading-none tracking-tight">{student.attempt}</p>
                                    </motion.div>
                                </AnimatePresence>
                                {/* invisible placeholder so the container keeps its size */}
                                <p className="text-[8px] invisible">X</p>
                                <p className="text-[13px] invisible">X</p>
                            </motion.div>

                            {/* Right bubble: placed at company */}
                            <motion.div {...floatMiddleRight} className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-12 z-20 bg-white px-4 md:px-5 py-2.5 rounded-2xl shadow-xl border border-white/10 text-center min-w-[150px]">
                                <AnimatePresence mode="sync">
                                    <motion.div
                                        key="company-static"
                                        className="absolute inset-0 flex flex-col items-center justify-center"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.5, ease: 'easeInOut' }}
                                    >
                                        <p className="text-[8px] md:text-[9px] text-black uppercase tracking-wide mb-0.5 font-bold">Works AT</p>
                                        <p className="text-[16px] md:text-[18px] font-extrabold text-[#2D1B69] leading-none tracking-tight">{student.company}</p>
                                    </motion.div>
                                </AnimatePresence>
                                {/* invisible placeholder */}
                                <p className="text-[8px] invisible">X</p>
                                <p className="text-[18px] invisible">X</p>
                            </motion.div>

                            {/* Quote card */}
                            <div className="absolute -bottom-12 right-0 md:-right-2 z-30 bg-[#2D1B69] text-white rounded-2xl shadow-2xl w-[190px] md:w-[300px] min-h-[65px] flex items-center justify-center">
                                <AnimatePresence mode="sync">
                                    <motion.div
                                        key="quote-static"
                                        className="absolute inset-0 flex flex-col items-center justify-center p-3 md:p-4 text-center"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.5, ease: 'easeInOut' }}
                                    >
                                        <p className="text-[9px] md:text-sm leading-relaxed italic font-medium">
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
                                    key="name-static"
                                    className="absolute inset-0 flex flex-col items-center justify-start"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                                >
                                    <h4 className="text-[16px] md:text-[18px] font-bold text-white">{student.name}</h4>
                                    <p className="text-[12px] md:text-[13px] text-gray-300">
                                        {student.designation}, <span className="font-bold text-white">{student.company}</span>
                                    </p>
                                </motion.div>
                            </AnimatePresence>

                            {/* Dot indicators */}
                        </div>
                    </div>
                </div>

            </div>
        </div >
    );
};

export default GPCSuccessHero;