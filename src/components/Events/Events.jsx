import React, { useState, useCallback, useEffect } from "react";
import { IoLocationOutline } from "react-icons/io5";
import { FaHandshakeAngle } from "react-icons/fa6";
import { MdTipsAndUpdates } from "react-icons/md";
import { Link } from "react-router-dom";
import MetaTags from "../MetaTags";
import { motion } from "motion/react";
import { RxCross1 } from "react-icons/rx";
import FAQDisplay from "../FAQDisplay.jsx";
import EventCarousel from "../Carousels/EventCarousel";
import UpcomingEventCard from "./UpcomingEventCard";
import { SchemaMarkup, getEventSchema, generateBreadcrumbSchema, getFAQSchema, getWebPageSchema, getOrganizationSchema } from "../Schema";

// Sanity imports
import { client } from "../../lib/sanity/client";

// images import (static assets for hero/about sections)
import iiaEvent from "../../assets/events/iia-event.webp";
import heroImage from '../../assets/events/event-hero.webp'
import heroImageMobile from '../../assets/events/event-hero-mobile.webp'
import faqImage from "../../assets/faq.webp";

// icons import
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";


const courseFaqs = [
    {
        question: "How do I register for upcoming webinars?",
        answer:
            "Use the registration links provided in the Upcoming Events section or contact our team for assistance."
    },
    {
        question: "Who are the mentors for certification programs?",
        answer:
            "All sessions are led by globally recognized industry experts and certified mentors."
    },
    {
        question: "Can I get event reminders via WhatsApp?",
        answer:
            "Yes! Join our WhatsApp community to receive real-time updates and event notifications."
    },
    {
        question: "Is there a fee for attending the orientation webinars?",
        answer:
            "Most orientation sessions are free; specialized bootcamps and masterclasses may have nominal fees."
    }
];


