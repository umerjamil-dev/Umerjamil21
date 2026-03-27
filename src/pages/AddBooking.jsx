import React, { useState } from 'react';
import {
   ArrowLeft, Package, User,
   Calendar, Plane, CreditCard,
   Save, Info, ShieldCheck,
   MapPin, Clock, DollarSign
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const AddBooking = () => {
   const navigate = useNavigate();
   const [formData, setFormData] = useState({
      customerId: '',
      packageId: '',
      travelDate: '',
      totalAmount: '',
      paidAmount: '',
      paymentMethod: 'Bank Transfer'
   });

   return (
      <div className="font-inter max-w-6xl mx-auto space-y-12 animate-in fade-in duration-1000 pb-20">
         {/* Header */}
         <div className="flex items-center justify-between">
            <Link to="/bookings" className="flex items-center gap-3 text-[var(--on-surface-variant)] hover:text-[var(--on-surface)] transition-all group">
               <div className="p-3 bg-[var(--surface-container-lowest)]   rounded-xl border border-[var(--outline-variant)] group-hover:shadow-md transition-all">
                  <ArrowLeft size={18} strokeWidth={2.5} />
               </div>
               <span className="text-[10px] font-extrabold uppercase tracking-[0.25em]">Abort Protocol</span>
            </Link>
            <div className="text-center absolute left-1/2 -translate-x-1/2">
               <h1 className="text-2xl font-manrope font-extrabold text-[var(--on-surface)] tracking-tight uppercase">Pilgrimage <span className="text-[var(--on-surface-variant)]/40 italic font-light">Contract</span></h1>
               <p className="text-[10px] text-[var(--on-surface-variant)] font-extrabold uppercase tracking-[0.3em] mt-1">Registry Core <span className="text-[var(--on-surface)]">BK-{Math.floor(Math.random() * 9000 + 1000)}</span></p>
            </div>
            <button
               onClick={() => navigate('/bookings')}
               className="btn-midnight px-10 py-4 rounded-2xl text-white font-extrabold text-[10px] uppercase tracking-[0.3em] shadow-2xl shadow-black/20 hover:-translate-y-1 transition-all flex items-center gap-3"
            >
               <Save size={18} strokeWidth={2.5} />
               Finalize Manifest
            </button>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Sidebar Summary Card */}
            <div className="lg:col-span-4 space-y-10">
               <div className="bg-[var(--grad-black)] rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-[5rem] group-hover:scale-110 transition-transform"></div>
                  <p className="text-[10px] font-extrabold text-white/40 uppercase tracking-[0.3em] mb-12 relative z-10">Live Analytics</p>

                  <div className="space-y-10 relative z-10">
                     <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-white/50">Contract Value</span>
                        <span className="text-2xl font-manrope font-extrabold tracking-tight">${formData.totalAmount || '0.00'}</span>
                     </div>
                     <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-white/50">Residual Balance</span>
                        <span className="text-2xl font-manrope font-extrabold text-[var(--desert-gold)] tracking-tight">${(formData.totalAmount - formData.paidAmount) || '0.00'}</span>
                     </div>
                     <div className="h-px bg-white/5 my-6"></div>
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center border border-white/10">
                           <Package size={20} className="text-[var(--desert-gold)]" />
                        </div>
                        <div>
                           <p className="text-[10px] font-extrabold uppercase tracking-widest text-white/40 mb-1">Active Package</p>
                           <p className="text-xs font-bold text-white tracking-wide">Premium 5-Star Hajj</p>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="bg-[var(--surface-container-lowest)] rounded-[2.5rem] p-10 border border-[var(--outline-variant)] shadow-sm group">
                  <div className="w-12 h-12 rounded-2xl bg-[var(--sacred-emerald)]/10 flex items-center justify-center mb-8 border border-[var(--sacred-emerald)]/20">
                     <ShieldCheck className="text-[var(--sacred-emerald)]" size={24} />
                  </div>
                  <h4 className="text-xs font-extrabold text-[var(--on-surface)] mb-4 uppercase  ">Policy Protocol</h4>
                  <p className="text-[11px] font-medium text-[var(--on-surface-variant)] leading-relaxed mb-8 opacity-70">
                     Bookings are finalized upon deposit verification. VIP manifest rules apply.
                  </p>
                  <button className="text-[10px] font-extrabold uppercase tracking-widest text-[var(--on-surface)] border-b border-[var(--on-surface)]/20 hover:border-[var(--on-surface)] transition-all pb-1">Review Mandate</button>
               </div>
            </div>

            {/* Form Main Area */}
            <div className="lg:col-span-8 space-y-10">
               {/* Customer Selection */}
               <div className="bg-[var(--surface-container-lowest)] rounded-[3rem] p-12 shadow-sm border border-[var(--outline-variant)] group relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--surface)] rounded-bl-[5rem] translate-x-12 -translate-y-12"></div>
                  <h3 className="text-[10px] font-extrabold text-[var(--on-surface-variant)] uppercase tracking-[0.3em] mb-12 flex items-center gap-3 relative z-10">
                     <User size={16} strokeWidth={2.5} /> Link Pilgrim & Package
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
                     <div className="group">
                        <label className="text-[10px] font-extrabold text-[var(--on-surface-variant)] uppercase tracking-widest mb-4 block ml-1">Pilgrim Selection</label>
                        <div className="relative border-b border-[var(--outline-variant)] group-focus-within:border-[var(--on-surface)] transition-all pb-4">
                           <select
                              className="w-full bg-transparent text-sm font-manrope font-extrabold text-[var(--on-surface)] outline-none appearance-none cursor-pointer"
                              value={formData.customerId}
                              onChange={(e) => setFormData({ ...formData, customerId: e.target.value })}
                           >
                              <option value="">Query Registry...</option>
                              <option value="1">Ahmed Raza (LD-1024)</option>
                              <option value="2">Fatima Zahra (LD-1025)</option>
                           </select>
                        </div>
                     </div>
                     <div className="group">
                        <label className="text-[10px] font-extrabold text-[var(--on-surface-variant)] uppercase tracking-widest mb-4 block ml-1">Service Package</label>
                        <div className="relative border-b border-[var(--outline-variant)] group-focus-within:border-[var(--on-surface)] transition-all pb-4">
                           <select
                              className="w-full bg-transparent text-sm font-manrope font-extrabold text-[var(--on-surface)] outline-none appearance-none cursor-pointer"
                              value={formData.packageId}
                              onChange={(e) => setFormData({ ...formData, packageId: e.target.value })}
                           >
                              <option value="">Catalogue Entry...</option>
                              <option value="1">Executive Hajj 2024</option>
                              <option value="2">Premium Umrah (Economy Plus)</option>
                           </select>
                        </div>
                     </div>
                  </div>
               </div>

               {/* Logistics & Financials */}
               <div className="bg-[var(--surface-container-lowest)] rounded-[3rem] p-12 shadow-sm border border-[var(--outline-variant)] group relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--surface)] rounded-bl-[5rem] translate-x-12 -translate-y-12"></div>
                  <h3 className="text-[10px] font-extrabold text-[var(--on-surface-variant)] uppercase tracking-[0.3em] mb-12 flex items-center gap-3 relative z-10">
                     <CreditCard size={16} strokeWidth={2.5} /> Financial Arrangement
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-16 relative z-10">
                     <div className="group">
                        <label className="text-[10px] font-extrabold text-[var(--on-surface-variant)] uppercase tracking-widest mb-4 block ml-1">Operational Start Date</label>
                        <div className="relative border-b border-[var(--outline-variant)] group-focus-within:border-[var(--on-surface)] transition-all pb-4 flex items-center justify-between">
                           <input
                              type="date"
                              className="w-full bg-transparent text-sm font-manrope font-extrabold text-[var(--on-surface)] outline-none"
                              value={formData.travelDate}
                              onChange={(e) => setFormData({ ...formData, travelDate: e.target.value })}
                           />
                           <Calendar size={18} className="text-[var(--on-surface-variant)]" />
                        </div>
                     </div>
                     <div className="group">
                        <label className="text-[10px] font-extrabold text-[var(--on-surface-variant)] uppercase tracking-widest mb-4 block ml-1">Settlement Protocol</label>
                        <div className="relative border-b border-[var(--outline-variant)] group-focus-within:border-[var(--on-surface)] transition-all pb-4">
                           <select
                              className="w-full bg-transparent text-sm font-manrope font-extrabold text-[var(--on-surface)] outline-none appearance-none cursor-pointer"
                              value={formData.paymentMethod}
                           >
                              <option>Bank Transfer</option>
                              <option>Cash Deposit</option>
                              <option>Online Gateway</option>
                           </select>
                        </div>
                     </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-16 relative z-10">
                     <div className="group">
                        <label className="text-[10px] font-extrabold text-[var(--on-surface-variant)] uppercase tracking-widest mb-4 block ml-1">Total Contract Value</label>
                        <div className="relative border-b border-[var(--outline-variant)] group-focus-within:border-[var(--on-surface)] transition-all pb-4 flex items-center justify-between">
                           <input
                              type="number"
                              placeholder="0.00"
                              className="w-full bg-transparent text-sm font-manrope font-extrabold text-[var(--on-surface)] outline-none placeholder-[var(--on-surface-variant)]/30"
                              value={formData.totalAmount}
                              onChange={(e) => setFormData({ ...formData, totalAmount: e.target.value })}
                           />
                           <DollarSign size={18} className="text-[var(--on-surface-variant)]" />
                        </div>
                     </div>
                     <div className="group">
                        <label className="text-[10px] font-extrabold text-[var(--on-surface-variant)] uppercase tracking-widest mb-4 block ml-1">Initial Down Payment</label>
                        <div className="relative border-b border-[var(--outline-variant)] group-focus-within:border-[var(--sacred-emerald)] transition-all pb-4 flex items-center justify-between">
                           <input
                              type="number"
                              placeholder="0.00"
                              className="w-full bg-transparent text-sm font-manrope font-extrabold text-[var(--sacred-emerald)] outline-none placeholder-[var(--on-surface-variant)]/30"
                              value={formData.paidAmount}
                              onChange={(e) => setFormData({ ...formData, paidAmount: e.target.value })}
                           />
                           <CreditCard size={18} className="text-[var(--sacred-emerald)]" />
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
