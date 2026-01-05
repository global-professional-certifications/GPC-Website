import React from "react";
import Countdown from "react-countdown";
import { FaClock } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";

const EventCard = ({
    image,
    title,
    description,
    targetDate,
    buttonText,
    buttonLink,
    imageAlt,
    venue,
    date,
}) => {
    const renderer = ({ days, hours, minutes, seconds, completed }) => {
        if (completed) {
            return (
                <div className="flex items-center justify-center px-4 py-2 bg-emerald-900/20 rounded-lg border border-emerald-500/30">
                    <span className="text-xs font-semibold text-emerald-400 animate-pulse">
                        Event has started
                    </span>
                </div>
            );
        }

        const Box = ({ value, label }) => (
            <div className="flex flex-col items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-white/5 backdrop-blur-md rounded-lg border border-white/10 relative overflow-hidden">
                <span className="text-lg sm:text-xl font-extrabold text-white leading-none">
                    {value}
                </span>
                <span className="text-[8px] sm:text-[9px] font-bold uppercase tracking-widest text-gray-400 mt-0.5">
                    {label}
                </span>
            </div>
        );

        return (
            <div className="flex items-center gap-2 sm:gap-3">
                <Box value={days} label="Days" />
                <Box value={hours} label="Hrs" />
                <Box value={minutes} label="Min" />
                <Box value={seconds} label="Sec" />
            </div>
        );
    };

    return (
        <div className="bg-[#100e28] rounded-3xl w-full shadow-2xl overflow-hidden border border-white/5">
            <div className="flex flex-col md:flex-row h-full">

                {/* Image */}
                <div className="relative md:w-2/5 min-h-[0px] md:min-h-[200px] overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#100e28] via-transparent to-transparent md:hidden z-10" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#100e28] hidden md:block z-10 opacity-80" />
                    <img
                        src={image}
                        alt={imageAlt}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Content */}
                <div className="md:w-3/5 flex flex-col justify-between gap-6 md:gap-0 px-6 py-6 md:px-8 md:py-8">

                    {/* Title + Description */}
                    <div className="flex flex-col gap-4">
                        <h2 className="text-2xl md:text-3xl font-bold text-white leading-snug font-poppins">
                            {title}
                        </h2>

                        <p className="text-sm text-gray-300 leading-relaxed font-light border-l-2 border-brand-purple/30 pl-4 text-justify">
                            {description}
                        </p>
                    </div>

                    {/* Meta */}
                    <div className="flex flex-col gap-2">
                        <div className="flex items-start gap-2">
                            <FontAwesomeIcon
                                icon={faLocationDot}
                                className="h-4 w-4 text-brand-purple mt-0.5"
                            />
                            <p className="text-gray-300 text-sm font-poppins leading-snug">
                                <span className="font-bold text-yellow-600/90 mr-1">
                                    Venue:
                                </span>
                                {venue}
                            </p>
                        </div>

                        <div className="flex items-start gap-2">
                            <FontAwesomeIcon
                                icon={faCalendar}
                                className="h-4 w-4 text-brand-purple mt-0.5"
                            />
                            <p className="text-gray-300 text-sm font-poppins leading-snug">
                                <span className="font-bold text-yellow-600/90 mr-1">
                                    Date:
                                </span>
                                {date}
                            </p>
                        </div>
                    </div>

                    {/* Countdown + Button */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pt-2">

                        <div className="flex flex-col gap-2 bg-white/5 rounded-xl p-3 md:p-4 border border-white/5 backdrop-blur-sm w-fit">
                            <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                <FaClock className="text-brand-purple" />
                                <span>Event Starts In</span>
                            </div>
                            <Countdown date={targetDate} renderer={renderer} />
                        </div>

                        <div className="flex md:justify-end">
                            <Link
                                to={buttonLink}
                                target="_blank"
                                className="inline-flex items-center justify-center px-8 py-3 text-sm font-bold text-white rounded-xl bg-gradient-to-r from-brand-blue to-brand-purple transition-all hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(166,34,225,0.4)] active:scale-[0.98]"
                            >
                                {buttonText}
                            </Link>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventCard;
