import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dental EMR — AI Integrated Clinic Software | Personal Project by Hashim",
  description: "An AI-integrated Dental EMR — a personal project built by Hashim, full stack developer from Kerala. Features automated reception, dental charting, HRMS, CRM, and accounting. Built with React, Next.js, Django, and Python.",
  alternates: { canonical: "https://mohashim.netlify.app/projects/dental-emr" },
  openGraph: {
    title: "Dental EMR — Personal Project by Hashim | Full Stack Developer",
    description: "Personal project by Hashim. AI-integrated dental clinic management — automated reception, clinical notes, dental charting, HRMS, CRM, accounting. Built end to end by Hashim.",
    url: "https://mohashim.netlify.app/projects/dental-emr",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }]
  }
};

export default function DentalEMRLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
