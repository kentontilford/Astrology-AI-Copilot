# Astrology AI Copilot - Quick Deployment Guide

This guide provides the quickest way to get a development version of the Astrology AI Copilot up and running.

## Method 1: Use the Mock Deployment Script

The mock deployment script will:
1. Set up a PostgreSQL database with Docker
2. Create mock astrological calculation services (instead of using Swiss Ephemeris)
3. Start the client and server applications locally

```bash
./deploy-mock.sh
```

This will start:
- Client at http://localhost:3000
- Server at http://localhost:3001
- PostgreSQL database at localhost:5432

## Method 2: Manual Deployment

If the script is having issues, follow these manual steps:

1. **Start the PostgreSQL database**
   ```bash
   docker-compose up -d postgres
   ```

2. **Build the shared package**
   ```bash
   cd shared
   npm install --legacy-peer-deps --no-optional
   
   # Create mock build folders if TypeScript fails
   mkdir -p dist
   echo "export * from '../src/types/auth'; export * from '../src/types/astrology'; export * from '../src/types/user'; export * from '../src/types/chat'; export * from '../src/types/api';" > dist/index.js
   echo "export * from '../src/types/auth'; export * from '../src/types/astrology'; export * from '../src/types/user'; export * from '../src/types/chat'; export * from '../src/types/api';" > dist/index.d.ts
   cd ..
   ```

3. **Create mock astrological service**
   ```bash
   mkdir -p server/src/services/mock
   # Copy the mock swisseph.ts file from deploy-mock.sh
   ```

4. **Start the server**
   ```bash
   cd server
   npm install --legacy-peer-deps --no-optional --ignore-scripts
   npx ts-node src/index.ts
   ```

5. **Start the client (in a new terminal)**
   ```bash
   cd client
   npm install --legacy-peer-deps --no-optional
   npm run dev
   ```

## Method 3: Production Deployment 

For a production deployment:

1. Follow the detailed instructions in [docs/deployment-guide.md](./docs/deployment-guide.md)
2. Set up the services mentioned in the guide:
   - Authentication with Clerk
   - Database with PostgreSQL
   - Payment processing with Stripe
   - AI integration with OpenAI

3. Deploy to your preferred hosting provider:
   - Vercel for the frontend
   - Heroku/AWS/GCP for the backend
   - AWS RDS or equivalent for the database

## Troubleshooting

If you encounter issues:

1. **Swiss Ephemeris Errors**
   - These are related to native module compilation
   - Use the mock implementation instead

2. **Dependency Issues**
   - Try installing with `--no-optional --ignore-scripts`
   - Use `--force` if necessary

3. **Database Connection Issues**
   - Verify PostgreSQL is running with `docker ps`
   - Check connection string in environment variables

4. **Authentication/API Key Issues**
   - Verify all keys in .env files are correct
   - Test authentication endpoints manually

For more help, refer to the full documentation in the docs directory.