import React, { useState } from "react";

export default function VideoSection() {
  const [isLoaded, setIsLoaded] = useState(false);
  const videoId = "2FWaO_Cf0eg"; // YouTube Video ID
  const youtubeThumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  return (
    <div className="flex justify-center items-center px-4 md:px-0">
      <div className="w-full max-w-4xl mx-auto"> {/* Smaller max width */}
        <div className="w-full flex justify-center items-center h-auto">
          <div className="relative w-full pb-[56.28%] h-0"> 
            {!isLoaded ? (
              <div
                className="absolute top-0 left-0 w-full h-full cursor-pointer"
                onClick={() => setIsLoaded(true)}
              >
                {/* Thumbnail */}
                <img
                  src={youtubeThumbnail}
                  alt="YouTube Thumbnail"
                  className="absolute top-0 left-0 w-full h-full object-cover rounded-lg"
                />
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
                  <button className="bg-red-600 text-white px-6 py-2 rounded-xl text-2xl">
                    ▶
                  </button>
                </div>
              </div>
            ) : (
              <iframe
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full rounded-lg"
              ></iframe>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
