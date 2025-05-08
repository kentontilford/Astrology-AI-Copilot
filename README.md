# Astrology AI Copilot

<div align="center">
  <img src="https://via.placeholder.com/200x200?text=Astrology+AI" alt="Astrology AI Logo" width="200" />
  <h3>Personalized Astrological Insights Powered by AI</h3>
</div>

Astrology AI Copilot is a modern application that combines traditional astrology with artificial intelligence to provide personalized astrological insights and guidance.

## Core Features

- **Authentication**: Email/password and Google sign-in with Clerk
- **Birth Profile Management**: Store and manage multiple birth profiles
- **Astrological Engine**: Swiss Ephemeris calculations for natal and transit charts
- **Interactive Dashboards**: Personal Growth and Relationships dashboards
- **AI Copilot Chat**: Context-aware astrological guidance powered by GPT-4o

## Tech Stack

- **Frontend**: React with Next.js
- **Backend**: Node.js with Express
- **Authentication**: Clerk
- **Payments**: Stripe
- **AI**: OpenAI GPT-4o and Assistants API
- **Astrological Calculations**: Swiss Ephemeris (WASM)
- **Database**: PostgreSQL
- **Deployment**: Docker, AWS/Vercel

## Project Structure

- `/client` - Frontend application
- `/server` - Backend API and services
- `/shared` - Shared types and utilities
- `/docs` - Documentation and planning

## Getting Started

### Quick Setup

Run the setup script to initialize the project:

```bash
npm run setup
```

This will:
1. Create environment files from examples
2. Install all dependencies
3. Build the shared package

### Running the Application

#### Option 1: Quick Mock Deployment (Recommended)

We've created a simplified mock deployment that bypasses the complex dependencies:

```bash
cd mock-deployment
./deploy.sh
```

This creates a simplified version of the application with:
- Basic Next.js client
- Simple Express server
- PostgreSQL database
- Mock astrological calculations (no Swiss Ephemeris)

#### Option 2: Full Docker Deployment

```bash
./deploy.sh
```

This starts the PostgreSQL database, client, and server in Docker containers.

#### Option 3: Local Development

```bash
./start-local.sh
```

This builds the shared package and starts both client and server locally.

#### Option 4: Manual Start

```bash
npm run dev
```

This starts both the client and server in development mode.

### Accessing the Application

- Frontend: http://localhost:3000
- Backend API: http://localhost:3001

### Detailed Instructions

- [Quick Deployment Guide](./deployment-quick-start.md) - Fastest way to get started
- [Getting Started Guide](./docs/getting-started.md) - Development setup
- [Deployment Guide](./docs/deployment-guide.md) - Production deployment

## Documentation

- [Project Summary](./docs/project-summary.md) - Overview of the project
- [Project Plan](./docs/project-plan.md) - Detailed architecture and planning
- [File Structure](./docs/file-structure.md) - Project organization
- [Next Steps](./docs/next-steps.md) - Implementation roadmap

## Contributing

Please read [CONTRIBUTING.md](./CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

<div align="center">
  <p>Developed with ❤️ by Your Team</p>
</div>