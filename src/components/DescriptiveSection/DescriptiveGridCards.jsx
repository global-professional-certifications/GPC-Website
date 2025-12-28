import React from "react";

const DescriptiveGridCards = ({
    titleStart,
    highlight,
    titleEnd,
    description,
    cards = [],
}) => {
    return (
        <section className="px-6 bg-gray-50 md:px-12 lg:px-20 py-20">
            <div className="container mx-auto flex flex-col items-center text-center gap-12">

                {/* Heading */}
                <div className="max-w-4xl">
                    <h2 className="text-2xl md:text-4xl font-bold leading-tight text-gray-900 mb-6">
                        {titleStart}{" "}
                        <span className="text-brand-blue font-normal italic">
                            {highlight}{" "}
                        </span>
                        {titleEnd}
                    </h2>
                    <p className="max-w-3xl mx-auto text-gray-600 text-xs md:text-base font-poppins leading-relaxed">
                        {description}
                    </p>
                </div>

                {/* Flex Container for Cards (Centers trailing cards) */}
                <div className="flex flex-wrap justify-center gap-8 w-full max-w-7xl">
                    {cards.map((card, index) => (
                        <div
                            key={index}
                            className="group relative bg-white rounded-[2rem] p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.15)] hover:-translate-y-2 transition-all duration-500 border border-gray-100 flex flex-col items-center text-center overflow-hidden w-full sm:w-[calc(50%-2rem)] lg:w-[calc(33.33%-2rem)] max-w-[400px]"
                        >
                            {/* Decorative Background Element */}
                            <div className="absolute -right-4 -top-4 w-16 h-16 bg-brand-blue/5 rounded-full group-hover:scale-150 transition-transform duration-700"></div>

                            {/* Card Content */}
                            <p className="text-gray-700 text-sm md:text-base leading-relaxed font-semibold relative z-10">
                                {card.title && (
                                    <span className="block font-bold text-brand-blue text-lg mb-3">
                                        {card.title}
                                    </span>
                                )}
                                {card.text}
                            </p>

                            {/* Bottom Accent */}
                            <div className="w-12 h-1 bg-brand-blue/20 rounded-full mt-6 group-hover:w-24 group-hover:bg-brand-blue transition-all duration-500"></div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default DescriptiveGridCards;
