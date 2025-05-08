#!/bin/bash

# Exit on error
set -e

echo "Building server for Railway deployment..."

# Use the Railway-specific tsconfig
mv tsconfig.railway.json tsconfig.json

# Add shared dependencies
cp shared-types.ts src/shared-types.ts

# Build the app
npx tsc

echo "Build completed successfully!"