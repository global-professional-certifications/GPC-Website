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
      <section className="md:h-screen flex justify-center items-center bg-brand-blue sm:pt-16">
        <div className="flex flex-col-reverse md:flex-row md:px-4 md:py-32 pt-32 pb-10 mx-auto md:max-w-7xl md:px-6 lg:px-8 md:flex">
          <div className="max-w-sm md:max-w-2xl mx-auto md:mr-20 md:mt-16">
            <button className="px-4 py-2 md:px-6 md:py-3 bg-gray-50 border border-gray-400 md:text-lg text-brand-dark rounded-lg hover:bg-orange-500 hover:text-gray-50 font-bold font-inter transform hover:scale-105 transition duration-300 ease-in-out">
              Globally recognised
            </button>
            <div className="relative max-w-xl mt-8">
              <p className="relative text-xl md:text-6xl font-bold leading-tight text-gray-50 sm:leading-tight sm:text-5xl lg:text-4xl lg:leading-tight font-pj text-left">
                Elevate Your Expertise: Master the Art of Auditing and Risk Management
              </p>
              <h1 className="pt-6 md:text-2xl text-gray-50">
                Discover our prestigious certifications, meticulously crafted to propel your career to new heights of excellence and recognition.
              </h1>
            </div>

            {!isMobile ? 
              <div className="px-8 sm:px-0 sm:space-x-5 mt-9 md:flex"> 
              <a
                href="#courses"
                title=""
                className="relative inline-flex items-center justify-center w-full pl-8 pr-12 pt-3 pb-5 text-xl font-bold text-white transition-all duration-200 bg-orange-500 border-2 border-transparent sm:w-auto rounded-xl font-pj hover:bg-gray-50 hover:text-brand-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                role="button"
              >
                Kickstart your Career <span><FaArrowTurnDown className="absolute bottom-4 ml-2 font-semibold" /></span>
              </a>
            </div>
            :
            <button className="mt-8 px-4 py-2 bg-orange-500 text-white font-bold rounded-lg hover:bg-gray-50 hover:text-brand-dark transform hover:scale-105 transition duration-300 ease-in-out">Explore our courses below</button>
          }
          </div>
          <div className="pb-12">
            <div className="relative">
              <div className="relative mx-auto lg:max-w-6xl p-2 transform lg:scale-110">
                <img
                  className="h-[500px] rounded-md"
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
      <div className="flex md:justify-center md:flex-row flex-col gap-4 md:gap-0 items-center md:w-full mb-10 md:mb-24">
        <Card
          title="CIA all 3 Parts with Gleim Content"
          image={ciaLogo}
          text="Master the complete CIA exam with expert guidance and comprehensive study materials"
          price={58999}
          linkTo="/courses/cia" 
          enrollLink="https://rzp.io/rzp/CIASessions" 
          imageStyle="object-cover w-full"
          gst="Including GST"
        />
        <Card
          title="Certified Informations Systems Auditor (CISA)"
          image={cisaLogo}
          text="Become a certified expert in IT auditing and risk management with our comprehensive CISA course"
          price={23599}
          linkTo="/courses/cisa" 
          enrollLink="https://rzp.io/rzp/VuvF84x" 
          imageStyle="object-cover w-full"
          gst="Including GST"
        />
        <Card
          title="Internal Audit Practioner (IAP)"
          image={iapLogo}
          text="Kickstart your CIA journey with our IAP course—covering audit fundamentals and risk assessment"
          price={23600}
          linkTo="/courses/iap" 
          enrollLink="https://rzp.io/rzp/C7jUKuC" 
          imageStyle="object-contain"
          gst="Including GST"
        />
        <Card
          title="Certification in Risk Management Assurance"
          image={crmaLogoOne}
          text="Advance your risk career with our CRMA course on assurance, governance, and mitigation"
          price={29500}
          linkTo="/courses/crma" 
          enrollLink="https://rzp.io/rzp/hjuC9dj" 
          imageStyle="object-contain"
          gst="Including GST"
        />
      </div>
    </>
  );
}