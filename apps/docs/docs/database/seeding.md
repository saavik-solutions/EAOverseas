# Seeding Data

To ensure a smooth onboarding experience, the project includes a comprehensive seeding script that populates your local database with sample data.

## How to Seed

Once your database is running and migrations are applied, run:

```bash
cd backend
pnpm exec prisma db seed
```

## What gets seeded?

### 1. Admin User
- **Email**: `admin@eaoverseas.com`
- **Password**: `Admin@123`
- **Role**: `super_admin`

### 2. Sample Universities
We include several prestigious universities across different countries to test search and filtering:
- **Technical University of Munich (TUM)** - Germany
- **University of Oxford** - UK
- **Stanford University** - USA (optional)

### 3. Sample Courses
Each university includes at least 2 programs with full fee and requirement details:
- **M.Sc. in Informatics** (TUM)
- **Advanced Computer Science** (Oxford)

### 4. Feed Posts
A few initial news posts to populate the global feed on first load.

## Adding Custom Seed Data

You can add your own sample data by modifying `backend/prisma/seed.ts`. 

We use **Prisma's `upsert`** pattern to ensure that the seed command can be run multiple times without creating duplicate records.
