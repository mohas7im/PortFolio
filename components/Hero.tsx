"use client";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function Hero({ loaded }: { loaded: boolean }) {
  const containerRef = useRef<HTMLElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const termRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!loaded || !containerRef.current) return;

    const initAnim = async () => {
      const SplitType = (await import("split-type")).default;
      if (!line1Ref.current || !line2Ref.current) return;

      const split1 = new SplitType(line1Ref.current, { types: "chars" });
      const split2 = new SplitType(line2Ref.current, { types: "chars" });

      const ctx = gsap.context(() => {
        const tl = gsap.timeline({ delay: 0.2 });

        tl.from(split1.chars || [], {
          y: 100, opacity: 0, rotateX: -90,
          stagger: 0.04, duration: 0.7, ease: "power3.out",
        })
        .from(split2.chars || [], {
          y: 100, opacity: 0, rotateX: -90,
          stagger: 0.03, duration: 0.6, ease: "power3.out",
        }, "-=0.4")
        .from(taglineRef.current, { y: 30, opacity: 0, duration: 0.6 }, "-=0.3")
        .from(".hero-cta-btn", { y: 20, opacity: 0, stagger: 0.12, duration: 0.5 }, "-=0.3")
        .from(termRef.current, { opacity: 0, x: 30, duration: 0.7, ease: "power2.out" }, "-=0.4")
        .from(bottomRef.current, { opacity: 0, duration: 0.5 }, "-=0.2")
        .call(() => {
          // Glitch-in the heading after it's revealed — same chromatic aberration
          // effect as the preloader's FATAL header
          const trigger = (el: HTMLDivElement | null) => {
            if (!el) return;
            el.classList.add("glitch-entrance");
            setTimeout(() => el.classList.remove("glitch-entrance"), 1800);
          };
          trigger(line1Ref.current);
          setTimeout(() => trigger(line2Ref.current), 120); // slight stagger
        });
      }, containerRef);

      return () => ctx.revert();
    };

    initAnim();
  }, [loaded]);

  return (
    <section ref={containerRef} className="relative min-h-[100svh] flex flex-col justify-between pt-28 lg:pt-32 px-6 lg:px-10 pb-8 overflow-hidden z-[2]">
      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center my-auto max-w-[1400px] mx-auto w-full pt-10 lg:pt-0">
        {/* Left */}
        <div className="flex flex-col gap-8">
          <div>
            {/* Line 1 — using xMethod typography style (bold uppercase, tight tracking) but smaller clamp */}
            <div className="overflow-hidden">
              <div 
                ref={line1Ref} 
                data-text="FULL STACK"
                className="font-heading text-[clamp(2.4rem,10vw,7rem)] leading-[0.9] font-bold tracking-[-0.04em] text-white glitch-text"
              >
                FULL STACK
              </div>
            </div>
            {/* Line 2 */}
            <div className="overflow-hidden">
              <div 
                ref={line2Ref} 
                data-text="DEVELOPER"
                className="font-heading text-[clamp(2.4rem,10vw,7rem)] leading-[0.9] font-bold tracking-[-0.04em] text-white glitch-text"
              >
                DEVELOPER
              </div>
            </div>
          </div>

          <p ref={taglineRef} className="hero-tagline font-body text-[1rem] leading-[1.8] text-white/50 max-w-[500px]">
            I build robust web applications and digital products — from backend APIs
            to polished frontends. Currently building Dental EMR and exploring AI-powered systems.
          </p>

          <div ref={ctaRef} className="flex gap-4 mt-2">
            <a href="#product" className="hero-cta-btn btn-magnetic px-8 py-3.5 text-[0.8rem] tracking-[0.1em] uppercase font-bold bg-white text-black no-underline cursor-none transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] flex items-center gap-2">
              <span>View Projects</span>
              <span>→</span>
            </a>
          </div>
        </div>

        {/* Right: Terminal */}
        <div ref={termRef} className="flex lg:justify-end justify-start">
          <div className="font-body border border-white/[0.08] bg-bg/50 backdrop-blur-md w-full max-w-[460px] shadow-[0_0_40px_rgba(0,245,255,0.05)]">
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/[0.08]">
              <div className="flex gap-1.5">
                <div className="w-2 h-2 rounded-full bg-[#ff5f56]" />
                <div className="w-2 h-2 rounded-full bg-[#ffbd2e]" />
                <div className="w-2 h-2 rounded-full bg-[#27c93f]" />
              </div>
              <div className="text-white/30 text-[0.65rem] tracking-wider ml-2">
                hashim@dev ~ %
              </div>
            </div>
            <div className="p-6 flex flex-col gap-3.5">
              {[
                { cmd: "$ whoami", out: "fullstack developer" },
                { cmd: "$ stack --list", out: "django · react · next.js · c#" },
                { cmd: "$ product --active", out: "Dental EMR → live" },
                { cmd: "$ ai --focus", out: "LLMs · RAG · Agents · MCP" },
                { cmd: "$ status", out: "accepting freelance ✓" },
              ].map((item, i) => (
                <div key={i} className="flex flex-col gap-0.5">
                  <span className="text-white/70 text-[0.75rem] tracking-wide font-mono">{item.cmd}</span>
                  <span className="text-white/40 text-[0.75rem] pl-4 font-mono">{item.out}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div ref={bottomRef} className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 lg:gap-0 border-t border-white/[0.08] pt-6 font-body text-[0.65rem] tracking-[0.15em] uppercase max-w-[1400px] mx-auto w-full">
        <div className="text-white/40 flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse" />
          [ ↓ scroll to explore ]
        </div>
        <div className="text-white/30">3+ yrs experience · 10+ projects</div>
      </div>
    </section>
  );
}
