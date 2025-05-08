#!/bin/bash

# Exit on error
set -e

echo "=== Astrology AI Copilot - Local Start ==="
echo "Starting the application in local development mode..."

# Check if Node.js is installed
if ! [ -x "$(command -v node)" ]; then
  echo "Error: Node.js is not installed." >&2
  exit 1
fi

# Check if npm is installed
if ! [ -x "$(command -v npm)" ]; then
  echo "Error: npm is not installed." >&2
  exit 1
fi

# Check if environment files exist
if [ ! -f .env ] || [ ! -f client/.env ] || [ ! -f server/.env ]; then
  echo "Error: One or more .env files are missing." >&2
  exit 1
fi

# Check if PostgreSQL is running
if [ -x "$(command -v docker)" ]; then
  if ! docker ps | grep -q astrology-ai-postgres; then
    echo "Starting PostgreSQL database with Docker..."
    docker-compose up -d postgres
    echo "Waiting for database to start up..."
    sleep 5
  else
    echo "PostgreSQL database is already running."
  fi
else
  echo "Warning: Docker not found. Make sure your PostgreSQL database is running manually."
fi

# Build shared package
echo "Building shared package..."
cd shared
npm install --legacy-peer-deps
npm run build
cd ..

# Start server in background
echo "Starting server..."
cd server
npm install --legacy-peer-deps
npm run dev &
SERVER_PID=$!
cd ..

# Start client
echo "Starting client..."
cd client
npm install --legacy-peer-deps
npm run dev &
CLIENT_PID=$!
cd ..

echo "=== Application Started ==="
echo "Client running at: http://localhost:3000"
echo "Server running at: http://localhost:3001"
echo ""
echo "Press Ctrl+C to stop all processes"

# Wait for Ctrl+C
trap "kill $SERVER_PID $CLIENT_PID; echo 'Stopping application...'" SIGINT
wait