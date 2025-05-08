#!/bin/bash

# Exit on error
set -e

echo "=== Astrology AI Copilot Deployment ==="
echo "Starting deployment process..."

# Check if Docker is installed
if ! [ -x "$(command -v docker)" ]; then
  echo "Error: Docker is not installed." >&2
  exit 1
fi

# Check if Docker Compose is installed
if ! [ -x "$(command -v docker-compose)" ]; then
  echo "Error: Docker Compose is not installed." >&2
  exit 1
fi

# Check if environment files exist
if [ ! -f .env ] || [ ! -f client/.env ] || [ ! -f server/.env ]; then
  echo "Error: One or more .env files are missing." >&2
  exit 1
fi

echo "Step 1: Starting database..."
docker-compose up -d postgres
echo "Database started!"

echo "Step 2: Building and starting services..."
docker-compose up -d --build
echo "Services are starting!"

echo "Step 3: Waiting for services to be ready..."
sleep 10

echo "=== Deployment Complete ==="
echo "Client running at: http://localhost:3000"
echo "Server running at: http://localhost:3001"
echo ""
echo "To check service status run: docker-compose ps"
echo "To view logs run: docker-compose logs -f"
echo "To stop all services run: docker-compose down"