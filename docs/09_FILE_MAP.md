# 09 — Complete File Map

Every significant file in the project with a one-line explanation of its purpose.

---

## Root

| File/Dir | Purpose |
|---|---|
| `package.json` | Root monorepo config — defines `turbo` as dev dependency |
| `turbo.json` | Turborepo pipeline — defines `build`, `dev`, `lint`, `test` tasks |
| `pnpm-workspace.yaml` | Declares workspace packages: `apps/*`, `backend`, `packages/*` |
| `.env` | Root env vars (inherited by child workspaces via Turbo) |
| `.gitignore` | Git exclusions (node_modules, dist, .env, etc.) |
| `PHASE_1_TASKS.md` | Original development task breakdown for Phase 1 |

---

## `backend/` — Fastify API Server

### Core
| File | Purpose |
|---|---|
| `package.json` | Backend dependencies (fastify, prisma, bcryptjs, etc.) |
| `.env` | Backend-specific env vars (DATABASE_URL, JWT_SECRET, etc.) |
| `tsconfig.json` | TypeScript config for the backend |
| `src/server.ts` | Entry point — starts Fastify on PORT 4000 |
| `src/app.ts` | Registers plugins (CORS, JWT, cookie, multipart, static) and mounts all route modules |

### Prisma
| File | Purpose |
|---|---|
| `prisma/schema.prisma` | **THE database schema** — all 20+ models, enums, and relations |
| `prisma/client/` | Auto-generated Prisma client (created by `npx prisma generate`) |

### Libraries (`src/lib/`)
| File | Purpose |
|---|---|
| `prisma.ts` | Exports singleton `PrismaClient` instance + re-exports `Role` enum |
| `nodemailer.ts` | Configures Gmail SMTP transport for sending emails |
| `s3.ts` | Configures S3 client for Cloudflare R2 file storage |
| `middleware/authenticate.ts` | JWT + API Key authentication middleware + `authorize(roles[])` function |

### Auth Module (`src/modules/auth/`)
| File | Purpose |
|---|---|
| `auth.routes.ts` | 6 routes: login, register, google, me, verify-otp, resend-otp |
| `auth.controller.ts` | Request handlers — extracts data, calls service, returns response |
| `auth.service.ts` | Business logic — password hashing, Google token verification, OTP management, student ID generation |

### Feed Module (`src/modules/feed/`)
| File | Purpose |
|---|---|
| `feed.routes.ts` | 5 routes: list posts, get by slug, create, toggle like, toggle bookmark |
| `feed.controller.ts` | Request handlers for feed operations |
| `feed.service.ts` | Business logic — Prisma queries, slug generation, interaction toggling |

### University Module (`src/modules/universities/`)
| File | Purpose |
|---|---|
| `universities.routes.ts` | 5 routes: CRUD for universities (public read, admin write) |
| `universities.controller.ts` | Request handlers for university operations |
| `universities.service.ts` | Business logic for university queries |

### Admin Module (`src/modules/admin/`)
| File | Purpose |
|---|---|
| `admin.routes.ts` | 3 routes: list users, create user, toggle user status |
| `admin.controller.ts` | Handlers with pagination, search, role-based user creation |

### Community Module (`src/modules/community/`)
| File | Purpose |
|---|---|
| `community.routes.ts` | 8 routes: posts CRUD, voting, comments CRUD, comment voting |
| `community.controller.ts` | Request handlers for the Reddit-style forum |
| `community.service.ts` | Business logic — threaded comments, vote toggling, score updates |

### Upload Module (`src/modules/upload/`)
| File | Purpose |
|---|---|
| `upload.routes.ts` | 1 route: `POST /api/upload/image` |
| `upload.controller.ts` | Handles multipart file → uploads to Cloudflare R2 → returns URL |

### Mail Module (`src/modules/mail/`)
| File | Purpose |
|---|---|
| `mail.service.ts` | Two HTML email templates: Welcome Email + OTP Verification Email |

---

## `apps/web/` — React Frontend (Vite)

### Core
| File | Purpose |
|---|---|
| `package.json` | Frontend dependencies (react, react-router, @react-oauth/google, etc.) |
| `.env` | Frontend env vars (`VITE_GOOGLE_CLIENT_ID`) |
| `vite.config.ts` | Vite build configuration |
| `tailwind.config.js` | TailwindCSS theme customization |
| `index.html` | HTML shell — single `<div id="root">` element |
| `src/main.tsx` | React entry — wraps App in `AuthProvider` + `GoogleOAuthProvider` |
| `src/App.tsx` | **Master router** — 100+ route definitions organized by user role |
| `src/index.css` | Global CSS imports (Tailwind base/components/utilities) |
| `src/App.css` | Minimal app-level overrides |
| `src/animations.css` | CSS keyframe animations |

### Context Providers (`src/context/`)
| File | Purpose |
|---|---|
| `AuthContext.tsx` | Login/logout/signup state + localStorage token persistence |
| `UserProfileContext.tsx` | Rich student profile with strength calculation (localStorage-backed) |
| `SavedItemsContext.tsx` | Bookmarked colleges, courses, accommodations, posts (localStorage-backed) |
| `NotificationContext.tsx` | Notification list and unread count (mock data) |

### Shared Contexts (`src/shared/contexts/`)
| File | Purpose |
|---|---|
| `PostsContext.tsx` | Shared feed post state — `addPost()` for instant UI updates |

