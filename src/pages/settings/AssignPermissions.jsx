import React from 'react';
import { Sliders, Save } from 'lucide-react';

const AssignPermissions = () => {
   return (
      <div className="space-y-12 animate-in fade-in duration-1000 font-inter pb-20">
         {/* Premium Header */}
         <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 pb-8 border-b border-slate-200">
            <div className="space-y-4">
               <div className="flex items-center gap-3 text-[var(--desert-gold)] uppercase tracking-[0.4em] text-[10px] font-black opacity-80">
                  <Sliders size={14} strokeWidth={3} />
                  System Configuration
               </div>
               <h1 className="text-5xl font-manrope font-extrabold text-slate-900 tracking-tighter leading-tight">
                  Protocol Mapping
               </h1>
               <p className="text-slate-500 text-sm font-medium max-w-xl leading-relaxed">
                  Bind specific authorizations to architectural tiers to securely delegate organizational capability.
               </p>
            </div>
            <button
               className={`px-10 py-5 bg-black text-white rounded-xl text-[10px] font-black uppercase tracking-[0.4em] shadow-xl hover:bg-[var(--desert-gold)] hover:text-black transition-all flex items-center gap-3`}
            >
               <Save size={18} strokeWidth={3} />
               Synchronize Matrix
            </button>
         </div>

         <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden relative p-12">
            <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-bl-[10rem] -translate-y-20 translate-x-20"></div>
            
            <div className="relative z-10 max-w-3xl">
               <div className="bg-slate-50 p-8 rounded-xl border border-slate-200 shadow-inner">
                  <select className="w-full p-5 bg-white border border-slate-100 rounded-xl uppercase font-black text-[12px] tracking-widest outline-none transition-all focus:border-black text-black cursor-pointer shadow-sm">
                     <option>Select Role Hierarchy...</option>
                     <option>System Admin</option>
                     <option>Manager</option>
                  </select>
                  <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                     {['Billing Access', 'CRM Core', 'Reports Visualization', 'Security Logs', 'Agent Registry', 'Contract Negotiation'].map(p => (
                        <label key={p} className="flex items-center gap-4 p-5 bg-white rounded-xl border border-slate-100 cursor-pointer hover:border-black text-black transition-all shadow-sm group">
                           <input type="checkbox" className="w-4 h-4 rounded border-slate-300 accent-black cursor-pointer" />
                           <span className="text-[10px] font-black uppercase tracking-widest group-hover:text-[var(--desert-gold)] transition-colors">{p}</span>
                        </label>
                     ))}
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default AssignPermissions;
