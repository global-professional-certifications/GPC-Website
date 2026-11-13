'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Link } from '../routing';
import logo from '../../assets/navbar/gpc-navbar-logo.webp';
import isacaAccreditationImage from '../../assets/home/isaca-gpc-partnership.webp';
import MentorShowcase from '../About/MentorShowcase';
import CompaniesShowcase from '../Companies/CompaniesShowcase';

import {
  FaCalendarAlt,
  FaUserGraduate,
  FaBookOpen,
  FaTicketAlt,
  FaClock,
  FaUsers,
  FaArrowRight,
  FaPhoneAlt,
  FaWhatsapp,
  FaCheckCircle,
  FaSpinner,
  FaShieldAlt,
  FaClipboardCheck,
  FaBalanceScale,
  FaChartLine,
  FaLock,
  FaAward,
  FaEnvelopeOpenText,
  FaPaperPlane
} from 'react-icons/fa';
import intlTelInput from 'intl-tel-input';
import 'intl-tel-input/styles';

// Native lead form POSTs directly to Zoho's submit endpoint via a real native form
// (targeting a hidden iframe), not fetch() — Zoho's endpoint rejects fetch/XHR-style
// submissions. Same architecture as the CIA / CISA enrollment pages.
//
// Field map for the "CISA Dubai Cohort Registration" Zoho form:
//   Name_First / Name_Last  -> Name (First, Last)
//   Email                   -> Email
//   PhoneNumber_countrycode -> Phone (single international-format text field)
//   SingleLine              -> Company Name
//   SingleLine1             -> Designation
//   SingleLine2             -> Years of Experience
//
// NOTE: the HTML-embed submit perma (VU5K…) is different from the public form
// perma (3Sk7…) used by ZOHO_FORM_URL. Posting to the public perma is rejected
// with "This form is temporarily inaccessible" — always take this URL from
// Zoho Forms → Share → Embed → HTML.
const ZOHO_SUBMIT_URL = "https://forms.zohopublic.in/globalprofessionalcertificat1/form/CISADubaiCohortRegistration3/formperma/VU5KBKVV42QBPL-wfJQDtGqOPw2r1VjQrNi7Kw_yp7I/htmlRecords/submit";
const ZOHO_SUBMIT_TARGET = "zoho-dubai-cisa-submit-frame";
// Hosted Zoho form page — the register buttons outside the hero link here directly.
const ZOHO_FORM_URL = "https://forms.zohopublic.in/globalprofessionalcertificat1/form/CISADubaiCohortRegistration3/formperma/3Sk7OHQoT8iwEsyUEFOxrPHb5cpG6a_8jONTQpx0EI4";
const WHATSAPP_URL = "https://wa.me/918736083099?text=Hi%20GPC%20Team,%20I%20am%20interested%20in%20the%20Dubai%20CISA%20Cohort";
const PHONE_NUMBER = "+91 87360 83099";
const PHONE_HREF = "tel:+918736083099";

// If the Zoho iframe never fires `load` (network hiccup, blocked third-party frame),
// still release the UI after this long — the POST itself has already been sent.
const SUBMIT_FALLBACK_MS = 6000;

const PRIMARY_CTA =
  "bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 text-white shadow-lg shadow-orange-500/20 hover:shadow-xl hover:shadow-pink-500/25 hover:scale-[1.02]";

const INPUT_CLASS =
  "w-full px-3.5 py-2.5 rounded-lg border border-gray-300 bg-white text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent transition-shadow shadow-sm";

const LABEL_CLASS = "block text-xs font-semibold text-gray-700 mb-1";

interface HighlightItem {
  num: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  tag: string;
}

const HIGHLIGHTS: HighlightItem[] = [
  {
    num: "01",
    icon: FaCalendarAlt,
    title: "Five intensive weekday sessions in Dubai",
    tag: "In-Person Classroom"
  },
  {
    num: "02",
    icon: FaUserGraduate,
    title: "Industry expert-led preparation with mentor Arpit Garg (CA, CIA, CRMA, CISA)",
    tag: "Expert Mentorship"
  },
  {
    num: "03",
    icon: FaBookOpen,
    title: "Coverage of CISA exam study material",
    tag: "All 5 ISACA Domains"
  },
  {
    num: "04",
    icon: FaTicketAlt,
    title: "ISACA-authorized study materials and an exam voucher",
    tag: "Official Study Kit Included"
  },
  {
    num: "05",
    icon: FaClock,
    title: "Weekend exam option, subject to availability and registration",
    tag: "Exam Flexibility"
  },
  {
    num: "06",
    icon: FaUsers,
    title: "Limited Cohort of 25 Professionals",
    tag: "Strictly Limited"
  }
];

