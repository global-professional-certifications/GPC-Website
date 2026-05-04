import React from "react";
import MetaTags from "../MetaTags";
import { GrLocation } from "react-icons/gr";
import { FiPhoneCall } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";
import { Link } from "react-router-dom";
import { TiArrowRight } from "react-icons/ti";
import { SchemaMarkup, getContactPageSchema, getLocalBusinessSchema, getBreadcrumbSchema } from "../Schema";

export default function ContactUs() {
    // List of courses for checkboxes
    const courses = [
        "CIA - Specific Part",
        "CIA - All Parts",
        "CISA",
        "IAP",
        "CRMA",
    ];

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
        address: "Innov8 Building, Orchid Centre, Golf course road, Gurugram, Haryana, India - 122022",
        phone: "+91 87360 83099",
        email: "cia@globalprofessionalcertifications.com"
    });

    // Breadcrumb Schema
    const breadcrumbSchema = getBreadcrumbSchema([
        { name: "Home", url: "https://globalprofessionalcertifications.com" },
        { name: "Contact Us", url: "https://globalprofessionalcertifications.com/contact" }
    ]);

    return (
        <>
            <SchemaMarkup schema={[contactPageSchema, localBusinessSchema, breadcrumbSchema]} />
            <MetaTags
                title="Contact Us - Global Professional Certifications"
                description="Reach out to our team for queries, support, or course guidance. We are here to help you achieve your certification goals."
                canonicalUrl="https://globalprofessionalcertifications.com/contact"
            />
            <section className="relative z-10 bg-gray-50 dark:bg-dark pt-8 lg:pt-12 pb-12 lg:pb-20 w-full">
                <div className="mx-auto lg:max-w-[75rem]">
                    <div className="lg:flex lg:justify-center lg:items-center">
                        <div className="w-full px-4 lg:w-1/2 xl:w-6/12">
                            <div className="mb-12 max-w-[500px] lg:mb-0">
                                <span className="px-3 py-1.5 bg-[#EFECFF] text-[#5033FF] w-[12rem] border border-[#5033FF] rounded-lg text-sm font-bold hover:text-brand-purple hover:border-brand-purple transition duration-300">
                                    Contact Us
                                </span>
                                <h1 className="mt-4 text-brand-blue dark:text-white mb-4 text-[32px] font-bold uppercase sm:text-[40px] lg:text-[36px] xl:text-[40px]">
                                    GET IN TOUCH WITH US
                                </h1>
                                <h2 className="text-xl leading-relaxed text-brand-dark dark:text-dark-6 mb-9">
                                    Send us a message, we will text back!
                                </h2>
                                <div className="mb-8 flex justify-center items-center w-full max-w-[370px]">
                                    <div className="bg-primary/5 text-brand-blue shadow-lg border border-gray-200 mr-6 flex h-[60px] w-full max-w-[60px] items-center justify-center overflow-hidden rounded sm:h-[70px] sm:max-w-[70px]">
                                        <GrLocation size={32} className="hover:text-brand-purple transition duration-300" />
                                    </div>
                                    <div className="w-full">
                                        <h3 className="mb-1 text-xl text-dark dark:text-white">
                                            <span className="font-bold">Our Location</span> <span><TiArrowRight className="inline-block" /></span> <span className="text-sm italic hover:text-brand-purple hover:underline"><Link to="https://maps.app.goo.gl/iJx6qe41EeEeG1vY8" target="_blank">View on map</Link></span>
                                        </h3>
                                        <p className="text-sm text-body-color dark:text-dark-6">
                                            Innov8 Building, Orchid Centre, Golf course road, Gurugram, Haryana, India - 122022
                                        </p>
                                    </div>
                                </div>
                                <div className="mb-8 flex justify-center items-center w-full max-w-[370px]">
                                    <div className="bg-primary/5 text-brand-blue shadow-lg border border-gray-200 mr-6 flex h-[60px] w-full max-w-[60px] items-center justify-center overflow-hidden rounded sm:h-[70px] sm:max-w-[70px]">
                                        <FiPhoneCall size={32} className="hover:text-brand-purple transition duration-300" />
                                    </div>
                                    <div className="w-full">
                                        <h3 className="text-xl font-bold text-dark dark:text-white">
                                            Phone Number
                                        </h3>
                                        <p className="text-sm text-body-color dark:text-dark-6">
                                            (+91) 87360 83099
                                        </p>
                                    </div>
                                </div>
                                <div className="mb-8 flex w-full max-w-[370px] justify-center items-center">
                                    <div className="bg-primary/5 text-brand-blue shadow-lg border border-gray-200 mr-6 flex h-[60px] w-full max-w-[60px] items-center justify-center overflow-hidden rounded sm:h-[70px] sm:max-w-[70px]">
                                        <MdOutlineEmail size={32} className="hover:text-brand-purple transition duration-300" />
                                    </div>
                                    <div className="w-full">
                                        <h3 className="mb-1 text-xl font-bold text-dark dark:text-white">
                                            Email Address
                                        </h3>
                                        <p className="text-sm text-body-color dark:text-dark-6">
                                            <a href="mailto:cia@globalprofessionalcertifications.com?subject=Inquiry&body=Hi there, I would like to know more about..." className="hover:underline hover:text-brand-blue">
                                                cia@globalprofessionalcertifications.com
                                            </a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full px-4 lg:w-1/2 xl:w-7/12">

                            <iframe
                                aria-label="GPC Website Contact Us"
                                style={{
                                    height: '600px',
                                    width: '99%',
                                    border: 'none',
                                }}
                                src="https://forms.zohopublic.in/globalprofessionalcertificat1/form/test/formperma/zOWVICVVpCKVK7R_erMCeQrDKHeTI3UTOYkhLCXa7PA"
                                title="GPC Contact Us Form"
                            ></iframe>

                        </div>
                        {/* </div> */}
                    </div>
                </div>
            </section>
        </>
    );
}


