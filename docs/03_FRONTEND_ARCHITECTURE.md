# 03 — Frontend Architecture

The main user-facing app lives at `apps/web/`. It is a **React 18 + Vite + TypeScript** single-page application styled with **TailwindCSS**.

---

## Entry Point Chain

```
main.tsx → AuthProvider → GoogleOAuthProvider → App.tsx → BrowserRouter → Routes
```

1. `main.tsx` wraps the app in `AuthProvider` and `GoogleOAuthProvider`
2. `App.tsx` wraps routes in 4 additional context providers:
   - `NotificationProvider`
   - `SavedItemsProvider`
   - `UserProfileProvider`
   - `PostsProvider`

---

## Routing Map (84+ pages)

The app has an enormous number of routes organized into logical groups:

### Public Routes (No login required)
| Path | Page | Description |
|---|---|---|
| `/landing` | LandingPage | Marketing homepage |
| `/about` | AboutUs | Company information |
| `/team` | Team | Team members listing |
| `/countries` | Countries | Study destinations overview |
| `/country/:countryCode` | CountryDetails | Individual country deep-dive |
| `/blogs` | Blogs | Blog listing |
| `/blogs/:id` | BlogDetails | Individual blog post |
| `/testimonials` | Testimonials | Student success stories |
| `/terms` | TermsAndConditions | Legal terms |
| `/privacy-policy` | PrivacyPolicy | Privacy policy |
| `/cookie-policy` | CookiePolicy | Cookie policy |
| `/login` | Login | Google OAuth login page |
| `/signup` | Signup | Email registration |
| `/forgot-password` | ForgotPassword | Password recovery |

### Student Dashboard (Login required)
| Path | Page | Description |
|---|---|---|
| `/dashboard` | HomeDashboard | Main student home with stats and suggestions |
| `/feed` | Feed | Curated news/scholarship/event feed |
| `/feed-details/:id` | FeedDetails | Full post view with interactions |
| `/community-feed` | CommunityFeed | Reddit-style Q&A forum |
| `/courses` | Courses | Browse available courses |
| `/course-details` | CourseDetails | Individual course with requirements & fees |
| `/colleges` | CollegeFinder | University search with filters |
| `/college-details` | CollegeDetails | Individual college profile |
| `/applications` | ApplicationDashboard | Track all submitted applications |
| `/documents` | DocumentsDashboard | Upload/manage transcripts, SOPs, LORs |
| `/profile` | MyProfile | View/edit personal profile |
| `/profile/edit` | EditProfile | Edit profile fields |
| `/ai-profile` | AskAI | "Guide Buddy" AI chat assistant |
| `/visas` | VisaPrep | Visa preparation checklist |
| `/loans` | LoanRequirements | Education loan guidance |
| `/accommodation` | Accommodation | Student housing search |
| `/test-prep` | TestPrep | IELTS preparation hub |
| `/consultant` | Consultant | Book counsellor sessions |
| `/saved-colleges` | SavedColleges | Bookmarked universities |
| `/saved-courses` | SavedCourses | Bookmarked courses |
| `/referrals` | Referrals | Referral program |

### Application Wizard (Multi-step)
| Path | Page |
|---|---|
| `/application/details` | PersonalDetails |
| `/application/academic` | AcademicDetails |
| `/application/documents` | Documents |
| `/application/payment` | Payment |
| `/application/review` | Review |
| `/application/submitted` | ApplicationSubmitted |

### Profile Setup Wizard (Multi-step)
| Path | Page |
|---|---|
| `/profile-setup/basic` | BasicInfo |
| `/profile-setup/education` | Education |
| `/profile-setup/goals` | Goals |
| `/profile-setup/completed` | ProfileCompleted |

### Counsellor Portal (Role: `counsellor`, `admin`, `super_admin`)
| Path | Page |
|---|---|
| `/counsellor-dashboard` | ConsultantDashboard |
| `/counsellor-students` | ConsultantStudents |
| `/counsellor-schedule` | ConsultantSchedule |
| `/counsellor-tasks` | ConsultantTasks |
| `/counsellor-profile` | CounsellorProfile |
| `/counsellor-performance` | PerformanceRatingOverview |

