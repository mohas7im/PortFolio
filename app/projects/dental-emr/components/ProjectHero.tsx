"use client";
import React from "react";
import NextImage from "next/image";
import Link from "next/link";

interface ProjectHeroProps {
  onOpenDemo: () => void;
}

export default function ProjectHero({ onOpenDemo }: ProjectHeroProps) {
  return (
    <section className="relative pt-[110px] pb-16 px-6 md:px-10 min-h-screen flex flex-col justify-center max-w-[1600px] mx-auto">
 

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.7fr] gap-10 lg:gap-14 items-center">
        {/* Left text */}
        <div className="flex flex-col gap-7">
          <div className="h-eyebrow flex items-center gap-3">
            <div className="w-8 h-px bg-black/25" />
            <span className="text-[0.58rem] font-black tracking-[0.3em] uppercase text-black/35">
              Case Study · 2026
            </span>
          </div>

          <h1
            className="font-heading leading-[0.88] font-black tracking-[-0.04em] uppercase"
            style={{ fontSize: "clamp(2.8rem, 5.5vw, 5rem)" }}
          >
            <span className="h-title-line block overflow-hidden">
              <span className="block">Dental</span>
            </span>
            <span className="h-title-line block overflow-hidden">
              <span className="block text-black/20">Practice</span>
            </span>
            <span className="h-title-line block overflow-hidden">
              <span className="block">EMR System</span>
            </span>
          </h1>

          <p
            className="h-desc text-black/50 leading-[1.85] max-w-[38ch]"
            style={{ fontSize: "clamp(0.82rem, 1.2vw, 0.95rem)" }}
          >
            A comprehensive, multi-clinic management platform orchestrating
            dental charting, scheduling, pharmacy, HRMS, and billing — all from
            one interface.
          </p>

          <div className="h-cta flex items-center gap-4 pt-2">
            <button
              onClick={onOpenDemo}
              className="group px-7 py-3.5 bg-black text-white text-[0.62rem] font-black tracking-[0.1em] uppercase rounded-full flex items-center gap-3 hover:bg-black/80 transition-all duration-300 shadow-lg hover:-translate-y-0.5"
            >
              Request Demo
              <span className="group-hover:translate-x-1 transition-transform duration-300 text-white/35">
                →
              </span>
            </button>
           
          </div>
        </div>

        {/* Right – dashboard mockup sliding from right */}
        <div className="hero-mockup relative">
          <div className="relative w-full rounded-2xl overflow-hidden bg-[#0a0a0a] shadow-[0_40px_100px_rgba(0,0,0,0.22)] border border-black/[0.07]">
            {/* Browser bar */}
            <div className="flex items-center gap-1.5 px-4 py-3 bg-[#161616] border-b border-white/[0.04] shrink-0">
              <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
              <div className="flex-1 mx-4 py-1 px-3 bg-[#0a0a0a] rounded text-[0.48rem] text-white/20 font-mono">
                dentexis/dashboard
              </div>
            </div>
            {/* Full image — no fixed height, shows completely */}
            <NextImage
              src="/icons/software1.png"
              alt="Dental EMR Dashboard"
              width={1920}
              height={1080}
              className="w-full h-auto block"
              priority
              unoptimized
            />
          </div>
        </div>
      </div>

      {/* Meta strip */}
      <div className="mt-16 pt-10 border-t border-black/[0.07] grid grid-cols-2 md:grid-cols-4 gap-8">
        {[
          { label: "Role", value: "Full Stack Architect" },
          { label: "Stack", value: "Django · React · PostgreSQL" },
          { label: "Scale", value: "Multi-Tenant SaaS" },
        
        ].map((m, i) => (
          <div key={i} className="h-meta-item">
            <div className="text-[0.52rem] font-black uppercase tracking-[0.2em] text-black/30 mb-1.5">
              {m.label}
            </div>
            <div className="text-[0.82rem] font-bold text-black/65">
              {m.value}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
