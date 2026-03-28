import React from 'react';
import { CreditCard, Rocket } from 'lucide-react';

const Subscription = () => {
   return (
      <div className="space-y-12 animate-in fade-in duration-1000 font-inter pb-20">
         {/* Premium Header */}
         <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 pb-8 border-b border-slate-200">
            <div className="space-y-4">
               <div className="flex items-center gap-3 text-[var(--desert-gold)] uppercase tracking-[0.4em] text-[10px] font-black opacity-80">
                  <CreditCard size={14} strokeWidth={3} />
                  System Configuration
               </div>
               <h1 className="text-5xl font-manrope font-extrabold text-slate-900 tracking-tighter leading-tight">
                  License & Billing
               </h1>
               <p className="text-slate-500 text-sm font-medium max-w-xl leading-relaxed">
                  Monitor architectural consumption limits and maintain active enterprise subscriptions.
               </p>
            </div>
            <button
               className={`px-10 py-5 bg-black text-white rounded-xl text-[10px] font-black uppercase tracking-[0.4em] shadow-xl hover:bg-[var(--desert-gold)] hover:text-black transition-all flex items-center gap-3`}
            >
               <Rocket size={18} strokeWidth={3} />
               Upgrade Tier
            </button>
         </div>

         <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden relative p-12">
            <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-bl-[10rem] -translate-y-20 translate-x-20"></div>

            <div className="relative z-10">
               <div className="bg-black text-white rounded-xl p-10 border border-slate-800 shadow-2xl">
                  <div className="flex flex-col md:flex-row justify-between md:items-end gap-6 mb-12">
                     <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-3">Active Blueprint</p>
                        <h3 className="text-3xl font-manrope font-extrabold text-[var(--desert-gold)] tracking-tighter">Enterprise Syndicate V2</h3>
                     </div>
                     <div className="text-left md:text-right">
                        <p className="text-[12px] font-black uppercase tracking-widest text-slate-400 mb-1">Fiscal Cycle Renews</p>
                        <p className="text-xl font-manrope font-black">24 August 2024</p>
                     </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                     {[
                        { label: 'Passenger Units', used: 12450, total: 20000 },
                        { label: 'Bandwidth (GB)', used: 412, total: 1000 },
                        { label: 'Agent Seats', used: 12, total: 25 },
                     ].map((stat, i) => (
                        <div key={i} className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
                           <div className="flex justify-between items-center mb-4">
                              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{stat.label}</span>
                              <span className="text-[10px] font-black text-[var(--desert-gold)]">{Math.round((stat.used / stat.total) * 100)}%</span>
                           </div>
                           <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden mb-3">
                              <div className="h-full bg-[var(--desert-gold)]" style={{ width: `${(stat.used / stat.total) * 100}%` }}></div>
                           </div>
                           <p className="text-[11px] font-bold font-mono text-slate-300">{stat.used.toLocaleString()} / {stat.total.toLocaleString()} LIMIT</p>
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
