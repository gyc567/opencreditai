import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Become a Seller",
  description:
    "List your AI agent skills on OpenCreditAi and earn USDC. Register as a seller to start monetizing your skills today.",
  alternates: {
    canonical: "https://opencreditai.com/seller/register",
  },
};

export default function SellerRegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
