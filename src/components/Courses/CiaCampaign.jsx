import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Card from '../Card/Card.jsx';
import { FaArrowRightLong } from "react-icons/fa6";
import { FaFileAlt, FaChalkboardTeacher, FaClipboardCheck, FaCertificate, FaGlobe, FaUserCheck, FaClock } from "react-icons/fa";
import MetaTags from '../MetaTags.jsx';
import { height } from '../Notifications/NotificationBanner.jsx';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCertificate, faStar, faCalendarDays, faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

import DescriptiveLeft from "../DescriptiveSection/DescriptiveLeft.jsx";
import DescriptiveBullets from "../DescriptiveSection/DescriptiveBullets.jsx";
import DescriptiveFlowchart from "../DescriptiveSection/DescriptiveFlowchart.jsx";
import WhyGPC from '../DescriptiveSection/WhyGPC.jsx';
import TestimonialsShowcase from "../Testimonials/TestimonialsShowcase.jsx";
import FAQDisplay from "../FAQDisplay.jsx";
import CoursesShowcase from "./CoursesShowcase.jsx";
import BlogCall from "../Blogs/BlogCall.jsx";
import CompaniesShowcase from "../Companies/CompaniesShowcase.jsx";
import MentorShowcase from "../About/MentorShowcase.jsx";

import { SchemaMarkup, getCourseSchema, getBreadcrumbSchema, getFAQSchema } from "../Schema/index.js";

import examOne from "../../assets/courses/cia/exam-1.webp";
import examTwo from "../../assets/courses/cia/exam-2.webp";
import examThree from "../../assets/courses/cia/exam-3.webp";
import examFour from "../../assets/courses/cia/exam-4.webp";
import brochureCover from "../../assets/home/cia-brochure.webp";
import learningPartner from "../../assets/Learning_partner.jpg";
import internalAudit from "../../assets/courses/cia/internal-audit.webp";
import ciaCertification from "../../assets/courses/cia/cia-certification.webp";
import faqImage from "../../assets/faq.webp";
import ciaCareer from "../../assets/courses/cia/career-option.webp";

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
            "It is not required to have a CA or MBA degree to complete CIA certification. The Institute of Internal Audit (IIA) suggests that individuals can become eligible for CIA certification with Bachelors', Masters' or no degree as well when they have required relevant experience.",
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

