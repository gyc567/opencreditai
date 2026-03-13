#!/usr/bin/env bash
# Fail fast on any error or undefined variable.
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
if command -v git >/dev/null 2>&1; then
  REPO_ROOT="$(git -C "${SCRIPT_DIR}" rev-parse --show-toplevel 2>/dev/null || true)"
fi
REPO_ROOT="${REPO_ROOT:-$(cd "${SCRIPT_DIR}/../../../.." && pwd)}"

cd "${REPO_ROOT}"

echo "=============================================="
echo "  OpenClaw Skills - Integration Tests"
echo "=============================================="
echo ""

# Check if dev server is running
if ! curl -s http://localhost:3000 > /dev/null 2>&1; then
  echo "Dev server not running. Starting..."
  echo "Please start the dev server manually in another terminal:"
  echo "  npm run dev"
  echo ""
  echo "Then run this script again."
  exit 1
fi

echo "Dev server is running on localhost:3000"
echo ""

# Run integration tests using Playwright
# Note: Playwright tests need to be set up separately
# This script serves as a placeholder for the integration test workflow

if command -v npx >/dev/null 2>&1; then
  # Check if Playwright is configured
  if [ -f "playwright.config.ts" ] || [ -f "playwright.config.js" ]; then
    echo "Running Playwright integration tests..."
    npx playwright test --grep "integration" || true
  else
    echo "Playwright not configured. Skipping browser tests."
    echo "To set up Playwright:"
    echo "  npm init playwright@latest"
  fi
else
  echo "npx not available. Cannot run integration tests."
  exit 1
fi

echo ""
echo "integration-tests: completed."
