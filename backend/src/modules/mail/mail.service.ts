import { transporter } from '../../lib/nodemailer';

export class MailService {
  private fromEmail = process.env.FROM_EMAIL || 'saaviksolutions@gmail.com';
  private platformUrl = process.env.FRONTEND_URL || 'http://localhost:5173';

  async sendWelcomeEmail(userData: { email: string; fullName: string; studentId?: string }, password?: string) {
    const { email, fullName, studentId } = userData;

    const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to EAOverseas</title>
        <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #1e293b; background-color: #f8fafc; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 20px auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); }
            .header { background: #0d6cf2; padding: 40px 20px; text-align: center; color: #ffffff; }
            .header h1 { margin: 0; font-size: 28px; font-weight: 800; letter-spacing: -0.025em; }
            .content { padding: 40px 30px; }
            .greeting { font-size: 20px; font-weight: 700; color: #0d6cf2; margin-bottom: 20px; }
            .intro { margin-bottom: 30px; font-size: 16px; color: #475569; }
            .credentials-box { background: #f1f5f9; border: 1px solid #e2e8f0; border-radius: 8px; padding: 25px; margin-bottom: 30px; }
            .credentials-title { font-size: 14px; font-weight: 700; color: #64748b; text-transform: uppercase; margin-bottom: 15px; border-bottom: 1px solid #cbd5e1; padding-bottom: 8px; }
            .credential-item { margin-bottom: 12px; font-family: 'Courier New', Courier, monospace; font-size: 15px; }
            .credential-label { font-weight: 700; color: #1e293b; width: 100px; display: inline-block; }
            .credential-value { color: #0d6cf2; font-weight: 700; }
            .cta-button { display: inline-block; background: #0d6cf2; color: #ffffff !important; padding: 14px 28px; border-radius: 8px; font-weight: 700; text-decoration: none; margin: 20px 0; text-align: center; box-shadow: 0 4px 6px -1px rgba(13, 108, 242, 0.2); }
            .footer { background: #f8fafc; padding: 30px; text-align: center; font-size: 13px; color: #94a3b8; border-top: 1px solid #e2e8f0; }
            .footer p { margin: 5px 0; }
            .security-note { font-size: 12px; color: #94a3b8; margin-top: 20px; font-style: italic; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>EAOverseas</h1>
            </div>
            <div class="content">
                <div class="greeting">Welcome to the family, ${fullName}!</div>
                <p class="intro">We're thrilled to have you join EAOverseas. Our platform is designed to streamline your journey towards international education, providing you with the tools, community, and support you need to succeed globally.</p>
                
                <div class="credentials-box">
                    <div class="credentials-title">Your Account Credentials</div>
                    <div class="credential-item">
                        <span class="credential-label">Student ID:</span>
                        <span class="credential-value">${studentId || 'Not Generated'}</span>
                    </div>
                    <div class="credential-item">
                        <span class="credential-label">Email:</span>
                        <span class="credential-value">${email}</span>
                    </div>
                    ${password ? `
                    <div class="credential-item">
                        <span class="credential-label">Password:</span>
                        <span class="credential-value">${password}</span>
                    </div>
                    ` : ''}
                </div>

                <div style="text-align: center;">
                    <a href="${this.platformUrl}" class="cta-button">Launch EAOverseas Portal</a>
                </div>

                <p class="intro" style="margin-top: 30px;">Get started by completing your profile, exploring the global education feed, and connecting with our expert counsellors.</p>
                
                <p class="security-note">Important: Please do not share these credentials with anyone. For security, we recommend changing your password after your first login.</p>
            </div>
            <div class="footer">
                <p>&copy; 2026 EAOverseas. All rights reserved.</p>
                <p>Designed for Global Success.</p>
                <p>Support: saaviksolutions@gmail.com</p>
            </div>
        </div>
    </body>
    </html>
    `;

    try {
      await transporter.sendMail({
        from: `"EAOverseas Welcome" <${this.fromEmail}>`,
        to: email,
        subject: `Welcome to EAOverseas, ${fullName}! 🚀`,
        html: htmlContent,
      });
      console.log(`Welcome email sent to ${email}`);
    } catch (error) {
      console.error(`Failed to send welcome email to ${email}:`, error);
    }
  }

  async sendOTPEmail(email: string, fullName: string, otp: string) {
    const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verify Your Email - EAOverseas</title>
        <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #1e293b; background-color: #f8fafc; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 20px auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); }
            .header { background: #0d6cf2; padding: 40px 20px; text-align: center; color: #ffffff; }
            .header h1 { margin: 0; font-size: 28px; font-weight: 800; letter-spacing: -0.025em; }
            .content { padding: 40px 30px; text-align: center; }
            .greeting { font-size: 20px; font-weight: 700; color: #0d6cf2; margin-bottom: 20px; }
            .intro { margin-bottom: 30px; font-size: 16px; color: #475569; }
            .otp-container { background: #f1f5f9; border: 2px dashed #cbd5e1; border-radius: 12px; padding: 30px; margin: 30px 0; display: inline-block; min-width: 250px; }
            .otp-code { font-size: 42px; font-weight: 800; color: #0d6cf2; letter-spacing: 12px; font-family: 'Courier New', Courier, monospace; margin: 0; }
            .expiry-note { font-size: 13px; color: #94a3b8; margin-top: 15px; }
            .footer { background: #f8fafc; padding: 30px; text-align: center; font-size: 13px; color: #94a3b8; border-top: 1px solid #e2e8f0; }
            .security-warning { font-size: 12px; color: #ef4444; margin-top: 30px; font-style: italic; background: #fef2f2; padding: 10px; border-radius: 6px; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>EAOverseas</h1>
            </div>
            <div class="content">
                <div class="greeting">Hello, ${fullName}!</div>
                <p class="intro">To complete your sign-up and secure your account, please use the following verification code:</p>
                
                <div class="otp-container">
                    <div class="otp-code">${otp}</div>
                    <div class="expiry-note">This code is valid for 15 minutes</div>
                </div>

                <p class="intro">If you didn't request this code, you can safely ignore this email. Another user may have entered your email by mistake.</p>
                
                <div class="security-warning">
                    Important: Never share this code with anyone. EAOverseas will never ask for your verification code over the phone or email.
                </div>
            </div>
            <div class="footer">
                <p>&copy; 2026 EAOverseas. All rights reserved.</p>
                <p>Global Education, Simplified.</p>
                <p>Support: saaviksolutions@gmail.com</p>
            </div>
        </div>
    </body>
    </html>
    `;

    try {
      await transporter.sendMail({
        from: `"EAOverseas Support" <${this.fromEmail}>`,
        to: email,
        subject: `${otp} is your EAOverseas verification code`,
        html: htmlContent,
      });
      console.log(`OTP email sent to ${email}`);
    } catch (error) {
      console.error(`Failed to send OTP email to ${email}:`, error);
      throw new Error('Failed to send verification email');
    }
  }
}
