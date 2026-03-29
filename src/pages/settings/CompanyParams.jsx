import React, { useState, useEffect } from 'react';
import { Building2, MapPin, Mail, Smartphone, Save, Globe, Hash, ImagePlus } from 'lucide-react';
import useSettingsStore from '../../store/useSettingsStore';
import toast from 'react-hot-toast';

const CompanyParams = () => {
   const { settings, fetchSettings, updateSettings, isLoading } = useSettingsStore();
   const [formData, setFormData] = useState({});

   useEffect(() => {
      fetchSettings();
   }, [fetchSettings]);

   useEffect(() => {
      if (settings) {
         setFormData(settings?.company || {});
      }
   }, [settings]);

   const handleInputChange = (field, value) => {
      setFormData(prev => ({ ...prev, [field]: value }));
   };

   const handleSave = async () => {
      try {
         await updateSettings({ company: formData });
         toast.success('Enterprise configuration synchronized.');
      } catch (err) {
         toast.error('Secure synchronization failed.');
      }
   };

   return (
      <div className="space-y-16 animate-in fade-in duration-1000 font-inter pb-20 bg-[#f8f9fa] min-h-screen">
         {/* Architectural Header */}
         <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 pb-12 border-b border-gray-200 mt-8">
            <div className="space-y-5">
               <div className="flex items-center gap-3 text-[#D4AF37] uppercase tracking-[0.4em] text-[10px] font-black">
                  <Building2 size={14} strokeWidth={2.5} />
                  System Configuration
               </div>
               <h1 className="text-5xl md:text-6xl font-manrope font-extrabold tracking-tighter leading-tight text-[#111827]">
                  Company Core
               </h1>
               <p className="text-gray-500 text-sm md:text-base font-medium max-w-xl leading-relaxed">
                  Establish the firmographic identity, localization, and primary contact parameters for your global operations.
               </p>
            </div>
            
            {/* Primary Action Button */}
            <button
               onClick={handleSave}
               disabled={isLoading}
               className={`
                  px-10 py-5 rounded-full text-[11px] font-black uppercase tracking-[0.3em] shadow-lg
                  transition-all flex items-center gap-3 shrink-0
                  ${isLoading 
                     ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                     : 'bg-[#111827] text-white hover:bg-[#D4AF37] hover:text-[#111827] hover:scale-105'}
               `}
            >
               <Save size={18} strokeWidth={2.5} />
               {isLoading ? 'Syncing Vault...' : 'Sync Global Parameters'}
            </button>
         </div>

         {/* Form Section */}
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Identity Column */}
            <div className="bg-white rounded-2xl p-8 md:p-12 flex flex-col gap-10 border border-gray-100 shadow-sm">
               <div className="space-y-2 mb-2">
                  <h3 className="text-2xl font-manrope font-bold text-[#111827] tracking-tight">Enterprise Identity</h3>
                  <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold">Official firmographics & branding</p>
               </div>

               {[
                  { label: 'Brand Name', key: 'name', icon: Building2, placeholder: 'Al Bayan Travel' },
                  { label: 'Legal Entity', key: 'legalEntity', icon: Building2, placeholder: 'Al Bayan Ltd.' },
                  { label: 'Tax Identification', key: 'taxId', icon: Hash, placeholder: 'TX-1928-837' }
               ].map((item) => (
                  <div key={item.key} className="group flex flex-col">
                     <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">{item.label}</label>
                     <div className="relative">
                        <input
                           type="text"
                           placeholder={item.placeholder}
                           value={formData[item.key] || ''}
                           onChange={(e) => handleInputChange(item.key, e.target.value)}
                           className="w-full bg-gray-50 text-[#111827] text-lg font-inter font-medium px-5 py-4 pl-12 rounded-xl outline-none focus:ring-0 peer placeholder-gray-400 border border-gray-100 transition-all duration-300 focus:border-[#D4AF37] focus:bg-white focus:shadow-sm"
                        />
                        <item.icon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 peer-focus:text-[#D4AF37] transition-colors" />
                     </div>
                  </div>
               ))}
               
               {/* Upload Area */}
               <div className="group flex flex-col mt-4">
                  <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">Primary Watermark/Logo</label>
                  <div className="w-full bg-gray-50 border-2 border-dashed border-gray-200 hover:border-[#D4AF37] hover:bg-white text-gray-400 hover:text-[#D4AF37] rounded-xl p-10 flex flex-col items-center justify-center gap-4 cursor-pointer transition-all duration-300">
                     <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center text-inherit mb-2 shadow-sm border border-gray-100">
                        <ImagePlus size={24} strokeWidth={1.5} />
                     </div>
                     <span className="text-sm font-semibold tracking-wide">Upload High-Res Assets</span>
                     <span className="text-[10px] uppercase opacity-80 tracking-widest">SVG, PNG up to 5MB</span>
                  </div>
               </div>
            </div>

            {/* Localization Connect Column */}
            <div className="flex flex-col gap-8">
               <div className="bg-white rounded-2xl p-8 md:p-12 flex flex-col gap-10 h-full border border-gray-100 shadow-sm">
                  <div className="space-y-2 mb-2">
                     <h3 className="text-2xl font-manrope font-bold text-[#111827] tracking-tight">Logistics & Localization</h3>
                     <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold">Contact routing and display logic</p>
                  </div>

                  {[
                     { label: 'Primary Contact Email', key: 'email', icon: Mail, placeholder: 'concierge@albayan.vip' },
                     { label: 'Global Phone Routing', key: 'phone', icon: Smartphone, placeholder: '+1 800 555 1234' },
                     { label: 'HQ Address', key: 'address', icon: MapPin, placeholder: 'Level 42, Financial Tower' },
                     { label: 'Operating Currency', key: 'currency', icon: Globe, placeholder: 'USD ($)' },
                  ].map((item) => (
                     <div key={item.key} className="group flex flex-col">
                        <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">{item.label}</label>
                        <div className="relative">
                           <input
                              type="text"
                              placeholder={item.placeholder}
                              value={formData[item.key] || ''}
                              onChange={(e) => handleInputChange(item.key, e.target.value)}
                              className="w-full bg-gray-50 text-[#111827] text-lg font-inter font-medium px-5 py-4 pl-12 rounded-xl outline-none focus:ring-0 peer placeholder-gray-400 border border-gray-100 transition-all duration-300 focus:border-[#D4AF37] focus:bg-white focus:shadow-sm"
                           />
                           <item.icon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 peer-focus:text-[#D4AF37] transition-colors" />
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </div>
   );
};

export default CompanyParams;
