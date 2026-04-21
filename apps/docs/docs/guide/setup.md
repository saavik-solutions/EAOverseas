# Local Environment Setup

This guide will walk you through setting up the EA Overseas development environment on your local machine.

## Prerequisites

Before starting, ensure you have the following installed:

- **Node.js**: v20 or higher
- **pnpm**: v8 or higher (`npm i -g pnpm`)
- **Docker** (Recommended for PostgreSQL and Redis)
- **Git**

## 1. Clone the Repository

```bash
git clone https://github.com/ea-overseas/ea-overseas-backend.git
cd ea-overseas-backend
```

## 2. Install Dependencies

From the root of the monorepo, run:

```bash
pnpm install
```

## 3. Storage & Infrastructure (Local Docker)

The easiest way to run PostgreSQL and Redis is via Docker Compose.

### Create a `docker-compose.yml`

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:16-alphine
    environment:
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: password
      POSTGRES_DB: ea_overseas
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alphine
    ports:
      - "6379:6379"

volumes:
  postgres_data:
```

### Start Infrastructure

```bash
docker-compose up -d
```

## 4. Environment Variables

Navigate to the `backend` directory and create a `.env` file:

```bash
cd backend
cp .env.example .env
```

Ensure your `DATABASE_URL` matches your local PostgreSQL setup:

```env
DATABASE_URL="postgresql://admin:password@localhost:5432/ea_overseas?schema=public"
REDIS_URL="redis://localhost:6379"
ACCESS_TOKEN_SECRET="your-access-secret"
REFRESH_TOKEN_SECRET="your-refresh-secret"
```

## 5. Database Setup

Once PostgreSQL is running, initialize the database and seed it:

```bash
# Generate Prisma Client
pnpm exec prisma generate

# Run migrations
pnpm exec prisma migrate dev --name init

# Seed the database with sample data
pnpm exec prisma db seed
```

## 6. Running the Application

You can start the entire project in development mode using Turborepo:

```bash
# From the root directory
pnpm dev
```

This will concurrently start:
- **Backend**: http://localhost:4000
- **Web App**: http://localhost:3000
- **Admin App**: http://localhost:3001
- **Docs**: http://localhost:5173

## Troubleshooting

- **Prisma Connection Error**: Ensure PostgreSQL is running and the `DATABASE_URL` is correct.
- **Port Conflicts**: If port 4000, 3000, or 3001 is already in use, you can change them in the respective `package.json` or `.env` files.
- **PNPM Issues**: Try clearing the store using `pnpm store prune` and reinstalling.
