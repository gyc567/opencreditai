import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Getting Started with OpenCreditAi - Beginner's Guide",
  description:
    "Learn how to browse, install, and use AI skills from OpenCreditAi. A step-by-step guide for first-time users.",
  alternates: {
    canonical: "https://opencreditai.com/blog/getting-started-with-opencreditai",
  },
  openGraph: {
    title: "Getting Started with OpenCreditAi - Beginner's Guide",
    description:
      "Learn how to browse, install, and use AI skills from OpenCreditAi. A step-by-step guide for first-time users.",
    type: "article",
    images: [
      {
        url: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1200&h=630&fit=crop",
        width: 1200,
        height: 630,
        alt: "OpenCreditAi - AI Skills Marketplace",
      },
    ],
  },
};

export default function BlogPostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
