/**
 * Centralized API Configuration
 * Single source of truth for all API URLs and endpoint mappings
 */

export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export const ENDPOINTS = {
  // Auth
  AUTH: {
    LOGIN: `${API_BASE_URL}/api/auth/login`,
    REGISTER: `${API_BASE_URL}/api/auth/register`,
    GOOGLE: `${API_BASE_URL}/api/auth/google`,
    ME: `${API_BASE_URL}/api/auth/me`,
    VERIFY_OTP: `${API_BASE_URL}/api/auth/verify-otp`,
    RESEND_OTP: `${API_BASE_URL}/api/auth/resend-otp`,
  },
  // Feed
  FEED: {
    BASE: `${API_BASE_URL}/api/feed`,
    BY_SLUG: (slug: string) => `${API_BASE_URL}/api/feed/${slug}`,
    LIKE: (id: string) => `${API_BASE_URL}/api/feed/${id}/like`,
    BOOKMARK: (id: string) => `${API_BASE_URL}/api/feed/${id}/bookmark`,
  },
  // Universities
  UNIVERSITIES: {
    BASE: `${API_BASE_URL}/api/universities`,
    BY_ID: (id: string) => `${API_BASE_URL}/api/universities/${id}`,
  },
  // Community
  COMMUNITY: {
    POSTS: `${API_BASE_URL}/api/community/posts`,
    POST_BY_ID: (id: string) => `${API_BASE_URL}/api/community/posts/${id}`,
    POST_VOTE: (id: string) => `${API_BASE_URL}/api/community/posts/${id}/vote`,
    POST_COMMENTS: (id: string) => `${API_BASE_URL}/api/community/posts/${id}/comments`,
    COMMENTS: `${API_BASE_URL}/api/community/comments`,
    COMMENT_BY_ID: (id: string) => `${API_BASE_URL}/api/community/comments/${id}`,
    COMMENT_VOTE: (id: string) => `${API_BASE_URL}/api/community/comments/${id}/vote`,
  },
  // Upload
  UPLOAD: {
    IMAGE: `${API_BASE_URL}/api/upload/image`,
  },
  // Admin
  ADMIN: {
    USERS: `${API_BASE_URL}/api/admin/users`,
    USER_STATUS: (id: string) => `${API_BASE_URL}/api/admin/users/${id}/status`,
  },
  // Health
  HEALTH: `${API_BASE_URL}/api/health`,
} as const;
