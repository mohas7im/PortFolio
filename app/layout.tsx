import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import StructuredData from "@/components/StructuredData";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mohashim.netlify.app"),
  title: {
    default: "Hashim — Full Stack Developer | Freelance Website & Software Developer Kerala",
    template: "%s | Hashim"
  },
  description: "I'm Hashim, a full stack developer from Kerala, India. I specialize in website development, web applications, and SaaS products. Strong in React, Next.js, Django, Python, TypeScript, GSAP, and Tailwind CSS. Available for freelance projects worldwide.",
  keywords: [
    "Hashim", "Hashim developer", "Hashim full stack developer",
    "Hashim developer Kerala", "Hashim developer portfolio",
    "Hashim website developer", "Hashim web developer",
    "Hashim React developer", "Hashim Next.js developer",
    "freelance full stack developer Kerala",
    "freelance software developer Kerala",
    "freelance web developer Kerala",
    "freelance website developer Kerala",
    "freelance website developer India",
    "freelance developer India",
    "full stack developer Kerala",
    "software developer Kerala",
    "web developer Kerala",
    "website developer Kerala",
    "website development Kerala",
    "website development India",
    "Next.js developer Kerala",
    "React developer Kerala",
    "Django developer Kerala",
    "Python developer Kerala",
    "TypeScript developer Kerala",
    "GSAP developer Kerala",
    "Tailwind developer Kerala",
    "full stack developer India freelance",
    "frontend backend developer Kerala",
    "website development freelance India",
    "custom website development Kerala"
  ],
  authors: [{ name: "Hashim", url: "https://mohashim.netlify.app" }],
  creator: "Hashim",
  publisher: "Hashim",
  category: "Technology",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://mohashim.netlify.app",
    siteName: "Hashim — Full Stack Developer Portfolio",
    title: "Hashim — Full Stack Developer | Freelance Website & Software Developer Kerala",
    description: "Full stack developer from Kerala building modern websites, web apps, and SaaS products. Strong in React, Next.js, Django, Python, GSAP. Freelance projects welcome.",
    images: [{
      url: "/opengraph-image",
      width: 1200,
      height: 630,
      alt: "Hashim — Full Stack & Website Developer Portfolio, Kerala India"
    }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Hashim — Full Stack & Website Developer | Kerala India",
    description: "Full stack and website developer from Kerala. React, Next.js, Django, Python, GSAP, TypeScript. Available for freelance.",
    images: ["/opengraph-image"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
    }
  },
  alternates: {
    canonical: "https://mohashim.netlify.app"
  },
  other: {
    "geo.region": "IN-KL",
    "geo.placename": "Kerala",
    "geo.position": "10.8505;76.2711",
    "ICBM": "10.8505, 76.2711"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <StructuredData />
      </head>
      <body className={`${inter.variable} ${spaceGrotesk.variable}`}>
        {children}
      </body>
    </html>
  );
}
