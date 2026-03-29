"use client";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const aiProjects = [
  { title: "AGENTIC WORKFLOWS", desc: "Autonomous agents for complex reasoning and enterprise API interaction.", tag: "LANGCHAIN · AUTOGPT" },
  { title: "RAG SYSTEMS", desc: "Retrieval-Augmented Generation using vector databases for accurate search.", tag: "PINECONE · OPENAI" },
  { title: "CONTEXT PROTOCOLS", desc: "Bridging isolated data sources using standardized LLM context injection.", tag: "ARCHITECTURE · API" },
  { title: "LOCAL DEPLOYMENT", desc: "Running quantized models locally for absolute privacy and zero latency.", tag: "OLLAMA · LLAMA 3" },
];

export default function AiExplorations() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      // Setup entrance animation
      gsap.from(sectionRef.current, {
        scrollTrigger: { trigger: sectionRef.current, start: "top 85%", once: true },
        y: 60, opacity: 0, duration: 0.9, ease: "power2.out",
      });
      gsap.from(cardsRef.current.filter(Boolean), {
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
        y: 70, opacity: 0, stagger: 0.13, duration: 0.8, ease: "power2.out",
      });

      // Setup 3D Hover Tilt Effect
      cardsRef.current.forEach((card) => {
        if (!card) return;
        
        const inner = card.querySelector(".ai-inner") as HTMLDivElement;
        const glow = card.querySelector(".card-glow");
        const content = card.querySelector(".card-inner-content");
        
        if (!inner) return;

        const handleMouseMove = (e: MouseEvent) => {
          const rect = inner.getBoundingClientRect();
          const x = e.clientX - rect.left; // x position within the element.
          const y = e.clientY - rect.top;  // y position within the element.
          
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          
          const rotationX = ((y - centerY) / centerY) * -10; // Max rotation 10deg
          const rotationY = ((x - centerX) / centerX) * 10;
          
          gsap.to(inner, {
            rotationX,
            rotationY,
            transformPerspective: 1000,
            duration: 0.5,
            ease: "power2.out"
          });
          
          if (content) {
            gsap.to(content, {
              x: (x - centerX) / 20,
              y: (y - centerY) / 20,
              duration: 0.5,
              ease: "power2.out"
            });
          }
          
          if (glow) {
            gsap.to(glow, {
              background: `radial-gradient(circle at ${x}px ${y}px, rgba(0, 245, 255, 0.15) 0%, transparent 60%)`,
              opacity: 1,
              duration: 0.3
            });
          }
        };

        const handleMouseEnter = () => {
          gsap.to(inner, { scale: 1.02, zIndex: 10, duration: 0.3, ease: "power2.out" });
          gsap.to(inner, { boxShadow: "0 30px 60px rgba(0,0,0,0.6), 0 0 40px rgba(0, 245, 255, 0.05)", duration: 0.3 });
          inner.addEventListener("mousemove", handleMouseMove);
        };

        const handleMouseLeave = () => {
          inner.removeEventListener("mousemove", handleMouseMove);
          gsap.to(inner, { 
            scale: 1, 
            rotationX: 0, 
            rotationY: 0, 
            zIndex: 1,
            boxShadow: "none",
            duration: 0.6, 
            ease: "power3.out" 
          });
          if (content) {
            gsap.to(content, { x: 0, y: 0, duration: 0.6, ease: "power3.out" });
          }
          if (glow) {
            gsap.to(glow, { opacity: 0, duration: 0.6 });
          }
        };

        inner.addEventListener("mouseenter", handleMouseEnter);
        inner.addEventListener("mouseleave", handleMouseLeave);
        
        return () => {
          inner.removeEventListener("mouseenter", handleMouseEnter);
          inner.removeEventListener("mouseleave", handleMouseLeave);
          inner.removeEventListener("mousemove", handleMouseMove);
        };
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="ai" className="py-24 px-10 relative bg-bg border-t border-white/[0.08] z-[2]">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-[0.65rem] tracking-[0.2em] text-white/30 mb-8 uppercase font-bold flex items-center gap-3">
          <div className="w-8 h-px bg-white/30" />
          04 — AI Explorations
        </div>

        <div className="flex flex-col lg:flex-row justify-between lg:items-end mb-16 gap-8">
          <h2 className="font-heading text-[clamp(2.5rem,6vw,5rem)] font-bold tracking-[-0.04em] leading-[0.9] uppercase text-white/90">
            THE FRONTIER
          </h2>
          <p className="max-w-[420px] text-[1.05rem] text-white/40 leading-[1.7] pb-2">
            Actively researching state-of-the-art AI. Focused on practical applied systems, not theoretical wrappers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8" style={{ perspective: "1500px" }}>
          {aiProjects.map((p, i) => (
            <div
              key={i}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="product-card-wrapper h-full w-full"
            >
              <div 
                className="ai-inner group relative bg-[#0A0A0A] border border-white/[0.08] bg-opacity-80 rounded-2xl flex flex-col justify-between min-h-[300px] overflow-hidden transition-colors duration-300 hover:border-white/[0.15] w-full h-full"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="card-inner-content p-10 flex flex-col justify-between h-full pointer-events-none z-10">
                  <div>
                    <div className="w-10 h-10 rounded-full bg-white/[0.03] border border-white/[0.05] flex items-center justify-center text-white/60 mb-8 transition-transform group-hover:bg-white group-hover:text-black shadow-[0_0_20px_rgba(255,255,255,0.05)] group-hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                      ✦
                    </div>
                    <h3 className="font-heading text-[1.5rem] text-white/90 font-bold tracking-[-0.02em] mb-4 transition-colors">{p.title}</h3>
                    <p className="text-[0.95rem] text-white/40 leading-[1.7] max-w-[90%]">{p.desc}</p>
                  </div>
                  
                  <div className="px-6 py-4 mt-8 rounded-lg bg-white/[0.02] border border-white/[0.03] flex justify-between items-center text-[0.65rem] font-bold text-white/30 tracking-widest uppercase">
                    <span>{p.tag}</span>
                    <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-10px] group-hover:translate-x-0 duration-300">→</span>
                  </div>
                </div>

                {/* Dynamic Interactive Glow Map */}
                <div className="card-glow absolute inset-0 opacity-0 pointer-events-none mix-blend-screen transition-opacity duration-300" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
