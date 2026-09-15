import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import MetaTags from '../MetaTags.jsx';
import logo from '../../assets/navbar/gpc-navbar-logo.webp';
import { FiPhoneCall, FiMail } from 'react-icons/fi';
import {
  FaWhatsapp,
  FaPhoneAlt,
  FaChalkboardTeacher,
  FaBookOpen,
  FaLaptop,
  FaClipboardCheck,
  FaTasks,
  FaChartLine,
  FaBolt,
  FaStar,
  FaQuoteLeft,
  FaCheckCircle,
  FaChevronLeft,
  FaChevronRight,
  FaChevronDown,
  FaChevronUp,
  FaArrowRight,
  FaClipboardList,
  FaSpinner
} from 'react-icons/fa';
import Companies from '../Companies/Companies.jsx';
import MentorShowcase from '../About/MentorShowcase.jsx';
import faqImage from '../../assets/faq.webp';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import intlTelInput from 'intl-tel-input';
import 'intl-tel-input/styles';

// Custom Arrows for Testimonial Carousel
const TestimonialPrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute -left-2 sm:-left-5 lg:-left-6 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 bg-white hover:bg-brand-blue rounded-full shadow-lg border border-gray-200 flex items-center justify-center text-gray-700 hover:text-white transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-brand-blue"
    aria-label="Previous testimonials"
  >
    <FaChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
  </button>
);

const TestimonialNextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute -right-2 sm:-right-5 lg:-right-6 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 bg-white hover:bg-brand-blue rounded-full shadow-lg border border-gray-200 flex items-center justify-center text-gray-700 hover:text-white transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-brand-blue"
    aria-label="Next testimonials"
  >
    <FaChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
  </button>
);

const WHATSAPP_URL = "https://wa.me/918736083099?text=Hi%20GPC%20Team,%20I%20am%20interested%20in%20the%20CIA%20Training%20Program";

// Native lead form now POSTs directly to Zoho's submit endpoint (field names/URL pulled from
// Zoho's own "HTML & CSS" embed export) instead of rendering Zoho's hosted form in an iframe.
// Submitted via a real native form POST (targeting a hidden iframe), not fetch() — Zoho's
// endpoint rejects fetch/XHR-style submissions with a 409 regardless of payload correctness.
const ZOHO_SUBMIT_URL = "https://forms.zohopublic.in/globalprofessionalcertificat1/form/CIAEnquiry/formperma/Mh0C4XY-nm68nylJQ6FCm1HmgOgR_-44AJMCWUdLV6M/htmlRecords/submit";
const ZOHO_SUBMIT_TARGET = "zoho-cia-submit-frame";

// value strings must match Zoho's "MultipleChoice" field exactly (including its
// own "CIA part 2" typo — lowercase "p") since Zoho validates submitted values
// strictly; label is what we actually display to the visitor.
const CIA_COURSE_OPTIONS = [
  { label: "CIA Part 1", value: "CIA Part 1" },
  { label: "CIA Part 2", value: "CIA part 2" },
  { label: "CIA Part 3", value: "CIA Part 3" },
  { label: "CIA All Parts", value: "CIA All Parts" },
  { label: "CIA Challenge", value: "CIA Challenge" }
];

// The 4 GPC Pillars
const GPC_PILLARS = [
  {
    icon: FaChalkboardTeacher,
    color: "blue",
    title: "Interactive Live Weekend Sessions",
    description: "Learn directly with our mentor through live, two-way weekend classes featuring discussions, practical examples, and in-depth concept explanations—without disrupting your workweek."
  },
  {
    icon: FaBookOpen,
    color: "purple",
    title: "Official Gleim Study Resources",
    description: "Prepare with official Gleim study materials, including structured content, topic-wise resources, and exam-focused preparation support."
  },
  {
    icon: FaClipboardCheck,
    color: "orange",
    title: "1,000+ MCQs Per Part",
    description: "Build confidence through extensive practice with 1,000+ questions per CIA part, helping you strengthen concepts and become familiar with exam-style questions."
  },
  {
    icon: FaLaptop,
    color: "green",
    title: "Unlimited LMS Access",
    description: "Learn at your own pace with unlimited access to HD class recordings, PPT notes, and MCQs—so you can revisit concepts and revise whenever your schedule allows."
  }
];

