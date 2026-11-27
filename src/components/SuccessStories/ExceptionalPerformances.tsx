import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faCheck } from '@fortawesome/free-solid-svg-icons';
import { Link } from '../routing';
import { PersonIcon } from './GlobalCandidates';

/**
 * "Some exceptional performances by our candidates" section on /success.
 *
 * DESIGN BUILD: hard-coded dummy data for approval. Gets connected to Sanity
 * once the design is final.
 */

const DUMMY_PERFORMERS = [
    { name: 'Priya Sharma', country: 'India', cert: 'CIA', months: 4, parts: 3 },
    { name: 'Ahmed Al Mansoori', country: 'UAE', cert: 'CIA', months: 5, parts: 3 },
    { name: 'Rohit Verma', country: 'India', cert: 'CIA', months: 6, parts: 3 },
    { name: 'Fatima Al Harbi', country: 'Saudi Arabia', cert: 'CIA', months: 6, parts: 3 },
];

const ExceptionalPerformances = () => (
    <section id="exceptional-performances" className="w-full py-16 md:py-24 px-4 md:px-8 bg-white scroll-mt-24">
        <div className="max-w-[1280px] mx-auto">
            <p className="text-[11px] md:text-xs font-bold uppercase tracking-widest text-[#5B21B6]">Performances showcase</p>
            <h2 className="text-gray-900 text-3xl md:text-5xl font-bold leading-tight mt-3 max-w-3xl">
                Some exceptional performances by our candidates
            </h2>

            <div className="mt-10 md:mt-16 grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                {DUMMY_PERFORMERS.map(p => (
                    <article key={p.name} className="rounded-3xl border border-gray-100 bg-white p-6 flex flex-col">
                        <div className="flex items-start justify-between gap-3">
                            <div>
                                <p className="text-gray-500 text-sm">Time to clear</p>
                                <p className="mt-0.5">
                                    <span className="text-[#5B21B6] text-4xl font-bold leading-none">{p.months}</span>
                                    <span className="text-gray-700 font-semibold ml-1.5">months</span>
                                </p>
                            </div>
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F1EBFE] px-3 py-1 text-xs font-semibold text-[#5B21B6]">
                                <FontAwesomeIcon icon={faCheck} className="text-[10px]" /> {p.cert}
                            </span>
                        </div>

                        {/* Parts cleared */}
                        <div className="mt-6 grid gap-1.5" style={{ gridTemplateColumns: `repeat(${p.parts}, minmax(0, 1fr))` }}>
                            {Array.from({ length: p.parts }, (_, i) => (
                                <div key={i}>
                                    <div className="h-1.5 rounded-full bg-[#5B21B6]" />
                                    <p className="text-gray-700 text-xs font-medium mt-2">Part {i + 1} ✓</p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 pt-6 border-t border-gray-100 flex items-center gap-4">
                            <div className="w-16 h-16 md:w-[72px] md:h-[72px] shrink-0 rounded-full bg-[#F1EBFE] border-4 border-white ring-1 ring-[#E4DAFB] flex items-center justify-center text-[#5B21B6]">
                                <PersonIcon className="w-7 h-7" />
                            </div>
                            <div className="min-w-0">
                                <h3 className="text-gray-900 text-lg font-semibold leading-tight">{p.name}</h3>
                                <p className="text-gray-500 text-sm mt-1">{p.country}</p>
                            </div>
                        </div>
                    </article>
                ))}
            </div>

            <div className="mt-10 md:mt-12 flex justify-center">
                <Link
                    to="/courses/cia"
                    className="inline-flex items-center gap-2 rounded-full bg-[#5B21B6] text-white font-semibold text-sm md:text-base px-7 py-3.5 hover:bg-[#4C1D95] transition-colors"
                >
                    Start your CIA journey <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
                </Link>
            </div>
        </div>
    </section>
);

export default ExceptionalPerformances;
