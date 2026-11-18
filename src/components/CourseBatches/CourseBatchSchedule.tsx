import React from "react";
import { FaArrowRightLong, FaArrowUpRightFromSquare, FaRegCalendar } from "react-icons/fa6";
import { Link } from "../routing";
import type { CmsList } from "../../types/cms";

/*
 * "Live Batch Schedule & Upcoming Cohort Timelines" header block.
 *
 * Left: heading, paragraph and a "More Updates" link to /upcoming.
 * Right: one card per batch (course name, starting date, "View Details" which
 * opens the uploaded schedule PDF/image). Batches are `courseBatch` documents
 * managed in Sanity under Courses -> <course> -> Upcoming Batches, fetched by
 * the course page's server route.
 */

type Props = {
  batches?: CmsList;
  description: string;
};

// Fixed locale and UTC so the server and browser render the same text.
const formatDate = (date?: string) =>
  date
    ? new Date(`${date}T00:00:00Z`).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric", timeZone: "UTC" })
    : "To be announced";

export default function CourseBatchSchedule({ batches = [], description }: Props) {
  return (
    <div className="font-poppins flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10 lg:gap-12 py-6 md:py-10">
      {/* Left: text + CTA */}
      <div className="flex-1 lg:max-w-2xl text-center lg:text-left">
        <h2 className="text-2xl md:text-4xl font-bold text-gray-900 leading-tight">
          Live <span className="text-brand-blue font-normal italic">Batch Schedule</span> &amp; Upcoming Cohort Timelines
        </h2>
        <p className="mt-4 text-sm md:text-base text-gray-600 leading-relaxed">{description}</p>
        <Link
          to="/upcoming#batches"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-brand-blue px-6 py-3 text-sm md:text-base font-semibold text-white shadow-md transition-all duration-300 hover:bg-brand-purple hover:shadow-lg"
        >
          More Updates
          <FaArrowRightLong className="h-4 w-4" />
        </Link>
      </div>

      {/* Right: batch cards */}
      <div className="lg:flex-shrink-0 lg:max-w-[41.25rem]">
        {batches.length > 0 ? (
          <ul className="flex flex-wrap justify-center lg:justify-end gap-4 md:gap-5">
            {batches.map((batch) => (
              <li key={batch._id} className="flex w-full sm:w-80 flex-col rounded-2xl border border-gray-200 bg-white p-6 md:p-7 shadow-sm transition-shadow duration-300 hover:shadow-md">
                <div className="flex items-start gap-3">
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-brand-blue/10 text-brand-blue">
                    <FaRegCalendar className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <h3 className="text-base font-bold text-gray-900 leading-snug">{batch.title}</h3>
                </div>
                <div className="mt-5 flex-1 rounded-xl bg-gray-50 px-4 py-4">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">Starting Date</p>
                  <p className="mt-0.5 text-sm font-semibold text-brand-blue">{formatDate(batch.startDate)}</p>
                </div>
                {batch.scheduleUrl && (
                  <a
                    href={batch.scheduleUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl border-2 border-brand-blue px-4 py-2.5 text-sm font-semibold text-brand-blue transition-colors duration-300 hover:bg-brand-blue hover:text-white"
                  >
                    View Details
                    <FaArrowUpRightFromSquare className="h-3 w-3" />
                  </a>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <div className="mx-auto w-full sm:w-80 rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-12 text-center">
            <FaRegCalendar className="mx-auto h-6 w-6 text-brand-blue" aria-hidden="true" />
            <p className="mt-3 text-sm font-semibold text-gray-900">New batches will be announced soon.</p>
            <p className="mt-1 text-sm text-gray-500">Check our upcoming page for the latest schedule.</p>
          </div>
        )}
      </div>
    </div>
  );
}
