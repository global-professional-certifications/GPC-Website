import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { height } from '../Notifications/NotificationBanner';
import { Helmet } from 'react-helmet-async';
import cisaHero from "../../assets/cisa-hero.jpg";
import MetaTags from '../MetaTags';
import DescriptiveLeft from "../DescriptiveSection/DescriptiveLeft";
import internalAudit from "../../assets/cia/internal-audit.webp";
import DescriptiveBullets from "../DescriptiveSection/DescriptiveBullets";
import ProcessFlow from "../DescriptiveSection/ProcessFlow.jsx";
import WhyGPC from '../DescriptiveSection/WhyGPC';
import DescriptiveGridCardsBlue from '../DescriptiveSection/DescriptiveGridCardsBlue.jsx';
import DescriptiveGridCards from '../DescriptiveSection/DescriptiveGridCards.jsx';
import { client } from "../../lib/sanity/client";
import { getRecentPosts } from "../../lib/sanity/queries";
import { urlFor } from "../../lib/sanity/imageBuilder";
import {
  FaLaptop, FaHandsHelping, FaUserTie, FaGlobe, FaClipboardList,
  FaChalkboardTeacher, FaPenFancy, FaCertificate,
} from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCalendarDays, faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import faqImage from "../../assets/our-mission-1.webp";
import FAQDisplay from "../FAQDisplay.jsx";
import TestimonialsShowcase from "../Testimonials/TestimonialsShowcase.jsx";
import ciaCertification from "../../assets/cia/cia-certification.webp";
import { FaArrowRightLong } from "react-icons/fa6";

const courseFaqs = [
  {
    question:
      "How often are CISA certification exams conducted and from where you can give it?",
    answer:
      "CISA certification exams happen once a year, and you can give the exams online with remote proctoring or in an authorized PSI center after completing the registration from ISACA.",
  },
  {
    question:
      "How to renew CISA credentials after first certification completion?",
    answer:
      "It is important to continue studying for 20 hours annually along with providing the annual certification maintenance fee to ISACA for maintaining the CISA certification.",
  },
  {
    question:
      "How to complete CISA certification along with full-time work?",
    answer:
      "Completing the CISA certification is possible while working full-time with proper structure and dedication. Global Professional Certifications provides weekend classes so that you do not miss any class and practice the learnings as per your availability during the weekdays.",
  },
  {
    question:
      "How do I apply for the full certification after passing the exam?",
    answer:
      "Once you have passed the exam, apply for the certification while showing the relevant years of experience (usually 5 years of experience). These details will help you complete certification.",
  },
  {
    question:
      "Is it possible to earn CISA certification without a proper IT background?",
    answer:
      "Yes, it is possible to sit for the CISA exam even without a formal IT related degree. However, it is required for the candidates to gain IT audit experience for successful certification completion.",
  },
];


