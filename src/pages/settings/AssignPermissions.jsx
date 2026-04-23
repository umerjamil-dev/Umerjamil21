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
      <div className="min-h-screen bg-gray-100 px-8 py-14 lg:px-20" style={{ fontFamily: "'DM Mono', monospace" }}>

         {/* ── HEADER ── */}
         <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-14">
            <div className="space-y-3">
               <div
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm text-[9px] font-bold uppercase tracking-[0.18em] text-white"
                  style={{ background: '#1a1916' }}
               >
                  <Sliders size={10} strokeWidth={3} />
                  System Configuration
               </div>
               <h1
                  className="text-5xl lg:text-6xl font-extrabold text-[#1a1916] leading-none"
                  style={{ fontFamily: "'Sora', sans-serif", letterSpacing: '-0.03em' }}
               >
                  Protocol Mapping
               </h1>
               <p className="text-[12px] text-[#78776f] font-normal max-w-xs leading-relaxed" style={{ fontFamily: "'Sora', sans-serif" }}>
                  Bind authorizations to architectural tiers to securely delegate organizational capability.
               </p>
            </div>

            <button
               onClick={handleSynchronize}
               className="h-12 px-8 rounded-lg text-[10px] font-bold uppercase tracking-[0.15em] flex items-center gap-2.5 transition-all cursor-pointer shrink-0"
               style={{ background: '#1a1916', color: '#ffffff', border: '1.5px solid #1a1916' }}
               onMouseEnter={e => { e.currentTarget.style.opacity = '0.85'; }}
               onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
            >
               <Save size={14} strokeWidth={2.5} />
               Synchronize Matrix
            </button>
         </div>

         {/* ── MAIN CARD ── */}
         <div
            className="bg-white rounded-2xl overflow-hidden"
            style={{ border: '1.5px solid #e2e0d8' }}
         >
            <div className="p-8 md:p-10 flex flex-col gap-10 max-w-7xl mx-auto">

               {/* ── ROLE SELECTOR ── */}
               <div className="flex flex-col gap-2.5">
                  <label className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#78776f]">
                     Select Role
                  </label>
                  <div className="relative">
                     <select
                        className="appearance-none w-full px-5 py-3.5 rounded-lg text-[12px] font-medium text-[#1a1916] outline-none transition-all cursor-pointer"
                        style={{
                           background: '#f5f4f0',
                           border: '1.5px solid #e2e0d8',
                           fontFamily: "'DM Mono', monospace",
                        }}
                        value={selectedRoleId}
                        onChange={(e) => setSelectedRoleId(e.target.value)}
                        onFocus={e => { e.currentTarget.style.borderColor = '#1a1916'; e.currentTarget.style.background = '#ffffff'; }}
                        onBlur={e => { e.currentTarget.style.borderColor = '#e2e0d8'; e.currentTarget.style.background = '#f5f4f0'; }}
                     >
                        <option value="">Choose a role…</option>
                        {roles.map(r => (
                           <option key={r.id} value={r.id}>{r.name}</option>
                        ))}
                     </select>
                     <ChevronDown
                        size={14}
                        className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
                        style={{ color: '#78776f' }}
                     />
                  </div>
               </div>

               {/* ── PERMISSIONS GRID ── */}
               <div className="flex flex-col gap-2.5">
                  <div className="flex items-center justify-between">
                     <label className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#78776f]">
                        Configurable Endpoints
                     </label>
                     {selectedRoleId && !isLoading && (
                        <span
                           className="text-[9px] font-bold uppercase tracking-[0.12em] px-2.5 py-1 rounded"
                           style={{ background: '#f5f4f0', border: '1.5px solid #e2e0d8', color: '#78776f' }}
                        >
                           {selectedRolePermissions.length} / {permissions.length} selected
                        </span>
                     )}
                  </div>

                  {isLoading ? (
                     <div className="py-24 text-center text-[9px] font-bold uppercase tracking-[0.2em] text-[#c5c2b8]">
                        Synchronizing Authorization Map…
                     </div>
                  ) : !selectedRoleId ? (
                     <div
                        className="py-24 text-center text-[9px] font-bold uppercase tracking-[0.2em] text-[#c5c2b8] rounded-xl"
                        style={{ background: '#f5f4f0', border: '1.5px dashed #e2e0d8' }}
                     >
                        Select a role to load capabilities
                     </div>
                  ) : (
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5">
                        {permissions.map((p) => {
                           const isChecked = selectedRolePermissions.includes(p.id);
                           return (
                              <label
                                 key={p.id}
                                 className="flex items-center gap-3.5 p-4 rounded-xl cursor-pointer transition-all duration-150 select-none"
                                 style={{
                                    background: isChecked ? '#1a1916' : '#f5f4f0',
                                    border: `1.5px solid ${isChecked ? '#1a1916' : '#e2e0d8'}`,
                                 }}
                              >
                                 <input
                                    type="checkbox"
                                    className="sr-only"
                                    checked={isChecked}
                                    onChange={() => handleTogglePermission(p.id)}
                                 />

                                 {/* Custom Checkbox */}
                                 <div
                                    className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 transition-all"
                                    style={{
                                       background: isChecked ? '#ffffff' : '#ffffff',
                                       border: `1.5px solid ${isChecked ? '#ffffff' : '#c5c2b8'}`,
                                    }}
                                 >
                                    {isChecked && (
                                       <Check size={11} strokeWidth={3} style={{ color: '#1a1916' }} />
                                    )}
                                 </div>

                                 <span
                                    className="text-[10px] font-bold uppercase tracking-[0.08em] leading-tight"
                                    style={{ color: isChecked ? '#ffffff' : '#78776f' }}
                                 >
                                    {p.name.replace(/_/g, ' ')}
                                 </span>
                              </label>
                           );
                        })}
                     </div>
                  )}
               </div>
            </div>
         </div>
      </div>
   );
};

export default AssignPermissions;