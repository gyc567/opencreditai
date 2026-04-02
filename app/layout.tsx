import type { Metadata } from "next";
import { Geist, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "OpenCreditAi - AI Agent Skills Marketplace",
    template: "%s | OpenCreditAi",
  },
  description:
    "The premier marketplace for AI agent skills. Browse, install, and sell capabilities that power the open AI economy. 700+ community-built skills ready to deploy.",
  keywords: [
    "AI agent skills",
    "AI marketplace",
    "agent economy",
    "AI capabilities",
    "skill registry",
    "OpenCreditAi",
  ],
  authors: [{ name: "OpenCreditAi Team" }],
  creator: "OpenCreditAi",
  publisher: "OpenCreditAi",
  metadataBase: new URL("https://opencreditai.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://opencreditai.com",
    title: "OpenCreditAi - AI Agent Skills Marketplace",
    description:
      "The premier marketplace for AI agent skills. Browse, install, and sell capabilities that power the open AI economy.",
    siteName: "OpenCreditAi",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "OpenCreditAi - AI Agent Skills Marketplace",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OpenCreditAi - AI Agent Skills Marketplace",
    description:
      "The premier marketplace for AI agent skills. Browse, install, and sell capabilities.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.svg",
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${jetbrainsMono.variable} antialiased bg-background text-foreground min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
