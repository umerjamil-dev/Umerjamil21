import React, { useEffect } from 'react';
import { Database, Plus } from 'lucide-react';
import useMasterTypeStore from '../../store/useMasterTypeStore';

const MasterTypes = () => {
   const { masterData, fetchMasterData, loading } = useMasterTypeStore();

   useEffect(() => {
      fetchMasterData();
   }, [fetchMasterData]);

   const allTypes = Object.entries(masterData).flatMap(([type, items]) =>
      items.map(item => ({
         id: item.id,
         name: item.name || item.title || item.label || 'Unknown',
         type: type.replace('_', ' ').toUpperCase()
      }))
   );

   return (
     <>
     <div className="min-h-screen bg-[#f5f4f0] px-8 py-14 lg:px-20" style={{ fontFamily: "'DM Mono', monospace" }}>

         {/* ── HEADER ── */}
         <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-14">
            <div className="space-y-3">
               <div
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm text-[9px] font-bold uppercase tracking-[0.18em] text-white"
                  style={{ background: '#1a1916' }}
               >
                  <Database size={10} strokeWidth={3} />
                  System Configuration
               </div>
               <h1
                  className="text-5xl lg:text-6xl font-extrabold text-[#1a1916] leading-none"
                  style={{ fontFamily: "'Sora', sans-serif", letterSpacing: '-0.03em' }}
               >
                  Data Schematics
               </h1>
               <p className="text-[12px] text-[#78776f] font-normal max-w-xs leading-relaxed" style={{ fontFamily: "'Sora', sans-serif" }}>
                  Architect custom data constructs and enumerations to govern global application dropdowns and categories.
               </p>
            </div>

            <button
               className="h-12 px-8 rounded-lg text-[10px] font-bold uppercase tracking-[0.15em] flex items-center gap-2.5 transition-all cursor-pointer shrink-0"
               style={{ background: '#1a1916', color: '#ffffff', border: '1.5px solid #1a1916' }}
               onMouseEnter={e => { e.currentTarget.style.opacity = '0.85'; }}
               onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
            >
               <Plus size={14} strokeWidth={2.5} />
               Fabricate Type
            </button>
         </div>

         {/* ── CONTENT CARD ── */}
         <div
            className="bg-white rounded-2xl overflow-hidden"
            style={{ border: '1.5px solid #e2e0d8' }}
         >
            <div className="p-6 md:p-8">
               {loading ? (
                  <div className="py-24 text-center text-[9px] font-bold uppercase tracking-[0.2em] text-[#c5c2b8]">
                     Synchronizing Data Schematics…
                  </div>
               ) : allTypes.length === 0 ? (
                  <div
                     className="py-24 text-center text-[9px] font-bold uppercase tracking-[0.2em] text-[#c5c2b8] rounded-xl"
                     style={{ background: '#f5f4f0', border: '1.5px dashed #e2e0d8' }}
                  >
                     No architectural constructs found
                  </div>
               ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2.5">
                     {allTypes.map((m, i) => (
                        <div
                           key={i}
                           className="group flex flex-col justify-between min-h-[120px] p-5 rounded-xl cursor-pointer transition-all duration-150"
                           style={{ background: '#f5f4f0', border: '1.5px solid #e2e0d8' }}
                           onMouseEnter={e => {
                              e.currentTarget.style.borderColor = '#1a1916';
                              e.currentTarget.style.background = '#ffffff';
                           }}
                           onMouseLeave={e => {
                              e.currentTarget.style.borderColor = '#e2e0d8';
                              e.currentTarget.style.background = '#f5f4f0';
                           }}
                        >
                           <div className="flex flex-col gap-2">
                              <span
                                 className="text-[8px] font-bold uppercase tracking-[0.15em] px-2 py-1 rounded w-fit"
                                 style={{ background: '#e2e0d8', color: '#78776f' }}
                              >
                                 {m.type}
                              </span>
                              <h4
                                 className="text-[13px] font-bold text-[#1a1916] line-clamp-2 leading-snug mt-1"
                                 style={{ fontFamily: "'Sora', sans-serif" }}
                              >
                                 {m.name}
                              </h4>
                           </div>
                           <p className="text-[9px] font-bold text-[#b0aea5] uppercase tracking-[0.12em] mt-4">
                              ID — {m.id || i + 1}
                           </p>
                        </div>
                     ))}
                  </div>
               )}
            </div>
         </div>
      </div>
     </>
   );
};

export default MasterTypes;  