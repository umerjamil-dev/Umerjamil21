import React, { useEffect, useState } from 'react';
import { Lock, Plus, ToggleRight } from 'lucide-react';
import useSettingsStore from '../../store/useSettingsStore';
import toast from 'react-hot-toast';

const Permissions = () => {
   const { permissions, fetchSettings, createPermission, isLoading } = useSettingsStore();
   const [showNewPermissionInput, setShowNewPermissionInput] = useState(false);
   const [newPermissionName, setNewPermissionName] = useState('');

   useEffect(() => {
      fetchSettings();
   }, [fetchSettings]);

   const handleCreatePermission = async () => {
      if (!newPermissionName.trim()) {
         toast.error('Permission identification is mandatory.');
         return;
      }
      try {
         await createPermission({ name: newPermissionName });
         setNewPermissionName('');
         setShowNewPermissionInput(false);
         toast.success('Capabilites map updated.');
      } catch (err) {
         toast.error('Forge failure: ' + err.message);
      }
   };

   return (
      <div className="space-y-16 animate-in fade-in duration-1000 font-inter pb-20 bg-[#f8f9fa] min-h-screen">
         {/* Architectural Header */}
         <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 pb-12 border-b border-gray-200 mt-8">
            <div className="space-y-5">
               <div className="flex items-center gap-3 text-[#D4AF37] uppercase tracking-[0.4em] text-[10px] font-black">
                  <Lock size={14} strokeWidth={2.5} />
                  System Configuration
               </div>
               <h1 className="text-5xl md:text-6xl font-manrope font-extrabold tracking-tighter leading-tight text-[#111827]">
                  Granular Authorizations
               </h1>
               <p className="text-gray-500 text-sm md:text-base font-medium max-w-xl leading-relaxed">
                  Define discrete actions and functional constraints enforced upon the CRM environment.
               </p>
            </div>
            
            <div className="flex flex-col items-end gap-4">
               {showNewPermissionInput ? (
                  <div className="flex items-center gap-3 animate-in slide-in-from-right-5 duration-300">
                     <input 
                        type="text" 
                        placeholder="Action Capability (e.g. DELETE_USER)..." 
                        className="px-6 py-4 bg-white border border-gray-200 rounded-full text-xs font-bold font-manrope outline-none focus:border-[#D4AF37] shadow-sm min-w-[300px]"
                        value={newPermissionName}
                        onChange={(e) => setNewPermissionName(e.target.value)}
                        onBlur={() => !newPermissionName && setShowNewPermissionInput(false)}
                        autoFocus
                     />
                     <button
                        onClick={handleCreatePermission}
                        className="p-4 bg-[#111827] text-white rounded-full hover:bg-[#D4AF37] transition-all shadow-md"
                     >
                        <Plus size={18} strokeWidth={2.5} />
                     </button>
                  </div>
               ) : (
                  <button
                     onClick={() => setShowNewPermissionInput(true)}
                     className="px-10 py-5 rounded-full text-[11px] font-black uppercase tracking-[0.3em] shadow-lg transition-all flex items-center gap-3 shrink-0 bg-[#111827] text-white hover:bg-[#D4AF37] hover:text-[#111827] hover:scale-105"
                  >
                     <Plus size={18} strokeWidth={2.5} />
                     Forging Rule
                  </button>
               )}
            </div>
         </div>

         {/* Light List Flow */}
         <div className="bg-white rounded-2xl p-6 md:p-10 border border-gray-100 shadow-sm">
            <div className="flex flex-col gap-6">
               {isLoading ? (
                  <div className="py-20 text-center text-sm font-bold uppercase tracking-widest text-gray-300">Synchronizing Authorization Map...</div>
               ) : permissions.length === 0 ? (
                  <div className="py-20 text-center text-sm font-bold uppercase tracking-widest text-gray-300">No active authorizations defined.</div>
               ) : permissions.map((p, i) => (
                  <div key={p.id || i} className="flex items-center justify-between p-6 bg-gray-50 rounded-xl group transition-all duration-300 hover:shadow-sm border-b-2 border-transparent hover:border-[#D4AF37] hover:bg-white">
                     <span className="text-[14px] font-inter font-bold uppercase tracking-widest text-[#111827] transition-colors">{p.name}</span>
                     
                     {/* Premium Custom Toggle Switch (Visual Only in this view) */}
                     <div className="relative w-14 h-7 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#e4c664] p-1 cursor-default shadow-sm">
                        <div className="w-5 h-5 bg-white rounded-full shadow-md absolute right-1 transition-transform group-hover:scale-110"></div>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>
   );
};

export default Permissions;
