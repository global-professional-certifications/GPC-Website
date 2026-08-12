import React from "react";
import MetaTags from "../MetaTags";
import { GrLocation } from "react-icons/gr";
import { FiPhoneCall } from "react-icons/fi";
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

                <div className="w-full max-w-6xl px-6 lg:px-12 mx-auto relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

                        {/* Left Side: Texts */}
                        <div className="lg:col-span-7 text-left">
                            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-white/10">
                                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                                <span className="text-sm text-white/90 font-medium">We typically respond within 24 hours</span>
                            </div>
                            <h1 className="text-3xl md:text-6xl font-bold leading-tight text-white mb-5">
                                We'd Love to <br />
                                <span className="text-orange-400">Hear From You</span>
                            </h1>
                            <p className="text-base sm:text-lg text-gray-200 leading-relaxed font-poppins max-w-md">
                                You have a question about our programs? Our team is ready to answer all your queries and guide you toward your certification goals.
                            </p>
                        </div>

                        {/* Right Side: White Card with Contact Info */}
                        <div className="lg:col-span-5">
                            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/20 text-gray-900 relative">
                                <h3 className="text-lg font-bold text-gray-900 mb-6 pb-3 border-b border-gray-100 flex items-center justify-between">
                                    <span>Contact Information</span>
                                    <span className="w-2 h-2 rounded-full bg-brand-blue"></span>
                                </h3>

                                <div className="space-y-6">
                                    {/* Location / Address */}
                                    <div className="flex items-start gap-4">
                                        <div className="w-11 h-11 rounded-2xl bg-orange-500/10 text-orange-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <GrLocation size={20} />
                                        </div>
                                        <div>
                                            <p className="text-xs uppercase font-bold tracking-wider text-gray-400 mb-1">Our Office</p>
                                            <p className="text-sm text-gray-800 font-normal font-poppins leading-snug">
                                                5th Floor, Unit 502, Tower B, Capital Business Park, Sohna Rd, Sector 48, Gurugram, Haryana 122018
                                            </p>
                                        </div>
                                    </div>

                                    {/* Phone */}
                                    <a
                                        href="tel:+918736083099"
                                        className="flex items-start gap-4 group/item transition-colors"
                                    >
                                        <div className="w-11 h-11 rounded-2xl bg-brand-blue/10 text-brand-blue flex items-center justify-center flex-shrink-0 mt-0.5 group-hover/item:bg-brand-blue group-hover/item:text-white transition-colors duration-300">
                                            <FiPhoneCall size={18} />
                                        </div>
                                        <div>
                                            <p className="text-xs uppercase font-bold tracking-wider text-gray-400 mb-1">Phone Number</p>
                                            <p className="text-sm text-gray-800 font-normal font-poppins group-hover/item:text-brand-blue transition-colors">
                                                (+91) 87360 83099
                                            </p>
                                        </div>
                                    </a>

                                    {/* Email */}
                                    <a
                                        href="mailto:cia@globalprofessionalcertifications.com?subject=Inquiry&body=Hi there, I would like to know more about..."
                                        className="flex items-start gap-4 group/item transition-colors"
                                    >
                                        <div className="w-11 h-11 rounded-2xl bg-purple-500/10 text-brand-purple flex items-center justify-center flex-shrink-0 mt-0.5 group-hover/item:bg-brand-purple group-hover/item:text-white transition-colors duration-300">
                                            <MdOutlineEmail size={20} />
                                        </div>
                                        <div className="overflow-hidden">
                                            <p className="text-xs uppercase font-bold tracking-wider text-gray-400 mb-1">Email Address</p>
                                            <p className="text-sm text-gray-800 font-normal font-poppins truncate group-hover/item:text-brand-purple transition-colors">
                                                cia@globalprofessionalcertifications.com
                                            </p>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* ───── SECTION 3: Enquiry Form ───── */}
            <section className="py-16 lg:py-24 bg-gray-50">
                <div className="max-w-6xl mx-auto px-6 lg:px-12">
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">

                        {/* Left: Heading + Description */}
                        <div className="lg:col-span-2 lg:sticky lg:top-32">
                            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
                                Send Us a <span className="text-brand-blue font-normal italic">Message</span>
                            </h2>
                            <p className="text-gray-600 text-sm md:text-base font-poppins leading-relaxed mb-8">
                                Fill in your details and tell us what you're interested in. We'll get back to you with all the information you need to start your certification journey.
                            </p>

                            {/* Quick Info */}
                            <div className="space-y-5">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                                        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <p className="text-gray-600 text-sm font-poppins">Free consultation for all courses</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                                        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <p className="text-gray-600 text-sm font-poppins">No spam, only relevant information</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                                        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <p className="text-gray-600 text-sm font-poppins">Response within 24 hours</p>
                                </div>
                            </div>

                            {/* Social Links */}
                            <div className="mt-10 pt-8 border-t border-gray-200">
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
                                        to="https://www.youtube.com/@globalprofessionalcertifications"
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
                            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
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
            </section>

            {/* ───── SECTION 4: Google Map ───── */}
            <section className="py-16 lg:py-20 bg-white">
                <div className="max-w-6xl mx-auto px-6 lg:px-12">
                    <div className="text-center mb-10">
                        <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
                            Find Us on <span className="text-brand-blue font-normal italic">Google Maps</span>
                        </h2>
                        <p className="text-gray-600 text-sm md:text-base font-poppins leading-relaxed max-w-xl mx-auto">
                            Visit us at our Gurugram office. We are located at 5th Floor, Unit 502, Tower B, Capital Business Park, Sohna Rd, Sector 48, Gurugram
                        </p>
                    </div>
                    <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-200">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3508.107943505472!2d77.09730627488064!3d28.44616227576705!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d19b4d61ec377%3A0xc27972389edd6342!2sGlobal%20Professional%20Certifications!5e0!3m2!1sen!2sin!4v1777889501154!5m2!1sen!2sin"
                            width="100%"
                            height="450"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Global Professional Certifications on Google Maps"
                        ></iframe>
                    </div>
                </div>
            </section>
        </>
    );
}
