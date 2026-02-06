"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Terminal, Download, Code2, Box } from "lucide-react";
import { totalSkills, totalCategories } from "@/lib/skills-data";
import { en } from "@/lib/i18n";

const t = en.hero;

const stats = [
  { icon: Box, value: `${totalSkills}+`, label: t.stats.skills, color: "text-accent" },
  { icon: Code2, value: `${totalCategories}`, label: t.stats.categories, color: "text-accent" },
  { icon: Download, value: "50k+", label: t.stats.downloads, color: "text-accent" },
];

export function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center pt-14 relative">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Badge
            variant="secondary"
            className="mb-6 bg-secondary text-muted-foreground border-border font-mono text-xs"
          >
            <Terminal className="w-3 h-3 mr-1.5" />
            {t.badge}
          </Badge>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4"
        >
          <span className="text-foreground">{t.headline[0]}</span>
          <br />
          <span className="text-accent">{t.headline[1]}</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground leading-relaxed mb-8"
        >
          {t.subtitle}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12"
        >
          <Button
            size="lg"
            className="bg-accent text-accent-foreground hover:bg-accent/90 font-mono text-sm"
            asChild
          >
            <a href="#skills">
              {t.cta.browse}
              <ArrowRight className="ml-2 w-4 h-4" />
            </a>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-border text-muted-foreground hover:text-foreground hover:bg-secondary font-mono text-sm"
            asChild
          >
            <a href="#install">
              {t.cta.installGuide}
            </a>
          </Button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="grid grid-cols-3 gap-4 max-w-lg mx-auto"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="p-4 rounded-lg bg-secondary border border-border"
            >
              <stat.icon className={`w-5 h-5 ${stat.color} mx-auto mb-2`} />
              <div className="text-xl font-bold text-foreground font-mono">
                {stat.value}
              </div>
              <div className="text-xs text-muted-foreground font-mono">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Tech Stack */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.5 }}
          className="mt-12"
        >
          <p className="text-xs text-muted-foreground mb-4 font-mono">
            {t.supportedFrameworks}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground font-mono">
            {["Claude", "OpenCode", "Codex", "Cursor", "Aider"].map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 rounded bg-secondary border border-border"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
