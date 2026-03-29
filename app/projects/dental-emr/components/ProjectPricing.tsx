"use client";
import React from "react";

const plans = [
  {
    name: "Basic",
    price: "₹9,000",
    note: "For independent practitioners",
    features: [
      "Patient Records & Scheduling",
      "Basic Odontogram Charting",
      "Billing & Invoicing",
      "Data Export",
    ],
    highlight: false,
  },
  {
    name: "Mid",
    price: "₹12,500",
    note: "For expanding clinics",
    features: [
      "Everything in Basic",
      "Pharmacy Management",
      "HRMS Module",
      "Advanced Analytics",
    ],
    highlight: true,
  },
  {
    name: "Pro",
    price: "₹15,000",
    note: "Enterprise & multi-clinic",
    features: [
      "Everything in Mid",
      "Multi-Clinic Support",
      "Automated Reception",
 
    ],
    highlight: false,
  },
];

interface ProjectPricingProps {
  onOpenDemo: () => void;
}

export default function ProjectPricing({ onOpenDemo }: ProjectPricingProps) {
  return (
    <section className="px-6 md:px-10 py-24 md:py-32 max-w-[1400px] mx-auto w-full">
      <div className="mb-16 flex flex-col gap-4">
        <div className="sr-label flex items-center gap-3">
          <div className="w-8 h-px bg-black/25" />
          <span className="text-[0.58rem] font-black tracking-[0.3em] uppercase text-black/35">
            Scalable Solutions
          </span>
        </div>
        <h2
          className="sr-heading font-heading font-black tracking-[-0.04em] leading-[0.9] uppercase"
          style={{ fontSize: "clamp(2rem, 3.5vw, 3.2rem)" }}
        >
          Subscription
          <br />
          <span className="text-black/20">plans</span>
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {plans.map((plan, i) => (
          <div
            key={i}
            className={`price-card relative rounded-2xl p-8 md:p-10 flex flex-col gap-7 transition-all duration-300 ${
              plan.highlight
                ? "bg-[#0a0a0a] text-white shadow-[0_40px_80px_rgba(0,0,0,0.18)] border border-white/[0.07]"
                : "bg-white text-black border border-black/[0.08] shadow-[0_8px_30px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.1)] hover:-translate-y-1"
            } ${plan.highlight ? "md:scale-[1.03] z-10" : ""}`}
          >
            {plan.highlight && (
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#00f5ff]/60 to-transparent" />
            )}
            <div>
              <h3
                className={`text-[0.78rem] font-black uppercase tracking-[0.1em] mb-1.5 ${plan.highlight ? "text-white" : "text-black"}`}
              >
                {plan.name}
              </h3>
              <p
                className={`text-[0.72rem] ${plan.highlight ? "text-white/40" : "text-black/40"}`}
              >
                {plan.note}
              </p>
            </div>
            <div className="flex items-baseline gap-2">
              <span
                className={`font-heading font-black tracking-tight ${plan.highlight ? "text-[#00f5ff]" : "text-black"}`}
                style={{ fontSize: "clamp(2.2rem, 4vw, 2.8rem)" }}
              >
                {plan.price}
              </span>
              <span
                className={`text-[0.58rem] font-bold uppercase tracking-widest ${plan.highlight ? "text-white/30" : "text-black/30"}`}
              >
                /mo
              </span>
            </div>
            <div className="flex flex-col gap-3 flex-1">
              {plan.features.map((f, j) => (
                <div
                  key={j}
                  className={`flex items-start gap-3 text-[0.78rem] font-medium ${plan.highlight ? "text-white/60" : "text-black/55"}`}
                >
                  <span
                    className={`mt-0.5 ${plan.highlight ? "text-[#00f5ff]" : "text-black/20"}`}
                  >
                    ✔
                  </span>
                  {f}
                </div>
              ))}
            </div>
            <button
              onClick={onOpenDemo}
              className={`w-full py-3.5 rounded-xl text-[0.62rem] font-black tracking-[0.1em] uppercase transition-all duration-300 ${
                plan.highlight
                  ? "bg-white text-black hover:bg-white/90"
                  : "bg-black/[0.05] text-black hover:bg-black hover:text-white border border-black/[0.08]"
              }`}
            >
              Get started
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
