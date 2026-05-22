import React from "react";
import { motion } from "motion/react";
import { urlFor } from "../../lib/sanity/imageBuilder";

export default function Marquee({ companies, start, end }) {

    const logoContainerClasses = "flex-shrink-0 w-[140px] md:w-[180px] h-[50px] md:h-[70px] mx-3 md:mx-6 mb-6 flex items-center justify-center overflow-hidden";
    const imageClasses = "max-w-full max-h-full object-contain";


    const duration = 35;

    const renderLogos = (sectionKey) => {
        return companies.map((company, index) => {
            const isSanityLogo = company && typeof company === 'object';
            const logoSrc = isSanityLogo ? urlFor(company.logo).url() : company;
            const altText = isSanityLogo ? (company.name || "Company logo") : "Company logo";

            return (
                <div key={`logo-${sectionKey}-${index}`} className={logoContainerClasses}>
                    <img
                        src={logoSrc}
                        alt={altText}
                        width="180"
                        height="70"
                        className={imageClasses}
                        loading="lazy"
                        decoding="async"
                    />
                </div>
            );
        });
    };

    return (
        <>
            <motion.div
                initial={{ x: start }}
                animate={{ x: end }}
                transition={{ duration: duration, repeat: Infinity, ease: "linear" }}
                className="flex flex-shrink-0">
                {renderLogos("1")}
            </motion.div>

            <motion.div
                initial={{ x: start }}
                animate={{ x: end }}
                transition={{ duration: duration, repeat: Infinity, ease: "linear" }}
                className="flex flex-shrink-0">
                {renderLogos("2")}
            </motion.div>
        </>
    )
}