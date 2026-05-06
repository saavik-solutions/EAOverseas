/**
 * Backend Constants
 * Centralized enums and limits used across modules
 */

export const ROLES = {
  STUDENT: 'student',
  COUNSELLOR: 'counsellor',
  VENDOR: 'vendor',
  ADMIN: 'admin',
  SUPER_ADMIN: 'super_admin',
} as const;

export const LIMITS = {
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  OTP_EXPIRY_MINUTES: 15,
  OTP_MAX_ATTEMPTS: 5,
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
} as const;

export const CORS_ORIGINS = [
  'http://localhost:5173',
  'http://localhost:3000',
] as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];
