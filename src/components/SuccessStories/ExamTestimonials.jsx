import React from 'react';
import { examTestimonialsData } from './constant';

export const ExamTestimonials = () => {
    return (
        <section id="cia-exam-results" aria-label="What our students are saying" className="bg-gray-50 py-12 md:py-20 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
                <div className="mx-auto max-w-2xl text-center mb-12 md:mb-16">
                    <h2 className="font-display text-2xl sm:text-3xl font-bold text-brand-blue">
                        Real Results from CIA Challenge Exam Training
                    </h2>
                </div>
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {examTestimonialsData.map((testimonial, index) => (
                        <li key={index}>
                            <figure className="relative border border-gray-300 rounded-2xl bg-white p-4 md:p-6 shadow-xl shadow-slate-900/10 h-full flex flex-col">
                                <svg
                                    aria-hidden="true"
                                    width="105"
                                    height="78"
                                    className="absolute left-6 top-6 fill-slate-100 hidden md:block"
                                >
                                    <path d="M25.086 77.292c-4.821 0-9.115-1.205-12.882-3.616..." />
                                </svg>
                                <blockquote className="relative flex-1">
                                    <p className="text-sm md:text-lg text-slate-900">{testimonial.text}</p>
                                </blockquote>
                                <figcaption className="relative mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
                                    <div>
                                        <div className="font-display text-sm md:text-base text-slate-900">{testimonial.name}</div>
                                        <div className="font-display text-xs md:text-sm text-brand-gray">{testimonial.designation}</div>
                                    </div>
                                    <div className="overflow-hidden rounded-full bg-slate-50 flex-shrink-0">
                                        <img
                                            alt=""
                                            className="h-10 w-10 md:h-14 md:w-14 object-cover"
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
    )
}
