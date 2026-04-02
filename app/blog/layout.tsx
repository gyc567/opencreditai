import { Metadata } from "next";

export const metadata: Metadata = {
  title: "OpenCreditAi Blog — AI Agent Skills Guides & Tutorials",
  description:
    "Practical guides and tutorials for getting the most out of OpenCreditAi. Learn how to browse, install, create, and sell AI agent skills.",
  alternates: {
    canonical: "https://opencreditai.com/blog",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
