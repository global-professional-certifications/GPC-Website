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
import iiaDelhiFlyer from "../../assets/IIA_Delhi_flyer.png"
import { RxCross1 } from "react-icons/rx";
import iiaHyderabadOne from "../../assets/iia-hyderabad/iia-hyderabad-1.webp"
import agmIiaDelhiChapter from "../../assets/AGM-IIA-Delhi/AGM-IIA-Delhi-7-events.webp"
import { Helmet } from 'react-helmet-async';

// Hi there

// <p onClick={() => setActiveEvent("hyderabad")} className="absolute top-1 left-1 rounded-lg tracking-wide uppercase px-1.5 py-1 bg-gray-100 text-xs font-bold text-black cursor-pointer">Click here for more photos</p>

import { iiaBangaloreImages, iiaKolkataImages, iiaBombayImages, wofaImages, iiaHyderabadImages, agmIIADelhiChapterImages } from "../../../eventImages";
import EventCarousel from "../Carousels/EventCarousel";


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


            <section className="mt-4 mb-8 md:mt-20 md:mb-20 grid grid-cols-1 md:grid-cols-2 max-w-[77rem] mx-auto text-[#141418] px-4 md:px-0">
                <div className="mb-6 md:mb-0">
                    <img src={iiaEvent} className="rounded-lg h-auto md:h-[600px] mx-auto md:ml-16" alt="Event image" />
                </div>
                <div className="flex flex-col gap-4 md:gap-6">
                    <button className="px-3 py-1.5 bg-[#EFECFF] text-[#5033FF] w-[8rem] border border-[#5033FF] rounded-lg text-xs md:text-sm font-bold hover:text-brand-purple hover:border-brand-purple transition duration-300">
                        OUR EVENTS
                    </button>
                    <h3 className="text-2xl md:text-4xl font-bold">Our Event Presence: Why It Matters</h3>
                    <p className="font-bold text-base md:text-lg text-[#444444]">
                        At Global Professional Certifications, we don't just talk about growth, we live it. Our active presence at industry-leading conferences, training programs, and networking forums across the globe reflects our commitment to staying ahead of the curve and bringing real-world insights to the professionals we serve.
                    </p>
                    <div className="grid grid-cols-2 gap-6 md:gap-10">
                        <div className="flex flex-col w-full gap-4 md:border-r md:border-r-4 md:border-r-gray-200">
                            <FaHandshakeAngle className="h-16 w-16 md:h-20 md:w-20 bg-[#EFECFF] p-3 rounded-xl hover:text-brand-purple transition duration-300" />
                            <p className="text-lg md:text-xl font-bold">Listen to our Mentor</p>
                        </div>
                        <div className="flex flex-col gap-4">
                            <MdTipsAndUpdates className="h-16 w-16 md:h-20 md:w-20 bg-[#EFECFF] p-3 rounded-xl hover:text-brand-purple transition duration-300" />
                            <p className="text-lg md:text-xl font-bold">Get latest updates</p>
                        </div>
                    </div>
                    <p className="text-[#444444] font-semibold text-sm md:text-base">
                        Joining us at events isn't just about attending, it is about engaging, evolving, and becoming part of a powerful global community.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 md:gap-6">
                        <button className="px-4 py-2 md:px-6 md:py-3 bg-brand-blue hover:bg-brand-purple text-gray-50 text-base md:text-lg rounded-lg font-semibold transition duration-300 ease-in-out">
                            <Link to="/contact">JOIN US</Link>
                        </button>
                        <div className="flex gap-2 items-center">
                            <div className="h-12 w-12 md:h-14 md:w-14 bg-brand-purple rounded-full flex items-center justify-center hover:bg-brand-blue transition duration-300">
                                <FiPhone className="h-6 w-6 md:h-8 md:w-8 text-white" />
                            </div>
                            <div className="flex flex-col">
                                <p className="text-sm md:text-base">Call us:</p>
                                <p className="font-bold text-sm md:text-md">+918736083099</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <div className="bg-[url('assets/bg.jpg')]">
                <section className="flex flex-col items-center max-w-[77rem] mx-auto gap-6 py-20">
                    <button className="px-4 py-1.5 bg-[#EFECFF] text-[#5033FF] border border-[#5033FF] rounded-md text-sm font-bold hover:text-brand-purple hover:border-brand-purple transition duration-300">OUR PAST EVENTS</button>
                    <h4 className="text-2xl text-center px-8 md:px-0 md:text-5xl font-bold">A Look Back at the Events That Shaped Us</h4>
                    <p className="px-4 md:px-0 md:w-[600px] text-center text-[#444444] md:text-xl">From insightful keynotes to candid behind-the-scenes moments, our photo gallery captures the energy, learning, and connections from every event we've been a part of</p>
                    {!isMobile ? <div className="max-w-[1000px] flex justify-center gap-3 py-8 px-14 rounded-full border border-gray-300 bg-white shadow-md text-[#141418] mb-10">
                        {events.map((evt) => {
                            return (
                                <button 
                                key={evt.id}
                                onClick={() => setActiveEvent(evt.id)}
                                className="px-4 py-2 rounded-full bg-[#F0F0F0] hover:bg-brand-purple hover:text-gray-50 font-bold transition duration-300 ease-in-out">
                                    {evt.title}
                                </button>
                            )
                        })}
                    </div> : null}

                    {activeEvent && (
                        <motion.div 
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                        transition={{duration: 0.7}}
                        className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/40"
                        onClick={() => setActiveEvent(null)}>
                            <div className="relative w-full h-[600px] max-w-6xl my-auto"
                            onClick={(e) => e.stopPropagation()}>
                                <button className="absolute top-1 right-2 text-xl font-bold p-2 rounded-full bg-gray-200 text-red-700 hover:scale-110 transition duration-300 ease-in-out"
                                onClick={() => setActiveEvent(null)}
                                aria-label="Close"
                                > <RxCross1 /> </button>
                                <h2 className="md:text-4xl text-center font-semibold mb-12 text-gray-50">
                                    {events.find((e) => e.id === activeEvent)?.title}
                                </h2>
                                    {/* <button className="px-8 py-3 bg-[#EFECFF] text-[#5033FF] border border-[#5033FF] rounded-lg md:text-3xl font-bold hover:text-brand-purple hover:border-brand-purple transition duration-300 mx-auto">
                                        {events.find((e) => e.id === activeEvent)?.title}</button>
                                    <button className="text-xl font-bold p-2 rounded-full bg-gray-200 text-red-700 hover:scale-110 transition duration-300 ease-in-out"
                                    onClick={() => setActiveEvent(null)}
                                    aria-label="Close"
                                    > <RxCross1 /> </button> */}
                                <EventCarousel images={imageMap[activeEvent]}/>
                            </div>
                        </motion.div>
                    )}

                    <div className="p-8 border border-gray-300 shadow-lg rounded-xl">
                        <div className="flex flex-col md:flex-row gap-8 max-w-[77rem] items-center relative"> 
                            <img src={iiaHyderabadOne} className="rounded-xl"></img>
                            {!isMobile ? <p onClick={() => setActiveEvent("hyderabad")} className="absolute top-1 left-1 rounded-lg tracking-wide uppercase px-1.5 py-1 bg-gray-100 text-xs font-bold text-black cursor-pointer hover:scale-y-105 transition-all duration-100 ease-in-out">Click here for more photos</p> : null}
                            <div className="flex flex-col gap-4">
                                <h5 className="text-lg md:text-3xl font-bold text-[#141418]">At the IIA Hyderabad Chapter event, we connected with insightful audit professionals to exchange perspectives on the evolving landscape of internal audit and risk management.</h5>
                                <div className="flex flex-col md:flex-row gap-4 md:gap-10">
                                    <div className="flex gap-1">
                                        <IoLocationOutline className="h-6 w-6 text-brand-blue"/>
                                        <p className="font-bold text-[#444444]">Hyderabad, Telengana, India</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <BsCalendarDate className="h-6 w-6 text-brand-blue"/>
                                        <p className="font-bold text-[#444444]">24th May 2025</p>
                                    </div>
                                </div>
                                <p className="text-[#444444] md:text-lg">A convergence of ideas and expertise, the event underscored the evolving role of auditors in a rapidly changing world.</p>
                            </div>
                        </div>
                    </div>


                    <div className="p-8 border border-gray-300 shadow-lg rounded-xl">
                        <div className="flex flex-col md:flex-row gap-8 max-w-[77rem] items-center relative"> 
                            <img src={wofaBanner} className="rounded-xl"></img>
                            {!isMobile ? <p onClick={() => setActiveEvent("wofa")} className="absolute top-1 left-1 rounded-lg tracking-wide uppercase px-1.5 py-1 bg-gray-100 text-xs font-bold text-black cursor-pointer hover:scale-y-105 transition-all duration-100 ease-in-out">Click here for more photos</p> : null}
                            <div className="flex flex-col gap-4">
                                <h5 className="text-lg md:text-3xl font-bold text-[#141418]">We were proud to be a part of WOFA 2025, where leaders and changemakers came together to drive innovation and empowerment.</h5>
                                <div className="flex flex-col md:flex-row gap-4 md:gap-10">
                                    <div className="flex gap-1">
                                        <IoLocationOutline className="h-6 w-6 text-brand-blue"/>
                                        <p className="font-bold text-[#444444]">New Delhi, India</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <BsCalendarDate className="h-6 w-6 text-brand-blue"/>
                                        <p className="font-bold text-[#444444]">31st Jan 2025 - 2nd Feb 2025</p>
                                    </div>
                                </div>
                                <p className="text-[#444444] md:mb-[25px] md:text-lg">From powerful discussions to meaningful connections, the event was a celebration of global collaboration and forward thinking.</p>
                            </div>
                        </div>
                    </div>
                    <div className="p-8 border border-gray-300 shadow-lg rounded-xl">
                        <div className="flex flex-col md:flex-row gap-8 max-w-[77rem] items-center relative"> 
                            <img src={iiaKolkataBanner} className="rounded-xl w-[360px] h-[270px]"></img>
                            {!isMobile ? <p onClick={() => setActiveEvent("kolkata")} className="absolute top-1 left-1 rounded-lg tracking-wide uppercase px-1.5 py-1 bg-gray-100 text-xs font-bold text-black cursor-pointer hover:scale-y-105 transition-all duration-100 ease-in-out">Click here for more photos</p> : null}
                            <div className="flex flex-col gap-4">
                                <h5 className="text-lg md:text-3xl font-bold text-[#141418]">We engaged with leading internal audit professionals at the IIA Kolkata Chapter event, exploring emerging trends in governance and risk.</h5>
                                <div className="flex flex-col md:flex-row gap-4 md:gap-10">
                                    <div className="flex gap-1">
                                        <IoLocationOutline className="h-6 w-6 text-brand-blue"/>
                                        <p className="font-bold text-[#444444]">Kolkata, West Bengal, India</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <BsCalendarDate className="h-6 w-6 text-brand-blue"/>
                                        <p className="font-bold text-[#444444]">10th Feb 2025</p>
                                    </div>
                                </div>
                                <p className="text-[#444444] md:mb-[25px] md:text-lg">The sessions fostered meaningful dialogue and highlighted the evolving role of auditors in today's dynamic landscape.</p>
                            </div>
                        </div>
                    </div>
                    <div className="p-8 border border-gray-300 shadow-lg rounded-xl">
                        <div className="flex flex-col md:flex-row gap-8 max-w-[77rem] items-center relative"> 
                            <img src={iiaBengaluruBanner} className="rounded-xl"></img>
                            {!isMobile ? <p onClick={() => setActiveEvent("bangalore")} className="absolute top-1 left-1 rounded-lg tracking-wide uppercase px-1.5 py-1 bg-gray-100 text-xs font-bold text-black cursor-pointer hover:scale-y-105 transition-all duration-100 ease-in-out">Click here for more photos</p> : null}
                            <div className="flex flex-col gap-4">
                                <h5 className="text-lg md:text-3xl font-bold text-[#141418]">At the IIA Bengaluru Chapter conference, we participated in insightful discussions on innovation in internal auditing.</h5> 
                                <div className="flex flex-col md:flex-row gap-4 md:gap-10">
                                    <div className="flex gap-1">
                                        <IoLocationOutline className="h-6 w-6 text-brand-blue"/>
                                        <p className="font-bold text-[#444444]">Bengaluru, Karnataka, India</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <BsCalendarDate className="h-6 w-6 text-brand-blue"/>
                                        <p className="font-bold text-[#444444]">19th Feb 2025</p>
                                    </div>
                                </div>
                                <p className="text-[#444444] md:mb-[25px] md:text-lg">The event brought together experts and thought leaders, creating a powerful platform for knowledge exchange and collaboration.</p>
                            </div>
                        </div>
                    </div>
                    <div className="p-8 border border-gray-300 shadow-lg rounded-xl">
                        <div className="flex flex-col md:flex-row gap-8 max-w-[77rem] items-center relative"> 
                            <img src={iiaMumbaiBanner} className="rounded-xl"></img>
                            {!isMobile ? <p onClick={() => setActiveEvent("mumbai")} className="absolute bottom-1 left-1 rounded-lg tracking-wide uppercase px-1.5 py-1 bg-gray-100 text-xs font-bold text-black cursor-pointer hover:scale-y-105 transition-all duration-100 ease-in-out">Click here for more photos</p> : null}
                            <div className="flex flex-col gap-4">
                                <h5 className="text-lg md:text-3xl font-bold text-[#141418]">The IIA Mumbai Chapter event was a hub of ideas and industry insights, focused on enhancing audit excellence.</h5>
                                <div className="flex flex-col md:flex-row gap-4 md:gap-10">
                                    <div className="flex gap-1">
                                        <IoLocationOutline className="h-6 w-6 text-brand-blue"/>
                                        <p className="font-bold text-[#444444]">Mumbai, Maharashtra, India</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <BsCalendarDate className="h-6 w-6 text-brand-blue"/>
                                        <p className="font-bold text-[#444444]">5th March 2025</p>
                                    </div>
                                </div>
                                <p className="text-[#444444] md:mb-[25px] md:text-lg">We connected with professionals driving change and shared in the mission to elevate internal audit practices across sectors.</p>
                            </div>
                        </div>
                    </div>
                    <div className="p-8 border border-gray-300 shadow-lg rounded-xl">
                        <div className="flex flex-col md:flex-row gap-8 max-w-[77rem] items-center relative"> 
                            <img src={agmIiaDelhiChapter} className="rounded-xl"></img>
                            {!isMobile ? <p onClick={() => setActiveEvent("delhi")} className="absolute bottom-1 left-1 rounded-lg tracking-wide uppercase px-1.5 py-1 bg-gray-100 text-xs font-bold text-black cursor-pointer hover:scale-y-105 transition-all duration-100 ease-in-out">Click here for more photos</p> : null}
                            <div className="flex flex-col gap-4">
                                <h5 className="text-lg md:text-3xl font-bold text-[#141418]">
                                    At the AGM IIA Delhi Chapter, we collaborated with audit experts to discuss advancements and strategies for elevating internal audit practices.</h5>
                                <div className="flex flex-col md:flex-row gap-4 md:gap-10">
                                    <div className="flex gap-1">
                                        <IoLocationOutline className="h-6 w-6 text-brand-blue"/>
                                        <p className="font-bold text-[#444444]">New Delhi, India</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <BsCalendarDate className="h-6 w-6 text-brand-blue"/>
                                        <p className="font-bold text-[#444444]">18th July 2025</p>
                                    </div>
                                </div>
                                <p className="text-[#444444] md:mb-[25px] md:text-lg">The AGM IIA Delhi Chapter united audit professionals to share insights and strategies, advancing the future of internal auditing.</p>
                            </div>
                        </div>
                    </div>
                    
                </section>
            </div>

            {/* <section className="bg-[url('assets/bg.png')]">
                <div className="flex flex-col items-center max-w-[77rem] mx-auto gap-6 py-20">
                    <button className="px-4 py-1.5 bg-[#EFECFF] text-[#5033FF] border border-[#5033FF] rounded-md text-sm font-bold hover:text-brand-purple hover:border-brand-purple transition duration-300">UPCOMING EVENTS</button>
                    <h4 className="text-3xl md:text-5xl font-bold">A Glimpse Into What's Ahead</h4>
                    <p className="w-[750px] text-center text-[#444444] text-xl mb-6">  From thought-provoking conferences to engaging sessions and networking opportunities, our upcoming events promise to spark ideas, foster collaboration, and keep you at the forefront of innovation
                    </p>
                    <div className="flex gap-10 max-w-6xl border border-gray-300 rounded-xl p-8 shadow-lg">
                        <Link 
                        to="https://delhi.iiaindia.co/annual-conference/"
                        target="_blank"
                        >
                        <img src={iiaDelhiFlyer} className="h-[700px] rounded-md hover:scale-105 transition ease-in-out duration-300 cursor-pointer"></img>
                        </Link>
                    </div>
                </div>
            </section> */}
        </>
    )
}