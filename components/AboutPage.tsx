"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Link from "next/link";

/* ─── DATA ─── */
const journeyItems = [
  {
    city: "KERALA",
    country: "(INDIA)",
    years: "2018–2022",
    desc: "Grew up surrounded by technology and curiosity. Studied computer science and built my first real projects here — web apps, scripts, and early Django backends. This is where the foundation was laid.",
    icon: "→",
  },
  {
    city: "BUILDING",
    country: "(REMOTE)",
    years: "2022–2024",
    desc: "Took on freelance and contract work across multiple domains — healthcare systems, REST APIs, and enterprise tools. Worked with teams across time zones, sharpened my ability to ship production-quality code.",
    icon: "→",
  },
  {
    city: "INDEPENDENT",
    country: "(NOW)",
    years: "2025–TODAY",
    desc: "Working independently, leading full-stack projects end-to-end. Currently building a comprehensive Dental EMR platform and collaborating with clients globally. Focused on clean architecture and exceptional UX.",
    icon: "◎",
  },
];

const skills = [
  {
    name: "BACKEND",
    category: "DEVELOPMENT",
    items: ["Python", "Django", "Django REST Framework", "C#", ".NET Core", "FastAPI"],
  },
  {
    name: "FRONTEND",
    category: "DEVELOPMENT",
    items: ["React", "Next.js", "TypeScript", "TailwindCSS", "GSAP", "Framer Motion"],
  },
  {
    name: "DATABASE + INFRA",
    category: "DEVELOPMENT",
    items: ["PostgreSQL", "MySQL", "Redis", "Docker", "Linux", "REST APIs", "GraphQL"],
  },
];

const achievements = [
  {
    category: "PROJECTS",
    items: [
      { name: "Dental EMR", note: "Full-stack Healthcare Platform" },
      { name: "Dev Portfolio", note: "GSAP · Next.js · TypeScript" },
      { name: "REST API Platform", note: "Django · Docker · Redis" },
      { name: ".NET Enterprise App", note: "C# · React · SQL Server" },
    ],
  },
  {
    category: "EXPERTISE",
    items: [
      { name: "Full Stack Architecture", note: "Django + React" },
      { name: "API Design", note: "REST · GraphQL" },
      { name: "EMR Systems", note: "Healthcare Tech" },
      { name: "Creative Dev", note: "Animation · Motion" },
    ],
  },
];

