"use client";
import React from "react";

export default function ProjectMarquee() {
  return (
    <section className="overflow-hidden border-y border-black/[0.06] py-4 bg-[#ebebed]">
      <div
        className="flex gap-14 whitespace-nowrap"
        style={{ animation: "marquee-slide 28s linear infinite" }}
      >
        {Array.from({ length: 5 }).flatMap((_, gi) =>
          [
            "Dental Charting",
            "HRMS & Payroll",
            "Pharmacy Module",
            "Multi-Clinic SaaS",
            "Patient CRM",
            "Appointment Engine",
            "Lab & Prescriptions",
            "Analytics Suite",
          ].map((t, i) => (
            <span
              key={`${gi}-${i}`}
              className="text-[0.58rem] font-black uppercase tracking-[0.25em] text-black/25 flex items-center gap-5 shrink-0"
            >
              {t} <span className="text-black/12">·</span>
            </span>
          )),
        )}
      </div>
    </section>
  );
}
