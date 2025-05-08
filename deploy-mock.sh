#!/bin/bash

# Exit on error
set -e

echo "=== Astrology AI Copilot Mock Deployment ==="
echo "This script deploys a version with mocked astrological calculations"
echo "Starting deployment process..."

# Create mock swisseph service
mkdir -p /home/kenton/code/Astrology-AI-Copilot/server/src/services/mock
cat > /home/kenton/code/Astrology-AI-Copilot/server/src/services/mock/swisseph.ts << 'EOF'
/**
 * Mock Swiss Ephemeris service for development and testing
 * This provides fake data instead of actual astronomical calculations
 */

import { ZodiacSigns, Houses, PlanetPosition, Planets, Aspect, AspectType } from 'shared/src/types/astrology';

// Mock planet positions
export const calculatePlanetPositions = (birthDate: string, birthTime: string, latitude: number, longitude: number): PlanetPosition[] => {
  return [
    {
      planet: Planets.SUN,
      sign: ZodiacSigns.ARIES,
      house: Houses.FIRST,
      degree: 15,
      isRetrograde: false
    },
    {
      planet: Planets.MOON,
      sign: ZodiacSigns.CANCER,
      house: Houses.FOURTH,
      degree: 22,
      isRetrograde: false
    },
    {
      planet: Planets.MERCURY,
      sign: ZodiacSigns.PISCES,
      house: Houses.TWELFTH,
      degree: 10,
      isRetrograde: true
    },
    {
      planet: Planets.VENUS,
      sign: ZodiacSigns.TAURUS,
      house: Houses.SECOND,
      degree: 5,
      isRetrograde: false
    },
    {
      planet: Planets.MARS,
      sign: ZodiacSigns.GEMINI,
      house: Houses.THIRD,
      degree: 18,
      isRetrograde: false
    },
    {
      planet: Planets.JUPITER,
      sign: ZodiacSigns.SAGITTARIUS,
      house: Houses.NINTH,
      degree: 8,
      isRetrograde: false
    },
    {
      planet: Planets.SATURN,
      sign: ZodiacSigns.CAPRICORN,
      house: Houses.TENTH,
      degree: 25,
      isRetrograde: true
    },
    {
      planet: Planets.URANUS,
      sign: ZodiacSigns.AQUARIUS,
      house: Houses.ELEVENTH,
      degree: 2,
      isRetrograde: false
    },
    {
      planet: Planets.NEPTUNE,
      sign: ZodiacSigns.PISCES,
      house: Houses.TWELFTH,
      degree: 14,
      isRetrograde: false
    },
    {
      planet: Planets.PLUTO,
      sign: ZodiacSigns.SCORPIO,
      house: Houses.EIGHTH,
      degree: 19,
      isRetrograde: true
    }
  ];
};

// Mock aspects
export const calculateAspects = (planets: PlanetPosition[]): Aspect[] => {
  return [
    {
      aspectType: AspectType.CONJUNCTION,
      firstPlanet: Planets.SUN,
      secondPlanet: Planets.VENUS,
      orb: 2.5,
      applying: true
    },
    {
      aspectType: AspectType.SQUARE,
      firstPlanet: Planets.MOON,
      secondPlanet: Planets.MARS,
      orb: 1.8,
      applying: false
    },
    {
      aspectType: AspectType.TRINE,
      firstPlanet: Planets.JUPITER,
      secondPlanet: Planets.SATURN,
      orb: 3.2,
      applying: true
    },
    {
      aspectType: AspectType.OPPOSITION,
      firstPlanet: Planets.MERCURY,
      secondPlanet: Planets.NEPTUNE,
      orb: 4.1,
      applying: false
    }
  ];
};

// Mock houses
export const calculateHouses = (birthDate: string, birthTime: string, latitude: number, longitude: number) => {
  return {
    ascendant: {
      sign: ZodiacSigns.ARIES,
      degree: 5
    },
    midheaven: {
      sign: ZodiacSigns.CAPRICORN,
      degree: 15
    }
  };
};

// Mock transit calculations
export const calculateTransits = (birthPositions: PlanetPosition[], date: string): PlanetPosition[] => {
  return [
    {
      planet: Planets.SUN,
      sign: ZodiacSigns.TAURUS,
      house: Houses.SECOND,
      degree: 8,
      isRetrograde: false
    },
    {
      planet: Planets.MOON,
      sign: ZodiacSigns.LIBRA,
      house: Houses.SEVENTH,
      degree: 12,
      isRetrograde: false
    },
    {
      planet: Planets.MERCURY,
      sign: ZodiacSigns.GEMINI,
      house: Houses.THIRD,
      degree: 3,
      isRetrograde: false
    },
    {
      planet: Planets.VENUS,
      sign: ZodiacSigns.CANCER,
      house: Houses.FOURTH,
      degree: 25,
      isRetrograde: false
    },
    {
      planet: Planets.MARS,
      sign: ZodiacSigns.ARIES,
      house: Houses.FIRST,
      degree: 18,
      isRetrograde: false
    },
    {
      planet: Planets.JUPITER,
      sign: ZodiacSigns.PISCES,
      house: Houses.TWELFTH,
      degree: 10,
      isRetrograde: false
    },
    {
      planet: Planets.SATURN,
      sign: ZodiacSigns.AQUARIUS,
      house: Houses.ELEVENTH,
      degree: 22,
      isRetrograde: true
    },
    {
      planet: Planets.URANUS,
      sign: ZodiacSigns.TAURUS,
      house: Houses.SECOND,
      degree: 14,
      isRetrograde: false
    },
    {
      planet: Planets.NEPTUNE,
      sign: ZodiacSigns.PISCES,
      house: Houses.TWELFTH,
      degree: 24,
      isRetrograde: false
    },
    {
      planet: Planets.PLUTO,
      sign: ZodiacSigns.CAPRICORN,
      house: Houses.TENTH,
      degree: 26,
      isRetrograde: true
    }
  ];
};

