# Folder Structure

The EA Overseas platform is organized as a monorepo for maximum code reuse and separation of concerns.

## Directory Overview

```text
EAOverseas-Monorepo/
├── apps/
│   ├── admin/                # Next.js Application for Administrative Dashboard
│   ├── web/                  # Vite + React Application for User Frontend
│   └── docs/                 # VitePress Documentation (this site)
├── backend/                  # Fastify Backend API
│   ├── prisma/               # Database Schema & Client
│   └── src/
│       ├── modules/          # Encapsulated Business Logic (Auth, Admin, etc.)
│       └── server.ts         # Main API Entry point
├── packages/                 # Shared Workspace Packages
│   ├── shared-types/         # Common Types & Zod Schemas
│   ├── ui/                   # Shared React Contexts & Component Library
│   └── configs/              # Unified Tailwind, ESLint, and TS Configs
├── package.json              # root scripts & turbo configuration
└── turbo.json                # Task orchestration
```

## Application Details

### apps/web
The main consumer-facing application. Focused on speed and rich aesthetics.
- **Port**: 5173
- **Tech**: Vite, React 19, Tailwind CSS 4.

### backend/
The core logic engine.
- **Port**: 4000
- **Tech**: Fastify, Prisma, PostgreSQL.
- **Architecture**: Modular (Controller -> Service -> Schema).

### apps/admin
Specifically built for high-level management.
- **Port**: 3001
- **Tech**: Next.js 14 (App Router).
