# 07 — Known Issues, Bugs & Missing Pieces

This document catalogs every issue, inconsistency, and gap found during the codebase audit. Prioritized by severity.

---

## 🔴 Critical Issues

### 1. `universityService.ts` — Wrong Default API URL
**File:** `apps/web/src/services/universityService.ts` (line 1)
```typescript
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001'; // ← WRONG
```
**Problem:** The backend runs on port `4000`, but this service defaults to port `3001`. All university-related operations (listing, creating, editing from SuperAdmin panel) silently fail unless `VITE_API_URL` is explicitly set.
**Fix:** Change default to `'http://localhost:4000'`.

### 2. User Profile Data Lives in localStorage Only
**Files:** `apps/web/src/context/UserProfileContext.tsx`, `SavedItemsContext.tsx`
**Problem:** The `UserProfileContext` manages detailed student profile data (academics, guardian info, preferences, documents) but stores everything in `localStorage` instead of syncing with the backend `user_profiles` database table. If a user logs in on a different browser, all their profile data is lost.
**Impact:** Profile strength calculation, saved items, applications — all client-side-only.

### 3. No Backend Routes for Profile CRUD
**Problem:** The Prisma schema has a fully modeled `UserProfile`, `TestScore`, `EducationHistory`, `UserDocument` — but there are **zero backend API endpoints** to create/read/update these. The frontend has rich profile editing UI that saves to localStorage only.

### 4. AI Service is a Hardcoded Mock
**File:** `apps/web/src/services/aiService.ts`
**Problem:** The "Guide Buddy" AI assistant uses keyword matching (`if question.includes('visa')`) with canned responses. There is no AI model, API call, or ML integration. The `ai_comparisons` database table exists but has no backend service to populate it.

---

## 🟡 Medium Issues

### 5. Auth Hardcoded API URL
**File:** `apps/web/src/context/AuthContext.tsx` (line 30)
```typescript
const API_BASE_URL = 'http://localhost:4000/api';
```
**Problem:** Hardcoded to localhost. Will break in production unless updated to use `import.meta.env.VITE_API_URL`.

### 6. Community Service Hardcoded URL
**File:** `apps/web/src/services/communityService.ts` (line 1)
```typescript
const API_BASE = 'http://localhost:4000/api/community';
```
**Problem:** Same as above — hardcoded localhost URL.

### 7. Feed `category` Enum Mismatch
**Problem:** The frontend UI allows post types like `Article`, `Scholarship`, `Program`, `Announcement`, `Event`, `Guide`, `News`, `Webinar`. But the Prisma schema `FeedCategory` enum only allows: `admissions`, `scholarships`, `exams`, `news`, `visa`, `events`. The backend casts the category with `as any`, which means invalid categories silently persist and may cause query issues later.

### 8. SuperAdmin Layout Hardcoded User
**File:** `apps/web/src/layouts/SuperAdminLayout.tsx` (line 168)
```typescript
<p className="text-[#111318] text-xs font-bold truncate">James Wilson</p>
<p className="text-slate-500 text-[10px] truncate">Admin View</p>
```
**Problem:** The sidebar always shows "James Wilson" as the logged-in admin, regardless of who is actually signed in. Should read from `AuthContext`.

### 9. Missing Backend Modules
These features have full frontend UIs but **zero backend implementation**:
- **Visa Preparation** — `/visas` page with checklists and document requirements
- **Loan System** — `/loans`, `/loan-eligibility`, `/loan-documents`, `/lender-selection` pages
- **Accommodation** — `/accommodation` search and booking
- **Test Prep** — `/test-prep` with IELTS reading/writing/listening/speaking tests
- **Consultations** — Counsellor booking, scheduling, chat
- **Documents Upload** — Frontend upload UI exists but doesn't connect to the R2 upload endpoint
- **Application Workflow** — Multi-step wizard exists but application data goes to localStorage

### 10. MockData Contamination
**File:** `apps/web/src/context/UserProfileContext.tsx`
The `MOCK_USERS_DB` array and `mockProfile` object are embedded directly in production context code. The code even has a "pollution check" (line 315) to detect when mock data leaks into real user profiles. This indicates ongoing issues with test data contaminating production state.

---

## 🟢 Minor Issues

### 11. Duplicate UserProfile Interface
Both `SavedItemsContext.tsx` and `UserProfileContext.tsx` define their own `UserProfile` interface with different shapes, creating confusion about which is the source of truth.

### 12. Missing `VITE_API_URL` in Web `.env`
The `apps/web/.env` file only contains `VITE_GOOGLE_CLIENT_ID`. It should also set:
```
VITE_API_URL=http://localhost:4000
```

### 13. No Error Boundaries
The React app has no `ErrorBoundary` components. If any page crashes, the entire app shows a white screen.

### 14. No Loading States for Many Pages
Many pages fetch data on mount but don't show loading indicators while waiting for API responses.

### 15. `apps/admin` is Empty
The Next.js admin app has only a placeholder `page.tsx` with "Admin Dashboard Coming Soon". It's unclear whether this app duplicates the SuperAdmin routes already in the web app.

---

## Environment Variable Gaps

| Variable | Used In Code? | In `.env`? | Status |
|---|---|---|---|
| `VITE_API_URL` | ✅ universityService, feedService | ❌ Not set | **⚠️ Should be added** |
| `VITE_GOOGLE_CLIENT_ID` | ✅ main.tsx | ✅ | OK |
| `FRONTEND_URL` | ✅ mail.service.ts | ❌ Not set | Defaults to localhost:5173 |
| `SENTRY_DSN` | ❌ No code uses it | ❌ Removed | OK (cleaned up) |
| `FIREBASE_*` | ❌ No code uses it | ❌ Removed | OK (cleaned up) |
