import React, { useState, useEffect } from 'react';
import { motion, m, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';

// Hero Images
import agmIiaDelhiChapterOne from "../../assets/AGM-IIA-Delhi/AGM-IIA-Delhi-9-success.png";
import agmIiaDelhiChapterTwo from "../../assets/AGM-IIA-Delhi/AGM-IIA-Delhi-7-success.png";
import passoutStudents from "../../assets/Passout-students.jpeg";
import wofaFive from "../../assets/wofa-2025/wofa-5.jpeg";
import iiaHyderabadOne from "../../assets/iia-hyderabad/iia-hyderabad-1.jpeg";

const HeroSection = () => {
    const heroImages = [
        agmIiaDelhiChapterOne,
        agmIiaDelhiChapterTwo,
        iiaHyderabadOne,
        passoutStudents,
        wofaFive,
    ];

    const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(true);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentHeroIndex((prev) => prev + 1);
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (currentHeroIndex === heroImages.length) {
            setCurrentHeroIndex(0);
        }
    }, [currentHeroIndex, heroImages.length]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" }
        }
    };

    const floatAnimation = {
        animate: {
            y: [0, -10, 0],
            transition: {
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    };

    return (
        <section className="relative w-full bg-brand-blue flex items-center justify-center px-4 sm:px-6 md:px-8 overflow-hidden">
            {/* --- DECORATIVE BACKGROUND ELEMENTS --- */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {/* Subtle radial overlay for depth */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,165,0,0.05)_0%,transparent_70%)]" />

                {/* Left blurry blob */}
                <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-orange-500/10 rounded-full blur-[120px] md:blur-[160px]" />

                {/* Right blurry blob */}
                <div className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[50%] bg-brand-purple/20 rounded-full blur-[140px] md:blur-[180px]" />
            </div>

            <div className="relative w-full max-w-7xl mx-auto py-20 md:py-28 flex flex-col lg:grid lg:grid-cols-2 gap-12 lg:gap-8 items-center pl-0 lg:pl-12">

                {/* Left Content with Staggered Entrance */}
                <motion.div
                    className="w-full flex flex-col items-center lg:items-start text-center lg:text-left space-y-8 z-10"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <motion.div variants={itemVariants} className="space-y-4">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white max-w-2xl tracking-tight">
                            Ready to create <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">your own</span> success story?
                        </h1>
                    </motion.div>

                    <motion.h2 variants={itemVariants} className="text-base sm:text-lg md:text-xl text-gray-200 max-w-xl leading-relaxed">
                        Discover our <span className='font-bold text-orange-400'>certification programs</span> and take the next step to <span className='font-bold text-orange-400'>advance your career</span> today!
                    </motion.h2>

                    <motion.div variants={itemVariants} className="pt-2">
                        <div className="mt-8">
                            <Link
                                to="/courses"
                                className="inline-flex items-center justify-center px-8 py-3 text-lg font-semibold text-white 
                        rounded-lg shadow-lg transition-all duration-300 
                        bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 
                        hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-400"
                            >
                                Explore Our Programs
                            </Link>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Right Image Carousel with Premium Frame */}
                <motion.div
                    className="relative w-full flex flex-col items-center justify-center space-y-6 z-10"
                    variants={floatAnimation}
                    animate="animate"
                >
                    {/* Glassy container frame */}
                    <div className="relative group">
                        {/* Decorative shadow layer */}
                        <div className="absolute -inset-2 bg-gradient-to-r from-orange-500/20 to-purple-600/20 rounded-3xl blur-2xl opacity-50 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />

                        {/* Main wrap with glass stroke */}
                        <div className={`relative overflow-hidden rounded-2xl md:rounded-[2rem] border-[1px] border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-brand-blue/30 backdrop-blur-sm ${isMobile ? 'w-full max-w-sm' : 'w-full max-w-md'} p-1 md:p-1.5`}>
                            <div className="overflow-hidden rounded-xl md:rounded-[1.75rem]">
                                <motion.div
                                    animate={{ x: `-${(currentHeroIndex % heroImages.length) * 100}%` }}
                                    transition={{ duration: isAnimating ? 0.7 : 0, ease: [0.32, 0.72, 0, 1] }}
                                    className="flex"
                                >
                                    {[...heroImages, ...heroImages].map((image, index) => (
                                        <div key={index} className="w-full flex-shrink-0 relative aspect-[4/3]">
                                            <img
                                                src={image}
                                                className="w-full h-full object-cover"
                                                alt={`Success story ${(index % heroImages.length) + 1}`}
                                            />
                                            {/* Subtle vignette on images */}
                                            <div className="absolute inset-0 shadow-[inset_0_0_80px_rgba(0,0,0,0.2)]" />
                                        </div>
                                    ))}
                                </motion.div>
                            </div>
                        </div>

                        {/* Pagination indicator bar (minimalist) */}
                        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                            {heroImages.map((_, idx) => (
                                <div
                                    key={idx}
                                    className={`h-1 rounded-full transition-all duration-500 ${currentHeroIndex % heroImages.length === idx ? 'w-6 bg-orange-500' : 'w-2 bg-white/20'}`}
                                />
                            ))}
                        </div>
                    </div>

                    <p className="font-medium text-center text-gray-300 text-sm md:text-base px-4 max-w-xs leading-relaxed opacity-80 italic">
                        "Empowering industrious alumni who have made us proud."
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default HeroSection;
