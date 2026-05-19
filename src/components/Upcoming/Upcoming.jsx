import React from 'react';
import { m } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { FaCalendarAlt, FaClock, FaArrowRight, FaGraduationCap, FaBullhorn } from 'react-icons/fa';
import FAQDisplay from "../FAQDisplay.jsx";
import { SchemaMarkup, getEventSchema, generateBreadcrumbSchema, getFAQSchema, getOrganizationSchema } from "../Schema";

// Assets
import faqImage from "../../assets/faq.webp";
import orientationCover from "../../assets/upcoming-orientation.png";

// --- DATA CONSTANTS ---

const upcomingBatches = [
    {
    id: 1,
    name: "CIA Part 1",
    description: "Start your CIA journey with our comprehensive Part 1 batch covering all fundamental audit concepts and the IPPF framework.",
    date: "May 23, 2026",
    enrollLink: "https://rzp.io/rzp/BjsIQfL",
  },
  {
    id: 2,
    name: "CIA Challenge Batch In Collaboration With IIA Bombay",
    description: "The IIA Bombay Chapter presents a high-impact CIA Challenge Crash Course (2026), now enhanced with premium Gleim study materials. Led by Mr. Arpit Garg, this weekend live batch is designed to help you build strong concepts, focus on revision, and master exam-ready MCQ practice.",
    date: "May 23, 2026",
    enrollLink: "https://rzp.io/rzp/9AticWKJ",
  }
];

const courseFaqs = [
  {
    question: "I work a full-time job. How can I manage these certification classes?",
    answer: "We understand your schedule is tight. To make it manageable, all our batches are held on weekends only. This allows working professionals to focus entirely on their careers during the week and dedicate their Saturdays and Sundays to mastering their CIA or CISA certification without the stress of weekday sessions."
  },
  {
    question: "Who should join the CIA Part 2 Revision Batch?",
    answer: "If you're feeling stuck or overwhelmed by CIA Part 2, this batch is for you. Across 4 high-impact sessions and 14 hours of intensive learning, we bridge the gap between theory and the exam. These sessions are designed to help you recall core concepts with additional learnings and MCQs to reinforce your knowledge and build exam-day confidence."
  },
  {
    question: "What materials and resources are included when I enrol?",
    answer: "You get everything you need in one place. Every enrolment includes 24/7 LMS access, giving you the flexibility to study whenever it fits your schedule. You'll have access to all recorded sessions, a comprehensive library of practice MCQs, and updated study materials that reflect the latest exam syllabi."
  },
  {
    question: "Can I interact with the mentor during the live weekend sessions?",
    answer: "Absolutely. These are live, interactive sessions where real-time engagement is encouraged. You will learn exclusively from Arpit Garg, and our 'Zero-Doubt' policy ensures you can ask questions and participate in discussions directly. We make sure no student moves to the next topic without fully grasping the current one."
  },
  {
    question: "What happens if I miss a live weekend session?",
    answer: "Don't worry about falling behind. Since all our batches are recorded, you can access the video lectures on our LMS immediately after the session. You can catch up at your own convenience during the week and bring any specific questions to our 24/7 support group or the next live class."
  }
];

// --- MAIN COMPONENT ---

