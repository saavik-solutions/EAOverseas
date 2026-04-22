# EA Overseas Monorepo

Welcome to the **EA Overseas** platform—a highly-scalable, modular monorepo designed to streamline overseas education discovery, application, and management.

## 🚀 Overview

EA Overseas is built with a modern tech stack focused on performance, modularity, and a premium user experience. It leverages **Turborepo** to manage multiple applications and shared packages efficiently.

### 🛠 Tech Stack
- **Monorepo Manager**: [Turborepo](https://turbo.build/repo) + [pnpm](https://pnpm.io/)
- **Backend**: [Fastify](https://fastify.io/) (Node.js) + [Prisma ORM](https://www.prisma.io/) (PostgreSQL)
- **Frontend**: [React](https://react.dev/) + [Vite](https://vitejs.dev/) & [Next.js](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Documentation**: [VitePress](https://vitepress.dev/)

---

## 📂 Project Structure

```text
EAOverseas-Monorepo/
├── apps/
│   ├── admin/                # Next.js Dashboard for Admins (Port 3001)
│   ├── web/                  # Vite + React Main User App (Port 5173) - User Frontend
│   └── docs/                 # Project Technical Documentation (VitePress)
├── backend/                  # Fastify + Prisma API Engine (Port 4000)
│   ├── prisma/               # Database Models & Seeding
│   ├── src/
│   │   ├── modules/          # Business logic: Auth, Admin, Feed, Mail, etc.
│   │   └── server.ts         # Backend Application Entry point
├── packages/                 # Shared internal libraries
│   ├── shared-types/         # Unified TypeScript Types & Zod schemas
│   ├── ui/                   # Shared UI component library
│   └── configs/              # Shared Tailwind, ESLint, and TS Configs
├── package.json              # Monorepo scripts
└── pnpm-workspace.yaml       # Workspace configuration
```

---

## 🔐 Role-Based Access Control (RBAC)

The platform implements a strict RBAC system to ensure data security and personalized user experiences.

| Role | Access Level | Description |
| :--- | :--- | :--- |
| `student` | Restricted | View universities, apply for courses, and manage personal profile. |
| `counsellor`| Dashboard | Access assigned students, manage counseling sessions. |
| `vendor` | Dashboard | Manage university profile, view/process course applications. |
| `admin` | Management | Platform-level management with oversight of specific sectors. |
| `super_admin`| Full Access | Advanced User Management, platform settings, and post oversight. |

### Core Security Logic:
1.  **Student Registration**: Public signup is restricted strictly to the `student` role.
2.  **Account Provisioning**: `counsellor`, `vendor`, and `admin` accounts are manually created via the **Super Admin User Management Dashboard**.
3.  **Role Redirection**: Post-login, the system automatically routes users to their respective dashboards based on their role.

---

## 🛠 Getting Started

### Prerequisites
- Node.js (v18+)
- pnpm (v9+)
- PostgreSQL instance

### Installation
```bash
# Install dependencies
pnpm install

# Setup environment
# Copy .env.example to .env in /backend and /apps/web

# Run the entire stack (Frontend + Backend + Admin)
pnpm dev
```

### Accessing the services
- **User App**: [http://localhost:5173](http://localhost:5173)
- **Admin Dashboard**: [http://localhost:3001](http://localhost:3001)
- **API Server**: [http://localhost:4000](http://localhost:4000)

---

## 📄 Documentation
Detailed technical documentation is available locally in the `apps/docs` workspace or can be served via:
```bash
pnpm --filter docs dev
```

---

## ✨ Features
- ✅ **Advanced User Management**: Dedicated dashboard for Super Admins to provision and manage platform users.
- ✅ **Seamless Auth**: OTP-based verification for students and direct credential management for admins.
- ✅ **Community Feed**: Multi-category feed with high-performance interactions (likes, bookmarks).
- ✅ **Secure RBAC**: Comprehensive role management and route protection across all apps.
