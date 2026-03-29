"use client";
import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import Link from "next/link";
import { useMagnetic } from "@/hooks/useMagnetic";
import ContactDrawer from "./ContactDrawer";

export default function Nav() {
  const navRef = useRef<HTMLElement>(null);
  const btnRef = useMagnetic(0.2);
  const [isTalkOpen, setIsTalkOpen] = useState(false);

  useEffect(() => {
    if (!navRef.current) return;

    const ctx = gsap.context(() => {
      // Entrance animation - reduced delay
      gsap.from(navRef.current, { 
        y: -100, 
        opacity: 0, 
        duration: 0.8, 
        ease: "power4.out", 
        delay: 0.5 
      });

      // Hide/show on scroll
      ScrollTrigger.create({
        onUpdate: (self) => {
          if (document.body.getAttribute('data-hide-nav') === 'true') {
            gsap.to(navRef.current, { y: -130, opacity: 0, duration: 0.4, ease: "power2.inOut", overwrite: "auto" });
            return;
          }

          if (self.direction === 1 && window.scrollY > 80 && !isTalkOpen) {
            gsap.to(navRef.current, { y: -120, opacity: 0, duration: 0.4, ease: "power2.in", overwrite: "auto" });
          } else {
            gsap.to(navRef.current, { y: 0, opacity: 1, duration: 0.5, ease: "power3.out", overwrite: "auto" });
          }
        },
      });
    }, navRef);

    return () => ctx.revert();
  }, [isTalkOpen]);

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-6 inset-x-0 mx-auto w-[92%] max-w-[1200px] z-[200] h-16 bg-black/40 backdrop-blur-[24px] backdrop-saturate-[180%] border border-white/[0.1] rounded-full shadow-[0_20px_40px_rgba(0,0,0,0.4)] flex items-center px-8 will-change-transform transform-gpu"
      >
        <div className="flex items-center justify-between w-full">
          {/* Brand */}
          <div className="flex-1">
            <Link href="/" className="group flex items-center gap-2 no-underline">
              <span className="w-2 h-2 rounded-full bg-white group-hover:bg-cyan transition-colors" />
              <span className="font-heading text-xs font-bold tracking-[0.2em] text-white uppercase">
                HASHIM
              </span>
            </Link>
          </div>

          {/* Links */}
          <div className="hidden md:flex items-center gap-12">
            {[
              { label: "WORK", href: "#product" },
              { label: "SERVICES", href: "#services" },
              { label: "AI", href: "#ai" },
              { label: "ABOUT", href: "#about" },
              { label: "CONTACT", href: "#contact" }
            ].map((link) => (
              <a 
                key={link.label}
                href={link.href}
                className="text-[0.65rem] font-bold tracking-[0.15em] text-white/50 hover:text-white transition-all duration-300 no-underline"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="flex-1 flex justify-end">
            <button
              ref={btnRef}
              onClick={() => setIsTalkOpen(true)}
              className="btn-magnetic bg-white text-black px-6 py-2.5 rounded-full text-[0.65rem] tracking-[0.1em] font-bold no-underline transition-all duration-300 hover:bg-white/90 hover:scale-105 shadow-xl flex items-center gap-2"
            >
              <span>LET&apos;S TALK</span>
              <span className="text-[10px] opacity-30">→</span>
            </button>
          </div>
        </div>
      </nav>

      <ContactDrawer isOpen={isTalkOpen} onClose={() => setIsTalkOpen(false)} />
    </>
  );
}
