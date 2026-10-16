import { Award, ArrowRight } from "lucide-react";
import { Link } from "../routing";
// Web-sized copy (1100px wide WebP) of the original IIA award photo.
import awardImage from "../../assets/home/gpc-iia-award.webp";

/**
 * "Recognized by The Institute of Internal Auditors (IIA)" section on the
 * homepage.
 *
 * Static, like the ISACA accreditation section, whose layout and styling it
 * mirrors. The image sits on the left on desktop so it alternates with the
 * "Offering a Global Platform" section directly below it. Text and photo live
 * here, not in Sanity.
 */
const IIARecognitionSection = () => {
    return (
        <section className="py-20 md:py-16 px-6 md:px-16 bg-white">
            <div className="flex flex-col lg:flex-row-reverse items-center justify-between gap-12 md:gap-20">
                {/* Right Content */}
                <div className="flex flex-col gap-6 lg:w-1/2 text-center md:text-left">
                    <p className="inline-flex items-center gap-2 self-center md:self-start w-fit px-4 py-1.5 rounded-full border bg-brand-blue/10 text-brand-blue border-brand-blue/20 text-xs md:text-sm font-semibold font-poppins">
                        <Award className="w-4 h-4 shrink-0" aria-hidden="true" />
                        Recognized by The Institute of Internal Auditors (IIA)
                    </p>
                    <h2 className="text-2xl md:text-4xl font-bold leading-snug">
                        <span className="text-brand-blue font-normal italic">
                            200+ Professionals.
                        </span>{" "}
                        One Proven CIA Journey.
                    </h2>
                    <p className="text-gray-600 text-xs md:text-base lg:text-base font-poppins leading-relaxed">
                        In just 18 months, 200+ professionals have earned their CIA® certification after
                        learning with Global Professional Certifications (GPC). This achievement has been
                        recognised by The Institute of Internal Auditors (IIA), reinforcing GPC’s commitment
                        to helping professionals succeed in their CIA journey.
                    </p>
                    <Link
                        to="/courses/cia"
                        className="group inline-flex items-center gap-2 bg-brand-blue text-white text-sm md:text-base py-2 px-4 lg:px-6 rounded-full shadow-md hover:bg-brand-purple hover:shadow-lg hover:scale-105 transition-all duration-300 w-fit self-center md:self-start"
                    >
                        Explore CIA Programs
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                    </Link>
                </div>

                {/* Left Image */}
                <div className="relative flex justify-center md:justify-start w-full lg:w-1/2">
                    {/* Soft brand-tinted backdrop offset behind the photo */}
                    <div
                        aria-hidden="true"
                        className="absolute w-full max-w-[550px] aspect-[1100/689] rounded-2xl bg-brand-blue/10 translate-x-3 translate-y-3 md:translate-x-4 md:translate-y-4"
                    />
                    <img
                        src={awardImage}
                        alt="IIA India Delhi Branch award naming Global Professional Certifications Best Performing Learning Partner – Shining Star"
                        width="1100"
                        height="689"
                        loading="lazy"
                        className="relative w-full max-w-[550px] h-auto rounded-2xl shadow-xl object-cover transition-all duration-300"
                    />
                </div>
            </div>
        </section>
    );
};

export default IIARecognitionSection;
