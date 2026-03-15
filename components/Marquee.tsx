"use client";
import Image from "next/image";

// Using simple SVG placeholders for logos since we don't have actual SVG files
const techStack = [
  { name: "React", logo: "⚛️" },
  { name: "Next.js", logo: "▲" },
  { name: "TypeScript", logo: "TS" },
  { name: "Django", logo: "DJ" },
  { name: "Python", logo: "PY" },
  { name: "PostgreSQL", logo: "DB" },
  { name: "Docker", logo: "🐳" },
  { name: "Tailwind", logo: "〰" },
  { name: "GSAP", logo: "🟢" },
  { name: "Redis", logo: "🔴" },
];

const trackItems = [...techStack, ...techStack, ...techStack];

export default function Marquee() {
  return (
    <div className="py-12 border-y border-white/[0.08] overflow-hidden relative z-[2] bg-bg flex items-center">
      
      {/* Container to handle the infinite scrolling animation */}
      <div className="flex gap-16 whitespace-nowrap animate-marquee">
        {trackItems.map((tech, i) => (
          <div key={i} className="flex items-center gap-4 shrink-0 group">
            <div className="w-10 h-10 rounded bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-white/60 text-lg group-hover:bg-white/[0.08] transition-colors">
              {tech.logo}
            </div>
            <span className="font-heading text-xl font-bold tracking-tight text-white uppercase opacity-80 group-hover:opacity-100 transition-opacity">
              {tech.name}
            </span>
          </div>
        ))}
      </div>

    </div>
  );
}
