# 04 — Database Schema (PostgreSQL + Prisma)

All data is stored in a single **PostgreSQL** database hosted on Railway. The schema is defined in `backend/prisma/schema.prisma` and accessed via the Prisma ORM.

---

## Database Connection

```
DATABASE_URL = "postgresql://postgres:****@shinkansen.proxy.rlwy.net:52484/railway"
```

To regenerate the Prisma client after schema changes:
```bash
cd backend
npx prisma generate
```

To push schema changes to the database:
```bash
npx prisma db push
```

---

## Entity Relationship Diagram

```mermaid
erDiagram
    User ||--o{ RefreshToken : has
    User ||--o{ EmailOTP : has
    User ||--o| UserProfile : has
    User ||--o{ TestScore : has
    User ||--o{ EducationHistory : has
    User ||--o{ UserDocument : has
    User ||--o{ FeedPost : authors
    User ||--o{ FeedInteraction : makes
    User ||--o{ SavedCollege : saves
    User ||--o{ AIComparison : requests
    User ||--o{ ActionPlan : creates
    User ||--o{ Application : submits
    User ||--o{ CommunityPost : writes
    User ||--o{ CommunityComment : writes
    User ||--o{ CommunityVote : casts

    University ||--o{ UniversityCourse : offers
    University ||--o{ FeedPost : tagged_in

    UniversityCourse ||--o| CourseRequirement : has
    UniversityCourse ||--o| CourseFee : has
    UniversityCourse ||--o{ SavedCollege : saved_by
    UniversityCourse ||--o{ AIComparison : compared_in
    UniversityCourse ||--o{ Application : applied_to

    FeedPost ||--o{ FeedInteraction : receives
    CommunityPost ||--o{ CommunityComment : has
    CommunityPost ||--o{ CommunityVote : receives
    CommunityComment ||--o{ CommunityVote : receives
```

---

## All Tables (Models)

### Core User Tables

#### `users`
The central user table. Every person on the platform has one record here.

| Column | Type | Notes |
|---|---|---|
| `id` | UUID | Primary key |
| `email` | String | Unique |
| `password_hash` | String? | Null for Google-only users |
| `full_name` | String | Display name |
| `phone` | String? | Optional |
| `avatar_url` | String? | Profile picture URL |
| `role` | Enum | `student`, `vendor`, `counsellor`, `admin`, `super_admin` |
| `email_verified` | Boolean | Set to true after OTP verification |
| `google_id` | String? | Unique, links to Google OAuth account |
| `student_id` | String? | Unique, format: `EAO-ST-XXXXXX` |
| `auth_provider` | String | `email` or `google` |
| `is_active` | Boolean | Soft-disable flag |
| `deleted_at` | DateTime? | Soft-delete timestamp |
| `last_login_at` | DateTime? | Last login tracking |

#### `user_profiles`
Extended profile data for students. One-to-one with `users`.

| Column | Notes |
|---|---|
| `current_level` | Class 10 through working professional |
| `stream` | Science, Commerce, Arts, Engineering, etc. |
| `tenth_percentage`, `twelfth_percentage`, `ug_cgpa` | Academic scores |
| `target_degree` | Bachelors, Masters, PhD, MBA, Diploma |
| `target_countries` | String array |
| `target_fields` | String array |
| `budget_min_usd`, `budget_max_usd` | Financial range |
| `profile_strength` | 0-100 calculated score |

#### `refresh_tokens`
JWT refresh token storage with device tracking and family-based rotation.

#### `email_otps`
OTP codes for email verification. Hashed with bcrypt, expired after 15 minutes, max 5 attempts.

#### `phone_otps`
Phone-based OTPs (schema exists but not actively used in code).

#### `api_keys`
Service-to-service authentication keys for the admin console.

---

### Feed System Tables

#### `feed_posts`
Central content table for articles, scholarships, events, etc.

| Column | Type | Notes |
|---|---|---|
| `id` | UUID | Primary key |
| `author_id` | UUID FK | References `users` |
| `title` | String | Post title |
| `slug` | String | URL-friendly unique identifier |
| `content` | Text | Full body content |
| `excerpt` | String? | Short summary |
| `cover_image_url` | String? | Banner image |
| `category` | Enum | `admissions`, `scholarships`, `exams`, `news`, `visa`, `events` |
| `tags` | String[] | Searchable tags |
| `status` | Enum | `draft`, `published`, `archived` |
| `university_id` | UUID? FK | Optional link to a university |
| `is_pinned` | Boolean | Pin to top of feed |
| `view_count`, `like_count`, `dislike_count`, `bookmark_count` | Int | Cached counters |
| `metadata` | JSON | Flexible storage for type-specific fields (scholarship amount, event dates, SEO, etc.) |
| `published_at` | DateTime? | When the post went live |

