import React from "react";
import { Link } from "react-router-dom";
import { HiOutlineMail } from "react-icons/hi";
import { TbWorldWww } from "react-icons/tb";
import arpitGarg from "../../assets/about/arpit-garg.webp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";

const MentorShowcase = () => {
    return (
        <section className="bg-brand-blue py-16 px-6 md:px-20">
            <div className="md:hidden">
                <h2 className="text-3xl md:text-4xl font-bold text-white md:text-gray-900 mb-4">
                    Our{" "}
                    <span className="text-orange-300 md:text-brand-blue font-normal italic">
                        Experienced
                    </span>{" "}
                    Course Mentor
                </h2>

                <p className="text-gray-300 md:text-gray-600 text-xs md:text-base font-poppins leading-relaxed mb-10 max-w-xl">
                    Learn from industry experts and gain real-world skills that drive success
                </p>
            </div>

            <div className="max-w-6xl mx-auto">
                <div className="relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden">

                    {/* Decorative background accents */}
                    <div className="absolute -top-24 -left-24 w-72 h-72 bg-brand-blue/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 right-0 w-80 h-80 bg-brand-blue/5 rounded-full blur-3xl" />

                    <div className="relative z-10 flex flex-col-reverse md:flex-row items-center gap-6 md:gap-16 px-8 py-8 md:py-14 md:px-16">

                        {/* LEFT CONTENT */}
                        <div className="w-full md:w-[65%]">
                            <div className="hidden md:block">
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                    Our{" "}
                                    <span className="text-brand-blue font-normal italic">
                                        Experienced
                                    </span>{" "}
                                    Course Mentor
                                </h2>
                                <p className="text-gray-600 text-xs md:text-base font-poppins leading-relaxed mb-10 max-w-xl">
                                    Learn from industry experts and gain real-world skills that drive success
                                </p>
                            </div>

                            <div className="space-y-3 md:space-y-6">

                                {/* NAME + ICONS ROW */}
                                <div className="flex items-start justify-between flex-wrap gap-y-4">

                                    {/* Name */}
                                    <div className="flex flex-col">
                                        <p className="text-2xl md:text-3xl font-semibold text-brand-dark leading-tight">
                                            Mr. Arpit Garg
                                        </p>
                                        <p className="text-xs md:text-sm tracking-widest text-brand-blue">
                                            (CA, CIA, CISA, CRMA)
                                        </p>
                                    </div>

                                    {/* Icons */}
                                    <div className="flex items-start gap-2 md:gap-4 md:pr-24">
                                        <Link
                                            to="https://www.linkedin.com/in/arpit-garg-88070560"
                                            target="_blank"
                                            className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-brand-blue transition-all hover:scale-110"
                                        >
                                            <FontAwesomeIcon
                                                icon={faLinkedin}
                                                className="text-xl md:text-2xl"
                                            />
                                        </Link>

                                        <Link
                                            to="mailto:cia@globalprofessionalcertifications.com"
                                            className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-brand-blue transition-all hover:scale-110"
                                        >
                                            <HiOutlineMail className="text-xl md:text-2xl" />
                                        </Link>

                                        <Link
                                            to="https://www.riskman.in/"
                                            target="_blank"
                                            className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-brand-blue transition-all hover:scale-110"
                                        >
                                            <TbWorldWww className="text-xl md:text-2xl" />
                                        </Link>
                                    </div>
                                </div>

                                <p className="text-[12px] md:text-base font-poppins font-semibold text-gray-900">
                                    <span className="font-normal text-gray-600">Co-founding Partner,</span> RiskMan Consulting
                                </p>

                                <div className="h-px w-24 bg-brand-blue/30" />

                                <p className="text-sm md:text-base font-poppins text-gray-600 leading-relaxed max-w-xl">
                                    A faculty and the architect of success for{" "}
                                    <span className="font-bold text-brand-dark">1500+</span>{" "}
                                    professionals. Renowned for redefining audit excellence with
                                    clarity, structure, and strategic insight.
                                </p>
                            </div>
                        </div>

                        {/* RIGHT IMAGE */}
                        <div className="w-full md:w-[35%] relative flex justify-center">
                            <div className="absolute inset-0 flex justify-center items-center">
                                <div className="w-full h-64 md:w-80 md:h-80 bg-brand-blue/20 rounded-full blur-3xl" />
                            </div>

                            <div className="relative z-10">
                                <img
                                    src={arpitGarg}
                                    alt="Arpit Garg"
                                    className="w-68 h-68 md:w-96 lg:w-[360px] object-cover"
                                />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default MentorShowcase;
