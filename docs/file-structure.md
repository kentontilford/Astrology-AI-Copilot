# Astrology AI Copilot - File Structure

This document provides an overview of the project's file structure.

## Root Directory

```
astrology-ai-copilot/
├── .github/                    # GitHub configuration
│   └── workflows/              # GitHub Actions workflows
│       └── ci.yml              # Continuous Integration workflow
├── client/                     # Frontend application
├── server/                     # Backend API
├── shared/                     # Shared code
├── docs/                       # Documentation
├── scripts/                    # Project scripts
├── .gitignore                  # Git ignore file
├── CONTRIBUTING.md             # Contribution guidelines
├── docker-compose.yml          # Docker development setup
├── package.json                # Project configuration
├── README.md                   # Project overview
├── SETUP-COMPLETE.md           # Setup completion documentation
└── tsconfig.base.json          # Base TypeScript configuration
```

## Client (Frontend)

```
client/
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── api/                # API route handlers
│   │   ├── auth/               # Authentication pages
│   │   ├── chat/               # AI Copilot chat pages
│   │   ├── components/         # App-level components
│   │   │   ├── Footer.tsx      # Site footer
│   │   │   └── Header.tsx      # Site header
│   │   ├── dashboard/          # Dashboard pages
│   │   │   ├── personal/       # Personal Growth dashboard
│   │   │   └── relationships/  # Relationships dashboard
│   │   ├── profiles/           # Birth profile management
│   │   ├── settings/           # User settings pages
│   │   ├── globals.css         # Global styles
│   │   ├── layout.tsx          # Root layout component
│   │   └── page.tsx            # Home page
│   ├── components/             # Shared UI components
│   ├── hooks/                  # Custom React hooks
│   ├── services/               # API client services
│   ├── styles/                 # Additional styles
│   └── utils/                  # Utility functions
├── public/                     # Static assets
├── .env.example                # Environment variables example
├── Dockerfile.dev              # Development Docker config
├── next.config.js              # Next.js configuration
├── package.json                # Package configuration
├── postcss.config.js           # PostCSS config for Tailwind
└── tailwind.config.js          # Tailwind CSS config
```

## Server (Backend)

```
server/
├── src/
│   ├── config/                 # Configuration files
│   │   └── database.ts         # Database configuration
│   ├── controllers/            # Request handlers
│   ├── middleware/             # Express middleware
│   │   ├── authMiddleware.ts   # Authentication middleware
│   │   ├── errorHandler.ts     # Error handling middleware
│   │   └── notFoundHandler.ts  # 404 handler
│   ├── models/                 # Database models
│   ├── routes/                 # API routes
│   ├── services/               # Business logic
│   ├── utils/                  # Utility functions
│   └── index.ts                # Server entry point
├── .env.example                # Environment variables example
├── Dockerfile.dev              # Development Docker config
├── package.json                # Package configuration
└── tsconfig.json               # TypeScript configuration
```

## Shared Code

```
shared/
├── src/
│   ├── types/                  # Shared TypeScript types
│   │   ├── api.ts              # API request/response types
│   │   ├── astrology.ts        # Astrological data types
│   │   ├── auth.ts             # Authentication types
│   │   ├── chat.ts             # Chat/AI types
│   │   └── user.ts             # User and profile types
│   └── index.ts                # Exports
├── package.json                # Package configuration
└── tsconfig.json               # TypeScript configuration
```

## Documentation

```
docs/
├── file-structure.md           # This file - structure overview
├── getting-started.md          # Setup and development guide
├── next-steps.md               # Implementation roadmap
├── project-plan.md             # Detailed project plan
└── project-summary.md          # Project overview
```

## Scripts

```
scripts/
└── setup.sh                    # Project setup script
```