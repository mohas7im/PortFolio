"use client";
import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import ContactDrawer from "./ContactDrawer";

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;

    let ctx = gsap.context(() => {});
    const cleanups: (() => void)[] = [];

    const initAnim = async () => {
      ctx = gsap.context(() => {
        // --- 1. Heading reveal (animate spans directly — no SplitType, preserves gradient-text) ---
        const headingSpans =
          sectionRef.current?.querySelectorAll(".heading-line");
        if (headingSpans && headingSpans.length) {
          gsap.set(headingSpans, { opacity: 0, y: 80 });
        }

        // Pre-hide other elements
        gsap.set(".hero-subtitle", { opacity: 0, y: 40 });
        gsap.set(".hero-cta-wrapper", { opacity: 0, scale: 0.8 });
        gsap.set(".social-link", { opacity: 0, y: 20 });

        const mainTl = gsap.timeline({ paused: true });

        mainTl
          .to(headingSpans ?? [], {
            opacity: 1,
            y: 0,
            stagger: 0.15,
            duration: 1.2,
            ease: "expo.out",
          })
          .to(
            ".hero-subtitle",
            {
              y: 0,
              opacity: 1,
              duration: 1,
              ease: "power4.out",
            },
            "-=0.8",
          )
          .to(
            ".hero-cta-wrapper",
            {
              scale: 1,
              opacity: 1,
              duration: 1,
              ease: "back.out(1.7)",
            },
            "-=0.6",
          )
          .to(
            ".social-link",
            {
              y: 0,
              opacity: 1,
              stagger: 0.1,
              duration: 0.8,
              ease: "power3.out",
            },
            "-=0.4",
          );

        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
          onEnter: () => mainTl.play(),
        });

        // --- 2. Floating Cyan Dot & Ring ---
        gsap.to(".cyan-dot", {
          y: -10,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        gsap.to(".dot-ring", {
          scale: 3,
          opacity: 0,
          duration: 2,
          repeat: -1,
          ease: "power2.out",
        });

        // --- 3. Enhanced Magnetic Button ---
        const btn = sectionRef.current?.querySelector(
          ".hero-cta",
        ) as HTMLElement;
        const btnArea = sectionRef.current?.querySelector(
          ".hero-cta-wrapper",
        ) as HTMLElement;

        if (btn && btnArea) {
          const xTo = gsap.quickTo(btn, "x", {
            duration: 0.6,
            ease: "power3.out",
          });
          const yTo = gsap.quickTo(btn, "y", {
            duration: 0.6,
            ease: "power3.out",
          });
          const textXTo = gsap.quickTo(btn.querySelector("span"), "x", {
            duration: 0.6,
            ease: "power3.out",
          });
          const textYTo = gsap.quickTo(btn.querySelector("span"), "y", {
            duration: 0.6,
            ease: "power3.out",
          });

          const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const { left, top, width, height } =
              btnArea.getBoundingClientRect();
            const x = clientX - (left + width / 2);
            const y = clientY - (top + height / 2);

            xTo(x * 0.35);
            yTo(y * 0.35);
            textXTo(x * 0.15);
            textYTo(y * 0.15);
          };

          const handleMouseLeave = () => {
            xTo(0);
            yTo(0);
            textXTo(0);
            textYTo(0);
            gsap.to(btn, { scale: 1, duration: 0.3 });
          };

          const handleMouseEnter = () => {
            gsap.to(btn, { scale: 1.05, duration: 0.3 });
          };

          btnArea.addEventListener("mousemove", handleMouseMove);
          btnArea.addEventListener("mouseleave", handleMouseLeave);
          btnArea.addEventListener("mouseenter", handleMouseEnter);

          cleanups.push(() => {
            btnArea.removeEventListener("mousemove", handleMouseMove);
            btnArea.removeEventListener("mouseleave", handleMouseLeave);
            btnArea.removeEventListener("mouseenter", handleMouseEnter);
          });
        }

        // --- 4. Interactive Glow ---
        const handleSectionMouseMove = (e: MouseEvent) => {
          const { clientX, clientY } = e;
          const rect = sectionRef.current?.getBoundingClientRect();
          if (!rect) return;
          const x = clientX - rect.left;
          const y = clientY - rect.top;

          gsap.to(".interactive-glow", {
            x: x - 400,
            y: y - 400,
            duration: 1.5,
            ease: "power2.out",
          });
        };

        sectionRef.current?.addEventListener(
          "mousemove",
          handleSectionMouseMove,
        );
        cleanups.push(() =>
          sectionRef.current?.removeEventListener(
            "mousemove",
            handleSectionMouseMove,
          ),
        );
      }, sectionRef);
    };

    initAnim();

    return () => {
      ctx.revert();
      cleanups.forEach((fn) => fn());
    };
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        id="contact"
        className="py-12 md:py-24 px-6 md:px-10 flex justify-center border-t border-white/[0.08] text-center relative z-[2] bg-black overflow-hidden perspective-1000"
      >
        {/* Grain Overlay */}
        <div className="section-noise absolute inset-0 z-0 pointer-events-none opacity-[0.03]" />

        {/* Dynamic Glow */}
        <div className="interactive-glow absolute top-0 left-0 w-[800px] h-[800px] bg-cyan-500/10 blur-[150px] rounded-full pointer-events-none z-0 translate-x-[-50%] translate-y-[-50%]" />

        {/* ── Floating Code — scattered random positions ── */}
        <pre className="absolute top-[4%] left-[3%] z-[1] pointer-events-none select-none opacity-[0.09] font-mono text-[0.58rem] leading-[1.8] text-white rotate-[-2deg] whitespace-pre">{`async function sendMessage(
  payload: ContactForm
): Promise<Response> {
  const res = await fetch('/api/contact', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  return res.json();
}`}</pre>

        <pre className="absolute top-[12%] right-[5%] z-[1] pointer-events-none select-none opacity-[0.07] font-mono text-[0.55rem] leading-[1.8] text-white rotate-[3deg] whitespace-pre">{`type Project = {
  id: string;
  title: string;
  stack: string[];
  live: boolean;
};

const isValid = (p: Project) =>
  p.stack.length > 0 && p.live;`}</pre>

        <pre className="absolute top-[30%] right-[7%] z-[1] pointer-events-none select-none opacity-[0.05] font-mono text-[0.53rem] leading-[1.8] text-white rotate-[2deg] whitespace-pre">{`useEffect(() => {
  gsap.from('.hero', {
    opacity: 0, y: 40,
    duration: 1.2,
    ease: 'expo.out',
  });
}, []);`}</pre>

        <pre className="absolute top-[52%] left-[4%] z-[1] pointer-events-none select-none opacity-[0.06] font-mono text-[0.54rem] leading-[1.8] text-white rotate-[1.5deg] whitespace-pre">{`export async function POST(
  req: Request
) {
  const body = await req.json();
  await db.insert(messages, body);
  return Response.json({ ok: true });
}`}</pre>

        <pre className="absolute top-[65%] right-[3%] z-[1] pointer-events-none select-none opacity-[0.07] font-mono text-[0.55rem] leading-[1.8] text-white rotate-[-2.5deg] whitespace-pre">{`const useForm = () => {
  const [state, setState] =
    useState({ name:'', email:'' });
  const handleChange = (e) =>
    setState(s => ({
      ...s, [e.target.name]: e.target.value
    }));
  return { state, handleChange };
};`}</pre>

        <pre className="absolute bottom-[8%] left-[18%] z-[1] pointer-events-none select-none opacity-[0.06] font-mono text-[0.55rem] leading-[1.8] text-white rotate-[-1deg] whitespace-pre">{`const router = createRouter({
  contact: contactProcedure,
  projects: projectProcedure,
  auth: authProcedure,
});`}</pre>


        <div className="contact-content flex flex-col items-center gap-8 max-w-[1000px] relative z-10">
          <h2
            ref={headingRef}
            className="font-heading text-[clamp(3rem,12vw,9rem)] leading-[0.8] font-black tracking-[-0.05em] uppercase inline-block pb-4 flex flex-col items-center overflow-hidden"
          >
            <span className="heading-line gradient-text block pb-2">
              LET&apos;S BUILD
            </span>
            <span className="block flex items-end justify-center gap-4 pb-2">
              <span className="heading-line gradient-text">SOMETHING</span>
              <span className="relative inline-block translate-y-[-0.1em]">
                <span className="cyan-dot text-cyan-400 block leading-none">
                  .
                </span>
                <span className="dot-ring absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-cyan-400/30 pointer-events-none" />
              </span>
            </span>
          </h2>

          <p className="hero-subtitle text-[1.2rem] text-white/40 leading-relaxed max-w-[550px] font-medium">
            Currently available for select projects. Let&apos;s turn your vision
            into a digital masterpiece that stands out from the noise.
          </p>

          <div className="hero-cta-wrapper p-6 mt-2">
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="hero-cta relative group flex items-center justify-center bg-white text-black w-56 h-56 lg:w-64 lg:h-64 rounded-full overflow-hidden transition-shadow hover:shadow-[0_0_60px_rgba(255,255,255,0.15)]"
            >
              <span className="relative z-10 font-black text-lg tracking-widest uppercase flex flex-col items-center">
                Start
                <span className="text-[0.6rem] font-bold tracking-[0.3em] mt-1 text-black/40">
                  a Project
                </span>
              </span>
              <div className="absolute inset-x-0 bottom-0 h-0 bg-cyan-400 group-hover:h-full transition-all duration-500 ease-expo" />
            </button>
          </div>

          <div className="flex gap-16 text-[0.7rem] font-bold text-white/20 tracking-[0.2em] mt-6">
            {["LINKEDIN", "GITHUB", "DRIBBBLE"].map((social) => (
              <a
                key={social}
                href={`https://${social.toLowerCase()}.com`}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link group relative py-2 overflow-hidden"
              >
                <span className="block group-hover:-translate-y-full transition-transform duration-500 ease-expo">
                  {social}
                </span>
                <span className="absolute top-full left-0 block text-white group-hover:-translate-y-full transition-transform duration-500 ease-expo">
                  {social}
                </span>
                <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-white group-hover:w-full transition-all duration-500" />
              </a>
            ))}
          </div>
        </div>
      </section>

      <ContactDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </>
  );
}
