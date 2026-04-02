import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create AI Skills",
  description:
    "Describe what you want, get a working AI skill. Create custom skills in seconds with our AI-powered generator. No coding required.",
  alternates: {
    canonical: "https://opencreditai.com/skills/create",
  },
};

export default function SkillsCreateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
