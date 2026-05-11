import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";

import testimonialCover from "../../assets/home/testimonial-cover.webp";
import pinkyTestimonial from "../../assets/pinky-photo.jpg";
import akshdeepTestimonial from "../../assets/akshdeep-singh.png";
import starwinTestimonial from "../../assets/testimonial-2.png";
import wajihaTestimonial from "../../assets/Wajiha-Ansari.png";
import ramakrishnaTestimonial from "../../assets/Ramakrishna-Mude.jpeg";
import unmeshTestimonial from "../../assets/Unmesh-Upadhye.webp";

const testimonials = [
    {
        quote: "Highly recommend Arpit Garg's CIA Challenge Exam Prep Course - his clarity, passion, and expertise simplify complex topics and keep you focused, disciplined, and confident throughout.",
        name: "Pinky Agarwal",
        title: "Head Internal Audit, Emami Limited",
        image: pinkyTestimonial,
    },
    {
        quote: "Arpit Garg's CIA Challenge Exam Crash Course helped me clear the exam on my first attempt in just 2 months. Structured weekend sessions built my confidence to succeed.",
        name: "Akshdeep Singh",
        title: "Manager, KPMG",
        image: akshdeepTestimonial,
    },
    {
        quote: "Attending Arpit Garg's CIA Challenge Exam Crash Course was exceptional. His clear, interactive teaching made complex topics simple and key concepts easy to grasp",
        name: "Starwin PJ",
        title: "AVP, Wells Fargo",
        image: starwinTestimonial,
    },
    {
        quote: "Arpit Garg's CIA Crash Course was a game-changer. His intuitive teaching and mentorship built my confidence. The LMS flexibility and weekend sessions made learning achievable and inspiring.",
        name: "Wajiha Ansari",
        title: "Auditor, Grant Thornton Bahrain",
        image: wajihaTestimonial,
    },
    {
        quote: "I owe my CIA Challenge Exam success to Arpit Garg's exceptional guidance. His clarity, structure, and topic-wise MCQs built my confidence. Truly grateful for his mentorship highly recommended!",
        name: "Ramakrishna Mude",
        title: "Head of Technology Audit, Digital Bank in Abu Dhabi",
        image: ramakrishnaTestimonial,
    },
    {
        quote: "Passing all three parts of the CIA exam was a journey of growth and grit. Thanks to Arpit Garg's mentorship, strategy, and insights his guidance made it possible!",
        name: "Unmesh Upadhye",
        title: "Assistant Vice President, State Bank of India",
        image: unmeshTestimonial,
    },
];

const TestimonialsShowcase = () => {
    return (
        <>
            {/* People Image Display */}
            <div className="w-full mx-auto py-16">
                <div className="flex flex-col gap-2 justify-center items-center mb-12">
                    <h2 className="text-2xl md:text-4xl text-center font-bold">
                        What Our{" "}
                        <span className="text-brand-blue font-normal italic">Learners </span>
                        Say
                    </h2>
                    <p className="text-xs md:text-base lg:text-base font-poppins leading-relaxed max-w-xl md:max-w-2xl lg:max-w-2xl text-center text-gray-600 mt-6 px-8 md:px-0 lg:px-0">
                        Discover how Global Professional Certifications' expert-led programs
                        empower professionals to achieve global certification and career
                        growth
                    </p>
                </div>

                <img
                    src={testimonialCover}
                    alt="Testimonial Cover"
                    width="1200"
                    height="400"
                    loading="lazy"
                    className="scale-100 md:scale-90 w-full h-auto"
                />
            </div>

            {/* Feedback Cards */}
            <div className="py-8 bg-gray-50 px-6 lg:px-16 mx-auto md:mx-6 lg:mx-6">
                <FontAwesomeIcon
                    icon={faQuoteLeft}
                    className="hidden md:block lg:block mb-8 text-3xl text-black md:text-5xl"
                />

                <div className="overflow-x-auto">
                    <div className="flex flex-row lg:grid lg:grid-cols-3 gap-6 md:gap-8 lg:gap-8 py-10 mx-0 lg:mx-10">
                        {testimonials.map((testimonial, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col justify-between min-h-[280px] min-w-[260px] md:min-w-[300px] lg:min-w-0 transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
                            >
                                <div className="flex-1 flex items-start">
                                    <p className="text-black text-base md:text-lg lg:text-lg font-poppins font-medium">
                                        "{testimonial.quote}"
                                    </p>
                                </div>

                                <div className="flex items-center justify-start gap-4 pt-6 mt-6 border-t border-gray-200">
                                    <img
                                        src={testimonial.image}
                                        alt={testimonial.name}
                                        className="w-12 h-12 rounded-full object-cover border-2 border-brand-blue aspect-square"
                                    />

                                    <div>
                                        <p className="font-medium font-poppins text-gray-900 text-xs md:text-sm lg:text-sm">
                                            {testimonial.name}
                                        </p>
                                        <p className="text-xs md:text-sm lg:text-sm font-poppins text-gray-600">
                                            {testimonial.title}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default TestimonialsShowcase;
