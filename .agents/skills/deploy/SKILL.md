---
name: deploy
description: Deploy the OpenClaw Skills project to Vercel. Supports both preview and production deployments. Runs build and tests before deploying.
---

# Deploy

## Overview

Deploy the OpenClaw Skills Next.js application to Vercel. This skill runs the full verification stack before deploying to ensure quality.

## Quick start

1. Keep this skill at `./.agents/skills/deploy` so it loads automatically.
2. Preview deployment: `bash .agents/skills/deploy/scripts/run.sh --preview`
3. Production deployment: `bash .agents/skills/deploy/scripts/run.sh --production`
4. The script will run build and tests before deploying.

## Usage

### Preview Deployment (default)
```bash
bash .agents/skills/deploy/scripts/run.sh --preview
```

### Production Deployment
```bash
bash .agents/skills/deploy/scripts/run.sh --production
```

### Skip Tests
```bash
bash .agents/skills/deploy/scripts/run.sh --preview --skip-tests
```

### Skip Build
```bash
bash .agents/skills/deploy/scripts/run.sh --preview --skip-build
```

## What it does

1. **Pre-deployment checks** - Verify project structure
2. **Build** - Run TypeScript check, lint, and production build
3. **Tests** - Run test suite with coverage
4. **Deploy** - Push to Vercel (preview or production)
5. **Verify** - Check deployment responds with 200 OK

## Resources

### scripts/run.sh

- Executes the full deployment sequence with fail-fast semantics
- Uses the existing `scripts/deploy.sh` for Vercel deployment
- Run from the repository root
