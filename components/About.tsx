"use client";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current, {
        scrollTrigger: { trigger: sectionRef.current, start: "top 85%", once: true },
        y: 60, opacity: 0, duration: 0.9, ease: "power2.out",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="py-32 px-10 relative bg-bg border-t border-white/[0.08] z-[2]">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-[0.65rem] tracking-[0.2em] text-white/30 mb-8 uppercase font-bold flex items-center gap-3">
          <div className="w-8 h-px bg-white/30" />
          05 — SYSTEM ARCHITECT
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-20 items-center">
          {/* Left */}
          <div className="flex flex-col gap-8">
            <h2 className="font-heading text-[clamp(3.5rem,7vw,6.5rem)] leading-[0.9] font-bold tracking-[-0.04em] uppercase">
              BUILDING ROBUST<br />DIGITAL SYSTEMS
            </h2>
            <p className="text-[1.1rem] leading-[1.8] text-white/50 max-w-[550px]">
              Full stack developer dedicated to architecting scalable, high-performance web applications.
              Bridging complex backend logic with seamless frontend experiences.
            </p>
            <div className="inline-flex items-center self-start text-[0.65rem] font-bold text-white/80 tracking-[0.15em] px-6 py-3 border border-white/[0.15] bg-white/[0.02] uppercase mt-4">
              <span className="w-2 h-2 bg-cyan shadow-[0_0_10px_#00F5FF] rounded-full animate-blink inline-block mr-4" />
              STATUS: OPEN FOR FREELANCE [2026]
            </div>
          </div>

          {/* Right: Skills Window */}
          <div className="border border-white/[0.08] bg-[#050505] shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden">
            <div className="px-5 py-3 text-[0.65rem] text-white/30 border-b border-white/[0.08] tracking-wider flex items-center gap-3 bg-white/[0.02]">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
              </div>
              <span className="font-mono">skills.sh</span>
            </div>
            
            <div className="p-10 flex flex-col gap-10">
              {[
                { title: "LANGUAGES", items: ["Python", "TypeScript", "JavaScript", "C# / SQL"] },
                { title: "FRAMEWORKS", items: ["Django", "React.js", "Next.js", ".NET Core"] },
                { title: "INFRASTRUCTURE", items: ["PostgreSQL", "Docker", "Redis", "CI/CD Platforms"] },
              ].map((col, i) => (
                <div key={i} className="flex flex-col sm:flex-row gap-6 sm:gap-16 sm:items-center">
                  <div className="text-white/40 font-bold tracking-[0.15em] text-[0.65rem] w-32 shrink-0">{col.title}</div>
                  <div className="flex flex-wrap gap-2">
                    {col.items.map((item, j) => (
                      <span key={j} className="text-white/70 text-[0.8rem] bg-white/[0.04] border border-white/[0.08] px-3 py-1.5 rounded-full hover:bg-white/[0.1] hover:text-white transition-colors cursor-none">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
