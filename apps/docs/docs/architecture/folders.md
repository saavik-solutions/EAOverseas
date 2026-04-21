# Folder Structure

The EA Overseas monorepo follows a strict organizational pattern to manage the backend API, frontend applications, and shared packages efficiently.

## Root Directory

```text
/
├── apps/              # Deployable applications
├── backend/           # Fastify API server
├── packages/          # Shared internal packages
├── package.json       # Workspace definitions
├── turbo.json         # Build pipeline configuration
└── pnpm-workspace.yaml
```

## Backend (`/backend`)

The backend follows the **4-Layer Rule** for modularity.

```text
/backend
├── prisma/            # Schema and migrations
├── src/
│   ├── lib/           # Shared cross-cutting logic (DB, Auth, Cloud)
│   ├── modules/       # Domain-specific modules
│   │   ├── auth/
│   │   ├── profile/
│   │   ├── ...
│   ├── app.ts         # App initialization
│   └── server.ts      # HTTP entry point
```

## Apps (`/apps`)

Each app is a standalone Next.js project.

```text
/apps
├── web/               # Student platform (React/Next.js)
├── admin/             # Admin panel (React/Next.js)
└── docs/              # Documentation site (VitePress)
```

## Packages (`/packages`)

Packages facilitate code sharing across the apps and backend.

```text
/packages
└── shared-types/      # Global TypeScript interfaces and Zod schemas
```

## Key Rules

1. **Modules**: Do not import directly from another module's `src` folder. Use shared libraries or clear API definitions.
2. **Apps**: Keep apps thin; move business logic into the `backend` or `shared` packages where applicable.
3. **Workspace**: Always use `pnpm` workspace protocols (e.g., `"shared-types": "workspace:*"`).
