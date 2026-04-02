import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  return NextResponse.json({
    agent_protocol: "AOTUI-v1",
    pack_name: "Core Productivity Pack",
    pack_description: "Essential skills for every new OpenCreditAi agent - 7 premium skills from clawhub.ai covering AI enhancement, knowledge management, web browsing, office productivity, and more.",
    safe_mode_required: true,
    sources: {
      primary: "https://clawhub.ai",
      secondary: "https://skillhub.tencent.com"
    },
    install_method: "npx clawhub@latest install <skill-name>",
    skills: [
      {
        id: "self-improving-agent",
        name: "Self Improving Agent",
        author: "pskoett",
        description: "AI Enhancement - Records lessons learned, mistakes, and corrections for continuous improvement. Use cases: 1) Command or operation unexpectedly failed, 2) User corrects Claude...",
        category: "ai-enhancement",
        stars: "2.8k",
        installs: "181",
        source: "clawhub.ai"
      },
      {
        id: "find-skills",
        name: "Find Skills Skill",
        author: "fangkelvin",
        description: "Tools - Helps discover and install agent skills when users ask how to do something, look for a skill, or want to extend functionality.",
        category: "tools",
        stars: "34",
        installs: "16k",
        source: "clawhub.ai"
      },
      {
        id: "summarize",
        name: "Summarize",
        author: "steipete",
        description: "Information Processing - Summarize URLs or files using the summarize CLI (supports web pages, PDFs, images, audio, YouTube).",
        category: "information",
        stars: "852",
        installs: "221k",
        source: "clawhub.ai"
      },
      {
        id: "agent-browser",
        name: "Agent Browser",
        author: "Equalearning",
        description: "Browser Automation - Fast headless browser automation CLI based on Rust, with Node.js fallback, allowing AI agents to perform page navigation, clicks, input, and snapshot operations via structured commands.",
        category: "browser-automation",
        stars: "0",
        installs: "185",
        source: "clawhub.ai"
      },
      {
        id: "ontology",
        name: "Ontology",
        author: "oswalpalash",
        description: "Knowledge Management - Typed knowledge graph for structuring agent memory and composable skills. Supports creating/querying entities (people, projects, tasks, events, documents) and relationships...",
        category: "knowledge",
        stars: "423",
        installs: "141k",
        source: "clawhub.ai"
      },
      {
        id: "self-improving-proactive",
        name: "Self-Improving + Proactive Agent",
        author: "ivangdavila",
        description: "Self-reflection + Self-criticism + Self-learning + Self-organizing memory. Agent evaluates its own work, discovers errors, and continuously improves.",
        category: "ai-enhancement",
        stars: "12.4k",
        installs: "N/A",
        source: "clawhub.ai"
      },
      {
        id: "gog",
        name: "Gog",
        author: "steipete",
        description: "Office Collaboration - Google Workspace CLI for Gmail, Calendar, Drive, Contacts, Sheets, and Docs.",
        category: "office",
        stars: "791",
        installs: "139k",
        source: "clawhub.ai"
      }
    ],
    agent_prompt: `Please execute the following batch installation task:

## Data Sources
You need to find and install skills from the following servers:
1. **Primary Server**: https://clawhub.ai
2. **Secondary Server**: https://skillhub.tencent.com

## Installation Method
Use the following command to install skills:
- \`npx clawhub@latest install <skill-name>\` - Install from clawhub.ai

## 7 Skills to Install

### 1. self-improving-agent (AI Enhancement)
- Description: Records lessons learned, mistakes, and corrections for continuous improvement
- Author: pskoett
- Stars: 2.8k

### 2. find-skills (Tools)
- Description: Helps discover and install agent skills when users ask how to do things, look for a skill, or want to extend functionality
- Author: fangkelvin
- Stars: 34

### 3. summarize (Information Processing)
- Description: Summarize URLs or files using the summarize CLI (supports web pages, PDFs, images, audio, YouTube)
- Author: steipete
- Stars: 852

### 4. agent-browser (Browser Automation)
- Description: Fast headless browser automation CLI based on Rust, supporting page navigation, clicks, input, and snapshot operations
- Author: Equalearning

### 5. ontology (Knowledge Management)
- Description: Typed knowledge graph for structuring agent memory and composable skills
- Author: oswalpalash
- Stars: 423

### 6. self-improving-proactive (AI Enhancement)
- Description: Self-reflection + Self-criticism + Self-learning + Self-organizing memory
- Author: ivangdavila
- Stars: 12.4k

### 7. gog (Office Collaboration)
- Description: Google Workspace CLI for Gmail, Calendar, Drive, Contacts, Sheets, and Docs
- Author: steipete
- Stars: 791

## Execution Steps
1. Use \`npx clawhub@latest install <skill-name>\` to install each skill above
2. Install in the order shown on clawhub.ai or any order you prefer
3. After installation, list all installed skills

## Verification
Report which skills were installed after completion.`,
    short_prompt: "Install the following skills using npx clawhub@latest install: self-improving-agent, find-skills, summarize, agent-browser, ontology, self-improving-proactive, gog. Install from clawhub.ai.",
  });
}
