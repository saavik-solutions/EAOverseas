# Role-Based Access Control (RBAC) Guide

This document outlines how EA Overseas manages user permissions, dashboard routing, and secure account provisioning.

## Role Definitions

The system uses a five-tier role system defined in the Prisma schema:

| Role | Responsibility | Dashboard Path |
| :--- | :--- | :--- |
| `student` | Discovery & Applications | `/student-dashboard` |
| `counsellor`| Student Counseling & Support | `/counsellor-dashboard` |
| `vendor` | University Management | `/university-panel/[id]` |
| `admin` | Regional/Sectional Oversight| `/Superadmin` |
| `super_admin`| Global Platform Control | `/Superadmin` |

---

## Authentication Flow

### 1. Registration
- **Public Signup**: Accessible via the `/signup` page. This flow is strictly locked to the `student` role.
- **Admin-Controlled Provisioning**: Non-student roles (Counsellors, Vendors, Admins) are created through the **Super Admin User Management Dashboard**. These accounts bypass OTP verification by default as they are trusted internal or partner accounts.

### 2. Login & Redirection
The login process identifies the user's role immediately after successful JWT generation. The frontend `Login.tsx` component then executes the following logic:

```typescript
const handleLogin = async (data) => {
  const user = await auth.login(data);
  const role = user.role;

  switch (role) {
    case 'super_admin':
    case 'admin':
      navigate('/Superadmin'); break;
    case 'counsellor':
      navigate('/counsellor-dashboard'); break;
    case 'vendor':
      navigate(`/university-panel/${user.id}`); break;
    default:
      navigate('/student-dashboard');
  }
};
```

---

## Security Middleware

### Backend Enforcement
Every protected route is wrapped in an `authorize` middleware that validates the user's session and role requirements:

```typescript
// Example: Creating a new Admin user
fastify.post('/users/admin', {
  preHandler: [authenticate, authorize(['super_admin', 'admin'])]
}, adminController.createAdminUser);
```

### Frontend Protection
The `ProtectedRoute` component wraps specific React routes to prevent unauthorized URL access by checking the `AuthContext` state.

---

## Summary of Recent Updates
- **Secure Signup**: Hardened `auth.service.ts` to prevent role injection during public registration.
- **User Management UI**: Added a premium dashboard in the SuperAdmin panel for managing and provisioning accounts.
- **Dynamic Redirection**: Fixed hardcoded paths to support multi-dashboard routing.