const sections = ["INTRO", "JOURNEY", "SKILLS", "WORK", "CONTACT"];

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [progress, setProgress] = useState(0);
  const [openSkill, setOpenSkill] = useState<number | null>(null);
  const [time, setTime] = useState("");
  const isScrolling = useRef(false);

  /* ── Clock ── */
  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true }) +
          ", " +
          now.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase()
      );
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  /* ── Snap scroll via wheel ── */
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (isScrolling.current) return;
      isScrolling.current = true;
      const dir = e.deltaY > 0 ? 1 : -1;
      const next = Math.max(0, Math.min(sections.length - 1, currentSection + dir));
      if (next !== currentSection) goToSection(next);
      setTimeout(() => { isScrolling.current = false; }, 900);
    };
    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, [currentSection]);

  /* ── Keyboard nav ── */
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight") goToSection(Math.min(sections.length - 1, currentSection + 1));
      if (e.key === "ArrowUp" || e.key === "ArrowLeft") goToSection(Math.max(0, currentSection - 1));
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [currentSection]);

  const goToSection = (idx: number) => {
    setCurrentSection(idx);
    setProgress(Math.round((idx / (sections.length - 1)) * 100));
    const el = containerRef.current;
    if (!el) return;
    gsap.to(el, { scrollTop: idx * window.innerHeight, duration: 0.85, ease: "power3.inOut" });
  };

  /* ── Intro animation ── */
  useEffect(() => {
    gsap.fromTo(".about-big-title", { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1.1, ease: "power3.out", delay: 0.2 });
    gsap.fromTo(".about-intro-text", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", delay: 0.6 });
  }, []);

  return (
    <div className="about-page">
      {/* ── Top strip ── */}
      <div className="ap-topstrip">
        <Link href="/" className="ap-back hover-underline">← Back</Link>
        <div className="ap-topstrip-center">AVAIL: <span style={{ color: "var(--lime)" }}>03.2026</span></div>
        <a href="mailto:hashimshaikk04@gmail.com" className="ap-contact-link hover-underline">CONTACT</a>
        <span className="ap-clock">{time}</span>
      </div>

      {/* ── Fixed side labels ── */}
      <div className="ap-side-left">{sections[currentSection]}</div>
      <div className="ap-side-right">{progress} %</div>

      {/* ── Pill nav ── */}
      <div className="ap-pill-nav">
        <button className="ap-pill-arrow" onClick={() => goToSection(Math.max(0, currentSection - 1))} disabled={currentSection === 0}>←</button>
        <span className="ap-pill-label">{sections[currentSection]}</span>
        <button className="ap-pill-arrow" onClick={() => goToSection(Math.min(sections.length - 1, currentSection + 1))} disabled={currentSection === sections.length - 1}>→</button>
      </div>

      {/* ── Scroll container ── */}
      <div ref={containerRef} className="ap-scroll-container">

        {/* ══ 1. INTRO ══ */}
        <section className="ap-section ap-intro">
          <div className="ap-intro-overlay" />
          <h1 className="about-big-title">About</h1>
          <div className="about-intro-text">
            <p>I&apos;m Hashim, a full stack developer from Kerala, India. For the last several years, I&apos;ve been building at the intersection of robust backend systems and polished frontends — where clean architecture, precise logic, and thoughtful UX come together to create something meaningful.</p>
            <br />
            <p>Driven by curiosity and a belief that every detail matters, I build scalable web applications that are as reliable under the hood as they are refined on the surface.</p>
          </div>
        </section>

        {/* ══ 2. JOURNEY ══ */}
        <section className="ap-section ap-journey">
          <div className="ap-journey-grid">
            {journeyItems.map((item, i) => (
              <div key={i} className="ap-journey-col">
                <div className="ap-journey-city">{item.city}<br /><span>{item.country}</span></div>
                <div className="ap-journey-icon">{item.icon}</div>
                <div className="ap-journey-year-tag">{item.years}</div>
                <p className="ap-journey-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ══ 3. SKILLS ══ */}
        <section className="ap-section ap-skills">
          <div className="ap-skills-list">
            {skills.map((s, i) => (
              <div key={i} className="ap-skill-row" onClick={() => setOpenSkill(openSkill === i ? null : i)}>
                <div className="ap-skill-row-main">
                  <span className="ap-skill-name">{s.name}</span>
                  <div className="ap-skill-row-right">
                    <span className="ap-skill-category">{s.category}</span>
                    <button className="ap-skill-toggle">{openSkill === i ? "−" : "+"}</button>
                  </div>
                </div>
                <div className={`ap-skill-expanded ${openSkill === i ? "open" : ""}`}>
                  <div className="ap-skill-items">
                    {s.items.map((item, j) => <span key={j} className="ap-skill-chip">{item}</span>)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ══ 4. WORK ══ */}
        <section className="ap-section ap-achievements">
          <div className="ap-ach-grid">
            {achievements.map((group, i) => (
              <div key={i} className="ap-ach-col">
                <h4 className="ap-ach-group-title">{group.category}</h4>
                {group.items.map((item, j) => (
                  <div key={j} className="ap-ach-item">
                    <span className="ap-ach-name">{item.name}</span>
                    <span className="ap-ach-note">{item.note}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* ══ 5. CONTACT ══ */}
        <section className="ap-section ap-contact-section">
          <blockquote className="ap-quote">&quot;Every line of code, every API endpoint, every pixel of interface — carries intention.&quot;</blockquote>
          <a href="mailto:hashimshaikk04@gmail.com" className="ap-email-link">hashimshaikk04@gmail.com</a>
          <div className="ap-social-links">
            <a href="https://github.com/hashimshaikk" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://linkedin.com/in/hashimshaikk" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="mailto:hashimshaikk04@gmail.com">Email</a>
          </div>
        </section>

      </div>
    </div>
  );
}
