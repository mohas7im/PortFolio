"use client";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { ServiceCard } from "./ServiceCard";

const services = [
  {
    num: "01",
    title: "Full Stack Development",
    desc: "End-to-end architecture and implementation of scalable web applications. From responsive user interfaces to robust database schemas, ensuring pristine code quality and optimal performance across the entire technology stack.",
    items: ["React & Next.js Apps", "Node.js Backend", "Django & Python APIs", "Database Design", "Cloud Deployment", "Performance Tuning"],
    image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=900",
  },
  {
    num: "02",
    title: "API Architecture",
    desc: "Designing secure, high-throughput backend services. Specializing in microservices, rate-limiting, and comprehensive documentation to empower frontend, mobile, and third-party developers.",
    items: ["REST API Design", "GraphQL Schemas", "Auth & OAuth2", "Rate Limiting", "OpenAPI Docs", "Webhook Systems"],
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=900",
  },
  {
    num: "03",
    title: "UI/UX Engineering",
    desc: "Crafting exceptional digital experiences. Marrying beautiful design with complex frontend logic, focusing on fluid animations, accessibility, and pixel-perfect responsive layouts that engage users.",
    items: ["Component Systems", "GSAP Animations", "Responsive Layouts", "Accessibility (a11y)", "Design Tokens", "Micro-interactions"],
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=900",
  },
  {
    num: "04",
    title: "AI & LLM Integration",
    desc: "Bringing artificial intelligence into production environments. Building autonomous workflows, smart search, and generative capabilities securely into existing enterprise software systems.",
    items: ["OpenAI Integration", "LangChain Agents", "RAG Pipelines", "Semantic Search", "Streaming Responses", "Vector Databases"],
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=900",
  },
  {
    num: "05",
    title: "Healthcare Software",
    desc: "Developing compliant, secure platforms for the medical industry. From Electronic Medical Records (EMR) to patient portals, prioritizing data sovereignty, security, and complex clinical workflows.",
    items: ["EMR Systems", "Patient Portals", "Appointment Booking", "Clinical Workflows", "Billing & Invoicing", "HIPAA-Aware Dev"],
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=900",
  },
  {
    num: "06",
    title: "Technical Consulting",
    desc: "Strategic guidance for software teams. Auditing existing codebases for performance bottlenecks, planning robust technical architecture, and establishing CI/CD pipelines for reliable delivery.",
    items: ["Architecture Reviews", "Code Audits", "Tech Stack Planning", "Performance Audits", "Team Mentoring", "Technical Writing"],
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=900",
  },
];

// Cards all stick at the SAME top (nav height) so each card FULLY covers
// the previous one — no peeking strip. Ascending z-index ensures the
// arriving card always renders on top.
const NAV_H = 88; // px — how far from viewport top the cards stick

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".srv-header", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
        y: 40, opacity: 0, duration: 0.9, ease: "power3.out",
      });

      const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];

      cards.forEach((card, i) => {

        // ── ENTRANCE: pure opacity fade as card scrolls into sticky position ──
        // NO scale — scaling would make the card narrower than full-width while
        // still travelling up, letting the buried card peek around the edges.
        gsap.fromTo(card,
          { opacity: 0 },
          {
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top 95%",
              end: `top ${NAV_H}px`,
              scrub: 1,
            },
          }
        );

        // ── EXIT: The buried card darkens and blurs as it is covered ─────────
        if (i < cards.length - 1) {
          const next = cards[i + 1];
          gsap.to(card, {
            opacity: 0.4,
            filter: "blur(8px)", // lower blur max for cleaner look
            ease: "none",
            scrollTrigger: {
              trigger: next,
              // Let's use exact pixel bounds so it perfectly matches the overlap.
              // The sticky top is NAV_H. This card's bottom is roughly at (NAV_H + card height).
              // We want the fade to start only when the NEXT card's top reaches THIS card's body.
              start: () => `top top+=${NAV_H + card.offsetHeight - 100}`, // -100px so it starts just a tiny bit before physical touch for smoothness
              end: () => `top top+=${NAV_H + 40}`, // finishes just as the next card locks into place
              scrub: true,
            },
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="bg-bg border-t border-white/[0.08] relative z-[2]"
    >
      {/* Normal-flow header */}
      <div className="srv-header max-w-[1400px] mx-auto px-6 lg:px-10 pt-20 lg:pt-24 pb-10">
        <div className="text-[0.65rem] tracking-[0.2em] text-white/30 mb-6 uppercase font-bold flex items-center gap-3">
          <div className="w-8 h-px bg-white/30" />
          02 — Services
        </div>
        <h2 className="font-heading text-[clamp(2.5rem,7vw,6rem)] font-bold text-white tracking-[-0.04em] leading-[0.9] uppercase">
          WHAT I DO
        </h2>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        {services.map((srv, i) => (
          <ServiceCard
            key={i}
            ref={(el) => { cardRefs.current[i] = el; }}
            service={srv}
            index={i}
            totalServices={services.length}
            navH={NAV_H}
          />
        ))}
      </div>

      {/* Bottom spacer so the last card has room to breathe */}
      <div className="h-24" />
    </section>
  );
}