import React from 'react';
import { Link } from 'react-router-dom';
import { height } from '../Notifications/NotificationBanner';
import { Helmet } from 'react-helmet-async';
import crmaHero from "../../assets/crma-hero.jpg";


const Crma = () => {
  const marginTop = (68 + (4 * (height ? height : 0))).toString()
  console.log(marginTop)

  const crmaSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Certification in Risk Management Assurance (CRMA)",
    "description":
      "Advance your career in risk management and assurance with the CRMA course by Global Professional Certifications. Learn governance, risk, and control strategies from experts.",
    "provider": {
      "@type": "Organization",
      "name": "Global Professional Certifications",
      "sameAs": "https://globalprofessionalcertifications.com",
    },
    "url": "https://globalprofessionalcertifications.com/courses/crma",
  };

  return (
    <>
      <Helmet>
        <title>CRMA Certification – Global Professional Certifications</title>
        <meta
          name="description"
          content="Advance your career in risk management and assurance with our CRMA course. Learn governance, control, and mitigation techniques with expert guidance."
        />
        <link
          rel="canonical"
          href="https://globalprofessionalcertifications.com/courses/crma"
        />
        <script type="application/ld+json">
          {JSON.stringify(crmaSchema)}
        </script>
      </Helmet>

      {/* Header */}

      <div className={`md:h-screen flex justify-center items-center bg-brand-blue sm:pt-${(16 + (height ? height - 4 : 0)).toString()} pb-12 md:pb-0`}>
        <div className="md:py-32 pt-40 md:pt-32 mx-auto md:max-w-8xl flex flex-col lg:flex-row justify-center items-center gap-12 px-8 md:px-24">
          <div className="max-w-sm md:max-w-2xl mx-auto">
            <div className="relative max-w-xl">
              <h1 className="text-2xl md:text-4xl font-bold leading-tight text-white">
                Become a <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">Certified Risk Management Assurance </span> Professional (CRMA)
              </h1>
              <h2 className="mt-4 text-base sm:text-lg md:text-lg text-gray-200 max-w-2xl leading-relaxed">
                Elevate your risk management career with IIA's CRMA certification. Master <span className='font-bold text-orange-400'>enterprise risk assessment, governance frameworks, and assurance methodologies</span> through expert-led training, comprehensive study materials, and end-to-end exam support.
              </h2>
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
            <img className="w-[550px] h-auto rounded-xl shadow-2xl hidden md:block" src={crmaHero} alt="homepage hero" loading='lazy' />
          </div>

        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* About Section */}
        <section className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl md:text-5xl font-semibold text-brand-blue mb-4 md:mb-8">
            About the CRMA Course
          </h2>
          <p className="text-gray-700 text-md md:text-xl mb-4">
            Elevate your risk management skills with our Certification in Risk Management Assurance (CRMA) course. This program prepares you for the CRMA certification exam, focusing on risk management principles, assurance, and governance.
          </p>
          <p className="text-gray-700 text-md md:text-xl mb-4">
            Gain expertise in identifying, assessing, and mitigating risks, and enhance your career prospects in risk management and assurance.
          </p>
          <div className="bg-blue-50 border-l-4 border-brand-blue p-2 md:p-4 rounded">
            <p className="text-gray-700 text-md md:text-xl">
              Upon completion, participants will be equipped to excel in risk management roles, providing valuable assurance to organizations.
            </p>
          </div>
        </section>

        {/* Course Highlights Section */}
        <section className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl md:text-5xl font-semibold text-brand-blue mb-4 md:mb-8">
            Course Highlights
          </h2>
          <ul className="list-disc list-inside text-gray-700 text-md md:text-xl md:space-y-2">
            <li className="marker:text-brand-blue marker:text-xl">Complete everything in recorded class itself - detailed discussion of every topic, Mock Tests, MCQs discussion</li>
            <li className="marker:text-brand-blue marker:text-xl">Get access to LMS Portal which includes recorded sessions + PPT notes + MCQs (with no validity period)</li>
            <li className="marker:text-brand-blue marker:text-xl">Get guidance from one of the best CRMA faculty in India, Mr. Arpit Garg</li>
            <li className="marker:text-brand-blue marker:text-xl">Enroll with us and get our end-to-end support till you clear all your exams</li>
          </ul>
        </section>

        {/* Enrollment Section */}
        <section id="enrollment" className="flex flex-col md:flex-row justify-around items-center bg-orange-100 rounded-lg shadow-lg p-6 md:p-8 text-center space-y-6 md:space-y-0 md:space-x-8">
          <div className="flex flex-col items-center md:items-start">
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-semibold text-brand-blue mb-2">
                  Enroll Now
              </h2>
              <p className="text-gray-700 text-lg sm:text-xl md:text-2xl mb-2">
                  Enrollment Cost: <span className="font-bold">INR 29,500 </span>{" "}
                  <span className="text-sm italic">(Including GST)</span>
              </p>
          </div>
          <Link
              to="https://rzp.io/rzp/hjuC9dj"
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

export default Crma;