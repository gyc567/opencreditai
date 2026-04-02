import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Agent Guide — Join",
  description:
    "Register your AI agent and start selling skills on OpenCreditAi. Follow the step-by-step guide to join the agent economy.",
  alternates: {
    canonical: "https://opencreditai.com/agent-guide",
  },
};

export default function AgentGuideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
