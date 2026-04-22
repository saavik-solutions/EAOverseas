# 05 — API Reference

Complete list of all backend API endpoints, their methods, authentication requirements, and purpose.

**Base URL:** `http://localhost:4000`

---

## Health Check

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/api/health` | None | Returns `{ status: "ok", timestamp: "..." }` |

---

## Authentication (`/api/auth`)

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/api/auth/login` | None | Email + password login. Returns `{ user, token }` |
| `POST` | `/api/auth/register` | None | Create account. Body: `{ email, password, fullName, role, mobile? }`. Returns `{ user, token }` |
| `POST` | `/api/auth/google` | None | Google OAuth. Body: `{ token }` (Google access token). Returns `{ user, token }` or `{ isNewUser: true, email, fullName, googleId, avatarUrl }` |
| `GET` | `/api/auth/me` | 🔒 JWT | Returns the authenticated user's profile |
| `POST` | `/api/auth/verify-otp` | 🔒 JWT | Body: `{ otp }`. Verifies email and marks `emailVerified = true` |
| `POST` | `/api/auth/resend-otp` | 🔒 JWT | Generates and sends a new OTP code |

---

## Feed Posts (`/api/feed`)

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/api/feed` | Optional JWT | List published posts. Query params: `?category=&universityId=&limit=` |
| `GET` | `/api/feed/:slug` | Optional JWT | Get single post by URL slug. Returns user interaction state if logged in |
| `POST` | `/api/feed` | 🔒 JWT | Create new post. Body: `{ title, content, category, tags[], universityId?, status?, ... }` |
| `POST` | `/api/feed/:id/like` | 🔒 JWT | Toggle like on a post. Returns `{ action: "added"|"removed", type: "like" }` |
| `POST` | `/api/feed/:id/bookmark` | 🔒 JWT | Toggle bookmark on a post. Returns `{ action: "added"|"removed", type: "bookmark" }` |

---

## Universities (`/api/universities`)

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/api/universities` | None | List all universities. Query params: `?search=&country=` |
| `GET` | `/api/universities/:id` | None | Get university by ID or slug |
| `POST` | `/api/universities` | 🔒 Admin only | Create university. Body: university data object |
| `PUT` | `/api/universities/:id` | 🔒 Admin only | Update university |
| `DELETE` | `/api/universities/:id` | 🔒 Admin only | Delete university |

---

## Admin User Management (`/api/admin`)

> All routes require `authenticate` + `authorize(['admin', 'super_admin'])`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/api/admin/users` | 🔒 Admin | List users with pagination. Query: `?role=&page=&limit=&search=` |
| `POST` | `/api/admin/users` | 🔒 Admin | Create user with any role (bypasses OTP). Body: `{ email, password, fullName, role, phone? }` |
| `PATCH` | `/api/admin/users/:id/status` | 🔒 Admin | Activate/deactivate user. Body: `{ isActive: boolean }` |

---

## Community Forum (`/api/community`)

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/api/community/posts` | Optional JWT | List community posts. Query: `?category=&search=&limit=` |
| `POST` | `/api/community/posts` | 🔒 JWT | Create post. Body: `{ title, content?, imageUrl?, category?, tags[], isQuestion?, isAnonymous? }` |
| `DELETE` | `/api/community/posts/:id` | 🔒 JWT | Delete own post |
| `POST` | `/api/community/posts/:id/vote` | 🔒 JWT | Vote on post. Body: `{ value: "up"|"down" }` |
| `GET` | `/api/community/posts/:id/comments` | Optional JWT | Get comments for a post (threaded) |
| `POST` | `/api/community/comments` | 🔒 JWT | Add comment. Body: `{ postId, text, parentId?, isAnswer? }` |
| `POST` | `/api/community/comments/:id/vote` | 🔒 JWT | Vote on comment. Body: `{ value: "up"|"down" }` |
| `DELETE` | `/api/community/comments/:id` | 🔒 JWT | Delete own comment |

---

## File Upload (`/api/upload`)

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/api/upload/image` | None | Upload image file (multipart). Max 10MB. Returns `{ url: "..." }` |

---

## Authentication Headers

### JWT Bearer Token
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```
The token is obtained from login/register/Google auth responses and stored by the frontend in `localStorage` as `eaoverseas_token`.

### API Key (Server-to-Server)
```
x-api-key: your-api-key-hash
```
Used by the admin console or external services. Keys are stored in the `api_keys` database table.

---

## Common Error Response Format

All errors follow this shape:
```json
{
  "error": "Short error title",
  "message": "Detailed explanation (optional)"
}
```

HTTP status codes used:
- `400` — Bad request / validation error
- `401` — Unauthorized (missing or invalid token)
- `403` — Forbidden (insufficient role)
- `404` — Resource not found
- `409` — Conflict (duplicate entry)
- `500` — Internal server error
