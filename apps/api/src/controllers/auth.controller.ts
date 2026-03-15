import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { z } from 'zod';
import { User } from '../models/User';
import { sendOtpEmail, sendPasswordResetEmail } from '../services/emailService';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken, generatePasswordResetToken, verifyPasswordResetToken } from '../services/tokenService';
import logger from '../config/logger';

// ── Validation Schemas ──────────────────────────────────────────────────────
const registerSchema = z.object({
    fullName: z.string().min(2),
    email: z.string().email().toLowerCase().trim(),
    phone: z.string().optional(),
    password: z.string().min(8),
    role: z.enum(['student', 'counsellor', 'university', 'vendor', 'admin', 'superadmin']).optional().default('student'),
});

const loginSchema = z.object({
    email: z.string().email().toLowerCase().trim(),
    password: z.string().min(1),
});

// ══════════════════════════════════════════════════════════════════════════════
// 1. REGISTER
// ══════════════════════════════════════════════════════════════════════════════
export const register = async (req: Request, res: Response) => {
    try {
        const parsed = registerSchema.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json({ error: parsed.error.errors[0].message });
        }
        const { fullName, email, phone, password, role } = parsed.data;

        // Check existing user
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ error: 'An account with this email already exists.' });
        }

        // Hash password
        const passwordHash = await bcrypt.hash(password, 12);

        // Create user
        const user = new User({
            fullName,
            name: fullName,
            email,
            phone,
            passwordHash,
            role,
            emailVerified: false,
        });
        await user.save();

        logger.info('User registered', { email, role });

        res.status(201).json({
            message: 'Account created successfully. Please verify your email.',
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                role: user.role,
                emailVerified: user.emailVerified,
            },
        });
    } catch (error: any) {
        logger.error('Registration failed', { error: error.message });
        res.status(500).json({ error: 'Registration failed. Please try again.' });
    }
};

// ══════════════════════════════════════════════════════════════════════════════
// 2. SEND OTP
// ══════════════════════════════════════════════════════════════════════════════
export const sendOtp = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;
        if (!email) return res.status(400).json({ error: 'Email is required.' });

        const user = await User.findOne({ email: email.toLowerCase().trim() });
        if (!user) return res.status(404).json({ error: 'No account found with this email.' });

        if (user.emailVerified) {
            return res.status(400).json({ error: 'Email is already verified.' });
        }

        // Check resend limit
        if (user.otpResendCount >= 3) {
            return res.status(429).json({ error: 'Maximum OTP resend limit reached (3). Please wait or contact support.' });
        }

        // Generate 6-digit OTP
        const otp = crypto.randomInt(100000, 999999).toString();
        const otpHash = await bcrypt.hash(otp, 10);

        user.otpHash = otpHash;
        user.otpExpiry = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes
        user.otpAttempts = 0;
        user.otpResendCount += 1;
        await user.save();

        // Send email
        const sent = await sendOtpEmail(email, otp);
        if (!sent) {
            return res.status(500).json({ error: 'Failed to send OTP email. Please try again.' });
        }

        logger.info('OTP sent', { email, resendCount: user.otpResendCount });

        res.status(200).json({ message: 'OTP sent to your email.' });
    } catch (error: any) {
        logger.error('Send OTP failed', { error: error.message });
        res.status(500).json({ error: 'Failed to send OTP.' });
    }
};

