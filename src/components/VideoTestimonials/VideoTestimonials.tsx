'use client';

import React, { useMemo, useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "../routing";
import { VideoGridCard, VideoModal } from "../SuccessStories/StorySections";
import { urlFor } from "../../lib/sanity/imageBuilder";
import type { CmsData, CmsList } from "../../types/cms";

/*
 * Video testimonial cards with a "Watch More" link to /success.
 *
 * Reusable on any course page: the page's server route fetches its own videos
 * (successStory documents, category "video", with name, thumbnail and
 * "videoUrl": video.asset->url; see app/(site)/courses/cia/page.tsx) and
 * passes them in with its own heading copy. Cards open the same video player
 * used on the Success Stories page.
 */

type Props = {
  videos?: CmsList;
  titleStart: string;
  highlight: string;
  titleEnd?: string;
  description?: string;
  moreLink?: string;
  moreLabel?: string;
};

export default function VideoTestimonials({
  videos = [],
  titleStart,
  highlight,
  titleEnd = "",
  description,
  moreLink = "/success",
  moreLabel = "Watch More",
}: Props) {
  const [selectedVideo, setSelectedVideo] = useState<CmsData>(null);

  const cards = useMemo(() => videos
    .filter(v => v.videoUrl)
    .map(v => ({
      ...v,
      thumbnailUrl: v.thumbnail ? urlFor(v.thumbnail).width(480).url() : null,
    })), [videos]);

  if (cards.length === 0) return null;

  return (
    <section id="video-testimonials" className="font-poppins px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900">
            {titleStart} <span className="text-brand-blue font-normal italic">{highlight}</span> {titleEnd}
          </h2>
          {description && (
            <p className="mt-4 text-sm md:text-base text-gray-600 leading-relaxed max-w-3xl mx-auto">
              {description}
            </p>
          )}
        </div>

        <ul className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {cards.map((video, i) => (
            <li key={video._id}>
              <VideoGridCard video={video} index={i} onClick={setSelectedVideo} />
              <p className="mt-3 text-sm font-semibold text-gray-900 text-center">{video.name}</p>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex justify-center">
          <Link
            to={moreLink}
            className="inline-flex items-center gap-2 rounded-xl bg-brand-blue px-6 py-3 text-sm md:text-base font-semibold text-white shadow-md transition-all duration-300 hover:bg-brand-purple hover:shadow-lg"
          >
            {moreLabel}
            <FaArrowRightLong className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <VideoModal video={selectedVideo} onClose={() => setSelectedVideo(null)} />
    </section>
  );
}
