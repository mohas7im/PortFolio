"use client";
import { useEffect, useRef, memo } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/* ─── Static particle positions (no Math.random at render – avoids hydration mismatch) ─── */
const PARTICLES = [
  { x:7,  y:82, s:2.5, d:9,  dl:0   }, { x:18, y:68, s:2,   d:11, dl:1.5 },
  { x:31, y:90, s:3,   d:8,  dl:3   }, { x:44, y:74, s:1.5, d:13, dl:0.5 },
  { x:57, y:87, s:2,   d:10, dl:2   }, { x:66, y:63, s:3.5, d:7,  dl:4   },
  { x:74, y:79, s:2,   d:12, dl:1   }, { x:84, y:91, s:1.5, d:9,  dl:3.5 },
  { x:91, y:71, s:3,   d:11, dl:0.8 }, { x:22, y:53, s:2,   d:8,  dl:5   },
  { x:37, y:43, s:1.5, d:14, dl:2.5 }, { x:51, y:58, s:2.5, d:9,  dl:1.2 },
  { x:62, y:38, s:2,   d:10, dl:3.8 }, { x:77, y:50, s:3,   d:12, dl:0.3 },
  { x:88, y:43, s:1.5, d:8,  dl:4.5 }, { x:13, y:36, s:2,   d:11, dl:2.1 },
  { x:95, y:28, s:2.5, d:9,  dl:1.7 }, { x:41, y:22, s:1.5, d:13, dl:3.2 },
];

/* ─── Stack data ─── */
const STACK = [
  {
    category: "CORE LANGUAGES",
    accent: "#F7DF1E",
    rgb: "247,223,30",
    items: [
      { name:"Python",     icon:"/icons/python.svg",     hint:"Language"    },
      { name:"JavaScript", icon:"/icons/javascript.svg", hint:"Language"    },
      { name:"TypeScript", icon:"/icons/typescript.svg", hint:"Language"    },
      { name:"PHP",        icon:"/icons/php.svg",        hint:"Language"    },
      { name:"HTML",       icon:"/icons/html.svg",       hint:"Markup"      },
      { name:"CSS",        icon:"/icons/css.svg",        hint:"Styling"     },
      { name:"SQL",        icon:"/icons/sql.svg",        hint:"Database"    },
    ],
  },
  {
    category: "FRAMEWORKS & LIBRARIES",
    accent: "#00F5FF",
    rgb: "0,245,255",
    items: [
      { name:"Django",    icon:"/icons/django.svg",    hint:"Framework"     },
      { name:"Next.js",   icon:"/icons/nextjs.svg",    hint:"Framework"     },
      { name:"React",     icon:"/icons/react.svg",     hint:"Library ★"     },
      { name:"Tailwind",  icon:"/icons/tailwind.svg",  hint:"CSS Framework" },
      { name:"Bootstrap", icon:"/icons/bootstrap.svg", hint:"CSS Framework" },
      { name:"Chart.js",  icon:"/icons/chartjs.svg",   hint:"Library"       },
    ],
  },
  {
    category: "TOOLS & MOTION",
    accent: "#39FF14",
    rgb: "57,255,20",
    items: [
      { name:"GSAP",       icon:"/icons/gsap.svg",      hint:"Animation"     },
      { name:"Lenis",      icon:"/icons/lenis.svg",     hint:"Smooth Scroll" },
      { name:"React Bits", icon:"/icons/reactbits.svg", hint:"UI Library"    },
      { name:"Git",        icon:"/icons/git.svg",       hint:"Version Control"},
      { name:"Docker",     icon:"/icons/docker.svg",    hint:"DevOps"         },
    ],
  },
];



/* ─── Floating particle field ─── */
const ParticleField = memo(function ParticleField() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const els = ref.current.querySelectorAll<HTMLElement>(".ag-pt");
    els.forEach((el, i) => {
      const p = PARTICLES[i];
      gsap.set(el, { opacity: 0 });
      gsap.to(el, {
        keyframes: [
          { opacity: 0, y: 0, x: 0, duration: 0 },
          { opacity: p.s * 0.06, duration: p.d * 0.15 },
          { opacity: p.s * 0.04, y: -(100 + i * 7), x: Math.sin(i) * 25, duration: p.d * 0.7 },
          { opacity: 0, y: -(160 + i * 7), duration: p.d * 0.15 },
        ],
        delay: p.dl,
        repeat: -1,
        ease: "none",
      });
    });
  }, []);

  return (
    <div ref={ref} className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
      {PARTICLES.map((p, i) => (
        <span
          key={i}
          className="ag-pt absolute rounded-full bg-white block"
          style={{ left:`${p.x}%`, top:`${p.y}%`, width:`${p.s}px`, height:`${p.s}px` }}
        />
      ))}
    </div>
  );
});

