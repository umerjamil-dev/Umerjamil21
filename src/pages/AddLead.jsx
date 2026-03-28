import React, { useState } from 'react';
import {
   ArrowLeft, UserPlus, Phone,
   Mail, MapPin, MessageSquare,
   Tag, Info, Save, X,
   Globe, ChevronRight, ShieldCheck,
   UserCheck, Calendar, Activity
} from 'lucide-react';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import { Link, useNavigate } from 'react-router-dom';
import useLeadStore from '../store/useLeadStore';
import toast from 'react-hot-toast';

const AddLead = () => {
   const navigate = useNavigate();
   const { addLead, isLoading } = useLeadStore();
   const [formData, setFormData] = useState({
      name: '',
      phone: '',
      email: '',
      city: '',
      source: 'Facebook',
      message: '',
      assignedUser: '',
      followUpDate: '',
      status: 'New',
      comments: ''
   });

   const handleSubmit = async () => {
      if (!formData.name || !formData.phone) {
         toast.error('Identity name and primary contact are mandatory.');
         return;
      }

      try {
         await addLead(formData);
         toast.success('Inquiry successfully officialized.');
         navigate('/leads');
      } catch (err) {
         toast.error('Operational failure: ' + err.message);
      }
   };


   return (
      <div className="font-inter space-y-10 animate-in fade-in duration-700">
         {/* Header */}
         <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-2">
            <div>
               <h1 className="text-3xl font-manrope font-extrabold text-[var(--on-surface)] tracking-tight">Capture New Inquiry</h1>
               <p className="text-[var(--on-surface-variant)] text-sm mt-1 font-medium">Formalizing a new pilgrimage journey into the database.</p>
            </div>
            <div className="flex items-center gap-3">
               <Link
                  to="/leads"
                  className="px-6 py-3 bg-[var(--surface-container-lowest)] border border-[var(--outline-variant)] rounded-2xl text-[11px] font-bold text-[var(--on-surface-variant)] uppercase tracking-widest hover:bg-[var(--surface-container-high)] transition-all flex items-center gap-2"
               >
                  Discard & Exit
               </Link>
               <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className={`btn-primary px-8 py-3 rounded-2xl text-white text-[11px] font-extrabold uppercase shadow-xl hover:-translate-y-0.5 transition-all flex items-center gap-2 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
               >
                  <Save size={18} strokeWidth={2.5} />
                  {isLoading ? 'Officializing...' : 'Verify & Save'}
               </button>
            </div>
         </div>

         {/* Bento Style Layout */}
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Main Form Fields (2/3) */}
            <div className="lg:col-span-2 space-y-8">
               <div className="bg-[var(--surface-container-lowest)]    rounded-xl p-8 lg:p-10 shadow-sm border border-[var(--outline-variant)]">
                  <h3 className="text-[10px] font-extrabold text-[var(--on-surface-variant)] uppercase tracking-[0.25em] mb-10 flex items-center gap-2">
                     <Info size={14} strokeWidth={2.5} /> Personal
                  </h3>

                  <div className="space-y-10">
                     <div className="group">
                        <label className="text-[10px] font-bold text-[var(--on-surface-variant)] uppercase tracking-widest mb-2 block ml-1">Full Identity Name</label>
                        <div className="relative border-b-2 border-[var(--surface-container-low)] group-focus-within:border-[var(--on-surface)] transition-all pb-3">
                           <input
                              type="text"
                              placeholder="Enter name as per passport..."
                              className="w-full bg-transparent text-lg font-manrope font-extrabold text-[var(--on-surface)] outline-none placeholder-[var(--on-surface-variant)]/40"
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                           />
                        </div>
                     </div>

                     <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="group">
                           <label className="text-[10px] font-bold text-[var(--on-surface-variant)] uppercase tracking-widest mb-2 block ml-1">Primary Contact</label>
                           <div className="relative border-b-2 border-[var(--surface-container-low)] group-focus-within:border-[var(--on-surface)] transition-all pb-3">
                              <input
                                 type="text"
                                 placeholder="+92 3--"
                                 className="w-full bg-transparent text-lg font-manrope font-extrabold text-[var(--on-surface)] outline-none placeholder-[var(--on-surface-variant)]/40"
                                 value={formData.phone}
                                 onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                              />
                           </div>
                        </div>
                        <div className="group">
                           <label className="text-[10px] font-bold text-[var(--on-surface-variant)] uppercase tracking-widest mb-2 block ml-1">Email Archive</label>
                           <div className="relative border-b-2 border-[var(--surface-container-low)] group-focus-within:border-[var(--on-surface)] transition-all pb-3">
                              <input
                                 type="email"
                                 placeholder="customer@domain.com"
                                 className="w-full bg-transparent text-lg font-manrope font-extrabold text-[var(--on-surface)] outline-none placeholder-[var(--on-surface-variant)]/40"
                                 value={formData.email}
                                 onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              />
                           </div>
                        </div>
                     </div>

                     <div className="group">
                        <label className="text-[10px] font-bold text-[var(--on-surface-variant)] uppercase tracking-widest mb-2 block ml-1">Geographical Origin</label>
                        <div className="relative border-b-2 border-[var(--surface-container-low)] group-focus-within:border-[var(--on-surface)] transition-all pb-3 flex items-center justify-between">
                           <input
                              type="text"
                              placeholder="Citizen City..."
                              className="w-full bg-transparent text-lg font-manrope font-extrabold text-[var(--on-surface)] outline-none placeholder-[var(--on-surface-variant)]/40"
                              value={formData.city}
                              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                           />
                           <MapPin size={20} className="text-[var(--on-surface-variant)]" />
                        </div>
                     </div>
                  </div>
               </div>

               <div className="bg-[var(--surface-container-lowest)]    rounded-xl p-8 lg:p-10 shadow-sm border border-[var(--outline-variant)]">
                  <h3 className="text-[10px] font-extrabold text-[var(--on-surface-variant)] uppercase tracking-[0.25em] mb-8 flex items-center gap-2">
                     <MessageSquare size={14} strokeWidth={2.5} /> Inquiry Transcription
                  </h3>
                  <textarea
                     placeholder="Record the customer's spiritual requirements and package preferences..."
                     className="w-full p-6 bg-[var(--surface)] border-none rounded-3xl text-sm font-medium text-[var(--on-surface-variant)] outline-none focus:ring-2 focus:ring-[var(--surface-container-low)] transition-all h-32 resize-none placeholder-[var(--on-surface-variant)]/60"
                     value={formData.message}
                     onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  ></textarea>
               </div>

               <div className="bg-[var(--surface-container-lowest)]    rounded-xl p-8 lg:p-10 shadow-sm border border-[var(--outline-variant)]">
                  <h3 className="text-[10px] font-extrabold text-[var(--on-surface-variant)] uppercase tracking-[0.25em] mb-8 flex items-center gap-2">
                     <ShieldCheck size={14} strokeWidth={2.5} /> Operational Intelligence
                  </h3>
                  <textarea
                     placeholder="Add internal performance notes, staff comments, or special operational instructions..."
                     className="w-full p-6 bg-[var(--surface)] border-none rounded-3xl text-sm font-medium text-[var(--on-surface-variant)] outline-none focus:ring-2 focus:ring-[var(--surface-container-low)] transition-all h-32 resize-none placeholder-[var(--on-surface-variant)]/60"
                     value={formData.comments}
                     onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
                  ></textarea>
               </div>
            </div>

            {/* Metadata Sidebar (1/3) */}
            <div className="space-y-8">
               <div className="bg-[var(--surface-container-low)]    rounded-xl p-8 border border-[var(--outline-variant)]">
                  <h3 className="text-[10px] font-extrabold text-[var(--on-surface-variant)] uppercase tracking-[0.25em] mb-8">Acquisition Channel</h3>
                  <div className="grid grid-cols-1 gap-3">
                     {[
                        { id: 'Facebook', icon: FacebookIcon, color: 'text-blue-600' },
                        { id: 'WhatsApp', icon: MessageSquare, color: 'text-green-600' },
                        { id: 'Instagram', icon: InstagramIcon, color: 'text-pink-600' },
                        { id: 'Direct', icon: Globe, color: 'text-gray-600' }
                     ].map((src) => (
                        <button
                           key={src.id}
                           onClick={() => setFormData({ ...formData, source: src.id })}
                           className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${formData.source === src.id
                              ? 'bg-white border-transparent shadow-xl shadow-black/5 ring-1 ring-[var(--on-surface)]/10'
                              : 'bg-white/40 border-transparent hover:border-[var(--outline-variant)] text-[var(--on-surface-variant)]'
                              }`}
                        >
                           <div className="flex items-center gap-3">
                              <src.icon size={16} className={formData.source === src.id ? 'text-[var(--on-surface)]' : ''} />
                              <span className={`text-[10px] font-extrabold uppercase tracking-widest ${formData.source === src.id ? 'text-[var(--on-surface)]' : ''}`}>{src.id}</span>
                           </div>
                           {formData.source === src.id && <div className="w-2 h-2 rounded-full bg-[var(--on-surface)]"></div>}
                        </button>
                     ))}
                  </div>
               </div>

               <div className="bg-[var(--surface-container-lowest)]    rounded-xl p-8 border border-[var(--outline-variant)]">
                  <h3 className="text-[10px] font-extrabold text-[var(--on-surface-variant)] uppercase tracking-[0.25em] mb-6 flex items-center gap-2">
                     <UserCheck size={14} /> Delegation Protocol
                  </h3>
                  <select
                     className="w-full p-4 bg-[var(--surface)] rounded-2xl text-[11px] font-bold text-[var(--on-surface)] outline-none border border-[var(--outline-variant)] appearance-none cursor-pointer"
                     value={formData.assignedUser}
                     onChange={(e) => setFormData({ ...formData, assignedUser: e.target.value })}
                  >
                     <option value="">Select Staff Member</option>
                     <option value="umar">Umar Jamil</option>
                     <option value="ali">Ali Raza</option>
                     <option value="hamza">Hamza Khan</option>
                  </select>
               </div>

               <div className="bg-[var(--surface-container-lowest)]    rounded-xl p-8 border border-[var(--outline-variant)]">
                  <h3 className="text-[10px] font-extrabold text-[var(--on-surface-variant)] uppercase tracking-[0.25em] mb-6 flex items-center gap-2">
                     <Calendar size={14} /> Follow-up Matrix
                  </h3>
                  <input
                     type="date"
                     className="w-full p-4 bg-[var(--surface)] rounded-2xl text-[11px] font-bold text-[var(--on-surface)] outline-none border border-[var(--outline-variant)] cursor-pointer"
                     value={formData.followUpDate}
                     onChange={(e) => setFormData({ ...formData, followUpDate: e.target.value })}
                  />
               </div>

               <div className="bg-[var(--surface-container-lowest)]    rounded-xl p-8 border border-[var(--outline-variant)]">
                  <h3 className="text-[10px] font-extrabold text-[var(--on-surface-variant)] uppercase tracking-[0.25em] mb-6 flex items-center gap-2">
                     <Activity size={14} /> Lifecycle Status
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                     {['New', 'Contacted', 'Quoted', 'Deposit', 'Lost'].map((s) => (
                        <button
                           key={s}
                           onClick={() => setFormData({ ...formData, status: s })}
                           className={`py-3 rounded-xl text-[9px] font-extrabold uppercase tracking-widest transition-all border ${formData.status === s
                              ? 'bg-[var(--on-surface)] text-white border-transparent shadow-lg'
                              : 'bg-[var(--surface)] text-[var(--on-surface-variant)] border-[var(--outline-variant)] hover:bg-[var(--surface-container-high)]'
                              }`}
                        >
                           {s}
                        </button>
                     ))}
                  </div>
               </div>

               <div className="bg-[var(--surface-container-lowest)]    rounded-xl p-8 border border-[var(--outline-variant)] group overflow-hidden relative">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--surface)] rounded-bl-[3rem]"></div>
                  <Tag className="text-[var(--on-surface-variant)] mb-6 relative z-10" size={24} strokeWidth={1.5} />
                  <h4 className="text-[11px] font-extrabold text-[var(--on-surface)] mb-2 uppercase tracking-widest relative z-10">Sales Priority</h4>
                  <p className="text-[10px] text-[var(--on-surface-variant)] mb-8 leading-relaxed font-medium relative z-10">Define the urgency of this operational cycle.</p>
                  <div className="flex gap-2 relative z-10">
                     {['Low', 'Normal', 'VIP'].map((p) => (
                        <button key={p} className="flex-1 py-3   rounded-xl bg-[var(--surface)] border border-[var(--outline-variant)] text-[9px] font-extrabold uppercase tracking-widest text-[var(--on-surface-variant)] hover:btn-midnight hover:text-white transition-all">
                           {p}
                        </button>
                     ))}
                  </div>
               </div>

               <div className="bg-[var(--grad-black)]    rounded-xl p-8 text-white relative overflow-hidden group">
                  <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/5 rounded-tl-[4rem] group-hover:scale-110 transition-transform"></div>
                  <ShieldCheck className="text-white/40 mb-6" size={28} strokeWidth={1.5} />
                  <h4 className="text-[11px] font-extrabold uppercase   mb-2">Protocol Note</h4>
                  <p className="text-[10px] text-white/60 leading-relaxed font-medium">
                     Ensure all data points are verified against the customer's travel documentation before authorization.
                  </p>
               </div>
            </div>

         </div>
      </div>
   );
};

export default AddLead;
