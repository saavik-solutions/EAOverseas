# 10 — Development Roadmap & Recommendations

Based on the full codebase audit, this document outlines what needs to happen next — prioritized by impact and organized into actionable phases.

---

## Phase 1: Fix Critical Bugs (Immediate — 1-2 days)

These are blocking issues that need fixing before any new development.

### 1.1 Fix `universityService.ts` Wrong URL
**File:** `apps/web/src/services/universityService.ts`
**Action:** Change default from `http://localhost:3001` to `http://localhost:4000`
**Impact:** Fixes all university-related features in the SuperAdmin panel

### 1.2 Add `VITE_API_URL` to Frontend `.env`
**File:** `apps/web/.env`
**Action:** Add `VITE_API_URL="http://localhost:4000"`
**Impact:** Prevents services from connecting to wrong ports

### 1.3 Remove Hardcoded API URLs
**Files to update:**
- `context/AuthContext.tsx` → Use `import.meta.env.VITE_API_URL || 'http://localhost:4000'`
- `services/communityService.ts` → Same pattern
**Impact:** Makes the app production-deployable without code changes

### 1.4 Fix Feed Category Enum Mismatch
**Problem:** Frontend sends `Article`, `Scholarship`, etc. but DB enum expects `admissions`, `scholarships`, etc.
**Action:** Either update the Prisma enum to match the frontend types, or add a mapping layer in the backend service

### 1.5 Fix SuperAdmin Hardcoded User Name
**File:** `layouts/SuperAdminLayout.tsx`
**Action:** Replace "James Wilson" with actual user name from `AuthContext`

---

## Phase 2: Connect Frontend to Backend (1-2 weeks)

The largest gap in the project — many rich frontend UIs exist with no backend wiring.

### 2.1 Profile API
**Priority:** HIGH
**What to build:**
- `GET /api/profile` — Fetch current user's profile
- `PUT /api/profile` — Update profile fields
- `POST /api/profile/test-scores` — Add test scores
- `POST /api/profile/education` — Add education history

**Frontend changes:** Modify `UserProfileContext` to fetch/save from API instead of localStorage

### 2.2 Document Upload Integration
**Priority:** HIGH
**What to build:**
- Connect `DocumentsDashboard.tsx` to the existing `/api/upload/image` endpoint
- Create `POST /api/documents` endpoint to save document metadata to the `user_documents` table
- Add `GET /api/documents` to list user's uploaded documents

### 2.3 Application Workflow API
**Priority:** HIGH
**What to build:**
- `POST /api/applications` — Submit an application
- `GET /api/applications` — List user's applications
- `PATCH /api/applications/:id` — Update application status

**Frontend changes:** Modify `SavedItemsContext.submitApplication()` to call backend instead of localStorage

### 2.4 Saved Items API
**Priority:** MEDIUM
**What to build:**
- `POST /api/saved-colleges` — Save/unsave a college
- `GET /api/saved-colleges` — List saved colleges
- Similar endpoints for courses

**Frontend changes:** Modify `SavedItemsContext` toggle functions to call backend

---

## Phase 3: Build Missing Backend Modules (2-4 weeks)

### 3.1 Counsellor Module
**What to build:**
- Student assignment management
- Schedule/appointment CRUD
- Task tracking
- Performance metrics

**DB tables needed:** New models for `Appointment`, `CounsellorTask`, `StudentAssignment`

### 3.2 Visa Module
**What to build:**
- Visa checklist CRUD per country
- Document requirement tracking
- Status tracking (not started → in progress → submitted → approved)

### 3.3 Loan Module
**What to build:**
- Loan eligibility calculator
- Lender directory
- Application tracking

### 3.4 Accommodation Module
**What to build:**
- Property listing CRUD
- Search with filters (location, price, type)
- Booking/enquiry system

### 3.5 Test Prep Module
**What to build:**
- Test content CRUD (currently all hardcoded in `readingTestContent.ts`)
- Score tracking and progress analytics
- Practice test session management

---

## Phase 4: AI Integration (2-3 weeks)

