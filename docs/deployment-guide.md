# Astrology AI Copilot - Deployment Guide

This guide provides step-by-step instructions for deploying the Astrology AI Copilot application to production.

## Prerequisites

Before deployment, ensure you have:

1. All required API keys and credentials:
   - Clerk authentication keys
   - OpenAI API key
   - Stripe API keys and product/price ID

2. Deployment environment with:
   - Docker and Docker Compose installed
   - Access to a PostgreSQL database (or Docker for local deployment)
   - Node.js v16+ (if not using Docker)

## Local Deployment with Docker

For a quick local deployment using Docker:

1. **Prepare environment variables**

   Ensure all `.env` files are set up correctly:
   - Root `.env`
   - `client/.env`
   - `server/.env`

2. **Run the deployment script**

   ```bash
   ./deploy.sh
   ```

   This will:
   - Start the PostgreSQL database
   - Build and run the client and server applications
   - Make the application available on:
     - Client: http://localhost:3000
     - Server: http://localhost:3001

3. **Verify deployment**

   Check service status:
   ```bash
   docker-compose ps
   ```

   View logs:
   ```bash
   docker-compose logs -f
   ```

## Production Deployment Options

### Option 1: Vercel (Frontend) + Cloud Hosting (Backend)

#### Frontend Deployment to Vercel

1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy the client application

#### Backend Deployment

Choose one of the following options:

**AWS Elastic Beanstalk:**
1. Create an Elastic Beanstalk environment
2. Configure environment variables
3. Deploy the server application

**Heroku:**
1. Create a new Heroku app
2. Configure environment variables
3. Connect to your GitHub repository
4. Deploy the server application

### Option 2: Kubernetes Deployment

For a scalable production deployment:

1. Create Kubernetes manifests:
   - Deployment configurations
   - Service definitions
   - Ingress rules
   - ConfigMaps and Secrets for environment variables

2. Deploy to a Kubernetes cluster:
   ```bash
   kubectl apply -f k8s/
   ```

### Option 3: Digital Ocean App Platform

1. Connect your GitHub repository
2. Configure environment variables
3. Deploy both client and server components

## Database Setup

For production, you'll need a persistent database:

1. **AWS RDS:**
   - Create a PostgreSQL database instance
   - Configure security groups
   - Update DATABASE_URL in your environment variables

2. **Supabase:**
   - Create a new project
   - Get connection string
   - Update DATABASE_URL in your environment variables

## Post-Deployment Steps

1. **Set up Stripe webhooks:**
   - Configure webhook endpoints in Stripe dashboard
   - Point to your server's `/api/subscriptions/webhook` endpoint
   - Update STRIPE_WEBHOOK_SECRET in your environment variables

2. **Configure Clerk callbacks:**
   - Update Clerk settings to point to your production URLs
   - Configure sign-in and sign-up redirects

3. **Set up monitoring:**
   - Configure error tracking (Sentry, LogRocket)
   - Set up performance monitoring
   - Configure logging

4. **Test the deployment:**
   - Verify authentication flow
   - Test subscription process
   - Check both dashboards
   - Test AI chat functionality

## Troubleshooting

If you encounter issues during deployment:

1. Check container logs:
   ```bash
   docker-compose logs -f [service-name]
   ```

2. Verify environment variables are set correctly

3. Ensure all services are running:
   ```bash
   docker-compose ps
   ```

4. Check database connectivity:
   ```bash
   docker exec -it astrology-ai-postgres psql -U postgres -d astrology_ai
   ```

5. For TypeScript errors, rebuild the shared package:
   ```bash
   docker-compose run server npm run build --workspace=shared
   ```