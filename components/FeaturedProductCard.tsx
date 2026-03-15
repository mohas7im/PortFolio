import NextImage from "next/image";
import { forwardRef } from "react";

export interface Product {
  num: string;
  title: string;
  desc: string;
  tags: string[];
  accent: string;
  bgClass: string;
  glow: string;
  image: string;
  uiLabel: string;
}

interface Props {
  product: Product;
  totalProducts: number;
}

export const FeaturedProductCard = forwardRef<HTMLDivElement, Props>(
  ({ product: prod, totalProducts }, ref) => {
    return (
      <div
        ref={ref}
        className={`shrink-0 ${prod.bgClass} border border-black/[0.05] shadow-[0_20px_40px_rgba(0,0,0,0.3)] lg:shadow-[0_30px_80px_rgba(0,0,0,0.5)] relative overflow-hidden will-change-transform w-full md:w-[85vw] lg:w-[clamp(650px,65vw,960px)] h-auto lg:h-[72vh] lg:max-h-[740px] lg:min-h-[500px] rounded-2xl lg:rounded-[2rem] flex flex-col`}
        style={{
          transformOrigin: "center center",
        }}
      >
        {/* Glow blob */}
        <div
          className={`absolute top-0 right-0 w-[60%] h-[70%] rounded-full blur-[80px] bg-gradient-to-bl ${prod.glow} pointer-events-none`}
        />

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] h-full relative z-10 flex-col-reverse lg:flex-row">
          {/* Left — text */}
          <div className="flex flex-col justify-between p-8 lg:p-12 order-2 lg:order-1 gap-8 lg:gap-0">
            <div className="flex flex-col gap-5">
              {/* Num */}
              <span
                className="text-[0.65rem] font-black tracking-[0.3em] uppercase"
                style={{ color: prod.accent }}
              >
                {prod.num} /{" "}
                <span className="text-black/25">{String(totalProducts).padStart(2, "0")}</span>
              </span>

              <h2 className="font-heading text-[clamp(2rem,3.5vw,3.2rem)] leading-[0.9] font-black tracking-[-0.04em] uppercase text-black">
                {prod.title}
              </h2>

              <p className="text-black/55 text-[0.9rem] leading-[1.8] max-w-[36ch]">
                {prod.desc}
              </p>
            </div>

            {/* Tags */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap gap-2">
                {prod.tags.map((t) => (
                  <span
                    key={t}
                    className="text-[0.58rem] uppercase font-bold tracking-wider text-black/50 border border-black/[0.08] rounded-full px-3 py-1 bg-black/[0.03]"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <button className="btn-magnetic w-fit flex items-center gap-3 px-6 py-3 bg-black text-white text-[0.65rem] font-black tracking-[0.1em] uppercase rounded-full cursor-none hover:bg-black/80 hover:scale-105 transition-all duration-300 shadow-lg">
                <span>View Project</span>
                <span style={{ color: prod.accent }}>→</span>
              </button>
            </div>
          </div>

          {/* Right — mockup */}
          <div className="relative flex items-center justify-center p-6 lg:p-10 overflow-hidden order-1 lg:order-2 h-[300px] md:h-[400px] lg:h-auto border-b border-black/5 lg:border-none">
            {/* Web/App frame */}
            <div
              className="w-full max-w-[540px] aspect-video relative rounded-2xl overflow-hidden border border-black/[0.08] bg-[#0A0A0A] shadow-[0_20px_60px_rgba(0,0,0,0.3)]"
              style={{ transform: "rotateY(-4deg) rotateX(2deg)" }}
            >
              {/* Titlebar */}
              <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/[0.05]">
                <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                <span className="ml-3 font-mono text-[0.55rem] text-white/30">{prod.uiLabel}</span>
              </div>

              {/* Image showcase */}
              <div className="relative w-full h-[calc(100%-36px)]">
                <NextImage
                  src={prod.image}
                  alt={prod.title}
                  fill
                  className="object-cover opacity-90"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);
FeaturedProductCard.displayName = "FeaturedProductCard";
