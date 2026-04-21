# Architecture Overview

EA Overseas is built on a **Modular Monolith** architecture using Turborepo. The backend is designed with a strict layer-based separation to ensure that any module can be extracted into a standalone microservice in the future.

## Tech Stack

| Layer | Technology |
| --- | --- |
| **Monorepo Manager** | Turborepo |
| **Package Manager** | pnpm |
| **Backend Framework** | Fastify (Node.js 20) |
| **Frontend Framework** | Next.js 14 (App Router) |
| **ORM** | Prisma |
| **Database** | PostgreSQL 16 |
| **Caching** | Redis 7 |
| **Validation** | Zod |
| **Documentation** | VitePress |

## Backend 4-Layer Rule

To maintain decoupling, every module in `backend/src/modules` must follow this structure:

### 1. Route Layer (`*.routes.ts`)
- Defines HTTP endpoints.
- Attaches middleware (Auth, Validation).
- Calls the Controller.
- **Rules**: No business logic, no database access.

### 2. Controller Layer (`*.controller.ts`)
- Handles incoming requests (`req`, `res`).
- Unpacks payload and calls the Service.
- Formats and sends the response.
- **Rules**: No business logic, no database access.

### 3. Service Layer (`*.service.ts`)
- **Brain of the module.**
- Contains all business rules, validations, and orchestration.
- Calls Repositories for data.
- **Rules**: No HTTP concepts (req/res), no raw SQL/ORM elsewhere.

### 4. Repository Layer (`*.repository.ts`)
- Pure data access layer.
- Uses Prisma to talk to the database.
- Returns plain data objects.
- **Rules**: No business logic.

## Module Communication

Modules are **strictly decoupled**. 

- **Direct Imports Forbidden**: `Module A` must never import a service or repository from `Module B`.
- **Shared Library**: Common utilities like `lib/auth.ts` or `lib/db.ts` are accessible to all.
- **Cross-Module Logic**: If `Module A` needs data from `Module B`, it should ideally be handled at the entry point (API level) or via a shared integration layer in `lib/`.

## Deployment

- **Frontend (Web/Admin)**: Deployed to Vercel.
- **Backend (API)**: Deployed to Render (Node.js runtime).
- **Database**: Managed PostgreSQL on Render.
- **Cache**: Managed Redis on Render.
- **Storage**: Cloudflare R2 (S3-compatible).
