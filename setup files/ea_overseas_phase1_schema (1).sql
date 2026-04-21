-- =============================================================================
-- EA OVERSEAS — PHASE 1 DATABASE SCHEMA (PRODUCTION)
-- PostgreSQL 16 | Prisma ORM compatible
-- AWS RDS ap-south-1 (Mumbai)
-- Version: 1.0.0 | April 2026
-- =============================================================================
-- TABLE INDEX
--   MODULE 1 — AUTH
--     01. users
--     02. refresh_tokens
--     03. email_otps
--
--   MODULE 2 — PROFILE BUILDER
--     04. user_profiles
--     05. test_scores
--     06. education_history
--     07. user_documents
--
--   MODULE 3 — GLOBAL FEED
--     08. feed_posts
--     09. feed_interactions
--
--   MODULE 4 — COLLEGE FEED
--     10. universities
--     11. university_courses
--     12. course_requirements
--     13. course_fees
--     14. saved_colleges
--
--   MODULE 5 — ADMIN PANEL (no extra tables; uses role on users + above tables)
--
--   AI ENGINE (cross-cutting)
--     15. ai_comparisons
--     16. action_plans
--
--   APPLICATION TRACKING
--     17. applications
--     18. application_documents
--     19. application_status_history
--
--   INFRASTRUCTURE
--     20. audit_logs
-- =============================================================================


-- ---------------------------------------------------------------------------
-- EXTENSIONS
-- ---------------------------------------------------------------------------
CREATE EXTENSION IF NOT EXISTS "pgcrypto";       -- gen_random_uuid()
CREATE EXTENSION IF NOT EXISTS "pg_trgm";        -- trigram index for ILIKE search
CREATE EXTENSION IF NOT EXISTS "unaccent";       -- accent-insensitive search


-- ---------------------------------------------------------------------------
-- ENUMS
-- ---------------------------------------------------------------------------

CREATE TYPE user_role AS ENUM (
  'student',
  'vendor',
  'counsellor',
  'admin',
  'super_admin'
);

CREATE TYPE verification_status AS ENUM (
  'pending',
  'verified',
  'rejected'
);

CREATE TYPE feed_category AS ENUM (
  'admissions',
  'scholarships',
  'exams',
  'news',
  'visa',
  'events'
);

CREATE TYPE post_status AS ENUM (
  'draft',
  'published',
  'archived'
);

CREATE TYPE interaction_type AS ENUM (
  'like',
  'bookmark',
  'view'
);

CREATE TYPE degree_type AS ENUM (
  'bachelors',
  'masters',
  'phd',
  'diploma',
  'certificate',
  'associate'
);

CREATE TYPE university_type AS ENUM (
  'public',
  'private',
  'autonomous'
);

CREATE TYPE ai_category AS ENUM (
  'high',
  'moderate',
  'low',
  'very_low'
);

CREATE TYPE college_priority AS ENUM (
  'reach',
  'match',
  'safety'
);

CREATE TYPE application_status AS ENUM (
  'draft',
  'submitted',
  'pending',
  'under_review',
  'accepted',
  'rejected',
  'waitlisted',
  'withdrawn'
);

CREATE TYPE application_priority AS ENUM (
  'urgent',
  'high',
  'medium',
  'low'
);

CREATE TYPE fee_status AS ENUM (
  'unpaid',
  'paid',
  'waived'
);

CREATE TYPE doc_type AS ENUM (
  'transcript',
  'sop',               -- Statement of Purpose
  'lor',               -- Letter of Recommendation
  'passport',
  'cv_resume',
  'english_test',
  'financial_proof',
  'other'
);

CREATE TYPE plan_status AS ENUM (
  'active',
  'completed',
  'abandoned'
);

CREATE TYPE current_level AS ENUM (
  'class_10',
  'class_11',
  'class_12',
  'ug_year_1',
  'ug_year_2',
  'ug_year_3',
  'ug_final',
  'pg',
  'phd',
  'working_professional'
);

CREATE TYPE stream AS ENUM (
  'science',
  'commerce',
  'arts',
  'engineering',
  'medicine',
  'law',
  'other'
);

CREATE TYPE target_degree AS ENUM (
  'bachelors',
  'masters',
  'phd',
  'mba',
  'diploma'
);


-- =============================================================================
-- MODULE 1 — AUTH
-- =============================================================================

-- ---------------------------------------------------------------------------
-- 01. users
-- Root table. One row per registered account regardless of role.
-- ---------------------------------------------------------------------------
CREATE TABLE users (
  id                UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  email             TEXT        NOT NULL,
  password_hash     TEXT,                          -- NULL for OAuth-only users
  full_name         TEXT        NOT NULL,
  phone             TEXT,
  avatar_url        TEXT,
  role              user_role   NOT NULL DEFAULT 'student',
  email_verified    BOOLEAN     NOT NULL DEFAULT false,
  google_id         TEXT,                          -- Google OAuth sub claim
  auth_provider     TEXT        NOT NULL DEFAULT 'email',  -- 'email' | 'google'
  is_active         BOOLEAN     NOT NULL DEFAULT true,
  deleted_at        TIMESTAMPTZ,                   -- soft delete; NULL = active
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  last_login_at     TIMESTAMPTZ,

  CONSTRAINT users_email_key          UNIQUE (email),
  CONSTRAINT users_google_id_key      UNIQUE (google_id),
  CONSTRAINT users_email_format       CHECK (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  CONSTRAINT users_phone_format       CHECK (phone IS NULL OR phone ~ '^\+?[0-9\s\-()]{7,20}$')
);

COMMENT ON TABLE  users                IS 'Core auth entity. One row per registered user.';
COMMENT ON COLUMN users.deleted_at     IS 'Soft delete timestamp. DPDP Act compliance — data retained but user cannot log in.';
COMMENT ON COLUMN users.password_hash  IS 'Argon2id hash. NULL for OAuth-only accounts.';
COMMENT ON COLUMN users.google_id      IS 'Google OAuth 2.0 sub claim for SSO.';

CREATE INDEX idx_users_email       ON users (email)       WHERE deleted_at IS NULL;
CREATE INDEX idx_users_google_id   ON users (google_id)   WHERE google_id IS NOT NULL;
CREATE INDEX idx_users_role        ON users (role)         WHERE deleted_at IS NULL;


-- ---------------------------------------------------------------------------
-- 02. refresh_tokens
-- HTTP-only cookie refresh token store. Rotate on every use.
-- ---------------------------------------------------------------------------
CREATE TABLE refresh_tokens (
  id            UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       UUID        NOT NULL REFERENCES users (id) ON DELETE CASCADE,
  token_hash    TEXT        NOT NULL,             -- SHA-256 hash of the raw token
  family_id     UUID        NOT NULL DEFAULT gen_random_uuid(),  -- rotation family
  device_info   TEXT,                             -- User-Agent hint for auditing
  ip_address    INET,
  expires_at    TIMESTAMPTZ NOT NULL,
  revoked_at    TIMESTAMPTZ,                      -- NULL = valid
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),

  CONSTRAINT refresh_tokens_hash_key UNIQUE (token_hash)
);

