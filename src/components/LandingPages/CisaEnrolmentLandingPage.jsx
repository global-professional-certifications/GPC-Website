import React, { Suspense } from 'react';
import MetaTags from '../MetaTags.jsx';
import logo from '../../assets/navbar/gpc-navbar-logo.webp';
import MentorShowcase from '../About/MentorShowcase.jsx';
import FAQDisplay from '../FAQDisplay.jsx';
import faqImage from '../../assets/faq.webp';

import {
  FaCalendarAlt,
  FaShieldAlt,
  FaChalkboardTeacher,
  FaBookOpen,
  FaLaptop,
  FaArrowRight,
  FaStar,
  FaUserGraduate,
  FaClipboardCheck,
  FaSitemap,
  FaLaptopCode,
  FaServer,
  FaLock,
  FaQuoteLeft,
  FaCheckCircle
} from 'react-icons/fa';

// Loading placeholder for sections
const SectionLoader = () => <div className="py-20 flex justify-center"><div className="w-8 h-8 border-4 border-brand-blue border-t-transparent rounded-full animate-spin"></div></div>;

// Domain Breakdown Flowing Milestone Data
const DOMAIN_BREAKDOWN = [
  {
    id: "01",
    number: "Domain 1",
    percent: 18,
    weightage: "18% Weightage",
    title: "Information System Auditing Process",
    icon: FaClipboardCheck,
    bgTheme: "bg-[#3a1292]",
    ringTheme: "ring-[#3a1292]/30",
    badgeColor: "bg-blue-50 text-brand-blue border-blue-100",
    barColor: "bg-[#3a1292]"
  },
  {
    id: "02",
    number: "Domain 2",
    percent: 18,
    weightage: "18% Weightage",
    title: "Governance and Management of IT",
    icon: FaSitemap,
    bgTheme: "bg-[#a622e1]",
    ringTheme: "ring-[#a622e1]/30",
    badgeColor: "bg-purple-50 text-brand-purple border-purple-100",
    barColor: "bg-[#a622e1]"
  },
  {
    id: "03",
    number: "Domain 3",
    percent: 12,
    weightage: "12% Weightage",
    title: "Information Systems Acquisition, Development & Implementation",
    icon: FaLaptopCode,
    bgTheme: "bg-amber-500",
    ringTheme: "ring-amber-500/30",
    badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
    barColor: "bg-amber-500"
  },
  {
    id: "04",
    number: "Domain 4",
    percent: 26,
    weightage: "26% Weightage",
    title: "Information Systems Operations and Business Resilience",
    icon: FaServer,
    highWeightage: true,
    bgTheme: "bg-emerald-600",
    ringTheme: "ring-emerald-600/30",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    barColor: "bg-emerald-600"
  },
  {
    id: "05",
    number: "Domain 5",
    percent: 26,
    weightage: "26% Weightage",
    title: "Protection of Information Assets",
    icon: FaLock,
    highWeightage: true,
    bgTheme: "bg-rose-600",
    ringTheme: "ring-rose-600/30",
    badgeColor: "bg-rose-50 text-rose-700 border-rose-200",
    barColor: "bg-rose-600"
  }
];

// FAQs Data
const courseFaqs = [
  {
    question: "Who is eligible to take the CISA exam and get certified?",
    answer: "Anyone can sit for the ISACA CISA exam. However, to obtain the certification, ISACA requires a minimum of 5 years of professional work experience in information systems auditing, control, or security. You can waive up to 3 years of this requirement with an associate's or bachelor's degree, or related audit/IT experience. GPC mentors assist you in reviewing your background and drafting your application."
  },
  {
    question: "I am a working professional with a busy schedule. How long does the prep take?",
    answer: "Most of our students successfully clear the CISA exam with 2 to 3 months of consistent study. Our live weekend schedule is designed to fit your work week, leaving your weekdays free to focus on your job."
  },
  {
    question: "What happens if I miss a live session?",
    answer: "Every live session is recorded in HD and uploaded to your GPC student dashboard within 24 hours. You will have unlimited access to these recordings for 1 year, allowing you to catch up or review concepts at your own pace."
  },
  {
    question: "How does GPC support me after the training is over?",
    answer: "We offer comprehensive post-training mentorship. You will remain in our dedicated WhatsApp study group with our mentor Mr. Arpit Garg, where you can ask doubts, review mock question explanations, and receive advice on the ISACA application process."
  },
  {
    question: "Does the course include practice exams?",
    answer: "Yes. Our program includes domain-wise practice questions, mock exams, and test-taking strategies designed to simulate the actual ISACA CISA exam environment, ensuring you feel confident on test day."
  }
];

