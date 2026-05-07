import jwt from 'jsonwebtoken';

const ACCESS_SECRET = process.env.JWT_SECRET || 'ea_overseas_access_secret_key_2026';
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'ea_overseas_refresh_secret_key_2026';

interface TokenPayload {
    user_id: string;
    email: string;
    role: string;
}

export const generateAccessToken = (payload: TokenPayload): string => {
    return jwt.sign(payload, ACCESS_SECRET, { expiresIn: '15m' });
};

export const generateRefreshToken = (payload: TokenPayload): string => {
    return jwt.sign(payload, REFRESH_SECRET, { expiresIn: '7d' });
};

export const verifyAccessToken = (token: string): TokenPayload | null => {
    try {
        return jwt.verify(token, ACCESS_SECRET) as TokenPayload;
    } catch {
        return null;
    }
};

export const verifyRefreshToken = (token: string): TokenPayload | null => {
    try {
        return jwt.verify(token, REFRESH_SECRET) as TokenPayload;
    } catch {
        return null;
    }
};

export const generatePasswordResetToken = (userId: string, email: string): string => {
    return jwt.sign({ user_id: userId, email, purpose: 'password_reset' }, ACCESS_SECRET, { expiresIn: '10m' });
};

export const verifyPasswordResetToken = (token: string): { user_id: string; email: string } | null => {
    try {
        const decoded = jwt.verify(token, ACCESS_SECRET) as any;
        if (decoded.purpose !== 'password_reset') return null;
        return { user_id: decoded.user_id, email: decoded.email };
    } catch {
        return null;
    }
};