### API Services (`src/services/`)
| File | Connects To | Purpose |
|---|---|---|
| `feedService.ts` | `localhost:4000/api/feed` | CRUD for feed posts + like/bookmark toggles |
| `universityService.ts` | `localhost:3001` ⚠️ | CRUD for universities + image upload |
| `communityService.ts` | `localhost:4000/api/community` | Community forum posts, comments, votes |
| `aiService.ts` | N/A (mock) | Hardcoded keyword-matching AI responses |

### Layouts (`src/layouts/`)
| File | Purpose |
|---|---|
| `MainLayout.tsx` | Student dashboard shell (sidebar + content area) |
| `SuperAdminLayout.tsx` | Admin panel shell (admin sidebar + header + content) |
| `ConsultantLayout.tsx` | Counsellor dashboard shell |
| `UniversityLayout.tsx` | University portal shell |

### Pages (`src/pages/`) — 84 files

#### Authentication
| File | Route | Purpose |
|---|---|---|
| `Login.tsx` | `/login` | Google OAuth + email/password login |
| `Signup.tsx` | `/signup` | Registration form |
| `ForgotPassword.tsx` | `/forgot-password` | Password reset |
| `Verification.tsx` | `/verification` | OTP entry page |

#### Student Dashboard
| File | Route | Purpose |
|---|---|---|
| `HomeDashboard.tsx` | `/dashboard` | Main student home with stats panels |
| `Feed.tsx` | `/feed` | News/scholarship feed with filtering |
| `FeedDetails.tsx` | `/feed-details/:id` | Full post view with interactions |
| `CommunityFeed.tsx` | `/community-feed` | Reddit-style Q&A forum |
| `CollegeFinder.tsx` | `/colleges` | University search with advanced filters |
| `CollegeDetails.tsx` | `/college-details` | University deep-dive page |
| `Courses.tsx` | `/courses` | Course listing |
| `CourseDetails.tsx` | `/course-details` | Course details + requirements + fees |
| `ApplicationDashboard.tsx` | `/applications` | Application tracker |
| `DocumentsDashboard.tsx` | `/documents` | Document management |
| `MyProfile.tsx` | `/profile` | Profile view |
| `EditProfile.tsx` | `/profile/edit` | Profile editor |
| `AskAI.tsx` | `/ai-profile` | "Guide Buddy" chat interface |

#### SuperAdmin
| File | Route | Purpose |
|---|---|---|
| `Superadmin.tsx` | `/Superadmin` | Admin overview dashboard |
| `SuperAdminUserManagement.tsx` | `/Superadmin/users` | User CRUD table |
| `SuperAdminUniversityManagement.tsx` | `/Superadmin/universities` | University CRUD management |
| `SuperAdminUniversityProfile.tsx` | `/Superadmin/university/:id` | Single university view |
| `SuperAdminPostFeedDashboard.tsx` | `/Superadmin/.../posts-feed` | Post listing and management |
| `SuperAdminNewPost.tsx` | `/Superadmin/.../posts-feed/new` | Create new post form |
| `SuperAdminPostDetails.tsx` | `/Superadmin/.../posts-feed/:id` | Edit/view single post |

#### Counsellor
| File | Route | Purpose |
|---|---|---|
| `ConsultantDashboard.tsx` | `/counsellor-dashboard` | Counsellor home |
| `ConsultantStudents.tsx` | `/counsellor-students` | Student list management |
| `ConsultantSchedule.tsx` | `/counsellor-schedule` | Calendar and appointments |
| `ConsultantTasks.tsx` | `/counsellor-tasks` | Task tracking |

#### Other Features
| File | Route | Purpose |
|---|---|---|
| `Accommodation.tsx` | `/accommodation` | Housing search (60KB — very large, mock data) |
| `VisaPrep.tsx` | `/visas` | Visa preparation checklist |
| `LoanRequirements.tsx` | `/loans` | Loan guidance |
| `TestPrep.tsx` | `/test-prep` | IELTS preparation hub |
| `LandingPage.tsx` | `/landing` | Public marketing homepage |
| `AboutUs.tsx` | `/about` | Company info page |
| `Countries.tsx` | `/countries` | Study destination browser |
| `CountryDetails.tsx` | `/country/:code` | Country deep-dive (50KB) |

### Static Data (`src/data/`)
| File | Purpose |
|---|---|
| `universities.ts` | Hardcoded university listings for offline UI |
| `mockFeedData.ts` | Mock feed posts for fallback rendering |
| `blogs.ts` | Static blog content |
| `experts.ts` | Team member / counsellor profiles |
| `studentStories.ts` | Testimonial data |
| `readingTestContent.ts` | IELTS reading test passages |

### Components (`src/components/`) — 36 files
Key components listed in `03_FRONTEND_ARCHITECTURE.md`.

---

## `apps/admin/` — Next.js Admin (Scaffold)

| File | Purpose |
|---|---|
| `app/page.tsx` | Placeholder page: "Admin Dashboard Coming Soon" |
| `app/layout.tsx` | Next.js root layout |
| `package.json` | Next.js dependencies |

---

## `packages/` — Shared Libraries

### `packages/shared-types/`
| File | Purpose |
|---|---|
| `package.json` | Declares `zod` as dependency |
| `src/index.ts` | Exports shared Zod validation schemas between frontend and backend |

### `packages/ui/`
| File | Purpose |
|---|---|
| `src/` | Shared React UI components |
| `package.json` | React peer dependency |

### `packages/tailwind-config/`
Shared Tailwind theme tokens (colors, fonts, spacing) used by all apps.

### `packages/eslint-config/`
Shared ESLint rules enforced across all workspaces.

### `packages/typescript-config/`
Base `tsconfig.json` extended by all TypeScript projects.
