import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { MENU_ITEMS } from '../utils/constants';

const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  // Get user's menu items based on role
  const getUserMenuItems = () => {
    if (!context.user || !context.user.role) {
      return [];
    }
    return MENU_ITEMS[context.user.role] || [];
  };

  // Check if user has permission for a specific route
  const hasPermission = (route) => {
    const menuItems = getUserMenuItems();
    return menuItems.some(item => item.path === route);
  };

  // Check if user has a specific role
  const hasRole = (role) => {
    return context.user?.role === role;
  };

  // Check if user has any of the specified roles
  const hasAnyRole = (roles) => {
    if (!Array.isArray(roles)) {
      return hasRole(roles);
    }
    return roles.includes(context.user?.role);
  };

  return {
    ...context,
    getUserMenuItems,
    hasPermission,
    hasRole,
    hasAnyRole
  };
};

export default useAuth;