const PILLAR_COLOR_CLASSES = {
  blue: { bg: "bg-blue-50", border: "border-blue-100", text: "text-brand-blue", hoverText: "group-hover:text-brand-blue" },
  purple: { bg: "bg-purple-50", border: "border-purple-100", text: "text-brand-purple", hoverText: "group-hover:text-brand-purple" },
  orange: { bg: "bg-orange-50", border: "border-orange-100", text: "text-orange-600", hoverText: "group-hover:text-orange-600" },
  green: { bg: "bg-green-50", border: "border-green-100", text: "text-emerald-600", hoverText: "group-hover:text-emerald-600" }
};

// Course Structure & Exam Coverage
const CIA_PARTS = [
  {
    icon: FaClipboardCheck,
    part: "CIA Part 1",
    title: "Internal Audit Fundamentals",
    focus: "Foundations of Internal Auditing, Ethics & Professionalism, Governance, Risk Management & Control, and Fraud Risks.",
    inclusions: "Live weekend classes, Gleim study resources, 1,000+ MCQs, and full mock tests.",
    cta: "Get Part 1 Details"
  },
  {
    icon: FaTasks,
    part: "CIA Part 2",
    title: "Internal Audit Engagement",
    focus: "Engagement Planning, Information Gathering, Analysis & Evaluation, and Engagement Supervision & Communication.",
    inclusions: "Live weekend classes, Gleim study resources, 1,000+ MCQs, practical case-based learning, and mock exam practice.",
    cta: "Get Part 2 Details"
  },
  {
    icon: FaChartLine,
    part: "CIA Part 3",
    title: "Internal Audit Function",
    focus: "Internal Audit Operations, Internal Audit Plan, Quality of the Internal Audit Function, and Engagement Results & Monitoring.",
    inclusions: "Live weekend classes, Gleim study resources, 1,000+ MCQs, practical application, and mock exam practice.",
    cta: "Get Part 3 Details"
  }
];

// Wall of Excellence Testimonials
const TESTIMONIALS_DATA = [
  {
    quote: "Completing my CIA certification journey with Global Professional Certifications was a great experience. The structured training, comprehensive study materials, and continuous support made my preparation focused and effective. Special thanks to Mr. Arpit Garg for his practical guidance, mentorship, and constant motivation throughout the journey. Highly recommended for anyone pursuing the CIA!",
    author: "Ayush Jha",
    role: "Associate, PwC India (Cleared CIA Part-Wise)",
    companyname: "PwC India"
  },
  {
    quote: "I am deeply grateful to Arpit for his unwavering guidance and support throughout my studies. His clear explanations and encouragement helped me overcome challenges and build confidence in my abilities. Thanks to him, for all his support on this challenging but worthy CIA journey.",
    author: "Sudarshan Bhattar",
    role: "Associate Manager, EY GDS (Cleared CIA Challenge Exam)",
    companyname: "EY GDS"
  },
  {
    quote: "Clearing my CIA Challenge Exam while working a full-time job felt overwhelming at first, but Arpit Sir made the journey much easier. His ability to simplify complex concepts and explain the ‘why’ behind them made preparation more effective and eliminated the need for memorisation. Despite teaching a full batch, he always took the time to address my individual doubts. His expertise, practical guidance, and constant motivation made a real difference. Truly grateful for his mentorship and support!",
    author: "Tanvi Vyawahare",
    role: "VP, Internal Audit, Citibank (Cleared CIA Challenge Exam)",
    companyname: "Citibank"
  },
  {
    quote: "I am truly grateful to Global Professional Certifications for providing a strong, practical, and well-structured CIA learning experience. A special thanks to Mr. Arpit Garg for his clear guidance, exam-focused strategies, and constant motivation, all of which played an important role throughout my CIA journey. His support made the preparation process more focused and effective. Highly recommended for aspiring internal auditors!",
    author: "Hariharan Thekkiam",
    role: "Head of Audit, Standard Chartered Capital (Cleared CIA Challenge Exam)",
    companyname: "Standard Chartered Capital"
  }
];

