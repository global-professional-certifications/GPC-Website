import React from 'react';
import { Link } from 'react-router-dom';
import { height } from '../Notifications/NotificationBanner';
import { Helmet } from 'react-helmet-async';
import MetaTags from '../MetaTags';
import { FaArrowRightLong } from "react-icons/fa6";
import { FaGlobe, FaHandsHelping, FaUserTie, FaLaptop, FaClipboardList, FaChalkboardTeacher, FaPenFancy, FaCertificate } from "react-icons/fa";

import FAQDisplay from "../FAQDisplay.jsx";
import CoursesShowcase from "../Courses/CoursesShowcase.jsx";
import BlogCall from "../Blogs/BlogCall";
import DescriptiveGridCardsBlue from '../DescriptiveSection/DescriptiveGridCardsBlue.jsx';
import DescriptiveBullets from '../DescriptiveSection/DescriptiveBullets.jsx';
import DescriptiveGridCards from '../DescriptiveSection/DescriptiveGridCards.jsx';
import DescriptiveLeft from '../DescriptiveSection/DescriptiveLeft.jsx';
import CompaniesShowcase from '../Companies/CompaniesShowcase.jsx';
import DescriptiveFlowchart from "../DescriptiveSection/DescriptiveFlowchart";
import WhyGPC from '../DescriptiveSection/WhyGPC';
import MentorShowcase from "../About/MentorShowcase.jsx";

