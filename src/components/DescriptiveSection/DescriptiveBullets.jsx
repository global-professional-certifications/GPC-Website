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
        <section className="px-6 md:px-12 lg:px-20 py-12 ">
            <div className="container mx-auto">
                <div className="flex flex-col lg:flex-row justify-between items-center gap-8 lg:gap-12">

                    {/* Image */}
                    <div className="w-full lg:w-1/2 flex justify-center lg:justify-start">
                        <img
                            src={image}
                            alt={imageAlt}
                            className="w-full h-auto md:w-[30vw] object-contain rounded-lg"
                        />
                    </div>

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

                        {/* Bullet Points */}
                        <ul className="list-disc list-inside text-gray-800 text-xs md:text-base font-poppins leading-relaxed space-y-3">
                            {points.map((point, index) => (
                                <li key={index}>

                                    <span className="font-semibold text-brand-blue">
                                        {point.title}
                                    </span>{" "}
                                    {point.text}

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
