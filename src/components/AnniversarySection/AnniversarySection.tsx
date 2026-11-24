'use client';

import { useState, useEffect, useRef } from "react";
import { Link } from '../routing';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import type { CmsData } from '../../types/cms';

const AnniversaryVideo = () => {
  const [playing, setPlaying] = useState(false);
  const frameRef = useRef<CmsData>(null);

  // Stop this video when the user clicks outside its frame (e.g. to play another video).
  useEffect(() => {
    if (!playing) return;

    const handleOutsideClick = (event) => {
      if (frameRef.current && !frameRef.current.contains(event.target)) {
        setPlaying(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [playing]);

  return (
    <div ref={frameRef} className="relative w-full h-[300px] sm:h-[400px] md:h-[450px]">
      {!playing ? (
        <div className="absolute inset-0 cursor-pointer" onClick={() => setPlaying(true)}>
          <img
            src="/thumbnails/WgA9VzD06kY-opt.webp"
            alt="One Year of GPC — A Journey of Growth, Learning & Creativity"
            width="800"
            height="450"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            <div className="bg-red-600 rounded-lg px-6 py-3 flex items-center justify-center shadow-lg">
              <FontAwesomeIcon icon={faPlay} className="text-white text-xl" />
            </div>
          </div>
        </div>
      ) : (
        <iframe
          className="absolute inset-0 w-full h-full"
          src="https://www.youtube.com/embed/WgA9VzD06kY?autoplay=1"
          title="One Year of GPC | A Journey of Growth, Learning & Creativity"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      )}
    </div>
  );
};

// "Marking 1 Year of Success and Growth" — anniversary video + Our Journey CTA.
export default function AnniversarySection() {
  return (
    <section className="relative bg-gradient-to-br from-pink-500 via-purple-600 to-purple-700 text-white py-20 md:py-28 px-4 md:px-12 lg:px-20 overflow-hidden">
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
            Global Professional Certifications: Marking 1 Year of <span className="italic font-regular text-yellow-400">Success and Growth</span>
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
              <AnniversaryVideo />
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
                to="/our-journey"
                className="inline-flex items-center justify-center w-full py-3 px-6 rounded-full bg-white text-brand-blue font-bold text-lg shadow-lg hover:bg-brand-blue hover:text-white transition-all duration-300"
              >
                See Our Journey →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
