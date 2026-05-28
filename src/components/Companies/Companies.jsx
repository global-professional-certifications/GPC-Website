import React from "react";

// Local logo imports removed. Now fetching dynamically from Sanity CMS.

// importing marquee
import Marquee from "../Marquee/Marquee";
import { getMarqueeLines } from "../../services/marquee.service";
import { useState, useEffect } from "react";

export default function Companies() {
    const [marqueeLines, setMarqueeLines] = useState([]);

    useEffect(() => {
        const loadMarquees = async () => {
            try {
                const data = await getMarqueeLines();
                if (data && data.length > 0) {
                    setMarqueeLines(data);
                }
            } catch (error) {
                console.error("Failed to load company marquees from CMS:", error);
            }
        };
        loadMarquees();
    }, []);



    return (
        <>
            <div className="py-12 md:max-w-3xl lg:max-w-6xl mx-auto flex flex-col items-center overflow-x-hidden">
                <div className="flex flex-col gap-2 justify-center items-center p-4 mb-20">
                    <h2 className="text-2xl md:text-4xl font-bold text-center">Join Thousands of <span className="text-brand-blue font-normal italic">Professionals</span> from <span className="text-brand-blue font-normal italic">Leading Companies</span>
                    </h2>
                    <p className="text-xs md:text-base lg:text-lg font-poppins text-center text-gray-600 mt-6 md:max-w-xl lg:max-w-6xl">
                        Trusted by professionals from top multinational corporations for CIA, CISA, CRMA, and IAP certifications
                    </p>
                </div>
                
                {marqueeLines.map((line, index) => {
                    const startVal = index % 2 === 0 ? 0 : "-100%";
                    const endVal = index % 2 === 0 ? "-100%" : 0;
                    return (
                        <div key={line._id || index} className={`container mx-auto ${index > 0 ? 'mt-2' : ''}`}>
                            <div className="flex">
                                <Marquee companies={line.companies} start={startVal} end={endVal} />
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
}
