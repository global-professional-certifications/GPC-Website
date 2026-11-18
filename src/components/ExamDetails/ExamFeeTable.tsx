import React from "react";

/*
 * Exam fee comparison table (IIA Member / Student Member / Non-Member).
 * Used on the CIA and IAP course pages. Table on tablet/desktop, one card per
 * fee component on mobile.
 */

export type ExamFee = { usd: string; inr?: string; note?: string };
export type ExamFeeRow = { component: string; member: ExamFee; student: ExamFee; nonMember: ExamFee };

type TierKey = "member" | "student" | "nonMember";

type Props = {
  id?: string;
  titleStart: string;
  highlight: string;
  titleEnd?: string;
  description?: string;
  rows: ExamFeeRow[];
  note?: React.ReactNode;
  /** Column names; the member column defaults to the IIA wording. */
  tierLabels?: Partial<Record<TierKey, string>>;
};

export default function ExamFeeTable({ id = "exam-fee", titleStart, highlight, titleEnd = "", description, rows, note, tierLabels = {} }: Props) {
  const FEE_TIERS: { key: TierKey; label: string }[] = [
    { key: "member", label: tierLabels.member ?? "IIA India Member" },
    { key: "student", label: tierLabels.student ?? "Student Member" },
    { key: "nonMember", label: tierLabels.nonMember ?? "Non-Member" },
  ];

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

        {/* Desktop / tablet: table */}
        <div className="hidden md:block overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-brand-blue">
                <th scope="col" className="px-6 py-4 text-sm font-semibold text-white">Fee Component</th>
                {FEE_TIERS.map((tier) => (
                  <th key={tier.key} scope="col" className="px-6 py-4 text-sm font-semibold text-white">
                    {tier.label}
                    <span className="block text-xs font-normal text-white/70">USD / INR approx.</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {rows.map((row) => (
                <tr key={row.component} className="align-top transition-colors hover:bg-gray-50">
                  <th scope="row" className="px-6 py-5 text-sm font-bold text-gray-900">{row.component}</th>
                  {FEE_TIERS.map((tier) => {
                    const fee = row[tier.key];
                    return (
                      <td key={tier.key} className="px-6 py-5 text-sm">
                        <span className="font-semibold text-brand-blue">{fee.usd}</span>
                        {fee.inr && <span className="ml-1.5 text-gray-500">({fee.inr})</span>}
                        {fee.note && <span className="block mt-1 text-xs text-gray-500">{fee.note}</span>}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile: one card per fee component */}
        <div className="md:hidden space-y-4">
          {rows.map((row) => (
            <div key={row.component} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <h3 className="text-base font-bold text-gray-900">{row.component}</h3>
              <dl className="mt-3 divide-y divide-gray-100">
                {FEE_TIERS.map((tier) => {
                  const fee = row[tier.key];
                  return (
                    <div key={tier.key} className="flex items-start justify-between gap-4 py-2.5">
                      <dt className="text-sm text-gray-500">{tier.label}</dt>
                      <dd className="text-right text-sm">
                        <span className="font-semibold text-brand-blue">{fee.usd}</span>
                        {fee.inr && <span className="ml-1 text-gray-500">({fee.inr})</span>}
                        {fee.note && <span className="block text-xs text-gray-500">{fee.note}</span>}
                      </dd>
                    </div>
                  );
                })}
              </dl>
            </div>
          ))}
          <p className="text-xs text-gray-500 text-center">All amounts in USD / INR approx.</p>
        </div>

        {note && (
          <div className="mt-6 rounded-xl border border-gray-200 bg-gray-50 px-5 py-4 text-sm text-gray-600 leading-relaxed">
            {note}
          </div>
        )}
      </div>
    </section>
  );
}
