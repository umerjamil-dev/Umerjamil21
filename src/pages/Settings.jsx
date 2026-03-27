import React, { useState } from 'react';
import {
   User, Building2, ShieldCheck, 
   Database, Globe, CreditCard,
   Bell, Moon, ChevronRight,
   Save, Camera, Key, Mail
} from 'lucide-react';

const Settings = () => {
   const [activeSection, setActiveSection] = useState('Profile');

   const sections = [
      { id: 'Profile', icon: User, label: 'Identity Protocol' },
      { id: 'Company', icon: Building2, label: 'Organizational' },
      { id: 'Security', icon: ShieldCheck, label: 'Encryption & Access' },
      { id: 'MasterData', icon: Database, label: 'Data Indices' },
      { id: 'API', icon: Globe, label: 'External Sync' },
      { id: 'License', icon: CreditCard, label: 'Subscription' },
   ];

   return (
      <div className="space-y-12 animate-in fade-in duration-1000 font-inter pb-20">
         {/* Premium Header */}
         <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 pb-8 border-b border-slate-200">
            <div className="space-y-4">
               <div className="flex items-center gap-3 text-[var(--desert-gold)] uppercase tracking-[0.4em] text-[10px] font-black opacity-80">
                  <ShieldCheck size={14} strokeWidth={3} />
                  System Configuration
               </div>
               <h1 className="text-5xl font-manrope font-extrabold text-slate-900 tracking-tighter leading-tight">
                  Global <span className="text-slate-300 italic font-light font-manrope">Parameters</span>
               </h1>
               <p className="text-slate-500 text-sm font-medium max-w-xl leading-relaxed">
                  Orchestrate the foundational protocols, security layers, and data indices that power the Al Bayan CRM ecosystem.
               </p>
            </div>
            <button className="px-10 py-5 bg-black text-white rounded-xl text-[10px] font-black uppercase tracking-[0.4em] shadow-xl hover:bg-[var(--desert-gold)] hover:text-black transition-all flex items-center gap-3">
               <Save size={18} strokeWidth={3} />
               Commit Changes
            </button>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Navigation Sidebar */}
            <div className="lg:col-span-4 space-y-4">
               {sections.map((section) => (
                  <button
                     key={section.id}
                     onClick={() => setActiveSection(section.id)}
                     className={`w-full flex items-center justify-between p-6 rounded-xl border transition-all duration-300 group ${
                        activeSection === section.id 
                        ? 'bg-black text-white border-black shadow-2xl scale-[1.02]' 
                        : 'bg-white text-slate-400 border-slate-200 hover:border-black hover:text-black'
                     }`}
                  >
                     <div className="flex items-center gap-5">
                        <section.icon size={20} strokeWidth={activeSection === section.id ? 3 : 2} className={activeSection === section.id ? 'text-[var(--desert-gold)]' : 'text-slate-300'} />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">{section.label}</span>
                     </div>
                     <ChevronRight size={16} className={activeSection === section.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} />
                  </button>
               ))}
            </div>

            {/* Content Area */}
            <div className="lg:col-span-8 bg-white rounded-xl border border-slate-200 shadow-sm min-h-[600px] relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-bl-[10rem] -translate-y-20 translate-x-20"></div>
               
               <div className="p-12 relative z-10">
                  {activeSection === 'Profile' && (
                     <div className="space-y-12 animate-in slide-in-from-right-8 duration-700">
                        <div className="flex items-center gap-10 border-b border-slate-100 pb-12">
                           <div className="relative group">
                              <div className="w-32 h-32 rounded-3xl bg-slate-100 border-2 border-dashed border-slate-200 flex items-center justify-center overflow-hidden group-hover:border-black transition-all">
                                 <User size={48} className="text-slate-300 group-hover:text-black transition-all" />
                              </div>
                              <button className="absolute -bottom-3 -right-3 p-3 bg-black text-white rounded-xl shadow-xl hover:bg-[var(--desert-gold)] hover:text-black transition-all border-4 border-white">
                                 <Camera size={16} strokeWidth={3} />
                              </button>
                           </div>
                           <div>
                              <h3 className="text-2xl font-manrope font-black text-slate-900 tracking-tight mb-2 uppercase">Official Identity</h3>
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-loose">Update your primary administrative profile and public presentation.</p>
                           </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                           {[
                              { label: 'Full Canonical Name', val: 'Umer Jamil', icon: User },
                              { label: 'Verified Mail Protocol', val: 'admin@albayan.app', icon: Mail },
                              { label: 'Operational Role', val: 'Proprietor / System Admin', icon: ShieldCheck },
                              { label: 'Account Cipher', val: '••••••••••••••••', icon: Key }
                           ].map((item, idx) => (
                              <div key={idx} className="group">
                                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 block ml-1">{item.label}</label>
                                 <div className="flex items-center justify-between border-b-2 border-slate-50 group-focus-within:border-black transition-all pb-4">
                                    <input 
                                       type="text" 
                                       defaultValue={item.val} 
                                       className="w-full bg-transparent text-sm font-manrope font-black text-slate-900 outline-none"
                                    />
                                    <item.icon size={16} className="text-slate-200 group-hover:text-black transition-colors" />
                                 </div>
                              </div>
                           ))}
                        </div>

                        <div className="bg-slate-50 rounded-xl p-8 border border-slate-100 mt-12">
                           <div className="flex items-center gap-4 mb-4">
                              <Bell size={18} className="text-[var(--desert-gold)]" strokeWidth={3} />
                              <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-900">Communication Alerts</h4>
                           </div>
                           <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed mb-6">Receive critical system updates and financial reconciliation alerts via encrypted mail.</p>
                           <div className="flex items-center gap-2">
                              <div className="w-10 h-5 bg-black rounded-full relative p-1 cursor-pointer">
                                 <div className="w-3 h-3 bg-white rounded-full absolute right-1"></div>
                              </div>
                              <span className="text-[9px] font-black uppercase tracking-widest text-slate-900">Enabled</span>
                           </div>
                        </div>
                     </div>
                  )}

                  {activeSection !== 'Profile' && (
                     <div className="flex flex-col items-center justify-center py-40 animate-in fade-in duration-1000">
                        <div className="w-20 h-20 bg-slate-50 rounded-[2rem] flex items-center justify-center mb-8 border border-slate-100">
                           <Database size={32} className="text-slate-300" />
                        </div>
                        <h3 className="text-xl font-manrope font-black text-slate-900 tracking-tight uppercase mb-3">Module Under Audit</h3>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center max-w-xs leading-loose">
                           The {activeSection} protocol is currently undergoing security hardening. Configuration will be available in the next sprint.
                        </p>
                     </div>
                  )}
               </div>
            </div>
         </div>
      </div>
   );
};

export default Settings;
