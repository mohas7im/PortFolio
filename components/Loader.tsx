"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Initial entrance animation for the text content
    gsap.fromTo(
      textContainerRef.current,
      { opacity: 0, scale: 0.95, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 1.2, ease: "power3.out" }
    );

    let current = 0;
    const interval = setInterval(() => {
      // Simulate highly variable loading speed (common in modern premium sites)
      current += Math.floor(Math.random() * 15) + 5;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
      }
      setProgress(current);
      if (barRef.current) {
        gsap.to(barRef.current, { width: `${current}%`, duration: 0.15, ease: "power1.out" });
      }
    }, 150);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      const tl = gsap.timeline({ onComplete });
      // Add a small satisfying pause at 100% before ripping the curtain away
      tl.to(
        textContainerRef.current,
        {
          opacity: 0,
          scale: 0.95,
          y: -30,
          duration: 0.6,
          ease: "power3.in",
        },
        "+=0.4"
      )
        .to(
          barRef.current,
          {
            opacity: 0,
            duration: 0.3,
          },
          "<"
        )
        .to(
          containerRef.current,
          {
            yPercent: -100,
            duration: 1.2,
            ease: "expo.inOut", // Hyper-sharp Awwwards curtain lift
          },
          "-=0.1"
        );
    }
  }, [progress, onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 bg-[#0a0a0a] z-[9999] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* ── Subdued Minimalist Framing ── */}
      <div className="absolute inset-6 border border-white/5 rounded-3xl pointer-events-none hidden md:block" />

      {/* ── Absolute Centered Massive Typography ── */}
      <div
        ref={textContainerRef}
        className="flex flex-col items-center justify-center select-none"
        style={{ opacity: 0 }}
      >
        {/* Dynamic Counter */}
        <div className="font-heading font-black text-white text-[clamp(5rem,15vw,12rem)] leading-[0.85] tracking-tighter mb-4 flex items-baseline">
          {progress}
          <span className="text-[clamp(2.5rem,7vw,5rem)] text-white/30 font-bold ml-2">
            %
          </span>
        </div>

        {/* State Indicator Text */}
        <div className="font-heading text-[0.75rem] lg:text-[0.9rem] tracking-[0.4em] text-white/50 uppercase flex items-center gap-4">
          {progress < 100 ? (
            <>
              <span className="w-2 h-2 rounded-full bg-white/20 animate-pulse" />
              LOADING
            </>
          ) : (
            <>
              <span className="w-2 h-2 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
              READY
            </>
          )}
        </div>
      </div>

      {/* ── Cinematic Edge-to-Edge Progress Bar ── */}
      <div className="absolute bottom-0 left-0 w-full h-[4px] bg-white/5">
        <div
          ref={barRef}
          className="h-full bg-white w-0 shadow-[0_0_15px_rgba(255,255,255,0.5)]"
        />
      </div>
    </div>
  );
}
