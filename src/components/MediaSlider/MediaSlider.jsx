import React, { useEffect, useRef, useState } from "react";
import { m, AnimatePresence } from 'motion/react';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";


const isVideoSrc = (src) =>
    typeof src === "string" && /\.(mp4|webm|ogg)$/i.test(src);

export default function MediaSlider({
    items = [],
    width = 560,
    height = 350,
    autoPlay = true,
    interval = 2000,
    visible = 5,
    sidePadding = 32
}) {
    const n = items.length;
    const [current, setCurrent] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [fullscreenSrc, setFullscreenSrc] = useState(null);

    // helper to compute minimal signed difference (circular)
    const signedDiff = (index) => {
        if (n === 0) return 0;
        let d = index - current;
        if (d > n / 2) d -= n;
        if (d < -n / 2) d += n;
        return d;
    };

    // autoplay
    useEffect(() => {
        if (!autoPlay || n <= 1) return;
        if (isPaused) return;
        const id = setInterval(() => {
            setCurrent((prev) => (prev + 1) % n);
        }, interval);
        return () => clearInterval(id);
    }, [autoPlay, isPaused, interval, n]);

    // pause on hover
    const handleMouseEnter = () => setIsPaused(true);
    const handleMouseLeave = () => setIsPaused(false);

    // arrow handlers (looping)
    const goPrev = () => setCurrent((p) => (p - 1 + n) % n);
    const goNext = () => setCurrent((p) => (p + 1) % n);

    // visible range (how many slides away we will render)
    const maxVisible = Math.floor(visible / 2) || 2;

    return (
        <div
            className="relative"
            style={{ width: `${width}px`, height: `${height}px` }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* perspective container */}
            <div
                className="flex items-center justify-center"
                style={{
                    perspective: 1200,
                    paddingLeft: sidePadding,
                    paddingRight: sidePadding

                }}

            >
                {/* slide items positioned absolutely around center */}
                {items.map((src, i) => {
                    const d = signedDiff(i);
                    if (Math.abs(d) > maxVisible) return null;

                    const gap = width * 0.48;
                    const x = d * gap;
                    const scale = Math.max(0.7, 1 - Math.abs(d) * 0.15);
                    const rotateY = -d * 22;
                    const zIndex = 200 - Math.abs(d);
                    const opacity = Math.max(1, 1 - Math.abs(d) * 0.55);
                    const isCenter = d === 0;

                    return (
                        <m.div
                            key={i}
                            className="absolute top-0 left-0 transform -translate-x-1/2 -translate-y-1/2 rounded-lg overflow-hidden shadow-lg"
                            initial={{ opacity: 0 }}
                            animate={{
                                x,
                                scale,
                                rotateY,
                                opacity,
                                transition: { type: "spring", stiffness: 160, damping: 28 },
                            }}
                            style={{
                                width: `${width}px`,
                                height: `${height}px`,
                                zIndex,
                                transformStyle: "preserve-3d",
                                cursor: "pointer",
                            }}
                            onClick={() => {
                                if (!isCenter) {
                                    setCurrent(i);
                                } else {
                                    setFullscreenSrc(src);
                                }
                            }}
                        >
                            {isVideoSrc(src) ? (
                                <VideoTile
                                    src={src}
                                    isCenter={isCenter}
                                    width={width}
                                    height={height}
                                />
                            ) : (
                                <ImageTile
                                    src={src}
                                    isCenter={isCenter}
                                    width={width}
                                    height={height}
                                />
                            )}
                        </m.div>
                    );
                })}
            </div>


            {/* Fullscreen modal */}
            <AnimatePresence>
                {fullscreenSrc && (
                    <m.div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <div className="relative max-w-[95vw] max-h-[95vh]">
                            <button
                                className="absolute top-2 right-2 z-20 text-white bg-black/40 rounded-full p-2"
                                onClick={() => setFullscreenSrc(null)}
                            >
                                ✕
                            </button>

                            {isVideoSrc(fullscreenSrc) ? (
                                <video
                                    src={fullscreenSrc}
                                    controls
                                    autoPlay
                                    muted={false}
                                    className="max-w-full max-h-[90vh] rounded-lg"
                                />
                            ) : (
                                <img
                                    src={fullscreenSrc}
                                    alt="fullscreen"
                                    className="max-w-full max-h-[90vh] rounded-lg object-contain"
                                />
                            )}
                        </div>
                    </m.div>
                )}
            </AnimatePresence>
        </div>
    );
}

/* ---------- small helper tile components ---------- */

function ImageTile({ src, isCenter, width, height }) {
    return (
        <div className="w-full h-full relative">
            <img
                src={src}
                alt=""
                className="w-full h-full object-cover block rounded-lg"
            />
            {isCenter && (
                <div className="absolute inset-0 rounded-lg ring-4 ring-white/20 pointer-events-none" />
            )}
        </div>
    );
}

function VideoTile({ src, isCenter, width, height }) {
    const vidRef = useRef(null);

    useEffect(() => {
        const v = vidRef.current;
        if (!v) return;
        if (isCenter) {
            v.muted = true;
            const p = v.play();
            if (p && p.catch) p.catch(() => { });
        } else {
            v.pause();
        }
    }, [isCenter]);

    return (
        <div className="w-[120px] h-[80px] relative bg-black rounded-lg overflow-hidden">
            <video
                ref={vidRef}
                src={src}
                className="w-full h-full object-cover"
                playsInline
                muted
                loop
                onMouseEnter={(e) => {
                    try {
                        e.currentTarget.muted = true;
                        e.currentTarget.play();
                    } catch { }
                }}
                onMouseLeave={(e) => {
                    try {
                        if (!isCenter) e.currentTarget.pause();
                    } catch { }
                }}
                controls={isCenter}
            />
            {isCenter && (
                <div className="absolute left-3 top-3">
                    <div className="bg-white/90 text-black px-2 py-1 rounded-md text-sm font-medium shadow">
                        Now Playing
                    </div>
                </div>
            )}
        </div>
    );
}
