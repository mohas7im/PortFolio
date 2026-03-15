"use client";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export function useScrollReveal(options: gsap.TweenVars = {}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.from(el, {
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
        y: 60,
        opacity: 0,
        duration: 0.9,
        ease: "power2.out",
        ...options,
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return ref;
}
