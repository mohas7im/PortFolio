"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

// The phrase split into individually-colored words
const WORDS = [
  { text: "Build", color: "#ffffff" },
  { text: "things", color: "#00f5ff" },
  { text: "that", color: "#ffffff" },
  { text: "matter", color: "#a855f7" },
];

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const panelTopRef = useRef<HTMLDivElement>(null);
  const panelBotRef = useRef<HTMLDivElement>(null);
  const phraseRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<SVGCircleElement>(null);

  const [count, setCount] = useState(0);
  const [mounted, setMounted] = useState(true);

  const RADIUS = 38;
  const CIRC = 2 * Math.PI * RADIUS;

  useEffect(() => {
    if (!containerRef.current) return;

    const wordEls =
      containerRef.current.querySelectorAll<HTMLElement>(".pl-word");
    const charEls =
      containerRef.current.querySelectorAll<HTMLElement>(".pl-char");

    const ctx = gsap.context(() => {
      // ── Phase 1: phrase animation ──
      const tl = gsap.timeline();

      // All chars hidden initially
      gsap.set(charEls, { y: "110%", opacity: 0 });
      gsap.set([counterRef.current, fillRef.current?.parentElement], {
        opacity: 0,
      });

      // Stagger each character up — awwwards style
      tl.to(charEls, {
        y: "0%",
        opacity: 1,
        duration: 0.7,
        stagger: 0.035,
        ease: "power4.out",
        delay: 0.15,
      });

      // Brief hold, then slide phrase up + fade out
      tl.to(phraseRef.current, {
        y: -60,
        opacity: 0,
        duration: 0.6,
        ease: "power3.in",
        delay: 0.5,
      });

      // Counter fades in as phrase leaves
      tl.to(
        counterRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          ease: "power3.out",
        },
        "-=0.25",
      );

      // Progress bar wrapper
      tl.to(
        ".pl-bar-wrap",
        {
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
        },
        "<",
      );
    }, containerRef);

    // ── Phase 2: count up progress ──
    const timers: ReturnType<typeof setTimeout>[] = [];
    let prog = 0;

    const startCount = () => {
      const tick = () => {
        prog += Math.random() * 9 + 4;
        if (prog >= 100) {
          prog = 100;
          setCount(100);
          if (fillRef.current)
            gsap.to(fillRef.current, {
              width: "100%",
              duration: 0.12,
              ease: "none",
            });
          if (circleRef.current)
            gsap.to(circleRef.current, {
              strokeDashoffset: 0,
              duration: 0.12,
              ease: "none",
            });

          // Exit after brief pause
          timers.push(
            setTimeout(() => {
              const exit = gsap.timeline({
                onComplete: () => {
                  setMounted(false);
                  onComplete();
                },
              });
              exit
                .to([counterRef.current, ".pl-bar-wrap"], {
                  opacity: 0,
                  y: -10,
                  duration: 0.35,
                  stagger: 0.05,
                  ease: "power3.in",
                })
                .to(
                  panelTopRef.current,
                  { yPercent: -101, duration: 0.75, ease: "power4.inOut" },
                  "-=0.1",
                )
                .to(
                  panelBotRef.current,
                  { yPercent: 101, duration: 0.75, ease: "power4.inOut" },
                  "<",
                );
            }, 350),
          );
        } else {
          setCount(Math.floor(prog));
          if (fillRef.current)
            gsap.to(fillRef.current, {
              width: `${Math.floor(prog)}%`,
              duration: 0.1,
              ease: "none",
            });
          if (circleRef.current)
            gsap.to(circleRef.current, {
              strokeDashoffset: CIRC - (CIRC * Math.floor(prog)) / 100,
              duration: 0.1,
              ease: "none",
            });
          timers.push(setTimeout(tick, 75 + Math.random() * 65));
        }
      };
      // Start counting ~1.3s after mount (after phrase finishes)
      timers.push(setTimeout(tick, 1300));
    };

    startCount();

    return () => {
      timers.forEach(clearTimeout);
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onComplete]);

  if (!mounted) return null;

  return (
    <>
      <style>{`
        @keyframes pl-spin { to { transform: rotate(360deg); } }
        .pl-ring { animation: pl-spin 2.2s linear infinite; transform-origin: center; }
        @keyframes pl-shimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .pl-shimmer-border {
          background: linear-gradient(90deg, rgba(255,255,255,0.04), rgba(0,245,255,0.3), rgba(168,85,247,0.3), rgba(255,255,255,0.04));
          background-size: 300% 100%;
          animation: pl-shimmer 2.5s linear infinite;
        }
      `}</style>

      <div
        ref={containerRef}
        className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        {/* ── Split panels ── */}
        <div
          ref={panelTopRef}
          className="absolute inset-x-0 top-0 h-1/2 bg-[#050505]"
        />
        <div
          ref={panelBotRef}
          className="absolute inset-x-0 bottom-0 h-1/2 bg-[#050505]"
        />

        {/* ── Subtle grid ── */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />

        {/* ── Glow orbs ── */}
        <div className="absolute top-1/4 left-1/3 w-[400px] h-[400px] rounded-full bg-[#00f5ff]/[0.04] blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/3 w-[350px] h-[350px] rounded-full bg-[#a855f7]/[0.04] blur-[100px] pointer-events-none" />

        {/* ── Centre content ── */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-12 select-none">
          {/* Phase 1 — Animated phrase */}
          <div
            ref={phraseRef}
            className="flex flex-wrap items-baseline justify-center gap-x-4 gap-y-2 px-8"
            style={{ maxWidth: 700 }}
          >
            {WORDS.map((word, wi) => (
              <div key={wi} className="pl-word overflow-hidden flex">
                {word.text.split("").map((char, ci) => (
                  <span
                    key={ci}
                    className="pl-char inline-block font-heading font-black uppercase leading-none"
                    style={{
                      fontSize: "clamp(2.8rem, 7vw, 6rem)",
                      letterSpacing: "-0.04em",
                      color: word.color,
                      display: "inline-block",
                    }}
                  >
                    {char}
                  </span>
                ))}
              </div>
            ))}
          </div>

          {/* Phase 2 — Counter + ring */}
          <div
            ref={counterRef}
            className="flex flex-col items-center gap-6"
            style={{ opacity: 0, transform: "translateY(16px)" }}
          >
            {/* Brand */}
            <div className="flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-white/40 inline-block" />
              <span
                className="font-heading text-white/40 uppercase tracking-[0.28em]"
                style={{ fontSize: "0.6rem" }}
              >
                hashim · portfolio
              </span>
            </div>

            {/* Ring progress */}
            <div className="relative w-[100px] h-[100px] flex items-center justify-center">
              <svg
                className="pl-ring absolute inset-0"
                viewBox="0 0 88 88"
                fill="none"
                width="100%"
                height="100%"
              >
                {/* Track */}
                <circle
                  cx="44"
                  cy="44"
                  r={RADIUS}
                  stroke="rgba(255,255,255,0.06)"
                  strokeWidth="1.5"
                />
                {/* Progress arc — cyan to purple gradient via stroke trick */}
                <circle
                  ref={circleRef}
                  cx="44"
                  cy="44"
                  r={RADIUS}
                  stroke="url(#pl-grad)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeDasharray={CIRC}
                  strokeDashoffset={CIRC}
                  style={{
                    transform: "rotate(-90deg)",
                    transformOrigin: "center",
                  }}
                />
                <defs>
                  <linearGradient
                    id="pl-grad"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#00f5ff" />
                    <stop offset="100%" stopColor="#a855f7" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Counter number */}
              <span
                className="font-heading text-white font-black tabular-nums z-10"
                style={{ fontSize: "1.6rem", letterSpacing: "-0.04em" }}
              >
                {String(count).padStart(2, "0")}
                <span className="text-white/30 text-sm font-body ml-0.5">
                  %
                </span>
              </span>
            </div>

            {/* Thin progress bar */}
            <div
              className="pl-bar-wrap w-[200px] flex flex-col items-center gap-2"
              style={{ opacity: 0 }}
            >
              <div className="w-full h-[1px] bg-white/[0.07] relative overflow-hidden rounded-full">
                <div
                  ref={fillRef}
                  className="absolute left-0 top-0 h-full rounded-full"
                  style={{
                    width: "0%",
                    background: "linear-gradient(90deg, #00f5ff, #a855f7)",
                    boxShadow: "0 0 10px rgba(0,245,255,0.5)",
                  }}
                />
              </div>
              <span
                className="font-heading text-white/20 uppercase tracking-[0.3em]"
                style={{ fontSize: "0.5rem" }}
              >
                Loading
              </span>
            </div>
          </div>
        </div>

        {/* ── Shimmer border at center seam ── */}
        <div
          className="pl-shimmer-border absolute inset-x-0 pointer-events-none"
          style={{ top: "calc(50% - 0.5px)", height: "1px" }}
        />
      </div>
    </>
  );
}
