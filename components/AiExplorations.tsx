"use client";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const aiProjects = [
  { 
    title: "AGENTIC WORKFLOWS", 
    desc: "Autonomous LLM agents designed to handle complex reasoning, iterate over multi-step tasks, and natively interact with isolated enterprise APIs without human intervention.", 
    tag: "LANGCHAIN · AUTOGPT" 
  },
  { 
    title: "RAG SYSTEMS", 
    desc: "Production-grade Retrieval-Augmented Generation architectures. I utilize advanced vector databases like Pinecone to eliminate hallucinations and search massive proprietary text corpuses securely.", 
    tag: "PINECONE · OPENAI" 
  },
  { 
    title: "CONTEXT PROTOCOLS", 
    desc: "Bridging isolated legacy data sources using standardized LLM context injection. Developing universal middleware that feeds exact state data straight into reasoning models in real-time.", 
    tag: "ARCHITECTURE · API" 
  },
  { 
    title: "LOCAL DEPLOYMENT", 
    desc: "Deploying and orchestrating quantized open-source models (Llama 3, Mistral) directly onto bare-metal internal servers to guarantee absolute data privacy, zero-latency, and zero API costs.", 
    tag: "OLLAMA · LLAMA 3" 
  },
];

export default function AiExplorations() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      // Setup entrance animation for header
      gsap.from(".ai-header-content", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 85%", once: true },
        y: 40, opacity: 0, duration: 0.9, stagger: 0.1, ease: "power2.out",
      });

      // Pin and Horizontal Scroll Logic
      const container = scrollContainerRef.current;
      if (container) {
        gsap.to(container, {
          x: () => {
            // Translate left by the total width of the inner track minus viewport size
            return -(container.scrollWidth - window.innerWidth + 80);
          },
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: () => `+=${container.scrollWidth}`, // scroll distance proportional to track width
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true, // Recalculate if window resizes!
          }
        });
      }

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
    <section ref={sectionRef} id="ai" className="h-[100vh] w-full flex flex-col justify-center gap-6 lg:gap-10 pt-[80px] relative bg-bg border-t border-white/[0.08] z-[2] overflow-hidden">
      
      {/* Header Block — Stays Pinned Automatically via Section parent */}
      <div className="max-w-[1400px] w-full mx-auto px-6 md:px-10 shrink-0">
        <div className="ai-header-content text-[0.65rem] tracking-[0.2em] text-white/30 mb-3 uppercase font-bold flex items-center gap-3">
          <div className="w-8 h-px bg-white/30" />
          05 — AI Explorations
        </div>

        <div className="ai-header-content flex flex-col lg:flex-row justify-between lg:items-end gap-8">
          <h2 className="font-heading text-[clamp(2.5rem,6vw,5rem)] font-bold tracking-[-0.04em] leading-[0.9] uppercase text-white/90">
            THE FRONTIER
          </h2>
          <p className="max-w-[420px] text-[1.05rem] text-white/40 leading-[1.7] pb-2">
            Actively researching state-of-the-art AI. Focused on practical applied systems, not theoretical wrappers.
          </p>
        </div>
      </div>

      {/* Horizontal Scroll Track Wrapper */}
      <div className="w-full shrink-0">
        {/* Track Container — dynamically widths itself, translating X during scroll */}
        <div 
          ref={scrollContainerRef} 
          className="flex gap-4 md:gap-6 w-max px-6 md:px-[max(40px,calc((100vw-1400px)/2+40px))] will-change-transform"
          style={{ perspective: "1500px" }}
        >
          {aiProjects.map((p, i) => (
            <div
              key={i}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="product-card-wrapper shrink-0 w-[85vw] sm:w-[450px] md:w-[500px] lg:w-[580px]"
            >
              <div 
                className="ai-inner group relative bg-[#060606] shadow-2xl border border-white/[0.06] bg-opacity-90 rounded-2xl flex flex-col justify-between h-[55vh] min-h-[380px] max-h-[500px] overflow-hidden transition-colors duration-300 hover:border-white/[0.15] w-full"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="card-inner-content p-8 md:p-10 flex flex-col justify-between h-full pointer-events-none z-10 relative">
                  <div>
                    {/* Top Row: Number & Badge */}
                    <div className="flex items-center justify-between mb-8 w-full text-white/40">
                      <div className="w-12 h-12 rounded-full bg-white/[0.03] border border-white/[0.05] flex items-center justify-center font-bold text-base shadow-[0_0_20px_rgba(255,255,255,0.02)] transition-colors group-hover:bg-white group-hover:text-black">
                        0{i + 1}
                      </div>
                      <span className="text-[0.6rem] uppercase tracking-[0.25em] font-bold border border-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                        Research
                      </span>
                    </div>

                    {/* Core Text */}
                    <h3 className="font-heading text-[clamp(1.5rem,3vw,2.2rem)] text-white/95 font-bold tracking-[-0.02em] mb-4 transition-colors uppercase leading-[1.1]">
                      {p.title}
                    </h3>
                    <p className="text-[1.05rem] text-white/40 leading-[1.7] max-w-[95%] font-body">
                      {p.desc}
                    </p>
                  </div>
                  
                  {/* Bottom Footer Ribbon */}
                  <div className="w-full mt-8 rounded-xl bg-white/[0.02] border border-white/[0.03] flex items-center px-5 py-4 text-[0.65rem] font-bold text-white/30 tracking-[0.15em] uppercase backdrop-blur-sm shadow-inner transition-colors">
                    <span>{p.tag}</span>
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
