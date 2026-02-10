import React from 'react';
import MetaTags from '../MetaTags';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShieldHalved, faMagnifyingGlassChart, faCheckDouble, faUserTie, faHandshake, faAward, faStar, faChartLine } from "@fortawesome/free-solid-svg-icons";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from 'react-router-dom';


import DescriptiveFlowchart from '../DescriptiveSection/DescriptiveFlowchart';
import DescriptiveLeft from '../DescriptiveSection/DescriptiveLeft';

// Assets
import qaip from "../../assets/corporate/qaip.webp";
import learningPartner from "../../assets/Learning_partner.jpg";
import qaipHero from "../../assets/corporate/qaip-hero.webp";
import brochure from "../../assets/corporate/qaip-brochure.pdf";




const Qaip = () => {
    return (
        <>
            <MetaTags
                title="Quality Assessment Improvement Program (QAIP) | GPC in Partnership with IIA India"
                description="Elevate Internal Audit Excellence with IIA Quality Assessments. Ensure conformance with Global Internal Audit Standards. GPC in partnership with IIA India."
                canonicalUrl="https://globalprofessionalcertifications.com/corporate/qaip"
            />

            {/* Hero Section */}
            <div
                className="flex justify-center items-center bg-brand-blue py-24"
            >
                <div className="md:max-w-8xl flex flex-col lg:flex-row justify-center items-center gap-12 px-8 md:px-24">
                    {/* Left Content */}
                    <div className="max-w-sm md:max-w-2xl mx-auto">
                        <div className="relative w-md md:max-w-xl">
                            <h1 className="text-2xl md:text-4xl font-bold leading-tight text-white">
                                Elevate Internal Audit Excellence with{" "}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
                                    IIA Quality Assessments
                                </span>
                            </h1>

                            <p className="mt-4 text-base sm:text-lg md:text-lg text-gray-200 max-w-2xl leading-relaxed">
                                An External Quality Assessment (EQA) delivers an in-depth evaluation of
                                your internal audit function—covering methodology, effectiveness, and
                                alignment with IIA Standards and global best practices.
                            </p>
                        </div>

                        <div className="mt-6 flex flex-wrap gap-4">
                            <Link
                                to="/contact"
                                className="inline-flex items-center justify-center px-8 py-3 text-lg font-semibold text-white rounded-lg shadow-lg transition-all duration-300 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 hover:scale-105 hover:shadow-xl"
                            >
                                Check Your Compliance
                            </Link>

                            <a
                                href="https://iiaindia.co/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center px-8 py-3 text-lg font-semibold text-white rounded-lg border-2 border-white/30 hover:bg-white/10 transition-all duration-300"
                            >
                                Visit IIA India
                            </a>
                        </div>
                    </div>

                    {/* Right Visual */}
                    <div className="relative mx-auto lg:max-w-6xl">
                        <img
                            className="w-[550px] h-auto rounded-xl shadow-2xl hidden md:block"
                            src={qaipHero}
                            alt="IIA Quality Assessment"
                            loading="lazy"
                        />
                    </div>
                </div>
            </div>


            {/* Content Section */}
            <div className="bg-gray-50 pb-16">

                {/* Introduction */}
                <DescriptiveLeft
                    titleStart="What is "
                    highlight="QAIP?"
                    description="The Quality Assurance and Improvement Program (QAIP) is an in-depth evaluation of an internal audit function's methodologies, effectiveness, and alignment with mandatory guidance and leading practices. Based on IIA Quality Services' progressive knowledge of IIA methodology — the Quality Assessment Manual — our external quality assessment evaluates levels of conformance to the Standards and goes beyond to provide for continuous improvement of your internal audit activity to the level of strategic business partner and valued contributor."
                    image={qaip}
                />

                {/* Why Quality Assessments - Key Benefits */}
                <div className="py-12 px-4">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
                            Why <span className="text-brand-blue font-normal italic">Quality Assessments?</span>
                        </h2>
                        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
                            With quality at the core of everything we do, our mission is to elevate professionalism within internal auditing.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                                {
                                    icon: faCheckDouble,
                                    title: "Standards Alignment",
                                    desc: "Proper elevation begins and ends with alignment of The IIA's International Standards, Core Principles, and Code of Ethics."
                                },
                                {
                                    icon: faChartLine,
                                    title: "Improvement Opportunities",
                                    desc: "Our assessment process identifies improvement opportunities and offers counsel to the CAE for successful practice implementation."
                                },
                                {
                                    icon: faAward,
                                    title: "Stakeholder Credibility",
                                    desc: "Promotes the credibility of the internal audit activity with your stakeholders including the Board and Audit Committee."
                                },
                                {
                                    icon: faHandshake,
                                    title: "Consultative Approach",
                                    desc: "Our trusted experts use a consultative approach and share their extensive knowledge regarding effective practices."
                                }
                            ].map((item, i) => (
                                <div key={i} className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100">
                                    <div className="w-12 h-12 bg-brand-blue/10 rounded-xl flex items-center justify-center mb-4">
                                        <FontAwesomeIcon icon={item.icon} className="text-brand-blue text-xl" />
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* IIA India Authorization Section */}
                <div className="py-16 md:py-12 px-6 mx-4 md:mx-12 my-4 md:px-16">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-12 md:gap-20">
                        {/* Left Content */}
                        <div className="flex flex-col gap-6 lg:w-1/2 text-center md:text-left">
                            <h2 className="text-2xl md:text-4xl font-bold leading-snug">
                                Check the{" "}
                                <span className="text-brand-blue font-normal italic">
                                    IIA India's
                                </span>{" "}
                                Brochure for{" "}
                                <span className="text-brand-blue font-normal italic">
                                    EQA
                                </span>
                            </h2>
                            <p className="text-gray-600 text-xs md:text-base lg:text-base font-poppins leading-relaxed">
                                <span className='text-black font-semibold'>Mr. Mukundan K.V, CEO of IIA India,</span> presents the official
                                accreditation certificate to Arpit Garg, GPC mentor marking
                                Global Professional Certifications as an
                                <span className="font-semibold">
                                    {" "}
                                    IIA India Authorized Learning Partner
                                </span>
                            </p>
                            <div className="flex justify-center md:justify-start items-center gap-6 mt-2">
                                <a
                                    href={brochure}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-brand-blue text-white text-sm md:text-base py-2 px-4 md:px-6 rounded-full hover:bg-brand-purple hover:scale-105 transition-all duration-300"
                                >
                                    Get Brochure
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

                {/* Three Assessment Services */}
                <div className="py-12 px-4">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
                            IIA Quality Assessment <span className="text-brand-blue font-normal italic">Services</span>
                        </h2>
                        <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
                            The IIA offers the following quality assessment options to help you navigate conformance with Global Internal Audit Standards:
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                {
                                    number: "1",
                                    title: "Readiness Assessment",
                                    icon: faMagnifyingGlassChart,
                                    desc: "Identifies risks to conformance with Standards, provides a baseline for new CAEs, and supports the creation of a successful QAIP.",
                                    features: ["Gap Analysis", "Baseline Assessment", "QAIP Foundation"],
                                    color: "from-blue-500 to-blue-600",
                                    bgColor: "bg-blue-50",
                                    borderColor: "border-blue-200"
                                },
                                {
                                    number: "2",
                                    title: "SAIV",
                                    subtitle: "Self-assessment with Independent Validation",
                                    icon: faCheckDouble,
                                    desc: "The approach meets the requirements of the Standards for an external assessment once every five years.",
                                    features: ["Self-Assessment", "Independent Validation", "5-Year Compliance"],
                                    color: "from-purple-500 to-purple-600",
                                    bgColor: "bg-purple-50",
                                    borderColor: "border-purple-200"
                                },
                                {
                                    number: "3",
                                    title: "Quality Assessment (QA)",
                                    icon: faShieldHalved,
                                    desc: "The most comprehensive approach not only supports conformance but also provides an objective assessment of your internal audit activity's effectiveness.",
                                    features: ["Full Conformance", "Effectiveness Review", "Strategic Insights"],
                                    color: "from-orange-500 to-orange-600",
                                    bgColor: "bg-orange-50",
                                    borderColor: "border-orange-200",
                                    recommended: true
                                }
                            ].map((service, i) => (
                                <div key={i} className={`relative p-8 rounded-3xl border-2 ${service.borderColor} ${service.bgColor} hover:shadow-2xl transition-all duration-300 group`}>
                                    {service.recommended && (
                                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs font-bold px-4 py-1 rounded-full">
                                            Most Comprehensive
                                        </div>
                                    )}

                                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                                        <FontAwesomeIcon icon={service.icon} className="text-2xl text-white" />
                                    </div>

                                    <div className="flex items-center gap-3 mb-2">
                                        <span className={`w-8 h-8 rounded-full bg-gradient-to-r ${service.color} text-white text-sm font-bold flex items-center justify-center`}>
                                            {service.number}
                                        </span>
                                        <h3 className="text-xl font-bold text-gray-900">{service.title}</h3>
                                    </div>

                                    {service.subtitle && (
                                        <p className="text-sm text-gray-500 mb-4 italic">{service.subtitle}</p>
                                    )}

                                    <p className="text-gray-600 leading-relaxed mb-6">{service.desc}</p>

                                    <div className="space-y-2">
                                        {service.features.map((feature, j) => (
                                            <div key={j} className="flex items-center gap-2 text-sm">
                                                <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${service.color}`}></div>
                                                <span className="text-gray-700">{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>



                {/* Expert Team Section */}
                <div className="bg-brand-blue py-12 px-4 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>

                    <div className="max-w-6xl mx-auto relative z-10">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                                    Qualified, Trusted & <span className="text-orange-400">Independent</span>
                                </h2>
                                <p className="text-gray-300 leading-relaxed mb-6">
                                    We maintain an expert team of quality assessors who have excellent credentials and many years of combined experience performing external quality assessments (EQA) to implement our process.
                                </p>
                                <p className="text-gray-300 leading-relaxed mb-8">
                                    These audit professionals are recognized quality assessment leaders. They guide internal audit practitioners in collaboration with The IIA's methodology to perform our assessments. Our trusted experts use a consultative approach and share their extensive knowledge and insight regarding effective practices for internal audit activities.
                                </p>

                                <div className="grid grid-cols-2 gap-4">
                                    {[
                                        { icon: faStar, text: "Expert Credentials" },
                                        { icon: faUserTie, text: "Assessment Leaders" },
                                        { icon: faHandshake, text: "Consultative Approach" },
                                        { icon: faAward, text: "IIA Methodology" }
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-4">
                                            <FontAwesomeIcon icon={item.icon} className="text-orange-400" />
                                            <span className="text-white text-sm font-medium">{item.text}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                                <h3 className="text-2xl font-bold text-white mb-4">Quality Expertise & Exceptional Value</h3>
                                <div className="space-y-4">
                                    <div className="flex items-start gap-4">
                                        <div className="w-8 h-8 bg-orange-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                            <span className="text-orange-400 font-bold text-sm">1</span>
                                        </div>
                                        <p className="text-gray-300">
                                            Progressive knowledge of IIA methodology — the Quality Assessment Manual
                                        </p>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="w-8 h-8 bg-orange-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                            <span className="text-orange-400 font-bold text-sm">2</span>
                                        </div>
                                        <p className="text-gray-300">
                                            Evaluates levels of conformance and goes beyond for continuous improvement
                                        </p>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="w-8 h-8 bg-orange-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                            <span className="text-orange-400 font-bold text-sm">3</span>
                                        </div>
                                        <p className="text-gray-300">
                                            Transforms IA activity to strategic business partner and valued contributor
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Process Flowchart */}
                <div className="py-12">
                    <DescriptiveFlowchart
                        titleStart="The QAIP "
                        highlight="Journey"
                        description="GPC helps you navigate this process, assess maturity levels, and drive continuous improvement—because excellence is a journey, not a destination!"
                        steps={[
                            { title: "Readiness", desc: "Gap analysis & baselining" },
                            { title: "Preparation", desc: "Internal self-evaluation" },
                            { title: "Assessment", desc: "Independent external review" },
                            { title: "Excellence", desc: "Continuous improvement" }
                        ]}
                    />
                </div>

                {/* Partnership CTA - Text Left, Button Right */}
                <div className="max-w-6xl mx-auto py-8 md:py-16 px-4">
                    <div className="bg-gradient-to-br from-brand-blue to-black rounded-[2rem] p-8 md:p-12 shadow-2xl relative overflow-hidden group">
                        {/* Decorative background element */}
                        <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -mr-24 -mt-24 blur-3xl group-hover:bg-white/10 transition-colors duration-500"></div>

                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                            <div className="text-left flex-1">
                                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-4">
                                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                                    <span className="text-sm text-white/90">GPC × IIA India Partnership</span>
                                </div>
                                <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                                    Are You <span className="text-orange-400">in Compliance</span>?
                                </h2>
                                <p className="text-gray-300 max-w-xl">
                                    External Quality Assessments are mandated every 5 years. GPC, in partnership with IIA India, can help you navigate this process and drive continuous improvement.
                                </p>
                            </div>
                            <Link
                                to="https://forms.zohopublic.in/globalprofessionalcertificat1/form/SimpleContactUs/formperma/UZgkfg0mt8KJh2ccgdqvzWV8DwJUTKuKwSXWALn-nyU"
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

export default Qaip;
