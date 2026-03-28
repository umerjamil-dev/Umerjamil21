import React, { useState } from 'react';
import {
   ArrowLeft, Plane, Hotel,
   MapPin, ShieldCheck, Clock,
   Save, Info, LayoutDashboard,
   Calendar, CheckCircle2,
   ArrowRight
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
      <div className="font-inter max-w-7xl mx-auto space-y-12 animate-in slide-in-from-bottom-8 duration-1000 pb-20">
         {/* Header */}
         <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 border-b border-slate-200 pb-8">
            <Link to="/reservations" className="flex items-center gap-3 text-slate-400 hover:text-slate-900 transition-all group">
               <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 group-hover:shadow-md transition-all">
                  <ArrowLeft size={18} strokeWidth={2.5} />
               </div>
               <span className="text-[10px] font-black uppercase tracking-[0.25em]">Logistics Hub</span>
            </Link>
            <h1 className="text-3xl font-manrope font-extrabold text-slate-900 tracking-tighter uppercase">Add Reservation </h1>
            <div className="flex items-center gap-4">
               <button
                  onClick={() => navigate('/reservations')}
                  className="px-10 py-5 bg-black text-white rounded-xl font-black text-[10px] uppercase tracking-[0.3em] shadow-xl hover:bg-[var(--desert-gold)] hover:text-black transition-all flex items-center gap-3"
               >
                  <Save size={18} strokeWidth={2.5} />
                  Commit Changes
               </button>
            </div>
         </div>

         {/* Select Type Grid */}
         <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {types.map((t) => (
               <button
                  key={t.id}
                  onClick={() => setFormData({ ...formData, type: t.id })}
                  className={`p-10 rounded-xl border-2 transition-all text-left group relative overflow-hidden ${formData.type === t.id
                     ? 'bg-white border-black shadow-lg shadow-slate-200'
                     : 'bg-slate-50 border-transparent hover:border-slate-200 hover:bg-white'
                     }`}
               >
                  <div className={`p-4 rounded-xl inline-flex items-center justify-center mb-6 transition-all ${formData.type === t.id ? 'bg-black text-white' : 'bg-white text-slate-400 group-hover:bg-slate-100'
                     }`}>
                     <t.icon size={24} strokeWidth={2.5} />
                  </div>
                  <p className={`text-[10px] font-black uppercase tracking-widest mb-1 transition-all ${formData.type === t.id ? 'text-black' : 'text-slate-400'
                     }`}>{t.id} Segment</p>
                  <h4 className={`text-sm font-manrope font-black transition-all ${formData.type === t.id ? 'text-black' : 'text-slate-900'
                     }`}>Manage {t.id}</h4>
                  {formData.type === t.id && (
                     <div className="absolute top-6 right-6 text-[var(--sacred-emerald)]">
                        <CheckCircle2 size={24} fill="currentColor" className="text-white" />
                     </div>
                  )}
               </button>
            ))}
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Instruction Card */}
            <div className="lg:col-span-4">
               <div className="bg-gradient-to-br from-[#020617] via-[#0f172a] to-black rounded-xl p-10 text-white shadow-2xl space-y-10 h-full relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-[5rem] translate-x-12 -translate-y-12"></div>
                  <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center border border-white/10 relative z-10">
                     <Info size={28} className="text-[var(--desert-gold)]" strokeWidth={2.5} />
                  </div>
                  <h3 className="text-2xl font-manrope font-black leading-tight tracking-tight relative z-10">Operational <br />Accuracy Protocol</h3>
                  <p className="text-xs text-white/40 leading-relaxed font-medium relative z-10 uppercase tracking-widest">
                     Reference verification mandatory for Amadeus, Maqam, and Global GDS synchronization hooks.
                  </p>

                  <div className="pt-10 space-y-6 relative z-10">
                     <div className="flex items-center gap-4 text-white/30 group-hover:text-white/60 transition-all">
                        <Clock size={16} strokeWidth={2.5} />
                        <span className="text-[9px] font-black uppercase tracking-[0.2em]">Real-time Sync Active</span>
                     </div>
                     <div className="flex items-center gap-4 text-white/30 group-hover:text-white/60 transition-all">
                        <ShieldCheck size={16} strokeWidth={2.5} />
                        <span className="text-[9px] font-black uppercase tracking-[0.2em]">GDS Uplink Verified</span>
                     </div>
                  </div>
               </div>
            </div>

            {/* Form Main Area */}
            <div className="lg:col-span-8 bg-white rounded-xl p-12 shadow-sm border border-slate-200 space-y-12 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-[5rem] translate-x-12 -translate-y-12"></div>
               <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] flex items-center gap-3 relative z-10">
                  <LayoutDashboard size={18} strokeWidth={2.5} className="text-[var(--desert-gold)]" /> Data Entry
               </h3>

               <div className="space-y-12 relative z-10">
                  {/* Global Booking Link */}
                  <div className="group">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 block ml-1">Parent Booking Reference</label>
                     <div className="relative border-b-2 border-slate-100 group-focus-within:border-[var(--desert-gold)] transition-all pb-6">
                        <select
                           className="w-full bg-transparent text-lg font-manrope font-black text-slate-900 outline-none appearance-none cursor-pointer"
                           value={formData.bookingId}
                           onChange={(e) => setFormData({ ...formData, bookingId: e.target.value })}
                        >
                           <option value="" className="bg-white">Query Registry...</option>
                           <option value="1" className="bg-white">BK-9123 (Ahmed Raza)</option>
                           <option value="2" className="bg-white">BK-4421 (Fatima Zahra)</option>
                        </select>
                     </div>
                  </div>

                  {/* Conditional Fields based on Type */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-16 animate-in slide-in-from-right duration-700">
                     {formData.type === 'Visa' && (
                        <>
                           <div className="group">
                              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 block">Visa Number</label>
                              <div className="relative border-b-2 border-slate-100 group-focus-within:border-[var(--desert-gold)] transition-all pb-4">
                                 <input type="text" placeholder="E-VISA #82934..." className="w-full bg-transparent text-md font-manrope font-black text-slate-900 outline-none placeholder-slate-200 uppercase tracking-widest" />
                              </div>
                           </div>
                           <div className="group">
                              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 block">Visa Status</label>
                              <div className="relative border-b-2 border-slate-100 group-focus-within:border-[var(--desert-gold)] transition-all pb-4">
                                 <select className="w-full bg-transparent text-md font-manrope font-black text-slate-900 outline-none cursor-pointer">
                                    <option className="bg-white">Pending</option>
                                    <option className="bg-white">Processing</option>
                                    <option className="bg-white">Approved</option>
                                    <option className="bg-white">Rejected</option>
                                 </select>
                              </div>
                           </div>
                           <div className="md:col-span-2 group">
                              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 block">Internal Notes</label>
                              <div className="relative border-b-2 border-slate-100 group-focus-within:border-[var(--desert-gold)] transition-all pb-4">
                                 <input type="text" placeholder="MOFA verification pending..." className="w-full bg-transparent text-md font-manrope font-black text-slate-900 outline-none placeholder-slate-200" />
                              </div>
                           </div>
                        </>
                     )}

                     {formData.type === 'Hotel' && (
                        <>
                           <div className="group">
                              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 block">Hotel Name</label>
                              <div className="relative border-b-2 border-slate-100 group-focus-within:border-[var(--desert-gold)] transition-all pb-4">
                                 <input type="text" placeholder="Fairmont Makkah..." className="w-full bg-transparent text-md font-manrope font-black text-slate-900 outline-none placeholder-slate-200" />
                              </div>
                           </div>
                           <div className="group">
                              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 block">City</label>
                              <div className="relative border-b-2 border-slate-100 group-focus-within:border-[var(--desert-gold)] transition-all pb-4">
                                 <select className="w-full bg-transparent text-md font-manrope font-black text-slate-900 outline-none cursor-pointer">
                                    <option className="bg-white">Makkah</option>
                                    <option className="bg-white">Madinah</option>
                                    <option className="bg-white">Jeddah</option>
                                 </select>
                              </div>
                           </div>
                           <div className="group">
                              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 block">Check-in / Check-out</label>
                              <div className="relative border-b-2 border-slate-100 group-focus-within:border-[var(--desert-gold)] transition-all pb-4 flex items-center gap-4">
                                 <input type="date" className="bg-transparent text-xs font-black text-slate-900 outline-none" />
                                 <ArrowRight size={14} className="text-slate-300" />
                                 <input type="date" className="bg-transparent text-xs font-black text-slate-900 outline-none" />
                              </div>
                           </div>
                           <div className="group">
                              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 block">Room </label>
                              <div className="relative border-b-2 border-slate-100 group-focus-within:border-[var(--desert-gold)] transition-all pb-4">
                                 <input type="text" placeholder="Double Quad, Triple... " className="w-full bg-transparent text-md font-manrope font-black text-slate-900 outline-none placeholder-slate-200" />
                              </div>
                           </div>
                        </>
                     )}

                     {formData.type === 'Flight' && (
                        <>
                           <div className="group">
                              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 block">Airline</label>
                              <div className="relative border-b-2 border-slate-100 group-focus-within:border-[var(--desert-gold)] transition-all pb-4">
                                 <input type="text" placeholder="Saudi Airlines (SV-001)..." className="w-full bg-transparent text-md font-manrope font-black text-slate-900 outline-none placeholder-slate-200" />
                              </div>
                           </div>
                           <div className="group">
                              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 block">Ticket Number</label>
                              <div className="relative border-b-2 border-slate-100 group-focus-within:border-[var(--desert-gold)] transition-all pb-4">
                                 <input type="text" placeholder="TKT-#029384756..." className="w-full bg-transparent text-md font-manrope font-black text-slate-900 outline-none placeholder-slate-200 uppercase tracking-tighter" />
                              </div>
                           </div>
                           <div className="group">
                              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 block">Departure Loc / Time</label>
                              <div className="relative border-b-2 border-slate-100 group-focus-within:border-[var(--desert-gold)] transition-all pb-4">
                                 <input type="text" placeholder="JFK @ 14:00..." className="w-full bg-transparent text-md font-manrope font-black text-slate-900 outline-none placeholder-slate-200" />
                              </div>
                           </div>
                           <div className="group">
                              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 block">Arrival Loc / Time</label>
                              <div className="relative border-b-2 border-slate-100 group-focus-within:border-[var(--desert-gold)] transition-all pb-4">
                                 <input type="text" placeholder="JED @ 09:30..." className="w-full bg-transparent text-md font-manrope font-black text-slate-900 outline-none placeholder-slate-200" />
                              </div>
                           </div>
                        </>
                     )}

                     {formData.type === 'Transport' && (
                        <>
                           <div className="group">
                              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 block">Transport Type</label>
                              <div className="relative border-b-2 border-slate-100 group-focus-within:border-[var(--desert-gold)] transition-all pb-4">
                                 <select className="w-full bg-transparent text-md font-manrope font-black text-slate-900 outline-none cursor-pointer">
                                    <option className="bg-white">Pickup (Airport)</option>
                                    <option className="bg-white">Drop (Airport)</option>
                                    <option className="bg-white">Ziyarat (Makkah)</option>
                                    <option className="bg-white">Ziyarat (Madinah)</option>
                                    <option className="bg-white">Inter-city Transit</option>
                                 </select>
                              </div>
                           </div>
                           <div className="group">
                              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 block">Vehicle Assignment</label>
                              <div className="relative border-b-2 border-slate-100 group-focus-within:border-[var(--desert-gold)] transition-all pb-4">
                                 <input type="text" placeholder="GMC Yukon / Bus-50..." className="w-full bg-transparent text-md font-manrope font-black text-slate-900 outline-none placeholder-slate-200" />
                              </div>
                           </div>
                           <div className="md:col-span-2 group">
                              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 block">Driver Name / Contact</label>
                              <div className="relative border-b-2 border-slate-100 group-focus-within:border-[var(--desert-gold)] transition-all pb-4">
                                 <input type="text" placeholder="Muhammad Ali (+966...)" className="w-full bg-transparent text-md font-manrope font-black text-slate-900 outline-none placeholder-slate-200" />
                              </div>
                           </div>
                        </>
                     )}
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default AddReservation;
