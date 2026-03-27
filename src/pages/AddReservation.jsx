import React, { useState } from 'react';
import {
   ArrowLeft, Plane, Hotel,
   MapPin, ShieldCheck, Clock,
   Save, Info, LayoutDashboard,
   Calendar, CheckCircle2
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const AddReservation = () => {
   const navigate = useNavigate();
   const [formData, setFormData] = useState({
      type: 'Hotel', // Hotel, Visa, Flight, Transport
      bookingId: '',
      provider: '',
      checkIn: '',
      checkOut: '',
      referenceNumber: '',
      status: 'Confirmed'
   });

   const types = [
      { id: 'Hotel', icon: Hotel, color: 'text-[var(--desert-gold)]' },
      { id: 'Visa', icon: ShieldCheck, color: 'text-[var(--sacred-emerald)]' },
      { id: 'Flight', icon: Plane, color: 'text-[var(--on-surface)]' },
      { id: 'Transport', icon: MapPin, color: 'text-[var(--on-surface-variant)]' }
   ];

   return (
      <div className="font-inter max-w-6xl mx-auto space-y-12 animate-in slide-in-from-bottom-8 duration-1000 pb-20">
         {/* Header */}
         <div className="flex items-center justify-between">
            <Link to="/reservations" className="flex items-center gap-3 text-[var(--on-surface-variant)] hover:text-[var(--on-surface)] transition-all group">
               <div className="p-3 bg-[var(--surface-container-lowest)]   rounded-xl border border-[var(--outline-variant)] group-hover:shadow-md transition-all">
                  <ArrowLeft size={18} strokeWidth={2.5} />
               </div>
               <span className="text-[10px] font-extrabold uppercase tracking-[0.25em]">Logistics Hub</span>
            </Link>
            <h1 className="text-2xl font-manrope font-extrabold text-[var(--on-surface)] absolute left-1/2 -translate-x-1/2 tracking-tighter uppercase">Logistics <span className="text-[var(--on-surface-variant)]/40 italic font-light">Manifest</span></h1>
            <button
               onClick={() => navigate('/reservations')}
               className="btn-midnight px-10 py-4 rounded-2xl text-white font-extrabold text-[10px] uppercase tracking-[0.3em] shadow-2xl shadow-black/20 hover:-translate-y-1 transition-all flex items-center gap-3"
            >
               <Save size={18} strokeWidth={2.5} />
               Commit Changes
            </button>
         </div>

         {/* Select Type Grid */}
         <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {types.map((t) => (
               <button
                  key={t.id}
                  onClick={() => setFormData({ ...formData, type: t.id })}
                  className={`p-10 rounded-[3rem] border transition-all text-left group relative overflow-hidden ${formData.type === t.id
                     ? 'bg-[var(--surface-container-lowest)] border-[var(--on-surface)] shadow-2xl shadow-black/5'
                     : 'bg-[var(--surface-container-low)] border-transparent hover:border-[var(--on-surface-variant)]/20'
                     }`}
               >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--surface)] rounded-bl-[4rem] translate-x-12 -translate-y-12"></div>
                  <t.icon size={28} className={`${t.color} mb-6 group-hover:scale-110 transition-transform relative z-10`} strokeWidth={2.5} />
                  <p className="text-[10px] font-extrabold text-[var(--on-surface-variant)] uppercase tracking-widest mb-1 relative z-10">{t.id} Segment</p>
                  <h4 className="text-sm font-manrope font-extrabold text-[var(--on-surface)] relative z-10">Manage {t.id}</h4>
                  {formData.type === t.id && (
                     <div className={`absolute top-6 right-6 ${t.color}`}>
                        <CheckCircle2 size={24} />
                     </div>
                  )}
               </button>
            ))}
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Instruction Card */}
            <div className="lg:col-span-4">
               <div className="bg-[var(--grad-black)] rounded-[3rem] p-10 text-white shadow-2xl space-y-10 h-full relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-[5rem] translate-x-12 -translate-y-12"></div>
                  <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center border border-white/10 relative z-10">
                     <Info size={28} className="text-[var(--sacred-emerald)]" strokeWidth={2.5} />
                  </div>
                  <h3 className="text-2xl font-manrope font-extrabold leading-tight tracking-tight relative z-10">Operational <br />Accuracy Protocol</h3>
                  <p className="text-xs text-white/50 leading-relaxed font-medium relative z-10">
                     Reference verification mandatory for Amadeus, Maqam, and Global GDS synchronization.
                  </p>

                  <div className="pt-10 space-y-6 relative z-10">
                     <div className="flex items-center gap-4 text-white/30">
                        <Clock size={16} strokeWidth={2.5} />
                        <span className="text-[9px] font-extrabold uppercase  ">Real-time Sync Active</span>
                     </div>
                     <div className="flex items-center gap-4 text-white/30">
                        <LayoutDashboard size={16} strokeWidth={2.5} />
                        <span className="text-[9px] font-extrabold uppercase  ">GDS Uplink Verified</span>
                     </div>
                  </div>
               </div>
            </div>

            {/* Form Main Area */}
            <div className="lg:col-span-8 bg-[var(--surface-container-lowest)] rounded-[3rem] p-12 shadow-sm border border-[var(--outline-variant)] space-y-12 relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--surface)] rounded-bl-[5rem] translate-x-12 -translate-y-12"></div>
               <h3 className="text-[10px] font-extrabold text-[var(--on-surface-variant)] uppercase tracking-[0.3em] flex items-center gap-3 relative z-10">
                  <ShieldCheck size={18} strokeWidth={2.5} /> Data Entry Manifest
               </h3>

               <div className="space-y-12 relative z-10">
                  {/* Global Booking Link */}
                  <div className="group">
                     <label className="text-[10px] font-extrabold text-[var(--on-surface-variant)] uppercase tracking-widest mb-4 block ml-1">Parent Booking Reference</label>
                     <div className="relative border-b border-[var(--outline-variant)] group-focus-within:border-[var(--on-surface)] transition-all pb-4">
                        <select
                           className="w-full bg-transparent text-sm font-manrope font-extrabold text-[var(--on-surface)] outline-none appearance-none cursor-pointer"
                           value={formData.bookingId}
                           onChange={(e) => setFormData({ ...formData, bookingId: e.target.value })}
                        >
                           <option value="">Query Registry...</option>
                           <option value="1">BK-9123 (Ahmed Raza)</option>
                           <option value="2">BK-4421 (Fatima Zahra)</option>
                        </select>
                     </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                     <div className="group">
                        <label className="text-[10px] font-extrabold text-[var(--on-surface-variant)] uppercase tracking-widest mb-4 block ml-1">Service Provider / Entity</label>
                        <div className="relative border-b border-[var(--outline-variant)] group-focus-within:border-[var(--on-surface)] transition-all pb-4">
                           <input
                              type="text"
                              placeholder={formData.type === 'Hotel' ? 'Saudi Hilton...' : 'Saudi Airlines...'}
                              className="w-full bg-transparent text-sm font-manrope font-extrabold text-[var(--on-surface)] outline-none placeholder-[var(--on-surface-variant)]/30"
                              value={formData.provider}
                              onChange={(e) => setFormData({ ...formData, provider: e.target.value })}
                           />
                        </div>
                     </div>
                     <div className="group">
                        <label className="text-[10px] font-extrabold text-[var(--on-surface-variant)] uppercase tracking-widest mb-4 block ml-1">Manifest Status</label>
                        <div className="relative border-b border-[var(--outline-variant)] group-focus-within:border-[var(--on-surface)] transition-all pb-4">
                           <select className="w-full bg-transparent text-sm font-manrope font-extrabold text-[var(--on-surface)] outline-none appearance-none cursor-pointer">
                              <option>Confirmed</option>
                              <option>Pending Voucher</option>
                              <option>Cancelled</option>
                           </select>
                        </div>
                     </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                     <div className="group">
                        <label className="text-[10px] font-extrabold text-[var(--on-surface-variant)] uppercase tracking-widest mb-4 block ml-1">Arrival / Check-In</label>
                        <div className="relative border-b border-[var(--outline-variant)] group-focus-within:border-[var(--on-surface)] transition-all pb-4 flex items-center justify-between">
                           <input
                              type="date"
                              className="w-full bg-transparent text-sm font-manrope font-extrabold text-[var(--on-surface)] outline-none"
                           />
                           <Calendar size={18} className="text-[var(--on-surface-variant)]" />
                        </div>
                     </div>
                     <div className="group">
                        <label className="text-[10px] font-extrabold text-[var(--on-surface-variant)] uppercase tracking-widest mb-4 block ml-1">Departure / Check-Out</label>
                        <div className="relative border-b border-[var(--outline-variant)] group-focus-within:border-[var(--on-surface)] transition-all pb-4 flex items-center justify-between">
                           <input
                              type="date"
                              className="w-full bg-transparent text-sm font-manrope font-extrabold text-[var(--on-surface)] outline-none"
                           />
                           <Calendar size={18} className="text-[var(--on-surface-variant)]" />
                        </div>
                     </div>
                  </div>

                  <div className="group">
                     <label className="text-[10px] font-extrabold text-[var(--on-surface-variant)] uppercase tracking-widest mb-4 block ml-1">Operational Ref # (GDS / Voucher)</label>
                     <div className="relative border-b border-[var(--outline-variant)] group-focus-within:border-[var(--on-surface)] transition-all pb-4">
                        <input
                           type="text"
                           placeholder="ENTER VALID REFERENCE"
                           className="w-full bg-transparent text-sm font-manrope font-extrabold text-[var(--on-surface)] outline-none placeholder-[var(--on-surface-variant)]/30 tracking-[0.3em] uppercase"
                           value={formData.referenceNumber}
                           onChange={(e) => setFormData({ ...formData, referenceNumber: e.target.value })}
                        />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default AddReservation;