// ══════════════════════════════════════════════════════════════════════════════
// 3. VERIFY OTP
// ══════════════════════════════════════════════════════════════════════════════
export const verifyOtp = async (req: Request, res: Response) => {
    try {
        const { email, otp } = req.body;
        if (!email || !otp) return res.status(400).json({ error: 'Email and OTP are required.' });

        const user = await User.findOne({ email: email.toLowerCase().trim() });
        if (!user) return res.status(404).json({ error: 'User not found.' });

        if (user.emailVerified) {
            return res.status(400).json({ error: 'Email is already verified.' });
        }

        // Check attempt limit
        if (user.otpAttempts >= 5) {
            return res.status(429).json({ error: 'Maximum OTP attempts reached (5). Please request a new OTP.' });
        }

        // Check expiry
        if (!user.otpExpiry || new Date() > user.otpExpiry) {
            return res.status(410).json({ error: 'OTP has expired. Please request a new one.' });
        }

        // Verify
        const isValid = await bcrypt.compare(otp, user.otpHash || '');
        if (!isValid) {
            user.otpAttempts += 1;
            await user.save();
            logger.warn('Invalid OTP attempt', { email, attempts: user.otpAttempts });
            return res.status(400).json({ error: `Invalid OTP. ${5 - user.otpAttempts} attempts remaining.` });
        }

        // Success
        user.emailVerified = true;
        user.otpHash = undefined;
        user.otpExpiry = undefined;
        user.otpAttempts = 0;
        user.otpResendCount = 0;
        await user.save();

        logger.info('Email verified via OTP', { email });

        res.status(200).json({ message: 'Email verified successfully!' });
    } catch (error: any) {
        logger.error('OTP verification failed', { error: error.message });
        res.status(500).json({ error: 'Verification failed.' });
    }
};

// ══════════════════════════════════════════════════════════════════════════════
// 4. LOGIN
// ══════════════════════════════════════════════════════════════════════════════
export const login = async (req: Request, res: Response) => {
    try {
        const parsed = loginSchema.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json({ error: parsed.error.errors[0].message });
        }
        const { email, password } = parsed.data;

        const user = await User.findOne({ email });
        if (!user || !user.passwordHash) {
            logger.warn('Login failed — user not found', { email });
            return res.status(401).json({ error: 'Invalid email or password.' });
        }

        // Check account lock
        if (user.accountLockedUntil && new Date() < user.accountLockedUntil) {
            const lockMinutes = Math.ceil((user.accountLockedUntil.getTime() - Date.now()) / 60000);
            logger.warn('Login attempted on locked account', { email, lockMinutes });
            return res.status(423).json({ error: `Account is locked. Try again in ${lockMinutes} minute(s).` });
        }

        // Check email verification
        if (!user.emailVerified) {
            return res.status(403).json({ error: 'Please verify your email before logging in.', code: 'EMAIL_NOT_VERIFIED' });
        }

        // Verify password
        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) {
            user.failedLoginAttempts += 1;

            // Lock after 5 failures
            if (user.failedLoginAttempts >= 5) {
                user.accountLockedUntil = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes
                logger.warn('Account locked due to failed attempts', { email });
            }

            await user.save();
            logger.warn('Login failed — wrong password', { email, attempts: user.failedLoginAttempts });
            return res.status(401).json({ error: 'Invalid email or password.' });
        }

        // Success — reset counters
        user.failedLoginAttempts = 0;
        user.accountLockedUntil = undefined;
        user.lastLogin = new Date();

        // Generate tokens
        const payload = { user_id: user._id.toString(), email: user.email, role: user.role };
        const accessToken = generateAccessToken(payload);
        const refreshToken = generateRefreshToken(payload);

        // Store refresh token (keep max 5)
        user.refreshTokens = [...user.refreshTokens.slice(-4), refreshToken];
        await user.save();

        logger.info('Login successful', { email, role: user.role });

        res.status(200).json({
            message: 'Login successful.',
            accessToken,
            refreshToken,
            user: {
                id: user._id,
                fullName: user.fullName,
                name: user.name || user.fullName,
                email: user.email,
                role: user.role,
                avatarUrl: user.avatarUrl,
                emailVerified: user.emailVerified,
            },
        });
    } catch (error: any) {
        logger.error('Login error', { error: error.message });
        res.status(500).json({ error: 'Login failed.' });
    }
};

// ══════════════════════════════════════════════════════════════════════════════
// 5. REFRESH TOKEN
// ══════════════════════════════════════════════════════════════════════════════
export const refreshToken = async (req: Request, res: Response) => {
    try {
        const { refreshToken: token } = req.body;
        if (!token) return res.status(400).json({ error: 'Refresh token is required.' });

        const decoded = verifyRefreshToken(token);
        if (!decoded) return res.status(401).json({ error: 'Invalid or expired refresh token.' });

        const user = await User.findById(decoded.user_id);
        if (!user || !user.refreshTokens.includes(token)) {
            return res.status(401).json({ error: 'Invalid refresh token.' });
        }

        // Generate new access token
        const payload = { user_id: user._id.toString(), email: user.email, role: user.role };
        const newAccessToken = generateAccessToken(payload);

        res.status(200).json({ accessToken: newAccessToken });
    } catch (error: any) {
        logger.error('Token refresh failed', { error: error.message });
        res.status(500).json({ error: 'Token refresh failed.' });
    }
};

