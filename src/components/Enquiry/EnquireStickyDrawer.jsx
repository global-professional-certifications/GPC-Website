import React, { useState, useEffect, useRef } from 'react';
import { FaTimes, FaSpinner, FaCheckCircle, FaArrowRight, FaLock } from 'react-icons/fa';
import intlTelInput from 'intl-tel-input';
import 'intl-tel-input/styles';

const ZOHO_SUBMIT_URL = "https://forms.zohopublic.in/globalprofessionalcertificat1/form/GeneralEnquiryForm/formperma/FqS8VLjjsbZdOQltxdaWtfETUsXY6aSPvvNJnOu9dSc/htmlRecords/submit";
const ZOHO_SUBMIT_TARGET = "zoho-general-enquiry-frame";

const COURSE_OPTIONS = [
  { label: "CIA (Certified Internal Auditor)", value: "CIA" },
  { label: "CISA (Certified Information Systems Auditor)", value: "CISA" },
  { label: "CRMA (Certification in Risk Management Assurance)", value: "CRMA" },
  { label: "IAP (Internal Audit Practitioner)", value: "IAP" }
];

export default function EnquireStickyDrawer({ isOpen, onOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    courses: [],
    terms: true
  });
  const [dialCode, setDialCode] = useState('+91');
  const [formStatus, setFormStatus] = useState('idle'); // idle | submitting | success
  const [formError, setFormError] = useState('');
  const [tickVisible, setTickVisible] = useState(false);

  const phoneInputRef = useRef(null);
  const itiRef = useRef(null);
  const formRef = useRef(null);

  // Initialize intl-tel-input when drawer opens
  useEffect(() => {
    if (!isOpen) return;

    // Small delay to ensure DOM is rendered
    const timer = setTimeout(() => {
      const phoneInputEl = phoneInputRef.current;
      if (!phoneInputEl) return;

      if (itiRef.current) {
        itiRef.current.destroy();
      }

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
    }, 50);

    return () => {
      clearTimeout(timer);
      if (itiRef.current) {
        itiRef.current.destroy();
        itiRef.current = null;
      }
    };
  }, [isOpen]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  // Handle ESC key to close drawer
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Animation trigger for success checkmark
  useEffect(() => {
    if (formStatus === 'success') {
      const id = requestAnimationFrame(() => setTickVisible(true));
      return () => cancelAnimationFrame(id);
    }
    setTickVisible(false);
  }, [formStatus]);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const phoneValue = phoneInputRef.current?.value || '';

    // Validation
    if (!formData.name.trim()) {
      setFormError('Please enter your full name.');
      return;
    }
    if (!formData.email.trim()) {
      setFormError('Please enter your email address.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      setFormError('Please enter a valid email address.');
      return;
    }
    if (!phoneValue.trim()) {
      setFormError('Please enter your contact number.');
      return;
    }
    const phoneDigits = phoneValue.replace(/\D/g, '');
    if (phoneDigits.length < 7 || phoneDigits.length > 15) {
      setFormError('Please enter a valid phone number (7-15 digits).');
      return;
    }
    if (formData.courses.length === 0) {
      setFormError('Please select a course you are interested in.');
      return;
    }
    if (!formData.terms) {
      setFormError('Please accept the communication terms to proceed.');
      return;
    }

    setFormError('');
    setFormStatus('submitting');

    // Submit browser-native form POST targeting hidden iframe to prevent 409 & page reload
    if (formRef.current) {
      formRef.current.submit();
    }

    setTimeout(() => {
      setFormStatus('success');
    }, 1000);
  };

  const handleResetForm = () => {
    setFormData({
      name: '',
      email: '',
      courses: [],
      terms: true
    });
    if (phoneInputRef.current) {
      phoneInputRef.current.value = '';
    }
    setFormStatus('idle');
    setFormError('');
  };

  const handleClose = () => {
    onClose();
    if (formStatus === 'success') {
      setTimeout(() => {
        handleResetForm();
      }, 400);
    }
  };

  return (
    <>
      {/* ─── Sticky Vertical Button on the Right ─── */}
      <button
        onClick={onOpen}
        type="button"
        aria-label="Enquire Now"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        className="fixed right-0 top-1/2 -translate-y-1/2 z-40 bg-brand-purple hover:bg-[#931ec8] text-white px-2.5 sm:px-3 py-4 sm:py-5 rounded-l-xl shadow-[-4px_4px_16px_rgba(0,0,0,0.3)] transition-all duration-300 hover:-translate-x-1.5 focus:outline-none focus:ring-2 focus:ring-brand-purple focus:ring-offset-2 flex items-center justify-center cursor-pointer select-none group"
      >
        <span
          className="font-bold text-xs sm:text-sm tracking-wider uppercase whitespace-nowrap drop-shadow-sm font-poppins"
          style={{
            writingMode: 'vertical-rl',
            transform: 'rotate(180deg)',
          }}
        >
          Enquire Now
        </span>
      </button>

      {/* ─── Backdrop Overlay ─── */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* ─── Slide-over Drawer Panel ─── */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Enquire Now Form"
        className={`fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out font-poppins ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="bg-brand-blue text-white px-5 sm:px-6 py-4 sm:py-5 flex items-center justify-between shadow-md relative shrink-0">
          <div>
            <h2 className="text-lg sm:text-xl font-bold tracking-tight">Connect With Us</h2>
            <p className="text-xs text-blue-100 mt-0.5">
              Talk to our certification advisors &amp; get full course details
            </p>
          </div>
          <button
            onClick={handleClose}
            type="button"
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-white cursor-pointer"
            aria-label="Close enquiry drawer"
          >
            <FaTimes className="text-sm sm:text-base" />
          </button>
        </div>

        {/* Drawer Body / Scrollable Form Container */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 relative">
          {/* Submitting / Success Overlay */}
          {(formStatus === 'submitting' || formStatus === 'success') && (
            <div className="absolute inset-0 bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center z-20 px-6 text-center">
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-all duration-500 ease-out ${
                  formStatus === 'success'
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

              <h3 className="text-gray-900 font-bold text-lg mb-1">
                {formStatus === 'submitting' ? 'Submitting your details...' : 'Thank You!'}
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm max-w-xs leading-relaxed">
                {formStatus === 'submitting'
                  ? 'Connecting to admission advisors...'
                  : 'Your enquiry has been received. Our team will get back to you shortly with course fee, schedule & brochure.'}
              </p>

              {formStatus === 'success' && (
                <button
                  type="button"
                  onClick={handleClose}
                  className="mt-6 px-6 py-2.5 bg-brand-blue hover:bg-[#2e0e75] text-white text-sm font-semibold rounded-lg shadow-md transition-colors cursor-pointer"
                >
                  Done
                </button>
              )}
            </div>
          )}

          {/* Native Lead Form */}
          <form
            ref={formRef}
            onSubmit={handleFormSubmit}
            noValidate
            action={ZOHO_SUBMIT_URL}
            method="POST"
            encType="multipart/form-data"
            target={ZOHO_SUBMIT_TARGET}
            className="space-y-4"
          >
            {/* Zoho Hidden Tracking & Dial Code Inputs */}
            <input
              type="hidden"
              name="zf_referrer_name"
              value={typeof window !== 'undefined' ? window.location.href : ''}
            />
            <input type="hidden" name="zf_redirect_url" value="" />
            <input type="hidden" name="zc_gad" value="" />
            <input type="hidden" name="PhoneNumber_countrycodeval" value={dialCode} />

            {/* Full Name */}
            <div>
              <label htmlFor="enquire-name" className="block text-xs font-semibold text-gray-700 mb-1.5">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                id="enquire-name"
                type="text"
                name="SingleLine"
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                maxLength={255}
                placeholder="e.g. John Doe"
                className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent transition-all"
              />
            </div>

            {/* Email Address */}
            <div>
              <label htmlFor="enquire-email" className="block text-xs font-semibold text-gray-700 mb-1.5">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                id="enquire-email"
                type="email"
                name="Email"
                value={formData.email}
                onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                maxLength={255}
                placeholder="e.g. john@example.com"
                className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent transition-all"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label htmlFor="enquire-phone" className="block text-xs font-semibold text-gray-700 mb-1.5">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <div className="w-full">
                <input
                  ref={phoneInputRef}
                  id="enquire-phone"
                  type="tel"
                  name="PhoneNumber_countrycode"
                  placeholder="98765 43210"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Course Interested In */}
            <fieldset>
              <legend className="block text-xs font-semibold text-gray-700 mb-1.5">
                Course Interested In <span className="text-red-500">*</span>
              </legend>
              <div className="grid grid-cols-1 gap-y-2 px-3.5 py-2.5 rounded-lg border border-gray-300">
                {COURSE_OPTIONS.map((opt) => (
                  <label key={opt.value} className="flex items-center gap-2.5 text-sm text-gray-900 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      name="MultipleChoice"
                      value={opt.value}
                      checked={formData.courses.includes(opt.value)}
                      onChange={(e) => {
                        const { checked } = e.target;
                        setFormData((prev) => ({
                          ...prev,
                          courses: checked
                            ? [...prev.courses, opt.value]
                            : prev.courses.filter((c) => c !== opt.value)
                        }));
                      }}
                      className="h-4 w-4 rounded border-gray-300 text-brand-blue focus:ring-brand-blue accent-brand-blue cursor-pointer"
                    />
                    {opt.label}
                  </label>
                ))}
              </div>
            </fieldset>

            {/* Terms & Conditions Authorization */}
            <div className="pt-1">
              <label className="flex items-start gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  name="TermsConditions"
                  checked={formData.terms}
                  onChange={(e) => setFormData((prev) => ({ ...prev, terms: e.target.checked }))}
                  className="mt-0.5 h-4 w-4 rounded border-gray-300 text-brand-blue focus:ring-brand-blue accent-brand-blue cursor-pointer"
                />
                <span className="text-[11px] text-gray-600 leading-snug">
                  I authorize Global Professional Certifications &amp; its representatives to contact me with updates and notifications via Email/SMS/WhatsApp/Call. <span className="text-red-500">*</span>
                </span>
              </label>
            </div>

            {/* Validation Error */}
            {formError && (
              <div className="p-2.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-medium animate-fadeIn">
                {formError}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={formStatus === 'submitting'}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-lg font-bold text-sm text-white bg-brand-blue hover:bg-[#2e0e75] hover:scale-[1.01] transition-all duration-200 shadow-md cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <span>SUBMIT ENQUIRY</span>
              <FaArrowRight className="text-xs shrink-0" />
            </button>

            {/* Privacy Note */}
            <div className="flex items-center justify-center gap-1.5 text-gray-400 text-[11px] text-center pt-2">
              <FaLock className="text-[10px] shrink-0" />
              <span>100% Privacy. No spam. Direct consultation via WhatsApp &amp; Email.</span>
            </div>
          </form>

          {/* Hidden iframe for non-redirecting native Zoho POST submission */}
          <iframe
            name={ZOHO_SUBMIT_TARGET}
            id={ZOHO_SUBMIT_TARGET}
            title="Zoho General Enquiry Submission Target"
            hidden
          />
        </div>
      </aside>
    </>
  );
}
