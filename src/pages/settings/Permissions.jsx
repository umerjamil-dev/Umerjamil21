import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Plus, ShieldCheck, Zap, X, Search, Trash2, Key, Fingerprint, Edit2 } from 'lucide-react';
import useSettingsStore from '../../store/useSettingsStore';
import toast from 'react-hot-toast';

const EASE = [0.22, 1, 0.36, 1];

const Permissions = () => {
   const { permissions, fetchSettings, createPermission, updatePermission, deletePermission, isLoading } = useSettingsStore();
   const [isAdding, setIsAdding] = useState(false);
   const [isEditing, setIsEditing] = useState(false);
   const [editingPermission, setEditingPermission] = useState(null);
   const [newName, setNewName] = useState('');
   const [newUrl, setNewUrl] = useState('');
   const [search, setSearch] = useState('');

   useEffect(() => {
      fetchSettings();
   }, [fetchSettings]);

   const handleSubmit = async (e) => {
      e.preventDefault();
      if (!newName.trim()) {
         toast.error('Identity forge requires a name.');
         return;
      }


      const payload = {
         name: newName.toUpperCase().replace(/\s+/g, '_'),
         url: newUrl.trim()
      };

      if (isEditing && editingPermission) {
         const result = await updatePermission(editingPermission.id, payload);
         if (result.success) {
            toast.success('Capability updated.');
            handleReset();
         } else {
            toast.error('Update failure: ' + result.error);
         }
      } else {
         const result = await createPermission(payload);
         if (result.success) {
            toast.success('Capability map expanded.');
            handleReset();
         } else {
            toast.error('Forge violation: ' + result.error);
         }
      }
   };
   
   const handleEdit = (p) => {
      setEditingPermission(p);
      setIsEditing(true);
      setIsAdding(true);
      setNewName(p.name);
      setNewUrl(p.url || '');
   };

   const handleDelete = async (id) => {
      if (window.confirm('Dissolve this capability permanently?')) {
         const result = await deletePermission(id);
         result.success ? toast.success('Capability dissolved.') : toast.error('Violation: ' + result.error);
      }
   };

   const handleReset = () => {
      setIsAdding(false);
      setIsEditing(false);
      setEditingPermission(null);
      setNewName('');
      setNewUrl('');
   };

   const filtered = permissions.filter(p => p.name?.toLowerCase().includes(search.toLowerCase()));

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
                  style={{ background: '#1a1916', letterSpacing: '0.18em' }}
               >
                  <Lock size={10} strokeWidth={3} />
                  Privilege Controller
               </div>
               <h1
                  className="text-5xl lg:text-6xl font-extrabold text-[#1a1916] leading-none tracking-tight"
                  style={{ fontFamily: "'Sora', sans-serif", letterSpacing: '-0.03em' }}
               >
                  Authorization
               </h1>
               <p className="text-[12px] text-[#78776f] font-normal max-w-xs leading-relaxed" style={{ fontFamily: "'Sora', sans-serif" }}>
                  Configure discrete functional boundaries for system-level interaction.
               </p>
            </div>

            <motion.button
               whileHover={{ scale: 1.03 }}
               whileTap={{ scale: 0.97 }}
               onClick={() => {
                  if (isAdding || isEditing) handleReset();
                  else setIsAdding(true);
               }}
               className="h-12 px-8 rounded-lg text-[10px] font-bold uppercase tracking-[0.15em] flex items-center gap-2.5 transition-all cursor-pointer"
               style={
                  isAdding || isEditing
                     ? { background: '#ffffff', color: '#78776f', border: '1.5px solid #c5c2b8' }
                     : { background: '#1a1916', color: '#ffffff', border: '1.5px solid #1a1916' }
               }
            >
               {isAdding || isEditing
                  ? <X size={14} strokeWidth={2.5} />
                  : <Plus size={14} strokeWidth={2.5} />
               }
               {isAdding || isEditing ? 'Cancel' : 'Create Capability'}
            </motion.button>
         </motion.div>

         {/* ── FORM PANEL ── */}
         <AnimatePresence mode="wait">
            {(isAdding || isEditing) && (
               <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.25, ease: EASE }}
                  className="mb-10"
               >
                  <form
                     onSubmit={handleSubmit}
                     className="bg-white rounded-xl p-7 flex flex-col md:flex-row items-stretch md:items-end gap-5"
                     style={{ border: '1.5px solid #c5c2b8' }}
                  >
                     <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-5">
                        {/* Name Input */}
                        <div className="flex flex-col gap-2">
                           <label className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#78776f]">
                              Authorization ID
                           </label>
                           <div
                              className="flex items-center gap-3 rounded-lg px-4 py-3 transition-all"
                              style={{ background: '#f0efe9', border: '1.5px solid #e2e0d8' }}
                           >
                              <Fingerprint size={16} className="text-[#b0aea5] flex-shrink-0" />
                              <input
                                 autoFocus
                                 type="text"
                                 value={newName}
                                 onChange={e => setNewName(e.target.value)}
                                 placeholder="DELETE_USER"
                                 className="bg-transparent outline-none flex-1 text-[12px] font-medium text-[#1a1916] placeholder:text-[#c5c2b8] uppercase tracking-wide"
                              />
                           </div>
                        </div>

                        {/* URL Input */}
                        <div className="flex flex-col gap-2">
                           <label className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#78776f]">
                              Resource URL
                           </label>
                           <div
                              className="flex items-center gap-3 rounded-lg px-4 py-3 transition-all"
                              style={{ background: '#f0efe9', border: '1.5px solid #e2e0d8' }}
                           >
                              <Zap size={16} className="text-[#b0aea5] flex-shrink-0" />
                              <input
                                 type="text"
                                 value={newUrl}
                                 onChange={e => setNewUrl(e.target.value)}
                                 placeholder="/api/users/delete"
                                 className="bg-transparent outline-none flex-1 text-[12px] font-medium text-[#1a1916] placeholder:text-[#c5c2b8] tracking-wide"
                              />
                           </div>
                        </div>
                     </div>

                     <button
                        type="submit"
                        disabled={isLoading}
                        className="rounded-lg px-8 py-3 text-[10px] font-bold uppercase tracking-[0.15em] text-white transition-all disabled:opacity-50 cursor-pointer flex-shrink-0"
                        style={{ background: '#1a1916', height: '46px' }}
                     >
                        {isLoading ? 'Forging…' : isEditing ? 'Sync Changes' : 'Finalize'}
                     </button>
                  </form>
               </motion.div>
            )}
         </AnimatePresence>

         {/* ── CAPABILITY DASHBOARD ── */}
         <div
            className="bg-white rounded-2xl overflow-hidden"
            style={{ border: '1.5px solid #e2e0d8' }}
         >
            {/* Toolbar */}
            <div
               className="flex items-center gap-4 px-8 py-5"
               style={{ borderBottom: '1.5px solid #e2e0d8' }}
            >
               <div
                  className="flex items-center gap-3 rounded-lg px-4 py-2.5 flex-1 max-w-xs"
                  style={{ background: '#f5f4f0', border: '1.5px solid #e2e0d8' }}
               >
                  <Search size={14} className="text-[#b0aea5] flex-shrink-0" />
                  <input
                     type="text"
                     placeholder="Search capabilities…"
                     value={search}
                     onChange={e => setSearch(e.target.value)}
                     className="bg-transparent outline-none text-[12px] font-medium text-[#1a1916] placeholder:text-[#c5c2b8] w-full"
                  />
               </div>

               <div
                  className="ml-auto hidden md:flex items-center gap-2 px-3 py-1.5 rounded"
                  style={{ background: '#f5f4f0', border: '1.5px solid #e2e0d8' }}
               >
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  <span className="text-[9px] font-bold text-[#78776f] uppercase tracking-widest">
                     {filtered.length} Live
                  </span>
               </div>
            </div>

            {/* Grid */}
            <div className="p-6">
               {isLoading ? (
                  <div className="py-28 text-center">
                     <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1.8, ease: 'linear' }}
                        className="inline-block"
                     >
                        <Zap size={28} className="text-[#e2e0d8]" />
                     </motion.div>
                     <div className="mt-5 font-bold uppercase tracking-[0.25em] text-[#c5c2b8] text-[9px]">
                        Synchronizing Registry…
                     </div>
                  </div>
               ) : filtered.length === 0 ? (
                  <div className="py-28 text-center flex flex-col items-center gap-5">
                     <div
                        className="w-14 h-14 rounded-full flex items-center justify-center"
                        style={{ background: '#f5f4f0', border: '1.5px solid #e2e0d8' }}
                     >
                        <ShieldCheck size={24} className="text-[#c5c2b8]" />
                     </div>
                     <div className="font-bold uppercase tracking-[0.25em] text-[#c5c2b8] text-[9px]">
                        No Capabilities Found
                     </div>
                  </div>
               ) : (
                  <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2.5">
                     {filtered.map((p, i) => (
                        <motion.div
                           key={p.id || i}
                           initial={{ opacity: 0, y: 8 }}
                           animate={{ opacity: 1, y: 0 }}
                           transition={{ delay: i * 0.025, ease: EASE }}
                           className="group relative rounded-xl p-3 flex flex-col items-center justify-center min-h-[96px] gap-2 transition-all duration-200 cursor-default"
                           style={{ background: '#f5f4f0', border: '1.5px solid #e2e0d8' }}
                           onMouseEnter={e => {
                              e.currentTarget.style.borderColor = '#1a1916';
                           }}
                           onMouseLeave={e => {
                              e.currentTarget.style.borderColor = '#e2e0d8';
                           }}
                        >
                           {/* Icon */}
                           <div
                              className="w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0"
                              style={{ background: '#ffffff', border: '1.5px solid #e2e0d8' }}
                           >
                              <Key size={11} className="text-[#78776f]" />
                           </div>

                           {/* Text */}
                           <div className="flex flex-col items-center gap-1 w-full overflow-hidden">
                              <div className="text-[9px] font-bold text-[#1a1916] uppercase tracking-[0.05em] text-center break-words line-clamp-2 leading-tight select-none w-full">
                                 {p.name.replace(/_/g, ' ')}
                              </div>
                              {p.url && (
                                 <div className="text-[8px] font-normal text-[#b0aea5] truncate w-full text-center">
                                    {p.url}
                                 </div>
                              )}
                           </div>

                           {/* Hover Actions */}
                           <div
                              className="absolute inset-0 rounded-xl flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                              style={{ background: 'rgba(255,255,255,0.95)' }}
                           >
                              <button
                                 onClick={() => handleEdit(p)}
                                 className="w-8 h-8 rounded-lg flex items-center justify-center transition-all cursor-pointer"
                                 style={{ background: '#1a1916', border: '1.5px solid #1a1916' }}
                              >
                                 <Edit2 size={12} className="text-white" />
                              </button>
                              <button
                                 onClick={() => handleDelete(p.id)}
                                 className="w-8 h-8 rounded-lg flex items-center justify-center transition-all cursor-pointer"
                                 style={{ background: '#ffffff', border: '1.5px solid #e2e0d8' }}
                                 onMouseEnter={e => {
                                    e.currentTarget.style.borderColor = '#c23b2e';
                                    e.currentTarget.style.background = '#fff1f0';
                                 }}
                                 onMouseLeave={e => {
                                    e.currentTarget.style.borderColor = '#e2e0d8';
                                    e.currentTarget.style.background = '#ffffff';
                                 }}
                              >
                                 <Trash2 size={12} className="text-[#78776f]" />
                              </button>
                           </div>
                        </motion.div>
                     ))}
                  </div>
               )}
            </div>
         </div>
      </div>
   );
};

export default Permissions;