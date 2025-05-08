# Astrology AI Copilot - Project Plan

## Architecture Overview

The application follows a modern full-stack architecture:

```
┌─────────────┐      ┌─────────────┐      ┌─────────────────┐
│             │      │             │      │                 │
│  React      │◄────►│  Node.js    │◄────►│  External APIs  │
│  Frontend   │      │  Backend    │      │  (OpenAI, etc.) │
│             │      │             │      │                 │
└─────────────┘      └─────────────┘      └─────────────────┘
                            ▲
                            │
                            ▼
                     ┌─────────────┐
                     │             │
                     │  PostgreSQL │
                     │  Database   │
                     │             │
                     └─────────────┘
```

## Implementation Plan

### Phase 1: Project Setup & Authentication

1. Set up project structure
   - Initialize Next.js frontend
   - Initialize Node.js backend
   - Configure PostgreSQL database
   - Set up Docker development environment

2. Implement authentication with Clerk
   - User registration and login
   - Profile management
   - Session handling

3. Implement subscription management with Stripe
   - Free trial setup
   - Payment processing
   - Subscription status management

### Phase 2: Core Astrological Engine

1. Integrate Swiss Ephemeris
   - Set up WASM module configuration
   - Implement calculation services
   - Build API endpoints for chart calculations

2. Birth Profile Management
   - Database schema for birth profiles
   - CRUD operations for profiles
   - Default profile selection logic

### Phase 3: Dashboard Implementation

1. Personal Growth Dashboard
   - Layout and UI components
   - Integration with astrological engine
   - AI insight generation

2. Relationships Dashboard
   - Composite chart calculations
   - Relationship-specific UI elements
   - Specialized AI interpretations

### Phase 4: AI Copilot Implementation

1. OpenAI Integration
   - Set up GPT-4o access
   - Configure Assistants API
   - Create base prompt engineering

2. Chat Interface
   - Thread management
   - Context toggling
   - Chat history persistence

### Phase 5: Refinement & Launch Preparation

1. Testing
   - Unit and integration tests
   - E2E testing
   - Performance optimization

2. Documentation
   - API documentation
   - User guides
   - Codebase documentation

3. Deployment
   - CI/CD pipeline setup
   - Infrastructure provisioning
   - Launch checklist

## Technical Considerations

### Database Schema (Draft)

```
Users
  - id
  - email
  - clerkId
  - subscriptionStatus
  - subscriptionId
  - trialEndsAt
  - createdAt
  - updatedAt

BirthProfiles
  - id
  - userId
  - name
  - birthDate
  - birthTime
  - birthLocation
  - latitude
  - longitude
  - isDefault
  - createdAt
  - updatedAt

ChatThreads
  - id
  - userId
  - title
  - createdAt
  - updatedAt

ChatMessages
  - id
  - threadId
  - role
  - content
  - createdAt
  
UserPreferences
  - id
  - userId
  - defaultPersonalProfileId
  - defaultRelationshipProfileId
  - otherSettings
  - createdAt
  - updatedAt
```

### API Endpoints (Draft)

```
Authentication
  - POST /api/auth/callback
  - GET /api/auth/user

Birth Profiles
  - GET /api/profiles
  - POST /api/profiles
  - GET /api/profiles/:id
  - PUT /api/profiles/:id
  - DELETE /api/profiles/:id

Astrological Data
  - POST /api/astro/natal
  - POST /api/astro/transit
  - POST /api/astro/composite

Dashboard Data
  - GET /api/dashboard/personal
  - GET /api/dashboard/relationships

AI Copilot
  - POST /api/chat/threads
  - GET /api/chat/threads
  - GET /api/chat/threads/:id
  - POST /api/chat/threads/:id/messages
  - GET /api/chat/threads/:id/messages

Subscriptions
  - POST /api/subscriptions/create-checkout
  - POST /api/subscriptions/webhook
  - GET /api/subscriptions/status
```

## Development Timeline (Estimated)

- **Phase 1**: 2 weeks
- **Phase 2**: 2 weeks
- **Phase 3**: 3 weeks
- **Phase 4**: 2 weeks
- **Phase 5**: 1 week

Total MVP development time: ~10 weeks