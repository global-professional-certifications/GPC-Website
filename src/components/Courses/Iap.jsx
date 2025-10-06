import React from 'react';
import { Link } from 'react-router-dom';
import { height } from '../Notifications/NotificationBanner';
import { Helmet } from 'react-helmet-async';

const Iap = () => {

  const marginTop = 68 + (4 * (height ? height : 0))

  const iapSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Internal Audit Practitioner (IAP)",
    "description":
      "Start your auditing career with the Internal Audit Practitioner (IAP) course by Global Professional Certifications. Learn essential auditing principles, ethics, and best practices recognized globally.",
    "provider": {
      "@type": "Organization",
      "name": "Global Professional Certifications",
      "sameAs": "https://globalprofessionalcertifications.com",
    },
    "url": "https://globalprofessionalcertifications.com/courses/iap",
  };

  return (
    <>
      <Helmet>
        <title>IAP Certification – Global Professional Certifications</title>
        <meta
          name="description"
          content="Advance your career in internal auditing with our IAP course. Learn essential auditing principles, ethics, and best practices recognized globally."
        />
        <link
          rel="canonical"
          href="https://globalprofessionalcertifications.com/courses/iap"
        />
        <script type="application/ld+json">
          {JSON.stringify(iapSchema)}
        </script>
      </Helmet>
    <div className={`mt-[${marginTop}px] bg-gray-100 font-sans`}>
      {/* Header */}
      <header className="bg-brand-blue text-white py-12 text-center">
        <h1 className="px-4 md:px-0 text-3xl md:text-5xl font-bold">
          Internal Audit Practitioner (IAP)
        </h1>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* About Section */}
        <section className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl md:text-5xl font-semibold text-brand-blue mb-4 md:mb-8">
            About the IAP Course
          </h2>
          <p className="text-gray-700 text-md md:text-xl mb-4">
            The Internal Audit Practitioner designation is a great way to demonstrate internal audit aptitude. Active Internal Audit Practitioners opens a new pathway to the Certified Internal Auditor (CIA) designation, the only globally recognized certification for internal audit practitioners around the world.
          </p>
          <p className="text-gray-700 text-md md:text-xl mb-4">
            Develop the skills and knowledge to perform effective internal audits with our Internal Audit Practitioner Course. This comprehensive program covers internal audit fundamentals, risk assessment, audit planning, fieldwork, and reporting. Ideal for internal auditors, risk management professionals, and accountants seeking to enhance their audit skills and advance their careers.
          </p>
          <div className="bg-blue-50 border-l-4 border-brand-blue p-2 md:p-4 rounded">
            <p className="text-gray-700 text-md md:text-xl">
              Upon completion, participants will be equipped to conduct internal audits, identify risks, and provide valuable insights to stakeholders.
            </p>
          </div>
        </section>

        {/* Course Highlights Section */}
        <section className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl md:text-5xl font-semibold text-brand-blue mb-4 md:mb-8">
            Course Highlights
          </h2>
          <ul className="list-disc list-inside text-gray-700 md:text-xl md:space-y-2">
            <li className="marker:text-brand-blue marker:text-xl">Complete everything in recorded class itself - detailed discussion of every topic, Mock Tests, MCQs discussion</li>
            <li className="marker:text-brand-blue marker:text-xl">Get access to LMS Portal which includes recorded sessions + PPT notes + MCQs (with no validity period)</li>
            <li className="marker:text-brand-blue marker:text-xl">Get guidance from one of the best IAP faculty in India, Mr. Arpit Garg</li>
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
                  Enrollment Cost: <span className="font-bold">INR 23,600 </span>{" "}
                  <span className="text-sm italic">(Including GST)</span>
              </p>
          </div>
          <Link
              to="https://rzp.io/rzp/C7jUKuC"
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

export default Iap;