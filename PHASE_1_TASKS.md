# EA Overseas - Phase 1 Master Task List

This document contains a granular breakdown of all tasks required to complete Phase 1. 

> [!TIP]
> **Developer Handoff**: These tasks are ready to be copied into Jira, Linear, or Trello.

---

## 🔐 Auth & Identity Module
| ID | Role | Title | Description | Complexity |
|:---|:---|:---|:---|:---|
| **BE-01** | Backend | **JWT & Token Rotation** | Implement sign-up, sign-in, and refresh token rotation. Use `bcrypt` for password hashing and the new `authenticate` middleware. | 5pts |
| **BE-02** | Backend | **Email OTP Manager** | Build a service to generate, store (Prisma), and verify 6-digit OTPs for email verification. | 3pts |
| **BE-09** | Backend | **Google OAuth Integration** | Implement Google OIDC flow. Handle user creation or login on successful callback and return JWTs. | 5pts |
| **FE-01** | Frontend | **Auth State Management** | Setup Redux Toolkit / RTK Query for auth state. Implement persistence for `accessToken`. | 3pts |
| **FE-02** | Frontend | **Onboarding Flow** | Build the multi-step registration UI (Email -> OTP -> Profile Basics). Use shared Zod schemas for validation. | 5pts |

---

## 👤 Profile & Document Module
| ID | Role | Title | Description | Complexity |
|:---|:---|:---|:---|:---|
| **BE-03** | Backend | **Profile CRUD Service** | Implement the repository and service for updating `UserProfile`. Support academic history and target countries. | 5pts |
| **BE-04** | Backend | **S3 Document Upload** | Setup AWS SDK or generic S3 client for uploading transcripts and passports. Implement `UserDocument` records in DB. | 8pts |
| **FE-03** | Frontend | **Profile Workspace** | Create the profile management dashboard allowing students to upload documents and view "Profile Strength". | 5pts |

---

## 📰 Global Feed & News Module
| ID | Role | Title | Description | Complexity |
|:---|:---|:---|:---|:---|
| **BE-05** | Backend | **Modular Feed API** | Build routes for GET `/feed/global` and POST `/feed/global`. **POST must be restricted to API Keys or Admins.** | 5pts |
| **BE-06** | Backend | **Interaction Tracker** | Implement logic for User Likes/Bookmarks in the repository layer. Ensure relational integrity in `feed_interactions`. | 3pts |
| **FE-04** | Frontend | **Infinite Scroll Feed** | Build the global news UI with infinite scrolling and interactive Like/Bookmark buttons. | 5pts |

---

## 🎓 College Discovery Module
| ID | Role | Title | Description | Complexity |
|:---|:---|:---|:---|:---|
| **BE-07** | Backend | **Advanced Search & Filters** | Implement university search filtering by QS Ranking, Country, Fee, and acceptance rate. | 13pts |
| **BE-08** | Backend | **Course Mapping Service** | Logic to fetch specific `UniversityCourse` along with its associated `CourseRequirement` and `CourseFee`. | 8pts |
| **FE-05** | Frontend | **Discovery Dashboard** | Multi-faceted search interface for browsing universities and comparing courses. | 8pts |

---

## 🛠️ Infrastructure & Dev Experience
| ID | Role | Title | Description | Complexity |
|:---|:---|:---|:---|:---|
| **INF-01** | All | **Schema Synchronization** | Ensure all contributors run `prisma generate` and `pnpm install` regularly. | 1pt |
| **INF-02** | Backend | **API Key Management** | Build a script or internal-only endpoint to generate new `ApiKey` records for the Admin app. | 3pts |
| **INF-03** | Both | **Sentry Error Tracking** | Initialize Sentry in both Backend (Fastify) and Frontend (Next.js) for error reporting and tracing. | 3pts |

---

## Technical Standards for Developers
1.  **Backend (4-Layer Rule)**: Every module must follow `Route -> Controller -> Service -> Repository`. No direct DB calls in controllers.
2.  **Shared Types**: Always import validation schemas (Zod) from `@ea-overseas/shared-types`. Do not redefine schemas in local apps.
3.  **Error Handling**: Use the standardized `ApiError` class in the backend to ensure consistent JSON responses.
