import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';

<<<<<<< HEAD
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001';

interface User {
    id: string;
    name: string;
    fullName?: string;
    email: string;
    role?: string;
    university?: string;
    avatarUrl?: string;
    emailVerified?: boolean;
    isDemo?: boolean;
    createdAt?: string;
    [key: string]: any;
}

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<User>;
=======
interface User {
    id: string;
    studentId?: string;
    fullName: string;
    email: string;
    role?: string;
    isDemo?: boolean;
    createdAt?: string;
    [key: string]: any;
}

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<User>;
    loginWithGoogle: (token: string) => Promise<User>;
>>>>>>> 7d774d0124ee288730b3f4fb5cbb7f3b9b6a5508
    signup: (userDetails: any) => Promise<User>;
    logout: () => void;
    loading: boolean;
    isLoginModalOpen: boolean;
    setLoginModalOpen: (open: boolean) => void;
    requireAuth: (callback: () => void) => void;
<<<<<<< HEAD
    sendOtp: (email: string) => Promise<{ message: string }>;
    verifyOtp: (email: string, otp: string) => Promise<{ message: string }>;
    forgotPassword: (email: string) => Promise<{ message: string }>;
    resetPassword: (token: string, newPassword: string) => Promise<{ message: string }>;
    accessToken: string | null;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [refreshTokenValue, setRefreshTokenValue] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [isLoginModalOpen, setLoginModalOpen] = useState(false);

    // ── Restore session from storage ────────────────────────────────────
    useEffect(() => {
=======
    verifyOTP: (otp: string) => Promise<any>;
    resendOTP: () => Promise<any>;
}

const AuthContext = createContext<AuthContextType | null>(null);

const API_BASE_URL = 'http://localhost:4000/api';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(() => {
>>>>>>> 7d774d0124ee288730b3f4fb5cbb7f3b9b6a5508
        const storedUser = localStorage.getItem('eaoverseas_user');
        const storedRefresh = localStorage.getItem('eaoverseas_refresh_token');
        if (storedUser) {
            try {
<<<<<<< HEAD
                setUser(JSON.parse(storedUser));
            } catch (e) {
                console.error("Failed to parse stored user", e);
            }
        }
        if (storedRefresh) {
            setRefreshTokenValue(storedRefresh);
            // Auto-refresh access token
            refreshAccessToken(storedRefresh);
        }
        setLoading(false);

        // Sync across tabs
        const handleStorage = (e: StorageEvent) => {
            if (e.key === 'eaoverseas_user') {
                if (e.newValue) {
                    try { setUser(JSON.parse(e.newValue)); } catch { }
                } else {
                    setUser(null);
                }
            }
        };
        window.addEventListener('storage', handleStorage);
        return () => window.removeEventListener('storage', handleStorage);
    }, []);

    // ── Refresh access token ────────────────────────────────────────────
    const refreshAccessToken = useCallback(async (rToken: string) => {
        try {
            const res = await fetch(`${API_BASE}/auth/refresh-token`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ refreshToken: rToken })
            });
            if (res.ok) {
                const data = await res.json();
                setAccessToken(data.accessToken);
            }
        } catch (e) {
            console.error("Token refresh failed", e);
        }
    }, []);

    // ── Auto-refresh every 13 minutes ───────────────────────────────────
    useEffect(() => {
        if (!refreshTokenValue) return;
        const interval = setInterval(() => {
            refreshAccessToken(refreshTokenValue);
        }, 13 * 60 * 1000); // 13 minutes (token expires in 15)
        return () => clearInterval(interval);
    }, [refreshTokenValue, refreshAccessToken]);

    // ── LOGIN ───────────────────────────────────────────────────────────
    const login = async (email: string, password: string): Promise<User> => {
        const res = await fetch(`${API_BASE}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.error || 'Login failed');
        }

        const loggedInUser: User = {
            id: data.user.id,
            name: data.user.name || data.user.fullName,
            fullName: data.user.fullName,
            email: data.user.email,
            role: data.user.role,
            avatarUrl: data.user.avatarUrl,
            emailVerified: data.user.emailVerified,
            isDemo: false,
        };

        setUser(loggedInUser);
        setAccessToken(data.accessToken);
        setRefreshTokenValue(data.refreshToken);
        localStorage.setItem('eaoverseas_user', JSON.stringify(loggedInUser));
        localStorage.setItem('eaoverseas_refresh_token', data.refreshToken);

        return loggedInUser;
    };

    // ── SIGNUP ──────────────────────────────────────────────────────────
    const signup = async (userDetails: any): Promise<User> => {
        const res = await fetch(`${API_BASE}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                fullName: userDetails.name || userDetails.fullName,
                email: userDetails.email,
                phone: userDetails.phone,
                password: userDetails.password,
                role: userDetails.role?.toLowerCase() || 'student',
            })
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.error || 'Registration failed');
        }

        const newUser: User = {
            id: data.user.id,
            name: data.user.fullName,
            fullName: data.user.fullName,
            email: data.user.email,
            role: data.user.role,
            emailVerified: data.user.emailVerified,
            isDemo: false,
            createdAt: new Date().toISOString(),
        };

        // Don't auto-login until email is verified
        return newUser;
