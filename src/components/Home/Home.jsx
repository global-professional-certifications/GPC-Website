import React from "react";
import Hero from "../Hero/Hero";
import Companies from "../Companies/Companies";
import VideoSection from "../VideoSection/VideoSection";
import learningPartner from "../../assets/Learning_partner.jpg";
import { Link, NavLink } from 'react-router-dom';
import MetaTags from "../MetaTags";
import { blogs } from '../Blogs/BlogContent.jsx'
import FAQDisplay from "../FAQDisplay.jsx";
import Countdown from 'react-countdown';

// icons import
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCalendarDays, faCertificate, faStar, faArrowUpRightFromSquare, faGlobe, faChalkboardTeacher, faQuoteLeft, faQuoteRight, faRobot, faHandshake } from "@fortawesome/free-solid-svg-icons";

// images import
import cia from "../../assets/cia-logo.png";
import cisa from "../../assets/cisa-logo-1.png";
import crma from "../../assets/crma-logo-1.png";
import iap from "../../assets/iap-logo.png";
import choose from "../../assets/exam-3.png";
import flowchartWeb from "../../assets/how-it-works.png";
import flowchartMobile1 from "../../assets/how-it-works-1.png";
import flowchartMobile2 from "../../assets/how-it-works-2.png";
import faqImage from "../../assets/our-mission-1.webp";
import testimonialCover from "../../assets/testimonial-cover.png";
import brochureCover from "../../assets/brochure-cover.png"
import pinkyTestimonial from "../../assets/pinky-photo.jpg"
import akshdeepTestimonial from "../../assets/akshdeep-singh.png"
import starwinTestimonial from "../../assets/testimonial-2.png"
import wajihaTestimonial from "../../assets/Wajiha-Ansari.png"
import ramakrishnaTestimonial from "../../assets/Ramakrishna-Mude.jpeg"
import unmeshTestimonial from "../../assets/Unmesh-Upadhye.png"
import announcementImage from "../../assets/announcement-male-image.webp"
import annoucement1 from "../../assets/orientation-announcement.png"
import annoucement2 from "../../assets/batch-announcement.webp"

import brochure from "../../assets/CIA-Brochure.pdf"
import { faClock } from "@fortawesome/free-regular-svg-icons";



const courseFaqs = [
    {
        question: "What certifications or training does Global Professional Certifications offer?",
        answer:
            "Global Professional Certifications specializes in globally recognized certifications for risk management, assurance, audit, and IT governance. Our flagship programs include Certified Internal Auditor (CIA) – the gold standard for internal auditing and risk assurance globally, Certified Information Systems Auditor (CISA) – for IT audit, cyber risk, and information security professionals, Certification in Risk Management Assurance (CRMA) – for expertise in governance, risk, and control, and Internal Auditor Practitioner (IAP) – foundational training for aspiring auditors and fresh graduates. Our expert-led training delivers practical knowledge, flexible schedules, and personalized support, helping you unlock new career heights as an auditor, risk advisor, or IT assurance specialist."
    },
    {
        question: "How does Global Professional Certifications support students in their career journey?",
        answer:
            "Global Professional Certifications provides comprehensive support for CIA, CISA, CRMA, and IAP exam success with updated study material, practice exams, and webinars led by certified trainers, one-on-one mentorship and doubt resolution sessions, mock tests with performance analytics and feedback, and interactive case studies adapted to real-world audit and risk scenarios. Our approach ensures deep conceptual clarity, practical skill-building, and confident performance in certification exams."
    },
    {
        question: "What are the unique features of Global Professional Certifications' teaching methodology?",
        answer:
            "Global Professional Certifications leverages a blended learning model—expert-led live sessions, interactive online resources, case-based simulations, and flexible weekend classes. Our curriculum is aligned with IIA, ISACA, and global standards, ensuring you gain actionable, practical skills for today’s risk assurance landscape. We prioritize active learning, career development, and networking within a thriving professional community."
    },
    {
        question: "Who is Arpit Garg?",
        answer:
            "Arpit Garg is the Founding Partner of RiskMan Consulting and a certified CIA, CISA, CRMA, and IAP professional. He is widely recognized as the best faculty for CIA, CISA, CRMA, and IAP training in India. As a top-qualified audit, assurance, and risk management expert, he is renowned for his insightful teaching style, industry expertise, and high student success rates. Associated with Global Professional Certifications and recognized by IIA India, Arpit Garg is a trusted mentor for aspiring audit professionals nationwide."
    },
    {
        question: "Is GPC an authorized learning partner of IIA India?",
        answer:
            "Yes, Global Professional Certifications (GPC) is officially recognized as an Authorized Learning Partner of IIA India. We are proud to be endorsed by Mr. Mukundan K.V, CEO of IIA India, validating our commitment to delivering high-quality internal audit training and exam preparation. As an IIA India Authorized Learning Partner, GPC offers globally recognized programs such as Certified Internal Auditor (CIA), CRMA, and Internal Audit Practitioner (IAP), empowering professionals to upskill with industry-leading resources, expert mentorship, and comprehensive support. Advance your career potential, enhance your audit skills, and join a community of risk professionals who trust GPC for their certification journey."
    }
];