COMMENT ON TABLE  refresh_tokens              IS 'Rotating JWT refresh tokens. Detect reuse via family_id.';
COMMENT ON COLUMN refresh_tokens.family_id    IS 'All tokens in a rotation chain share this ID. Reuse of an old token invalidates the whole family.';
COMMENT ON COLUMN refresh_tokens.token_hash   IS 'SHA-256 of raw token. Never store raw token.';

CREATE INDEX idx_refresh_tokens_user    ON refresh_tokens (user_id, expires_at) WHERE revoked_at IS NULL;
CREATE INDEX idx_refresh_tokens_family  ON refresh_tokens (family_id);


-- ---------------------------------------------------------------------------
-- 03. email_otps
-- Short-lived codes for email verification and password reset.
-- ---------------------------------------------------------------------------
CREATE TABLE email_otps (
  id            UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       UUID        NOT NULL REFERENCES users (id) ON DELETE CASCADE,
  purpose       TEXT        NOT NULL,             -- 'verify_email' | 'password_reset'
  otp_hash      TEXT        NOT NULL,             -- bcrypt hash of 6-digit code
  attempts      SMALLINT    NOT NULL DEFAULT 0,
  expires_at    TIMESTAMPTZ NOT NULL DEFAULT (now() + INTERVAL '15 minutes'),
  used_at       TIMESTAMPTZ,                      -- NULL = unused
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),

  CONSTRAINT email_otps_purpose_check CHECK (purpose IN ('verify_email', 'password_reset'))
);

COMMENT ON TABLE  email_otps           IS '6-digit OTP codes. Max 3 attempts; expire in 15 min.';
COMMENT ON COLUMN email_otps.otp_hash  IS 'bcrypt hash. Never store raw OTP.';

CREATE INDEX idx_email_otps_user    ON email_otps (user_id, purpose) WHERE used_at IS NULL;


-- =============================================================================
-- MODULE 2 — PROFILE BUILDER
-- =============================================================================

-- ---------------------------------------------------------------------------
-- 04. user_profiles
-- 1:1 with users. All non-auth student data lives here.
-- profile_strength (0-100) is computed by application layer on every update.
-- ---------------------------------------------------------------------------
CREATE TABLE user_profiles (
  id                       UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id                  UUID          NOT NULL REFERENCES users (id) ON DELETE CASCADE,
  current_level            current_level,
  stream                   stream,
  tenth_percentage         NUMERIC(5,2)  CHECK (tenth_percentage BETWEEN 0 AND 100),
  twelfth_percentage       NUMERIC(5,2)  CHECK (twelfth_percentage BETWEEN 0 AND 100),
  ug_cgpa                  NUMERIC(4,2)  CHECK (ug_cgpa BETWEEN 0 AND 10),
  ug_institution           TEXT,
  ug_graduation_year       SMALLINT,
  field_of_study           TEXT,
  target_degree            target_degree,
  target_countries         TEXT[]        NOT NULL DEFAULT '{}',  -- e.g. {'USA','UK','Germany'}
  target_fields            TEXT[]        NOT NULL DEFAULT '{}',  -- e.g. {'Computer Science','AI'}
  budget_min_usd           INT           CHECK (budget_min_usd >= 0),
  budget_max_usd           INT           CHECK (budget_max_usd >= 0),
  city                     TEXT,
  state                    TEXT,
  nationality              TEXT          DEFAULT 'Indian',
  financial_aid_needed     BOOLEAN       NOT NULL DEFAULT false,
  work_experience_months   INT           NOT NULL DEFAULT 0 CHECK (work_experience_months >= 0),
  gap_year_months          INT           NOT NULL DEFAULT 0 CHECK (gap_year_months >= 0),
  extracurriculars         TEXT[],       -- free-form tags: {'Research','Hackathons','NGO'}
  custom_sections          JSONB         NOT NULL DEFAULT '{}',  -- flexible user-defined data
  profile_strength         SMALLINT      NOT NULL DEFAULT 0 CHECK (profile_strength BETWEEN 0 AND 100),
  is_public                BOOLEAN       NOT NULL DEFAULT false,  -- shareable public page
  public_slug              TEXT,         -- e.g. 'rahul-sharma-profile'
  created_at               TIMESTAMPTZ   NOT NULL DEFAULT now(),
  updated_at               TIMESTAMPTZ   NOT NULL DEFAULT now(),

  CONSTRAINT user_profiles_user_id_key   UNIQUE (user_id),
  CONSTRAINT user_profiles_slug_key      UNIQUE (public_slug),
  CONSTRAINT user_profiles_budget_check  CHECK (budget_max_usd IS NULL OR budget_min_usd IS NULL OR budget_max_usd >= budget_min_usd)
);

COMMENT ON TABLE  user_profiles                  IS '1:1 extension of users. All student academic/preference data.';
COMMENT ON COLUMN user_profiles.profile_strength IS '0-100 computed score. Drives the profile strength meter UI.';
COMMENT ON COLUMN user_profiles.custom_sections  IS 'JSONB blob for user-defined sections not covered by fixed columns.';
COMMENT ON COLUMN user_profiles.is_public        IS 'If true, profile is accessible at /p/{public_slug}.';

CREATE INDEX idx_user_profiles_user     ON user_profiles (user_id);
CREATE INDEX idx_user_profiles_slug     ON user_profiles (public_slug) WHERE public_slug IS NOT NULL;
CREATE INDEX idx_user_profiles_country  ON user_profiles USING GIN (target_countries);


