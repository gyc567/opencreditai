import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Claude Code Unpacked for AI Skill Marketplaces",
  description:
    "A practical exploration of Claude Code's agent loop and tool orchestration, translated into actionable guidance for building AI skill marketplaces like OpenCreditAi. Includes geo-optimized content strategy and infrastructure recommendations.",
  alternates: {
    canonical: "https://opencreditai.com/blog/claude-code-unpacked-for-ai-skill-marketplaces",
  },
};

export default function ClaudeCodeUnpackedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
