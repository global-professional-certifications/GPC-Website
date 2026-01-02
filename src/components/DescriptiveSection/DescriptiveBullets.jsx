import { FaArrowRight } from "react-icons/fa";

const DescriptiveBullets = ({
    titleStart,
    highlight,
    titleEnd,
    points,
    description,
    image,
    imageAlt,
}) => {
    return (
        <section className="px-6 md:px-12 lg:px-20 py-16">
            <div className="container mx-auto">
                <div className="flex flex-col lg:flex-row justify-center items-center gap-12">

                    {/* Image */}
                    <div className="w-full md:w-[50%] flex justify-center lg:justify-start">
                        <img
                            src={image}
                            alt={imageAlt}
                            className="w-full h-auto md:w-[35vw] object-contain rounded-xl shadow-sm"
                        />
                    </div>

                    {/* Text */}
                    <div className="w-full md:w-[50%] text-left flex flex-col gap-6">

                        {/* Heading (unchanged style) */}
                        <h2 className="text-2xl md:text-4xl font-bold leading-tight">
                            {titleStart}{" "}
                            <span className="text-brand-blue font-normal italic">
                                {highlight}{" "}
                            </span>
                            {titleEnd}
                        </h2>

                        {/* Description */}
                        <p className="text-gray-800 text-xs md:text-base font-poppins leading-relaxed max-w-2xl">
                            {description}
                        </p>

                        {/* Bullet Points */}
                        <ul className="flex flex-col gap-4 mt-2">
                            {points.map((point, index) => (
                                <li
                                    key={index}
                                    className="flex items-start gap-4"
                                >
                                    {/* Arrow */}
                                    <FaArrowRight className="text-brand-blue mt-1 flex-shrink-0" />

                                    {/* Text */}
                                    <p className="text-gray-800 text-xs md:text-base font-poppins leading-relaxed">
                                        {point.title && (
                                            <span className="font-semibold text-brand-blue">
                                                {point.title}{" "}
                                            </span>
                                        )}
                                        {point.text}
                                    </p>
                                </li>
                            ))}
                        </ul>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default DescriptiveBullets;
