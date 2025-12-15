import React from "react";
import { useState, useEffect, useRef } from "react";
import Hero from "../Hero/Hero";
import Companies from "../Companies/Companies";
import VideoSection from "../VideoSection/VideoSection";
import learningPartner from "../../assets/Learning_partner.jpg";
import { Link, NavLink } from "react-router-dom";
import MetaTags from "../MetaTags";
import { client } from "../../lib/sanity/client";
import { getRecentPosts } from "../../lib/sanity/queries";
import { urlFor } from "../../lib/sanity/imageBuilder";
import FAQDisplay from "../FAQDisplay.jsx";
import Countdown from "react-countdown";
import CelebrationOverlay from "../CelebrationOverlay/CelebrationOverlay";

// icons import
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faCalendarDays,
  faCertificate,
  faStar,
  faArrowUpRightFromSquare,
  faGlobe,
  faChalkboardTeacher,
  faQuoteLeft,
  faQuoteRight,
  faRobot,
  faHandshake,
} from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-regular-svg-icons";

// images import
import cia from "../../assets/cia-logo.png";
import cisa from "../../assets/cisa-logo-1.png";
import crma from "../../assets/crma-logo-1.png";
import iap from "../../assets/iap-logo.png";
import choose from "../../assets/exam-3.png";
import flowchartWeb from "../../assets/how-it-works.png";
import flowchartMobile1 from "../../assets/how-it-works-1.png";
import flowchartMobile2 from "../../assets/how-it-works-2.png";
import faqImage from "../../assets/our-mission-1.webp";
import testimonialCover from "../../assets/testimonial-cover.png";
import brochureCover from "../../assets/brochure-cover.png";
import pinkyTestimonial from "../../assets/pinky-photo.jpg";
import akshdeepTestimonial from "../../assets/akshdeep-singh.png";
import starwinTestimonial from "../../assets/testimonial-2.png";
import wajihaTestimonial from "../../assets/Wajiha-Ansari.png";
import ramakrishnaTestimonial from "../../assets/Ramakrishna-Mude.jpeg";
import unmeshTestimonial from "../../assets/Unmesh-Upadhye.png";
import annoucement1 from "../../assets/orientation-announcement.png";
import annoucement2 from "../../assets/batch-announcement.webp";

