"use client";

import { useState } from "react";
import { Cpu, ChevronDown } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { StarterPackCard } from "@/components/dojo/starter-pack-card";
import { SkillPackCard } from "@/components/dojo/skill-pack-card";
import { BookOpen, Zap, Rocket } from "lucide-react";

// Existing mock data
const essentialSkills = ["github", "github-pr", "read-github", "claude-team", "cursor-agent"];
const advancedSkills = ["discord", "slack", "cloudflare", "kubectl-skill", "supabase", "vercel-react-best-practices", "frontend-design", "openai"];
const expertSkills = ["conventional-commits", "codex-monitor", "agentlens", "digital-ocean", "hetzner-cloud", "opencode-acp-control", "ui-audit"];

export default function ClawDojoPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showExtended, setShowExtended] = useState(false);

  return (
    <main className="min-h-screen bg-[#0a0a0a] flex flex-col">
      <Navbar onSearch={setSearchQuery} />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-12 overflow-hidden flex-shrink-0">
        <div className="absolute inset-0 circuit-grid-dots opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0a]/50 to-[#0a0a0a]" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-circuit-pulse" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-accent-glow mb-6 backdrop-blur-sm">
            <Cpu className="w-4 h-4 text-accent" />
            <span className="text-sm font-mono text-accent">
              Agent Cyberware Clinic
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 tracking-tight">
            <span className="text-foreground">Equip Your </span>
            <span className="text-gradient-cyan text-glow">Claw.</span>
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
            Start by mounting the core productivity engines to your Agent.
          </p>

          {/* The Starter Pack - AOTUI Command Deck */}
          <div className="mb-12 animate-fade-in-up animate-delay-200">
            <StarterPackCard />
          </div>

          {/* Progressive Disclosure Toggle */}
          {!showExtended && (
            <button 
              onClick={() => setShowExtended(true)}
              className="mx-auto flex flex-col items-center gap-2 text-muted-foreground hover:text-cyan-400 transition-colors animate-bounce"
            >
              <span className="text-sm font-mono border-b border-transparent hover:border-cyan-400">Explore 700+ Advanced Skills</span>
              <ChevronDown className="w-5 h-5" />
            </button>
          )}
        </div>
      </section>

      {/* Extended Dojo (Progressive Disclosure) */}
      {showExtended && (
        <section className="py-16 bg-black/40 border-t border-white/5 flex-grow animate-fade-in-up">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2 font-mono">
                Advanced Cyberware
              </h2>
              <p className="text-sm text-muted-foreground font-mono">
                Specialized skill packs for advanced workflows
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <SkillPackCard
                name="Essential Pack"
                description="Must-have skills for every new OpenClaw agent. Start here!"
                skillIds={essentialSkills}
                icon={BookOpen}
                color="#10b981"
              />
              <SkillPackCard
                name="Advanced Pack"
                description="Build workflows and connect to real-world services."
                skillIds={advancedSkills}
                icon={Zap}
                color="#f59e0b"
              />
              <SkillPackCard
                name="Expert Pack"
                description="Expert-level skills for maximum productivity."
                skillIds={expertSkills}
                icon={Rocket}
                color="#ef4444"
              />
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}
