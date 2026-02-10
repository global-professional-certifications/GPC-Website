import aboutHero from "../../assets/about/about-hero.webp";
import ourMissionOne from "../../assets/about/our-mission-1.webp";
import ourMissionTwo from "../../assets/about/our-mission-2.webp";
import ourVision from "../../assets/about/our-vision.webp";
import { Link } from "react-router-dom";
import MetaTags from "../MetaTags";
import { Users, GraduationCap, BookCheck, Award, Target, ShieldCheck, Globe } from "lucide-react";
import MentorShowcase from "./MentorShowcase";
import { PiBrain } from "react-icons/pi";
import { SchemaMarkup, getBreadcrumbSchema, getAboutPageSchema, getPersonSchema } from "../Schema";

export default function AboutUs() {
    // About Page Schema
    const aboutPageSchema = getAboutPageSchema({
        name: "About Global Professional Certifications",
        description: "Learn how GPC empowers professionals with globally recognized CIA, CISA, CRMA, and IAP certifications and expert-driven learning.",
        url: "https://globalprofessionalcertifications.com/about"
    });

    // Breadcrumb Schema
    const breadcrumbSchema = getBreadcrumbSchema([
        { name: "Home", url: "https://globalprofessionalcertifications.com" },
        { name: "About Us", url: "https://globalprofessionalcertifications.com/about" }
    ]);

    // Mentor Person Schema
    const mentorSchema = getPersonSchema({
        name: "Arpit Garg",
        title: "Lead Instructor",
        description: "Founding Partner of RiskMan Consulting and certified CIA, CISA, CRMA, and IAP professional. Recognized as one of India's leading educators for internal audit certifications by IIA India.",
        image: "https://globalprofessionalcertifications.com/assets/arpit-garg-mentor.webp"
    });

    return (
        <div className="bg-gray-50">
            <SchemaMarkup schema={[aboutPageSchema, breadcrumbSchema, mentorSchema]} />
            <MetaTags
                title="About Global Professional Certifications"
                description="Learn how we empower professionals with globally recognized certifications and expert-driven learning."
                canonicalUrl="https://globalprofessionalcertifications.com/about"
            />

            {/* Hero Section - UNTOUCHED as requested */}
            <section className="bg-brand-blue pt-10 pb-16 sm:pt-12 sm:pb-20 lg:pt-16 lg:pb-24 relative md:min-h-[70vh] md:flex md:justify-center md:items-center">
                <div className="w-full max-w-[70rem] px-4 sm:px-6 lg:px-12 mx-auto">
                    <div className="w-full grid lg:grid-cols-2 grid-cols-1 gap-12 items-center">
                        <div className="w-full flex flex-col justify-start lg:items-start items-center gap-6">
                            <div className="w-full flex flex-col lg:items-start items-center gap-4">
                                <h1 className="text-3xl md:text-5xl font-bold leading-tight text-white">
                                    Elevate Your <span className="text-orange-400">Career</span>
                                </h1>
                                <h2 className="text-base sm:text-lg text-gray-200 max-w-lg leading-relaxed">
                                    At <span className='font-bold text-orange-400'>Global Professional Certifications</span> (GPC), we empower audit and risk professionals worldwide with industry-leading <span className='font-bold text-orange-400'>CIA, CISA, CRMA, and IAP</span> programs.
                                </h2>
                            </div>
                            <Link to="/contact">
                                <button className="inline-flex items-center justify-center px-8 py-3 text-lg font-semibold text-white rounded-lg shadow-lg transition-all duration-300 bg-orange-600 hover:bg-orange-700 hover:scale-105">
                                    Talk to Us
                                </button>
                            </Link>
                        </div>
                        <img
                            className="w-full max-w-[450px] mx-auto rounded-2xl object-cover shadow-xl"
                            src={aboutHero}
                            alt="Professional working"
                        />
                    </div>
                </div>
            </section>

            {/* Our Mission Section - Sober & Elegant */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-6xl mx-auto px-6 lg:px-12">

                    {/* Standardized Heading - NO ANIMATION */}

                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-6">
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-blue/5 rounded-full text-brand-blue font-bold text-xs tracking-wider uppercase">
                                <Target size={14} />
                                <span>Our Mission</span>
                            </div>
                            <h2 className="text-2xl md:text-4xl font-bold mb-4">
                                Bridging ambition with <span className="font-normal italic text-brand-blue">achievement.</span>
                            </h2>
                            <p className="text-gray-600 text-xs md:text-base lg:text-base font-poppins leading-relaxed">
                                We transform learners into leaders through rigorous, globally recognized certifications. We specialize in CIA, CRMA, IAP, and CISA programs, regarded as the gold standard in risk assurance.
                            </p>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-6 bg-gray-300 rounded-2xl border border-gray-100">
                                    <div className="w-10 h-10 bg-brand-blue/10 text-brand-blue rounded-lg flex items-center justify-center mb-4">
                                        <Award size={20} />
                                    </div>
                                    <h4 className="text-3xl font-black text-brand-dark">250+</h4>
                                    <p className="text-gray-500 font-bold text-[10px] uppercase tracking-wider">Certified CIA's</p>
                                </div>
                                <div className="p-6 bg-gray-300 rounded-2xl border border-gray-100">
                                    <div className="w-10 h-10 bg-brand-purple/10 text-brand-purple rounded-lg flex items-center justify-center mb-4">
                                        <GraduationCap size={20} />
                                    </div>
                                    <h4 className="text-3xl font-black text-brand-dark">1500+</h4>
                                    <p className="text-gray-500 font-bold text-[10px] uppercase tracking-wider">Global Alumni</p>
                                </div>
                                <div className="p-6 bg-gray-300 rounded-2xl border border-gray-100">
                                    <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center mb-4">
                                        <BookCheck size={20} />
                                    </div>
                                    <h4 className="text-3xl font-black text-brand-dark">5+</h4>
                                    <p className="text-gray-500 font-bold text-[10px] uppercase tracking-wider">Years of Teaching Experience</p>
                                </div>
                                <div className="p-6 bg-gray-300 rounded-2xl border border-gray-100">
                                    <div className="w-10 h-10 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mb-4">
                                        <Users size={20} />
                                    </div>
                                    <h4 className="text-3xl font-black text-brand-dark">25+</h4>
                                    <p className="text-gray-500 font-bold text-[10px] uppercase tracking-wider">Batches Completed</p>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <img src={ourMissionTwo} alt="Mission" className="w-full h-64 md:h-80 object-cover rounded-2xl shadow-lg mt-8" />
                            <img src={ourMissionOne} alt="Mission" className="w-full h-64 md:h-80 object-cover rounded-2xl shadow-lg" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Vision Section - Sober & Elegant */}
            <section className="py-16 bg-brand-blue">
                <div className="max-w-6xl mx-auto px-6 lg:px-12">

                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="order-2 lg:order-1">
                            <img src={ourVision} alt="Vision" className="w-full h-80 md:h-[450px] object-cover rounded-2xl shadow-2xl" />
                        </div>

                        <div className="order-1 lg:order-2 space-y-6">
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-white font-bold text-xs tracking-wider uppercase border border-white/20">
                                <Globe size={14} />
                                <span>Our Vision</span>
                            </div>
                            <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
                                Empowering experts on a <span className="font-normal italic text-orange-300">global scale.</span>
                            </h2>
                            <p className="text-gray-300 text-xs md:text-base lg:text-base font-poppins leading-relaxed">
                                A world where professionals are equipped with the knowledge and confidence to excel. We foster a community of highly skilled auditors driving organizational success worldwide.
                            </p>
                            <div className="p-6 bg-white/5 rounded-2xl border border-white/10 flex items-center gap-4">
                                <div className="w-12 h-12 bg-orange-400 text-brand-dark rounded-xl flex items-center justify-center">
                                    <ShieldCheck size={24} />
                                </div>
                                <div>
                                    <p className="text-white font-bold text-xl">Unmatched Support</p>
                                    <p className="text-blue-100/70 text-sm">Personalized guidance at every step of your journey.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* What Sets Us Apart - Compact Bento Grid */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-6xl mx-auto px-6 lg:px-12">

                    {/* Bento Heading */}
                    <div className="text-center mb-16 px-4">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            What Sets <span className="text-brand-blue font-normal italic">Us Apart</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center lg:text-left">
                        {/* Summary Card */}
                        <div className="md:col-span-2 bg-white p-8 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-center gap-4">
                            <div className="w-12 h-12 bg-brand-blue/10 text-brand-blue rounded-xl flex items-center justify-center mx-auto lg:mx-0">
                                <PiBrain size={28} />
                            </div>
                            <h4 className="text-2xl font-black text-brand-dark">The GPC Edge</h4>
                            <p className="text-gray-600 font-medium leading-relaxed">
                                We lead in professional development through unique value propositions and industry-leading frameworks.
                            </p>
                        </div>

                        {/* Metric Cards */}
                        <div className="bg-brand-blue p-8 rounded-2xl text-white flex flex-col gap-4">
                            <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center mx-auto lg:mx-0">
                                <Globe size={20} />
                            </div>
                            <h5 className="text-xl font-bold">Global Reach</h5>
                            <p className="text-blue-100 text-sm">Accredited programs opening doors worldwide.</p>
                        </div>

                        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-4">
                            <div className="w-10 h-10 bg-brand-purple/10 text-brand-purple rounded-lg flex items-center justify-center mx-auto lg:mx-0">
                                <Award size={20} />
                            </div>
                            <h5 className="text-xl font-bold text-brand-dark">Expert Training</h5>
                            <p className="text-gray-500 text-sm">Led by industry veterans with years of experience.</p>
                        </div>

                        <div className="md:col-span-2 bg-white p-8 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-6 text-left">
                            <div className="w-14 h-14 bg-brand-contrast/10 text-brand-dark rounded-xl flex items-center justify-center shrink-0">
                                <BookCheck size={28} />
                            </div>
                            <div>
                                <h5 className="text-xl font-bold text-brand-dark mb-1">Career Support</h5>
                                <p className="text-gray-500 text-sm">Personalized guidance from enrollment to certfication.</p>
                            </div>
                        </div>

                        <div className="md:col-span-2 bg-brand-dark p-8 rounded-2xl text-white flex items-center gap-6 text-left">
                            <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                                <Users size={28} />
                            </div>
                            <div>
                                <h5 className="text-xl font-bold text-white mb-1">Live Weekends</h5>
                                <p className="text-gray-400 text-sm">Interactive online sessions designed for working professionals.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <MentorShowcase />
        </div>
    )
}