const CiaCampaign = () => {

    // Comprehensive Course Schema
    const ciaSchema = getCourseSchema({
        name: "Certified Internal Auditor (CIA) Certification Course - Ad Campaign",
        description: "Master the complete CIA exam with expert guidance and comprehensive study materials. All 3 parts with Gleim content, live weekend classes, and 1000+ MCQs.",
        price: "58999",
        enrollUrl: "https://rzp.io/rzp/CIASessions",
        credential: "Certified Internal Auditor (CIA)",
        occupationalCategory: "Internal Auditor, Risk Management Professional",
        courseWorkload: "PT60-70H (Part 1), PT80-90H (Part 2), PT40-50H (Part 3)"
    });

    // Breadcrumb Schema
    const breadcrumbSchema = getBreadcrumbSchema([
        { name: "Home", url: "https://globalprofessionalcertifications.com" },
        { name: "CIA Training", url: "https://globalprofessionalcertifications.com/cia-certification-training" }
    ]);

    // FAQ Schema
    const faqSchema = getFAQSchema(courseFaqs);

    return (
        <>
            <SchemaMarkup schema={[ciaSchema, breadcrumbSchema, faqSchema]} />

            <MetaTags
                title="CIA Certification Training | India's #1 IIA-Accredited Program"
                description="Join the most trusted CIA certification training in India. 350+ success stories, US Gleim content, and live mentorship by Arpit Garg. Enroll now!"
                canonicalUrl="https://globalprofessionalcertifications.com/cia-certification-training"
            />

            {/* Hero Section */}
            <div className={`md:h-screen flex justify-center items-center bg-brand-blue pb-12 md:pb-0 sm:pt-${(12 + (height ? height - 4 : 0)).toString()}`}>
                <div className="md:py-32 pt-28 md:pt-16 w-full flex flex-col lg:flex-row justify-between items-center gap-12 lg:gap-24 px-8 md:px-20">
                    <div className="w-full lg:w-[40%] text-center lg:text-left">
                        <div className="relative w-md md:max-w-xl">
                            <h1 className="text-2xl md:text-4xl font-bold leading-tight text-white">
                                India's #1{" "}<span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">IIA-Accredited</span>{" "}CIA Training Program
                            </h1>
                            <p className='mt-4 text-base sm:text-lg md:text-lg text-gray-200 leading-relaxed'>
                                <ul className='list-disc pl-3'>
                                    <li>Certified Internal Auditor (CIA) Classes with Gleim Content </li>
                                    <li>Weekend Live Classes with 1000+ Relevant MCQs </li>
                                    <li>7-8 months Course with Full IIA Registration and Exam Support </li>
                                    <li>350+ Successful CIA Professionals Trained by 100% Proven Methodology </li>
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

                    <div className="w-full lg:w-[55%] max-w-2xl bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] overflow-hidden border border-white/20 h-[520px] transition-all duration-500 hover:shadow-[0_30px_60px_rgba(0,0,0,0.4)] hover:-translate-y-1">
                        <iframe
                            src="https://zfrmz.in/j3veJAHMvgO7eiA8k651"
                            width="100%"
                            height="100%"
                            frameBorder="0"
                            style={{ border: 'none' }}
                            title="Lead Generation Form"
                        ></iframe>
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
                                350+
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

                    <div className="flex md:justify-center md:flex-row flex-col gap-4 items-center md:w-full md:mb-12">
                        <Card
                            title="CIA All 3 Parts with Gleim Content"
                            image={examOne}
                            text={"Master the complete CIA exam with expert guidance and comprehensive study materials"}
                            price={58999}
                            enrollLink="https://rzp.io/rzp/CIASessions"
                            imageStyle={"pt-4"}
                            gst="(Including GST)" />
                        <Card
                            title="CIA Part 1 with Gleim Content"
                            image={examTwo}
                            text={"Build a strong foundation in internal audit essentials with in-depth preparation"}
                            price={23599}
                            enrollLink="https://pages.razorpay.com/pl_PbHL4oa3lyfSzL/view"
                            imageStyle={"pt-12"}
                            gst="(Including GST)" />
                        <Card
                            title="CIA Part 2 with Gleim Content"
                            image={examThree}
                            text={"Strengthen your skills in risk management, governance, and control processes"}
                            price={23599}
                            enrollLink="https://pages.razorpay.com/pl_PbHL4oa3lyfSzL/view"
                            gst="(Including GST)" />
                        <Card
                            title="CIA Part 3 with Gleim Content"
                            image={examFour}
                            text={"Gain expertise in business acumen, financial management, and data analytics"}
                            price={23599}
                            enrollLink="https://pages.razorpay.com/pl_PbHL4oa3lyfSzL/view"
                            gst="(Including GST)"
                            imageStyle={"pt-8"} />
                    </div>
                </div>

                {/* Download Brochure CTA */}
                <div className="mt-20 md:mt-12 px-6 md:px-16 lg:px-12 py-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-12">
                        <div className="w-full md:w-1/2 flex justify-center">
                            <img
                                src={brochureCover}
                                alt="Brochure"
                                width="416"
                                height="588"
                                loading="lazy"
                                className="w-64 sm:w-80 md:w-[26rem] h-auto object-contain"
                            />
                        </div>
                        <div className="w-full md:w-1/2 flex flex-col justify-center items-center md:items-start gap-4 text-center md:text-left">
                            <h2 className="text-xl sm:text-2xl md:text-4xl font-bold max-w-[300px] md:max-w-xl lg:max-w-xl">
                                Download Our{" "}
                                <span className="text-brand-blue font-normal italic">CIA</span>{" "}
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
                        <div className="flex flex-col gap-6 lg:w-1/2 text-center md:text-left">
                            <h2 className="text-2xl md:text-4xl font-bold leading-snug">
                                <span className="text-brand-blue font-normal italic">IIA India</span>{" "}
                                Authorized Training Partner
                            </h2>
                            <p className="text-gray-600 text-xs md:text-base lg:text-base font-poppins leading-relaxed">
                                <span className='text-black font-semibold'>Mr. Mukundan K.V, CEO of IIA India,</span> presents the official accreditation certificate to Arpit Garg, GPC mentor marking Global Professional Certifications as an <span className="font-semibold">IIA India Authorized Learning Partner</span>
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
                        <div className="flex justify-center md:justify-end w-80 md:w-full lg:w-1/2">
                            <img
                                src={learningPartner}
                                alt="IIA India Certification Ceremony"
                                width="550"
                                height="367"
                                loading="lazy"
                                className="w-80 md:w-full lg:w-[550px] h-auto rounded-2xl shadow-xl object-cover transition-all duration-300"
                            />
                        </div>
                    </div>
                </div>

                {/* CTA Banner */}
                <div className="py-16 md:py-16 w-full px-4">
                    <div className="max-w-6xl mx-auto">
                        <div className="bg-gradient-to-br from-brand-blue to-black rounded-2xl shadow-2xl overflow-hidden p-8 md:p-12">
                            <div className="text-center mb-10">
                                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2">
                                    CIA All Parts with <span className="text-orange-400 font-normal italic">Gleim Content</span> as Per the New Syllabus
                                </h2>
                            </div>
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                <div className="lg:col-span-2 space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {[
                                            { title: "Live Classes", desc: "Interactive weekend sessions" },
                                            { title: "Gleim Study Materials", desc: "Soft book and 1000+ MCQs" },
                                            { title: "Class Notes", desc: "Comprehensive study guides" },
                                            { title: "In-Class MCQs", desc: "Practice questions & tests" }
                                        ].map((f, i) => (
                                            <div key={i} className="flex items-start gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-all duration-300">
                                                <div className="bg-orange-400 rounded-full p-1.5 mt-0.5 flex-shrink-0">
                                                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <p className="text-white font-semibold text-sm md:text-base">{f.title}</p>
                                                    <p className="text-gray-200 text-xs md:text-sm">{f.desc}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="lg:col-span-1 flex flex-col justify-center items-center text-center space-y-6">
                                    <Link
                                        to={"https://rzp.io/rzp/CIASessions"}
                                        target="_blank"
                                        className="group flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-white transition-all duration-300 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 hover:scale-105 hover:shadow-xl"
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
                    imageAlt="Career Options after CIA"
                    description="You can become eligible for multiple job roles after successful CIA certificate completion. Typical career opportunities after CIA course completion are the following: "
                    points={[
                        { title: "Senior Internal Auditor:", text: "~₹12–20 LPA" },
                        { title: "Risk Manager:", text: "~₹10–18 LPA" },
                        { title: "Chief Audit Executive:", text: "~₹35 LPA+" },
                        { title: "Internal Auditor:", text: "~₹8–15 LPA" },
                        { title: "Internal Audit Manager:", text: "~₹15–30 LPA+" }
                    ]}
                />

                {/* Process */}
                <DescriptiveFlowchart
                    titleStart="Process of"
                    highlight="Becoming Certified"
                    titleEnd="CIA"
                    subHeading=""
                    steps={[
                        { title: "Apply for the Program", icon: FaFileAlt, description: "Choose and apply for one of the top CIA certification courses in India." },
                        { title: "Get Trained with Expert Faculty", icon: FaChalkboardTeacher, description: "Get quality training from industry experts." },
                        { title: "Diligent Practice", icon: FaClipboardCheck, description: "Practice with mock tests and USA Gleim content." },
                        { title: "Get Certified", icon: FaCertificate, description: "Pass all three parts to get globally recognized." }
                    ]}
                />

                {/* Why GPC? */}
                <WhyGPC
                    subHeading="Global Professional Certifications is one of the best CIA training providers in India for the following reasons:"
                    items={[
                        { icon: <FaGlobe className="text-white text-2xl" />, title: "Globally Acknowledged", description: "IIA registered which gives global recognition." },
                        { icon: <FaUserCheck className="text-white text-2xl" />, title: "One-on-one Support", description: "Complete support for your certification journey." },
                        { icon: <FaChalkboardTeacher className="text-white text-2xl" />, title: "Industry-expert Mentors", description: "Experienced mentors with practical insights." },
                        { icon: <FaClock className="text-white text-2xl" />, title: "Attending Flexibility", description: "Weekend classes with 100% recordings." }
                    ]}
                />

                {/* About Mentor */}
                <MentorShowcase />

                {/* 3 parts enrollment */}
                <div className="max-w-5xl mx-auto py-8 md:py-16 px-4 md:px-0">
                    <div className="bg-gradient-to-br from-brand-blue to-black rounded-[2rem] p-8 md:p-12 shadow-2xl relative overflow-hidden group">
                        <div className="relative z-10 text-center">
                            <div className="max-w-3xl mx-auto mb-8">
                                <div className="p-5 md:p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 shadow-inner">
                                    <p className="text-lg md:text-2xl font-bold text-white mb-3">
                                        Enroll for all 3 parts along with Gleim content for <span className="text-orange-400">₹58,999</span> only
                                    </p>
                                    <p className="text-base md:text-lg text-gray-300">
                                        Or each part for <span className="text-white font-semibold">₹23,599</span> only
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                                <Link to="https://rzp.io/rzp/CIASessions" target="_blank" className="group w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 text-base md:text-lg font-bold text-white rounded-xl shadow-lg transition-all duration-300 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 hover:scale-105">
                                    Enroll Now
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Testimonials */}
                <TestimonialsShowcase />

                {/* Companies */}
                <CompaniesShowcase
                    titleStart="Placement Opportunities after"
                    highlightOne="CIA Certification"
                    titleEnd="with"
                    highlightTwo="GPC"
                    description="Trusted by professionals from top multinational corporations"
                />

                {/* FAQ Section */}
                <div className="mt-32 px-8 pb-16 lg:px-20">
                    <div className="flex flex-col lg:flex-row items-center gap-20">
                        <div className="w-full lg:w-2/5 flex justify-center items-center">
                            <img src={faqImage} alt="FAQ" className="w-full object-contain" />
                        </div>
                        <div className="w-full lg:w-3/5">
                            <FAQDisplay faqs={courseFaqs} showCount={5} showMoreLink="/faq" />
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
}

export default CiaCampaign;
