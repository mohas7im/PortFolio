"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import SplitType from "split-type";

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  // Store refs directly and handle nulls inside the loop
  const textRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  useEffect(() => {
    gsap.fromTo(
      ".about-header-wrap",
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: containerRef.current, start: "top 85%", once: true } }
    );
    gsap.fromTo(
      ".ap-bottom-tags span",
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power3.out",
        scrollTrigger: { trigger: containerRef.current, start: "top 80%" } }
    );
    gsap.fromTo(
      ".ap-stat-card",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: "power3.out",
        scrollTrigger: { trigger: containerRef.current, start: "top 80%" } }
    );

    if (!textContainerRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Break down the paragraphs into highly granular words for the scrubbing effect
      const splits = textRefs.current
        .filter((el): el is HTMLParagraphElement => el !== null)
        .map((el) => {
          return new SplitType(el, { types: "words,chars" });
        });

      // 2. Gather all words across all paragraphs in sequence
      const allWords = splits.flatMap((s) => s.words).filter((w): w is HTMLElement => w !== null);

      // 3. Force initial "off" state (15% opacity) to prevent flashing
      gsap.set(allWords, { opacity: 0.15 });

      // 4. Create an organic, unpinned scrub mapped directly to the text entering the screen
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: textContainerRef.current,
          start: "top 85%", // Starts lighting up immediately as it slides into view
          end: "bottom 45%", // Finishes lighting up right as the paragraph reaches the middle
          scrub: 1,          // 1-second smoothing lag for buttery scrolling
        },
      });

      // 5. Restore the smooth cascading stagger for a high-end feel
      tl.to(allWords, {
        opacity: 1,
        stagger: 0.1,
        duration: 1,
        ease: "power2.out",
      });
      
    }, containerRef);

    // Cleanup split elements on unmount to avoid DOM pollution during rapid navigation
    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section id="about" className="py-24 relative bg-bg z-[2]">
      
      {/* Header matching Services / AI Explorations */}
      <div className="about-header-wrap max-w-[1400px] mx-auto px-6 md:px-10 mb-8 md:mb-16">
        <div className="text-[0.65rem] tracking-[0.2em] text-white/30 mb-6 uppercase font-bold flex items-center gap-3">
          <div className="w-8 h-px bg-white/30" />
          01 — ABOUT ME
        </div>
        <h2 className="font-heading text-[clamp(2.5rem,7vw,6rem)] font-bold text-white tracking-[-0.04em] leading-[0.9] uppercase">
          WHO I AM
        </h2>
      </div>

      {/* Main Philosophy Scrubbing Container */}
      <div ref={containerRef} className="w-full relative min-h-[40vh] flex flex-col justify-center">
        <div className="max-w-[1400px] mx-auto w-full px-6 md:px-10 flex flex-col lg:flex-row gap-12 lg:gap-16 items-start justify-between">
          
          {/* Left: Scrubbing Text Area */}
          <div ref={textContainerRef} className="w-full lg:w-[65%]">
            <p 
              ref={(el) => { textRefs.current[0] = el; }}
              className="text-[clamp(1.5rem,3vw,3.5rem)] font-heading leading-[1.2] tracking-[-0.02em] font-medium text-white"
            >
              I am Hashim, a Full Stack Engineer dedicated to high-performance architecture. I bridge the gap between heavy infrastructure and elite user interfaces, building resilient, automated software for tomorrow.
            </p>

            {/* Floating Abstract Architecture Tags */}
            <div className="ap-bottom-tags pt-12 md:pt-20 flex flex-wrap gap-6 md:gap-12 text-[0.65rem] tracking-[0.25em] font-bold uppercase text-white/20">
              <span className="text-cyan-500/80">ARCHITECTURE</span>
              <span>ENTERPRISE SCALING</span>
              <span>INTEGRITY</span>
            </div>
          </div>

          {/* Right: Stats Data Cards */}
          <div className="w-full lg:w-[30%] flex flex-col sm:flex-row lg:flex-col gap-6 pt-4 lg:pt-0">
            <div className="ap-stat-card flex-1 p-8 rounded-2xl bg-white/[0.02] border border-white/[0.05] flex flex-col gap-3 backdrop-blur-sm">
               <span className="text-cyan-400 font-heading text-[3.5rem] font-bold leading-none">2+</span>
               <span className="text-white/40 text-[0.7rem] uppercase tracking-[0.2em] font-bold">Years of Experience</span>
            </div>
            <div className="ap-stat-card flex-1 p-8 rounded-2xl bg-white/[0.02] border border-white/[0.05] flex flex-col gap-3 backdrop-blur-sm">
               <span className="text-white font-heading text-[3.5rem] font-bold leading-none">10+</span>
               <span className="text-white/40 text-[0.7rem] uppercase tracking-[0.2em] font-bold">Projects Shipped</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
