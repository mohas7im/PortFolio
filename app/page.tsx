"use client";
import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import FeaturedProduct from "@/components/FeaturedProduct";
import Services from "@/components/Services";
import Experience from "@/components/Experience";

import AiExplorations from "@/components/AiExplorations";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";

const Preloader = dynamic(() => import("@/components/Preloader"), { ssr: false });
const SmoothScroll = dynamic(() => import("@/components/SmoothScroll"), { ssr: false });

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  const handlePreloaderComplete = useCallback(() => {
    setLoaded(true);
  }, []);

  return (
    <>
      {/* Background grid + noise */}
      <div className="grid-bg" />
      <div className="noise-overlay" />

      {/* Custom cursor */}
      <CustomCursor />

      {/* Preloader */}
      {!loaded && <Preloader onComplete={handlePreloaderComplete} />}

      {/* Main */}
      <SmoothScroll>
        <main
          className="bg-bg text-white font-body overflow-x-clip cursor-none antialiased"
          style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.5s ease 0.1s" }}
        >
          <Nav />
          <Hero loaded={loaded} />
    
          <Marquee />
          <FeaturedProduct />
          <Services />
          <Experience />
      
          <AiExplorations />
          <About />
          <Contact />
          <Footer />
        </main>
      </SmoothScroll>
    </>
  );
}
