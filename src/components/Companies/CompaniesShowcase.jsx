import React from "react";

// Local logo imports removed. Now fetching dynamically from Sanity CMS.

// importing marquee
import Marquee from "../Marquee/Marquee";
import { getMarqueeLines } from "../../services/marquee.service";
import { useState, useEffect } from "react";


const CompaniesShowcase = (
    {
        titleStart,
        highlightOne,
        titleEnd,
        highlightTwo,
        description
    }
) => {
    const [marqueeLines, setMarqueeLines] = useState([]);

    useEffect(() => {
        const loadMarquees = async () => {
            try {
                const data = await getMarqueeLines();
                if (data && data.length > 0) {
                    setMarqueeLines(data);
                }
            } catch (error) {
                console.error("Failed to load company marquees from CMS in showcase:", error);
            }
        };
        loadMarquees();
    }, []);




    return (
        <section className="px-6 bg-gray-50 md:px-12 lg:px-20 py-12">
            <div className="md:max-w-3xl lg:max-w-6xl mx-auto flex flex-col items-center overflow-x-hidden">
                {/* Heading */}
                <div className="max-w-4xl text-center mb-12">
                    <h2 className="text-2xl md:text-4xl font-bold leading-tight text-gray-900 mb-6">
                        {titleStart}{" "}
                        <span className="text-brand-blue font-normal italic">
                            {highlightOne}{" "}
                        </span>
                        {titleEnd}{" "}
                        <span className="text-brand-blue font-normal italic">
                            {highlightTwo}
                        </span>
                    </h2>
                    <p className="max-w-3xl mx-auto text-gray-600 text-xs md:text-base font-poppins leading-relaxed">
                        {description}
                    </p>
                </div>

                {marqueeLines.map((line, index) => {
                    const startVal = index % 2 === 0 ? 0 : "-100%";
                    const endVal = index % 2 === 0 ? "-100%" : 0;
                    return (
                        <div key={line._id || index} className={`container mx-auto ${index > 0 ? 'mt-8' : ''}`}>
                            <div className="flex myGradient ">
                                <Marquee companies={line.companies} start={startVal} end={endVal} />
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default CompaniesShowcase;
