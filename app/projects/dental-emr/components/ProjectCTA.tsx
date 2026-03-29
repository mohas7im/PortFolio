"use client";
import React from "react";

interface ProjectCTAProps {
  onOpenDemo: () => void;
}

export default function ProjectCTA({ onOpenDemo }: ProjectCTAProps) {
  return (
    <section className="px-6 md:px-10 py-24 md:py-40 relative overflow-hidden bg-[#0a0a0a] w-full">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[700px] h-[400px] bg-[#00f5ff]/[0.035] rounded-full blur-[150px]" />
      </div>
      <div className="cta-block max-w-[1400px] mx-auto flex flex-col md:flex-row items-start md:items-end justify-between gap-12 relative z-10 w-full">
        <div>
          <div className="text-[0.58rem] font-black tracking-[0.3em] uppercase text-white/25 mb-6">
            Ready to upgrade?
          </div>
          <h2
            className="font-heading font-black tracking-[-0.04em] leading-[0.88] uppercase text-white"
            style={{ fontSize: "clamp(2.5rem, 5vw, 5rem)" }}
          >
            See the platform
            <br />
            <span className="text-white/20">in action</span>
          </h2>
        </div>
        <div className="flex flex-col gap-4 min-w-fit">
          <button
            onClick={onOpenDemo}
            className="group px-10 py-4 bg-white text-black text-[0.62rem] font-black tracking-[0.12em] uppercase rounded-full flex items-center justify-center gap-3 hover:bg-white/90 hover:scale-[1.02] transition-all duration-300 shadow-2xl"
          >
            Request a demo
            <span className="group-hover:translate-x-1 transition-transform duration-300 text-black/25">
              →
            </span>
          </button>
          <p className="text-[0.58rem] text-white/20 font-bold uppercase tracking-[0.15em] text-center">
            No commitment required
          </p>
        </div>
      </div>
    </section>
  );
}
