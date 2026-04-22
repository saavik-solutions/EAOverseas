import React, { createContext, useState, useContext, useEffect } from 'react';

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
    signup: (userDetails: any) => Promise<User>;
    logout: () => void;
    loading: boolean;
    isLoginModalOpen: boolean;
    setLoginModalOpen: (open: boolean) => void;
    requireAuth: (callback: () => void) => void;
    verifyOTP: (otp: string) => Promise<any>;
    resendOTP: () => Promise<any>;
}

const AuthContext = createContext<AuthContextType | null>(null);

const API_BASE_URL = 'http://localhost:4000/api';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [isLoginModalOpen, setLoginModalOpen] = useState(false);

    useEffect(() => {
        const storedToken = localStorage.getItem('eaoverseas_token');
        const storedUser = localStorage.getItem('eaoverseas_user');
        
        if (storedToken && storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (e) {
                console.error("Failed to parse stored user", e);
            }
        }
        setLoading(false);
    }, []);

    const login = async (email: string, password: string): Promise<User> => {
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
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('eaoverseas_token');
        localStorage.removeItem('eaoverseas_user');
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
            user, login, loginWithGoogle, signup, logout, loading,
            isLoginModalOpen, setLoginModalOpen, requireAuth,
            verifyOTP, resendOTP
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
