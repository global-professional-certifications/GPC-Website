import React, { useState } from 'react';
import {
  writtenStoriesTabs,
  writtenStoriesFeatured,
  writtenStoriesGrid,
} from './constant';

// ── Avatar pill (initials in coloured circle)
const Avatar = ({ initials, bg, size = 'md' }) => {
  const dim = size === 'lg' ? 'w-16 h-16 text-xl' : 'w-12 h-12 text-base';
  return (
    <div
      className={`${dim} rounded-full flex items-center justify-center border-2 border-white/30 flex-shrink-0 font-bold text-white`}
      style={{ background: bg }}
    >
      {initials}
    </div>
  );
};

// ── Featured (wide) card
const FeaturedCard = ({ story }) => (
  <div className="flex rounded-2xl overflow-hidden shadow-sm border border-gray-100 mb-4">
    {/* Left panel */}
    <div
      className="relative w-[200px] flex-shrink-0 flex flex-col justify-between p-5"
      style={{ background: story.avatarBg }}
    >
      <span className="text-white/10 text-[80px] font-black absolute bottom-2 left-2 select-none pointer-events-none leading-none">
        {story.initials}
      </span>
      <div className="relative z-10">
        <span
          className="text-[9px] font-bold uppercase tracking-widest text-white/60 bg-white/10 px-2 py-0.5 rounded-full"
        >
          FEATURED
        </span>
      </div>
      <div className="relative z-10 mt-auto">
        <Avatar initials={story.initials} bg="rgba(255,255,255,0.15)" size="md" />
        <p className="text-white font-bold text-[15px] mt-2 leading-tight font-poppins">{story.name}</p>
        <p className="text-white/60 text-[11px] mt-0.5 font-poppins">{story.location}</p>
      </div>
    </div>

    {/* Right panel */}
    <div className="flex-1 bg-white p-6 flex flex-col justify-center">
      <p className="text-[11px] font-bold text-[#2D1B69] uppercase tracking-wide mb-3">
        {story.tag}
      </p>
      <p className="text-gray-800 text-[15px] md:text-[16px] leading-relaxed mb-4 font-medium font-poppins">
        {story.quote}
      </p>
      <a
        href={story.link}
        className="text-[#2D1B69] text-[13px] font-semibold flex items-center gap-1 hover:opacity-70 transition-opacity"
      >
        Read full journey →
      </a>
    </div>
  </div>
);

// ── Small grid card
const GridCard = ({ story }) => (
  <div className="flex rounded-2xl overflow-hidden shadow-sm border border-gray-100">
    {/* Left panel */}
    <div
      className="relative w-[155px] flex-shrink-0 flex flex-col justify-between p-4"
      style={{ background: story.avatarBg, minHeight: '140px' }}
    >
      <span className="text-white/10 text-[56px] font-black absolute bottom-1 left-1 select-none pointer-events-none leading-none">
        {story.initials}
      </span>
      <div className="relative z-10 mt-auto">
        <Avatar initials={story.initials} bg="rgba(255,255,255,0.15)" size="sm" />
        <p className="text-white font-bold text-[13px] mt-2 leading-tight font-poppins">{story.name}</p>
        <p className="text-white/60 text-[10px] mt-0.5 font-poppins">{story.location}</p>
      </div>
    </div>

    {/* Right panel */}
    <div className="flex-1 bg-white p-4 flex flex-col justify-between">
      <div>
        <p className="text-[10px] font-bold text-[#2D1B69] uppercase tracking-wide mb-2">
          {story.tag}
        </p>
        <p className="text-gray-600 text-[12px] leading-relaxed font-poppins">{story.excerpt}</p>
      </div>
      <a
        href={story.link}
        className="text-[#2D1B69] text-[12px] font-semibold flex items-center gap-1 mt-3 hover:opacity-70 transition-opacity"
      >
        Read link →
      </a>
    </div>
  </div>
);

