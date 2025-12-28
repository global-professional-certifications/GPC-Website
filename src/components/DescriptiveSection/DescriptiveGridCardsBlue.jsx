import React from "react";

const DescriptiveGridCardsBlue = ({
    titleStart,
    highlight,
    titleEnd,
    description,
    cards = [],
}) => {
    return (
        <section className="px-6 bg-brand-blue md:px-12 lg:px-20 py-20 relative overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/5 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="container mx-auto flex flex-col items-center text-center gap-12 relative z-10">

                {/* Heading */}
                <div className="max-w-4xl">
                    <h2 className="text-2xl md:text-4xl font-bold leading-tight text-white mb-6">
                        {titleStart}{" "}
                        <span className="text-orange-300 font-normal italic">
                            {highlight}{" "}
                        </span>
                        {titleEnd}
                    </h2>
                    <p className="max-w-3xl mx-auto text-gray-300 text-xs md:text-base font-poppins leading-relaxed">
                        {description}
                    </p>
                </div>

                {/* Centered Cards Container */}
                <div className="flex flex-wrap justify-center gap-6 w-full max-w-7xl">
                    {cards.map((card, index) => (
                        <div
                            key={index}
                            className="group relative bg-white/10 backdrop-blur-md rounded-[2.5rem] p-6 shadow-2xl hover:bg-white transition-all duration-500 flex flex-col items-center text-center border border-white/20 hover:border-white w-full sm:w-[calc(50%-1.5rem)] lg:w-[calc(33.33%-1.5rem)] max-w-[420px]"
                        >

                            <p className="text-white group-hover:text-gray-800 text-sm md:text-base leading-relaxed font-poppins transition-colors duration-300">
                                {card.title && (
                                    <span className="block font-bold text-orange-300 group-hover:text-brand-blue text-lg mb-4 tracking-tight">
                                        {card.title}
                                    </span>
                                )}
                                {card.text}
                            </p>

                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default DescriptiveGridCardsBlue;
