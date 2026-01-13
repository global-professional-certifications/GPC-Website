import React, { useState, useCallback, useEffect, act } from "react";
import { IoLocationOutline } from "react-icons/io5";
import { FaHandshakeAngle } from "react-icons/fa6";
import { MdTipsAndUpdates } from "react-icons/md";
import { Link } from "react-router-dom";
import MetaTags from "../MetaTags";
import { motion } from "motion/react";
import { RxCross1 } from "react-icons/rx";
import { Helmet } from 'react-helmet-async';
import FAQDisplay from "../FAQDisplay.jsx";
import EventCarousel from "../Carousels/EventCarousel";
import UpcomingEventCard from "./UpcomingEventCard";


// images import
import iiaEvent from "../../assets/events/iia-event.webp";
import wofaBanner from "../../assets/wofa-banner.webp";
import iiaKolkataBanner from "../../assets/iia-kolkata-banner.webp";
import iiaBengaluruBanner from "../../assets/iia-bengaluru-banner.webp";
import iiaMumbaiBanner from "../../assets/iia-mumbai-banner.webp";
import iiaHyderabadOne from "../../assets/iia-hyderabad/iia-hyderabad-1.webp"
import agmIiaDelhiChapter from "../../assets/AGM-IIA-Delhi/AGM-IIA-Delhi-7-events.webp"
import { iiaBangaloreImages, iiaKolkataImages, iiaBombayImages, wofaImages, iiaHyderabadImages, agmIIADelhiChapterImages, iiaBombay2026Images } from "./eventImages.jsx";
import heroImage from '../../assets/events/event-hero.webp'
import heroImageMobile from '../../assets/events/event-hero-mobile.webp'
import faqImage from "../../assets/faq.webp";
import iiaBombay26Cover from "../../assets/iia-bombay-26/iiabombay2026-image7.jpg"

