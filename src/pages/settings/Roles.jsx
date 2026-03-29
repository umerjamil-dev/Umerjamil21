import React from 'react';
import { ShieldCheck, Crosshair, Users, Calendar, MoreVertical, Edit3, Settings } from 'lucide-react';

const Roles = () => {
   return (
      <div className="space-y-16 animate-in fade-in duration-1000 font-inter pb-20 bg-[#f8f9fa] min-h-screen">
         {/* Architectural Header */}
         <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 pb-12 border-b border-gray-200 mt-8">
            <div className="space-y-5">
               <div className="flex items-center gap-3 text-[#D4AF37] uppercase tracking-[0.4em] text-[10px] font-black">
                  <ShieldCheck size={14} strokeWidth={2.5} />
                  System Configuration
               </div>
               <h1 className="text-5xl md:text-6xl font-manrope font-extrabold tracking-tighter leading-tight text-[#111827]">
                  Access Hierarchies
               </h1>
               <p className="text-gray-500 text-sm md:text-base font-medium max-w-xl leading-relaxed">
                  Define structural operational tiers and manage baseline access clusters.
               </p>
            </div>
            
            <button
               className="px-10 py-5 rounded-full text-[11px] font-black uppercase tracking-[0.3em] shadow-lg transition-all flex items-center gap-3 shrink-0 bg-[#111827] text-white hover:bg-[#D4AF37] hover:text-[#111827] hover:scale-105"
            >
               <Crosshair size={18} strokeWidth={2.5} />
               Forge New Role
            </button>
         </div>

         {/* Light Table Area */}
         <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-2 md:p-6 overflow-hidden">
            <div className="w-full overflow-x-auto">
               <table className="w-full text-left border-collapse min-w-[800px]">
                  <thead>
                     <tr className="border-b-2 border-gray-100">
                        <th className="py-6 px-8 text-[11px] font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap">Role Classification</th>
                        <th className="py-6 px-8 text-[11px] font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap">Assigned Personnel</th>
                        <th className="py-6 px-8 text-[11px] font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap">Origin Date</th>
                        <th className="py-6 px-8 text-[11px] font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap text-right">Actions</th>
                     </tr>
                  </thead>
                  <tbody>
                     {[
                        { name: 'System Admin', users: 3, date: 'Oct 12, 2024', desc: 'Full architectural control.' },
                        { name: 'Operations Lead', users: 12, date: 'Oct 14, 2024', desc: 'Regional management.' },
                        { name: 'Sales Agent', users: 45, date: 'Nov 01, 2024', desc: 'Client engagement layer.' }
                     ].map((role, i) => (
                        <tr key={i} className="group border-b border-gray-50 hover:bg-gray-50 transition-colors duration-300">
                           <td className="py-6 px-8">
                              <div className="flex flex-col">
                                 <span className="text-lg font-manrope font-bold text-[#111827] group-hover:text-[#D4AF37] transition-colors">{role.name}</span>
                                 <span className="text-xs text-gray-500 font-medium mt-1">{role.desc}</span>
                              </div>
                           </td>
                           <td className="py-6 px-8">
                              <div className="flex items-center gap-2">
                                 <div className="w-8 h-8 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center text-gray-500 group-hover:bg-[#111827] group-hover:border-[#111827] group-hover:text-white transition-colors">
                                    <Users size={14} />
                                 </div>
                                 <span className="text-sm font-bold ml-2 font-inter text-gray-700">{role.users} Active</span>
                              </div>
                           </td>
                           <td className="py-6 px-8">
                              <div className="flex items-center gap-2 text-gray-400">
                                 <Calendar size={14} />
                                 <span className="text-sm font-medium font-inter">{role.date}</span>
                              </div>
                           </td>
                           <td className="py-6 px-8 text-right">
                              <div className="flex items-center justify-end gap-3">
                                 <button className="w-10 h-10 rounded-full flex items-center justify-center text-gray-400 hover:text-[#D4AF37] hover:bg-white border text-transparent border-transparent hover:border-gray-200 transition-all shadow-sm">
                                    <Edit3 size={16} />
                                 </button>
                                 <button className="w-10 h-10 rounded-full flex items-center justify-center text-gray-400 hover:text-[#111827] hover:bg-white border text-transparent border-transparent hover:border-gray-200 transition-all shadow-sm">
                                    <Settings size={16} />
                                 </button>
                                 <button className="w-10 h-10 rounded-full flex items-center justify-center text-gray-400 hover:text-[#111827] transition-colors">
                                    <MoreVertical size={16} />
                                 </button>
                              </div>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </div>
      </div>
   );
};

export default Roles;
