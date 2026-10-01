import React from "react";
import pinkyPhoto from "../../assets/pinky-photo.jpg";
import akshdeepSingh from "../../assets/akshdeep-singh.png";
import testimonialTwo from "../../assets/testimonial-2.png";

const testimonials = [
  {
    name: "Pinky Agarwal",
    designation: "Head Internal Audit | Emami Limited",
    text: "For anyone preparing for the CIA Challenge Exam, I cannot recommend the Prep Course enough. This program is designed to simplify the learning process and help you stay disciplined with your studies. Arpit Garg, who led the sessions, brought an incredible level of dedication, passion, enthusiasm and expertise to the table.",
    image: pinkyPhoto,
  },
  {
    name: "Akshdeep Singh",
    designation: "Manager | KPMG",
    text: "The CIA Challenge Exam Crash Course, offered and delivered by faculty member Arpit Garg, played a key role in helping me clear the CIA Challenge Exam on my first attempt after just 2 months of preparation. The crash course sessions, held over weekends, were well-planned, thorough, and provided attendees with opportunities.",
    image: akshdeepSingh,
  },
  {
    name: "Starwin PJ",
    designation: "AVP | Wells Fargo",
    text: "Attended the “CIA Challenge Exam” crash course conducted by Mr. Arpit, and it was truly an outstanding learning experience. The sessions were thoughtfully structured, covering the entire syllabus with a perfect balance of depth and clarity. The interactive approach ensured key topics were highlighted.",
    image: testimonialTwo,
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" aria-label="What our customers are saying" className="bg-gray-50 pb-20 md:pb-[140px] pt-20 ">
      <div className="mx-auto max-w-sm md:max-w-[76rem] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight text-brand-blue sm:text-4xl">
            What Our Students Say
          </h2>
        </div>
        <ul className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:gap-8 lg:mt-20 lg:max-w-none lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <li key={index}>
              <figure className="relative border border-gray-300 rounded-2xl bg-white p-6 shadow-xl shadow-slate-900/10">
                <svg
                  aria-hidden="true"
                  width="105"
                  height="78"
                  className="absolute left-6 top-6 fill-slate-100"
                >
                  <path d="M25.086 77.292c-4.821 0-9.115-1.205-12.882-3.616..." />
                </svg>
                <blockquote className="relative">
                  <p className="text-lg text-slate-900">{testimonial.text}</p>
                </blockquote>
                <figcaption className="relative mt-6 flex items-center justify-between border-t border-slate-100 pt-6">
                  <div>
                    <div className="font-display text-base text-slate-900">{testimonial.name}</div>
                    <div className="font-display text-sm text-brand-gray">{testimonial.designation}</div>
                  </div>
                  <div className="overflow-hidden rounded-full bg-slate-50">
                    <img
                      alt=""
                      className="h-14 w-14 object-cover"
                      src={testimonial.image}
                    />
                  </div>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