// icons import
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { faClock, faCalendar } from "@fortawesome/free-regular-svg-icons";


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

    const events = [
        {
            id: "hyderabad",
            title: "IIA Hyderabad",
        },
        {
            id: "wofa",
            title: "WOFA 2025",
        },
        {
            id: "kolkata",
            title: "IIA Kolkata",
        },
        {
            id: "bangalore",
            title: "IIA Bangalore",
        },
        {
            id: "mumbai",
            title: "IIA Mumbai",
        },
        {
            id: "delhi",
            title: "AGM IIA Delhi",
        },
        {
            id: "bombay26",
            title: "IIA Mumbai 2026",
        }
    ]

    const imageMap = {
        mumbai: iiaBombayImages,
        bangalore: iiaBangaloreImages,
        kolkata: iiaKolkataImages,
        wofa: wofaImages,
        hyderabad: iiaHyderabadImages,
        delhi: agmIIADelhiChapterImages,
        bombay26: iiaBombay2026Images
    }

    // 2026 Events Data - Single source of truth
    const events2026Data = [
        {
            id: "bombay26",
            eventName: "IIA Mumbai 2026",
            img: iiaBombay26Cover,
            title: "At the IIA Mumbai Chapter event, we engaged with audit leaders and professionals to explore the future of internal auditing and governance excellence.",
            location: "Vikhroli, Mumbai, India",
            date: "8th & 9th January 2026",
            description: "The event brought together industry experts and practitioners, fostering meaningful discussions on emerging audit practices and regulatory frameworks in today's evolving business landscape.",
            buttonLink: "bombay26", // Gallery ID for See More Images
        },
    ]

    // 2025 Events Data - Single source of truth
    const events2025Data = [
        {
            id: "hyderabad",
            eventName: "IIA Hyderabad",
            img: iiaHyderabadOne,
            title: "At the IIA Hyderabad Chapter event, we connected with insightful audit professionals to exchange perspectives on the evolving landscape of internal audit and risk management.",
            location: "Hyderabad, Telengana, India",
            date: "24th May 2025",
            description: "A convergence of ideas and expertise, the event underscored the evolving role of auditors in a rapidly changing world.",
            buttonLink: "hyderabad", // Gallery ID for See More Images
        },
        {
            id: "wofa",
            eventName: "WOFA 2025",
            img: wofaBanner,
            title: "We were proud to be a part of WOFA 2025, where leaders and changemakers came together to drive innovation and empowerment.",
            location: "New Delhi, India",
            date: "31st Jan 2025 - 2nd Feb 2025",
            description: "From powerful discussions to meaningful connections, the event was a celebration of global collaboration and forward thinking.",
            buttonLink: "wofa", // Gallery ID for See More Images
        },
        {
            id: "kolkata",
            eventName: "IIA Kolkata",
            img: iiaKolkataBanner,
            title: "We engaged with leading internal audit professionals at the IIA Kolkata Chapter event, exploring emerging trends in governance and risk.",
            location: "Kolkata, West Bengal, India",
            date: "10th Feb 2025",
            description: "The sessions fostered meaningful dialogue and highlighted the evolving role of auditors in today's dynamic landscape.",
            buttonLink: "kolkata", // Gallery ID for See More Images
        },
        {
            id: "bangalore",
            eventName: "IIA Bangalore",
            img: iiaBengaluruBanner,
            title: "At the IIA Bengaluru Chapter conference, we participated in insightful discussions on innovation in internal auditing.",
            location: "Bengaluru, Karnataka, India",
            date: "19th Feb 2025",
            description: "The event brought together experts and thought leaders, creating a powerful platform for knowledge exchange and collaboration.",
            buttonLink: "bangalore", // Gallery ID for See More Images
        },
        {
            id: "mumbai",
            eventName: "IIA Mumbai",
            img: iiaMumbaiBanner,
            title: "The IIA Mumbai Chapter event was a hub of ideas and industry insights, focused on enhancing audit excellence.",
            location: "Mumbai, Maharashtra, India",
            date: "5th March 2025",
            description: "We connected with professionals driving change and shared in the mission to elevate internal audit practices across sectors.",
            buttonLink: "mumbai", // Gallery ID for See More Images
        },
        {
            id: "delhi",
            eventName: "AGM IIA Delhi",
            img: agmIiaDelhiChapter,
            title: "At the AGM IIA Delhi Chapter, we collaborated with audit experts to discuss advancements and strategies for elevating internal audit practices.",
            location: "New Delhi, India",
            date: "18th July 2025",
            description: "The AGM IIA Delhi Chapter united audit professionals to share insights and strategies, advancing the future of internal auditing.",
            buttonLink: "delhi", // Gallery ID for See More Images
        },
    ]

    const [activeEvent, setActiveEvent] = useState(null)

    // Dynamic years array - add new years here as needed
    const availableYears = ['2026', '2025']
    const [activeYear, setActiveYear] = useState(availableYears[0]) // Default to most recent year

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

    // detects if the window is in mobile view or desktop view
    // let windowSize = window.innerWidth

    const [isMobile, setIsMobile] = useState(false)
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768)
        }

        handleResize()
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [window.innerWidth])

    const articleSchema = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "Upcoming Events by Global Professional Certifications",
        "description": "Stay updated with the latest events, webinars, and workshops organized by Global Professional Certifications for CIA, CISA, CRMA, and IAP aspirants.",
        "author": {
            "@type": "Organization",
            "name": "Global Professional Certifications"
        },
        "publisher": {
            "@type": "Organization",
            "name": "Global Professional Certifications",
            "logo": {
                "@type": "ImageObject",
                "url": "https://globalprofessionalcertifications.com/logo.png"
            }
        },
        "url": "https://globalprofessionalcertifications.com/events",
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": "https://globalprofessionalcertifications.com/events"
        },
        "datePublished": "2025-10-07",
        "dateModified": "2025-10-07"


    };


    return (
        <>
            <Helmet>
                <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
            </Helmet>
            <MetaTags
                title="Upcoming Certification Events & Webinars - GPC"
                description="Stay updated with live sessions, webinars, and certification events hosted by Global Professional Certifications."
                canonicalUrl="https://globalprofessionalcertifications.com/events"
            />

            {/* Hero Section */}

            {/* Desktop Version */}

            <section className="hidden lg:block relative w-full h-screen overflow-hidden">
                {/* Background Image */}
                <div
                    className="absolute inset-0 bg-cover bg-center mt-16"
                    style={{ backgroundImage: `url(${heroImage})` }}
                    loading="lazy"
                ></div>


                {/* Content */}
                <div className="relative z-10 flex flex-col justify-center items-start h-full px-12 md:px-20 space-y-6 mt-8">
                    <h1 className="mt-6 text-xl md:text-6xl font-bold leading-tight text-white">
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

            <section className="flex flex-col justify-center items-center lg:hidden bg-brand-blue pb-12 mt-16">
                <div className="flex flex-col justify-center items-center text-white pt-24 px-8">
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

            {/* <UpcomingEventCard /> */}

            {/* Our Event Presence */}

            < section className="w-full pb-10 px-6 md:px-16 pt-16 bg-gray-50" >
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

                    {/* Events Content by Year */}
                    <div className="w-full">
                        {/* 2026 Events */}
                        {activeYear === '2026' && (
                            <div className="animate-fadeIn">
                                {/* Desktop View */}
                                <div className="hidden lg:flex flex-col gap-6 w-full">
                                    {events2026Data.map((event) => (
                                        <div key={event.id} className="p-8 border border-gray-300 shadow-lg rounded-xl w-full hover:shadow-xl transition-shadow duration-300">
                                            <div className="flex flex-col md:flex-row gap-8 w-full h-[16rem] items-center">
                                                {event.isPlaceholder ? (
                                                    <div className="w-full md:w-1/3">
                                                        <div className="bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl p-8 flex items-center justify-center h-64">
                                                            <p className="text-6xl font-bold text-brand-blue">2026</p>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <img src={event.img} className="rounded-xl w-auto h-[16rem] object-cover" alt={event.title} />
                                                )}

                                                <div className="flex flex-col gap-4">
                                                    <div className="inline-flex items-center gap-2 w-fit">
                                                        <span className="px-3 py-1 bg-brand-blue/10 text-brand-blue text-sm font-semibold rounded-full border border-brand-blue/20">
                                                            {event.eventName}
                                                        </span>
                                                    </div>

                                                    <h5 className="text-2xl font-bold">
                                                        {event.title}
                                                    </h5>
                                                    <p className="text-gray-600 text-base">
                                                        {event.description}
                                                    </p>
                                                    <div className="flex justify-start items-center gap-4 flex-wrap">
                                                        <div className="flex justify-center items-center gap-2">
                                                            <IoLocationOutline className="h-6 w-6 text-gray-600" />
                                                            <p className="text-gray-600">{event.location}</p>
                                                        </div>
                                                        <div className="flex justify-center items-center gap-2">
                                                            <FontAwesomeIcon icon={faCalendar} className="h-5 w-5 text-gray-600 text-sm" />
                                                            <p className="text-gray-600">{event.date}</p>
                                                        </div>

                                                        {!event.isPlaceholder && (
                                                            <button
                                                                onClick={() => setActiveEvent(event.id)}
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
                                    {events2026Data.map((evt) => (
                                        <div
                                            key={evt.id}
                                            className="min-w-[85%] md:min-w-[55%] snap-center p-4 pb-0 border border-gray-300 shadow-lg rounded-xl flex flex-col bg-white overflow-hidden"
                                        >
                                            {evt.isPlaceholder ? (
                                                <div className="bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg p-8 flex items-center justify-center h-48 mb-4">
                                                    <p className="text-5xl font-bold text-brand-blue">2026</p>
                                                </div>
                                            ) : (
                                                <img src={evt.img} alt={evt.id} className="rounded-lg w-full h-[260px] object-cover mb-4" loading='lazy' />
                                            )}
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
                                                <button
                                                    onClick={() => setActiveEvent(evt.id)}
                                                    className="bg-brand-blue text-white text-sm md:text-base py-2 px-6 rounded-lg hover:bg-brand-purple hover:scale-105 transition-all duration-300 w-full mt-2"
                                                >
                                                    See More Images
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* 2025 Events */}
                        {activeYear === '2025' && (
                            <div className="animate-fadeIn">
                                {/* Desktop View */}
                                <div className="hidden lg:flex flex-col gap-6 w-full">
                                    {events2025Data.map((event) => (
                                        <div key={event.id} className="p-8 border border-gray-300 shadow-lg rounded-xl w-full hover:shadow-xl transition-shadow duration-300">
                                            <div className="flex flex-col md:flex-row gap-8 w-full h-[16rem] items-center">
                                                <img src={event.img} className="rounded-xl w-auto h-[16rem] object-cover" alt={event.title} />

                                                <div className="flex flex-col gap-4">
                                                    {/* Event Name Badge */}
                                                    <div className="inline-flex items-center gap-2 w-fit">
                                                        <span className="px-3 py-1 bg-brand-blue/10 text-brand-blue text-sm font-semibold rounded-full border border-brand-blue/20">
                                                            {event.eventName}
                                                        </span>
                                                    </div>

                                                    <h5 className="text-2xl font-bold">
                                                        {event.title}
                                                    </h5>
                                                    <p className="text-gray-600 text-base">
                                                        {event.description}
                                                    </p>
                                                    <div className="flex justify-start items-center gap-4 flex-wrap">
                                                        <div className="flex justify-center items-center gap-2">
                                                            <IoLocationOutline className="h-6 w-6 text-gray-600" />
                                                            <p className="text-gray-600">{event.location}</p>
                                                        </div>
                                                        <div className="flex justify-center items-center gap-2">
                                                            <FontAwesomeIcon icon={faCalendar} className="h-5 w-5 text-gray-600 text-sm" />
                                                            <p className="text-gray-600">{event.date}</p>
                                                        </div>

                                                        <button
                                                            onClick={() => setActiveEvent(event.id)}
                                                            className="bg-brand-blue text-white text-sm md:text-base py-2 px-6 rounded-full hover:bg-brand-purple hover:scale-105 transition-all duration-300 w-fit ml-auto"
                                                        >
                                                            See More Images
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Mobile Carousel */}
                                <div className="lg:hidden flex overflow-x-auto gap-6 px-4 py-6 mb-4 scrollbar-hide snap-x snap-mandatory w-full">
                                    {events2025Data.map((evt) => (
                                        <div
                                            key={evt.id}
                                            className="min-w-[85%] md:min-w-[55%] snap-center p-4 pb-0 border border-gray-300 shadow-lg rounded-xl flex flex-col bg-white overflow-hidden"
                                        >
                                            <img src={evt.img} alt={evt.id} className="rounded-lg w-full h-[260px] object-cover mb-4" loading='lazy' />
                                            <div className="flex flex-col gap-2 pb-4">
                                                {/* Event Name Badge */}
                                                <div className="inline-flex items-center gap-2 w-fit">
                                                    <span className="px-3 py-1 bg-brand-blue/10 text-brand-blue text-xs font-semibold rounded-full border border-brand-blue/20">
                                                        {evt.eventName}
                                                    </span>
                                                </div>

                                                <h5 className="text-base md:text-xl font-semibold text-gray-800 leading-tight">{evt.title}</h5>
                                                <div className="flex flex-col gap-2 justify-start item-center text-sm">
                                                    <div className="flex items-center gap-2 mt-2">
                                                        <IoLocationOutline className="h-5 w-5 text-gray-600" />
                                                        <p className="text-gray-600">{evt.location}</p>
                                                    </div>
                                                    <div className="flex items-center gap-2 pl-0.5">
                                                        <FontAwesomeIcon icon={faCalendar} className="h-4 w-4 text-gray-600 text-sm" />
                                                        <p className="text-gray-600">{evt.date}</p>
                                                    </div>
                                                    <button
                                                        onClick={() => setActiveEvent(evt.id)}
                                                        className="bg-brand-blue text-white text-sm md:text-base py-2 px-6 rounded-lg hover:bg-brand-purple hover:scale-105 transition-all duration-300 w-full mt-2"
                                                    >
                                                        See More Images
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Image Modal */}
                    {!isMobile && activeEvent && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.7 }}
                            className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/40"
                            onClick={() => setActiveEvent(null)}
                        >
                            <div
                                className="relative w-full h-[600px] max-w-6xl my-auto"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <button
                                    className="absolute top-1 right-2 text-xl font-bold p-2 rounded-full bg-gray-200 text-red-700 hover:scale-110 transition duration-300 ease-in-out z-10"
                                    onClick={() => setActiveEvent(null)}
                                    aria-label="Close"
                                >
                                    <RxCross1 />
                                </button>

                                <h2 className="md:text-4xl text-center font-semibold mb-12 text-gray-50">
                                    {events.find((e) => e.id === activeEvent)?.title}
                                </h2>

                                <EventCarousel images={imageMap[activeEvent]} />
                            </div>
                        </motion.div>
                    )}

                    {/* Mobile Image Modal */}
                    {isMobile && activeEvent && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.7 }}
                            className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/40"
                            onClick={() => setActiveEvent(null)}
                        >
                            <div
                                className="relative w-full h-[600px] max-w-6xl my-auto"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <button
                                    className="absolute top-1 right-2 text-xl font-bold p-2 rounded-full bg-gray-200 text-red-700 hover:scale-110 transition duration-300 ease-in-out z-10"
                                    onClick={() => setActiveEvent(null)}
                                    aria-label="Close"
                                >
                                    <RxCross1 />
                                </button>

                                <h2 className="md:text-4xl text-center font-semibold mb-12 text-gray-50">
                                    {events.find((e) => e.id === activeEvent)?.title}
                                </h2>

                                <EventCarousel images={imageMap[activeEvent]} />
                            </div>
                        </motion.div>
                    )}

                </div>
            </section>


            {/* FAQ Section */}

            < div className="pt-16 md:pt-32 lg:pt-16 px-8 pb-40 md:pb-[220px] lg:px-24 bg-gray-50" >
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

            < div className="relative" >
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
