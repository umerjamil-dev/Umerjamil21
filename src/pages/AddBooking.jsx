import React, { useState, useEffect } from 'react';
import {
   ArrowLeft, Package, User,
   Calendar, Plane, CreditCard,
   Save, Info, ShieldCheck,
   MapPin, Clock, DollarSign
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import useBookingStore from '../store/useBookingStore';
import useCustomerStore from '../store/useCustomerStore';
import usePackageStore from '../store/usePackageStore';
import toast from 'react-hot-toast';

const AddBooking = () => {
   const navigate = useNavigate();
   const { createBooking, isLoading: isBookingLoading } = useBookingStore();
   const { customers, fetchCustomers } = useCustomerStore();
   const { packages, fetchPackages } = usePackageStore();

   const [formData, setFormData] = useState({
      customerId: '',
      packageId: '',
      travelDate: '',
      totalAmount: '',
      paidAmount: '',
      paymentMethod: 'Bank Transfer'
   });

   useEffect(() => {
      fetchCustomers();
      fetchPackages();
   }, [fetchCustomers, fetchPackages]);

   const handleSubmit = async () => {
      if (!formData.customerId || !formData.packageId || !formData.totalAmount) {
         toast.error('Identity, protocol, and valuation are mandatory.');
         return;
      }

      try {
         await createBooking(formData);
         toast.success('Registry entry finalized.');
         navigate('/bookings');
      } catch (err) {
         toast.error('Registry failure: ' + err.message);
      }
   };


   return (
      <div className="font-inter max-w-7xl mx-auto space-y-12 animate-in slide-in-from-bottom-8 duration-1000 pb-20">
         {/* Premium Header */}
         <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 border-b border-slate-200 pb-8">
            <Link to="/bookings" className="flex items-center gap-3 text-slate-400 hover:text-slate-900 transition-all group">
               <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 group-hover:shadow-md transition-all">
                  <ArrowLeft size={18} strokeWidth={2.5} />
               </div>
               <span className="text-[10px] font-black uppercase tracking-[0.25em]">Audit Registry</span>
            </Link>
            <div className="text-center">
               <h1 className="text-3xl font-manrope font-extrabold text-slate-900 tracking-tighter uppercase">Pilgrimage <span className="text-slate-300 italic font-light"></span></h1>
               <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.4em] mt-2">Registry Core <span className="text-black">BK-9128</span></p>
            </div>
            <button
               onClick={handleSubmit}
               disabled={isBookingLoading}
               className={`px-10 py-5 bg-black text-white rounded-xl font-black text-[10px] uppercase tracking-[0.3em] shadow-xl hover:bg-[var(--desert-gold)] hover:text-black transition-all flex items-center gap-3 ${isBookingLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
               <Save size={18} strokeWidth={2.5} />
               {isBookingLoading ? 'Processing...' : 'Finalize'}
            </button>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Sidebar Summary Card */}
            <div className="lg:col-span-4 space-y-10">
               <div className="bg-gradient-to-br from-[#020617] via-[#0f172a] to-black rounded-xl p-10 text-white shadow-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-[5rem] group-hover:scale-110 transition-transform"></div>
                  <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em] mb-12 relative z-10"> Synthesis</p>

                  <div className="space-y-10 relative z-10">
                     <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-white/40 uppercase tracking-widest">Total Valuation</span>
                        <span className="text-2xl font-manrope font-black tracking-tight text-white">${formData.totalAmount || '0,000'}</span>
                     </div>
                     <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-white/40 uppercase tracking-widest">Residual Debt</span>
                        <span className="text-2xl font-manrope font-black text-[var(--desert-gold)] tracking-tight">${(formData.totalAmount - formData.paidAmount) || '0,000'}</span>
                     </div>
                     <div className="h-px bg-white/10 my-6"></div>
                     <div className="flex items-center gap-6">
                        <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center border border-white/10 text-[var(--desert-gold)]">
                           <Package size={24} strokeWidth={2} />
                        </div>
                        <div>
                           <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 mb-1">Assigned Protocol</p>
                           <p className="text-sm font-black text-white tracking-tight">Executive 5-Star Hajj</p>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="bg-white rounded-xl p-10 border border-slate-200 shadow-sm group relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-slate-50 rounded-bl-[4rem] translate-x-12 -translate-y-12 transition-transform duration-700"></div>
                  <div className="w-14 h-14 rounded-xl bg-slate-50 flex items-center justify-center mb-8 border border-slate-100 group-hover:bg-black group-hover:text-white transition-all shadow-sm">
                     <ShieldCheck size={28} strokeWidth={2} />
                  </div>
                  <h4 className="text-[10px] font-black text-slate-900 mb-4 uppercase tracking-[0.3em]">Mandate Protocol</h4>
                  <p className="text-xs font-medium text-slate-500 leading-relaxed mb-8">
                     s are operationalized upon initial deposit verification. VIP  rules apply to all segments.
                  </p>
                  <button className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-900 border-b-2 border-slate-100 hover:border-black transition-all pb-1">Review Mandate terms</button>
               </div>
            </div>

            {/* Form Main Area */}
            <div className="lg:col-span-8 space-y-10">
               {/* Customer Selection */}
               <div className="bg-white rounded-xl p-12 shadow-sm border border-slate-200 group relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-[5rem] translate-x-12 -translate-y-12"></div>
                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-12 flex items-center gap-3 relative z-10">
                     <User size={18} strokeWidth={3} className="text-[var(--desert-gold)]" /> Link Pilgrim & Segment
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-16 relative z-10">
                     <div className="group">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 block ml-1">Pilgrim Identity</label>
                        <div className="relative border-b-2 border-slate-100 group-focus-within:border-black transition-all pb-4">
                           <select
                              className="w-full bg-transparent text-lg font-manrope font-black text-slate-900 outline-none appearance-none cursor-pointer"
                              value={formData.customerId}
                              onChange={(e) => setFormData({ ...formData, customerId: e.target.value })}
                           >
                              <option value="" className="bg-white">Query Registry...</option>
                              {customers.map(c => (
                                 <option key={c.id} value={c.id} className="bg-white">{c.name} ({c.id})</option>
                              ))}
                              {/* Fallback for empty API */}
                              {customers.length === 0 && (
                                 <>
                                    <option value="1" className="bg-white">Ahmed Raza (LD-1024)</option>
                                    <option value="2" className="bg-white">Fatima Zahra (LD-1025)</option>
                                 </>
                              )}
                           </select>
                        </div>
                     </div>
                     <div className="group">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 block ml-1">Service Blueprint</label>
                        <div className="relative border-b-2 border-slate-100 group-focus-within:border-black transition-all pb-4">
                           <select
                              className="w-full bg-transparent text-lg font-manrope font-black text-slate-900 outline-none appearance-none cursor-pointer"
                              value={formData.packageId}
                              onChange={(e) => setFormData({ ...formData, packageId: e.target.value })}
                           >
                              <option value="" className="bg-white">Catalogue Entry...</option>
                              {packages.map(p => (
                                 <option key={p.id} value={p.id} className="bg-white">{p.name}</option>
                              ))}
                              {/* Fallback for empty API */}
                              {packages.length === 0 && (
                                 <>
                                    <option value="1" className="bg-white">Executive Hajj 2024</option>
                                    <option value="2" className="bg-white">Premium Umrah (Economy Plus)</option>
                                 </>
                              )}
                           </select>
                        </div>
                     </div>
                  </div>
               </div>

               {/* Logistics & Financials */}
               <div className="bg-white rounded-xl p-12 shadow-sm border border-slate-200 group relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-[5rem] translate-x-12 -translate-y-12"></div>
                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-12 flex items-center gap-3 relative z-10">
                     <CreditCard size={18} strokeWidth={3} className="text-[var(--desert-gold)]" /> Financial Settlemet
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-20 relative z-10">
                     <div className="group">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 block ml-1">Deployment Date</label>
                        <div className="relative border-b-2 border-slate-100 group-focus-within:border-black transition-all pb-4 flex items-center justify-between">
                           <input
                              type="date"
                              className="w-full bg-transparent text-lg font-manrope font-black text-slate-900 outline-none"
                              value={formData.travelDate}
                              onChange={(e) => setFormData({ ...formData, travelDate: e.target.value })}
                           />
                           <Calendar size={18} className="text-slate-300" strokeWidth={3} />
                        </div>
                     </div>
                     <div className="group">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 block ml-1">Liquidity Protocol</label>
                        <div className="relative border-b-2 border-slate-100 group-focus-within:border-black transition-all pb-4">
                           <select
                              className="w-full bg-transparent text-lg font-manrope font-black text-slate-900 outline-none appearance-none cursor-pointer"
                              value={formData.paymentMethod}
                           >
                              <option className="bg-white">Bank Transit</option>
                              <option className="bg-white">Cash Ledger</option>
                              <option className="bg-white">Electronic Gateway</option>
                           </select>
                        </div>
                     </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-20 relative z-10">
                     <div className="group">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 block ml-1">Total  Value</label>
                        <div className="relative border-b-2 border-slate-100 group-focus-within:border-black transition-all pb-6 flex items-center justify-between">
                           <input
                              type="number"
                              placeholder="0,000"
                              className="w-full bg-transparent text-3xl font-manrope font-black text-slate-900 outline-none placeholder-slate-100 tracking-tighter"
                              value={formData.totalAmount}
                              onChange={(e) => setFormData({ ...formData, totalAmount: e.target.value })}
                           />
                           <DollarSign size={24} className="text-slate-300" strokeWidth={3} />
                        </div>
                     </div>
                     <div className="group">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 block ml-1">Initial Reserve deposit</label>
                        <div className="relative border-b-2 border-slate-100 group-focus-within:border-[var(--sacred-emerald)] transition-all pb-6 flex items-center justify-between">
                           <input
                              type="number"
                              placeholder="0,000"
                              className="w-full bg-transparent text-3xl font-manrope font-black text-[var(--sacred-emerald)] outline-none placeholder-slate-100 tracking-tighter"
                              value={formData.paidAmount}
                              onChange={(e) => setFormData({ ...formData, paidAmount: e.target.value })}
                           />
                           <CreditCard size={24} className="text-[var(--sacred-emerald)]" strokeWidth={3} />
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default AddBooking;
