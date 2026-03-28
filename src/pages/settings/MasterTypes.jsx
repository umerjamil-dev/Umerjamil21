import React from 'react';
import { Database, Plus } from 'lucide-react';

const MasterTypes = () => {
   return (
      <div className="space-y-12 animate-in fade-in duration-1000 font-inter pb-20">
         {/* Premium Header */}
         <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 pb-8 border-b border-slate-200">
            <div className="space-y-4">
               <div className="flex items-center gap-3 text-[var(--desert-gold)] uppercase tracking-[0.4em] text-[10px] font-black opacity-80">
                  <Database size={14} strokeWidth={3} />
                  System Configuration
               </div>
               <h1 className="text-5xl font-manrope font-extrabold text-slate-900 tracking-tighter leading-tight">
                  Data Schematics
               </h1>
               <p className="text-slate-500 text-sm font-medium max-w-xl leading-relaxed">
                  Architect custom data constructs and enumerations to govern global application dropdowns and categories.
               </p>
            </div>
            <button
               className={`px-10 py-5 bg-black text-white rounded-xl text-[10px] font-black uppercase tracking-[0.4em] shadow-xl hover:bg-[var(--desert-gold)] hover:text-black transition-all flex items-center gap-3`}
            >
               <Plus size={18} strokeWidth={3} />
               Fabricate Type
            </button>
         </div>

         <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden relative p-12">
            <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-bl-[10rem] -translate-y-20 translate-x-20"></div>
            
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {[
                  { id: '1', name: 'Economy Plus', type: 'Package Variant' },
                  { id: '2', name: 'Executive 5*', type: 'Package Variant' },
                  { id: '3', name: 'Pakistan', type: 'Nationality' },
                  { id: '4', name: 'Bank Transfer', type: 'Payment Medium' },
                  { id: '5', name: 'Makkah Region', type: 'Geo Node' },
               ].map((m, i) => (
                  <div key={i} className="p-8 bg-slate-50 border border-slate-100 rounded-xl text-black hover:bg-black hover:text-white transition-all cursor-pointer shadow-sm group">
                     <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2 group-hover:text-white/40">Type ID: {m.id}</p>
                     <h4 className="text-sm font-black uppercase tracking-widest mb-3">{m.name}</h4>
                     <p className="text-[10px] font-bold text-[var(--desert-gold)] uppercase tracking-[0.2em]">{m.type}</p>
                  </div>
               ))}
            </div>
         </div>
      </div>
   );
};

export default MasterTypes;