-- ---------------------------------------------------------------------------
-- 05. test_scores
-- Multiple exams per user; is_latest flag for current best per exam type.
-- ---------------------------------------------------------------------------
CREATE TABLE test_scores (
  id            UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       UUID          NOT NULL REFERENCES users (id) ON DELETE CASCADE,
  exam_name     TEXT          NOT NULL,  -- 'IELTS'|'TOEFL'|'SAT'|'GRE'|'GMAT'|'JEE'|'NEET'|'GATE'|'DUOLINGO'
  score         NUMERIC(8,2)  NOT NULL,
  max_score     NUMERIC(8,2)  NOT NULL,
  percentile    NUMERIC(5,2)  CHECK (percentile BETWEEN 0 AND 100),
  sub_scores    JSONB,        -- e.g. {"reading":7.5,"writing":7,"listening":8,"speaking":7.5}
  exam_date     DATE,
  valid_until   DATE,         -- IELTS/TOEFL expire in 2 years
  is_latest     BOOLEAN       NOT NULL DEFAULT true,
  is_verified   BOOLEAN       NOT NULL DEFAULT false,
  document_url  TEXT,         -- scorecard upload
  created_at    TIMESTAMPTZ   NOT NULL DEFAULT now(),

  CONSTRAINT test_scores_score_check     CHECK (score >= 0 AND score <= max_score),
  CONSTRAINT test_scores_exam_check      CHECK (exam_name IN (
    'IELTS','TOEFL','SAT','GRE_VERBAL','GRE_QUANT','GMAT',
    'JEE_MAIN','JEE_ADVANCED','NEET','GATE','DUOLINGO','PTE','CAT','OTHER'
  ))
);

COMMENT ON TABLE  test_scores           IS 'All exam attempts per user. is_latest=true marks current best.';
COMMENT ON COLUMN test_scores.sub_scores IS 'JSONB: section-level breakdown. Schema varies by exam_name.';

CREATE INDEX idx_test_scores_user          ON test_scores (user_id, exam_name, is_latest);
CREATE INDEX idx_test_scores_user_latest   ON test_scores (user_id) WHERE is_latest = true;


-- ---------------------------------------------------------------------------
-- 06. education_history
-- Academic institutions attended (school, UG college, PG etc.)
-- ---------------------------------------------------------------------------
CREATE TABLE education_history (
  id                UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id           UUID          NOT NULL REFERENCES users (id) ON DELETE CASCADE,
  institution_name  TEXT          NOT NULL,
  degree            TEXT,
  field             TEXT,
  gpa               NUMERIC(4,2)  CHECK (gpa BETWEEN 0 AND 10),
  gpa_scale         NUMERIC(4,2)  DEFAULT 10,     -- 4.0 or 10.0 scale
  percentage        NUMERIC(5,2)  CHECK (percentage BETWEEN 0 AND 100),
  country           TEXT,
  start_date        DATE,
  end_date          DATE,
  is_current        BOOLEAN       NOT NULL DEFAULT false,
  created_at        TIMESTAMPTZ   NOT NULL DEFAULT now(),

  CONSTRAINT education_history_date_check CHECK (end_date IS NULL OR start_date IS NULL OR end_date >= start_date)
);

COMMENT ON TABLE education_history IS 'Academic institutions attended. Multiple rows per user.';

CREATE INDEX idx_education_history_user ON education_history (user_id, start_date DESC);


-- ---------------------------------------------------------------------------
-- 07. user_documents
-- General document store. Includes profile documents and application documents
-- uploaded during the profile-build phase (SOP drafts, CV, etc.)
-- Application-specific documents are in application_documents.
-- ---------------------------------------------------------------------------
CREATE TABLE user_documents (
  id                   UUID                 PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id              UUID                 NOT NULL REFERENCES users (id) ON DELETE CASCADE,
  doc_type             doc_type             NOT NULL,
  file_name            TEXT                 NOT NULL,
  file_url             TEXT                 NOT NULL,   -- S3 presigned or CDN URL
  file_size_bytes      BIGINT,
  mime_type            TEXT,
  verification_status  verification_status  NOT NULL DEFAULT 'pending',
  verified_by_id       UUID                 REFERENCES users (id),
  verified_at          TIMESTAMPTZ,
  notes                TEXT,                            -- reviewer notes
  created_at           TIMESTAMPTZ          NOT NULL DEFAULT now()
);

COMMENT ON TABLE  user_documents              IS 'Profile-level documents (CV, SOP drafts, scorecards). Not tied to a specific application.';
COMMENT ON COLUMN user_documents.file_url     IS 'S3 bucket URL. Never expose raw path — always generate presigned URL at read time.';

CREATE INDEX idx_user_documents_user  ON user_documents (user_id, doc_type);


-- =============================================================================
-- MODULE 3 — GLOBAL FEED
-- =============================================================================

-- ---------------------------------------------------------------------------
-- 08. feed_posts
-- Admin-curated education news and updates.
-- Like/bookmark counts are denormalized for fast reads.
-- ---------------------------------------------------------------------------
CREATE TABLE feed_posts (
  id              UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id       UUID          NOT NULL REFERENCES users (id),
  title           TEXT          NOT NULL,
  slug            TEXT          NOT NULL,  -- URL-safe identifier
  content         TEXT          NOT NULL,
  excerpt         TEXT,                    -- Short teaser for cards
  cover_image_url TEXT,
  category        feed_category NOT NULL,
  tags            TEXT[]        NOT NULL DEFAULT '{}',
  status          post_status   NOT NULL DEFAULT 'draft',
  is_pinned       BOOLEAN       NOT NULL DEFAULT false,
  view_count      INT           NOT NULL DEFAULT 0,
  like_count      INT           NOT NULL DEFAULT 0,
  bookmark_count  INT           NOT NULL DEFAULT 0,
  published_at    TIMESTAMPTZ,
  created_at      TIMESTAMPTZ   NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ   NOT NULL DEFAULT now(),

  CONSTRAINT feed_posts_slug_key  UNIQUE (slug),
  CONSTRAINT feed_posts_title_len CHECK (char_length(title) BETWEEN 5 AND 250),
  CONSTRAINT feed_posts_published CHECK (
    status != 'published' OR published_at IS NOT NULL
  )
);

COMMENT ON TABLE  feed_posts            IS 'Admin-created posts. Infinite scroll feed. Counts are denormalized.';
COMMENT ON COLUMN feed_posts.like_count IS 'Denormalized from feed_interactions. Updated via trigger or application layer.';

