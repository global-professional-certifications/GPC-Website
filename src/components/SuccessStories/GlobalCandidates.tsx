import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from '../routing';
import { urlFor } from '../../lib/sanity/imageBuilder';
import type { CmsData, CmsList } from '../../types/cms';

/**
 * "Our Global Candidates" section on /success.
 *
 * Data comes from the `globalCandidate` Sanity type (first 8 by Display Order,
 * see GLOBAL_CANDIDATES_QUERY). The first one is the large featured card.
 * Renders nothing when there are no entries. Anchor #global-candidates lets
 * /success#global-candidates be sent to global leads.
 */

export const PersonIcon = ({ className = '' }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1" />
    </svg>
);

const PinIcon = ({ className = '' }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
        <circle cx="12" cy="10" r="3" />
    </svg>
);

const CertBadge = ({ cert, onTint = false }: { cert?: string; onTint?: boolean }) => {
    if (!cert) return null;
    return (
        <span className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] md:text-xs font-semibold text-[#5B21B6] ${onTint ? 'bg-white' : 'bg-[#F1EBFE]'}`}>
            {cert}
        </span>
    );
};

/** Round photo, or the placeholder person icon when no photo is uploaded. */
const Avatar = ({ photo, name, className, iconClassName }: { photo?: unknown; name: string; className: string; iconClassName: string }) => (
    <div className={`${className} shrink-0 rounded-full overflow-hidden flex items-center justify-center text-[#5B21B6]`}>
        {photo ? (
            <img src={urlFor(photo).width(240).height(240).fit('crop').url()} alt={name} loading="lazy" className="w-full h-full object-cover" />
        ) : (
            <PersonIcon className={iconClassName} />
        )}
    </div>
);

const DEFAULT_TITLE = 'Achievers Across the Globe';
const DEFAULT_SUBTITLE = 'Professionals from around the world who earned their certification with Global Professional Certifications. Here are a few of them.';

const GlobalCandidates = ({ candidates = [], settings = null }: { candidates?: CmsList; settings?: CmsData }) => {
    if (!candidates || candidates.length === 0) return null;
    const [featured, ...rest] = candidates;

    return (
        <section id="global-candidates" className="w-full py-16 md:py-24 px-4 md:px-8 bg-[#F7F6FB] scroll-mt-24">
            <div className="max-w-[1280px] mx-auto grid gap-6 lg:gap-8 lg:grid-cols-[340px_1fr]">
                {/* Left panel */}
                <div className="rounded-3xl bg-[#2E1065] text-white p-8 md:p-10 flex flex-col">
                    <h2 className="text-3xl md:text-[40px] font-bold leading-tight">{settings?.globalCandidatesTitle || DEFAULT_TITLE}</h2>
                    <p className="text-white/80 text-sm md:text-[15px] leading-relaxed font-poppins mt-5">
                        {settings?.globalCandidatesSubtitle || DEFAULT_SUBTITLE}
                    </p>

                    <Link
                        to="#video-vault"
                        className="mt-8 lg:mt-auto self-start inline-flex items-center gap-2 rounded-full bg-white text-[#2E1065] font-semibold text-sm px-6 py-3 hover:bg-[#F1EBFE] transition-colors"
                    >
                        View all success stories <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
                    </Link>
                </div>

                {/* Candidate grid */}
                <div className="grid gap-4 md:gap-5 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 auto-rows-fr">
                    {/* Featured */}
                    <div className="sm:col-span-2 rounded-3xl bg-[#EFE9FD] p-5 md:p-7 flex items-center gap-5 md:gap-7">
                        <Avatar photo={featured.photo} name={featured.name} className="w-20 h-20 md:w-28 md:h-28 bg-white border border-[#D6C8F5]" iconClassName="w-9 h-9 md:w-12 md:h-12" />
                        <div className="min-w-0 flex-1">
                            <h3 className="text-gray-900 text-xl md:text-[28px] font-bold leading-tight">{featured.name}</h3>
                            <p className="text-gray-700 text-sm md:text-base font-semibold mt-2">{featured.company}</p>
                            <p className="text-gray-500 text-sm md:text-base">{featured.designation}</p>
                            <div className="mt-4 pt-4 border-t border-[#DDD3F7] flex flex-wrap items-center justify-between gap-2">
                                <p className="text-gray-600 text-sm md:text-base flex items-center gap-1.5">
                                    <PinIcon className="w-4 h-4 shrink-0" /> {featured.country}
                                </p>
                                <CertBadge cert={featured.certification} onTint />
                            </div>
                        </div>
                    </div>

                    {rest.map(c => (
                        <div key={c._id} className="rounded-3xl bg-white border border-gray-100 p-5 flex flex-col">
                            <div className="flex items-center gap-4 flex-1">
                                <Avatar photo={c.photo} name={c.name} className="w-14 h-14 md:w-16 md:h-16 bg-[#F1EBFE] border border-[#D6C8F5]" iconClassName="w-7 h-7" />
                                <div className="min-w-0">
                                    <h3 className="text-gray-900 text-base md:text-lg font-bold leading-tight">{c.name}</h3>
                                    <p className="text-gray-700 text-[13px] md:text-sm font-semibold leading-snug mt-1">{c.company}</p>
                                    <p className="text-gray-500 text-xs md:text-[13px] leading-snug">{c.designation}</p>
                                </div>
                            </div>
                            <div className="mt-4 pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-2">
                                <p className="text-gray-500 text-xs md:text-sm flex items-center gap-1">
                                    <PinIcon className="w-3.5 h-3.5 shrink-0" /> {c.country}
                                </p>
                                <CertBadge cert={c.certification} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default GlobalCandidates;
