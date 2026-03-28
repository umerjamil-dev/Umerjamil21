import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  UserCircle,
  Calculator,
  BookOpen,
  CreditCard,
  Plane,
  LogOut,
  ChevronDown,
  FileText,
  Settings
} from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { title: 'Dashboard', icon: LayoutDashboard, path: '/' },

    {
      title: 'Sales',
      icon: Users,
      path: '/leads',
      submenu: [
        { title: 'Leads', path: '/leads' },
        { title: 'Add New Lead', path: '/leads/add' },
        { title: 'Customers', path: '/customers' }, //  added
        { title: 'Packages', path: '/packages' },
        { title: 'Calculator', path: '/calculator' },
        { title: 'Live Booking (API)', path: '/live-booking' } //  future API
      ]
    },

    {
      title: 'Reservations',
      icon: Plane,
      path: '/reservations',
      submenu: [
        { title: 'All Reservations', path: '/reservations' },
        { title: 'New Reservation', path: '/reservations/add' },

        //  important sub modules
        { title: 'Visa', path: '/reservations/visa' },
        { title: 'Hotels', path: '/reservations/hotels' },
        { title: 'Flights', path: '/reservations/flights' },
        { title: 'Transport', path: '/reservations/transport' }
      ]
    },

    {
      title: 'Bookings',
      icon: BookOpen,
      path: '/bookings',
      submenu: [
        { title: 'Booking History', path: '/bookings' },
        { title: 'New Booking', path: '/bookings/add' }
      ]
    },

    {
      title: 'Payments',
      icon: CreditCard,
      path: '/payments',
      submenu: [
        { title: 'All Payments', path: '/payments' },
        { title: 'Add Payment', path: '/payments/add' } //  added
      ]
    },

    {
      title: 'Operations (Abroad)',
      icon: Plane,
      path: '/operations',
      submenu: [
        { title: 'Overview & Dispatch', path: '/operations' },
        { title: 'Staff ', path: '/operations' },
        { title: 'Logistics Feed', path: '/operations' }
      ]
    },

    {
      title: 'Reports',
      icon: FileText,
      path: '/reports',
      submenu: [
        { title: 'Operational Intelligence', path: '/reports' },
        { title: 'Booking Analytics', path: '/reports' },
        { title: 'Payment Reports', path: '/reports' },
        { title: 'Sales Performance', path: '/reports' }
      ]
    },

    {
      title: 'Settings',
      icon: Settings,
      path: '/settings',
      submenu: [
        { title: 'Identity Protocol', path: '/settings' },
        { title: 'System Parameters', path: '/settings' },
        { title: 'Access Control', path: '/settings' },
        { title: 'API Sync', path: '/settings' }
      ]
    }
  ];

  const [openMenus, setOpenMenus] = useState({});

  useEffect(() => {
    const initialState = {};
    menuItems.forEach(item => {
      if (item.submenu) {
        const isChildActive = item.submenu.some(sub =>
          location.pathname === sub.path || (sub.path !== '/' && location.pathname.startsWith(sub.path + '/')) || (item.path !== '/' && location.pathname === item.path)
        );
        if (isChildActive) {
          initialState[item.title] = true;
        }
      }
    });
    setOpenMenus(initialState);
  }, [location.pathname]);

  const toggleMenu = (title) => {
    setOpenMenus(prev => ({
      ...prev,
      [title]: !prev[title]
    }));
  };

  const isMenuActive = (item) => {
    if (location.pathname === item.path) return true;
    if (item.submenu) {
      return item.submenu.some(sub => location.pathname === sub.path || (sub.path !== '/' && location.pathname.startsWith(sub.path + '/')));
    }
    return false;
  };

  return (
    <div
      className="w-[280px] h-screen fixed left-0 top-0 bg-[#0B0F19] text-white flex flex-col z-50 transition-all duration-300 font-inter border-r border-white/5 shadow-2xl shadow-black/50"
    >
      {/* Brand Section - High-End Editorial */}
      <div className="p-7 pb-8 flex flex-col relative border-b border-white/[0.05] bg-white/[0.01]">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[var(--primary)]/10 to-transparent rounded-bl-full pointer-events-none"></div>
        <div className="flex items-center gap-4 relative z-10">
          <div className="w-11 h-11 bg-gradient-to-br from-[#1E293B] to-[#0F172A] rounded-xl flex items-center justify-center text-white shadow-[0_8px_30px_rgb(0,0,0,0.3)] border border-white/10 shrink-0 group hover:scale-105 transition-transform">
            <Plane size={22} strokeWidth={1.5} className="text-white group-hover:-translate-y-0.5 transition-transform" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg font-manrope font-black tracking-tighter text-white uppercase leading-none">
              Al Bayan
            </h1>
            <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-[] mt-1.5 opacity-90">Premium</span>
          </div>
        </div>
      </div>

      {/* Navigation Matrix */}
      <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto custom-scrollbar">
        {menuItems.map((item, index) => {
          const isActive = isMenuActive(item);
          const isOpen = openMenus[item.title];

          return (
            <div key={index} className="flex flex-col">
              {item.submenu ? (
                <button
                  onClick={() => toggleMenu(item.title)}
                  className={`
                    w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 group
                    ${isActive
                      ? 'bg-[var(--desert-gold)]/10 border border-[var(--desert-gold)]/20 shadow-lg shadow-[var(--desert-gold)]/5'
                      : 'hover:bg-white/5 border border-transparent'}
                  `}
                >
                  <div className="flex items-center gap-3.5">
                    <span className={`transition-all duration-300 ${isActive ? 'text-[var(--desert-gold)]' : 'text-gray-400 group-hover:text-white'}`}>
                      <item.icon size={18} strokeWidth={isActive ? 2 : 1.5} />
                    </span>
                    <span className={`font-semibold text-[11px] uppercase tracking-wider transition-all ${isActive ? 'text-[var(--desert-gold)]' : 'text-gray-400 group-hover:text-white'}`}>{item.title}</span>
                  </div>
                  <ChevronDown size={14} className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''} ${isActive ? 'text-[var(--desert-gold)]' : 'text-gray-500 group-hover:text-gray-300'}`} />
                </button>
              ) : (
                <NavLink
                  to={item.path}
                  end={item.path === '/'}
                  className={({ isActive: isExactActive }) => `
                    flex items-center gap-3.5 px-4 py-3 rounded-xl transition-all duration-300 group
                    ${isExactActive || isActive
                      ? 'bg-[var(--desert-gold)]/10 border border-[var(--desert-gold)]/20 shadow-lg shadow-[var(--desert-gold)]/5'
                      : 'hover:bg-white/5 border border-transparent'}
                  `}
                >
                  <span className={`transition-all duration-300 ${isActive ? 'text-[var(--desert-gold)]' : 'text-gray-400 group-hover:text-white'}`}>
                    <item.icon size={18} strokeWidth={isActive ? 2 : 1.5} />
                  </span>
                  <span className={`font-semibold text-[11px] uppercase tracking-wider transition-all ${isActive ? 'text-[var(--desert-gold)]' : 'text-gray-400 group-hover:text-white'}`}>{item.title}</span>
                </NavLink>
              )}

              {/* Submenu */}
              {item.submenu && (
                <div
                  className={`
                    overflow-hidden transition-all duration-500 ease-in-out
                    ${isOpen ? 'max-h-[800px] opacity-100 mt-1.5 mb-2' : 'max-h-0 opacity-0'}
                  `}
                >
                  <div className="flex flex-col gap-0.5 pl-[2.6rem] pr-2 relative">
                    {/* Subtle connecting line */}
                    <div className="absolute left-[20px] top-2 bottom-2 w-[1px] bg-gradient-to-b from-white/20 via-white/10 to-transparent"></div>

                    {item.submenu.map((subItem, subIndex) => {
                      const isSubActive = location.pathname === subItem.path || (subItem.path !== '/' && location.pathname.startsWith(subItem.path + '/'));
                      return (
                        <NavLink
                          key={subIndex}
                          to={subItem.path}
                          end={subItem.path === item.path}
                          className={`
                            relative flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-300 group/sub
                            ${isSubActive
                              ? 'bg-gradient-to-r from-white/5 to-transparent'
                              : 'hover:bg-white/[0.03]'}
                          `}
                        >
                          {/* Active Indicator Dot overriding the line */}
                          {isSubActive && <div className="absolute -left-[23.5px] w-1.5 h-1.5 rounded-full bg-[var(--desert-gold)] shadow-[0_0_10px_var(--desert-gold)] z-10"></div>}
                          {!isSubActive && <div className="absolute -left-[23px] w-1 h-1 rounded-full bg-gray-600 group-hover/sub:bg-[var(--desert-gold)] group-hover/sub:scale-150 transition-all z-10"></div>}

                          <span className={`font-medium text-[10px] uppercase tracking-[0.1em] transition-all ${isSubActive ? 'text-[var(--desert-gold)] translate-x-1' : 'text-gray-400 group-hover/sub:text-white group-hover/sub:translate-x-1'}`}>
                            {subItem.title}
                          </span>
                        </NavLink>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Profile & Support - Minimalist Footer */}
      <div className="p-6 border-t border-white/5 relative overflow-hidden bg-white/[0.01]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1E293B] to-[#0F172A] border border-white/10 flex items-center justify-center text-white text-xs font-black shadow-lg shadow-black/20 shrink-0">AZ</div>
          <div className="flex-1 overflow-hidden">
            <p className="text-[11px] font-bold text-white uppercase tracking-wider truncate">Admin Zeal</p>
            <div className="flex items-center gap-1.5 mt-1">
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--desert-gold)] shadow-[0_0_10px_var(--desert-gold)] animate-pulse"></div>
              <p className="text-[8px] text-[var(--desert-gold)] uppercase tracking-widest truncate">Prime Controller</p>
            </div>
          </div>
          <button className="p-2.5 rounded-xl hover:bg-white/10 text-gray-400 hover:text-white transition-all cursor-pointer">
            <LogOut size={16} strokeWidth={2} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
