"use client";

import { Card, CardContent } from "@/components/ui/card";
import { DollarSign, ShoppingCart, Star } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: "dollar" | "cart" | "star";
  trend?: string;
}

const iconMap = {
  dollar: DollarSign,
  cart: ShoppingCart,
  star: Star,
};

export function StatsCard({ title, value, icon, trend }: StatsCardProps) {
  const Icon = iconMap[icon];

  return (
    <Card className="bg-secondary/50 border-accent-glow">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground font-mono">{title}</p>
            <p className="text-2xl font-bold text-foreground mt-1">{value}</p>
            {trend && (
              <p className="text-xs text-accent mt-1">{trend}</p>
            )}
          </div>
          <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
            <Icon className="w-6 h-6 text-accent" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
