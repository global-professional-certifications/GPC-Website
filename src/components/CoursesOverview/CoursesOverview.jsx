import React, { useEffect, useState } from "react";
import Card from "../Card/Card";
import MetaTags from "../MetaTags";
import CoursesSEO from "./CoursesSEO";
import useCurrency from "../../hooks/useCurrency";

// images import
import coursesHero from "../../assets/courses/courses-hero.webp";
import cisaLogo from "../../assets/courses/cisa-logo.webp";
import ciaLogo from "../../assets/courses/cia-logo.webp";
import iapLogo from "../../assets/courses/iap-logo.webp";
import crmaLogo from "../../assets/courses/crma-logo.webp";


export default function CoursesOverview() {

  let windowSize = window.innerWidth

  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(windowSize < 768)
    }
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
      <MetaTags
        title="Certification Courses - Global Professional Certifications"
        description="Explore globally recognized certification programs like CIA, led by expert mentors and powered by premium content."
        canonicalUrl="https://globalprofessionalcertifications.com/courses"
      />


      {/* Hero */}
      <section className="flex justify-center items-center bg-brand-blue py-12">
        <div className="md:max-w-8xl flex flex-col lg:flex-row justify-center items-center gap-0 gap-12 px-8 md:px-24">
          <div className="max-w-sm md:max-w-2xl mx-auto">
            <div className="relative max-w-xl">
              <h1 className="mt-6 text-2xl md:text-4xl font-bold leading-tight text-white">
                Your Path to <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">Global Audit</span> Excellence
              </h1>
              <h2 className="mt-4 text-base sm:text-lg md:text-lg text-gray-200 max-w-lg leading-relaxed">
                Achieve globally recognized certifications in <span className='font-bold text-orange-400'>Internal Audit, IT Systems Audit and Risk Management.</span> Expert-led courses with Gleim content, comprehensive study materials, and proven success strategies for <span className='font-bold text-orange-400'>CIA, CISA, CRMA, and IAP</span> exams
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

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-center items-center px-4 md:px-12 mt-20 mb-4">
        <h1 id="courses" className="text-2xl md:text-4xl font-bold">
          <span className="text-brand-blue font-normal italic">
            Courses{" "}
          </span>
          We Offer
        </h1>
      </div>


      <div className="px-8 grid grid-cols-1 md:grid-cols-2 justify-items-center lg:flex lg:flex-row lg:justify-center lg:items-center gap-6 md:gap-6 md:gap-y-12 lg:gap-6 items-center mb-10 md:mb-32">
        <Card
          title="CIA all 3 Parts with Gleim Content"
          image={ciaLogo}
          text="Master the complete CIA exam with expert guidance and comprehensive study materials"
          currency="INR"
          price="58,999"
          linkTo="/courses/cia"
          enrollLink="https://rzp.io/rzp/CIASessions"
          gst="(Including GST)"
        />
        <Card
          title="Certified Informations Systems Auditor (CISA)"
          image={cisaLogo}
          text="Become a certified expert in IT auditing and risk management with our comprehensive CISA course"
          currency="INR"
          price="17,700"
          linkTo="/courses/cisa"
          enrollLink="https://rzp.io/rzp/VuvF84x"
          gst="(Including GST)"
        />
        <Card
          title="Internal Audit Practioner (IAP)"
          image={iapLogo}
          text="Kickstart your CIA journey with our IAP course—covering audit fundamentals and risk assessment"
          currency="INR"
          price="23,600"
          linkTo="/courses/iap"
          enrollLink="https://rzp.io/rzp/C7jUKuC"
          gst="(Including GST)"
        />
        <Card
          title="Certification in Risk Management Assurance"
          image={crmaLogo}
          text="Advance your risk career with our CRMA course on assurance, governance, and mitigation"
          currency="INR"
          price="29,500"
          linkTo="/courses/crma"
          enrollLink="https://rzp.io/rzp/hjuC9dj"
          gst="(Including GST)"
        />
      </div>
    </>
  );
}
