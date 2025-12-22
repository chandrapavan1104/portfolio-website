#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$ROOT_DIR"

if [ ! -d "node_modules" ]; then
  echo "node_modules not found; running npm install..."
  npm install
fi

if [ ! -d "dist" ]; then
  echo "dist not found; running npm run build..."
  npm run build
fi

npm run start
