const ProcessFlow = ({ titleStart, highlight, titleEnd, subHeading, steps }) => {
    return (
        <section className="px-6 md:px-12 lg:px-20 py-16 bg-gray-50 relative overflow-hidden">
            <div className="container mx-auto relative z-10">
                {/* Heading */}
                <div className="text-center mb-16">
                    <h2 className="text-2xl md:text-4xl font-bold leading-tight">
                        {titleStart}{" "}
                        <span className="text-brand-blue font-normal italic">
                            {highlight}{" "}
                        </span>
                        {titleEnd}
                    </h2>

                    {subHeading && (
                        <p className="mt-4 text-gray-600 text-xs md:text-base max-w-3xl mx-auto font-poppins">
                            {subHeading}
                        </p>
                    )}
                </div>

                {/* Flow Container */}
                <div className="relative flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-6">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden lg:block absolute top-[2.5rem] left-[10%] right-[10%] h-0.5 border-t-2 border-dashed border-gray-300 z-0"></div>

                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center text-center relative w-full lg:w-1/4 group z-10"
                        >
                            {/* Step Number Badge */}
                            <div className="relative mb-6">
                                <div className="w-20 h-20 rounded-2xl bg-white border border-gray-200 shadow-lg flex items-center justify-center text-3xl text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-colors duration-300 relative z-10">
                                    {step.icon ? <step.icon className="w-10 h-10" /> : <span className="font-bold">{index + 1}</span>}
                                </div>

                                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-brand-blue text-white flex items-center justify-center text-sm font-bold shadow-md border-2 border-white z-20">
                                    {index + 1}
                                </div>
                            </div>

                            {/* Content Card */}
                            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 w-full">
                                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-brand-blue transition-colors duration-300">
                                    {step.title}
                                </h3>
                                <p className="text-gray-600 text-sm font-poppins leading-relaxed">
                                    {step.description}
                                </p>
                            </div>

                            {/* Mobile Connector */}
                            {index !== steps.length - 1 && (
                                <div className="lg:hidden w-0.5 h-12 border-l-2 border-dashed border-gray-300 my-4"></div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProcessFlow;