// Frequently Asked Questions Data (Section 6)
const CIA_FAQS = [
  {
    question: "What is the CIA certification?",
    answer: "The Certified Internal Auditor (CIA) is the only globally recognized professional credential for internal auditors, awarded by The Institute of Internal Auditors (IIA), USA. It demonstrates proficiency in audit standards, risk management, and governance."
  },
  {
    question: "Are GPC's classes live or pre-recorded?",
    answer: "GPC provides live, interactive online weekend sessions. In addition, all sessions are recorded in high definition and uploaded to your LMS portal within 24 hours so you can revisit them anytime."
  },
  {
    question: "How does Unlimited LMS Access work?",
    answer: "With unlimited LMS access, you can revisit recorded lectures, presentation slides, and practice MCQs whenever you need. There's no fixed validity period, giving you the flexibility to learn, revise, and prepare at your own pace until you clear your examination."
  },
  {
    question: "Which study materials are provided?",
    answer: "You receive official Gleim study materials, domain presentation decks, mindmaps, and access to over 1,000 practice MCQs per part with comprehensive answer rationales."
  },
  {
    question: "Can Chartered Accountants (CAs) or ACCAs take the single CIA Challenge Exam?",
    answer: "Eligible members of recognized accounting bodies, including ICAI and ACCA, may qualify for the single-paper CIA Challenge Exam, subject to The IIA's eligibility requirements. GPC offers dedicated Challenge Exam preparation with focused guidance and exam-oriented learning to help eligible professionals prepare for this streamlined pathway to the CIA."
  },
  {
    question: "How do I get upcoming batch dates and fee details?",
    answer: "Submit the quick enquiry form on this page or connect directly with our admissions desk. Our team will share the complete batch schedule, fee structure, and registration link."
  }
];

