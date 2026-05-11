import React, { useState, useMemo, useEffect } from 'react';
import { m, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import {
  videoVaultTabs,
  videoVaultData,
  writtenStoriesTabs,
  writtenStoriesFeatured,
  writtenStoriesGrid,
  voicesOfExcellenceData
} from './constant';

// =============================================================================
// SHARED INTERNAL COMPONENTS
// =============================================================================

const SectionHeader = ({ title, highlight, subtitle, centered = false }) => (
  <div className={`mb-8 ${centered ? 'text-center mx-auto' : 'text-left'} max-w-3xl`}>
    <h2 className="text-gray-900 text-2xl md:text-4xl font-bold leading-tight mb-4">
      {title} <span className="text-brand-blue font-normal italic relative">{highlight}</span>
    </h2>
    {subtitle && (
      <p className="text-gray-600 text-xs md:text-base lg:text-base leading-relaxed font-poppins mt-4 md:mt-6">
        {subtitle}
      </p>
    )}
  </div>
);

const Avatar = ({ initials, bg, size = 'md' }) => {
  const dim = size === 'lg' ? 'w-16 h-16 text-xl' : 'w-12 h-12 text-sm';
  return (
    <div
      className={`${dim} rounded-full flex items-center justify-center border-2 border-white flex-shrink-0 font-bold text-white shadow-sm`}
      style={{ background: bg }}
    >
      {initials}
    </div>
  );
};

// =============================================================================
// VIDEO VAULT COMPONENTS
// =============================================================================

const cardVideoGradients = [
  'linear-gradient(160deg, #10162A 0%, #15223D 100%)',
  'linear-gradient(160deg, #1A1333 0%, #110B23 100%)',
  'linear-gradient(160deg, #181131 0%, #17112E 100%)',
  'linear-gradient(160deg, #181938 0%, #181335 100%)',
];

export const VideoGridCard = ({ video, index, onClick }) => {
  if (!video) return null;
  return (
  <div
    onClick={() => onClick?.(video)}
    className="relative rounded-[20px] overflow-hidden border border-black/5 transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl cursor-pointer group h-full"
    style={{ aspectRatio: '9/16' }}
  >
    <div
      className="absolute inset-0 overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage: video.thumbnailUrl ? `url(${video.thumbnailUrl})` : cardVideoGradients[(index || 0) % cardVideoGradients.length],
        backgroundColor: '#111827'
      }}
    >
      {!video.thumbnailUrl && (
        <span className="absolute inset-0 flex items-center justify-center select-none pointer-events-none text-white/5 text-6xl font-black">
          {video.initials}
        </span>
      )}

      {/* Play Button - Bottom Right */}
      <div className="absolute bottom-4 right-4 z-20 transition-transform duration-300 group-hover:scale-110">
        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-brand-blue/90 border border-white/30 shadow-lg backdrop-blur-sm">
          <span className="text-white text-[12px] ml-0.5">▶</span>
        </div>
      </div>

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
    </div>
  </div>
)};

const VideoHeroCard = ({ hero, onClick }) => {
  if (!hero) return null;
  return (
  <div
    onClick={() => onClick?.(hero)}
    className="relative rounded-[28px] overflow-hidden border border-black/5 transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl cursor-pointer group h-full"
    style={{ aspectRatio: '9/16' }}
  >
    <div
      className="absolute inset-0 overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage: hero.thumbnailUrl ? `url(${hero.thumbnailUrl})` : 'none',
        backgroundGradient: 'linear-gradient(155deg, #1C1635 0%, #120D23 100%)',
        backgroundColor: '#120D23'
      }}
    >
      {!hero.thumbnailUrl && (
        <span className="absolute inset-0 flex items-center justify-center select-none pointer-events-none text-white/5 text-[160px] font-black">
          {hero.initials}
        </span>
      )}

      {/* Play Button - Bottom Right */}
      <div className="absolute bottom-8 right-8 z-20 transition-transform duration-300 group-hover:scale-110">
        <div className="w-16 h-16 rounded-full flex items-center justify-center bg-brand-blue/90 border-2 border-white/30 shadow-2xl backdrop-blur-sm">
          <span className="text-white text-2xl ml-1">▶</span>
        </div>
      </div>

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
    </div>
  </div>
)};

