import { Router } from 'express';
import { register, sendOtp, verifyOtp, login, refreshToken, logout, forgotPassword, resetPassword } from '../controllers/auth.controller';
import { loginLimiter, otpLimiter, otpResendLimiter } from '../middleware/rateLimiter';

const router = Router();

router.post('/register', register);
router.post('/send-otp', otpResendLimiter, sendOtp);
router.post('/verify-otp', otpLimiter, verifyOtp);
router.post('/login', loginLimiter, login);
router.post('/refresh-token', refreshToken);
router.post('/logout', logout);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

export default router;
