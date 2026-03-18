"use client";

import { useState, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Copy, Download, Rocket, Sparkles, Check, Zap } from "lucide-react";

const EXAMPLE_PROMPTS = [
  { id: 1, label: "API Docs", prompt: "A skill that generates beautiful API documentation from TypeScript interfaces and JSDoc comments" },
  { id: 2, label: "Code Review", prompt: "A skill that performs automated code review focusing on security vulnerabilities, performance issues, and best practices" },
  { id: 3, label: "Email Writer", prompt: "A skill that writes professional follow-up emails based on meeting notes and action items" },
];

interface GeneratedSkill {
  name: string;
  content: string;
}

export default function SkillCreatorPage() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [generatedSkill, setGeneratedSkill] = useState<GeneratedSkill | null>(null);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setLoading(true);
    setGeneratedSkill(null);

    try {
      const response = await fetch("/api/skills/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();
      
      if (data.success) {
        setGeneratedSkill(data.data);
      } else {
        const localSkill = generateLocalSkill(prompt);
        setGeneratedSkill(localSkill);
      }
    } catch {
      const localSkill = generateLocalSkill(prompt);
      setGeneratedSkill(localSkill);
    } finally {
      setLoading(false);
    }
  };

  const generateLocalSkill = (promptText: string): GeneratedSkill => {
    const skillName = promptText
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .split(/\s+/)
      .slice(0, 3)
      .join("-")
      || "custom-skill";

    const content = `---
name: ${skillName}
description: ${promptText.charAt(0).toUpperCase() + promptText.slice(1)}. Use this skill whenever ${promptText.toLowerCase()}.
user-invokable: true
args:
  - name: input
    type: string
    required: true
    description: The input to process
---

# ${skillName.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}

## What this skill does

${promptText}

## When to use this skill

- When the user wants to ${promptText.toLowerCase()}
- When working with related tasks

## Instructions

1. Understand the user's request
2. Process the input according to the requirements
3. Return the result in the appropriate format

## Examples

**Example 1:**
Input: Sample input for the task
Output: Processed output

## NEVER

- Modify the input without user consent
- Execute potentially harmful operations
`;

    return { name: skillName, content };
  };

  const handleCopy = async () => {
    if (!generatedSkill) return;
    await navigator.clipboard.writeText(generatedSkill.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!generatedSkill) return;
    const blob = new Blob([generatedSkill.content], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${generatedSkill.name}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen pt-14 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="py-12">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full text-accent text-sm font-mono mb-4">
              <Zap className="w-4 h-4" />
              Instant Skill Generator
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              Describe what you want, get a working skill
            </h1>
            <p className="text-muted-foreground text-lg">
              Create OpenClaw skills in seconds. No coding required.
            </p>
          </div>

          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <label className="block text-sm font-medium mb-3">
                What should your skill do?
              </label>
              <Textarea
                value={prompt}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setPrompt(e.target.value)}
                placeholder="A skill that writes unit tests for React components using Vitest..."
                className="min-h-[120px] bg-secondary border-border font-mono text-sm mb-4 focus:border-accent"
              />

              <div className="mb-4">
                <p className="text-xs text-muted-foreground mb-2">Try these examples:</p>
                <div className="flex flex-wrap gap-2">
                  {EXAMPLE_PROMPTS.map((example) => (
                    <button
                      key={example.id}
                      onClick={() => setPrompt(example.prompt)}
                      className="px-3 py-1.5 text-xs bg-secondary border border-border rounded-full hover:border-accent transition-colors font-mono"
                    >
                      {example.label}
                    </button>
                  ))}
                </div>
              </div>

              <Button
                onClick={handleGenerate}
                disabled={!prompt.trim() || loading}
                className="w-full bg-accent hover:bg-accent/90 text-black font-mono text-base py-6"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Generating your skill...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-2" />
                    Generate Skill
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {generatedSkill && (
            <Card className="bg-card border-accent mt-8">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-green-500 font-medium">Your skill is ready!</span>
                </div>

                <div className="bg-secondary border border-border rounded-lg p-4 mb-4 max-h-[400px] overflow-y-auto">
                  <pre className="text-xs font-mono whitespace-pre-wrap text-muted-foreground">
{generatedSkill.content}
                  </pre>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button
                    variant="outline"
                    onClick={handleCopy}
                    className="font-mono"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 mr-2" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 mr-2" />
                        Copy
                      </>
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleDownload}
                    className="font-mono"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                  <Button
                    className="font-mono bg-accent hover:bg-accent/90 text-black"
                  >
                    <Rocket className="w-4 h-4 mr-2" />
                    Publish to Marketplace
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
