import React from "react";
import { Link } from "react-router-dom";
import { HiOutlineMail } from "react-icons/hi";
import { AiOutlineLinkedin } from "react-icons/ai";
import { TbWorldWww } from "react-icons/tb";
import arpitGarg from "../../assets/arpit-garg.webp";

const MentorShowcase = () => {
    return (
        <section className="bg-gray-50 py-16 md:py-24 border-t border-gray-100">
            <div className="max-w-6xl mx-auto px-6 lg:px-12">

                {/* Standardized Heading - NO ANIMATION */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Experienced Course <span className="text-brand-blue font-normal italic">Mentor</span>
                    </h2>
                </div>

                <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 max-w-5xl mx-auto">
                    <div className="flex flex-col md:flex-row">

                        {/* Compact Image Section */}
                        <div className="md:w-2/5 relative h-80 md:h-auto">
                            <img
                                src={arpitGarg}
                                alt="Arpit Garg"
                                className="w-full h-full object-cover object-top"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                        </div>

                        {/* Sober Content Section */}
                        <div className="md:w-3/5 p-8 md:p-12 flex flex-col justify-center">
                            <div className="mb-6">
                                <h3 className="text-3xl md:text-4xl font-extrabold text-brand-dark mb-2">
                                    Arpit Garg
                                </h3>
                                <p className="text-brand-blue font-bold tracking-wider text-sm uppercase">CA, CIA, CRMA, CISA</p>
                            </div>

                            <div className="space-y-4 mb-8">
                                <h4 className="text-xl font-bold text-gray-800">Co-founding Partner, Riskman</h4>
                                <p className="text-gray-600 text-lg leading-relaxed">
                                    A visionary faculty and the architect of success for <span className="font-bold text-brand-dark">1500+</span> professionals. Renowned for redefining audit expertise across the nation.
                                </p>
                            </div>

                            <div className="flex items-center gap-6">
                                <Link
                                    to="https://www.linkedin.com/in/arpit-garg-88070560"
                                    target="_blank"
                                    className="bg-brand-dark text-white px-8 py-3 rounded-xl font-bold hover:bg-brand-blue transition-colors duration-300 shadow-lg"
                                >
                                    View LinkedIn
                                </Link>

                                <div className="flex items-center gap-4">
                                    <Link to="mailto:cia@globalprofessionalcertifications.com" className="text-brand-blue hover:text-brand-dark transition-colors">
                                        <HiOutlineMail className="w-6 h-6" />
                                    </Link>
                                    <Link to="https://www.riskman.in/" target="_blank" className="text-brand-blue hover:text-brand-dark transition-colors">
                                        <TbWorldWww className="w-6 h-6" />
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