### 4.1 Replace Mock AI Service
**Current state:** `aiService.ts` uses keyword matching with canned responses
**What to build:**
- Integration with an actual LLM API (OpenAI, Google Gemini, etc.)
- Context-aware responses using the student's profile data
- College match score calculation to populate the `ai_comparisons` table

### 4.2 Action Plan Generation
**What to build:**
- Auto-generated milestone plans based on AI comparison results
- Populate the existing `action_plans` table
- Track completion percentage

---

## Phase 5: Production Readiness (1-2 weeks)

### 5.1 Security Hardening
- [ ] Remove all hardcoded fallback JWT secrets
- [ ] Add rate limiting to auth endpoints (use Redis)
- [ ] Implement refresh token rotation (DB table exists, logic doesn't)
- [ ] Add CSRF protection
- [ ] Sanitize all user inputs
- [ ] Add request validation with Zod schemas on backend routes

### 5.2 Error Handling
- [ ] Add React `ErrorBoundary` components
- [ ] Add global Fastify error handler
- [ ] Implement Sentry or similar error tracking

### 5.3 Performance
- [ ] Add database indexes for frequently queried fields
- [ ] Implement pagination on all list endpoints
- [ ] Add Redis caching for university data (static, rarely changes)
- [ ] Lazy-load route components in App.tsx

### 5.4 Deployment
- [ ] Update all hardcoded `localhost` URLs to use environment variables
- [ ] Configure production CORS origins
- [ ] Set up CI/CD pipeline
- [ ] Configure production database migrations (`prisma migrate`)

---

## Architecture Recommendations

### Short-Term Wins
1. **Centralize API base URL** — Create a single `src/config.ts` that exports `API_BASE_URL` and use it everywhere
2. **Remove mock data from context files** — Move to `src/data/` folder to keep contexts clean
3. **Decide on `apps/admin`** — Either build it out or remove it. Currently it duplicates what `apps/web`'s SuperAdmin pages already do

### Long-Term Improvements
1. **State Management** — Consider React Query (TanStack Query) for server state instead of raw `useEffect` + `fetch`. This gives you caching, refetching, and optimistic updates for free
2. **Form Validation** — Use `react-hook-form` + `zod` for all forms. The `packages/shared-types` Zod schemas are already there but unused
3. **API Client** — Generate a typed API client from an OpenAPI spec or use `tRPC` for end-to-end type safety
4. **Testing** — Zero tests exist currently. Start with integration tests for critical auth flows

---

## Quick Reference: What's Real vs Mock

| Feature | Data Source | Real or Mock? |
|---|---|---|
| Login / Registration | Backend API + PostgreSQL | ✅ Real |
| Feed Posts | Backend API + PostgreSQL | ✅ Real |
| University CRUD | Backend API + PostgreSQL | ✅ Real |
| Community Forum | Backend API + PostgreSQL | ✅ Real |
| File Upload | Backend API + Cloudflare R2 | ✅ Real |
| Email Sending | Nodemailer + Gmail SMTP | ✅ Real |
| User Profile Data | localStorage | 🟡 Mock/Local |
| Saved Items | localStorage | 🟡 Mock/Local |
| Applications | localStorage | 🟡 Mock/Local |
| AI Chat | Hardcoded keywords | 🔴 Mock |
| Visa Checklists | Hardcoded JSX | 🔴 Mock |
| Loan System | Hardcoded JSX | 🔴 Mock |
| Accommodation | Hardcoded JSX (60KB!) | 🔴 Mock |
| Test Prep | Hardcoded JSON data | 🔴 Mock |
| Counsellor Dashboard | Hardcoded JSX | 🔴 Mock |
| Country Details | Hardcoded JSX (50KB!) | 🔴 Mock |
| Blog Content | `src/data/blogs.ts` | 🔴 Mock |
| Expert Profiles | `src/data/experts.ts` | 🔴 Mock |
| Student Testimonials | `src/data/studentStories.ts` | 🔴 Mock |
| Notifications | Mock data in context | 🔴 Mock |
