// Web-sized copy (1100px wide WebP) of the original ISACA accreditation photo.
import accreditationImage from "../../assets/home/isaca-accreditation.webp";

/**
 * "ISACA Accredited Training Organization" section on the homepage.
 *
 * Static, like the IIA India "Authorized Training Partner" section on the CIA
 * course page, whose layout and styling it mirrors. Text and photo live here,
 * not in Sanity.
 */
const ISACAAccreditationSection = () => {
    return (
        <section className="py-20 md:py-16 px-6 md:px-16">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12 md:gap-20">
                {/* Left Content */}
                <div className="flex flex-col gap-6 lg:w-1/2 text-center md:text-left">
                    <h2 className="text-2xl md:text-4xl font-bold leading-snug">
                        GPC Recognised as an{" "}
                        <span className="text-brand-blue font-normal italic">
                            ISACA
                        </span>{" "}
                        Accredited Training Organization
                    </h2>
                    <p className="text-gray-600 text-xs md:text-base lg:text-base font-poppins leading-relaxed">
                        Global Professional Certifications (GPC) is proud to be recognized by ISACA as an
                        Accredited Training Organization (ATO). This milestone reflects GPC’s commitment
                        to delivering professional training aligned with ISACA’s standards and supporting
                        learners on their certification journeys.
                    </p>
                </div>

                {/* Right Image */}
                <div className="flex justify-center md:justify-end w-full lg:w-1/2">
                    <img
                        src={accreditationImage}
                        alt="GPC team with the ISACA representative at the ISACA accreditation meeting"
                        width="1100"
                        height="772"
                        loading="lazy"
                        className="w-full max-w-[550px] h-auto rounded-2xl shadow-xl object-cover transition-all duration-300"
                    />
                </div>
            </div>
        </section>
    );
};

export default ISACAAccreditationSection;
