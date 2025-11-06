import React, {useState, useCallback, useEffect, act} from "react";
import { IoLocationOutline } from "react-icons/io5";
import { FaHandshakeAngle } from "react-icons/fa6";
import { MdTipsAndUpdates } from "react-icons/md";
import { Link} from "react-router-dom";
import iiaEvent from "../../assets/iia-event.jpeg";
import { FiPhone } from "react-icons/fi";
import { BsCalendarDate } from "react-icons/bs";
import wofaBanner from "../../assets/wofa-banner.webp";
import iiaKolkataBanner from "../../assets/iia-kolkata-banner.webp";
import iiaBengaluruBanner from "../../assets/iia-bengaluru-banner.webp";
import iiaMumbaiBanner from "../../assets/iia-mumbai-banner.webp";
import MetaTags from "../MetaTags";
import { motion } from "motion/react";
import { RxCross1 } from "react-icons/rx";
import iiaHyderabadOne from "../../assets/iia-hyderabad/iia-hyderabad-1.webp"
import agmIiaDelhiChapter from "../../assets/AGM-IIA-Delhi/AGM-IIA-Delhi-7-events.webp"
import { Helmet } from 'react-helmet-async';
import FAQDisplay from "../FAQDisplay.jsx";
import faqImage from "../../assets/our-mission-1.webp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { faClock, faCalendar } from "@fortawesome/free-regular-svg-icons";
import Countdown from "react-countdown";
import eventThumbnail from '../../assets/event-thumbnail.png'
import { iiaBangaloreImages, iiaKolkataImages, iiaBombayImages, wofaImages, iiaHyderabadImages, agmIIADelhiChapterImages } from "../../../eventImages";
import EventCarousel from "../Carousels/EventCarousel";

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


