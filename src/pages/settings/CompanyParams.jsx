import React, { useState, useEffect } from 'react';
import { Building2, MapPin, Mail, Smartphone, Save } from 'lucide-react';
import useSettingsStore from '../../store/useSettingsStore';
import toast from 'react-hot-toast';

const CompanyParams = () => {
   const { settings, fetchSettings, updateSettings, isLoading } = useSettingsStore();
   const [formData, setFormData] = useState({});

   useEffect(() => {
      fetchSettings();
   }, [fetchSettings]);

   useEffect(() => {
      if (settings) setFormData(settings);
   }, [settings]);

   const handleInputChange = (field, value) => {
      setFormData(prev => ({
         ...prev,
         company: { ...prev.company, [field]: value }
      }));
   };

   const handleSave = async () => {
      try {
         await updateSettings(formData);
         toast.success('Company parameters updated successfully.');
      } catch (err) {
         toast.error('Failure to commit changes.');
      }
   };

   return (
      <div className="space-y-12 animate-in fade-in duration-1000 font-inter pb-20">
         {/* Premium Header */}
         <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 pb-8 border-b border-slate-200">
            <div className="space-y-4">
               <div className="flex items-center gap-3 text-[var(--desert-gold)] uppercase tracking-[0.4em] text-[10px] font-black opacity-80">
                  <Building2 size={14} strokeWidth={3} />
                  System Configuration
               </div>
               <h1 className="text-5xl font-manrope font-extrabold text-slate-900 tracking-tighter leading-tight">
                  Company Core
               </h1>
               <p className="text-slate-500 text-sm font-medium max-w-xl leading-relaxed">
                  Establish the firmographic identity, logistics, and primary contact parameters for your organization.
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

         <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-bl-[10rem] -translate-y-20 translate-x-20"></div>

            <div className="p-12 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 text-black">
               {[
                  { label: 'Company Name', key: 'name', icon: Building2, placeholder: 'Al Bayan Operations' },
                  { label: 'Address', key: 'address', icon: MapPin, placeholder: '123 Global Avenue' },
                  { label: 'Email', key: 'email', icon: Mail, placeholder: 'contact@domain.com' },
                  { label: 'Phone', key: 'phone', icon: Smartphone, placeholder: '+1 800 555 1234' },
               ].map((item) => (
                  <div key={item.key} className="group flex flex-col justify-end">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 block ml-1">{item.label}</label>
                     <div className="flex items-center justify-between border-b-2 border-slate-100 group-focus-within:border-black transition-all pb-4">
                        <input
                           type="text"
                           placeholder={item.placeholder}
                           value={formData?.company?.[item.key] || ''}
                           onChange={(e) => handleInputChange(item.key, e.target.value)}
                           className="w-full bg-transparent text-lg font-manrope font-black text-slate-900 outline-none"
                        />
                        {item.icon && <item.icon size={20} className="text-slate-300 group-hover:text-black transition-colors" />}
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>
   );
};

export default CompanyParams;
