"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import NextImage from "next/image";
import Link from "next/link";
import { useMagnetic } from "@/hooks/useMagnetic";

const IMG_DASHBOARD = "/icons/software2.png";
const PILLS = ["AI Reception", "Dental Chart", "HRMS · CRM", "Accounting"];

export default function FeaturedProduct() {
  const sectionRef  = useRef<HTMLElement>(null);
  const cardRef     = useRef<HTMLDivElement>(null);
  const magnetRef   = useMagnetic(0.3);

  useEffect(() => {
    if (!sectionRef.current || !cardRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".product-header-wrap",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 85%", once: true } }
      );
      gsap.fromTo(
        cardRef.current,
        { scale: 0.96, borderRadius: "20px" },
        {
          scale: 1,
          borderRadius: "16px",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start:   "top 90%",
            end:     "top 15%",
            scrub:   1.2,
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="product"
      className="relative w-full bg-bg z-[2] border-t border-white/[0.06] px-5 lg:px-12 pt-12 md:pt-24 pb-12 md:pb-16"
    >
      {/* Unified Section Header */}
      <div className="product-header-wrap max-w-[1400px] mx-auto mb-10 md:mb-16">
        <div className="text-[0.65rem] tracking-[0.2em] text-white/30 mb-6 uppercase font-bold flex items-center gap-3">
          <div className="w-8 h-px bg-white/30" />
          03 — FEATURED PRODUCT
        </div>
        <h2 className="font-heading text-[clamp(2.5rem,7vw,6rem)] font-bold text-white tracking-[-0.04em] leading-[0.9] uppercase">
          FEATURED PRODUCT
        </h2>
      </div>

      {/* ── Card: fixed comfortable height, side margins ── */}
      <div
        ref={cardRef}
        className="max-w-[1400px] mx-auto w-full p-2 md:p-6 bg-[#f0f0f0] overflow-hidden will-change-transform flex flex-col lg:flex-row h-auto min-h-[540px] lg:h-[clamp(540px,68vh,740px)]"
        style={{ borderRadius: "16px" }}
      >
        {/* ── Left — text column ───────────────────────── */}
        <div className="w-full lg:w-[42%] h-full flex flex-col justify-center px-5 py-8 md:px-10 lg:px-14 md:py-12 bg-gradient-to-r from-[#f0f0f0] via-[#f0f0f0]/95 to-transparent shrink-0 relative z-10">

          {/* Label */}
          <div className="flex items-center gap-2 mb-6">
            <div className="w-5 h-px bg-black/30" />
            <span className="text-black/35 text-[0.54rem] font-bold tracking-[0.24em] uppercase">
              ENTERPRISE SAAS
            </span>
          </div>

          {/* Title */}
          <h2
            className="font-heading font-black text-black uppercase leading-[0.88] tracking-[-0.04em] mb-4"
            style={{ fontSize: "clamp(2rem, 3.8vw, 3.8rem)" }}
          >
            DENTAL{" "}
            <span style={{ color: "rgba(0,0,0,0.18)", WebkitTextStroke: "1px rgba(0,0,0,0.13)" }}>
              EMR
            </span>
          </h2>

          {/* Description */}
          <p className="font-body text-black/65 text-[0.82rem] leading-[1.75] max-w-[38ch] mb-6">
            An AI-integrated EMR platform for modern dental clinics — reception,
            charting, HRMS, CRM &amp; full accounting in one system.
          </p>

          {/* Pills */}
          <div className="flex flex-wrap gap-1.5 mb-8">
            {PILLS.map((p) => (
              <span
                key={p}
                className="text-[0.52rem] font-bold tracking-wider uppercase text-black/40 border border-black/[0.1] rounded-full px-2.5 py-1 bg-black/[0.03]"
              >
                {p}
              </span>
            ))}
          </div>

          {/* CTA */}
          <Link href="/projects/dental-emr" className="no-underline cursor-none w-fit">
            <button
              ref={magnetRef}
              className="flex items-center gap-3 bg-black text-white px-6 py-3 rounded-full text-[0.62rem] font-black tracking-[0.14em] uppercase hover:bg-black/80 transition-all duration-300 shadow-lg cursor-none"
            >
              <span>View More</span>
              <span className="text-sm leading-none">→</span>
            </button>
          </Link>
        </div>

        {/* ── Right — screenshot with rounded terminal chrome ─ */}
        <div className="flex-1 min-h-[250px] relative overflow-hidden rounded-lg md:rounded-xl lg:rounded-2xl border border-black/[0.07] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.06)] mt-2 md:mt-0">
          {/* Browser chrome bar */}
          <div className="absolute top-0 left-0 right-0 z-10 flex items-center gap-1.5 px-4 py-2.5 bg-[#181818]/90 backdrop-blur-sm">
            <div className="w-2 h-2 rounded-full bg-[#ff5f56]" />
            <div className="w-2 h-2 rounded-full bg-[#ffbd2e]" />
            <div className="w-2 h-2 rounded-full bg-[#27c93f]" />
            <div className="flex-1 mx-3 py-0.5 px-3 bg-black/30 rounded text-[0.42rem] text-white/25 font-mono">
              dentalexis.app / dashboard
            </div>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </div>

          {/* Screenshot — fills height, shows left-top of the dashboard */}
          <NextImage
            src={IMG_DASHBOARD}
            alt="Dental EMR Dashboard"
            fill
            className="object-cover object-left-top"
            style={{ paddingTop: "36px" }}
            unoptimized
          />
        </div>
      </div>
    </section>
  );
}
