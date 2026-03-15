"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

// Rotating error / code snippets shown in the trailing badge
const CODES = [
  "ERR_404",
  "undefined",
  "null",
  "SyntaxError",
  "TypeError",
  "{ }",
  "NaN",
  "0x0000DEAD",
  "SEGFAULT",
  "undefined is not a function",
];

export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const textRef  = useRef<HTMLSpanElement>(null);
  const [codeIndex, setCodeIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const dot   = dotRef.current;
    const badge = badgeRef.current;
    if (!dot || !badge) return;

    // Precise dot follows immediately
    const xDot = gsap.quickTo(dot,   "x", { duration: 0.08 });
    const yDot = gsap.quickTo(dot,   "y", { duration: 0.08 });
    // Badge trails with lag
    const xBadge = gsap.quickTo(badge, "x", { duration: 0.4, ease: "power3" });
    const yBadge = gsap.quickTo(badge, "y", { duration: 0.4, ease: "power3" });

    const onMove = (e: MouseEvent) => {
      xDot(e.clientX);
      yDot(e.clientY);
      xBadge(e.clientX);
      yBadge(e.clientY);
    };
    window.addEventListener("mousemove", onMove);

    // Hover on interactive elements → badge glows green, shows onClick()
    const onEnter = (e: Event) => {
      if (textRef.current) textRef.current.textContent = "onClick()";
      gsap.to(badge, {
        scale: 1.15,
        backgroundColor: "rgba(57,255,20,0.12)",
        borderColor: "#39FF14",
        color: "#39FF14",
        duration: 0.25,
        ease: "power2.out",
      });
    };
    const onLeave = () => {
      if (textRef.current) textRef.current.textContent = CODES[codeIndex];
      gsap.to(badge, {
        scale: 1,
        backgroundColor: "rgba(0,0,0,0.7)",
        borderColor: "rgba(0,245,255,0.4)",
        color: "rgba(0,245,255,0.9)",
        duration: 0.25,
        ease: "power2.out",
      });
    };

    const interactives = document.querySelectorAll("a, button");
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    // Magnetic button pull
    document.querySelectorAll<HTMLElement>(".btn-magnetic").forEach((btn) => {
      const xTo = gsap.quickTo(btn, "x", { duration: 0.4, ease: "power3" });
      const yTo = gsap.quickTo(btn, "y", { duration: 0.4, ease: "power3" });
      btn.addEventListener("mousemove", (e: MouseEvent) => {
        const r = btn.getBoundingClientRect();
        xTo((e.clientX - r.left - r.width  / 2) * 0.4);
        yTo((e.clientY - r.top  - r.height / 2) * 0.4);
      });
      btn.addEventListener("mouseleave", () => { xTo(0); yTo(0); });
    });

    return () => {
      window.removeEventListener("mousemove", onMove);
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, [codeIndex]);

  // Cycle through error codes every 2.5s
  useEffect(() => {
    const id = setInterval(() => {
      setCodeIndex((prev) => {
        const next = (prev + 1) % CODES.length;
        // Animate the text swap
        if (textRef.current) {
          gsap.fromTo(textRef.current,
            { opacity: 0, y: 6 },
            { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" }
          );
          textRef.current.textContent = CODES[next];
        }
        return next;
      });
    }, 2500);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      {/* Precise dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{ transform: "translate(-50%, -50%)" }}
      >
        <div className="w-[6px] h-[6px] bg-cyan rounded-full" />
      </div>

      {/* Trailing code badge */}
      <div
        ref={badgeRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998] font-mono"
        style={{
          transform: "translate(12px, 12px)", // offset so it doesn't cover the dot
        }}
      >
        <div
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border"
          style={{
            background:   "rgba(0,0,0,0.75)",
            borderColor:  "rgba(0,245,255,0.4)",
            backdropFilter: "blur(8px)",
            boxShadow:    "0 0 16px rgba(0,245,255,0.08)",
          }}
        >
          {/* Blinking cursor indicator */}
          <span
            className="w-[5px] h-[10px] bg-cyan rounded-sm animate-pulse"
            style={{ animationDuration: "0.9s" }}
          />
          <span
            ref={textRef}
            className="text-[0.6rem] font-bold tracking-wider whitespace-nowrap"
            style={{ color: "rgba(0,245,255,0.9)" }}
          >
            {CODES[0]}
          </span>
        </div>
      </div>
    </>
  );
}
