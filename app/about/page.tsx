import type { Metadata } from "next";
import AboutPage from "@/components/AboutPage";

export const metadata: Metadata = {
  title: "About – Hashim",
  description:
    "Full stack developer from Kerala, India. Building robust backends and polished frontends.",
};

export default function About() {
  return <AboutPage />;
}
