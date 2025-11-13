import React, { useEffect, useState } from "react";
import coursesPhoto from "../../assets/Courses-photo-1.png";
import Card from "../Card/Card";
import cisaLogo from "../../assets/cisa-logo-1.png";
import ciaLogo from "../../assets/cia-logo.webp";
import iapLogo from "../../assets/iap-logo-cropped.webp";
import crmaLogoOne from "../../assets/crma-logo-1.png";
import { FaArrowTurnDown } from "react-icons/fa6";
import MetaTags from "../MetaTags";
import CoursesSEO from "./CoursesSEO";

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
    img.src = coursesPhoto;
  }, []);

  return (
    <>
      <CoursesSEO />
      <MetaTags 
        title="Certification Courses – Global Professional Certifications"
        description="Explore globally recognized certification programs like CIA, led by expert mentors and powered by premium content."
        canonicalUrl="https://globalprofessionalcertifications.com/courses"
      />


      {/* Hero */}
      <section className="md:h-screen flex justify-center items-center bg-brand-blue pt-6 md:pt-16">
        <div className="flex flex-col-reverse md:flex-col lg:flex-row md:px-4 md:py-32 pt-12 md:pt-32 pb-10 mx-auto md:max-w-7xl md:px-6 lg:px-8 md:flex mt-16 px-8">
          <div className="max-w-sm md:max-w-2xl mx-auto md:mr-20 md:mt-16">
            <div className="relative max-w-xl mt-8">
              <h1 className="mt-6 text-2xl md:text-6xl font-bold leading-tight text-white">
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
                  src={coursesPhoto}
                  alt="homepage hero"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Courses cards in single row */}
      <h1 id="courses" className="text-2xl md:text-4xl font-bold text-brand-blue mb-10 text-center mt-10 md:mt-24">
        COURSES WE OFFER
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 justify-items-center lg:flex lg:flex-row lg:justify-center lg:items-center gap-6 md:gap-0 lg:gap-6 items-center mb-10 md:mb-24">
        <Card
          title="CIA all 3 Parts with Gleim Content"
          image={ciaLogo}
          text="Master the complete CIA exam with expert guidance and comprehensive study materials"
          price={58999}
          linkTo="/courses/cia" 
          enrollLink="https://rzp.io/rzp/CIASessions" 
          imageStyle="object-cover w-full"
          gst="(Including GST)"
        />
        <Card
          title="Certified Informations Systems Auditor (CISA)"
          image={cisaLogo}
          text="Become a certified expert in IT auditing and risk management with our comprehensive CISA course"
          price={17700}
          linkTo="/courses/cisa" 
          enrollLink="https://rzp.io/rzp/VuvF84x" 
          imageStyle="object-cover w-full"
          gst="(Including GST)"
        />
        <Card
          title="Internal Audit Practioner (IAP)"
          image={iapLogo}
          text="Kickstart your CIA journey with our IAP course—covering audit fundamentals and risk assessment"
          price={23600}
          linkTo="/courses/iap" 
          enrollLink="https://rzp.io/rzp/C7jUKuC" 
          imageStyle="object-contain"
          gst="(Including GST)"
        />
        <Card
          title="Certification in Risk Management Assurance"
          image={crmaLogoOne}
          text="Advance your risk career with our CRMA course on assurance, governance, and mitigation"
          price={29500}
          linkTo="/courses/crma" 
          enrollLink="https://rzp.io/rzp/hjuC9dj" 
          imageStyle="object-contain"
          gst="(Including GST)"
        />
      </div>
    </>
  );
}