import React from "react";
import { Link, NavLink } from "react-router-dom";
import logoOne from "../../assets/logo-1.png";
import wappLogo from "../../assets/GPC_WhatsApp_Community_White.webp";
import { AiOutlineYoutube } from "react-icons/ai";
import { AiOutlineInstagram } from "react-icons/ai";
import { AiOutlineLinkedin } from "react-icons/ai";

const Footer = () => {
    return (
        <section className="font-sans py-10 bg-gray-900 sm:pt-16 lg:pt-24">
            <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                <div className="grid grid-cols-2 md:col-span-3 lg:grid-cols-6 gap-y-16 gap-x-12">
                    <div className="col-span-2 md:col-span-3 lg:col-span-2 lg:pr-8">
                            <Link to="/"><img className="h-20" src={logoOne} alt="Global Professoinal Certifications logo" /></Link>
                        <ul className="flex items-center space-x-3 ml-10">
                            <li><Link to="https://www.youtube.com/watch?v=2FWaO_Cf0eg" target="blank"><AiOutlineYoutube className="text-white h-7 w-7 cursor-pointer"/></Link></li>
                            <li><Link to="https://www.instagram.com/global__professionals/" target="blank"><AiOutlineInstagram className="text-white h-6 w-6 cursor-pointer"/></Link></li>
                            <li><Link to="https://www.linkedin.com/company/global-professional-certifications/" target="blank"><AiOutlineLinkedin className="text-white h-6 w-6 cursor-pointer"/></Link></li>
                        </ul>
                    </div>

                    <div>
                        <p className="text-sm font-semibold tracking-widest text-gray-50 uppercase">Company</p>
                        <ul className="mt-6 space-y-4">
                            <li>
                                <NavLink to="courses" title="" className={({isActive}) => `flex text-base ${isActive ? "text-brand-purple" : "text-gray-50"} transition-all duration-200 hover:text-[#a622e1]`}> Courses </NavLink>
                            </li>

                            <li>
                                <NavLink to="success" title="" className={({isActive}) => `flex text-base ${isActive ? "text-brand-purple" : "text-gray-50"} transition-all duration-200 hover:text-[#a622e1]`}> Success Stories </NavLink>
                            </li>

                            <li>
                                <NavLink to="about" title="" className={({isActive}) => `flex text-base ${isActive ? "text-brand-purple" : "text-gray-50"} transition-all duration-200 hover:text-[#a622e1]`}> About </NavLink>
                            </li>

                            <li>
                                <NavLink to="contact" title="" className={({isActive}) => `flex text-base ${isActive ? "text-brand-purple" : "text-gray-50"} transition-all duration-200 hover:text-[#a622e1]`}> Contact </NavLink>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <p className="text-sm font-semibold tracking-widest text-gray-50 uppercase">legal</p>

                        <ul className="mt-6 space-y-4">
                            <li>
                                <NavLink to="refund" title="" className={({isActive}) => `flex text-base ${isActive ? "text-brand-purple" : "text-gray-50"} transition-all duration-200 hover:text-[#a622e1]`}> Refund Policy </NavLink>
                            </li>

                            <li>
                                <NavLink to="/terms" title="" className={({isActive}) => `flex text-base ${isActive ? "text-brand-purple" : "text-gray-50"} transition-all duration-200 hover:text-[#a622e1]`}> Terms & Conditions </NavLink>
                            </li>

                            <li>
                                <NavLink to="privacy" title="" className={({isActive}) => `flex text-base ${isActive ? "text-brand-purple" : "text-gray-50"} transition-all duration-200 hover:text-[#a622e1]`}> Privacy Policy </NavLink>
                            </li>
                            <li>
                                <NavLink to="faq" title="" className={({ isActive }) => `flex text-base ${isActive ? "text-brand-purple" : "text-gray-50"} transition-all duration-200 hover:text-[#a622e1]`}> FAQ </NavLink>
                            </li>
                            <li>
                                <NavLink to="glossary" title="" className={({ isActive }) => `flex text-base ${isActive ? "text-brand-purple" : "text-gray-50"} transition-all duration-200 hover:text-[#a622e1]`}> Glossary </NavLink>
                            </li>
                        </ul>
                    </div>

                    <div className="col-span-2 md:col-span-1 lg:col-span-2 lg:pl-8">
                        <p className="text-sm font-semibold tracking-widest text-gray-50 uppercase">JOIN OUR COMMUNITY</p>
                        <img src={wappLogo} className="h-32 w-32 pt-2" alt="whatsapp group QR code"></img>
                    </div>
                </div>

                <hr className="mt-16 mb-10 border-gray-200" />

                <p className="text-sm text-center text-gray-50 font-semibold">© Copyright 2025, All Rights Reserved by Global Professional Certifications</p>
            </div>
        </section>
    )
}

export default Footer;