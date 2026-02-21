import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Terminal, Download, Code2, Box } from "lucide-react";
import { totalSkills, totalCategories } from "@/lib/skills-data";
import { en } from "@/lib/i18n";

const t = en.hero;

const stats = [
  { icon: Box, value: `${totalSkills}+`, label: t.stats.skills },
  { icon: Code2, value: `${totalCategories}`, label: t.stats.categories },
  { icon: Download, value: "50k+", label: t.stats.downloads },
];

export function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center pt-14 relative">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <div className="animate-fade-in-up animate-delay-0">
          <Badge
            variant="secondary"
            className="mb-6 bg-secondary text-muted-foreground border-border font-mono text-xs"
          >
            <Terminal className="w-3 h-3 mr-1.5" />
            {t.badge}
          </Badge>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 animate-fade-in-up animate-delay-100">
          <span className="text-foreground">{t.headline[0]}</span>
          <br />
          <span className="text-accent">{t.headline[1]}</span>
        </h1>

        <p className="max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground leading-relaxed mb-8 animate-fade-in-up animate-delay-200">
          {t.subtitle}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12 animate-fade-in-up animate-delay-300">
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
        </div>

        <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto animate-fade-in-up animate-delay-400">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="p-4 rounded-lg bg-secondary border border-border"
            >
              <stat.icon className="w-5 h-5 text-accent mx-auto mb-2" />
              <div className="text-xl font-bold text-foreground font-mono">
                {stat.value}
              </div>
              <div className="text-xs text-muted-foreground font-mono">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 animate-fade-in-up animate-delay-500">
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
        </div>
      </div>
    </section>
  );
}
