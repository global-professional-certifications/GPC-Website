import React, { useState, useRef, useEffect } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { Link } from "react-router-dom";

const FAQDisplay = ({ faqs = [], showCount = 5, showMoreLink = "/faq" }) => {
    const [openIndex, setOpenIndex] = useState(null);
    const contentRefs = useRef([]);
    const heightsRef = useRef({});

    // Cache scrollHeights after paint — avoids forced reflow during render
    useEffect(() => {
        contentRefs.current.forEach((el, i) => {
            if (el) {
                heightsRef.current[i] = el.scrollHeight;
            }
        });
    });

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="bg-gray-50 px-2 md:px-0 pl-0 md:pl-20 rounded-2xl">
            <h2 className="text-2xl md:text-4xl font-bold text-center mb-10">
                Frequently Asked <span className="text-brand-blue font-normal italic">Questions</span>
            </h2>

            <div className="max-w-4xl mx-auto">
                {faqs.slice(0, showCount).map((faq, index) => (
                    <div
                        key={index}
                        className="border-b border-gray-400 px-4 py-4 transition-all duration-300"
                    >
                        <button
                            onClick={() => toggleFAQ(index)}
                            className="w-full flex justify-between items-center text-left"
                        >
                            <p className="text-sm md:text-lg font-semibold text-gray-800">
                                {faq.question}
                            </p>
                            {openIndex === index ? (
                                <FaChevronUp className="text-brand-blue w-3 h-3 flex-shrink-0" />
                            ) : (
                                <FaChevronDown className="text-gray-400 w-3 h-3 flex-shrink-0" />
                            )}
                        </button>

                        <div
                            ref={(el) => (contentRefs.current[index] = el)}
                            className={`text-gray-600 text-sm md:text-base leading-relaxed overflow-hidden transition-[max-height] duration-500`}
                            style={{
                                maxHeight:
                                    openIndex === index
                                        ? `${heightsRef.current[index] ?? 'auto'}px`
                                        : "0px",
                            }}
                        >
                            <p className="mt-4 text-justify">{faq.answer}</p>
                        </div>
                    </div>
                ))}
            </div>


            {/* See More Button */}

            <div className="flex justify-center mt-10">
                <Link
                    to={showMoreLink}
                    className="bg-brand-blue text-white text-sm md:text-base py-2 px-4 md:px-6 rounded-full hover:bg-brand-purple hover:scale-105 transition-all duration-300"
                >
                    See All FAQs
                </Link>
            </div>

        </div>
    );
};

export default FAQDisplay;
