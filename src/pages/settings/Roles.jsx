import React from 'react';
import { ShieldCheck, Crosshair } from 'lucide-react';

const Roles = () => {
   return (
      <div className="space-y-12 animate-in fade-in duration-1000 font-inter pb-20">
         {/* Premium Header */}
         <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 pb-8 border-b border-slate-200">
            <div className="space-y-4">
               <div className="flex items-center gap-3 text-[var(--desert-gold)] uppercase tracking-[0.4em] text-[10px] font-black opacity-80">
                  <ShieldCheck size={14} strokeWidth={3} />
                  System Configuration
               </div>
               <h1 className="text-5xl font-manrope font-extrabold text-slate-900 tracking-tighter leading-tight">
                  Access Hierarchies
               </h1>
               <p className="text-slate-500 text-sm font-medium max-w-xl leading-relaxed">
                  Define structural operational tiers and manage baseline access clusters.
               </p>
            </div>
            <button
               className={`px-10 py-5 bg-black text-white rounded-xl text-[10px] font-black uppercase tracking-[0.4em] shadow-xl hover:bg-[var(--desert-gold)] hover:text-black transition-all flex items-center gap-3`}
            >
               <Crosshair size={18} strokeWidth={3} />
               Assemble Role
            </button>
         </div>

         <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden relative p-12">
            <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-bl-[10rem] -translate-y-20 translate-x-20"></div>
            
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {[
                  { name: 'System Admin', desc: 'Full architectural control and fiscal visibility.' },
                  { name: 'Manager', desc: 'Operational control and personnel delegation.' },
                  { name: 'Agent', desc: 'Lead orchestration and customer engagement.' }
               ].map((r, i) => (
                  <div key={i} className="p-8 bg-slate-50 rounded-xl border border-slate-100 group hover:bg-black transition-all shadow-sm cursor-pointer hover:shadow-2xl">
                     <h4 className="text-sm font-black uppercase tracking-widest text-slate-900 group-hover:text-[var(--desert-gold)] mb-3">{r.name}</h4>
                     <p className="text-[10px] font-medium text-slate-500 group-hover:text-white/60 leading-relaxed uppercase">{r.desc}</p>
                  </div>
               ))}
            </div>
         </div>
      </div>
   );
};

export default Roles;