/* ─── Individual tech card ─── */
function TechCard({
  name, icon, hint, accent, rgb,
}: { name:string; icon:string; hint:string; accent:string; rgb:string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const hovered = useRef(false);

  // gsap.quickTo refs
  const qx    = useRef<gsap.QuickToFunc | null>(null);
  const qy    = useRef<gsap.QuickToFunc | null>(null);
  const qRX   = useRef<gsap.QuickToFunc | null>(null);
  const qRY   = useRef<gsap.QuickToFunc | null>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    // Init quickTo for magnetic pull
    qx.current  = gsap.quickTo(el, "x",       { duration: 0.5, ease: "power3.out" });
    qy.current  = gsap.quickTo(el, "y",       { duration: 0.5, ease: "power3.out" });
    qRX.current = gsap.quickTo(el, "rotationX", { duration: 0.5, ease: "power3.out" });
    qRY.current = gsap.quickTo(el, "rotationY", { duration: 0.5, ease: "power3.out" });

    const RADIUS = 120;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width  / 2;
      const cy = rect.top  + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);

      if (dist < RADIUS) {
        const t = (RADIUS - dist) / RADIUS;
        qx.current!(dx * t * 0.3);
        qy.current!(dy * t * 0.3);
        qRX.current!(-dy * t * 14);
        qRY.current!( dx * t * 14);
      } else if (!hovered.current) {
        qx.current!(0); qy.current!(0);
        qRX.current!(0); qRY.current!(0);
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const onEnter = () => {
    hovered.current = true;
    const el = cardRef.current;
    if (!el) return;
    const rot = (Math.sin(Date.now() * 0.001) * 3);
    gsap.to(el, {
      y: -14, scale: 1.08, rotation: rot, duration: 0.35, ease: "power2.out",
      boxShadow: `0 24px 48px rgba(${rgb},0.28), 0 0 0 1px rgba(${rgb},0.35)`,
    });
    if (glowRef.current) gsap.to(glowRef.current, { opacity: 1, duration: 0.3 });
  };

  const onLeave = () => {
    hovered.current = false;
    const el = cardRef.current;
    if (!el) return;
    gsap.to(el, {
      y: 0, scale: 1, rotation: 0, duration: 0.6, ease: "elastic.out(1,0.5)",
      boxShadow: "none",
    });
    qx.current!(0); qy.current!(0); qRX.current!(0); qRY.current!(0);
    if (glowRef.current) gsap.to(glowRef.current, { opacity: 0, duration: 0.3 });
  };

  return (
    <div className="tech-card flex flex-col items-center">
      <div
        ref={cardRef}
        className="relative flex flex-col items-center gap-3 cursor-none select-none w-full h-full"
        style={{ transformStyle:"preserve-3d", perspective:"800px" }}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
      >
        {/* Accent glow halo */}
      <div
        ref={glowRef}
        className="absolute -inset-4 rounded-3xl pointer-events-none opacity-0"
        style={{
          background: `radial-gradient(circle, rgba(${rgb},0.22) 0%, transparent 70%)`,
          filter: "blur(10px)",
        }}
      />

      {/* Glassmorphism icon box */}
      <div
        className="relative w-[68px] h-[68px] rounded-2xl flex items-center justify-center overflow-hidden transition-colors duration-300"
        style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.08)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
        }}
      >
        {/* Subtle inner shine */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.07) 0%, transparent 60%)",
          }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={icon}
          alt={name}
          width={36}
          height={36}
          className="relative z-10 object-contain"
          style={{ filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.5))" }}
        />
      </div>

      {/* Name + hint */}
      <div className="flex flex-col items-center gap-0.5">
        <span className="text-[0.62rem] font-bold tracking-[0.18em] text-white/75 uppercase leading-tight">
          {name}
        </span>
        <span className="text-[0.5rem] tracking-[0.22em] uppercase font-medium" style={{ color: accent, opacity: 0.75 }}>
          {hint}
        </span>
      </div>
    </div>
    </div>
  );
}