export const VideoModal = ({ video, onClose }) => {
  if (!video) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/30 backdrop-blur-lg transition-all p-4 md:p-6 select-none animate-in fade-in duration-300">
      {/* Close Button Desktop */}
      <button
        onClick={onClose}
        className="absolute top-8 right-8 text-white/40 hover:text-white hover:rotate-90 hover:scale-110 transition-all duration-300 p-2 z-50 bg-white/5 rounded-full backdrop-blur-md border border-white/10 hidden md:block"
        title="Close (Esc)"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
      </button>

      {/* Close Button Mobile */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white p-2 z-50 bg-black/40 rounded-full md:hidden"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
      </button>

      {/* Vertical Video Container */}
      <div className="relative h-full max-h-[85vh] md:max-h-[90vh] aspect-[9/16] rounded-2xl md:rounded-[32px] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)] border border-white/10 bg-black group">
        {video.videoUrl ? (
          <video
            controls
            autoPlay
            className="w-full h-full object-cover"
          >
            <source src={video.videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-white/20 bg-[#120D23] p-12 text-center">
            <div className="w-16 h-16 rounded-full border-2 border-dashed border-white/10 mb-6 flex items-center justify-center animate-pulse">
              <span className="text-2xl">▶</span>
            </div>
            <p className="text-lg font-bold mb-2 text-white/60">Testimonial Video</p>
            <p className="text-sm italic opacity-50">Streamed from {video.videoUrl || 'Sanity CMS (Mockup)'}</p>
          </div>
        )}

      </div>

      {/* Background Click to Close */}
      <div className="absolute inset-0 -z-10" onClick={onClose} />
    </div>
  );
};

const getInitials = (name) => {
  if (!name) return '??';
  const parts = name.split(' ');
  if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  return name.substring(0, 2).toUpperCase();
};

export const VideoVault = ({ allStories, courses, settings }) => {
  const totalVideoCount = useMemo(() => allStories?.filter(s => s.category === 'video').length || 0, [allStories]);

  // Use courses from Sanity if provided, otherwise fallback to constants
  const tabs = useMemo(() => {
    if (!courses || courses.length === 0) return videoVaultTabs.filter(t => (videoVaultData[t.slug]?.grid?.length || 0) > 0);

    const courseTabs = (courses || [])
      .filter(c => c.category === 'video' || (!c.category && (!c.sections || c.sections.includes('video'))))
      .map(c => ({
        label: c.name,
        slug: c?.slug || '',
        count: allStories?.filter(s => {
          const storySlug = (s.courseSlug || '').toLowerCase().trim();
          const targetSlug = (c?.slug || '').toLowerCase().trim();
          return storySlug === targetSlug && s.category === 'video';
        }).length || 0
      }))
      .filter(tab => tab.slug && tab.count > 0); // Hide empty or missing tabs

    if (totalVideoCount === 0) return [];
    return [{ label: 'ALL', slug: 'all', count: totalVideoCount }, ...courseTabs];
  }, [courses, allStories, totalVideoCount]);

  const [activeTab, setActiveTab] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);

  // Sync activeTab with dynamic tabs safely
  useEffect(() => {
    if (tabs && tabs.length > 0) {
      if (!activeTab || !tabs.find(t => t.slug === activeTab)) {
        setActiveTab(tabs[0].slug);
      }
    }
  }, [tabs, activeTab]);

  // Derived current data from Sanity
  const currentVideos = useMemo(() => {
    if (!allStories || !activeTab) return [];

    // Normalize and filter
    const activeSlug = (activeTab || '').toLowerCase().trim();
    const filtered = allStories
      .filter(s => {
        if (s.category !== 'video') return false;
        if (activeSlug === 'all') return true;
        const storySlug = (s.courseSlug || '').toLowerCase().trim();
        return storySlug === activeSlug;
      })
      .map(s => ({
        ...s,
        initials: getInitials(s.name),
      }));

    // Debugging logs to help identify Sanity data mismatches
    console.log(`[VideoVault] Tab: ${activeTab} | Found: ${filtered.length} videos`);
    if (activeTab === 'cisa' || filtered.length === 0) {
      console.log(`[VideoVault] Available courseSlugs in stories:`, [...new Set(allStories.map(s => s.courseSlug))]);
    }

    return filtered;
  }, [allStories, activeTab]);

  // If no real data, fallback to dummy data from constants
  const displayHero = currentVideos.length > 0
    ? currentVideos[0]
    : (videoVaultData[activeTab]?.hero || Object.values(videoVaultData)[0]?.hero);

  const currentGridAll = useMemo(() => {
    if (currentVideos.length > 1) return currentVideos.slice(1);
    return (currentVideos.length === 1 ? [] : (videoVaultData[activeTab]?.grid || Object.values(videoVaultData)[0]?.grid || []));
  }, [currentVideos, activeTab]);

  const first8Grid = useMemo(() => currentGridAll.slice(0, 8), [currentGridAll]);

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
  };

  return (
    <section id="video-vault" className="w-full py-16 md:py-24 px-4 md:px-8 bg-white overflow-hidden">
      <div className="max-w-[1280px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-4 relative">
          <SectionHeader
            title={settings?.videoVaultTitle || "The Video"}
            highlight={settings?.videoVaultHighlight || "Vault"}
            subtitle={settings?.videoVaultSubtitle || (
              <>
                Raw, unfiltered experiences from professionals who transformed their careers.
                <br />
                See how they mastered their certifications with GPC.
              </>
            )}
          />
          <div className="md:mb-8 mb-4">
            <Link
              to="/video-gallery"
              className="text-brand-blue font-semibold text-[14px] md:text-[15px] flex items-center gap-2 hover:text-blue-500 transition-all w-fit group border-[0.5px] border-brand-blue/30 rounded-full px-5 py-2.5 shadow-[0_2px_8px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_12px_rgba(37,99,235,0.12)] hover:border-brand-blue/50 hover:-translate-y-[1px]"
            >
              View all {totalVideoCount} videos <span className="group-hover:translate-x-1 transition-transform text-lg leading-none">→</span>
            </Link>
          </div>
        </div>
        <div className="relative border-b border-gray-100 mb-10">
          <div className="flex gap-8 overflow-x-auto pb-1 no-scrollbar">
            {tabs.map(tab => (
              <button key={tab.slug} onClick={() => setActiveTab(tab.slug)} className="pb-4 text-[13px] transition-colors relative whitespace-nowrap uppercase tracking-widest font-bold" style={{ color: activeTab === tab.slug ? '#111827' : '#6B7280' }}>
                {tab.label}
                <span className="ml-2 font-medium opacity-60">· {tab.count}</span>
                {activeTab === tab.slug && <span className="absolute -bottom-[1px] left-0 right-0 h-[3px] bg-brand-blue" />}
              </button>
            ))}
          </div>
        </div>

        {/* Initial Grid: 1 Hero (2x2) + Up to 8 Small (1x1) */}
        <div className="grid gap-[24px] grid-cols-2 lg:grid-cols-6 items-start">
          {/* Featured Hero Card */}
          <div className="hidden lg:block lg:col-span-2 lg:row-span-2 h-full">
            <VideoHeroCard hero={displayHero} onClick={handleVideoClick} />
          </div>

          {/* First 8 Grid Cards */}
          {first8Grid.map((video, i) => (
            <div key={i} className="hidden lg:block lg:col-span-1 h-full">
              <VideoGridCard video={video} index={i} onClick={handleVideoClick} />
            </div>
          ))}

          {/* Mobile Horizontal Scroll Row */}
          <div className="lg:hidden col-span-2">
            <div className="flex gap-3 overflow-x-auto no-scrollbar snap-x snap-mandatory px-4 pb-2">
              {[displayHero, ...currentGridAll].filter(Boolean).slice(0, 8).map((video, i) => (
                <div key={video?._id || `m-${i}`} className="flex-none w-[44vw] snap-start">
                  <VideoGridCard video={video} index={i} onClick={handleVideoClick} />
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
      <VideoModal video={selectedVideo} onClose={() => setSelectedVideo(null)} />
    </section>
  );
};

// =============================================================================
// WRITTEN STORIES COMPONENTS
// =============================================================================

const WrittenFeaturedCard = ({ story }) => {
  if (!story) return null;
  return (
  <div className="flex flex-col md:flex-row bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 mb-8 transition-all hover:shadow-md">
    <div className="relative w-full md:w-[300px] flex-shrink-0 flex flex-col justify-center items-center p-8 text-center" style={{ background: story.avatarBg }}>
      <div className="absolute top-4 right-4">
        <span className="text-[10px] font-bold uppercase tracking-widest text-white/80 bg-white/10 px-3 py-1 rounded-full border border-white/20 backdrop-blur-sm">FEATURED STORY</span>
      </div>
      <Avatar initials={story.initials} bg="rgba(255,255,255,0.2)" size="lg" />
      <h3 className="text-white font-bold text-xl mt-4 leading-tight">{story.name}</h3>
      <p className="text-white/70 text-sm mt-1 font-poppins">{story.location}</p>
      <div className="mt-4 px-4 py-1.5 bg-white/10 rounded-lg border border-white/10">
        <p className="text-white/90 text-[11px] font-bold uppercase tracking-wider">{story.tag}</p>
      </div>
    </div>
    <div className="flex-1 p-8 flex flex-col justify-center">
      <div className="relative">
        <span className="absolute -top-6 -left-4 text-6xl text-brand-blue/10 font-serif select-none">"</span>
        <p className="text-gray-700 text-lg md:text-xl leading-relaxed italic mb-6 font-medium font-poppins relative z-10">{story.quote}</p>
      </div>
      <div className="mt-auto pt-6 border-t border-gray-50">
        <a href={story.link} className="text-brand-blue font-bold flex items-center gap-2 hover:translate-x-1 transition-transform group">
          Read the full journey <span className="group-hover:translate-x-1 transition-transform">→</span>
        </a>
      </div>
    </div>
  </div>
)};

export const WrittenGridCard = ({ story }) => {
  if (!story) return null;
  return (
  <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col transition-all hover:shadow-md group">
    <div className="p-6 flex flex-col h-full">
      <div className="flex items-center gap-4 mb-6">
        <Avatar initials={story.initials} bg={story.avatarBg} size="md" />
        <div>
          <h4 className="text-gray-900 font-bold text-base leading-tight">{story.name}</h4>
          <p className="text-gray-500 text-xs font-poppins">{story.location}</p>
        </div>
      </div>
      <div className="mb-6 flex-grow">
        <p className="text-[10px] font-bold text-brand-blue uppercase tracking-widest mb-2">{story.tag}</p>
        <p className="text-gray-600 text-sm leading-relaxed font-poppins line-clamp-3">{story.excerpt}</p>
      </div>
      <a href={story.link} className="text-brand-blue text-sm font-bold flex items-center gap-2 mt-auto border-t border-gray-50 pt-4 hover:opacity-80 transition-opacity">
        Read journey <span>→</span>
      </a>
    </div>
  </div>
)};

export const WrittenStories = ({ allStories, courses, settings }) => {
  const totalWrittenCount = useMemo(() => allStories?.filter(s => s.category === 'written').length || 0, [allStories]);

  // Build tabs from courses that have written testimonials
  const tabs = useMemo(() => {
    const writtenStories = allStories?.filter(s => s.category === 'written') || [];
    const totalCount = writtenStories.length;

    if (!courses || courses.length === 0) return writtenStoriesTabs.filter(t => (writtenStoriesGrid.length > 0));

    const courseTabs = (courses || [])
      .filter(c => c.category === 'written' || (!c.category && (!c.sections || c.sections.includes('written'))))
      .map(c => ({
        label: c.name,
        name: c.name,
        slug: c?.slug || '',
        count: writtenStories.filter(s => {
          const storySlug = (s.courseSlug || '').toLowerCase().trim();
          const targetSlug = (c?.slug || '').toLowerCase().trim();
          return storySlug === targetSlug;
        }).length || 0
      }))
      .filter(tab => tab.slug && tab.count > 0); // Hide empty tabs

    if (totalCount === 0) return [];
    return [{ label: 'ALL', name: 'ALL', slug: 'all', count: totalCount }, ...courseTabs];
  }, [courses, allStories]);

  const [activeTab, setActiveTab] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);

  // Sync activeTab with dynamic tabs safely
  useEffect(() => {
    if (tabs && tabs.length > 0) {
      if (!activeTab || !tabs.find(t => t.slug === activeTab)) {
        setActiveTab(tabs[0].slug);
      }
    }
  }, [tabs, activeTab]);

  // Derived current written stories from Sanity
  const currentStories = useMemo(() => {
    if (!allStories || !activeTab) return [];
    const activeSlug = (activeTab || '').toLowerCase().trim();
    return allStories
      .filter(s => {
        const storySlug = (s.courseSlug || '').toLowerCase().trim();
        return (activeSlug === 'all' || storySlug === activeSlug) && s.category === 'written';
      })
      .map(s => ({
        ...s,
        initials: getInitials(s.name),
      }));
  }, [allStories, activeTab]);

  // Handle fallback to dummy data if no Sanity data
  const isSanityData = currentStories.length > 0;
  const displayHero = isSanityData ? currentStories[0] : writtenStoriesFeatured;
  const displayGridAll = isSanityData ? currentStories.slice(1) : writtenStoriesGrid;

  const first8Grid = useMemo(() => displayGridAll.slice(0, 8), [displayGridAll]);

  const handleCardClick = (story) => {
    // Both VideoVault and WrittenStories can open videos if available
    setSelectedVideo(story);
  };

  return (
    <section id="written-stories" className="w-full py-16 md:py-24 px-4 md:px-8 bg-gray-50 overflow-hidden">
      <div className="max-w-[1280px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-4">
          <SectionHeader
            title={settings?.writtenStoriesTitle || "Read their"}
            highlight={settings?.writtenStoriesHighlight || "journey"}
            subtitle={settings?.writtenStoriesSubtitle || (
              <>
                Raw, unfiltered experiences from professionals who transformed their careers.
                <br />
                See how they mastered their certifications with GPC.
              </>
            )}
          />
          <div className="md:mb-8 mb-4">
            <Link
              to="/written-gallery"
              className="text-brand-blue font-semibold text-[14px] md:text-[15px] flex items-center gap-2 hover:text-blue-500 transition-all w-fit group border-[0.5px] border-brand-blue/30 rounded-full px-5 py-2.5 shadow-[0_2px_8px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_12px_rgba(37,99,235,0.12)] hover:border-brand-blue/50 hover:-translate-y-[1px]"
            >
              View all {totalWrittenCount} stories <span className="group-hover:translate-x-1 transition-transform text-lg leading-none">→</span>
            </Link>
          </div>
        </div>

        {/* Course Tabs */}
        <div className="relative border-b border-gray-100 mb-10">
          <div className="flex gap-8 overflow-x-auto pb-1 no-scrollbar">
            {tabs.map(tab => (
              <button
                key={tab.slug}
                onClick={() => setActiveTab(tab.slug)}
                className="pb-4 text-[13px] transition-colors relative whitespace-nowrap uppercase tracking-widest font-bold"
                style={{ color: activeTab === tab.slug ? '#111827' : '#6B7280' }}
              >
                {tab.name || tab.label}
                <span className="ml-2 font-medium opacity-60">· {tab.count}</span>
                {activeTab === tab.slug && <span className="absolute -bottom-[1px] left-0 right-0 h-[3px] bg-brand-blue" />}
              </button>
            ))}
          </div>
        </div>

        {/* Hero + Grid Layout (Duplicate of VideoVault) */}
        <div className="grid gap-[24px] grid-cols-2 lg:grid-cols-6 items-start">
          {/* Featured Hero Card */}
          <div className="hidden lg:block lg:col-span-2 lg:row-span-2 h-full">
            <VideoHeroCard hero={displayHero} onClick={handleCardClick} />
          </div>

          {/* First 8 Grid Cards */}
          {first8Grid.map((story, i) => (
            <div key={story._id || i} className="hidden lg:block lg:col-span-1 h-full">
              <VideoGridCard video={story} index={i} onClick={handleCardClick} />
            </div>
          ))}

          {/* Mobile Horizontal Scroll Row */}
          <div className="lg:hidden col-span-2">
            <div className="flex gap-3 overflow-x-auto no-scrollbar snap-x snap-mandatory px-4 pb-2">
              {[displayHero, ...displayGridAll].filter(Boolean).slice(0, 8).map((story, i) => (
                <div key={story?._id || `m-${i}`} className="flex-none w-[44vw] snap-start">
                  <VideoGridCard video={story} index={i} onClick={handleCardClick} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Video Modal */}
        <VideoModal video={selectedVideo} onClose={() => setSelectedVideo(null)} />
      </div>
    </section>
  );
};

// =============================================================================
// VOICES OF EXCELLENCE COMPONENTS
// =============================================================================

const VoicesCard = ({ data }) => (
  <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col h-full transition-all hover:shadow-md">
    <div className="text-brand-blue/10 mb-6">
      <svg width="40" height="30" viewBox="0 0 34 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.4418 0H14.1611C14.7171 0 15.0118 0.589139 14.6543 1.01815L8.91034 7.91054C8.42878 8.48842 8.79051 9.4 9.54452 9.4H11.2326C13.5684 9.4 15.4623 11.2939 15.4623 13.6297V19.7703C15.4623 22.1061 13.5684 24 11.2326 24H4.22971C1.89393 24 0 22.1061 0 19.7703V13.6335C0 12.3391 0.536033 11.103 1.48279 10.2119L10.7428 1.50361C11.196 1.07728 11.8023 0 12.4418 0Z" fill="currentColor" /><path d="M30.9795 0H32.6988C33.2548 0 33.5495 0.589139 33.192 1.01815L27.4481 7.91054C26.9665 8.48842 27.3282 9.4 28.0822 9.4H29.7703C32.1061 9.4 34 11.2939 34 13.6297V19.7703C34 22.1061 32.1061 24 29.7703 24H22.7674C20.4316 24 18.5377 22.1061 18.5377 19.7703V13.6335C18.5377 12.3391 19.0737 11.103 20.0205 10.2119L29.2805 1.50361C29.7337 1.07728 30.34 0 30.9795 0Z" fill="currentColor" /></svg>
    </div>
    <p className="text-gray-700 font-medium leading-[1.6] mb-8 flex-grow font-poppins italic line-clamp-6 md:line-clamp-[7]" style={{ fontSize: '15.5px' }}>"{data.quote}"</p>
    <div className="flex items-center gap-4 mt-auto pt-6 border-t border-gray-50">
      <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-sm" style={{ background: data.avatarBg }}>{data.initials}</div>
      <div>
        <h4 className="text-gray-900 font-bold text-[15px] leading-tight">{data.name}</h4>
        <p className="text-brand-blue font-bold text-[10px] uppercase tracking-widest mt-1 bg-brand-blue/5 px-2 py-0.5 rounded-md inline-block">{data.designation}</p>
      </div>
    </div>
  </div>
);

export const VoicesOfExcellence = ({ testimonials: propTestimonials } = {}) => {
  const testimonials = propTestimonials || voicesOfExcellenceData;
  return (
    <div className="w-full">
      <section className="bg-[#FAF9F6] py-20 px-4 w-full">
        <div className="max-w-[1200px] mx-auto flex flex-col items-center">
          <div className="text-center mb-16 max-w-3xl">

            <SectionHeader title="Voices of" highlight="Excellence" subtitle="Feedback from our global community of CIA professionals who have achieved their certification goals through our structured mentoring and comprehensive training program." centered />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
            {testimonials.map((item, idx) => <VoicesCard key={idx} data={item} />)}
          </div>
        </div>
      </section>

    </div>
  );
};
