import React, { useEffect, useState } from 'react';
import { Sliders, Save, ChevronDown, Check } from 'lucide-react';
import useSettingsStore from '../../store/useSettingsStore';
import toast from 'react-hot-toast';

const AssignPermissions = () => {
   const { roles, permissions, fetchSettings, assignPermissionsToRole, isLoading } = useSettingsStore();
   const [selectedRoleId, setSelectedRoleId] = useState('');
   const [selectedRolePermissions, setSelectedRolePermissions] = useState([]);

   useEffect(() => {
      fetchSettings();
   }, [fetchSettings]);

   useEffect(() => {
      if (selectedRoleId) {
         const role = roles.find(r => r.id.toString() === selectedRoleId.toString());
         if (role && role.permissions) {
            setSelectedRolePermissions(role.permissions.map(p => p.id));
         } else {
            setSelectedRolePermissions([]);
         }
      }
   }, [selectedRoleId, roles]);

   const handleTogglePermission = (permissionId) => {
      setSelectedRolePermissions(prev => 
         prev.includes(permissionId) 
            ? prev.filter(id => id !== permissionId) 
            : [...prev, permissionId]
      );
   };

   const handleSynchronize = async () => {
      if (!selectedRoleId) {
         toast.error('Strategic target (role) must be identified.');
         return;
      }
      try {
         await assignPermissionsToRole(selectedRoleId, selectedRolePermissions);
         toast.success('Protocol matrix synchronized.');
      } catch (err) {
         toast.error('Sync failure: ' + err.message);
      }
   };

   return (
      <div className="space-y-16 animate-in fade-in duration-1000 font-inter pb-20 bg-[#f8f9fa] min-h-screen">
         {/* Architectural Header */}
         <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 pb-12 border-b border-gray-200 mt-8">
            <div className="space-y-5">
               <div className="flex items-center gap-3 text-[#D4AF37] uppercase tracking-[0.4em] text-[10px] font-black">
                  <Sliders size={14} strokeWidth={2.5} />
                  System Configuration
               </div>
               <h1 className="text-5xl md:text-6xl font-manrope font-extrabold tracking-tighter leading-tight text-[#111827]">
                  Protocol Mapping
               </h1>
               <p className="text-gray-500 text-sm md:text-base font-medium max-w-xl leading-relaxed">
                  Bind specific authorizations to architectural tiers to securely delegate organizational capability.
               </p>
            </div>
            <button
               onClick={handleSynchronize}
               className="px-10 py-5 rounded-full text-[11px] font-black uppercase tracking-[0.3em] shadow-lg transition-all flex items-center gap-3 shrink-0 bg-[#111827] text-white hover:bg-[#D4AF37] hover:text-[#111827] hover:scale-105"
            >
               <Save size={18} strokeWidth={2.5} />
               Synchronize Matrix
            </button>
         </div>

         {/* Design Content */}
         <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-8 md:p-12">
            <div className="max-w-4xl mx-auto flex flex-col gap-10">
               {/* Selection Well */}
               <div className="flex flex-col gap-4">
                  <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Select Role Hierarchy Matrix</label>
                  <div className="relative group">
                     <select 
                        className="appearance-none w-full px-6 py-5 bg-gray-50 text-[#111827] border border-gray-200 rounded-xl font-manrope font-bold text-[14px] uppercase tracking-widest outline-none focus:border-[#D4AF37] hover:bg-white transition-all duration-300 shadow-sm cursor-pointer"
                        value={selectedRoleId}
                        onChange={(e) => setSelectedRoleId(e.target.value)}
                     >
                        <option value="">Choose blueprint component...</option>
                        {roles.map(r => (
                           <option key={r.id} value={r.id}>{r.name}</option>
                        ))}
                     </select>
                     <ChevronDown size={20} className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none group-hover:text-[#D4AF37] transition-colors" />
                  </div>
               </div>
               
               {/* Permissions Grid Matrix */}
               <div className="flex flex-col gap-4">
                  <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Configurable Endpoints</label>
                  {isLoading ? (
                     <div className="py-20 text-center text-sm font-bold uppercase tracking-widest text-gray-300">Synchronizing Authorization Map...</div>
                  ) : !selectedRoleId ? (
                     <div className="py-20 text-center text-sm font-bold uppercase tracking-widest text-gray-300 italic opacity-50">Awaiting Role Selection to Load Capabilities...</div>
                  ) : (
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {permissions.map((p) => (
                           <label 
                              key={p.id} 
                              className="flex relative items-center gap-4 p-5 bg-gray-50 border border-gray-100 shadow-sm rounded-xl cursor-pointer hover:border-[#D4AF37] hover:bg-white transition-all duration-300 group hover:-translate-y-1"
                           >
                              <input 
                                 type="checkbox" 
                                 className="peer sr-only" 
                                 checked={selectedRolePermissions.includes(p.id)}
                                 onChange={() => handleTogglePermission(p.id)}
                              />
                              {/* Custom Checkbox Design */}
                              <div className="w-6 h-6 bg-white rounded flex items-center justify-center border-2 border-gray-300 peer-checked:border-[#D4AF37] peer-checked:bg-[#D4AF37] transition-all">
                                 <Check size={14} strokeWidth={4} className="text-white opacity-0 peer-checked:opacity-100 transition-opacity drop-shadow-sm" />
                              </div>
                              <span className="text-[11px] font-bold uppercase tracking-widest text-gray-500 group-hover:text-[#111827] peer-checked:text-[#111827] transition-colors">{p.name}</span>
                              
                              {/* Highlight state */}
                              <div className="absolute inset-0 border-2 border-[#D4AF37] rounded-xl opacity-0 peer-checked:opacity-[0.2] pointer-events-none transition-opacity"></div>
                           </label>
                        ))}
                     </div>
                  )}
               </div>
            </div>
         </div>
      </div>
   );
};

export default AssignPermissions;
