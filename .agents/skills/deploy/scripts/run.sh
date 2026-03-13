#!/usr/bin/env bash
# Fail fast on any error or undefined variable.
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
if command -v git >/dev/null 2>&1; then
  REPO_ROOT="$(git -C "${SCRIPT_DIR}" rev-parse --show-toplevel 2>/dev/null || true)"
fi
REPO_ROOT="${REPO_ROOT:-$(cd "${SCRIPT_DIR}/../../../.." && pwd)}"

cd "${REPO_ROOT}"

# Default to preview
DEPLOY_MODE="preview"
SKIP_BUILD=false
SKIP_TESTS=false

# Parse arguments
while [[ $# -gt 0 ]]; do
  case $1 in
    --production)
      DEPLOY_MODE="production"
      shift
      ;;
    --preview)
      DEPLOY_MODE="preview"
      shift
      ;;
    --skip-tests)
      SKIP_TESTS=true
      shift
      ;;
    --skip-build)
      SKIP_BUILD=true
      shift
      ;;
    *)
      echo "Unknown option: $1"
      echo "Usage: $0 [--preview|--production] [--skip-tests] [--skip-build]"
      exit 1
      ;;
  esac
done

echo "=============================================="
echo "  OpenClaw Skills - Deployment"
echo "=============================================="
echo "Mode: $DEPLOY_MODE"
echo ""

# Run build if not skipped
if [ "$SKIP_BUILD" != "true" ]; then
  echo "Running build checks..."
  npx tsc --noEmit
  npm run lint
  npm run build
fi

# Run tests if not skipped
if [ "$SKIP_TESTS" != "true" ]; then
  echo "Running tests..."
  npm run test
fi

# Deploy using existing script
echo "Deploying to Vercel..."
if [ "$DEPLOY_MODE" = "production" ]; then
  ./scripts/deploy.sh --production
else
  ./scripts/deploy.sh --preview
fi

echo "deploy: completed successfully."
