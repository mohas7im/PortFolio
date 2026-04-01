"use client";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import dynamic from "next/dynamic";
import Link from "next/link";
import CustomCursor from "@/components/CustomCursor";
import Nav from "@/components/Nav";
import ContactDrawer from "@/components/ContactDrawer";

// Local Components
import ProjectHero from "./ProjectHero";
import ProjectMarquee from "./ProjectMarquee";
import ProjectModules from "./ProjectModules";
import ProjectCapabilities from "./ProjectCapabilities";
import ProjectTechStack from "./ProjectTechStack";
import ProjectPricing from "./ProjectPricing";
import ProjectCTA from "./ProjectCTA";

const SmoothScroll = dynamic(() => import("@/components/SmoothScroll"), {
  ssr: false,
});

export default function DentalEMRClient() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDemoOpen, setIsDemoOpen] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      // Hero entrance
      const tl = gsap.timeline({ delay: 0.3 });
      tl.from(".h-eyebrow", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      })
        .from(
          ".h-title-line",
          { y: 60, opacity: 0, stagger: 0.09, duration: 1, ease: "power4.out" },
          "-=0.5",
        )
        .from(
          ".h-desc",
          { y: 20, opacity: 0, duration: 0.8, ease: "power3.out" },
          "-=0.6",
        )
        .from(
          ".h-meta-item",
          {
            y: 16,
            opacity: 0,
            stagger: 0.08,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.5",
        )
        .from(
          ".h-cta",
          { y: 16, opacity: 0, duration: 0.5, ease: "power3.out" },
          "-=0.4",
        )
        .from(
          ".hero-mockup",
          { x: 120, opacity: 0, duration: 1.4, ease: "power4.out" },
          0.4,
        );

      // Generic reveals
      gsap.utils.toArray<HTMLElement>(".sr-label").forEach((el) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: "top 90%" },
          y: 10,
          opacity: 0,
          duration: 0.6,
          ease: "power3.out",
        });
      });

      gsap.utils.toArray<HTMLElement>(".sr-heading").forEach((el) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: "top 85%" },
          y: 40,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        });
      });

      gsap.utils.toArray<HTMLElement>(".sr-text").forEach((el) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: "top 88%" },
          y: 24,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        });
      });

      // Capability cards
      gsap.utils.toArray<HTMLElement>(".cap-card").forEach((el, i) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: "top 90%" },
          y: 40,
          opacity: 0,
          duration: 0.7,
          delay: (i % 3) * 0.08,
          ease: "power3.out",
        });
      });

      // Pricing cards from right
      gsap.utils.toArray<HTMLElement>(".price-card").forEach((el, i) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: "top 90%" },
          x: 50 + i * 20,
          opacity: 0,
          duration: 0.9,
          delay: i * 0.1,
          ease: "power3.out",
        });
      });

      // Stack chips
      gsap.utils.toArray<HTMLElement>(".stack-chip").forEach((el, i) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: "top 92%" },
          x: 30,
          opacity: 0,
          duration: 0.6,
          delay: i * 0.05,
          ease: "power3.out",
        });
      });

      gsap.from(".cta-block", {
        scrollTrigger: { trigger: ".cta-block", start: "top 80%" },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <div className="grid-bg" />
      <div className="noise-overlay" />
      <CustomCursor />

      <SmoothScroll>
        <Nav />
        <main
          ref={containerRef}
          className="bg-[#f5f5f7] text-[#0a0a0a] font-body overflow-x-clip cursor-none antialiased relative z-10 flex flex-col"
        >
          {/* Components */}
          <ProjectHero onOpenDemo={() => setIsDemoOpen(true)} />
          <ProjectMarquee />
          <ProjectModules onOpenDemo={() => setIsDemoOpen(true)} />
          <ProjectCapabilities />
          <ProjectTechStack />
          <ProjectPricing onOpenDemo={() => setIsDemoOpen(true)} />
          <ProjectCTA onOpenDemo={() => setIsDemoOpen(true)} />

          {/* Footer strip */}
          <div className="bg-[#0a0a0a] border-t border-white/[0.05] px-6 md:px-10 py-7 flex items-center justify-between mt-auto">
            <Link
              href="/"
              className="text-[0.58rem] font-black tracking-[0.2em] uppercase text-white/20 hover:text-white/45 transition-colors"
            >
              ← Portfolio
            </Link>
            <span className="text-[0.52rem] font-bold tracking-[0.2em] uppercase text-white/15">
              Dental EMR · Case Study · 2026
            </span>
          </div>
        </main>
      </SmoothScroll>

      <ContactDrawer isOpen={isDemoOpen} onClose={() => setIsDemoOpen(false)} />
    </>
  );
}
