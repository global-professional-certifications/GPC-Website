import React from 'react';

/**
 * High-fidelity, self-contained SVG logo definitions for the 10 global leaders.
 * Vector-based for zero CLS, crisp rendering on high-DPI screens, and zero external network latency.
 */

// 1. PwC
const PwcLogo = ({ className = "h-8 w-auto" }) => (
  <svg viewBox="0 0 160 50" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="PwC logo">
    {/* Geometric shape cluster */}
    <rect x="8" y="10" width="14" height="14" fill="#E0301E" />
    <rect x="22" y="10" width="14" height="14" fill="#FFB600" />
    <rect x="8" y="24" width="14" height="14" fill="#D9381E" />
    <rect x="22" y="24" width="14" height="14" fill="#EB8C00" />
    <polygon points="36,10 50,10 50,24" fill="#E0301E" />
    <polygon points="36,24 50,24 36,38" fill="#EB8C00" />
    {/* pwc text */}
    <text x="56" y="32" fontFamily="Arial, Helvetica, sans-serif" fontWeight="900" fontSize="30" fill="#2D2D2D" letterSpacing="-1.5">
      pwc
    </text>
  </svg>
);

// 2. Ernst & Young (EY)
const EyLogo = ({ className = "h-8 w-auto" }) => (
  <svg viewBox="0 0 160 50" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="EY logo">
    {/* Yellow energetic slash/beam */}
    <polygon points="12,14 46,6 40,11 8,19" fill="#FFE600" />
    {/* Bold EY */}
    <text x="10" y="38" fontFamily="Arial Black, Impact, sans-serif" fontWeight="900" fontSize="34" fill="#1E1E24" letterSpacing="-0.5">
      EY
    </text>
    {/* Tagline */}
    <text x="64" y="23" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="9" fill="#333333">
      Building a better
    </text>
    <text x="64" y="34" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="9" fill="#333333">
      working world
    </text>
  </svg>
);

// 3. Deloitte
const DeloitteLogo = ({ className = "h-7 w-auto" }) => (
  <svg viewBox="0 0 160 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Deloitte logo">
    <text x="4" y="28" fontFamily="'Helvetica Neue', Arial, sans-serif" fontWeight="800" fontSize="26" fill="#111827" letterSpacing="-0.8">
      Deloitte
    </text>
    {/* Signature Green Dot */}
    <circle cx="118" cy="26" r="4.5" fill="#86BC25" />
  </svg>
);

// 4. KPMG
const KpmgLogo = ({ className = "h-8 w-auto" }) => (
  <svg viewBox="0 0 160 50" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="KPMG logo">
    {/* 4 distinct blue window panes */}
    <rect x="8" y="6" width="30" height="34" stroke="#00338D" strokeWidth="2.5" fill="none" />
    <rect x="42" y="6" width="30" height="34" stroke="#00338D" strokeWidth="2.5" fill="none" />
    <rect x="76" y="6" width="30" height="34" stroke="#00338D" strokeWidth="2.5" fill="none" />
    <rect x="110" y="6" width="30" height="34" stroke="#00338D" strokeWidth="2.5" fill="none" />
    {/* Bold Italic KPMG Wordmark */}
    <text
      x="8"
      y="38"
      fontFamily="Arial Black, Impact, sans-serif"
      fontWeight="900"
      fontStyle="italic"
      fontSize="30"
      fill="#00338D"
      letterSpacing="2.5"
    >
      KPMG
    </text>
  </svg>
);

// 5. Wells Fargo
const WellsFargoLogo = ({ className = "h-8 w-auto" }) => (
  <svg viewBox="0 0 170 45" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Wells Fargo logo">
    {/* Red Corporate Box */}
    <rect x="4" y="6" width="162" height="33" rx="4" fill="#D71E28" />
    {/* Gold/White Serif Text */}
    <text
      x="85"
      y="28"
      textAnchor="middle"
      fontFamily="'Times New Roman', Georgia, serif"
      fontWeight="bold"
      fontSize="16"
      fill="#FFFFFF"
      letterSpacing="1.2"
    >
      WELLS FARGO
    </text>
  </svg>
);

// 6. Standard Chartered
const StandardCharteredLogo = ({ className = "h-8 w-auto" }) => (
  <svg viewBox="0 0 190 45" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Standard Chartered logo">
    {/* Intertwined Helix Ribbon Mark */}
    <g transform="translate(4, 8) scale(0.65)">
      <path
        d="M22 6 C12 6 6 14 6 22 C6 30 14 38 24 38 C32 38 38 32 38 24 C38 18 34 14 28 14 C22 14 18 18 18 22"
        stroke="#0077C8"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M18 34 C26 34 34 26 34 18 C34 10 26 2 16 2 C8 2 2 8 2 16 C2 22 6 26 12 26 C18 26 22 22 22 18"
        stroke="#00A551"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
      />
    </g>
    {/* Text */}
    <text x="38" y="21" fontFamily="Arial, Helvetica, sans-serif" fontWeight="800" fontSize="13" fill="#0C2340">
      Standard
    </text>
    <text x="38" y="35" fontFamily="Arial, Helvetica, sans-serif" fontWeight="800" fontSize="13" fill="#00A551">
      Chartered
    </text>
  </svg>
);

// 7. Citibank (Citi)
const CitibankLogo = ({ className = "h-8 w-auto" }) => (
  <svg viewBox="0 0 160 45" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Citibank logo">
    {/* Red Arch Bridge */}
    <path
      d="M32 15 C45 3 67 3 80 15"
      stroke="#EE162D"
      strokeWidth="4.5"
      strokeLinecap="round"
      fill="none"
    />
    {/* citi Wordmark */}
    <text x="12" y="34" fontFamily="Arial, Helvetica, sans-serif" fontWeight="700" fontSize="28" fill="#003B70" letterSpacing="-1">
      citibank
    </text>
  </svg>
);

