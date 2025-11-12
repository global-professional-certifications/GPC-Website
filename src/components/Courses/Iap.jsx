import React from 'react';
import { Link } from 'react-router-dom';
import { height } from '../Notifications/NotificationBanner';
import { Helmet } from 'react-helmet-async';
import ciaHero from "../../assets/cia-hero.jpg";


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

      {/* Header */}

      <div className={`md:h-screen flex justify-center items-center bg-brand-blue sm:pt-${(16 + (height ? height - 4 : 0)).toString()} pb-12 md:pb-12`}>
        <div className="md:py-32 pt-40 md:pt-32 mx-auto md:max-w-8xl md:flex md:justify-center md:items-center gap-36 px-8">
          <div className="max-w-sm md:max-w-2xl mx-auto">
            <div className="relative max-w-xl">
              <h1 className="text-2xl md:text-5xl font-bold leading-tight text-white">
                Start Your Internal Audit Career:<span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600"> Get IAP Certified</span>
              </h1>
              <h2 className="mt-4 text-base md:text-lg text-gray-200 max-w-2xl leading-relaxed">
                New to internal auditing? The IAP certification is your ideal first step. Master audit essentials like<span className='font-bold text-orange-400'> risk assessment, planning, fieldwork, and reporting</span> with IIA-approved training from expert instructor Arpit Garg. Build the foundation for your CIA journey
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
            <img className="w-[400px] h-auto rounded-xl shadow-2xl hidden md:block" src={ciaHero} alt="homepage hero" />
          </div>

        </div>
      </div>

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
        <section id="enrollment" className="flex flex-col md:flex-row justify-around items-center bg-orange-100 rounded-lg shadow-lg p-6 md:p-8 text-center space-y-6 md:space-y-0 md:space-x-8">
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
    </>
  );
};

export default Iap;