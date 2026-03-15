"use client";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import NextImage from "next/image";
import { FeaturedProductCard } from "./FeaturedProductCard";

const products = [
  {
    num: "01",
    title: "DENTAL EMR",
    desc: "A full-featured Electronic Medical Records system for dental clinics. Patient records, appointments, treatment charting, billing, and reporting.",
    tags: ["Django", "React", "TypeScript", "PostgreSQL", "Docker"],
    accent: "#00f5ff",
    bgClass: "bg-[#f5f5f7]",
    glow: "from-blue-400/25 via-cyan-300/10 to-transparent",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=900",
    uiLabel: "dental-emr — dashboard",
  },
  {
    num: "02",
    title: "AI AGENT CORE",
    desc: "Autonomous workflow engine orchestrating multiple LLMs to complete complex multi-step tasks across enterprise APIs without human intervention.",
    tags: ["Next.js", "Python", "LangChain", "OpenAI"],
    accent: "#a855f7",
    bgClass: "bg-[#f0f0f4]",
    glow: "from-purple-400/25 via-fuchsia-300/10 to-transparent",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=900",
    uiLabel: "agent-core — run",
  },
  {
    num: "03",
    title: "SECURE VAULT",
    desc: "Zero-knowledge encrypted file storage and sharing platform built for legal and compliance teams needing absolute data sovereignty.",
    tags: ["Rust", "TypeScript", "WebCrypto", "AWS S3"],
    accent: "#39FF14",
    bgClass: "bg-[#f2f4f2]",
    glow: "from-emerald-400/25 via-teal-300/10 to-transparent",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=900",
    uiLabel: "vault — encrypt",
  },
];

const CARD_GAP = 64; // px between cards

export default function FeaturedProduct() {
  const sectionRef = useRef<HTMLElement>(null);
  const reelRef    = useRef<HTMLDivElement>(null);
  const cardRefs   = useRef<(HTMLDivElement | null)[]>([]);
  const dotRefs    = useRef<(HTMLDivElement | null)[]>([]);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const reel    = reelRef.current;
    if (!section || !reel) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // ── DESKTOP: Horizontal 3D Reel ──
      mm.add("(min-width: 1024px)", () => {
        const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
        if (!cards.length) return;

        const cardW     = cards[0].offsetWidth;
        const vw        = section.offsetWidth;
        const scrollDist = (cards.length - 1) * (cardW + CARD_GAP);

        // Starting X so card 0 is centered in viewport
        const startX = (vw - cardW) / 2;

        // Apply perspective rotations + scale + opacity to all cards based on progress
        const applyRotations = (progress: number) => {
          const currentX = startX - progress * scrollDist;

          cards.forEach((card, i) => {
            const centerX = currentX + i * (cardW + CARD_GAP) + cardW / 2;
            const offset  = (centerX - vw / 2) / vw; // normalised distance from center
            const clamped = Math.max(-0.65, Math.min(0.65, offset));

            gsap.set(card, {
              rotateY: clamped * -42,           // -27° to 27° perspective tilt
              scale:   1 - Math.abs(clamped) * 0.16,
              opacity: 1 - Math.abs(clamped) * 0.55,
            });
          });

          // Update progress bar
          if (progressRef.current) {
            gsap.set(progressRef.current, { scaleX: progress, transformOrigin: "left center" });
          }

          // Update nav dots
          const activeIdx = Math.round(progress * (cards.length - 1));
          dotRefs.current.forEach((dot, i) => {
            if (!dot) return;
            gsap.set(dot, {
              backgroundColor: i === activeIdx ? "#ffffff"            : "rgba(255,255,255,0.18)",
              scale:           i === activeIdx ? 1.25 : 1,
            });
          });
        };

        // Set initial state
        gsap.set(reel, { x: startX });
        gsap.set(cards, { willChange: "transform, opacity" });
        applyRotations(0);

        // ScrollTrigger: pin section + drive horizontal translation
        gsap.to(reel, {
          x: startX - scrollDist,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start:   "top top",
            end:     `+=${scrollDist}`,
            pin:     true,
            scrub:   1,
            onUpdate: (st) => applyRotations(st.progress),
          },
        });
      });

      // ── MOBILE: Vertical Stack Fade In ──
      mm.add("(max-width: 1023px)", () => {
        const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
        // Reset properties that might have been applied by desktop version if resized
        gsap.set(cards, { clearProps: "all" });
        gsap.set(reel, { clearProps: "all" });

        cards.forEach((card) => {
          gsap.fromTo(card,
            { y: 60, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
              }
            }
          );
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="product"
      className="relative bg-bg border-t border-white/[0.08] z-[2] overflow-hidden lg:h-screen lg:min-h-[800px] h-auto pb-24 lg:pb-0"
    >
      {/* ── Section label ── */}
      <div className="absolute top-8 left-6 lg:left-10 z-20 text-[0.65rem] tracking-[0.2em] text-white/30 uppercase font-bold flex items-center gap-3">
        <div className="w-8 h-px bg-white/30" />
        01 — Featured Works
      </div>

      {/* ── Card counter + dots (Desktop only) ── */}
      <div className="hidden lg:flex absolute top-8 right-10 z-20 items-center gap-3">
        {products.map((_, i) => (
          <div
            key={i}
            ref={(el) => { dotRefs.current[i] = el; }}
            className="w-[6px] h-[6px] rounded-full"
            style={{ backgroundColor: i === 0 ? "#ffffff" : "rgba(255,255,255,0.18)" }}
          />
        ))}
      </div>

      {/* ── Progress bar (Desktop only) ── */}
      <div className="hidden lg:block absolute bottom-8 left-10 right-10 z-20 h-[1px] bg-white/[0.08]">
        <div
          ref={progressRef}
          className="h-full bg-white/60 origin-left"
          style={{ transform: "scaleX(0)" }}
        />
      </div>

      {/* ── Perspective container — rotation happens here ── */}
      <div
        className="lg:absolute inset-0 pt-28 lg:pt-0"
        style={{ perspective: "1400px", perspectiveOrigin: "50% 50%" }}
      >
        {/* ── Reel ── */}
        <div
          ref={reelRef}
          className="relative lg:absolute top-0 left-0 h-full flex flex-col lg:flex-row items-center px-6 lg:px-0"
          style={{ gap: `${CARD_GAP}px` }}
        >
          {products.map((prod, index) => (
            <FeaturedProductCard
              key={index}
              ref={(el) => { cardRefs.current[index] = el; }}
              product={prod}
              totalProducts={products.length}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
