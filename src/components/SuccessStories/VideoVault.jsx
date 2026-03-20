import React, { useState } from 'react';
import { videoVaultTabs, videoVaultData } from './constant';

// ── Gradients perfectly matching the screenshot for small video cards
const cardVideoGradients = [
  'linear-gradient(160deg, #10162A 0%, #15223D 100%)', // Blueish
  'linear-gradient(160deg, #1A1333 0%, #110B23 100%)', // Purplish
  'linear-gradient(160deg, #181131 0%, #17112E 100%)', // Dark Purplish
  'linear-gradient(160deg, #181938 0%, #181335 100%)', // Deep Blue-Purple
];
// ── Small grid video card
const GridCard = ({ video, index }) => (
  <div
    className="relative rounded-[16px] overflow-hidden flex flex-col h-full border border-white/[0.04] transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#C9A227]/10 hover:-translate-y-1 hover:border-white/[0.1] bg-[#1A182E]"
    style={{ aspectRatio: '10/16' }}
  >
    {/* Video Area */}
    <div
      className="flex-1 relative overflow-hidden flex items-center justify-center"
      style={{ background: cardVideoGradients[(index || 0) % cardVideoGradients.length] }}
    >
      {/* Watermark initials */}
      <span
        className="absolute inset-0 flex items-center justify-center select-none pointer-events-none"
        style={{
          fontSize: 'clamp(60px, 9vw, 110px)',
          fontWeight: 600,
          color: 'rgba(255,255,255,0.035)',
          letterSpacing: '-2px',
          fontFamily: "'Playfair Display', serif",
          transform: 'translateY(15%)', // sits slightly lower in the video box
        }}
      >
        {video.initials}
      </span>

      {/* Duration badge */}
      <span
        className="absolute top-4 left-4 text-white text-[9px] font-bold px-2 py-1 rounded-sm tracking-widest bg-white/[0.08]"
      >
        {video.duration}
      </span>

      {/* Play button */}
      <button
        className="relative w-12 h-12 rounded-full flex items-center justify-center transition-transform hover:scale-110 z-10"
        style={{ backgroundColor: 'transparent', border: '1px solid rgba(255,255,255,0.15)' }}
      >
        <span className="text-white text-[12px] ml-0.5">▶</span>
      </button>
    </div>

    {/* Name + role footer */}
    <div className="px-5 py-4 bg-[#211E36] border-t border-white/[0.04] shrink-0 min-h-[70px] flex flex-col justify-center">
      <h4 className="text-white text-[14px] font-extrabold leading-tight mb-1">{video.name}</h4>
      <p className="text-white/40 text-[10px] sm:text-[11px] font-medium leading-tight">{video.role}</p>
    </div>
  </div>
);

// ── Hero card (large left card)
const HeroCard = ({ hero }) => (
  <div
    className="relative rounded-[20px] overflow-hidden flex flex-col row-span-2 h-full bg-[#1A182E] border border-white/[0.04] transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl hover:shadow-[#D1A639]/10 hover:border-white/[0.1]"
  >
    {/* Video Area */}
    <div className="flex-1 relative overflow-hidden flex items-center justify-center bg-gradient-to-br from-[#1C1635] to-[#120D23]">
      {/* Watermark initials */}
      <span
        className="absolute inset-0 flex items-center justify-center select-none pointer-events-none"
        style={{
          fontSize: 'clamp(120px, 15vw, 220px)',
          fontWeight: 600,
          color: 'rgba(255,255,255,0.03)',
          letterSpacing: '-6px',
          fontFamily: "'Playfair Display', serif",
          transform: 'translateY(15%)'
        }}
      >
        {hero.initials}
      </span>

      {/* Tags */}
      <div className="absolute top-5 left-5 flex gap-2">
        <span
          className="text-black text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-widest"
          style={{ backgroundColor: '#D1A639' }}
        >
          {hero.tag}
        </span>
        <span
          className="text-white text-[10px] font-bold px-3 py-1 rounded-full bg-white/[0.08] tracking-widest"
        >
          {hero.duration}
        </span>
      </div>

      {/* Play button */}
      <button
        className="relative w-16 h-16 rounded-full flex items-center justify-center transition-transform hover:scale-110 z-10"
        style={{ backgroundColor: 'transparent', border: '1px solid rgba(255,255,255,0.15)' }}
      >
        <span className="text-white text-lg ml-1" style={{ filter: 'drop-shadow(0px 0px 4px rgba(0,0,0,0.5))' }}>▶</span>
      </button>
    </div>

    {/* Bottom info */}
    <div className="p-6 md:p-8 shrink-0 bg-[#211E36] border-t border-white/[0.04] min-h-[160px] flex flex-col justify-center">
      <h3 className="text-white text-[20px] md:text-[24px] font-extrabold leading-tight tracking-tight mb-2">{hero.name}</h3>
      <p className="text-[#D1A639] text-[11px] font-extrabold uppercase tracking-[0.15em] mb-4">{hero.role}</p>
      <p className="text-white/60 text-[13px] md:text-[14px] leading-relaxed">"{hero.quote}"</p>
    </div>
  </div>
);

