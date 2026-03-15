"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 15) + 5;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
      }
      setProgress(current);
      if (barRef.current) gsap.to(barRef.current, { width: `${current}%`, duration: 0.1 });
    }, 150);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      const tl = gsap.timeline({ onComplete });
      tl.to([textRef.current, barRef.current?.parentElement], {
        opacity: 0, delay: 0.3, duration: 0.5, ease: "power2.inOut"
      }).to(containerRef.current, {
        yPercent: -100, duration: 0.8, ease: "power4.inOut"
      });
    }
  }, [progress, onComplete]);

  return (
    <div ref={containerRef} className="fixed inset-0 bg-bg z-[9999] flex items-center justify-center">
      <div className="flex flex-col items-center gap-8 w-full max-w-[300px]">
        <div ref={textRef} className="font-heading text-[0.8rem] tracking-[0.3em] text-white uppercase">
          {progress < 100 ? "LOADING" : "READY"} {progress}%
        </div>
        <div className="w-full h-0.5 bg-white/10 rounded overflow-hidden">
          <div ref={barRef} className="h-full bg-white w-0" />
        </div>
      </div>
    </div>
  );
}
