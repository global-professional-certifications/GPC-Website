import { Suspense, lazy } from "react";
// Web-sized copy (1100px wide WebP) of the original ISACA accreditation photo.
import accreditationImage from "../../assets/home/isaca-accreditation.webp";

// Only loaded when more than one photo is passed (CISA course page).
const ISACAPhotoCarousel = lazy(() => import("./ISACAPhotoCarousel"));

const singlePhotoClassName = "w-full max-w-[550px] h-auto rounded-2xl shadow-xl object-cover transition-all duration-300";

/**
 * "ISACA Accredited Training Organization" section, used on the homepage and
 * the CISA course page.
 *
 * Static, like the IIA India "Authorized Training Partner" section on the CIA
 * course page, whose layout and styling it mirrors. Text and photo live here,
 * not in Sanity.
 *
 * `images` is optional: without it (homepage) the single accreditation photo
 * is shown; with more than one photo it becomes a fading carousel.
 */
const ISACAAccreditationSection = ({ images }: { images?: string[] }) => {
    const singlePhoto = (
        <img
            src={images?.[0] ?? accreditationImage}
            alt="GPC team with the ISACA representative at the ISACA accreditation meeting"
            width="1100"
            height="772"
            loading="lazy"
            className={singlePhotoClassName}
        />
    );

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

                {/* Right Image(s) */}
                <div className="flex justify-center md:justify-end w-full lg:w-1/2">
                    {images && images.length > 1 ? (
                        <Suspense fallback={singlePhoto}>
                            <ISACAPhotoCarousel images={images} />
                        </Suspense>
                    ) : (
                        singlePhoto
                    )}
                </div>
            </div>
        </section>
    );
};

export default ISACAAccreditationSection;
