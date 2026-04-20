import React, { useState, useEffect } from 'react';
import {
   ArrowLeft, User, Phone,
   Mail, MapPin, Fingerprint,
   ShieldCheck, FileText, Save,
   Globe, CreditCard, Calendar
} from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import useCustomerStore from '../store/useCustomerStore';
import toast from 'react-hot-toast';

const UpdateCustomer = () => {
   const { id } = useParams();
   const navigate = useNavigate();
   const { getCustomer, updateCustomer, isLoading } = useCustomerStore();
   const imgBaseUrl = 'https://hajjumrahbackend.processiqtech.com/';

   const [formData, setFormData] = useState({
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      passport_no: '',
      cnic: '',
      address: '',
      city: '',
      country: 'Pakistan',
      customer_image: null
   });

   useEffect(() => {
      const init = async () => {
         try {
            const customer = await getCustomer(id);
            if (customer) {
               setFormData({
                  firstName: customer.firstName || '',
                  lastName: customer.lastName || '',
                  phone: customer.phone || '',
                  email: customer.email || '',
                  passport_no: customer.passport_no || '',
                  cnic: customer.cnic || '',
                  address: customer.address || '',
                  city: customer.city || '',
                  country: customer.country || 'Pakistan',
                  customer_image: customer.customer_image || null
               });
            }
         } catch (err) {
            toast.error('Failed to load pilgrim intelligence.');
         }
      };
      init();
   }, [id, getCustomer]);

   const handleSubmit = async () => {
      if (!formData.firstName || !formData.lastName || !formData.phone) {
         toast.error('Identity names and communication channel are mandatory.');
         return;
      }

      try {
         await updateCustomer(id, formData);
         toast.success('Pilgrim profile refined.');
         navigate(`/customers/${id}`);
      } catch (err) {
         toast.error('Registry failure: ' + err.message);
      }
   };

   return (
      <>
         <div className="font-inter  space-y-12 animate-in slide-in-from-bottom-8 duration-1000 pb-20">
            {/* Header */}
            <div className="flex items-center justify-between">
               <Link to={`/customers/${id}`} className="flex items-center gap-3 text-[var(--on-surface-variant)] hover:text-[var(--on-surface)] transition-all group">
                  <div className="p-3 bg-[var(--surface-container-lowest)]    rounded-xl border border-[var(--outline-variant)] group-hover:shadow-md transition-all">
                     <ArrowLeft size={18} strokeWidth={2.5} />
                  </div>
                  <span className="text-[10px] font-extrabold uppercase tracking-[0.25em]">Pilgrim Profile</span>
               </Link>
               <div className="text-center absolute left-1/2 -translate-x-1/2">
                  <h1 className="text-2xl font-manrope font-extrabold text-[var(--on-surface)] tracking-tight uppercase">Update</h1>
                  <p className="text-[10px] text-[var(--on-surface-variant)] font-extrabold uppercase tracking-[0.3em] mt-1">Record ID: {id}</p>
               </div>
               <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className={`btn-primary px-10 py-4 rounded-xl text-white font-extrabold text-[10px] uppercase tracking-[0.3em] shadow-2xl shadow-emerald-900/20 hover:-translate-y-1 transition-all flex items-center gap-3 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
               >
                  <Save size={18} strokeWidth={2.5} />
                  {isLoading ? 'Synchronizing...' : 'Finalize Update'}
               </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
               {/* Sidebar Stats */}
               <div className="lg:col-span-3 space-y-8">
                  <div className="bg-[var(--surface-container-lowest)] rounded-xl p-10 border border-[var(--outline-variant)] shadow-sm text-center group relative overflow-hidden">
                     <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--surface)] rounded-bl-[4rem] translate-x-10 -translate-y-10 group-hover:translate-x-5 group-hover:-translate-y-5 transition-transform"></div>
                     <div className="relative mx-auto mb-8 w-32 h-32">
                        <div className="w-full h-full bg-[var(--surface)] rounded-[2.5rem] flex items-center justify-center text-[var(--on-surface-variant)] group-hover:bg-white group-hover:shadow-xl transition-all border border-[var(--outline-variant)] relative z-10 overflow-hidden">
                           {formData.customer_image ? (
                              <img
                                 src={typeof formData.customer_image === 'string' ? imgBaseUrl + formData.customer_image : URL.createObjectURL(formData.customer_image)}
                                 alt="Profile"
                                 className="w-full h-full object-cover"
                              />
                           ) : (
                              <User size={40} strokeWidth={1.5} />
                           )}
                        </div>
                        <label className="absolute -bottom-2 -right-2 w-10 h-10 bg-[var(--on-surface)] text-white rounded-xl flex items-center justify-center cursor-pointer hover:scale-110 transition-all z-20 shadow-lg">
                           <FileText size={16} />
                           <input
                              type="file"
                              className="hidden"
                              onChange={(e) => setFormData({ ...formData, customer_image: e.target.files[0] })}
                              accept="image/*"
                           />
                        </label>
                     </div>
                     <h4 className="text-xs font-extrabold text-[var(--on-surface)] uppercase   relative z-10">Biometric Identity</h4>
                     <p className="text-[10px] font-medium text-[var(--on-surface-variant)] mt-4 leading-relaxed opacity-60 relative z-10">Updating machine-readable documents.</p>
                  </div>
               </div>

               {/* Form Main */}
               <div className="lg:col-span-9 space-y-10">
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
                                 className="w-full bg-transparent text-sm font-manrope font-extrabold text-[var(--on-surface)] outline-none uppercase   placeholder-[var(--on-surface-variant)]/30"
                                 value={formData.passport_no}
                                 onChange={(e) => setFormData({ ...formData, passport_no: e.target.value })}
                              />
                              <ShieldCheck size={18} className="text-[var(--on-surface-variant)]" />
                           </div>
                        </div>
                        <div className="group">
                           <label className="text-[10px] font-extrabold text-[var(--on-surface-variant)] uppercase tracking-widest mb-4 block ml-1">Citizen Registry (CNIC)</label>
                           <div className="relative border-b border-[var(--outline-variant)] group-focus-within:border-[var(--on-surface)] transition-all pb-4 flex items-center justify-between">
                              <input
                                 type="text"
                                 className="w-full bg-transparent text-sm font-manrope font-extrabold text-[var(--on-surface)] outline-none placeholder-[var(--on-surface-variant)]/30"
                                 value={formData.cnic}
                                 onChange={(e) => setFormData({ ...formData, cnic: e.target.value })}
                              />
                              <Fingerprint size={18} className="text-[var(--on-surface-variant)]" />
                           </div>
                        </div>
                     </div>
                  </div>

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
                                 className="w-full bg-transparent text-sm font-manrope font-extrabold text-[var(--on-surface)] outline-none placeholder-[var(--on-surface-variant)]/30"
                                 value={formData.phone}
                                 onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                              />
                              <Phone size={18} className="text-[var(--on-surface-variant)]" />
                           </div>
                        </div>
                        <div className="group">
                           <label className="text-[10px] font-extrabold text-[var(--on-surface-variant)] uppercase tracking-widest mb-4 block ml-1">Email Archive</label>
                           <div className="relative border-b border-[var(--outline-variant)] group-focus-within:border(--on-surface)] transition-all pb-4 flex items-center justify-between">
                              <input
                                 type="email"
                                 className="w-full bg-transparent text-sm font-manrope font-extrabold text-[var(--on-surface)] outline-none placeholder-[var(--on-surface-variant)]/30"
                                 value={formData.email}
                                 onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              />
                              <Mail size={18} className="text-[var(--on-surface-variant)]" />
                           </div>
                        </div>
                     </div>

                     <div className="grid grid-cols-1 md:grid-cols-2 gap-16 relative z-10">
                        <div className="group">
                           <label className="text-[10px] font-extrabold text-[var(--on-surface-variant)] uppercase tracking-widest mb-4 block ml-1">Citizen City</label>
                           <div className="relative border-b border-[var(--outline-variant)] group-focus-within:border-[var(--on-surface)] transition-all pb-4 flex items-center justify-between">
                              <input
                                 type="text"
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
                                 className="w-full bg-transparent text-sm font-manrope font-extrabold text-[var(--on-surface)] outline-none placeholder-[var(--on-surface-variant)]/30"
                                 value={formData.country}
                                 onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                              />
                              <Globe size={18} className="text-[var(--on-surface-variant)]" />
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};

export default UpdateCustomer;