#### `feed_interactions`
Records user interactions (likes, bookmarks) on feed posts.

| Column | Notes |
|---|---|
| `user_id + post_id + type` | Unique constraint — one interaction type per user per post |
| `type` | `like`, `dislike`, `bookmark`, `view` |

---

### University Tables

#### `universities`
Master university records.

| Field | Notes |
|---|---|
| `name`, `slug`, `country`, `city` | Core identity |
| `qs_ranking`, `the_ranking` | Global rankings |
| `acceptance_rate`, `total_students`, `intl_students_pct` | Key statistics |
| `logo_url`, `banner_url`, `website_url` | Branding assets |
| `tags`, `notable_alumni` | String arrays |

#### `university_courses`
Individual programs offered by universities.

| Field | Notes |
|---|---|
| `degree_type` | Bachelors, Masters, PhD, Diploma, etc. |
| `intake_months` | Int array (e.g., [1, 9] for Jan and Sept intakes) |
| `application_deadline` | Per-course deadline |

#### `course_requirements`
Minimum and average scores required for admission. One-to-one with course.

| Field | Notes |
|---|---|
| `min_gpa`, `avg_gpa` | GPA thresholds |
| `min_ielts`, `min_toefl`, `min_pte`, `min_duolingo` | Language test minimums |
| `min_gre_verbal`, `min_gre_quant`, `min_gmat` | Standardized test scores |
| `sop_required`, `lor_count`, `cv_required` | Document requirements |

#### `course_fees`
Financial information for each course. One-to-one with course.

| Field | Notes |
|---|---|
| `tuition_per_year_usd`, `avg_living_per_year_usd` | Costs |
| `scholarship_available`, `scholarship_amount_usd` | Aid info |
| `fee_waiver_available` | Fee waiver flag |

---

### AI & Planning Tables

#### `ai_comparisons`
Stores AI-generated match scores between a student profile and a specific course.

| Field | Notes |
|---|---|
| `match_score` | 0-100 decimal |
| `category` | `high`, `moderate`, `low`, `very_low` |
| `score_breakdown` | JSON with per-factor scores |
| `strengths`, `weaknesses` | String arrays |
| `suggestions` | JSON array of improvement actions |
| `ai_explanation` | Text narrative |

#### `action_plans`
Step-by-step milestones generated from an AI comparison. Tracks completion percentage.

#### `saved_colleges`
Student's shortlisted universities/courses with priority tagging (`reach`, `match`, `safety`).

---

### Application Tables

#### `applications`
Formal applications submitted by students to university courses.

| Field | Notes |
|---|---|
| `status` | `draft`, `submitted`, `pending`, `under_review`, `accepted`, `rejected`, `waitlisted`, `withdrawn` |
| `priority` | `urgent`, `high`, `medium`, `low` |
| `fee_status` | `unpaid`, `paid`, `waived` |
| `personal_statement` | Text (SOP content) |
| `counsellor_id` | Optional assigned counsellor |

---

### Community Forum Tables

#### `community_posts`
Reddit-style discussion posts.

| Field | Notes |
|---|---|
| `category` | `admissions`, `scholarships`, `visas`, `accommodation`, `career_advice`, `routine`, `general` |
| `is_question` | Flag for Q&A posts |
| `is_anonymous` | Hide author identity |
| `vote_score` | Cached upvote - downvote delta |
| `comment_count` | Cached count |

#### `community_comments`
Threaded comments on community posts. Supports nested replies via `parent_id`.

#### `community_votes`
Up/down votes on posts and comments. Unique per user per target.

---

### Document Tables

#### `user_documents`
Uploaded files (transcripts, SOPs, passports, etc.)

| Field | Notes |
|---|---|
| `doc_type` | `transcript`, `sop`, `lor`, `passport`, `cv_resume`, `english_test`, `financial_proof`, `other` |
| `file_url` | Cloudflare R2 public URL |
| `verification_status` | `pending`, `verified`, `rejected` |

---

### Education Tables

#### `test_scores`
Standardized test results (IELTS, GRE, TOEFL, etc.) with sub-scores stored as JSON.

#### `education_history`
Academic background records (school, undergraduate, postgraduate) with GPA and percentage tracking.
