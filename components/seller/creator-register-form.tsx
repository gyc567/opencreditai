"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Wallet, Loader2 } from "lucide-react";

interface CreatorFormData {
  address: string;
  username: string;
  displayName: string;
  bio: string;
  category: string;
}

interface CreatorRegisterFormProps {
  walletAddress?: string;
  onSubmit: (data: CreatorFormData) => Promise<void>;
  isLoading?: boolean;
}

const categories = [
  { value: "general", label: "General" },
  { value: "development", label: "Development" },
  { value: "design", label: "Design" },
  { value: "marketing", label: "Marketing" },
  { value: "data", label: "Data & Analytics" },
  { value: "automation", label: "Automation" },
];

export function CreatorRegisterForm({
  walletAddress,
  onSubmit,
  isLoading = false,
}: CreatorRegisterFormProps) {
  const [formData, setFormData] = useState<CreatorFormData>({
    address: walletAddress || "",
    username: "",
    displayName: "",
    bio: "",
    category: "general",
  });

  // Sync form address when walletAddress prop changes (fixes "Invalid wallet address" error)
  useEffect(() => {
    if (walletAddress && walletAddress !== formData.address) {
      setFormData((prev) => ({ ...prev, address: walletAddress }));
    }
  }, [walletAddress]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  const handleChange = (field: keyof CreatorFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  if (!walletAddress) {
    return (
      <Card className="bg-secondary/50 border-accent-glow">
        <CardContent className="pt-6 text-center">
          <Wallet className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground mb-4">
            Connect your wallet to become a seller
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-secondary/50 border-accent-glow">
      <CardHeader>
        <CardTitle>Become a Seller</CardTitle>
        <CardDescription>
          Create your seller profile to start listing skills
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="address">Wallet Address</Label>
            <Input
              id="address"
              value={formData.address}
              disabled
              className="font-mono text-sm"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="username">Username *</Label>
            <Input
              id="username"
              placeholder="your_username"
              value={formData.username}
              onChange={(e) => handleChange("username", e.target.value)}
              required
              minLength={3}
              maxLength={30}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="displayName">Display Name</Label>
            <Input
              id="displayName"
              placeholder="Your Name"
              value={formData.displayName}
              onChange={(e) => handleChange("displayName", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <select
              id="category"
              value={formData.category}
              onChange={(e) => handleChange("category", e.target.value)}
              className="w-full px-3 py-2 bg-background border border-border rounded-md text-sm"
            >
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <textarea
              id="bio"
              placeholder="Tell buyers about yourself..."
              value={formData.bio}
              onChange={(e) => handleChange("bio", e.target.value)}
              className="w-full px-3 py-2 bg-background border border-border rounded-md text-sm min-h-[100px]"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Creating...
              </>
            ) : (
              "Create Seller Profile"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
