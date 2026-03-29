import React from 'react';
import { CreditCard, Rocket } from 'lucide-react';

const Subscription = () => {
   return (
      <div className="space-y-16 animate-in fade-in duration-1000 font-inter pb-20 bg-[#f8f9fa] min-h-screen">
         {/* Architectural Header */}
         <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 pb-12 border-b border-gray-200 mt-8">
            <div className="space-y-5">
               <div className="flex items-center gap-3 text-[#D4AF37] uppercase tracking-[0.4em] text-[10px] font-black">
                  <CreditCard size={14} strokeWidth={2.5} />
                  System Configuration
               </div>
               <h1 className="text-5xl md:text-6xl font-manrope font-extrabold tracking-tighter leading-tight text-[#111827]">
                  License & Billing
               </h1>
               <p className="text-gray-500 text-sm md:text-base font-medium max-w-xl leading-relaxed">
                  Monitor architectural consumption limits and maintain active enterprise subscriptions.
               </p>
            </div>
            <button
               className="px-10 py-5 rounded-full text-[11px] font-black uppercase tracking-[0.3em] shadow-lg transition-all flex items-center gap-3 shrink-0 bg-[#111827] text-white hover:bg-[#D4AF37] hover:text-[#111827] hover:scale-105"
            >
               <Rocket size={18} strokeWidth={2.5} />
               Upgrade Tier
            </button>
         </div>

         {/* Light Content Vessel */}
         <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-6 md:p-10">
            <div className="relative z-10">
               {/* Deep Vault Card */}
               <div className="bg-gray-50 text-[#111827] rounded-2xl p-8 md:p-12 border border-gray-200 shadow-sm">
                  <div className="flex flex-col md:flex-row justify-between md:items-end gap-6 mb-16 pb-10 border-b border-gray-200 relative">
                     <div>
                        <p className="text-[11px] font-black text-gray-500 uppercase tracking-[0.4em] mb-4">Active Blueprint</p>
                        <h3 className="text-4xl md:text-5xl font-manrope font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#bfa035] tracking-tighter">Enterprise Syndicate V2</h3>
                     </div>
                     <div className="text-left md:text-right">
                        <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-2">Fiscal Cycle Renews</p>
                        <p className="text-xl md:text-2xl font-manrope font-black text-[#111827]">24 August 2024</p>
                     </div>
                     
                     {/* Ambient Glow */}
                     <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-[80px] pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                     {[
                        { label: 'Passenger Units', used: 12450, total: 20000 },
                        { label: 'Bandwidth (GB)', used: 412, total: 1000 },
                        { label: 'Agent Seats', used: 12, total: 25 },
                     ].map((stat, i) => (
                        <div key={i} className="bg-white border-2 border-gray-100 hover:border-[#D4AF37] hover:shadow-md transition-all duration-500 p-8 rounded-xl flex flex-col justify-between group">
                           <div>
                              <div className="flex justify-between items-center mb-6">
                                 <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">{stat.label}</span>
                                 <span className="text-[12px] font-black text-[#D4AF37]">{Math.round((stat.used / stat.total) * 100)}%</span>
                              </div>
                              <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden mb-5">
                                 <div className="h-full bg-gradient-to-r from-[#D4AF37] to-[#f2ca50] shadow-sm transition-all duration-1000 ease-out" style={{ width: `${(stat.used / stat.total) * 100}%` }}></div>
                              </div>
                           </div>
                           <p className="text-[12px] font-bold font-mono text-gray-400 group-hover:text-[#111827] transition-colors tracking-wider">
                              <span className="text-[#111827]">{stat.used.toLocaleString()}</span> / {stat.total.toLocaleString()} LIMIT
                           </p>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Subscription;
