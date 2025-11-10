import React, { useEffect } from 'react';
import heroGirl from '../../assets/hero-girl.webp';
import { Link } from 'react-router-dom';
import { height } from "../Notifications/NotificationBanner";


const Hero = () => {
    useEffect(() => {
        // Preload hero image for faster rendering
        const img = new Image();
        img.src = heroGirl;
    }, []);

    // Adjust top padding dynamically based on notification banner
    const paddingTop = ((16 + (height ? height - 4 : 0)) * 4).toString();

    return (
        <section
            className="relative min-h-screen flex items-center justify-center bg-brand-blue sm:pt-24"
            style={{ paddingTop: `${paddingTop}px` }}
        >
            <div className="container mx-auto px-6 py-12 sm:py-16 md:py-20 flex flex-col md:flex-row items-center gap-10">

                {/* --- Left: Text Section --- */}
                <div className="w-full md:w-1/2 max-w-3xl text-left">
                    <p className="inline-block px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-2.5 bg-gray-50/10 border border-white/80 md:border-white text-xs sm:text-sm md:text-base text-gray-100 rounded-md sm:rounded-lg font-semibold font-inter tracking-wide backdrop-blur-sm">
                        Trusted by Professionals from Top Corporates
                    </p>


                    {/* Main Headline (H1) */}
                    <h1 className="mt-6 text-xl sm:text-4xl md:text-4xl font-bold leading-tight text-white">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
                            Empowering Risk Professionals
                        </span>{' '}
                        Worldwide with Globally Recognized Certifications
                    </h1>

                    {/* Subheading (H2) */}
                    <h2 className="mt-4 text-base sm:text-lg md:text-lg text-gray-200 leading-relaxed">
                        Join a thriving global community of auditors, risk managers, and advisory professionals. Unlock your potential with expert-led, industry-accredited courses—<span className='font-bold text-orange-400'>including CIA, CRMA, IAP, and CISA</span>—designed for aspiring and experienced professionals in risk assurance and advisory.
                    </h2>

                    {/* CTA Button */}
                    <div className="mt-8">
                        <Link
                            to="/courses"
                            className="inline-flex items-center justify-center px-8 py-3 text-lg font-semibold text-white 
                        rounded-lg shadow-lg transition-all duration-300 
                        bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 
                        hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-400"
                        >
                            Explore Our Programs
                        </Link>
                        <Link to>
                        </Link>
                    </div>
                </div>

                {/* --- Right: Hero Image --- */}
                <div className="w-full md:w-1/2 flex justify-center md:justify-end">
                    <div className="relative max-w-lg">
                        <img
                            src={heroGirl}
                            alt="Professional woman representing certifications"
                            className="w-full h-auto max-h-[500px] object-cover pb-8"
                        />

                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
