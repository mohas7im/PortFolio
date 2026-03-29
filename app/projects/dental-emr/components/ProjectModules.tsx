"use client";
import React, { useEffect, useRef, useState } from "react";
import NextImage from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const modules = [
  {
    num: "01",
    label: "Doctor Admin",
    desc: "A unified command centre for clinical staff. Manage appointments, patient queues, treatment histories, and monitor daily clinic operations from one elegant interface.",
    image: "/icons/software1.png",
    tag: "Clinical Core",
  },
  {
    num: "02",
    label: "Automated Reception",
    desc: "Streamlined patient check-in and queue management. Let AI handle walk-ins, follow-up scheduling, and consent forms effortlessly.",
    image: "/icons/software2.png",
    tag: "Front Desk",
  },
  {
    num: "03",
    label: "Patient Records",
    desc: "Interactive adult and pediatric dental charting with visual tooth mapping. Diagnose, plot treatments, and communicate findings chairside with extreme precision.",
    image: "/icons/software1.png",
    tag: "Charting",
  },
  {
    num: "04",
    label: "Pharmacy Module",
    desc: "End-to-end drug dispensing, automated inventory control, low-stock alerts, and fast pharmacy billing integrated directly with prescriptions.",
    image: "/icons/software2.png",
    tag: "Operations",
  },
  {
    num: "05",
    label: "HRMS & Payroll",
    desc: "Comprehensive staff management. Oversee doctor productivity, shifts, leave requests, automated salary calculation, and role-based permissions.",
    image: "/icons/software1.png",
    tag: "Management",
  },
  {
    num: "06",
    label: "Billing & Analytics",
    desc: "Auto-generated invoicing tightly coupled with treatment records. Real-time dashboards for revenue trends, clinic growth, and patient retention metrics.",
    image: "/icons/software2.png",
    tag: "Finance",
  },
];

interface ProjectModulesProps {
  onOpenDemo: () => void;
}

