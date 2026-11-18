'use client';

import React, { useEffect, useMemo, useState } from "react";
import Card from "../../../src/components/Card/Card";
import useCurrency from "../../../src/hooks/useCurrency";
import { Link } from "../../../src/components/routing";
import {
  SchemaMarkup,
  getCourseListSchema,
  getCollectionPageSchema,
  getOrganizationSchema,
  generateBreadcrumbSchema
} from "../../../src/components/Schema";
import { FaBullhorn } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import MobileGallery from "../../../src/components/SuccessStories/MobileGallery";
import StatsBar from "../../../src/components/Stats/StatsBar";
import { urlFor } from "../../../src/lib/sanity/imageBuilder";
import type { CmsList } from "../../../src/types/cms";

// images import
import coursesHero from "../../../src/assets/courses/courses-hero.webp";
import cisaLogo from "../../../src/assets/courses/cisa-logo.webp";
import ciaLogo from "../../../src/assets/courses/cia-logo.webp";
import iapLogo from "../../../src/assets/courses/iap-logo.webp";
import crmaLogo from "../../../src/assets/courses/crma-logo.webp";


/*
 * Content for the /courses route. page.tsx stays a server component (it owns
 * the metadata export); this file holds the client-side page body and its
 * structured data. Only page.tsx defines the route, so this file does not
 * affect the URL.
 */
