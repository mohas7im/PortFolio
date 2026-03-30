"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

const TERMINAL_LINES = [
  { cmd: "$ whoami", out: "fullstack developer · kerala, IN" },
  { cmd: "$ stack --list", out: "django · react · next.js · postgres" },
  { cmd: "$ product --active", out: "Dental EMR → production" },
  { cmd: "$ focus --current", out: "LLMs · RAG · Agents · MCP" },
  { cmd: "$ status", out: "available for new projects ●" },
];

const Starfield = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let stars: {
      x: number; y: number; radius: number;
      vx: number; vy: number; opacity: number; pulse: number;
    }[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    const initStars = () => {
      stars = [];
      const numStars = Math.floor((canvas.width * canvas.height) / 2500);
      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.2 + 0.2,
          vx: (Math.random() - 0.5) * 0.15,
          vy: (Math.random() - 0.5) * 0.15,
          opacity: Math.random(),
          pulse: (Math.random() - 0.5) * 0.02,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((star) => {
        star.x += star.vx;
        star.y += star.vy;
        star.opacity += star.pulse;
        if (star.opacity > 1 || star.opacity < 0.1) star.pulse = -star.pulse;
        if (star.x < 0) star.x = canvas.width;
        if (star.x > canvas.width) star.x = 0;
        if (star.y < 0) star.y = canvas.height;
        if (star.y > canvas.height) star.y = 0;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();
      });
      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener("resize", resize);
    resize();
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none opacity-80" />;
};

// ── Terminal card (shared between mobile static + desktop draggable) ──
function TerminalCard({ innerRef }: { innerRef?: React.RefObject<HTMLDivElement> }) {
  return (
    <div
      ref={innerRef}
      className="font-mono border border-white/[0.1] bg-[#080808]/90 backdrop-blur-md rounded-xl overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.6)]"
    >
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/[0.07] bg-[#111111]">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
        </div>
        <span className="text-white/25 text-[0.55rem] tracking-wider ml-2">hashim@dev:~ %</span>
      </div>
      <div className="px-4 sm:px-5 py-4 sm:py-5 flex flex-col gap-3 sm:gap-3.5">
        {TERMINAL_LINES.map((item, i) => (
          <div key={i} className="flex flex-col gap-0.5">
            <span className="text-white/60 text-[0.62rem] sm:text-[0.68rem] tracking-wide">{item.cmd}</span>
            <span
              className="text-[0.62rem] sm:text-[0.68rem] pl-3 sm:pl-4"
              style={{ color: i === 4 ? "#27c93f" : "rgba(255,255,255,0.35)" }}
            >
              {item.out}
              {i === 4 && (
                <span
                  className="inline-block w-[6px] sm:w-[7px] h-[0.62rem] sm:h-[0.68rem] bg-[#27c93f]/70 ml-1 align-middle"
                  style={{ animation: "blink 1.1s step-end infinite" }}
                />
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Hero({ loaded }: { loaded: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<HTMLDivElement>(null);

  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const dragOffset = useRef({ x: 0, y: 0 });
  const [dragged, setDragged] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // ── Entrance animation ──
  useEffect(() => {
    if (!loaded || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.15 });

      tl.from(".hero-corner", {
        opacity: 0, y: 10, stagger: 0.08, duration: 0.6, ease: "power3.out",
      });

      tl.from(".hero-title-line", {
        y: "105%", skewY: 2, stagger: 0.1, duration: 0.9, ease: "power4.out",
      }, "-=0.3");

      tl.from(".hero-subheading", {
        y: 20, opacity: 0, duration: 0.8, ease: "power3.out",
      }, "-=0.6");

      tl.from(terminalRef.current, {
        y: 60, opacity: 0, duration: 0.9, ease: "power3.out",
      }, "-=0.65");

      tl.from(".hero-bottom-item", {
        opacity: 0, y: 8, stagger: 0.08, duration: 0.5, ease: "power3.out",
      }, "-=0.3");
    }, sectionRef);

    return () => ctx.revert();
  }, [loaded]);

  // ── Drag logic (desktop only) ──
  const onPointerDown = (e: React.PointerEvent) => {
    if (isMobile || !dragRef.current) return;
    isDragging.current = true;
    setDragged(true);
    dragStart.current = {
      x: e.clientX - dragOffset.current.x,
      y: e.clientY - dragOffset.current.y,
    };
    dragRef.current.setPointerCapture(e.pointerId);
    dragRef.current.style.cursor = "grabbing";
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current || !dragRef.current) return;
    const x = e.clientX - dragStart.current.x;
    const y = e.clientY - dragStart.current.y;
    dragOffset.current = { x, y };
    gsap.to(dragRef.current, { x, y, duration: 0.1, ease: "none" });
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (!dragRef.current) return;
    isDragging.current = false;
    dragRef.current.releasePointerCapture(e.pointerId);
    dragRef.current.style.cursor = "grab";
  };

  return (
    <section
      ref={sectionRef}
      className="relative h-[100svh] w-full bg-transparent overflow-hidden z-[2]"
    >
      <Starfield />

      {/* ══════════════════════════════════════
          MOBILE LAYOUT  (hidden md+)
      ══════════════════════════════════════ */}
      <div className="flex md:hidden flex-col min-h-[100svh] px-5 pt-24 pb-12 relative z-10 justify-center gap-10">

        {/* Top: Index + Title */}
        <div className="flex flex-col gap-4">
          <div className="hero-corner flex flex-col gap-0.5">
            <span className="text-white/30 font-heading text-[0.55rem] tracking-[0.25em] uppercase">01/</span>
            <span className="text-white/70 text-[0.65rem] font-black tracking-wide font-body leading-snug">
              From Kerala, IN<br />with passion
            </span>
          </div>

          <div className="flex flex-col leading-none">
            <div className="overflow-hidden">
              <div
                className="hero-title-line font-heading font-black text-white uppercase"
                style={{ fontSize: "clamp(2.5rem, 13vw, 4.5rem)", letterSpacing: "-0.04em", lineHeight: 0.88 }}
              >
                FULL STACK
              </div>
            </div>
            <div className="overflow-hidden">
              <div
                className="hero-title-line font-heading font-black text-white uppercase"
                style={{ fontSize: "clamp(2.5rem, 13vw, 4.5rem)", letterSpacing: "-0.04em", lineHeight: 0.88 }}
              >
                DEVELOPER
              </div>
            </div>
          </div>
        </div>

        {/* Middle: Static terminal */}
        <div className="w-full flex justify-center">
          <div className="w-full max-w-[400px]">
            <TerminalCard innerRef={terminalRef} />
          </div>
        </div>

        {/* Bottom: Description + scroll cue */}
        <div className="hero-subheading flex flex-col gap-5">
           <p className="font-body text-[0.8rem] leading-[1.65] text-white/50">
            Engineering future-proof digital architectures through strategic software design and scalable systems.
          </p>
          <div className="flex items-center justify-between">
            <span className="text-[0.58rem] font-bold text-white/40 tracking-widest uppercase">
              © {new Date().getFullYear()} Portfolio
            </span>
            <a
              href="#product"
              className="text-white/40 text-[0.55rem] tracking-[0.2em] uppercase font-black hover:text-white/80 transition-colors duration-300"
            >
              [ ↓ scroll ]
            </a>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          DESKTOP LAYOUT  (hidden below md)
      ══════════════════════════════════════ */}
      <div className="hidden md:flex flex-col justify-between h-full px-8 lg:px-10 pt-28 lg:pt-32 pb-6 relative z-10">

        {/* Top row */}
        <div className="flex items-start justify-between">
          {/* Top-left label */}
          <div className="hero-corner flex flex-col gap-1">
            <span className="text-white/30 font-heading text-[0.6rem] tracking-[0.25em] uppercase">01/</span>
            <span className="text-white/70 text-[0.7rem] font-black tracking-wide font-body leading-snug">
              From Kerala, IN<br />with passion
            </span>
          </div>

          {/* Top-right big title */}
          <div className="text-right">
            <div className="overflow-hidden">
              <div
                className="hero-title-line font-heading font-black text-white uppercase leading-[0.85]"
                style={{ fontSize: "clamp(3rem, 7vw, 8rem)", letterSpacing: "-0.04em" }}
              >
                FULL STACK
              </div>
            </div>
            <div className="overflow-hidden">
              <div
                className="hero-title-line font-heading font-black text-white uppercase leading-[0.85]"
                style={{ fontSize: "clamp(3rem, 7vw, 8rem)", letterSpacing: "-0.04em" }}
              >
                DEVELOPER
              </div>
            </div>
          </div>
        </div>

        {/* Draggable terminal — absolute centred */}
        <div className="absolute inset-0 flex items-center justify-start pl-[8vw] lg:pl-[12vw] pointer-events-none z-20">
          <div
            className="absolute w-[420px] h-[180px] rounded-full border border-white/[0.04] pointer-events-none hidden lg:block"
            style={{ transform: "translate(80px, 0) rotateX(65deg)" }}
          />

          <div
            ref={dragRef}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            className="relative will-change-transform select-none pointer-events-auto"
            style={{ cursor: "grab" }}
          >
            {/* Drag label */}
            <div className="absolute -top-6 left-5 flex items-center gap-1.5 pointer-events-none">
              <div className="w-1.5 h-1.5 rotate-45 bg-[#ff5f56]" />
              <span className="text-white/90 text-[0.45rem] font-black tracking-[0.25em] uppercase whitespace-nowrap">
                {dragged ? "DRAG ME" : "DRAG ME"}
              </span>
            </div>

            <div style={{ width: "clamp(300px, 40vw, 550px)" }}>
              <TerminalCard innerRef={terminalRef} />
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8 lg:gap-0">
          {/* Description */}
          <div className="hero-subheading flex flex-col gap-3 max-w-[520px]">
            <p className="font-body text-[0.85rem] leading-[1.6] text-white/50">
              Engineering future-proof digital architectures through strategic
              software design and scalable systems, crafting specialized
              solutions for a complex, tech-driven world.
            </p>
            <div className="text-[0.65rem] font-bold text-white/90 tracking-widest uppercase mt-2">
              © {new Date().getFullYear()} Portfolio
            </div>
          </div>

          {/* Location + scroll */}
          <div className="hero-bottom-item flex items-start gap-4 lg:self-end">
            <span className="text-white/80 text-xl lg:text-2xl mt-0.5 font-bold">→</span>
            <div className="flex flex-col gap-1">
              <span className="text-white/90 text-[0.60rem] tracking-[0.15em] uppercase font-black leading-[1.6]">
                BASED IN KERALA, INDIA<br />
                PASSIONATE IN ARCHITECTURE &amp; AI
              </span>
              <div className="flex flex-col gap-1 mt-6">
                <span className="text-white/50 text-[0.55rem] tracking-[0.2em] font-black">
                  Design &amp; code by Hashim
                </span>
                <a
                  href="#product"
                  className="text-white/40 text-[0.55rem] tracking-[0.2em] uppercase font-black hover:text-white/80 transition-colors duration-300 mt-1"
                >
                  [ ↓ scroll to explore ]
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>
    </section>
  );
}