const HERO_FACTS = [
  { icon: FaCalendarAlt, title: "5 Intensive Days", sub: "Weekday sessions", tint: "bg-amber-400/20 text-amber-300" },
  { icon: FaUserGraduate, title: "Arpit Garg", sub: "CA, CIA, CRMA, CISA", tint: "bg-purple-400/20 text-purple-200" },
  { icon: FaTicketAlt, title: "Exam Voucher", sub: "ISACA-authorized kit", tint: "bg-emerald-400/20 text-emerald-300" },
  { icon: FaUsers, title: "Limited Cohort", sub: "Focused peer group", tint: "bg-sky-400/20 text-sky-300" }
];

const TARGET_ROLES = [
  { label: "GRC Professionals", desc: "Strengthen your governance and control expertise.", icon: FaBalanceScale },
  { label: "IT Audit Specialists", desc: "Formalize your audit practice with a global credential.", icon: FaClipboardCheck },
  { label: "Assurance Teams", desc: "Deepen assurance over information systems and controls.", icon: FaCheckCircle },
  { label: "Risk Officers", desc: "Connect IT risk to business objectives with confidence.", icon: FaChartLine },
  { label: "Cybersecurity Analysts", desc: "Add an audit and control lens to your security work.", icon: FaShieldAlt },
  { label: "Aspiring CISA Candidates", desc: "Prepare with structure and expert guidance.", icon: FaAward }
];

const NEXT_STEPS = [
  {
    icon: FaPaperPlane,
    title: "Register your interest",
    body: "Share a few details using the short form — it takes under a minute."
  },
  {
    icon: FaEnvelopeOpenText,
    title: "Receive cohort details",
    body: "Our admissions team sends you the cohort dates, venue and fees on WhatsApp and email."
  },
  {
    icon: FaCheckCircle,
    title: "Complete your registration",
    body: "Confirm your place in the limited Dubai cohort and start your CISA preparation."
  }
];

const EXPERIENCE_OPTIONS = ["0–2 years", "3–5 years", "6–10 years", "10+ years"];

function SectionHeading({ lead, accent, align = 'center' }: { lead: string; accent: string; align?: 'center' | 'left' }) {
  const centered = align === 'center';
  return (
    <div className={centered ? 'text-center max-w-2xl mx-auto' : 'text-center md:text-left'}>
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
        {lead} <span className="text-brand-blue font-normal italic">{accent}</span>
      </h2>
      <div className={`h-1 w-16 bg-gradient-to-r from-brand-blue to-brand-purple mt-3 rounded-full ${centered ? 'mx-auto' : 'mx-auto md:mx-0'}`} />
    </div>
  );
}

