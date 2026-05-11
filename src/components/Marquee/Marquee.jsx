import React from "react";
import { motion } from "motion/react";

export default function Marquee({ companies, start, end }){

    const logoContainerClasses = "flex-shrink-0 w-28 h-auto mx-8 flex items-center justify-center";
    const imageClasses = "object-contain";
    const duration = 15; 

    return (
        <>
            <motion.div 
                initial={{ x: start }}
                animate={{ x: end }}
                transition={{ duration: duration, repeat: Infinity, ease: "linear" }}
                className="flex flex-shrink-0">
                {companies.map((logo, index) => (
                    <div key={`logo-1-${index}`} className={logoContainerClasses}>
                        <img
                            src={logo}
                            alt="Company logo"
                            width="112"
                            height="64"
                            className={imageClasses}
                            loading="lazy"
                            decoding="async"
                        />
                    </div>
                ))}
            </motion.div>
            <motion.div 
                initial={{ x: start }}
                animate={{ x: end }}
                transition={{ duration: duration, repeat: Infinity, ease: "linear" }}
                className="flex flex-shrink-0">
                {companies.map((logo, index) => (
                    <div key={`logo-2-${index}`} className={logoContainerClasses}>
                        <img
                            src={logo}
                            alt="Company logo"
                            width="112"
                            height="64"
                            className={imageClasses}
                            loading="lazy"
                            decoding="async"
                        />
                    </div>
                ))}
            </motion.div>
        </>
    )
}