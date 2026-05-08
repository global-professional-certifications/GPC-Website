import { useRef } from 'react';
import { m } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faPlay } from '@fortawesome/free-solid-svg-icons';

// Utility function
const extractVideoId = (url) => {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[7].length === 11) ? match[7] : null;
};

const YouTubeCarousel = ({ videos }) => {
    const scrollContainerRef = useRef(null);

    const defaultVideos = [
        {
            url: 'https://youtu.be/CvzJ_SFD45Y?si=Sh8Y3pi_CE6mNV72',
            title: 'Interview with IIA India CEO Mukundan K V',
            description: 'Dive deep into the importance of Internal Audit, the role of the Institute of Internal Auditors (IIA India), and the value of the CIA Certification.',
            thumbnail: '/thumbnails/CvzJ_SFD45Y.jpg',
        },
        {
            url: 'https://youtu.be/qdnLecSFurU?si=sogfATX1kdl0Lyn5',
            title: 'CIA Orientation Program 2025',
            description: 'Get to know everything about CIA course - Know your Mentor, registration process, study material, exam cost, new syllabus.',
            thumbnail: '/thumbnails/qdnLecSFurU.jpg',
        },
        {
            url: 'https://youtu.be/XNnXkttYQUY?si=MrofNMhf9nXC2GPd',
            title: 'CIA Part wise Orientation Program with New Syllabus',
            description: 'Get to know everything about CIA course - New syllabus, What is changing, Schedule of session series, Cost, etc.',
            thumbnail: '/thumbnails/XNnXkttYQUY.jpg',
        },
        {
            url: 'https://youtu.be/dz4vHdVRhgY?si=DiqdAfEiDjltBERd',
            title: 'CIA Part 2 Orientation Program with New Syllabus',
            description: "Are you ready to conquer CIA Part 2 with confidence and strategy? Whether you're an existing student, a newcomer, or an aspirant eager to embark on this journey, our CIA Part 2 Orientation Program is designed to set you on the right path to success!",
            thumbnail: '/thumbnails/dz4vHdVRhgY.jpg',
        },
        {
            url: 'https://youtu.be/Xn7lL67U2NI?si=-mCBFQcMy0T04nEi',
            title: 'CIA Part 3 Orientation Program with New Syllabus',
            description: "Are you ready to conquer CIA Part 3 with confidence and strategy? Whether you're an existing student, a newcomer, or an aspirant eager to embark on this journey, our CIA Part 3 Orientation Program is designed to set you on the right path to success!",
            thumbnail: '/thumbnails/Xn7lL67U2NI.jpg',
        },
    ];

    const processedVideos = (videos || defaultVideos).map(video => {
        const id = extractVideoId(video.url);
        return {
            id,
            title: video.title,
            description: video.description,
            thumbnail: video.thumbnail || `https://img.youtube.com/vi/${id}/maxresdefault.jpg`,
            url: video.url
        };
    });

    const scroll = (direction) => {
        scrollContainerRef.current?.scrollBy({
            left: direction * scrollContainerRef.current.offsetWidth * 0.8,
            behavior: 'smooth'
        });
    };

    return (
        <div className="w-full py-10 bg-gray-50 overflow-hidden">
            <div className="max-w-[1400px] mx-auto px-6 md:px-12">

                {/* Heading */}
                <div className="text-center mb-14">
                    <h2 className="text-2xl md:text-4xl font-bold">
                        Watch Our <span className="text-brand-blue font-normal italic">Latest Videos</span>
                    </h2>
                    <p className="text-xs md:text-base font-poppins text-gray-600 mt-6 max-w-3xl mx-auto">
                        Explore expert insights, success stories, and certification guidance.
                    </p>
                </div>

                {/* Carousel */}
                <div className="relative">
                    {/* Buttons */}
                    <button
                        onClick={() => scroll(-1)}
                        className="absolute -left-4 top-1/2 -translate-y-1/2 z-20 bg-white shadow-xl rounded-full p-3 hidden md:flex hover:bg-brand-blue hover:text-white transition"
                    >
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </button>

                    <button
                        onClick={() => scroll(1)}
                        className="absolute -right-4 top-1/2 -translate-y-1/2 z-20 bg-white shadow-xl rounded-full p-3 hidden md:flex hover:bg-brand-blue hover:text-white transition"
                    >
                        <FontAwesomeIcon icon={faChevronRight} />
                    </button>

                    {/* Scroll Area */}
                    <div
                        ref={scrollContainerRef}
                        className="flex overflow-x-auto gap-6 pb-8 no-scrollbar scroll-smooth"
                    >
                        {processedVideos.map((video, index) => (
                            <m.div
                                key={index}
                                className="flex-none w-[280px] md:w-[340px] h-[310px] md:h-[350px]"
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >

                                <a
                                    href={video.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex flex-col h-full bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100"
                                >
                                    {/* Thumbnail */}
                                    <div className="relative aspect-video w-full overflow-hidden bg-gray-200">
                                        <img
                                            src={video.thumbnail}
                                            alt={video.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />

                                        {/* Overlay */}
                                        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition flex items-center justify-center">
                                            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition shadow-lg">
                                                <FontAwesomeIcon icon={faPlay} className="text-brand-blue ml-1" />
                                            </div>
                                        </div>
                                    </div>


                                    {/* Content */}
                                    <div className="p-6 flex flex-col flex-1">
                                        <h3 className="text-lg font-bold mb-3 group-hover:text-brand-blue transition">
                                            {video.title}
                                        </h3>
                                        <p className="text-sm text-gray-600 font-poppins line-clamp-3">
                                            {video.description}
                                        </p>
                                    </div>
                                </a>
                            </m.div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div className="mt-12 text-center">
                    <a
                        href="https://www.youtube.com/@global-professional-cert"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 bg-brand-blue text-white py-3 px-8 rounded-full hover:bg-brand-purple transition shadow-lg"
                    >
                        Visit Our YouTube Channel
                    </a>
                </div>
            </div>
        </div>
    );
};

export default YouTubeCarousel;
