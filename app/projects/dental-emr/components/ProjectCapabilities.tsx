"use client";
import React from "react";

const capabilities = [
  {
    icon: "🦷",
    title: "Advanced Odontogram",
    desc: "Interactive adult and pediatric dental charting. Visualise, diagnose, and communicate findings precisely.",
  },
  {
    icon: "📈",
    title: "CRM & Pipelines",
    desc: "Track leads, automate follow-ups, and convert patient inquiries at scale.",
  },
  {
    icon: "💊",
    title: "Pharmacy Module",
    desc: "Inventory management, auto-billing, and precise drug dispensing.",
  },
  {
    icon: "👥",
    title: "HRMS & Payroll",
    desc: "Staff management, shifts, salaries, and role-based permissions.",
  },
  {
    icon: "🏢",
    title: "Multi-Clinic Core",
    desc: "One owner. Multiple branches. Centralised reporting and analytics.",
  },
  {
    icon: "📊",
    title: "Analytics Suite",
    desc: "Revenue trends, patient retention, and KPI dashboards in real-time.",
  },
];

export default function ProjectCapabilities() {
  return (
    <section className="px-6 md:px-10 py-24 md:py-32 bg-[#0a0a0a] relative overflow-hidden flex-col">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#00f5ff]/[0.03] rounded-full blur-[120px] pointer-events-none" />
      <div className="max-w-[1400px] mx-auto relative z-10 w-full">
        <div className="mb-16 flex flex-col gap-4">
          <div className="sr-label flex items-center gap-3">
            <div className="w-8 h-px bg-white/25" />
            <span className="text-[0.58rem] font-black tracking-[0.3em] uppercase text-white/30">
              Ecosystem
            </span>
          </div>
          <h2
            className="sr-heading font-heading font-black tracking-[-0.04em] leading-[0.9] uppercase text-white"
            style={{ fontSize: "clamp(2rem, 3.5vw, 3.2rem)" }}
          >
            Full-stack
            <br />
            <span className="text-white/20">capabilities</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
          {capabilities.map((cap, i) => (
            <div
              key={i}
              className="cap-card p-8 bg-white/[0.04] border border-white/[0.06] rounded-2xl flex flex-col gap-5 hover:bg-white/[0.07] hover:border-white/[0.12] transition-all duration-300 group"
            >
              <div className="w-11 h-11 rounded-xl bg-white/[0.05] border border-white/[0.07] flex items-center justify-center text-xl group-hover:bg-[#00f5ff]/10 group-hover:border-[#00f5ff]/20 transition-all duration-300">
                {cap.icon}
              </div>
              <div>
                <h3 className="text-[0.78rem] font-black uppercase tracking-tight text-white mb-2">
                  {cap.title}
                </h3>
                <p className="text-white/40 text-[0.78rem] leading-[1.7]">
                  {cap.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