// Testimonials Data
const TESTIMONIALS_DATA = [
  {
    quote: "I passed my CISA Exam. Thank you so much for your guidance and the efforts you put into the training. I truly couldn’t have done it without your insights and the solid foundation you helped me build. You are a truly valuable teacher, and I feel lucky to have been part of your first batch.",
    author: "Bhargav Tej",
    role: "Compliance Manager",
    companyname: "Micron"
  },
  {
    quote: "From CIA to CISA—Arpit Garg’s mentorship is truly comprehensive. The classes are so well-structured that no student is left with a single doubt. I highly recommend GPC for any global aspirant.",
    author: "Amit Mayani",
    role: "Group Head- Internal Audit & Systems Management",
    companyname: "Karimjee Group"
  },
  {
    quote: "The right guidance made my CISA journey smooth and successful. When the mentor is right, results follow. I give full credit to Arpit for helping me pass CISA with great ease.",
    author: "Jignesh Mehta ",
    role: "Head- Internal Audit",
    companyname: "Qatar National Bank"
  },
  {
    quote: "Cleared CISA Certification on my first attempt. This journey wouldn’t have been possible without the outstanding guidance, structure, and consistent support provided by Global Professional Certifications, especially the exceptional mentorship of Arpit Garg.",
    author: "Praveen Yande",
    role: "Associate Director",
    companyname: "Alliantgroup India Talent "
  },
  {
    quote: "I am thrilled to have passed the CISA exam! This is my second major certification achieved under Arpit's exceptional mentorship, right after my CIA success. The structured support and continuous guidance at GPC made a massive difference in my preparation. Thank you for the unwavering support!",
    author: "Yogesh Soni",
    role: "Deputy General Manager",
    companyname: "Ather Energy  "
  },
  {
    quote: "Delighted to have cleared the CISA exam on my first attempt! The course was well-structured, making complex concepts simple and practical to grasp. Extremely grateful to Mentor Arpit Garg for his exceptional guidance and continuous support throughout my preparation.",
    author: "Bharti Grover",
    role: "Senior Manager – Internal Audit",
    companyname: "E-commerce Company "
  },
  {
    quote: "Passing the CISA exam was a smooth journey, thanks to GPC! A big shoutout to Arpit Garg Sir for his exceptional guidance. The structured training made complex, technical topics easy to grasp for someone with a finance background. His exam strategy and MCQ insights were invaluable. Highly recommend GPC’s CISA program!",
    author: "Pooja Lakhotia ",
    role: "Senior II",
    companyname: "Alliant Talent"
  },
  {
    quote: "A heartfelt thanks to Arpit Sir for his exceptional guidance and structured coaching! His CISA training was instrumental in helping me clear the examination. His in-depth subject knowledge and practical approach make his mentorship truly outstanding.",
    author: "Krinal Dabberu ",
    role: "Senior Officer – Risk & Fraud",
    companyname: "United Arab Bank "
  }
];

