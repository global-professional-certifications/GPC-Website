const WhyGPC = ({ subHeading, items }) => {
  return (
    <section className="px-6 md:px-12 lg:px-20 py-16 bg-gray-50">
      <div className="container mx-auto text-center">

        {/* Heading */}
        <h2 className="text-2xl md:text-4xl font-bold leading-tight">
          Why{" "}
          <span className="text-brand-blue font-normal italic">
            Global Professional Certifications?
          </span>
        </h2>

        {subHeading && (
          <p className="mt-4 text-gray-600 text-xs md:text-base max-w-3xl mx-auto font-poppins">
            {subHeading}
          </p>
        )}

        {/* Grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {items.map((item, index) => (
            <div
              key={index}
              className="flex flex-col justify-start items-center gap-3 border-2 border-brand-blue p-4 rounded-lg"
            >
              {/* Icon */}
              <div className="w-16 h-16 flex items-center justify-center rounded-lg bg-brand-blue shadow-sm">
                {item.icon}
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-gray-900">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-sm font-poppins">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhyGPC;
