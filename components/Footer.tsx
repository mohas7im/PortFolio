"use client";

const scrollToTop = () =>
  typeof window !== "undefined" && window.scrollTo({ top: 0, behavior: "smooth" });

export default function Footer() {
  return (
    <footer className="bg-white text-black px-10 md:px-20 pt-10 pb-8 border-t border-black/10">
      {/* Top Row */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-8">
        {/* Brand */}
        <div className="flex flex-col gap-3 max-w-xs">
          <span className="font-heading text-[2.5rem] font-black tracking-tighter leading-none uppercase text-black">
            Hashim<span className="text-cyan-500">.</span>
          </span>
          <p className="text-sm text-black/40 leading-relaxed font-medium">
            Full-stack developer crafting premium digital experiences that push the boundaries of the web.
          </p>
        </div>

        {/* Nav Links */}
        <div className="flex flex-col md:flex-row gap-12 text-xs font-black tracking-[0.2em] uppercase">
          <div className="flex flex-col gap-4">
            <span className="text-black/30 text-[0.6rem]">Navigate</span>
            {["Work", "Services", "About", "Contact"].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-black/60 hover:text-black transition-colors duration-300"
              >
                {link}
              </a>
            ))}
          </div>
          <div className="flex flex-col gap-4">
            <span className="text-black/30 text-[0.6rem]">Connect</span>
            {[
              { label: "LinkedIn", href: "https://linkedin.com/in/hashimshaikk" },
              { label: "GitHub", href: "https://github.com/hashimshaikk" },
              { label: "Dribbble", href: "https://dribbble.com" },
              { label: "Email", href: "mailto:hashimshaikk04@gmail.com" },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="text-black/60 hover:text-black transition-colors duration-300"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-black/10 mb-6" />

      {/* Bottom Row */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-[0.65rem] font-black tracking-[0.2em] text-black/40 uppercase">
            Available for Q2 2026
          </span>
        </div>

        <span className="text-[0.65rem] font-bold tracking-[0.15em] text-black/30 uppercase">
          © 2026 Hashim — All rights reserved
        </span>

        <button
          onClick={scrollToTop}
          className="group flex items-center gap-2 text-[0.65rem] font-black tracking-[0.2em] uppercase text-black/40 hover:text-black transition-colors duration-300"
        >
          Back to top
          <span className="group-hover:-translate-y-1 transition-transform duration-300 inline-block">↑</span>
        </button>
      </div>
    </footer>
  );
}
