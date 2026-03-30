"use client";
import { useEffect } from "react";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    let lenis: any;
    let rafId: number;

    const initLenis = async () => {
      const Lenis = (await import("lenis")).default;

      lenis = new Lenis({
        lerp: 0.08,
        smoothWheel: true,
        smoothTouch: true, // Enables smooth scroll on mobile touch events
        touchMultiplier: 2, // Enhances mobile scroll responsiveness
        // ── FIX 1: explicitly set the scroll root to <html> ──
        // Without this, Lenis creates its own scroll container
        // which silently breaks position:sticky on all children.
        wrapper: window,
        content: document.documentElement,
      } as any);

      // ── FIX 2: sync Lenis scroll time to GSAP ScrollTrigger ──
      // If you use GSAP ScrollTrigger anywhere (e.g. in Services.tsx),
      // ScrollTrigger needs to know about Lenis's scroll position.
      // Without this, ScrollTrigger fires at the wrong scroll offset.
      try {
        const { ScrollTrigger } = await import("gsap/ScrollTrigger");
        lenis.on("scroll", ScrollTrigger.update);
      } catch {
        // GSAP not installed — safe to ignore
      }

      const raf = (time: number) => {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);
    };

    initLenis();

    return () => {
      cancelAnimationFrame(rafId);
      if (lenis) lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}