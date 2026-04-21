# Authentication & Security Architecture

EA Overseas uses a **Dual-Layer Authentication Strategy** to support both user sessions and service-to-service communication.

---

## 🔑 Authentication Methods

### 1. User Authentication (JWT)
Students and partners use standard JSON Web Tokens.
-   **Header**: `Authorization: Bearer <TOKEN>`
-   **Storage**: Access tokens are stored in memory (Frontend Redux), while Refresh Tokens are kept in an `HttpOnly` cookie.
-   **Processing**: Handled by the `authenticate` middleware via `jwt.verify`.

### 2. Service Authentication (API Keys)
Administrative tools and internal microservices communicate via API Keys.
-   **Header**: `x-api-key: <KEY>`
-   **Identity**: Every API Key is linked to a `ServiceAccount` context with a defined `Role` (e.g., `admin`).
-   **Processing**: Handled by the `authenticate` middleware via a secure Prisma query.

---

## 🛡️ Authorization (RBAC)

We use **Role-Based Access Control** to restrict sensitive operations.

### Roles Table
| Role | Access Level |
|:---|:---|
| `student` | Browse feed, build profile, save colleges. |
| `vendor` | Post specific scholarship/event data (TBD). |
| `admin` | Manage colleges, verify documents. |
| `super_admin` | Full system access, manage API Keys. |

### Usage Example (Backend)
```typescript
import { authenticate, authorize } from '../lib/middleware/authenticate';

// Protect a route
fastify.post('/universities', {
  preHandler: [authenticate, authorize(['admin', 'super_admin'])]
}, async (request, reply) => {
  // Logic here
});
```

---

## 📁 Related Files
-   **Middleware**: `backend/src/lib/middleware/authenticate.ts`
-   **Prisma Client**: `backend/prisma/schema.prisma` (See `ApiKey` model)
-   **Shared Types**: `@ea-overseas/shared-types` (Centralized Zod schemas)