// ══════════════════════════════════════════════════════════════════════════════
// 6. LOGOUT
// ══════════════════════════════════════════════════════════════════════════════
export const logout = async (req: Request, res: Response) => {
    try {
        const { refreshToken: token } = req.body;
        if (!token) return res.status(400).json({ error: 'Refresh token is required.' });

        const decoded = verifyRefreshToken(token);
        if (decoded) {
            const user = await User.findById(decoded.user_id);
            if (user) {
                user.refreshTokens = user.refreshTokens.filter(t => t !== token);
                await user.save();
            }
        }

        logger.info('User logged out', { token: token.substring(0, 10) + '...' });
        res.status(200).json({ message: 'Logged out successfully.' });
    } catch (error: any) {
        res.status(500).json({ error: 'Logout failed.' });
    }
};

// ══════════════════════════════════════════════════════════════════════════════
// 7. FORGOT PASSWORD
// ══════════════════════════════════════════════════════════════════════════════
export const forgotPassword = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;
        if (!email) return res.status(400).json({ error: 'Email is required.' });

        const user = await User.findOne({ email: email.toLowerCase().trim() });
        // Always respond success (don't leak user existence)
        if (!user) {
            return res.status(200).json({ message: 'If this email exists, a password reset link has been sent.' });
        }

        const resetToken = generatePasswordResetToken(user._id.toString(), user.email);
        const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
        const resetLink = `${frontendUrl}/reset-password?token=${resetToken}`;

        user.resetToken = resetToken;
        user.resetTokenExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
        await user.save();

        await sendPasswordResetEmail(email, resetLink);
        logger.info('Password reset requested', { email });

        res.status(200).json({ message: 'If this email exists, a password reset link has been sent.' });
    } catch (error: any) {
        logger.error('Forgot password error', { error: error.message });
        res.status(500).json({ error: 'Failed to process request.' });
    }
};

// ══════════════════════════════════════════════════════════════════════════════
// 8. RESET PASSWORD
// ══════════════════════════════════════════════════════════════════════════════
export const resetPassword = async (req: Request, res: Response) => {
    try {
        const { token, newPassword } = req.body;
        if (!token || !newPassword) {
            return res.status(400).json({ error: 'Token and new password are required.' });
        }

        // Validate new password
        const passwordCheck = z.string()
            .min(8)
            .regex(/[A-Z]/)
            .regex(/[a-z]/)
            .regex(/[0-9]/)
            .regex(/[^A-Za-z0-9]/)
            .safeParse(newPassword);

        if (!passwordCheck.success) {
            return res.status(400).json({ error: 'Password must be 8+ characters with uppercase, lowercase, number, and special character.' });
        }

        const decoded = verifyPasswordResetToken(token);
        if (!decoded) return res.status(400).json({ error: 'Invalid or expired reset link.' });

        const user = await User.findById(decoded.user_id);
        if (!user || user.resetToken !== token) {
            return res.status(400).json({ error: 'Invalid reset link.' });
        }

        if (user.resetTokenExpiry && new Date() > user.resetTokenExpiry) {
            return res.status(410).json({ error: 'Reset link has expired. Please request a new one.' });
        }

        // Update password
        user.passwordHash = await bcrypt.hash(newPassword, 12);
        user.resetToken = undefined;
        user.resetTokenExpiry = undefined;
        user.failedLoginAttempts = 0;
        user.accountLockedUntil = undefined;
        user.refreshTokens = []; // Invalidate all sessions
        await user.save();

        logger.info('Password reset successful', { email: user.email });

        res.status(200).json({ message: 'Password reset successfully. Please login with your new password.' });
    } catch (error: any) {
        logger.error('Reset password error', { error: error.message });
        res.status(500).json({ error: 'Failed to reset password.' });
    }
};
