# 02 — Backend Architecture

The backend is a standalone Fastify application located at `backend/`. It is the single source of truth for all data operations — the frontend never talks directly to the database.

---

## Entry Points

| File | Purpose |
|---|---|
| `src/server.ts` | Boots the Fastify server on `PORT` (default 4000) |
| `src/app.ts` | Registers all plugins (CORS, JWT, Multipart, Static) and mounts all route modules |

---

## Plugin Stack (registered in `app.ts`)

| Plugin | Config |
|---|---|
| `@fastify/cors` | Allows `localhost:5173` and `localhost:3000` |
| `@fastify/jwt` | Signs tokens with `JWT_SECRET` env var |
| `@fastify/cookie` | Used for refresh token storage |
| `@fastify/multipart` | File uploads up to 10MB |
| `@fastify/static` | Serves files from `uploads/` directory |

---

## Module Architecture (4-Layer Pattern)

Every feature follows this chain:

```
Route → Controller → Service → Prisma (Database)
```

| Layer | Responsibility | Example |
|---|---|---|
| **Route** (`*.routes.ts`) | Defines HTTP endpoints, attaches middleware (auth guards) | `app.post('/login', login)` |
| **Controller** (`*.controller.ts`) | Extracts request data, calls service, sends response | `const user = await authService.login(email, password)` |
| **Service** (`*.service.ts`) | Contains business logic, calls Prisma | `await prisma.user.findFirst(...)` |
| **Prisma** (`lib/prisma.ts`) | Auto-generated DB client from `schema.prisma` | Direct SQL abstraction |

---

## Backend Modules

### 1. `modules/auth/` — Authentication
**Routes:** `POST /api/auth/login`, `POST /api/auth/register`, `POST /api/auth/google`, `GET /api/auth/me`, `POST /api/auth/verify-otp`, `POST /api/auth/resend-otp`

**How it works:**
- **Email Login:** User sends email + password → backend verifies with `bcrypt.compare()` → returns JWT
- **Google OAuth:** Frontend gets an access token from Google → sends it to `/auth/google` → backend calls `googleapis.com/oauth2/v3/userinfo` to verify → if user exists, logs them in; if new, returns `{ isNewUser: true }` so the frontend can complete signup
- **Registration:** Creates user with hashed password → generates unique Student ID (`EAO-ST-XXXXXX`) → sends OTP email for verification
- **OTP Verification:** Compares submitted OTP against bcrypt-hashed OTP stored in `email_otps` table → marks user's `emailVerified = true`

### 2. `modules/feed/` — Posts & Feed
**Routes:** `GET /api/feed`, `GET /api/feed/:slug`, `POST /api/feed`, `POST /api/feed/:id/like`, `POST /api/feed/:id/bookmark`

**How it works:**
- **Reading:** Returns published posts with author info and university info joined. If user is logged in, also returns their interactions (liked/bookmarked status)
- **Creating:** SuperAdmin fills a form → data is sent to backend → core fields go into strict DB columns (`title`, `content`, `category`, `slug`) → everything else (SEO, event dates, scholarship details) goes into a flexible `metadata` JSON column
- **Interactions:** Toggle pattern — clicking "like" again removes it. Uses a unique constraint `[userId, postId, type]` to prevent duplicates

### 3. `modules/universities/` — University Management
**Routes:** `GET /api/universities`, `GET /api/universities/:id`, `POST /api/universities`, `PUT /api/universities/:id`, `DELETE /api/universities/:id`

- **Public:** Anyone can read university listings
- **Protected:** Only `admin` and `super_admin` roles can create/update/delete

### 4. `modules/admin/` — Admin User Management
**Routes:** `GET /api/admin/users`, `POST /api/admin/users`, `PATCH /api/admin/users/:id/status`

- **All routes guarded** by `authenticate` + `authorize(['super_admin', 'admin'])` hooks
- SuperAdmin can create new users with any role (bypasses OTP verification)
- Can activate/deactivate users (soft-disable, not delete)

### 5. `modules/community/` — Community Forum (Reddit-style)
**Routes:** `GET /api/community/posts`, `POST /api/community/posts`, `DELETE /api/community/posts/:id`, `POST /api/community/posts/:id/vote`, `GET /api/community/posts/:id/comments`, `POST /api/community/comments`, `POST /api/community/comments/:id/vote`, `DELETE /api/community/comments/:id`

- Supports upvote/downvote on both posts and comments
- Comments support nested replies (threaded via `parentId`)
- Posts can be marked as questions; comments can be flagged as "best answer"

### 6. `modules/upload/` — File Upload
**Routes:** `POST /api/upload/image`

- Accepts multipart file uploads
- Stores files in Cloudflare R2 (S3-compatible object storage)
- Returns the public URL of the uploaded file

### 7. `modules/mail/` — Email Service
- Not exposed as routes — used internally by `AuthService`
- Two email templates:
  1. **Welcome Email:** Sent after registration with Student ID and login credentials
  2. **OTP Email:** Sent with a 6-digit verification code (valid for 15 minutes)

---

## Authentication Middleware (`lib/middleware/authenticate.ts`)

Supports **two authentication strategies**:

1. **API Key** (`x-api-key` header) — For server-to-server communication. Looks up the key in the `api_keys` table
2. **JWT Bearer Token** (`Authorization: Bearer <token>`) — For user sessions. Decodes JWT and loads user from database

There's also an `authorize(roles[])` higher-order function that checks if the authenticated user has one of the required roles.

---

## Shared Libraries (`lib/`)

| File | Purpose |
|---|---|
| `prisma.ts` | Exports the singleton Prisma client and re-exports the `Role` enum |
| `nodemailer.ts` | Configures SMTP transport (`smtp.gmail.com:587`) |
| `s3.ts` | Initializes the S3 client for Cloudflare R2 uploads |
