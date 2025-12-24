const DescriptiveRight = ({
    titleStart,
    highlight,
    titleEnd,
    description,
    image,
    imageAlt,
    buttonText,
    buttonLink,
}) => {
    return (
        <section className="px-6 md:px-12 lg:px-20 py-12 bg-brand-blue">
            <div className="container mx-auto">
                <div className="flex flex-col lg:flex-row justify-between items-center gap-8 lg:gap-12">
                    {/* Image */}
                    <div className="w-full lg:w-1/2 flex justify-center lg:justify-start">
                        <img
                            src={image}
                            alt={imageAlt}
                            className="w-full h-auto md:w-[30vw] md:h-auto object-contain rounded-lg"
                        />
                    </div>

                    {/* Text */}
                    <div className="w-full lg:w-1/2 text-left flex flex-col gap-6">
                        <h2 className="text-2xl md:text-4xl font-bold text-white leading-tight">
                            {titleStart}{" "}
                            <span className="text-orange-300 font-normal italic">
                                {highlight}
                            </span>
                            {titleEnd}
                        </h2>

                        <p className="text-gray-300 text-xs md:text-base font-poppins leading-relaxed">
                            {description}
                        </p>

                        {buttonText && (
                            <a
                                href={buttonLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 text-white text-sm md:text-base py-2 px-4 lg:px-6 rounded-full hover:hover:scale-105 transition-all duration-300 w-fit"
                            >
                                {buttonText}
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DescriptiveRight;
