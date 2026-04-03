import React from 'react';
import { Cable, Key, Link2 } from 'lucide-react';

const ApiConfig = () => {
   const apis = [
      { name: 'Sabre Flight GDS', status: 'Connected', key: 'sk_live_***********89A' },
      { name: 'Twilio SMS Gateway', status: 'Inactive', key: 'pk_test_***********3B2' },
      { name: 'Maqam Makkah Portal', status: 'Connected', key: 'live_auth_*********00Z' },
   ];

   return (
      <div className="min-h-screen bg-[#f5f4f0] px-8 py-14 lg:px-20" style={{ fontFamily: "'DM Mono', monospace" }}>

         {/* ── HEADER ── */}
         <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-14">
            <div className="space-y-3">
               <div
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm text-[9px] font-bold uppercase tracking-[0.18em] text-white"
                  style={{ background: '#1a1916' }}
               >
                  <Cable size={10} strokeWidth={3} />
                  System Configuration
               </div>
               <h1
                  className="text-5xl lg:text-6xl font-extrabold text-[#1a1916] leading-none"
                  style={{ fontFamily: "'Sora', sans-serif", letterSpacing: '-0.03em' }}
               >
                  API Connectors
               </h1>
               <p className="text-[12px] text-[#78776f] font-normal max-w-xs leading-relaxed" style={{ fontFamily: "'Sora', sans-serif" }}>
                  Establish neural links and manage cryptographic keys for external service integrations.
               </p>
            </div>

            <button
               className="h-12 px-8 rounded-lg text-[10px] font-bold uppercase tracking-[0.15em] flex items-center gap-2.5 transition-all cursor-pointer shrink-0"
               style={{ background: '#1a1916', color: '#ffffff', border: '1.5px solid #1a1916' }}
               onMouseEnter={e => { e.currentTarget.style.opacity = '0.85'; }}
               onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
            >
               <Key size={14} strokeWidth={2.5} />
               Generate Cipher
            </button>
         </div>

         {/* ── CONNECTORS LIST ── */}
         <div
            className="bg-white rounded-2xl overflow-hidden"
            style={{ border: '1.5px solid #e2e0d8' }}
         >
            <div className="divide-y" style={{ borderColor: '#e2e0d8' }}>
               {apis.map((api, i) => {
                  const isConnected = api.status === 'Connected';
                  return (
                     <div
                        key={i}
                        className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-8 py-6 transition-all duration-150"
                        style={{ background: '#ffffff' }}
                        onMouseEnter={e => { e.currentTarget.style.background = '#f5f4f0'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = '#ffffff'; }}
                     >
                        {/* Left — name + key */}
                        <div className="flex flex-col gap-3">
                           <div className="flex items-center gap-2.5">
                              <div
                                 className="w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0"
                                 style={{ background: '#f5f4f0', border: '1.5px solid #e2e0d8' }}
                              >
                                 <Link2 size={12} style={{ color: '#78776f' }} />
                              </div>
                              <h4
                                 className="text-[13px] font-bold text-[#1a1916] uppercase tracking-[0.08em]"
                                 style={{ fontFamily: "'Sora', sans-serif" }}
                              >
                                 {api.name}
                              </h4>
                           </div>
                           <div
                              className="inline-flex items-center px-4 py-2 rounded-lg w-fit"
                              style={{ background: '#f5f4f0', border: '1.5px solid #e2e0d8' }}
                           >
                              <p className="text-[11px] font-medium text-[#78776f] tracking-[0.1em]">
                                 {api.key}
                              </p>
                           </div>
                        </div>

                        {/* Right — status + revoke */}
                        <div className="flex items-center gap-5 shrink-0">
                           <div
                              className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-[0.15em]"
                              style={
                                 isConnected
                                    ? { background: '#edf7f1', border: '1.5px solid #9fe1cb', color: '#1a7a4a' }
                                    : { background: '#f5f4f0', border: '1.5px solid #e2e0d8', color: '#b0aea5' }
                              }
                           >
                              <span
                                 className="w-1.5 h-1.5 rounded-full"
                                 style={{ background: isConnected ? '#1a7a4a' : '#c5c2b8' }}
                              />
                              {api.status}
                           </div>

                           <button
                              className="text-[9px] font-bold uppercase tracking-[0.15em] transition-colors cursor-pointer"
                              style={{ color: '#c5c2b8' }}
                              onMouseEnter={e => { e.currentTarget.style.color = '#c23b2e'; }}
                              onMouseLeave={e => { e.currentTarget.style.color = '#c5c2b8'; }}
                           >
                              Revoke
                           </button>
                        </div>
                     </div>
                  );
               })}
            </div>
         </div>
      </div>
   );
};

export default ApiConfig;