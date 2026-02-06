"use client";

import { useEffect } from "react";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { SkillsGrid } from "@/components/skills-grid";
import { InstallGuide } from "@/components/install-guide";
import { FAQ } from "@/components/faq";
import { Footer } from "@/components/footer";
import { useState } from "react";
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
      <SkillsGrid initialSearchQuery={searchQuery} />
      <InstallGuide />
      <FAQ />
      <Footer />
    </main>
  );
}
