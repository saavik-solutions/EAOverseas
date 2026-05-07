import { FastifyInstance } from 'fastify';
import rateLimit from '@fastify/rate-limit';

export async function registerRateLimiters(app: FastifyInstance) {
  // Global Limiter
  await app.register(rateLimit, {
    max: 100,
    timeWindow: '15 minutes',
    errorResponseBuilder: (request, context) => ({
      error: 'Too many requests. Please slow down.',
    }),
  });

  // Specific Limiters can be applied to routes directly or via custom plugins
}

// Helper to get configuration for specific route-level limiting
export const loginRateLimit = {
  max: 5,
  timeWindow: '1 minute',
  errorResponseBuilder: () => ({
    error: 'Too many login attempts. Please try again after 1 minute.',
  }),
};

export const otpRateLimit = {
  max: 5,
  timeWindow: '5 minutes',
  errorResponseBuilder: () => ({
    error: 'Too many OTP verification attempts. Please try again later.',
  }),
};

export const otpResendRateLimit = {
  max: 3,
  timeWindow: '15 minutes',
  errorResponseBuilder: () => ({
    error: 'Maximum OTP resend limit reached. Please try again later.',
  }),
};
