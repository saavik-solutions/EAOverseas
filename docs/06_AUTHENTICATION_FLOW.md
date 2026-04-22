# 06 — Authentication Flow

This document traces every step of the login/registration process from the moment a user clicks "Sign In" to when they see their dashboard.

---

## Flow 1: Google OAuth Login (Primary Method)

```mermaid
sequenceDiagram
    participant U as User Browser
    participant G as Google OAuth
    participant F as Frontend (React)
    participant B as Backend (Fastify)
    participant DB as PostgreSQL

    U->>G: 1. Click "Sign in with Google"
    G->>F: 2. Return Google Access Token
    F->>B: 3. POST /api/auth/google { token }
    B->>G: 4. GET googleapis.com/oauth2/v3/userinfo
    G->>B: 5. Return { sub, email, name, picture }
    B->>DB: 6. Find user by googleId or email
    alt User exists
        B->>F: 7a. Return { user, JWT token }
        F->>U: 8a. Store token in localStorage, redirect to /dashboard
    else New user
        B->>F: 7b. Return { isNewUser: true, email, fullName, googleId, avatarUrl }
        F->>U: 8b. Redirect to /signup with pre-filled data
        U->>F: 9b. Complete signup form (select role)
        F->>B: 10b. POST /api/auth/register { email, fullName, googleId, avatarUrl, role }
        B->>DB: 11b. Create user (emailVerified=true, authProvider=google)
        B->>F: 12b. Return { user, JWT token }
        F->>U: 13b. Store token, redirect to /profile-setup
    end
```

### Key Details:
- The frontend uses `@react-oauth/google` with an **implicit flow** (gets access token, not ID token)
- The backend verifies the token by calling Google's userinfo endpoint directly
- Google-authenticated users skip OTP verification (`emailVerified` is set to `true` immediately)
- If the email already exists in the DB but without a `googleId`, the backend **links** the Google account to the existing user

---

## Flow 2: Email/Password Registration

```mermaid
sequenceDiagram
    participant U as User Browser
    participant F as Frontend
    participant B as Backend
    participant DB as PostgreSQL
    participant M as Gmail SMTP

    U->>F: 1. Fill signup form (name, email, password)
    F->>B: 2. POST /api/auth/register { email, password, fullName, role: "student" }
    B->>DB: 3. Check if email already exists
    alt Email exists
        B->>F: 4a. 400 "User with this email already exists"
    else New email
        B->>DB: 4b. Create user (emailVerified=false)
        B->>DB: 5. Generate Student ID (EAO-ST-XXXXXX)
        B->>DB: 6. Create EmailOTP record (bcrypt-hashed 6-digit code)
        B->>M: 7. Send OTP email via Nodemailer
        B->>F: 8. Return { user, JWT token }
        F->>U: 9. Redirect to /verification page
        U->>F: 10. Enter 6-digit OTP
        F->>B: 11. POST /api/auth/verify-otp { otp }
        B->>DB: 12. Compare OTP hash, mark emailVerified=true
        B->>M: 13. Send Welcome Email with credentials
        B->>F: 14. Return { success: true }
        F->>U: 15. Redirect to /profile-setup
    end
```

### Key Details:
- Only `student` role is allowed for public registration; other roles require admin creation
- OTPs expire after **15 minutes** and allow **max 5 attempts**
- The OTP is hashed with bcrypt before storage (never stored in plaintext)
- Users can request a new OTP via `/api/auth/resend-otp` (invalidates all previous OTPs)

---

## Flow 3: Email/Password Login

```mermaid
sequenceDiagram
    participant U as User Browser
    participant F as Frontend
    participant B as Backend
    participant DB as PostgreSQL

    U->>F: 1. Enter email + password
    F->>B: 2. POST /api/auth/login { email, password }
    B->>DB: 3. Find user by email (isActive=true)
    B->>B: 4. bcrypt.compare(password, passwordHash)
    alt Valid credentials
        B->>F: 5a. Return { user, JWT token }
        F->>U: 6a. Store in localStorage, redirect based on role
    else Invalid
        B->>F: 5b. 401 "Invalid credentials"
    end
```

---

## Token Storage (Frontend)

| Key | Value | Purpose |
|---|---|---|
| `eaoverseas_token` | JWT string | Sent as `Authorization: Bearer <token>` header |
| `eaoverseas_user` | JSON string | Cached user object (name, email, role, id) |

---

## Role-Based Redirect After Login

The `Login.tsx` page checks the user's role and redirects accordingly:

| Role | Redirects To |
|---|---|
| `super_admin` | `/Superadmin` |
| `admin` | `/Superadmin` |
| `counsellor` | `/counsellor-dashboard` |
| `student` | `/dashboard` |

---

## Protected Route Guard

The `ProtectedRoute` component:
1. Checks if `user` exists in `AuthContext`
2. If no user → shows `LoginModal`
3. If `allowedRoles` prop is set → also checks if `user.role` is in the allowed list
4. If role not allowed → redirects to `/dashboard`