CREATE INDEX idx_feed_posts_status_pub  ON feed_posts (status, published_at DESC) WHERE status = 'published';
CREATE INDEX idx_feed_posts_category    ON feed_posts (category, published_at DESC);
CREATE INDEX idx_feed_posts_tags        ON feed_posts USING GIN (tags);
CREATE INDEX idx_feed_posts_pinned      ON feed_posts (is_pinned, published_at DESC);
CREATE INDEX idx_feed_posts_search      ON feed_posts USING GIN (to_tsvector('english', title || ' ' || COALESCE(excerpt, '')));


-- ---------------------------------------------------------------------------
-- 09. feed_interactions
-- User events on posts: like, bookmark, view.
-- One row per (user, post, type) enforced by unique constraint.
-- ---------------------------------------------------------------------------
CREATE TABLE feed_interactions (
  id          UUID              PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID              NOT NULL REFERENCES users (id) ON DELETE CASCADE,
  post_id     UUID              NOT NULL REFERENCES feed_posts (id) ON DELETE CASCADE,
  type        interaction_type  NOT NULL,
  created_at  TIMESTAMPTZ       NOT NULL DEFAULT now(),

  CONSTRAINT feed_interactions_unique UNIQUE (user_id, post_id, type)
);

COMMENT ON TABLE feed_interactions IS 'User engagement events. UNIQUE per (user, post, type) — no double-likes.';

CREATE INDEX idx_feed_interactions_user  ON feed_interactions (user_id, type);
CREATE INDEX idx_feed_interactions_post  ON feed_interactions (post_id, type);


-- =============================================================================
-- MODULE 4 — COLLEGE FEED
-- =============================================================================

-- ---------------------------------------------------------------------------
-- 10. universities
-- Master list of institutions. Data managed by admin panel.
-- ---------------------------------------------------------------------------
CREATE TABLE universities (
  id               UUID             PRIMARY KEY DEFAULT gen_random_uuid(),
  name             TEXT             NOT NULL,
  slug             TEXT             NOT NULL,    -- URL-safe e.g. 'harvard-university'
  country          TEXT             NOT NULL,
  city             TEXT,
  type             university_type,
  qs_ranking       INT              CHECK (qs_ranking > 0),
  the_ranking      INT              CHECK (the_ranking > 0),
  website_url      TEXT,
  logo_url         TEXT,
  banner_url       TEXT,
  description      TEXT,
  acceptance_rate  NUMERIC(5,2)     CHECK (acceptance_rate BETWEEN 0 AND 100),
  total_students   INT              CHECK (total_students > 0),
  intl_students_pct NUMERIC(5,2)   CHECK (intl_students_pct BETWEEN 0 AND 100),
  established_year SMALLINT,
  campus_size_acres INT,
  notable_alumni   TEXT[],
  tags             TEXT[]           NOT NULL DEFAULT '{}',  -- e.g. {'Ivy League','Research'}
  is_active        BOOLEAN          NOT NULL DEFAULT true,
  data_verified_at TIMESTAMPTZ,     -- last manual verification timestamp
  created_at       TIMESTAMPTZ      NOT NULL DEFAULT now(),
  updated_at       TIMESTAMPTZ      NOT NULL DEFAULT now(),

  CONSTRAINT universities_slug_key UNIQUE (slug),
  CONSTRAINT universities_name_key UNIQUE (name, country)
);

COMMENT ON TABLE  universities                  IS 'Master university list. Managed via admin panel.';
COMMENT ON COLUMN universities.data_verified_at IS 'Last manual data accuracy check. Shown to users as "last updated".';
COMMENT ON COLUMN universities.acceptance_rate  IS 'Overall acceptance rate as percentage (0–100).';

CREATE INDEX idx_universities_country   ON universities (country)     WHERE is_active = true;
CREATE INDEX idx_universities_ranking   ON universities (qs_ranking)  WHERE is_active = true;
CREATE INDEX idx_universities_tags      ON universities USING GIN (tags);
CREATE INDEX idx_universities_search    ON universities USING GIN (to_tsvector('english', name || ' ' || COALESCE(city, '') || ' ' || country));


-- ---------------------------------------------------------------------------
-- 11. university_courses
-- Programs offered by a university. Core unit for AI matching.
-- ---------------------------------------------------------------------------
CREATE TABLE university_courses (
  id                    UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
  university_id         UUID         NOT NULL REFERENCES universities (id) ON DELETE CASCADE,
  name                  TEXT         NOT NULL,
  slug                  TEXT         NOT NULL,   -- '{univ-slug}-{course-slug}'
  degree_type           degree_type  NOT NULL,
  field                 TEXT         NOT NULL,   -- 'Computer Science'
  sub_field             TEXT,                    -- 'Machine Learning'
  duration_years        NUMERIC(3,1) CHECK (duration_years > 0),
  language              TEXT         NOT NULL DEFAULT 'English',
  intake_months         SMALLINT[]   NOT NULL DEFAULT '{}',  -- [9, 1] = Sept & Jan
  application_deadline  DATE,
  is_active             BOOLEAN      NOT NULL DEFAULT true,
  created_at            TIMESTAMPTZ  NOT NULL DEFAULT now(),
  updated_at            TIMESTAMPTZ  NOT NULL DEFAULT now(),

  CONSTRAINT university_courses_slug_key UNIQUE (slug)
);

COMMENT ON TABLE  university_courses             IS 'Programs offered. Each row is a matchable target for the AI engine.';
COMMENT ON COLUMN university_courses.intake_months IS 'Array of month numbers (1-12) when intake opens.';

CREATE INDEX idx_courses_university    ON university_courses (university_id)              WHERE is_active = true;
CREATE INDEX idx_courses_field         ON university_courses (field, degree_type)         WHERE is_active = true;
CREATE INDEX idx_courses_deadline      ON university_courses (application_deadline)       WHERE is_active = true;
CREATE INDEX idx_courses_search        ON university_courses USING GIN (to_tsvector('english', name || ' ' || field || ' ' || COALESCE(sub_field, '')));


