import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import examOne from "../../assets/exam-1.webp";
import examTwo from "../../assets/exam-2.webp";
import examThree from "../../assets/exam-3.webp";
import examFour from "../../assets/exam-4.webp";
import Card from '../Card/Card';
import { FaArrowRightLong } from "react-icons/fa6";
import { FaFileAlt, FaChalkboardTeacher, FaClipboardCheck, FaCertificate, FaGlobe, FaUserCheck, FaClock } from "react-icons/fa";
import ciaHero from "../../assets/cia/cia-hero.webp";
import MetaTags from '../MetaTags';
import { height } from '../Notifications/NotificationBanner';
import { Helmet } from 'react-helmet-async';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCertificate, faStar, faCalendarDays, faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import brochureCover from "../../assets/home/cia-brochure.webp";

import { client } from "../../lib/sanity/client";
import { getRecentPosts } from "../../lib/sanity/queries";
import { urlFor } from "../../lib/sanity/imageBuilder";

import learningPartner from "../../assets/Learning_partner.jpg";
import DescriptiveLeft from "../DescriptiveSection/DescriptiveLeft";
import DescriptiveBullets from "../DescriptiveSection/DescriptiveBullets";
import ProcessFlow from "../DescriptiveSection/ProcessFlow.jsx";
import internalAudit from "../../assets/cia/internal-audit.webp";
import ciaCertification from "../../assets/cia/cia-certification.webp";
import WhyGPC from '../DescriptiveSection/WhyGPC';
import faqImage from "../../assets/our-mission-1.webp";
import FAQDisplay from "../FAQDisplay.jsx";
import ciaCareer from "../../assets/cia/career-option.webp";
import TestimonialsShowcase from "../Testimonials/TestimonialsShowcase.jsx";

const courseFaqs = [
    {
        question:
            "Is earning CIA certification beneficial in India?",
        answer:
            "Yes, earning a CIA certification in India is beneficial for any candidate as it provides a global recognition and that can create global exposure in the job market.",
    },
    {
        question:
            "Do you need a CA or MBA degree for CIA certification completion?",
        answer:
            "It is not required to have a CA or MBA degree to complete CIA certification. The Institute of Internal Audit (IIA) suggests that individuals can become eligible for CIA certification with Bachelors’, Masters’ or no degree as well when they have required relevant experience.",
    },
    {
        question:
            "Is it possible to prepare for the CIA exams online from India?",
        answer:
            "Yes, you can prepare for the CIA exams online as per your flexibility. Global Professional Certifications provide online CIA training classes in India for both Indian and global students. We use US Gleim content that is the updated syllabus content for CIA exams.",
    },
    {
        question: "Do you need training programs to pass the CIA exams? ",
        answer:
            "Experienced CIA certification training providers in India can give you better guidance for successfully completing CIA exams instead of doing everything on your own. You will be able to get US Gleim content, give mock tests, feedback from the experts and many more other helps.",
    },
    {
        question: "Can you prepare for CIA certification while working?  ",
        answer:
            "Yes, you can work as a full-timer and prepare for CIA certifications. CIA courses are designed for professionals, and many individuals can participate in them while working.",
    },
];

