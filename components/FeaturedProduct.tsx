"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import NextImage from "next/image";
import Link from "next/link";
import { useMagnetic } from "@/hooks/useMagnetic";

// ── Replace these with real product UI screenshots ────────────────────────────
const IMG_DASHBOARD =
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop";
const IMG_CHART =
  "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop";

const PILLS = ["AI Reception", "Dental Chart", "HRMS · CRM", "Accounting"];

export default function FeaturedProduct() {
  const containerRef  = useRef<HTMLElement>(null);
  const mediaWrapRef  = useRef<HTMLDivElement>(null);
  const step1BgRef    = useRef<HTMLDivElement>(null); // light bg layer for crossfade
  const step1Ref      = useRef<HTMLDivElement>(null);
  const step2Ref      = useRef<HTMLDivElement>(null);
  const img1Ref       = useRef<HTMLDivElement>(null);
  const img2Ref       = useRef<HTMLDivElement>(null);
  const cardStripRef  = useRef<HTMLDivElement>(null); // drag outer (overflow-hidden)
  const cardInnerRef  = useRef<HTMLDivElement>(null); // drag inner (translateX target)
  const magnetRef     = useMagnetic(0.3);

  useEffect(() => {
    if (!containerRef.current || !mediaWrapRef.current) return;

    const ctx = gsap.context(() => {

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start:   "top top",
          end:     "+=300%",
          scrub:   1.4,
          pin:     true,
          anticipatePin: 1,
          onEnter:     () => document.body.setAttribute("data-hide-nav", "true"),
          onLeave:     () => document.body.removeAttribute("data-hide-nav"),
          onEnterBack: () => document.body.setAttribute("data-hide-nav", "true"),
          onLeaveBack: () => document.body.removeAttribute("data-hide-nav"),
        },
      });

      // ── Phase 0: gentle lift (no rotate — no bend) ──────────────────────
      tl.to(mediaWrapRef.current, {
        y:        -18,
        duration: 0.5,
        ease:     "power2.out",
        onStart: () => {
          if (mediaWrapRef.current)
            mediaWrapRef.current.style.willChange = "transform, width, height, border-radius";
        },
      });

      // ── Phase 1: card expands to fill the viewport (no rotation ever) ────
      tl.to(mediaWrapRef.current, {
        width:        "100vw",
        height:       "100vh",
        borderRadius: "0px",
        y:            0,
        duration:     2.6,
        ease:         "power2.inOut",
        onComplete: () => {
          if (mediaWrapRef.current)
            mediaWrapRef.current.style.willChange = "auto";
        },
      });

      // ── Step 1: staggered dissolve UP + light bg fades to dark ─────────
      if (step1Ref.current) {
        const kids = step1Ref.current.querySelectorAll<HTMLElement>(".s1-child");
        tl.to(
          kids.length ? kids : [step1Ref.current],
          { opacity: 0, y: -28, stagger: 0.12, duration: 0.8, ease: "power2.inOut" },
          "<0.3"
        );
      }
      // Fade the white bg layer out → reveals the dark mediaWrap beneath
      if (step1BgRef.current) {
        tl.to(step1BgRef.current, { opacity: 0, duration: 1.0, ease: "power2.inOut" }, "<0.2");
      }

      tl.to({}, { duration: 0.25 });

      // ── Phase 2: crossfade step2 in (opacity 0 → 1, no snap) ────────────
      if (step2Ref.current && img1Ref.current && img2Ref.current) {
        // step2 is already visible (opacity:0) — fade it in, then enable pointer events
        tl.to(step2Ref.current, {
          opacity: 1,
          duration: 0.9,
          ease: "power2.out",
          onComplete: () => {
            if (step2Ref.current) step2Ref.current.style.pointerEvents = "auto";
          },
        });

        // img1 — zooms out into place
        tl.fromTo(
          img1Ref.current,
          { scale: 1.12, y: 24, opacity: 0 },
          {
            scale: 1, y: 0, opacity: 1, duration: 1.6, ease: "power3.out",
            onStart:    () => { if (img1Ref.current) img1Ref.current.style.willChange = "transform, opacity"; },
            onComplete: () => { if (img1Ref.current) img1Ref.current.style.willChange = "auto"; },
          },
          "<0.2"
        );

        // img2 — slides in from right
        tl.fromTo(
          img2Ref.current,
          { x: 70, opacity: 0 },
          {
            x: 0, opacity: 1, duration: 1.4, ease: "power3.out",
            onStart:    () => { if (img2Ref.current) img2Ref.current.style.willChange = "transform, opacity"; },
            onComplete: () => { if (img2Ref.current) img2Ref.current.style.willChange = "auto"; },
          },
          "<0.18"
        );
      }

      // ── Linger at the end ─────────────────────────────────────────────────
      tl.to({}, { duration: 1.2 });

      // ── Drag-to-scroll via translateX — wheel events untouched (GSAP scrub safe) ──
      // overflow-hidden on outer, translateX on inner → no native scroll, no wheel capture
      const strip = cardStripRef.current;
      const inner = cardInnerRef.current;
      if (strip && inner) {
        let isDown    = false;
        let startX    = 0;
        let currentX  = 0;
        let dragStartX = 0;

        const getMaxDrag = () =>
          Math.max(0, inner.scrollWidth - strip.clientWidth);

        const onPointerDown = (e: PointerEvent) => {
          isDown     = true;
          startX     = e.clientX;
          dragStartX = currentX;
          strip.setPointerCapture(e.pointerId);
          strip.style.cursor = "grabbing";
        };
        const onPointerMove = (e: PointerEvent) => {
          if (!isDown) return;
          const delta = e.clientX - startX;
          currentX = Math.min(0, Math.max(-getMaxDrag(), dragStartX + delta));
          inner.style.transform = `translateX(${currentX}px)`;
        };
        const onPointerUp = () => {
          isDown = false;
          strip.style.cursor = "grab";
        };

        strip.addEventListener("pointerdown",   onPointerDown);
        strip.addEventListener("pointermove",   onPointerMove);
        strip.addEventListener("pointerup",     onPointerUp);
        strip.addEventListener("pointercancel", onPointerUp);

        return () => {
          strip.removeEventListener("pointerdown",   onPointerDown);
          strip.removeEventListener("pointermove",   onPointerMove);
          strip.removeEventListener("pointerup",     onPointerUp);
          strip.removeEventListener("pointercancel", onPointerUp);
        };
      }

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{`
        @keyframes fp-glow {
          0%,100% { box-shadow: 0 0 18px rgba(255,255,255,0.07); }
          50%      { box-shadow: 0 0 55px rgba(255,255,255,0.22), 0 0 90px rgba(255,255,255,0.07); }
        }
      `}</style>

      {/* ════════════════════════════════════════════════════════════════════
          PINNED EXPAND SECTION
      ════════════════════════════════════════════════════════════════════ */}
      <section
        ref={containerRef}
        id="product"
        className="relative h-screen w-full bg-bg z-[2] flex items-center justify-center overflow-hidden border-t border-white/[0.08]"
      >
        {/* ── Section label ──────────────────────────────────────────────── */}
        <div className="absolute top-10 left-6 lg:left-10 z-20 flex items-center gap-3 text-[0.62rem] tracking-[0.22em] text-white/25 uppercase font-bold pointer-events-none">
          <div className="w-7 h-px bg-white/25" />
          03 — Featured Product
        </div>

        {/* ── Expanding card ─────────────────────────────────────────────── */}
        <div
          ref={mediaWrapRef}
          className="relative bg-[#080808] rounded-[28px] lg:rounded-[40px] overflow-hidden shadow-[0_50px_130px_rgba(0,0,0,0.55)] z-10 flex items-center justify-center"
          style={{ width: "88vw", height: "78vh" }}
        >

          {/* ── STEP 1: Light card — intro content ─────────────────────── */}
          {/* Separate white bg layer that fades out independently → smooth crossfade */}
          <div
            ref={step1BgRef}
            className="absolute inset-0 z-[18] bg-[#f0f0f0] pointer-events-none"
          />
          <div
            ref={step1Ref}
            className="absolute inset-0 z-20 flex flex-col lg:flex-row items-center w-full h-full pointer-events-none"
          >
            {/* Left — text */}
            <div className="w-full lg:w-[48%] h-full flex flex-col justify-center px-8 lg:px-14 py-12 relative z-10">

              <div className="s1-child flex items-center gap-2.5 mb-8">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                <span className="text-black/50 text-[0.58rem] font-bold tracking-[0.24em] uppercase">
                  Featured Case Study
                </span>
              </div>

              <h2 className="s1-child font-heading font-black text-black uppercase leading-[0.88] tracking-[-0.04em] mb-5"
                style={{ fontSize: "clamp(2.8rem,5.5vw,5.5rem)" }}>
                DENTAL
                <br />
                <span className="text-black/20">EMR</span>
              </h2>

              <p className="s1-child font-body text-black/50 text-[0.88rem] leading-[1.78] max-w-[38ch] mb-8">
                An AI-integrated electronic medical records platform for modern
                dental clinics. Covers reception, clinical charting, HRMS, CRM,
                and full accounting — all in one system.
              </p>

              {/* Pills */}
              <div className="s1-child flex flex-wrap gap-2 mb-10">
                {PILLS.map((p) => (
                  <span
                    key={p}
                    className="text-[0.56rem] font-bold tracking-wider uppercase text-black/50 border border-black/[0.1] rounded-full px-3 py-1 bg-black/[0.04]"
                  >
                    {p}
                  </span>
                ))}
              </div>

              <div className="s1-child pointer-events-auto">
                <Link href="/projects/dental-emr" className="no-underline cursor-none">
                  <button
                    ref={magnetRef}
                    className="flex items-center gap-3 bg-black text-white px-7 py-3.5 rounded-full text-[0.66rem] font-black tracking-[0.14em] uppercase hover:bg-black/80 hover:scale-[1.04] transition-all duration-300 shadow-lg cursor-none"
                  >
                    <span>View More</span>
                    <span className="text-base leading-none">→</span>
                  </button>
                </Link>
              </div>
            </div>

            {/* Right — product preview image (step 1 hero) */}
            <div className="w-full lg:w-[52%] h-[45%] lg:h-full relative overflow-hidden flex items-center justify-center p-4 lg:p-10">
              <div className="s1-child relative w-full h-full rounded-xl lg:rounded-2xl overflow-hidden shadow-xl border border-black/10 lg:translate-x-8">
                <NextImage
                  src={IMG_DASHBOARD}
                  alt="Dental EMR — Dashboard preview"
                  fill
                  className="object-cover object-left-top"
                  unoptimized
                />
              </div>
            </div>
          </div>

          {/* ── STEP 2: Dark expanded — crossfades in via opacity ─────────── */}
          <div
            ref={step2Ref}
            className="absolute inset-0 z-30 bg-[#070707] flex items-center justify-center"
            style={{ opacity: 0, pointerEvents: "none" }}
          >
            {/* Subtle noise */}
            <div
              className="absolute inset-0 pointer-events-none z-[1] opacity-[0.03]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                backgroundRepeat: "repeat",
                backgroundSize: "128px",
              }}
            />

        

        </div>
      </section>
    </>
  );
}