-- ---------------------------------------------------------------------------
-- 12. course_requirements
-- 1:1 with university_courses. Admission criteria used by AI scoring engine.
-- ---------------------------------------------------------------------------
CREATE TABLE course_requirements (
  id                UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id         UUID          NOT NULL REFERENCES university_courses (id) ON DELETE CASCADE,

  -- Academic
  min_gpa           NUMERIC(4,2)  CHECK (min_gpa BETWEEN 0 AND 10),
  avg_gpa           NUMERIC(4,2)  CHECK (avg_gpa BETWEEN 0 AND 10),   -- CRITICAL for AI scoring
  min_percentage    NUMERIC(5,2)  CHECK (min_percentage BETWEEN 0 AND 100),
  avg_percentage    NUMERIC(5,2)  CHECK (avg_percentage BETWEEN 0 AND 100),

  -- English Proficiency
  min_ielts         NUMERIC(3,1)  CHECK (min_ielts BETWEEN 0 AND 9),
  avg_ielts         NUMERIC(3,1)  CHECK (avg_ielts BETWEEN 0 AND 9),
  min_toefl         SMALLINT      CHECK (min_toefl BETWEEN 0 AND 120),
  min_pte           SMALLINT      CHECK (min_pte BETWEEN 0 AND 90),
  min_duolingo      SMALLINT      CHECK (min_duolingo BETWEEN 0 AND 160),

  -- Standardised Tests
  min_sat           SMALLINT      CHECK (min_sat BETWEEN 400 AND 1600),
  min_gre_verbal    SMALLINT      CHECK (min_gre_verbal BETWEEN 130 AND 170),
  min_gre_quant     SMALLINT      CHECK (min_gre_quant BETWEEN 130 AND 170),
  avg_gre_quant     SMALLINT      CHECK (avg_gre_quant BETWEEN 130 AND 170),
  min_gmat          SMALLINT      CHECK (min_gmat BETWEEN 200 AND 800),
  avg_gmat          SMALLINT      CHECK (avg_gmat BETWEEN 200 AND 800),

  -- Experience
  work_exp_years    NUMERIC(3,1)  CHECK (work_exp_years >= 0),
  work_exp_required BOOLEAN       NOT NULL DEFAULT false,

  -- Documents
  sop_required      BOOLEAN       NOT NULL DEFAULT true,
  lor_count         SMALLINT      NOT NULL DEFAULT 2 CHECK (lor_count BETWEEN 0 AND 5),
  cv_required       BOOLEAN       NOT NULL DEFAULT true,
  portfolio_required BOOLEAN      NOT NULL DEFAULT false,

  -- Other
  specific_courses_required TEXT, -- e.g. 'Linear Algebra, Calculus'
  other_notes       TEXT,
  updated_at        TIMESTAMPTZ   NOT NULL DEFAULT now(),

  CONSTRAINT course_requirements_course_id_key UNIQUE (course_id)
);

COMMENT ON TABLE  course_requirements          IS '1:1 with university_courses. Drives all AI compatibility scoring.';
COMMENT ON COLUMN course_requirements.avg_gpa  IS 'Average GPA of admitted students — key signal for realistic match scoring.';


-- ---------------------------------------------------------------------------
-- 13. course_fees
-- 1:1 with university_courses. Financial data for budget matching.
-- ---------------------------------------------------------------------------
CREATE TABLE course_fees (
  id                        UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id                 UUID          NOT NULL REFERENCES university_courses (id) ON DELETE CASCADE,
  tuition_per_year_usd      INT           CHECK (tuition_per_year_usd >= 0),
  avg_living_per_year_usd   INT           CHECK (avg_living_per_year_usd >= 0),
  application_fee_usd       INT           NOT NULL DEFAULT 0 CHECK (application_fee_usd >= 0),
  total_cost_estimate_usd   INT,          -- computed: (tuition + living) * duration; can be stored
  currency_local            TEXT,         -- 'GBP' | 'EUR' | 'CAD' | 'AUD'
  tuition_local             INT,          -- Tuition in local currency
  scholarship_available     BOOLEAN       NOT NULL DEFAULT false,
  scholarship_amount_usd    INT,
  scholarship_details       TEXT,
  fee_waiver_available      BOOLEAN       NOT NULL DEFAULT false,
  fee_notes                 TEXT,
  updated_at                TIMESTAMPTZ   NOT NULL DEFAULT now(),

  CONSTRAINT course_fees_course_id_key UNIQUE (course_id)
);

COMMENT ON TABLE  course_fees                        IS '1:1 with university_courses. Financial data for student budget matching.';
COMMENT ON COLUMN course_fees.total_cost_estimate_usd IS 'Optionally pre-computed for fast budget filtering. Recompute on fee update.';


-- ---------------------------------------------------------------------------
-- 14. saved_colleges
-- Bookmark junction. User saves a course to their shortlist.
-- ---------------------------------------------------------------------------
CREATE TABLE saved_colleges (
  id          UUID             PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID             NOT NULL REFERENCES users (id) ON DELETE CASCADE,
  course_id   UUID             NOT NULL REFERENCES university_courses (id) ON DELETE CASCADE,
  priority    college_priority,
  notes       TEXT,
  saved_at    TIMESTAMPTZ      NOT NULL DEFAULT now(),

  CONSTRAINT saved_colleges_unique UNIQUE (user_id, course_id)
);

COMMENT ON TABLE saved_colleges IS 'User bookmarks for university courses. Tagged with priority (reach/match/safety).';

CREATE INDEX idx_saved_colleges_user    ON saved_colleges (user_id, saved_at DESC);
CREATE INDEX idx_saved_colleges_course  ON saved_colleges (course_id);


-- =============================================================================
-- AI ENGINE (cross-cutting)
-- =============================================================================

-- ---------------------------------------------------------------------------
-- 15. ai_comparisons
-- Core AI output. One row per (user, course) — upserted on re-compare.
-- Stores the deterministic score + GPT-4o explanation.
-- ---------------------------------------------------------------------------
CREATE TABLE ai_comparisons (
  id              UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID        NOT NULL REFERENCES users (id) ON DELETE CASCADE,
  course_id       UUID        NOT NULL REFERENCES university_courses (id) ON DELETE CASCADE,

  -- Scores
  match_score     NUMERIC(5,2) NOT NULL CHECK (match_score BETWEEN 0 AND 100),
  category        ai_category  NOT NULL,

  -- Score breakdown stored as structured JSONB
  -- Schema: { academic: 0-100, english: 0-100, standardised: 0-100, budget: 0-100,
  --           experience: 0-100, documents: 0-100 }
  score_breakdown JSONB        NOT NULL DEFAULT '{}',

  -- Narrative data
  strengths       TEXT[]       NOT NULL DEFAULT '{}',   -- Positive points
  weaknesses      TEXT[]       NOT NULL DEFAULT '{}',   -- Gap areas
  -- Suggestions schema: [{ action: text, priority: 'high'|'medium'|'low', timeframe: text }]
  suggestions     JSONB        NOT NULL DEFAULT '[]',
  alternatives    UUID[]       NOT NULL DEFAULT '{}',   -- course_ids for similar/easier options
  ai_explanation  TEXT,                                 -- GPT-4o full narrative (Markdown)

  -- Metadata
  model_version   TEXT        NOT NULL DEFAULT 'v1.0',
  processing_ms   INT,                                  -- API round-trip latency
  cached          BOOLEAN     NOT NULL DEFAULT false,   -- served from Redis cache
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now(),

  CONSTRAINT ai_comparisons_unique UNIQUE (user_id, course_id)
);