const Cia = () => {
    const [latestBlogs, setLatestBlogs] = useState([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const data = await client.fetch(getRecentPosts);
                setLatestBlogs(data);
            } catch (error) {
                console.error("Error fetching blogs:", error);
            }
        };
        fetchBlogs();
    }, []);


    const ciaSchema = {
        "@context": "https://schema.org",
        "@type": "Course",
        "name": "Certified Internal Auditor (CIA)",
        "description": "The CIA course provides professional certification for internal auditors to enhance auditing skills and career credibility.",
        "provider": {
            "@type": "Organization",
            "name": "Global Professional Certifications",
            "url": "https://globalprofessionalcertifications.com",
            "logo": "https://globalprofessionalcertifications.com/logo.png"
        }
    };

    return (
        <>
            <Helmet>
                <script type="application/ld+json">
                    {JSON.stringify(ciaSchema)}
                </script>
            </Helmet>

            <MetaTags
                title="Become Certified Internal Auditor | Join CIA Certification Training Course in India"
                description="Pass the CIA challenge exam with live sessions, Gleim content, and expert guidance from Global Professional Certifications, one of India’s leading CIA certification training providers."
                canonicalUrl="https://globalprofessionalcertifications.com/courses/cia"
            />



            {/* Hero Section */}

            <div className={`md:h-screen flex justify-center items-center bg-brand-blue pb-12 md:pb-0 sm:pt-${(16 + (height ? height - 4 : 0)).toString()}`}>
                <div className="md:py-32 pt-40 md:pt-32 mx-auto md:max-w-8xl flex flex-col lg:flex-row justify-center items-center gap-12 px-8 md:px-24">
                    <div className="max-w-sm md:max-w-2xl mx-auto">
                        <div className="relative w-md md:max-w-xl">
                            <h1 className="text-2xl md:text-4xl font-bold leading-tight text-white">
                                India's #1{" "}<span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">IIA-Accredited</span>{" "}CIA Training Program
                            </h1>
                            <p className='mt-4 text-base sm:text-lg md:text-lg text-gray-200 max-w-2xl leading-relaxed'>
                                <ul className='list-disc pl-3'>
                                    <li>Certified Internal Auditor (CIA) Classes with Gleim Content </li>
                                    <li>Weekend Live Classes with 1000+ Relevant MCQs </li>
                                    <li>7-8 months Course with Full IIA Registration and Exam Support </li>
                                    <li>250+ Successful CIA Professionals Trained by 100% Proven Methodology </li>
                                </ul>
                            </p>
                        </div>

                        <div className="mt-6">
                            <Link
                                to="https://rzp.io/rzp/CIASessions"
                                target='blank'
                                title=""
                                className="inline-flex items-center justify-center px-8 py-3 text-lg font-semibold text-white rounded-lg shadow-lg transition-all duration-300 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 hover:scale-105 hover:shadow-xl"
                                role="button"
                            >
                                Enroll Now
                            </Link>
                        </div>
                    </div>

                    <div className="relative mx-auto lg:max-w-6xl">
                        <img className="w-[550px] h-auto rounded-xl shadow-2xl hidden md:block" src={ciaHero} alt="homepage hero" loading='lazy' />
                    </div>

                </div>
            </div>

            {/* Stats Section */}
            <div className="relative">
                <div className="absolute left-1/2 -translate-x-1/2 -top-10 md:-top-14 flex items-center justify-center gap-6 sm:gap-10 md:gap-12 bg-white shadow-lg rounded-xl sm:rounded-2xl px-4 md:px-16 lg:px-16 py-6 md:py-8 lg:py-8 text-center z-10 w-auto scale-90 md:scale-100 lg:scale-100">
                    {/* Students */}
                    <div className="flex items-center gap-3 sm:gap-4">
                        <FontAwesomeIcon
                            icon={faUser}
                            className="text-brand-purple text-lg sm:text-xl md:text-2xl bg-gray-200 rounded-lg p-2"
                        />
                        <div className="text-left">
                            <p className="text-sm sm:text-lg md:text-2xl font-bold text-gray-800">
                                1500+
                            </p>
                            <p className="text-[10px] sm:text-xs md:text-sm text-gray-600">
                                Professionals
                            </p>
                        </div>
                    </div>

                    {/* Certifications */}
                    <div className="flex items-center gap-3 sm:gap-4">
                        <FontAwesomeIcon
                            icon={faCertificate}
                            className="text-red-600 text-lg sm:text-xl md:text-2xl bg-yellow-200 rounded-lg p-2"
                        />
                        <div className="text-left">
                            <p className="text-sm sm:text-lg md:text-2xl font-bold text-gray-800">
                                250+
                            </p>
                            <p className="text-[10px] sm:text-xs md:text-sm text-gray-600">
                                CIAs
                            </p>
                        </div>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-3 sm:gap-4">
                        <FontAwesomeIcon
                            icon={faStar}
                            className="text-yellow-300 text-lg sm:text-xl md:text-2xl bg-blue-300 rounded-lg p-2"
                        />
                        <div className="text-left">
                            <p className="text-sm sm:text-lg md:text-2xl font-bold text-gray-800">
                                5/5
                            </p>
                            <p className="text-[10px] sm:text-xs md:text-sm text-gray-600">
                                Rating
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-gray-50 pt-6 md:pt-16 pb-16">

                {/* What is Internal Auditing? */}

                <DescriptiveLeft
                    titleStart="What is "
                    highlight="Internal Auditing?"
                    titleEnd=""
                    description="The Institute of Internal Auditors (IIA) mentions that “Internal auditing is an independent, objective assurance and consulting activity for adding value and improving an organization's operations”. In simpler terms, it is possible to build a systematic approach while evaluating organizational risks, so that risk management, control, and governance processes can become effective."
                    image={internalAudit}
                    imageAlt="Internal Auditing?"
                />

                {/* Why CIA Certification? */}

                <DescriptiveBullets
                    titleStart="Why"
                    highlight="CIA"
                    titleEnd="Certification?"
                    image={ciaCertification}
                    imageAlt="Why CIA Certification?"
                    description=""
                    points={[
                        {
                            title: "Global Recognition:",
                            text:
                                "Certified Internal Auditor (CIA) certification is necessary for internal auditors because it is the only globally accepted certification to become an internal auditor.",
                        },
                        {
                            title: "Skill Enhancement:",
                            text:
                                "CIA certification globally and in India helps professionals to build proficiency in compliance, audit standards and fraud detection.",
                        },
                        {
                            title: "Competitive Edge:",
                            text:
                                "Based on IIA's Internal Audit Compensation study, CIA certified professionals earn 40% more than non-certified internal auditors.",
                        },
                    ]}
                />

                {/* Course Cards */}

                <div className='container mx-auto'>
                    <div className="max-w-base md:max-w-[52rem] px-6 md:px-0 mx-auto mt-12">
                        <h2 className="text-center text-2xl md:text-4xl font-bold mb-8 mt-16">CIA Enrollment <span className="text-brand-blue font-normal italic">(All 3 Parts)</span>, Your Path to Success</h2>
                        <p className="text-center text-gray-600 text-xs md:text-base lg:text-base font-poppins leading-relaxed px-6 md:px-24 pb-12">Earn the Certified Internal Auditor (CIA) certification and accelerate your career with global recognition, high salaries, and job security</p>
                    </div>


                    <div className="flex md:justify-center md:flex-row flex-col gap-4 md:gap-0 items-center md:w-full md:mb-12">
                        <Card
                            title="CIA All 3 Parts with Gleim Content"
                            image={examOne}
                            text={"Master the complete CIA exam with expert guidance and comprehensive study materials"}
                            price={58999}
                            enrollLink="https://rzp.io/rzp/CIASessions"
                            imageStyle={"pt-4"} />
                        <Card
                            title="CIA Part 1 with Gleim Content"
                            image={examTwo}
                            text={"Build a strong foundation in internal audit essentials with in-depth preparation"}
                            imageStyle={"pt-12"} />
                        <Card
                            title="CIA Part 2 with Gleim Content"
                            image={examThree}
                            text={"Strengthen your skills in risk management, governance, and control processes"} />
                        <Card
                            title="CIA Part 3 with Gleim Content"
                            image={examFour}
                            text={"Gain expertise in business acumen, financial management, and data analytics"}
                            imageStyle={"pt-8"} />
                    </div>
                </div>


                {/* Download Brochure CTA */}
                <div className="mt-20 md:mt-12 px-6 md:px-16 lg:px-12 py-8">
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
                            <h2 className="text-xl sm:text-2xl md:text-4xl font-bold max-w-[300px] md:max-w-xl lg:max-w-xl">
                                Download Our{" "}
                                <span className="text-brand-blue font-normal italic">
                                    CIA
                                </span>{" "}
                                Brochure
                            </h2>
                            <p className="text-gray-600 text-xs md:text-base lg:text-base font-poppins leading-relaxed max-w-xl px-8 md:px-0 lg:px-0 mb-4">
                                Become a Certified Internal Auditor (CIA) with expert mentorship support. Download our course brochure to learn more
                            </p>
                            <a
                                href="https://forms.zohopublic.in/globalprofessionalcertificat1/form/eBookDownload1/formperma/v93vgyL8M0OVomy1AV7xJljAoa-TcJqlIGD7-1nerlU"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-brand-blue text-white text-sm md:text-base py-2 px-4 lg:px-6 rounded-full hover:bg-brand-purple hover:scale-105 transition-all duration-300"
                            >
                                Download
                            </a>
                        </div>
                    </div>
                </div>

                {/* Accreditation */}
                <div className="py-20 md:py-16 px-6 mx-12 my-4 md:px-16">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-12 md:gap-20">
                        {/* Left Content */}
                        <div className="flex flex-col gap-6 lg:w-1/2 text-center md:text-left">
                            <h2 className="text-2xl md:text-4xl font-bold leading-snug">
                                <span className="text-brand-blue font-normal italic">
                                    IIA India
                                </span>{" "}
                                Authorized Training Partner
                            </h2>
                            <p className="text-gray-600 text-xs md:text-base lg:text-base font-poppins leading-relaxed">
                                Mr. Mukundan K.V, CEO of IIA India, presents the official
                                accreditation certificate to Arpit Garg, GPC mentor marking
                                Global Professional Certifications as an
                                <span className="font-semibold">
                                    {" "}
                                    IIA India Authorized Learning Partner
                                </span>
                            </p>
                            <div className="flex justify-center md:justify-start items-center gap-6 mt-2">
                                <a
                                    href="https://youtu.be/CvzJ_SFD45Y?si=Qow7Di56YcGFjXjz"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-brand-blue text-white text-sm md:text-base py-2 px-4 md:px-6 rounded-full hover:bg-brand-purple hover:scale-105 transition-all duration-300"
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

                {/* CIA All Parts */}

                <div className="py-16 md:py-16 w-full px-4">
                    <div className="max-w-6xl mx-auto">

                        {/* Content Card */}
                        <div className="bg-gradient-to-br from-brand-blue to-black rounded-2xl shadow-2xl overflow-hidden p-8 md:p-12">
                            {/* Section Header */}
                            <div className="text-center mb-10">
                                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2">
                                    CIA All Parts with <span className="text-orange-400 font-normal italic">Gleim Content</span> as Per the New Syllabus
                                </h2>
                            </div>
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                {/* Features List */}
                                <div className="lg:col-span-2 space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {/* Feature 1 */}
                                        <div className="flex items-start gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-all duration-300">
                                            <div className="bg-orange-400 rounded-full p-1.5 mt-0.5 flex-shrink-0">
                                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                            <div>
                                                <p className="text-white font-semibold text-sm md:text-base">Live Classes</p>
                                                <p className="text-gray-200 text-xs md:text-sm">Interactive weekend sessions</p>
                                            </div>
                                        </div>

                                        {/* Feature 2 */}
                                        <div className="flex items-start gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-all duration-300">
                                            <div className="bg-orange-400 rounded-full p-1.5 mt-0.5 flex-shrink-0">
                                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                            <div>
                                                <p className="text-white font-semibold text-sm md:text-base">Gleim Study Materials</p>
                                                <p className="text-gray-200 text-xs md:text-sm">Soft book and 1000+ MCQs</p>
                                            </div>
                                        </div>

                                        {/* Feature 3 */}
                                        <div className="flex items-start gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-all duration-300">
                                            <div className="bg-orange-400 rounded-full p-1.5 mt-0.5 flex-shrink-0">
                                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                            <div>
                                                <p className="text-white font-semibold text-sm md:text-base">Class Notes</p>
                                                <p className="text-gray-200 text-xs md:text-sm">Comprehensive study guides</p>
                                            </div>
                                        </div>

                                        {/* Feature 4 */}
                                        <div className="flex items-start gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-all duration-300">
                                            <div className="bg-orange-400 rounded-full p-1.5 mt-0.5 flex-shrink-0">
                                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                            <div>
                                                <p className="text-white font-semibold text-sm md:text-base">In-Class MCQs</p>
                                                <p className="text-gray-200 text-xs md:text-sm">Practice questions & tests</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* CTA Section */}
                                <div className="lg:col-span-1 flex flex-col justify-center items-center text-center space-y-6">
                                    <div className="space-y-3">
                                        <p className="text-white text-sm md:text-base">
                                            Begin your journey today!
                                        </p>
                                    </div>

                                    <Link
                                        to={"https://rzp.io/rzp/CIASessions"}
                                        target="_blank"
                                        className="group flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-white 
                        rounded-lg shadow-lg transition-all duration-300 
                        bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 
                        hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-400"
                                    >
                                        Enroll Now
                                        <FaArrowRightLong className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Career Options */}

                <DescriptiveBullets
                    titleStart="Career Options after"
                    highlight="CIA Certification"
                    titleEnd="Completion"
                    image={ciaCareer}
                    imageAlt="Why CIA Certification?"
                    description="You can become eligible for multiple job roles after successful CIA certificate completion. Typical career opportunities after CIA course completion are the following: "
                    points={[
                        {
                            title: "Senior Internal Auditor:",
                            text:
                                "~₹12–20 LPA (industry average mid-level with certification impact)",
                        },
                        {
                            title: "Risk Manager:",
                            text:
                                "~₹10–18 LPA (career progression role after internal audit)",
                        },
                        {
                            title: "Chief Audit Executive:",
                            text:
                                "~₹35 LPA+ (senior leadership role)",
                        },
                        {
                            title: "Internal Auditor:",
                            text:
                                "~₹8–15 LPA (mid-level with CIA) ",
                        },
                        {
                            title: "Internal Audit Manager / Head of Internal Audit:",
                            text:
                                "~₹15–30 LPA+ (senior manager roles)",
                        },
                    ]}
                />

                {/* Flowchart */}
                <ProcessFlow
                    titleStart="Process of"
                    highlight="Becoming Certified"
                    titleEnd="CIA"
                    subHeading=""
                    steps={[
                        {
                            title: "Apply for the Program",
                            icon: FaFileAlt,
                            description:
                                "Choose and apply for one of the top CIA certification courses in India.",
                        },
                        {
                            title: "Get Trained with Expert Faculty",
                            icon: FaChalkboardTeacher,
                            description:
                                "Get quality training from industry experts by gathering practical knowledge in online classes.",
                        },
                        {
                            title: "Diligent Practice",
                            icon: FaClipboardCheck,
                            description:
                                "Practice with mock tests, MCQs and USA Gleim content provided by our CIA exam preparation program in India.",
                        },
                        {
                            title: "Get Certified",
                            icon: FaCertificate,
                            description:
                                "Pass all three parts of CIA successfully to get globally recognized CIA certification.",
                        },
                    ]}
                />

                {/* Exam Structure */}

                <div className="max-w-6xl mx-auto py-16 px-4">
                    <h2 className="text-center text-2xl md:text-4xl font-bold mb-12">CIA <span className="text-brand-blue font-normal italic">Exam </span>Structure</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Part 1 */}
                        <div className="bg-white rounded-xl shadow-md border-l-4 border-brand-blue p-6 hover:shadow-xl transition-all duration-300">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="bg-brand-blue/10 p-3 rounded-lg">
                                    <p className="text-brand-blue font-bold text-lg">Part 1</p>
                                </div>
                                <div>
                                    <p className="font-bold text-gray-800 text-base">Internal Audit</p>
                                    <p className="font-bold text-gray-800 text-base">Fundamentals</p>
                                </div>
                            </div>

                            <div className="bg-gray-50 rounded-lg p-3 mb-4">
                                <p className="text-sm text-gray-600 font-medium">125 questions • 2.5 Hours</p>
                            </div>

                            <p className="text-sm font-semibold text-gray-700 mb-3">Key Topics:</p>
                            <ul className="space-y-2 text-sm text-gray-600">
                                <li className="flex gap-2">
                                    <span className="text-brand-blue">▸</span>
                                    <span>Foundations of Internal Auditing (35%)</span>
                                </li>
                                <li className="flex gap-2">
                                    <span className="text-brand-blue">▸</span>
                                    <span>Ethics and Professionalism (20%)</span>
                                </li>
                                <li className="flex gap-2">
                                    <span className="text-brand-blue">▸</span>
                                    <span>Governance, Risk Management (30%)</span>
                                </li>
                                <li className="flex gap-2">
                                    <span className="text-brand-blue">▸</span>
                                    <span>Fraud Risks (15%)</span>
                                </li>
                            </ul>
                        </div>

                        {/* Part 2 */}
                        <div className="bg-white rounded-xl shadow-md border-l-4 border-brand-purple p-6 hover:shadow-xl transition-all duration-300">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="bg-brand-purple/10 p-3 rounded-lg">
                                    <p className="text-brand-purple font-bold text-lg">Part 2</p>
                                </div>
                                <div>
                                    <p className="font-bold text-gray-800 text-base">Internal Audit</p>
                                    <p className="font-bold text-gray-800 text-base">Engagement</p>
                                </div>
                            </div>

                            <div className="bg-gray-50 rounded-lg p-3 mb-4">
                                <p className="text-sm text-gray-600 font-medium">100 questions • 2 Hours</p>
                            </div>

                            <p className="text-sm font-semibold text-gray-700 mb-3">Key Topics:</p>
                            <ul className="space-y-2 text-sm text-gray-600">
                                <li className="flex gap-2">
                                    <span className="text-brand-purple">▸</span>
                                    <span>Engagement Planning (50%)</span>
                                </li>
                                <li className="flex gap-2">
                                    <span className="text-brand-purple">▸</span>
                                    <span>Information Gathering & Analysis (40%)</span>
                                </li>
                                <li className="flex gap-2">
                                    <span className="text-brand-purple">▸</span>
                                    <span>Engagement Supervision (10%)</span>
                                </li>
                            </ul>
                        </div>

                        {/* Part 3 */}
                        <div className="bg-white rounded-xl shadow-md border-l-4 border-orange-500 p-6 hover:shadow-xl transition-all duration-300">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="bg-orange-500/10 p-3 rounded-lg">
                                    <p className="text-orange-500 font-bold text-lg">Part 3</p>
                                </div>
                                <div>
                                    <p className="font-bold text-gray-800 text-base">Internal Audit</p>
                                    <p className="font-bold text-gray-800 text-base">Function</p>
                                </div>
                            </div>

                            <div className="bg-gray-50 rounded-lg p-3 mb-4">
                                <p className="text-sm text-gray-600 font-medium">100 questions • 2 Hours</p>
                            </div>

                            <p className="text-sm font-semibold text-gray-700 mb-3">Key Topics:</p>
                            <ul className="space-y-2 text-sm text-gray-600">
                                <li className="flex gap-2">
                                    <span className="text-orange-500">▸</span>
                                    <span>Internal Audit Operations (25%)</span>
                                </li>
                                <li className="flex gap-2">
                                    <span className="text-orange-500">▸</span>
                                    <span>Internal Audit Plans (15%)</span>
                                </li>
                                <li className="flex gap-2">
                                    <span className="text-orange-500">▸</span>
                                    <span>Quality of Function (15%)</span>
                                </li>
                                <li className="flex gap-2">
                                    <span className="text-orange-500">▸</span>
                                    <span>Engagement Results & Monitoring (45%)</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* CIA Course Eligibility */}

                <div className="py-16 px-4 sm:px-6 lg:px-8 font-poppins">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-2xl md:text-4xl font-bold mb-6">
                                CIA Course <span className="text-brand-blue font-normal italic">Eligibility</span>
                            </h2>
                        </div>

                        {/* Eligibility Table */}
                        <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
                            <table className="w-full text-left border-collapse min-w-[800px]">
                                <thead>
                                    <tr className="bg-brand-blue border-b border-gray-200">
                                        <th className="px-6 py-4 text-sm font-bold text-gray-200">
                                            <h3 className="m-0 text-inherit font-inherit">Candidate Category</h3>
                                        </th>
                                        <th className="px-6 py-4 text-sm font-bold text-gray-200">
                                            <h3 className="m-0 text-inherit font-inherit">Education Requirement</h3>
                                        </th>
                                        <th className="px-6 py-4 text-sm font-bold text-gray-200">
                                            <h3 className="m-0 text-inherit font-inherit">Experience Needed</h3>
                                        </th>
                                        <th className="px-6 py-4 text-sm font-bold text-gray-200">
                                            <h3 className="m-0 text-inherit font-inherit">Key Notes</h3>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {[
                                        {
                                            category: "Bachelor’s Degree Holder",
                                            education: "Completed bachelor’s degree from an accredited institution.",
                                            experience: "2 years of internal audit or related professional experience.",
                                            notes: "Standard pathway for most audit professionals.",
                                        },
                                        {
                                            category: "Master’s Degree Holder",
                                            education: "Completed master’s degree from an accredited institution.",
                                            experience: "1 year of internal audit or related professional experience.",
                                            notes: "Accelerated experience requirement for higher degrees.",
                                        },
                                        {
                                            category: "Professional Cert. Holder",
                                            education: "Active CA, CPA, or other recognized professional certification.",
                                            experience: "Experience requirements may be waived or reduced per IIA rules.",
                                            notes: "Direct entry pathway for qualified professionals.",
                                        },
                                        {
                                            category: "Information Systems Auditor",
                                            education: "Holding an active CISA certification in good standing.",
                                            experience: "Experience requirement as per standard IIA definitions.",
                                            notes: "Ideal for IT audit and security specialists.",
                                        },
                                        {
                                            category: "Student / No Degree",
                                            education: "Currently enrolled students or candidates without a degree.",
                                            experience: "Must clear the Internal Auditor Practitioner (IAP) exam first.",
                                            notes: "Start your CIA journey early while completing studies.",
                                        }
                                    ].map((item, idx) => (
                                        <tr key={idx} className="hover:bg-blue-50/30 transition-colors">
                                            <td className="px-6 py-5 text-sm font-bold text-gray-900">
                                                <p className="m-0">{item.category}</p>
                                            </td>
                                            <td className="px-6 py-5 text-sm text-gray-600 leading-relaxed font-inter">
                                                <p className="m-0">{item.education}</p>
                                            </td>
                                            <td className="px-6 py-5 text-sm font-semibold text-brand-blue leading-relaxed font-inter">
                                                <p className="m-0">{item.experience}</p>
                                            </td>
                                            <td className="px-6 py-5 text-xs text-slate-400 italic font-medium font-inter">
                                                <p className="m-0">{item.notes}</p>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Exam Logistics */}
                <div className="max-w-6xl mx-auto py-8 md:py-16 px-4">
                    <h2 className="text-center text-2xl md:text-4xl font-bold mb-12">
                        Exam <span className="text-brand-blue font-normal italic">Logistics</span>
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            {
                                title: "100% MCQ Format",
                                desc: "CIA is a 100% MCQ-based exam with no negative marking",
                                color: "from-blue-500 to-blue-600"
                            },
                            {
                                title: "Passing Score",
                                desc: "Score at least 600 points out of 750 (80%) to clear the exam",
                                color: "from-purple-500 to-purple-600"
                            },
                            {
                                title: "Registration Validity",
                                desc: "Validity of CIA registration is 3 years from the date of initial registration",
                                color: "from-orange-500 to-orange-600"
                            },
                            {
                                title: "Exam Window",
                                desc: "Exam window is 180 days from the date you register for your CIA exam",
                                color: "from-green-500 to-green-600"
                            },
                            {
                                title: "Flexible Sequencing",
                                desc: "Appear for any part in any sequence and get results immediately",
                                color: "from-pink-500 to-pink-600"
                            },
                            {
                                title: "Exam Locations",
                                desc: "Exams conducted both in India and abroad; in India, only at PearsonVue Centers",
                                color: "from-indigo-500 to-indigo-600"
                            },
                        ].map((item, index) => (
                            <div
                                key={index}
                                className="group bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200"
                            >
                                <div className={`h-2 bg-gradient-to-r ${item.color}`}></div>
                                <div className="p-6">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center flex-shrink-0`}>
                                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <p className="font-bold text-gray-800 text-base">{item.title}</p>
                                    </div>
                                    <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Why GPC? */}

                <WhyGPC
                    subHeading="Global Professional Certifications is one of the best CIA training providers in India for the following reasons:"
                    items={[
                        {
                            icon: <FaGlobe className="text-white text-2xl" />,
                            title: "Globally Acknowledged",
                            description:
                                "CIA certifications of Global Professional Certifications are IIA registered which gives global recognition to the candidates creating higher earning potential.",
                        },
                        {
                            icon: <FaUserCheck className="text-white text-2xl" />,
                            title: "One-on-one Support",
                            description:
                                "Complete support for your certification journey to ensure candidate success at each step.",
                        },
                        {
                            icon: <FaChalkboardTeacher className="text-white text-2xl" />,
                            title: "Industry-expert Mentors",
                            description:
                                "Experienced CIA training provider in India who gives industry relevant practical insights necessary for modern professionals.",
                        },
                        {
                            icon: <FaClock className="text-white text-2xl" />,
                            title: "Attending Flexibility",
                            description:
                                "Flexibility to join weekend online classes with 100% recording sessions for learning the important concepts at your pace.",
                        },
                    ]} />


                {/* Fees and Membership Benefits */}
                <div className="max-w-6xl mx-auto py-8 md:py-16 px-4 font-inter">
                    <h2 className="text-center text-2xl md:text-4xl font-bold mb-12">
                        Fees and Membership<span className="text-brand-blue font-normal italic"> Benefits</span>
                    </h2>

                    {/* Desktop Comparison Table */}
                    <div className="hidden md:block overflow-hidden rounded-2xl border border-gray-200 shadow-xl bg-white">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-brand-blue border-b border-gray-200">
                                    <th className="px-8 py-6 text-gray-200 font-bold">Exam / Fee Type</th>
                                    <th className="px-8 py-6 text-gray-200 font-bold text-center">IIA Members</th>
                                    <th className="px-8 py-6 text-gray-200 font-bold text-center">Non-Members</th>
                                    <th className="px-8 py-6 font-bold text-gray-200 text-center">Savings</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {[
                                    { label: "Application Fee", member: 90, nonMember: 240 },
                                    { label: "Part 1 Exam Fee", member: 232.50, nonMember: 445 },
                                    { label: "Part 2 Exam Fee", member: 210, nonMember: 415 },
                                    { label: "Part 3 Exam Fee", member: 210, nonMember: 415 },
                                ].map((row, idx) => (
                                    <tr key={idx} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-8 py-5 text-gray-700 font-medium">{row.label}</td>
                                        <td className="px-8 py-5 text-gray-800 font-bold text-center">USD {row.member} <span className="text-[10px] font-normal text-gray-400">+ taxes</span></td>
                                        <td className="px-8 py-5 text-gray-500 text-center">USD {row.nonMember} <span className="text-[10px] font-normal text-gray-400">+ taxes</span></td>
                                        <td className="px-8 py-5 text-green-600 font-bold text-center bg-blue-50/50">USD {row.nonMember - row.member}</td>
                                    </tr>
                                ))}
                                <tr className="bg-gray-50/80 font-bold">
                                    <td className="px-8 py-6 text-gray-800">Total Certification Cost</td>
                                    <td className="px-8 py-6 text-brand-blue text-2xl text-center">USD 742.50 <span className="text-xs font-normal text-gray-400">+ taxes</span></td>
                                    <td className="px-8 py-6 text-gray-500 text-center">USD 1,515 <span className="text-xs font-normal text-gray-400">+ taxes</span></td>
                                    <td className="px-8 py-6 text-green-600 text-2xl text-center bg-blue-50">USD 772.50</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile Comparison View */}
                    <div className="md:hidden space-y-4">
                        {[
                            { label: "Application Fee", member: 90, nonMember: 240 },
                            { label: "Part 1 Exam Fee", member: 232.50, nonMember: 445 },
                            { label: "Part 2 Exam Fee", member: 210, nonMember: 415 },
                            { label: "Part 3 Exam Fee", member: 210, nonMember: 415 },
                        ].map((row, idx) => (
                            <div key={idx} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                                <h4 className="font-bold text-gray-800 mb-4">{row.label}</h4>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-blue-50 rounded-lg p-3">
                                        <p className="text-xs text-brand-blue font-bold uppercase mb-1">Member</p>
                                        <p className="text-gray-800 font-bold text-lg">USD {row.member} <span className="text-[10px] font-normal text-gray-500">+ taxes</span></p>
                                    </div>
                                    <div className="bg-gray-50 rounded-lg p-3">
                                        <p className="text-xs text-gray-500 font-bold uppercase mb-1">Non-Member</p>
                                        <p className="text-gray-600 font-bold text-lg">USD {row.nonMember} <span className="text-[10px] font-normal text-gray-500">+ taxes</span></p>
                                    </div>
                                </div>
                                <div className="mt-3 flex justify-between items-center text-sm">
                                    <span className="text-gray-500 italic">Total Savings with Membership</span>
                                    <span className="text-green-600 font-bold">USD {row.nonMember - row.member}</span>
                                </div>
                            </div>
                        ))}
                        <div className="bg-brand-blue rounded-xl p-6 text-white shadow-lg">
                            <h4 className="font-bold text-lg mb-4 text-center">Total Certification Value</h4>
                            <div className="flex flex-col gap-4 mb-4">
                                <div className="flex justify-between items-center">
                                    <p className="opacity-80">IIA Member Cost</p>
                                    <div className='flex flex-col justify-center items-end'>
                                        <p className="font-bold text-xl text-right">USD 742.50</p>
                                        <p className="text-[10px] font-normal opacity-70">+ taxes</p>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <p className="opacity-80">Non-Member Cost</p>
                                    <div className='flex flex-col justify-center items-end'>
                                        <p className="font-bold text-xl text-right">USD 1,515.00</p>
                                        <p className="text-[10px] font-normal opacity-70">+ taxes</p>
                                    </div>
                                </div>
                            </div>
                            <div className="border-t border-white/20 pt-4 flex justify-between items-center">
                                <p className="font-bold">Total Benefit</p>
                                <div className='flex flex-col justify-center items-end'>
                                    <p className="text-2xl font-black">USD 772.50</p>
                                    <p className="text-[10px] font-normal opacity-70">+ taxes</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Membership & Notes Section */}
                    <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* IIA Membership Details */}
                        <div className="lg:col-span-2 bg-white rounded-3xl p-8 border border-gray-100 shadow-2xl shadow-blue-500/5 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -mr-16 -mt-16 opacity-50"></div>

                            <div className="relative z-10">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-12 h-12 rounded-2xl bg-brand-blue/10 flex items-center justify-center text-brand-blue">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                        </svg>
                                    </div>
                                    <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                                        IIA India Membership Details
                                    </h2>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="p-6 rounded-2xl border border-blue-100 bg-gradient-to-b from-blue-50/50 to-transparent">
                                        <p className="text-xs font-bold text-brand-blue uppercase tracking-widest mb-2">New Enrollment</p>
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-3xl font-black text-gray-900">INR 6,500</span>
                                            <span className="text-sm font-medium text-gray-500">+ 18% GST</span>
                                        </div>
                                    </div>
                                    <div className="p-6 rounded-2xl border border-gray-100 bg-gradient-to-b from-gray-50/50 to-transparent">
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Annual Renewal</p>
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-3xl font-black text-gray-900">INR 4,500</span>
                                            <span className="text-sm font-medium text-gray-500">+ 18% GST</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Important Notes */}
                        <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100">
                            <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-yellow-400/20 flex items-center justify-center text-yellow-700">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                Important Notes
                            </h3>
                            <ul className="space-y-4">
                                {[
                                    "Fees are subject to change as per IIA guidelines.",
                                    "Membership must be active at the time of exam registration to avail discounts.",
                                    "Applicable taxes (GST) will be calculated during the final checkout."
                                ].map((note, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <div className="mt-1.5 shrink-0">
                                            <div className="w-1.5 h-1.5 rounded-full bg-brand-blue"></div>
                                        </div>
                                        <p className="text-sm leading-relaxed text-gray-600 font-medium">
                                            {note}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Excellence in Training Design */}
                <div className="max-w-7xl mx-auto py-12 md:py-16 px-6 md:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Excellence in <span className="text-brand-blue font-normal italic">Training Design</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Timeline & Schedule Group */}
                        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="bg-gradient-to-br from-indigo-900 via-indigo-600 to-indigo-100 rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden group hover:shadow-black/20 shadow-lg transition-all duration-500">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl group-hover:scale-110 transition-transform duration-500"></div>
                                <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-md text-white flex items-center justify-center mb-6 relative border border-white/20">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold mb-4 tracking-tight">Completion Timeline</h3>
                                <div className='p-5 rounded-[1.5rem] bg-white/10 border border-white/10 backdrop-blur-sm'>
                                    <p className="text-indigo-50/90 text-sm md:text-base leading-relaxed">
                                        Embark on a comprehensively structured 7-8 month training journey, meticulously designed to ensure consistent preparation momentum and support your path toward successfully achieving the CIA designation.
                                    </p>
                                </div>
                            </div>

                            {/* Batch Calendar */}
                            <div className="bg-gradient-to-br from-black via-black to-black rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden group  hover:shadow-xl transition-all duration-500">
                                <div className="absolute bottom-0 right-0 w-40 h-40 bg-brand-blue/20 rounded-full -mb-20 -mr-20 blur-3xl group-hover:opacity-70 transition-opacity"></div>
                                <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md text-white flex items-center justify-center mb-6 relative border border-white/20">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 00-2 2z" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">CIA Live Sessions</h3>
                                <div className="p-5 rounded-[1.5rem] bg-white/10 border border-white/10 backdrop-blur-sm">
                                    <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                                        Continuous live batches scheduled throughout the year, complemented by access to the latest session recordings to accelerate your preparation journey. Join the classes from anywhere in the world.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-purple-800 to-fuchsia-900 rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden flex flex-col justify-between group hover:shadow-black/20 shadow-lg transition-all duration-500">
                            <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -mr-24 -mt-24 blur-3xl group-hover:bg-white/10 transition-colors duration-500"></div>
                            <div>
                                <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-md text-white flex items-center justify-center mb-6 border border-white/20">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold mb-3 tracking-tight">Session Breakdown</h3>
                            </div>

                            <div className="bg-black/30 backdrop-blur-xl rounded-[2rem] p-6 space-y-2">
                                <div>
                                    <p className="text-base leading-relaxed text-gray-200 mb-8">Part-wise Session Length:</p>
                                </div>
                                <div className="flex justify-between items-center border-b border-white/10 pb-2">
                                    <span className="text-base font-semibold tracking-widest text-gray-200">Part 1</span>
                                    <span className="text-base">60 - 70 Hours <span className="text-gray-250 italic text-xs">(approx.)</span></span>
                                </div>
                                <div className="flex justify-between items-center border-b border-white/10 pb-2">
                                    <span className="text-base font-semibold tracking-widest text-gray-200">Part 2</span>
                                    <span className="text-base">80 - 90 Hours <span className="text-gray-250 italic text-xs">(approx.)</span></span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-base font-semibold tracking-widest text-gray-200">Part 3</span>
                                    <span className="text-base">40 - 50 Hours <span className="text-gray-250 italic text-xs">(approx.)</span></span>
                                </div>
                            </div>
                        </div>

                        {/* Resources Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:col-span-3 mt-4">
                            {[
                                {
                                    title: "LMS Portal",
                                    desc: "Infinite access to recordings, PPTs, and topic-wise MCQs.",
                                    icon: "M9.75 17L9 21h6l-.75-4M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
                                    color: "blue"
                                },
                                {
                                    title: "Expert Mentorship",
                                    desc: "Direct guidance from Mr. Arpit Garg, India's top CIA faculty.",
                                    icon: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z",
                                    color: "emerald"
                                },
                                {
                                    title: "Gleim Premium",
                                    desc: "18 months of software access with 1000+ relevant MCQs.",
                                    icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
                                    color: "orange"
                                },
                                {
                                    title: "Success Support",
                                    desc: "End-to-end assistance until you clear all your CIA exams.",
                                    icon: "M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
                                    color: "rose"
                                }
                            ].map((item, index) => (
                                <div key={index} className="group bg-white rounded-[2rem] p-7 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                    <div className={`w-12 h-12 rounded-2xl bg-${item.color}-50 text-${item.color}-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                                        </svg>
                                    </div>
                                    <h4 className="font-bold text-gray-900 text-lg mb-3">{item.title}</h4>
                                    <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>


                {/* 3 parts enrollment */}
                <div className="max-w-5xl mx-auto py-8 md:py-16 px-4 md:px-0">
                    <div className="bg-gradient-to-br from-brand-blue to-black rounded-[2rem] p-8 md:p-12 shadow-2xl relative overflow-hidden group">
                        {/* Decorative background element */}
                        <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -mr-24 -mt-24 blur-3xl group-hover:bg-white/10 transition-colors duration-500"></div>

                        <div className="relative z-10 text-center">
                            <div className="max-w-3xl mx-auto mb-8">
                                <div className="p-5 md:p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 shadow-inner">
                                    <p className="text-lg md:text-2xl font-bold text-white mb-3">
                                        Enroll for all 3 parts along with Gleim content for <span className="text-orange-400">₹58,999</span> only
                                    </p>
                                    <div className="w-12 h-0.5 bg-orange-400/30 mx-auto mb-3 rounded-full"></div>
                                    <p className="text-base md:text-lg text-gray-300">
                                        Or each part for <span className="text-white font-semibold">₹23,599</span> only
                                    </p>
                                </div>
                            </div>

                            <p className="text-lg md:text-xl font-medium text-orange-300/90 mb-10 italic">
                                Enroll now to kickstart your career and stay ahead of the curve!
                            </p>

                            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                                <Link
                                    to="https://rzp.io/rzp/CIASessions"
                                    target="_blank"
                                    className="group w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 text-base md:text-lg font-bold text-white rounded-xl shadow-lg transition-all duration-300 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 hover:scale-105 hover:shadow-orange-500/20"
                                >
                                    Enroll for All Parts
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </Link>
                                <Link
                                    to="https://rzp.io/rzp/iFUFvKph"
                                    target="_blank"
                                    className="group w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 text-base md:text-lg font-bold text-white rounded-xl shadow-lg transition-all duration-300 bg-white/10 backdrop-blur-sm border border-white-20 hover:bg-white/20 hover:scale-105"
                                >
                                    Enroll for Each Part
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Testimonials Section */}
                <TestimonialsShowcase />

                {/* Blog Section */}
                <div className="px-6 lg:px-24 w-full mt-6 md:mt-12">
                    <div className="flex flex-col gap-2 justify-center items-center md:justify-start md:items-start p-4 mb-12">
                        <Link to="/blogs" aria-label="View Learning Resources and Blogs" className="text-2xl md:text-4xl lg:text-4xl text-center font-bold hover:underline hover:text-brand-blue transition-colors">
                            <h2>
                                Learning Resources & <span className="text-brand-blue font-normal italic">Blogs</span></h2>
                        </Link>
                        <p className="text-xs md:text-base text-center md:text-left lg:text-base font-poppins leading-relaxed max-w-lg text-gray-600 mt-6">
                            Explore expert insights and latest trends in audit, risk, and
                            professional certification on our blog
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {latestBlogs.map((blog) => (
                            <Link
                                key={blog._id}
                                to={`/blogs/${blog.slug.current || blog.slug}`}
                                aria-label={`Read blog: ${blog.title}`}
                                className="group block bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-200 h-[380px] md:h-[520px]"
                            >
                                <img
                                    src={blog.mainImage ? urlFor(blog.mainImage).url() : ''}
                                    alt={blog.title}
                                    className="w-full h-36 md:h-56 object-cover"
                                />

                                <div className="w-full flex justify-between items-center p-4 md:p-6">
                                    <div className="flex justify-center items-center gap-2">
                                        <FontAwesomeIcon
                                            icon={faCalendarDays}
                                            className="text-blue-400"
                                        />
                                        <div className="text-xs md:text-sm text-gray-600">
                                            {new Date(blog.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
                                        </div>
                                    </div>
                                    <div className="flex justify-center items-center gap-2">
                                        <FontAwesomeIcon icon={faUser} className="text-blue-400" />
                                        <div className="text-xs md:text-sm text-gray-600">
                                            {blog.author}
                                        </div>
                                    </div>
                                </div>

                                <div className="px-4 md:px-6 flex flex-col justify-between pb-6 h-[150px] md:h-[240px]">
                                    <div>
                                        <h3 className="text-base md:text-xl leading-tight md:leading-tight lg:leading-tight font-semibold text-gray-800 mb-2 line-clamp-3 group-hover:text-brand-blue group-hover:underline">
                                            {blog.title}
                                        </h3>
                                        <p className="text-gray-500 md:text-sm lg:text-sm text-xs line-clamp-2 md:line-clamp-3">
                                            {blog.excerpt}
                                        </p>
                                    </div>

                                    <div className="inline-flex justify-start items-center gap-2 p-1 border border-brand-purple rounded-full w-fit mt-8">
                                        <span className="md:text-base text-sm pl-2 text-gray-700">
                                            Read Full Blog
                                        </span>
                                        <FontAwesomeIcon
                                            icon={faArrowUpRightFromSquare}
                                            className="text-white text-xs md:text-sm bg-brand-blue h-2 w-2 md:h-4 md:w-4 rounded-full p-1 md:p-2"
                                        />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    <div className="flex justify-center items-center mt-12">
                        <NavLink to="/blogs">
                            <button className="bg-brand-blue text-white text-sm md:text-base py-2 px-4 md:px-6 rounded-full hover:bg-brand-purple hover:scale-105 transition-all duration-300">
                                Read More Blogs
                            </button>
                        </NavLink>
                    </div>
                </div>

                {/* FAQ Section */}

                <div className="mt-32 px-8 pb-16 lg:px-20">
                    <div className="flex flex-col lg:flex-row items-center gap-20 lg:gap-0">
                        {/* Image Section */}
                        <div className="w-full lg:w-2/5 flex justify-center items-center relative">
                            <div className="absolute max-w-md w-full h-full bg-brand-blue/30 translate-x-3 translate-y-3 md:translate-x-6 md:translate-y-6 lg:translate-x-6 lg:translate-y-6 z-0"></div>

                            {/* Main Image */}
                            <img
                                src={faqImage}
                                alt="FAQ illustration"
                                className="max-w- w-full object-contain relative z-10 -translate-x-3 -translate-y-3 md:-translate-x-6 md:-translate-y-6 lg:-translate-x-6 lg:-translate-y-6"
                            />
                        </div>

                        {/* Questions Dropdown Section */}
                        <div className="w-full lg:w-3/5">
                            <FAQDisplay faqs={courseFaqs} showCount={5} showMoreLink="/faq" />
                        </div>
                    </div>
                </div>
            </div >
        </>

    );
}

export default Cia;
