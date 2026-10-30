'use client';

import { useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useReducedMotion } from "motion/react";
import type { CmsData } from '../../types/cms';

/**
 * Fading photo carousel for the ISACA accreditation section. Loaded only when
 * the section is given more than one photo (the CISA course page), so the
 * homepage never downloads react-slick for it.
 */
export default function ISACAPhotoCarousel({ images }: { images: string[] }) {
    const sliderRef = useRef<CmsData>(null);
    const [currentSlide, setCurrentSlide] = useState(0);
    const reduceMotion = useReducedMotion();

    const settings = {
        dots: false,
        arrows: false,
        infinite: true,
        fade: true,
        speed: 500,
        autoplay: !reduceMotion,
        autoplaySpeed: 2500,
        pauseOnHover: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        swipe: true,
        cssEase: 'cubic-bezier(0.4, 0, 0.2, 1)',
        beforeChange: (_current: number, next: number) => setCurrentSlide(next),
    };

    return (
        <div className="w-full max-w-[550px]">
            {/* Global .slick-slide>div margin (index.css) would inset the photos; reset it here only.
                align-top: react-slick wraps each slide in an inline-block, which leaves an empty strip under the photo. */}
            <div className="relative rounded-2xl shadow-xl overflow-hidden [&_.slick-slide>div]:!m-0 [&_.slick-slide>div>div]:align-top">
                <Slider ref={sliderRef} {...settings}>
                    {images.map((image, index) => (
                        <div key={image} className="outline-none">
                            <img
                                src={image}
                                alt={`GPC at the ISACA accreditation, photo ${index + 1} of ${images.length}`}
                                width="1100"
                                height="772"
                                loading={index === 0 ? "eager" : "lazy"}
                                className="block w-full aspect-[1100/772] object-cover"
                            />
                        </div>
                    ))}
                </Slider>
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-4">
                {images.map((image, index) => (
                    <button
                        key={image}
                        type="button"
                        onClick={() => sliderRef.current?.slickGoTo(index)}
                        className={`h-2 rounded-full transition-all duration-300 ${currentSlide === index
                            ? 'w-6 bg-brand-blue'
                            : 'w-2 bg-brand-blue/30 hover:bg-brand-blue/60'
                            }`}
                        aria-label={`Go to photo ${index + 1}`}
                        aria-current={currentSlide === index}
                    />
                ))}
            </div>
        </div>
    );
}
