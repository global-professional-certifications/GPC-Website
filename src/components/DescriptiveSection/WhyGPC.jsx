import { FaGlobe, FaUserCheck, FaChalkboardTeacher, FaClock } from "react-icons/fa";

const WhyGPC = () => {
  return (
    <section className="px-6 md:px-12 lg:px-20 py-16 bg-gray-50">
      <div className="container mx-auto text-center">

        {/* Heading */}
        <h2 className="text-2xl md:text-4xl font-bold text-gray-900">
          Why <span className="text-brand-blue italic font-normal">Global Professional Certifications?</span>
        </h2>

        <p className="mt-4 text-gray-600 text-xs md:text-base max-w-3xl mx-auto font-poppins">
          Global Professional Certifications is one of the best CIA training providers in India for the following reasons:
        </p>

        {/* Grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Item 1 */}
          <div className="flex flex-col justify-start items-center gap-3 border-2 border-brand-blue p-4 rounded-lg">
            <div className="w-16 h-16 flex items-center justify-center rounded-lg bg-brand-blue shadow-sm">
              <FaGlobe className="text-white text-2xl" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              Globally Acknowledged
            </h3>
            <p className="text-gray-600 text-sm font-poppins">
              CIA certifications of Global Professional Certifications are IIA registered which gives global recognition to the candidates creating higher earning potential.
            </p>
          </div>

          {/* Item 2 */}
          <div className="flex flex-col justify-start items-center gap-3 border-2 border-brand-blue p-4 rounded-lg">
            <div className="w-16 h-16 flex items-center justify-center rounded-lg bg-brand-blue shadow-sm">
              <FaUserCheck className="text-white text-2xl" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              One-on-one Support
            </h3>
            <p className="text-gray-600 text-sm font-poppins">
              Complete support for your certification journey to ensure candidate success at each step.
            </p>
          </div>

          {/* Item 3 */}
          <div className="flex flex-col justify-start items-center gap-3 border-2 border-brand-blue p-4 rounded-lg">
            <div className="w-16 h-16 flex items-center justify-center rounded-lg bg-brand-blue shadow-sm">
              <FaChalkboardTeacher className="text-white text-2xl" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              Industry-expert Mentors
            </h3>
            <p className="text-gray-600 text-sm font-poppins">
              Experienced CIA training provider in India who gives industry relevant practical insights necessary for modern professionals.
            </p>
          </div>

          {/* Item 4 */}
          <div className="flex flex-col justify-start items-center gap-3 border-2 border-brand-blue p-4 rounded-lg bg-gray-100">
            <div className="w-16 h-16 flex items-center justify-center rounded-lg bg-brand-blue shadow-sm">
              <FaClock className="text-white text-2xl" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              Attending Flexibility
            </h3>
            <p className="text-gray-600 text-sm font-poppins">
              Flexibility to join weekend online classes with 100% recording sessions for learning the important concepts at your pace.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhyGPC;