import crmaHero from "../../assets/courses/crma/crma-hero.webp";
import faqImage from "../../assets/faq.webp";
import crmaBenefits from "../../assets/courses/crma/crma-benefits.webp";
import crmaAbout from "../../assets/courses/crma/about-crma.webp";


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
      <MetaTags
        title="CRMA Certification - Global Professional Certifications"
        description="Advance your career in risk management and assurance with our CRMA course. Learn governance, control, and mitigation techniques with expert guidance."
        canonicalUrl="https://globalprofessionalcertifications.com/courses/crma"
      />
      <Helmet>
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
              <p className="mt-4 text-base sm:text-lg md:text-lg text-gray-200 max-w-2xl leading-relaxed">
                Elevate your risk management career with IIA's CRMA certification. Master <span className='font-bold text-orange-400'>enterprise risk assessment, governance frameworks, and assurance methodologies</span> through expert-led training, comprehensive study materials, and end-to-end exam support.
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
            <img className="w-[550px] h-auto rounded-xl shadow-2xl hidden md:block" src={crmaHero} alt="homepage hero" loading='lazy' />
          </div>

        </div>
      </div>

      {/* Main Content */}
      <main className="py-12 bg-gray-50">

        {/* About the CRMA Course */}

        <DescriptiveLeft
          titleStart="About the "
          highlight="CRMA"
          titleEnd="Course"
          description="Elevate your risk management skills with our Certification in Risk Management Assurance (CRMA) course. This program prepares you for the CRMA certification exam, focusing on risk management principles, assurance, and governance. Gain expertise in identifying, assessing, and mitigating risks, and enhance your career prospects in risk management and assurance. Our structured curriculum ensures you master the core competencies required to succeed. Upon completion, participants will be equipped to excel in risk management roles, providing valuable assurance to organizations."
          image={crmaAbout}
          imageAlt="About the CRMA Course"
        />


        {/* Course Highlights Section - Professional Grid */}
        <section className="mb-20 mx-auto py-12 px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Course <span className="text-brand-blue font-normal italic">Highlights</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              "Complete everything in recorded class itself - detailed discussion of every topic, Mock Tests, MCQs discussion",
              "Get access to LMS Portal which includes recorded sessions + PPT notes + MCQs (with no validity period)",
              "Get guidance from one of the best CRMA faculty in India, Mr. Arpit Garg",
              "Enroll with us and get our end-to-end support till you clear all your exams"
            ].map((item, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl border border-gray-100 hover:border-brand-blue/30 hover:shadow-lg transition-all duration-300 flex items-start gap-4">
                <div className="p-2 rounded-full bg-brand-blue/10 flex items-center justify-center shrink-0 mt-1">
                  <div className="w-2.5 h-2.5 rounded-full bg-brand-blue" />
                </div>
                <p className="text-gray-800 text-base font-normal font-poppins">{item}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CRMA Course Benefits */}

        <DescriptiveGridCardsBlue
          titleStart="CRMA Course"
          highlight="Benefits"
          titleEnd=""
          description=""
          cards={[
            {
              text: "Professionals in India and globally become proficient in risk management assessment and assurance with the help of the CRMA certification.",
            },
            {
              text: "Expertise in control assurance, risk identification, and mitigation helps enhance credibility with leadership, stakeholders, and audit committees.",
            },
            {
              text: "You can get better career opportunities with CRMA certification in roles such as compliance advisor, risk manager, or internal audit leader.",
            },
            {
              text: "In terms of salary potential, certified professionals stay ahead of non-certified peers and gain higher earning opportunities.",
            },
            {
              text: "Individuals improve their skill sets, learn best practices, and gain practical understanding of organizational risk frameworks.",
            },
          ]}
        />

        {/* Who Will Get Benefits from This Course? */}

        <DescriptiveBullets
          titleStart="Who Will Get"
          highlight="Benefits"
          titleEnd="from This Course?"
          image={crmaBenefits}
          imageAlt="Who Will Benefit from CRMA Course"
          description="Candidates from the following category will get the most benefits from this course:"
          points={[
            {
              title: "Risk management professionals",
              text: "who want to evaluate and improve organizational risk frameworks",
            },
            {
              title: "Internal auditors",
              text: "responsible for improving assurance over governance processes and risk management",
            },
            {
              title: "Compliance, assurance, and governance team members",
              text: "involved in control assessments",
            },
            {
              title: "Audit committee members",
              text: "seeking deeper knowledge into risk assurance for advising leadership",
            },
            {
              title: "Executive leaders and managers",
              text: "responsible for overseeing organizational risk oversight and reporting",
            },
            {
              title: "Compliance and audit function heads",
              text: "preparing for strategic risk discussions",
            },
            {
              title: "Professionals preparing for the CRMA exam",
              text: "to increase their risk and assurance expertise",
            },
            {
              title: "Aspiring career changers",
              text: "aiming to enter internal audit and risk governance roles",
            },
          ]}
        />


        {/* Course Objectives */}

        <DescriptiveGridCards
          titleStart="Course"
          highlight="Objectives"
          titleEnd=""
          description="The CRMA (Certification in Risk Management) Course helps individuals improve evaluation, assurance, and advisory skills for organizational risk management processes. This course aims to:"
          cards={[
            {
              title: "",
              text:
                "Create strong enterprise risk management and governance structure understanding",
            },
            {
              title: "",
              text:
                "Provide separate assurance for main risk processes",
            },
            {
              title: "",
              text:
                "Evaluate and improve risk management frameworks",
            },
            {
              title: "",
              text:
                "Advise audit committees and senior management",
            },
            {
              title: "",
              text:
                "Support board-level oversight and create informed decision-making",
            },
          ]}
        />

        {/* CRMA Course Eligibility */}

        <div className="py-16 px-4 sm:px-6 lg:px-8 font-poppins">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-4xl font-bold mb-6">
                CRMA Course{" "}
                <span className="text-brand-blue font-normal italic">
                  Eligibility
                </span>
              </h2>
            </div>

            {/* Eligibility Table */}
            <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="bg-brand-blue border-b border-gray-200">
                    <th className="px-6 py-4 text-sm font-bold text-gray-200">
                      <h3 className="m-0">Eligibility Category</h3>
                    </th>
                    <th className="px-6 py-4 text-sm font-bold text-gray-200">
                      <h3 className="m-0">Requirements</h3>
                    </th>
                    <th className="px-6 py-4 text-sm font-bold text-gray-200">
                      <h3 className="m-0">Notes</h3>
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                  {[
                    {
                      category: "Master’s Degree (or equivalent or higher)",
                      requirement:
                        "Must hold a master’s or equivalent degree; can apply and sit for exam; 1-year internal audit or equivalent experience required to complete certification.",
                      notes:
                        "Higher education reduces the required work experience.",
                    },
                    {
                      category: "Bachelor’s Degree (or equivalent)",
                      requirement:
                        "Requires bachelor’s or equivalent; eligible to apply and take exam; requires 2 years internal audit or relevant experience to complete.",
                      notes:
                        "Experience can include risk, compliance, and audit-related disciplines.",
                    },
                    {
                      category: "Active Internal Audit Practitioner (IAP)",
                      requirement:
                        "IAP designation holders may apply; must pass exams and provide 5 years internal audit or equivalent experience.",
                      notes:
                        "Experience equivalent includes quality assurance, risk management, and controls.",
                    },
                    {
                      category: "Without Degree",
                      requirement:
                        "Candidates with 5 years of internal audit or equivalent experience may apply and sit for the exam; must complete the full experience requirement.",
                      notes:
                        "Equivalent experience accepted from related assurance or risk roles.",
                    },
                  ].map((item, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-blue-50/30 transition-colors"
                    >
                      <td className="px-6 py-5 text-sm font-bold text-gray-900">
                        <p className="m-0">{item.category}</p>
                      </td>
                      <td className="px-6 py-5 text-sm text-gray-600 leading-relaxed font-inter">
                        <p className="m-0">{item.requirement}</p>
                      </td>
                      <td className="px-6 py-5 text-xs text-slate-400 italic font-medium font-inter">
                        <p className="m-0">{item.notes}</p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <WhyGPC
          subHeading="Global Professional Certifications provides experienced guidance for your Certification in Risk Management Assurance (CRMA) preparations. Here are why professionals choose our course:"
          items={[
            {
              icon: <FaGlobe className="text-white text-2xl" />,
              title: "Recognized Worldwide",
              description:
                "We are an IIA-registered partner, and this provides global recognition to professionals in their careers.",
            },
            {
              icon: <FaHandsHelping className="text-white text-2xl" />,
              title: "Individual Attention",
              description:
                "Our course provides one-on-one support to you during your certification journey to ensure smooth completion.",
            },
            {
              icon: <FaUserTie className="text-white text-2xl" />,
              title: "Experienced Mentorship",
              description:
                "Get guidance from industry experts to hone your practical knowledge and grow higher in your career.",
            },
            {
              icon: <FaLaptop className="text-white text-2xl" />,
              title: "Flexible Study Timing",
              description:
                "We provide weekend online classes and 100% recorded classes to provide you with flexible study timing.",
            },
          ]}
        />

        {/* About Mentor */}
        <MentorShowcase />

        {/* Process Flowchart */}
        <DescriptiveFlowchart
          titleStart="Process of"
          highlight="Becoming Certified"
          titleEnd="CRMA"
          subHeading=""
          steps={[
            {
              title: "Course Application Submission",
              icon: FaClipboardList,
              description:
                "Choose and apply for the best CRMA certification training program in India with Global Professional Certifications.",
            },
            {
              title: "Training from Industry Professionals",
              icon: FaChalkboardTeacher,
              description:
                "Learn industry-relevant skills from expert mentors during this course and get trained.",
            },
            {
              title: "Continuous Practice",
              icon: FaPenFancy,
              description:
                "Practice constantly with our study materials, mock tests, and MCQs and get ready for the CRMA exam.",
            },
            {
              title: "Certification Completion",
              icon: FaCertificate,
              description:
                "Pass the 150-minute exam with 125 MCQs to achieve the globally recognized CRMA certification.",
            },
          ]}
        />

        {/* Enrollment Section */}
        <div className="py-16 w-full px-4" id="enrollment">
          <div className="max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-brand-blue to-black rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden group border border-white/5">
              {/* Decorative Accent */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-orange-400/10 rounded-full blur-[100px] pointer-events-none group-hover:bg-orange-400/20 transition-colors duration-700"></div>

              <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
                {/* Content Side */}
                <div className="flex-1 text-center lg:text-left space-y-4">
                  <h2 className="text-yellow-500 font-normal italic text-2xl md:text-4xl leading-tight">
                    Certification in Risk Management Assurance
                  </h2>
                  <p className="text-gray-100 text-base md:text-lg max-w-2xl leading-relaxed">
                    Master risk management principles and assurance with our expert-led CRMA course.
                  </p>
                </div>

                {/* Pricing/Action Side */}
                <div className="flex flex-col items-center lg:items-end gap-2 shrink-0">
                  <div className="p-6 rounded-3xl bg-white/10 backdrop-blur-md border border-white/10 shadow-inner text-center lg:text-right">
                    <p className="text-gray-400 text-sm mb-2 font-normal">Total Investment</p>
                    <p className="text-white text-xl md:text-3xl font-black mb-1">INR 29,500</p>
                    <p className="text-orange-400 text-xs italic">Including GST</p>
                  </div>

                  <Link
                    to="https://rzp.io/rzp/hjuC9dj"
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


        {/* Companies */}
        <CompaniesShowcase
          titleStart="Placement Opportunities after"
          highlightOne="CRMA Certification"
          titleEnd="with"
          highlightTwo="Global Professional Certifications"
          description="Trusted by professionals from top multinational corporations for CIA certifications in India"
        />

        {/* Other Courses Cards */}
        <div className='w-full flex justify-center'>
          <CoursesShowcase
            titleStart=""
            highlight="Global Professional Certifications"
            titleEnd="Other Courses"
            courses={["CIA", "CISA", "IAP"]} />
        </div>

        {/* Blog Section */}

        <BlogCall />

        {/* FAQ Section */}

        <div className="px-8 py-12 lg:px-20">
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

export default Crma;
