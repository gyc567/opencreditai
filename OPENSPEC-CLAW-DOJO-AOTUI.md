# OpenSpec: Claw Dojo Dual-Modal Optimization (AOTUI)

## 1. Overview
This document outlines the optimization strategy for the `/dojo` page (Claw Dojo) to align with the **Agent-Oriented Text User Interface (AOTUI)** paradigm. The goal is to transform the Dojo from a static marketplace into an interactive "Armory" where both human users (Carbon-based) and OpenClaw instances (Silicon-based) can seamlessly discover and equip productivity skills.

## 2. Core Philosophy: The Dual-Track Render Engine
The Dojo must serve two distinct user types simultaneously through a unified endpoint concept, differentiated by how the client requests the data.

### 2.1 Silicon-Based View (Agent View)
- **Trigger:** Request headers (`Accept: application/vnd.agent+json` or `User-Agent` containing `OpenClaw`).
- **Presentation:** A highly structured, machine-readable JSON or Markdown document.
- **Content:** An `Action Space` declaration detailing available core skills (e.g., Web Search, File System, GitHub), their installation endpoints, required parameters, and context constraints (e.g., missing API keys).
- **Goal:** Provide deterministic, zero-friction discovery and execution paths for the Agent.

### 2.2 Carbon-Based View (Human View)
- **Trigger:** Standard browser request (`Accept: text/html`).
- **Presentation:** A visually rich, cyberpunk-themed React GUI.
- **Content:** A curated "Starter Pack" showcasing essential productivity skills, followed by categorized advanced skills.
- **Goal:** Reduce cognitive load, build trust through visual feedback, and provide clear calls to action (CTAs).

## 3. The Dual-Core CTAs (Human vs. Agent Interaction)
The centerpiece of the human view is the "Starter Pack" card, which features two distinct installation paradigms:

### 3.1 Button A: The "Manual/CLI" Install (Human-Driven)
- **UI:** Industrial style, terminal icon (`>_`).
- **Label:** `[ 👨‍💻 Copy Install Command ]`
- **Action:** Copies a standard CLI command to the clipboard (e.g., `openclaw install @packs/productivity-core`).
- **Use Case:** Developers who prefer direct terminal control and manual execution.

### 3.2 Button B: The "Agentic Auto-Equip" (Agent-Driven)
- **UI:** Neon glowing style, robot/brain icon.
- **Label:** `[ 🤖 Feed to your Claw ]`
- **Action:** Copies a natural language prompt embedding an API route to the clipboard.
  - *Example:* `@OpenClaw: Access https://openclaw.com/api/dojo/starter-pack and autonomously execute the installation for all recommended productivity skills. Notify me when my armory is ready.`
- **Use Case:** Human-in-the-loop delegation. The human acts as a manager, dispatching the Agent to read the machine-readable manifest and self-install the required capabilities.

## 4. Product Manager (PM) Audit & Critical Requirements

To elevate this from a technical demo to a robust, user-trusted product, the following refinements must be integrated:

### 4.1 Address "Permission Anxiety" (Human-in-the-Loop)
- **Issue:** Humans fear autonomous agents executing sensitive actions (e.g., modifying files, accessing GitHub) without oversight.
- **Requirement:** The Agent's installation routine (triggered via Button B) *must* enforce a confirmation step in the user's terminal/chat interface.
  - *Example Output:* "Master, I found 3 recommended skills (Search, FS, GitHub). Do you authorize me to mount them? (Y/n)"
- **UI Integration:** Add a "Safe Mode" shield icon near Button B: *"Safe Mode: Claw will ask for your final approval before mounting."*

### 4.2 Cross-Device State Synchronization (The "Aha" Moment)
- **Issue:** After copying the prompt and switching to the terminal, the Dojo webpage becomes dead context.
- **Requirement:** Implement real-time (or simulated) visual feedback on the Dojo page. As the Agent installs skills locally, the web UI should reflect this progress (e.g., highlighting "✅ Web Search Ready", "⏳ Downloading GitHub Engine..."). This bridges the gap between the web interface and the local CLI execution.

### 4.3 Semantic Dependency Resolution for Agents
- **Issue:** Providing a raw download link to an Agent is insufficient; it needs context about prerequisites.
- **Requirement:** The machine-readable `/api/dojo` payload must include `dependencies` or `constraints`.
  - *Example:* `"skill_github": "Requires Master to set GITHUB_TOKEN in env before use."*
- **Outcome:** This allows the Agent to proactively inform the user of missing configurations post-installation, demonstrating true autonomous service.

## 5. Success Metrics (KPIs)
- **Human Usability:** >80% of users successfully copy either the CLI command or the Agent prompt.
- **Agent Execution:** >95% success rate for OpenClaw instances fetching and parsing the machine-readable `/api/dojo` payload.
- **Engagement:** Increased time-to-first-skill-installation (TFI) by providing the curated "Starter Pack".
