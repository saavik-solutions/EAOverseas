import { prisma } from '../../lib/prisma';
import bcrypt from 'bcryptjs';
import { MailService } from '../mail/mail.service';

export class AuthService {
  private mailService = new MailService();

  constructor() {
    // Version tag - confirms new code is loaded on server start
    console.log('[AuthService V2.1] Initialized. Using composite findFirst strategy to prevent Prisma unique-field crashes.');
  }

  private async generateStudentId(): Promise<string> {
    const prefix = 'EAO-ST-';
    let isUnique = false;
    let studentId = '';

    while (!isUnique) {
      const random = Math.floor(100000 + Math.random() * 900000).toString();
      studentId = `${prefix}${random}`;
      
      const existing = await prisma.user.findFirst({
        where: { 
          studentId,
          isActive: true
        },
      });

      if (!existing) {
        isUnique = true;
      }
    }

    return studentId;
  }

  async login(email: string, passwordHash: string) {
    if (!email) throw new Error('Email is required');

    const user = await prisma.user.findFirst({
      where: { 
        email,
        isActive: true
      },
    });

    if (!user || !user.passwordHash) {
      throw new Error('Invalid credentials');
    }

    const isValid = await bcrypt.compare(passwordHash, user.passwordHash);
    if (!isValid) {
      throw new Error('Invalid credentials');
    }

    return user;
  }

  async register(data: { 
    email: string; 
    password?: string; 
    fullName: string; 
    role: any;
    mobile?: string;
    googleId?: string;
    avatarUrl?: string;
  }) {
    if (!data.email) {
      throw new Error('Email is required for registration');
    }

    // 1. Check if email already exists
    const existingUser = await prisma.user.findFirst({
      where: { 
        email: data.email,
        isActive: true
      },
    });

    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    // 2. Restrict roles for public registration
    const allowedRoles = ['student'];
    const requestedRole = (data.role || 'student').toLowerCase();
    
    if (!allowedRoles.includes(requestedRole)) {
      throw new Error('invalid_role');
    }

    let hashedPassword = undefined;
    if (data.password) {
      hashedPassword = await bcrypt.hash(data.password, 10);
    }
    
    let studentId: string | undefined;
    if (requestedRole === 'student') {
      studentId = await this.generateStudentId();
    }

    const newUser = await prisma.user.create({
      data: {
        email: data.email,
        passwordHash: hashedPassword,
        fullName: data.fullName,
        phone: data.mobile,
        role: requestedRole as any,
        studentId,
        googleId: data.googleId,
        avatarUrl: data.avatarUrl,
        authProvider: data.googleId ? 'google' : 'email',
        emailVerified: !!data.googleId, // Google users are pre-verified
      }
    });

    // 3. Handle Verification for Email Signups
    if (!data.googleId) {
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      const otpHash = await bcrypt.hash(otp, 10);
      
      await prisma.emailOTP.create({
        data: {
          userId: newUser.id,
          otpHash,
          purpose: 'email_verification',
          expiresAt: new Date(Date.now() + 15 * 60 * 1000), // 15 mins
        }
      });

      // Send OTP Email
      await this.mailService.sendOTPEmail(newUser.email, newUser.fullName, otp);
    } else {
      // Send Welcome Email immediately for Google users
      this.mailService.sendWelcomeEmail({ ...newUser, studentId: newUser.studentId || undefined }, data.password);
    }

    return newUser;
  }

