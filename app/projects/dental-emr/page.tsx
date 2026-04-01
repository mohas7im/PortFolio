import type { Metadata } from "next";
import DentalEMRClient from "./components/DentalEMRClient";

export const metadata: Metadata = {
  title: "Dental EMR — Full Stack SaaS Project by Hashim | React, Django, Next.js",
  description: "Dental EMR is a full stack SaaS product built by Hashim — a freelance full stack developer from Kerala, India. Built with React, Next.js, Django, Python, and PostgreSQL. A complete clinic management system with patient records, appointments, and billing.",
  alternates: { canonical: "https://mohashim.netlify.app/projects/dental-emr" },
  openGraph: {
    title: "Dental EMR — Full Stack SaaS by Hashim | React, Django, Next.js",
    description: "A production-ready dental clinic management system built by Hashim. Full stack: React, Next.js, Django, Python, PostgreSQL.",
    url: "https://mohashim.netlify.app/projects/dental-emr",
  },
};

export default function DentalEMRPage() {
  return <DentalEMRClient />;
}

