import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
<<<<<<<< HEAD:apps/web/src/components/guards/ProtectedRoute.tsx
import { useAuth } from '@/features/auth/context/AuthContext';
========
import { useAuth } from '../contexts/AuthContext';
>>>>>>>> 7d774d0124ee288730b3f4fb5cbb7f3b9b6a5508:apps/web/src/shared/components/ui/ProtectedRoute.tsx

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!user) {
    // Redirect to login but save the current location to redirect back after login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && user) {
    const userRole = (user.role || 'student').toLowerCase();
    const normalizedRoles = allowedRoles.map(r => r.toLowerCase());
    
    if (!normalizedRoles.includes(userRole)) {
      console.warn(`User role ${userRole} not authorized for this route. Allowed: ${normalizedRoles.join(', ')}`);
      return <Navigate to="/" replace />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;
