import React from 'react';
import { CreditCard, Rocket } from 'lucide-react';

const stats = [
   { label: 'Passenger Units', used: 12450, total: 20000 },
   { label: 'Bandwidth (GB)', used: 412, total: 1000 },
   { label: 'Agent Seats', used: 12, total: 25 },
];

const Subscription = () => {
   return (
      <div className="min-h-screen bg-[#f5f4f0] px-8 py-14 lg:px-20" style={{ fontFamily: "'DM Mono', monospace" }}>

         {/* ── HEADER ── */}
         <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-14">
            <div className="space-y-3">
               <div
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm text-[9px] font-bold uppercase tracking-[0.18em] text-white"
                  style={{ background: '#1a1916' }}
               >
                  <CreditCard size={10} strokeWidth={3} />
                  System Configuration
               </div>
               <h1
                  className="text-5xl lg:text-6xl font-extrabold text-[#1a1916] leading-none"
                  style={{ fontFamily: "'Sora', sans-serif", letterSpacing: '-0.03em' }}
               >
                  License & Billing
               </h1>
               <p className="text-[12px] text-[#78776f] font-normal max-w-xs leading-relaxed" style={{ fontFamily: "'Sora', sans-serif" }}>
                  Monitor architectural consumption limits and maintain active enterprise subscriptions.
               </p>
            </div>

            <button
               className="h-12 px-8 rounded-lg text-[10px] font-bold uppercase tracking-[0.15em] flex items-center gap-2.5 transition-all cursor-pointer shrink-0"
               style={{ background: '#1a1916', color: '#ffffff', border: '1.5px solid #1a1916' }}
               onMouseEnter={e => { e.currentTarget.style.opacity = '0.85'; }}
               onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
            >
               <Rocket size={14} strokeWidth={2.5} />
               Upgrade Tier
            </button>
         </div>

         {/* ── PLAN CARD ── */}
         <div
            className="bg-white rounded-2xl overflow-hidden mb-3"
            style={{ border: '1.5px solid #e2e0d8' }}
         >
            {/* Plan Header */}
            <div
               className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-8 py-8"
               style={{ borderBottom: '1.5px solid #e2e0d8', background: '#1a1916' }}
            >
               <div className="flex flex-col gap-2">
                  <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#78776f]">
                     Active Blueprint
                  </span>
                  <h3
                     className="text-3xl lg:text-4xl font-extrabold text-white leading-none"
                     style={{ fontFamily: "'Sora', sans-serif", letterSpacing: '-0.02em' }}
                  >
                     Enterprise Syndicate V2
                  </h3>
               </div>
               <div className="flex flex-col md:items-end gap-1">
                  <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#78776f]">
                     Fiscal Cycle Renews
                  </span>
                  <span
                     className="text-[15px] font-bold text-white"
                     style={{ fontFamily: "'Sora', sans-serif" }}
                  >
                     24 August 2024
                  </span>
               </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x" style={{ borderColor: '#e2e0d8' }}>
               {stats.map((stat, i) => {
                  const pct = Math.round((stat.used / stat.total) * 100);
                  const isHigh = pct >= 80;
                  const isMid = pct >= 50 && pct < 80;

                  return (
                     <div
                        key={i}
                        className="flex flex-col justify-between gap-6 px-8 py-7 transition-all duration-150"
                        style={{ background: '#ffffff' }}
                        onMouseEnter={e => { e.currentTarget.style.background = '#f5f4f0'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = '#ffffff'; }}
                     >
                        <div className="flex flex-col gap-4">
                           <div className="flex items-center justify-between">
                              <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#78776f]">
                                 {stat.label}
                              </span>
                              <span
                                 className="text-[10px] font-bold px-2 py-0.5 rounded"
                                 style={
                                    isHigh
                                       ? { background: '#fff1f0', color: '#c23b2e', border: '1.5px solid #f7c1c1' }
                                       : isMid
                                       ? { background: '#faeeda', color: '#854f0b', border: '1.5px solid #fac775' }
                                       : { background: '#edf7f1', color: '#1a7a4a', border: '1.5px solid #9fe1cb' }
                                 }
                              >
                                 {pct}%
                              </span>
                           </div>

                           {/* Progress Bar */}
                           <div
                              className="w-full h-1.5 rounded-full overflow-hidden"
                              style={{ background: '#e2e0d8' }}
                           >
                              <div
                                 className="h-full rounded-full transition-all duration-700"
                                 style={{
                                    width: `${pct}%`,
                                    background: isHigh ? '#c23b2e' : isMid ? '#ba7517' : '#1a7a4a',
                                 }}
                              />
                           </div>
                        </div>

                        <p className="text-[11px] font-medium text-[#b0aea5]">
                           <span className="text-[#1a1916] font-bold">{stat.used.toLocaleString()}</span>
                           {' '}/ {stat.total.toLocaleString()} limit
                        </p>
                     </div>
                  );
               })}
            </div>
         </div>
      </div>
   );
};

export default Subscription;