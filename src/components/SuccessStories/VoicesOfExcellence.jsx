import React from 'react';
import { voicesOfExcellenceData } from './constant';

const TestimonialCard = ({ data }) => (
  <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col h-full">
    {/* Large Quotes */}
    <div className="text-[#F1DEC6] mb-4">
      <svg width="34" height="24" viewBox="0 0 34 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.4418 0H14.1611C14.7171 0 15.0118 0.589139 14.6543 1.01815L8.91034 7.91054C8.42878 8.48842 8.79051 9.4 9.54452 9.4H11.2326C13.5684 9.4 15.4623 11.2939 15.4623 13.6297V19.7703C15.4623 22.1061 13.5684 24 11.2326 24H4.22971C1.89393 24 0 22.1061 0 19.7703V13.6335C0 12.3391 0.536033 11.103 1.48279 10.2119L10.7428 1.50361C11.196 1.07728 11.8023 0 12.4418 0Z" fill="currentColor"/>
        <path d="M30.9795 0H32.6988C33.2548 0 33.5495 0.589139 33.192 1.01815L27.4481 7.91054C26.9665 8.48842 27.3282 9.4 28.0822 9.4H29.7703C32.1061 9.4 34 11.2939 34 13.6297V19.7703C34 22.1061 32.1061 24 29.7703 24H22.7674C20.4316 24 18.5377 22.1061 18.5377 19.7703V13.6335C18.5377 12.3391 19.0737 11.103 20.0205 10.2119L29.2805 1.50361C29.7337 1.07728 30.34 0 30.9795 0Z" fill="currentColor"/>
      </svg>
    </div>
    
    <p className="text-[#334155] font-medium leading-relaxed mb-8 flex-grow" style={{ fontSize: '15px' }}>
      {data.quote}
    </p>

    <div className="flex items-center gap-4 mt-auto">
      <div 
        className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0"
        style={{ backgroundColor: data.avatarBg }}
      >
        {data.initials}
      </div>
      <div>
        <h4 className="text-gray-900 font-bold text-[15px] leading-tight">{data.name}</h4>
        <p className="text-gray-500 font-bold text-[10px] uppercase tracking-wide mt-1">{data.designation}</p>
      </div>
    </div>
  </div>
);

// Main Component
// Props (all optional, fallback to dummy data)
// - testimonials -> array of {quote, name, designation, initials, avatarBg} (from Sanity later)
const VoicesOfExcellence = ({ testimonials: propTestimonials } = {}) => {
  const testimonials = propTestimonials || voicesOfExcellenceData;

  return (
    <div className="w-full">
      {/* Top Section - Light Background */}
      <section className="bg-[#F5F4F1] py-16 md:py-24 px-4 w-full">
        <div className="max-w-[1200px] mx-auto flex flex-col items-center">
          
          {/* Header */}
          <div className="text-center mb-14">
            <span 
              className="inline-block px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest text-[#2D1B69] mb-6"
              style={{ backgroundColor: 'rgba(45, 27, 105, 0.08)' }}
            >
              CIA CHALLENGE EXAM TRAINING
            </span>
            
            <h2 className="text-[#0F172A] text-4xl md:text-5xl font-bold mb-4">
              Voices of Excellence
            </h2>
            
            <div className="w-16 h-1 bg-[#D4AF37] mx-auto mt-6"></div>
          </div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-[1100px]">
            {testimonials.map((item, idx) => (
              <TestimonialCard key={idx} data={item} />
            ))}
          </div>

        </div>
      </section>

      {/* Bottom Section - Deep Purple Background */}
      <section className="bg-[#3b2080] py-20 px-4 w-full text-center relative overflow-hidden">
        {/* Abstract background overlays (optional based on exact design, adding a subtle gradient) */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#2D1B69] to-[#3b2080] opacity-90 z-0"></div>
        
        <div className="max-w-[900px] mx-auto relative z-10 flex flex-col items-center">
          <h2 
            className="text-white text-4xl md:text-[54px] font-bold leading-[1.15] mb-6"
          >
            Your name could be <span className="italic font-normal opacity-90">next on<br/>this page</span>
          </h2>
          
          <p className="text-white/80 text-[15px] md:text-base font-medium max-w-[650px] mb-10 leading-relaxed">
            Join 1,200+ professionals who have accelerated their careers through GPC's<br className="hidden md:block" /> globally recognized certification programs and expert mentorship.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 mb-12">
            <button className="bg-[#CF9B3E] hover:bg-[#b8852d] text-gray-900 font-bold px-8 py-3.5 rounded-xl transition-colors shadow-lg">
              Explore Certification Programs
            </button>
            <button className="bg-transparent border border-white/30 text-white hover:bg-white/10 font-bold px-8 py-3.5 rounded-xl transition-colors">
              Talk to an Advisor
            </button>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="flex text-[#F59E0B] text-xl gap-1">
              ★★★★★
            </div>
            <p className="text-white/60 text-[10px] font-bold tracking-widest uppercase">
              RATED 4.9/5 BY OUR GLOBAL ALUMNI
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VoicesOfExcellence;
