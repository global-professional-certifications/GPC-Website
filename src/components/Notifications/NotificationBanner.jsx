import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { BsLightbulbFill } from "react-icons/bs"
import { motion } from "motion/react";

export default function NotificationBanner () {

    // bg -> #ffebcd
    // text-color -> #964b00
    // text-brown-700 font-semibold hover:underline

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
        <div className="fixed top-0 left-0 w-screen bg-brand-blue  text-white flex items-center justify-center text-center h-12 z-50">
            <div
            className="w-full">
                {!isMobile 
                    ? 
                    <div
                    className="md:text-sm text-xs md:p-0 px-8 font-semibold md:text-base">
                        <BsLightbulbFill className="inline text-yellow-700 mr-1 pb-1 h-4 w-4 md:h-6 md:h-6" />Not sure how to start your CIA journey? Watch our<a href="https://www.youtube.com/@global-professional-cert" target="_blank" className="border border-brand-purple border-1 rounded-lg p-1 m-1 hover:bg-brand-purple hover:text-white transition-all duration-300 transform ease-in-out">Orientation Program</a>for each part or<a href="/contact" className="border border-brand-purple border-1 rounded-lg p-1 m-1 hover:bg-brand-purple hover:text-white transition duration-300 ease-in-out">Contact Us</a>to get started!<BsLightbulbFill className="inline text-yellow-700 ml-1 pb-1 h-4 w-4 md:h-6 md:h-6" />
                    </div>
                    : 
                    <p className="md:text-sm text-xs md:p-0 px-2 md:text-base leading-relaxed">
                        Explore our <Link to="https://www.youtube.com/@global-professional-cert" target="_blank" className="border border-brand-purple border-1 rounded-md p-1 ">youtube channel</Link> or <Link className="border border-brand-purple border-1 rounded-md p-1" to="/contact">contact us</Link> to get started!
                    </p>
                }
            </div>
        </div>
    );
};

export const height = 12; // height of the notification banner