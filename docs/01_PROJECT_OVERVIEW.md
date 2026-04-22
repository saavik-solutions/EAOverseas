# 01 — EAOverseas: Project Overview

## What Is EAOverseas?

EAOverseas is a **full-stack web platform** designed for Indian students who want to study abroad. Think of it as a one-stop-shop where students can:
- Discover and compare universities worldwide
- Apply to courses with guided application wizards
- Get AI-powered college match scores
- Browse a curated news feed (scholarships, events, articles)
- Connect with counsellors for personalized guidance
- Manage visas, loans, accommodation, and documents

The platform serves **5 types of users** (roles):
| Role | Description |
|---|---|
| `student` | The primary user. Can browse, apply, save, manage profile & documents |
| `counsellor` | An advisor who manages assigned students, schedules, and tasks |
| `vendor` | Reserved for service providers (accommodation, loans) — currently minimal |
| `admin` | Internal staff with elevated access to manage universities and content |
| `super_admin` | Full platform control: user management, post moderation, analytics |

---

## Tech Stack Summary

| Layer | Technology | Purpose |
|---|---|---|
| **Frontend** | React 18 + Vite + TypeScript | Fast SPA for the user-facing portal |
| **Styling** | TailwindCSS + Material Symbols | Utility-first CSS + Google icon font |
| **Backend** | Fastify + TypeScript | High-performance REST API server |
| **ORM** | Prisma | Type-safe database queries |
| **Database** | PostgreSQL (Railway) | Relational data storage |
| **Cache** | Redis (Railway) | OTP storage, rate limiting |
| **File Storage** | Cloudflare R2 | University logos, documents, cover images |
| **Email** | Nodemailer (Gmail SMTP) | Welcome emails, OTP verification codes |
| **Auth** | Google OAuth 2.0 + JWT | Login flow with token-based sessions |
| **Build Tool** | Turborepo + pnpm workspaces | Monorepo orchestration |

---

## Monorepo Structure

```
EAOverseas/
├── apps/
│   ├── web/          ← Main React app (Vite) — Student, Counsellor, SuperAdmin portals
│   └── admin/        ← Next.js admin console (early stage / scaffold only)
├── backend/          ← Fastify API server + Prisma + all business logic
├── packages/
│   ├── shared-types/ ← Zod schemas shared between frontend and backend
│   ├── ui/           ← Shared React component library
│   ├── tailwind-config/ ← Shared Tailwind theme
│   ├── eslint-config/   ← Shared ESLint rules
│   └── typescript-config/ ← Shared tsconfig base
├── turbo.json        ← Turborepo pipeline config
├── pnpm-workspace.yaml ← Workspace package locations
└── .env              ← Root environment variables
```

---

## How to Run the Project

### Prerequisites
- Node.js v18+
- pnpm (install with `npm install -g pnpm`)

### Start Services (in separate terminals)

**Terminal 1 — Backend:**
```bash
cd backend
pnpm install
npx prisma generate
pnpm run dev
# ✅ Runs on http://localhost:4000
```

**Terminal 2 — Web Frontend:**
```bash
cd apps/web
pnpm install
pnpm run dev
# ✅ Runs on http://localhost:5173
```

> **Important:** Do NOT run `pnpm dev` from the root unless you want all apps including `admin` to start simultaneously (which causes port conflicts).

---

## Current Development Status

| Module | Status | Notes |
|---|---|---|
| Authentication (Google OAuth + Email/OTP) | ✅ Working | Full flow functional |
| User Registration & Student ID generation | ✅ Working | Auto-generates `EAO-ST-XXXXXX` |
| Feed System (Create, Read, Like, Bookmark) | ✅ Working | Connected to PostgreSQL |
| University CRUD (Admin) | ✅ Working | Full CRUD with role guards |
| Community Forum (Posts, Comments, Votes) | ✅ Working | Reddit-like Q&A system |
| SuperAdmin Dashboard | ✅ Working | User management, post moderation |
| Image Upload (Cloudflare R2) | ✅ Working | 10MB file size limit |
| Email System (Welcome + OTP) | ✅ Working | Beautiful HTML templates |
| AI Assistant ("Guide Buddy") | 🟡 Mock | Uses hardcoded keyword matching, no real AI API |
| User Profile Management | 🟡 Partial | Uses localStorage, not fully synced with backend DB |
| Application System | 🟡 Partial | UI exists, backend application flow partially wired |
| Visa/Loan/Accommodation | 🟡 UI Only | Rich UIs with mock/static data, no backend API |
| Test Prep (IELTS modules) | 🟡 UI Only | Reading/Writing/Listening/Speaking UIs with mock data |
| Counsellor Dashboard | 🟡 UI Only | Full dashboard UI, data is hardcoded |
| Admin Console (Next.js) | 🔴 Scaffold | Just a placeholder page |
