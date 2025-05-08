#!/bin/bash

# Exit on error
set -e

echo "=== Astrology AI Copilot - Mock Docker Deployment ==="
echo "Starting the mock deployment process..."

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

# Create mock server files
echo "Setting up mock server files..."
mkdir -p server/src/services/mock

cat > server/src/services/mock/swisseph.ts << 'EOF'
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
    // Add more planets as needed
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
    // Add more aspects as needed
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
EOF

# Create basic server index file
cat > server/server.js << 'EOF'
const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Astrology AI Copilot API is running',
    version: '0.1.0'
  });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Mock endpoint for auth status
app.get('/api/auth/user', (req, res) => {
  res.json({ 
    id: '123',
    email: 'user@example.com',
    isAuthenticated: true,
    subscription: {
      isActive: true,
      plan: 'PREMIUM',
      trialEndsAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
EOF

# Create basic client index file
mkdir -p client/pages
cat > client/pages/index.js << 'EOF'
export default function Home() {
  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ color: '#6D28D9' }}>Astrology AI Copilot</h1>
      <p>Welcome to the Astrology AI Copilot development server!</p>
      <p>This is a mock deployment for testing purposes.</p>
      
      <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#F3F4F6', borderRadius: '0.5rem' }}>
        <h2>Status:</h2>
        <ul>
          <li>Client: Running on port 3000</li>
          <li>Server: Running on port 3001</li>
          <li>Database: PostgreSQL on port 5432</li>
        </ul>
      </div>
      
      <div style={{ marginTop: '2rem' }}>
        <h2>Next Steps:</h2>
        <ol>
          <li>Configure your environment variables</li>
          <li>Set up Clerk authentication</li>
          <li>Configure Stripe payment processing</li>
          <li>Set up OpenAI integration</li>
        </ol>
      </div>
    </div>
  )
}
EOF

# Create client package.json
cat > client/package.json << 'EOF'
{
  "name": "client",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "next": "latest",
    "react": "latest",
    "react-dom": "latest"
  }
}
EOF

# Create server package.json
cat > server/package.json << 'EOF'
{
  "name": "server",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "start": "node server.js",
    "dev": "node server.js"
  },
  "dependencies": {
    "cors": "^2.8.5",
    "express": "^4.18.2"
  }
}
EOF

# Create client Dockerfile
cat > client/Dockerfile << 'EOF'
FROM node:20-alpine

WORKDIR /app

COPY package.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
EOF

# Create server Dockerfile
cat > server/Dockerfile << 'EOF'
FROM node:20-alpine

WORKDIR /app

COPY package.json ./
RUN npm install

COPY . .

EXPOSE 3001

CMD ["npm", "run", "start"]
EOF

# Create docker-compose.yml
cat > docker-compose.yml << 'EOF'
version: '3.8'

services:
  postgres:
    image: postgres:15
    container_name: astrology-ai-postgres
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: astrology_ai
    ports:
      - "5432:5432"
    volumes:
      - postgres-data:/var/lib/postgresql/data
    networks:
      - astrology-ai-network

  client:
    build:
      context: ./client
      dockerfile: Dockerfile
    container_name: astrology-ai-client
    ports:
      - "3000:3000"
    networks:
      - astrology-ai-network

  server:
    build:
      context: ./server
      dockerfile: Dockerfile
    container_name: astrology-ai-server
    ports:
      - "3001:3001"
    depends_on:
      - postgres
    networks:
      - astrology-ai-network

networks:
  astrology-ai-network:
    driver: bridge

volumes:
  postgres-data:
EOF

# Start all services
echo "Starting all services..."
docker-compose up -d

echo "=== Mock Deployment Complete ==="
echo "Your application is now running at:"
echo "Client URL: http://localhost:3000"
echo "Server URL: http://localhost:3001"
echo ""
echo "To view logs run: docker-compose logs -f"
echo "To stop the services run: docker-compose down"