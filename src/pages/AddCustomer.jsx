import React, { useState } from 'react';
import {
   ArrowLeft, User, Phone,
   Mail, MapPin, Fingerprint,
   ShieldCheck, FileText, Save,
   Globe, CreditCard, Calendar, X
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import useCustomerStore from '../store/useCustomerStore';
import toast from 'react-hot-toast';

const AddCustomer = () => {
   const navigate = useNavigate();
   const { addCustomer, isLoading } = useCustomerStore();
   const [formData, setFormData] = useState({
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      passportNo: '',
      cnic: '',
      address: '',
      city: '',
      nationality: 'Pakistani',
      photo: null,
      documents: []
   });

   const handleSubmit = async () => {
      if (!formData.firstName || !formData.lastName || !formData.phone) {
         toast.error('Identity names and communication channel are mandatory.');
         return;
      }

      try {
         await addCustomer(formData);
         toast.success('Pilgrim profile officialized.');
         navigate('/customers');
      } catch (err) {
         toast.error('Registry failure: ' + err.message);
      }
   };
   
   return (
    <>
    
      <div className="font-inter space-y-12 animate-in slide-in-from-bottom-8 duration-1000 pb-20">
         {/* Header */}
         <div className="flex items-center justify-between">
            <Link to="/customers" className="flex items-center gap-3 text-[var(--on-surface-variant)] hover:text-[var(--on-surface)] transition-all group">
               <div className="p-3 bg-[var(--surface-container-lowest)]    rounded-xl border border-[var(--outline-variant)] group-hover:shadow-md transition-all">
                  <ArrowLeft size={18} strokeWidth={2.5} />
               </div>
               <span className="text-[10px] font-extrabold uppercase tracking-[0.25em]">Database Root</span>
            </Link>
            <div className="text-center absolute left-1/2 -translate-x-1/2">
               <h1 className="text-2xl font-manrope font-extrabold text-[var(--on-surface)] tracking-tight uppercase">Pilgrim </h1>
               <p className="text-[10px] text-[var(--on-surface-variant)] font-extrabold uppercase tracking-[0.3em] mt-1">Verification <span className="text-[var(--sacred-emerald)] font-black">Active</span></p>
            </div>
            <button
               onClick={handleSubmit}
               disabled={isLoading}
               className={`btn-primary px-10 py-4 rounded-xl text-white font-extrabold text-[10px] uppercase tracking-[0.3em] shadow-2xl shadow-emerald-900/20 hover:-translate-y-1 transition-all flex items-center gap-3 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
               <Save size={18} strokeWidth={2.5} />
               {isLoading ? 'Officializing...' : 'Finalize Profile'}
            </button>
         </div>
         
         {/* main content */}
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Sidebar Stats */}
            <div className="lg:col-span-3 space-y-8">
               <div className="bg-[var(--surface-container-lowest)] rounded-xl p-10 border border-[var(--outline-variant)] shadow-sm text-center group relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--surface)] rounded-bl-[4rem] translate-x-10 -translate-y-10 group-hover:translate-x-5 group-hover:-translate-y-5 transition-transform"></div>
                  <div className="relative mx-auto mb-8 w-32 h-32">
                     <div className="w-full h-full bg-[var(--surface)] rounded-[2.5rem] flex items-center justify-center text-[var(--on-surface-variant)] group-hover:bg-white group-hover:shadow-xl transition-all border border-[var(--outline-variant)] relative z-10 overflow-hidden">
                        {formData.photo ? (
                           <img src={URL.createObjectURL(formData.photo)} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                           <User size={40} strokeWidth={1.5} />
                        )}
                     </div>
                     <label className="absolute -bottom-2 -right-2 w-10 h-10 bg-[var(--on-surface)] text-white rounded-xl flex items-center justify-center cursor-pointer hover:scale-110 transition-all z-20 shadow-lg">
                        <FileText size={16} />
                        <input
                           type="file"
                           className="hidden"
                           onChange={(e) => setFormData({ ...formData, photo: e.target.files[0] })}
                           accept="image/*"
                        />
                     </label>
                  </div>
                  <h4 className="text-xs font-extrabold text-[var(--on-surface)] uppercase   relative z-10">Biometric Identity</h4>
                  <p className="text-[10px] font-medium text-[var(--on-surface-variant)] mt-4 leading-relaxed opacity-60 relative z-10">OCR processing enabled for machine-readable documents.</p>
               </div>

               <div className="bg-[#111827] rounded-xl p-10 text-black shadow-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-[5rem]"></div>
                  <ShieldCheck className="text-[var(--sacred-emerald)] mb-8" size={28} strokeWidth={2.5} />
                  <h4 className="text-xs text-white font-extrabold uppercase   mb-4">Compliance</h4>
                  <p className="text-[11px] font-medium text-white/50 leading-relaxed mb-10">MRZ validation active. Cross-referencing Saudi Embassy blacklists.</p>
                  <div className="space-y-4">
                     {['Passport MRZ', 'Visa Eligibility', 'WHO Status'].map(item => (
                        <div key={item} className="flex items-center gap-3 text-[9px] font-extrabold uppercase   text-white/40">
                           <div className="w-1.5 h-1.5 rounded-full bg-[var(--sacred-emerald)] shadow-[0_0_8px_var(--sacred-emerald)]"></div>
                           {item}
                        </div>
                     ))}
                  </div>
               </div>
            </div>

            {/* Form Main */}
            <div className="lg:col-span-9 space-y-10">
               {/* Identity Bento Section */}
               <div className="bg-[var(--surface-container-lowest)] rounded-xl p-12 shadow-sm border border-[var(--outline-variant)] group relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-[var(--surface)] rounded-bl-[6rem] translate-x-16 -translate-y-16"></div>
                  <h3 className="text-[10px] font-extrabold text-[var(--on-surface-variant)] uppercase tracking-[0.3em] mb-12 flex items-center gap-3 relative z-10">
                     <Fingerprint size={18} strokeWidth={2.5} /> Legal Identity
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-16 relative z-10">
                     <div className="group">
                        <label className="text-[10px] font-extrabold text-[var(--on-surface-variant)] uppercase tracking-widest mb-4 block ml-1">First Name</label>
                        <div className="relative border-b border-[var(--outline-variant)] group-focus-within:border-[var(--on-surface)] transition-all pb-4">
                           <input
                              type="text"
                              placeholder="Ex: Muhammad"
                              className="w-full bg-transparent text-sm font-manrope font-extrabold text-[var(--on-surface)] outline-none placeholder-[var(--on-surface-variant)]/30"
                              value={formData.firstName}
                              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                           />
                        </div>
                     </div>
                     <div className="group">
                        <label className="text-[10px] font-extrabold text-[var(--on-surface-variant)] uppercase tracking-widest mb-4 block ml-1">Last Name</label>
                        <div className="relative border-b border-[var(--outline-variant)] group-focus-within:border-[var(--on-surface)] transition-all pb-4">
                           <input
                              type="text"
                              placeholder="Ex: Ahmed"
                              className="w-full bg-transparent text-sm font-manrope font-extrabold text-[var(--on-surface)] outline-none placeholder-[var(--on-surface-variant)]/30"
                              value={formData.lastName}
                              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                           />
                        </div>
                     </div>

                     <div className="group">
                        <label className="text-[10px] font-extrabold text-[var(--on-surface-variant)] uppercase tracking-widest mb-4 block ml-1">Passport Index</label>
                        <div className="relative border-b border-[var(--outline-variant)] group-focus-within:border-[var(--on-surface)] transition-all pb-4 flex items-center justify-between">
                           <input
                              type="text"
                              placeholder="AB1234567"
                              className="w-full bg-transparent text-sm font-manrope font-extrabold text-[var(--on-surface)] outline-none uppercase   placeholder-[var(--on-surface-variant)]/30"
                              value={formData.passportNo}
                              onChange={(e) => setFormData({ ...formData, passportNo: e.target.value })}
                           />
                           <ShieldCheck size={18} className="text-[var(--on-surface-variant)]" />
                        </div>
                     </div>
                     <div className="group">
                        <label className="text-[10px] font-extrabold text-[var(--on-surface-variant)] uppercase tracking-widest mb-4 block ml-1">Citizen Registry (CNIC)</label>
                        <div className="relative border-b border-[var(--outline-variant)] group-focus-within:border-[var(--on-surface)] transition-all pb-4 flex items-center justify-between">
                           <input
                              type="text"
                              placeholder="42101-0000000-0"
                              className="w-full bg-transparent text-sm font-manrope font-extrabold text-[var(--on-surface)] outline-none placeholder-[var(--on-surface-variant)]/30"
                              value={formData.cnic}
                              onChange={(e) => setFormData({ ...formData, cnic: e.target.value })}
                           />
                           <Fingerprint size={18} className="text-[var(--on-surface-variant)]" />
                        </div>
                     </div>
                  </div>
               </div>

               {/* Contact & Logistics */}
               <div className="bg-[var(--surface-container-lowest)] rounded-xl p-12 shadow-sm border border-[var(--outline-variant)] group relative overflow-hidden">
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-[var(--surface)] rounded-tr-[5rem] -translate-x-12 translate-y-12"></div>
                  <h3 className="text-[10px] font-extrabold text-[var(--on-surface-variant)] uppercase tracking-[0.3em] mb-12 flex items-center gap-3 relative z-10">
                     <Globe size={18} strokeWidth={2.5} /> Global Reach
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-16 relative z-10">
                     <div className="group">
                        <label className="text-[10px] font-extrabold text-[var(--on-surface-variant)] uppercase tracking-widest mb-4 block ml-1">Communication Channel</label>
                        <div className="relative border-b border-[var(--outline-variant)] group-focus-within:border-[var(--on-surface)] transition-all pb-4 flex items-center justify-between">
                           <input
                              type="text"
                              placeholder="+92 300 0000000"
                              className="w-full bg-transparent text-sm font-manrope font-extrabold text-[var(--on-surface)] outline-none placeholder-[var(--on-surface-variant)]/30"
                              value={formData.phone}
                              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                           />
                           <Phone size={18} className="text-[var(--on-surface-variant)]" />
                        </div>
                     </div>
                     <div className="group">
                        <label className="text-[10px] font-extrabold text-[var(--on-surface-variant)] uppercase tracking-widest mb-4 block ml-1">Email Archive</label>
                        <div className="relative border-b border-[var(--outline-variant)] group-focus-within:border-[var(--on-surface)] transition-all pb-4 flex items-center justify-between">
                           <input
                              type="email"
                              placeholder="pilgrim@domain.com"
                              className="w-full bg-transparent text-sm font-manrope font-extrabold text-[var(--on-surface)] outline-none placeholder-[var(--on-surface-variant)]/30"
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                           />
                           <Mail size={18} className="text-[var(--on-surface-variant)]" />
                        </div>
                     </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-16 relative z-10">
                     <div className="group">
                        <label className="text-[10px] font-extrabold text-[var(--on-surface-variant)] uppercase tracking-widest mb-4 block ml-1">Citizen City</label>
                        <div className="relative border-b border-[var(--outline-variant)] group-focus-within:border-[var(--on-surface)] transition-all pb-4 flex items-center justify-between">
                           <input
                              type="text"
                              placeholder="Ex: Karachi"
                              className="w-full bg-transparent text-sm font-manrope font-extrabold text-[var(--on-surface)] outline-none placeholder-[var(--on-surface-variant)]/30"
                              value={formData.city}
                              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                           />
                           <MapPin size={18} className="text-[var(--on-surface-variant)]" />
                        </div>
                     </div>
                     <div className="group">
                        <label className="text-[10px] font-extrabold text-[var(--on-surface-variant)] uppercase tracking-widest mb-4 block ml-1">Sovereign State</label>
                        <div className="relative border-b border-[var(--outline-variant)] group-focus-within:border-[var(--on-surface)] transition-all pb-4 flex items-center justify-between">
                           <input
                              type="text"
                              placeholder="Registry..."
                              className="w-full bg-transparent text-sm font-manrope font-extrabold text-[var(--on-surface)] outline-none placeholder-[var(--on-surface-variant)]/30"
                              value={formData.nationality}
                              onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
                           />
                           <Globe size={18} className="text-[var(--on-surface-variant)]" />
                        </div>
                     </div>
                  </div>

                  <div className="group relative z-10">
                     <label className="text-[10px] font-extrabold text-[var(--on-surface-variant)] uppercase tracking-widest mb-4 block ml-1"> Address</label>
                     <div className="relative border-b border-[var(--outline-variant)] group-focus-within:border-[var(--on-surface)] transition-all pb-4 flex items-center justify-between">
                        <input
                           type="text"
                           placeholder="House #, Street, City, State"
                           className="w-full bg-transparent text-sm font-manrope font-extrabold text-[var(--on-surface)] outline-none placeholder-[var(--on-surface-variant)]/30"
                           value={formData.address}
                           onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        />
                        <MapPin size={18} className="text-[var(--on-surface-variant)]" />
                     </div>
                  </div>

                  <div className="group relative z-10 mt-16">
                     <label className="text-[10px] font-extrabold text-[var(--on-surface-variant)] uppercase tracking-widest mb-4 block ml-1"> Supporting Documents</label>
                     <label className="relative border-2 border-dashed border-[var(--outline-variant)] hover:border-[var(--on-surface-variant)] transition-all py-6 rounded-xl flex items-center justify-center gap-3 cursor-pointer">
                        <FileText size={20} className="text-[var(--on-surface-variant)]" />
                        <span className="text-sm font-manrope font-extrabold text-[var(--on-surface-variant)]">
                            Click to Upload Identity Documents or Visas (Multiple)
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
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                           {formData.documents.map((file, index) => (
                              <div key={index} className="flex items-center justify-between p-4 rounded-xl bg-[var(--surface-container-low)] border border-[var(--outline-variant)] shadow-sm">
                                 <div className="flex items-center gap-3 overflow-hidden">
                                    <div className="p-2 bg-[var(--outline-variant)]/30 rounded-lg">
                                       <FileText size={16} className="text-[var(--on-surface)]" />
                                    </div>
                                    <span className="text-xs font-semibold text-[var(--on-surface)] truncate max-w-[150px]">
                                       {file.name}
                                    </span>
                                 </div>
                                 <button
                                    onClick={() => {
                                       const newDocs = formData.documents.filter((_, i) => i !== index);
                                       setFormData({ ...formData, documents: newDocs });
                                    }}
                                    className="p-2 hover:bg-red-50 hover:text-red-500 text-[var(--on-surface-variant)] rounded-lg transition-colors border border-transparent hover:border-red-100"
                                    title="Remove Document"
                                 >
                                    <X size={16} />
                                 </button>
                              </div>
                           ))}
                        </div>
                     )}
                  </div>
               </div>
            </div>
         </div>
      </div>
    </>
   );
};

export default AddCustomer;