export default function ProjectModules({ onOpenDemo }: ProjectModulesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeModule, setActiveModule] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;
    
    // We use GSAP ScrollTrigger instead of IntersectionObserver for perfect syncing
    // with smooth scroll and no threshold misses.
    const ctx = gsap.context(() => {
      const slots = gsap.utils.toArray<HTMLElement>(".module-slot");
      
      slots.forEach((slot, index) => {
        ScrollTrigger.create({
          trigger: slot,
          start: "top center", 
          end: "bottom center",
          onToggle: (self: any) => {
            if (self.isActive) {
              setActiveModule(index);
            }
          }
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full">
      {/* Scroll container */}
      <div
        className="relative w-full"
        style={{ height: `${modules.length * 80}vh` }}
      >
        {/* Sticky panel */}
        <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center pt-24 pb-10 lg:py-20">
          
          {/* HEADER (Now pinned inside sticky area) */}
          <div className="w-full max-w-[1400px] mx-auto px-6 md:px-10 flex flex-col md:flex-row md:items-end justify-between gap-4 lg:gap-8 mb-6 lg:mb-12">
            <div>
              <div className="sr-label flex items-center gap-3 mb-4 mt-12 md:mt-0">
                <div className="w-8 h-px bg-black/25" />
                <span className="text-[0.58rem] font-black tracking-[0.3em] uppercase text-black/35">
                  Platform Modules
                </span>
              </div>
              <h2
                className="sr-heading font-heading font-black tracking-[-0.04em] leading-[0.9] uppercase"
                style={{ fontSize: "clamp(2rem, 3.5vw, 3.2rem)" }}
              >
                Built for every <span className="text-black/20">workflow</span>
              </h2>
            </div>
            
            {/* Visual indicator of progress */}
            <div className="hidden lg:flex items-center gap-3 mb-2">
              {modules.map((_, i) => (
                <div
                  key={i}
                  className="transition-all duration-500 rounded-full"
                  style={{
                    width: activeModule === i ? 28 : 8,
                    height: 4,
                    background:
                      activeModule === i ? "#0a0a0a" : "rgba(0,0,0,0.15)",
                  }}
                />
              ))}
            </div>
          </div>

          <div className="w-full max-w-[1400px] mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-12 lg:gap-24 items-center">
            {/* ── LEFT: cycling text ── */}
            <div className="relative flex flex-col justify-center h-full">
              {/* Text panels — stacked + CSS transition between them */}
              <div className="relative overflow-hidden w-full h-[250px] md:h-[280px] lg:h-[340px]">
                {modules.map((mod, i) => (
                  <div
                    key={i}
                    className="absolute inset-0 flex flex-col justify-center gap-7"
                    style={{
                      opacity: activeModule === i ? 1 : 0,
                      transform:
                        activeModule === i
                          ? "translateY(0px)"
                          : activeModule < i
                            ? "translateY(48px)"
                            : "translateY(-48px)",
                      transition:
                        "opacity 0.65s cubic-bezier(0.16,1,0.3,1), transform 0.65s cubic-bezier(0.16,1,0.3,1)",
                      pointerEvents: activeModule === i ? "auto" : "none",
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-[0.58rem] font-black tracking-[0.3em] uppercase text-black/30">
                        {mod.num} / 0{modules.length}
                      </span>
                      <span className="text-[0.52rem] font-black tracking-[0.2em] uppercase text-black/30 px-3 py-1 bg-black/[0.04] rounded-full border border-black/[0.06]">
                        {mod.tag}
                      </span>
                    </div>

                    <h3
                      className="font-heading font-black tracking-[-0.03em] leading-[0.9] uppercase"
                      style={{ fontSize: "clamp(2rem, 3.8vw, 3.5rem)" }}
                    >
                      {mod.label}
                    </h3>

                    <p
                      className="text-black/50 leading-[1.6] md:leading-[1.85] max-w-[38ch]"
                      style={{ fontSize: "clamp(0.78rem, 1.1vw, 0.94rem)" }}
                    >
                      {mod.desc}
                    </p>

                    <button
                      onClick={onOpenDemo}
                      className="group w-fit flex items-center gap-3 text-[0.58rem] font-black tracking-[0.15em] uppercase text-black/35 hover:text-black transition-colors duration-300"
                    >
                      See it in action
                      <span className="group-hover:translate-x-1 transition-transform duration-300">
                        →
                      </span>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* ── RIGHT: crossfading images ── */}
            <div className="relative h-[32vh] md:h-[40vh] lg:h-[55vh] max-h-[580px] w-full mt-4 lg:mt-0">
              {modules.map((mod, i) => (
                <div
                  key={i}
                  className="absolute inset-0 rounded-2xl overflow-hidden"
                  style={{
                    opacity: activeModule === i ? 1 : 0,
                    transform:
                      activeModule === i
                        ? "scale(1) translateX(0px)"
                        : "scale(0.97) translateX(40px)",
                    transition:
                      "opacity 0.75s cubic-bezier(0.16,1,0.3,1), transform 0.75s cubic-bezier(0.16,1,0.3,1)",
                  }}
                >
                  {/* Browser chrome */}
                  <div className="absolute inset-0 rounded-2xl overflow-hidden bg-[#0a0a0a] border border-black/[0.07] shadow-[0_30px_80px_rgba(0,0,0,0.18)] flex flex-col">
                    <div className="flex items-center gap-1.5 px-4 py-2.5 bg-[#161616] border-b border-white/[0.05] shrink-0">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                      <div className="flex-1 mx-4 py-0.5 px-3 bg-[#0a0a0a] rounded text-[0.46rem] text-white/20 font-mono">
                        dental-emr.app /{" "}
                        {mod.label.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-")}
                      </div>
                    </div>
                    <div className="relative flex-1">
                      <NextImage
                        src={mod.image}
                        alt={mod.label}
                        fill
                        className="object-cover object-left-top"
                        unoptimized
                      />
                      <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
                      <div className="absolute bottom-4 left-4">
                        <div className="px-3 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-[0.46rem] font-black tracking-[0.2em] uppercase text-white/80">
                          Module {mod.num}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Invisible scroll slots — each drives which module is active via GSAP */}
        {modules.map((_, i) => (
          <div
            key={i}
            className="module-slot absolute w-full pointer-events-none"
            style={{
              top: `${(i / modules.length) * 100}%`,
              height: `${(1 / modules.length) * 100}%`,
            }}
          />
        ))}
      </div>
    </section>
  );
}
