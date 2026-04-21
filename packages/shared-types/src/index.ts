import { z } from 'zod';

// --- AUTH SCHEMAS ---

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const registerSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Must contain at least one number'),
});

export const verifyOtpSchema = z.object({
  email: z.string().email(),
  otp: z.string().length(6, 'OTP must be 6 digits'),
});

// --- PROFILE SCHEMAS ---

export const updateProfileBasicSchema = z.object({
  city: z.string().optional(),
  state: z.string().optional(),
  nationality: z.string().optional(),
  bio: z.string().max(500).optional(),
});

export const updateAcademicHistorySchema = z.object({
  tenthPercentage: z.number().min(0).max(100).optional(),
  twelfthPercentage: z.number().min(0).max(100).optional(),
  ugCgpa: z.number().min(0).max(10).optional(),
  ugInstitution: z.string().optional(),
  ugGraduationYear: z.number().optional(),
});

// --- TYPES ---

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type VerifyOtpInput = z.infer<typeof verifyOtpSchema>;
export type UpdateProfileBasicInput = z.infer<typeof updateProfileBasicSchema>;
