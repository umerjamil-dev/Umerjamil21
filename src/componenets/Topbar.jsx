import { Bell, Search, User, Command, Settings } from "lucide-react";

const Topbar = () => {
  return (
    <div className="h-24 bg-white/80 backdrop-blur-2xl px-10 flex items-center justify-between sticky top-0 z-40 border-b border-black/[0.04]">
      {/* Search - High-End Floating Style */}
      <div className="relative w-[480px] group">
        <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[var(--primary)] transition-colors">
          <Search size={18} strokeWidth={2} />
        </div>
        <input
          type="text"
          placeholder="Search pilgrims, manifests, or ledgers..."
          className="w-full pl-12 pr-16 py-4 bg-black/[0.02] hover:bg-black/[0.04] focus:bg-white focus:ring-[4px] focus:ring-[var(--primary)]/10 border border-transparent focus:border-[var(--primary)]/20 rounded-2xl text-sm transition-all duration-300 outline-none placeholder-gray-400 font-medium text-gray-800 shadow-sm focus:shadow-md"
        />
        <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-black/5 text-[10px] font-bold text-gray-400 uppercase tracking-widest hidden lg:flex border border-black/5">
            <Command size={12} /> K
          </div>
        </div>
      </div>

      {/* Orchestral Actions */}
      <div className="flex items-center gap-8">
        
        {/* Quick Actions */}
        <div className="flex items-center gap-2">
            <button className="relative w-12 h-12 flex items-center justify-center text-gray-400 hover:text-[var(--primary)] hover:bg-[var(--primary)]/5 rounded-2xl transition-all duration-300 border border-transparent hover:border-[var(--primary)]/10">
              <Bell size={22} strokeWidth={1.5} />
              <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full animate-pulse"></span>
            </button>
            <button className="relative w-12 h-12 flex items-center justify-center text-gray-400 hover:text-[var(--primary)] hover:bg-[var(--primary)]/5 rounded-2xl transition-all duration-300 border border-transparent hover:border-[var(--primary)]/10">
              <Settings size={22} strokeWidth={1.5} />
            </button>
        </div>

        <div className="w-px h-10 bg-black/[0.05]"></div>

        {/* User Profile - VIP Style */}
        <div className="flex items-center gap-4 cursor-pointer group hover:bg-black/[0.02] p-2 pr-5 rounded-[1.25rem] transition-all border border-transparent hover:border-black/[0.05]">
          <div className="text-right">
            <p className="text-[13px] font-manrope font-extrabold text-gray-800 leading-none group-hover:text-[var(--primary)] transition-colors">Khalid Al-Bakri</p>
            <p className="text-[10px] text-gray-500 font-bold mt-1.5 uppercase tracking-[0.2em] group-hover:text-gray-600 transition-colors">Chief Concierge</p>
          </div>
          
          <div className="relative">
            <div className="w-11 h-11 rounded-[1.25rem] bg-gradient-to-br from-[#1E293B] to-[#0F172A] flex items-center justify-center text-white shadow-lg shadow-black/10 group-hover:scale-105 transition-transform border border-black/10">
              <User size={20} strokeWidth={2} className="text-gray-300 group-hover:text-white transition-colors" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-[3px] border-white rounded-full shadow-sm"></div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Topbar;
