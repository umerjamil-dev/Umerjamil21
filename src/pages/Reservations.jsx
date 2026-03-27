import React from 'react';
import {
   ShieldCheck, Hotel, Plane, Bus,
   MapPin, ExternalLink,
   ChevronRight, UserCheck,
   CalendarDays, Construction, TrendingUp
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Reservations = () => {
   return (
      <div className="space-y-12 animate-in fade-in duration-1000 font-inter">
         {/* Editorial Header */}
         <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-4">
            <div>
               <h1 className="text-[2.5rem] font-manrope font-extrabold text-[var(--on-surface)] tracking-tight">Logistics <span className="text-[var(--on-surface-variant)]/30 italic font-light">Manifest</span></h1>
               <p className="mt-2 text-sm font-medium text-[var(--on-surface-variant)] tracking-wide">Orchestrating visa cycles, hospitality allotments, and global transit.</p>
            </div>
            <div className="flex items-center gap-4">
               <div className="px-5 py-3 bg-[var(--surface-container-low)]   rounded-xl text-[10px] font-bold text-[var(--on-surface-variant)] uppercase   flex items-center gap-2">
                  <Construction size={14} strokeWidth={2.5} /> Operational Status
               </div>
               <Link
                  to="/reservations/add"
                  className="btn-midnight flex items-center gap-2 px-8 py-4 text-[10px] font-extrabold uppercase tracking-[0.25em] shadow-xl shadow-black/10 hover:shadow-2xl transition-all rounded-2xl"
               >
                  <Plane size={18} strokeWidth={2.5} />
                  Initiate Manifest
               </Link>
            </div>
         </div>

         {/* Strategic Pillar Matrix */}
         <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
               { label: 'Visa Penetration', value: '78%', icon: ShieldCheck, color: 'var(--sacred-emerald)' },
               { label: 'Hotel Capacity', value: '92%', icon: Hotel, color: 'var(--on-surface)' },
               { label: 'Aviation Sync', value: '45%', icon: Plane, color: 'var(--on-surface-variant)' },
               { label: 'Transit Readiness', value: '85%', icon: Bus, color: 'var(--desert-gold)' },
            ].map((pillar, i) => (
               <div key={i} className="bg-[var(--surface-container-lowest)] p-10 rounded-[2.5rem] border border-[var(--outline-variant)] shadow-sm flex flex-col justify-between h-56 group hover:bg-[var(--surface-container-high)] transition-all cursor-default relative overflow-hidden">
                  <div className="w-14 h-14 rounded-2xl bg-[var(--surface)] flex items-center justify-center text-[var(--on-surface)] group-hover:bg-white group-hover:shadow-lg transition-all relative z-10">
                     <pillar.icon size={24} strokeWidth={1.5} style={{ color: pillar.color }} />
                  </div>
                  <div className="relative z-10">
                     <p className="text-4xl font-manrope font-extrabold text-[var(--on-surface)] tracking-tighter">{pillar.value}</p>
                     <p className="text-[10px] font-extrabold text-[var(--on-surface-variant)] uppercase tracking-[0.25em] mt-2 leading-none">{pillar.label}</p>
                  </div>
               </div>
            ))}
         </div>

         {/* Operational Deep-Dive */}
         <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
            {/* Active Batches - 8 Columns */}
            <div className="xl:col-span-8 space-y-8">
               <h3 className="text-[10px] font-extrabold text-[var(--on-surface-variant)] uppercase tracking-[0.3em] mb-4 ml-4">Deployment Batches</h3>

               {[1, 2, 3].map((batch) => (
                  <div key={batch} className="bg-[var(--surface-container-lowest)] rounded-[2.5rem] p-10 shadow-sm border border-[var(--outline-variant)] group hover:bg-[var(--surface-container-high)] transition-all cursor-pointer overflow-hidden relative">
                     <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--surface)] rounded-bl-[5rem] translate-x-12 -translate-y-12 group-hover:translate-x-6 group-hover:-translate-y-6 transition-transform"></div>
                     <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 relative z-10">
                        <div className="flex gap-8">
                           <div className="w-20 h-20    rounded-xl bg-[var(--surface)] border border-[var(--outline-variant)] flex flex-col items-center justify-center text-[var(--on-surface)] group-hover:bg-white group-hover:shadow-xl transition-all">
                              <p className="text-2xl font-manrope font-extrabold leading-none">{10 + batch}</p>
                              <p className="text-[10px] uppercase font-bold text-[var(--on-surface-variant)] mt-1 tracking-widest leading-none">Jun</p>
                           </div>
                           <div>
                              <h4 className="text-2xl font-manrope font-extrabold text-[var(--on-surface)] tracking-tight">Hajj Core Batch {batch}</h4>
                              <p className="text-[10px] font-bold text-[var(--on-surface-variant)] uppercase tracking-[0.15em] mt-2">VIP Platinum Manifest</p>
                              <div className="flex items-center gap-6 mt-4">
                                 <div className="flex items-center gap-2 text-[10px] font-bold text-[var(--on-surface-variant)] uppercase tracking-widest">
                                    <UserCheck size={14} className="text-[var(--on-surface-variant)]" /> 42 Pilgrims
                                 </div>
                                 <div className="flex items-center gap-2 text-[10px] font-bold text-[var(--on-surface-variant)] uppercase tracking-widest">
                                    <MapPin size={14} className="text-[var(--on-surface-variant)]" /> Makkah 5-Star
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div className="flex flex-col items-end gap-4 shrink-0">
                           <div className="flex items-center gap-2 px-3 py-1.5 bg-[var(--sacred-emerald)]/5 rounded-full border border-[var(--sacred-emerald)]/10">
                              <div className="w-2 h-2 rounded-full bg-[var(--sacred-emerald)]"></div>
                              <p className="text-[9px] font-extrabold text-[var(--sacred-emerald)] uppercase tracking-[0.15em]">Ready for Orbit</p>
                           </div>
                           <button className="flex items-center gap-3 text-[10px] font-extrabold text-[var(--on-surface)] bg-white px-6 py-3   rounded-xl shadow-sm border border-[var(--outline-variant)] group-hover:btn-midnight group-hover:text-white transition-all">
                              Manage Segment <ChevronRight size={14} strokeWidth={2.5} />
                           </button>
                        </div>
                     </div>
                  </div>
               ))}
            </div>

            {/* Sidebar Alerts - 4 Columns */}
            <div className="xl:col-span-4 space-y-10">
               <h3 className="text-[10px] font-extrabold text-[var(--on-surface-variant)] uppercase tracking-[0.3em] mb-4 ml-4">Strategic Alerts</h3>

               <div className="bg-[var(--grad-black)] rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-[5rem] translate-x-12 -translate-y-12"></div>
                  <div className="relative z-10">
                     <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-8 border border-white/10">
                        <CalendarDays className="text-[var(--desert-gold)]" size={24} />
                     </div>
                     <h4 className="text-2xl font-manrope font-extrabold mb-4 tracking-tight">Embassy Cadence</h4>
                     <p className="text-xs text-gray-400 leading-relaxed mb-10 font-medium">
                        Group 4 Visa documentation must reach the consulate by tomorrow, 10:00 AM. Failure impacts the 15th June departure.
                     </p>
                     <button className="w-full py-4 bg-white text-[var(--on-surface)] rounded-2xl text-[10px] font-extrabold uppercase tracking-[0.25em] transition-all hover:bg-gray-100 shadow-xl">
                        Acknowledge Protocol
                     </button>
                  </div>
               </div>

               {/* Hotel Inventory Widget */}
               <div className="bg-[var(--surface-container-lowest)] rounded-[2.5rem] p-10 border border-[var(--outline-variant)] shadow-sm group">
                  <h4 className="text-xs font-extrabold text-[var(--on-surface)] mb-10 uppercase   flex items-center gap-3">
                     <Hotel size={16} className="text-[var(--on-surface-variant)]" /> Hospitality Quota
                  </h4>
                  <div className="space-y-10">
                     <div>
                        <div className="flex justify-between text-[9px] font-extrabold text-[var(--on-surface-variant)] uppercase tracking-[0.25em] mb-3">
                           <span>Anjum Makkah (VIP)</span>
                           <span className="text-[var(--sacred-emerald)]">Saturated</span>
                        </div>
                        <div className="w-full bg-[var(--surface)] h-1.5 rounded-full overflow-hidden">
                           <div className="bg-[var(--sacred-emerald)] h-full w-full"></div>
                        </div>
                     </div>
                     <div>
                        <div className="flex justify-between text-[9px] font-extrabold text-[var(--on-surface-variant)] uppercase tracking-[0.25em] mb-3">
                           <span>Pullman Zamzam</span>
                           <span className="text-[var(--desert-gold)]">Limited Allotment</span>
                        </div>
                        <div className="w-full bg-[var(--surface)] h-1.5 rounded-full overflow-hidden">
                           <div className="bg-[var(--desert-gold)] h-full" style={{ width: '85%' }}></div>
                        </div>
                     </div>
                  </div>
                  <button className="w-full mt-10 py-4 text-[10px] font-bold text-[var(--on-surface-variant)] hover:text-[var(--on-surface)] uppercase   flex items-center justify-center gap-3 transition-colors">
                     Global Inventory <ExternalLink size={14} />
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Reservations;
