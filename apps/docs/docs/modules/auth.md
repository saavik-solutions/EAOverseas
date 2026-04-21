# Auth Module

The Auth module handles user registration, authentication, and token management.

## Key Features

- **Registration**: Email-based registration with OTP verification.
- **Login**: Standard email/password login.
- **Token Management**: JWT access tokens and persistent refresh token rotation.
- **Security**: Password hashing with bcrypt (12 rounds) and Rate limiting on sensitive routes.

## Endpoints

| Method | Path | Description | Access |
| --- | --- | --- | --- |
| `POST` | `/api/v1/auth/register` | Create a new user account | Public |
| `POST` | `/api/v1/auth/verify-otp` | Verify email OTP | Public |
| `POST` | `/api/v1/auth/login` | Authenticate and get tokens | Public |
| `POST` | `/api/v1/auth/refresh` | Rotate refresh token | Public (Requires Cookie) |
| `POST` | `/api/v1/auth/logout` | Invalidate current session | Authenticated |

## Token Strategy

1. **Access Token**: Short-lived JWT (15 mins) sent in the `Authorization` header.
2. **Refresh Token**: Long-lived JWT (7 days) stored as an `HttpOnly` cookie.
3. **Rotation**: Every time `/refresh` is called, a new pair is issued and the old refresh token is revoked.

## Database Schema (Prisma)

```prisma
model User {
  id            String         @id @default(uuid())
  email         String         @unique
  passwordHash  String
  fullName      String
  role          Role           @default(student)
  // ... more fields
  refreshTokens RefreshToken[]
}

model RefreshToken {
  id        String   @id @default(uuid())
  token     String   @unique
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  expiresAt DateTime
  createdAt DateTime @default(now())
}
```
