import React from "react";
import { useState, useEffect, useRef } from "react";
import Hero from "../Hero/Hero";
import Companies from "../Companies/Companies";
import VideoSection from "../VideoSection/VideoSection";
import { Link, NavLink } from "react-router-dom";
import MetaTags from "../MetaTags";
import { Helmet } from "react-helmet-async";
import FAQDisplay from "../FAQDisplay.jsx";
import CelebrationOverlay from "../CelebrationOverlay/CelebrationOverlay";
import { motion } from "framer-motion";
import { Users, GraduationCap, BookCheck } from "lucide-react";
import DescriptiveLeft from "../DescriptiveSection/DescriptiveLeft";
import DescriptiveRight from "../DescriptiveSection/DescriptiveRight";
import CoursesShowcase from "../Courses/CoursesShowcase.jsx";
import BlogCall from "../Blogs/BlogCall";
import TestimonialsShowcase from "../Testimonials/TestimonialsShowcase";
import YouTubeCarousel from "../YouTubeCarousel/YouTubeCarousel";
import MentorShowcase from "../About/MentorShowcase.jsx";

// icons import
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpRightFromSquare,
  faGlobe,
  faChalkboardTeacher,
  faRobot,
  faHandshake,
} from "@fortawesome/free-solid-svg-icons";

// images import
import choose from "../../assets/home/why-choose-global-professional-certifications.webp";
import flowchartWeb from "../../assets/home/how-it-works.webp";
import flowchartMobile1 from "../../assets/home/how-it-works-1.webp";
import flowchartMobile2 from "../../assets/home/how-it-works-2.webp";
import faqImage from "../../assets/faq.webp";
import brochureCover from "../../assets/home/cia-brochure.webp";
import descriptionImage1 from "../../assets/home/global-platform.webp";
import descriptionImage2 from "../../assets/home/global-community.webp";
import ciaAchieverImage from "../../assets/home/cia-achievers.webp"

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


const Counter = ({ target }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target]);

  return <span>{count.toLocaleString()}+</span>;
};

