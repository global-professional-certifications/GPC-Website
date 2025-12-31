import React from 'react';
import { Link } from 'react-router-dom';
import { height } from '../Notifications/NotificationBanner';
import { Helmet } from 'react-helmet-async';

import FAQDisplay from "../FAQDisplay.jsx";
import TestimonialsShowcase from "../Testimonials/TestimonialsShowcase.jsx";
import CoursesShowcase from "../Courses/CoursesShowcase.jsx";
import BlogCall from "../Blogs/BlogCall";
import { FaArrowRightLong } from "react-icons/fa6";

import iapHero from "../../assets/courses/iap/iap-hero.webp";
import faqImage from "../../assets/faq.webp";

const courseFaqs = [
  {
    question:
      "What certifications or training does Global Professional Certifications offer?",
    answer:
      "Global Professional Certifications specializes in globally recognized certifications for risk management, assurance, audit, and IT governance. Our flagship programs include Certified Internal Auditor (CIA) the gold standard for internal auditing and risk assurance globally, Certified Information Systems Auditor (CISA) for IT audit, cyber risk, and information security professionals, Certification in Risk Management Assurance (CRMA) for expertise in governance, risk, and control, and Internal Auditor Practitioner (IAP) foundational training for aspiring auditors and fresh graduates. Our expert-led training delivers practical knowledge, flexible schedules, and personalized support, helping you unlock new career heights as an auditor, risk advisor, or IT assurance specialist.",
  },
  {
    question:
      "How does Global Professional Certifications support students in their career journey?",
    answer:
      "Global Professional Certifications provides comprehensive support for CIA, CISA, CRMA, and IAP exam success with updated study material, practice exams, and webinars led by certified trainers, one-on-one mentorship and doubt resolution sessions, mock tests with performance analytics and feedback, and interactive case studies adapted to real-world audit and risk scenarios. Our approach ensures deep conceptual clarity, practical skill-building, and confident performance in certification exams.",
  },
  {
    question:
      "What are the unique features of Global Professional Certifications' teaching methodology?",
    answer:
      "Global Professional Certifications leverages a blended learning model—expert-led live sessions, interactive online resources, case-based simulations, and flexible weekend classes. Our curriculum is aligned with IIA, ISACA, and global standards, ensuring you gain actionable, practical skills for today's risk assurance landscape. We prioritize active learning, career development, and networking within a thriving professional community.",
  },
  {
    question: "Who is Arpit Garg?",
    answer:
      "Arpit Garg is the Founding Partner of RiskMan Consulting and a certified CIA, CISA, CRMA, and IAP professional. He is widely recognized as the best faculty for CIA, CISA, CRMA, and IAP training in India. As a top-qualified audit, assurance, and risk management expert, he is renowned for his insightful teaching style, industry expertise, and high student success rates. Associated with Global Professional Certifications and recognized by IIA India, Arpit Garg is a trusted mentor for aspiring audit professionals nationwide.",
  },
  {
    question: "Is GPC an authorized learning partner of IIA India?",
    answer:
      "Yes, Global Professional Certifications (GPC) is officially recognized as an Authorized Learning Partner of IIA India. We are proud to be endorsed by Mr. Mukundan K.V, CEO of IIA India, validating our commitment to delivering high-quality internal audit training and exam preparation. As an IIA India Authorized Learning Partner, GPC offers globally recognized programs such as Certified Internal Auditor (CIA), CRMA, and Internal Audit Practitioner (IAP), empowering professionals to upskill with industry-leading resources, expert mentorship, and comprehensive support. Advance your career potential, enhance your audit skills, and join a community of risk professionals who trust GPC for their certification journey.",
  },
];
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
        <title>IAP Certification - Global Professional Certifications</title>
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

      <div className={`md:h-screen flex justify-center items-center bg-brand-blue sm:pt-${(16 + (height ? height - 4 : 0)).toString()} pb-12 md:pb-0`}>
        <div className="md:py-32 pt-40 md:pt-32 mx-auto md:max-w-8xl flex flex-col lg:flex-row justify-center items-center gap-12 px-8 md:px-24">
          <div className="max-w-sm md:max-w-2xl mx-auto">
            <div className="relative max-w-xl">
              <h1 className="text-2xl md:text-4xl font-bold leading-tight text-white">
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
            <img className="w-[550px] h-auto rounded-xl shadow-2xl hidden md:block" src={iapHero} alt="homepage hero" loading='lazy' />
          </div>

        </div>
      </div>

      {/* Main Content */}
      <main className="py-12 bg-gray-50">
        {/* About Section - Professional Redesign */}
        <section className="mb-20 max-w-5xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              About the <span className="text-brand-blue font-normal italic">IAP Course</span>
            </h2>
          </div>
          <div className="bg-white rounded-[2rem] border border-gray-100 p-8 md:p-12 shadow-sm">
            <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
              <p>
                The <span className="font-semibold text-gray-900">Internal Audit Practitioner</span> designation is a great way to demonstrate internal audit aptitude. Active Internal Audit Practitioners opens a new pathway to the Certified Internal Auditor (CIA) designation, the only globally recognized certification for internal audit practitioners around the world.
              </p>
              <p>
                Develop the skills and knowledge to perform effective internal audits with our Internal Audit Practitioner Course. This comprehensive program covers internal audit fundamentals, risk assessment, audit planning, fieldwork, and reporting. Ideal for internal auditors, risk management professionals, and accountants seeking to enhance their audit skills and advance their careers.
              </p>
              <div className="bg-brand-blue/5 border-l-4 border-brand-blue p-6 rounded-r-xl mt-8">
                <p className="text-brand-dark font-medium italic">
                  "Upon completion, participants will be equipped to conduct internal audits, identify risks, and provide valuable insights to stakeholders."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Course Highlights Section - Professional Grid */}
        <section className="mb-20 max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Course <span className="text-brand-blue font-normal italic">Highlights</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              "Complete everything in recorded class itself - detailed discussion of every topic, Mock Tests, MCQs discussion",
              "Get access to LMS Portal which includes recorded sessions + PPT notes + MCQs (with no validity period)",
              "Get guidance from one of the best IAP faculty in India, Mr. Arpit Garg",
              "Enroll with us and get our end-to-end support till you clear all your exams"
            ].map((item, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl border border-gray-100 hover:border-brand-blue/30 hover:shadow-lg transition-all duration-300 flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-brand-blue/10 flex items-center justify-center shrink-0 mt-1">
                  <div className="w-2.5 h-2.5 rounded-full bg-brand-blue" />
                </div>
                <p className="text-gray-700 text-lg font-medium leading-normal">{item}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Enrollment Section - Matching CISA Design */}
        <div className="py-16 w-full px-4" id="enrollment">
          <div className="max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-brand-blue to-black rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden group border border-white/5">
              {/* Decorative Accent */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-orange-400/10 rounded-full blur-[100px] pointer-events-none group-hover:bg-orange-400/20 transition-colors duration-700"></div>

              <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
                {/* Content Side */}
                <div className="flex-1 text-center lg:text-left space-y-4">
                  <h2 className="text-yellow-500 font-normal italic text-2xl md:text-4xl leading-tight">
                    Internal Audit Practitioner
                  </h2>
                  <p className="text-gray-100 text-base md:text-lg max-w-2xl leading-relaxed">
                    Build a strong foundation in internal audit with our globally recognized IAP course.
                  </p>
                </div>

                {/* Pricing/Action Side */}
                <div className="flex flex-col items-center lg:items-end gap-2 shrink-0">
                  <div className="p-6 rounded-3xl bg-white/10 backdrop-blur-md border border-white/10 shadow-inner text-center lg:text-right">
                    <p className="text-gray-400 text-sm mb-2 font-normal">Total Investment</p>
                    <p className="text-white text-xl md:text-3xl font-black mb-1">INR 23,600</p>
                    <p className="text-orange-400 text-xs italic">Including GST</p>
                  </div>

                  <Link
                    to="https://rzp.io/rzp/C7jUKuC"
                    target="_blank"
                    className="w-full group inline-flex items-center justify-center py-3 text-base font-bold text-white rounded-2xl shadow-lg transition-all duration-300 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 hover:scale-105 hover:shadow-orange-500/25"
                  >
                    Enroll Now
                    <FaArrowRightLong className="ml-3 h-5 w-5 group-hover:translate-x-2 transition-transform" />
                  </Link>

                  <p className="text-gray-500 text-[10px] italic">
                    Secure payment gateway via Razorpay
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <TestimonialsShowcase />

        {/* Other Courses Cards */}
        <CoursesShowcase
          titleStart=""
          highlight="Global Professional Certifications"
          titleEnd="Other Courses"
          courses={["CIA", "CISA", "CRMA"]} />

        {/* Blog Section */}

        <BlogCall />

        {/* FAQ Section */}

        <div className="mt-32 px-8 pb-12 md:pb-16 lg:px-20">
          <div className="flex flex-col lg:flex-row items-center gap-20 lg:gap-0">
            {/* Image Section */}
            <div className="w-full lg:w-2/5 flex justify-center items-center relative">
              <div className="absolute max-w-md w-full h-full bg-brand-blue/30 translate-x-3 translate-y-3 md:translate-x-6 md:translate-y-6 lg:translate-x-6 lg:translate-y-6 z-0"></div>

              {/* Main Image */}
              <img
                src={faqImage}
                alt="FAQ illustration"
                className="max-w- w-full object-contain relative z-10 -translate-x-3 -translate-y-3 md:-translate-x-6 md:-translate-y-6 lg:-translate-x-6 lg:-translate-y-6"
              />
            </div>

            {/* Questions Dropdown Section */}
            <div className="w-full lg:w-3/5">
              <FAQDisplay faqs={courseFaqs} showCount={5} showMoreLink="/faq" />
            </div>
          </div>
        </div>

      </main>
    </>
  );
};

export default Iap;
