import React from "react";

/*
 * Two-column "Program Milestone | Specification & Limits" table.
 * Used on the CIA and IAP course pages.
 */

export type ExamTimelineRow = { milestone: string; spec: string };

type Props = {
  id?: string;
  titleStart: string;
  highlight: string;
  titleEnd?: string;
  description?: string;
  rows: ExamTimelineRow[];
};

export default function ExamTimelineTable({ id = "exam-timeline", titleStart, highlight, titleEnd = "", description, rows }: Props) {
  return (
    <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 font-poppins" id={id}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-2xl md:text-4xl font-bold">
            {titleStart} <span className="text-brand-blue font-normal italic">{highlight}</span> {titleEnd}
          </h2>
          {description && (
            <p className="mt-4 text-sm md:text-base text-gray-600 leading-relaxed max-w-3xl mx-auto">{description}</p>
          )}
        </div>

        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-brand-blue">
                <th scope="col" className="px-4 md:px-6 py-4 text-sm font-semibold text-white md:w-2/5">Program Milestone</th>
                <th scope="col" className="px-4 md:px-6 py-4 text-sm font-semibold text-white">Specification &amp; Limits</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {rows.map((item) => (
                <tr key={item.milestone} className="align-top transition-colors hover:bg-gray-50">
                  <th scope="row" className="px-4 md:px-6 py-4 md:py-5 text-sm font-bold text-gray-900">{item.milestone}</th>
                  <td className="px-4 md:px-6 py-4 md:py-5 text-sm text-gray-600 leading-relaxed">{item.spec}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