export default function Home() {
  const [showCelebration, setShowCelebration] = useState(false);
  const anniversaryRef = useRef(null);
  const [isAnniversaryVisible, setIsAnniversaryVisible] = useState(false);

  useEffect(() => {
    // Check if celebration has been shown before (persists across sessions)
    const hasSeenCelebration = localStorage.getItem('hasSeenCelebration');
    if (!hasSeenCelebration) {
      setShowCelebration(true);
    }
  }, []);

  const handleCelebrationComplete = () => {
    setShowCelebration(false);
    localStorage.setItem('hasSeenCelebration', 'true');
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsAnniversaryVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (anniversaryRef.current) {
      observer.observe(anniversaryRef.current);
    }

    return () => {
      if (anniversaryRef.current) {
        observer.unobserve(anniversaryRef.current);
      }
    };
  }, []);

  // Homepage schemas
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Global Professional Certifications",
    "alternateName": "GPC",
    "url": "https://globalprofessionalcertifications.com",
    "description": "Leading institute for CIA, CISA, CRMA, and IAP certification training in India",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://globalprofessionalcertifications.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": courseFaqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <>
      {showCelebration && (
        <CelebrationOverlay onComplete={handleCelebrationComplete} />
      )}
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(websiteSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>
      <MetaTags
        title="Global Professional Certifications® | Advance Your Career with Global Professional Certifications in CIA, CISA, CRMA, and IAP"
        description=" Achieve global recognition with our CIA, CISA, CRMA, IAP course training in India and worldwide. Earn an average salary of 8 LPA with our expert-led programs. "
        canonicalUrl="https://globalprofessionalcertifications.com/"
      />
      <div className="bg-gray-50 transition-colors duration-300">

        {/* Hero Section and Stats */}

        <div className="relative">
          {/* Hero Section */}
          <Hero />

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-x-0 -bottom-6 md:-bottom-12 z-20 flex justify-center px-4"
          >
            <div className="bg-white/95 backdrop-blur-md shadow-lg rounded-xl px-5 md:px-6 py-2 md:py-5 border border-gray-100/50 flex flex-row items-stretch md:items-center gap-2 md:gap-0 text-center min-w-[280px] md:min-w-[600px] pt-3">
              {/* Professionals */}
              <div className="h-full flex-1 flex items-start justify-center md:justify-start gap-2.5 px-0 md:px-4">
                <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-brand-purple/10 flex items-center justify-center text-brand-purple flex-shrink-0">
                  <Users size={16} className="md:w-8 md:h-8" />
                </div>
                <div className="flex flex-col gap-0 text-left text-nowrap">
                  <p className="text-sm md:text-2xl font-bold text-gray-900 leading-none">
                    <Counter target={1500} />
                  </p>
                  <p className="text-[8px] md:text-[12px] text-gray-600 mt-0.5">
                    Professionals
                  </p>
                </div>
              </div>

              <div className="hidden md:block w-px h-5 bg-gray-200"></div>

              {/* Teaching Experience */}
              <div className="h-full flex-1 flex items-start justify-center md:justify-start gap-2.5 px-0 md:px-4">
                <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue flex-shrink-0">
                  <GraduationCap size={16} className="md:w-8 md:h-8" />
                </div>
                <div className="flex flex-col gap-0 text-left text-nowrap">
                  <p className="text-sm md:text-2xl font-bold text-gray-900 leading-none">
                    <Counter target={5} />
                  </p>
                  <p className="text-[8px] md:text-[12px] text-gray-600 mt-0.5">
                    Years of Teaching <br />Experience
                  </p>
                </div>
              </div>

              <div className="hidden md:block w-px h-5 bg-gray-200"></div>

              {/* Batches */}
              <div className="h-full flex-1 flex items-start justify-center md:justify-start gap-2.5 px-0 md:px-4">
                <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-600 flex-shrink-0">
                  <BookCheck size={16} className="md:w-8 md:h-8" />
                </div>
                <div className="flex flex-col gap-0 text-left text-nowrap">
                  <p className="text-sm md:text-2xl font-bold text-gray-900 leading-none">
                    <Counter target={25} />
                  </p>
                  <p className="text-[8px] md:text-[12px] text-gray-600 mt-0.5">
                    Batches Completed
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>


        {/* 1-Year Anniversary Celebration Section */}
        <section
          ref={anniversaryRef}
          className={`relative bg-gradient-to-br from-pink-500 via-purple-600 to-purple-700 text-white py-20 md:py-28 px-4 md:px-12 lg:px-20 overflow-hidden transition-all duration-1000 ${isAnniversaryVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
        >
          {/* Beautiful Multi-layered Background Pattern */}
          <div className="absolute inset-0 opacity-15">
            {/* Large polka dots */}
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle, white 2px, transparent 2px)',
              backgroundSize: '60px 60px'
            }}></div>
            {/* Small polka dots offset */}
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
              backgroundSize: '30px 30px',
              backgroundPosition: '15px 15px'
            }}></div>
          </div>

          {/* Radial gradient circles for depth */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-300/10 rounded-full blur-3xl"></div>

          {/* Decorative Doodles */}
          <svg className="absolute top-10 left-10 w-20 h-20 text-yellow-300 opacity-60" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
            <path d="M10,50 Q30,20 50,50 T90,50" />
          </svg>

          {/* Large Beautiful Stars */}
          <div className="absolute top-20 right-20 text-6xl text-purple-300 opacity-50">★</div>
          <div className="absolute top-1/3 right-1/4 text-5xl text-white opacity-40">★</div>
          <div className="absolute bottom-1/4 left-20 text-4xl text-pink-300 opacity-35">★</div>

          {/* Other Doodles */}
          <div className="absolute bottom-20 left-32 w-12 h-12 text-pink-300 opacity-40">▲</div>
          <div className="absolute bottom-32 right-10 w-14 h-14 border-4 border-yellow-400 rounded-full opacity-40"></div>
          <div className="absolute top-1/3 left-10 w-3 h-3 bg-white rounded-full opacity-40"></div>
          <div className="absolute top-1/2 right-1/3 w-4 h-4 bg-white rounded-full opacity-30"></div>

          <div className="container mx-auto relative z-10">
            {/* Centered Title */}
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-4xl font-bold text-white mb-6 leading-tight px-2 md:px-28">
                Global Professional Certifications: Marking 1 Year of <span className="italic font-regular text-yellow-600">Success and Growth</span>
              </h2>
              <p className="text-white text-sm md:text-lg mx-auto font-poppins max-w-2xl">
                We are joining together to celebrate one year of success of our CIA students and aiming to continuously empower them with more knowledge and opportunities.
              </p>
            </div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center mt-8">
              {/* Video - Left Side (2 columns) */}
              <div className="lg:col-span-2">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                  <iframe
                    className="w-full h-[300px] sm:h-[400px] md:h-[450px]"
                    src="https://www.youtube.com/embed/WgA9VzD06kY"
                    title="One Year of GPC | A Journey of Growth, Learning & Cre..."
                    frameBorder="0"
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>

              {/* CTA Card - Right Side (1 column) */}
              <div className="lg:col-span-1">
                <div className="bg-purple-600 bg-opacity-95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border-2 border-purple-400">
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                    Our Journey So Far
                  </h3>
                  <p className="text-white text-base mb-6 opacity-90">
                    Discover how we've grown into a trusted partner for thousands of professionals!
                  </p>
                  <Link
                    to="our-journey"
                    className="inline-flex items-center justify-center w-full py-3 px-6 rounded-full bg-white text-brand-blue font-bold text-lg shadow-lg hover:bg-brand-blue hover:text-white transition-all duration-300"
                  >
                    See Our Journey →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Desc 1 */}

        <DescriptiveLeft
          titleStart="Offering a Global Platform for"
          highlight="GRC Professionals"
          titleEnd=""
          description="Global Professional Certifications provides a global platform for professionals who want to grow in the space of Governance, Risk Management, Assurance and Advisory domains. We offer globally recognized, expert-led online CIA, CISA, CRMA, and IAP course training in India and worldwide. Our courses support you at every step of your journey, from choosing the program to getting certified. Access high-paying job opportunities globally with us. "
          image={descriptionImage1}
          imageAlt="Global Platform"
        />

        {/* Batch Announcement */}
        {/* Upcoming section temporarily hidden - no active announcements */}

        {/* Company Marquee Section */}

        <div className="scale-90 sm:scale-95 md:scale-100 transition-transform duration-300">
          <Companies />
        </div>

        {/* Desc 2 */}

        <DescriptiveRight
          titleStart="Become a Part of the"
          highlight="Global Community"
          titleEnd=""
          description="Join our events to become a part of the thriving global professional network. Stay updated with the latest risk management, audit and advisory trends and connect with industry experts."
          image={descriptionImage2}
          imageAlt="Global Community"
          buttonText="Visit Our Events"
          buttonLink="events"
        />

        {/* Download Brochure CTA */}

        <div className="px-6 md:px-16 lg:px-12 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 ">
            {/* Image Section */}
            <div className="w-full md:w-1/2 flex justify-center">
              <img
                src={brochureCover}
                alt="Brochure"
                loading="lazy"
                className="w-64 md:w-[22rem] h-auto object-contain"
              />
            </div>

            {/* Text Section */}
            <div className="w-full md:w-1/2 flex flex-col justify-center items-center md:items-start gap-4 text-center md:text-left">
              <h2 className="text-xl sm:text-2xl md:text-4xl font-bold mb-4 max-w-[300px] md:max-w-xl lg:max-w-xl">
                Download Our{" "}
                <span className="text-brand-blue font-normal italic">
                  Comprehensive
                </span>{" "}
                CIA Course Brochure
              </h2>
              <p className="text-gray-600 text-xs md:text-base lg:text-base font-poppins leading-relaxed max-w-xl px-8 md:px-0 lg:px-0">
                Unlock global career opportunities as a Certified Internal
                Auditor (CIA) with Global Professional Certifications (GPC). Get
                detailed insights on course structure, expert mentorship, and
                global recognition in our downloadable brochure
              </p>
              <a
                href="https://forms.zohopublic.in/globalprofessionalcertificat1/form/eBookDownload1/formperma/v93vgyL8M0OVomy1AV7xJljAoa-TcJqlIGD7-1nerlU"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-brand-blue text-white text-sm md:text-base py-2 px-4 lg:px-6 rounded-full hover:bg-brand-purple hover:scale-105 transition-all duration-300"
              >
                Download
              </a>
            </div>
          </div>
        </div>

        {/* Why Choose Us? */}

        <div className="py-6 sm:py-12 bg-gray-50 relative overflow-hidden">
          {/* Heading */}
          <div className="text-center px-4 md:px-12">
            <h2 className="font-bold text-2xl md:text-4xl leading-snug text-gray-900">
              Why Choose{" "}
              <span className="text-brand-blue font-normal italic">
                Global Professional Certifications?
              </span>
            </h2>
          </div>

          {/* Main Flex Layout */}
          <div className="flex flex-col lg:flex-row items-center justify-center gap-10 sm:gap-16 md:gap-20 px-4 sm:px-8 md:px-24">
            {/* Left Column */}
            <div className="grid grid-cols-2 lg:flex lg:flex-col justify-center items-center gap-8 sm:gap-12 w-full lg:w-1/3">
              <div className="p-4 sm:p-6 md:p-8 text-center flex flex-col items-center">
                <FontAwesomeIcon
                  icon={faGlobe}
                  className="text-2xl sm:text-3xl md:text-4xl text-brand-blue mb-3 sm:mb-4"
                />
                <p className="text-base sm:text-lg font-semibold">
                  Global Accreditation
                </p>
                <p className="text-gray-600 text-xs md:text-sm lg:text-base font-poppins leading-relaxed">
                  Programs authorized and recognized internationally
                </p>
              </div>

              <div className="p-4 sm:p-6 md:p-8 text-center flex flex-col items-center">
                <FontAwesomeIcon
                  icon={faChalkboardTeacher}
                  className="text-2xl sm:text-3xl md:text-4xl text-brand-blue mb-3 sm:mb-4"
                />
                <p className="text-base sm:text-lg font-semibold">
                  Expert Mentorship
                </p>
                <p className="text-gray-600 text-xs md:text-sm lg:text-base font-poppins leading-relaxed">
                  Led by India's top faculty <br />
                  Arpit Garg (CA, CIA, CRMA, CISA)
                </p>
              </div>
            </div>

            {/* Center Image */}
            <div className="w-full md:w-2/3 lg:w-1/3 flex justify-center relative">
              {/* Shadow Background */}
              <div className="bg-brand-blue w-[60%] md:w-[90%] lg:w-[90%] h-full rounded-3xl absolute rotate-6 shadow-lg"></div>
              <img
                src={choose}
                alt="Why Choose Global Professional Certifications"
                loading="lazy"
                className="w-[60%] md:w-[90%] lg:w-[90%] rounded-3xl relative z-10 shadow-xl"
              />
            </div>

            {/* Right Column */}
            <div className="grid grid-cols-2 lg:flex lg:flex-col justify-center items-center gap-8 sm:gap-12 w-full lg:w-1/3">
              <div className="p-4 sm:p-6 md:p-8 text-center flex flex-col items-center">
                <FontAwesomeIcon
                  icon={faRobot}
                  className="text-2xl sm:text-3xl md:text-4xl text-brand-blue mb-3 sm:mb-4"
                />
                <p className="text-base sm:text-lg font-semibold">
                  Dedicated Support
                </p>
                <p className="text-gray-600 text-xs md:text-sm lg:text-base font-poppins leading-relaxed">
                  Get dedicated support until you succeed. We are with you every
                  step of the way.
                </p>
              </div>

              <div className="p-4 sm:p-6 md:p-8 text-center flex flex-col items-center">
                <FontAwesomeIcon
                  icon={faHandshake}
                  className="text-2xl sm:text-3xl md:text-4xl text-brand-blue mb-3 sm:mb-4"
                />
                <p className="text-base sm:text-lg font-semibold">
                  Flexibility
                </p>
                <p className="text-gray-600 text-xs md:text-sm lg:text-base font-poppins leading-relaxed">
                  Weekend online classes with 100% recorded sessions
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CIA image */}
        <section className=" w-full px-4 py-8 md:px-10 md:py-16 flex justify-center items-center bg-brand-blue">
          <img src={ciaAchieverImage} alt="CIA Achievers Image" loading="lazy" className="object-cover rounded-xl" />
        </section>


        {/* Popular Courses Card Section */}

        <CoursesShowcase
          titleStart="Explore Our"
          highlight="Flagship Certification Programs"
          titleEnd=""
          courses={["CIA", "CISA", "CRMA", "IAP"]} />

        {/* Video Section */}
        <div className="relative w-full overflow-hidden">
          {/* Top White Section */}
          <div className="flex flex-col lg:flex-row justify-center items-center gap-10 lg:gap-28 lg:my-12 lg:mx-4 px-8 py-12 pb-[90px]">
            {/* Left Text Section */}
            <div className="flex flex-col max-w-xl text-center md:text-left">
              <h2 className="text-2xl md:text-4xl font-bold leading-snug px-2 lg:px-8">
                Hear What{" "}
                <span className="text-brand-blue font-normal italic">
                  Our Mentor
                </span>{" "}
                Has To Say About This Course
              </h2>

              {/* Buttons */}
              <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 lg:gap-6 mt-8 px-2 lg:px-8">
                <a
                  href="https://youtu.be/qdnLecSFurU?si=0-A0Xnq7t__ixliV"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-brand-blue text-white text-sm md:text-base py-2 px-4 lg:px-6 rounded-full hover:bg-brand-purple hover:scale-105 transition-all duration-300"
                >
                  Orientation Program
                </a>

                <NavLink
                  to="/about"
                  className="text-brand-blue hover:text-brand-purple transition-all duration-300 transform"
                >
                  <p className="text-sm md:text-base flex items-center gap-1">
                    Learn More{" "}
                    <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                  </p>
                </NavLink>
              </div>
            </div>

            {/* Right Text Section */}
            <div className="md:max-w-lg text-center md:text-left px-4 md:px-0">
              <p className="text-gray-600 text-xs md:text-base lg:text-base font-poppins leading-relaxed">
                At Global Professional Certifications (GPC), we are dedicated to
                empowering professionals worldwide by providing top-tier CIA, CISA, CRMA and IAP
                certification programs that unlock career growth, enhance
                expertise, and elevate industry standards.
              </p>
            </div>
          </div>

          {/* Floating Video */}
          <div className="absolute left-1/2 -translate-x-1/2 top-[60%] md:top-[45%] lg:top-[40%] z-30 w-[100%] md:w-[750px] max-w-full overflow-hidden">
            <VideoSection />
          </div>

          {/* Blue Background Section */}
          <div className="h-[180px] md:h-[350px] mt-4 md:mt-32 lg:mt-32 bg-brand-blue w-full"></div>
        </div>

        {/* How it works? */}

        <div className="w-full py-12">
          <div className="flex flex-col gap-2 justify-center items-center mb-12">
            <h2 className="text-2xl md:text-4xl lg:text-4xl text-center font-bold">
              How It{" "}
              <span className="text-brand-blue font-normal italic">Works?</span>
            </h2>
            <p className="text-xs md:text-base lg:text-base font-poppins leading-relaxed max-w-3xl text-center text-gray-600 mt-6">
              Your Success Path, Simplified
              <br />
              Your Certification Journey From Learning to Leadership
            </p>
          </div>
          <div className="m-8 hidden md:block lg:block">
            <img
              src={flowchartWeb}
              alt="How it works flowchart"
              loading="lazy"
              className="w-[90vw] h-auto mx-auto scale-110"
            />
          </div>
          <div className="mx-4 block md:hidden lg:hidden">
            <div className="w-full h-auto mx-auto">
              <img src={flowchartMobile1} alt="How it works flowchart" loading="lazy" />
              <img
                src={flowchartMobile2}
                alt="How it works flowchart"
                loading="lazy"
                className="-translate-y-8"
              />
            </div>
          </div>
        </div>

        {/* About Mentor */}
        <MentorShowcase />

        {/* Testimonials Section */}
        <TestimonialsShowcase />

        {/* Blog Section */}

        <BlogCall />

        {/* YouTube Videos Section*/}
        <YouTubeCarousel />

        {/* FAQ Section */}

        <div className="mt-24 px-8 pb-40 md:pb-[220px] lg:px-20">
          <div className="flex flex-col lg:flex-row items-center gap-20 lg:gap-0">
            {/* Image Section */}
            <div className="w-full lg:w-2/5 flex justify-center items-center relative">
              <div className="absolute max-w-md w-full h-full bg-brand-blue/30 translate-x-3 translate-y-3 md:translate-x-6 md:translate-y-6 lg:translate-x-6 lg:translate-y-6 z-0"></div>

              {/* Main Image */}
              <img
                src={faqImage}
                alt="FAQ illustration"
                loading="lazy"
                className="max-w- w-full object-contain relative z-10 -translate-x-3 -translate-y-3 md:-translate-x-6 md:-translate-y-6 lg:-translate-x-6 lg:-translate-y-6"
              />
            </div>

            {/* Questions Dropdown Section */}
            <div className="w-full lg:w-3/5">
              <FAQDisplay faqs={courseFaqs} showCount={5} showMoreLink="/faq" />
            </div>
          </div>
        </div>

        {/* Radial Gradient Banner */}

        <div className="relative">
          <div className="absolute left-1/2 -translate-x-1/2 -top-28 z-20 h-56 md:h-56 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)] rounded-2xl py-2 md:py-8 w-full md:max-w-2xl lg:max-w-4xl flex items-center justify-center scale-90 md:scale-100">
            <div className="flex flex-col md:flex-row justify-between items-center mx-8 gap-4 md:gap-8 lg:gap-12">
              {/* Text Content */}
              <div className="text-center md:text-left mb-6 md:mb-0">
                <h3 className="text-white text-lg md:text-2xl lg:text-4xl font-bold">
                  Ready to advance your career?
                </h3>
                <p className="text-gray-200 text-xs md:text-sm lg:text-base mt-2">
                  Enroll now and become part of a global network of successful
                  professionals
                </p>
              </div>

              {/* Button */}
              <Link
                to="/contact"
                className="bg-brand-blue text-white text-sm lg:text-base py-2 px-4 lg:px-6 rounded-full hover:bg-brand-purple  transition-all duration-300"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
        <div className="bg-black">
          <div className="bg-black h-16 md:h-36 relative"></div>
        </div>
      </div>
    </>
  );
}

