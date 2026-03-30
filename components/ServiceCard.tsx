import { forwardRef } from "react";
import NextImage from "next/image";

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
        <div className="flex-1 flex flex-col lg:grid lg:grid-cols-[1fr_550px] min-h-0">
          {/* Left */}
          <div className="px-6 lg:px-10 py-6 lg:py-8 flex flex-col gap-6 lg:gap-8 h-full min-h-0">
            <div className="flex flex-col gap-6 flex-1 lg:min-h-0 lg:overflow-y-auto pr-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {/* Added description to fill empty black space */}
              <p className="text-white/60 text-[0.95rem] leading-[1.8] max-w-[480px]">
                {srv.desc}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-x-10 gap-y-4 pb-2">
                {srv.items.map((item, j) => (
                  <div key={j} className="flex items-center gap-3 text-white/50 text-[0.85rem]">
                    <span className="w-1 h-1 bg-cyan rounded-full shrink-0 shadow-[0_0_8px_#00f5ff]" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

          
          </div>

          {/* Right — image */}
          <div className="relative overflow-hidden h-[200px] lg:h-auto border-t border-white/5 lg:border-t-0">
            <NextImage
              src={srv.image}
              alt={srv.title}
              fill
              className="object-cover"
              unoptimized
            />
            {/* Very subtle gradient just to blend the left edge without making the image look dull */}
            <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-[#0a0a0a] to-transparent pointer-events-none" />
          </div>
        </div>
      </div>
    );
  }
);
ServiceCard.displayName = "ServiceCard";
