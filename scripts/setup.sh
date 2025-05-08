#!/bin/bash

# Exit on error
set -e

echo "Setting up Astrology AI Copilot..."

# Create environment files if they don't exist
if [ ! -f ./client/.env ]; then
  echo "Creating client .env file from example..."
  cp ./client/.env.example ./client/.env
fi

if [ ! -f ./server/.env ]; then
  echo "Creating server .env file from example..."
  cp ./server/.env.example ./server/.env
fi

# Install dependencies
echo "Installing dependencies..."
npm install

# Install workspace dependencies in parallel
echo "Installing workspace dependencies..."
npm run install:all

# Build shared package
echo "Building shared package..."
cd shared && npm run build && cd ..

echo "Setup complete! You can now start the development environment with:"
echo "npm run dev"
echo ""
echo "Remember to update your .env files with your API keys and credentials."