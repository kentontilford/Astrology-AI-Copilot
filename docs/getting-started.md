# Getting Started with Astrology AI Copilot

This guide will help you set up the Astrology AI Copilot project for local development.

For a complete overview of the project, please see the [Project Summary](./project-summary.md).

## Prerequisites

- Node.js (v18 or later)
- npm or yarn
- Docker and Docker Compose (for local development with PostgreSQL)
- Clerk account for authentication
- OpenAI API key
- Stripe account for payments

## Setup Instructions

### 1. Clone the Repository

```bash
git clone [repository-url]
cd astrology-ai-copilot
```

### 2. Environment Variables

1. Copy the environment example files:

```bash
cp client/.env.example client/.env
cp server/.env.example server/.env
```

2. Fill in the environment variables in both `.env` files with your actual credentials.

### 3. Install Dependencies

```bash
# Install root dependencies
npm install

# Install client dependencies
cd client
npm install
cd ..

# Install server dependencies
cd server
npm install
cd ..

# Install shared dependencies
cd shared
npm install
cd ..
```

### 4. Build the Shared Package

```bash
cd shared
npm run build
cd ..
```

### 5. Start the Development Environment

#### Using Docker (Recommended)

```bash
docker-compose up -d
```

This will start:
- PostgreSQL database on port 5432
- Client application on port 3000
- Server application on port 3001

#### Without Docker

Terminal 1 (Server):
```bash
cd server
npm run dev
```

Terminal 2 (Client):
```bash
cd client
npm run dev
```

You'll also need to have PostgreSQL running locally and configure your `.env` files accordingly.

### 6. Access the Application

- Frontend: http://localhost:3000
- Backend API: http://localhost:3001

## Development Workflow

### Database Migrations

The server uses Sequelize with `sync({ alter: true })` in development mode, which will automatically update the database schema. For production, you should implement proper migrations.

### Testing

```bash
# Run all tests
npm test

# Run client tests
npm run test --workspace=client

# Run server tests
npm run test --workspace=server
```

### Building for Production

```bash
npm run build
```

This will build both the client and server applications.

## External Services Setup

### Clerk Authentication

1. Create a Clerk application at https://dashboard.clerk.dev/
2. Set up sign-in and sign-up pages
3. Add your Clerk API keys to the environment files

### OpenAI

1. Obtain an API key from https://platform.openai.com/
2. Add your OpenAI API key to the server environment file

### Stripe

1. Create a Stripe account and set up a product/price
2. Add your Stripe API keys to both environment files
3. Set up webhook endpoints for subscription management

### Swiss Ephemeris

The Swiss Ephemeris files need to be accessible to the server. The WASM module should handle downloading these files automatically, but you may need to configure the path in the environment variables.