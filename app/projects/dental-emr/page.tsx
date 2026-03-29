"use client";
import React, { useEffect, useRef, useState } from "react";
import NextImage from "next/image";
import { gsap } from "@/lib/gsap";
import dynamic from "next/dynamic";
import CustomCursor from "@/components/CustomCursor";
import Nav from "@/components/Nav";
import ContactDrawer from "@/components/ContactDrawer";
import Link from "next/link";

const SmoothScroll = dynamic(() => import("@/components/SmoothScroll"), {
  ssr: false,
});

const modules = [
  {
    num: "01",
    label: "Doctor Dashboard",
    desc: "A unified command centre for clinical staff. Manage appointments, patient queues, treatment histories and prescriptions from one elegant interface.",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1200",
    tag: "Clinical Core",
  },
  {
    num: "02",
    label: "Patient Records & Odontogram",
    desc: "Interactive adult and pediatric dental charting with visual tooth mapping. Diagnose, plot treatments and communicate findings chairside.",
    image:
      "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=1200",
    tag: "Charting",
  },
  {
    num: "03",
    label: "Pharmacy & Billing",
    desc: "End-to-end drug dispensing, inventory control, and auto-generated invoices tightly coupled with treatment records.",
    image:
      "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?q=80&w=1200",
    tag: "Operations",
  },
];

const capabilities = [
  {
    icon: "🦷",
    title: "Advanced Odontogram",
    desc: "Interactive adult and pediatric dental charting. Visualise, diagnose, and communicate findings precisely.",
  },
  {
    icon: "📈",
    title: "CRM & Pipelines",
    desc: "Track leads, automate follow-ups, and convert patient inquiries at scale.",
  },
  {
    icon: "💊",
    title: "Pharmacy Module",
    desc: "Inventory management, auto-billing, and precise drug dispensing.",
  },
  {
    icon: "👥",
    title: "HRMS & Payroll",
    desc: "Staff management, shifts, salaries, and role-based permissions.",
  },
  {
    icon: "🏢",
    title: "Multi-Clinic Core",
    desc: "One owner. Multiple branches. Centralised reporting and analytics.",
  },
  {
    icon: "📊",
    title: "Analytics Suite",
    desc: "Revenue trends, patient retention, and KPI dashboards in real-time.",
  },
];

const plans = [
  {
    name: "Basic",
    price: "₹9,000",
    note: "For independent practitioners",
    features: [
      "Patient Records & Scheduling",
      "Basic Odontogram Charting",
      "Billing & Invoicing",
      "Data Export",
    ],
    highlight: false,
  },
  {
    name: "Mid",
    price: "₹12,500",
    note: "For expanding clinics",
    features: [
      "Everything in Basic",
      "Pharmacy Management",
      "HRMS Module",
      "Advanced Analytics",
    ],
    highlight: true,
  },
  {
    name: "Pro",
    price: "₹15,000",
    note: "Enterprise & multi-clinic",
    features: [
      "Everything in Mid",
      "Multi-Clinic Support",
      "Automated Reception",
      "Custom API Integrations",
    ],
    highlight: false,
  },
];

