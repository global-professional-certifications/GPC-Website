import React from 'react';
import { Link } from 'react-router-dom';
import { height } from '../Notifications/NotificationBanner';
import { Helmet } from 'react-helmet-async';
import cisaHero from "../../assets/cisa-hero.jpg";
import MetaTags from '../MetaTags';
import DescriptiveLeft from "../DescriptiveSection/DescriptiveLeft";
import internalAudit from "../../assets/cia/internal-audit.webp";


const Cisa = () => {

  const cisaSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Certified Information Systems Auditor (CISA)",
    "description":
      "Become a certified expert in IT auditing and risk management with our comprehensive CISA course by Global Professional Certifications.",
    "provider": {
      "@type": "Organization",
      "name": "Global Professional Certifications",
      "sameAs": "https://globalprofessionalcertifications.com",
    },
    "url": "https://globalprofessionalcertifications.com/courses/cisa",
  };

  const marginTop = 68 + (4 * (height ? height : 0))
  return (
    <>
      <MetaTags
        title="Best CISA Certification in India | Global Professional Certifications"
        description="Become a certified expert in IT auditing and risk management with our globally recognized best CISA certification course in India."
        canonicalUrl="https://globalprofessionalcertifications.com/courses/cisa"
      />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(cisaSchema)}
        </script>
      </Helmet>


      {/* Header */}
      <div className={`md:h-screen flex justify-center items-center bg-brand-blue sm:pt-${(16 + (height ? height - 4 : 0)).toString()} pb-12 md:pb-0`}>
        <div className="md:py-32 pt-40 md:pt-32 mx-auto md:max-w-8xl flex flex-col lg:flex-row justify-center items-center gap-12 px-8 md:px-24">
          <div className="max-w-sm md:max-w-2xl mx-auto">
            <div className="relative max-w-xl">
              <h1 className="text-2xl md:text-4xl font-bold leading-tight text-white">
                Become a Globally Recognized{" "}<span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">Certified IT Audit Expert{" "}</span>with CISA Certification
              </h1>
              <p className='mt-4 text-base sm:text-lg md:text-lg text-gray-200 max-w-2xl leading-relaxed'>
                <ul className='list-disc pl-3'>
                  <li>ISACA aligned CISA certification training program </li>
                  <li>Recorded classes, MCQs and experienced mentorship </li>
                  <li>Master IT auditing, cybersecurity and risk assessment </li>
                  <li>Get guidance from India’s top CISA faculty – Arpit Garg </li>
                </ul>
              </p>
            </div>

            <div className="mt-6">
              <Link
                onClick={() => {
                  document.getElementById("enrollment").scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center justify-center px-8 py-3 text-lg font-semibold text-white rounded-lg shadow-lg transition-all duration-300 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 hover:scale-105 hover:shadow-xl"
                role="button"
              >
                Enroll Now
              </Link>
            </div>
          </div>

          <div className="relative mx-auto lg:max-w-6xl">
            <img className="w-[550px] h-auto rounded-xl shadow-2xl hidden md:block" src={cisaHero} alt="homepage hero" loading='lazy' />
          </div>

        </div>
      </div>

      {/* Main Content */}
      <main className="py-12 bg-gray-50">

        {/* What is Internal Auditing? */}

        <DescriptiveLeft
          titleStart="What is "
          highlight="Certified Information Systems Auditor (CISA)?"
          titleEnd=""
          description="Certified Information Systems Auditor or CISA is a globally recognized auditing program by ISACA. Individuals are able to excel in auditing, assessing, monitoring and controlling the information technology systems and business systems of an organization with this certification knowledge. Candidates need to pass five key domains to successfully complete the CISA certification program. It is necessary to prepare properly and have thorough guidance for successful completion. Many aspiring auditors have been able to become successful during their certification completion journey with the help of top CISA learning programs in India. These programs provide professional guidance that increases their chance of becoming successful. "
          image={internalAudit}
          imageAlt="Internal Auditing?"
        />

        {/* Course Highlights Section */}
        <section className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl md:text-5xl font-semibold text-brand-blue mb-4 md:mb-8">
            Course Highlights
          </h2>
          <ul className="list-disc list-inside text-gray-700 text-md md:text-xl md:space-y-2">
            <li className="marker:text-brand-blue marker:text-xl">Complete everything in recorded class itself - detailed discussion of every topic, Mock Tests, MCQs discussion</li>
            <li className="marker:text-brand-blue marker:text-xl">Get access to LMS Portal which includes recorded sessions + PPT notes + MCQs (with no validity period)</li>
            <li className="marker:text-brand-blue marker:text-xl">Get guidance from one of the best CISA faculty in India, Mr. Arpit Garg</li>
            <li className="marker:text-brand-blue marker:text-xl">Enroll with us and get our end-to-end support till you clear your exam</li>
          </ul>
        </section>

        <section className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl md:text-5xl font-semibold text-brand-blue mb-4 md:mb-8">
            Exam Logistics
          </h2>
          <ul className="list-disc list-inside text-gray-700 text-md md:text-xl md:space-y-2">
            <li className="marker:text-brand-blue marker:text-xl">150 MCQs - No Negative Marking</li>
            <li className="marker:text-brand-blue marker:text-xl">Exam duration: 4 hours</li>
          </ul>
        </section>

        {/* Enrollment Section */}
        <section id="enrollment" className="flex flex-col md:flex-row justify-around items-center bg-orange-100 rounded-lg shadow-lg p-6 md:p-8 text-center space-y-6 md:space-y-0 md:space-x-8">
          <div className="flex flex-col items-center md:items-start">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-semibold text-brand-blue mb-2">
              Enroll Now
            </h2>
            <p className="text-gray-700 text-lg sm:text-xl md:text-2xl mb-2">
              Enrollment Cost: <span className="font-bold">INR 17,700</span>{" "}
              <span className="text-sm italic">(Including GST)</span>
            </p>
          </div>
          <Link
            to="https://rzp.io/rzp/VuvF84x"
            target="_blank"
            className="inline-block bg-orange-500 text-white py-3 px-6 rounded-lg text-lg sm:text-xl md:text-2xl font-semibold hover:bg-orange-800 transition-colors"
          >
            Join the Course
          </Link>
        </section>

      </main>
    </>
  );
};

export default Cisa;
