import React from 'react';
import { Cable, Key, Link2 } from 'lucide-react';

const ApiConfig = () => {
   return (
      <div className="space-y-16 animate-in fade-in duration-1000 font-inter pb-20 bg-[#f8f9fa] min-h-screen">
         {/* Architectural Header */}
         <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 pb-12 border-b border-gray-200 mt-8">
            <div className="space-y-5">
               <div className="flex items-center gap-3 text-[#D4AF37] uppercase tracking-[0.4em] text-[10px] font-black">
                  <Cable size={14} strokeWidth={2.5} />
                  System Configuration
               </div>
               <h1 className="text-5xl md:text-6xl font-manrope font-extrabold tracking-tighter leading-tight text-[#111827]">
                  API Connectors
               </h1>
               <p className="text-gray-500 text-sm md:text-base font-medium max-w-xl leading-relaxed">
                  Establish neural links and manage cryptographic keys for external service integrations.
               </p>
            </div>
            <button
               className="px-10 py-5 rounded-full text-[11px] font-black uppercase tracking-[0.3em] shadow-lg transition-all flex items-center gap-3 shrink-0 bg-[#111827] text-white hover:bg-[#D4AF37] hover:text-[#111827] hover:scale-105"
            >
               <Key size={18} strokeWidth={2.5} />
               Generate Cipher
            </button>
         </div>

         {/* Connectors Container */}
         <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-6 md:p-10">
            <div className="space-y-6">
               {[
                  { name: 'Sabre Flight GDS', status: 'Connected', key: 'sk_live_***********89A' },
                  { name: 'Twilio SMS Gateway', status: 'Inactive', key: 'pk_test_***********3B2' },
                  { name: 'Maqam Makkah Portal', status: 'Connected', key: 'live_auth_*********00Z' }
               ].map((api, i) => (
                  <div key={i} className="flex flex-col md:flex-row md:items-center justify-between p-8 bg-gray-50 border border-gray-200 rounded-xl transition-all duration-300 group hover:shadow-lg hover:border-[#D4AF37] hover:bg-white text-[#111827]">
                     <div>
                        <div className="flex items-center gap-3 mb-3">
                           <Link2 size={16} className="text-[#D4AF37]" />
                           <h4 className="text-lg font-manrope font-bold uppercase tracking-widest text-[#111827]">{api.name}</h4>
                        </div>
                        <div className="inline-block bg-white border border-gray-200 px-4 py-2 rounded-lg shadow-sm">
                           <p className="text-[12px] font-bold text-gray-500 tracking-[0.2em] font-mono">{api.key}</p>
                        </div>
                     </div>
                     <div className="mt-6 md:mt-0 flex flex-col md:flex-row md:items-center gap-6">
                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] shadow-sm ${
                           api.status === 'Connected' 
                              ? 'bg-emerald-50 border border-emerald-200 text-emerald-600' 
                              : 'bg-white border border-gray-300 text-gray-500'
                           }`}
                        >
                           <div className="flex items-center gap-2">
                              {api.status === 'Connected' && <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>}
                              {api.status}
                           </div>
                        </span>
                        <button className="text-[11px] font-bold text-gray-400 hover:text-red-500 uppercase tracking-widest underline decoration-2 underline-offset-4 transition-colors">
                           Revoke
                        </button>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>
   );
};

export default ApiConfig;
