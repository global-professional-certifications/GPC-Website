import React from "react";
import { NavLink } from "react-router-dom";
import cia from "../../assets/courses/cia-logo.webp";
import cisa from "../../assets/courses/cisa-logo.webp";
import crma from "../../assets/courses/crma-logo.webp";
import iap from "../../assets/courses/iap-logo.webp";

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

const CoursesShowcase = ({ titleStart, highlight, titleEnd, courses }) => {
  return (
    <div className="py-8 px-2 md:px-16">
      <h2 className="text-2xl md:text-4xl lg:text-4xl pl-4 pr-24 text-left mb-12 font-bold text-gray-900">
        {titleStart}{" "}
        <span className="text-brand-blue font-normal italic">{highlight}</span>{" "}
        {titleEnd}
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-6">
        {courses.map((key) => {
          const course = COURSE_DATA[key];
          if (!course) return null;

          return (
            <div
              key={key}
              className="bg-white border border-gray-200 rounded-xl flex flex-col shadow-md transition-all duration-300 hover:shadow-xl h-full"
            >
              <div className="relative w-full h-28 md:h-48 flex justify-center items-center overflow-hidden rounded-t-xl bg-gray-50 p-4">
                <img
                  src={course.image}
                  alt={course.name}
                  loading="lazy"
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              <div className="px-6 py-4 flex flex-col flex-1 justify-between">
                <div>
                  <p className="text-sm md:text-xl font-bold mb-2 text-gray-900">
                    {course.name}
                  </p>
                  <p className="text-xs md:text-sm text-gray-600 mb-4">
                    {course.description}
                  </p>
                </div>

                <NavLink to={course.link}>
                  <button className="w-full py-2 px-4 rounded-lg bg-brand-blue text-white font-semibold shadow-md transition-all duration-300 hover:bg-brand-purple hover:scale-105">
                    View Course
                  </button>
                </NavLink>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CoursesShowcase;