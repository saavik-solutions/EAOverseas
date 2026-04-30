/**
 * Centralized Environment Configuration
 * Validates and exports all environment variables with sensible defaults
 */
import dotenv from 'dotenv';
dotenv.config();

export const env = {
  // Server
  PORT: Number(process.env.PORT) || 4000,
  NODE_ENV: process.env.NODE_ENV || 'development',

  // Database
  DATABASE_URL: process.env.DATABASE_URL || '',

  // JWT
  JWT_SECRET: process.env.JWT_SECRET || 'ea_overseas_secure_secret_2026',
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'ea_overseas_secure_refresh_token_secret_2026',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '15m',
  JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN || '7d',

  // Redis
  REDIS_URL: process.env.REDIS_URL || '',

  // Cloudflare R2
  R2_ACCESS_KEY_ID: process.env.R2_ACCESS_KEY_ID || '',
  R2_SECRET_ACCESS_KEY: process.env.R2_SECRET_ACCESS_KEY || '',
  R2_BUCKET_NAME: process.env.R2_BUCKET_NAME || 'eaoverseas',
  R2_ENDPOINT: process.env.R2_ENDPOINT || '',
  R2_PUBLIC_URL: process.env.R2_PUBLIC_URL || '',

  // SMTP
  SMTP_HOST: process.env.SMTP_HOST || 'smtp.gmail.com',
  SMTP_PORT: Number(process.env.SMTP_PORT) || 587,
  SMTP_USER: process.env.SMTP_USER || '',
  SMTP_PASS: process.env.SMTP_PASS || '',
  FROM_EMAIL: process.env.FROM_EMAIL || '',

  // Frontend
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:5173',

  // Helpers
  get isDev() {
    return this.NODE_ENV === 'development';
  },
  get isProd() {
    return this.NODE_ENV === 'production';
  },
} as const;

/**
 * Validate critical environment variables at startup
 */
export function validateEnv(): void {
  const required = ['DATABASE_URL', 'JWT_SECRET'];
  const missing = required.filter(key => !process.env[key]);

  if (missing.length > 0) {
    console.warn(`⚠️  Missing environment variables: ${missing.join(', ')}`);
    console.warn('   Using default values — NOT suitable for production!');
  }
}
