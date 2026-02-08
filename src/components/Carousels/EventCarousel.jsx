import React, { useState } from "react"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// Custom Arrow Components
const CustomPrevArrow = ({ onClick }) => (
    <button
        onClick={onClick}
        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20
                   w-10 h-10 md:w-12 md:h-12
                   bg-white/90 hover:bg-white
                   rounded-full shadow-lg
                   flex items-center justify-center
                   text-gray-800 hover:text-brand-blue
                   transition-all duration-300 hover:scale-110
                   focus:outline-none focus:ring-2 focus:ring-brand-blue"
        aria-label="Previous image"
    >
        <FaChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
    </button>
);

const CustomNextArrow = ({ onClick }) => (
    <button
        onClick={onClick}
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20
                   w-10 h-10 md:w-12 md:h-12
                   bg-white/90 hover:bg-white
                   rounded-full shadow-lg
                   flex items-center justify-center
                   text-gray-800 hover:text-brand-blue
                   transition-all duration-300 hover:scale-110
                   focus:outline-none focus:ring-2 focus:ring-brand-blue"
        aria-label="Next image"
    >
        <FaChevronRight className="w-4 h-4 md:w-5 md:h-5" />
    </button>
);

export default function EventCarousel({ images, eventName }) {
    const [currentSlide, setCurrentSlide] = useState(0);

    if (!images || images.length === 0) {
        return (
            <div className="flex items-center justify-center h-64 text-gray-400">
                <p>No images available</p>
            </div>
        );
    }

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: <CustomPrevArrow />,
        nextArrow: <CustomNextArrow />,
        adaptiveHeight: false,
        swipe: true,
        swipeToSlide: true,
        touchMove: true,
        draggable: true,
        fade: true,
        cssEase: 'cubic-bezier(0.4, 0, 0.2, 1)',
        beforeChange: (current, next) => setCurrentSlide(next),
    };

    return (
        <div className="w-full h-full flex flex-col items-center justify-center">
            {/* Main Carousel Container */}
            <div className="relative w-full max-w-5xl mx-auto">
                <Slider {...settings} className="event-gallery-slider">
                    {images.map((image, index) => (
                        <div key={index} className="outline-none focus:outline-none">
                            <div className="flex items-center justify-center w-full h-[50vh] md:h-[65vh] px-4 md:px-16">
                                <img
                                    src={image}
                                    alt={`${eventName || 'Event'} - Image ${index + 1}`}
                                    className="max-w-full max-h-full w-auto h-auto object-contain rounded-xl shadow-2xl"
                                    loading="lazy"
                                />
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>

            {/* Image Counter & Thumbnail Dots */}
            <div className="flex flex-col items-center gap-4 mt-6">
                {/* Image Counter */}
                <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                    <span className="text-white font-medium text-sm md:text-base">
                        {currentSlide + 1} / {images.length}
                    </span>
                </div>

                {/* Thumbnail Navigation */}
                {images.length <= 10 && (
                    <div className="flex gap-2 flex-wrap justify-center max-w-md">
                        {images.map((image, index) => (
                            <button
                                key={index}
                                onClick={() => {
                                    const slider = document.querySelector('.event-gallery-slider .slick-slider');
                                    if (slider) {
                                        slider.slick?.slickGoTo(index);
                                    }
                                }}
                                className={`w-2 h-2 md:w-2.5 md:h-2.5 rounded-full transition-all duration-300
                                    ${currentSlide === index
                                        ? 'bg-white scale-125'
                                        : 'bg-white/40 hover:bg-white/70'
                                    }`}
                                aria-label={`Go to image ${index + 1}`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