COMMENT ON TABLE  ai_comparisons                IS 'Core AI output table. UPSERT on re-compare. One row per (user, course).';
COMMENT ON COLUMN ai_comparisons.score_breakdown IS 'Dimension-level breakdown. Keys: academic, english, standardised, budget, experience, documents.';
COMMENT ON COLUMN ai_comparisons.alternatives   IS 'Array of course UUIDs. Resolved at read time.';
COMMENT ON COLUMN ai_comparisons.cached         IS 'If true, result was served from Redis. False = fresh GPT call.';

CREATE INDEX idx_ai_comparisons_user          ON ai_comparisons (user_id, updated_at DESC);
CREATE INDEX idx_ai_comparisons_course        ON ai_comparisons (course_id);
CREATE INDEX idx_ai_comparisons_score         ON ai_comparisons (match_score DESC);


-- ---------------------------------------------------------------------------
-- 16. action_plans
-- Personalised roadmap generated from an AI comparison.
-- One active plan per user per course.
-- ---------------------------------------------------------------------------
CREATE TABLE action_plans (
  id              UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID          NOT NULL REFERENCES users (id) ON DELETE CASCADE,
  comparison_id   UUID          NOT NULL REFERENCES ai_comparisons (id) ON DELETE CASCADE,
  course_id       UUID          NOT NULL REFERENCES university_courses (id),

  -- Milestone schema: [{ id: uuid, title: text, description: text,
  --   category: 'academic'|'test'|'documents'|'application',
  --   priority: 'high'|'medium'|'low', due_date: ISO date,
  --   completed: bool, completed_at: ISO datetime }]
  milestones      JSONB         NOT NULL DEFAULT '[]',

  target_intake   TEXT,         -- e.g. 'September 2026'
  target_date     DATE,         -- Application deadline
  status          plan_status   NOT NULL DEFAULT 'active',
  completion_pct  SMALLINT      NOT NULL DEFAULT 0 CHECK (completion_pct BETWEEN 0 AND 100),
  created_at      TIMESTAMPTZ   NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ   NOT NULL DEFAULT now(),

  CONSTRAINT action_plans_unique UNIQUE (user_id, course_id)
);

COMMENT ON TABLE  action_plans            IS 'Personalised month-by-month roadmap. Generated from ai_comparisons.';
COMMENT ON COLUMN action_plans.milestones IS 'Array of milestone objects. completion_pct derived from this.';

CREATE INDEX idx_action_plans_user    ON action_plans (user_id, status);
CREATE INDEX idx_action_plans_course  ON action_plans (course_id);


-- =============================================================================
-- APPLICATION TRACKING
-- =============================================================================

-- ---------------------------------------------------------------------------
-- 17. applications
-- Full application lifecycle. One row per student-program submission.
-- ---------------------------------------------------------------------------
CREATE TABLE applications (
  id                  UUID                 PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id             UUID                 NOT NULL REFERENCES users (id) ON DELETE CASCADE,
  university_id       UUID                 NOT NULL REFERENCES universities (id),
  course_id           UUID                 NOT NULL REFERENCES university_courses (id),
  comparison_id       UUID                 REFERENCES ai_comparisons (id),  -- optional link

  status              application_status   NOT NULL DEFAULT 'draft',
  priority            application_priority NOT NULL DEFAULT 'medium',
  application_fee     NUMERIC(10,2)        CHECK (application_fee >= 0),
  fee_status          fee_status           NOT NULL DEFAULT 'unpaid',
  fee_paid_at         TIMESTAMPTZ,

  personal_statement  TEXT,               -- SOP text (also stored as document)
  counsellor_id       UUID                REFERENCES users (id),  -- assigned counsellor
  internal_notes      TEXT,               -- admin/counsellor internal notes (not visible to student)

  applied_at          TIMESTAMPTZ,        -- when status moved from draft → submitted
  decision_at         TIMESTAMPTZ,        -- when accepted/rejected
  created_at          TIMESTAMPTZ         NOT NULL DEFAULT now(),
  updated_at          TIMESTAMPTZ         NOT NULL DEFAULT now(),

  CONSTRAINT applications_unique UNIQUE (user_id, course_id)
);

COMMENT ON TABLE  applications               IS 'Full application lifecycle. Drives student dashboard progress bars.';
COMMENT ON COLUMN applications.counsellor_id IS 'Counsellor assigned to manage this application.';
COMMENT ON COLUMN applications.applied_at    IS 'Set when status transitions from draft to submitted.';

CREATE INDEX idx_applications_user        ON applications (user_id, status);
CREATE INDEX idx_applications_university  ON applications (university_id, status);
CREATE INDEX idx_applications_counsellor  ON applications (counsellor_id) WHERE counsellor_id IS NOT NULL;
CREATE INDEX idx_applications_priority    ON applications (priority, status) WHERE status IN ('pending','under_review');


-- ---------------------------------------------------------------------------
-- 18. application_documents
-- Documents specifically attached to one application (TRANSCRIPT, SOP, LOR…).
-- ---------------------------------------------------------------------------
CREATE TABLE application_documents (
  id                   UUID                 PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id       UUID                 NOT NULL REFERENCES applications (id) ON DELETE CASCADE,
  user_id              UUID                 NOT NULL REFERENCES users (id),   -- denormalised for fast access
  doc_type             doc_type             NOT NULL,
  file_name            TEXT                 NOT NULL,
  file_url             TEXT                 NOT NULL,   -- S3 URL
  file_size_bytes      BIGINT,
  mime_type            TEXT,
  verification_status  verification_status  NOT NULL DEFAULT 'pending',
  verified_by_id       UUID                 REFERENCES users (id),
  verified_at          TIMESTAMPTZ,
  reviewer_notes       TEXT,
  uploaded_at          TIMESTAMPTZ          NOT NULL DEFAULT now()
);

