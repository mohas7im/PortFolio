import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
});

export const metadata: Metadata = {
  title: "Hashim — Full Stack Developer",
  description:
    "Independent developer specializing in Django, React, Next.js, TypeScript, C# and more. Based in Kerala, India.",
  keywords: [
    "full stack developer",
    "django",
    "react",
    "nextjs",
    "typescript",
    "dental emr",
    "ai",
    "llm",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${spaceGrotesk.variable}`}>
        {children}
      </body>
    </html>
  );
}