  async googleAuth(data: { token: string }) {
    // Verify the access token directly with Google
    const userInfoRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: { Authorization: `Bearer ${data.token}` },
    });
    
    if (!userInfoRes.ok) {
      throw new Error('Invalid Google access token');
    }

    const googleUser = await userInfoRes.json();
    const googleId = googleUser.sub || googleUser.id;
    const email = googleUser.email;
    const fullName = googleUser.name;
    const avatarUrl = googleUser.picture;

    console.log(`[AuthService V2.1 - GoogleAuth] Received info for: ${email} (googleId: ${googleId ? 'present' : 'MISSING'})`);

    // Extremely safe lookup - avoids passing undefined to prisma where unique field is involved
    // By adding 'isActive: true', we force Prisma to use 'findFirst' logic and avoid the strict 'findUnique' validation for unique fields that might be undefined.
    let user = null;

    if (googleId && typeof googleId === 'string' && googleId !== 'undefined') {
      user = await prisma.user.findFirst({
        where: { 
          googleId,
          isActive: true 
        }
      });
    }

    if (!user && email && typeof email === 'string' && email !== 'undefined') {
      user = await prisma.user.findFirst({
        where: { 
          email,
          isActive: true
        }
      });
    }

    if (!user) {
      // Re-verify if we have a valid ID before returning
      const finalId = googleId || googleUser.sub || googleUser.id || googleUser.uid;
      
      // Only throw if we have NEITHER a Google ID nor an email — truly unidentifiable
      if (!finalId && !email) {
        throw new Error('Google identification failed: Google returned no user ID or email');
      }
      
      console.log(`[AuthService V2.1 - GoogleAuth] New user detected: ${email}`);
      return {
        isNewUser: true,
        email: email || '',
        fullName: fullName || '',
        googleId: finalId ? String(finalId) : '',
        avatarUrl: avatarUrl || '',
      };
    }
 else if (!user.googleId) {
      console.log(`[GoogleAuth] Linking Google account to existing user: ${user.email}`);
      // Existing user found by email, link google account and proceed to login
      user = await prisma.user.update({
        where: { id: user.id },
        data: { googleId: googleId, authProvider: 'google' },
      });
    }

    console.log(`[GoogleAuth] Success: Logged in user ${user.email}`);
    return user;
  }

  async verifyOTP(userId: string, otp: string) {
    const otps = await prisma.emailOTP.findMany({
      where: {
        userId,
        purpose: 'email_verification',
        usedAt: null,
        expiresAt: { gt: new Date() }
      },
      orderBy: { createdAt: 'desc' }
    });

    if (otps.length === 0) {
      throw new Error('Invalid or expired verification code');
    }

    // Check most recent OTP
    const latestOtp = otps[0];
    
    // Check attempts limit
    if (latestOtp.attempts >= 5) {
        throw new Error('Too many failed attempts. Please request a new code.');
    }

    const isValid = await bcrypt.compare(otp, latestOtp.otpHash);
    
    if (!isValid) {
      await prisma.emailOTP.update({
        where: { id: latestOtp.id },
        data: { attempts: latestOtp.attempts + 1 }
      });
      throw new Error('Invalid verification code');
    }

    // Mark OTP as used and verify user
    await prisma.$transaction([
      prisma.emailOTP.update({
        where: { id: latestOtp.id },
        data: { usedAt: new Date() }
      }),
      prisma.user.update({
        where: { id: userId },
        data: { emailVerified: true }
      })
    ]);

    // Send Welcome Email now that they are verified
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (user) {
        this.mailService.sendWelcomeEmail({ ...user, studentId: user.studentId || undefined });
    }

    return true;
  }

  async resendOTP(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) throw new Error('User not found');
    if (user.emailVerified) throw new Error('Email already verified');

    // Invalidate old OTPs
    await prisma.emailOTP.updateMany({
      where: { userId, usedAt: null },
      data: { usedAt: new Date() } // Mark as "used" to invalidate
    });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpHash = await bcrypt.hash(otp, 10);

    await prisma.emailOTP.create({
      data: {
        userId: user.id,
        otpHash,
        purpose: 'email_verification',
        expiresAt: new Date(Date.now() + 15 * 60 * 1000),
      }
    });

    await this.mailService.sendOTPEmail(user.email, user.fullName, otp);
    return true;
  }

}
