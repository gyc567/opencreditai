import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ClawDojo — Equip Your AI Agent with Skills",
  description:
    "Start by mounting the core productivity engines to your Agent. Explore 700+ advanced skills across Essential, Advanced, and Expert packs.",
  alternates: {
    canonical: "https://opencreditai.com/dojo",
  },
};

export default function DojoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
