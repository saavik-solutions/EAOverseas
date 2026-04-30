/**
 * Authentication Configuration
 * Centralized auth-related settings
 */

export const AUTH_CONFIG = {
  GOOGLE_CLIENT_ID: import.meta.env.VITE_GOOGLE_CLIENT_ID || '',
  TOKEN_KEY: 'eaoverseas_token',
  USER_KEY: 'eaoverseas_user',
} as const;
