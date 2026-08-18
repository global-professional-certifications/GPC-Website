import React from "react";
import MetaTags from "../MetaTags";
import { GrLocation } from "react-icons/gr";
import { FiPhoneCall, FiArrowUpRight } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";
import { Link } from "react-router-dom";
import { FaLinkedin, FaInstagram, FaYoutube } from "react-icons/fa";
import { SchemaMarkup, getContactPageSchema, getLocalBusinessSchema, generateBreadcrumbSchema } from "../Schema";

export default function ContactUs() {
    // Contact Page Schema
    const contactPageSchema = getContactPageSchema({
        name: "Contact Global Professional Certifications",
        description: "Reach out to our team for queries, support, or course guidance. We are here to help you achieve your certification goals.",
        url: "https://globalprofessionalcertifications.com/contact"
    });

    // Local Business Schema
    const localBusinessSchema = getLocalBusinessSchema({
        name: "Global Professional Certifications",
        description: "Leading institute for CIA, CISA, CRMA, and IAP certification training. Expert-led programs for audit and risk professionals.",
        address: "5th Floor, Unit 502, Tower B, Capital Business Park, Sohna Rd, Sector 48, Gurugram, Haryana, India - 122018",
        phone: "+91 87360 83099",
        email: "cia@globalprofessionalcertifications.com"
    });

    // Breadcrumb Schema
    const breadcrumbSchema = generateBreadcrumbSchema("/contact");

    // ContactPoint Schema
    const contactPointSchema = {
        "@context": "https://schema.org",
        "@type": "ContactPoint",
        "telephone": "+91-87360-83099",
        "contactType": "customer service",
        "email": "cia@globalprofessionalcertifications.com",
        "availableLanguage": ["English", "Hindi"]
    };

    // PostalAddress Schema
    const postalAddressSchema = {
        "@context": "https://schema.org",
        "@type": "PostalAddress",
        "streetAddress": "5th Floor, Unit 502, Tower B, Capital Business Park, Sohna Rd, Sector 48",
        "addressLocality": "Gurugram",
        "addressRegion": "Haryana",
        "postalCode": "122018",
        "addressCountry": "IN"
    };

    return (
        <>
            <SchemaMarkup schema={[contactPageSchema, localBusinessSchema, contactPointSchema, postalAddressSchema, breadcrumbSchema]} />
            <MetaTags
                title="Contact Us - Global Professional Certifications"
                description="Reach out to our team for queries, support, or course guidance. We are here to help you achieve your certification goals."
                canonicalUrl="https://globalprofessionalcertifications.com/contact"
            />

            {/* ───── SECTION 1: Hero ───── */}
            <section className="bg-brand-blue pt-12 pb-16 lg:pt-16 lg:pb-20 relative overflow-hidden">
                {/* Decorative blurs */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-white/10">
                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                        <span className="text-sm text-white/90 font-medium">We typically respond within 24 hours</span>
                    </div>
                    <h1 className="text-3xl md:text-6xl font-bold leading-tight text-white mb-5">
                        We'd Love to <span className="text-orange-400">Hear From You</span>
                    </h1>
                    <p className="text-base sm:text-lg text-gray-200 leading-relaxed font-poppins max-w-2xl mx-auto mb-8">
                        Questions about CIA, CISA, CRMA, or any of our programs? Our advisors are ready to guide you toward the right certification path.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a
                            href="mailto:cia@globalprofessionalcertifications.com?subject=Inquiry&body=Hi there, I would like to know more about..."
                            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-full px-6 py-3 transition-colors duration-300 w-full sm:w-auto justify-center"
                        >
                            <MdOutlineEmail size={18} />
                            Email Us
                        </a>
                        <a
                            href="tel:+918736083099"
                            className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-full px-6 py-3 border border-white/20 transition-colors duration-300 w-full sm:w-auto justify-center"
                        >
                            <FiPhoneCall size={16} />
                            Call an Advisor
                        </a>
                    </div>
                </div>
            </section>

            {/* ───── SECTION 2: Contact Info Strip ───── */}
            <section className="bg-gray-50 py-12 lg:py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">

                        {/* Email Us */}
                        <a
                            href="mailto:cia@globalprofessionalcertifications.com?subject=Inquiry&body=Hi there, I would like to know more about..."
                            className="group relative bg-white rounded-2xl p-6 md:p-7 shadow-md hover:shadow-xl border border-gray-100 hover:border-purple-200 transition-all duration-300 flex flex-col justify-between"
                        >
                            <div>
                                <div className="flex items-center justify-between mb-5">
                                    <div className="w-12 h-12 rounded-xl bg-purple-50 text-brand-purple group-hover:bg-brand-purple group-hover:text-white flex items-center justify-center transition-all duration-300 shadow-sm">
                                        <MdOutlineEmail size={22} />
                                    </div>
                                    <FiArrowUpRight size={20} className="text-gray-300 group-hover:text-brand-purple group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                                </div>
                                <p className="text-xs uppercase font-bold tracking-wider text-gray-400 mb-1.5 group-hover:text-brand-purple transition-colors duration-300">
                                    Email Us
                                </p>
                                <p className="text-base font-semibold text-gray-900 break-words group-hover:text-brand-blue transition-colors duration-300">
                                    cia@globalprofessionalcertifications.com
                                </p>
                                <p className="text-xs text-gray-500 font-poppins mt-2.5 leading-relaxed">
                                    Reach out to our team for course details, guidance, or support.
                                </p>
                            </div>
                        </a>

                        {/* Call Us */}
                        <a
                            href="tel:+918736083099"
                            className="group relative bg-white rounded-2xl p-6 md:p-7 shadow-md hover:shadow-xl border border-gray-100 hover:border-blue-200 transition-all duration-300 flex flex-col justify-between"
                        >
                            <div>
                                <div className="flex items-center justify-between mb-5">
                                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-brand-blue group-hover:bg-brand-blue group-hover:text-white flex items-center justify-center transition-all duration-300 shadow-sm">
                                        <FiPhoneCall size={20} />
                                    </div>
                                    <FiArrowUpRight size={20} className="text-gray-300 group-hover:text-brand-blue group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                                </div>
                                <p className="text-xs uppercase font-bold tracking-wider text-gray-400 mb-1.5 group-hover:text-brand-blue transition-colors duration-300">
                                    Call Us
                                </p>
                                <p className="text-base font-semibold text-gray-900 group-hover:text-brand-blue transition-colors duration-300">
                                    (+91) 87360 83099
                                </p>
                                <p className="text-xs text-gray-500 font-poppins mt-2.5 leading-relaxed">
                                    Speak directly with a certification advisor regarding your goals.
                                </p>
                            </div>
                        </a>

                        {/* Visit Us */}
                        <a
                            href="#office-location"
                            className="group relative bg-white rounded-2xl p-6 md:p-7 shadow-md hover:shadow-xl border border-gray-100 hover:border-orange-200 transition-all duration-300 flex flex-col justify-between"
                        >
                            <div>
                                <div className="flex items-center justify-between mb-5">
                                    <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-500 group-hover:bg-orange-500 group-hover:text-white flex items-center justify-center transition-all duration-300 shadow-sm">
                                        <GrLocation size={22} />
                                    </div>
                                    <FiArrowUpRight size={20} className="text-gray-300 group-hover:text-orange-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                                </div>
                                <p className="text-xs uppercase font-bold tracking-wider text-gray-400 mb-1.5 group-hover:text-orange-500 transition-colors duration-300">
                                    Visit Us
                                </p>
                                <p className="text-sm md:text-base font-semibold text-gray-900 group-hover:text-brand-blue transition-colors duration-300 leading-relaxed">
                                    5th Floor, Unit 502, Tower B,<br />
                                    <span className="font-normal">Capital Business Park, Sohna Rd,<br />
                                    Sector 48, Gurugram, Haryana 122018, India</span>
                                </p>
                            </div>
                        </a>

                    </div>
                </div>
            </section>

            {/* ───── SECTION 3: Enquiry Form ───── */}
            <section className="py-16 lg:py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Heading */}
                    <div className="text-center max-w-3xl mx-auto mb-14">
                        <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
                            Send Us a <span className="text-brand-blue font-normal italic">Message</span>
                        </h2>
                        <p className="text-gray-600 text-sm md:text-base font-poppins leading-relaxed">
                            Tell us which certification you're aiming for and we'll come back with everything you need to begin.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start">

                        {/* Left: Quick Info Cards + Follow Us */}
                        <div className="lg:col-span-2 lg:sticky lg:top-32 space-y-4">
                            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center gap-3">
                                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-gray-900">Free consultation</p>
                                    <p className="text-xs text-gray-500 font-poppins">Talk through your eligibility and study plan at no cost.</p>
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center gap-3">
                                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-gray-900">No spam, ever</p>
                                    <p className="text-xs text-gray-500 font-poppins">Only the information you asked for, nothing else.</p>
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center gap-3">
                                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-gray-900">Response within 24 hours</p>
                                    <p className="text-xs text-gray-500 font-poppins">A real advisor replies on every working day.</p>
                                </div>
                            </div>

                            {/* Social Links */}
                            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                                <p className="text-sm font-bold text-brand-dark mb-4">Follow Us</p>
                                <div className="flex items-center gap-3">
                                    <Link
                                        to="https://www.linkedin.com/company/global-professional-certifications/"
                                        target="_blank"
                                        className="w-10 h-10 bg-gray-100 text-gray-500 rounded-xl flex items-center justify-center hover:bg-brand-blue hover:text-white transition-all duration-300"
                                    >
                                        <FaLinkedin size={18} />
                                    </Link>
                                    <Link
                                        to="https://www.instagram.com/global__professionals"
                                        target="_blank"
                                        className="w-10 h-10 bg-gray-100 text-gray-500 rounded-xl flex items-center justify-center hover:bg-brand-purple hover:text-white transition-all duration-300"
                                    >
                                        <FaInstagram size={18} />
                                    </Link>
                                    <Link
                                        to="https://www.youtube.com/@global-professional-cert"
                                        target="_blank"
                                        className="w-10 h-10 bg-gray-100 text-gray-500 rounded-xl flex items-center justify-center hover:bg-red-600 hover:text-white transition-all duration-300"
                                    >
                                        <FaYoutube size={18} />
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Right: Zoho Form */}
                        <div className="lg:col-span-3">
                            <div className="bg-brand-dark rounded-2xl shadow-lg p-3 sm:p-4">
                                <div className="bg-white rounded-xl overflow-hidden">
                                    <iframe
                                        aria-label="GPC Website Contact Us"
                                        style={{
                                            height: '600px',
                                            width: '100%',
                                            border: 'none',
                                        }}
                                        src="https://forms.zohopublic.in/globalprofessionalcertificat1/form/test/formperma/zOWVICVVpCKVK7R_erMCeQrDKHeTI3UTOYkhLCXa7PA"
                                        title="GPC Contact Us Form"
                                    ></iframe>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ───── SECTION 4: Find Us ───── */}
            <section id="office-location" className="py-16 lg:py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-10">
                        <p className="text-xs font-bold uppercase tracking-widest text-brand-purple mb-3">Find Us</p>
                        <h2 className="text-2xl md:text-4xl font-bold text-gray-900">
                            Our <span className="text-brand-blue font-normal italic">Gurugram</span> Office
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">

                        {/* Left: Address Card */}
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sm:p-8">
                            <div className="flex items-start gap-4 mb-6">
                                <div className="w-11 h-11 rounded-2xl bg-brand-purple/10 text-brand-purple flex items-center justify-center flex-shrink-0">
                                    <GrLocation size={20} />
                                </div>
                                <div>
                                    <p className="text-xs uppercase font-bold tracking-wider text-gray-400 mb-1">Registered Address</p>
                                    <p className="text-sm font-bold text-gray-900 mb-1">Global Professional Certifications</p>
                                    <p className="text-sm text-gray-600 font-poppins leading-relaxed">
                                        5th Floor, Unit 502, Tower B<br />
                                        Capital Business Park, Sohna Rd<br />
                                        Sector 48, Gurugram<br />
                                        Haryana 122018, India
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-col gap-3 pt-6 mt-6 border-t border-gray-100">
                                <a
                                    href="mailto:cia@globalprofessionalcertifications.com?subject=Inquiry&body=Hi there, I would like to know more about..."
                                    className="flex items-center gap-3 text-sm text-gray-600 hover:text-brand-purple font-poppins transition-colors"
                                >
                                    <MdOutlineEmail size={16} />
                                    cia@globalprofessionalcertifications.com
                                </a>
                                <a
                                    href="tel:+918736083099"
                                    className="flex items-center gap-3 text-sm text-gray-600 hover:text-brand-blue font-poppins transition-colors"
                                >
                                    <FiPhoneCall size={16} />
                                    (+91) 87360 83099
                                </a>
                            </div>
                        </div>

                        {/* Right: Google Map */}
                        <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-200 min-h-[320px]">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3508.107943505472!2d77.09730627488064!3d28.44616227576705!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d19b4d61ec377%3A0xc27972389edd6342!2sGlobal%20Professional%20Certifications!5e0!3m2!1sen!2sin!4v1777889501154!5m2!1sen!2sin"
                                width="100%"
                                height="100%"
                                style={{ border: 0, minHeight: '320px' }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Global Professional Certifications on Google Maps"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
