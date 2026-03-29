import type { Metadata } from "next";
import AboutPage from "@/components/AboutPage";

export const metadata: Metadata = {
  title: "About Hashim — Full Stack & Website Developer Kerala | React, Next.js, Django, Python",
  description: "Hashim is a full stack and website developer from Kerala, India. Strong in React, Next.js, Django, Python, TypeScript, GSAP, and Tailwind CSS. Available for freelance projects.",
  alternates: { canonical: "https://mohashim.netlify.app/about" },
  openGraph: {
    title: "About Hashim — Full Stack & Website Developer Kerala",
    description: "Full stack and website developer from Kerala. React, Next.js, Django, Python, GSAP. Freelance projects welcome.",
    url: "https://mohashim.netlify.app/about"
  }
};

export default function About() {
  return (
    <main className="bg-bg min-h-screen">
      <AboutPage />

      {/* Semantic Keyword-Rich Context Profile — Rendered Visually */}
      <section className="max-w-[1000px] mx-auto px-6 md:px-10 py-24 pb-32 text-white/60 font-body">
        <h1 className="text-[2rem] md:text-[3rem] font-heading font-bold text-white/90 mb-8 uppercase tracking-[-0.02em]">
          About Hashim
        </h1>
        
        <div className="flex flex-col gap-6 text-[1.1rem] leading-[1.8] mb-16">
          <p>
            I'm Hashim, a full stack developer and website developer from Kerala, India. I have strong knowledge across both frontend and backend development — designing and building fast, modern, and polished websites and digital products completely from scratch.
          </p>
          <p>
            On the frontend I work with React, Next.js, TypeScript, Tailwind CSS, and GSAP for high-quality animations and interactions. On the backend I build with Django and Python — creating robust REST APIs, database architecture, and server-side logic. I bring both sides together to deliver complete, production-ready websites and web applications.
          </p>
          <p>
            I take on freelance projects as a full stack developer and website developer for clients across Kerala, India, and internationally. Whether you need a custom website, a SaaS product, or a complex web application — I build it end to end.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-[1.8rem] font-heading font-bold text-white/90 mb-6 uppercase">
              Services
            </h2>
            <ul className="flex flex-col gap-3 text-[1rem] marker:text-white/30 list-disc pl-5">
              <li>Custom Website Development</li>
              <li>Full Stack Web Application Development</li>
              <li>Software & SaaS Product Development</li>
              <li>Frontend Development — React, Next.js, GSAP, Tailwind</li>
              <li>Backend Development — Django, Python, REST APIs</li>
              <li>AI-Integrated Software Development</li>
            </ul>
          </div>

          <div>
            <h2 className="text-[1.8rem] font-heading font-bold text-white/90 mb-6 uppercase">
              Tech Stack
            </h2>
            <ul className="flex flex-col gap-3 text-[1rem] marker:text-white/30 list-disc pl-5">
              <li><strong className="text-white/80 font-normal">Frontend:</strong> React, Next.js, TypeScript, JavaScript, Tailwind CSS, GSAP</li>
              <li><strong className="text-white/80 font-normal">Backend:</strong> Django, Python, REST APIs</li>
              <li><strong className="text-white/80 font-normal">Tools:</strong> Git, Vercel, Netlify, Figma</li>
            </ul>
          </div>
        </div>

        <p className="mt-16 text-white/50 italic text-sm tracking-wide">
          Based in Kerala, India — Available for freelance website development and software development projects worldwide.
        </p>
      </section>
    </main>
  );
}
