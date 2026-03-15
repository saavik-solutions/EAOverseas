import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/shared/contexts/AuthContext';

interface ProtectedRouteProps {
    children: React.ReactNode;
    requiredRoles?: string[];
}

/**
 * Guards routes so only authenticated users can access them.
 * Unauthenticated users are redirected to /login with the intended
 * destination stored in `state.from` for post-login redirect.
 */
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRoles }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    // Still loading auth state — show nothing (avoid flash)
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-white">
                <span className="material-symbols-outlined text-4xl text-[#0d6cf2] animate-spin">progress_activity</span>
            </div>
        );
    }

    // Not authenticated → redirect to login
    if (!user) {
        return <Navigate to="/login" state={{ from: location.pathname }} replace />;
    }

    // Role check (if specified)
    if (requiredRoles && requiredRoles.length > 0) {
        const userRole = (user.role || '').toLowerCase();
        if (!requiredRoles.map(r => r.toLowerCase()).includes(userRole)) {
            return <Navigate to="/landing" replace />;
        }
    }

    return <>{children}</>;
};

export default ProtectedRoute;
