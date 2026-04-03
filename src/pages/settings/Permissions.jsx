import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Plus, Activity, ShieldCheck, Zap, X, Search, Trash2, Key, Fingerprint, Edit2 } from 'lucide-react';
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
            toast.success('Capabilites map expanded.');
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
      <div className="min-h-screen bg-[#fafafa] px-8 py-14 lg:px-20 font-inter">
         {/* ── ARCHITECTURAL HEADER ── */}
         <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-16"
         >
            <div className="space-y-4">
               <div className="inline-flex items-center gap-2.5 px-3 py-1.5 bg-gray-900 text-white rounded-full text-[9px] font-black uppercase tracking-[0.2em] shadow-lg shadow-black/5">
                  <Lock size={12} strokeWidth={3} />
                  Privilege Controller
               </div>
               <h1 className="text-5xl lg:text-6xl font-black text-[#111827] leading-none">
                  Authorization
               </h1>
               <p className="text-[13px] text-gray-400 font-medium max-w-sm leading-relaxed">
                  Configure discrete functional boundaries for system-level interaction.
               </p>
            </div>

            <motion.button
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
               onClick={() => {
                  if (isAdding || isEditing) handleReset();
                  else setIsAdding(true);
               }}
               className={`h-16 px-10 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] transition-all shadow-xl flex items-center gap-3 ${isAdding || isEditing
                     ? 'bg-white text-gray-600 border border-gray-200 cursor-pointer'
                     : 'bg-gray-900 text-white hover:bg-gray-700 hover:shadow-black/10 cursor-pointer'
                  }`}
            >
               {isAdding || isEditing ? <X size={18} strokeWidth={2.5} /> : <Plus size={18} strokeWidth={2.5} />}
               {isAdding || isEditing ? 'Abate Operation' : 'Create Capability'}
            </motion.button>
         </motion.div>

         <AnimatePresence mode="wait">
            {(isAdding || isEditing) && (
               <motion.div
                  initial={{ opacity: 0, scale: 0.98, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98, y: 10 }}
                  className="mb-14"
               >
                  <form onSubmit={handleSubmit} className="bg-white border border-gray-100 rounded-3xl p-10 shadow-sm flex flex-col md:flex-row items-stretch md:items-center gap-6">
                     <div className="flex-1 space-y-4">
                        <div className="bg-gray-50 rounded-2xl px-8 py-5 flex items-center gap-5 border border-gray-100 focus-within:bg-white focus-within:border-gray-900 transition-all group">
                           <Fingerprint size={20} className="text-gray-300 group-focus-within:text-gray-900 transition-colors" />
                           <input
                              autoFocus
                              type="text"
                              value={newName}
                              onChange={e => setNewName(e.target.value)}
                              placeholder="AUTHORIZATION_ID (e.g. DELETE_USER)..."
                              className="bg-transparent outline-none flex-1 font-bold text-gray-900 placeholder:text-gray-200 uppercase tracking-wide"
                           />
                        </div>
                        <div className="bg-gray-50 rounded-2xl px-8 py-5 flex items-center gap-5 border border-gray-100 focus-within:bg-white focus-within:border-gray-900 transition-all group">
                           <Zap size={20} className="text-gray-300 group-focus-within:text-gray-900 transition-colors" />
                           <input
                              type="text"
                              value={newUrl}
                              onChange={e => setNewUrl(e.target.value)}
                              placeholder="Resource URL (e.g. /leads/add)..."
                              className="bg-transparent outline-none flex-1 font-bold text-gray-900 placeholder:text-gray-200 tracking-wide"
                           />
                        </div>
                     </div>
                     <button
                        type="submit"
                        className="bg-gray-900 text-white min-h-[64px] px-12 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] hover:bg-gray-700 transition-all disabled:opacity-50 cursor-pointer"
                        disabled={isLoading}
                     >
                        {isLoading ? 'Forging…' : (isEditing ? 'Sync Changes' : 'Finalize Forge')}
                     </button>
                  </form>
               </motion.div>
            )}
         </AnimatePresence>

         {/* ── CAPABILITY DASHBOARD ── */}
         <div className="bg-white border border-gray-100 rounded-[40px] shadow-sm overflow-hidden p-3 lg:p-4">
            <div className="bg-[#fcfcfc] rounded-[32px] overflow-hidden border border-gray-50">

               {/* Dashboard Toolbar */}
               <div className="flex items-center gap-5 px-10 py-8 border-b border-gray-100/50">
                  <div className="flex items-center gap-4 bg-white border border-gray-100 rounded-2xl px-6 py-4 flex-1 max-w-sm shadow-sm">
                     <Search size={18} className="text-gray-300" />
                     <input
                        type="text"
                        placeholder="Search capabilities…"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="bg-transparent outline-none text-[13px] font-semibold text-gray-900 placeholder:text-gray-200"
                     />
                  </div>
                  <div className="ml-auto hidden md:flex items-center gap-2">
                     <span className="w-2 h-2 rounded-full bg-green-500" />
                     <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                        {filtered.length} Live Identifiers
                     </span>
                  </div>
               </div>

               {/* Grid View */}
               <div className="p-6">
                  {isLoading ? (
                     <div className="py-32 text-center">
                        <motion.div
                           animate={{ rotate: 360 }}
                           transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                           className="inline-block"
                        >
                           <Zap size={32} className="text-gray-200" />
                        </motion.div>
                        <div className="mt-6 font-black uppercase tracking-[0.3em] text-gray-300 text-[10px]">
                           Sychronizing Capability Registry...
                        </div>
                     </div>
                  ) : filtered.length === 0 ? (
                     <div className="py-32 text-center flex flex-col items-center gap-6">
                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center border border-gray-100">
                           <ShieldCheck size={32} className="text-gray-200" />
                        </div>
                        <div className="font-black uppercase tracking-[0.3em] text-gray-300 text-[10px]">
                           No Active Constraints Detected
                        </div>
                     </div>
                  ) : (
                     <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3">
                        {filtered.map((p, i) => (
                           <motion.div
                              key={p.id || i}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: i * 0.03, ease: EASE }}
                              className="group relative bg-gray-100 border border-gray-100/80 rounded-xl p-3 hover:border-gray-900 hover:shadow-lg hover:shadow-gray-900/5 transition-all duration-300 overflow-hidden shadow-sm flex flex-col items-center justify-center min-h-[90px] gap-2"
                           >
                              {/* Icon Box */}
                              <div className="w-7 h-7 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center flex-shrink-0">
                                 <Key size={12} className="text-gray-400" />
                              </div>

                              {/* Name */}
                              <div className="flex flex-col items-center gap-1 w-full overflow-hidden">
                                 <div className="text-[9px] font-black text-gray-800 uppercase tracking-[0.06em] text-center break-words line-clamp-2 leading-tight select-none w-full">
                                    {p.name.replace(/_/g, ' ')}
                                 </div>
                                 {p.url && (
                                    <div className="text-[7px] font-bold text-gray-400 truncate w-full text-center px-1">
                                       {p.url}
                                    </div>
                                 )}
                              </div>

                              {/* Action Overlay */}
                              <div className="absolute inset-0 bg-white/95 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-200 flex items-center justify-center gap-2 rounded-xl">
                                 <button
                                    onClick={() => handleEdit(p)}
                                    className="p-2 bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition-colors shadow-sm cursor-pointer"
                                 >
                                    <Edit2 size={13} />
                                 </button>
                                 <button
                                    onClick={() => handleDelete(p.id)}
                                    className="p-2 bg-white border border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-200 rounded-lg transition-all shadow-sm cursor-pointer"
                                 >
                                    <Trash2 size={13} />
                                 </button>
                              </div>
                           </motion.div>
                        ))}
                     </div>
                  )}
               </div>
            </div>
         </div>
      </div>
   );
};

export default Permissions;