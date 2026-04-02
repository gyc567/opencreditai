import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Skill Audit Service",
  description:
    "Upload your AI skill files and get a comprehensive audit report covering code quality, security vulnerabilities, and best practices.",
  alternates: {
    canonical: "https://opencreditai.com/audit",
  },
};

export default function AuditLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