export default function Courses({ imageStories = [] }: { imageStories?: CmsList }) {

  // Success-story screenshots fetched in page.tsx, prepared the same way /success does.
  const galleryImages = useMemo(() => imageStories.map(story => ({
    ...story,
    thumbnailUrl: story.thumbnail ? urlFor(story.thumbnail).url() : null,
  })).filter(story => story.thumbnailUrl), [imageStories]);

  // Starts false rather than reading window.innerWidth in the initialiser.
  // 'use client' still server-renders this component, and a useState initialiser
  // runs during that render -- reading window there crashed the prerender with
  // "ReferenceError: window is not defined".
  //
  // false (desktop) is the correct default: it matches the server render, so
  // hydration does not mismatch, and the effect below corrects it on mount
  // before paint for real mobile viewports.
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    // Called immediately so the true viewport is applied on mount, not only
    // after the first resize event.
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    const img = new Image();
    img.src = coursesHero;
  }, []);

  const { currency, loading } = useCurrency();

  if (loading) {
    return <p>"Detecting Location..."</p>
  }



  return (
    <>
      <CoursesSEO />


      {/* Hero + Stats (stats bar overlaps the hero's bottom edge, as on Home) */}
      <div className="relative">
      <section className="flex justify-center items-center bg-brand-blue pt-12 pb-16 md:pb-20">
        <div className="md:max-w-8xl flex flex-col lg:flex-row justify-center items-center gap-0 gap-12 px-8 md:px-24">
          <div className="max-w-sm md:max-w-2xl mx-auto">
            <div className="relative max-w-xl">
              <h1 className="mt-6 text-2xl md:text-4xl font-bold leading-tight text-white">
                Your Path to <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">Global Audit</span> Excellence
              </h1>
              <h2 className="mt-4 text-base sm:text-lg md:text-lg text-gray-200 max-w-lg leading-relaxed">
                Achieve globally recognized certifications in <span className='font-bold text-orange-400'>Internal Audit, IT Systems Audit and Risk Management.</span> Expert-led courses with Gleim content, comprehensive study materials, and proven success strategies for <span className='font-bold text-orange-400'>CIA, CISA, and IAP</span> exams
              </h2>
            </div>

            {!isMobile ?
              <div className="px-8 sm:px-0 sm:space-x-5 mt-9 md:flex">
                <a
                  href="#courses"
                  title=""
                  className="inline-flex items-center justify-center px-8 py-3 text-lg font-semibold text-white rounded-lg shadow-lg transition-all duration-300 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 hover:scale-105 hover:shadow-xl"
                  role="button"
                >
                  Explore Our Programs
                </a>
              </div>
              :
              <button className="inline-flex items-center justify-center mt-4 px-6 py-3 text-base font-semibold text-white rounded-lg shadow-lg transition-all duration-300 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 hover:scale-105 hover:shadow-xl">Explore our courses below</button>
            }
          </div>
          <div className="pb-6 md:pb-12">
            <div className="relative md:flex md:justify-end md:items-end">
              <div className="relative lg:max-w-6xl p-2 transform lg:scale-110">
                <img
                  className="h-[350px] md:h-[450px] rounded-md"
                  src={coursesHero}
                  alt="courses hero"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

        {/* Stats (shared with Home) */}
        <StatsBar />
      </div>


      {/* Header */}
      <div className="flex flex-col md:flex-row justify-center items-center px-4 md:px-12 mt-20 mb-4">
        <h1 id="courses" className="text-2xl md:text-4xl font-bold">
          <span className="text-brand-blue font-normal italic">
            Courses{" "}
          </span>
          We Offer
        </h1>
      </div>


      <div className="font-poppins max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6 md:mb-12">
        <Card
          title="CIA all 3 Parts with Gleim Content"
          image={ciaLogo}
          text="Master the complete CIA exam with expert guidance and comprehensive study materials"
          currency="INR"
          price="70,800"
          linkTo="/courses/cia"
          enrollLink="https://rzp.io/rzp/uC1OGRim"
          gst="(Including GST)"
          fullWidth
        />
        <Card
          title="Certified Informations Systems Auditor (CISA)"
          image={cisaLogo}
          text="Become a certified expert in IT auditing and risk management with our comprehensive CISA course"
          currency="INR"
          price="23,600"
          linkTo="/courses/cisa"
          enrollLink="https://rzp.io/rzp/ZE5s8Dz"
          gst="(Including GST)"
          fullWidth
        />
        <Card
          title="Internal Audit Practioner (IAP)"
          image={iapLogo}
          text="Kickstart your CIA journey with our IAP course—covering audit fundamentals and risk assessment"
          currency="INR"
          price="29,500"
          linkTo="/courses/iap"
          enrollLink="https://rzp.io/rzp/C7jUKuC"
          gst="(Including GST)"
          fullWidth
        />
        {/* Hidden: CRMA Course Card
        <Card
          title="Certification in Risk Management Assurance"
          image={crmaLogo}
          text="Advance your risk career with our CRMA course on assurance, governance, and mitigation"
          currency="INR"
          price="29,500"
          linkTo="/courses/crma"
          enrollLink="https://rzp.io/rzp/hjuC9dj"
          gst="(Including GST)"
          fullWidth
        />
        */}
      </div>


      {/* Program Comparison */}
      <section id="compare" className="font-poppins px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-10 md:mb-12">
            Compare Our{" "}
            <span className="text-brand-blue font-normal italic">Professional Certification</span>{" "}
            Programs
          </h2>

          {/* Desktop / tablet: table */}
          <div className="hidden lg:block overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-brand-blue">
                  {COMPARISON_HEADINGS.map((heading) => (
                    <th key={heading} scope="col" className="px-6 py-4 text-sm font-semibold text-white">
                      {heading}
                    </th>
                  ))}
                  <th scope="col" className="px-6 py-4">
                    <span className="sr-only">Course details</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {PROGRAM_COMPARISON.map((program) => (
                  <tr key={program.name} className="align-top transition-colors hover:bg-gray-50">
                    <th scope="row" className="px-6 py-5 w-[22%] text-sm font-bold text-gray-900 leading-snug">
                      {program.name}
                    </th>
                    <td className="px-6 py-5 text-sm text-gray-600 leading-relaxed">{program.idealFor}</td>
                    <td className="px-6 py-5 text-sm text-gray-600 leading-relaxed">{program.focusAreas}</td>
                    <td className="px-6 py-5 text-sm font-medium text-brand-blue leading-relaxed">{program.careerImpact}</td>
                    <td className="px-6 py-5 text-right">
                      <Link
                        to={program.link}
                        aria-label={`View ${program.name} course`}
                        className="inline-flex items-center gap-2 whitespace-nowrap text-sm font-semibold text-brand-blue transition-colors hover:text-brand-purple"
                      >
                        View Course
                        <FaArrowRightLong className="h-3.5 w-3.5" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile / tablet: cards */}
          <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-5">
            {PROGRAM_COMPARISON.map((program) => (
              <div key={program.name} className="flex flex-col rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 leading-snug">{program.name}</h3>
                <dl className="mt-4 flex-1 space-y-4">
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wide text-gray-400">{COMPARISON_HEADINGS[1]}</dt>
                    <dd className="mt-1 text-sm text-gray-600 leading-relaxed">{program.idealFor}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wide text-gray-400">{COMPARISON_HEADINGS[2]}</dt>
                    <dd className="mt-1 text-sm text-gray-600 leading-relaxed">{program.focusAreas}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wide text-gray-400">{COMPARISON_HEADINGS[3]}</dt>
                    <dd className="mt-1 text-sm font-medium text-brand-blue leading-relaxed">{program.careerImpact}</dd>
                  </div>
                </dl>
                <div className="mt-5 border-t border-gray-100 pt-4">
                  <Link
                    to={program.link}
                    aria-label={`View ${program.name} course`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-brand-blue transition-colors hover:text-brand-purple"
                  >
                    View Course
                    <FaArrowRightLong className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Learner Success Stories */}
      <section id="success-stories" className="font-poppins px-4 sm:px-6 lg:px-8 pt-12 md:pt-16 pb-16 md:pb-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 md:mb-12">
            <h2 className="text-2xl md:text-4xl font-bold">
              Proven{" "}
              <span className="text-brand-blue font-normal italic">Learner Success</span>{" "}
              Stories
            </h2>
            <p className="mt-4 text-sm md:text-base text-gray-600 leading-relaxed max-w-2xl mx-auto">
              See what our successful learners are saying about their journey to global certification and career growth.
            </p>
          </div>

          {/* Learner message screenshots (same four as on /success); click to enlarge */}
          {galleryImages.length > 0 && (
            <div className="-mx-4 [&>div]:mt-0 [&_.group]:rounded-xl [&_.group]:border [&_.group]:border-gray-200">
              <MobileGallery images={galleryImages} />
            </div>
          )}

          {/* CTA */}
          <div className="mt-10 flex justify-center">
            <Link
              to="/success"
              className="inline-flex items-center gap-2 rounded-xl bg-brand-blue px-6 py-3 text-sm md:text-base font-semibold text-white shadow-md transition-all duration-300 hover:bg-brand-purple hover:shadow-lg"
            >
              Read More Testimonials
              <FaArrowRightLong className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}


const COMPARISON_HEADINGS = ["Certification Program", "Ideal For", "Core Focus Areas", "Career Impact"];

const PROGRAM_COMPARISON = [
  {
    name: "Certified Internal Auditor (CIA)",
    link: "/courses/cia",
    idealFor: "Internal audit professionals, risk analysts, and financial controllers",
    focusAreas: "Governance, risk management, internal control standards, and conducting audit engagements",
    careerImpact: "Global mobility and eligibility for senior internal audit leadership roles recognized by the IIA",
  },
  {
    name: "Certified Information Systems Auditor (CISA)",
    link: "/courses/cisa",
    idealFor: "IT auditors, security professionals, and compliance officers",
    focusAreas: "Information systems acquisition, development, operations, asset security, and governance",
    careerImpact: "High-demand expertise in cybersecurity auditing and IT governance recognized by ISACA",
  },
  {
    name: "Internal Audit Practitioner (IAP)",
    link: "/courses/iap",
    idealFor: "Entry-level auditors and finance graduates starting their audit journey",
    focusAreas: "Fundamental internal auditing concepts, ethics, fraud risks, and basic fieldwork techniques",
    careerImpact: "Fast-tracked professional foundation recognized by the IIA",
  },
];

// Structured data (CollectionPage, Organization, course list, breadcrumb) for /courses.
function CoursesSEO() {
  const collectionSchema = getCollectionPageSchema({
    name: "Certification Courses - Global Professional Certifications",
    description: "Join a thriving community and unlock new career heights with globally recognized certifications like CIA, IAP, and CISA."
  });

  const organizationSchema = getOrganizationSchema();

  // Course list with pricing
  const coursesSchema = getCourseListSchema([
    {
      name: "Certified Internal Auditor (CIA) - All 3 Parts with Gleim Content",
      url: "https://globalprofessionalcertifications.com/courses/cia",
      description: "Master internal auditing with comprehensive CIA certification training. All 3 parts with Gleim content and live weekend classes.",
      price: "70800(Including GST)"
    },
    {
      name: "Certified Information Systems Auditor (CISA)",
      url: "https://globalprofessionalcertifications.com/courses/cisa",
      description: "Become a certified IT audit expert with ISACA-aligned CISA certification training.",
      price: "23600(Including GST)"
    },
    {
      name: "Internal Audit Practitioner (IAP)",
      url: "https://globalprofessionalcertifications.com/courses/iap",
      description: "Start your internal audit career with foundational IAP certification. Gateway to CIA.",
      price: "29500(Including GST)"
    },
    /* Hidden: CRMA
    {
      name: "Certification in Risk Management Assurance (CRMA)",
      url: "https://globalprofessionalcertifications.com/courses/crma",
      description: "Master risk management and assurance with IIA-aligned CRMA certification training.",
      price: "29500(Including GST)"
    }
    */
  ]);

  const breadcrumbSchema = generateBreadcrumbSchema("/courses");

  return (
    <SchemaMarkup schema={[collectionSchema, organizationSchema, coursesSchema, breadcrumbSchema]} />
  );
}
