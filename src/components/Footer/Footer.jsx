import React from "react";
import { Link, NavLink } from "react-router-dom";
import { AiOutlineYoutube, AiOutlineInstagram, AiOutlineLinkedin } from "react-icons/ai";
import logoOne from "../../assets/logo-1.png";
import wappLogo from "../../assets/Gpc_Whatsapp_Community_qr.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";


export default function Footer() {
    return (
        <footer className="font-sans bg-black text-white pb-8 pt-12 transition-colors duration-300">
            <div className="px-6 mx-auto max-w-7xl">
                {/* GRID SECTION */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-12">

                    {/* LOGO & ADDRESS */}
                    <div className="lg:col-span-2">
                        <Link to="/" className="inline-block">
                            <img
                                src={logoOne}
                                alt="Global Professional Certifications logo"
                                className="h-26 sm:h-28 w-auto object-contain -ml-6"
                            />
                        </Link>

                        <div className="mt-2 px-0 md:pr-12 lg:pr-12 space-y-4 text-gray-400 text-xs text-justify">
                            <p>
                                Global Professional Certifications (GPC) empowers auditors, risk managers, and advisors worldwide with industry-accredited courses and expert mentorship.
                                Join a thriving community and unlock new career heights with globally recognized certifications like CIA, CRMA, IAP, and CISA.
                            </p>
                        </div>

                        {/* SOCIAL ICONS */}
                        <ul className="flex items-center gap-6 mt-12">
                            <li>
                                <Link
                                    to="https://www.youtube.com/@global-professional-cert"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-brand-purple hover:scale-110 transition-all inline-block duration-300"
                                >
                                    <AiOutlineYoutube className="h-10 w-10" />
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="https://www.instagram.com/global__professionals/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-brand-purple hover:scale-110 transition-all inline-block duration-300"
                                >
                                    <AiOutlineInstagram className="h-9 w-9" />
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="https://www.linkedin.com/company/global-professional-certifications/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-brand-purple hover:scale-110 transition-all inline-block duration-300"
                                >
                                    <AiOutlineLinkedin className="h-9 w-9" />
                                </Link>
                            </li>
                        </ul>

                    </div>


                    <div className="lg:col-span-2 grid grid-cols-2 gap-8 sm:gap-12 mt-2">
                        {/* COMPANY LINKS */}
                        <div>
                            <p className="text-sm uppercase text-white tracking-widest mb-4">Company</p>
                            <ul className="space-y-3">
                                {["courses", "success", "about", "contact"].map((item) => (
                                    <li key={item}>
                                        <NavLink
                                            to={item}
                                            className={({ isActive }) =>
                                                `text-base ${isActive ? "text-brand-purple" : "text-gray-400"}  transition-all hover:text-brand-purple duration-300 inline-block`
                                            }

                                        >
                                            {item.charAt(0).toUpperCase() + item.slice(1).replace("-", " ")}
                                        </NavLink>
                                    </li>
                                ))
                                }
                            </ul>
                        </div>

                        {/* LEGAL LINKS */}
                        <div>
                            <p className="text-sm uppercase tracking-widest mb-4">Legal</p>
                            <ul className="space-y-3">
                                {[
                                    ["refund", "Refund Policy"],
                                    ["/terms", "Terms & Conditions"],
                                    ["privacy", "Privacy Policy"],
                                    ["faq", "FAQ"],
                                    ["glossary", "Glossary"],
                                ].map(([path, label]) => (
                                    <li key={path}>
                                        <NavLink
                                            to={path}
                                            className={({ isActive }) =>
                                                `text-base ${isActive ? "text-brand-purple" : "text-gray-400"}  transition-all hover:text-brand-purple duration-300 inline-block`
                                            }
                                        >
                                            {label}
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Contacts and QR */}

                    <div className="lg:col-span-2 flex flex-col items-start lg:items-end">
                        <div className="mb-12 mt-1.5 space-y-4 text-sm leading-relaxed text-left">
                            <div className="flex items-start gap-3">
                                <FontAwesomeIcon icon={faLocationDot} className="text-white mt-1.5" />
                                <p>
                                    Innov8 Building, Orchid Centre, <br />Golf course road, Gurugram, <br />Haryana, India - 122022
                                </p>
                            </div>
                            <div className="flex items-start gap-3">
                                <FontAwesomeIcon icon={faPhone} className="text-white mt-1.5" />
                                <a href="tel:+918736083099" className=" hover:text-brand-purple transition-all duration-300">&nbsp;&nbsp;+91 87360 83099</a>
                            </div>
                            <div className="flex items-start gap-3">
                                <FontAwesomeIcon icon={faEnvelope} className="text-white mt-1.5" />
                                <a href="mailto:cia@globalprofessionalcertifications.com" className="hover:text-brand-purple transition-all duration-300">&nbsp;&nbsp;cia@globalprofessionalcertifications.com</a>
                            </div>
                        </div>
                        <div className="flex items-center gap-6">
                            <p className="text-xs text-gray-400 text-left">
                                Scan To Join Our<br />  WhatsApp Community
                            </p>
                            <img
                                src={wappLogo}
                                alt="WhatsApp community QR code"
                                className="h-24 w-24 bg-white object-contain hover:scale-105 transition-transform duration-300"
                            />
                        </div>

                    </div>
                </div>

                <hr className="mt-14 mb-6 border-gray-700" />

                {/* COPYRIGHT */}
                <p className="text-sm text-center text-gray-400">
                    ┬⌐ {new Date().getFullYear()} Global Professional Certifications. All Rights Reserved.
                </p>
            </div>
        </footer>
    );
}