export default function DentalEMRPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const modulesWrapRef = useRef<HTMLDivElement>(null);
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [activeModule, setActiveModule] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance
      const tl = gsap.timeline({ delay: 0.3 });
      tl.from(".h-eyebrow", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      })
        .from(
          ".h-title-line",
          { y: 60, opacity: 0, stagger: 0.09, duration: 1, ease: "power4.out" },
          "-=0.5",
        )
        .from(
          ".h-desc",
          { y: 20, opacity: 0, duration: 0.8, ease: "power3.out" },
          "-=0.6",
        )
        .from(
          ".h-meta-item",
          {
            y: 16,
            opacity: 0,
            stagger: 0.08,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.5",
        )
        .from(
          ".h-cta",
          { y: 16, opacity: 0, duration: 0.5, ease: "power3.out" },
          "-=0.4",
        )
        .from(
          ".hero-mockup",
          { x: 120, opacity: 0, duration: 1.4, ease: "power4.out" },
          0.4,
        );

      // Generic reveals
      gsap.utils.toArray<HTMLElement>(".sr-label").forEach((el) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: "top 90%" },
          y: 10,
          opacity: 0,
          duration: 0.6,
          ease: "power3.out",
        });
      });

      gsap.utils.toArray<HTMLElement>(".sr-heading").forEach((el) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: "top 85%" },
          y: 40,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        });
      });

      gsap.utils.toArray<HTMLElement>(".sr-text").forEach((el) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: "top 88%" },
          y: 24,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        });
      });

      // (module switching handled by IntersectionObserver below)

      // Capability cards
      gsap.utils.toArray<HTMLElement>(".cap-card").forEach((el, i) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: "top 90%" },
          y: 40,
          opacity: 0,
          duration: 0.7,
          delay: (i % 3) * 0.08,
          ease: "power3.out",
        });
      });

      // Pricing cards from right
      gsap.utils.toArray<HTMLElement>(".price-card").forEach((el, i) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: "top 90%" },
          x: 50 + i * 20,
          opacity: 0,
          duration: 0.9,
          delay: i * 0.1,
          ease: "power3.out",
        });
      });

      // Stack chips
      gsap.utils.toArray<HTMLElement>(".stack-chip").forEach((el, i) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: "top 92%" },
          x: 30,
          opacity: 0,
          duration: 0.6,
          delay: i * 0.05,
          ease: "power3.out",
        });
      });

      gsap.from(".cta-block", {
        scrollTrigger: { trigger: ".cta-block", start: "top 80%" },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // ── Intersection Observer for sticky module switching ──
  useEffect(() => {
    const wrap = modulesWrapRef.current;
    if (!wrap) return;

    // rootMargin: trigger when slot crosses center of viewport (-50% top, -49% bottom = narrow center band)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute("data-slot"));
            if (!isNaN(idx)) setActiveModule(idx);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );

    modules.forEach((_, i) => {
      const el = wrap.querySelector(`[data-slot="${i}"]`);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div className="grid-bg" />
      <div className="noise-overlay" />
      <CustomCursor />

      <SmoothScroll>
        <Nav />
        <main
          ref={containerRef}
          className="bg-[#f5f5f7] text-[#0a0a0a] font-body overflow-x-clip cursor-none antialiased relative z-10"
        >
          {/* ── HERO ── */}
          <section className="relative pt-[110px] pb-16 px-6 md:px-10 min-h-screen flex flex-col justify-center max-w-[1600px] mx-auto">
            <Link
              href="/"
              className="h-eyebrow group inline-flex items-center gap-2 text-[0.6rem] font-black tracking-[0.2em] uppercase text-black/35 hover:text-black/70 transition-colors mb-10 w-fit"
            >
              <span className="group-hover:-translate-x-1 transition-transform duration-300">
                ←
              </span>
              Back to portfolio
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-10 lg:gap-16 items-center">
              {/* Left text */}
              <div className="flex flex-col gap-7">
                <div className="h-eyebrow flex items-center gap-3">
                  <div className="w-8 h-px bg-black/25" />
                  <span className="text-[0.58rem] font-black tracking-[0.3em] uppercase text-black/35">
                    Case Study · 2026
                  </span>
                </div>

                <h1
                  className="font-heading leading-[0.88] font-black tracking-[-0.04em] uppercase"
                  style={{ fontSize: "clamp(2.8rem, 5.5vw, 5rem)" }}
                >
                  <span className="h-title-line block overflow-hidden">
                    <span className="block">Dental</span>
                  </span>
                  <span className="h-title-line block overflow-hidden">
                    <span className="block text-black/20">Practice</span>
                  </span>
                  <span className="h-title-line block overflow-hidden">
                    <span className="block">EMR System</span>
                  </span>
                </h1>

                <p
                  className="h-desc text-black/50 leading-[1.85] max-w-[38ch]"
                  style={{ fontSize: "clamp(0.82rem, 1.2vw, 0.95rem)" }}
                >
                  A comprehensive, multi-clinic management platform
                  orchestrating dental charting, scheduling, pharmacy, HRMS, and
                  billing — all from one interface.
                </p>

                <div className="h-cta flex items-center gap-4 pt-2">
                  <button
                    onClick={() => setIsDemoOpen(true)}
                    className="group px-7 py-3.5 bg-black text-white text-[0.62rem] font-black tracking-[0.1em] uppercase rounded-full flex items-center gap-3 hover:bg-black/80 transition-all duration-300 shadow-lg hover:-translate-y-0.5"
                  >
                    Request Demo
                    <span className="group-hover:translate-x-1 transition-transform duration-300 text-white/35">
                      →
                    </span>
                  </button>
                  <span className="text-[0.58rem] font-bold tracking-[0.15em] uppercase text-black/30">
                    Live since 2025
                  </span>
                </div>
              </div>

              {/* Right – dashboard mockup sliding from right */}
              <div className="hero-mockup relative">
                <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-[#0a0a0a] shadow-[0_40px_100px_rgba(0,0,0,0.22)] border border-black/[0.07]">
                  {/* Browser bar */}
                  <div className="flex items-center gap-1.5 px-4 py-3 bg-[#161616] border-b border-white/[0.04]">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                    <div className="flex-1 mx-4 py-1 px-3 bg-[#0a0a0a] rounded text-[0.48rem] text-white/20 font-mono">
                      dental-emr.app/dashboard
                    </div>
                  </div>
                  <div
                    className="relative w-full"
                    style={{ height: "calc(100% - 40px)" }}
                  >
                    <NextImage
                      src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1200"
                      alt="Dental EMR Dashboard"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                </div>

                {/* Floating stats */}
                <div className="absolute -bottom-4 -left-4 bg-white rounded-xl px-5 py-3.5 shadow-[0_8px_30px_rgba(0,0,0,0.1)] border border-black/[0.05] hidden md:block">
                  <div className="text-[0.5rem] font-black tracking-[0.2em] uppercase text-black/30 mb-1">
                    Active Clinics
                  </div>
                  <div className="text-xl font-heading font-black text-black">
                    12+
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 bg-white rounded-xl px-5 py-3.5 shadow-[0_8px_30px_rgba(0,0,0,0.1)] border border-black/[0.05] hidden md:block">
                  <div className="text-[0.5rem] font-black tracking-[0.2em] uppercase text-black/30 mb-1">
                    Uptime
                  </div>
                  <div className="text-xl font-heading font-black text-black">
                    99.9%
                  </div>
                </div>
              </div>
            </div>

            {/* Meta strip */}
            <div className="mt-16 pt-10 border-t border-black/[0.07] grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { label: "Role", value: "Full Stack Architect" },
                { label: "Stack", value: "Django · React · PostgreSQL" },
                { label: "Scale", value: "Multi-Tenant SaaS" },
                { label: "Status", value: "Production · 2025" },
              ].map((m, i) => (
                <div key={i} className="h-meta-item">
                  <div className="text-[0.52rem] font-black uppercase tracking-[0.2em] text-black/30 mb-1.5">
                    {m.label}
                  </div>
                  <div className="text-[0.82rem] font-bold text-black/65">
                    {m.value}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── MARQUEE STRIP ── */}
          <div className="overflow-hidden border-y border-black/[0.06] py-4 bg-[#ebebed]">
            <div
              className="flex gap-14 whitespace-nowrap"
              style={{ animation: "marquee-slide 28s linear infinite" }}
            >
              {Array.from({ length: 5 }).flatMap((_, gi) =>
                [
                  "Dental Charting",
                  "HRMS & Payroll",
                  "Pharmacy Module",
                  "Multi-Clinic SaaS",
                  "Patient CRM",
                  "Appointment Engine",
                  "Lab & Prescriptions",
                  "Analytics Suite",
                ].map((t, i) => (
                  <span
                    key={`${gi}-${i}`}
                    className="text-[0.58rem] font-black uppercase tracking-[0.25em] text-black/25 flex items-center gap-5 shrink-0"
                  >
                    {t} <span className="text-black/12">·</span>
                  </span>
                )),
              )}
            </div>
          </div>

          {/* ── MODULES: Sticky Scroll ── */}

          {/* Section header — above the sticky zone */}
          <div className="px-6 md:px-10 pt-24 md:pt-32 pb-12 max-w-[1400px] mx-auto">
            <div className="sr-label flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-black/25" />
              <span className="text-[0.58rem] font-black tracking-[0.3em] uppercase text-black/35">
                Platform Modules
              </span>
            </div>
            <h2
              className="sr-heading font-heading font-black tracking-[-0.04em] leading-[0.9] uppercase"
              style={{ fontSize: "clamp(2rem, 3.5vw, 3.2rem)" }}
            >
              Built for every
              <br />
              <span className="text-black/20">workflow</span>
            </h2>
          </div>

          {/* Tall scroll container — each slot is 100vh, creating scroll distance */}
          <div
            ref={modulesWrapRef}
            style={{ height: `${modules.length * 100}vh` }}
            className="relative"
          >
            {/* Sticky two-column panel */}
            <div className="sticky top-0 h-screen overflow-hidden flex items-center">
              <div className="w-full max-w-[1400px] mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20 items-center h-full py-20">
                {/* ── LEFT: cycling text ── */}
                <div className="relative flex flex-col justify-center h-full">
                  {/* Progress dots */}
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 hidden lg:flex flex-col gap-3">
                    {modules.map((_, i) => (
                      <div
                        key={i}
                        className="transition-all duration-500 rounded-full"
                        style={{
                          width: 5,
                          height: activeModule === i ? 28 : 5,
                          background:
                            activeModule === i ? "#0a0a0a" : "rgba(0,0,0,0.15)",
                        }}
                      />
                    ))}
                  </div>

                  {/* Text panels — stacked + CSS transition between them */}
                  <div
                    className="relative overflow-hidden"
                    style={{ minHeight: "340px" }}
                  >
                    {modules.map((mod, i) => (
                      <div
                        key={i}
                        className="absolute inset-0 flex flex-col justify-center gap-7"
                        style={{
                          opacity: activeModule === i ? 1 : 0,
                          transform:
                            activeModule === i
                              ? "translateY(0px)"
                              : activeModule < i
                                ? "translateY(48px)"
                                : "translateY(-48px)",
                          transition:
                            "opacity 0.65s cubic-bezier(0.16,1,0.3,1), transform 0.65s cubic-bezier(0.16,1,0.3,1)",
                          pointerEvents: activeModule === i ? "auto" : "none",
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-[0.58rem] font-black tracking-[0.3em] uppercase text-black/30">
                            {mod.num} / 0{modules.length}
                          </span>
                          <span className="text-[0.52rem] font-black tracking-[0.2em] uppercase text-black/30 px-3 py-1 bg-black/[0.04] rounded-full border border-black/[0.06]">
                            {mod.tag}
                          </span>
                        </div>

                        <h3
                          className="font-heading font-black tracking-[-0.03em] leading-[0.9] uppercase"
                          style={{ fontSize: "clamp(2rem, 3.8vw, 3.5rem)" }}
                        >
                          {mod.label}
                        </h3>

                        <p
                          className="text-black/50 leading-[1.85] max-w-[38ch]"
                          style={{ fontSize: "clamp(0.82rem, 1.1vw, 0.94rem)" }}
                        >
                          {mod.desc}
                        </p>

                        <button
                          onClick={() => setIsDemoOpen(true)}
                          className="group w-fit flex items-center gap-3 text-[0.58rem] font-black tracking-[0.15em] uppercase text-black/35 hover:text-black transition-colors duration-300"
                        >
                          See it in action
                          <span className="group-hover:translate-x-1 transition-transform duration-300">
                            →
                          </span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── RIGHT: crossfading images ── */}
                <div className="relative h-[55vh] max-h-[580px] hidden lg:block">
                  {modules.map((mod, i) => (
                    <div
                      key={i}
                      className="absolute inset-0 rounded-2xl overflow-hidden"
                      style={{
                        opacity: activeModule === i ? 1 : 0,
                        transform:
                          activeModule === i
                            ? "scale(1) translateX(0px)"
                            : "scale(0.97) translateX(40px)",
                        transition:
                          "opacity 0.75s cubic-bezier(0.16,1,0.3,1), transform 0.75s cubic-bezier(0.16,1,0.3,1)",
                      }}
                    >
                      {/* Browser chrome */}
                      <div className="absolute inset-0 rounded-2xl overflow-hidden bg-[#0a0a0a] border border-black/[0.07] shadow-[0_30px_80px_rgba(0,0,0,0.18)] flex flex-col">
                        <div className="flex items-center gap-1.5 px-4 py-2.5 bg-[#161616] border-b border-white/[0.05] shrink-0">
                          <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                          <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                          <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                          <div className="flex-1 mx-4 py-0.5 px-3 bg-[#0a0a0a] rounded text-[0.46rem] text-white/20 font-mono">
                            dental-emr.app /{" "}
                            {mod.label.toLowerCase().replace(/ /g, "-")}
                          </div>
                        </div>
                        <div className="relative flex-1">
                          <NextImage
                            src={mod.image}
                            alt={mod.label}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
                          <div className="absolute bottom-4 left-4">
                            <div className="px-3 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-[0.46rem] font-black tracking-[0.2em] uppercase text-white/80">
                              Module {mod.num}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Invisible scroll slots — each drives which module is active */}
            {modules.map((_, i) => (
              <div
                key={i}
                data-slot={i}
                className="absolute w-full"
                style={{
                  top: `${(i / modules.length) * 100}%`,
                  height: `${(1 / modules.length) * 100}%`,
                }}
              />
            ))}
          </div>

          {/* ── CAPABILITIES (dark section) ── */}
          <section className="px-6 md:px-10 py-24 md:py-32 bg-[#0a0a0a] relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#00f5ff]/[0.03] rounded-full blur-[120px] pointer-events-none" />
            <div className="max-w-[1400px] mx-auto relative z-10">
              <div className="mb-16 flex flex-col gap-4">
                <div className="sr-label flex items-center gap-3">
                  <div className="w-8 h-px bg-white/25" />
                  <span className="text-[0.58rem] font-black tracking-[0.3em] uppercase text-white/30">
                    Ecosystem
                  </span>
                </div>
                <h2
                  className="sr-heading font-heading font-black tracking-[-0.04em] leading-[0.9] uppercase text-white"
                  style={{ fontSize: "clamp(2rem, 3.5vw, 3.2rem)" }}
                >
                  Full-stack
                  <br />
                  <span className="text-white/20">capabilities</span>
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {capabilities.map((cap, i) => (
                  <div
                    key={i}
                    className="cap-card p-8 bg-white/[0.04] border border-white/[0.06] rounded-2xl flex flex-col gap-5 hover:bg-white/[0.07] hover:border-white/[0.12] transition-all duration-300 group"
                  >
                    <div className="w-11 h-11 rounded-xl bg-white/[0.05] border border-white/[0.07] flex items-center justify-center text-xl group-hover:bg-[#00f5ff]/10 group-hover:border-[#00f5ff]/20 transition-all duration-300">
                      {cap.icon}
                    </div>
                    <div>
                      <h3 className="text-[0.78rem] font-black uppercase tracking-tight text-white mb-2">
                        {cap.title}
                      </h3>
                      <p className="text-white/40 text-[0.78rem] leading-[1.7]">
                        {cap.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── TECH STACK ── */}
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

          {/* ── PRICING ── */}
          <section className="px-6 md:px-10 py-24 md:py-32 max-w-[1400px] mx-auto">
            <div className="mb-16 flex flex-col gap-4">
              <div className="sr-label flex items-center gap-3">
                <div className="w-8 h-px bg-black/25" />
                <span className="text-[0.58rem] font-black tracking-[0.3em] uppercase text-black/35">
                  Scalable Solutions
                </span>
              </div>
              <h2
                className="sr-heading font-heading font-black tracking-[-0.04em] leading-[0.9] uppercase"
                style={{ fontSize: "clamp(2rem, 3.5vw, 3.2rem)" }}
              >
                Subscription
                <br />
                <span className="text-black/20">plans</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {plans.map((plan, i) => (
                <div
                  key={i}
                  className={`price-card relative rounded-2xl p-8 md:p-10 flex flex-col gap-7 transition-all duration-300 ${
                    plan.highlight
                      ? "bg-[#0a0a0a] text-white shadow-[0_40px_80px_rgba(0,0,0,0.18)] border border-white/[0.07]"
                      : "bg-white text-black border border-black/[0.08] shadow-[0_8px_30px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.1)] hover:-translate-y-1"
                  } ${plan.highlight ? "md:scale-[1.03] z-10" : ""}`}
                >
                  {plan.highlight && (
                    <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#00f5ff]/60 to-transparent" />
                  )}
                  <div>
                    <h3
                      className={`text-[0.78rem] font-black uppercase tracking-[0.1em] mb-1.5 ${plan.highlight ? "text-white" : "text-black"}`}
                    >
                      {plan.name}
                    </h3>
                    <p
                      className={`text-[0.72rem] ${plan.highlight ? "text-white/40" : "text-black/40"}`}
                    >
                      {plan.note}
                    </p>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span
                      className={`font-heading font-black tracking-tight ${plan.highlight ? "text-[#00f5ff]" : "text-black"}`}
                      style={{ fontSize: "clamp(2.2rem, 4vw, 2.8rem)" }}
                    >
                      {plan.price}
                    </span>
                    <span
                      className={`text-[0.58rem] font-bold uppercase tracking-widest ${plan.highlight ? "text-white/30" : "text-black/30"}`}
                    >
                      /mo
                    </span>
                  </div>
                  <div className="flex flex-col gap-3 flex-1">
                    {plan.features.map((f, j) => (
                      <div
                        key={j}
                        className={`flex items-start gap-3 text-[0.78rem] font-medium ${plan.highlight ? "text-white/60" : "text-black/55"}`}
                      >
                        <span
                          className={`mt-0.5 ${plan.highlight ? "text-[#00f5ff]" : "text-black/20"}`}
                        >
                          ✔
                        </span>
                        {f}
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => setIsDemoOpen(true)}
                    className={`w-full py-3.5 rounded-xl text-[0.62rem] font-black tracking-[0.1em] uppercase transition-all duration-300 ${
                      plan.highlight
                        ? "bg-white text-black hover:bg-white/90"
                        : "bg-black/[0.05] text-black hover:bg-black hover:text-white border border-black/[0.08]"
                    }`}
                  >
                    Get started
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* ── CTA (dark) ── */}
          <section className="px-6 md:px-10 py-24 md:py-40 relative overflow-hidden bg-[#0a0a0a]">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[700px] h-[400px] bg-[#00f5ff]/[0.035] rounded-full blur-[150px]" />
            </div>
            <div className="cta-block max-w-[1400px] mx-auto flex flex-col md:flex-row items-start md:items-end justify-between gap-12 relative z-10">
              <div>
                <div className="text-[0.58rem] font-black tracking-[0.3em] uppercase text-white/25 mb-6">
                  Ready to upgrade?
                </div>
                <h2
                  className="font-heading font-black tracking-[-0.04em] leading-[0.88] uppercase text-white"
                  style={{ fontSize: "clamp(2.5rem, 5vw, 5rem)" }}
                >
                  See the platform
                  <br />
                  <span className="text-white/20">in action</span>
                </h2>
              </div>
              <div className="flex flex-col gap-4 min-w-fit">
                <button
                  onClick={() => setIsDemoOpen(true)}
                  className="group px-10 py-4 bg-white text-black text-[0.62rem] font-black tracking-[0.12em] uppercase rounded-full flex items-center justify-center gap-3 hover:bg-white/90 hover:scale-[1.02] transition-all duration-300 shadow-2xl"
                >
                  Request a demo
                  <span className="group-hover:translate-x-1 transition-transform duration-300 text-black/25">
                    →
                  </span>
                </button>
                <p className="text-[0.58rem] text-white/20 font-bold uppercase tracking-[0.15em] text-center">
                  No commitment required
                </p>
              </div>
            </div>
          </section>

          {/* ── Footer strip ── */}
          <div className="bg-[#0a0a0a] border-t border-white/[0.05] px-6 md:px-10 py-7 flex items-center justify-between">
            <Link
              href="/"
              className="text-[0.58rem] font-black tracking-[0.2em] uppercase text-white/20 hover:text-white/45 transition-colors"
            >
              ← Portfolio
            </Link>
            <span className="text-[0.52rem] font-bold tracking-[0.2em] uppercase text-white/15">
              Dental EMR · Case Study · 2026
            </span>
          </div>
        </main>
      </SmoothScroll>

      <ContactDrawer isOpen={isDemoOpen} onClose={() => setIsDemoOpen(false)} />
    </>
  );
}
