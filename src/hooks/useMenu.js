import { useMemo } from 'react';
import useSettingsStore from '../store/useSettingsStore';
import useAuthStore from '../store/useAuthStore';
import {
  LayoutDashboard,
  Users,
  Plane,
  BookOpen,
  CreditCard,
  FileText,
  Settings
} from 'lucide-react';

export const useFilteredMenu = () => {
  const { permissions: masterPermissions } = useSettingsStore();
  const { user } = useAuthStore();
  
  console.log('[useMenu] User Data:', user);
  console.log('[useMenu] Master Permissions:', masterPermissions);

  const userPermissions = user?.permissions || user?.role?.permissions || [];
  console.log('[useMenu] User Specific Permissions:', userPermissions);

  // Helper to check if user has a permission
  const hasPermission = (perm) => {
    if (!perm) return true;
    
    // STRICT MODE: Only show what is explicitly returned by the backend
    const checkList = userPermissions.length > 0 ? userPermissions : [];
    
    const found = checkList.some(p => {
      const pName = (typeof p === 'object' ? p.name : p) || '';
      return pName.toLowerCase() === perm.toLowerCase();
    });

    return found;
  };

  return useMemo(() => {
    const menuItems = [
      { 
        title: 'Dashboard', 
        icon: LayoutDashboard, 
        path: '/', 
        permission: 'VIEW_DASHBOARD' 
      },

      {
        title: 'Sales',
        icon: Users,
        path: '/leads',
        permission: 'VIEW_SALES',
        submenu: [
          { title: 'Leads', path: '/leads', permission: 'VIEW_LEADS' },
          { title: 'Add New Lead', path: '/leads/add', permission: 'CREATE_LEADS' },
          { title: 'Customers', path: '/customers', permission: 'VIEW_CUSTOMERS' },
          { title: 'Packages', path: '/packages', permission: 'VIEW_PACKAGES' },
          { title: 'Calculator', path: '/calculator', permission: 'USE_CALCULATOR' },
          { title: 'Live Booking (API)', path: '/live-booking', permission: 'VIEW_LIVE_BOOKING' }
        ]
      },

      {
        title: 'Reservations',
        icon: Plane,
        path: '/reservations',
        permission: 'VIEW_RESERVATIONS',
        submenu: [
          { title: 'All Reservations', path: '/reservations', permission: 'VIEW_RESERVATIONS' },
          { title: 'New Reservation', path: '/reservations/add', permission: 'CREATE_RESERVATIONS' },
          { title: 'Visa', path: '/reservations/visa', permission: 'VIEW_VISA' },
          { title: 'Hotels', path: '/reservations/hotels', permission: 'VIEW_HOTELS' },
          { title: 'Flights', path: '/reservations/flights', permission: 'VIEW_FLIGHTS' },
          { title: 'Transport', path: '/reservations/transport', permission: 'VIEW_TRANSPORT' }
        ]
      },

      {
        title: 'Bookings',
        icon: BookOpen,
        path: '/bookings',
        permission: 'VIEW_BOOKINGS',
        submenu: [
          { title: 'Booking History', path: '/bookings', permission: 'VIEW_BOOKINGS' },
          { title: 'New Booking', path: '/bookings/add', permission: 'CREATE_BOOKINGS' }
        ]
      },

      {
        title: 'Payments',
        icon: CreditCard,
        path: '/payments',
        permission: 'VIEW_PAYMENTS',
        submenu: [
          { title: 'All Payments', path: '/payments', permission: 'VIEW_PAYMENTS' },
          { title: 'Add Payment', path: '/payments/add', permission: 'CREATE_PAYMENTS' }
        ]
      },

      {
        title: 'Operations (Abroad)',
        icon: Plane,
        path: '/operations',
        permission: 'VIEW_OPERATIONS',
        submenu: [
          { title: 'Overview & Dispatch', path: '/operations', permission: 'VIEW_OPERATIONS' },
          { title: 'Staff', path: '/operations/staff', permission: 'VIEW_OPERATIONS_STAFF' },
          { title: 'Logistics Feed', path: '/operations/logistics', permission: 'VIEW_LOGISTICS' }
        ]
      },

      {
        title: 'Reports',
        icon: FileText,
        path: '/reports',
        permission: 'VIEW_REPORTS',
        submenu: [
          { title: 'Operational Intelligence', path: '/reports', permission: 'VIEW_REPORTS' },
          { title: 'Booking Analytics', path: '/reports/bookings', permission: 'VIEW_BOOKING_ANALYTICS' },
          { title: 'Payment Reports', path: '/reports/payments', permission: 'VIEW_PAYMENT_REPORTS' },
          { title: 'Sales Performance', path: '/reports/sales', permission: 'VIEW_SALES_PERFORMANCE' }
        ]
      },

      {
        title: 'Settings',
        icon: Settings,
        path: '/settings',
        permission: 'VIEW_SETTINGS',
        submenu: [
          { title: 'Company Core', path: '/settings/company', permission: 'MANAGE_COMPANY' },
          { title: 'Roles', path: '/settings/roles', permission: 'MANAGE_ROLES' },
          { title: 'Permissions', path: '/settings/permissions', permission: 'MANAGE_PERMISSIONS' },
          { title: 'Assign Permissions', path: '/settings/assign-permissions', permission: 'ASSIGN_PERMISSIONS' },
          { title: 'Master Types', path: '/settings/master-types', permission: 'MANAGE_MASTER_TYPES' },
          { title: 'API Sync', path: '/settings/api', permission: 'MANAGE_API_SYNC' },
          { title: 'Subscription', path: '/settings/subscription', permission: 'MANAGE_SUBSCRIPTION' },
          { title: 'Personnel Registry', path: '/settings/users', permission: 'MANAGE_USERS' },
          { title: 'Identity Protocol', path: '/settings/profile', permission: 'MANAGE_PROFILE' }
        ]
      }
    ];

    // Filter menu items based on permission
    const filteredItems = menuItems
      .filter(item => !item.permission || hasPermission(item.permission))
      .map(item => {
        if (item.submenu) {
          const filteredSubmenu = item.submenu.filter(sub => 
            !sub.permission || hasPermission(sub.permission)
          );
          
          return {
            ...item,
            submenu: filteredSubmenu.length > 0 ? filteredSubmenu : undefined
          };
        }
        return item;
      })
      .filter(item => !item.submenu || (item.submenu && item.submenu.length > 0));

    console.log('[useMenu] Final Filtered Menu:', filteredItems, "userPermissions", userPermissions);
    return filteredItems;
  }, [userPermissions, masterPermissions, hasPermission]);
};