export default function CiaEnrolmentLandingPage() {
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const leadFormRef = useRef(null);
  const phoneInputRef = useRef(null);
  const itiRef = useRef(null);

  const [leadForm, setLeadForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    courses: []
  });
  const [dialCode, setDialCode] = useState('+91');
  const [formStatus, setFormStatus] = useState('idle'); // idle | submitting | success
  const [formError, setFormError] = useState('');
  const [tickVisible, setTickVisible] = useState(false);

  useEffect(() => {
    if (formStatus === 'success') {
      const id = requestAnimationFrame(() => setTickVisible(true));
      return () => cancelAnimationFrame(id);
    }
    setTickVisible(false);
  }, [formStatus]);

  useEffect(() => {
    const phoneInputEl = phoneInputRef.current;
    if (!phoneInputEl) return;

    const iti = intlTelInput(phoneInputEl, {
      initialCountry: 'in',
      separateDialCode: true
    });
    itiRef.current = iti;

    const handleCountryChange = () => {
      const country = iti.getSelectedCountry();
      if (country) {
        setDialCode(`+${country.dialCode}`);
      }
    };
    phoneInputEl.addEventListener('countrychange', handleCountryChange);

    return () => {
      phoneInputEl.removeEventListener('countrychange', handleCountryChange);
      iti.destroy();
    };
  }, []);

  // Lift the globally-injected Zoho SalesIQ chat button above this page's mobile
  // sticky bar so they don't overlap; scoped via body class so no other page is affected.
  useEffect(() => {
    document.body.classList.add('mobile-sticky-bar-active');
    return () => {
      document.body.classList.remove('mobile-sticky-bar-active');
    };
  }, []);

  const handleLeadFormSubmit = (e) => {
    e.preventDefault();

    const phoneValue = phoneInputRef.current?.value || '';

    if (!leadForm.firstName.trim() || !leadForm.lastName.trim() || !leadForm.email.trim() || !phoneValue.trim() || leadForm.courses.length === 0) {
      setFormError('Please fill in all required fields.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(leadForm.email.trim())) {
      setFormError('Please enter a valid email address.');
      return;
    }
    const phoneDigits = phoneValue.replace(/\D/g, '');
    if (phoneDigits.length < 7 || phoneDigits.length > 12) {
      setFormError('Please enter a valid phone number.');
      return;
    }

    setFormError('');
    setFormStatus('submitting');

    // Zoho's submit endpoint rejects fetch/XHR-style requests (409) — it expects a genuine
    // browser-native form POST. We trigger the real DOM submit (bypassing this onSubmit
    // handler, so no re-entrant loop) targeting a hidden iframe so the page never navigates away.
    leadFormRef.current.submit();

    setTimeout(() => {
      setFormStatus('success');
    }, 1000);
  };

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const scrollToForm = () => {
    const element = document.getElementById('hero-lead-form');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-poppins selection:bg-brand-blue selection:text-white">
      <MetaTags
        title="CIA Live Weekend Batch | Global Professional Certifications (GPC)"
        description="Master the Certified Internal Auditor (CIA) Exam with Structured Live Weekend Training. Official Gleim resources, 1,000+ exam-grade MCQs, and unlimited LMS access with mentor Mr. Arpit Garg."
        canonicalUrl="https://globalprofessionalcertifications.com/cia-enrollment"
      />

      {/* Sticky Top Group: Urgency Bar + Header stick together as one unit */}
      <div className="sticky top-0 z-50">
        {/* Top Urgency Bar */}
        <div className="bg-[#0F172A] text-white font-poppins">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-3 text-center text-xs sm:text-sm">
            <span>
              🚨 Upcoming CIA Live Weekend Batch Starts <strong className="text-[#F59E0B] font-semibold">Sept 19</strong>
              <span className="hidden sm:inline"> | Aligned with Latest IIA Global Standards</span>
            </span>
          </div>
        </div>

        {/* Header - Minimal Header with GPC Logo only */}
        <header className="bg-white/95 backdrop-blur-md border-b border-gray-200 py-1.5 px-4 sm:px-8 transition-all font-poppins">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img
                src={logo}
                alt="Global Professional Certifications logo"
                className="h-14 sm:h-16 md:h-20 w-auto object-contain transition-transform duration-300"
                width="160"
                height="60"
              />
            </div>
            <div className="flex items-center gap-3">
              <a
                href="tel:+918736083099"
                className="flex items-center gap-2.5 sm:gap-3 px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full font-poppins text-white bg-brand-blue hover:bg-[#2e0e75] shadow-sm hover:shadow-md transition-all duration-200 whitespace-nowrap group"
              >
                <FaPhoneAlt className="text-sm sm:text-base text-white shrink-0 group-hover:scale-110 transition-transform duration-200" />
                <div className="flex flex-col text-left">
                  <span className="text-[10px] sm:text-[11px] font-normal text-white/90 leading-tight">
                    Talk to an Expert
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-white tracking-wide leading-tight">
                    +91 87360 83099
                  </span>
                </div>
              </a>
            </div>
          </div>
        </header>
      </div>

      {/* Hero Section - Sober, Clean & Standard Font Sizing with Embedded Form */}
      <section className="bg-brand-blue text-white py-12 md:py-16 px-4 sm:px-6 lg:px-8 font-poppins">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">

          {/* Left Column: Copy & Value Proposition */}
          <div className="w-full lg:w-[52%] text-center lg:text-left">
            {/* Primary Headline */}
            <h1 className="text-3xl md:text-5xl font-bold leading-tight text-white mb-6">
              Master the Certified Internal Auditor{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
                (CIA) Exam
              </span>
              {' '}with Structured Live Weekend Training
            </h1>

            {/* Sub-Headline */}
            <p className="text-base sm:text-lg text-gray-200 leading-relaxed mb-8 font-normal">
              Accelerate your CIA journey with structured, exam-focused preparation designed to help you learn concepts, build confidence, and prepare effectively for the exam—with expert guidance and the right resources at every step.
            </p>
          </div>

          {/* Right Column: Native Lead Form (posts to Zoho, no iframe) */}
          <div id="hero-lead-form" className="w-full lg:w-[48%] max-w-md lg:max-w-none">
            <div className="relative bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border border-white/20 p-5 sm:p-7 transition-all duration-300 text-gray-800">

              {(formStatus === 'submitting' || formStatus === 'success') && (
                <div className="absolute inset-0 bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center z-10 px-6 text-center">
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-all duration-500 ease-out ${formStatus === 'success'
                      ? `bg-emerald-50 ${tickVisible ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`
                      : 'bg-blue-50'
                      }`}
                  >
                    {formStatus === 'submitting' ? (
                      <FaSpinner className="text-brand-blue text-3xl animate-spin" />
                    ) : (
                      <FaCheckCircle className="text-emerald-500 text-4xl" />
                    )}
                  </div>
                  <p className="text-gray-900 font-semibold text-sm sm:text-base">
                    {formStatus === 'submitting' ? 'Submitting your details...' : 'Thank you!'}
                  </p>
                  {formStatus === 'success' && (
                    <p className="text-gray-600 text-xs sm:text-sm mt-1 max-w-xs">
                      Our team will get back to you soon.
                    </p>
                  )}
                </div>
              )}

              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1">
                START YOUR CIA PREPARATION TODAY
              </h3>
              <p className="text-gray-500 text-xs sm:text-sm mb-4">
                Get upcoming batch dates, fee structure, and course brochure.
              </p>

              <form
                ref={leadFormRef}
                onSubmit={handleLeadFormSubmit}
                noValidate
                action={ZOHO_SUBMIT_URL}
                method="POST"
                encType="multipart/form-data"
                target={ZOHO_SUBMIT_TARGET}
                className="space-y-3.5"
              >
                <input type="hidden" name="zf_referrer_name" value="" />
                <input type="hidden" name="zf_redirect_url" value="" />
                <input type="hidden" name="zc_gad" value="" />
                <input type="hidden" name="PhoneNumber_countrycodeval" value={dialCode} />

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="cia-first-name" className="block text-xs font-semibold text-gray-700 mb-1">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="cia-first-name"
                      type="text"
                      name="Name_First"
                      value={leadForm.firstName}
                      onChange={(e) => setLeadForm((prev) => ({ ...prev, firstName: e.target.value }))}
                      maxLength={255}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="cia-last-name" className="block text-xs font-semibold text-gray-700 mb-1">
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="cia-last-name"
                      type="text"
                      name="Name_Last"
                      value={leadForm.lastName}
                      onChange={(e) => setLeadForm((prev) => ({ ...prev, lastName: e.target.value }))}
                      maxLength={255}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="cia-email" className="block text-xs font-semibold text-gray-700 mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="cia-email"
                    type="email"
                    name="Email"
                    value={leadForm.email}
                    onChange={(e) => setLeadForm((prev) => ({ ...prev, email: e.target.value }))}
                    maxLength={255}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="cia-phone" className="block text-xs font-semibold text-gray-700 mb-1">
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    ref={phoneInputRef}
                    id="cia-phone"
                    type="tel"
                    name="PhoneNumber_countrycode"
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent"
                  />
                </div>

                <fieldset>
                  <legend className="block text-xs font-semibold text-gray-700 mb-1.5">
                    Course Interested In <span className="text-red-500">*</span>
                  </legend>
                  <div className="grid grid-cols-2 gap-x-3 gap-y-2 px-3 py-2.5 rounded-lg border border-gray-300">
                    {CIA_COURSE_OPTIONS.map((option) => (
                      <label key={option.value} className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          name="MultipleChoice"
                          value={option.value}
                          checked={leadForm.courses.includes(option.value)}
                          onChange={(e) => {
                            const { checked } = e.target;
                            setLeadForm((prev) => ({
                              ...prev,
                              courses: checked
                                ? [...prev.courses, option.value]
                                : prev.courses.filter((c) => c !== option.value)
                            }));
                          }}
                          className="h-4 w-4 rounded border-gray-300 text-brand-blue focus:ring-brand-blue accent-brand-blue cursor-pointer"
                        />
                        {option.label}
                      </label>
                    ))}
                  </div>
                </fieldset>

                {formError && (
                  <p className="text-red-500 text-xs font-medium">{formError}</p>
                )}

                <button
                  type="submit"
                  disabled={formStatus === 'submitting'}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-lg font-semibold text-sm text-white bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 hover:scale-[1.01] transition-all duration-200 shadow-md cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  <span>GET COURSE DETAILS & BATCH FEES</span>
                  <FaArrowRight className="text-xs shrink-0" />
                </button>

                <p className="text-gray-400 text-[11px] text-center leading-snug">
                  🔒 100% Privacy. No spam. Course brochure & batch schedule will be delivered directly to your WhatsApp and Email.
                </p>
              </form>

              <iframe
                name={ZOHO_SUBMIT_TARGET}
                title="Form submission target"
                hidden
              />
            </div>
          </div>

        </div>
      </section>

      {/* Trust & Alumni Strip */}
      <Companies />

      {/* Section 1: The GPC Advantage — 4 Pillars */}
      <section className="py-14 md:py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 font-poppins">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-bold text-center text-gray-900 mb-3">
              Why Audit & Risk Professionals Choose <span className="text-brand-blue font-normal italic">GPC</span> for CIA Preparation
            </h2>
            <p className="text-gray-700 text-base sm:text-lg max-w-3xl mx-auto text-pretty">
              Balancing a demanding professional career with CIA preparation requires more than self-paced learning. GPC combines live, interactive sessions with structured guidance and flexible recorded access—helping working professionals stay focused, consistent, and exam-ready.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {GPC_PILLARS.map((pillar, idx) => {
              const Icon = pillar.icon;
              const colors = PILLAR_COLOR_CLASSES[pillar.color];
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:border-brand-blue/30 hover:shadow-md transition-all duration-200 group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`w-12 h-12 rounded-xl ${colors.bg} border ${colors.border} flex items-center justify-center ${colors.text} text-2xl shrink-0`}>
                        <Icon />
                      </div>
                      <h3 className={`text-lg sm:text-xl font-bold text-gray-900 leading-snug ${colors.hoverText} transition-colors`}>
                        {pillar.title}
                      </h3>
                    </div>
                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center">
            <button
              onClick={scrollToForm}
              className="inline-flex items-center justify-center px-8 py-3 rounded-lg font-semibold text-sm text-white bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 hover:scale-[1.02] transition-all duration-200 shadow-md cursor-pointer"
            >
              Speak with a Course Advisor
            </button>
          </div>
        </div>
      </section>

      {/* Section 2: Course Structure & Exam Coverage */}
      <section className="py-14 md:py-16 px-4 sm:px-6 lg:px-8 bg-white font-poppins">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-bold text-center text-gray-900 mb-3">
              Comprehensive Preparation Aligned with <span className="text-brand-blue font-normal italic">Latest IIA Standards</span>
            </h2>
            <p className="text-gray-600 text-xs sm:text-sm max-w-3xl mx-auto text-pretty">
              Choose your starting point and prepare for each CIA exam part with structured, expert-led learning.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {CIA_PARTS.map((part, idx) => {
              const Icon = part.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:border-brand-blue/30 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-brand-blue text-2xl shrink-0 mb-4">
                      <Icon />
                    </div>
                    <span className="inline-block text-[11px] font-bold text-brand-blue uppercase tracking-widest mb-1">
                      {part.part}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 leading-snug mb-3">
                      {part.title}
                    </h3>
                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-3">
                      <strong className="text-gray-900 font-semibold">Focus:</strong> {part.focus}
                    </p>
                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-5">
                      <strong className="text-gray-900 font-semibold">What's Included:</strong> {part.inclusions}
                    </p>
                  </div>
                  <button
                    onClick={scrollToForm}
                    className="w-full text-center py-2.5 rounded-lg font-semibold text-xs sm:text-sm text-white bg-brand-blue hover:bg-brand-purple transition-all duration-200 shadow-sm cursor-pointer"
                  >
                    {part.cta}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Fast-Track Pathway Callout */}
          <div className="bg-gradient-to-br from-brand-blue to-black rounded-2xl p-6 sm:p-8 shadow-xl">
            <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
              <div className="w-14 h-14 rounded-xl bg-orange-400/20 border border-orange-400/30 flex items-center justify-center text-orange-400 text-2xl shrink-0">
                <FaBolt />
              </div>
              <div className="flex-1">
                <h3 className="text-lg sm:text-xl font-bold text-white mb-1.5">
                  Fast-Track Pathway for Qualified Accountants
                </h3>
                <p className="text-gray-200 text-xs sm:text-sm leading-relaxed">
                  Already a qualified CA, ACCA, or CPA? You may be eligible for the CIA Challenge Exam — a streamlined, one-part pathway to the CIA designation. Instead of taking the traditional three-part CIA examination, eligible professionals can pursue the single-paper Challenge Exam and prepare through GPC's dedicated, exam-focused coaching and expert guidance. Explore the CIA Challenge Exam pathway and find out if you're eligible.
                </p>
              </div>
              <button
                onClick={scrollToForm}
                className="shrink-0 px-6 py-3 rounded-lg font-semibold text-sm text-white bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 hover:scale-[1.02] transition-all duration-200 shadow-md cursor-pointer whitespace-nowrap"
              >
                Check Your Challenge Exam Eligibility
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Lead Faculty Spotlight */}
      <MentorShowcase />

      {/* Section 4: Real Success Stories (Wall of Excellence) */}
      <section className="py-14 md:py-16 px-4 sm:px-6 lg:px-8 bg-white font-poppins">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-bold text-center text-gray-900 mb-3">
              Real Professionals. Real Global <span className="text-brand-blue font-normal italic">CIA Milestones</span>.
            </h2>
            <p className="text-gray-600 text-xs sm:text-sm max-w-xl mx-auto">
              Join 1,500+ professionals who prepared with GPC and achieved their global credentials.
            </p>
          </div>

          <div className="relative px-2 sm:px-6 lg:px-8 mb-10">
            <style>{`
              .cia-testimonial-carousel .slick-dots { position: static; margin-top: 2rem; display: flex !important; align-items: center; justify-content: center; gap: 0.5rem; }
              .cia-testimonial-carousel .slick-dots li { width: auto; height: auto; margin: 0; }
              .cia-testimonial-carousel .slick-dots li button { width: 0.625rem; height: 0.625rem; padding: 0; }
              .cia-testimonial-carousel .slick-dots li button:before { content: ''; width: 0.625rem; height: 0.625rem; border-radius: 9999px; background-color: #d1d5db; opacity: 1; transition: all 0.3s ease; }
              .cia-testimonial-carousel .slick-dots li.slick-active button:before { background-color: #3a1292; width: 1.5rem; border-radius: 9999px; }
              .cia-testimonial-carousel .slick-dots li.slick-active button { width: 1.5rem; }
              .cia-testimonial-carousel .slick-track { display: flex !important; }
              .cia-testimonial-carousel .slick-slide { height: auto; }
              .cia-testimonial-carousel .slick-slide > div { height: 100%; }
            `}</style>

            <Slider
              className="cia-testimonial-carousel"
              dots={TESTIMONIALS_DATA.length > 4}
              arrows={TESTIMONIALS_DATA.length > 4}
              infinite={TESTIMONIALS_DATA.length > 4}
              speed={500}
              slidesToShow={4}
              slidesToScroll={TESTIMONIALS_DATA.length > 4 ? 4 : 1}
              prevArrow={TESTIMONIALS_DATA.length > 4 ? <TestimonialPrevArrow /> : null}
              nextArrow={TESTIMONIALS_DATA.length > 4 ? <TestimonialNextArrow /> : null}
              responsive={[
                { breakpoint: 1024, settings: { slidesToShow: 2, slidesToScroll: 2, dots: true, arrows: true, infinite: true } },
                { breakpoint: 640, settings: { slidesToShow: 1, slidesToScroll: 1, dots: true, arrows: true, infinite: true } }
              ]}
            >
              {TESTIMONIALS_DATA.map((t, idx) => (
                <div key={idx} className="h-full">
                  <div className="h-full min-h-[300px] sm:min-h-[320px] bg-white rounded-2xl p-5 sm:p-6 border border-gray-200/80 hover:border-brand-blue/30 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden">
                    {/* Background Quote Accent */}
                    <FaQuoteLeft className="absolute top-4 right-4 text-gray-100 text-5xl opacity-40 group-hover:text-blue-50 group-hover:scale-110 transition-all pointer-events-none z-0" />

                    <div className="relative z-10">
                      {/* Star Rating */}
                      <div className="flex items-center gap-1 text-amber-400 text-sm mb-3">
                        {[...Array(5)].map((_, i) => (
                          <FaStar key={i} />
                        ))}
                      </div>

                      {/* Quote Text */}
                      <p className="text-gray-700 text-xs sm:text-sm leading-relaxed mb-4 font-normal">
                        "{t.quote}"
                      </p>
                    </div>

                    {/* Author Info & Simple Location Text */}
                    <div className="border-t border-gray-100 pt-3 mt-auto flex flex-col gap-2 relative z-10">
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
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </section>

      {/* Section 6: FAQ Section - 1:1 CISA Style with Illustration */}
      <div className="mt-24 px-8 pb-40 md:pb-[220px] lg:px-20">
        <div className="flex flex-col lg:flex-row items-center gap-20 lg:gap-0">
          {/* Image Section */}
          <div className="w-full lg:w-2/5 flex justify-center items-center relative">
            <div className="absolute max-w-md w-full h-full bg-brand-blue/30 translate-x-3 translate-y-3 md:translate-x-6 md:translate-y-6 lg:translate-x-6 lg:translate-y-6 z-0"></div>

            {/* Main Image */}
            <img
              src={faqImage}
              alt="FAQ illustration "
              loading="lazy"
              width="500"
              height="500"
              className="max-w- w-full object-contain relative z-10 -translate-x-3 -translate-y-3 md:-translate-x-6 md:-translate-y-6 lg:-translate-x-6 lg:-translate-y-6"
            />
          </div>

          {/* Questions Dropdown Section */}
          <div className="w-full lg:w-3/5">
            <div className="bg-gray-50 px-2 md:px-0 pl-0 md:pl-20 rounded-2xl font-poppins">
              <h2 className="text-2xl md:text-4xl font-bold text-center mb-10">
                Frequently Asked <span className="text-brand-blue font-normal italic">Questions</span>
              </h2>

              <div className="max-w-4xl mx-auto">
                {CIA_FAQS.map((faq, index) => {
                  const isOpen = openFaqIndex === index;
                  return (
                    <div
                      key={index}
                      className="border-b border-gray-400 px-4 py-4 transition-all duration-300"
                    >
                      <button
                        onClick={() => toggleFaq(index)}
                        className="w-full flex justify-between items-center text-left cursor-pointer"
                        aria-expanded={isOpen}
                      >
                        <p className="text-sm md:text-lg font-semibold text-gray-800">
                          {faq.question}
                        </p>
                        {isOpen ? (
                          <FaChevronUp className="text-brand-blue w-3 h-3 flex-shrink-0 ml-4" />
                        ) : (
                          <FaChevronDown className="text-gray-400 w-3 h-3 flex-shrink-0 ml-4" />
                        )}
                      </button>

                      {isOpen && (
                        <div className="text-gray-600 text-sm md:text-base leading-relaxed overflow-hidden transition-all duration-300">
                          <p className="mt-4 text-justify">{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Section 7: Final CTA - Course Enrollment */}
      <section className="py-14 md:py-16 px-4 sm:px-6 lg:px-8 bg-brand-blue font-poppins text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
            Ready to Fast-Track Your{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
              CIA Certification
            </span>
            ?
          </h2>
          <p className="text-sm sm:text-base text-gray-200 leading-relaxed mb-8">
            Secure your seat in our upcoming CIA Live Interactive Batch starting <strong className="text-white font-semibold">Sept 19</strong>, led by mentor <strong className="text-white font-semibold">Mr. Arpit Garg (CA, CIA, CISA, CRMA)</strong>.
          </p>
          <button
            onClick={scrollToForm}
            className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-lg font-semibold text-sm sm:text-base text-white bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 hover:scale-[1.02] transition-all duration-200 shadow-md cursor-pointer"
          >
            <span>Request CIA Batch Details & Fees</span>
          </button>
        </div>
      </section>

      {/* Section 8: Mobile Sticky Action Bar Specs (<= 768px) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-gray-200 p-2.5 flex items-center gap-2 shadow-2xl">
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-lg font-bold text-xs text-white bg-[#059669] hover:bg-emerald-700 shadow-sm transition-all duration-200 text-center whitespace-nowrap"
        >
          <FaWhatsapp className="text-sm shrink-0" />
          <span>Chat on WhatsApp</span>
        </a>
        <button
          onClick={scrollToForm}
          className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-lg font-bold text-xs text-white bg-[#1D4ED8] hover:bg-blue-800 shadow-sm transition-all duration-200 text-center whitespace-nowrap cursor-pointer"
        >
          <FaClipboardList className="text-sm shrink-0" />
          <span>Enquire for Batch Details</span>
        </button>
      </div>

      {/* Footer & Legal Compliance (Light theme matching CISA) */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 bg-white border-t border-gray-200 text-center text-xs text-gray-500 font-poppins pb-24 md:pb-8">
        <div className="max-w-5xl mx-auto space-y-4 text-center">
          {/* Compliance & Info Links */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-medium text-gray-600">
            <Link to="/about" target="_blank" className="hover:text-brand-blue transition-colors">About GPC</Link>
            <span>•</span>
            <Link to="/success" target="_blank" className="hover:text-brand-blue transition-colors">Wall of Excellence</Link>
            <span>•</span>
            <Link to="/privacy" target="_blank" className="hover:text-brand-blue transition-colors">Privacy Policy</Link>
            <span>•</span>
            <Link to="/terms" target="_blank" className="hover:text-brand-blue transition-colors">Terms & Conditions</Link>
            <span>•</span>
            <Link to="/contact" target="_blank" className="hover:text-brand-blue transition-colors">Contact Us</Link>
          </div>

          {/* Legal Trademark Disclaimer */}
          <p className="max-w-4xl mx-auto text-[11px] leading-relaxed text-gray-400 text-center">
            Certified Internal Auditor (CIA) is a registered trademark of The Institute of Internal Auditors (IIA). Global Professional Certifications is an independent premier professional education provider. Program collaborations and study partner materials are provided in accordance with applicable agreements.
          </p>

          {/* Copyright Line */}
          <div className="pt-3 border-t border-gray-100 text-[11px] text-gray-400">
            <span>© {new Date().getFullYear()} Global Professional Certifications. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
