import React, { useEffect, useState } from 'react';
import { ShieldCheck, Crosshair, Users, Calendar, MoreVertical, Edit3, Settings, Trash2 } from 'lucide-react';
import useSettingsStore from '../../store/useSettingsStore';
import toast from 'react-hot-toast';

const Roles = () => {
   const { roles, fetchSettings, createRole, deleteRole, isLoading } = useSettingsStore();
   const [showNewRoleInput, setShowNewRoleInput] = useState(false);
   const [newRoleName, setNewRoleName] = useState('');

   const [editingRole, setEditingRole] = useState(null);

   useEffect(() => {
      fetchSettings();
   }, [fetchSettings]);

   const handleCreateRole = async () => {
      if (!newRoleName.trim()) {
         toast.error('Role classification is mandatory.');
         return;
      }
      try {
         if (editingRole) {
            await updateRole(editingRole.id, { name: newRoleName });
            toast.success('Access hierarchy updated.');
         } else {
            await createRole({ name: newRoleName });
            toast.success('Access hierarchy created.');
         }
         setNewRoleName('');
         setShowNewRoleInput(false);
         setEditingRole(null);
      } catch (err) {
         toast.error('Critical failure: ' + err.message);
      }
   };

   const handleEdit = (role) => {
      setNewRoleName(role.name);
      setEditingRole(role);
      setShowNewRoleInput(true);
   };

   return (
      <div className="space-y-16 animate-in fade-in duration-1000 font-inter pb-20 bg-[#f8f9fa] min-h-screen">
         {/* Architectural Header */}
         <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 pb-12 border-b border-gray-200 mt-8">
            <div className="space-y-5">
               <div className="flex items-center gap-3 text-[#D4AF37] uppercase tracking-[0.4em] text-[10px] font-black">
                  <ShieldCheck size={14} strokeWidth={2.5} />
                  System Configuration
               </div>
               <h1 className="text-5xl md:text-6xl font-manrope font-extrabold tracking-tighter leading-tight text-[#111827]">
                  Access Hierarchies
               </h1>
               <p className="text-gray-500 text-sm md:text-base font-medium max-w-xl leading-relaxed">
                  Define structural operational tiers and manage baseline access clusters.
               </p>
            </div>
            
            <div className="flex flex-col items-end gap-4">
               {showNewRoleInput ? (
                  <div className="flex items-center gap-3 animate-in slide-in-from-right-5 duration-300">
                     <input 
                        type="text" 
                        placeholder="New Role Designation..." 
                        className="px-6 py-4 bg-white border border-gray-200 rounded-full text-xs font-bold font-manrope outline-none focus:border-[#D4AF37] shadow-sm"
                        value={newRoleName}
                        onChange={(e) => setNewRoleName(e.target.value)}
                        onBlur={() => !newRoleName && setShowNewRoleInput(false)}
                        autoFocus
                     />
                     <button
                        onClick={handleCreateRole}
                        className="p-4 bg-[#111827] text-white rounded-full hover:bg-[#D4AF37] transition-all shadow-md"
                     >
                        <Crosshair size={18} strokeWidth={2.5} />
                     </button>
                  </div>
               ) : (
                  <button
                     onClick={() => setShowNewRoleInput(true)}
                     className="px-10 py-5 rounded-full text-[11px] font-black uppercase tracking-[0.3em] shadow-lg transition-all flex items-center gap-3 shrink-0 bg-[#111827] text-white hover:bg-[#D4AF37] hover:text-[#111827] hover:scale-105"
                  >
                     <Crosshair size={18} strokeWidth={2.5} />
                     Forge New Role
                  </button>
               )}
            </div>
         </div>

         {/* Light Table Area */}
         <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-2 md:p-6 overflow-hidden">
            <div className="w-full overflow-x-auto">
               <table className="w-full text-left border-collapse min-w-[800px]">
                  <thead>
                     <tr className="border-b-2 border-gray-100">
                        <th className="py-6 px-8 text-[11px] font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap">Role Classification</th>
                        <th className="py-6 px-8 text-[11px] font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap">Assigned Personnel</th>
                        <th className="py-6 px-8 text-[11px] font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap">Origin Date</th>
                        <th className="py-6 px-8 text-[11px] font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap text-right">Actions</th>
                     </tr>
                  </thead>
                  <tbody>
                     {isLoading ? (
                        <tr><td colSpan="4" className="py-20 text-center text-sm font-bold uppercase tracking-widest text-gray-300">Synchronizing Hierarchies...</td></tr>
                     ) : roles.length === 0 ? (
                        <tr><td colSpan="4" className="py-20 text-center text-sm font-bold uppercase tracking-widest text-gray-300">No active hierarchies found.</td></tr>
                     ) : roles.map((role, i) => (
                        <tr key={role.id || i} className="group border-b border-gray-50 hover:bg-gray-50 transition-colors duration-300">
                           <td className="py-6 px-8">
                              <div className="flex flex-col">
                                 <span className="text-lg font-manrope font-bold text-[#111827] group-hover:text-[#D4AF37] transition-colors">{role.name}</span>
                                 <span className="text-xs text-gray-500 font-medium mt-1">{role.description || 'Custom structural tier.'}</span>
                              </div>
                           </td>
                           <td className="py-6 px-8">
                              <div className="flex items-center gap-2">
                                 <div className="w-8 h-8 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center text-gray-500 group-hover:bg-[#111827] group-hover:border-[#111827] group-hover:text-white transition-colors">
                                    <Users size={14} />
                                 </div>
                                 <span className="text-sm font-bold ml-2 font-inter text-gray-700">{role.users_count || 0} Active</span>
                              </div>
                           </td>
                           <td className="py-6 px-8">
                              <div className="flex items-center gap-2 text-gray-400">
                                 <Calendar size={14} />
                                 <span className="text-sm font-medium font-inter">{role.created_at ? new Date(role.created_at).toLocaleDateString() : 'Baseline'}</span>
                              </div>
                           </td>
                           <td className="py-6 px-8 text-right">
                              <div className="flex items-center justify-end gap-3">
                                 <button 
                                    onClick={() => handleEdit(role)}
                                    className="w-10 h-10 rounded-full flex items-center justify-center text-gray-400 hover:text-[#D4AF37] hover:bg-white border border-transparent hover:border-gray-200 transition-all shadow-sm cursor-pointer"
                                 >
                                    <Edit3 size={16} />
                                 </button>
                                 <button 
                                    onClick={() => deleteRole(role.id)}
                                    className="w-10 h-10 rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-white border border-transparent hover:border-gray-200 transition-all cursor-pointer"
                                 >
                                    <Trash2 size={16} />
                                 </button>
                              </div>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </div>
      </div>
   );
};

export default Roles;
