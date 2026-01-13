import React from "react"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function EventCarousel({ images }) {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        adaptiveHeight: true,
        swipe: true,
        swipeToSlide: true,
        touchMove: true,
        draggable: true,
    };

    return (
        <div className="w-full h-full flex items-center justify-center p-4">
            <Slider {...settings} className="w-full max-w-5xl">
                {images.map((image, index) => {
                    return (
                        <div key={index} className="outline-none focus:outline-none px-2">
                            <div className="flex items-center justify-center w-full h-[60vh] md:h-[70vh]">
                                <img
                                    src={image}
                                    alt={`Event ${index + 1}`}
                                    className="max-w-full max-h-full w-auto h-auto object-contain rounded-lg shadow-2xl"
                                />
                            </div>
                        </div>
                    )
                })}
            </Slider>
        </div>
    )
}