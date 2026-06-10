import React from "react";
import { NavLink } from "react-router-dom";
import cia from "../../assets/courses/cia-logo.webp";
import cisa from "../../assets/courses/cisa-logo.webp";
import crma from "../../assets/courses/crma-logo.webp";
import iap from "../../assets/courses/iap-logo.webp";
import { useBrochureSection } from "../../hooks/useBrochureSection";
import BrochureCtaButton from "../Brochure/BrochureCtaButton";

const COURSE_DATA = {
  CIA: {
    name: "Certified Internal Auditor (CIA)",
    description:
      "Master the complete CIA exam with expert guidance and comprehensive study materials",
    image: cia,
    link: "/courses/cia",
  },
  CISA: {
    name: "Certified Information Systems Auditor (CISA)",
    description:
      "Become a certified expert in IT auditing and risk management with our comprehensive CISA course",
    image: cisa,
    link: "/courses/cisa",
  },
  CRMA: {
    name: "Certification in Risk Management Assurance (CRMA)",
    description:
      "Advance your risk career with our CRMA course on assurance, governance, and mitigation",
    image: crma,
    link: "/courses/crma",
  },
  IAP: {
    name: "Internal Audit Practitioner (IAP)",
    description:
      "Kickstart your CIA journey with our IAP course covering audit fundamentals and risk assessment",
    image: iap,
    link: "/courses/iap",
  },
};

// Courses that get a "Download Brochure" button on the card. Props mirror what
// the dedicated course pages pass to BrochureCtaButton so behaviour is identical:
// CIA → redirects to the Zoho lead-capture form; CISA → downloads the Sanity PDF.
const BROCHURE_CONFIG = {
  CIA: {
    course: "cia",
    fallbackType: "externalUrl",
    fallbackUrl:
      "https://forms.zohopublic.in/globalprofessionalcertificat1/form/eBookDownload1/formperma/v93vgyL8M0OVomy1AV7xJljAoa-TcJqlIGD7-1nerlU",
    downloadFilename: "CIA-Brochure.pdf",
  },
  CISA: {
    course: "cisa",
    fallbackType: "download",
    downloadFilename: "CISA-Brochure.pdf",
  },
};

// Renders the card's "Download Brochure" button. Reads the editable CTA from
// Sanity (same source as the course pages) and falls back to the hardcoded
// config so behaviour matches /courses/cia and /courses/cisa exactly.
const CardBrochureButton = ({ config }) => {
  const { section } = useBrochureSection(config.course);

  // If sanity has a custom label that is NOT "Download", we use it, otherwise we override it to "Download Brochure"
  const overrideLabel = section?.cta?.label && section.cta.label.trim() !== "Download"
    ? section.cta.label
    : "Download Brochure";

  return (
    <BrochureCtaButton
      course={config.course}
      cta={section?.cta}
      fallbackType={config.fallbackType}
      fallbackUrl={config.fallbackUrl}
      fallbackLabel="Download Brochure"
      overrideLabel={overrideLabel}
      downloadFilename={config.downloadFilename}
      className="block w-full text-center py-1.5 md:py-2 text-xs md:text-base rounded-lg bg-white text-brand-blue border border-brand-blue font-semibold transition-all duration-300 hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
    />
  );
};

const CoursesShowcase = ({ titleStart, highlight, titleEnd, courses }) => {
  return (
    <section className="w-full py-12 px-8 flex justify-center">
      <div className="w-full max-w-7xl">

        <h2 className="text-2xl md:text-4xl mb-16 font-bold text-gray-900 text-center">
          {titleStart}{" "}
          <span className="text-brand-blue font-normal italic">{highlight}</span>{" "}
          {titleEnd}
        </h2>

        {/* Grid wrapper to center cards */}
        <div className="w-full">
          <div
            className={`grid gap-4 md:gap-6 
              grid-cols-2 
              lg:grid-cols-${courses.length >= 4 ? "4" : courses.length}
              max-w-7xl mx-auto
            `}
          >
            {courses.map((key) => {
              const course = COURSE_DATA[key];
              if (!course) return null;

              return (
                <div
                  key={key}
                  className="bg-white border border-gray-200 rounded-xl flex flex-col shadow-md transition-all duration-300 hover:shadow-xl"
                >
                  <div className="relative w-full h-24 md:h-36 flex justify-center items-center overflow-hidden rounded-t-xl bg-gray-50 p-3 md:p-4">
                    <img
                      src={course.image}
                      alt={course.name}
                      loading="lazy"
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>

                  <div className="px-3 md:px-5 py-3 md:py-4 flex flex-col flex-1 justify-between">
                    <div>
                      <p className="text-xs md:text-xl font-poppins font-bold mb-1 md:mb-2 text-gray-900">
                        {course.name}
                      </p>
                      <p className="text-[10px] md:text-sm text-gray-600 mb-2 md:mb-4 line-clamp-2 md:line-clamp-3">
                        {course.description}
                      </p>
                    </div>

                    <div className="flex flex-col gap-2">
                      {BROCHURE_CONFIG[key] && (
                        <CardBrochureButton config={BROCHURE_CONFIG[key]} />
                      )}
                      <NavLink to={course.link} aria-label={`View ${course.name} details`}>
                        <button className="w-full py-1.5 md:py-2 text-xs md:text-base rounded-lg bg-brand-blue text-white font-semibold transition-all duration-300 hover:bg-brand-purple hover:scale-105">
                          View Course
                        </button>
                      </NavLink>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

export default CoursesShowcase;