export default function CisaEnrolmentLandingPage() {
  const scrollToForm = () => {
    const element = document.getElementById('hero-lead-form');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-poppins selection:bg-brand-blue selection:text-white">
      <MetaTags
        title="CISA Live Interactive Batch | Global Professional Certifications (GPC)"
        description="Fast-Track Your GRC Career & Command Higher Salaries Globally with CISA Certification. Master 5 ISACA Domains with mentor Mr. Arpit Garg. Starts August 15th."
        canonicalUrl="https://globalprofessionalcertifications.com/cisa-enrollment"
      />

      {/* Header - Minimal Header with GPC Logo only */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 py-1.5 px-4 sm:px-8 transition-all font-poppins">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img
              src={logo}
              alt="Global Professional Certifications logo"
              className="h-12 sm:h-14 md:h-16 w-auto object-contain transition-transform duration-300"
              width="160"
              height="60"
            />
          </div>
          <div className="hidden sm:flex items-center space-x-2 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full text-xs text-brand-blue font-semibold">
            <span className="inline-block w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            <span>Live Interactive Mentorship</span>
            <span className="text-gray-300">|</span>
            <span className="text-gray-600">Global Batch</span>
          </div>
        </div>
      </header>

      {/* Hero Section - Sober, Clean & Standard Font Sizing with Embedded Form */}
      <section className="bg-brand-blue text-white py-12 md:py-16 px-4 sm:px-6 lg:px-8 font-poppins">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">

          {/* Left Column: Copy & Value Proposition */}
          <div className="w-full lg:w-[52%] text-center lg:text-left">
            {/* Pre-Heading Urgency Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-orange-300 text-xs font-medium uppercase tracking-wider mb-5 backdrop-blur-sm">
              <FaShieldAlt className="text-xs text-orange-400" />
              <span>ATTENTION: IT Auditors & Security Analysts</span>
            </div>

            {/* Primary Headline */}
            <h1 className="text-2xl md:text-4xl font-bold leading-tight text-white mb-4">
              Fast-Track Your GRC Career & Command Higher Salaries Globally with the{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
                CISA Certification
              </span>
            </h1>

            {/* Sub-Headline */}
            <p className="text-sm sm:text-base text-gray-200 leading-relaxed mb-6 font-normal">
              Master the 5 ISACA Domains in our upcoming CISA Live Interactive Batch starting August 15th. Led by our mentor <strong className="text-white font-semibold">Mr. Arpit Garg (CA, CIA, CISA, CRMA)</strong>. Gain the conceptual clarity needed to pass on your first attempt.
            </p>

            {/* Batch Schedule Showcase + CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch justify-center lg:justify-start gap-4 sm:gap-6 mb-2">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 text-xs sm:text-sm text-gray-200 font-medium justify-center lg:justify-start">
                  <FaCalendarAlt className="text-orange-400 text-xl sm:text-2xl shrink-0" />
                  <span className="block text-white font-semibold">Batch starts from <strong className="text-amber-300 font-bold">Aug 23rd</strong></span>
                </div>
                <a
                  href="https://zfrmz.in/m394pgOFL1meu9stLsgh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full px-6 py-3 rounded-lg font-semibold text-sm text-white bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 hover:scale-[1.02] transition-all duration-200 shadow-md flex items-center justify-center gap-2.5 cursor-pointer group"
                >
                  <span>Secure Your Seat</span>
                </a>
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 text-xs sm:text-sm text-gray-200 font-medium justify-center lg:justify-start">
                  <FaChalkboardTeacher className="text-orange-400 text-xl sm:text-2xl shrink-0" />
                  <span className="block text-white font-semibold">Free Orientation on <strong className="text-amber-300 font-bold">Aug 15th, 5 PM - 6 PM</strong></span>
                </div>
                <a
                  href="https://zfrmz.in/slj78OhVQrBzqLausmRi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full px-6 py-3 rounded-lg font-semibold text-sm text-white bg-white/10 border border-white/30 hover:bg-white/20 transition-all duration-200 flex items-center justify-center gap-2.5 cursor-pointer group"
                >
                  <span>Book Free Orientation</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Embedded Zoho Form */}
          <div id="hero-lead-form" className="w-full lg:w-[48%] max-w-md lg:max-w-none">
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border border-white/20 h-[530px] sm:h-[550px] transition-all duration-300">
              <iframe
                src="https://zfrmz.in/m394pgOFL1meu9stLsgh"
                width="100%"
                height="100%"
                frameBorder="0"
                style={{ border: 'none' }}
                title="CISA Lead Generation Form"
              ></iframe>
            </div>
          </div>

        </div>
      </section>

      {/* Key Benefits & USPs (Why Choose GPC?) */}
      <section className="py-14 md:py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 font-poppins">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-bold text-center text-gray-900 mb-3">
              Why IT Audit & Risk Professionals Prepare with <span className="text-brand-blue font-normal italic">GPC</span>
            </h2>
            <p className="text-gray-600 text-xs sm:text-sm max-w-xl mx-auto">
              Our proven teaching method combines live interactive learning, ISACA-aligned curriculum, and continuous mentor support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {/* Card 1 */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:border-brand-blue/30 hover:shadow-md transition-all duration-200 group flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-brand-blue text-2xl shrink-0">
                    <FaChalkboardTeacher />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 leading-snug group-hover:text-brand-blue transition-colors">
                    Interactive Live Weekend Sessions
                  </h3>
                </div>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                  Don’t just watch videos. Engage in interactive, weekend live classes tailored for working professionals with real-time Q&A. Master complex IT audit and risk management concepts through practical, real-world case studies aligned with global frameworks such as COBIT, ISO 27001, NIST, SOX, and regulatory standards.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:border-brand-blue/30 hover:shadow-md transition-all duration-200 group flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-brand-purple text-2xl shrink-0">
                    <FaUserGraduate />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 leading-snug group-hover:text-brand-purple transition-colors">
                    Expert Mentorship by Mr. Arpit Garg
                  </h3>
                </div>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                  Learn directly from Mr. Arpit Garg (CA, CIA, CISA, CRMA), holding prestigious certifications and years of teaching experience. Benefit from his proven first-attempt exam strategies, practical industry insights, and structured guidance that have successfully powered over 1,500+ working professionals toward global certification.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:border-brand-blue/30 hover:shadow-md transition-all duration-200 group flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-600 text-2xl shrink-0">
                    <FaBookOpen />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 leading-snug group-hover:text-orange-600 transition-colors">
                    Exam-Centric Study Prep & ISACA Alignment
                  </h3>
                </div>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                  Accelerate your preparation with structured study plans, domain-wise mindmaps, cheat sheets, and high-yield MCQs. Meticulously aligned with the latest ISACA exam specifications and premier study materials, our methodology ensures complete syllabus mastery with zero surprises on exam day.
                </p>
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:border-brand-blue/30 hover:shadow-md transition-all duration-200 group flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-green-50 border border-green-100 flex items-center justify-center text-emerald-600 text-2xl shrink-0">
                    <FaLaptop />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 leading-snug group-hover:text-emerald-600 transition-colors">
                    Unlimited LMS Portal Access (Recorded Sessions + PPT Notes + MCQs)
                  </h3>
                </div>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                  Get access to the LMS Portal, which includes recorded sessions + PPT notes + MCQs (with no validity period). Revisit live class recordings anytime at your own pace, review comprehensive presentation notes, and practice topic-wise MCQs with unlimited access throughout your career journey.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Official Mentor Showcase Component */}
      <MentorShowcase />

      {/* Social Proof & Testimonials Framework */}
      <section className="py-14 md:py-16 px-4 sm:px-6 lg:px-8 bg-white font-poppins">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-bold text-center text-gray-900 mb-3">
              Hear From Our <span className="text-brand-blue font-normal italic">CISA Achievers</span>
            </h2>
            <p className="text-gray-600 text-xs sm:text-sm max-w-xl mx-auto">
              Real feedback from global professionals who cleared their CISA exam with GPC mentorship.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {TESTIMONIALS_DATA.map((t, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 sm:p-7 border border-gray-200/80 shadow-sm hover:shadow-lg hover:border-brand-blue/30 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Background Quote Accent */}
                <FaQuoteLeft className="absolute top-4 right-4 text-gray-100 text-5xl opacity-40 group-hover:text-blue-50 group-hover:scale-110 transition-all pointer-events-none z-0" />

                <div className="relative z-10">
                  {/* Star Rating */}
                  <div className="flex items-center gap-1 text-amber-400 text-sm mb-4">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} />
                    ))}
                  </div>

                  {/* Quote Text */}
                  <p className="text-gray-700 text-xs sm:text-sm leading-relaxed mb-6 font-normal">
                    "{t.quote}"
                  </p>
                </div>

                {/* Author Info & Simple Location Text */}
                <div className="border-t border-gray-100 pt-4 mt-auto flex items-center justify-between gap-3 relative z-10">
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm sm:text-base leading-tight group-hover:text-brand-blue transition-colors">
                      {t.author}
                    </h4>
                    <p className="text-gray-500 text-xs font-medium mt-0.5">
                      {t.role}
                    </p>
                  </div>

                  {/* Location Tile */}
                  <div className="shrink-0">
                    <span className="inline-block text-xs font-semibold text-brand-blue bg-blue-50/90 border border-blue-100/90 px-3 py-1.5 rounded-full shadow-2xs group-hover:bg-brand-blue group-hover:text-white group-hover:border-brand-blue transition-all duration-300">
                      {t.companyname}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Batch Details & Class Schedule */}
      <section className="py-14 md:py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 border-t border-gray-200 font-poppins">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-bold text-center text-gray-900 mb-3">
              CISA Live Batch <span className="text-brand-blue font-normal italic">Schedule</span>
            </h2>
            <p className="text-gray-600 text-xs sm:text-sm mx-auto">
              Structured weekend timings engineered specifically for busy working audit & IT professionals.
            </p>
          </div>

          {/* Schedule Summary Cards */}
          <div className="max-w-4xl mx-auto w-full mb-16 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card 1: Orientation Session */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm border-t-4 border-t-orange-500 relative">
              <div className="inline-block bg-orange-50 text-orange-600 text-[11px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider mb-3">
                Free Orientation
              </div>
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4 flex items-center gap-2.5">
                <FaUserGraduate className="text-orange-500 text-sm" />
                Orientation Session
              </h3>

              <div className="space-y-3 text-xs sm:text-sm text-gray-700 mb-6">
                <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                  <span className="text-gray-500">Date:</span>
                  <strong className="text-gray-900 font-semibold">August 15th</strong>
                </div>
                <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                  <span className="text-gray-500">Timings:</span>
                  <strong className="text-orange-600 font-semibold">5:00 PM - 6:00 PM IST</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Format:</span>
                  <strong className="text-gray-900 font-medium">Live Online Session</strong>
                </div>
              </div>

              <a
                href="https://zfrmz.in/slj78OhVQrBzqLausmRi"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center w-full py-2.5 rounded-lg font-semibold text-xs sm:text-sm text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 transition-all duration-200 shadow-sm cursor-pointer"
              >
                Reserve Your Free Spot
              </a>
            </div>

            {/* Card 2: Live Interactive Batch */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm border-t-4 border-t-brand-blue relative">
              <div className="inline-block bg-blue-50 text-brand-blue text-[11px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider mb-3">
                Live Batch
              </div>
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4 flex items-center gap-2.5">
                <FaChalkboardTeacher className="text-brand-blue text-sm" />
                Live Interactive Batch
              </h3>

              <div className="space-y-3 text-xs sm:text-sm text-gray-700 mb-6">
                <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                  <span className="text-gray-500">Start Date:</span>
                  <strong className="text-gray-900 font-semibold">August 23rd</strong>
                </div>
                <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                  <span className="text-gray-500">Timings:</span>
                  <strong className="text-brand-blue font-semibold">8:30 AM - 11:30 AM IST</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Days:</span>
                  <strong className="text-gray-900 font-medium">Saturday & Sunday (Every Weekend)</strong>
                </div>
              </div>

              <a
                href="https://zfrmz.in/m394pgOFL1meu9stLsgh"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center w-full py-2.5 rounded-lg font-semibold text-xs sm:text-sm text-white bg-brand-blue hover:bg-brand-purple transition-all duration-200 shadow-sm cursor-pointer"
              >
                Enroll Now
              </a>
            </div>
          </div>

          {/* Domain Breakdown — Premium Milestone Roadmap */}
          <div className="mt-20 md:mt-28 lg:mt-32 max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="inline-block px-3.5 py-1 rounded-full bg-blue-50 border border-blue-100 text-brand-blue text-xs font-bold uppercase tracking-wider mb-3">
                ISACA Exam Weightage Roadmap
              </span>
              <h3 className="text-2xl md:text-4xl font-bold text-center text-gray-900">
                Domain Breakdown
              </h3>
            </div>

            {/* Milestone Roadmap */}
            <div className="relative">
              {/* Desktop Flowing Gradient Line — sits behind the nodes */}
              <div className="hidden lg:block absolute top-[36px] left-[calc(10%+28px)] right-[calc(10%+28px)] h-[3px] bg-gradient-to-r from-[#3a1292] via-[#a622e1] via-amber-500 via-emerald-500 to-rose-600 rounded-full z-0" />

              {/* Mobile/Tablet Vertical Trunk Line — continuous, runs through every icon node.
                  Offsets are tuned to the current card min-height (~204px, so icon center ≈ 102px);
                  revisit if card content/min-height changes materially. */}
              <div className="lg:hidden absolute top-[102px] bottom-[102px] left-9 -translate-x-1/2 w-[3px] bg-gradient-to-b from-[#3a1292] via-[#a622e1] via-amber-500 via-emerald-600 to-rose-600 rounded-full z-0" />

              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-3 items-stretch relative z-10">
                {DOMAIN_BREAKDOWN.map((d) => {
                  const IconComponent = d.icon;
                  return (
                    <div key={d.id} className="flex items-center gap-4 text-left lg:flex-col lg:items-center lg:text-center lg:gap-0 group h-full">

                      {/* Icon Node with pulsing ring */}
                      <div className="relative flex-shrink-0 lg:mb-5">
                        <div className={`absolute inset-0 rounded-2xl ${d.bgTheme} opacity-20 scale-125 blur-md group-hover:opacity-40 transition-all duration-300`} />
                        <div className={`relative w-[72px] h-[72px] rounded-2xl ${d.bgTheme} text-white flex items-center justify-center text-2xl shadow-xl border-[3px] border-white ring-2 ${d.ringTheme} transform group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-300`}>
                          <IconComponent />
                        </div>
                      </div>

                      {/* Card */}
                      <div className="flex-1 lg:w-full bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm group-hover:shadow-lg group-hover:border-brand-blue/30 transition-all duration-300 flex flex-col lg:flex-1">
                        {/* Coloured top accent */}
                        <div className={`h-1 w-full ${d.barColor}`} />

                        <div className="py-6 px-4 flex flex-col flex-1 justify-between min-h-[200px]">
                          <div>
                            {/* Domain label */}
                            <span className="inline-block text-[11px] md:text-sm font-extrabold text-brand-blue uppercase tracking-widest mb-2">
                              {d.number}
                            </span>

                            {/* Title */}
                            <h4 className="text-sm md:text-lg font-bold text-gray-900 leading-snug group-hover:text-brand-blue transition-colors">
                              {d.title}
                            </h4>
                          </div>

                          {/* Weightage pill */}
                          <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                            <span className="text-[11px] md:text-sm text-gray-500 font-medium">Weightage</span>
                            <span className={`text-xs font-extrabold px-2.5 py-1 rounded-full border ${d.badgeColor}`}>
                              {d.percent}%
                            </span>
                          </div>
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

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
              width="500"
              height="500"
              className="max-w- w-full object-contain relative z-10 -translate-x-3 -translate-y-3 md:-translate-x-6 md:-translate-y-6 lg:-translate-x-6 lg:-translate-y-6"
            />
          </div>

          {/* Questions Dropdown Section */}
          <div className="w-full lg:w-3/5">
            <Suspense fallback={<SectionLoader />}>
              <FAQDisplay faqs={courseFaqs} showCount={5} showMoreLink="/faq" />
            </Suspense>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-6 px-6 bg-white border-t border-gray-200 text-center text-xs text-gray-500">
        <div className="max-w-6xl mx-auto text-center">
          <span>© {new Date().getFullYear()} Global Professional Certifications. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}