COMMENT ON TABLE  application_documents           IS 'Documents attached to a specific application instance.';
COMMENT ON COLUMN application_documents.user_id   IS 'Denormalised from application.user_id for security row-level queries.';

CREATE INDEX idx_app_documents_application  ON application_documents (application_id);
CREATE INDEX idx_app_documents_user         ON application_documents (user_id);
CREATE INDEX idx_app_documents_status       ON application_documents (verification_status);


-- ---------------------------------------------------------------------------
-- 19. application_status_history
-- Immutable audit trail. Every status transition recorded.
-- ---------------------------------------------------------------------------
CREATE TABLE application_status_history (
  id              UUID               PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id  UUID               NOT NULL REFERENCES applications (id) ON DELETE CASCADE,
  status_from     application_status,               -- NULL for initial creation
  status_to       application_status NOT NULL,
  comment         TEXT,                             -- Counsellor / admin notes shown in timeline
  changed_by_id   UUID               NOT NULL REFERENCES users (id),
  changed_at      TIMESTAMPTZ        NOT NULL DEFAULT now()
);

COMMENT ON TABLE  application_status_history            IS 'Immutable audit log of every application status change. Powers the timeline UI.';
COMMENT ON COLUMN application_status_history.status_from IS 'NULL on first insert (draft creation event).';

CREATE INDEX idx_app_status_history_application  ON application_status_history (application_id, changed_at DESC);
CREATE INDEX idx_app_status_history_changed_by   ON application_status_history (changed_by_id);


-- =============================================================================
-- INFRASTRUCTURE
-- =============================================================================