export default function Events() {
    // Sanity data state
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [availableYears, setAvailableYears] = useState([]);
    const [activeYear, setActiveYear] = useState(null);
    const [activeEvent, setActiveEvent] = useState(null);

    // Fetch past events from Sanity
    // Year toggles are dynamically generated - adding events with new years (2027, 2028, etc.)
    // will automatically create new toggle buttons on the frontend
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                // Fetch past events (includes legacy event documents)
                const query = `*[(_type == "pastEvent" || _type == "event") && isActive == true && defined(year)] | order(year desc, order asc) {
                    _id,
                    eventName,
                    "slug": slug.current,
                    title,
                    description,
                    location,
                    date,
                    year,
                    "coverImage": coverImage.asset->url,
                    "galleryImages": galleryImages[].asset->url,
                    order
                }`;
                const data = await client.fetch(query);
                console.log("Fetched past events:", data);
                setEvents(data);

                // Extract unique years and sort descending (filter out null/undefined)
                const years = [...new Set(data.map(e => e.year).filter(y => y !== null && y !== undefined))].sort((a, b) => b - a);
                setAvailableYears(years.map(y => String(y)));

                // Set default active year to most recent
                if (years.length > 0) {
                    setActiveYear(String(years[0]));
                }
            } catch (error) {
                console.error("Error fetching events:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchEvents();
    }, []);

    // Get events for active year
    const eventsForYear = events.filter(e => String(e.year) === activeYear);

    // Get gallery images for active event
    const getGalleryImages = (eventSlug) => {
        const event = events.find(e => e.slug === eventSlug);
        return event?.galleryImages || [];
    };

    // Get event title for modal
    const getEventTitle = (eventSlug) => {
        const event = events.find(e => e.slug === eventSlug);
        return event?.eventName || '';
    };

    const handleEscapeKey = useCallback((event) => {
        if (event.key === "Escape") {
            setActiveEvent(null)
        }
    }, [])


    useEffect(() => {
        if (activeEvent) {
            document.body.style.overflow = "hidden"
            window.addEventListener("keydown", handleEscapeKey)
        } else {
            document.body.style.overflow = ""
            window.removeEventListener("keydown", handleEscapeKey)
        }

        return () => {
            document.body.style.overflow = ""
            window.removeEventListener("keydown", handleEscapeKey)
        }
    }, [activeEvent, handleEscapeKey])

    // Generate event schemas for all events from Sanity
    const eventSchemas = events.map(event => getEventSchema({
        name: event.eventName,
        description: event.description,
        startDate: event.date,
        location: event.location,
        url: `https://globalprofessionalcertifications.com/events#${event.slug}`,
        image: event.coverImage
    }));

    // Breadcrumb Schema
    const breadcrumbSchema = generateBreadcrumbSchema("/events");

    // Organization Schema
    const orgSchema = getOrganizationSchema();

    // FAQ Schema for events page
    const faqSchema = getFAQSchema(courseFaqs);

    // WebPage Schema
    const webPageSchema = getWebPageSchema({
        name: "Upcoming Certification Events & Webinars - GPC",
        description: "Stay updated with the latest events, webinars, and workshops organized by Global Professional Certifications for CIA, CISA, CRMA, and IAP aspirants.",
        url: "https://globalprofessionalcertifications.com/events"
    });

    return (
        <>
            <SchemaMarkup schema={[...eventSchemas, breadcrumbSchema, faqSchema, webPageSchema, orgSchema]} />
            <MetaTags
                title="Upcoming Certification Events & Webinars - GPC"
                description="Stay updated with live sessions, webinars, and certification events hosted by Global Professional Certifications."
                canonicalUrl="https://globalprofessionalcertifications.com/events"
            />

            {/* Hero Section */}

            {/* Desktop Version */}

            <section className="hidden lg:block relative w-full h-[80vh] overflow-hidden">
                {/* Background Image */}
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${heroImage})` }}
                    loading="lazy"
                ></div>


                {/* Content */}
                <div className="relative z-10 flex flex-col justify-center items-start h-full px-12 md:px-20 space-y-6">
                    <h1 className="text-xl md:text-6xl font-bold leading-tight text-white">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
                            Connect.
                        </span>
                        <br />
                        Learn. Grow.
                    </h1>

                    <h2 className="mt-4 text-base sm:text-lg md:text-lg text-gray-200 max-w-lg leading-relaxed">
                        Step into our events and virtual sessions to connect with leading mentors
                        and industry experts. Experience <span className='font-bold text-orange-400'>interactive learning, insightful panels, and exclusive networking</span> — all designed to empower your career and certification journey at <span className='font-bold text-orange-400'>Global Professional Certifications.</span>
                    </h2>

                    <div className="mt-8">
                        <button
                            onClick={() => {
                                document.getElementById("past-section").scrollIntoView({ behavior: "smooth" });
                            }}
                            className="inline-flex items-center justify-center px-8 py-3 text-lg font-semibold text-white 
                                            rounded-lg shadow-lg transition-all duration-300 
                                            bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 
                                            hover:scale-105 hover:shadow-xl focus:outline-none"
                        >
                            See Our Events

                        </button>
                    </div>
                </div>
            </section>

            {/* Mobile Version */}

            <section className="flex flex-col justify-center items-center lg:hidden bg-brand-blue pb-12">
                <div className="flex flex-col justify-center items-center text-white pt-10 px-8">
                    <h1 className="text-2xl md:text-4xl font-bold">Connect. <span className="text-[#FFD700] font-normal italic">Learn. </span>Grow.</h1>
                    <h2 className="text-xs md:text-base font-light text-gray-300 font-poppins mt-4 text-center px-0 md:px-20">Step into our events and virtual sessions to connect with leading mentors and industry experts.</h2>
                </div>
                <div className="w-full h-auto px-8 rounded-xl mt-12">
                    <img src={heroImageMobile} alt="Hero Image" className="w-full h-full object-cover rounded-xl" loading="lazy" />
                </div>
                <button
                    onClick={() => {
                        document.getElementById("past-section").scrollIntoView({ behavior: "smooth" });
                    }}
                    className="px-8 py-3 text-sm md:text-base font-semibold text-white 
                                            rounded-lg shadow-lg transition-all duration-300 
                                            bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 
                                            hover:scale-105 hover:shadow-xl focus:outline-none mt-12"
                >
                    See Our Events

                </button>


            </section>

            {/* Upcoming Event Section - Auto-populated from Sanity */}
            <section className="bg-gray-50">
                <UpcomingEventCard />
            </section>

            {/* Our Event Presence */}

            <section className="w-full pb-10 px-6 md:px-16 pt-16 bg-gray-50" >
                <div className="flex flex-col flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-32 px-0 lg:px-12">

                    {/* Image Section */}
                    <div className="w-full lg:w-[45%] flex justify-center">
                        <img
                            src={iiaEvent}
                            alt="Event image"
                            className="rounded-2xl w-full h-auto object-cover shadow-lg"
                        />
                    </div>

                    {/* Text Section */}
                    <div className="w-full lg:w-[55%] flex flex-col justify-start gap-4">

                        {/* Heading + Paragraph */}
                        <div>
                            <h3 className="text-2xl md:text-4xl lg:text-4xl font-bold text-center lg:text-left leading-tight">
                                Our Event Presence:{" "}
                                <span className="text-brand-blue font-normal italic">Why It Matters</span>
                            </h3>
                            <p className="text-gray-600 text-xs md:text-base font-poppins leading-relaxed mt-6 text-center lg:text-left max-w-2xl mx-auto lg:mx-0 px-4 md:px-0">
                                At Global Professional Certifications, we don't just talk about growth, we live it. Our active presence at industry-leading conferences, training programs, and networking forums across the globe reflects our commitment to staying ahead of the curve and bringing real-world insights to the professionals we serve.
                            </p>
                        </div>

                        {/* Two-column grid */}
                        <div className="flex justify-center lg:justify-start gap-4 md:gap-8 py-4">
                            <div className="flex flex-col items-center gap-4">
                                <FaHandshakeAngle className="h-14 w-14 md:h-16 md:w-16 bg-[#EFECFF] p-3 rounded-xl text-brand-blue" />
                                <p className="text-sm sm:text-base md:text-lg font-semibold font-poppins text-center lg:text-left">
                                    Listen to our Mentor
                                </p>
                            </div>
                            <div className="h-auto w-[1.2px] md:w-[1.5px] bg-gray-400"></div>
                            <div className="flex flex-col items-center gap-4">
                                <MdTipsAndUpdates className="h-14 w-14 md:h-16 md:w-16 bg-[#EFECFF] p-3 rounded-xl text-brand-blue" />
                                <p className="text-sm sm:text-base md:text-lg font-semibold font-poppins text-center lg:text-left">
                                    Get latest updates
                                </p>
                            </div>
                        </div>

                        {/* Closing paragraph */}
                        <p className="text-gray-600 text-xs md:text-base font-poppins leading-relaxed max-w-2xl text-center lg:text-left mx-auto lg:mx-0">
                            Joining us at events isn't just about attending — it's about engaging, evolving, and becoming part of a powerful global community.
                        </p>

                        {/* Button */}
                        <div className="flex justify-center lg:justify-start">
                            <Link
                                to="/contact"
                                className="bg-brand-blue text-white text-sm md:text-base py-3 px-6 rounded-full hover:bg-brand-purple transition-all duration-300 shadow-md"
                            >
                                Contact Us
                            </Link>
                        </div>
                    </div>
                </div>
            </section>


            {/* Our Honorable Speakers */}

            {/* <section className="w-full h-screen p-12">
                <div className="flex flex-col gap-2 justify-center items-center p-4 mb-12">
                    <p className="text-2xl md:text-4xl text-center font-bold">Our Honorable <span className="text-brand-blue font-normal italic">Speakers</span>
                    </p>
                    <p className="text-xs md:text-base lg:text-base font-poppins leading-relaxed max-w-3xl text-center text-gray-600 mt-6">
                        Your Success Path, Simplified<br />Your Certification Journey — From Learning to Leadership
                    </p>
                </div>

            </section> */}


            {/* Past Events */}

            <section id="past-section" className="bg-gray-50">
                <div className="flex flex-col items-center max-w-[77rem] mx-auto gap-6 py-4 md:py-16">

                    {/* Heading */}
                    <div className="flex flex-col gap-2 justify-center items-center p-4 md:mb-6">
                        <p className="text-2xl md:text-4xl text-center font-bold">
                            A Look Back: <span className="text-brand-blue font-normal italic">Past Events</span>
                        </p>
                        <p className="text-xs md:text-base lg:text-base font-poppins leading-relaxed max-w-3xl text-center text-gray-600 mt-6 px-8 md:px-0">
                            Explore highlights from our flagship events across the years
                        </p>
                    </div>

                    {/* Year Toggle - Clean Segmented Control */}
                    {availableYears.length > 0 && (
                        <div className="relative inline-flex items-center bg-gray-100 p-1 rounded-full shadow-sm mb-8">
                            {/* Sliding Background Indicator */}
                            <motion.div
                                className="absolute top-1 bottom-1 rounded-full bg-white shadow-md"
                                initial={false}
                                animate={{
                                    left: `${(availableYears.indexOf(activeYear) / availableYears.length) * 100}%`,
                                    width: `${100 / availableYears.length}%`
                                }}
                                transition={{
                                    type: "spring",
                                    stiffness: 400,
                                    damping: 30
                                }}
                            />

                            {/* Toggle Buttons */}
                            {availableYears.map((year) => (
                                <button
                                    key={year}
                                    onClick={() => setActiveYear(year)}
                                    className={`relative z-10 px-8 py-2.5 rounded-full font-semibold text-base transition-colors duration-200 min-w-[110px] ${activeYear === year
                                        ? 'text-brand-blue'
                                        : 'text-gray-500 hover:text-gray-700'
                                        }`}
                                >
                                    {year}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Events Content by Year */}
                    <div className="w-full">
                        {loading || !activeYear ? (
                            <div className="flex justify-center items-center py-20">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-blue"></div>
                            </div>
                        ) : events.length === 0 ? (
                            <div className="text-center py-20 text-gray-500">
                                <p className="text-lg">No events available</p>
                            </div>
                        ) : eventsForYear.length === 0 ? (
                            <div className="text-center py-20 text-gray-500">
                                <p className="text-lg">No events found for {activeYear}</p>
                            </div>
                        ) : (
                            <div className="animate-fadeIn">
                                {/* Desktop View */}
                                <div className="hidden lg:flex flex-col gap-6 w-full">
                                    {eventsForYear.map((event) => (
                                        <div key={event._id} className="p-8 border border-gray-300 shadow-lg rounded-xl w-full hover:shadow-xl transition-shadow duration-300">
                                            <div className="flex flex-row gap-8 w-full h-[16rem]">
                                                <img src={event.coverImage} className="rounded-xl w-[24rem] h-[16rem] object-cover flex-shrink-0" alt={event.title} />

                                                <div className="flex flex-col justify-between flex-1 min-w-0 py-1">
                                                    {/* Top: Badge + Title + Description */}
                                                    <div className="flex flex-col gap-3">
                                                        <div className="inline-flex items-center gap-2 w-fit">
                                                            <span className="px-3 py-1 bg-brand-blue/10 text-brand-blue text-sm font-semibold rounded-full border border-brand-blue/20">
                                                                {event.eventName}
                                                            </span>
                                                        </div>

                                                        <h5 className="text-2xl font-bold leading-tight">
                                                            {event.title}
                                                        </h5>
                                                        {event.description && (
                                                            <p className="text-gray-600 text-base ">
                                                                {event.description}
                                                            </p>
                                                        )}
                                                    </div>

                                                    {/* Bottom: Location, Date, Button - always pinned to bottom */}
                                                    <div className="flex justify-start items-center gap-4 flex-wrap mt-auto">
                                                        {event.location && (
                                                            <div className="flex justify-center items-center gap-2">
                                                                <IoLocationOutline className="h-6 w-6 text-gray-600 flex-shrink-0" />
                                                                <p className="text-gray-600">{event.location}</p>
                                                            </div>
                                                        )}
                                                        {event.date && (
                                                            <div className="flex justify-center items-center gap-2">
                                                                <FontAwesomeIcon icon={faCalendar} className="h-5 w-5 text-gray-600 text-sm" />
                                                                <p className="text-gray-600">{event.date}</p>
                                                            </div>
                                                        )}

                                                        {event.galleryImages && event.galleryImages.length > 0 && (
                                                            <button
                                                                onClick={() => setActiveEvent(event.slug)}
                                                                className="bg-brand-blue text-white text-sm md:text-base py-2 px-6 rounded-full hover:bg-brand-purple hover:scale-105 transition-all duration-300 w-fit ml-auto"
                                                            >
                                                                See More Images
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Mobile View */}
                                <div className="lg:hidden flex overflow-x-auto gap-6 px-4 py-6 mb-4 scrollbar-hide snap-x snap-mandatory w-full">
                                    {eventsForYear.map((evt) => (
                                        <div
                                            key={evt._id}
                                            className="min-w-[85%] md:min-w-[55%] snap-center p-4 pb-0 border border-gray-300 shadow-lg rounded-xl flex flex-col bg-white overflow-hidden"
                                        >
                                            <img src={evt.coverImage} alt={evt.eventName} className="rounded-lg w-full h-[260px] object-cover mb-4" loading='lazy' />
                                            <div className="flex flex-col gap-2 pb-4">
                                                <div>
                                                    <div className="inline-flex items-center gap-2 w-fit">
                                                        <span className="px-3 py-1 bg-brand-blue/10 text-brand-blue text-xs font-semibold rounded-full border border-brand-blue/20">
                                                            {evt.eventName}
                                                        </span>
                                                    </div>

                                                    <h5 className="text-base md:text-xl font-semibold text-gray-800 leading-tight">{evt.title}</h5>
                                                    <p className="text-sm text-gray-600">{evt.description}</p>

                                                    <div className="flex flex-col gap-2 justify-start text-sm mt-2">
                                                        <div className="flex items-center gap-2">
                                                            <IoLocationOutline className="h-5 w-5 text-gray-600" />
                                                            <p className="text-gray-600">{evt.location}</p>
                                                        </div>
                                                        <div className="flex items-center gap-2 pl-0.5">
                                                            <FontAwesomeIcon icon={faCalendar} className="h-4 w-4 text-gray-600 text-sm" />
                                                            <p className="text-gray-600">{evt.date}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                {evt.galleryImages && evt.galleryImages.length > 0 && (
                                                    <button
                                                        onClick={() => setActiveEvent(evt.slug)}
                                                        className="bg-brand-blue text-white text-sm md:text-base py-2 px-6 rounded-lg hover:bg-brand-purple hover:scale-105 transition-all duration-300 w-full mt-2"
                                                    >
                                                        See More Images
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Image Gallery Modal */}
                    {activeEvent && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="fixed inset-0 z-50 flex items-center justify-center"
                            onClick={() => setActiveEvent(null)}
                        >
                            {/* Backdrop */}
                            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

                            {/* Modal Content */}
                            <motion.div
                                initial={{ scale: 0.95, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.95, opacity: 0 }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                                className="relative w-full h-full max-w-7xl mx-auto flex flex-col py-4 md:py-8 px-2 md:px-4"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {/* Header */}
                                <div className="flex items-center justify-between mb-4 md:mb-6 px-2 md:px-4">
                                    {/* Event Title */}
                                    <div className="flex-1">
                                        <h2 className="text-xl md:text-3xl lg:text-4xl font-bold text-white text-center">
                                            {getEventTitle(activeEvent)}
                                        </h2>
                                        <p className="text-gray-400 text-sm md:text-base text-center mt-1">
                                            Event Gallery
                                        </p>
                                    </div>

                                    {/* Close Button */}
                                    <button
                                        className="absolute top-4 right-4 md:top-6 md:right-6
                                                   w-10 h-10 md:w-12 md:h-12
                                                   flex items-center justify-center
                                                   bg-white/10 hover:bg-white/20
                                                   backdrop-blur-sm
                                                   rounded-full
                                                   text-white hover:text-red-400
                                                   transition-all duration-300 hover:scale-110
                                                   border border-white/20
                                                   z-50"
                                        onClick={() => setActiveEvent(null)}
                                        aria-label="Close gallery"
                                    >
                                        <RxCross1 className="w-5 h-5 md:w-6 md:h-6" />
                                    </button>
                                </div>

                                {/* Carousel Container */}
                                <div className="flex-1 flex items-center justify-center overflow-hidden">
                                    <EventCarousel
                                        images={getGalleryImages(activeEvent)}
                                        eventName={getEventTitle(activeEvent)}
                                    />
                                </div>

                                {/* Footer hint */}
                                <div className="text-center mt-4 md:mt-6">
                                    <p className="text-gray-500 text-xs md:text-sm">
                                        Press <kbd className="px-2 py-1 bg-white/10 rounded text-gray-400">ESC</kbd> or click outside to close
                                    </p>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}

                </div>
            </section>


            {/* FAQ Section */}

            <div className="pt-16 md:pt-32 lg:pt-16 px-8 pb-40 md:pb-[220px] lg:px-24 bg-gray-50" >
                <div className="flex flex-col lg:flex-row items-center gap-20 md:gap-12">

                    {/* Image Section */}
                    <div className="w-full lg:w-2/5 flex justify-center items-center relative">
                        <div className="absolute max-w-md w-full h-full bg-brand-blue/30 translate-x-3 translate-y-3 md:translate-x-6 md:translate-y-6 lg:translate-x-6 lg:translate-y-6 z-0"></div>

                        {/* Main Image */}
                        <img
                            src={faqImage}
                            alt="FAQ illustration"
                            className="max-w-md w-full object-contain relative z-10 -translate-x-3 -translate-y-3 md:-translate-x-6 md:-translate-y-6 lg:-translate-x-6 lg:-translate-y-6"
                        />
                    </div>


                    {/* Questions Dropdown Section */}
                    <div className="w-full lg:w-3/5">
                        <FAQDisplay
                            faqs={courseFaqs}
                            showCount={5}
                            showMoreLink="/faq"
                        />
                    </div>
                </div>

            </div >

            {/* Radial Gradient Banner */}

            <div className="relative" >
                <div className="absolute left-1/2 -translate-x-1/2 -top-28 z-20 h-56 sm:h-32 md:h-56 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)] rounded-2xl py-2 md:py-8 w-full max-w-3xl flex items-center justify-center scale-90 md:scale-100">
                    <div className="flex flex-col md:flex-row justify-between items-center mx-8 gap-4 md:gap-12">
                        {/* Text Content */}
                        <div className="text-center md:text-left mb-6 md:mb-0">
                            <p className="text-white text-lg md:text-4xl font-bold">
                                Connect with our Mentor
                            </p>
                            <p className="text-gray-200 text-xs md:text-md mt-2">
                                Connect with our mentors, join the latest events, or contact us for personalized guidance!
                            </p>
                        </div>
                        {/* Button */}
                        <Link
                            to="/contact"
                            className="bg-brand-blue text-white text-sm md:text-base py-2 px-4 md:px-6 rounded-full hover:bg-brand-purple  transition-all duration-300"
                        >
                            Contact Us
                        </Link>
                    </div>
                </div>

            </div >
            <div className="bg-black h-16 md:h-36 relative"></div>
        </>
    )
}