// 8. Ford Motor
const FordLogo = ({ className = "h-8 w-auto" }) => (
  <svg viewBox="0 0 160 45" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Ford Motor logo">
    {/* Blue Oval */}
    <ellipse cx="80" cy="22.5" rx="55" ry="18" fill="#002C6C" stroke="#FFFFFF" strokeWidth="1.5" />
    <ellipse cx="80" cy="22.5" rx="52" ry="15.5" fill="none" stroke="#6C97C7" strokeWidth="1" />
    {/* Ford Script */}
    <text
      x="80"
      y="29"
      textAnchor="middle"
      fontFamily="'Brush Script MT', 'Lucida Handwriting', 'Segoe Script', cursive, sans-serif"
      fontStyle="italic"
      fontWeight="bold"
      fontSize="22"
      fill="#FFFFFF"
    >
      Ford
    </text>
  </svg>
);

// 9. Reliance Industries
const RelianceLogo = ({ className = "h-8 w-auto" }) => (
  <svg viewBox="0 0 170 45" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Reliance Industries logo">
    {/* Gold Flame/Leaf Emblem */}
    <g transform="translate(6, 4) scale(0.7)">
      <circle cx="22" cy="22" r="18" fill="#C59B27" />
      <path d="M22 8 C16 16 12 24 22 34 C26 28 28 20 22 8 Z" fill="#FFFFFF" />
      <circle cx="22" cy="22" r="4" fill="#C59B27" />
    </g>
    {/* Typography */}
    <text x="44" y="21" fontFamily="Georgia, serif" fontWeight="bold" fontSize="15" fill="#231F20" letterSpacing="0.5">
      Reliance
    </text>
    <text x="44" y="34" fontFamily="Arial, sans-serif" fontWeight="600" fontSize="8.5" fill="#555555" letterSpacing="0.8">
      INDUSTRIES LIMITED
    </text>
  </svg>
);

// 10. Grant Thornton
const GrantThorntonLogo = ({ className = "h-8 w-auto" }) => (
  <svg viewBox="0 0 180 45" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Grant Thornton logo">
    {/* Purple Möbius Swirl */}
    <g transform="translate(6, 8) scale(0.6)">
      <circle cx="22" cy="22" r="18" fill="url(#gtGrad)" />
      <circle cx="22" cy="22" r="7" fill="#FFFFFF" />
    </g>
    <defs>
      <linearGradient id="gtGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4F2D7F" />
        <stop offset="50%" stopColor="#782F8F" />
        <stop offset="100%" stopColor="#9B4B9C" />
      </linearGradient>
    </defs>
    {/* Modern sans-serif text */}
    <text x="42" y="21" fontFamily="Arial, Helvetica, sans-serif" fontWeight="800" fontSize="13.5" fill="#1F2937">
      Grant
    </text>
    <text x="42" y="34" fontFamily="Arial, Helvetica, sans-serif" fontWeight="800" fontSize="13.5" fill="#1F2937">
      Thornton
    </text>
  </svg>
);

// List of all 10 companies as requested by client specification
const GLOBAL_LEADER_COMPANIES = [
  { id: 'pwc', name: 'PwC', component: PwcLogo },
  { id: 'ey', name: 'Ernst & Young (EY)', component: EyLogo },
  { id: 'deloitte', name: 'Deloitte', component: DeloitteLogo },
  { id: 'kpmg', name: 'KPMG', component: KpmgLogo },
  { id: 'wells-fargo', name: 'Wells Fargo', component: WellsFargoLogo },
  { id: 'standard-chartered', name: 'Standard Chartered', component: StandardCharteredLogo },
  { id: 'citibank', name: 'Citibank', component: CitibankLogo },
  { id: 'ford', name: 'Ford Motor', component: FordLogo },
  { id: 'reliance', name: 'Reliance Industries', component: RelianceLogo },
  { id: 'grant-thornton', name: 'Grant Thornton', component: GrantThorntonLogo },
];

export default function AlumniLogosSection() {
  return (
    <div className="mt-14 sm:mt-16 pt-10 border-t border-gray-100 font-poppins">
      {/* Section Header exactly matching specification */}
      <div className="text-center max-w-3xl mx-auto mb-8 px-4">
        <span className="inline-block px-3 py-1 rounded-full bg-blue-50 border border-blue-100/80 text-brand-blue text-[11px] sm:text-xs font-bold uppercase tracking-wider mb-2.5">
          Enterprise Trust & Global Placement
        </span>
        <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 leading-snug">
          Our Learners & Alumni Drive Governance Across Global Leaders:
        </h3>
      </div>

      {/* 10 Company Logos Responsive Grid (5 cols desktop, 3/4 cols tablet, 2 cols mobile) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-4 max-w-5xl mx-auto px-2 sm:px-4">
        {GLOBAL_LEADER_COMPANIES.map((company) => {
          const LogoComponent = company.component;
          return (
            <div
              key={company.id}
              className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-gray-200/80 shadow-2xs hover:shadow-md hover:border-brand-blue/40 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center min-h-[64px] sm:min-h-[72px] group"
              title={company.name}
            >
              <div className="w-full flex items-center justify-center grayscale group-hover:grayscale-0 opacity-85 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-105">
                <LogoComponent className="max-h-7 sm:max-h-8 w-auto max-w-[130px] sm:max-w-[145px] object-contain" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