const Cisa = () => {

  const [latestBlogs, setLatestBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await client.fetch(getRecentPosts);
        setLatestBlogs(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchBlogs();
  }, []);

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

        {/* Who Should Apply for CISA? */}

        <DescriptiveBullets
          titleStart="Who Should Apply for"
          highlight="CISA"
          titleEnd="Certification?"
          image={ciaCertification}
          imageAlt="Why CIA Certification?"
          description="The List of people who should consider applying for CISA certification classes in India: "
          points={[
            {
              title: "",
              text:
                "IT professionals and auditors associated with information systems auditing ",
            },
            {
              title: "",
              text:
                "Risk and compliance experts who evaluates auditing",
            },
            {
              title: "",
              text:
                "IT governance professionals and Security managers",
            },
            {
              title: "",
              text:
                "Audit managers and Internal auditors willing to learn advanced skills",
            },
            {
              title: "",
              text:
                "Anyone seeking to grow in or switch to IT auditing roles ",
            },
          ]}
        />

        {/* CISA Certification Benefits */}

        <DescriptiveGridCardsBlue
          titleStart="CISA Certification"
          highlight="Benefits"
          titleEnd=""
          description="Here are the key benefits of earning a Certified Information Systems Auditor certificate:"
          cards={[
            {
              title: "Career Enhancement:",
              text: "Candidates with this certificate get a higher chance of visibility among other candidates. It is possible for them to seek out senior positions in IT audits, governance, and risk management.",
            },
            {
              title: "Increased Earning Potential:",
              text: "CISA certification helps the candidates to enjoy a higher salary package in comparison to their non-certified peers in these fields.",
            },
            {
              title: "Global Recognition:",
              text: "CISA certification from ISACA has a global recognition which becomes beneficial for candidates to seek out global opportunities.",
            },
            {
              title: "Skill Enhancement:",
              text: "It is possible for candidates to improve their skill sets in IT auditing with the help of CISA certification and that leads to further career enhancement.",
            },
            {
              title: "Professional Networking:",
              text: "Current working professionals get a chance to network with other successful professionals from different organizations to increase the professional networking.",
            },
          ]}
        />


        {/* Certification Eligibility */}
        <section className="px-6 py-20 bg-gray-50">
          <div className="container mx-auto">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">

              {/* Left Column: Heading and CTA */}
              <div className="w-full lg:w-1/3 lg:sticky lg:top-32">
                <div className="flex flex-col gap-6">
                  <div>
                    <h2 className="text-2xl md:text-4xl font-bold leading-tight text-gray-900 mb-6">
                      Certification <span className="text-brand-blue font-normal italic">Eligibility</span>
                    </h2>
                    <p className="text-gray-600 text-sm md:text-base font-poppins leading-relaxed">
                      Candidates need to meet the following criteria to become eligible for CISA certification exam:
                    </p>
                  </div>

                  {/* Highlight CTA Card */}
                  <div className="bg-brand-blue rounded-3xl p-8 text-white shadow-xl relative overflow-hidden group">
                    <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full group-hover:scale-110 transition-transform duration-500"></div>
                    <div className="bg-white/20 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                      <FaChalkboardTeacher size={24} />
                    </div>
                    <h3 className="text-xl font-bold mb-4">Expert Training</h3>
                    <p className="text-gray-100 text-sm md:text-base leading-relaxed font-poppins mb-6">
                      Aspirants can prepare themselves with <span className="text-orange-300 font-semibold italic">experienced CISA training courses</span> in India to understand these requirements more clearly and create the right career journey.
                    </p>
                    <button
                      onClick={() => document.getElementById("enrollment")?.scrollIntoView({ behavior: "smooth" })}
                      className="inline-flex items-center gap-2 text-white font-bold group/btn"
                    >
                      Start Preparation <span className="group-hover/btn:translate-x-2 transition-transform">→</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column: Detailed Criteria */}
              <div className="w-full lg:w-2/3 grid grid-cols-1 gap-6">

                {/* Criterion 1 */}
                <div className="bg-white p-8 rounded-3xl shadow-sm border-l-8 border-brand-blue flex flex-col md:flex-row gap-6 items-start hover:shadow-lg transition-all duration-300">
                  <div className="bg-blue-50 p-4 rounded-2xl text-brand-blue">
                    <FaUserTie size={32} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3">Professional Experience</h3>
                    <p className="text-gray-600 text-sm md:text-base leading-relaxed font-poppins">
                      A minimum of <span className="font-semibold text-brand-blue">five years' experience</span> in the information systems security, auditing or control domain is required for CISA certification qualification.
                    </p>
                  </div>
                </div>

                {/* Criterion 2 */}
                <div className="bg-white p-8 rounded-3xl shadow-sm border-l-8 border-brand-purple flex flex-col md:flex-row gap-6 items-start hover:shadow-lg transition-all duration-300">
                  <div className="bg-purple-50 p-4 rounded-2xl text-brand-purple">
                    <FaClipboardList size={32} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3">Experience Substitutions</h3>
                    <p className="text-gray-600 text-sm md:text-base leading-relaxed font-poppins">
                      Five years of experience can be replaced with <span className="font-semibold text-brand-purple">three years</span> of related experience or education, such as non-IS auditing work or academic experience.
                    </p>
                  </div>
                </div>

                {/* Criterion 3 */}
                <div className="bg-white p-8 rounded-3xl shadow-sm border-l-8 border-orange-500 flex flex-col md:flex-row gap-6 items-start hover:shadow-lg transition-all duration-300">
                  <div className="bg-orange-50 p-4 rounded-2xl text-orange-500">
                    <FaCertificate size={32} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3">Education Requirements</h3>
                    <p className="text-gray-600 text-sm md:text-base leading-relaxed font-poppins">
                      <span className="font-semibold text-orange-600">Bachelor's or master's degree</span> or relevant semester credits are necessary when candidates do not have the required professional work experience.
                    </p>
                  </div>
                </div>

                {/* Criterion 4 */}
                <div className="bg-white p-8 rounded-3xl shadow-sm border-l-8 border-pink-500 flex flex-col md:flex-row gap-6 items-start hover:shadow-lg transition-all duration-300">
                  <div className="bg-pink-50 p-4 rounded-2xl text-pink-500">
                    <FaPenFancy size={32} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3">Exam Qualification</h3>
                    <p className="text-gray-600 text-sm md:text-base leading-relaxed font-poppins">
                      Every candidate <span className="font-semibold text-pink-600 italic">must pass the CISA exam</span> to become eligible for the certification.
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>


        {/* Course Objectives */}

        <DescriptiveGridCards
          titleStart="Course"
          highlight="Objectives"
          titleEnd=""
          description="The objective of this CISA Certification training course is to:"
          cards={[
            {
              title: "",
              text:
                "Plan, conduct and report information system audits that are aligned with professional audit standards",
            },
            {
              title: "",
              text:
                "Understand IT governance frameworks and align them with business goals",
            },
            {
              title: "",
              text:
                "Gain insights regarding the information system lifecycle, from planning to execution",
            },
            {
              title: "",
              text:
                "Develop skills in IT operation evaluation to ensure business resilience and service continuity",
            },
            {
              title: "",
              text:
                "Analyze and protect information assets through effective risk management and security control practices.",
            },
          ]}
        />

        <WhyGPC
          subHeading="Global Professional Certifications stands out as one of the most experienced and trusted CISA certification providers in India for the following reasons:"
          items={[
            {
              icon: <FaLaptop className="text-white text-2xl" />,
              title: "Online Class Flexibility",
              description:
                "We have weekend online classes along with recorded sessions so that you do not miss anything. You can watch our online classes from anywhere and anytime along with a full-time job.",
            },
            {
              icon: <FaHandsHelping className="text-white text-2xl" />,
              title: "Dedicated Support",
              description:
                "You will get dedicated support from the enrolment stage to the certification completion stage to get a seamless career journey experience.",
            },
            {
              icon: <FaUserTie className="text-white text-2xl" />,
              title: "Expert-level Mentors",
              description:
                "Our industry expert mentors will guide you through the journey along with relevant course syllabus, MCQ questions, and other important feedback.",
            },
            {
              icon: <FaGlobe className="text-white text-2xl" />,
              title: "Global Recognition",
              description:
                "The CISA course provided by Global Professional Certifications is an accredited ISACA course. This course will give you global recognition and global exposure in your career journey.",
            },
          ]} />

        {/* Flowchart */}
        <ProcessFlow
          titleStart="Process of"
          highlight="Becoming Certified"
          titleEnd="CISA"
          subHeading="You can become a certified CISA with the following simple steps:"
          steps={[
            {
              title: "Program Selection",
              icon: FaClipboardList,
              description:
                "Select and apply for the best CISA exam preparation programs in India.",
            },
            {
              title: "Get Training",
              icon: FaChalkboardTeacher,
              description:
                "Train yourself with our industry expert mentors and gather knowledge.",
            },
            {
              title: "Practice",
              icon: FaPenFancy,
              description:
                "Practice the course module you are learning during the classes and give the mock tests.",
            },
            {
              title: "Get Certified",
              icon: FaCertificate,
              description:
                "Gain CISA certification with the practical knowledge gathered during the course.",
            },
          ]}
        />

        {/* CISA Enrollment CTA Banner */}

        <div className="py-16 w-full px-4" id="enrollment">
          <div className="max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-brand-blue to-black rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden group border border-white/5">
              {/* Decorative Accent */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-orange-400/10 rounded-full blur-[100px] pointer-events-none group-hover:bg-orange-400/20 transition-colors duration-700"></div>

              <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
                {/* Content Side */}
                <div className="flex-1 text-center lg:text-left space-y-4">
                  <h2 className="text-orange-300 font-normal italic text-2xl md:text-4xl leading-tight">
                    Certified Informations Systems Auditor
                  </h2>
                  <p className="text-gray-300 text-base md:text-lg max-w-2xl leading-relaxed">
                    Become a certified expert in IT auditing and risk management with our comprehensive CISA course.
                  </p>
                </div>

                {/* Pricing/Action Side */}
                <div className="flex flex-col items-center lg:items-end gap-2 shrink-0">
                  <div className="p-6 rounded-3xl bg-white/10 backdrop-blur-md border border-white/10 shadow-inner text-center lg:text-right">
                    <p className="text-gray-400 text-sm mb-2 font-normal">Total Investment</p>
                    <p className="text-white text-xl md:text-3xl font-black mb-1">INR 17,700</p>
                    <p className="text-orange-400 text-xs italic">Including GST</p>
                  </div>

                  <Link
                    to="https://rzp.io/rzp/VuvF84x"
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

        <TestimonialsShowcase />

        {/* Blog Section */}
        <div className="px-6 lg:px-24 w-full mt-6 md:mt-12">
          <div className="flex flex-col gap-2 justify-center items-center md:justify-start md:items-start p-4 mb-12">
            <Link to="/blogs" aria-label="View Learning Resources and Blogs" className="text-2xl md:text-4xl lg:text-4xl text-center font-bold hover:underline hover:text-brand-blue transition-colors">
              <h2>
                Learning Resources & <span className="text-brand-blue font-normal italic">Blogs</span></h2>
            </Link>
            <p className="text-xs md:text-base text-center md:text-left lg:text-base font-poppins leading-relaxed max-w-lg text-gray-600 mt-6">
              Explore expert insights and latest trends in audit, risk, and
              professional certification on our blog
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestBlogs.map((blog) => (
              <Link
                key={blog._id}
                to={`/blogs/${blog.slug.current || blog.slug}`}
                aria-label={`Read blog: ${blog.title}`}
                className="group block bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-200 h-[380px] md:h-[520px]"
              >
                <img
                  src={blog.mainImage ? urlFor(blog.mainImage).url() : ''}
                  alt={blog.title}
                  className="w-full h-36 md:h-56 object-cover"
                />

                <div className="w-full flex justify-between items-center p-4 md:p-6">
                  <div className="flex justify-center items-center gap-2">
                    <FontAwesomeIcon
                      icon={faCalendarDays}
                      className="text-blue-400"
                    />
                    <div className="text-xs md:text-sm text-gray-600">
                      {new Date(blog.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
                    </div>
                  </div>
                  <div className="flex justify-center items-center gap-2">
                    <FontAwesomeIcon icon={faUser} className="text-blue-400" />
                    <div className="text-xs md:text-sm text-gray-600">
                      {blog.author}
                    </div>
                  </div>
                </div>

                <div className="px-4 md:px-6 flex flex-col justify-between pb-6 h-[150px] md:h-[240px]">
                  <div>
                    <h3 className="text-base md:text-xl leading-tight md:leading-tight lg:leading-tight font-semibold text-gray-800 mb-2 line-clamp-3 group-hover:text-brand-blue group-hover:underline">
                      {blog.title}
                    </h3>
                    <p className="text-gray-500 md:text-sm lg:text-sm text-xs line-clamp-2 md:line-clamp-3">
                      {blog.excerpt}
                    </p>
                  </div>

                  <div className="inline-flex justify-start items-center gap-2 p-1 border border-brand-purple rounded-full w-fit mt-8">
                    <span className="md:text-base text-sm pl-2 text-gray-700">
                      Read Full Blog
                    </span>
                    <FontAwesomeIcon
                      icon={faArrowUpRightFromSquare}
                      className="text-white text-xs md:text-sm bg-brand-blue h-2 w-2 md:h-4 md:w-4 rounded-full p-1 md:p-2"
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="flex justify-center items-center mt-12">
            <NavLink to="/blogs">
              <button className="bg-brand-blue text-white text-sm md:text-base py-2 px-4 md:px-6 rounded-full hover:bg-brand-purple hover:scale-105 transition-all duration-300">
                Read More Blogs
              </button>
            </NavLink>
          </div>
        </div>

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

export default Cisa;
