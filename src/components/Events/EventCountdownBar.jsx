import React from "react";
import Countdown from "react-countdown";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { FaCalendarAlt } from "react-icons/fa";

const EventCountdownBar = ({
    eventName,
    targetDate,
    tagText = "Upcoming Event",
    buttonText = "Join Event",
    buttonLink = "/events"
}) => {
    const renderer = ({ days, hours, minutes, seconds, completed }) => {
        if (completed) {
            return (
                <div className="flex items-center">
                    <span className="text-white font-bold ml-4 text-sm md:text-base animate-pulse">Event has started! Join now.</span>
                </div>
            );
        }
        return (
            <div className="flex items-center gap-3 md:gap-5 ml-2 md:ml-6">
                <div className="flex flex-col items-center">
                    <span className="text-lg md:text-2xl font-bold leading-none">{days}</span>
                    <span className="text-[8px] md:text-[10px] uppercase font-medium opacity-70">Days</span>
                </div>
                <span className="text-lg md:text-2xl font-bold mb-3 opacity-50">:</span>
                <div className="flex flex-col items-center">
                    <span className="text-lg md:text-2xl font-bold leading-none">{hours}</span>
                    <span className="text-[8px] md:text-[10px] uppercase font-medium opacity-70">Hrs</span>
                </div>
                <span className="text-lg md:text-2xl font-bold mb-3 opacity-50">:</span>
                <div className="flex flex-col items-center">
                    <span className="text-lg md:text-2xl font-bold leading-none">{minutes}</span>
                    <span className="text-[8px] md:text-[10px] uppercase font-medium opacity-70">Min</span>
                </div>
                <span className="text-lg md:text-2xl font-bold mb-3 opacity-50">:</span>
                <div className="flex flex-col items-center">
                    <span className="text-lg md:text-2xl font-bold leading-none text-brand-contrast inline-block min-w-[2ch]">{seconds}</span>
                    <span className="text-[8px] md:text-[10px] uppercase font-medium opacity-70">Sec</span>
                </div>
            </div>
        );
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="fixed top-28 left-0 w-full z-40 bg-gradient-to-r from-brand-blue via-[#2d1b69] to-brand-purple text-white shadow-xl overflow-hidden"
        >
            {/* Glossy overlay effect */}
            <div className="absolute inset-0 bg-white/5 pointer-events-none"></div>

            {/* Subtle animated background pulse */}
            <div className="absolute -left-20 -top-20 w-64 h-64 bg-brand-purple/20 rounded-full blur-3xl animate-pulse-slow"></div>

            <div className="max-w-screen-xl mx-auto px-4 md:px-8 py-2.5 md:py-3.5 flex items-center justify-between relative z-10">
                {/* Left: Event Info */}
                <div className="flex items-center gap-3 md:gap-4 flex-1">
                    <div className="bg-white/10 p-2 md:p-2.5 rounded-lg border border-white/20 hidden sm:flex items-center justify-center transform hover:rotate-12 transition-transform duration-300">
                        <FaCalendarAlt className="text-brand-contrast text-lg md:text-xl" />
                    </div>
                    <div className="flex flex-col">
                        <p className="text-[9px] md:text-[11px] uppercase tracking-[0.2em] font-bold text-brand-contrast/90 mb-0.5">{tagText}</p>
                        <h3 className="text-sm md:text-lg font-bold font-poppins leading-relaxed tracking-tight drop-shadow-sm max-w-[140px] xs:max-w-[200px] md:max-w-md">
                            {eventName}
                        </h3>
                    </div>
                </div>

                {/* Center: Countdown */}
                <div className="flex justify-center items-center bg-black/30 backdrop-blur-sm rounded-2xl px-3 md:px-6 py-1 mx-2 border border-white/10 shadow-inner">
                    <span className="hidden lg:inline-block text-[11px] font-bold uppercase tracking-widest text-white/60 mr-4 border-r border-white/10 pr-4">Starts In</span>
                    <Countdown date={targetDate} renderer={renderer} />
                </div>

                {/* Right: Action */}
                <div className="flex justify-end flex-initial md:flex-1 pl-2">
                    <Link
                        to={`/events#${buttonLink}`}
                        className="inline-flex items-center justify-center px-6 py-2 text-base font-semibold text-white 
                        rounded-lg shadow-lg transition-all duration-300 
                        bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 
                        hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-400"
                    >
                        {buttonText}
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};


export default EventCountdownBar;
