import React from "react";
import { FcGoogle } from "react-icons/fc";
import { FaStar } from "react-icons/fa";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";

/*
 * Verified Google Reviews
 *
 * Universal section: same content everywhere, no props. Links to the
 * Global Professional Certifications Google Business review page.
 */

const GOOGLE_REVIEW_URL = "https://g.page/r/CUJj3Z44cnnCEAE/review";

export default function GoogleReviews() {
  return (
    <section id="google-reviews" className="font-poppins px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <div className="max-w-6xl mx-auto">
        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm px-6 py-10 md:px-12 md:py-12">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            {/* Google mark */}
            <div className="flex h-24 w-24 md:h-28 md:w-28 flex-shrink-0 items-center justify-center rounded-2xl border border-gray-200 bg-gray-50">
              <FcGoogle className="h-14 w-14 md:h-16 md:w-16" aria-hidden="true" />
            </div>

            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
                Verified Global Professional Certification{" "}
                <span className="text-brand-blue font-normal italic">Google Reviews</span>
              </h2>
              <div className="mt-3 flex justify-center md:justify-start gap-1" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, i) => (
                  <FaStar key={i} className="h-5 w-5 text-yellow-400" />
                ))}
              </div>
            </div>

            <a
              href={GOOGLE_REVIEW_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-shrink-0 items-center gap-2 rounded-xl bg-brand-blue px-6 py-3 text-sm md:text-base font-semibold text-white shadow-md transition-all duration-300 hover:bg-brand-purple hover:shadow-lg"
            >
              Review Us on Google
              <FaArrowUpRightFromSquare className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
