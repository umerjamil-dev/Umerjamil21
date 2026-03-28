import React, { useState, useEffect } from 'react';
import {
   User, Building2, ShieldCheck,
   Database, Globe, CreditCard,
   Bell, Moon, ChevronRight,
   Save, Camera, Key, Mail,
   Users, Lock, Sliders, Settings as SettingsIcon,
   Briefcase, Activity, Calendar, Zap,
   Smartphone
} from 'lucide-react';
import useSettingsStore from '../store/useSettingsStore';
import toast from 'react-hot-toast';

const Settings = () => {
 const [activeSection, setActiveSection] = useState('Company');
   const { settings, fetchSettings, updateSettings, isLoading } = useSettingsStore();
   const [formData, setFormData] = useState({});

   useEffect(() => {
      fetchSettings();
   }, [fetchSettings]);

   useEffect(() => {
      if (settings) {
         setFormData(settings);
      }
   }, [settings]);

   const handleInputChange = (section, field, value) => {
      setFormData(prev => ({
         ...prev,
         [section]: {
            ...prev[section],
            [field]: value
         }
      }));
   };

   const handleSave = async () => {
      try {
         await updateSettings(formData);
         toast.success('System configuration updated successfully.');
      } catch (err) {
         toast.error('Failure to commit changes: ' + err.message);
      }
   };

   const sections = [
      { id: 'Company', icon: Building2, label: 'Company' },
      { id: 'Roles', icon: ShieldCheck, label: 'Roles' },
      { id: 'Permissions', icon: Lock, label: 'Permissions' },
      { id: 'AssignPermissions', icon: Sliders, label: 'Assign Permission' },
      { id: 'MasterTypes', icon: Database, label: 'Master Types' },
      { id: 'API', icon: Globe, label: 'API Settings' },
      { id: 'Subscription', icon: CreditCard, label: 'Subscription' },
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
                  Global
               </h1>
               <p className="text-slate-500 text-sm font-medium max-w-xl leading-relaxed">
                  Orchestrate the foundational protocols, security layers, and data indices that power the Al Bayan CRM ecosystem.
               </p>
            </div>
            <button
               onClick={handleSave}
               disabled={isLoading}
               className={`px-10 py-5 bg-black text-white rounded-xl text-[10px] font-black uppercase tracking-[0.4em] shadow-xl hover:bg-[var(--desert-gold)] hover:text-black transition-all flex items-center gap-3 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
               <Save size={18} strokeWidth={3} />
               {isLoading ? 'Syncing...' : 'Commit Changes'}
            </button>
         </div>
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Navigation Sidebar */}
            <div className="lg:col-span-4 space-y-4">
               {sections.map((section) => (
                  <button
                     key={section.id}
                     onClick={() => setActiveSection(section.id)}
                     className={`w-full flex items-center justify-between p-6 rounded-xl border transition-all duration-300 group ${activeSection === section.id
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
            <div className="lg:col-span-8 bg-white rounded-xl border border-slate-200 shadow-sm min-h-[600px] relative
             overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-bl-[10rem] -translate-y-20 translate-x-20"></div>

               <div className="p-12 relative z-10">
                  {activeSection === 'Company' && (
                     <div className="space-y-12 animate-in slide-in-from-right-8 duration-700">
                        <div>
                           <h3 className="text-2xl font-manrope font-black text-slate-900 tracking-tight mb-2 uppercase">Organizational Core</h3>
                           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-loose">Firmographic identity and logistics.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-black">
                           {[
                              { label: 'Company Name', key: 'name', icon: Building2 },
                              { label: 'Address', key: 'address', icon: MapPin },
                              { label: 'Email', key: 'email', icon: Mail },
                              { label: 'Phone', key: 'phone', icon: Smartphone },
                           ].map((item) => (
                              <div key={item.key} className="group">
                                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 block ml-1">{item.label}</label>
                                 <div className="flex items-center justify-between border-b-2 border-slate-50 group-focus-within:border-black transition-all pb-4">
                                    <input
                                       type="text"
                                       value={formData.company?.[item.key] || ''}
                                       onChange={(e) => handleInputChange('company', item.key, e.target.value)}
                                       className="w-full bg-transparent text-sm font-manrope font-black text-slate-900 outline-none"
                                    />
                                    {item.icon && <item.icon size={16} className="text-slate-200 group-hover:text-black transition-colors" />}
                                 </div>
                              </div>
                           ))}
                        </div>
                     </div>
                  )}


                  {activeSection === 'Roles' && (
                     <div className="space-y-12 animate-in slide-in-from-right-8 duration-700">
                        <h3 className="text-2xl font-manrope font-black text-slate-900 tracking-tight mb-2 uppercase text-black">Access Hierarchies</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                           {[
                              { name: 'System Admin', desc: 'Full architectural control and fiscal visibility.' },
                              { name: 'Manager', desc: 'Operational control and personnel delegation.' },
                              { name: 'Agent', desc: 'Lead orchestration and customer engagement.' }
                           ].map((r, i) => (
                              <div key={i} className="p-8 bg-slate-50 rounded-2xl border border-slate-100 group hover:bg-black transition-all cursor-pointer">
                                 <h4 className="text-xs font-black uppercase tracking-widest text-slate-900 group-hover:text-[var(--desert-gold)] mb-3">{r.name}</h4>
                                 <p className="text-[10px] font-medium text-slate-500 group-hover:text-white/60 leading-relaxed uppercase">{r.desc}</p>
                              </div>
                           ))}
                        </div>
                     </div>
                  )}

                  {activeSection === 'Permissions' && (
                     <div className="space-y-12 animate-in slide-in-from-right-8 duration-700">
                        <h3 className="text-2xl font-manrope font-black text-slate-900 tracking-tight mb-2 uppercase text-black">Granular Authorizations</h3>
                        <div className="space-y-4">
                           {['Create Lead', 'Approve Payment', 'Export Revenue Data', 'Delete Record', 'Manage Users'].map((p, i) => (
                              <div key={i} className="flex items-center justify-between p-6 bg-white border border-slate-100 rounded-xl hover:border-black transition-all group">
                                 <span className="text-[10px] font-black uppercase tracking-widest text-slate-900">{p}</span>
                                 <div className="w-10 h-5 bg-black rounded-full relative p-1">
                                    <div className="w-3 h-3 bg-white rounded-full absolute right-1"></div>
                                 </div>
                              </div>
                           ))}
                        </div>
                     </div>
                  )}

                  {activeSection === 'AssignPermissions' && (
                     <div className="space-y-12 animate-in slide-in-from-right-8 duration-700">
                        <h3 className="text-2xl font-manrope font-black text-slate-900 tracking-tight mb-2 uppercase text-black">Protocol Mapping</h3>
                        <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200">
                           <select className="w-full p-4 bg-white border border-slate-100 rounded-xl uppercase font-black text-[10px] tracking-widest outline-none transition-all focus:border-black text-black">
                              <option>Select Role Hierarchy...</option>
                              <option>System Admin</option>
                              <option>Manager</option>
                           </select>
                           <div className="mt-8 grid grid-cols-2 gap-4">
                              {['Billing Access', 'CRM Core', 'Reports Visualization', 'Security Logs'].map(p => (
                                 <label key={p} className="flex items-center gap-4 p-4 bg-white rounded-xl border border-slate-100 cursor-pointer hover:bg-slate-50 text-black">
                                    <input type="checkbox" className="w-4 h-4 rounded border-slate-200" />
                                    <span className="text-[9px] font-black uppercase tracking-widest">{p}</span>
                                 </label>
                              ))}
                           </div>
                        </div>
                     </div>
                  )}

                  {activeSection === 'MasterTypes' && (
                     <div className="space-y-12 animate-in slide-in-from-right-8 duration-700">
                        <h3 className="text-2xl font-manrope font-black text-slate-900 tracking-tight mb-2 uppercase text-black">Data Schematics</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                           {[
                              { id: '1', name: 'Economy Plus', type: 'Package Variant' },
                              { id: '2', name: 'Executive 5*', type: 'Package Variant' },
                              { id: '3', name: 'Pakistan', type: 'Nationality' },
                           ].map((m, i) => (
                              <div key={i} className="p-8 bg-slate-50 border border-slate-100 rounded-2xl text-black">
                                 <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Type ID: {m.id}</p>
                                 <h4 className="text-xs font-black uppercase tracking-widest mb-2">{m.name}</h4>
                                 <p className="text-[9px] font-bold text-[var(--desert-gold)] uppercase tracking-[0.2em]">{m.type}</p>
                              </div>
                           ))}
                        </div>
                     </div>
                  )}

                  {activeSection === 'API' && (
                     <div className="space-y-12 animate-in slide-in-from-right-8 duration-700">
                        <h3 className="text-2xl font-manrope font-black text-slate-900 tracking-tight mb-2 uppercase text-black">External Fabric</h3>
                        <div className="space-y-8">
                           {[
                              { label: 'Booking Gateway Key', val: 'BK_LIVE_9128374625', type: 'password' },
                              { label: 'Flight Scraper Credential', val: 'FL_ALBAYAN_PRO_01', type: 'text' },
                              { label: 'Hotel Aggregator Secret', val: '••••••••••••••••', type: 'password' }
                           ].map((api, i) => (
                              <div key={i} className="group">
                                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 block ml-1">{api.label}</label>
                                 <div className="flex items-center justify-between border-b-2 border-slate-50 group-focus-within:border-black transition-all pb-4">
                                    <input
                                       type={api.type}
                                       defaultValue={api.val}
                                       className="w-full bg-transparent text-sm font-manrope font-black text-slate-900 outline-none text-black"
                                    />
                                    <Zap size={16} className="text-slate-200 group-hover:text-black transition-colors" />
                                 </div>
                              </div>
                           ))}
                        </div>
                     </div>
                  )}

                  {activeSection === 'Subscription' && (
                     <div className="space-y-12 animate-in slide-in-from-right-8 duration-700">
                        <h3 className="text-2xl font-manrope font-black text-slate-900 tracking-tight mb-2 uppercase text-black">Fiscal Licensing</h3>
                        <div className="bg-black rounded-2xl p-10 text-white relative overflow-hidden">
                           <div className="relative z-10">
                              <div className="flex items-center justify-between mb-10">
                                 <span className="px-5 py-2 bg-[var(--desert-gold)] text-black rounded-lg text-[9px] font-black uppercase tracking-widest">Enterprise Elite</span>
                                 <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Expires Nov 2024</span>
                              </div>
                              <h4 className="text-4xl font-manrope font-black tracking-tighter mb-4">$599<span className="text-sm font-medium text-white/40 tracking-normal uppercase ml-2">/ Monthly Cycle</span></h4>
                              <div className="grid grid-cols-2 gap-4 mt-12">
                                 {[
                                    { label: 'Multi-Tenant Isolation', status: true },
                                    { label: 'Custom Reporting Fabric', status: true },
                                    { label: 'Automated Invoice Protocol', status: true },
                                    { label: 'Priority Support Layer', status: true }
                                 ].map((feat, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                       <ShieldCheck size={14} className="text-[var(--sacred-emerald)]" />
                                       <span className="text-[9px] font-black uppercase tracking-widest text-white/60">{feat.label}</span>
                                    </div>
                                 ))}
                              </div>
                           </div>
                        </div>
                     </div>
                  )}
               </div>
            </div>

         </div>
      </div>
   );
};

export default Settings;
