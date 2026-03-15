"use client";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import Image from "next/image";

export default function Statement() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const imageInnerRef = useRef<HTMLDivElement>(null);
  const clipRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);

  const words = [
    "Specializing", "in", "software",
    "development,", "I", "bridge", "the",
    "gap", "between", "complex", "backend",
    "logic", "and", "pixel‑perfect",
    "frontends.", "Building", "robust",
    "systems", "that", "scale", "and",
    "inspire."
  ];

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // ── 1. Scroll-scrubbed word highlight (opacity reveal per word)
      const wordEls = textRef.current?.querySelectorAll(".st-word");
      if (wordEls && wordEls.length) {
        gsap.fromTo(
          wordEls,
          { opacity: 0.08 },
          {
            opacity: 1,
            stagger: 0.06,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 65%",
              end: "center 45%",
              scrub: 1.5,
            },
          }
        );
      }

      // ── 2. Image clip-path reveal (trending "curtain open" effect)
      gsap.fromTo(
        clipRef.current,
        { clipPath: "inset(100% 0% 0% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.4,
          ease: "expo.inOut",
          scrollTrigger: {
            trigger: imageWrapRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );

      // ── 3. Subtle image parallax as you scroll past
      gsap.fromTo(
        imageInnerRef.current,
        { y: "0%" },
        {
          y: "-10%",
          ease: "none",
          scrollTrigger: {
            trigger: imageWrapRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );

      // ── 4. Tagline slide up
      gsap.from(taglineRef.current, {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: taglineRef.current,
          start: "top 88%",
          once: true,
        },
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-bg border-t border-white/[0.08] z-[2] overflow-hidden"
    >
      {/* ── Decorative grid line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-white/[0.04] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-20 lg:py-24 grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-14 lg:gap-20 items-center">

        {/* ── LEFT: Headline text */}
        <div className="flex flex-col gap-10">

          {/* Section label */}
          <div className="flex items-center gap-3 text-[0.6rem] font-black tracking-[0.3em] text-white/25 uppercase">
            <div className="w-6 h-px bg-white/25" />
            Philosophy
          </div>

          {/* Big scrubbed text */}
          <div
            ref={textRef}
            className="font-body text-[clamp(1.5rem,2.8vw,2.5rem)] leading-[1.65] font-medium tracking-normal text-white"
          >
            {words.map((word, i) => (
              <span
                key={i}
                className="st-word inline-block mr-[0.28em] mb-[0.1em]"
                style={{ opacity: 0.08 }}
              >
                {word}
              </span>
            ))}
          </div>

          {/* Tagline / meta row */}
          <div
            ref={taglineRef}
            className="flex flex-wrap items-center gap-6 pt-4 border-t border-white/[0.06]"
          >
            {[
              { label: "Years Exp.", value: "5+" },
              { label: "Projects Shipped", value: "30+" },
              { label: "Stack", value: "Full-Stack" },
            ].map(({ label, value }) => (
              <div key={label} className="flex flex-col gap-1">
                <span className="text-[2rem] font-black font-heading text-white leading-none">{value}</span>
                <span className="text-[0.6rem] font-bold tracking-[0.2em] text-white/30 uppercase">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT: Image with clip-path curtain reveal */}
        <div
          ref={imageWrapRef}
          className="relative w-full"
        >
          {/* Clipped image wrapper */}
          <div
            ref={clipRef}
            className="relative w-full aspect-[3/4] rounded-3xl overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.6)] border border-white/[0.08]"
            style={{ clipPath: "inset(100% 0% 0% 0%)" }}
          >
            <div ref={imageInnerRef} className="absolute inset-0 scale-110">
              <Image
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800"
                alt="Hashim — Software Developer"
                fill
                className="object-cover"
              />
              {/* Subtle colour overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>

              <div className="absolute bottom-5 left-5 right-5 z-10">
                <p className="text-white font-black text-sm tracking-wide">Hashim</p>
                <p className="text-white/50 text-[0.65rem] tracking-widest uppercase font-bold">Developer</p>
              </div>
          </div>

        </div>

      </div>
    </section>
  );
}
