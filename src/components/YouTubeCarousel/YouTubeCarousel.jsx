import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faPlay } from '@fortawesome/free-solid-svg-icons';

const YouTubeCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const scrollContainerRef = useRef(null);

    // YouTube video data
    const videos = [
        {
            id: 'WgA9VzD06kY',
            title: 'One Year of GPC | A Journey of Growth, Learning & Creativity',
            description: 'Celebrating our first year of empowering professionals worldwide with expert-led certification programs.',
            thumbnail: 'https://img.youtube.com/vi/WgA9VzD06kY/maxresdefault.jpg',
            url: 'https://www.youtube.com/watch?v=WgA9VzD06kY'
        },
        {
            id: 'qdnLecSFurU',
            title: 'CIA Orientation Program',
            description: 'Learn everything you need to know about starting your CIA certification journey with our comprehensive orientation.',
            thumbnail: 'https://img.youtube.com/vi/qdnLecSFurU/maxresdefault.jpg',
            url: 'https://www.youtube.com/watch?v=qdnLecSFurU'
        },
        {
            id: 'WgA9VzD06kY',
            title: 'Success Stories from Our Students',
            description: 'Hear directly from professionals who transformed their careers with our certification programs.',
            thumbnail: 'https://img.youtube.com/vi/WgA9VzD06kY/maxresdefault.jpg',
            url: 'https://www.youtube.com/watch?v=WgA9VzD06kY'
        },
        {
            id: 'qdnLecSFurU',
            title: 'Expert Tips for CIA Exam Preparation',
            description: 'Get insider tips and strategies from our expert mentors to ace your CIA certification exam.',
            thumbnail: 'https://img.youtube.com/vi/qdnLecSFurU/maxresdefault.jpg',
            url: 'https://www.youtube.com/watch?v=qdnLecSFurU'
        },
    ];

    const slideVariants = {
        enter: (direction) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
            scale: 0.8
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            scale: 1
        },
        exit: (direction) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0,
            scale: 0.8
        })
    };

    const swipeConfidenceThreshold = 10000;
    const swipePower = (offset, velocity) => {
        return Math.abs(offset) * velocity;
    };

    const paginate = (newDirection) => {
        setDirection(newDirection);
        setCurrentIndex((prevIndex) => {
            if (newDirection === 1) {
                return prevIndex === videos.length - 1 ? 0 : prevIndex + 1;
            } else {
                return prevIndex === 0 ? videos.length - 1 : prevIndex - 1;
            }
        });
    };

    return (
        <div className="px-6 lg:px-24 w-full mt-16 md:mt-24 mb-12 bg-gradient-to-b from-gray-50 to-white py-16">
            {/* Section Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex flex-col gap-2 justify-center items-center p-4 mb-16"
            >
                <h2 className="text-2xl md:text-4xl lg:text-4xl text-center font-bold">
                    Watch Our{" "}
                    <span className="text-brand-blue font-normal italic">
                        Latest Videos
                    </span>
                </h2>
                <p className="text-xs md:text-base text-center lg:text-base font-poppins leading-relaxed max-w-2xl text-gray-600 mt-4">
                    Explore our YouTube channel for expert insights, success stories, and comprehensive guides on professional certifications
                </p>
            </motion.div>

            {/* Carousel Container */}
            <div className="relative max-w-7xl mx-auto">
                {/* Navigation Buttons */}
                <button
                    onClick={() => paginate(-1)}
                    className="absolute left-0 md:-left-16 top-1/2 -translate-y-1/2 z-20 bg-white hover:bg-brand-blue text-brand-blue hover:text-white rounded-full p-3 md:p-4 shadow-xl transition-all duration-300 hover:scale-110 border-2 border-gray-100"
                    aria-label="Previous video"
                >
                    <FontAwesomeIcon icon={faChevronLeft} className="w-5 h-5" />
                </button>

                <button
                    onClick={() => paginate(1)}
                    className="absolute right-0 md:-right-16 top-1/2 -translate-y-1/2 z-20 bg-white hover:bg-brand-blue text-brand-blue hover:text-white rounded-full p-3 md:p-4 shadow-xl transition-all duration-300 hover:scale-110 border-2 border-gray-100"
                    aria-label="Next video"
                >
                    <FontAwesomeIcon icon={faChevronRight} className="w-5 h-5" />
                </button>

                {/* Video Cards with Scroll Effect */}
                <div className="overflow-hidden relative h-[500px] md:h-[450px]">
                    <AnimatePresence initial={false} custom={direction} mode="wait">
                        <motion.div
                            key={currentIndex}
                            custom={direction}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{
                                x: { type: "spring", stiffness: 300, damping: 30 },
                                opacity: { duration: 0.4 },
                                scale: { duration: 0.4 }
                            }}
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={1}
                            onDragEnd={(e, { offset, velocity }) => {
                                const swipe = swipePower(offset.x, velocity.x);

                                if (swipe < -swipeConfidenceThreshold) {
                                    paginate(1);
                                } else if (swipe > swipeConfidenceThreshold) {
                                    paginate(-1);
                                }
                            }}
                            className="absolute w-full"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 px-4">
                                {[videos[currentIndex], videos[(currentIndex + 1) % videos.length], videos[(currentIndex + 2) % videos.length]].map((video, index) => (
                                    <motion.a
                                        key={`${video.id}-${index}`}
                                        href={video.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        whileHover={{ y: -8, scale: 1.02 }}
                                        className="group block bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-300"
                                    >
                                        {/* Thumbnail */}
                                        <div className="relative w-full h-48 md:h-56 overflow-hidden bg-gradient-to-br from-brand-blue to-brand-purple">
                                            <img
                                                src={video.thumbnail}
                                                alt={video.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                            />
                                            {/* Gradient Overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>

                                            {/* Play Button Overlay */}
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <motion.div
                                                    whileHover={{ scale: 1.2, rotate: 90 }}
                                                    transition={{ type: "spring", stiffness: 300 }}
                                                    className="w-16 h-16 md:w-20 md:h-20 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-2xl"
                                                >
                                                    <FontAwesomeIcon icon={faPlay} className="text-brand-blue text-xl md:text-2xl ml-1" />
                                                </motion.div>
                                            </div>

                                            {/* Duration Badge (Optional) */}
                                            <div className="absolute bottom-3 right-3 bg-black/80 text-white text-xs px-2 py-1 rounded">
                                                Watch Now
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-6">
                                            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-brand-blue transition-colors duration-300">
                                                {video.title}
                                            </h3>
                                            <p className="text-gray-600 text-sm md:text-base font-poppins leading-relaxed line-clamp-2">
                                                {video.description}
                                            </p>
                                        </div>
                                    </motion.a>
                                ))}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Pagination Dots */}
                <div className="flex justify-center items-center gap-2 mt-8">
                    {videos.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                setDirection(index > currentIndex ? 1 : -1);
                                setCurrentIndex(index);
                            }}
                            className={`transition-all duration-300 rounded-full ${index === currentIndex
                                    ? 'w-8 h-3 bg-brand-blue'
                                    : 'w-3 h-3 bg-gray-300 hover:bg-gray-400'
                                }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>

            {/* See More Button */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="flex justify-center items-center mt-16"
            >
                <a
                    href="https://www.youtube.com/@GlobalProfessionalCertifications"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative bg-brand-blue text-white text-sm md:text-base py-3 px-8 md:px-10 rounded-full hover:bg-brand-purple transition-all duration-300 shadow-lg hover:shadow-2xl overflow-hidden"
                >
                    <span className="relative z-10 flex items-center gap-2">
                        Visit Our YouTube Channel
                        <motion.span
                            animate={{ x: [0, 5, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                        >
                            →
                        </motion.span>
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-brand-purple to-brand-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </a>
            </motion.div>
        </div>
    );
};

export default YouTubeCarousel;
