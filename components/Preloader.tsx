"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

// ── Log lines with timing + color category ─────────────────────────────────
const LOGS = [
  { ms: 200,  level: "fatal", text: "> FATAL: segmentation fault (core dumped)" },
  { ms: 550,  level: "error", text: "> ERR:   null ptr deref at 0x0000DEAD" },
  { ms: 850,  level: "warn",  text: "> WARN:  heap corruption — buffer overflow" },
  { ms: 1100, level: "fatal", text: "> PANIC: stack smashing detected" },
  { ms: 1400, level: "error", text: "> ERR:   undefined is not a function [runtime:404]" },
  { ms: 1700, level: "info",  text: "> INFO:  attempting system recovery..." },
  { ms: 2100, level: "ok",    text: "> OK:    loading hashim.portfolio — stand by" },
] as const;

const COLOR: Record<string, string> = {
  fatal: "#ff5f56",
  error: "#ff9f43",
  warn:  "#ffd93d",
  info:  "rgba(255,255,255,0.4)",
  ok:    "#39FF14",
};

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shown, setShown]     = useState<number[]>([]);
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting]  = useState(false);
  const [mounted, setMounted]  = useState(true);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    // Reveal log lines
    LOGS.forEach(({ ms }, i) => {
      timers.push(setTimeout(() => setShown((s) => [...s, i]), ms));
    });

    // Stuttering progress bar — random increments, finishes ~2.6s
    let prog = 0;
    const tick = () => {
      prog += Math.random() * 11 + 3;
      if (prog >= 100) {
        prog = 100;
        setProgress(100);
        timers.push(setTimeout(() => setExiting(true), 350)); // shake
        timers.push(setTimeout(() => {
          if (!containerRef.current) return;
          gsap.to(containerRef.current, {
            opacity: 0,
            yPercent: -4,
            duration: 0.4,
            ease: "power3.in",
            onComplete: () => { setMounted(false); onComplete(); },
          });
        }, 700));
      } else {
        setProgress(Math.floor(prog));
        timers.push(setTimeout(tick, 90 + Math.random() * 60));
      }
    };
    timers.push(setTimeout(tick, 200));

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  if (!mounted) return null;

  return (
    <>
      {/* ── Injected CSS for pseudo-element glitch & scanlines ── */}
      <style>{`
        @keyframes glitch-a {
          0%,100%{ clip-path:inset(0 0 97% 0); transform:translate(-4px,0); }
          20%     { clip-path:inset(25% 0 55% 0); transform:translate(3px,0); }
          50%     { clip-path:inset(60% 0 20% 0); transform:translate(-2px,0); }
          80%     { clip-path:inset(85% 0 2% 0);  transform:translate(2px,0); }
        }
        @keyframes glitch-b {
          0%,100%{ clip-path:inset(0 0 92% 0); transform:translate(3px,0); }
          30%     { clip-path:inset(45% 0 35% 0); transform:translate(-3px,0); }
          60%     { clip-path:inset(10% 0 75% 0); transform:translate(1px,0); }
        }
        @keyframes flicker {
          0%,100%{ opacity:1; }
          92%{ opacity:1; } 93%{ opacity:0.3; } 94%{ opacity:1; }
          96%{ opacity:0.5; } 97%{ opacity:1; }
        }
        @keyframes scan {
          0%  { transform:translateY(-100%); }
          100%{ transform:translateY(100vh); }
        }
        @keyframes shake {
          0%,100%{ transform:translate(0); }
          15%{ transform:translate(-5px, 2px) skewX(-1deg); }
          30%{ transform:translate(5px,-3px)  skewX(1deg); }
          45%{ transform:translate(-3px, 4px) skewX(-0.5deg); }
          60%{ transform:translate(4px,-2px); }
          75%{ transform:translate(-5px,-4px) skewX(1deg); }
          90%{ transform:translate(3px, 2px); }
        }
        @keyframes blink   { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes rgb-in  { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }

        .gl-title{ position:relative; animation:flicker 3s infinite; }
        .gl-title::before{
          content:attr(data-text); position:absolute; top:0; left:0; width:100%; height:100%;
          color:#00f5ff; animation:glitch-a 1.6s infinite;
        }
        .gl-title::after{
          content:attr(data-text); position:absolute; top:0; left:0; width:100%; height:100%;
          color:#ff003c; animation:glitch-b 2s infinite;
        }
        .scan-overlay::after{
          content:''; position:absolute; inset:0;
          background:linear-gradient(transparent,rgba(0,245,255,0.045),transparent);
          height:60px; width:100%;
          animation:scan 2.8s linear infinite;
        }
        .is-exiting{ animation:shake 0.12s infinite; }
        .log-line  { animation:rgb-in 0.22s ease forwards; }
      `}</style>

      {/* ── Full screen overlay ── */}
      <div
        ref={containerRef}
        className={`fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden scan-overlay ${exiting ? "is-exiting" : ""}`}
        style={{ fontFamily: "'Courier New', Courier, monospace" }}
      >
        {/* Grain */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.035]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />

        {/* Horizontal CRT lines */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)",
          }}
        />

        {/* ── Content card ── */}
        <div className="w-full max-w-[580px] px-6 flex flex-col gap-5">

          {/* Error badge */}
          <div className="border border-red-500/30 bg-red-500/[0.04] px-5 py-4">
            <div className="text-red-500/60 text-[0.5rem] tracking-[0.35em] uppercase mb-2">
              ██ CRITICAL SYSTEM FAILURE ██
            </div>
            <h1
              data-text="FATAL: 0x0000DEAD"
              className="gl-title text-white font-black text-[clamp(1.6rem,4vw,2.5rem)] tracking-[-0.02em] uppercase leading-none"
            >
              FATAL: 0x0000DEAD
            </h1>
            <div className="text-red-400/50 text-[0.55rem] tracking-widest mt-1.5">
              SEGMENTATION FAULT — CORE DUMPED — PID 1337
            </div>
          </div>

          {/* Stack trace / log */}
          <div className="border border-white/[0.05] bg-[#050505] p-4">
            <div className="text-white/15 text-[0.5rem] tracking-[0.3em] uppercase border-b border-white/[0.05] pb-2 mb-3">
              STDERR OUTPUT
            </div>
            <div className="flex flex-col gap-[6px] min-h-[148px]">
              {LOGS.map(({ text, level }, i) => (
                <div
                  key={i}
                  className={`text-[0.62rem] leading-[1.6] ${shown.includes(i) ? "log-line" : "opacity-0"}`}
                  style={{ color: COLOR[level] }}
                >
                  {text}
                </div>
              ))}
              {/* Blinking cursor */}
              <span
                className="text-[0.62rem] text-white/25"
                style={{ animation: "blink 0.75s step-end infinite" }}
              >
                █
              </span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <span className="text-[0.5rem] tracking-[0.3em] text-white/20 uppercase">
                RECOVERY PROGRESS
              </span>
              <span
                className="text-[0.5rem] tracking-[0.2em] font-bold"
                style={{ color: "#00f5ff", animation: "flicker 1.5s infinite" }}
              >
                {progress}%
              </span>
            </div>

            {/* Track */}
            <div className="h-[2px] bg-white/[0.05] relative overflow-visible">
              {/* Fill */}
              <div
                className="h-full absolute left-0 top-0"
                style={{
                  width: `${progress}%`,
                  background: "linear-gradient(90deg, rgba(0,245,255,0.4), #00f5ff)",
                  boxShadow:  "0 0 10px rgba(0,245,255,0.9), 0 0 20px rgba(0,245,255,0.4)",
                  transition: "width 0.07s linear",
                }}
              />
              {/* Glowing tip */}
              <div
                className="absolute top-1/2 -translate-y-1/2 w-[3px] h-[6px]"
                style={{
                  left:       `${progress}%`,
                  background: "#00f5ff",
                  boxShadow:  "0 0 6px #00f5ff",
                  animation:  "flicker 0.4s infinite",
                }}
              />
            </div>

            {/* Chunky block bar below (for retro feel) */}
            <div className="flex gap-[3px] mt-1">
              {Array.from({ length: 30 }).map((_, i) => (
                <div
                  key={i}
                  className="h-[4px] flex-1 rounded-sm"
                  style={{
                    background:
                      progress >= (i + 1) * (100 / 30)
                        ? `rgba(0,245,255,${0.3 + Math.sin(i * 0.8) * 0.25})`
                        : "rgba(255,255,255,0.04)",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Footer note */}
          <div
            className="text-white/10 text-[0.48rem] tracking-[0.25em] uppercase text-right"
            style={{ animation: "flicker 4s infinite" }}
          >
            hashim.dev — build 2026.03 — DO NOT POWER OFF
          </div>
        </div>
      </div>
    </>
  );
}
