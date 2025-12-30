import React, { useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import MetaTags from '../MetaTags';
import useScrollAnimation from '../Hooks/useScrollAnimation';
import { FaGraduationCap, FaHandshake, FaChartLine, FaRocket, FaStar, FaUsers, FaCheckCircle, FaTrophy } from 'react-icons/fa';
import confetti from 'canvas-confetti';
import pinkyTestimonial from "../../assets/pinky-photo.jpg";
import akshdeepTestimonial from "../../assets/akshdeep-singh.png";
import starwinTestimonial from "../../assets/testimonial-2.png";
import wajihaTestimonial from "../../assets/Wajiha-Ansari.png";
import ramakrishnaTestimonial from "../../assets/Ramakrishna-Mude.jpeg";
import unmeshTestimonial from "../../assets/Unmesh-Upadhye.png";
import testimonialCover from "../../assets/home/testimonial-cover.webp";

import cia from "../../assets/courses/cia-logo.webp";
import cisa from "../../assets/courses/cisa-logo.webp";
import crma from "../../assets/courses/crma-logo.webp";
import iap from "../../assets/courses/iap-logo.webp";

// icons import
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faQuoteLeft,
    faQuoteRight,
} from "@fortawesome/free-solid-svg-icons";

const Journey = () => {
    const [heroRef, isHeroVisible] = useScrollAnimation({ threshold: 0.1 });
    const [statsRef, isStatsVisible] = useScrollAnimation({ threshold: 0.2 });
    const [videoRef, isVideoVisible] = useScrollAnimation({ threshold: 0.2 });
    const [milestonesRef, isMilestonesVisible] = useScrollAnimation({ threshold: 0.1 });

    useEffect(() => {
        // Trigger confetti on load
        const duration = 3000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const randomInRange = (min, max) => Math.random() * (max - min) + min;

        const interval = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
            });
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
            });
        }, 250);

        return () => clearInterval(interval);
    }, []);

    const statistics = [
        { number: '250+', label: 'CIA Challengers', icon: <FaTrophy />, color: 'text-orange-500', bg: 'bg-orange-50' },
        { number: '1500+', label: 'Professionals Trained', icon: <FaUsers />, color: 'text-indigo-600', bg: 'bg-indigo-50' },
        { number: '80%', label: 'Pass Rate', icon: <FaCheckCircle />, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    ];

    const milestones = [
        {
            date: 'December 2023',
            title: 'Brand Launch',
            description: 'The inception of Global Professional Certifications with a vision to redefine audit training.',
            icon: <FaRocket />,
        },
        {
            date: 'January 2024',
            title: 'First Batch Launch',
            description: 'Successfully kicked off our very first CIA batch, setting the foundation for future success.',
            icon: <FaGraduationCap />,
        },
        {
            date: 'March 2024',
            title: 'IIA India Partnership',
            description: 'Formed a strategic alliance with IIA India, strengthening our commitment to quality education.',
            icon: <FaHandshake />,
        },
        {
            date: 'June 2024',
            title: 'Expanding Horizons',
            description: 'Broadened our course offerings to include CISA and other specialized audit certifications.',
            icon: <FaStar />,
        },
        {
            date: 'September 2024',
            title: 'Milestone Achievement',
            description: 'Reached a significant student base, validating our student-centric teaching approach.',
            icon: <FaChartLine />,
        },
        {
            date: 'December 2024',
            title: 'One Year Strong',
            description: 'Celebrating a year of impact, growth, and the success of our global student community.',
            icon: <FaRocket />,
        },
    ];

    const testimonials = [
        {
            quote:
                "Highly recommend Arpit Garg's CIA Challenge Exam Prep Course - his clarity, passion, and expertise simplify complex topics and keep you focused, disciplined, and confident throughout.",
            name: "Pinky Agarwal",
            title: "Head Internal Audit, Emami Limited",
            image: pinkyTestimonial,
        },
        {
            quote:
                "Arpit Garg's CIA Challenge Exam Crash Course helped me clear the exam on my first attempt in just 2 months. Structured weekend sessions built my confidence to succeed.",
            name: "Akshdeep Singh",
            title: "Manager, KPMG",
            image: akshdeepTestimonial,
        },
        {
            quote:
                "Attending Arpit Garg's CIA Challenge Exam Crash Course was exceptional. His clear, interactive teaching made complex topics simple and key concepts easy to grasp",
            name: "Starwin PJ",
            title: "AVP, Wells Fargo",
            image: starwinTestimonial,
        },
        {
            quote:
                "Arpit Garg's CIA Crash Course was a game-changer. His intuitive teaching and mentorship built my confidence. The LMS flexibility and weekend sessions made learning achievable and inspiring.",
            name: "Wajiha Ansari",
            title: "Auditor, Grant Thornton Bahrain",
            image: wajihaTestimonial,
        },
        {
            quote:
                "I owe my CIA Challenge Exam success to Arpit Garg's exceptional guidance. His clarity, structure, and topic-wise MCQs built my confidence. Truly grateful for his mentorship highly recommended!",
            name: "Ramakrishna Mude",
            title: "Head of Technology Audit, Digital Bank in Abu Dhabi",
            image: ramakrishnaTestimonial,
        },
        {
            quote:
                "Passing all three parts of the CIA exam was a journey of growth and grit. Thanks to Arpit Garg's mentorship, strategy, and insights his guidance made it possible!",
            name: "Unmesh Upadhye",
            title: "Assistant Vice President, State Bank of India",
            image: unmeshTestimonial,
        },
        // {
        //     quote: "Passing the CIA Challenge Exam was a major milestone, thanks to Arpit Gargs exceptional program. His crisp teaching, focused material, and MCQs clarified concepts and built confidence. Highly recommended!",
        //     name: "Prateek Bhatia",
        //     title: "Group Head of Internal Audit, Cravia Group",
        //     image: feedbackPerson
        // },
    ];

    return (
        <>
            <MetaTags
                title="1 Year Journey | CIA Certification Training in India | Global Professional Certifications"
                description="Celebrating 1 year journey of Global Professional Certifications who help individuals excel in their CIA career journey to earn higher salary and more job opportunities."
                canonicalUrl="https://globalprofessionalcertifications.com/journey-celebration"
            />

            <div className="bg-gray-50 min-h-screen font-sans text-gray-800">
                {/* Hero Section */}
                <section
                    className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 lg:px-24 overflow-hidden bg-gradient-to-br from-pink-500 via-purple-600 to-purple-700 text-white"
                >
                    {/* Beautiful Multi-layered Background Pattern */}
                    <div className="absolute inset-0 opacity-15">
                        {/* Large polka dots */}
                        <div className="absolute inset-0" style={{
                            backgroundImage: 'radial-gradient(circle, white 2px, transparent 2px)',
                            backgroundSize: '60px 60px'
                        }}></div>
                        {/* Small polka dots offset */}
                        <div className="absolute inset-0" style={{
                            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                            backgroundSize: '30px 30px',
                            backgroundPosition: '15px 15px'
                        }}></div>
                    </div>

                    {/* Radial gradient circles for depth */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-300/10 rounded-full blur-3xl"></div>

                    {/* Decorative Doodles */}
                    <svg className="absolute top-10 left-10 w-20 h-20 text-yellow-300 opacity-60" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                        <path d="M10,50 Q30,20 50,50 T90,50" />
                    </svg>

                    {/* Large Beautiful Stars */}
                    <div className="absolute top-20 right-20 text-6xl text-purple-300 opacity-50">★</div>
                    <div className="absolute top-1/3 right-1/4 text-5xl text-white opacity-40">★</div>
                    <div className="absolute bottom-1/4 left-20 text-4xl text-pink-300 opacity-35">★</div>

                    {/* Other Doodles */}
                    <div className="absolute bottom-20 left-32 w-12 h-12 text-pink-300 opacity-40">▲</div>
                    <div className="absolute bottom-32 right-10 w-14 h-14 border-4 border-yellow-400 rounded-full opacity-40"></div>
                    <div className="absolute top-1/3 left-10 w-3 h-3 bg-white rounded-full opacity-40"></div>
                    <div className="absolute top-1/2 right-1/3 w-4 h-4 bg-white rounded-full opacity-30"></div>

                    <div
                        ref={heroRef}
                        className={`relative z-10 max-w-5xl mx-auto text-center scroll-reveal ${isHeroVisible ? 'scroll-reveal-active' : ''}`}
                    >

                        <h1 className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-tight tracking-tight mb-8 drop-shadow-lg pt-8">
                            Celebrating 1 Year of Building <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-300 via-yellow-200 to-orange-300">
                                Future Internal Auditors
                            </span>
                        </h1>

                        <div className="flex flex-col sm:flex-row justify-center gap-5">
                            <Link to="/contact" className="px-8 py-3.5 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 text-white font-bold rounded-full shadow-2xl hover:shadow-white/20 transition-all duration-300 hover:scale-105 hover:bg-gray-100">
                                Join Our Community
                            </Link>
                            <a
                                href="https://youtu.be/WgA9VzD06kY?si=4yhF7QaxB5qLyGPu"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-8 py-3.5 bg-violet-800/40 backdrop-blur-md border border-white/30 text-white font-bold rounded-full transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105"
                            >
                                Watch Celebration
                            </a>
                        </div>
                    </div>
                </section>

                {/* Statistics Section */}
                <section
                    className="py-20 md:py-20 px-6 lg:px-24 bg-gradient-to-b from-gray-50 via-white to-gray-50"
                >
                    <div
                        ref={statsRef}
                        className={`max-w-7xl mx-auto scroll-reveal ${isStatsVisible ? 'scroll-reveal-active' : ''}`}
                    >
                        <div className="text-center mb-16">
                            <p className="text-2xl md:text-4xl lg:text-4xl font-extrabold text-gray-900 leading-tight mb-4">
                                We Aim To Keep <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent font-extrabold">
                                    Increasing{" "}
                                </span>
                                these numbers with our <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent font-extrabold">
                                    Service
                                </span>
                            </p>
                            <div className="w-20 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 mx-auto rounded-full mt-4"></div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {statistics.map((stat, index) => (
                                <div
                                    key={index}
                                    className={`relative group p-8 rounded-3xl bg-white border border-gray-200 shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_60px_rgba(99,102,241,0.25)] transition-all duration-500 hover:-translate-y-3 overflow-hidden ${isStatsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                                    style={{ transitionDelay: `${index * 150}ms` }}
                                >
                                    {/* Animated gradient background on hover */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                    {/* Shine effect */}
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                                    </div>

                                    {/* Glow effect */}
                                    <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500"></div>

                                    <div className="relative z-10 flex flex-row md:flex-col items-center md:items-start gap-5 md:gap-0">
                                        {/* Icon with enhanced animation */}
                                        <div className={`w-14 h-14 md:w-16 md:h-16 flex-shrink-0 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center text-2xl md:text-3xl md:mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg group-hover:shadow-2xl`}>
                                            <div className="group-hover:animate-bounce">
                                                {stat.icon}
                                            </div>
                                        </div>

                                        <div className="flex flex-col">
                                            {/* Number with gradient on hover */}
                                            <p className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 group-hover:bg-gradient-to-r group-hover:from-indigo-600 group-hover:via-purple-600 group-hover:to-pink-600 group-hover:bg-clip-text group-hover:text-transparent mb-1 md:mb-2 transition-all duration-300">
                                                {stat.number}
                                            </p>

                                            {/* Label */}
                                            <p className="text-sm md:text-base lg:text-lg text-gray-600 group-hover:text-gray-900 font-semibold transition-colors duration-300">
                                                {stat.label}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Corner accent */}
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-400/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                    {/* Bottom accent line */}
                                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-full"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Celebration Video Section */}
                <section
                    className="py-8 md:py-16 px-6 lg:px-24 bg-gray-50"
                >
                    <div
                        ref={videoRef}
                        className={`max-w-6xl mx-auto scroll-reveal ${isVideoVisible ? 'scroll-reveal-active' : ''}`}
                    >
                        <div className="flex flex-col lg:flex-row gap-12 items-center">
                            <div className="w-full lg:w-1/2">
                                <span className="text-indigo-600 font-bold tracking-wider uppercase text-sm mb-2 block">Anniversary Special</span>
                                <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-gray-900 mb-4 leading-tight">
                                    Celebrate This One Year Journey <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">With Us</span>
                                </h2>
                                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                                    We are deeply grateful for the trust, support, and dedication of our students and partners. This milestone is as much yours as it is ours.
                                </p>
                            </div>
                            <div className="w-full lg:w-1/2">
                                <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-indigo-200 group">
                                    <div className="absolute inset-0 bg-indigo-900/10 group-hover:bg-transparent transition-colors duration-300 pointer-events-none"></div>
                                    <iframe
                                        className="w-full aspect-video"
                                        src="https://www.youtube.com/embed/WgA9VzD06kY"
                                        title="One Year Celebration"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Milestones Timeline */}
                <section
                    className="py-12 md:py-16 px-6 lg:px-24 bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden"
                >
                    {/* Decorative background elements */}
                    <div className="absolute inset-0 opacity-30 pointer-events-none">
                        <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-200 rounded-full blur-3xl animate-pulse-slow"></div>
                        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-200 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
                    </div>

                    <div
                        ref={milestonesRef}
                        className={`max-w-6xl mx-auto scroll-reveal ${isMilestonesVisible ? 'scroll-reveal-active' : ''} relative z-10`}
                    >
                        <div className="text-center mb-16">
                            <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-gray-900 mb-4">
                                Milestones We Have <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Crossed</span>
                            </h2>
                            <p className="text-base md:text-lg text-gray-600 mt-4">Our journey of excellence and growth</p>
                            <div className="w-16 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 mx-auto rounded-full mt-6"></div>
                        </div>

                        <div className="relative">
                            {/* Gradient Timeline Line */}
                            <div className="absolute left-[30px] md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-indigo-400 via-purple-500 to-pink-500 md:-translate-x-1/2 rounded-full shadow-lg"></div>

                            <div className="space-y-12">
                                {milestones.map((item, index) => (
                                    <div
                                        key={index}
                                        className={`relative flex flex-col md:flex-row gap-8 md:gap-0 items-start md:items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} group`}
                                    >
                                        {/* Milestone Card */}
                                        <div
                                            className={`w-full md:w-1/2 pl-20 md:pl-0 ${index % 2 === 0 ? 'md:pr-20' : 'md:pl-20'} ${isMilestonesVisible ? 'opacity-100 translate-x-0' : 'opacity-0 ' + (index % 2 === 0 ? 'translate-x-8' : '-translate-x-8')}`}
                                            style={{
                                                transitionDelay: `${index * 200}ms`,
                                                transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
                                            }}
                                        >
                                            {/* Card Container */}
                                            <div className="relative p-8 rounded-2xl bg-white border border-gray-200 shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_60px_rgba(99,102,241,0.25)] transition-all duration-500 hover:-translate-y-2 overflow-hidden group-hover:border-indigo-300">
                                                {/* Gradient overlay on hover */}
                                                <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-purple-50/50 to-pink-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                                {/* Shine effect */}
                                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                                                </div>

                                                <div className="relative z-10">
                                                    {/* Date Badge */}
                                                    <span className="inline-block px-5 py-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white text-sm font-bold rounded-full mb-4 shadow-lg group-hover:scale-105 transition-transform duration-300">
                                                        {item.date}
                                                    </span>

                                                    {/* Title */}
                                                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-indigo-600 group-hover:via-purple-600 group-hover:to-pink-600 group-hover:bg-clip-text transition-all duration-300">
                                                        {item.title}
                                                    </h3>

                                                    {/* Description */}
                                                    <p className="text-gray-600 text-sm md:text-base leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                                                        {item.description}
                                                    </p>
                                                </div>

                                                {/* Corner accent */}
                                                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-400/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                                {/* Bottom accent line */}
                                                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                                            </div>
                                        </div>

                                        {/* Icon Marker with Enhanced Animation */}
                                        <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white flex items-center justify-center shadow-2xl shadow-indigo-500/50 z-20 group-hover:scale-125 group-hover:rotate-180 transition-all duration-700 text-2xl border-4 border-white">
                                            <div className="group-hover:rotate-180 transition-transform duration-700">
                                                {item.icon}
                                            </div>
                                        </div>

                                        {/* Empty Side */}
                                        <div className="hidden md:block w-1/2"></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* People Image Display */}
                <div className="w-full mx-auto mt-6 md:mt-8 lg:mt-12">
                    <div className="flex flex-col gap-4 justify-center items-center p-4 mb-4">
                        <h2 className="text-2xl md:text-3xl lg:text-4xl text-center font-black text-gray-900 leading-tight">
                            Students Who Have {" "}
                            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                                Trusted Us{" "}
                            </span>
                            In This Journey
                        </h2>
                        <div className="w-20 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full"></div>
                    </div>
                    <img
                        src={testimonialCover}
                        alt="Testimonial Cover"
                        className="w-full max-w-6xl mx-auto opacity-90 scale-100 md:scale-95"
                    />
                </div>

                {/* Feedback Cards */}

                <div className="py-12 bg-gray-50 px-6 lg:px-16 mx-auto md:mx-6 lg:mx-6">
                    {/* Top Quote Icon */}
                    <FontAwesomeIcon
                        icon={faQuoteLeft}
                        className="hidden md:block lg:block mb-8 text-3xl text-black md:text-5xl"
                    />

                    {/* Testimonials Container */}
                    <div className="overflow-x-auto">
                        <div className="flex flex-row lg:grid lg:grid-cols-3 gap-6 md:gap-8 lg:gap-8 py-10 mx-0 lg:mx-10">
                            {testimonials.map((testimonial, index) => (
                                <div
                                    key={index}
                                    className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col justify-between min-h-[280px] min-w-[260px] md:min-w-[300px] lg:min-w-0 transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
                                >
                                    <div className="flex-1 flex items-start">
                                        <p className="text-black text-base md:text-lg lg:text-lg font-poppins font-medium">
                                            "{testimonial.quote}"
                                        </p>
                                    </div>
                                    <div className="flex items-center justify-start gap-4 pt-6 mt-6 border-t border-gray-200">
                                        <img
                                            src={testimonial.image}
                                            alt={testimonial.name}
                                            className="w-12 h-12 rounded-full object-cover border-2 border-brand-blue aspect-square"
                                        />

                                        <div>
                                            <p className="font-medium font-poppins  text-gray-900 text-xs md:text-sm lg:text-sm">
                                                {testimonial.name}
                                            </p>
                                            <p className="text-xs md:text-sm lg:text-sm font-poppins text-gray-600">
                                                {testimonial.title}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Bottom CTA and Quote Icon */}
                    <div className="flex justify-center md:justify-between lg:justify-between mt-2 md:mt-8 lg:mt-8 items-center">
                        <NavLink to="/success" className="mt-2">
                            <button className="bg-brand-blue text-white text-sm md:text-base py-2 px-4 md:px-6 rounded-full hover:bg-brand-purple hover:scale-105 transition-all duration-300">
                                Read More Success Stories
                            </button>
                        </NavLink>
                        <FontAwesomeIcon
                            icon={faQuoteRight}
                            className="hidden md:block lg:block text-3xl text-black md:text-5xl"
                        />
                    </div>
                </div>

                {/* Popular Courses Card Section */}

                <div className='flex flex-col gap-3 py-6 px-8 md:px-20'>
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-gray-900 leading-tight">
                        We Aim To{" "}
                        <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                            Serve You Continuously
                        </span>
                    </h2>
                    <h3 className='text-sm md:text-lg lg:text-xl font-poppins leading-relaxed text-gray-600 font-medium'>
                        Our Other Flagship Certification Courses
                    </h3>
                    <div className="w-16 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full mb-1"></div>
                </div>

                <div className="my-10 px-2 mt-2 md:px-12 lg:px-20 pb-32">

                    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-6">
                        <div className="bg-white border border-gray-200 rounded-xl flex flex-col shadow-md transition-all duration-300 hover:shadow-xl h-full">
                            <div className="relative w-full h-28 md:h-48 flex justify-center items-center overflow-hidden rounded-t-xl bg-gray-50 p-4">
                                <img
                                    src={cia}
                                    alt="CIA Course"
                                    className="max-h-full max-w-full object-contain"
                                />
                            </div>
                            <div className="px-6 py-4 flex flex-col flex-1 justify-between">
                                <div>
                                    <p className="text-sm md:text-xl font-bold mb-2 text-gray-900">
                                        Certified Internal Auditor (CIA)
                                    </p>
                                    <p className="text-xs md:text-sm text-gray-600 mb-4">
                                        Master the complete CIA exam with expert guidance and
                                        comprehensive study materials
                                    </p>
                                </div>
                                <NavLink to="/courses/cia">
                                    <button className="w-full py-2 px-4 rounded-lg bg-brand-blue text-white font-semibold shadow-md transition-all duration-300 hover:bg-brand-purple hover:scale-105">
                                        View Course
                                    </button>
                                </NavLink>
                            </div>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-xl flex flex-col shadow-md transition-all duration-300 hover:shadow-xl h-full">
                            <div className="relative w-full h-28 md:h-48 flex justify-center items-center overflow-hidden rounded-t-xl bg-gray-50 p-4">
                                <img
                                    src={cisa}
                                    alt="CISA Course"
                                    className="max-h-full max-w-full object-contain"
                                />
                            </div>
                            <div className="px-6 py-4 flex flex-col flex-1 justify-between">
                                <div>
                                    <p className="text-sm md:text-xl font-bold mb-2 text-gray-900">
                                        Certified Information Systems Auditor (CISA)
                                    </p>
                                    <p className="text-xs md:text-sm text-gray-600 mb-4">
                                        Become a certified expert in IT auditing and risk management
                                        with our comprehensive CISA course
                                    </p>
                                </div>
                                <NavLink to="/courses/cisa">
                                    <button className="w-full py-2 px-4 rounded-lg bg-brand-blue text-white font-semibold shadow-md transition-all duration-300 hover:bg-brand-purple hover:scale-105">
                                        View Course
                                    </button>
                                </NavLink>
                            </div>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-xl flex flex-col shadow-md transition-all duration-300 hover:shadow-xl h-full">
                            <div className="relative w-full h-28 md:h-48 flex justify-center items-center overflow-hidden rounded-t-xl bg-gray-50 p-4">
                                <img
                                    src={crma}
                                    alt="CRMA Course"
                                    className="max-h-full max-w-full object-contain"
                                />
                            </div>
                            <div className="px-6 py-4 flex flex-col flex-1 justify-between">
                                <div>
                                    <p className="text-sm md:text-xl font-bold mb-2 text-gray-900">
                                        Certification in Risk Management Assurance (CRMA)
                                    </p>
                                    <p className="text-xs md:text-sm text-gray-600 mb-4">
                                        Advance your risk career with our CRMA course on assurance,
                                        governance, and mitigation
                                    </p>
                                </div>
                                <NavLink to="/courses/crma">
                                    <button className="w-full py-2 px-4 rounded-lg bg-brand-blue text-white font-semibold shadow-md transition-all duration-300 hover:bg-brand-purple hover:scale-105">
                                        View Course
                                    </button>
                                </NavLink>
                            </div>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-xl flex flex-col shadow-md transition-all duration-300 hover:shadow-xl h-full">
                            <div className="relative w-full h-28 md:h-48 flex justify-center items-center overflow-hidden rounded-t-xl bg-gray-50 p-4">
                                <img
                                    src={iap}
                                    alt="IAP Course"
                                    className="max-h-full max-w-full object-contain"
                                />
                            </div>
                            <div className="px-6 py-4 flex flex-col flex-1 justify-between">
                                <div>
                                    <p className="text-sm md:text-xl font-bold mb-2 text-gray-900">
                                        Internal Audit Practitioner (IAP)
                                    </p>
                                    <p className="text-xs md:text-sm text-gray-600 mb-4">
                                        Kickstart your CIA journey with our IAP course covering
                                        audit fundamentals and risk assessment
                                    </p>
                                </div>
                                <NavLink to="/courses/iap">
                                    <button className="w-full py-2 px-4 rounded-lg bg-brand-blue text-white font-semibold shadow-md transition-all duration-300 hover:bg-brand-purple hover:scale-105">
                                        View Course
                                    </button>
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </div>


                {/* Radial Gradient Banner */}

                <div className="relative">
                    <div className="absolute left-1/2 -translate-x-1/2 -top-28 z-20 h-48 md:h-48 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)] rounded-2xl py-2 md:py-8 w-full md:max-w-xl lg:max-w-3xl flex items-center justify-center scale-90 md:scale-100">
                        <div className="flex flex-col md:flex-row justify-between items-center mx-8 gap-4 md:gap-8 lg:gap-12">
                            {/* Text Content */}
                            <div className="text-center md:text-left mb-6 md:mb-0">
                                <p className="text-white text-lg md:text-xl lg:text-3xl font-bold">
                                    Ready to advance your career?
                                </p>
                                <p className="text-gray-200 text-xs md:text-sm lg:text-sm mt-2">
                                    Enroll now and become part of a global network of successful
                                    professionals
                                </p>
                            </div>

                            {/* Button */}
                            <Link
                                to="/contact"
                                className="bg-brand-blue text-white text-sm lg:text-base py-2 px-4 lg:px-6 rounded-full hover:bg-brand-purple  transition-all duration-300"
                            >
                                Contact Us
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="bg-black">
                    <div className="bg-black h-16 md:h-36 relative"></div>
                </div>
            </div>
        </>
    );
};

export default Journey;