// ── "View all" placeholder card
const ViewAllCard = ({ total = 48 }) => (
  <a
    href="#"
    className="flex items-center justify-center rounded-2xl border-2 border-dashed p-6 text-center transition-colors duration-200 hover:bg-slate-50 cursor-pointer hover:border-[#2D1B69] group"
    style={{ borderColor: '#D1D5DB', minHeight: '140px' }}
  >
    <div>
      <p className="text-[22px] mb-1 group-hover:scale-110 transition-transform">📖</p>
      <p className="text-gray-700 group-hover:text-[#2D1B69] font-semibold text-[14px] transition-colors">View all {total} stories</p>
      <p className="text-gray-400 text-[11px] mt-1">Filter by course, country &amp; more.</p>
    </div>
  </a>
);

// ── Main WrittenStories component
// Props (all optional — fall back to dummy data from constant.js):
//   tabs      → array of { slug, label }            (from Sanity later)
//   featured  → featured story object               (from Sanity later)
//   grid      → array of grid story objects         (from Sanity later)
//   totalCount→ number shown in "View all" card     (from Sanity later)
const WrittenStories = ({
  tabs: propTabs,
  featured: propFeatured,
  grid: propGrid,
  totalCount = 48,
} = {}) => {
  const tabs     = propTabs    || writtenStoriesTabs;
  const featured = propFeatured || writtenStoriesFeatured;
  const grid     = propGrid    || writtenStoriesGrid;

  const [activeTab, setActiveTab] = useState('all');

  // Simple client-side filter by slug (noop for 'all')
  const filteredGrid = activeTab === 'all'
    ? grid
    : grid.filter(s => s.tag?.toLowerCase().includes(activeTab));

  return (
    <section className="w-full py-16 md:py-20 px-4 md:px-8 bg-gray-50">
      <div className="max-w-[1200px] mx-auto">

        {/* ── Header row ── */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div>
            {/* Label */}
            <div className="flex items-center gap-3 mb-3">
              <div className="h-[1.5px] w-8 bg-[#C9A227]" />
            </div>
            {/* Heading */}
            <h2 className="text-gray-900 text-3xl md:text-4xl font-semibold leading-tight">
              Read their{' '}
              <span
                className="font-normal italic"
                style={{ color: '#C9A227' }}
              >
                journey
              </span>
            </h2>
            {/* Subtitle */}
            <p className="text-gray-500 text-sm mt-2 max-w-md leading-relaxed font-poppins">
              Deep-dive into the paths our alumni walked — the doubt, the grind,<br className="hidden md:block" />
              and the moment everything changed.
            </p>
          </div>

          {/* View all link */}
          <a
            href="#"
            className="text-[#2D1B69] text-sm font-semibold flex items-center gap-2 hover:opacity-70 transition-opacity whitespace-nowrap"
          >
            View all {totalCount} stories →
          </a>
        </div>

        {/* ── Filter tabs ── */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tabs.map(tab => (
            <button
              key={tab.slug}
              onClick={() => setActiveTab(tab.slug)}
              className="px-5 py-1.5 rounded-full text-[13px] font-semibold border transition-all duration-200"
              style={
                activeTab === tab.slug
                  ? { backgroundColor: '#2D1B69', color: '#fff', borderColor: '#2D1B69' }
                  : { backgroundColor: '#fff', color: '#374151', borderColor: '#D1D5DB' }
              }
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── Featured card ── */}
        <FeaturedCard story={featured} />

        {/* ── Grid: 2 columns ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredGrid.map((story, i) => (
            <GridCard key={i} story={story} />
          ))}
          {/* "View all" placeholder in the last cell if grid is odd */}
          {filteredGrid.length % 2 !== 0 ? null : (
            /* Always show "view all" card at the end */
            null
          )}
          <ViewAllCard total={totalCount} />
        </div>

      </div>
    </section>
  );
};

export default WrittenStories;
