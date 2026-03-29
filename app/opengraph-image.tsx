import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Hashim — Full Stack & Website Developer Portfolio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0a0a0a",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          fontFamily: "sans-serif",
          position: "relative"
        }}
      >
        <p style={{
          color: "rgba(255,255,255,0.35)",
          fontSize: 20,
          letterSpacing: "0.35em",
          textTransform: "uppercase",
          margin: "0 0 20px 0"
        }}>
          Full Stack & Website Developer · Kerala, India
        </p>

        <h1 style={{
          color: "white",
          fontSize: 110,
          fontWeight: 900,
          margin: 0,
          lineHeight: 0.95,
          letterSpacing: "-0.04em",
          textTransform: "uppercase"
        }}>
          HASHIM
        </h1>

        <div style={{
          width: 80,
          height: 2,
          background: "rgba(255,255,255,0.2)",
          margin: "40px 0"
        }} />

        <p style={{
          color: "rgba(255,255,255,0.4)",
          fontSize: 22,
          margin: 0,
          letterSpacing: "0.08em"
        }}>
          React · Next.js · Django · Python · TypeScript · GSAP · Tailwind
        </p>

        <p style={{
          color: "rgba(255,255,255,0.25)",
          fontSize: 18,
          margin: "16px 0 0 0",
          letterSpacing: "0.06em"
        }}>
          Website Development · Web Apps · SaaS · Freelance
        </p>

        <p style={{
          position: "absolute",
          bottom: 60,
          right: 80,
          color: "rgba(255,255,255,0.2)",
          fontSize: 18,
          letterSpacing: "0.15em",
          margin: 0
        }}>
          mohashim.netlify.app
        </p>
      </div>
    ),
    { ...size }
  );
}
