"use client";
import React from "react";

export default function ProjectTechStack() {
  return (
    <section className="px-6 md:px-10 py-16 border-b border-black/[0.06]">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <div className="sr-label text-[0.52rem] font-black tracking-[0.3em] uppercase text-black/30 mb-3">
            Core Technologies
          </div>
          <h2
            className="sr-heading font-heading font-black tracking-[-0.04em] leading-[0.9] uppercase"
            style={{ fontSize: "clamp(1.6rem, 2.5vw, 2.4rem)" }}
          >
            Stack
          </h2>
        </div>
        <div className="sr-text flex flex-wrap gap-2">
          {[
            "Django",
            "React",
            "TypeScript",
            "PostgreSQL",
            "Docker",
            "Redis",
            "Nginx",
            "Celery",
          ].map((tech) => (
            <span
              key={tech}
              className="stack-chip px-4 py-2 bg-black text-white text-[0.58rem] font-black tracking-[0.15em] uppercase rounded-full hover:-translate-y-0.5 transition-transform duration-200 cursor-default"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
