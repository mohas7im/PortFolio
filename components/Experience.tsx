"use client";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const experiences = [
  {
 id: "01",
role: "Junior Software Developer",
company: "Hybrhind Tech",
period: "2026 — Present",
desc: "Designing and developing scalable web applications using React and TypeScript for the frontend, and C# with ASP.NET Web API for the backend. Building secure RESTful services, handling database integration, and ensuring smooth end-to-end system performance.",
tech: ["React", "TypeScript", "C#", "ASP.NET Web API"],
color: "cyan",
  },
  {
  id: "02",
role: "Junior Full Stack Developer",
company: "Trickydot Technologies",
period: "2025 — 2026",
desc: "Developed full-stack web applications using Python (Django) and PHP for backend services, along with React and JavaScript for dynamic frontend interfaces. Built and integrated RESTful APIs, managed database operations, and delivered responsive, user-friendly applications.",
tech: ["Python", "Django", "PHP", "JavaScript", "React"],
color: "ngreen",
  }
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current || !triggerRef.current) return;

    const ctx = gsap.context(() => {
      // Pin the left side — DESKTOP ONLY (avoids mobile overlap)
      ScrollTrigger.matchMedia({
        "(min-width: 1024px)": function () {
          ScrollTrigger.create({
            trigger: triggerRef.current,
            start: "top 100px",
            end: "bottom bottom",
            pin: ".experience-sticky-left",
            pinSpacing: false,
          });
        },
      });

      // Individual item reveal — smooth scrub, no jumps
      itemsRef.current.forEach((item, i) => {
        if (!item) return;
        const line = item.querySelector(".timeline-line");
        const dot = item.querySelector(".timeline-dot");
        const content = item.querySelector(".experience-content");

        // Timeline line grow
        if (line) {
          gsap.to(line, {
            height: "100%",
            ease: "none",
            scrollTrigger: {
              trigger: item,
              start: "top 70%",
              end: "top 30%",
              scrub: 1.5,
            },
          });
        }

        // Dot colour change
        if (dot) {
          gsap.to(dot, {
            backgroundColor: i === 0 ? "#00F5FF" : "#39FF14",
            boxShadow: `0 0 15px ${i === 0 ? "#00F5FF" : "#39FF14"}`,
            ease: "none",
            scrollTrigger: {
              trigger: item,
              start: "top 70%",
              end: "top 40%",
              scrub: 1.5,
            },
          });
        }

        // Content fade — scrubbed so it eases in smoothly
        if (content) {
          gsap.fromTo(
            content,
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              ease: "none",
              scrollTrigger: {
                trigger: item,
                start: "top 85%",
                end: "top 55%",
                scrub: 1.2,
              },
            },
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="bg-bg border-t border-white/[0.08] relative z-[2] py-24"
    >
      <div className="max-w-[1400px] mx-auto px-10">
        <div
          ref={triggerRef}
          className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-16 lg:gap-24 relative"
        >
          {/* Sticky Left Section */}
          <div className="experience-sticky-left h-fit lg:sticky lg:top-[120px] mb-10 lg:mb-0">
            <div className="text-[0.65rem] tracking-[0.2em] text-white/30 mb-8 uppercase font-bold flex items-center gap-3">
              <div className="w-8 h-px bg-white/30" />
              04 — Professional Experience
            </div>

            <h2 className="font-heading text-[clamp(3.5rem,7vw,6.5rem)] leading-[0.9] font-bold tracking-[-0.04em] uppercase text-white drop-shadow-lg mb-6">
              CAREER
              <br />
              PATH
            </h2>
            <p className="text-white/50 text-[1.1rem] leading-[1.8] max-w-[400px]">
              A timeline of my professional journey, building scalable software
              and digital experiences alongside leading teams.
            </p>
          </div>

          {/* Scrolling Right Section - Timeline */}
          <div className="flex flex-col pt-4 pb-8">
            {experiences.map((exp, i) => (
              <div
                key={i}
                ref={(el) => {
                  itemsRef.current[i] = el;
                }}
                className="relative pl-12 md:pl-16 pb-24 group"
              >
                {/* Timeline mechanics */}
                <div className="absolute left-[3px] top-2 bottom-0 w-px bg-white/[0.08]">
                  <div className="timeline-line absolute top-0 left-0 w-full h-0 bg-white/30" />
                </div>
                <div className="timeline-dot absolute left-0 top-2 w-[7px] h-[7px] bg-white/10 rounded-full border border-white/20 z-10 transition-colors duration-500" />

                {/* Content */}
                <div className="experience-content">
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-3xl md:text-4xl font-heading font-bold uppercase tracking-[-0.02em] text-white group-hover:text-white transition-colors">
                        {exp.role}
                      </h3>
                      <div
                        className={`text-xl font-medium mt-2 text-${exp.color} tracking-tight`}
                      >
                        @ {exp.company}
                      </div>
                    </div>
                    <div className="text-[0.75rem] font-bold tracking-[0.15em] text-white/40 uppercase bg-white/[0.03] px-3 py-1 border border-white/[0.05] rounded self-start sm:self-auto shrink-0">
                      {exp.period}
                    </div>
                  </div>

                  <p className="text-[1rem] leading-[1.8] text-white/50 mb-8 max-w-[600px]">
                    {exp.desc}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {exp.tech.map((t, j) => (
                      <span
                        key={j}
                        className="text-[0.65rem] font-bold uppercase tracking-widest text-white/40 border border-white/[0.08] px-3 py-1.5 rounded-full hover:bg-white/[0.05] hover:text-white transition-colors cursor-none"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