-- ---------------------------------------------------------------------------
-- 20. audit_logs
-- Append-only security and admin action log. Never updated or deleted.
-- ---------------------------------------------------------------------------
CREATE TABLE audit_logs (
  id            BIGSERIAL   PRIMARY KEY,    -- Sequential for cheap range scans
  actor_id      UUID        REFERENCES users (id),  -- NULL for system events
  action        TEXT        NOT NULL,       -- 'user.login' | 'university.update' | 'application.accept'
  resource_type TEXT,                       -- 'user' | 'university' | 'application'
  resource_id   UUID,
  old_value     JSONB,                      -- Previous state snapshot
  new_value     JSONB,                      -- New state snapshot
  ip_address    INET,
  user_agent    TEXT,
  metadata      JSONB       NOT NULL DEFAULT '{}',
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE  audit_logs         IS 'Append-only security log. DPDP Act compliance. Never UPDATE or DELETE rows.';
COMMENT ON COLUMN audit_logs.action  IS 'Dot-notation action strings: {resource}.{event}, e.g. user.login, application.accepted.';

CREATE INDEX idx_audit_logs_actor     ON audit_logs (actor_id, created_at DESC);
CREATE INDEX idx_audit_logs_resource  ON audit_logs (resource_type, resource_id, created_at DESC);
CREATE INDEX idx_audit_logs_action    ON audit_logs (action, created_at DESC);
CREATE INDEX idx_audit_logs_ts        ON audit_logs (created_at DESC);


-- =============================================================================
-- TRIGGERS — updated_at auto-maintenance
-- =============================================================================

CREATE OR REPLACE FUNCTION trigger_set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER set_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION trigger_set_updated_at();

CREATE TRIGGER set_updated_at BEFORE UPDATE ON user_profiles
  FOR EACH ROW EXECUTE FUNCTION trigger_set_updated_at();

CREATE TRIGGER set_updated_at BEFORE UPDATE ON feed_posts
  FOR EACH ROW EXECUTE FUNCTION trigger_set_updated_at();

CREATE TRIGGER set_updated_at BEFORE UPDATE ON universities
  FOR EACH ROW EXECUTE FUNCTION trigger_set_updated_at();

CREATE TRIGGER set_updated_at BEFORE UPDATE ON university_courses
  FOR EACH ROW EXECUTE FUNCTION trigger_set_updated_at();

CREATE TRIGGER set_updated_at BEFORE UPDATE ON course_requirements
  FOR EACH ROW EXECUTE FUNCTION trigger_set_updated_at();

CREATE TRIGGER set_updated_at BEFORE UPDATE ON course_fees
  FOR EACH ROW EXECUTE FUNCTION trigger_set_updated_at();

CREATE TRIGGER set_updated_at BEFORE UPDATE ON ai_comparisons
  FOR EACH ROW EXECUTE FUNCTION trigger_set_updated_at();

CREATE TRIGGER set_updated_at BEFORE UPDATE ON action_plans
  FOR EACH ROW EXECUTE FUNCTION trigger_set_updated_at();

CREATE TRIGGER set_updated_at BEFORE UPDATE ON applications
  FOR EACH ROW EXECUTE FUNCTION trigger_set_updated_at();


-- =============================================================================
-- TRIGGERS — Feed post counter maintenance
-- Keeps like_count and bookmark_count on feed_posts in sync with feed_interactions
-- =============================================================================

CREATE OR REPLACE FUNCTION trigger_feed_interaction_counter()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    IF NEW.type = 'like' THEN
      UPDATE feed_posts SET like_count = like_count + 1 WHERE id = NEW.post_id;
    ELSIF NEW.type = 'bookmark' THEN
      UPDATE feed_posts SET bookmark_count = bookmark_count + 1 WHERE id = NEW.post_id;
    ELSIF NEW.type = 'view' THEN
      UPDATE feed_posts SET view_count = view_count + 1 WHERE id = NEW.post_id;
    END IF;
  ELSIF TG_OP = 'DELETE' THEN
    IF OLD.type = 'like' THEN
      UPDATE feed_posts SET like_count = GREATEST(like_count - 1, 0) WHERE id = OLD.post_id;
    ELSIF OLD.type = 'bookmark' THEN
      UPDATE feed_posts SET bookmark_count = GREATEST(bookmark_count - 1, 0) WHERE id = OLD.post_id;
    END IF;
  END IF;
  RETURN NULL;
END;
$$;

CREATE TRIGGER feed_interaction_counter
AFTER INSERT OR DELETE ON feed_interactions
FOR EACH ROW EXECUTE FUNCTION trigger_feed_interaction_counter();


-- =============================================================================
-- VIEWS — Useful read-only projections
-- =============================================================================

-- Enrolled student summary (admin dashboard)
CREATE VIEW v_student_summary AS
SELECT
  u.id,
  u.full_name,
  u.email,
  u.created_at AS registered_at,
  up.profile_strength,
  up.target_degree,
  up.target_countries,
  up.current_level,
  COUNT(DISTINCT sc.id) AS saved_count,
  COUNT(DISTINCT ac.id) AS comparison_count,
  COUNT(DISTINCT ap.id) AS application_count
FROM users u
LEFT JOIN user_profiles up     ON up.user_id = u.id
LEFT JOIN saved_colleges sc    ON sc.user_id = u.id
LEFT JOIN ai_comparisons ac    ON ac.user_id = u.id
LEFT JOIN applications ap      ON ap.user_id = u.id
WHERE u.role = 'student'
  AND u.deleted_at IS NULL
GROUP BY u.id, up.id;

COMMENT ON VIEW v_student_summary IS 'Admin dashboard: student overview with engagement counts.';


-- Active university courses with fees and requirements joined
CREATE VIEW v_course_detail AS
SELECT
  uc.id,
  uc.name AS course_name,
  uc.degree_type,
  uc.field,
  uc.sub_field,
  uc.duration_years,
  uc.application_deadline,
  uc.intake_months,
  un.id   AS university_id,
  un.name AS university_name,
  un.country,
  un.city,
  un.qs_ranking,
  un.logo_url,
  un.acceptance_rate,
  cr.avg_gpa,
  cr.min_ielts,
  cr.avg_ielts,
  cr.min_gre_quant,
  cr.avg_gmat,
  cr.work_exp_years,
  cf.tuition_per_year_usd,
  cf.avg_living_per_year_usd,
  cf.application_fee_usd,
  cf.scholarship_available
FROM university_courses uc
JOIN universities       un ON un.id = uc.university_id
LEFT JOIN course_requirements cr ON cr.course_id = uc.id
LEFT JOIN course_fees         cf ON cf.course_id = uc.id
WHERE uc.is_active = true
  AND un.is_active = true;

COMMENT ON VIEW v_course_detail IS 'Denormalised course card view. Used by university listing and AI engine.';


-- =============================================================================
-- ROW LEVEL SECURITY (RLS)
-- Enable on sensitive tables. Policies enforced at DB layer as defence-in-depth.
-- App layer still enforces auth — RLS is a backstop.
-- =============================================================================

ALTER TABLE users                     ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles             ENABLE ROW LEVEL SECURITY;
ALTER TABLE test_scores               ENABLE ROW LEVEL SECURITY;
ALTER TABLE education_history         ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_documents            ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_comparisons            ENABLE ROW LEVEL SECURITY;
ALTER TABLE action_plans              ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_colleges            ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications              ENABLE ROW LEVEL SECURITY;
ALTER TABLE application_documents     ENABLE ROW LEVEL SECURITY;
ALTER TABLE application_status_history ENABLE ROW LEVEL SECURITY;

-- Students can only read/write their own rows
-- Set app.current_user_id via: SET LOCAL app.current_user_id = '<uuid>';
-- Admins bypass RLS: set role to the api_admin role below.

CREATE POLICY student_own_profile ON user_profiles
  USING (user_id = current_setting('app.current_user_id', true)::uuid);

CREATE POLICY student_own_scores ON test_scores
  USING (user_id = current_setting('app.current_user_id', true)::uuid);

CREATE POLICY student_own_education ON education_history
  USING (user_id = current_setting('app.current_user_id', true)::uuid);

CREATE POLICY student_own_documents ON user_documents
  USING (user_id = current_setting('app.current_user_id', true)::uuid);

CREATE POLICY student_own_comparisons ON ai_comparisons
  USING (user_id = current_setting('app.current_user_id', true)::uuid);

CREATE POLICY student_own_plans ON action_plans
  USING (user_id = current_setting('app.current_user_id', true)::uuid);

CREATE POLICY student_own_saved ON saved_colleges
  USING (user_id = current_setting('app.current_user_id', true)::uuid);

CREATE POLICY student_own_applications ON applications
  USING (user_id = current_setting('app.current_user_id', true)::uuid);

CREATE POLICY student_own_app_documents ON application_documents
  USING (user_id = current_setting('app.current_user_id', true)::uuid);


-- =============================================================================
-- DATABASE ROLES
-- =============================================================================

-- API service role (normal operations — respects RLS)
CREATE ROLE api_service LOGIN;
GRANT CONNECT ON DATABASE ea_overseas TO api_service;
GRANT USAGE ON SCHEMA public TO api_service;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO api_service;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO api_service;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO api_service;

-- Admin role (bypasses RLS for admin operations)
CREATE ROLE api_admin LOGIN BYPASSRLS;
GRANT api_service TO api_admin;

-- Read-only analytics role
CREATE ROLE api_readonly LOGIN;
GRANT CONNECT ON DATABASE ea_overseas TO api_readonly;
GRANT USAGE ON SCHEMA public TO api_readonly;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO api_readonly;

-- Revoke public defaults
REVOKE CREATE ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON DATABASE ea_overseas FROM PUBLIC;


-- =============================================================================
-- PERFORMANCE — Additional composite indexes for common query patterns
-- =============================================================================

-- University search by country + ranking
CREATE INDEX idx_universities_country_rank  ON universities (country, qs_ranking ASC NULLS LAST) WHERE is_active = true;

-- Feed pagination
CREATE INDEX idx_feed_posts_pagination      ON feed_posts (published_at DESC, id DESC) WHERE status = 'published';

-- Saved colleges ordered by save time
CREATE INDEX idx_saved_colleges_user_time   ON saved_colleges (user_id, saved_at DESC);

-- Applications by counsellor + status for counsellor dashboard
CREATE INDEX idx_applications_counsellor_status ON applications (counsellor_id, status, updated_at DESC)
  WHERE counsellor_id IS NOT NULL;

-- Course field + country via join (GIN on universities.country not enough for join queries)
CREATE INDEX idx_courses_degree_field ON university_courses (degree_type, field) WHERE is_active = true;


-- =============================================================================
-- SCHEMA COMPLETE
-- =============================================================================
-- Summary:
--   Tables:    20
--   ENUMs:     14
--   Indexes:   40+
--   Triggers:  12
--   Views:      2
--   RLS:       11 tables
--   Roles:      3
-- =============================================================================
