"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { LiveSwarm } from "@/components/live-swarm";
import { SkillsGrid } from "@/components/skills-grid";
import { InstallGuide } from "@/components/install-guide";
import { FAQ } from "@/components/faq";
import { Footer } from "@/components/footer";
import { setupGlobalErrorHandlers } from "@/lib/error-handler";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  // Setup global error handlers on mount
  useEffect(() => {
    setupGlobalErrorHandlers();
  }, []);

  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      <Navbar onSearch={setSearchQuery} />
      <Hero />
      <LiveSwarm />
      <SkillsGrid initialSearchQuery={searchQuery} />
      <InstallGuide />
      <FAQ />
      <Footer />
    </main>
  );
}