### SuperAdmin Portal (Role: `admin`, `super_admin`)
| Path | Page |
|---|---|
| `/Superadmin` | Superadmin (Overview dashboard) |
| `/Superadmin/users` | SuperAdminUserManagement |
| `/Superadmin/universities` | SuperAdminUniversityManagement |
| `/Superadmin/university/:id` | SuperAdminUniversityProfile |
| `/Superadmin/university-portal/posts-feed` | SuperAdminPostFeedDashboard |
| `/Superadmin/university-portal/posts-feed/new` | SuperAdminNewPost |
| `/Superadmin/university-portal/posts-feed/:id` | SuperAdminPostDetails |

### Guest "Explore" Routes (browse without login)
| Path | Mirrors |
|---|---|
| `/explore/feed` | Feed |
| `/explore/community` | CommunityFeed |
| `/explore/courses` | Courses |
| `/explore/colleges` | CollegeFinder |
| `/explore/dashboard` | HomeDashboard |

---

## Layouts

There are **4 layout shells** that different route groups use:

| Layout | Used By | Sidebar? |
|---|---|---|
| `MainLayout` | Student routes (`/dashboard`, `/feed`, etc.) | ✅ Full sidebar with navigation |
| `SuperAdminLayout` | All `/Superadmin/*` routes | ✅ Admin sidebar (Overview, Universities, Posts, Users) |
| `ConsultantLayout` | All `/counsellor-*` routes | ✅ Counsellor sidebar |
| `UniversityLayout` | University portal routes | ✅ University-specific sidebar |

---

## Context Providers (Global State)

### 1. `AuthContext` — Core authentication state
- Stores: `user` object, `loading` flag, login modal state
- Methods: `login()`, `loginWithGoogle()`, `signup()`, `logout()`, `verifyOTP()`, `resendOTP()`
- Persists token in `localStorage` as `eaoverseas_token`
- Persists user data as `eaoverseas_user`

### 2. `UserProfileContext` — Rich user profile
- Stores: identity, guardian info, academics, preferences, readiness, documents, connections
- Calculates `profileStrength` (0-100%) based on filled fields
- Persists to `localStorage` per user email
- **Important Note:** This context uses **localStorage for persistence**, NOT the backend database. Profile data is currently client-side only.

### 3. `SavedItemsContext` — Bookmarked items
- Stores: saved colleges, courses, accommodations, posts, applications
- Toggle functions for add/remove
- All stored in `localStorage` per user email

### 4. `NotificationContext` — Notification state
- Stores notification list and unread count
- Currently uses mock data

### 5. `PostsContext` — Feed post state
- Shared `addPost()` function used by SuperAdmin to add posts and immediately see them in the feed

---

## Frontend Services (API Clients)

Located in `apps/web/src/services/`:

| Service | Base URL | Connects To |
|---|---|---|
| `feedService.ts` | `http://localhost:4000` | `GET/POST /api/feed` |
| `universityService.ts` | `http://localhost:3001` ⚠️ | `GET/POST /api/universities` |
| `communityService.ts` | `http://localhost:4000` | `GET/POST /api/community` |
| `aiService.ts` | N/A (local mock) | Hardcoded keyword responses |

> [!WARNING]
> **Bug Found:** `universityService.ts` defaults to `http://localhost:3001` instead of `http://localhost:4000`. This means university-related features will fail unless `VITE_API_URL` is set to `http://localhost:4000` in the `.env`.

---

## Static Data / Mock Data

Located in `apps/web/src/data/`:

| File | Content |
|---|---|
| `universities.ts` | Hardcoded university listings used in some UI pages |
| `mockFeedData.ts` | Fallback feed data for when the API is unreachable |
| `blogs.ts` | Static blog content |
| `experts.ts` | Counsellor/expert profiles for the team page |
| `studentStories.ts` | Testimonial content |
| `readingTestContent.ts` | IELTS reading test passages and questions |

---

## Key Component Files

| Component | File | Purpose |
|---|---|---|
| `ProtectedRoute` | `components/ProtectedRoute.tsx` | Wraps routes that require login; optionally restricts by role |
| `Navbar` | `components/Navbar.tsx` | Top navigation bar |
| `Sidebar` | `components/Sidebar.tsx` | Left navigation sidebar for student dashboard |
| `Footer` | `components/Footer.tsx` | Page footer with links |
| `PageHeader` | `components/PageHeader.tsx` | Breadcrumb + title + action buttons header |
| `LoginModal` | `components/LoginModal.tsx` | Popup login form triggered by `requireAuth()` |
| `BookingModal` | `components/BookingModal.tsx` | Counsellor booking popup |
| `EnquireModal` | `components/EnquireModal.tsx` | University enquiry form popup |
