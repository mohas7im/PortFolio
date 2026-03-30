"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const panelTopRef  = useRef<HTMLDivElement>(null);
  const panelBotRef  = useRef<HTMLDivElement>(null);
  const phraseRef    = useRef<HTMLDivElement>(null);
  const counterRef   = useRef<HTMLDivElement>(null);
  const fillRef      = useRef<HTMLDivElement>(null);

  const [count, setCount]     = useState(0);
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    if (!containerRef.current) return;

    const charEls = containerRef.current.querySelectorAll<HTMLElement>(".pl-char");

    const ctx = gsap.context(() => {
      // ── Phase 1: char-by-char reveal — pure white, no colors ──
      gsap.set(charEls, { y: "105%", opacity: 0 });
      gsap.set([counterRef.current, ".pl-bar-wrap"], { opacity: 0 });

      const tl = gsap.timeline();

      tl.to(charEls, {
        y: "0%",
        opacity: 1,
        duration: 0.65,
        stagger: 0.03,
        ease: "power4.out",
        delay: 0.1,
      });

      // Phrase exits up
      tl.to(phraseRef.current, {
        y: -50,
        opacity: 0,
        duration: 0.5,
        ease: "power3.in",
        delay: 0.55,
      });

      // Counter fades in
      tl.to(counterRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power3.out",
      }, "-=0.2");

      tl.to(".pl-bar-wrap", {
        opacity: 1,
        duration: 0.35,
        ease: "power2.out",
      }, "<");
    }, containerRef);

    // ── Phase 2: count up ──
    const timers: ReturnType<typeof setTimeout>[] = [];
    let prog = 0;

    const tick = () => {
      prog += Math.random() * 9 + 4;
      if (prog >= 100) {
        prog = 100;
        setCount(100);
        if (fillRef.current)
          gsap.to(fillRef.current, { width: "100%", duration: 0.1, ease: "none" });

        // Exit animation
        timers.push(setTimeout(() => {
          const exit = gsap.timeline({ onComplete: () => { setMounted(false); onComplete(); } });
          exit
            .to([counterRef.current, ".pl-bar-wrap"], {
              opacity: 0, y: -8,
              duration: 0.3, stagger: 0.04, ease: "power3.in",
            })
            .to(panelTopRef.current, {
              yPercent: -101,
              duration: 0.7,
              ease: "power4.inOut",
            }, "-=0.05")
            .to(panelBotRef.current, {
              yPercent: 101,
              duration: 0.7,
              ease: "power4.inOut",
            }, "<");
        }, 300));
      } else {
        setCount(Math.floor(prog));
        if (fillRef.current)
          gsap.to(fillRef.current, { width: `${Math.floor(prog)}%`, duration: 0.1, ease: "none" });
        timers.push(setTimeout(tick, 70 + Math.random() * 60));
      }
    };

    // Start counting after phrase finishes (~1.3s)
    timers.push(setTimeout(tick, 1300));

    return () => { timers.forEach(clearTimeout); ctx.revert(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onComplete]);

  if (!mounted) return null;

  const WORDS = ["Let's", "build", "something", "that", "matters"];

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      {/* ── Two split panels ── */}
      <div ref={panelTopRef} className="absolute inset-x-0 top-0 h-1/2 bg-[#0a0a0a]" />
      <div ref={panelBotRef} className="absolute inset-x-0 bottom-0 h-1/2 bg-[#0a0a0a]" />

      {/* ── Subtle grid overlay ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.018) 1px,transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* ── Corner marks ── */}
      <div className="absolute top-6 left-6 w-5 h-5 border-t border-l border-white/15" />
      <div className="absolute top-6 right-6 w-5 h-5 border-t border-r border-white/15" />
      <div className="absolute bottom-6 left-6 w-5 h-5 border-b border-l border-white/15" />
      <div className="absolute bottom-6 right-6 w-5 h-5 border-b border-r border-white/15" />

      {/* ── Brand mark — top left ── */}
      <div className="absolute top-7 left-8 flex items-center gap-2 z-10">
        <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
        <span
          className="font-heading text-white/25 uppercase tracking-[0.28em]"
          style={{ fontSize: "0.52rem" }}
        >
          hashim · dev
        </span>
      </div>

      {/* ── Centre content ── */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-10 select-none">

        {/* Phase 1 — Multi-word reveal, all white */}
        <div
          ref={phraseRef}
          className="flex flex-wrap items-baseline justify-center gap-x-4 gap-y-2 px-8"
          style={{ maxWidth: 700 }}
        >
          {WORDS.map((word, wi) => (
            <div key={wi} className="pl-word overflow-hidden flex">
              {word.split("").map((char, ci) => (
                <span
                  key={ci}
                  className="pl-char inline-block font-heading font-black text-white uppercase"
                  style={{
                    fontSize: "clamp(2.8rem, 7vw, 6rem)",
                    letterSpacing: "-0.04em",
                    lineHeight: 1,
                  }}
                >
                  {char}
                </span>
              ))}
            </div>
          ))}
        </div>

        {/* Phase 2 — Counter + bar */}
        <div
          ref={counterRef}
          className="flex flex-col items-center gap-5"
          style={{ opacity: 0, transform: "translateY(14px)" }}
        >
          {/* Big percentage number */}
          <div
            className="font-heading font-black text-white tabular-nums leading-none flex items-baseline gap-1"
            style={{ fontSize: "clamp(4rem, 12vw, 9rem)", letterSpacing: "-0.05em" }}
          >
            {String(count).padStart(2, "0")}
            <span className="text-white/20 font-body" style={{ fontSize: "clamp(1.2rem, 3vw, 2.5rem)" }}>
              %
            </span>
          </div>

          {/* Progress bar */}
          <div className="pl-bar-wrap w-[180px] lg:w-[240px] flex flex-col items-center gap-2.5" style={{ opacity: 0 }}>
            <div className="w-full h-[1px] bg-white/[0.08] relative overflow-hidden">
              <div
                ref={fillRef}
                className="absolute left-0 top-0 h-full bg-white"
                style={{ width: "0%", boxShadow: "0 0 8px rgba(255,255,255,0.3)" }}
              />
            </div>
            <span
              className="font-heading text-white/20 uppercase tracking-[0.35em]"
              style={{ fontSize: "0.44rem" }}
            >
              {count < 100 ? "Loading" : "Ready"}
            </span>
          </div>
        </div>
      </div>

      {/* ── Hairline seam at split ── */}
      <div
        className="absolute inset-x-0 pointer-events-none"
        style={{
          top: "calc(50% - 0.5px)",
          height: "1px",
          background: "rgba(255,255,255,0.06)",
        }}
      />
    </div>
  );
}
