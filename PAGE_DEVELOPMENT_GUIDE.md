# Page Development Guide: Admin & Partner Modules

This guide outlines the structure, features, and technical approach for the administrative and partner-facing modules of the EA Overseas platform.

---

## 1. Superadmin Module (In Progress)
The central nervous system of the platform, used by EA Overseas internal staff.

### 👤 Personas
- **Product Manager**: Needs high-level oversight of all applications, consultant performance, and platform growth.
- **UI/UX Designer**: Focuses on a dense but readable data dashboard with clear action items and status indicators.
- **Developer**: Implements complex data tables, global state management for platform settings, and secure admin-only routes.

### 📄 Subpages
1.  **Dashboard**: Real-time metrics (registrations, successful admissions, revenue).
2.  **University Management**: Table of partner institutions with onboarding status and contract details.
3.  **Consultant Oversight**: Performance tracking, student assignment reassignment, and rating reviews.
4.  **Application Master View**: Searchable list of every application in the system with filterable status.
5.  **Platform Settings**: Management of global variables (visa requirements, country lists, blog categories).

### 🛠️ Technical Implementation
- **Layout**: Use `ConsultantLayout` or a specialized `AdminLayout` with a secondary sidebar for settings.
- **Components**: Heavy use of `DataTable` with server-side sorting/filtering.
- **State**: Centralized Redux store for `platformControl`.

---

## 2. University Module (Planned)
The portal for partner institutions to manage their presence and incoming student leads.

### 👤 Personas
- **Product Manager**: Wants to increase the quality of applications and streamline the verification process for the legal team.
- **UI/UX Designer**: Institutional branding focus—making the university feel like they have a dedicated, professional "home" on the platform.
- **Developer**: Focuses on "Profile as a Product" (universities editing their own data) and document management for admissions.

### 📄 Subpages
1.  **Institutional Profile**: Editable landing page for the university (images, bio, contact info).
2.  **Course Management**: Create/Edit/Delete programs, tuition fees, and intake dates.
3.  **Application Inbox**: List of students who have applied or expressed interest.
4.  **Inquiry Manager**: Direct chat with consultants regarding specific student queries.
5.  **Analytics**: Performance of their courses on the platform (views vs. applications).

### 🛠️ Technical Implementation
- **Layout**: `InstitutionalLayout` with navigation focused on "Admissions", "Courses", and "Profile".
- **State**: RTK Query for fetching school-specific data.

---

## 3. Vendor Module (Planned)
The interface for service providers (Insurance, Accommodation, Test Centers).

### 👤 Personas
- **Product Manager**: Aims to build a marketplace ecosystem where vendors can efficiently offer peripheral services to students.
- **UI/UX Designer**: Service-card focused design. Needs to showcase service value quickly to both students and admins.
- **Developer**: Implements referral tracking and service integration (if API-based).

### 📄 Subpages
1.  **Service Dashboard**: Overview of lead conversions and active student interactions.
2.  **Service Listing**: Management of specific offerings (e.g., "Silver Room in London", "IELTS Silver Plan").
3.  **Lead Management**: List of students who have requested the vendor's services.
4.  **Payouts & Commissions**: Historical record of earnings from referred students.
5.  **Partnership Settings**: Legal agreements and contact points for the vendor.

### 🛠️ Technical Implementation
- **Layout**: `VendorLayout` with a simplified marketplace-style sidebar.
- **State**: Use `SavedItemsContext` patterns for service interest tracking.

---

## General Development Rules
1.  **Layered Architecture**: Keep UI pure, logic in Behavior, and API calls in Services.
2.  **Aesthetics**: Use the "EA Overseas Blue" (`#0d6cf2`) for primaries and high-quality Unsplash images for role-specific banners.
3.  **Routing**: All new subpages must be added to `App.tsx` and protected by the appropriate authentication context.
