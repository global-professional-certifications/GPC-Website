const DescriptiveLeft = ({
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
        <section className="px-6 md:px-12 lg:px-20 py-12 bg-gray-50">
            <div className="container mx-auto">
                <div className="flex flex-col-reverse lg:flex-row justify-between items-center gap-8 lg:gap-12">
                    {/* Text */}
                    <div className="w-full lg:w-1/2 text-left flex flex-col gap-6">
                        <h2 className="text-2xl md:text-4xl font-bold leading-tight">
                            {titleStart}{" "}
                            <span className="text-brand-blue font-normal italic">
                                {highlight}{" "}
                            </span>
                            {titleEnd}
                        </h2>

                        <p className="text-gray-800 text-xs md:text-base font-poppins leading-relaxed">
                            {description}
                        </p>

                        {buttonText && (
                            <a
                                href={buttonLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-brand-blue text-white text-sm md:text-base py-2 px-4 lg:px-6 rounded-full hover:bg-brand-purple hover:scale-105 transition-all duration-300 w-fit"
                            >
                                {buttonText}
                            </a>
                        )}
                    </div>

                    {/* Image */}
                    <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
                        <img
                            src={image}
                            alt={imageAlt}
                            loading="lazy"
                            width="500"
                            height="350"
                            className="w-full h-auto md:w-[35vw] md:h-auto object-contain rounded-lg aspect-[500/350]"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DescriptiveLeft;
