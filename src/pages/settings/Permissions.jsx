import React from 'react';
import { Lock, Plus } from 'lucide-react';

const Permissions = () => {
   return (
      <div className="space-y-12 animate-in fade-in duration-1000 font-inter pb-20">
         {/* Premium Header */}
         <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 pb-8 border-b border-slate-200">
            <div className="space-y-4">
               <div className="flex items-center gap-3 text-[var(--desert-gold)] uppercase tracking-[0.4em] text-[10px] font-black opacity-80">
                  <Lock size={14} strokeWidth={3} />
                  System Configuration
               </div>
               <h1 className="text-5xl font-manrope font-extrabold text-slate-900 tracking-tighter leading-tight">
                  Granular Authorizations
               </h1>
               <p className="text-slate-500 text-sm font-medium max-w-xl leading-relaxed">
                  Define discrete actions and functional constraints enforced upon the CRM environment.
               </p>
            </div>
            <button
               className={`px-10 py-5 bg-black text-white rounded-xl text-[10px] font-black uppercase tracking-[0.4em] shadow-xl hover:bg-[var(--desert-gold)] hover:text-black transition-all flex items-center gap-3`}
            >
               <Plus size={18} strokeWidth={3} />
               Forging Rule
            </button>
         </div>

         <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden relative p-12">
            <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-bl-[10rem] -translate-y-20 translate-x-20"></div>
            
            <div className="relative z-10 space-y-4">
               {['Create Lead', 'Approve Payment', 'Export Revenue Data', 'Delete Record', 'Manage Users'].map((p, i) => (
                  <div key={i} className="flex items-center justify-between p-6 bg-white border border-slate-100 rounded-xl hover:border-black transition-all group shadow-sm">
                     <span className="text-[12px] font-black uppercase tracking-widest text-slate-900">{p}</span>
                     <div className="w-10 h-5 bg-black rounded-full relative p-1 cursor-pointer">
                        <div className="w-3 h-3 bg-[var(--desert-gold)] rounded-full absolute right-1"></div>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>
   );
};

export default Permissions;
