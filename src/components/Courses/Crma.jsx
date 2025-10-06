import React from 'react';
import { Link } from 'react-router-dom';
import { height } from '../Notifications/NotificationBanner';
import { Helmet } from 'react-helmet-async';

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

      <div className={`bg-gray-100 mt-[${marginTop}px] font-sans`}>
      {/* Header */}
      <header className="bg-brand-blue text-white py-12 text-center">
        <h1 className="px-4 md:px-0 text-3xl md:text-5xl font-bold">
          Certification in Risk Management Assurance (CRMA)
        </h1>
      </header>

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
        <section className="flex flex-col md:flex-row justify-around items-center bg-orange-100 rounded-lg shadow-lg p-6 md:p-8 text-center space-y-6 md:space-y-0 md:space-x-8">
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
      </div>
    </>
  );
};

export default Crma;