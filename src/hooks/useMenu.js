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
  Settings,
  UserCircle
} from 'lucide-react';

export const useFilteredMenu = () => {
  const { permissions: masterPermissions } = useSettingsStore();
  const { user } = useAuthStore();
  const userPermissions = useMemo(() => {
    return user?.permissions || user?.role?.permissions || [];
  }, [user]);

  const isAdmin = !!user?.is_admin;

  // Helper to check if user has a permission
  const hasPermission = (perm) => {
    if (!perm) return true;
    if (isAdmin) return true; // Admin has all permissions

    return userPermissions.some(p => {
      const pName = (typeof p === 'object' ? p.name : p) || '';
      return pName.toLowerCase() === perm.toLowerCase();
    });
  };
  // console.log('userPermissions', userPermissions);


  return useMemo(() => {
    const menuItems = [
      {
        title: 'Dashboard',
        icon: LayoutDashboard,
        path: '/',
        permission: 'VIEW_DASHBOARD'
      },
      // {
      //   title: 'Personal Hub',
      //   icon: UserCircle,
      //   path: '/personal-dashboard',
      //   permission: 'VIEW_PERSONAL_DASHBOARD'
      // },

      user?.calculation_id && {
        title: 'My Profile',
        icon: UserCircle,
        path: `/customer-profile/${user.calculation_id}`,
        permission: 'VIEW_MY_PROFILE'
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
          // { title: 'Live Booking (API)', path: '/live-booking', permission: 'VIEW_LIVE_BOOKING' }
        ]
      },

      {
        title: 'Reservation',
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
          { title: 'Assignment', path: '/operations/assignment', permission: 'VIEW_ASSIGNMENT' },
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
          { title: 'Booking Analytics', path: '/reports/bookings', permission: 'VIEW_BOOKING_ANALYTICS' },
          { title: 'Service Status Report', path: '/reports/service-status', permission: 'VIEW_SERVICE_STATUS' },
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
          // { title: 'Master Types', path: '/settings/master-types', permission: 'MANAGE_MASTER_TYPES' },
          { title: 'API Sync', path: '/settings/api', permission: 'MANAGE_API_SYNC' },
          { title: 'Subscription', path: '/settings/subscription', permission: 'MANAGE_SUBSCRIPTION' },
          { title: 'Personnel Registry', path: '/settings/users', permission: 'MANAGE_USERS' },
          { title: 'Identity Protocol', path: '/settings/profile', permission: 'MANAGE_PROFILE' }
        ]
      }
    ];

    // Filter menu items based on permission
    return menuItems
      .filter(item => item && (!item.permission || hasPermission(item.permission)))
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
      .filter(item => {
        // Keep Dashboard and My Profile even if they don't have submenus
        if (item.title === 'Dashboard' || item.title === 'My Profile') return true;
        // For others, only keep if they have no submenu OR an active submenu
        return !item.submenu || (item.submenu && item.submenu.length > 0);
      });
  }, [user, userPermissions, isAdmin]);
};
