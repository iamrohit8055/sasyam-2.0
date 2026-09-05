import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import type { UserRole } from '../../types';

export interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Redirect user to their own role's primary dashboard if attempting unauthorized role access
    const roleRoutes: Record<UserRole, string> = {
      FARMER: '/farmer/dashboard',
      BUYER: '/buyer/dashboard',
      TRANSPORTER: '/transporter/dashboard',
      PROCESSOR: '/processor/dashboard',
      ADMIN: '/admin/dashboard',
    };
    return <Navigate to={roleRoutes[user.role] || '/farmer/dashboard'} replace />;
  }

  return <>{children}</>;
};