const testimonials = [
    {
        quote: "Highly recommend Arpit Garg’s CIA Challenge Exam Prep Course - his clarity, passion, and expertise simplify complex topics and keep you focused, disciplined, and confident throughout.",
        name: "Pinky Agarwal",
        title: "Head Internal Audit, Emami Limited",
        image: pinkyTestimonial,
    },
    {
        quote: "Arpit Garg’s CIA Challenge Exam Crash Course helped me clear the exam on my first attempt in just 2 months. Structured weekend sessions built my confidence to succeed.",
        name: "Akshdeep Singh",
        title: "Manager, KPMG",
        image: akshdeepTestimonial,
    },
    {
        quote: "Attending Arpit Garg’s CIA Challenge Exam Crash Course was exceptional. His clear, interactive teaching made complex topics simple and key concepts easy to grasp",
        name: "Starwin PJ",
        title: "AVP, Wells Fargo",
        image: starwinTestimonial,
    },
    {
        quote: "Arpit Garg’s CIA Crash Course was a game-changer. His intuitive teaching and mentorship built my confidence. The LMS flexibility and weekend sessions made learning achievable and inspiring.",
        name: "Wajiha Ansari",
        title: "Auditor, Grant Thornton Bahrain",
        image: wajihaTestimonial
    },
    {
        quote: "I owe my CIA Challenge Exam success to Arpit Garg’s exceptional guidance. His clarity, structure, and topic-wise MCQs built my confidence. Truly grateful for his mentorship—highly recommended!",
        name: "Ramakrishna Mude",
        title: "Head of Technology Audit, Digital Bank in Abu Dhabi",
        image: ramakrishnaTestimonial
    },
    {
        quote: "Passing all three parts of the CIA exam was a journey of growth and grit. Thanks to Arpit Garg’s mentorship, strategy, and insights—his guidance made it possible!",
        name: "Unmesh Upadhye",
        title: "Assistant Vice President, State Bank of India",
        image: unmeshTestimonial
    },
    // {
    //     quote: "Passing the CIA Challenge Exam was a major milestone, thanks to Arpit Garg’s exceptional program. His crisp teaching, focused material, and MCQs clarified concepts and built confidence. Highly recommended!",
    //     name: "Prateek Bhatia",
    //     title: "Group Head of Internal Audit, Cravia Group",
    //     image: feedbackPerson
    // },
];

const latestBlogs = blogs.slice(0, 3);

const eventDate = new Date("2025-12-06T11:30:00");


