import React from 'react';
import { Database, Plus } from 'lucide-react';

const MasterTypes = () => {
   return (
      <div className="space-y-16 animate-in fade-in duration-1000 font-inter pb-20 bg-[#f8f9fa] min-h-screen">
         {/* Architectural Header */}
         <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 pb-12 border-b border-gray-200 mt-8">
            <div className="space-y-5">
               <div className="flex items-center gap-3 text-[#D4AF37] uppercase tracking-[0.4em] text-[10px] font-black">
                  <Database size={14} strokeWidth={2.5} />
                  System Configuration
               </div>
               <h1 className="text-5xl md:text-6xl font-manrope font-extrabold tracking-tighter leading-tight text-[#111827]">
                  Data Schematics
               </h1>
               <p className="text-gray-500 text-sm md:text-base font-medium max-w-xl leading-relaxed">
                  Architect custom data constructs and enumerations to govern global application dropdowns and categories.
               </p>
            </div>
            <button
               className="px-10 py-5 rounded-full text-[11px] font-black uppercase tracking-[0.3em] shadow-lg transition-all flex items-center gap-3 shrink-0 bg-[#111827] text-white hover:bg-[#D4AF37] hover:text-[#111827] hover:scale-105"
            >
               <Plus size={18} strokeWidth={2.5} />
               Fabricate Type
            </button>
         </div>

         {/* Design Content Grid */}
         <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-6 md:p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
               {[
                  { id: '1', name: 'Economy Plus', type: 'Package Variant' },
                  { id: '2', name: 'Executive 5*', type: 'Package Variant' },
                  { id: '3', name: 'Pakistan', type: 'Nationality' },
                  { id: '4', name: 'Bank Transfer', type: 'Payment Medium' },
                  { id: '5', name: 'Makkah Region', type: 'Geo Node' },
               ].map((m, i) => (
                  <div key={i} className="p-8 bg-gray-50 border border-gray-200 rounded-xl text-[#111827] hover:bg-white transition-all duration-300 cursor-pointer shadow-sm hover:border-[#D4AF37] hover:shadow-lg group flex flex-col justify-between min-h-[140px] hover:-translate-y-1">
                     <div>
                        <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-3 group-hover:text-gray-500 transition-colors">Type ID: {m.id}</p>
                        <h4 className="text-lg font-manrope font-bold uppercase tracking-widest mb-3 text-[#111827]">{m.name}</h4>
                     </div>
                     <p className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-[0.2em]">{m.type}</p>
                  </div>
               ))}
            </div>
         </div>
      </div>
   );
};

export default MasterTypes;
