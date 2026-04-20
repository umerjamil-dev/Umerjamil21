import React, { useState, useEffect } from 'react';
import {
   UserPlus, Phone,
   Mail, MapPin, MessageSquare,
   Tag, Info, Save, X,
   Globe, ChevronRight, ShieldCheck,
   UserCheck, Calendar, Activity,
   Rss, FileText
} from 'lucide-react';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import { Link, useNavigate } from 'react-router-dom';
import useLeadStore from '../store/useLeadStore';
import useMasterTypeStore from '../store/useMasterTypeStore';
import useUserStore from '../store/useUserStore';
import useAuthStore from '../store/useAuthStore';
import toast from 'react-hot-toast';


const AddLead = () => {
   const navigate = useNavigate();
   const { addLead, isLoading } = useLeadStore();
   const { masterData, fetchMasterData } = useMasterTypeStore();
   const { users, fetchUsers } = useUserStore();
   const { user } = useAuthStore();

   useEffect(() => {
      fetchMasterData();
      fetchUsers();
   }, [fetchMasterData, fetchUsers]);

   const [formData, setFormData] = useState({
      name: '',
      phone: '',
      email: '',
      city: '',
      source_id: '',
      message: '',
      assigned_to_id: '',
      follow_up_date: '',
      status_id: '',
      comments: '',
      assigned_by: user?.id || '',
      documents: []
   });

   useEffect(() => {
      if (!formData.source_id && masterData.leadsource.length > 0) {
         setFormData(prev => ({ ...prev, source_id: masterData.leadsource[0].id || masterData.leadsource[0] }));
      }
      if (!formData.status_id && masterData.lead.length > 0) {
         setFormData(prev => ({ ...prev, status_id: masterData.lead[0].id || masterData.lead[0] }));
      }
   }, [masterData, formData.source_id, formData.status_id]);

   const handleSubmit = async () => {
      if (!formData.name || !formData.phone) {
         toast.error('Identity name and primary contact are mandatory.');
         return;
      }
      const payload = new FormData();
      Object.keys(formData).forEach(key => {
         if (key === 'documents') {
            formData.documents.forEach((file) => {
               payload.append('documents[]', file);
            });
         } else {
            if (formData[key] !== null && formData[key] !== undefined) {
               payload.append(key, formData[key]);
            }
         }
      });

      try {
         await addLead(payload);
         toast.success('Inquiry successfully officialized.');
         navigate('/leads');
      } catch (err) {
         toast.error('Operational failure: ' + err.message);
      }
   };

   const inputBase = `
      w-full bg-transparent text-base font-semibold text-[var(--on-surface)] 
      outline-none placeholder-[var(--on-surface-variant)]/40
   `;

   const fieldWrap = `
      relative border-b-2 border-[var(--outline-variant)] 
      focus-within:border-[var(--primary)] transition-colors duration-200 pb-2.5
   `;

   const labelBase = `
      block text-[10px] font-bold uppercase tracking-[0.18em] 
      text-[var(--on-surface-variant)] mb-2 ml-0.5
   `;

   const cardBase = `
      bg-[var(--surface-container-lowest)] rounded-2xl 
      border border-[var(--outline-variant)] shadow-sm
   `;

   const sideCardBase = `
      bg-[var(--surface-container-lowest)] rounded-2xl 
      border border-[var(--outline-variant)]
   `;

   const sectionTitle = `
      text-[10px] font-extrabold uppercase tracking-[0.22em] 
      text-[var(--on-surface-variant)] flex items-center gap-2 mb-7
   `;

   return (
     <>
      <div className="font-inter space-y-8 animate-in fade-in duration-500 max-w-[1400px] mx-auto">

         {/* ── Header ─────────────────────────────────── */}
         <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
               <h1 className="text-2xl font-manrope font-extrabold text-[var(--on-surface)] tracking-tight leading-tight">
                  Capture New Inquiry
               </h1>
               <p className="text-[var(--on-surface-variant)] text-[13px] mt-1">
                  Formalizing a new pilgrimage journey into the database.
               </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
               <Link
                  to="/leads"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[var(--outline-variant)] text-[11px] font-bold uppercase tracking-widest text-[var(--on-surface-variant)] bg-[var(--surface-container-lowest)] hover:bg-[var(--surface-container-high)] transition-colors"
               >
                  <X size={14} strokeWidth={2.5} />
                  Discard
               </Link>
               <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-[11px] font-extrabold uppercase tracking-widest text-white transition-all
                     ${isLoading
                        ? 'opacity-50 cursor-not-allowed bg-[var(--primary)]'
                        : 'bg-[var(--primary)] hover:brightness-110 active:scale-[0.98]'
                     }`}
               >
                  <Save size={15} strokeWidth={2.5} />
                  {isLoading ? 'Saving...' : 'Verify & Save'}
               </button>
            </div>
         </div>

         {/* ── Bento Grid ─────────────────────────────── */}
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* ─── LEFT / MAIN (2 cols) ─────────────────── */}
            <div className="lg:col-span-2 flex flex-col gap-6">

               {/* Personal Info Card */}
               <div className={`${cardBase} p-7 lg:p-9`}>
                  <h3 className={sectionTitle}>
                     <span className="w-5 h-5 rounded-md bg-[var(--primary)]/10 flex items-center justify-center">
                        <Info size={12} strokeWidth={2.5} className="text-[var(--primary)]" />
                     </span>
                     Personal Information
                  </h3>

                  <div className="space-y-8">
                     {/* Full Name */}
                     <div>
                        <label className={labelBase}>Full Identity Name</label>
                        <div className={fieldWrap}>
                           <input
                              type="text"
                              placeholder="Enter name as per passport..."
                              className={`${inputBase} text-lg`}
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                           />
                        </div>
                     </div>

                     {/* Phone + Email */}
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                           <label className={labelBase}>Primary Contact</label>
                           <div className={`${fieldWrap} flex items-center gap-2`}>
                              <Phone size={15} className="text-[var(--on-surface-variant)]/60 shrink-0" />
                              <input
                                 type="text"
                                 placeholder="+92 3--"
                                 className={inputBase}
                                 value={formData.phone}
                                 onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                              />
                           </div>
                        </div>
                        <div>
                           <label className={labelBase}>Email Address</label>
                           <div className={`${fieldWrap} flex items-center gap-2`}>
                              <Mail size={15} className="text-[var(--on-surface-variant)]/60 shrink-0" />
                              <input
                                 type="email"
                                 placeholder="customer@domain.com"
                                 className={inputBase}
                                 value={formData.email}
                                 onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              />
                           </div>
                        </div>
                     </div>

                     {/* City */}
                     <div>
                        <label className={labelBase}>Geographical Origin</label>
                        <div className={`${fieldWrap} flex items-center gap-2`}>
                           <input
                              type="text"
                              placeholder="City of residence..."
                              className={inputBase}
                              value={formData.city}
                              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                           />
                           <MapPin size={16} className="text-[var(--on-surface-variant)]/60 shrink-0" />
                        </div>
                     </div>
                  </div>
               </div>

               {/* Inquiry Message Card */}
               <div className={`${cardBase} p-7 lg:p-9`}>
                  <h3 className={sectionTitle}>
                     <span className="w-5 h-5 rounded-md bg-blue-500/10 flex items-center justify-center">
                        <MessageSquare size={12} strokeWidth={2.5} className="text-blue-500" />
                     </span>
                     Inquiry Transcription
                  </h3>
                  <textarea
                     placeholder="Record the customer's spiritual requirements and package preferences..."
                     className="w-full px-5 py-4 bg-[var(--surface-container-low)] rounded-xl text-[13px] font-medium text-[var(--on-surface)] outline-none focus:ring-2 focus:ring-[var(--primary)]/30 transition-all h-36 resize-none placeholder-[var(--on-surface-variant)]/50 border border-transparent focus:border-[var(--primary)]/20"
                     value={formData.message}
                     onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
               </div>

               {/* Internal Notes Card */}
               <div className={`${cardBase} p-7 lg:p-9`}>
                  <h3 className={sectionTitle}>
                     <span className="w-5 h-5 rounded-md bg-amber-500/10 flex items-center justify-center">
                        <ShieldCheck size={12} strokeWidth={2.5} className="text-amber-500" />
                     </span>
                     Operational Intelligence
                  </h3>
                  <textarea
                     placeholder="Add internal performance notes, staff comments, or special operational instructions..."
                     className="w-full px-5 py-4 bg-[var(--surface-container-low)] rounded-xl text-[13px] font-medium text-[var(--on-surface)] outline-none focus:ring-2 focus:ring-[var(--primary)]/30 transition-all h-36 resize-none placeholder-[var(--on-surface-variant)]/50 border border-transparent focus:border-[var(--primary)]/20"
                     value={formData.comments}
                     onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
                  />
               </div>

               {/* Document Upload Card */}
               <div className={`${cardBase} p-7 lg:p-9`}>
                  <h3 className={sectionTitle}>
                     <span className="w-5 h-5 rounded-md bg-slate-500/10 flex items-center justify-center">
                        <FileText size={12} strokeWidth={2.5} className="text-slate-500" />
                     </span>
                     Official Documents
                  </h3>
                  <div className="flex flex-col gap-4">
                     <label className="flex flex-1 items-center justify-center gap-2 px-5 py-6 rounded-xl border-2 border-dashed border-[var(--outline-variant)] bg-[var(--surface-container-lowest)] hover:border-[var(--primary)] cursor-pointer transition-all">
                        <FileText size={20} className="text-[var(--primary)]" />
                        <span className="text-[12px] font-semibold text-[var(--on-surface-variant)]">
                            Click to Upload Relevant Documents (Multiple allowed)
                        </span>
                        <input
                           type="file"
                           multiple
                           className="hidden"
                           onChange={(e) => {
                              const newFiles = Array.from(e.target.files);
                              setFormData({ ...formData, documents: [...(formData.documents || []), ...newFiles] });
                           }}
                        />
                     </label>
                     {formData.documents && formData.documents.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                           {formData.documents.map((file, index) => (
                              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-[var(--surface-container-low)] border border-[var(--outline-variant)]">
                                 <div className="flex items-center gap-2 overflow-hidden">
                                    <FileText size={14} className="text-[var(--primary)] shrink-0" />
                                    <span className="text-[11px] font-medium text-[var(--on-surface)] truncate">
                                       {file.name}
                                    </span>
                                 </div>
                                 <button
                                    onClick={() => {
                                       const newDocs = formData.documents.filter((_, i) => i !== index);
                                       setFormData({ ...formData, documents: newDocs });
                                    }}
                                    className="p-1.5 hover:bg-red-50 hover:text-red-500 text-[var(--on-surface-variant)] rounded-md transition-colors"
                                 >
                                    <X size={14} />
                                 </button>
                              </div>
                           ))}
                        </div>
                     )}
                  </div>
               </div>
            </div>

            {/* ─── RIGHT / SIDEBAR (1 col) ──────────────── */}
            <div className="flex flex-col gap-6">

               {/* Acquisition Channel */}
               <div className={`${sideCardBase} p-6`}>
                  <h3 className={sectionTitle}>
                     <span className="w-5 h-5 rounded-md bg-green-500/10 flex items-center justify-center">
                        <Rss size={12} strokeWidth={2.5} className="text-green-500" />
                     </span>
                     Acquisition Channel
                  </h3>
                  <div className="flex flex-col gap-2">
                     {masterData.leadsource.map((src) => {
                        const sourceName = src.name || src;
                        const srcId = src.id || sourceName;
                        const isSelected = formData.source_id === srcId;

                        const getIcon = (name) => {
                           const n = name.toLowerCase();
                           if (n.includes('facebook')) return FacebookIcon;
                           if (n.includes('whatsapp')) return MessageSquare;
                           if (n.includes('instagram')) return InstagramIcon;
                           if (n.includes('website')) return Rss;
                           return Globe;
                        };
                        const SourceIcon = getIcon(sourceName);

                        return (
                           <button
                              key={srcId}
                              onClick={() => setFormData({ ...formData, source_id: srcId })}
                              className={`flex items-center justify-between px-4 py-3 rounded-xl border transition-all duration-150
                                 ${isSelected
                                    ? 'bg-[var(--primary)]/8 border-[var(--primary)]/30 shadow-sm'
                                    : 'bg-[var(--surface-container-low)] border-transparent hover:border-[var(--outline-variant)] hover:bg-[var(--surface-container-high)]'
                                 }`}
                           >
                              <div className="flex items-center gap-3">
                                 <SourceIcon
                                    size={15}
                                    className={isSelected ? 'text-[var(--primary)]' : 'text-[var(--on-surface-variant)]'}
                                 />
                                 <span className={`text-[11px] font-bold uppercase tracking-widest
                                    ${isSelected ? 'text-[var(--primary)]' : 'text-[var(--on-surface-variant)]'}`}>
                                    {sourceName}
                                 </span>
                              </div>
                              {isSelected && (
                                 <div className="w-2 h-2 rounded-full bg-[var(--primary)]" />
                              )}
                           </button>
                        );
                     })}
                  </div>
               </div>

               {/* Assign Staff */}
               <div className={`${sideCardBase} p-6`}>
                  <h3 className={sectionTitle}>
                     <span className="w-5 h-5 rounded-md bg-purple-500/10 flex items-center justify-center">
                        <UserCheck size={12} strokeWidth={2.5} className="text-purple-500" />
                     </span>
                     Delegation Protocol 
                  </h3>
                  <div className="relative">   

                     <select
                        className="w-full px-4 py-3 bg-[var(--surface-container-low)] rounded-xl text-[12px] font-semibold text-[var(--on-surface)] outline-none border border-[var(--outline-variant)] appearance-none cursor-pointer hover:border-[var(--primary)]/40 focus:border-[var(--primary)]/50 focus:ring-2 focus:ring-[var(--primary)]/20 transition-all"
                        value={formData.assigned_to_id}
                        onChange={(e) => setFormData({ ...formData, assigned_to_id: e.target.value })}
                     >
                        <option value="">— Select Staff Member —</option>
                        {users.filter(u => u.is_admin === 0 && u.role_name == 'Sales').map(u => (
                           <option key={u.id} value={u.id}>{u.name || u.email}</option>
                        ))}
                     </select>
                     <ChevronRight size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 rotate-90 text-[var(--on-surface-variant)] pointer-events-none" />
                  </div>
               </div>

               {/* Follow-up Date */}
               <div className={`${sideCardBase} p-6`}>
                  <h3 className={sectionTitle}>
                     <span className="w-5 h-5 rounded-md bg-teal-500/10 flex items-center justify-center">
                        <Calendar size={12} strokeWidth={2.5} className="text-teal-500" />
                     </span>
                     Follow-up Date
                  </h3>
                  <input
                     type="date"
                     className="w-full px-4 py-3 bg-[var(--surface-container-low)] rounded-xl text-[12px] font-semibold text-[var(--on-surface)] outline-none border border-[var(--outline-variant)] cursor-pointer hover:border-[var(--primary)]/40 focus:border-[var(--primary)]/50 focus:ring-2 focus:ring-[var(--primary)]/20 transition-all"
                     value={formData.follow_up_date}
                     onChange={(e) => setFormData({ ...formData, follow_up_date: e.target.value })}
                  />
               </div>

               {/* Lifecycle Status */}
               <div className={`${sideCardBase} p-6`}>
                  <h3 className={sectionTitle}>
                     <span className="w-5 h-5 rounded-md bg-rose-500/10 flex items-center justify-center">
                        <Activity size={12} strokeWidth={2.5} className="text-rose-500" />
                     </span>
                     Lifecycle Status
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                     {masterData.lead.map((s) => {
                        const sId = s.id || s;
                        const isSelected = formData.status_id === sId;
                        return (
                           <button
                              key={sId}
                              onClick={() => setFormData({ ...formData, status_id: sId })}
                              className={`py-2.5 rounded-xl text-[10px] font-extrabold uppercase tracking-widest transition-all duration-150 border
                                 ${isSelected
                                    ? 'bg-[var(--on-surface)] text-[var(--surface)] border-transparent'
                                    : 'bg-[var(--surface-container-low)] text-[var(--on-surface-variant)] border-[var(--outline-variant)] hover:bg-[var(--surface-container-high)] hover:border-[var(--outline)]'
                                 }`}
                           >
                              {s.name || s}
                           </button>
                        );
                     })}
                  </div>
               </div>

               {/* Protocol Note Banner */}
               <div className="rounded-2xl p-6 bg-[var(--on-surface)] text-[var(--surface)] relative overflow-hidden">
                  <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-white/5" />
                  <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-white/5" />
                  <ShieldCheck className="text-white/30 mb-4" size={22} strokeWidth={1.5} />
                  <h4 className="text-[11px] font-extrabold uppercase tracking-widest mb-1.5 text-white/90">Protocol Note</h4>
                  <p className="text-[11px] text-white/55 leading-relaxed font-medium">
                     Ensure all data points are verified against the customer's travel documentation before authorization.
                  </p>
               </div>
              {/* protocol note banner ended here */}
            </div>
         </div>
      </div>
     </>
   );
};

export default AddLead;