/* ─── Main About section ─── */
export default function About() {
  const sectionRef  = useRef<HTMLElement>(null);
  const headWrapRef = useRef<HTMLDivElement>(null);
  const headingRef  = useRef<HTMLHeadingElement>(null);
  const labelRef    = useRef<HTMLDivElement>(null);
  const bioRef      = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {

      /* 1 ── Heading clip-path wipe up */
      gsap.fromTo(headingRef.current,
        { clipPath:"inset(100% 0 0 0)", y: 50 },
        {
          clipPath:"inset(0% 0 0 0)", y: 0,
          duration: 1.2, ease:"power4.inOut",
          scrollTrigger:{ trigger:headingRef.current, start:"top 88%", once:true },
        }
      );

      /* 2 ── Label + bio slide from left */
      gsap.from([labelRef.current, bioRef.current], {
        x:-50, opacity:0, duration:0.8, stagger:0.12, ease:"power4.out",
        scrollTrigger:{ trigger:labelRef.current, start:"top 90%", once:true },
      });

      /* 3 ── Category header: char-by-char stagger */
      document.querySelectorAll<HTMLElement>(".cat-label-text").forEach(el => {
        const raw = el.textContent ?? "";
        el.innerHTML = raw.split("").map(ch =>
          `<span class="cc" style="display:inline-block">${ch === " " ? "&nbsp;" : ch}</span>`
        ).join("");
        gsap.from(el.querySelectorAll(".cc"), {
          x:-20, opacity:0, duration:0.35, stagger:0.022, ease:"power4.out",
          scrollTrigger:{ trigger:el, start:"top 88%", once:true },
        });
      });

      /* 4 ── Antigravity wave card launch (per category) */
      document.querySelectorAll<HTMLElement>(".cat-section").forEach(sec => {
        const cards = sec.querySelectorAll<HTMLElement>(".tech-card");
        gsap.fromTo(cards,
          { y:120, rotation:-8, scale:0.7, opacity:0 },
          {
            y:0, rotation:0, scale:1, opacity:1,
            duration:0.9, ease:"back.out(2.2)",
            stagger:{ from:"center", amount:0.5 },
            scrollTrigger:{ trigger:sec, start:"top 82%", once:true },
          }
        );
      });

      /* 5 ── Parallax: accent dots at 0.3x, heading at 0.15x */
      gsap.to(".cat-dot", {
        y:-50, ease:"none",
        scrollTrigger:{ trigger:sectionRef.current, start:"top bottom", end:"bottom top", scrub:0.3 },
      });
      if (headingRef.current) {
        gsap.to(headingRef.current, {
          y:-30, ease:"none",
          scrollTrigger:{ trigger:sectionRef.current, start:"top bottom", end:"bottom top", scrub:0.15 },
        });
      }



    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-28 bg-bg border-t border-white/[0.08] z-[2] overflow-hidden"
    >
      {/* Injected CSS */}
      <style>{`
        @keyframes ag-drift {
          0%   { transform:translateY(0) translateX(0); opacity:0; }
          10%  { opacity:1; }
          85%  { opacity:.5; }
          100% { transform:translateY(-180px) translateX(18px); opacity:0; }
        }
      `}</style>

      {/* Background particle field */}
      <ParticleField />

      {/* Subtle radial ambient */}
      <div
        className="absolute pointer-events-none"
        style={{
          top:"-20%", right:"5%",
          width:"700px", height:"700px",
          background:"radial-gradient(circle, rgba(255,255,255,0.012) 0%, transparent 65%)",
        }}
      />

      <div className="max-w-[1400px] mx-auto px-10 relative z-10">

        {/* ── Section label ── */}
        <div
          ref={labelRef}
          className="text-[0.65rem] tracking-[0.22em] text-white/30 mb-8 uppercase font-bold flex items-center gap-3"
        >
          <div className="w-8 h-px bg-white/30" />
          05 — TECH STACK
        </div>

        {/* ── Header row ── */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-20">
          <div ref={headWrapRef} style={{ overflow:"hidden" }}>
            <h2
              ref={headingRef}
              className="font-heading leading-[0.88] font-black tracking-[-0.05em] uppercase text-white"
              style={{ fontSize:"clamp(2.2rem, 10.5vw, 7.5rem)" }}
            >
              TOOLS &amp;<br />TECHNOLOGIES
            </h2>
          </div>
          <p
            ref={bioRef}
            className="text-[1.05rem] leading-[1.8] text-white/45 max-w-[420px] lg:text-right"
          >
            A curated set of languages, frameworks&nbsp;&amp;&nbsp;libraries I wield to
            build full‑stack digital products — from resilient backend APIs to
            polished, motion-rich interfaces.
          </p>
        </div>

        {/* ── Category sections ── */}
        <div className="flex flex-col gap-16">
          {STACK.map(({ category, accent, rgb, items }) => (
            <div key={category} className="cat-section">

              {/* Category header */}
              <div className="flex items-center gap-5 mb-10">
                {/* Parallax dot */}
                <div
                  className="cat-dot w-2 h-2 rounded-full shrink-0"
                  style={{ background:accent, boxShadow:`0 0 10px ${accent}` }}
                />
                <span
                  className="cat-label-text font-heading text-[0.65rem] font-black tracking-[0.4em] uppercase"
                  style={{ color:accent, letterSpacing:"0.4em" }}
                >
                  {category}
                </span>
                <div className="flex-1 h-px" style={{ background:`linear-gradient(90deg, rgba(${rgb},0.2), transparent)` }} />
                {/* Accent halo behind row */}
                <span className="text-[0.55rem] tracking-[0.25em] text-white/20 font-bold">
                  {items.length} TOOLS
                </span>
              </div>

              {/* Subtle accent halo behind card row */}
              <div
                className="relative"
                style={{
                  background:`radial-gradient(ellipse 70% 200px at 50% 60%, rgba(${rgb},0.04) 0%, transparent 70%)`,
                }}
              >
                {/* Card grid */}
                <div className="flex flex-wrap gap-6">
                  {items.map(item => (
                    <TechCard
                      key={item.name}
                      name={item.name}
                      icon={item.icon}
                      hint={item.hint}
                      accent={accent}
                      rgb={rgb}
                    />
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>



      </div>
    </section>
  );
}
