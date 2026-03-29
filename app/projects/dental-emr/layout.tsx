export const metadata = {
  title: "Dental EMR — AI Integrated Clinic Software | Hashim — Junior Software Developer",
  description: "A full-featured AI-integrated Dental EMR built by Hashim, junior software developer at Hybrhind Kerala. Features automated reception, dental charting, HRMS, CRM, and accounting.",
  alternates: { canonical: "https://mohashim.netlify.app/projects/dental-emr" },
  openGraph: {
    title: "Dental EMR — AI Integrated Software by Hashim",
    description: "Built by Hashim at Hybrhind. Automated reception, AI clinical notes, dental charting, HRMS, CRM, accounting — one platform.",
    url: "https://mohashim.netlify.app/projects/dental-emr",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }]
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
