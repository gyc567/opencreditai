"use client";

import { useState, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { SkillCard } from "./skill-card";
import { skills, searchSkills } from "@/lib/skills-data";
import { Input } from "@/components/ui/input";
import { Search, Grid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CategoryNav } from "./category-nav";
import { en } from "@/lib/i18n";
import { ErrorBoundary } from "./error/error-boundary";

const t = en.skills;

interface SkillsGridProps {
  initialSearchQuery?: string;
}

export function SkillsGrid({ initialSearchQuery = "" }: SkillsGridProps) {
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredSkills = useMemo(() => {
    let result = skills;

    if (searchQuery) {
      result = searchSkills(searchQuery);
    }

    if (selectedCategory) {
      result = result.filter((skill) => skill.category === selectedCategory);
    }

    return result;
  }, [searchQuery, selectedCategory]);

  const clearFilters = useCallback(() => {
    setSearchQuery("");
    setSelectedCategory(null);
  }, []);

  return (
    <section id="skills" className="py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-1">
              {t.title}
            </h2>
            <p className="text-xs text-muted-foreground font-mono">
              {t.subtitle(filteredSkills.length)}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
              <Input
                type="search"
                placeholder={t.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-52 pl-8 bg-secondary border-border text-sm font-mono"
              />
            </div>
          </div>
        </div>

        <ErrorBoundary>
          <CategoryNav
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </ErrorBoundary>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 mt-6">
          {filteredSkills.map((skill) => (
            <SkillCard key={skill.id} skill={skill} />
          ))}
        </div>

        {filteredSkills.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <Search className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
            <h3 className="text-sm font-medium text-foreground mb-1">
              {t.emptyState.title}
            </h3>
            <p className="text-xs text-muted-foreground font-mono mb-3">
              {t.emptyState.description}
            </p>
            <Button
              variant="outline"
              size="sm"
              className="border-border font-mono text-xs"
              onClick={clearFilters}
            >
              {t.emptyState.clearFilters}
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
