import React from 'react';
import { Cable, Key, Link2 } from 'lucide-react';

const ApiConfig = () => {
   return (
      <div className="space-y-12 animate-in fade-in duration-1000 font-inter pb-20">
         {/* Premium Header */}
         <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 pb-8 border-b border-slate-200">
            <div className="space-y-4">
               <div className="flex items-center gap-3 text-[var(--desert-gold)] uppercase tracking-[0.4em] text-[10px] font-black opacity-80">
                  <Cable size={14} strokeWidth={3} />
                  System Configuration
               </div>
               <h1 className="text-5xl font-manrope font-extrabold text-slate-900 tracking-tighter leading-tight">
                  API Connectors
               </h1>
               <p className="text-slate-500 text-sm font-medium max-w-xl leading-relaxed">
                  Establish neural links and manage cryptographic keys for external service integrations.
               </p>
            </div>
            <button
               className={`px-10 py-5 bg-black text-white rounded-xl text-[10px] font-black uppercase tracking-[0.4em] shadow-xl hover:bg-[var(--desert-gold)] hover:text-black transition-all flex items-center gap-3`}
            >
               <Key size={18} strokeWidth={3} />
               Generate Cipher
            </button>
         </div>

         <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden relative p-12">
            <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-bl-[10rem] -translate-y-20 translate-x-20"></div>
            
            <div className="relative z-10 space-y-8">
               {[
                  { name: 'Sabre Flight GDS', status: 'Connected', key: 'sk_live_***********89A' },
                  { name: 'Twilio SMS Gateway', status: 'Inactive', key: 'pk_test_***********3B2' },
                  { name: 'Maqam Makkah Portal', status: 'Connected', key: 'live_auth_*********00Z' }
               ].map((api, i) => (
                  <div key={i} className="flex flex-col md:flex-row md:items-center justify-between p-8 bg-slate-50 border border-slate-100 rounded-xl hover:shadow-xl transition-all group">
                     <div>
                        <div className="flex items-center gap-3 mb-2">
                           <Link2 size={16} className="text-[var(--desert-gold)]" />
                           <h4 className="text-sm font-black uppercase tracking-widest text-slate-900">{api.name}</h4>
                        </div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] font-mono">{api.key}</p>
                     </div>
                     <div className="mt-4 md:mt-0 flex items-center gap-4">
                        <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.3em] border ${api.status === 'Connected' ? 'bg-green-50 text-green-600 border-green-200' : 'bg-slate-100 text-slate-500 border-slate-200'}`}>
                           {api.status}
                        </span>
                        <button className="text-[10px] font-black text-slate-400 hover:text-black uppercase tracking-widest underline decoration-2 underline-offset-4 transition-all">Revoke</button>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>
   );
};

export default ApiConfig;
