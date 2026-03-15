import { forwardRef } from "react";

export interface Service {
  num: string;
  title: string;
  desc: string;
  items: string[];
  image: string;
}

interface Props {
  service: Service;
  index: number;
  totalServices: number;
  navH: number;
}

export const ServiceCard = forwardRef<HTMLDivElement, Props>(
  ({ service: srv, index: i, totalServices, navH }, ref) => {
    return (
      <div
        ref={ref}
        className="sticky bg-[#0a0a0a] border border-white/[0.08] overflow-hidden flex flex-col h-auto lg:h-[70vh] lg:min-h-[480px] lg:max-h-[660px]"
        style={{
          top:             `${navH}px`,   // ALL cards stick at the same top
          zIndex:          i + 1,          // ascending → later card always on top
          borderRadius:    "1.6rem",
          transformOrigin: "top center",
        }}
      >
        {/* ── Title row — always visible even when stacked ── */}
        <div
          className="flex items-center justify-between px-6 lg:px-10 border-b border-white/[0.05]"
          style={{ height: "76px" }}
        >
          <div className="flex items-center gap-3 lg:gap-5 min-w-0">
            <span className="text-white/60 text-[1.6rem] leading-none shrink-0">→</span>
            <h3 className="font-heading text-[clamp(1.6rem,3vw,2.8rem)] font-bold tracking-[-0.04em] text-white uppercase leading-[0.9] truncate">
              {srv.title}
            </h3>
          </div>
          {/* Number + bar progress */}
          <div className="flex items-center gap-3 shrink-0 ml-6">
            <span className="text-white/25 text-[0.82rem] font-bold tracking-widest">{srv.num}</span>
            <div className="w-px h-5 bg-white/10" />
            <div className="flex gap-[3px] items-end">
              {Array.from({ length: totalServices }).map((_, j) => (
                <div
                  key={j}
                  className="w-[3px] rounded-full"
                  style={{
                    height:     j <= i ? "18px" : "9px",
                    background: j <= i ? "rgba(255,255,255,0.65)" : "rgba(255,255,255,0.1)",
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ── Body: sub-items + image ── */}
        <div className="flex-1 flex flex-col lg:grid lg:grid-cols-[1fr_420px]">
          {/* Left */}
          <div className="px-6 lg:px-10 py-6 lg:py-8 flex flex-col justify-between gap-8 lg:gap-0">
            <div className="flex flex-col gap-6">
              {/* Added description to fill empty black space */}
              <p className="text-white/60 text-[0.95rem] leading-[1.8] max-w-[480px]">
                {srv.desc}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-x-10 gap-y-4">
                {srv.items.map((item, j) => (
                  <div key={j} className="flex items-center gap-3 text-white/50 text-[0.85rem]">
                    <span className="w-1 h-1 bg-cyan rounded-full shrink-0 shadow-[0_0_8px_#00f5ff]" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="text-[0.6rem] font-black tracking-[0.2em] uppercase border border-white/20 text-white px-5 py-2.5 rounded-full hover:bg-white hover:text-black transition-all duration-300 cursor-none">
                View Service Details
              </button>
              <button className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/40 hover:bg-white hover:text-black transition-all duration-300 cursor-none text-sm">
                ←
              </button>
            </div>
          </div>

          {/* Right — image */}
          <div className="relative overflow-hidden h-[200px] lg:h-auto border-t border-white/5 lg:border-t-0">
            <img
              src={srv.image}
              alt={srv.title}
              className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/5 to-transparent pointer-events-none" />
          </div>
        </div>
      </div>
    );
  }
);
ServiceCard.displayName = "ServiceCard";
