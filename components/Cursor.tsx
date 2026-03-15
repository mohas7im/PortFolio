"use client";
import { useEffect, useRef } from "react";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const circle = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = circleRef.current;
    if (!dot || !ring) return;

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animate = () => {
      circle.current.x = lerp(circle.current.x, mouse.current.x, 0.1);
      circle.current.y = lerp(circle.current.y, mouse.current.y, 0.1);
      ring.style.transform = `translate(${circle.current.x}px, ${circle.current.y}px) translate(-50%, -50%)`;
      rafRef.current = requestAnimationFrame(animate);
    };

    const onEnterLink = () => document.body.classList.add("cursor-hover");
    const onLeaveLink = () => document.body.classList.remove("cursor-hover");

    document.addEventListener("mousemove", onMove);
    rafRef.current = requestAnimationFrame(animate);

    const links = document.querySelectorAll("a, button, .project-item");
    links.forEach((el) => {
      el.addEventListener("mouseenter", onEnterLink);
      el.addEventListener("mouseleave", onLeaveLink);
    });

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className="cursor">
      <div ref={dotRef} className="cursor__dot" />
      <div ref={circleRef} className="cursor__circle" />
    </div>
  );
}
