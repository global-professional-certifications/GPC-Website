'use client';

import React, { useEffect, useState } from "react";
import { m } from 'motion/react';
import { Users, GraduationCap, BookCheck } from "lucide-react";

/*
 * Stats bar (Professionals / Years of Teaching Experience / Batches Completed).
 *
 * Shared by the Home page and /courses so the figures stay identical. Render it
 * inside a `relative` wrapper around the page hero: it is absolutely positioned
 * to overlap the hero's bottom edge.
 */

const Counter = ({ target }: { target: number }) => {
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

export default function StatsBar() {
  return (
    <m.div
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
              <Counter target={6} />
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
              <Counter target={30} />
            </p>
            <p className="text-[8px] md:text-[12px] text-gray-600 mt-0.5">
              Batches Completed
            </p>
          </div>
        </div>
      </div>
    </m.div>
  );
}
