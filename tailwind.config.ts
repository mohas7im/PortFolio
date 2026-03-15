import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ["var(--font-space)", "'Space Grotesk'", "sans-serif"],
        body: ["var(--font-inter)", "'Inter'", "sans-serif"],
      },
      colors: {
        bg: "#030303",
        accent: "#ffffff",
        muted: "rgba(255, 255, 255, 0.4)",
        "card-bg": "rgba(255, 255, 255, 0.02)",
        border: "rgba(255, 255, 255, 0.06)",
        "border-accent": "rgba(255, 255, 255, 0.15)",
        "border-light": "rgba(255, 255, 255, 0.1)",
        cyan: "#00F5FF",
        ngreen: "#39FF14",
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        blinkText: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        scrollLine: {
          "0%": { transform: "translateX(-100%)" },
          "50%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        marqueeScroll: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-33.33%)" },
        },
      },
      animation: {
        blink: "blink 1.2s infinite ease-in-out",
        blinkText: "blinkText 1s step-end infinite",
        scrollLine: "scrollLine 2s cubic-bezier(0.16, 1, 0.3, 1) infinite",
        marquee: "marqueeScroll 30s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