=======
                return JSON.parse(storedUser);
            } catch (e) {
                console.error("Failed to parse stored user", e);
                return null;
            }
        }
        return null;
    });
    const [loading, setLoading] = useState(false);
    const [isLoginModalOpen, setLoginModalOpen] = useState(false);

    useEffect(() => {
        // Double check token validity if needed, but for now we trust localStorage
        const storedToken = localStorage.getItem('eaoverseas_token');
        if (!storedToken) {
            setUser(null);
        }
    }, []);

    const login = async (email: string, password: string): Promise<User> => {
        // 1. Check for Virtual Consultants in LocalStorage (added via SuperAdmin)
        const savedConsultants = localStorage.getItem('eao_consultants');
        if (savedConsultants) {
            try {
                const consultants = JSON.parse(savedConsultants);
                const match = consultants.find((c: any) => 
                    c.email.toLowerCase() === email.toLowerCase() && 
                    c.password === password
                );

                if (match) {
                    console.log("[Auth] Virtual Consultant login detected:", match.name);
                    const virtualUser: User = {
                        id: match.id || match.name.replace(/\s+/g, '-').toLowerCase(),
                        fullName: match.name,
                        name: match.name,
                        email: match.email,
                        role: 'counsellor', // Force counsellor role for dashboard access
                        avatar: match.avatar,
                        isVirtual: true
                    };
                    setUser(virtualUser);
                    localStorage.setItem('eaoverseas_token', 'virtual-token-' + Date.now());
                    localStorage.setItem('eaoverseas_user', JSON.stringify(virtualUser));
                    return virtualUser;
                }
            } catch (e) {
                console.error("Error checking virtual consultants", e);
            }
        }

        // 2. Fallback to API login for real users
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Login failed');
        }

        const { user: userData, token } = await response.json();
        
        const user: User = {
            ...userData,
            name: userData.fullName || userData.name
        };

        setUser(user);
        localStorage.setItem('eaoverseas_token', token);
        localStorage.setItem('eaoverseas_user', JSON.stringify(user));
        return user;
    };

    const loginWithGoogle = async (token: string): Promise<User | any> => {
        const response = await fetch(`${API_BASE_URL}/auth/google`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Google login failed');
        }

        const data = await response.json();
        
        // If new user, return info for signup finalization
        if (data.isNewUser) {
            return data;
        }

        const { user: userData, token: jwtToken } = data;
        
        const user: User = {
            ...userData,
            name: userData.fullName || userData.name
        };

        setUser(user);
        localStorage.setItem('eaoverseas_token', jwtToken);
        localStorage.setItem('eaoverseas_user', JSON.stringify(user));
        return user;
    };

    const signup = async (userDetails: any): Promise<User> => {
        const response = await fetch(`${API_BASE_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ...userDetails,
                fullName: userDetails.name // Map frontend 'name' to backend 'fullName'
            }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Signup failed');
        }

        const { user: userData, token } = await response.json();
        
        const user: User = {
            ...userData,
            name: userData.fullName || userData.name
        };

        setUser(user);
        localStorage.setItem('eaoverseas_token', token);
        localStorage.setItem('eaoverseas_user', JSON.stringify(user));
        return user;
>>>>>>> 7d774d0124ee288730b3f4fb5cbb7f3b9b6a5508
    };

    // ── SEND OTP ────────────────────────────────────────────────────────
    const sendOtp = async (email: string): Promise<{ message: string }> => {
        const res = await fetch(`${API_BASE}/auth/send-otp`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to send OTP');
        return data;
    };

    // ── VERIFY OTP ──────────────────────────────────────────────────────
    const verifyOtp = async (email: string, otp: string): Promise<{ message: string }> => {
        const res = await fetch(`${API_BASE}/auth/verify-otp`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, otp })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'OTP verification failed');
        return data;
    };

    // ── FORGOT PASSWORD ─────────────────────────────────────────────────
    const forgotPassword = async (email: string): Promise<{ message: string }> => {
        const res = await fetch(`${API_BASE}/auth/forgot-password`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to process request');
        return data;
    };

    // ── RESET PASSWORD ──────────────────────────────────────────────────
    const resetPassword = async (token: string, newPassword: string): Promise<{ message: string }> => {
        const res = await fetch(`${API_BASE}/auth/reset-password`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token, newPassword })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Password reset failed');
        return data;
    };

    // ── LOGOUT ──────────────────────────────────────────────────────────
    const logout = async () => {
        try {
            if (refreshTokenValue) {
                await fetch(`${API_BASE}/auth/logout`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ refreshToken: refreshTokenValue })
                });
            }
        } catch (e) {
            console.error("Logout API failed", e);
        }
        setUser(null);
<<<<<<< HEAD
        setAccessToken(null);
        setRefreshTokenValue(null);
=======
        localStorage.removeItem('eaoverseas_token');
>>>>>>> 7d774d0124ee288730b3f4fb5cbb7f3b9b6a5508
        localStorage.removeItem('eaoverseas_user');
        localStorage.removeItem('eaoverseas_refresh_token');
    };

    const requireAuth = (callback: () => void) => {
        if (user) {
            callback();
        } else {
            setLoginModalOpen(true);
        }
    };

    const requireAuth = (callback: () => void) => {
        if (user) {
            callback();
        } else {
            setLoginModalOpen(true);
        }
    };

    const verifyOTP = async (otp: string): Promise<any> => {
        const token = localStorage.getItem('eaoverseas_token');
        const response = await fetch(`${API_BASE_URL}/auth/verify-otp`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ otp }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Verification failed');
        }

        const data = await response.json();
        
        // Update user object in state to reflect emailVerified: true
        if (user) {
            const updatedUser = { ...user, emailVerified: true };
            setUser(updatedUser);
            localStorage.setItem('eaoverseas_user', JSON.stringify(updatedUser));
        }
        
        return data;
    };

    const resendOTP = async (): Promise<any> => {
        const token = localStorage.getItem('eaoverseas_token');
        const response = await fetch(`${API_BASE_URL}/auth/resend-otp`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to resend OTP');
        }

        return await response.json();
    };

    return (
        <AuthContext.Provider value={{
<<<<<<< HEAD
            user, login, signup, logout, loading,
            isLoginModalOpen, setLoginModalOpen, requireAuth,
            sendOtp, verifyOtp, forgotPassword, resetPassword,
            accessToken,
=======
            user, login, loginWithGoogle, signup, logout, loading,
            isLoginModalOpen, setLoginModalOpen, requireAuth,
            verifyOTP, resendOTP
>>>>>>> 7d774d0124ee288730b3f4fb5cbb7f3b9b6a5508
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