// Mock composite chart
export const calculateComposite = (chart1: PlanetPosition[], chart2: PlanetPosition[]): PlanetPosition[] => {
  return [
    {
      planet: Planets.SUN,
      sign: ZodiacSigns.PISCES,
      house: Houses.TWELFTH,
      degree: 10,
      isRetrograde: false
    },
    {
      planet: Planets.MOON,
      sign: ZodiacSigns.VIRGO,
      house: Houses.SIXTH,
      degree: 15,
      isRetrograde: false
    },
    {
      planet: Planets.MERCURY,
      sign: ZodiacSigns.AQUARIUS,
      house: Houses.ELEVENTH,
      degree: 5,
      isRetrograde: false
    },
    {
      planet: Planets.VENUS,
      sign: ZodiacSigns.LIBRA,
      house: Houses.SEVENTH,
      degree: 18,
      isRetrograde: false
    },
    {
      planet: Planets.MARS,
      sign: ZodiacSigns.SCORPIO,
      house: Houses.EIGHTH,
      degree: 22,
      isRetrograde: false
    },
    {
      planet: Planets.JUPITER,
      sign: ZodiacSigns.LEO,
      house: Houses.FIFTH,
      degree: 8,
      isRetrograde: false
    },
    {
      planet: Planets.SATURN,
      sign: ZodiacSigns.TAURUS,
      house: Houses.SECOND,
      degree: 12,
      isRetrograde: true
    },
    {
      planet: Planets.URANUS,
      sign: ZodiacSigns.GEMINI,
      house: Houses.THIRD,
      degree: 25,
      isRetrograde: false
    },
    {
      planet: Planets.NEPTUNE,
      sign: ZodiacSigns.CANCER,
      house: Houses.FOURTH,
      degree: 6,
      isRetrograde: false
    },
    {
      planet: Planets.PLUTO,
      sign: ZodiacSigns.SAGITTARIUS,
      house: Houses.NINTH,
      degree: 19,
      isRetrograde: false
    }
  ];
};
EOF

# Create a mock service exporter in the server
cat > /home/kenton/code/Astrology-AI-Copilot/server/src/services/index.ts << 'EOF'
/**
 * Services index file
 * Exports all services
 */

// Export mock swisseph instead of real calculations
export * from './mock/swisseph';

// Add other services here
EOF

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

# Start PostgreSQL database
echo "Step 1: Starting database..."
docker-compose up -d postgres
echo "Database started!"

# Build and run the next.js client without Docker
echo "Step 2: Starting the client application..."
cd /home/kenton/code/Astrology-AI-Copilot/client
echo "Installing client dependencies (this may take a while)..."
npm install --legacy-peer-deps --no-optional &
CLIENT_PID=$!

# Start the server app without Docker
echo "Step 3: Starting the server application..."
cd /home/kenton/code/Astrology-AI-Copilot/server
echo "Installing server dependencies (this may take a while)..."
npm install --legacy-peer-deps --no-optional &
SERVER_PID=$!

# Wait for dependencies to install
echo "Waiting for dependencies to install (this could take a few minutes)..."
wait $CLIENT_PID
wait $SERVER_PID

# Build shared package
echo "Building shared package..."
cd /home/kenton/code/Astrology-AI-Copilot/shared
npm install --legacy-peer-deps --no-optional
npm run build

# Start both applications
echo "Starting applications..."
cd /home/kenton/code/Astrology-AI-Copilot/client
nohup npm run dev > /home/kenton/code/Astrology-AI-Copilot/client.log 2>&1 &
echo "Client started at http://localhost:3000"

cd /home/kenton/code/Astrology-AI-Copilot/server
nohup npm run dev > /home/kenton/code/Astrology-AI-Copilot/server.log 2>&1 &
echo "Server started at http://localhost:3001"

echo "=== Mock Deployment Complete ==="
echo "Your application is now running with mock astrological data"
echo "Client URL: http://localhost:3000"
echo "Server URL: http://localhost:3001"
echo ""
echo "To view logs:"
echo "Client logs: tail -f /home/kenton/code/Astrology-AI-Copilot/client.log"
echo "Server logs: tail -f /home/kenton/code/Astrology-AI-Copilot/server.log"
echo ""
echo "To stop the services, you can run:"
echo "pkill -f 'npm run dev'"
echo "docker-compose down"