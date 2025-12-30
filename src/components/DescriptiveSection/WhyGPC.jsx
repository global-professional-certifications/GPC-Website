import { motion } from 'framer-motion';

const WhyGPC = ({ subHeading, items }) => {
  return (
    <section className="relative px-6 md:px-12 lg:px-20 py-16 bg-gray-50 overflow-hidden">

      <div className="container mx-auto text-center relative z-10">
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
            <motion.div
              key={index}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="group flex flex-col justify-start items-center gap-3 bg-white/40 backdrop-blur-md border border-white/60 p-6 rounded-2xl shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] hover:shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] transition-all duration-300"
            >
              {/* Icon Container */}
              <div className="w-16 h-16 flex items-center justify-center rounded-xl bg-brand-blue shadow-lg group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-gray-900 mt-2">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-sm font-poppins leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyGPC;
