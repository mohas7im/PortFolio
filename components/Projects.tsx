"use client";
import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import NextImage from "next/image";

const projects = [
  { 
    num: "01", 
    name: "REST API PLATFORM", 
    tags: "DJANGO REST · DOCKER · REDIS", 
    year: "2024",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=600"
  },
  { 
    num: "02", 
    name: ".NET ENTERPRISE APP", 
    tags: "C# · .NET · REACT · SQL", 
    year: "2023",
    image: "https://images.unsplash.com/photo-1649180556628-9ba704115795?q=80&w=600"
  },
  { 
    num: "03", 
    name: "DEV PORTFOLIO", 
    tags: "NEXT.JS · GSAP · TAILWIND", 
    year: "2026",
    image: "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?q=80&w=600"
  },
  { 
    num: "04", 
    name: "PATIENT KIOSK UI", 
    tags: "REACT NATIVE · TYPESCRIPT", 
    year: "2023",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600"
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const rowsRef = useRef<(HTMLLIElement | null)[]>([]);
  
  // Follow image ref
  const followImageRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    
    const ctx = gsap.context(() => {
      // Main reveal
      gsap.from(".projects-header", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 85%", once: true },
        y: 40, opacity: 0, duration: 1, ease: "power4.out"
      });

      // Rows reveal - staggered slide in from left
      rowsRef.current.forEach((row, i) => {
        if (!row) return;
        gsap.from(row, {
          scrollTrigger: { trigger: row, start: "top 95%", once: true },
          opacity: 0, x: -50, duration: 1.2, delay: i * 0.1, ease: "power4.out"
        });
      });
    }, sectionRef);

    // Mouse move logic for the floating image
    const xTo = gsap.quickTo(followImageRef.current, "x", { duration: 0.5, ease: "power3" });
    const yTo = gsap.quickTo(followImageRef.current, "y", { duration: 0.5, ease: "power3" });

    const handleMouseMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      ctx.revert();
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    if (hoveredIndex !== null) {
      gsap.to(followImageRef.current, {
        scale: 1,
        opacity: 1,
        rotate: 3,
        duration: 0.5,
        ease: "back.out(1.7)",
        overwrite: "auto"
      });
    } else {
      gsap.to(followImageRef.current, {
        scale: 0.4,
        opacity: 0,
        rotate: 0,
        duration: 0.4,
        ease: "power2.inOut",
        overwrite: "auto"
      });
    }
  }, [hoveredIndex]);

  return (
    <section ref={sectionRef} id="projects" className="py-24 px-10 relative bg-bg z-[2]">
      {/* Floating Image Cursor */}
      <div 
        ref={followImageRef} 
        className="fixed top-0 left-0 w-[400px] aspect-[16/10] rounded-2xl overflow-hidden pointer-events-none z-[50] opacity-0 scale-50 -translate-x-1/2 -translate-y-1/2 shadow-[0_30px_60px_rgba(0,0,0,0.9)] border border-white/10 hidden md:block"
        style={{ willChange: "transform" }}
      >
        {projects.map((p, i) => (
          <NextImage 
            key={i}
            src={p.image}
            alt={p.name as string}
            fill
            className={`absolute inset-0 object-cover transition-opacity duration-500 will-change-opacity ${hoveredIndex === i ? 'opacity-100' : 'opacity-0'}`}
          />
        ))}
      </div>

      <div className="max-w-[1400px] mx-auto">
        <div className="projects-header mb-16">
          <div className="text-[0.65rem] tracking-[0.2em] text-white/30 mb-8 uppercase font-bold flex items-center gap-3">
            <div className="w-8 h-px bg-white/30" />
            03 — Selected Work
          </div>
          <h2 className="font-heading text-[clamp(2.5rem,6vw,5.5rem)] font-bold tracking-[-0.04em] leading-[0.9] uppercase text-white">
            ARCHIVES
          </h2>
        </div>

        <ul className="list-none flex flex-col relative z-20">
          {projects.map((p, i) => (
            <li
              key={i}
              ref={(el) => { rowsRef.current[i] = el; }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative flex items-center justify-between py-12 px-6 border-b border-white/[0.06] cursor-none overflow-hidden transition-all duration-500 first:border-t hover:bg-white/[0.02]"
            >
              <div className="flex items-baseline gap-10 w-[55%] relative z-[2] max-md:flex-col max-md:gap-3 max-lg:w-[65%] pointer-events-none">
                <span className="text-[0.75rem] text-white/20 font-bold tracking-[0.2em]">{p.num}</span>
                <h3 className="font-heading text-[clamp(1.8rem,3.5vw,3rem)] font-bold tracking-[-0.03em] transition-all duration-700 group-hover:translate-x-6 text-white/70 group-hover:text-white uppercase leading-none">
                  {p.name}
                </h3>
              </div>

              <div className="w-[25%] relative z-[2] hidden lg:block pointer-events-none">
                <span className="text-[0.6rem] font-black text-white/20 tracking-[0.2em] uppercase transition-colors duration-500 group-hover:text-white/50">{p.tags}</span>
              </div>

              <div className="w-[20%] flex justify-end items-center gap-12 relative z-[2] max-lg:w-[35%] pointer-events-none">
                <span className="text-[0.9rem] text-white/20 font-bold group-hover:text-white/40 transition-colors duration-500">{p.year}</span>
                <div className="w-14 h-14 rounded-full border border-white/5 flex items-center justify-center text-white/30 opacity-0 -translate-x-10 scale-50 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0 group-hover:scale-100 group-hover:border-white/30 group-hover:text-white -rotate-45 group-hover:rotate-0 bg-white/[0.03] backdrop-blur-md">
                  <span className="text-[1.5rem] leading-none">→</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
