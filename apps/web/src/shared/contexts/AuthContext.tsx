import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check local storage for persistent session
        const storedUser = localStorage.getItem('eaoverseas_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = (email, password) => {
        return new Promise((resolve, reject) => {
            // ADMIN LOGIN (Full/Demo Mode)
            if (email === 'alex.j@example.com' && password === '5678') {
                const adminUser = {
                    name: 'Alex Johnson',
                    email: 'alex.j@example.com',
                    isDemo: true, // This flag enables all the AI/Pre-filled content
                };
                setUser(adminUser);
                localStorage.setItem('eaoverseas_user', JSON.stringify(adminUser));
                resolve(adminUser);
                return;
                return;
            }

            // COUNSELLOR LOGIN (Demo Mode)
            if (email === 'partner@counsellor.com' && password === 'COUNSELLOR2026') {
                const counsellorUser = {
                    name: 'Dr. Alex Morgan',
                    email: 'partner@counsellor.com',
                    role: 'Counsellor',
                    isDemo: true,
                };
                setUser(counsellorUser);
                localStorage.setItem('eaoverseas_user', JSON.stringify(counsellorUser));
                resolve(counsellorUser);
                return;
            }

            // CHECK REGISTERED USERS
            const registeredUsers = JSON.parse(localStorage.getItem('eaoverseas_registered_users') || '[]');
            const foundUser = registeredUsers.find(u => u.email === email && u.password === password);

            if (foundUser) {
                // Ensure isDemo is false for real users
                const realUser = { ...foundUser, isDemo: false };
                delete realUser.password; // Don't store password in session
                setUser(realUser);
                localStorage.setItem('eaoverseas_user', JSON.stringify(realUser));
                resolve(realUser);
            } else {
                reject(new Error('Invalid credentials. Only admin@eaoverseas.com or registered users allowed.'));
            }
        });
    };

    const signup = (userDetails) => {
        return new Promise((resolve) => {
            const newUser = {
                ...userDetails,
                isDemo: false, // Fresh account
                createdAt: new Date().toISOString()
            };

            // Store in "DB" (localStorage)
            const registeredUsers = JSON.parse(localStorage.getItem('eaoverseas_registered_users') || '[]');
            registeredUsers.push(newUser);
            localStorage.setItem('eaoverseas_registered_users', JSON.stringify(registeredUsers));

            // Auto login
            const sessionUser = { ...newUser };
            delete sessionUser.password;
            setUser(sessionUser);
            localStorage.setItem('eaoverseas_user', JSON.stringify(sessionUser));

            resolve(sessionUser);
        });
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('eaoverseas_user');
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
