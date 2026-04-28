import { Bell, Search, User, Command, Settings, LogOut, Menu } from "lucide-react";
import useAuthStore from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const Topbar = ({ onMenuClick }) => {
  const { user, logout } = useAuthStore();



  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("Secure Session Terminated.");
    navigate("/login");
  };

  return (
    <div className="h-16 md:h-24 bg-white/80 backdrop-blur-2xl px-4 md:px-10 flex items-center justify-between sticky top-0 z-30 border-b border-[var(--primary)]/[0.08]">

      {/* Mobile Menu Button & Search Wrapper */}
      <div className="flex items-center gap-3 w-full md:w-auto">
        <button
          className="lg:hidden p-2 -ml-2 text-gray-600 hover:bg-black/5 rounded-xl transition-colors shrink-0"
          onClick={onMenuClick}
        >
          <Menu size={24} />
        </button>

        {/* Search - High-End Floating Style */}
        <div className="relative w-full md:w-[480px] group flex-1 md:flex-none">
          <div className="absolute inset-y-0 left-3 md:left-5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[var(--desert-gold)] transition-colors">
            <Search size={16} strokeWidth={2} className="md:w-[18px] md:h-[18px]" />
          </div>
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-9 md:pl-12 pr-10 md:pr-16 py-2.5 md:py-4 bg-[var(--primary)]/[0.03] hover:bg-[var(--primary)]/[0.05] focus:bg-white focus:ring-[4px] focus:ring-[var(--desert-gold)]/20 border border-transparent focus:border-[var(--desert-gold)]/50 rounded-xl text-[13px] md:text-sm transition-all duration-300 outline-none placeholder-gray-400 font-medium text-[var(--on-surface)] shadow-sm focus:shadow-md"
          />
          <div className="absolute inset-y-0 right-3 md:right-4 flex items-center pointer-events-none">
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg md:rounded-xl bg-[var(--primary)]/5 text-[9px] md:text-[10px] font-medium text-gray-400 uppercase tracking-widest hidden sm:flex border border-[var(--primary)]/5">
              <Command size={12} /> K
            </div>
          </div>
        </div>
      </div>

      {/* Orchestral Actions */}
      <div className="flex items-center gap-3 md:gap-8 ml-3 shrink-0">

        {/* Quick Actions */}
        <div className="flex items-center gap-1 md:gap-2">
          <button className="relative w-9 h-9 md:w-12 md:h-12 flex items-center justify-center text-gray-400 hover:text-[var(--desert-gold)] hover:bg-[var(--desert-gold)]/8 rounded-xl transition-all duration-300 border border-transparent hover:border-[var(--desert-gold)]/20">
            <Bell size={18} strokeWidth={1.5} className="md:w-[22px] md:h-[22px]" />
            <span className="absolute top-2 md:top-3 right-2 md:right-3 w-2 h-2 md:w-2.5 md:h-2.5 bg-[var(--desert-gold)] shadow-[0_0_12px_var(--desert-gold)] border-2 border-white rounded-full animate-pulse"></span>
          </button>
          <button onClick={handleLogout} className="hidden sm:flex relative w-10 h-10 md:w-12 md:h-12 items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all duration-300 border border-transparent hover:border-red-100 group">
            <LogOut size={20} strokeWidth={1.5} className="md:w-[22px] md:h-[22px]" />
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-red-500 text-white text-[8px] font-medium uppercase tracking-widest px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">Terminate Session</div>
          </button>
        </div>

        <div className="hidden sm:block w-px h-8 md:h-10 bg-[var(--primary)]/[0.08]"></div>

        {/* User Profile - VIP Style */}
        <div className="flex items-center gap-2 md:gap-4 cursor-pointer group hover:bg-[var(--primary)]/[0.03] p-1.5 md:p-2 md:pr-5 rounded-[1rem] md:rounded-[1.25rem] transition-all border border-transparent hover:border-[var(--desert-gold)]/20">
          <div className="text-right hidden sm:block">
            <p className="text-[12px] md:text-[13px] font-manrope font-medium text-[var(--on-surface)] leading-none group-hover:text-[var(--desert-gold)] transition-colors">
              {user?.name || 'Authorized'}
            </p>
            <p className="text-[9px] md:text-[10px] text-gray-500 font-medium mt-1.5 uppercase tracking-[0.2em] group-hover:text-[var(--desert-gold)] transition-colors">
              {user?.role || 'Premium'}
            </p>
          </div>

          <div className="relative">
            <div className="w-8 h-8 md:w-11 md:h-11 rounded-full md:rounded-full bg-gradient-to-br from-[var(--tertiary)] to-[var(--primary)] flex items-center justify-center text-white shadow-lg shadow-[var(--primary)]/20 group-hover:scale-105 group-hover:shadow-[0_4px_15px_rgba(14,62,129,0.4)] transition-all border border-[var(--primary)]/10">
              <User size={16} strokeWidth={2} className="md:w-[20px] md:h-[20px] text-white transition-colors" />
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 md:w-4 md:h-4 bg-emerald-500 border-2 md:border-[3px] border-white rounded-full shadow-sm"></div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Topbar;
