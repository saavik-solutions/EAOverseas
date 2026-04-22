# EAOverseas — Project Documentation

> Complete technical documentation for the EAOverseas study-abroad platform. Generated from a full codebase audit.

---

## 📖 Documentation Index

| # | Document | Description |
|---|---|---|
| 01 | [Project Overview](./01_PROJECT_OVERVIEW.md) | What is EAOverseas, tech stack, monorepo structure, how to run, current status |
| 02 | [Backend Architecture](./02_BACKEND_ARCHITECTURE.md) | Fastify server, 4-layer module pattern, all 7 backend modules explained |
| 03 | [Frontend Architecture](./03_FRONTEND_ARCHITECTURE.md) | React routing map (100+ routes), layouts, contexts, services, components |
| 04 | [Database Schema](./04_DATABASE_SCHEMA.md) | All 20+ PostgreSQL tables, columns, relationships, ER diagram |
| 05 | [API Reference](./05_API_REFERENCE.md) | Every REST endpoint with methods, auth requirements, request/response shapes |
| 06 | [Authentication Flow](./06_AUTHENTICATION_FLOW.md) | Step-by-step Google OAuth, email login, OTP verification with sequence diagrams |
| 07 | [Known Issues & Gaps](./07_KNOWN_ISSUES_AND_GAPS.md) | All bugs, misconfigurations, missing features, and env var gaps |
| 08 | [Environment Configuration](./08_ENVIRONMENT_CONFIGURATION.md) | Every env variable explained — which service needs it, is it required, where to set it |
| 09 | [File Map](./09_FILE_MAP.md) | Complete file listing — every file in the project with its purpose |
| 10 | [Development Roadmap](./10_DEVELOPMENT_ROADMAP.md) | Prioritized action plan: critical fixes → backend wiring → new modules → production readiness |

---

## Quick Start

```bash
# Terminal 1 — Backend
cd backend
pnpm install
npx prisma generate
pnpm run dev          # → http://localhost:4000

# Terminal 2 — Frontend
cd apps/web
pnpm install
pnpm run dev          # → http://localhost:5173
```

---

## Key Findings Summary

- **What's working:** Auth (Google OAuth + email), Feed CRUD, University CRUD, Community Forum, File Upload, Email (OTP + Welcome)
- **What's mock/incomplete:** User profiles (localStorage only), AI assistant (keyword matching), Visa/Loan/Accommodation/Test Prep (UI only, no backend), Counsellor dashboard (hardcoded data)
- **Critical bugs:** Wrong API URL in `universityService.ts`, hardcoded localhost URLs, feed category enum mismatch
- **Biggest gap:** The frontend has 84+ rich pages, but only ~5 backend modules exist. Most features use localStorage or hardcoded data instead of the database