// ── Main VideoVault component
// Props (all optional — fall back to dummy data from constant.js):
//   tabs      → array of { slug, label, count }   (from Sanity later)
//   vaultData → object keyed by slug: { hero, grid } (from Sanity later)
const VideoVault = ({ tabs: propTabs, vaultData: propVaultData } = {}) => {
  const tabs = propTabs || videoVaultTabs;
  const allData = propVaultData || videoVaultData;

  const [activeTab, setActiveTab] = useState(tabs[0]?.slug || 'cia');
  const data = allData[activeTab] || Object.values(allData)[0];

  return (
    <section
      className="w-full py-16 md:py-20 px-4 md:px-8"
      style={{ backgroundColor: '#0E0B1F', fontFamily: "'Outfit', sans-serif" }}
    >
      <div className="max-w-[1240px] mx-auto">

        {/* ── Header row ── */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
          <div>
            {/* Label */}
            <div className="flex items-center gap-3 mb-2">
              <div className="h-[1px] w-8 bg-[#D1A639]" />
              <span className="text-[#D1A639] text-[10px] font-extrabold uppercase tracking-[0.2em]">
                VIDEO STORIES
              </span>
            </div>
            {/* Heading */}
            <h2
              className="text-white text-3xl md:text-[44px] font-extrabold leading-tight mb-3"
              style={{ fontFamily: "'Outfit', sans-serif", letterSpacing: '-1px' }}
            >
              The Video{' '}
              <span
                className="italic font-bold"
                style={{ color: '#D1A639', fontFamily: "'Playfair Display', serif", letterSpacing: '0px' }}
              >
                Vault
              </span>
            </h2>
            {/* Subtitle */}
            <p className="text-white/40 text-[14px] md:text-[15px] max-w-lg leading-relaxed">
              Raw, unfiltered experiences from professionals who transformed their careers. See how they mastered their certifications with GPC.
            </p>
          </div>

          {/* View all link */}
          <a
            href="#"
            className="text-[#D1A639] text-[14px] font-bold flex items-center gap-2 mt-2 md:mt-10 hover:opacity-80 transition-opacity whitespace-nowrap"
          >
            View all 70 videos <span>→</span>
          </a>
        </div>

        {/* ── Course tabs ── */}
        <div className="relative border-b border-white/5 mb-8">
          <div className="flex gap-8">
            {tabs.map(tab => (
              <button
                key={tab.slug}
                onClick={() => setActiveTab(tab.slug)}
                className="pb-4 text-[13px] transition-colors relative"
                style={{
                  color: activeTab === tab.slug ? '#ffffff' : 'rgba(255,255,255,0.4)',
                }}
              >
                <span className="font-extrabold">{tab.label}</span>
                <span className="ml-2 font-medium">· {tab.count} videos</span>
                {activeTab === tab.slug && (
                  <span
                    className="absolute -bottom-[1px] left-0 right-0 h-[2px]"
                    style={{ backgroundColor: '#D1A639' }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* ── Video grid ── */}
        <div
          className="grid gap-[18px]"
          style={{
            gridTemplateColumns: 'minmax(280px, 1.4fr) repeat(4, 1fr)',
            gridTemplateRows: '1fr 1fr',
          }}
        >
          {/* Hero card spans first column, 2 rows */}
          <div style={{ gridColumn: '1', gridRow: '1 / 3' }}>
            <HeroCard hero={data.hero} />
          </div>

          {/* First row of 4 small cards */}
          {data.grid.slice(0, 4).map((video, i) => (
            <div key={`r1-${i}`} style={{ gridColumn: `${i + 2}`, gridRow: '1', display: 'flex' }}>
              <div className="flex-1 w-full">
                <GridCard video={video} index={i} />
              </div>
            </div>
          ))}

          {/* Second row of 4 small cards */}
          {data.grid.slice(4, 8).map((video, i) => (
            <div key={`r2-${i}`} style={{ gridColumn: `${i + 2}`, gridRow: '2', display: 'flex' }}>
              <div className="flex-1 w-full">
                <GridCard video={video} index={i + 4} />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default VideoVault;