export default function Events(){

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
        }
    ]

    const imageMap = {
        mumbai: iiaBombayImages,
        bangalore: iiaBangaloreImages,
        kolkata: iiaKolkataImages,
        wofa: wofaImages,
        hyderabad: iiaHyderabadImages,
        delhi: agmIIADelhiChapterImages,
    }

    const [activeEvent, setActiveEvent] = useState(null)

    const handleEscapeKey = useCallback((event) => {
        if (event.key === "Escape"){
            setActiveEvent(null)
        }
    }, [])

    // to lock scroll and listen for escape key when modal is open

    // absolute top-1 right-2

    useEffect(() => {
        if (activeEvent){
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

    const eventDate = new Date("2025-11-15T18:59:59");
    const eventCard = {
        title: "Title of the event",
        date: "15",
        month: "Nov",
        time: "8:00 pm",
        venue: "Virtual Event (Zoom Session)",
        thumbnail: eventThumbnail
    }

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

            {!isMobile ? <div className="">
                <div className="relative flex h-screen bg-[url('assets/iia-conference.jpg')] bg-cover bg-center">
                    
                    {/* Dark overlay */} 
                    <div className="absolute inset-0 bg-black opacity-50"></div>

                    <motion.p
                        animate={{scale: [1, 1.3, 1]}}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        className="absolute bottom-[2rem] text-white text-center left-[45%] font-bold">
                            Scroll down to view our events 
                    </motion.p>
                </div>
            </div> : <div className="mt-[130px] flex justify-center items-center h-[80px]">
                <p className="text-brand-blue px-2 text-2xl font-bold">Walk with us through our Events!</p>
            </div>}

            {/* Upcoming Events Countdown*/}

            <section className="w-full py-24 px-6 md:px-32">
                <div className="[background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)] w-full h-auto rounded-3xl shadow-xl px-12 md:px-24 py-8 md:py-16">
                    <div className="w-full text-white flex flex-col jsutify-center items-center md:items-start gap-2 mb-2 md:mb-12">
                        <h2 className="text-2xl md:text-4xl lg:text-4xl font-bold">Upcoming <span className="text-[#FFD700] font-normal italic">Events</span>
                        </h2>
                        <p className="text-xs md:text-base lg:text-base max-w-md font-light text-gray-300 font-poppins mt-2 md:mt-4 text-center md:text-left">
                            Stay ahead with the latest industry updates! <span className="hidden md:block">Our globally recognized sessions are designed to guide you at every step.</span>
                        </p>
                    </div>
                    <div className="flex flex-col md:flex-row justify-center md:justify-between items-center gap-12 p-8">
                        <div className="flex flex-col justify-between items-center bg-white w-[300px] md:w-[400px] h-auto shadow-xl shadow-gray-400 rounded-3xl">
                            <div className="w-full h-48 md:h-64 rounded-3xl shadow-black/40 shadow-lg">
                                <img src={eventCard.thumbnail} alt="" className="w-full h-full object-cover rounded-2xl" />
                            </div>
                            <div className="flex flex-col justify-center p-6 text-gray-800">
                                <p className="text-left text-lg leading-tight md:text-3xl mb-4 font-bold">{eventCard.title}</p>

                                <div className="flex justify-start items-stretch gap-8 mt-2 md:mt-6 px-2 md:px-6">
                                    {/* date */}

                                    <div className="flex flex-col justify-center items-center">
                                        <p className="text-sm md:text-2xl font-light">{eventCard.month}</p>
                                        <p className="text-3xl md:text-5xl font-bold">{eventCard.date}</p>
                                    </div>

                                    {/* line */}

                                    <div className="h-auto w-0.5 bg-gray-800"></div>

                                    {/* location and time */}

                                    <div className="flex flex-col justify-center gap-2">
                                        <div className="flex justify-start">
                                            <div>
                                                <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                                            </div>
                                            <p className="pl-2 text-sm md:text-base">{eventCard.venue}</p>
                                        </div>
                                        <div className="flex justify-start">
                                            <div>
                                                <FontAwesomeIcon icon={faClock} className="font-light" />
                                            </div>
                                            <p className="pl-2 text-sm md:text-base">Starts at {eventCard.time}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className="flex flex-col gap-1 md:gap-8 justify-center items-center">
                            <p className="text-2xl md:text-4xl font-light text-[#FFD700]">Event starts in</p>
                            <div className="p-2 md:p-6">
                                <Countdown
                                    date={eventDate}
                                    renderer={({ days, hours, minutes, seconds }) => (
                                        <div className="text-white flex justify-center items-center gap-1 md:gap-2">
                                            <div className="p-6 md:p-4 h-12 w-12 md:h-20 md:w-20 flex flex-col justify-center items-center border border-gray-400 rounded-xl md:rounded-2xl shadow-xl shadow-gray-800">
                                                <p className="font-bold text-base md:text-2xl">{days}</p>
                                                <p className="text-[8px] md:text-xs font-light">Days</p>
                                            </div>
                                            <p className="text-3xl md:text-5xl font-bold">:</p>
                                            <div className="p-6 md:p-4 h-12 w-12 md:h-20 md:w-20 flex flex-col justify-center items-center border border-gray-400 rounded-xl md:rounded-2xl shadow-xl shadow-gray-800">
                                                <p className="font-bold text-base md:text-2xl">{hours}</p>
                                                <p className="text-[8px] md:text-xs font-light">Hours</p>
                                            </div>
                                            <p className="text-3xl md:text-5xl font-bold">:</p>
                                            <div className="p-6 md:p-4 h-12 w-12 md:h-20 md:w-20 flex flex-col justify-center items-center border border-gray-400 rounded-xl md:rounded-2xl shadow-xl shadow-gray-800">
                                                <p className="font-bold text-base md:text-2xl">{minutes}</p>
                                                <p className="text-[8px] md:text-xs font-light">Minutes</p>
                                            </div>
                                            <p className="text-3xl md:text-5xl font-bold">:</p>
                                            <div className="p-6 md:p-4 h-12 w-12 md:h-20 md:w-20 flex flex-col justify-center items-center border border-gray-400 rounded-xl md:rounded-2xl shadow-xl shadow-gray-800">
                                                <p className="font-bold text-base md:text-2xl">{seconds}</p>
                                                <p className="text-[8px] md:text-xs font-light">Seconds</p>
                                            </div>
                                        </div>
                                    )}
                                />

                            </div>
                            <p className="text-xs px-2 md:text-lg leading-tight font-light text-white text-center max-w-xl mt-6 md:mt-12">Lorem ipsum dolor, sit amet consectetur adipisicing elit. At architecto blanditiis adipisci aperiam animi a tempore, illo dignissimos officiis quae illum, atque, aliquam vel voluptate veniam labore! Eius fugit, sequi in veritatis hic cum.</p>
                            <a
                                href=""
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-fit border border-gray-400 text-white text-sm sm:text-base py-2 px-5 sm:px-6 rounded-full hover:bg-brand-purple hover:scale-105 transition-all duration-300 mt-6 md:mt-2 shadow-md shadow-gray-400"
                            >
                                Register Now
                            </a>
                        </div>

                    </div>
                </div>
            </section>

            {/* Our Event Presence */}

            <section className="w-full pb-10 px-6 md:px-16 lg:px-24 xl:px-32">
                <div className="flex flex-col flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-20">

                    {/* Image Section */}
                    <div className="w-full h-auto md:h-[700px] lg:w-1/2 flex justify-center">
                        <img
                            src={iiaEvent}
                            alt="Event image"
                            className="rounded-2xl w-auto h-full object-cover shadow-lg"
                        />
                    </div>

                    {/* Text Section */}
                    <div className="w-full lg:w-1/2 flex flex-col justify-start gap-8">

                        {/* Heading + Paragraph */}
                        <div>
                            <h3 className="text-2xl md:text-4xl lg:text-4xl font-bold text-center lg:text-left leading-snug">
                                Our Event Presence:{" "}
                                <span className="text-brand-blue font-normal italic">Why It Matters</span>
                            </h3>
                            <p className="text-gray-600 text-xs md:text-base font-poppins leading-relaxed mt-6 text-center md:text-left max-w-2xl mx-auto lg:mx-0 px-4 md:px-0">
                                At Global Professional Certifications, we don't just talk about growth — we live it. Our active presence at industry-leading conferences, training programs, and networking forums across the globe reflects our commitment to staying ahead of the curve and bringing real-world insights to the professionals we serve.
                            </p>
                        </div>

                        {/* Two-column grid */}
                        <div className="flex justify-center gap-4 md:gap-12 py-6 md:py-8">
                            <div className="flex flex-col items-center gap-4">
                                <FaHandshakeAngle className="h-14 w-14 sm:h-16 sm:w-16 md:h-20 md:w-20 bg-[#EFECFF] p-3 rounded-xl text-brand-blue" />
                                <p className="text-sm sm:text-base md:text-lg font-semibold font-poppins text-center lg:text-left">
                                    Listen to our Mentor
                                </p>
                            </div>
                            <div className="h-auto w-[1.2px] md:w-[1.5px] bg-gray-400"></div>
                            <div className="flex flex-col items-center gap-4">
                                <MdTipsAndUpdates className="h-14 w-14 sm:h-16 sm:w-16 md:h-20 md:w-20 bg-[#EFECFF] p-3 rounded-xl text-brand-blue" />
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
                                className="bg-brand-blue text-white text-sm sm:text-base md:text-lg py-3 px-6 rounded-full hover:bg-brand-purple transition-all duration-300 shadow-md"
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

            <section className="bg-white">
                <div className="flex flex-col items-center max-w-[77rem] mx-auto gap-6 py-4 md:py-16">

                    <div className="flex flex-col gap-2 justify-center items-center p-4 md:mb-6">
                        <p className="text-2xl md:text-4xl lg:text-4xl text-center font-bold">
                            A Look Back: <span className="text-brand-blue font-normal italic">Past Events</span>
                        </p>
                        <p className="text-xs md:text-base lg:text-base font-poppins leading-relaxed max-w-3xl text-center text-gray-600 mt-6 px-8 md:px-0">
                            Explore highlights from our flagship events, including IIA Hyderabad, WOFA 2025, and more
                        </p>
                    </div>

                    {!isMobile ? (
                        <div className="max-w-[1000px] flex justify-center gap-3 py-8 px-14 rounded-full border border-gray-300 bg-white shadow-md text-[#141418] mb-10">
                            {events.map((evt) => {
                                return (
                                    <button
                                        key={evt.id}
                                        onClick={() => setActiveEvent(evt.id)}
                                        className="px-4 py-2 rounded-full bg-[#F0F0F0] hover:bg-brand-purple hover:text-gray-50 font-bold transition duration-300 ease-in-out"
                                    >
                                        {evt.title}
                                    </button>
                                );
                            })}
                        </div>
                    ) : null}

                    {activeEvent && (
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
                                    className="absolute top-1 right-2 text-xl font-bold p-2 rounded-full bg-gray-200 text-red-700 hover:scale-110 transition duration-300 ease-in-out"
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

                    {/*  Desktop  */}

                    <div className="hidden md:flex flex-col gap-6 w-full">
                        {[
                            {
                                id: "hyderabad",
                                img: iiaHyderabadOne,
                                title:
                                    "At the IIA Hyderabad Chapter event, we connected with insightful audit professionals to exchange perspectives on the evolving landscape of internal audit and risk management.",
                                loc: "Hyderabad, Telengana, India",
                                date: "24th May 2025",
                                desc: "A convergence of ideas and expertise, the event underscored the evolving role of auditors in a rapidly changing world.",
                            },
                            {
                                id: "wofa",
                                img: wofaBanner,
                                title:
                                    "We were proud to be a part of WOFA 2025, where leaders and changemakers came together to drive innovation and empowerment.",
                                loc: "New Delhi, India",
                                date: "31st Jan 2025 - 2nd Feb 2025",
                                desc: "From powerful discussions to meaningful connections, the event was a celebration of global collaboration and forward thinking.",
                            },
                            {
                                id: "kolkata",
                                img: iiaKolkataBanner,
                                title:
                                    "We engaged with leading internal audit professionals at the IIA Kolkata Chapter event, exploring emerging trends in governance and risk.",
                                loc: "Kolkata, West Bengal, India",
                                date: "10th Feb 2025",
                                desc: "The sessions fostered meaningful dialogue and highlighted the evolving role of auditors in today's dynamic landscape.",
                            },
                            {
                                id: "bangalore",
                                img: iiaBengaluruBanner,
                                title:
                                    "At the IIA Bengaluru Chapter conference, we participated in insightful discussions on innovation in internal auditing.",
                                loc: "Bengaluru, Karnataka, India",
                                date: "19th Feb 2025",
                                desc: "The event brought together experts and thought leaders, creating a powerful platform for knowledge exchange and collaboration.",
                            },
                            {
                                id: "mumbai",
                                img: iiaMumbaiBanner,
                                title:
                                    "The IIA Mumbai Chapter event was a hub of ideas and industry insights, focused on enhancing audit excellence.",
                                loc: "Mumbai, Maharashtra, India",
                                date: "5th March 2025",
                                desc: "We connected with professionals driving change and shared in the mission to elevate internal audit practices across sectors.",
                            },
                            {
                                id: "delhi",
                                img: agmIiaDelhiChapter,
                                title:
                                    "At the AGM IIA Delhi Chapter, we collaborated with audit experts to discuss advancements and strategies for elevating internal audit practices.",
                                loc: "New Delhi, India",
                                date: "18th July 2025",
                                desc: "The AGM IIA Delhi Chapter united audit professionals to share insights and strategies, advancing the future of internal auditing.",
                            },
                        ].map((event) => (
                            <div key={event.id} className="p-12 border border-gray-300 shadow-lg rounded-xl w-full">
                                <div className="flex flex-col md:flex-row gap-8 w-full h-[18rem] items-center">
                                    <img src={event.img} className="rounded-xl w-auto h-[16rem]" />

                                    <div className="flex flex-col gap-4">
                                        <h5 className="text-3xl font-bold">
                                            {event.title}
                                        </h5>
                                        <p className="text-gray-600 text-base">
                                            {event.desc}
                                        </p>
                                        <div className="flex justify-start items-center gap-10">
                                            <div className="flex justify-center items-center gap-2">
                                                <IoLocationOutline className="h-6 w-6 text-gray-600" />
                                                <p className="text-gray-600">{event.loc}</p>
                                            </div>
                                            <div className="flex justify-center items-center gap-2">
                                                <FontAwesomeIcon icon={faCalendar} className="h-5 w-5 text-gray-600 text-sm" />
                                                <p className="text-gray-600">{event.date}</p>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => setActiveEvent(event.id)}
                                            className="bg-brand-blue text-white text-sm md:text-base py-2 px-6 rounded-full hover:bg-brand-purple hover:scale-105 transition-all duration-300 w-fit"
                                        >
                                            See More Images
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>


                    {/* Mobile Carousel */}
                    <div className="md:hidden flex overflow-x-auto gap-6 px-4 py-6 mb-4 scrollbar-hide snap-x snap-mandatory w-full">
                        {[
                            {
                                id: "hyderabad",
                                img: iiaHyderabadOne,
                                location: "Hyderabad, Telengana, India",
                                date: "24th May 2025",
                                desc: "At the IIA Hyderabad Chapter event, we connected with insightful audit professionals to exchange perspectives on the evolving landscape of internal audit and risk management.",
                                text: "A convergence of ideas and expertise, the event underscored the evolving role of auditors in a rapidly changing world.",
                            },
                            {
                                id: "wofa",
                                img: wofaBanner,
                                location: "New Delhi, India",
                                date: "31st Jan 2025 - 2nd Feb 2025",
                                desc: "We were proud to be a part of WOFA 2025, where leaders and changemakers came together to drive innovation and empowerment.",
                                text: "From powerful discussions to meaningful connections, the event was a celebration of global collaboration and forward thinking.",
                            },
                            {
                                id: "kolkata",
                                img: iiaKolkataBanner,
                                location: "Kolkata, West Bengal, India",
                                date: "10th Feb 2025",
                                desc: "We engaged with leading internal audit professionals at the IIA Kolkata Chapter event, exploring emerging trends in governance and risk.",
                                text: "The sessions fostered meaningful dialogue and highlighted the evolving role of auditors in today's dynamic landscape.",
                            },
                            {
                                id: "bangalore",
                                img: iiaBengaluruBanner,
                                location: "Bengaluru, Karnataka, India",
                                date: "19th Feb 2025",
                                desc: "At the IIA Bengaluru Chapter conference, we participated in insightful discussions on innovation in internal auditing.",
                                text: "The event brought together experts and thought leaders, creating a powerful platform for knowledge exchange and collaboration.",
                            },
                            {
                                id: "mumbai",
                                img: iiaMumbaiBanner,
                                location: "Mumbai, Maharashtra, India",
                                date: "5th March 2025",
                                desc: "The IIA Mumbai Chapter event was a hub of ideas and industry insights, focused on enhancing audit excellence.",
                                text: "We connected with professionals driving change and shared in the mission to elevate internal audit practices across sectors.",
                            },
                            {
                                id: "delhi",
                                img: agmIiaDelhiChapter,
                                location: "New Delhi, India",
                                date: "18th July 2025",
                                desc: "At the AGM IIA Delhi Chapter, we collaborated with audit experts to discuss advancements and strategies for elevating internal audit practices.",
                                text: "The AGM IIA Delhi Chapter united audit professionals to share insights and strategies, advancing the future of internal auditing.",
                            },
                        ].map((evt) => (
                            <div
                                key={evt.id}
                                className="min-w-[85%] snap-center p-4 border border-gray-300 shadow-lg rounded-xl flex flex-col gap-4 bg-white"
                            >
                                <img src={evt.img} alt={evt.id} className="rounded-lg w-full h-[260px] object-cover" />
                                <div className="flex flex-col justify-between h-[240px] gap-2">
                                    <h5 className="text-base font-semibold text-gray-800 leading-tight">{evt.desc}</h5>
                                    <div className="flex flex-col gap-2 justify-start item-center text-sm">
                                        <div className="flex items-center gap-2 mt-4">
                                            <IoLocationOutline className="h-5 w-5 text-gray-600" />
                                            <p className="text-gray-600">{evt.location}</p>
                                        </div>
                                        <div className="flex items-center gap-2 pl-0.5">
                                            <FontAwesomeIcon icon={faCalendar} className="h-4 w-4 text-gray-600 text-sm" />
                                            <p className="text-gray-600">{evt.date}</p>
                                        </div>
                                        <button
                                            onClick={() => setActiveEvent(event.id)}
                                            className="bg-brand-blue text-white text-sm md:text-base py-2 px-6 rounded-lg hover:bg-brand-purple hover:scale-105 transition-all duration-300 w-full"
                                        >
                                            See More Images
                                        </button>
                                    </div>

                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </section>


            {/* FAQ Section */}

            < div className="pt-16 px-8 pb-40 md:pb-[220px] lg:px-24 bg-gray-50" >
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