export default function DubaiCisaLandingPage() {
  const leadFormRef = useRef<HTMLFormElement>(null);
  const phoneInputRef = useRef<HTMLInputElement>(null);
  const firstNameRef = useRef<HTMLInputElement>(null);
  const fullPhoneInputRef = useRef<HTMLInputElement>(null);
  const awaitingResponseRef = useRef(false);
  const fallbackTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [leadForm, setLeadForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    designation: '',
    experience: ''
  });

  const [dialCode, setDialCode] = useState('+971');
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [formError, setFormError] = useState('');
  const [tickVisible, setTickVisible] = useState(false);

  const updateField = (field: keyof typeof leadForm) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setLeadForm((prev) => ({ ...prev, [field]: e.target.value }));

  // Success tick animation
  useEffect(() => {
    if (formStatus === 'success') {
      const id = requestAnimationFrame(() => setTickVisible(true));
      return () => cancelAnimationFrame(id);
    }
    setTickVisible(false);
  }, [formStatus]);

  // Initialize intl-tel-input (defaulted to UAE 'ae')
  useEffect(() => {
    const phoneInputEl = phoneInputRef.current;
    if (!phoneInputEl) return;

    const iti = intlTelInput(phoneInputEl, {
      initialCountry: 'ae',
      separateDialCode: true
    });

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

  // Lift globally-injected Zoho SalesIQ chat button above mobile sticky bar
  useEffect(() => {
    document.body.classList.add('mobile-sticky-bar-active');
    return () => {
      document.body.classList.remove('mobile-sticky-bar-active');
    };
  }, []);

  useEffect(() => () => {
    if (fallbackTimerRef.current) clearTimeout(fallbackTimerRef.current);
  }, []);

  const markSubmitted = () => {
    if (!awaitingResponseRef.current) return;
    awaitingResponseRef.current = false;
    if (fallbackTimerRef.current) clearTimeout(fallbackTimerRef.current);
    setFormStatus('success');
  };

  const handleLeadFormSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const phoneValue = phoneInputRef.current?.value || '';
    const values = Object.values(leadForm);

    if (values.some((v) => !v.trim()) || !phoneValue.trim()) {
      setFormError('Please fill in all required fields.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(leadForm.email.trim())) {
      setFormError('Please enter a valid email address.');
      return;
    }
    const phoneDigits = phoneValue.replace(/\D/g, '');
    if (phoneDigits.length < 6 || phoneDigits.length > 15) {
      setFormError('Please enter a valid phone number.');
      return;
    }

    // Zoho's Phone field is a single international-format value. If the visitor
    // typed a full "+<code>..." number use it as-is; otherwise prefix the selected
    // dial code and drop the national trunk "0" (UAE numbers are commonly written
    // as 05x xxx xxxx, which would otherwise become +971 05x...).
    const cleanPhone = phoneValue.trim();
    const fullPhoneNumber = cleanPhone.startsWith('+')
      ? `+${phoneDigits}`
      : `${dialCode} ${phoneDigits.replace(/^0+/, '')}`;
    if (fullPhoneInputRef.current) {
      fullPhoneInputRef.current.value = fullPhoneNumber;
    }

    setFormError('');
    setFormStatus('submitting');
    awaitingResponseRef.current = true;

    // Submitted synchronously, before React re-renders, so the imperatively-set
    // hidden PhoneNumber value is what gets posted.
    leadFormRef.current?.submit();

    fallbackTimerRef.current = setTimeout(markSubmitted, SUBMIT_FALLBACK_MS);
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 font-poppins selection:bg-brand-blue selection:text-white">

      {/* ═══════════ HEADER ═══════════ */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200/80 py-2 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">

          <div className="flex items-center gap-3 min-w-0">
            <Link to="/" className="shrink-0 flex items-center">
              <img
                src={logo}
                alt="Global Professional Certifications logo"
                className="h-11 sm:h-14 md:h-16 w-auto object-contain"
                width="160"
                height="60"
              />
            </Link>
            <div className="hidden sm:block border-l border-gray-200 pl-3">
              <span className="text-xs font-bold text-brand-blue uppercase tracking-wider block">
                Dubai CISA Cohort
              </span>
              <span className="text-[11px] text-gray-500 font-medium">
                ISACA Accredited Training Organization
              </span>
            </div>
          </div>

          <a
            href={PHONE_HREF}
            className="flex items-center gap-2.5 px-3.5 sm:px-5 py-2 rounded-full text-white bg-brand-blue hover:bg-[#2e0e75] shadow-sm hover:shadow-md transition-all duration-200 whitespace-nowrap group"
          >
            <FaPhoneAlt className="text-sm shrink-0 group-hover:scale-110 transition-transform duration-200" />
            <span className="flex flex-col text-left">
              <span className="text-[10px] sm:text-[11px] text-white/80 leading-tight">Talk to an Expert</span>
              <span className="text-xs sm:text-sm font-bold tracking-wide leading-tight">{PHONE_NUMBER}</span>
            </span>
          </a>

        </div>
      </header>

      {/* ═══════════ HERO ═══════════ */}
      <section className="relative bg-gradient-to-br from-[#240b60] via-brand-blue to-[#5619a8] text-white py-14 md:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Subtle dot grid + ambient glows */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.07] pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '22px 22px' }}
        />
        <div aria-hidden="true" className="absolute -top-24 right-1/4 w-96 h-96 bg-brand-purple/25 rounded-full blur-3xl pointer-events-none" />
        <div aria-hidden="true" className="absolute -bottom-24 -left-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-10 lg:gap-14">

            {/* Left: headline, intro, quick facts, secondary CTAs */}
            <div className="w-full lg:w-[50%] text-center lg:text-left lg:self-center">

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tight mb-5">
                Build Your CISA Momentum in{' '}
                <span className="inline-block pr-1 bg-gradient-to-r from-amber-300 via-orange-400 to-amber-200 bg-clip-text text-transparent italic font-semibold">
                  Dubai
                </span>
              </h1>

              <p className="text-base sm:text-lg text-white/80 leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
                GPC is bringing an intensive, in-person CISA preparation cohort to Dubai for GRC, IT audit, assurance, risk, and cybersecurity professionals. Learn alongside a focused group of peers and prepare with guidance from an industry expert.
              </p>

              <ul className="grid grid-cols-2 gap-3 mb-8 text-left max-w-xl mx-auto lg:mx-0">
                {HERO_FACTS.map(({ icon: Icon, title, sub, tint }) => (
                  <li key={title} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.06] border border-white/10 backdrop-blur-sm">
                    <span className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 text-sm ${tint}`}>
                      <Icon />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs sm:text-sm font-bold leading-tight">{title}</span>
                      <span className="block text-[11px] text-white/65 leading-tight mt-0.5">{sub}</span>
                    </span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto h-12 px-6 rounded-lg font-bold text-xs uppercase tracking-wider text-white bg-white/10 border border-white/25 hover:bg-white hover:text-brand-blue transition-all duration-200 flex items-center justify-center gap-2 group"
                >
                  <FaWhatsapp className="text-lg shrink-0 text-emerald-300 group-hover:text-[#059669] transition-colors" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>

            </div>

            {/* Right: lead form */}
            <div id="hero-lead-form" className="w-full lg:w-[46%] max-w-lg lg:max-w-none scroll-mt-24">
              <div className="relative bg-white rounded-2xl shadow-2xl shadow-black/20 overflow-hidden text-gray-800">
                <div aria-hidden="true" className="h-1.5 w-full bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600" />

                <div className="relative p-6 sm:p-8">

                  {/* Submitting / success overlay */}
                  {formStatus !== 'idle' && (
                    <div
                      className="absolute inset-0 bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center z-20 px-6 text-center"
                      role="status"
                      aria-live="polite"
                    >
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
                      <p className="text-gray-900 font-bold text-base sm:text-lg">
                        {formStatus === 'submitting' ? 'Submitting your details...' : 'Thank you!'}
                      </p>
                      {formStatus === 'success' && (
                        <>
                          <p className="text-gray-600 text-xs sm:text-sm mt-2 max-w-xs leading-relaxed">
                            Our admissions team will get back to you soon with cohort dates, venue, and fee details.
                          </p>
                          <a
                            href={WHATSAPP_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-5 inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold text-white bg-[#059669] hover:bg-emerald-700 transition-colors"
                          >
                            <FaWhatsapp className="text-sm" />
                            Can't wait? Chat with us now
                          </a>
                        </>
                      )}
                    </div>
                  )}

                  <div className="flex items-start justify-between gap-3 mb-1">
                    <h2 className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight">
                      Register your interest
                    </h2>
                    <span className="shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-[10px] font-bold uppercase tracking-wider">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                      Limited seats
                    </span>
                  </div>
                  <p className="text-gray-500 text-xs sm:text-sm mb-5 leading-relaxed">
                    Sign up to receive cohort dates, venue, fees, and registration details.
                  </p>

                  {/* Native form that submits directly to Zoho via hidden iframe */}
                  <form
                    ref={leadFormRef}
                    onSubmit={handleLeadFormSubmit}
                    noValidate
                    action={ZOHO_SUBMIT_URL}
                    method="POST"
                    encType="multipart/form-data"
                    target={ZOHO_SUBMIT_TARGET}
                    acceptCharset="UTF-8"
                    className="space-y-3.5"
                  >
                    <input type="hidden" name="zf_referrer_name" value="" />
                    <input type="hidden" name="zf_redirect_url" value="" />
                    <input type="hidden" name="zc_gad" value="" />
                    {/* Full international number, filled in on submit */}
                    <input ref={fullPhoneInputRef} type="hidden" name="PhoneNumber_countrycode" defaultValue="" />

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label htmlFor="dubai-first-name" className={LABEL_CLASS}>
                          First Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          ref={firstNameRef}
                          id="dubai-first-name"
                          type="text"
                          name="Name_First"
                          autoComplete="given-name"
                          value={leadForm.firstName}
                          onChange={updateField('firstName')}
                          maxLength={255}
                          placeholder="e.g. Tariq"
                          className={INPUT_CLASS}
                        />
                      </div>
                      <div>
                        <label htmlFor="dubai-last-name" className={LABEL_CLASS}>
                          Last Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="dubai-last-name"
                          type="text"
                          name="Name_Last"
                          autoComplete="family-name"
                          value={leadForm.lastName}
                          onChange={updateField('lastName')}
                          maxLength={255}
                          placeholder="e.g. Al-Mansoor"
                          className={INPUT_CLASS}
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="dubai-email" className={LABEL_CLASS}>
                        Work Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="dubai-email"
                        type="email"
                        name="Email"
                        autoComplete="email"
                        inputMode="email"
                        value={leadForm.email}
                        onChange={updateField('email')}
                        maxLength={255}
                        placeholder="e.g. tariq@company.ae"
                        className={INPUT_CLASS}
                      />
                    </div>

                    <div>
                      <label htmlFor="dubai-phone" className={LABEL_CLASS}>
                        Phone / WhatsApp Number <span className="text-red-500">*</span>
                      </label>
                      {/* No `name`: the visible value is merged with the dial code into
                          the hidden PhoneNumber field on submit. */}
                      <input
                        ref={phoneInputRef}
                        id="dubai-phone"
                        type="tel"
                        autoComplete="tel-national"
                        inputMode="tel"
                        className={INPUT_CLASS}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label htmlFor="dubai-company" className={LABEL_CLASS}>
                          Company Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="dubai-company"
                          type="text"
                          name="SingleLine"
                          autoComplete="organization"
                          value={leadForm.company}
                          onChange={updateField('company')}
                          maxLength={255}
                          placeholder="e.g. Emirates NBD"
                          className={INPUT_CLASS}
                        />
                      </div>
                      <div>
                        <label htmlFor="dubai-designation" className={LABEL_CLASS}>
                          Designation <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="dubai-designation"
                          type="text"
                          name="SingleLine1"
                          autoComplete="organization-title"
                          value={leadForm.designation}
                          onChange={updateField('designation')}
                          maxLength={255}
                          placeholder="e.g. IT Audit Manager"
                          className={INPUT_CLASS}
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="dubai-experience" className={LABEL_CLASS}>
                        Years of Experience <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="dubai-experience"
                        name="SingleLine2"
                        value={leadForm.experience}
                        onChange={updateField('experience')}
                        className={`${INPUT_CLASS} cursor-pointer ${leadForm.experience ? '' : 'text-gray-400'}`}
                      >
                        <option value="" disabled>Select your experience</option>
                        {EXPERIENCE_OPTIONS.map((opt) => (
                          <option key={opt} value={opt} className="text-gray-900">{opt}</option>
                        ))}
                      </select>
                    </div>

                    {formError && (
                      <p role="alert" className="text-red-600 text-xs font-medium bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                        {formError}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={formStatus === 'submitting'}
                      className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-lg font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-200 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 ${PRIMARY_CTA}`}
                    >
                      <span>Register Your Interest</span>
                      <FaArrowRight className="text-xs shrink-0" />
                    </button>

                    <p className="flex items-start justify-center gap-1.5 text-gray-400 text-[11px] text-center leading-snug pt-1">
                      <FaLock className="mt-0.5 shrink-0" />
                      <span>100% privacy. No spam. Cohort dates, venue &amp; fees are sent directly to your WhatsApp and email.</span>
                    </p>
                  </form>

                  {/* Offscreen iframe target for the native POST; its load event
                      tells us Zoho has responded. */}
                  <iframe
                    name={ZOHO_SUBMIT_TARGET}
                    id={ZOHO_SUBMIT_TARGET}
                    title="Form submission target"
                    onLoad={markSubmitted}
                    className="w-0 h-0 border-0 absolute -left-[9999px] -top-[9999px] opacity-0 pointer-events-none"
                    tabIndex={-1}
                    aria-hidden="true"
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════ PROGRAM HIGHLIGHTS ═══════════ */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <SectionHeading lead="Program" accent="Highlights" />

          <div className="mt-10 sm:mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {HIGHLIGHTS.map((item) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.num}
                  className="group relative h-full overflow-hidden rounded-2xl bg-gradient-to-br from-white via-white to-slate-50 p-6 sm:p-7 border border-gray-200/80 shadow-[0_1px_3px_rgba(16,24,40,0.06)] hover:border-transparent hover:shadow-2xl hover:shadow-brand-blue/15 hover:-translate-y-1.5 transition-all duration-300"
                >
                  {/* Gradient accent bar that sweeps in on hover */}
                  <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-blue via-brand-purple to-orange-400 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                  {/* Soft corner glow */}
                  <span aria-hidden="true" className="absolute -bottom-16 -right-16 w-44 h-44 rounded-full bg-gradient-to-br from-brand-blue/10 to-brand-purple/10 blur-2xl opacity-60 group-hover:opacity-100 group-hover:scale-125 transition-all duration-500 pointer-events-none" />

                  <div className="relative flex flex-col h-full">
                    <div className="flex items-start justify-between mb-5">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-blue to-brand-purple flex items-center justify-center text-white text-lg shadow-lg shadow-brand-blue/25 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                        <Icon />
                      </div>
                      <span aria-hidden="true" className="text-3xl font-bold leading-none bg-gradient-to-br from-gray-200 to-gray-100 bg-clip-text text-transparent group-hover:from-brand-blue/40 group-hover:to-brand-purple/30 transition-colors select-none">
                        {item.num}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mb-2">
                      <span aria-hidden="true" className="h-px w-5 bg-gradient-to-r from-brand-purple to-transparent" />
                      <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.14em] text-brand-purple">
                        {item.tag}
                      </span>
                    </div>
                    <h3 className="text-base sm:text-[17px] font-semibold text-gray-900 leading-snug">
                      {item.title}
                    </h3>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════ PRICING ═══════════ */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gray-50 border-t border-gray-200">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-10 lg:gap-14">
          {/* Left: heading + what's included */}
          <div>
            <SectionHeading lead="Program" accent="Pricing" align="left" />
            <p className="mt-6 text-sm font-semibold text-gray-900 text-center md:text-left">The package includes</p>
            <ul className="mt-3 space-y-3 max-w-sm mx-auto md:mx-0">
              {[
                'In-person sessions',
                'Latest digital ISACA CISA Review Book and Question Bank',
                'Exam voucher'
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm sm:text-base text-gray-700 leading-snug">
                  <FaCheckCircle className="text-brand-purple mt-0.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Early Bird price card */}
          <div className="w-full max-w-md mx-auto lg:mr-0">
            <div className="relative flex flex-col rounded-2xl bg-brand-blue text-white p-6 sm:p-8 shadow-lg shadow-brand-blue/20">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-white/80">Early Bird</h3>
                <span className="text-xs font-semibold text-amber-300">Save $1,000</span>
              </div>
              <p className="mt-4 flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-bold tracking-tight text-white">$3,000</span>
                <span className="text-sm text-white/50 line-through">$4,000</span>
              </p>
              <p className="mt-2 text-sm text-white/70">Complete package, per participant</p>
              <a
                href={ZOHO_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-6 w-full h-11 flex items-center justify-center rounded-lg font-semibold text-sm transition-all duration-200 cursor-pointer ${PRIMARY_CTA}`}
              >
                Register Interest
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ MENTOR ═══════════ */}
      <MentorShowcase />

      {/* ═══════════ WHO IT'S FOR ═══════════ */}
      <section className="relative overflow-hidden py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div aria-hidden="true" className="absolute -top-32 -left-32 w-96 h-96 bg-brand-blue/[0.06] rounded-full blur-3xl pointer-events-none" />
        <div aria-hidden="true" className="absolute -bottom-32 -right-32 w-96 h-96 bg-brand-purple/[0.06] rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-6xl mx-auto">
          <SectionHeading lead="Who It’s" accent="For" />

          <p className="mt-6 text-base sm:text-lg text-gray-600 leading-relaxed text-center max-w-3xl mx-auto">
            Dubai-based professionals in GRC, IT audit, assurance, risk, and cybersecurity, as well as professionals aspiring to earn the CISA certification.
          </p>

          <ul className="mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {TARGET_ROLES.map(({ label, desc, icon: Icon }) => (
              <li
                key={label}
                className="group relative overflow-hidden flex items-start gap-4 p-5 sm:p-6 rounded-2xl bg-white border border-gray-200/80 shadow-sm hover:border-transparent hover:shadow-xl hover:shadow-brand-blue/10 hover:-translate-y-1 transition-all duration-300"
              >
                <span aria-hidden="true" className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-brand-blue to-brand-purple origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-300" />
                <span className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-100 text-brand-blue flex items-center justify-center shrink-0 text-base group-hover:from-brand-blue group-hover:to-brand-purple group-hover:text-white group-hover:border-transparent transition-all duration-300">
                  <Icon />
                </span>
                <span className="min-w-0">
                  <span className="block text-base font-semibold text-gray-900 leading-snug">{label}</span>
                  <span className="block mt-1 text-sm text-gray-600 leading-relaxed">{desc}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ═══════════ NEXT STEPS ═══════════ */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <SectionHeading lead="Your Path to the" accent="Dubai Cohort" />

          <div className="relative mt-12">
          <div aria-hidden="true" className="hidden md:block absolute top-7 left-[16.6%] right-[16.6%] h-px bg-gradient-to-r from-brand-blue/20 via-brand-purple/40 to-brand-blue/20" />
          <ol className="relative grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
            {NEXT_STEPS.map(({ icon: Icon, title, body }, i) => (
              <li key={title} className="relative text-center px-2">
                <div className="relative mx-auto w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-blue to-brand-purple text-white flex items-center justify-center text-lg shadow-lg shadow-brand-blue/25">
                  <Icon />
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-amber-400 text-[#240b60] text-[11px] font-bold flex items-center justify-center ring-4 ring-white">
                    {i + 1}
                  </span>
                </div>
                <h3 className="mt-5 text-base font-bold text-gray-900">{title}</h3>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed max-w-xs mx-auto">{body}</p>
              </li>
            ))}
          </ol>
          </div>
        </div>
      </section>

      {/* ═══════════ ABOUT GPC ═══════════ */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gray-50 border-t border-gray-200">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-10 md:gap-14">
            <div className="w-full md:w-1/2">
              <SectionHeading lead="About" accent="GPC" align="left" />
              <p className="mt-6 text-base sm:text-lg text-gray-700 leading-relaxed text-center md:text-left">
                Global Professional Certifications (GPC) provides training for globally recognized professional certifications and is an ISACA Accredited Training Organization (ATO). GPC’s mission is to bridge the gap between career aspirations and achievement through industry expert-led preparation that develops professionals’ expertise and practical skills. Its vision is to build a global community of GRC professionals who advance corporate governance, risk management, assurance, and advisory practices.
              </p>
            </div>

            <div className="w-full md:w-1/2 flex justify-center">
              <div className="relative">
                <div aria-hidden="true" className="absolute -inset-3 bg-gradient-to-br from-brand-blue/15 to-brand-purple/15 rounded-3xl blur-xl" />
                <img
                  src={isacaAccreditationImage}
                  alt="ISACA and GPC representatives marking GPC's accreditation as an ISACA Accredited Training Organization"
                  width="560"
                  height="393"
                  loading="lazy"
                  className="relative w-full max-w-[560px] h-auto rounded-2xl shadow-lg border border-gray-200 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ COMPANY MARQUEE ═══════════ */}
      <CompaniesShowcase
        titleStart="Our Learners & Alumni Drive Governance Across"
        highlightOne="Global Leaders"
        titleEnd=""
        highlightTwo=""
        description="Trusted by professionals from leading multinational organizations for their CISA certification journey."
      />

      {/* ═══════════ FINAL CTA ═══════════ */}
      <section className="px-4 sm:px-6 lg:px-8 py-14 md:py-20 bg-white">
        <div className="relative max-w-6xl mx-auto rounded-3xl bg-gradient-to-br from-[#240b60] via-brand-blue to-[#5619a8] text-white overflow-hidden px-6 py-10 sm:px-10 md:px-14 md:py-14">
          <div aria-hidden="true" className="absolute -top-20 -right-10 w-72 h-72 bg-brand-purple/30 rounded-full blur-3xl pointer-events-none" />
          <div aria-hidden="true" className="absolute -bottom-24 left-10 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-2.5">
                Register your{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-400 to-amber-200 italic">
                  interest
                </span>
              </h2>
              <p className="text-sm sm:text-base text-white/80 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Sign up to receive cohort dates, venue, fees, and registration details. Seats in the Dubai cohort are strictly limited.
              </p>
            </div>

            <div className="w-full lg:w-auto flex flex-col sm:flex-row items-center justify-center gap-3 shrink-0">
              <a
                href={ZOHO_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full sm:w-[210px] h-12 px-5 rounded-lg font-bold text-xs uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer group ${PRIMARY_CTA}`}
              >
                <span>Register Now</span>
                <FaArrowRight className="text-xs shrink-0 group-hover:translate-x-0.5 transition-transform" />
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-[210px] h-12 px-5 rounded-lg font-bold text-xs uppercase tracking-wider text-white bg-white/10 border border-white/25 hover:bg-white hover:text-brand-blue transition-all duration-200 flex items-center justify-center gap-2 group"
              >
                <FaWhatsapp className="text-base shrink-0 text-emerald-300 group-hover:text-[#059669] transition-colors" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ MOBILE STICKY ACTION BAR (< md) ═══════════ */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-white/95 backdrop-blur-md border-t border-gray-200 p-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] flex items-center gap-2 shadow-2xl">
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 h-12 flex items-center justify-center gap-1.5 rounded-lg font-bold text-xs text-white bg-[#059669] hover:bg-emerald-700 shadow-sm transition-colors whitespace-nowrap"
        >
          <FaWhatsapp className="text-sm shrink-0" />
          <span>WhatsApp</span>
        </a>
        <a
          href={ZOHO_FORM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex-1 h-12 flex items-center justify-center gap-1.5 rounded-lg font-bold text-xs whitespace-nowrap cursor-pointer ${PRIMARY_CTA}`}
        >
          <span>Register Interest</span>
          <FaArrowRight className="text-[10px] shrink-0" />
        </a>
      </div>

      {/* ═══════════ FOOTER ═══════════ */}
      <footer className="py-10 px-4 sm:px-6 lg:px-8 bg-white border-t border-gray-200 text-center text-xs text-gray-500 pb-24 md:pb-10">
        <div className="max-w-4xl mx-auto space-y-3">
          <nav aria-label="Footer" className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-medium text-gray-600">
            <Link to="/about" className="hover:text-brand-blue transition-colors">About GPC</Link>
            <span aria-hidden="true">•</span>
            <Link to="/privacy" className="hover:text-brand-blue transition-colors">Privacy Policy</Link>
            <span aria-hidden="true">•</span>
            <Link to="/terms" className="hover:text-brand-blue transition-colors">Terms &amp; Conditions</Link>
            <span aria-hidden="true">•</span>
            <Link to="/contact" className="hover:text-brand-blue transition-colors">Contact Us</Link>
          </nav>
          <p className="text-[11px] text-gray-400">
            Certified Information Systems Auditor® (CISA®) is a registered trademark of ISACA. Global Professional Certifications (GPC) is an ISACA Accredited Training Organization (ATO).
          </p>
          <p className="text-[11px] text-gray-400">
            © {new Date().getFullYear()} Global Professional Certifications. All rights reserved.
          </p>
        </div>
      </footer>

    </div>
  );
}