const Upcoming = () => {
  // Breadcrumb Schema
  const breadcrumbSchema = generateBreadcrumbSchema("/upcoming");

  // Organization Schema
  const orgSchema = getOrganizationSchema();

  // FAQ Schema
  const faqSchema = getFAQSchema(courseFaqs);

  // Event Schemas
  const eventSchemas = upcomingBatches.map(batch => getEventSchema({
    name: batch.name,
    description: batch.description,
    startDate: new Date(batch.date).toISOString(),
    endDate: new Date(batch.date).toISOString(), // Adjust if end date differs
    isOnline: true,
    locationUrl: batch.enrollLink,
    price: "0" // Placeholder price, customize if necessary
  }));

  return (
    <div className="bg-gray-50 min-h-screen">
      <Helmet>
        <title>Upcoming Batches & Webinars | Global Professional Certifications</title>
        <meta name="description" content="Stay updated with upcoming CIA, CISA, CRMA, and IAP certification batches. Join our global webinars on Risk Management and Internal Audit excellence." />
      </Helmet>
      <SchemaMarkup schema={[breadcrumbSchema, orgSchema, faqSchema, ...eventSchemas]} />

      {/* ═══════════ HERO ═══════════ */}
      <section className="relative bg-brand-blue pt-16 pb-14 md:pt-24 md:pb-20 overflow-hidden text-center">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-white/5 to-transparent pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-56 h-56 bg-brand-purple/10 rounded-full blur-3xl" />
        <div className="max-w-5xl mx-auto px-3 md:px-4 relative z-10">
          <m.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p className="inline-block px-4 py-1.5 bg-white/10 border border-white/15 text-orange-400 text-[11px] md:text-xs rounded-full font-bold tracking-[0.25em] uppercase mb-6">
              Upcoming Batches and Announcements
            </p>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white leading-[1.1] tracking-tight mb-5">
              Explore <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-pink-500 to-orange-600">What's Coming Next</span>
            </h1>
            <p className="text-gray-300 text-base md:text-lg leading-relaxed font-light max-w-2xl mx-auto">
              Stay ahead with our upcoming events, live webinars, and expertly designed courses — crafted to help you learn, grow, and take the next step in your journey.
            </p>
          </m.div>
        </div>
      </section>

      {/* ═══════════ IMPORTANT ANNOUNCEMENT ═══════════
      <section className="py-8 md:py-10 bg-amber-50/50 border-b border-amber-100/50">
        <div className="max-w-7xl mx-auto px-3 md:px-4">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-14">

            <div className="flex items-center gap-5 flex-shrink-0">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-brand-blue to-brand-purple flex items-center justify-center shadow-md shadow-brand-blue/15 rotate-[-6deg]">
                <FaBullhorn className="text-white text-xl md:text-2xl rotate-[6deg]" />
              </div>
              <h2 className="text-2xl md:text-3xl text-brand-blue leading-tight tracking-tight" style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800 }}>
                Important<br className="hidden md:block" /> Announcement
              </h2>
            </div>

            <div className="hidden lg:block w-px h-14 bg-amber-200/70" />

            <div className="text-gray-800 text-lg leading-relaxed">
              <p>Enroll in CIA (All Parts) for INR 49,999 + GST (including Gleim Material) till 15th May.
                Price increases to INR 60,000 + GST from 16th May onwards.</p>
            </div>

          </div>
        </div>
      </section>
      */}

      {/* ═══════════ UPCOMING BATCHES ═══════════ */}
      <section id="batches" className="py-16 md:py-20 bg-transparent">
        <div className="max-w-7xl mx-auto px-4">

          {/* Section Header */}
          <m.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12 space-y-3">
            <h2 className="text-2xl md:text-4xl font-bold text-center">
              Upcoming <span className="text-brand-blue font-normal italic">Batches</span>
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto text-[15px] font-light leading-relaxed">
              Secure your spot in our upcoming certification batches and accelerate your professional journey with industry experts.
            </p>
          </m.div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcomingBatches.map((batch, index) => (
              <m.div
                key={batch.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.45 }}
                className="group bg-white border border-gray-100 rounded-2xl p-7 hover:shadow-xl hover:shadow-purple-100/60 transition-all duration-400 relative flex flex-col h-full overflow-hidden"
              >
                {/* Top accent */}
                <div className="absolute top-0 left-0 w-full h-1 bg-brand-blue group-hover:bg-brand-purple transition-colors duration-400" />

                {/* Badge + Icon */}
                <div className="flex justify-between items-start mb-5">
                  <span className="px-3 py-0.5 bg-orange-500/10 text-orange-600 text-[10px] font-bold rounded-full uppercase tracking-widest border border-orange-500/15">
                    Filling Fast
                  </span>
                  <div className="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center text-gray-300 group-hover:bg-brand-purple group-hover:text-white transition-all duration-400">
                    <FaGraduationCap className="text-base" />
                  </div>
                </div>

                <h3 className="text-xl md:text-3xl font-bold text-gray-900 mb-3">
                  {batch.name}
                </h3>

                <p className="text-gray-500 text-sm font-light leading-relaxed mb-6 flex-grow">
                  {batch.description}
                </p>

                <div className="pt-5 border-t border-gray-50">
                  <div className="bg-gray-50 rounded-xl px-4 py-3 flex items-center gap-3">
                    <FaCalendarAlt className="text-brand-purple text-sm md:text-xl flex-shrink-0" />
                    <div>
                      <p className="text-[9px] text-gray-400 uppercase font-bold tracking-wider">Starts On</p>
                      <p className="text-gray-800 text-sm md:text-base font-semibold">{batch.date}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <a href={batch.enrollLink} target="_blank" rel="noopener noreferrer" className="w-full py-3.5 bg-gray-900 group-hover:bg-brand-purple text-white text-sm font-bold rounded-xl flex items-center justify-center gap-2 transition-all duration-300">
                    Enroll Now <FaArrowRight className="text-[10px] group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </m.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ ORIENTATION ═══════════ 
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-3 md:px-4">

          <m.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10 space-y-3">
            <h2 className="text-2xl md:text-4xl font-bold text-center">
              Live <span className="text-brand-blue font-normal italic">Orientation</span>
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto text-[15px] font-light leading-relaxed">
              Get a head start before the batch begins. Join our free orientation to meet your mentor, understand the exam strategy, and plan your preparation.
            </p>
          </m.div>

          <m.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <div className="bg-gray-50 border border-gray-300 overflow-hidden">
              <div className="flex flex-col lg:flex-row">

                <div className="w-full lg:w-1/3 relative min-h-[220px] overflow-hidden">
                  <img src={orientationCover} alt="Live Orientation" className="absolute inset-0 w-full h-full" />
                </div>

                <div className="w-full lg:w-2/3 p-7 md:p-10 flex flex-col justify-between">

                  <div>
                    <h3 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4 leading-snug">
                      Orientation for CIA Part 1 Batch
                    </h3>

                    <p className="text-gray-500 text-[15px] font-light leading-relaxed mb-7">
                      A vital introductory session to understand the course structure, exam patterns, and the roadmap to becoming a Certified Internal Auditor.
                    </p>

                    <div className="flex items-center gap-2 text-brand-blue font-bold text-[10px] uppercase tracking-[0.15em] drop-shadow-lg">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-blue animate-pulse drop-shadow-md" />
                      Live Session
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-y-4">
                      <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
                        <div className="flex items-center gap-2.5">
                          <FaCalendarAlt className="text-brand-blue" />
                          <span className="text-gray-800 font-semibold text-base">May 16, 2026</span>
                        </div>
                        <div className="flex items-center gap-2.5">
                          <FaClock className="text-orange-500" />
                          <span className="text-gray-800 font-semibold text-base">05:00 PM – 06:00 PM (IST)</span>
                        </div>
                      </div>
                      <a href="https://zurl.co/6iUB9" target="_blank" rel="noopener noreferrer" className="px-8 py-3 bg-brand-blue text-white text-sm font-bold hover:bg-brand-purple transition-all shadow-md shadow-brand-blue/15">
                        Register Now
                      </a>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </m.div>
        </div>
      </section>
      */}

      {/* ═══════════ WEBINAR (TEMPORARILY HIDDEN) ═══════════ */}
      {/* 
      <section className="bg-brand-blue py-16 md:py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/4 h-full bg-white/[0.03] skew-x-12 translate-x-1/2" />
        <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-brand-purple/8 rounded-full blur-[100px]" />

        <div className="max-w-7xl mx-auto px-3 md:px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-14">

            <div className="w-full lg:w-5/12">
              <m.div
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative rounded-2xl overflow-hidden group shadow-[0_20px_50px_-12px_rgba(0,0,0,0.45)]"
              >
                <img src="/webinar-cover.png" alt="Mastering Internal Audit Webinar" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/70 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5">
                  <span className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/15 rounded-full text-white text-[10px] font-bold uppercase tracking-widest">
                    Expert-Led Session
                  </span>
                </div>
              </m.div>
            </div>

            <div className="w-full lg:w-7/12">
              <m.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                <p className="text-orange-400 font-bold tracking-[0.25em] uppercase text-[11px] mb-3">Global Webinar Series</p>
                <h2 className="text-2xl md:text-4xl font-extrabold text-white leading-tight mb-6">
                  Mastering <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">Internal Audit:</span> Risk-Based Planning for 2026
                </h2>
                <p className="text-gray-300 text-[15px] md:text-base font-light leading-relaxed mb-8 max-w-xl">
                  Join Arpit Garg for an exclusive deep dive into risk-based audit planning. Learn how to align audit activities with organizational objectives and navigate the evolving risk landscape with confidence.
                </p>

                <div className="flex flex-wrap gap-x-8 gap-y-4 mb-10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-orange-400">
                      <FaCalendarAlt />
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wide">Date</p>
                      <p className="text-white font-semibold">June 10, 2026</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-brand-purple">
                      <FaClock />
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wide">Time</p>
                      <p className="text-white font-semibold">06:00 PM – 07:30 PM (IST)</p>
                    </div>
                  </div>
                </div>

                <div>
                  <button className="px-8 py-3 bg-gradient-to-r from-orange-500 to-pink-600 text-white text-sm font-bold rounded-xl hover:scale-[1.03] transition-all shadow-lg shadow-orange-500/15">
                    Reserve Your Seat
                  </button>
                </div>
              </m.div>
            </div>

          </div>
        </div>
      </section>
      */}

      {/* ═══════════ FAQ ═══════════ */}
      <div className="py-16 md:py-20 px-3 md:px-4 bg-transparent">
        <div className="flex flex-col lg:flex-row items-center gap-14 lg:gap-0 max-w-7xl mx-auto">
          <div className="w-full lg:w-2/5 flex justify-center items-center relative">
            <div className="absolute max-w-sm w-full h-full bg-brand-blue/25 translate-x-3 translate-y-3 md:translate-x-5 md:translate-y-5 z-0" />
            <img src={faqImage} alt="FAQ illustration" className="max-w-sm w-full object-contain relative z-10 -translate-x-3 -translate-y-3 md:-translate-x-5 md:-translate-y-5" />
          </div>
          <div className="w-full lg:w-3/5">
            <FAQDisplay faqs={courseFaqs} showCount={5} showMoreLink="/faq" />
          </div>
        </div>
      </div>

      {/* ═══════════ STAY TUNED / SUBSCRIBE ═══════════ */}
      <section id="subscribe" className="bg-brand-blue py-14 md:py-16">
        <div className="max-w-7xl mx-auto px-3 md:px-12">
          <m.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-col lg:flex-row items-center justify-between gap-8">

            {/* Text */}
            <div className="w-full lg:w-2/3 text-center lg:text-left">
              <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
                Stay <span className="text-orange-300 font-normal italic">Tuned</span>
              </h2>
              <p className="text-gray-300 text-sm md:text-xl leading-relaxed mt-3">
                We are preparing a suite of high-impact updates, exclusive masterclasses, and strategic tools to help you excel. Subscribe now to get the full reveal in your inbox.
              </p>
            </div>

            {/* Button */}
            <div className="w-full lg:w-1/3 flex justify-center lg:justify-end">
              <a href="https://zfrmz.in/WWlc8GhQlB7WG6xJlfCk" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 text-white text-lg font-bold py-3 px-5 hover:scale-[1.03] transition-all whitespace-nowrap rounded-xl">
                Get All the Updates
              </a>
            </div>

          </m.div>
        </div>
      </section>

    </div>
  );
};

export default Upcoming;
