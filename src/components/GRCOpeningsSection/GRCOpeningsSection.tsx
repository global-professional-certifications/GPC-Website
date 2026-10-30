import { ArrowUpRight } from "lucide-react";
import logoImage from "../../assets/grc-openings-logo.webp";

/**
 * "Explore our product: GRC Openings" section on the homepage.
 *
 * Static, styled to match the IIA Recognition and ISACA accreditation
 * sections. Text and logo live here, not in Sanity.
 */
const GRCOpeningsSection = () => {
    return (
        <section className="py-20 md:py-16 px-6 md:px-16 bg-brand-blue/5">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12 md:gap-20">
                {/* Left Content */}
                <div className="flex flex-col gap-6 lg:w-1/2 text-center md:text-left">
                    <h2 className="text-2xl md:text-4xl font-bold leading-snug">
                        Explore our product{" "}
                        <span className="text-brand-blue font-normal italic whitespace-nowrap">GRC Openings</span>
                    </h2>
                    <p className="text-gray-600 text-xs md:text-base lg:text-base font-poppins leading-relaxed">
                        Developed by Global Professional Certifications (GPC), GRC Openings is a dedicated
                        career platform connecting Governance, Risk, and Compliance professionals with relevant
                        opportunities and employers with specialist talent. Users can explore jobs in internal
                        audit, risk management, compliance, governance, and cybersecurity, while employers can
                        post roles and reach candidates with relevant GRC expertise.
                    </p>
                    <a
                        href="https://grcopenings.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2 bg-brand-blue text-white text-sm md:text-base py-2 px-4 lg:px-6 rounded-full shadow-md hover:bg-brand-purple hover:shadow-lg hover:scale-105 transition-all duration-300 w-fit self-center md:self-start"
                    >
                        Explore GRC Openings
                        <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                    </a>
                </div>

                {/* Right Logo */}
                <div className="flex justify-center w-full lg:w-1/2">
                    <img
                        src={logoImage}
                        alt="GRC Openings by Global Professional Certifications logo"
                        width="1000"
                        height="418"
                        loading="lazy"
                        className="w-full max-w-[400px] h-auto"
                    />
                </div>
            </div>
        </section>
    );
};

export default GRCOpeningsSection;