export default function Home() {

    return (
        <>
            <MetaTags
                title="Global Professional Certifications – Advance Your Career"
                description="Get globally recognized with our CIA certification courses. Join 100+ professionals who have advanced their careers through our expert-led programs"
                canonicalUrl="https://globalprofessionalcertifications.com/"
            />
            <div className="bg-gray-50">

                {/* Hero Section and Stats */}

                <div className="relative">
                    {/* Hero Section */}
                    <Hero />

                    {/* Stats Section */}
                    <div className="absolute left-1/2 -translate-x-1/2 -bottom-10 md:-bottom-14 flex items-center justify-center gap-6 sm:gap-10 md:gap-12 bg-white shadow-lg rounded-xl sm:rounded-2xl px-4 md:px-16 lg:px-16 py-6 md:py-8 lg:py-8 text-center z-10 w-auto scale-90 md:scale-100 lg:scale-100">

                        {/* Students */}
                        <div className="flex items-center gap-3 sm:gap-4">
                            <FontAwesomeIcon icon={faUser} className="text-brand-purple text-lg sm:text-xl md:text-2xl bg-gray-200 rounded-lg p-2" />
                            <div className="text-left">
                                <p className="text-sm sm:text-lg md:text-2xl font-bold text-gray-800">1500+</p>
                                <p className="text-[10px] sm:text-xs md:text-sm text-gray-600">Professionals</p>
                            </div>
                        </div>

                        {/* Certifications */}
                        <div className="flex items-center gap-3 sm:gap-4">
                            <FontAwesomeIcon icon={faCertificate} className="text-red-600 text-lg sm:text-xl md:text-2xl bg-yellow-200 rounded-lg p-2" />
                            <div className="text-left">
                                <p className="text-sm sm:text-lg md:text-2xl font-bold text-gray-800">250+</p>
                                <p className="text-[10px] sm:text-xs md:text-sm text-gray-600">CIAs</p>
                            </div>
                        </div>

                        {/* Rating */}
                        <div className="flex items-center gap-3 sm:gap-4">
                            <FontAwesomeIcon icon={faStar} className="text-yellow-300 text-lg sm:text-xl md:text-2xl bg-blue-300 rounded-lg p-2" />
                            <div className="text-left">
                                <p className="text-sm sm:text-lg md:text-2xl font-bold text-gray-800">5/5</p>
                                <p className="text-[10px] sm:text-xs md:text-sm text-gray-600">Rating</p>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Batch Announcement */}

                <div className="bg-gray-50 px-6 lg:px-28 pt-12 pb-12 mt-20">
                    <div>
                        <p className="text-2xl md:text-4xl lg:text-4xl pl-2 md:pl-4 pr-0 md:pr-24 text-left mb-12 font-bold">
                            Upcoming <span className="text-brand-blue font-normal italic">Events</span>
                        </p>
                    </div>

                    <div className="flex flex-col lg:flex-row justify-center items-center md:items-start gap-6 lg:gap-12">

                        {/* Card 1 */}
                        <div className="w-full h-auto md:h-[250px] lg:w-1/3 lg:h-[450px] rounded-3xl shadow-xl shadow-gray-800 ">

                            <div className="flex flex-col md:flex-row lg:flex-col w-full h-full">
                                <img
                                    src={annoucement1}
                                    alt=""
                                    className="w-full h-[200px] md:h-full md:w-full lg:h-[220px] lg:w-full object-cover rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none lg:rounded-t-3xl lg:rounded-b-none"
                                />

                                <div className="bg-gradient-to-t from-black to-brand-blue rounded-b-3xl md:rounded-r-3xl md:rounded-bl-none lg:rounded-b-3xl lg:rounded-tr-none w-full h-auto lg:h-[230px] flex flex-col px-6 py-4">
                                    <div className="flex flex-col justify-between h-full">
                                        <div>
                                            <div className="flex flex-col md:flex-col-reverse lg:flex-col">
                                                <div className="md:pt-8 lg:pt-0 w-full flex justify-between items-center">
                                                    <div className="flex items-center gap-2">
                                                        <FontAwesomeIcon icon={faCalendarDays} className="text-white" />
                                                        <div className="text-xs lg:text-base text-white">
                                                            29<sup>th</sup> Nov, 2025
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <FontAwesomeIcon icon={faClock} className="text-white" />
                                                        <div className="text-xs lg:text-base text-white">5pm - 6pm</div>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col">
                                                    <p className="text-2xl md:text-3xl lg:text-3xl  font-bold text-[#FFD700] my-2">
                                                        CIA Part 1 Orientation
                                                    </p>
                                                    <p className="text-white text-sm md:text-base leading-snug">
                                                        Get all the details, guidance, and tips you need before starting your CIA journey.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="pt-4 pb-2">
                                            <a
                                                href="https://zfrmz.in/XkllEWzA37g02fP3roBa"
                                                title="Register for CIA Part 1 Orientation"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center justify-center px-6 py-2 text-base font-semibold text-white rounded-lg shadow-lg transition-all duration-300 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 hover:scale-105 hover:shadow-xl w-full"
                                                role="button"
                                            >
                                                Register Now
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Card 2 */}
                        <div className="w-full lg:w-2/3 h-full lg:h-[450px] rounded-3xl shadow-xl shadow-gray-800">
                            <div className="flex flex-col md:flex-row w-full h-full">

                                <img
                                    src={annoucement2}
                                    alt=""
                                    className="w-full md:w-[40%] h-[220px] md:h-auto lg:h-full object-cover object-top md:object-cover rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none"
                                />

                                <div className="h-auto lg:h-full w-full lg:w-[60%] bg-gradient-to-t from-black to-brand-blue rounded-b-3xl md:rounded-r-3xl md:rounded-bl-none px-6 py-6 md:py-8 flex flex-col justify-start">
                                    <div className="flex flex-col justify-between h-full">

                                        <div className="h-full">
                                            <p className="text-2xl md:text-3xl lg:text-4xl text-[#FFD700] font-bold">
                                                Kickstart Your CIA Part 1
                                            </p>

                                            <p className="mb-4 font-semibold text-base md:text-xl text-white">
                                                New Batch Starting from 6<sup>th</sup> Dec, 2025
                                            </p>

                                            <div className="text-xs md:text-sm pt-0 md:pt-2 font-thin text-white leading-tight md:pr-4 flex flex-col">
                                                <p>
                                                    Great careers don’t wait. Join the CIA Part 1 batch starting from 6th December,
                                                    11:30 AM – 2:30 PM, and move closer to your certification.
                                                </p>
                                                <ol className="hidden md:flex pt-2 font-semibold text-[#FFD700] text-xs lg:text-sm list-none gap-3">
                                                    <li>1. Live Training</li>
                                                    <li>2. Expert Mentorship</li>
                                                    <li>3. Proven Outcomes</li>
                                                </ol>
                                            </div>

                                            <div className=" text-white text-xl md:text-2xl flex flex-col items-center gap-2 mt-6 md:mt-8">
                                                <p className="text-sm md:text-base">Hurry Up! Only</p>
                                                <span>
                                                    <Countdown
                                                        date={eventDate}
                                                        renderer={({ days, hours, minutes, seconds }) => (
                                                            <div className="text-white flex items-center gap-1 md:gap-2">
                                                                {[
                                                                    { label: "Days", value: days },
                                                                    { label: "Hours", value: hours },
                                                                    { label: "Minutes", value: minutes },
                                                                    { label: "Seconds", value: seconds },
                                                                ].map((t, i) => (
                                                                    <React.Fragment key={i}>
                                                                        <div className="p-4 md:p-4 h-14 w-14 md:h-16 md:w-16 flex flex-col justify-center items-center border-2 border-gray-400 rounded-xl md:rounded-2xl">
                                                                            <p className="font-bold text-sm md:text-xl">{t.value}</p>
                                                                            <p className="text-xs md:text-xs font-light">{t.label}</p>
                                                                        </div>
                                                                        {i !== 3 && (
                                                                            <p className="text-2xl md:text-5xl font-bold">:</p>
                                                                        )}
                                                                    </React.Fragment>
                                                                ))}
                                                            </div>
                                                        )}
                                                    />
                                                </span>
                                                <p className="text-sm md:text-base">Left</p>
                                            </div>
                                        </div>

                                        <div className="pt-4 md:pb-2">
                                            <a
                                                href="https://zfrmz.in/d0MKpQhN9W2A6MPya8Kf"
                                                title="Register for CIA Part 1 Orientation"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center justify-center px-6 py-2 text-base font-semibold text-white rounded-lg shadow-lg transition-all duration-300 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 hover:scale-105 hover:shadow-xl w-full"
                                                role="button"
                                            >
                                                Enroll Now
                                            </a>
                                        </div>

                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>


                <div className="hidden bg-gray-50 px-12 md:px-16 lg:px-36 py-24 mt-20">
                    <div className="bg-gradient-to-t from-black to-brand-blue h-[480px] md:h-[820px] lg:h-[450px] w-full max-w-[1200px] rounded-xl flex flex-col justify-center lg:flex-row lg:justify-end shadow-xl shadow-gray-800 relative">
                        <img src={announcementImage} alt="" className="absolute bottom-0 left-1/2 -translate-x-1/2 lg:left-16 lg:-translate-x-0 w-[200px] md:w-[300px] lg:w-[400px] h-auto" />
                        <div className="flex flex-col gap-4 justify-center items-center p-12 max-w-2xl mr-6">
                            <div className="flex flex-col justify-center items-center gap-1">
                                <p className="text-4xl text-[#FFD700] font-bold">Kickstart Your CIA Part I</p>
                                <p className="font-regular text-2xl text-white">New Batch Starting from 6<sup>th</sup> Dec, 2025</p>
                            </div>
                            <p className="text-base text-white text-center leading-relaxed font-thin px-8">Lorem ipsum dolor sit <span className="text-[#FFD700] font-semibold">Starting Date</span> amet consectetur adipisicing elit. Laborum non illum, nisi, consectetur porro vero doloremque sint id mollitia harum maxime sunt ipsum a ipsam nihil, illo ratione! Amet, laborum.</p>
                            <div>
                                <a
                                    href=""
                                    title=""
                                    className="inline-flex items-center justify-center px-6 py-2 text-base font-semibold text-white rounded-lg shadow-lg transition-all duration-300 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 hover:scale-105 hover:shadow-xl"
                                    role="button"
                                >
                                    Enroll Now
                                </a>
                            </div>

                            <div className="text-white text-2xl flex items-center gap-4 mt-8">
                                <p className="text-2xl font-regular text-[#FFD700]">Hurry Up! Only</p>
                                <span>
                                    <Countdown
                                        date={eventDate}
                                        renderer={({ days, hours, minutes, seconds }) => (
                                            <div className="text-white flex items-center gap-1 md:gap-2">
                                                <div className="p-6 md:p-4 h-12 w-12 md:h-16 md:w-16 flex flex-col justify-center items-center border-2 border-gray-400 rounded-xl md:rounded-2xl ">
                                                    <p className="font-bold text-base md:text-xl ">{days}</p>
                                                    <p className="text-[8px] md:text-xs font-light">Days</p>
                                                </div>

                                                <p className="text-3xl md:text-5xl font-bold">:</p>

                                                <div className="p-6 md:p-4 h-12 w-12 md:h-16 md:w-16 flex flex-col justify-center items-center border-2 border-gray-400 rounded-xl md:rounded-2xl ">
                                                    <p className="font-bold text-base md:text-xl">{hours}</p>
                                                    <p className="text-[8px] md:text-xs font-light">Hours</p>
                                                </div>

                                                <p className="text-3xl md:text-5xl font-bold">:</p>

                                                <div className="p-6 md:p-4 h-12 w-12 md:h-16 md:w-16 flex flex-col justify-center items-center border-2 border-gray-400 rounded-xl md:rounded-2xl ">
                                                    <p className="font-bold text-base md:text-xl">{minutes}</p>
                                                    <p className="text-[8px] md:text-xs font-light">Minutes</p>
                                                </div>

                                                <p className="text-3xl md:text-5xl font-bold">:</p>

                                                <div className="p-6 md:p-4 h-12 w-12 md:h-16 md:w-16 flex flex-col justify-center items-center border-2 border-gray-400 rounded-xl md:rounded-2xl ">
                                                    <p className="font-bold text-base md:text-xl">{seconds}</p>
                                                    <p className="text-[8px] md:text-xs font-light">Seconds</p>
                                                </div>
                                            </div>
                                        )}
                                    />
                                </span>
                                <p className="text-2xl font-regular text-[#FFD700]">Left</p>
                            </div>

                        </div>
                    </div>
                </div>

                {/* Company Marquee Section */}

                <div className="scale-90 sm:scale-95 md:scale-100 transition-transform duration-300">

                    <Companies />


                </div>

                {/* Popular Courses Section */}

                <div className="my-10 px-2 mt-2 md:px-12 lg:px-28">
                    <p className="text-2xl md:text-4xl lg:text-4xl pl-4 pr-24 text-left mb-12 font-bold">
                        Explore Our <span className="text-brand-blue font-normal italic">Flagship Certification Programs</span>
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-6">
                        <div className="bg-white border border-gray-200 rounded-xl flex flex-col shadow-md transition-shadow duration-300 hover:shadow-xl h-full">
                            <div className="relative w-full h-28 md:h-48 flex justify-center items-center overflow-hidden rounded-t-xl bg-gray-50 p-4">
                                <img
                                    src={cia}
                                    alt="CIA Course"
                                    className="max-h-full max-w-full object-contain"
                                />
                            </div>
                            <div className="px-6 py-4 flex flex-col flex-1 justify-between">
                                <div>
                                    <p className="text-sm md:text-xl font-bold mb-2">Certified Internal Auditor (CIA)</p>
                                    <p className="text-xs md:text-sm text-gray-600 mb-4">
                                        Master the complete CIA exam with expert guidance and comprehensive study materials
                                    </p>
                                </div>
                                <NavLink to="/courses/cia">
                                    <button className="w-full py-2 px-4 rounded-lg bg-brand-blue text-white font-semibold shadow-md transition-all duration-300 hover:bg-brand-purple">
                                        View Course
                                    </button>
                                </NavLink>
                            </div>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-xl flex flex-col shadow-md transition-shadow duration-300 hover:shadow-xl h-full">
                            <div className="relative w-full h-28 md:h-48 flex justify-center items-center overflow-hidden rounded-t-xl bg-gray-50 p-4">
                                <img
                                    src={cisa}
                                    alt="CISA Course"
                                    className="max-h-full max-w-full object-contain"
                                />
                            </div>
                            <div className="px-6 py-4 flex flex-col flex-1 justify-between">
                                <div>
                                    <p className="text-sm md:text-xl font-bold mb-2">Certified Information Systems Auditor (CISA)</p>
                                    <p className="text-xs md:text-sm text-gray-600 mb-4">
                                        Become a certified expert in IT auditing and risk management with our comprehensive CISA course
                                    </p>
                                </div>
                                <NavLink to="/courses/cisa">
                                    <button className="w-full py-2 px-4 rounded-lg bg-brand-blue text-white font-semibold shadow-md transition-all duration-300 hover:bg-brand-purple">
                                        View Course
                                    </button>
                                </NavLink>
                            </div>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-xl flex flex-col shadow-md transition-shadow duration-300 hover:shadow-xl h-full">
                            <div className="relative w-full h-28 md:h-48 flex justify-center items-center overflow-hidden rounded-t-xl bg-gray-50 p-4">
                                <img
                                    src={crma}
                                    alt="CRMA Course"
                                    className="max-h-full max-w-full object-contain"
                                />
                            </div>
                            <div className="px-6 py-4 flex flex-col flex-1 justify-between">
                                <div>
                                    <p className="text-sm md:text-xl font-bold mb-2">Certification in Risk Management Assurance (CRMA)</p>
                                    <p className="text-xs md:text-sm text-gray-600 mb-4">
                                        Advance your risk career with our CRMA course on assurance, governance, and mitigation
                                    </p>
                                </div>
                                <NavLink to="/courses/crma">
                                    <button className="w-full py-2 px-4 rounded-lg bg-brand-blue text-white font-semibold shadow-md transition-all duration-300 hover:bg-brand-purple">
                                        View Course
                                    </button>
                                </NavLink>
                            </div>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-xl flex flex-col shadow-md transition-shadow duration-300 hover:shadow-xl h-full">
                            <div className="relative w-full h-28 md:h-48 flex justify-center items-center overflow-hidden rounded-t-xl bg-gray-50 p-4">
                                <img
                                    src={iap}
                                    alt="IAP Course"
                                    className="max-h-full max-w-full object-contain"
                                />
                            </div>
                            <div className="px-6 py-4 flex flex-col flex-1 justify-between">
                                <div>
                                    <p className="text-sm md:text-xl font-bold mb-2">Internal Audit Practitioner (IAP)</p>
                                    <p className="text-xs md:text-sm text-gray-600 mb-4">
                                        Kickstart your CIA journey with our IAP course—covering audit fundamentals and risk assessment
                                    </p>
                                </div>
                                <NavLink to="/courses/iap">
                                    <button className="w-full py-2 px-4 rounded-lg bg-brand-blue text-white font-semibold shadow-md transition-all duration-300 hover:bg-brand-purple">
                                        View Course
                                    </button>
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Download Brochure CTA */}

                <div className="mt-20 md:mt-32 lg:mt-20 px-6 md:px-16 lg:px-12 py-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-12">
                        {/* Image Section */}
                        <div className="w-full md:w-1/2 flex justify-center">
                            <img
                                src={brochureCover}
                                alt="Brochure"
                                className="w-64 sm:w-80 md:w-[26rem] h-auto object-contain"
                            />
                        </div>

                        {/* Text Section */}
                        <div className="w-full md:w-1/2 flex flex-col justify-center items-center md:items-start gap-4 text-center md:text-left">
                            <p className="text-xl sm:text-2xl md:text-4xl font-bold mb-4 max-w-[300px] md:max-w-xl lg:max-w-xl">
                                Download Our{" "}
                                <span className="text-brand-blue font-normal italic">Comprehensive</span>{" "}
                                CIA Course Brochure
                            </p>
                            <p className="text-gray-600 text-xs md:text-base lg:text-base font-poppins leading-relaxed max-w-xl px-8 md:px-0 lg:px-0">
                                Unlock global career opportunities as a Certified Internal Auditor (CIA)
                                with Global Professional Certifications (GPC). Get detailed insights on course structure, expert mentorship,
                                and global recognition in our downloadable brochure
                            </p>
                            <a
                                href={brochure}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-brand-blue text-white text-sm sm:text-base py-2 px-5 sm:px-6 rounded-full hover:bg-brand-purple hover:scale-105 transition-all duration-300 mt-2"
                            >
                                Download
                            </a>
                        </div>
                    </div>
                </div>


                {/* Why Choose Us? */}

                <div className="py-6 sm:py-12 bg-gray-50 relative overflow-hidden">
                    {/* Heading */}
                    <div className="text-center mt-4 md:mt-16 mb-12 sm:mb-20 px-4 md:px-12">
                        <p className="font-bold text-2xl md:text-4xl leading-snug">
                            Why Choose{" "}
                            <span className="text-brand-blue font-normal italic">
                                Global Professional Certifications?
                            </span>
                        </p>
                    </div>

                    {/* Main Flex Layout */}
                    <div className="flex flex-col lg:flex-row items-center justify-center gap-10 sm:gap-16 md:gap-20 px-4 sm:px-8 md:px-24">

                        {/* Left Column */}
                        <div className="grid grid-cols-2 lg:flex lg:flex-col justify-center items-center gap-8 sm:gap-12 w-full lg:w-1/3">
                            <div className="p-4 sm:p-6 md:p-8 text-center flex flex-col items-center">
                                <FontAwesomeIcon icon={faGlobe} className="text-2xl sm:text-3xl md:text-4xl text-brand-blue mb-3 sm:mb-4" />
                                <p className="text-base sm:text-lg font-semibold">Global Accreditation</p>
                                <p className="text-gray-600 text-xs md:text-sm lg:text-base font-poppins leading-relaxed">
                                    Programs authorized and recognized internationally
                                </p>
                            </div>

                            <div className="p-4 sm:p-6 md:p-8 text-center flex flex-col items-center">
                                <FontAwesomeIcon icon={faChalkboardTeacher} className="text-2xl sm:text-3xl md:text-4xl text-brand-blue mb-3 sm:mb-4" />
                                <p className="text-base sm:text-lg font-semibold">Expert Mentorship</p>
                                <p className="text-gray-600 text-xs md:text-sm lg:text-base font-poppins leading-relaxed">
                                    Led by India's top faculty <br />Arpit Garg (CA, CIA, CRMA, CISA)
                                </p>
                            </div>
                        </div>

                        {/* Center Image */}
                        <div className="w-full md:w-2/3 lg:w-1/3 flex justify-center relative">
                            {/* Shadow Background */}
                            <div className="bg-brand-blue w-[60%] md:w-[90%] lg:w-[90%] h-full rounded-3xl absolute rotate-6 shadow-lg"></div>
                            <img
                                src={choose}
                                alt="Why Choose GPC"
                                className="w-[60%] md:w-[90%] lg:w-[90%] rounded-3xl relative z-10 shadow-xl"
                            />
                        </div>

                        {/* Right Column */}
                        <div className="grid grid-cols-2 lg:flex lg:flex-col justify-center items-center gap-8 sm:gap-12 w-full lg:w-1/3">
                            <div className="p-4 sm:p-6 md:p-8 text-center flex flex-col items-center">
                                <FontAwesomeIcon icon={faRobot} className="text-2xl sm:text-3xl md:text-4xl text-brand-blue mb-3 sm:mb-4" />
                                <p className="text-base sm:text-lg font-semibold">Dedicated Support</p>
                                <p className="text-gray-600 text-xs md:text-sm lg:text-base font-poppins leading-relaxed">
                                    Get dedicated support until you succeed — we’re with you every step of the way.
                                </p>
                            </div>

                            <div className="p-4 sm:p-6 md:p-8 text-center flex flex-col items-center">
                                <FontAwesomeIcon icon={faHandshake} className="text-2xl sm:text-3xl md:text-4xl text-brand-blue mb-3 sm:mb-4" />
                                <p className="text-base sm:text-lg font-semibold">Flexibility</p>
                                <p className="text-gray-600 text-xs md:text-sm lg:text-base font-poppins leading-relaxed">
                                    Weekend online classes with 100% recorded sessions
                                </p>
                            </div>
                        </div>
                    </div>
                </div>




                {/* Video Section */}
                <div className="relative w-full overflow-visible mt-4 lg:mt-14">
                    {/* Top White Section */}
                    <div className="flex flex-col lg:flex-row justify-center items-center  gap-10 lg:gap-36 lg:m-12 p-12 md:p-18 pb-[90px]">
                        {/* Left Text Section */}
                        <div className="flex flex-col max-w-xl text-center md:text-left">
                            <p className="text-2xl md:text-4xl font-bold leading-snug px-2 lg:px-8">
                                Hear What{" "}
                                <span className="text-brand-blue font-normal italic">Our Mentor</span> Has To Say About This Course
                            </p>

                            {/* Buttons */}
                            <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 lg:gap-6 mt-8 px-2 lg:px-8">
                                <a
                                    href="https://youtu.be/XNnXkttYQUY?si=_sHWBCLvDgFtGIZD"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-brand-blue text-white text-sm md:text-base py-2 px-4 lg:px-6 rounded-full hover:bg-brand-purple hover:scale-105 transition-all duration-300"
                                >
                                    Orientation Program
                                </a>

                                <NavLink
                                    to="/about"
                                    className="text-brand-blue hover:text-brand-purple transition-all duration-300 transform"
                                >
                                    <p className="text-sm md:text-base flex items-center gap-1">
                                        Learn More <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                                    </p>
                                </NavLink>
                            </div>
                        </div>

                        {/* Right Text Section */}
                        <div className="md:max-w-lg text-center md:text-left px-4 md:px-0">
                            <p className="text-gray-600 text-xs md:text-base lg:text-base font-poppins leading-relaxed">
                                At Global Professional Certifications (GPC), we are dedicated to empowering professionals worldwide by providing top-tier certification programs that unlock career growth, enhance expertise, and elevate industry standards
                            </p>
                        </div>
                    </div>

                    {/* Floating Video */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-[65%] md:top-[45%] lg:top-[35%] z-30 w-[100%] md:w-[750px] max-w-full overflow-hidden">
                        <VideoSection />
                    </div>

                    {/* Blue Background Section */}
                    <div className="h-[180px] md:h-[350px] mt-4 md:mt-32 lg:mt-32 bg-brand-blue w-full"></div>
                </div>


                {/* Accreditation */}
                <div className="py-20 px-6 mx-12 my-4 md:my-10 md:px-16">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-12 md:gap-20">

                        {/* Left Content */}
                        <div className="flex flex-col gap-6 lg:w-1/2 text-center md:text-left">
                            <p className="text-2xl md:text-4xl font-bold leading-snug">
                                <span className="text-brand-blue font-normal italic">IIA India</span> Authorized Training Partner
                            </p>
                            <p className="text-gray-600 text-xs md:text-base lg:text-base font-poppins leading-relaxed">
                                Mr. Mukundan K.V, CEO of IIA India, presents the official accreditation certificate to
                                Arpit Garg, GPC mentor — marking Global Professional Certifications as an
                                <span className="font-semibold"> IIA India Authorized Learning Partner</span>
                            </p>
                            <div className="flex justify-center md:justify-start items-center gap-6 mt-2">
                                <a href="https://youtu.be/CvzJ_SFD45Y?si=Qow7Di56YcGFjXjz" target="_blank" rel="noopener noreferrer" className="bg-brand-blue text-white text-sm md:text-base py-2 px-4 md:px-6 rounded-full hover:bg-brand-purple hover:scale-105 transition-all duration-300"
                                >
                                    Watch Video
                                </a>
                            </div>
                        </div>

                        {/* Right Image */}
                        <div className="flex justify-center md:justify-end w-80 md:w-full lg:w-1/2">
                            <img
                                src={learningPartner}
                                alt="IIA India Certification Ceremony"
                                className="w-80 md:w-full lg:w-[550px] h-auto rounded-2xl shadow-xl object-cover transition-all duration-300"
                            />
                        </div>
                    </div>
                </div>

                {/* How it works? */}

                <div className="w-full mb-8">
                    <div className="flex flex-col gap-2 justify-center items-center p-4 mb-12">
                        <p className="text-2xl md:text-4xl lg:text-4xl text-center font-bold">How It <span className="text-brand-blue font-normal italic">Works?</span>
                        </p>
                        <p className="text-xs md:text-base lg:text-base font-poppins leading-relaxed max-w-3xl text-center text-gray-600 mt-6">
                            Your Success Path, Simplified<br />Your Certification Journey — From Learning to Leadership
                        </p>
                    </div>
                    <div className="m-8 hidden md:block lg:block">
                        <img src={flowchartWeb} alt="How it works flowchart" className="w-[90vw] h-auto mx-auto scale-110" />
                    </div>
                    <div className="mx-4 block md:hidden lg:hidden">
                        <div className="w-full h-auto mx-auto">
                            <img src={flowchartMobile1} alt="How it works flowchart" />
                            <img src={flowchartMobile2} alt="How it works flowchart" className="-translate-y-8" />
                        </div>
                    </div>
                </div>

                {/* People Image Display */}
                <div className="w-full mx-auto mt-16 md:mt-24 lg:mt-12">
                    <div className="flex flex-col gap-2 justify-center items-center p-4 mb-12">
                        <p className="text-2xl md:text-4xl text-center font-bold">What Our  <span className="text-brand-blue font-normal italic">Learners </span>Say
                        </p>
                        <p className="text-xs md:text-base lg:text-base font-poppins leading-relaxed max-w-xl md:max-w-2xl lg:max-w-2xl text-center text-gray-600 mt-6 px-8 md:px-0 lg:px-0">
                            Discover how Global Professional Certifications' expert-led programs empower professionals to achieve global certification and career growth
                        </p>
                    </div>
                    <img src={testimonialCover} alt="Testimonial Cover" className="scale-100 md:scale-90" />
                </div>

                {/* Feedback Cards */}

                <div className="py-8 bg-gray-50 px-6 lg:px-16 mx-auto md:mx-6 lg:mx-14">

                    {/* Top Quote Icon */}
                    <FontAwesomeIcon icon={faQuoteLeft} className="hidden md:block lg:block mb-8 text-3xl text-black md:text-5xl" />

                    {/* Testimonials Container */}
                    <div className="overflow-x-auto">
                        <div className="flex flex-row lg:grid lg:grid-cols-3 gap-6 md:gap-8 lg:gap-12 py-12 mx-0 lg:mx-14">
                            {testimonials.map((testimonial, index) => (
                                <div
                                    key={index}
                                    className="bg-white rounded-xl shadow-lg p-6 flex flex-col justify-between min-h-[280px] min-w-[260px] md:min-w-[300px] lg:min-w-0 transition-shadow duration-300 hover:shadow-xl"
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
                                            <p className="font-medium font-poppins  text-gray-900 text-xs md:text-sm lg:text-sm">{testimonial.name}</p>
                                            <p className="text-xs md:text-sm lg:text-sm font-poppins text-gray-600">{testimonial.title}</p>
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
                        <FontAwesomeIcon icon={faQuoteRight} className="hidden md:block lg:block text-3xl text-black md:text-5xl" />
                    </div>
                </div>

                {/* Blog Section */}

                <div className="px-6 lg:px-24 w-full mt-6 md:mt-12">
                    <div className="flex flex-col gap-2 justify-center items-center md:justify-start md:items-start p-4 mb-12">
                        <p className="text-2xl md:text-4xl lg:text-4xl text-center font-bold">Learning Resources & <span className="text-brand-blue font-normal italic">Blogs</span>
                        </p>
                        <p className="text-xs md:text-base text-center md:text-left lg:text-base font-poppins leading-relaxed max-w-lg text-gray-600 mt-6">
                            Explore expert insights and latest trends in audit, risk, and professional certification on our blog
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {latestBlogs.map((blog) => (
                            <div
                                key={blog.id}
                                className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-300"
                            >
                                <img
                                    src={blog.cover}
                                    alt={blog.title}
                                    className="w-full h-36 md:h-56 object-cover"
                                />

                                <div className="w-full flex justify-between items-center p-4 md:p-6">
                                    <div className="flex justify-center items-center gap-2">
                                        <FontAwesomeIcon icon={faCalendarDays} className="text-blue-400" />
                                        <div className="text-xs md:text-sm text-gray-600">{blog.date}</div>
                                    </div>
                                    <div className="flex justify-center items-center gap-2">
                                        <FontAwesomeIcon icon={faUser} className="text-blue-400" />
                                        <div className="text-xs md:text-sm text-gray-600">{blog.author}</div>
                                    </div>
                                </div>

                                <div className="px-4 md:px-6 flex flex-col justify-between pb-6 h-[150px] md:h-[240px]">
                                    <div>
                                        <h3 className="text-base md:text-xl leading-tight md:leading-tight lg:leading-tight font-semibold text-gray-800 mb-2 line-clamp-3">
                                            {blog.title}
                                        </h3>
                                        <p className="text-gray-500 md:text-sm lg:text-sm text-xs line-clamp-2 md:line-clamp-3">
                                            {blog.content}
                                        </p>
                                    </div>

                                    <Link
                                        key={blog.id}
                                        to={`/blogs/${blog.slug}`}
                                        className="inline-flex justify-start items-center gap-2 p-1 border border-brand-purple rounded-full w-fit hover:scale-105 transition-all duration-300 mt-8"
                                    >
                                        <span className="md:text-base text-sm pl-2 text-gray-700">
                                            Learn More
                                        </span>
                                        <FontAwesomeIcon
                                            icon={faArrowUpRightFromSquare}
                                            className="text-white text-xs md:text-sm bg-brand-blue h-2 w-2 md:h-4 md:w-4 rounded-full p-1 md:p-2"
                                        />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>


                    <div className="flex justify-center items-center mt-12">
                        <NavLink to="/success">
                            <button className="bg-brand-blue text-white text-sm md:text-base py-2 px-4 md:px-6 rounded-full hover:bg-brand-purple hover:scale-105 transition-all duration-300">
                                Read More Blogs
                            </button>
                        </NavLink>
                    </div>
                </div>


                {/* FAQ Section */}

                <div className="mt-32 px-8 pb-40 md:pb-[220px] lg:px-24">
                    <div className="flex flex-col lg:flex-row items-center gap-20 lg:gap-12">

                        {/* Image Section */}
                        <div className="w-full lg:w-2/5 flex justify-center items-center relative">
                            <div className="absolute max-w-md w-full h-full bg-brand-blue/30 translate-x-3 translate-y-3 md:translate-x-6 md:translate-y-6 lg:translate-x-6 lg:translate-y-6 z-0"></div>

                            {/* Main Image */}
                            <img
                                src={faqImage}
                                alt="FAQ illustration"
                                className="max-w-md w-full object-contain relative z-10 -translate-x-3 -translate-y-3 md:-translate-x-6 md:-translate-y-6 lg:-translate-x-6 lg:-translate-y-6"
                            />
                        </div>


                        {/* Questions Dropdown Section */}
                        <div className="w-full lg:w-3/5">
                            <FAQDisplay
                                faqs={courseFaqs}
                                showCount={5}
                                showMoreLink="/faq"
                            />
                        </div>
                    </div>

                </div>

                {/* Radial Gradient Banner */}

                <div className="relative">
                    <div className="absolute left-1/2 -translate-x-1/2 -top-28 z-20 h-56 md:h-56 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)] rounded-2xl py-2 md:py-8 w-full md:max-w-2xl lg:max-w-4xl flex items-center justify-center scale-90 md:scale-100">
                        <div className="flex flex-col md:flex-row justify-between items-center mx-8 gap-4 md:gap-8 lg:gap-12">
                            {/* Text Content */}
                            <div className="text-center md:text-left mb-6 md:mb-0">
                                <p className="text-white text-lg md:text-2xl lg:text-4xl font-bold">
                                    Ready to advance your career?
                                </p>
                                <p className="text-gray-200 text-xs md:text-sm lg:text-base mt-2">
                                    Enroll now and become part of a global network of successful professionals
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
            </div >
        </>
    )
}