const courseFaqs = [
  {
    question:
      "What certifications or training does Global Professional Certifications offer?",
    answer:
      "Global Professional Certifications specializes in globally recognized certifications for risk management, assurance, audit, and IT governance. Our flagship programs include Certified Internal Auditor (CIA) G�� the gold standard for internal auditing and risk assurance globally, Certified Information Systems Auditor (CISA) G�� for IT audit, cyber risk, and information security professionals, Certification in Risk Management Assurance (CRMA) G�� for expertise in governance, risk, and control, and Internal Auditor Practitioner (IAP) G�� foundational training for aspiring auditors and fresh graduates. Our expert-led training delivers practical knowledge, flexible schedules, and personalized support, helping you unlock new career heights as an auditor, risk advisor, or IT assurance specialist.",
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
      "Global Professional Certifications leverages a blended learning modelG��expert-led live sessions, interactive online resources, case-based simulations, and flexible weekend classes. Our curriculum is aligned with IIA, ISACA, and global standards, ensuring you gain actionable, practical skills for todayG��s risk assurance landscape. We prioritize active learning, career development, and networking within a thriving professional community.",
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

const testimonials = [
  {
    quote:
      "Highly recommend Arpit GargG��s CIA Challenge Exam Prep Course - his clarity, passion, and expertise simplify complex topics and keep you focused, disciplined, and confident throughout.",
    name: "Pinky Agarwal",
    title: "Head Internal Audit, Emami Limited",
    image: pinkyTestimonial,
  },
  {
    quote:
      "Arpit GargG��s CIA Challenge Exam Crash Course helped me clear the exam on my first attempt in just 2 months. Structured weekend sessions built my confidence to succeed.",
    name: "Akshdeep Singh",
    title: "Manager, KPMG",
    image: akshdeepTestimonial,
  },
  {
    quote:
      "Attending Arpit GargG��s CIA Challenge Exam Crash Course was exceptional. His clear, interactive teaching made complex topics simple and key concepts easy to grasp",
    name: "Starwin PJ",
    title: "AVP, Wells Fargo",
    image: starwinTestimonial,
  },
  {
    quote:
      "Arpit GargG��s CIA Crash Course was a game-changer. His intuitive teaching and mentorship built my confidence. The LMS flexibility and weekend sessions made learning achievable and inspiring.",
    name: "Wajiha Ansari",
    title: "Auditor, Grant Thornton Bahrain",
    image: wajihaTestimonial,
  },
  {
    quote:
      "I owe my CIA Challenge Exam success to Arpit GargG��s exceptional guidance. His clarity, structure, and topic-wise MCQs built my confidence. Truly grateful for his mentorshipG��highly recommended!",
    name: "Ramakrishna Mude",
    title: "Head of Technology Audit, Digital Bank in Abu Dhabi",
    image: ramakrishnaTestimonial,
  },
  {
    quote:
      "Passing all three parts of the CIA exam was a journey of growth and grit. Thanks to Arpit GargG��s mentorship, strategy, and insightsG��his guidance made it possible!",
    name: "Unmesh Upadhye",
    title: "Assistant Vice President, State Bank of India",
    image: unmeshTestimonial,
  },
  // {
  //     quote: "Passing the CIA Challenge Exam was a major milestone, thanks to Arpit GargG��s exceptional program. His crisp teaching, focused material, and MCQs clarified concepts and built confidence. Highly recommended!",
  //     name: "Prateek Bhatia",
  //     title: "Group Head of Internal Audit, Cravia Group",
  //     image: feedbackPerson
  // },
];

const eventDate = new Date("2025-12-06T11:30:00");

export default function Home() {
  const [showCelebration, setShowCelebration] = useState(false);
  const [latestBlogs, setLatestBlogs] = useState([]);
  const anniversaryRef = useRef(null);
  const [isAnniversaryVisible, setIsAnniversaryVisible] = useState(false);

  useEffect(() => {
    // Check if celebration has been shown in this session
    const hasSeenCelebration = sessionStorage.getItem('hasSeenCelebration');
    if (!hasSeenCelebration) {
      setShowCelebration(true);
    }
  }, []);

  const handleCelebrationComplete = () => {
    setShowCelebration(false);
    sessionStorage.setItem('hasSeenCelebration', 'true');
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
  return (
    <>
      {showCelebration && (
        <CelebrationOverlay onComplete={handleCelebrationComplete} />
      )}
      <MetaTags
        title="Global Professional Certifications - Advance Your Career"
        description="Get globally recognized with our CIA certification courses. Join 100+ professionals who have advanced their careers through our expert-led programs"
        canonicalUrl="https://globalprofessionalcertifications.com/"
      />
      <div className="bg-gray-50 transition-colors duration-300">

        {/* Hero Section and Stats */}

        <div className="relative">
          {/* Hero Section */}
          <Hero />

          {/* Stats Section */}
          <div className="absolute left-1/2 -translate-x-1/2 -bottom-10 md:-bottom-14 flex items-center justify-center gap-6 sm:gap-10 md:gap-12 bg-white shadow-lg rounded-xl sm:rounded-2xl px-4 md:px-16 lg:px-16 py-6 md:py-8 lg:py-8 text-center z-10 w-auto scale-90 md:scale-100 lg:scale-100">
            {/* Students */}
            <div className="flex items-center gap-3 sm:gap-4">
              <FontAwesomeIcon
                icon={faUser}
                className="text-brand-purple text-lg sm:text-xl md:text-2xl bg-gray-200 rounded-lg p-2"
              />
              <div className="text-left">
                <p className="text-sm sm:text-lg md:text-2xl font-bold text-gray-800">
                  1500+
                </p>
                <p className="text-[10px] sm:text-xs md:text-sm text-gray-600">
                  Professionals
                </p>
              </div>
            </div>

            {/* Certifications */}
            <div className="flex items-center gap-3 sm:gap-4">
              <FontAwesomeIcon
                icon={faCertificate}
                className="text-red-600 text-lg sm:text-xl md:text-2xl bg-yellow-200 rounded-lg p-2"
              />
              <div className="text-left">
                <p className="text-sm sm:text-lg md:text-2xl font-bold text-gray-800">
                  250+
                </p>
                <p className="text-[10px] sm:text-xs md:text-sm text-gray-600">
                  CIAs
                </p>
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-3 sm:gap-4">
              <FontAwesomeIcon
                icon={faStar}
                className="text-yellow-300 text-lg sm:text-xl md:text-2xl bg-blue-300 rounded-lg p-2"
              />
              <div className="text-left">
                <p className="text-sm sm:text-lg md:text-2xl font-bold text-gray-800">
                  5/5
                </p>
                <p className="text-[10px] sm:text-xs md:text-sm text-gray-600">
                  Rating
                </p>
              </div>
            </div>
          </div>
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
              <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-6 leading-tight px-28">
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
                    to="events"
                    className="inline-flex items-center justify-center w-full py-3 px-6 rounded-full bg-white text-brand-blue font-bold text-lg shadow-lg hover:bg-brand-blue hover:text-white transition-all duration-300"
                  >
                    See Our Journey →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* Batch Announcement */}
        {/* Upcoming section temporarily hidden - no active announcements */}

        {/* Company Marquee Section */}

        <div className="scale-90 sm:scale-95 md:scale-100 transition-transform duration-300">
          <Companies />
        </div>

        {/* Popular Courses Card Section */}

        <div className="my-10 px-2 mt-2 md:px-12 lg:px-20">
          <p className="text-2xl md:text-4xl lg:text-4xl pl-4 pr-24 text-left mb-12 font-bold text-gray-900">
            Explore Our{" "}
            <span className="text-brand-blue font-normal italic">
              Flagship Certification Programs
            </span>
          </p>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-6">
            <div className="bg-white border border-gray-200 rounded-xl flex flex-col shadow-md transition-all duration-300 hover:shadow-xl h-full">
              <div className="relative w-full h-28 md:h-48 flex justify-center items-center overflow-hidden rounded-t-xl bg-gray-50 p-4">
                <img
                  src={cia}
                  alt="CIA Course"
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <div className="px-6 py-4 flex flex-col flex-1 justify-between">
                <div>
                  <p className="text-sm md:text-xl font-bold mb-2 text-gray-900">
                    Certified Internal Auditor (CIA)
                  </p>
                  <p className="text-xs md:text-sm text-gray-600 mb-4">
                    Master the complete CIA exam with expert guidance and
                    comprehensive study materials
                  </p>
                </div>
                <NavLink to="/courses/cia">
                  <button className="w-full py-2 px-4 rounded-lg bg-brand-blue text-white font-semibold shadow-md transition-all duration-300 hover:bg-brand-purple hover:scale-105">
                    View Course
                  </button>
                </NavLink>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl flex flex-col shadow-md transition-all duration-300 hover:shadow-xl h-full">
              <div className="relative w-full h-28 md:h-48 flex justify-center items-center overflow-hidden rounded-t-xl bg-gray-50 p-4">
                <img
                  src={cisa}
                  alt="CISA Course"
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <div className="px-6 py-4 flex flex-col flex-1 justify-between">
                <div>
                  <p className="text-sm md:text-xl font-bold mb-2 text-gray-900">
                    Certified Information Systems Auditor (CISA)
                  </p>
                  <p className="text-xs md:text-sm text-gray-600 mb-4">
                    Become a certified expert in IT auditing and risk management
                    with our comprehensive CISA course
                  </p>
                </div>
                <NavLink to="/courses/cisa">
                  <button className="w-full py-2 px-4 rounded-lg bg-brand-blue text-white font-semibold shadow-md transition-all duration-300 hover:bg-brand-purple hover:scale-105">
                    View Course
                  </button>
                </NavLink>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl flex flex-col shadow-md transition-all duration-300 hover:shadow-xl h-full">
              <div className="relative w-full h-28 md:h-48 flex justify-center items-center overflow-hidden rounded-t-xl bg-gray-50 p-4">
                <img
                  src={crma}
                  alt="CRMA Course"
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <div className="px-6 py-4 flex flex-col flex-1 justify-between">
                <div>
                  <p className="text-sm md:text-xl font-bold mb-2 text-gray-900">
                    Certification in Risk Management Assurance (CRMA)
                  </p>
                  <p className="text-xs md:text-sm text-gray-600 mb-4">
                    Advance your risk career with our CRMA course on assurance,
                    governance, and mitigation
                  </p>
                </div>
                <NavLink to="/courses/crma">
                  <button className="w-full py-2 px-4 rounded-lg bg-brand-blue text-white font-semibold shadow-md transition-all duration-300 hover:bg-brand-purple hover:scale-105">
                    View Course
                  </button>
                </NavLink>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl flex flex-col shadow-md transition-all duration-300 hover:shadow-xl h-full">
              <div className="relative w-full h-28 md:h-48 flex justify-center items-center overflow-hidden rounded-t-xl bg-gray-50 p-4">
                <img
                  src={iap}
                  alt="IAP Course"
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <div className="px-6 py-4 flex flex-col flex-1 justify-between">
                <div>
                  <p className="text-sm md:text-xl font-bold mb-2 text-gray-900">
                    Internal Audit Practitioner (IAP)
                  </p>
                  <p className="text-xs md:text-sm text-gray-600 mb-4">
                    Kickstart your CIA journey with our IAP courseG��covering
                    audit fundamentals and risk assessment
                  </p>
                </div>
                <NavLink to="/courses/iap">
                  <button className="w-full py-2 px-4 rounded-lg bg-brand-blue text-white font-semibold shadow-md transition-all duration-300 hover:bg-brand-purple hover:scale-105">
                    View Course
                  </button>
                </NavLink>
              </div>
            </div>
          </div>
        </div>

        {/* Download Brochure CTA */}

        <div className="mt-20 md:mt-32 lg:mt-20 px-6 md:px-16 lg:px-12 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-12">
            {/* Image Section */}
            <div className="w-full md:w-1/2 flex justify-center">
              <img
                src={brochureCover}
                alt="Brochure"
                className="w-64 sm:w-80 md:w-[26rem] h-auto object-contain"
              />
            </div>

            {/* Text Section */}
            <div className="w-full md:w-1/2 flex flex-col justify-center items-center md:items-start gap-4 text-center md:text-left">
              <p className="text-xl sm:text-2xl md:text-4xl font-bold mb-4 max-w-[300px] md:max-w-xl lg:max-w-xl">
                Download Our{" "}
                <span className="text-brand-blue font-normal italic">
                  Comprehensive
                </span>{" "}
                CIA Course Brochure
              </p>
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
          <div className="text-center mt-4 md:mt-16 mb-12 sm:mb-20 px-4 md:px-12">
            <p className="font-bold text-2xl md:text-4xl leading-snug text-gray-900">
              Why Choose{" "}
              <span className="text-brand-blue font-normal italic">
                Global Professional Certifications?
              </span>
            </p>
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
                alt="Why Choose GPC"
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
                  Get dedicated support until you succeed G�� weG��re with you every
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

        {/* Video Section */}
        <div className="relative w-full overflow-visible mt-4 lg:mt-14">
          {/* Top White Section */}
          <div className="flex flex-col lg:flex-row justify-center items-center  gap-10 lg:gap-28 lg:my-12 lg:mx-4 p-12 md:p-18 pb-[90px]">
            {/* Left Text Section */}
            <div className="flex flex-col max-w-xl text-center md:text-left">
              <p className="text-2xl md:text-4xl font-bold leading-snug px-2 lg:px-8">
                Hear What{" "}
                <span className="text-brand-blue font-normal italic">
                  Our Mentor
                </span>{" "}
                Has To Say About This Course
              </p>

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
                empowering professionals worldwide by providing top-tier
                certification programs that unlock career growth, enhance
                expertise, and elevate industry standards
              </p>
            </div>
          </div>

          {/* Floating Video */}
          <div className="absolute left-1/2 -translate-x-1/2 top-[65%] md:top-[45%] lg:top-[35%] z-30 w-[100%] md:w-[750px] max-w-full overflow-hidden">
            <VideoSection />
          </div>

          {/* Blue Background Section */}
          <div className="h-[180px] md:h-[350px] mt-4 md:mt-32 lg:mt-32 bg-brand-blue w-full"></div>
        </div>

        {/* Accreditation */}
        <div className="py-20 px-6 mx-12 my-4 md:my-10 md:px-16">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 md:gap-20">
            {/* Left Content */}
            <div className="flex flex-col gap-6 lg:w-1/2 text-center md:text-left">
              <p className="text-2xl md:text-4xl font-bold leading-snug">
                <span className="text-brand-blue font-normal italic">
                  IIA India
                </span>{" "}
                Authorized Training Partner
              </p>
              <p className="text-gray-600 text-xs md:text-base lg:text-base font-poppins leading-relaxed">
                Mr. Mukundan K.V, CEO of IIA India, presents the official
                accreditation certificate to Arpit Garg, GPC mentor G�� marking
                Global Professional Certifications as an
                <span className="font-semibold">
                  {" "}
                  IIA India Authorized Learning Partner
                </span>
              </p>
              <div className="flex justify-center md:justify-start items-center gap-6 mt-2">
                <a
                  href="https://youtu.be/CvzJ_SFD45Y?si=Qow7Di56YcGFjXjz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-brand-blue text-white text-sm md:text-base py-2 px-4 md:px-6 rounded-full hover:bg-brand-purple hover:scale-105 transition-all duration-300"
                >
                  Watch Video
                </a>
              </div>
            </div>

            {/* Right Image */}
            <div className="flex justify-center md:justify-end w-80 md:w-full lg:w-1/2">
              <img
                src={learningPartner}
                alt="IIA India Certification Ceremony"
                className="w-80 md:w-full lg:w-[550px] h-auto rounded-2xl shadow-xl object-cover transition-all duration-300"
              />
            </div>
          </div>
        </div>

        {/* How it works? */}

        <div className="w-full mb-8">
          <div className="flex flex-col gap-2 justify-center items-center p-4 mb-12">
            <p className="text-2xl md:text-4xl lg:text-4xl text-center font-bold">
              How It{" "}
              <span className="text-brand-blue font-normal italic">Works?</span>
            </p>
            <p className="text-xs md:text-base lg:text-base font-poppins leading-relaxed max-w-3xl text-center text-gray-600 mt-6">
              Your Success Path, Simplified
              <br />
              Your Certification Journey G�� From Learning to Leadership
            </p>
          </div>
          <div className="m-8 hidden md:block lg:block">
            <img
              src={flowchartWeb}
              alt="How it works flowchart"
              className="w-[90vw] h-auto mx-auto scale-110"
            />
          </div>
          <div className="mx-4 block md:hidden lg:hidden">
            <div className="w-full h-auto mx-auto">
              <img src={flowchartMobile1} alt="How it works flowchart" />
              <img
                src={flowchartMobile2}
                alt="How it works flowchart"
                className="-translate-y-8"
              />
            </div>
          </div>
        </div>

        {/* People Image Display */}
        <div className="w-full mx-auto mt-16 md:mt-24 lg:mt-12">
          <div className="flex flex-col gap-2 justify-center items-center p-4 mb-12">
            <p className="text-2xl md:text-4xl text-center font-bold">
              What Our{" "}
              <span className="text-brand-blue font-normal italic">
                Learners{" "}
              </span>
              Say
            </p>
            <p className="text-xs md:text-base lg:text-base font-poppins leading-relaxed max-w-xl md:max-w-2xl lg:max-w-2xl text-center text-gray-600 mt-6 px-8 md:px-0 lg:px-0">
              Discover how Global Professional Certifications' expert-led
              programs empower professionals to achieve global certification and
              career growth
            </p>
          </div>
          <img
            src={testimonialCover}
            alt="Testimonial Cover"
            className="scale-100 md:scale-90"
          />
        </div>

        {/* Feedback Cards */}

        <div className="py-8 bg-gray-50 px-6 lg:px-16 mx-auto md:mx-6 lg:mx-6">
          {/* Top Quote Icon */}
          <FontAwesomeIcon
            icon={faQuoteLeft}
            className="hidden md:block lg:block mb-8 text-3xl text-black md:text-5xl"
          />

          {/* Testimonials Container */}
          <div className="overflow-x-auto">
            <div className="flex flex-row lg:grid lg:grid-cols-3 gap-6 md:gap-8 lg:gap-8 py-10 mx-0 lg:mx-10">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col justify-between min-h-[280px] min-w-[260px] md:min-w-[300px] lg:min-w-0 transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
                >
                  <div className="flex-1 flex items-start">
                    <p className="text-black text-base md:text-lg lg:text-lg font-poppins font-medium">
                      "{testimonial.quote}"
                    </p>
                  </div>
                  <div className="flex items-center justify-start gap-4 pt-6 mt-6 border-t border-gray-200">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-brand-blue aspect-square"
                    />

                    <div>
                      <p className="font-medium font-poppins  text-gray-900 text-xs md:text-sm lg:text-sm">
                        {testimonial.name}
                      </p>
                      <p className="text-xs md:text-sm lg:text-sm font-poppins text-gray-600">
                        {testimonial.title}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom CTA and Quote Icon */}
          <div className="flex justify-center md:justify-between lg:justify-between mt-2 md:mt-8 lg:mt-8 items-center">
            <NavLink to="/success" className="mt-2">
              <button className="bg-brand-blue text-white text-sm md:text-base py-2 px-4 md:px-6 rounded-full hover:bg-brand-purple hover:scale-105 transition-all duration-300">
                Read More Success Stories
              </button>
            </NavLink>
            <FontAwesomeIcon
              icon={faQuoteRight}
              className="hidden md:block lg:block text-3xl text-black md:text-5xl"
            />
          </div>
        </div>

        {/* Blog Section */}

        <div className="px-6 lg:px-24 w-full mt-6 md:mt-12">
          <div className="flex flex-col gap-2 justify-center items-center md:justify-start md:items-start p-4 mb-12">
            <Link to="/blogs" aria-label="View Learning Resources and Blogs" className="text-2xl md:text-4xl lg:text-4xl text-center font-bold hover:underline hover:text-brand-blue transition-colors">
              Learning Resources &amp; <span className="text-brand-blue font-normal italic">Blogs</span>
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
            <NavLink to="/success">
              <button className="bg-brand-blue text-white text-sm md:text-base py-2 px-4 md:px-6 rounded-full hover:bg-brand-purple hover:scale-105 transition-all duration-300">
                Read More Blogs
              </button>
            </NavLink>
          </div>
        </div>

        {/* FAQ Section */}

        <div className="mt-32 px-8 pb-40 md:pb-[220px] lg:px-20">
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

        {/* Radial Gradient Banner */}

        <div className="relative">
          <div className="absolute left-1/2 -translate-x-1/2 -top-28 z-20 h-56 md:h-56 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)] rounded-2xl py-2 md:py-8 w-full md:max-w-2xl lg:max-w-4xl flex items-center justify-center scale-90 md:scale-100">
            <div className="flex flex-col md:flex-row justify-between items-center mx-8 gap-4 md:gap-8 lg:gap-12">
              {/* Text Content */}
              <div className="text-center md:text-left mb-6 md:mb-0">
                <p className="text-white text-lg md:text-2xl lg:text-4xl font-bold">
                  Ready to advance your career?
                </p>
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

