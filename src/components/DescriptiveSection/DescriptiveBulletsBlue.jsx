import { FaArrowRight } from "react-icons/fa";

const DescriptiveBulletsBlue = ({
  titleStart,
  highlight,
  titleEnd,
  points,
  description,
  image,
  imageAlt,
}) => {
  return (
    <section className="px-6 bg-brand-blue md:px-12 lg:px-20 py-16">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row justify-center items-center gap-12">

          {/* Image */}
          <div className="w-full md:w-[50%] flex justify-center lg:justify-start">
            <img
              src={image}
              alt={imageAlt}
              className="w-full h-auto md:w-[35vw] object-contain rounded-xl shadow-md"
            />
          </div>

          {/* Text */}
          <div className="w-full md:w-[50%] text-left flex flex-col gap-6">

            {/* Heading (unchanged hierarchy & style intent) */}
            <h2 className="text-2xl md:text-4xl font-bold leading-tight text-white">
              {titleStart}{" "}
              <span className="text-orange-300 font-normal italic">
                {highlight}{" "}
              </span>
              {titleEnd}
            </h2>

            {/* Description */}
            <p className="text-gray-300 text-xs md:text-base font-poppins leading-relaxed max-w-2xl">
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
                  <FaArrowRight className="text-orange-300 mt-1 flex-shrink-0" />

                  {/* Text */}
                  <p className="text-gray-200 text-xs md:text-base font-poppins leading-relaxed">
                    {point.title && (
                      <span className="font-semibold text-orange-300">
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

export default DescriptiveBulletsBlue;
