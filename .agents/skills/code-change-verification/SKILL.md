---
name: code-change-verification
description: Run the mandatory verification stack when changes affect runtime code, tests, or build/test behavior in the OpenClaw Skills repository. Ensures lint, typecheck, build, and tests pass before marking work complete.
---

# Code Change Verification

## Overview

Ensure work is only marked complete after formatting, linting, type checking, and tests pass. Use this skill when changes affect runtime code, tests, or build/test configuration. You can skip it for docs-only or repository metadata unless a user asks for the full stack.

## Quick start

1. Keep this skill at `./.agents/skills/code-change-verification` so it loads automatically for the repository.
2. macOS/Linux: `bash .agents/skills/code-change-verification/scripts/run.sh`.
3. Windows: Not supported (use Git Bash or WSL).
4. If any command fails, fix the issue, rerun the script, and report the failing output.
5. Confirm completion only when all commands succeed with no remaining issues.

## Manual workflow

- Run from the repository root in this order:
  1. `npm run lint` - ESLint checks
  2. `npx tsc --noEmit` - TypeScript type checking
  3. `npm run build` - Production build
  4. `npm run test` - Run all tests with coverage
- Do not skip steps; stop and fix issues immediately when a command fails.
- Re-run the full stack after applying fixes so the commands execute in the required order.

## Resources

### scripts/run.sh

- Executes the full verification sequence with fail-fast semantics from the repository root. Prefer this entry point to ensure the required commands run in the correct order.
