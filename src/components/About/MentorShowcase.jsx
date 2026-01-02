import React from "react";
import { Link } from "react-router-dom";
import { HiOutlineMail } from "react-icons/hi";
import { TbWorldWww } from "react-icons/tb";
import arpitGarg from "../../assets/arpit-garg.webp";

const MentorShowcase = () => {
    return (
        <section className="bg-gradient-to-b from-gray-50 to-white py-20">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">

                {/* Heading (UNCHANGED intent & style) */}
                <div className="text-center mb-20">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Our Experienced Course{" "}
                        <span className="text-brand-blue font-normal italic">
                            Mentor
                        </span>
                    </h2>
                    <p className="max-w-3xl mx-auto text-gray-600 text-xs md:text-base font-poppins leading-relaxed">
                        Learn from industry experts and gain real-world skills that drive success
                    </p>
                </div>

                {/* Card */}
                <div className="bg-white rounded-[2rem] shadow-2xl border border-gray-100 max-w-5xl mx-auto overflow-hidden">
                    <div className="flex flex-col md:flex-row">

                        {/* Image */}
                        <div className="md:w-2/5 relative">
                            <img
                                src={arpitGarg}
                                alt="Arpit Garg"
                                className="w-full h-full object-cover object-top"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent" />
                        </div>

                        {/* Content */}
                        <div className="md:w-3/5 p-10 md:p-14 flex flex-col justify-center">

                            {/* Name */}
                            <div className="mb-6">
                                <h3 className="text-3xl md:text-4xl font-extrabold text-brand-dark mb-2">
                                    Arpit Garg
                                </h3>
                                <p className="text-brand-blue font-semibold tracking-wide text-sm uppercase">
                                    CA, CIA, CRMA, CISA
                                </p>
                            </div>

                            {/* Role & Bio */}
                            <div className="space-y-5 mb-10">
                                <h4 className="text-xl font-bold text-gray-800">
                                    Co-founding Partner, Riskman
                                </h4>
                                <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                                    A visionary faculty and the architect of success for{" "}
                                    <span className="font-bold text-brand-dark">1500+</span>{" "}
                                    professionals. Renowned for redefining audit excellence with
                                    clarity, structure, and strategic insight.
                                </p>
                            </div>

                            {/* Actions */}
                            <div className="flex flex-wrap items-center gap-6">
                                <Link
                                    to="https://www.linkedin.com/in/arpit-garg-88070560"
                                    target="_blank"
                                    className="bg-brand-blue text-white px-8 py-3 rounded-xl font-semibold tracking-wide hover:bg-brand-purple transition-all duration-300 shadow-lg hover:scale-105"
                                >
                                    View LinkedIn
                                </Link>

                                <div className="flex items-center gap-4">
                                    <Link
                                        to="mailto:cia@globalprofessionalcertifications.com"
                                        className="p-3 rounded-full border border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white transition-all duration-300"
                                    >
                                        <HiOutlineMail className="w-5 h-5" />
                                    </Link>

                                    <Link
                                        to="https://www.riskman.in/"
                                        target="_blank"
                                        className="p-3 rounded-full border border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white transition-all duration-300"
                                    >
                                        <TbWorldWww className="w-5 h-5" />
                                    </Link>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MentorShowcase;
