"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { CreatorRegisterForm } from "@/components/seller/creator-register-form";
import { WalletConnect } from "@/components/wallet/connect";
import { Loader2 } from "lucide-react";

interface CreatorFormData {
  address: string;
  username: string;
  displayName: string;
  bio: string;
  category: string;
}

interface AgentStatus {
  hasAgent: boolean;
  agentId?: number;
  status: "none" | "pending" | "verified";
  claimToken?: string;
}

export default function SellerRegisterPage() {
  const router = useRouter();
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(false);

  const handleWalletConnect = async (address: string) => {
    setWalletAddress(address);
    setCheckingStatus(true);

    try {
      const response = await fetch(`/api/agent?address=${address}`);
      const result = await response.json();

      if (result.success && result.data) {
        const status: AgentStatus = result.data;

        if (status.hasAgent && status.status === "verified") {
          router.push(`/dashboard?agentId=${status.agentId}`);
          return;
        }

        if (status.hasAgent && status.status === "pending" && status.claimToken) {
          router.push(`/claim/${status.claimToken}`);
          return;
        }
      }
    } catch (error) {
      console.error("Error checking agent status:", error);
    } finally {
      setCheckingStatus(false);
    }
  };

  const handleSubmit = async (data: CreatorFormData) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/v1/creators", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          address: data.address,
          username: data.username,
          displayName: data.displayName,
          bio: data.bio,
          category: data.category,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        router.push(`/seller/dashboard?creatorId=${result.data.id}`);
      } else {
        alert(result.error || "Failed to create seller profile");
      }
    } catch (error) {
      console.error("Error creating seller:", error);
      alert("Failed to create seller profile");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen pt-14">
      <Navbar />
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 circuit-grid-dots" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/80" />

        <div className="relative z-10 max-w-md mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">
              <span className="text-gradient-cyan text-glow">Become a Seller</span>
            </h1>
            <p className="text-muted-foreground">
              List your skills and earn USDC
            </p>
          </div>

          <div className="space-y-6">
            {checkingStatus ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-8 h-8 animate-spin text-accent mr-2" />
                <span className="text-muted-foreground">Checking your status...</span>
              </div>
            ) : (
              <WalletConnect
                onConnect={handleWalletConnect}
                onDisconnect={() => setWalletAddress("")}
              />
            )}

            {walletAddress && !checkingStatus && (
              <CreatorRegisterForm
                walletAddress={walletAddress}
                onSubmit={handleSubmit}
                isLoading={isLoading}
              />
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
