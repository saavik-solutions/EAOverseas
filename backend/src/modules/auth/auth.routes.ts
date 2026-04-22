import { FastifyInstance } from 'fastify';
import { login, register, me, googleAuth, verifyOtp, resendOtp } from './auth.controller';
import { authenticate } from '../../lib/middleware/authenticate';

export default async function authRoutes(app: FastifyInstance) {
  app.post('/login', login);
  app.post('/register', register);
  app.post('/google', googleAuth);
  app.get('/me', { preHandler: [authenticate] }, me);
  
  // OTP Verification Routes
  app.post('/verify-otp', { preHandler: [authenticate] }, verifyOtp);
  app.post('/resend-otp', { preHandler: [authenticate] }, resendOtp);
}
