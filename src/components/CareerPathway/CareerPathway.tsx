import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";

/*
 * Multi-Certification Career Progression Pathway
 *
 * Universal section: the same content on every page that uses it, so it takes
 * no props. Drop <CareerPathway /> into any course or landing page.
 */

const PATHWAY_STEPS = [
  {
    stage: "Entry Level / Freshers",
    certification: "Internal Audit Practitioner (IAP)",
    advantage: "Establishes foundational compliance expertise and grants an exemption for CIA Part 1.",
  },
  {
    stage: "Core Professional",
    certification: "Certified Internal Auditor (CIA)",
    advantage: "The definitive global benchmark for internal audit excellence and management leadership.",
  },
  {
    stage: "Advanced Specialization",
    certification: "CISA",
    advantage: "Expands mastery into IT governance, information systems audit, and advanced risk management frameworks.",
  },
];

export default function CareerPathway() {
  return (
    <section id="career-pathway" className="font-poppins px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900">
            Multi-Certification <span className="text-brand-blue font-normal italic">Career Progression</span> Pathway
          </h2>
          <p className="mt-4 text-sm md:text-base text-gray-600 leading-relaxed max-w-3xl mx-auto">
            Map out your long-term professional growth and continuous credential advancement across global internal audit and risk standards:
          </p>
        </div>

        <ol className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10">
          {PATHWAY_STEPS.map((step, index) => (
            <li key={step.certification} className="relative flex flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              {/* Connector arrow to the next step (desktop only) */}
              {index < PATHWAY_STEPS.length - 1 && (
                <span
                  aria-hidden="true"
                  className="hidden lg:flex absolute top-1/2 -right-[2.1rem] z-10 h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white text-brand-blue shadow-sm"
                >
                  <FaArrowRightLong className="h-3.5 w-3.5" />
                </span>
              )}

              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-brand-blue text-sm font-bold text-white">
                  {index + 1}
                </span>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">Career Stage</p>
                  <p className="text-sm font-semibold text-brand-blue">{step.stage}</p>
                </div>
              </div>

              <div className="mt-5 border-t border-gray-100 pt-5 flex-1">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">Certification Tier</p>
                <h3 className="mt-1 text-lg font-bold text-gray-900 leading-snug">{step.certification}</h3>

                <p className="mt-4 text-[11px] font-semibold uppercase tracking-wide text-gray-400">Strategic Advantage</p>
                <p className="mt-1 text-sm text-gray-600 leading-relaxed">{step.advantage}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
