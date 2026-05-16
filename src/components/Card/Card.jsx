import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function Card({
  image,
  title,
  price,
  text,
  linkTo,
  enrollLink,
  gst,
  imageStyle = ""
}) {
  return (
    <div className="group relative mt-4 md:mt-6 w-[18rem] min-h-[26rem] flex flex-col rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl overflow-hidden">

      {/* IMAGE SECTION */}
      <div
        className={`relative mx-4 mt-4 flex h-52 items-center justify-center overflow-hidden rounded-xl bg-gray-50 ${imageStyle}`}
      >
        <Link to={linkTo}>
          <img
            src={image}
            alt={title}
            className="h-auto w-full object-contain transition-transform duration-500 group-hover:scale-105"
          />
        </Link>
      </div>

      {/* CONTENT */}
      <div className="flex flex-col flex-1 px-5 pt-4 pb-5">

        {/* TITLE */}
        <Link to={linkTo}>
          <h3 className="text-xl font-bold text-gray-900 leading-tight min-h-[3.5rem] group-hover:text-brand-blue transition-colors">
            {title}
          </h3>
        </Link>

        {/* DESCRIPTION */}
        <p className="mt-2 text-sm text-gray-600 leading-tight min-h-[4.5rem]">
          {text}
        </p>

        {/* FOOTER */}
        <div className="mt-auto flex justify-between items-end border-t border-gray-100 pt-4">

          {/* PRICE */}
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-gray-900">
              ₹{price}
            </span>
            <span className="text-xs text-gray-500 mt-1">
              {gst}
            </span>
          </div>

          {/* BUTTON */}
          <Link
            to={enrollLink}
            target="_blank"
            className="rounded-xl bg-brand-blue px-4 py-2 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:bg-brand-purple hover:shadow-lg"
          >
            Enroll Now
          </Link>
        </div>
      </div>
    </div>
  );
}
