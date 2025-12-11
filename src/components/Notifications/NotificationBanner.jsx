import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BsLightbulbFill } from "react-icons/bs"
import { motion } from "motion/react";

export default function NotificationBanner() {


    const [isMobile, setIsMobile] = useState(false)
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768)
        }

        handleResize()
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [window.innerWidth])

    return (
        <div className="fixed top-0 left-0 w-screen bg-brand-blue text-white flex items-center justify-center text-center h-12 z-50 transition-colors duration-300">
            <div className="w-full">
                {!isMobile
                    ?
                    <div className="md:text-sm text-xs md:p-0 px-8 font-semibold md:text-base">
                        <BsLightbulbFill className="inline text-yellow-400 mr-1 pb-1 h-4 w-4 md:h-6 md:h-6" />Not sure how to start your CIA journey? Watch our<a href="https://youtu.be/qdnLecSFurU?si=0-A0Xnq7t__ixliV" target="_blank" className="border border-brand-purple border-1 rounded-lg p-1 m-1 hover:bg-brand-purple hover:text-white transition-all duration-300 transform ease-in-out">Orientation Program</a>for each part or<a href="/contact" className="border border-brand-purple border-1 rounded-lg p-1 m-1 hover:bg-brand-purple hover:text-white transition duration-300 ease-in-out">Contact Us</a>to get started!<BsLightbulbFill className="inline text-yellow-400 ml-1 pb-1 h-4 w-4 md:h-6 md:h-6" />
                    </div>
                    :
                    <p className="md:text-sm text-xs md:p-0 px-2 md:text-base leading-relaxed">
                        Explore our <Link to="https://youtu.be/XNnXkttYQUY?si=_LsRnwG4OWTeQdED" target="_blank" className="border border-brand-purple border-1 rounded-md p-1 hover:bg-brand-purple transition-all duration-300">youtube channel</Link> or <Link className="border border-brand-purple border-1 rounded-md p-1 hover:bg-brand-purple transition-all duration-300" to="/contact">contact us</Link> to get started!
                    </p>
                }
            </div>
        </div>
    );
};

export const height = 12;