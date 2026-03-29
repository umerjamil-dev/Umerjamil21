import React from 'react';
import { Lock, Plus, ToggleRight } from 'lucide-react';

const Permissions = () => {
   return (
      <div className="space-y-16 animate-in fade-in duration-1000 font-inter pb-20 bg-[#f8f9fa] min-h-screen">
         {/* Architectural Header */}
         <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 pb-12 border-b border-gray-200 mt-8">
            <div className="space-y-5">
               <div className="flex items-center gap-3 text-[#D4AF37] uppercase tracking-[0.4em] text-[10px] font-black">
                  <Lock size={14} strokeWidth={2.5} />
                  System Configuration
               </div>
               <h1 className="text-5xl md:text-6xl font-manrope font-extrabold tracking-tighter leading-tight text-[#111827]">
                  Granular Authorizations
               </h1>
               <p className="text-gray-500 text-sm md:text-base font-medium max-w-xl leading-relaxed">
                  Define discrete actions and functional constraints enforced upon the CRM environment.
               </p>
            </div>
            <button
               className="px-10 py-5 rounded-full text-[11px] font-black uppercase tracking-[0.3em] shadow-lg transition-all flex items-center gap-3 shrink-0 bg-[#111827] text-white hover:bg-[#D4AF37] hover:text-[#111827] hover:scale-105"
            >
               <Plus size={18} strokeWidth={2.5} />
               Forging Rule
            </button>
         </div>

         {/* Light List Flow */}
         <div className="bg-white rounded-2xl p-6 md:p-10 border border-gray-100 shadow-sm">
            <div className="flex flex-col gap-6">
               {['Create Lead', 'Approve Payment', 'Export Revenue Data', 'Delete Record', 'Manage Users'].map((p, i) => (
                  <div key={i} className="flex items-center justify-between p-6 bg-gray-50 rounded-xl group transition-all duration-300 hover:shadow-sm border-b-2 border-transparent hover:border-[#D4AF37] hover:bg-white">
                     <span className="text-[14px] font-inter font-bold uppercase tracking-widest text-[#111827] transition-colors">{p}</span>
                     
                     {/* Premium Custom Toggle Switch */}
                     <div className="relative w-14 h-7 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#e4c664] p-1 cursor-pointer shadow-sm">
                        <div className="w-5 h-5 bg-white rounded-full shadow-md absolute right-1 transition-transform group-hover:scale-110"></div>
                     </div>
                  </div>
               ))}
               
               {/* Disabled state example */}
               <div className="flex items-center justify-between p-6 bg-white border border-gray-100 rounded-xl opacity-60">
                  <span className="text-[14px] font-inter font-bold uppercase tracking-widest text-gray-400">Bypass Global Rate Limits</span>
                  <div className="relative w-14 h-7 rounded-full bg-gray-200 p-1 cursor-not-allowed">
                     <div className="w-5 h-5 bg-gray-400 rounded-full absolute left-1"></div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Permissions;
