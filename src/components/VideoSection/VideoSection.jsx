import React, { useState } from "react";

export default function VideoSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isIframeLoaded, setIsIframeLoaded] = useState(false);
  const videoId = "2FWaO_Cf0eg";
  const youtubeThumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  return (
    <div className="flex justify-center items-center px-4 md:px-0 relative z-10">
      <div className="w-full max-w-4xl mx-auto">
        <div className="relative w-full pb-[56.25%] h-0 rounded-lg overflow-hidden shadow-lg">
          {/* Thumbnail + Play Button */}
          {!isPlaying && (
            <div
              className="absolute inset-0 cursor-pointer"
              onClick={() => setIsPlaying(true)}
            >
              <img
                src={youtubeThumbnail}
                alt="YouTube Thumbnail"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
                <button className="bg-red-600 text-white px-6 py-2 rounded-xl text-2xl shadow-md">
                  ▶
                </button>
              </div>
            </div>
          )}

          {/* Iframe + Loading Overlay */}
          {isPlaying && (
            <>
              {!isIframeLoaded && (
                <div className="absolute inset-0 bg-black flex items-center justify-center">
                  <p className="text-white text-lg animate-pulse">
                    Loading video...
                  </p>
                </div>
              )}
              <iframe
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                onLoad={() => setIsIframeLoaded(true)}
                className={`absolute top-0 left-0 w-full h-full rounded-lg transition-opacity duration-500 ${isIframeLoaded ? "opacity-100" : "opacity-0"
                  }`}
              ></iframe>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
