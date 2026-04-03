import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import { useFilteredMenu } from '../hooks/useMenu';

const ProtectedRoute = ({ children, permission }) => {
  const { isAuthenticated, isLoading, user } = useAuthStore();
  const menu = useFilteredMenu();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0B0F19]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--desert-gold)]"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Permission Check (if provided)
  if (permission && !user?.is_admin) {
    const userPermissions = user?.permissions || [];
    const hasPermission = userPermissions.some(p => {
      const pName = (typeof p === 'object' ? p.name : p) || '';
      return pName.toLowerCase() === permission.toLowerCase();
    });

    if (!hasPermission) {
      console.warn(`[ProtectedRoute] Access denied for permission: ${permission}`);
      
      // Redirect to the first available menu item if possible
      if (menu && menu.length > 0) {
        const firstAvailablePath = menu[0].path || (menu[0].submenu && menu[0].submenu[0]?.path);
        if (firstAvailablePath) {
          return <Navigate to={firstAvailablePath} replace />;
        }
      }
      
      return <Navigate to="/login" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;
