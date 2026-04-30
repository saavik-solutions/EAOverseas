/**
 * App-wide Constants
 * Roles, categories, and other shared constants
 */

export const ROLES = {
  STUDENT: 'student',
  COUNSELLOR: 'counsellor',
  VENDOR: 'vendor',
  ADMIN: 'admin',
  SUPER_ADMIN: 'super_admin',
} as const;

export const FEED_CATEGORIES = [
  'admissions',
  'scholarships',
  'exams',
  'news',
  'visa',
  'events',
] as const;

export const APPLICATION_STATUSES = [
  'draft',
  'submitted',
  'pending',
  'under_review',
  'accepted',
  'rejected',
  'waitlisted',
  'withdrawn',
] as const;

export const COMMUNITY_CATEGORIES = [
  'admissions',
  'scholarships',
  'visas',
  'accommodation',
  'career_advice',
  'routine',
  'general',
] as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];
export type FeedCategory = (typeof FEED_CATEGORIES)[number];
export type ApplicationStatus = (typeof APPLICATION_STATUSES)[number];
export type CommunityCategory = (typeof COMMUNITY_CATEGORIES)[number];
