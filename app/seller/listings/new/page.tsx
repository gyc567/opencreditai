"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ListingForm } from "@/components/seller/listing-form";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface ListingFormData {
  name: string;
  description: string;
  category: string;
  tags: string[];
  priceUsd: number;
  version: string;
  packageUrl: string;
}

function NewListingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const creatorId = searchParams.get("creatorId");

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: ListingFormData) => {
    if (!creatorId) {
      alert("Creator ID is required");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`/api/v1/creators/${creatorId}/listings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          description: data.description,
          category: data.category,
          priceUsd: data.priceUsd,
          version: data.version,
          packageUrl: data.packageUrl,
          tags: data.tags,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        router.push(`/seller/dashboard?creatorId=${creatorId}`);
      } else {
        alert(result.error || "Failed to create listing");
      }
    } catch (error) {
      console.error("Error creating listing:", error);
      alert("Failed to create listing");
    } finally {
      setIsLoading(false);
    }
  };

  if (!creatorId) {
    return (
      <main className="min-h-screen pt-14">
        <section className="py-16">
          <div className="max-w-md mx-auto px-4 sm:px-6 text-center">
            <p className="text-muted-foreground mb-4">
              You need to create a seller profile first
            </p>
            <Button
              className="bg-accent text-accent-foreground"
              onClick={() => router.push("/seller/register")}
            >
              Register as Seller
            </Button>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-14">
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 circuit-grid-dots" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/80" />

        <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">
              <span className="text-gradient-cyan text-glow">Create Listing</span>
            </h1>
            <p className="text-muted-foreground">
              List your skill for sale on the marketplace
            </p>
          </div>

          <ListingForm onSubmit={handleSubmit} isLoading={isLoading} />
        </div>
      </section>
    </main>
  );
}

function LoadingState() {
  return (
    <main className="min-h-screen pt-14">
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-accent" />
      </div>
    </main>
  );
}

export default function NewListingPage() {
  return (
    <Suspense fallback={<LoadingState />}>
      <NewListingContent />
    </Suspense>
  );
}
