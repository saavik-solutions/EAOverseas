import nodemailer from 'nodemailer';
import logger from '../config/logger';

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false,
    auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
    },
});

export const sendOtpEmail = async (email: string, otp: string): Promise<boolean> => {
    try {
        await transporter.sendMail({
            from: `"EA Overseas" <${process.env.SMTP_FROM || 'otp@saaviksolutions.in'}>`,
            to: email,
            subject: 'Verify your EA Overseas account',
            html: `
                <div style="font-family: 'Inter', Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px; background: #f8fafc; border-radius: 16px;">
                    <div style="text-align: center; margin-bottom: 24px;">
                        <div style="display: inline-flex; align-items: center; gap: 8px;">
                            <div style="width: 36px; height: 36px; background: #0d6cf2; border-radius: 10px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 18px;">E</div>
                            <span style="font-size: 20px; font-weight: 800; color: #0f172a;">EAOverseas</span>
                        </div>
                    </div>
                    <div style="background: white; border-radius: 12px; padding: 32px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                        <h2 style="color: #0f172a; margin: 0 0 8px; font-size: 22px;">Email Verification</h2>
                        <p style="color: #64748b; margin: 0 0 24px; font-size: 14px;">Use the code below to verify your account.</p>
                        <div style="text-align: center; padding: 20px; background: #f1f5f9; border-radius: 12px; margin-bottom: 24px;">
                            <span style="font-size: 36px; font-weight: 900; letter-spacing: 8px; color: #0d6cf2; font-family: monospace;">${otp}</span>
                        </div>
                        <p style="color: #94a3b8; font-size: 12px; text-align: center; margin: 0;">This code will expire in <strong>5 minutes</strong>.</p>
                    </div>
                    <p style="color: #cbd5e1; font-size: 11px; text-align: center; margin-top: 16px;">If you didn't request this, please ignore this email.</p>
                </div>
            `,
        });
        logger.info('OTP email sent', { email });
        return true;
    } catch (error: any) {
        logger.error('Failed to send OTP email', { email, error: error.message });
        return false;
    }
};

export const sendPasswordResetEmail = async (email: string, resetLink: string): Promise<boolean> => {
    try {
        await transporter.sendMail({
            from: `"EA Overseas" <${process.env.SMTP_FROM || 'otp@saaviksolutions.in'}>`,
            to: email,
            subject: 'Reset your EA Overseas password',
            html: `
                <div style="font-family: 'Inter', Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px; background: #f8fafc; border-radius: 16px;">
                    <div style="text-align: center; margin-bottom: 24px;">
                        <div style="display: inline-flex; align-items: center; gap: 8px;">
                            <div style="width: 36px; height: 36px; background: #0d6cf2; border-radius: 10px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 18px;">E</div>
                            <span style="font-size: 20px; font-weight: 800; color: #0f172a;">EAOverseas</span>
                        </div>
                    </div>
                    <div style="background: white; border-radius: 12px; padding: 32px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                        <h2 style="color: #0f172a; margin: 0 0 8px; font-size: 22px;">Password Reset</h2>
                        <p style="color: #64748b; margin: 0 0 24px; font-size: 14px;">Click the button below to reset your password.</p>
                        <a href="${resetLink}" style="display: block; text-align: center; padding: 14px 24px; background: #0d6cf2; color: white; font-weight: 700; font-size: 14px; border-radius: 10px; text-decoration: none; margin-bottom: 24px;">Reset Password</a>
                        <p style="color: #94a3b8; font-size: 12px; text-align: center; margin: 0;">This link will expire in <strong>10 minutes</strong>.</p>
                    </div>
                    <p style="color: #cbd5e1; font-size: 11px; text-align: center; margin-top: 16px;">If you didn't request this, please ignore this email.</p>
                </div>
            `,
        });
        logger.info('Password reset email sent', { email });
        return true;
    } catch (error: any) {
        logger.error('Failed to send reset email', { email, error: error.message });
        return false;
    }
};
