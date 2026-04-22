# 08 — Environment Configuration

This document explains every environment variable used across the project, which service needs it, and where it should be placed.

---

## `.env` File Locations

The project has **3 separate `.env` files** — each scoped to a different workspace:

| File | Used By | Notes |
|---|---|---|
| `EAOverseas/.env` | Root (Turborepo inherits) | Picked up by `turbo` and may be inherited by child workspaces |
| `EAOverseas/backend/.env` | Backend (Fastify/Prisma) | The primary config file for the API server |
| `EAOverseas/apps/web/.env` | Frontend (Vite/React) | Must prefix all vars with `VITE_` for browser access |

> [!IMPORTANT]
> **Vite Rule:** Only variables prefixed with `VITE_` are exposed to the browser bundle. All other env vars in `apps/web/.env` are silently ignored by Vite.

---

## Backend Environment Variables (`backend/.env`)

### Server Config
| Variable | Example Value | Used In | Required? |
|---|---|---|---|
| `PORT` | `4000` | `server.ts` | ✅ (defaults to 4000) |
| `NODE_ENV` | `development` | General | Optional |

### Database
| Variable | Example Value | Used In | Required? |
|---|---|---|---|
| `DATABASE_URL` | `postgresql://user:pass@host:port/db` | `prisma/schema.prisma` | ✅ Critical |

This is the **most important variable**. Prisma reads it directly from the schema file. Without it, nothing works.

### Security / JWT
| Variable | Example Value | Used In | Required? |
|---|---|---|---|
| `JWT_SECRET` | `"ea_overseas_secure_access_token_secret_2026"` | `app.ts` (Fastify JWT plugin), `authenticate.ts` middleware | ✅ Critical |
| `JWT_REFRESH_SECRET` | `"ea_overseas_secure_refresh_token_secret_2026"` | Refresh token signing (planned) | Optional (not actively used yet) |
| `JWT_EXPIRES_IN` | `"15m"` | Token expiration | Optional (not actively used) |
| `JWT_REFRESH_EXPIRES_IN` | `"7d"` | Refresh token expiration | Optional (not actively used) |

> [!WARNING]
> The `authenticate.ts` middleware falls back to `'supersecret'` if `JWT_SECRET` is not set. The `app.ts` falls back to `'ea_overseas_secure_secret_2026'`. These are **different fallbacks** — make sure `JWT_SECRET` is always set to avoid mismatch.

### Redis
| Variable | Example Value | Used In | Required? |
|---|---|---|---|
| `REDIS_URL` | `redis://default:pass@host:port` | Currently unused in code | ❌ Not used |

Redis is configured in `.env` but there is **no Redis client code** in the backend. It was planned for OTP caching and rate limiting but the current implementation uses PostgreSQL directly.

### Google OAuth
| Variable | Example Value | Used In | Required? |
|---|---|---|---|
| `GOOGLE_CLIENT_ID` | `"83804886870-....apps.googleusercontent.com"` | Not used in backend code | ❌ Backend doesn't need it |
| `GOOGLE_CLIENT_SECRET` | `"GOCSPX-..."` | Not used in backend code | ❌ Backend doesn't need it |
| `GOOGLE_CALLBACK_URL` | `"https://eaoverseas-v1.onrender.com"` | Not used in backend code | ❌ Backend doesn't need it |

> [!NOTE]
> The backend's Google auth works by verifying the **access token** directly with Google's userinfo API, so it doesn't need the client ID/secret. These are only needed by the frontend.

### Cloudflare R2 (File Storage)
| Variable | Example Value | Used In | Required? |
|---|---|---|---|
| `R2_ACCESS_KEY_ID` | `"2859efd..."` | `lib/s3.ts` | ✅ For file uploads |
| `R2_SECRET_ACCESS_KEY` | `"f724a3d..."` | `lib/s3.ts` | ✅ For file uploads |
| `R2_BUCKET_NAME` | `"eaoverseas"` | Upload controller | ✅ For file uploads |
| `R2_ENDPOINT` | `"https://....r2.cloudflarestorage.com"` | `lib/s3.ts` | ✅ For file uploads |
| `R2_PUBLIC_URL` | `"https://pub-....r2.dev"` | Upload controller (return public URL) | ✅ For file uploads |

### Email (SMTP)
| Variable | Example Value | Used In | Required? |
|---|---|---|---|
| `SMTP_HOST` | `"smtp.gmail.com"` | `lib/nodemailer.ts` | ✅ For emails |
| `SMTP_PORT` | `587` | `lib/nodemailer.ts` | ✅ For emails |
| `SMTP_USER` | `"Saaviksolutions@gmail.com"` | `lib/nodemailer.ts` | ✅ For emails |
| `SMTP_PASS` | `"ggqp tzwe gtsg jyem"` | `lib/nodemailer.ts` | ✅ For emails |
| `FROM_EMAIL` | `"saaviksolutions@gmail.com"` | `mail.service.ts` | ✅ For emails |

> [!NOTE]
> `SMTP_PASS` is a **Google App Password**, not a regular Gmail password. To generate one: Google Account → Security → 2-Step Verification → App Passwords.

---

## Frontend Environment Variables (`apps/web/.env`)

| Variable | Example Value | Used In | Required? |
|---|---|---|---|
| `VITE_GOOGLE_CLIENT_ID` | `"83804886870-....apps.googleusercontent.com"` | `main.tsx` (GoogleOAuthProvider) | ✅ Critical for login |
| `VITE_API_URL` | `"http://localhost:4000"` | `universityService.ts`, `feedService.ts` | ⚠️ **Should be set** — defaults cause issues |

### Current `apps/web/.env`
```env
VITE_GOOGLE_CLIENT_ID="83804886870-a3chiagctus9eldcc2n3vvkff4lk0di3.apps.googleusercontent.com"
```

### Recommended `apps/web/.env`
```env
VITE_GOOGLE_CLIENT_ID="83804886870-a3chiagctus9eldcc2n3vvkff4lk0di3.apps.googleusercontent.com"
VITE_API_URL="http://localhost:4000"
```

---

## Variables That Were Removed (Unused)

These were in the `.env` files previously but were removed because no code references them:

| Variable | Reason Removed |
|---|---|
| `FIREBASE_API_KEY` | No Firebase code in backend or frontend |
| `FIREBASE_AUTH_DOMAIN` | No Firebase code in backend or frontend |
| `FIREBASE_PROJECT_ID` | No Firebase code in backend or frontend |
| `FIREBASE_STORAGE_BUCKET` | No Firebase code in backend or frontend |
| `FIREBASE_MESSAGING_SENDER_ID` | No Firebase code in backend or frontend |
| `FIREBASE_APP_ID` | No Firebase code in backend or frontend |
| `FIREBASE_MEASUREMENT_ID` | No Firebase code in backend or frontend |
| `SENTRY_DSN` | No Sentry integration code exists |
