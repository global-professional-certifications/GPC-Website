import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function Card({
  image = "https://flowbite.com/docs/images/blog/image-1.jpg",
  title = "CIA Part 1",
  price = 23599,
  text = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic, inventore.",
  linkTo = "/courses/cia",
  enrollLink = "https://rzp.io/rzp/iFUFvKph",
  imageStyle = "object-cover w-full",
  gst = "Including GST",
}) {
  return (
    <div
      className="relative mx-2 md:mt-10 w-[20rem] md:w-[17.5rem] flex-col rounded-lg border border-gray-300 bg-white shadow-lg hover:shadow-xl transition-shadow"
    >
      <div className="relative mx-3 mt-3 flex justify-center h-60 items-center overflow-hidden rounded-lg">
        <Link to={linkTo}>
          <img className={imageStyle} src={image} alt={title} />
        </Link>
      </div>
      <div className="mt-4 px-5 pb-5 flex flex-col">
        <div className="flex flex-col mb-4">
          <Link to={linkTo}>
            <h3 className="text-xl font-bold tracking-tight text-brand-dark">{title}</h3>
          </Link>
          <p className="pt-2 text-sm text-brand-gray overflow-hidden">
            {text}
          </p>
        </div>
        <div className="flex justify-between items-end">
          <div className="flex flex-col text-sm justify-center">
            <p>
              <span className="font-bold text-base text-gray-800">INR {price}</span>
            </p>
            <p className="text-xs text-brand-gray">{gst}</p>
          </div>
          <Link
            to={enrollLink}
            target="_blank"
            className="flex items-center justify-center rounded-md bg-brand-blue px-4 py-2 text-center font-medium text-white hover:bg-brand-purple focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            Enroll Now
            <FaArrowRightLong className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}