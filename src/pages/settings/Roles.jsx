import React, { useEffect, useState } from 'react';
import { ShieldCheck, Crosshair, Users, Calendar, Edit3, Trash2, X, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import useSettingsStore from '../../store/useSettingsStore';
import toast from 'react-hot-toast';

const EASE = [0.22, 1, 0.36, 1];

const Roles = () => {
   const { roles, fetchSettings, createRole, updateRole, deleteRole, isLoading } = useSettingsStore();
   const [showInput,    setShowInput]    = useState(false);
   const [newRoleName,  setNewRoleName]  = useState('');
   const [editingRole,  setEditingRole]  = useState(null);

   useEffect(() => { fetchSettings(); }, [fetchSettings]);

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
         handleReset();
      } catch (err) {
         toast.error('Critical failure: ' + err.message);
      }
   };

   const handleEdit = (role) => {
      setNewRoleName(role.name);
      setEditingRole(role);
      setShowInput(true);
   };

   const handleReset = () => {
      setNewRoleName('');
      setShowInput(false);
      setEditingRole(null);
   };

   return (
      <div className="min-h-screen bg-[#f5f4f0] px-8 py-14 lg:px-20" style={{ fontFamily: "'DM Mono', monospace" }}>

         {/* ── HEADER ── */}
         <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-14"
         >
            <div className="space-y-3">
               <div
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm text-[9px] font-bold uppercase tracking-[0.18em] text-white"
                  style={{ background: '#1a1916' }}
               >
                  <ShieldCheck size={10} strokeWidth={3} />
                  System Configuration
               </div>
               <h1
                  className="text-5xl lg:text-6xl font-extrabold text-[#1a1916] leading-none"
                  style={{ fontFamily: "'Sora', sans-serif", letterSpacing: '-0.03em' }}
               >
                  Access Hierarchies
               </h1>
               <p className="text-[12px] text-[#78776f] font-normal max-w-xs leading-relaxed" style={{ fontFamily: "'Sora', sans-serif" }}>
                  Define structural operational tiers and manage baseline access clusters.
               </p>
            </div>

            <motion.button
               whileHover={{ scale: 1.03 }}
               whileTap={{ scale: 0.97 }}
               onClick={() => { if (showInput) handleReset(); else setShowInput(true); }}
               className="h-12 px-8 rounded-lg text-[10px] font-bold uppercase tracking-[0.15em] flex items-center gap-2.5 transition-all cursor-pointer shrink-0"
               style={
                  showInput
                     ? { background: '#ffffff', color: '#78776f', border: '1.5px solid #c5c2b8' }
                     : { background: '#1a1916', color: '#ffffff', border: '1.5px solid #1a1916' }
               }
            >
               {showInput ? <X size={14} strokeWidth={2.5} /> : <Plus size={14} strokeWidth={2.5} />}
               {showInput ? 'Cancel' : 'Forge New Role'}
            </motion.button>
         </motion.div>

         {/* ── INLINE FORM ── */}
         <AnimatePresence>
            {showInput && (
               <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.22, ease: EASE }}
                  className="mb-4"
               >
                  <div
                     className="bg-white rounded-xl p-6 flex items-end gap-4"
                     style={{ border: '1.5px solid #c5c2b8' }}
                  >
                     <div className="flex flex-col gap-2 flex-1 max-w-sm">
                        <label className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#78776f]">
                           {editingRole ? 'Edit Role Name' : 'Role Designation'}
                        </label>
                        <div
                           className="flex items-center gap-3 rounded-lg px-4 py-3 transition-all"
                           style={{ background: '#f5f4f0', border: '1.5px solid #e2e0d8' }}
                           onFocusCapture={e => { e.currentTarget.style.borderColor = '#1a1916'; e.currentTarget.style.background = '#ffffff'; }}
                           onBlurCapture={e =>  { e.currentTarget.style.borderColor = '#e2e0d8'; e.currentTarget.style.background = '#f5f4f0'; }}
                        >
                           <ShieldCheck size={14} style={{ color: '#b0aea5', flexShrink: 0 }} />
                           <input
                              autoFocus
                              type="text"
                              placeholder="e.g. OPERATIONS_MANAGER"
                              value={newRoleName}
                              onChange={e => setNewRoleName(e.target.value)}
                              onKeyDown={e => e.key === 'Enter' && handleCreateRole()}
                              className="flex-1 bg-transparent border-none outline-none text-[12px] font-medium text-[#1a1916] placeholder:text-[#c5c2b8] uppercase"
                           />
                        </div>
                     </div>
                     <button
                        onClick={handleCreateRole}
                        disabled={isLoading}
                        className="h-12 px-8 rounded-lg text-[10px] font-bold uppercase tracking-[0.15em] text-white transition-all disabled:opacity-50 cursor-pointer flex items-center gap-2"
                        style={{ background: '#1a1916', border: '1.5px solid #1a1916' }}
                     >
                        <Crosshair size={13} strokeWidth={2.5} />
                        {editingRole ? 'Update' : 'Create'}
                     </button>
                  </div>
               </motion.div>
            )}
         </AnimatePresence>

         {/* ── TABLE ── */}
         <div
            className="bg-white rounded-2xl overflow-hidden"
            style={{ border: '1.5px solid #e2e0d8' }}
         >
            <div className="overflow-x-auto">
               <table className="w-full text-left border-collapse min-w-[640px]">
                  <thead>
                     <tr style={{ background: '#f5f4f0' }}>
                        {['Role Classification', 'Assigned Personnel', 'Origin Date', 'Actions'].map((h, i) => (
                           <th
                              key={h}
                              className="px-7 py-4 whitespace-nowrap"
                              style={{
                                 fontSize: '9px', fontWeight: 700, textTransform: 'uppercase',
                                 letterSpacing: '0.15em', color: '#78776f',
                                 borderBottom: '1.5px solid #e2e0d8',
                                 textAlign: i === 3 ? 'right' : 'left',
                              }}
                           >
                              {h}
                           </th>
                        ))}
                     </tr>
                  </thead>

                  <tbody>
                     {isLoading ? (
                        <tr>
                           <td colSpan="4" className="py-24 text-center text-[9px] font-bold uppercase tracking-[0.2em] text-[#c5c2b8]">
                              Synchronizing Hierarchies…
                           </td>
                        </tr>
                     ) : roles.length === 0 ? (
                        <tr>
                           <td colSpan="4" className="py-24 text-center text-[9px] font-bold uppercase tracking-[0.2em] text-[#c5c2b8]">
                              No active hierarchies found
                           </td>
                        </tr>
                     ) : roles.map((role, i) => (
                        <motion.tr
                           key={role.id || i}
                           initial={{ opacity: 0, x: -6 }}
                           animate={{ opacity: 1, x: 0 }}
                           transition={{ delay: i * 0.03, ease: EASE }}
                           className="group transition-colors"
                           style={{ borderBottom: '1.5px solid #f0efe9' }}
                           onMouseEnter={e => { e.currentTarget.style.background = '#f5f4f0'; }}
                           onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
                        >
                           {/* Role Name */}
                           <td className="px-7 py-5">
                              <div className="flex flex-col gap-1">
                                 <span
                                    className="text-[13px] font-bold text-[#1a1916]"
                                    style={{ fontFamily: "'Sora', sans-serif" }}
                                 >
                                    {role.name}
                                 </span>
                                 <span className="text-[10px] text-[#b0aea5]">
                                    {role.description || 'Custom structural tier'}
                                 </span>
                              </div>
                           </td>

                           {/* Users count */}
                           <td className="px-7 py-5">
                              <div className="flex items-center gap-2.5">
                                 <div
                                    className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                                    style={{ background: '#f5f4f0', border: '1.5px solid #e2e0d8' }}
                                 >
                                    <Users size={12} style={{ color: '#78776f' }} />
                                 </div>
                                 <span className="text-[11px] font-bold text-[#1a1916]">
                                    {role.users_count || 0}
                                    <span className="font-normal text-[#b0aea5] ml-1">active</span>
                                 </span>
                              </div>
                           </td>

                           {/* Date */}
                           <td className="px-7 py-5">
                              <div className="flex items-center gap-2">
                                 <Calendar size={11} style={{ color: '#b0aea5' }} />
                                 <span className="text-[11px] font-medium text-[#78776f]">
                                    {role.created_at
                                       ? new Date(role.created_at).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })
                                       : 'Baseline'}
                                 </span>
                              </div>
                           </td>

                           {/* Actions */}
                           <td className="px-7 py-5 text-right">
                              <div className="flex items-center justify-end gap-2">
                                 <ActionBtn icon={Edit3}  title="Edit"   onClick={() => handleEdit(role)} />
                                 <ActionBtn icon={Trash2} title="Delete" onClick={() => deleteRole(role.id)} danger />
                              </div>
                           </td>
                        </motion.tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </div>
      </div>
   );
};

/* ─── Action Button ──────────────────────────────────────────────────── */
const ActionBtn = ({ icon: Icon, title, onClick, danger }) => (
   <motion.button
      title={title}
      onClick={onClick}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.94 }}
      className="flex items-center justify-center w-8 h-8 rounded-lg cursor-pointer transition-all"
      style={{ background: '#ffffff', border: '1.5px solid #e2e0d8' }}
      onMouseEnter={e => {
         e.currentTarget.style.background  = danger ? '#fff1f0' : '#f5f4f0';
         e.currentTarget.style.borderColor = danger ? '#f7c1c1' : '#c5c2b8';
      }}
      onMouseLeave={e => {
         e.currentTarget.style.background  = '#ffffff';
         e.currentTarget.style.borderColor = '#e2e0d8';
      }}
   >
      <Icon size={13} style={{ color: danger ? '#c23b2e' : '#78776f' }} />
   </motion.button>
);

export default Roles;