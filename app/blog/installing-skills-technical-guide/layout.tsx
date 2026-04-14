import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Installing AI Skills: A Technical Guide for Developers",
  description:
    "Step-by-step technical guide for installing AI skills from OpenCreditAi. Covers npm, npx, SKILL.md format, configuration, and integration with popular AI agent runtimes.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
