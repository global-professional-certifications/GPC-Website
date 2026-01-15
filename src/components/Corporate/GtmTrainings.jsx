import React from 'react';
import { Helmet } from 'react-helmet-async';
import MetaTags from '../MetaTags';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCertificate, faStar, faClock, faRocket, faShieldHalved, faBrain, faScaleBalanced } from "@fortawesome/free-solid-svg-icons";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { height } from '../Notifications/NotificationBanner';


import DescriptiveLeft from "../DescriptiveSection/DescriptiveLeft";
import DescriptiveBullets from "../DescriptiveSection/DescriptiveBullets";

import internalAudit from "../../assets/courses/cia/internal-audit.webp";
import learningPartner from "../../assets/Learning_partner.jpg";
import ciaHero from "../../assets/courses/cia/cia-hero.webp";



const GtmTrainings = () => {
    return (
        <>
            <MetaTags
                title="Corporate Training Programmes | GTM Trainings | Global Professional Certifications"
                description="Elevate your team with GPC's 30 specialized corporate training programs. From Risk-Based Auditing to AI and Agile methodologies."
                canonicalUrl="https://globalprofessionalcertifications.com/corporate/gtm-trainings"
            />

            {/* Hero Section */}
            <div className="md:h-screen flex justify-center items-center bg-brand-blue pb-12 md:pb-0 pt-24">
                <div className="md:py-32 mx-auto md:max-w-8xl flex flex-col lg:flex-row justify-center items-center gap-12 px-8 md:px-24">
                    {/* Left Content */}
                    <div className="max-w-sm md:max-w-2xl mx-auto">
                        <div className="relative w-md md:max-w-xl">
                            <h1 className="ext-2xl md:text-4xl font-bold leading-tight text-white">
                                Professional Development Programs for{" "}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
                                    Internal Audit Excellence
                                </span>
                            </h1>

                            <p className="mt-4 text-base sm:text-lg md:text-lg text-gray-200 max-w-2xl leading-relaxed">
                                Empower your workforce with 30+ specialized training modules crafted to
                                address modern internal audit challenges — from AI adoption and data
                                analytics to Agile auditing and risk governance.
                            </p>
                        </div>

                        <div className="mt-6">
                            <Link
                                to="#cta"
                                className="inline-flex items-center justify-center px-8 py-3 text-lg font-semibold text-white rounded-lg shadow-lg transition-all duration-300 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 hover:scale-105 hover:shadow-xl"
                            >
                                Get a Quote
                            </Link>
                        </div>
                    </div>

                    {/* Right Visual */}
                    <div className="relative mx-auto lg:max-w-6xl">
                        <img
                            className="w-[550px] h-auto rounded-xl shadow-2xl hidden md:block"
                            src={ciaHero}
                            alt="Professional Development Programs"
                            loading="lazy"
                        />
                    </div>
                </div>
            </div>



            <div className="bg-gray-50">
                {/* Introduction */}
                <DescriptiveLeft
                    titleStart="What are "
                    highlight="GTM Training Programmes?"
                    description="GPC's Go-To-Market (GTM) Corporate Training Programs offer a comprehensive suite of 30 specialized courses designed to enhance the skills and competencies of internal audit practitioners at all levels. Our curriculum is tailored to bridge the gap between traditional auditing and the demands of the modern, technology-driven business landscape."
                    image={internalAudit}
                />

                {/* Categories Grid */}
                <div className="max-w-7xl mx-auto px-8 py-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Program <span className="text-brand-blue font-normal italic">Categories</span></h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { title: "Risk-Based Auditing", icon: faShieldHalved, items: ["Fundamentals", "Advanced Risk Assessment"] },
                            { title: "Modern Methodology", icon: faRocket, items: ["Agile Auditing", "Operational Auditing"] },
                            { title: "Tech & AI", icon: faBrain, items: ["AI in Internal Audit", "Cyber Security Basics"] },
                            { title: "Skills & Standards", icon: faScaleBalanced, items: ["Audit Report Writing", "Global Standards"] },
                        ].map((cat, i) => (
                            <div key={i} className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 hover:shadow-xl transition-all">
                                <FontAwesomeIcon icon={cat.icon} className="text-4xl text-brand-blue mb-4" />
                                <h3 className="text-xl font-bold mb-4">{cat.title}</h3>
                                <ul className="space-y-2 text-sm text-gray-600">
                                    {cat.items.map((item, j) => (
                                        <li key={j} className="flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-brand-purple" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* IIA India Authorization Section */}
                <div className="py-20 md:py-12 px-6 mx-4 md:mx-12 my-4 md:px-10">
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

                {/* Detailed Curriculum Section - Complete List */}
                <div className="py-12 px-4">
                    <div className="max-w-[1400px] mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">Complete <span className="text-brand-blue font-normal italic">Training Programs</span> Catalog</h2>
                        <p className="text-center text-gray-500 mb-8 max-w-2xl mx-auto">Explore our comprehensive suite of 30 specialized training modules designed for every stage of the audit professional's career journey.</p>

                        {/* Scrollable Table Container */}
                        <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-lg">
                            <div className="max-h-[600px] overflow-y-auto">
                                <table className="w-full min-w-[1200px] table-fixed">
                                    <thead className="bg-gradient-to-r from-brand-blue to-brand-purple text-white sticky top-0 z-10">
                                        <tr>
                                            <th className="px-4 py-4 font-bold text-sm w-12 text-center align-middle">#</th>
                                            <th className="px-4 py-4 font-bold text-sm w-72 text-left align-middle">Training Program</th>
                                            <th className="px-4 py-4 font-bold text-sm w-20 text-center align-middle">Duration</th>
                                            <th className="px-4 py-4 font-bold text-sm w-28 text-center align-middle">Level</th>
                                            <th className="px-4 py-4 font-bold text-sm w-40 text-center align-middle">Category</th>
                                            <th className="px-4 py-4 font-bold text-sm w-52 text-center align-middle">Prerequisites</th>
                                            <th className="px-4 py-4 font-bold text-sm w-36 text-center align-middle">Price Range</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white">
                                        {[
                                            { name: "Advanced Risk-Based Auditing", hrs: "16 Hrs", level: "Intermediate", category: "Risk Management", prereq: "Senior IA practitioners or managers", price: "$1349 - $1919" },
                                            { name: "Agile Auditing", hrs: "16 Hrs", level: "Intermediate", category: "Audit Methodology", prereq: "Basic internal audit process knowledge", price: "$1349 - $1869" },
                                            { name: "Assessing Ethics in Your Organization", hrs: "4 Hrs", level: "Basic", category: "Ethics", prereq: "None", price: "$369 - $489" },
                                            { name: "Developing a Risk & Control Matrix for Disruptive Technologies", hrs: "8 Hrs", level: "Intermediate", category: "IT Auditing", prereq: "2+ years internal audit experience", price: "$879 - $1099" },
                                            { name: "Auditing the Data Privacy Policy", hrs: "3 Hrs", level: "Intermediate", category: "IT Auditing", prereq: "Fundamentals of IT Auditing or equivalent", price: "$269 - $369" },
                                            { name: "Building a Sustainable Quality Programme", hrs: "16 Hrs", level: "Intermediate", category: "Quality Assurance", prereq: "3-5 years internal audit experience", price: "$1429 - $1919" },
                                            { name: "Communication Skills for Auditors: Interviewing & Negotiating", hrs: "16 Hrs", level: "Basic", category: "Soft Skills", prereq: "None", price: "$1349 - $1789" },
                                            { name: "Critical Thinking: A Vital Auditing Competency", hrs: "8 Hrs", level: "Basic", category: "Soft Skills", prereq: "None", price: "$879 - $1099" },
                                            { name: "Developing Audit Findings", hrs: "8 Hrs", level: "Basic", category: "Audit Methodology", prereq: "None", price: "$839 - $1099" },
                                            { name: "Essentials for AI Auditing", hrs: "8 Hrs", level: "Intermediate", category: "IT Auditing", prereq: "Experience in internal audit engagements", price: "$879 - $1099" },
                                            { name: "Enterprise Risk Management: Foundation for Decision Making", hrs: "16 Hrs", level: "Intermediate", category: "ERM", prereq: "3+ years IA experience, involved in ERM", price: "$1349 - $1789" },
                                            { name: "Ethically Mastering the Global Internal Audit Standards", hrs: "8 Hrs", level: "Intermediate", category: "Standards & Ethics", prereq: "Knowledge of 2017 IPPF conformance", price: "$579 - $1049" },
                                            { name: "Financial Auditing for Internal Auditors", hrs: "16 Hrs", level: "Basic", category: "Financial Auditing", prereq: "None", price: "$1429 - $1789" },
                                            { name: "Fraud Auditing", hrs: "8 Hrs", level: "Intermediate", category: "Fraud Auditing", prereq: "None", price: "$879 - $1099" },
                                            { name: "Fundamentals of Compliance Auditing", hrs: "16 Hrs", level: "Intermediate", category: "Compliance Auditing", prereq: "Tools for New Auditor or IA experience", price: "$1349 - $1789" },
                                            { name: "Fundamentals of Cyber Security Auditing", hrs: "16 Hrs", level: "Basic", category: "Cybersecurity", prereq: "Fundamentals of IT Auditing or equivalent", price: "$1429 - $1789" },
                                            { name: "Fundamentals of Internal Auditing", hrs: "4 Hrs", level: "Basic", category: "Audit", prereq: "None", price: "$369 - $489" },
                                            { name: "Fundamentals of IT Auditing", hrs: "16 Hrs", level: "Basic", category: "IT General Controls", prereq: "None", price: "$1359 - $1919" },
                                            { name: "Fundamentals of Risk-Based Auditing", hrs: "16 Hrs", level: "Basic", category: "ERM", prereq: "2 years internal audit experience", price: "$1429 - $1919" },
                                            { name: "High-Impact Audit Reporting", hrs: "8 Hrs", level: "Basic", category: "Audit Methodology", prereq: "Writing Audit Observations", price: "$839 - $1099" },
                                            { name: "Intermediate IT Auditing", hrs: "16 Hrs", level: "Intermediate", category: "IT Auditing", prereq: "None", price: "$1499 - $1979" },
                                            { name: "Leveraging Artificial Intelligence in Internal Audit", hrs: "8 Hrs", level: "Intermediate", category: "IT Auditing", prereq: "Experience in IA engagements", price: "$879 - $1099" },
                                            { name: "Navigating the Global Internal Audit Standards", hrs: "16 Hrs", level: "Basic", category: "Standards", prereq: "None", price: "$1429 - $1919" },
                                            { name: "Operational Auditing: Influencing Positive Change", hrs: "16 Hrs", level: "Intermediate", category: "Audit Methodology", prereq: "Tools for New Auditor or basic IA knowledge", price: "$1429 - $1919" },
                                            { name: "Performing an Effective Quality Assessment", hrs: "16 Hrs", level: "Intermediate", category: "Quality Assurance", prereq: "None", price: "$1669 - $2219" },
                                            { name: "Root Cause Analysis for Enhancing IA Effectiveness", hrs: "8 Hrs", level: "Intermediate", category: "Audit Methodology", prereq: "Critical Thinking course or equivalent", price: "$839 - $1099" },
                                            { name: "Tools for Audit Managers", hrs: "24 Hrs", level: "Expert", category: "Audit Plan", prereq: "Knowledge of and experience with auditing", price: "$1549 - $2169" },
                                            { name: "Tools for Lead Auditors", hrs: "24 Hrs", level: "Intermediate", category: "Audit Plan", prereq: "Knowledge of and experience with auditing", price: "$1629 - $2169" },
                                            { name: "Tools for New Auditors", hrs: "24 Hrs", level: "Basic", category: "Audit Plan", prereq: "None", price: "$1549 - $2169" },
                                            { name: "Third-Party Risk Management for Internal Auditors", hrs: "16 Hrs", level: "Intermediate", category: "Risk Management", prereq: "Foundational IA principles and practices", price: "$1429 - $1789" }
                                        ].map((row, i) => (
                                            <tr key={i} className="hover:bg-blue-50/50 transition-colors">
                                                <td className="px-4 py-3 text-gray-500 font-medium text-sm text-center align-middle">{i + 1}</td>
                                                <td className="px-4 py-3 text-gray-800 font-medium text-sm text-left align-middle">{row.name}</td>
                                                <td className="px-4 py-3 text-brand-blue font-semibold text-sm text-center align-middle">{row.hrs}</td>
                                                <td className="px-4 py-3 align-middle">
                                                    <div className={`w-full py-1.5 rounded-full text-xs font-semibold text-center ${row.level === 'Basic'
                                                        ? 'bg-green-100 text-green-800'
                                                        : row.level === 'Intermediate'
                                                            ? 'bg-blue-100 text-blue-800'
                                                            : 'bg-purple-100 text-purple-800'
                                                        }`}>
                                                        {row.level}
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3 text-gray-700 text-xs text-center align-middle">{row.category}</td>
                                                <td className="px-4 py-3 text-gray-600 text-xs italic text-center align-middle">{row.prereq}</td>
                                                <td className="px-4 py-3 text-brand-purple font-semibold text-xs text-center align-middle">{row.price}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Summary Stats */}
                        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                                <p className="text-2xl font-bold text-green-800">12</p>
                                <p className="text-sm text-green-600">Basic Level Programs</p>
                            </div>
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                                <p className="text-2xl font-bold text-blue-800">17</p>
                                <p className="text-sm text-blue-600">Intermediate Level Programs</p>
                            </div>
                            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center">
                                <p className="text-2xl font-bold text-purple-800">1</p>
                                <p className="text-sm text-purple-600">Advanced Level Programs</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA Section - Text Left, Button Right */}
                <div id="cta" className="max-w-6xl mx-auto py-8 md:py-16 px-4 mb-12">
                    <div className="bg-gradient-to-br from-brand-blue to-black rounded-[2rem] p-8 md:p-12 shadow-2xl relative overflow-hidden group">
                        {/* Decorative background element */}
                        <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -mr-24 -mt-24 blur-3xl group-hover:bg-white/10 transition-colors duration-500"></div>

                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                            <div className="text-left flex-1">
                                <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                                    <span className="text-orange-400">Empower</span> Your Team Today
                                </h2>
                                <p className="text-gray-300 max-w-xl">
                                    Transform your internal audit function with 30+ specialized training programs. Contact us to discuss your requirements and get a customized proposal.
                                </p>
                            </div>
                            <Link
                                to="/contact"
                                className="group flex-shrink-0 inline-flex items-center justify-center px-8 py-4 text-base md:text-lg font-bold text-white rounded-xl shadow-lg transition-all duration-300 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 hover:scale-105 hover:shadow-orange-500/20"
                            >
                                Request a Consultation
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default GtmTrainings;
