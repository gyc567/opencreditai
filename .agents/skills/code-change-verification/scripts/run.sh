#!/usr/bin/env bash
# Fail fast on any error or undefined variable.
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
if command -v git >/dev/null 2>&1; then
  REPO_ROOT="$(git -C "${SCRIPT_DIR}" rev-parse --show-toplevel 2>/dev/null || true)"
fi
REPO_ROOT="${REPO_ROOT:-$(cd "${SCRIPT_DIR}/../../../.." && pwd)}"

cd "${REPO_ROOT}"

echo "Running npm run lint..."
npm run lint

echo "Running TypeScript check..."
npx tsc --noEmit

echo "Running production build..."
npm run build

echo "Running tests with coverage..."
npm run test

echo "code-change-verification: all commands passed."
