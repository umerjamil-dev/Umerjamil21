import React, { useState } from 'react';
import {
   User, Package, Plane,
   Hotel, Calendar, CreditCard,
   Clock, Save, ArrowLeft,
   ShieldCheck, MapPin, Search,
   ChevronRight, Activity, Car,
   ArrowRight, Sparkles, AlertCircle
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const LiveBooking = () => {
   const navigate = useNavigate();
   const [step, setStep] = useState(1);
   const [formData, setFormData] = useState({
      customerId: '',
      packageId: '',
      flightApi: '',
      hotelApi: '',
      transportMode: 'VIP Private GMC',
      startDate: '2024-10-15',
      endDate: '2024-10-30'
   });

   const steps = [
      { id: 1, title: "Identity", icon: User },
      { id: 2, title: "Inventory", icon: Package },
      { id: 3, title: "Aviation", icon: Plane },
      { id: 4, title: "Hospitality", icon: Hotel },
      { id: 5, title: "Logistics", icon: Car }
   ];

   const handleNext = () => setStep(prev => Math.min(prev + 1, 5));
   const handlePrev = () => setStep(prev => Math.max(prev - 1, 1));

   return (
      <div className="font-inter space-y-12 animate-in fade-in duration-1000 pb-24">
         {/* Premium Header */}
         <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 pb-8 border-b border-slate-200 relative">
            <div className="space-y-4">
               <div className="flex items-center gap-3 text-[var(--desert-gold)] uppercase tracking-[0.4em] text-[9px] font-black opacity-80">
                  <Sparkles size={14} strokeWidth={3} />
                  Live GDS Sync v2.4
               </div>
               <h1 className="text-5xl font-manrope font-extrabold text-slate-900 tracking-tighter leading-tight">
                  Protocol
               </h1>
               <p className="text-slate-500 text-sm font-medium max-w-xl leading-relaxed">
                  Synchronizing live travel assets for real-time  authorization. Validating across multiple API nodes.
               </p>
            </div>
            <div className="flex items-center gap-4">
               <button onClick={() => navigate('/bookings')} className="px-8 py-4 bg-slate-50 border border-slate-200 rounded-xl text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all">
                  Abort
               </button>
               {step === 5 && (
                  <button className="px-10 py-5 bg-[var(--sacred-emerald)] text-white rounded-xl text-[10px] font-black uppercase tracking-[0.4em] shadow-[0_20px_40px_rgba(40,160,120,0.2)] flex items-center gap-3 hover:-translate-y-1 active:scale-95 transition-all">
                     <Save size={18} strokeWidth={3} />
                     Authorize Booking
                  </button>
               )}
            </div>
         </div>

         {/* Step Navigation Matrix */}
         <div className="bg-white rounded-xl p-8 border border-slate-200 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-bl-[8rem] translate-x-32 -translate-y-32 transition-all duration-700"></div>

            <div className="flex items-center justify-between max-w-4xl mx-auto relative z-10">
               {steps.map((s) => (
                  <div key={s.id} className="flex flex-col items-center gap-4 text-center">
                     <button
                        onClick={() => setStep(s.id)}
                        className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all cursor-pointer border-2 ${step === s.id
                              ? 'bg-[var(--desert-gold)] text-black border-transparent shadow-[0_0_30px_rgba(180,140,80,0.2)]'
                              : step > s.id
                                 ? 'bg-[var(--sacred-emerald)]/10 text-[var(--sacred-emerald)] border-[var(--sacred-emerald)]/10'
                                 : 'bg-slate-50 text-slate-300 border-slate-100 hover:bg-slate-100 hover:text-slate-500'
                           }`}
                     >
                        <s.icon size={20} strokeWidth={step === s.id ? 3 : 2} />
                     </button>
                     <span className={`text-[8px] font-black uppercase tracking-[0.3em] ${step === s.id ? 'text-black' : 'text-slate-300'}`}>{s.title}</span>
                  </div>
               ))}
               <div className="absolute left-0 right-0 top-7 h-px bg-slate-100 -z-10 mx-10"></div>
            </div>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Primary Action Matrix (8 Columns) */}
            <div className="lg:col-span-8 space-y-10">
               {step === 1 && (
                  <div className="bg-white rounded-xl p-14 border border-slate-200 animate-in slide-in-from-right duration-700 shadow-sm relative overflow-hidden">
                     <div className="absolute top-0 right-0 w-48 h-48 bg-slate-50 rounded-bl-[6rem] -translate-y-10 translate-x-10"></div>
                     <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em] mb-16 flex items-center gap-4">
                        <User className="text-[var(--desert-gold)]" size={20} /> Phase 01: Pilgrim Registry
                     </h3>
                     <div className="space-y-12">
                        <div className="group">
                           <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-6 block">Verified Identity Search</label>
                           <div className="relative border-b-2 border-slate-100 group-focus-within:border-[var(--desert-gold)] transition-all pb-6 flex items-center gap-5">
                              <Search className="text-slate-300 group-focus-within:text-[var(--desert-gold)]" size={24} />
                              <select
                                 className="w-full bg-transparent text-xl font-manrope font-black text-slate-900 outline-none cursor-pointer appearance-none"
                                 onChange={(e) => setFormData({ ...formData, customerId: e.target.value })}
                              >
                                 <option value="" className="bg-white">Query Registry ...</option>
                                 <option value="Muhammad Arif" className="bg-white">Muhammad Arif (PK-10294)</option>
                                 <option value="Zahra Khan" className="bg-white">Zahra Khan (PK-10295)</option>
                                 <option value="Omar Jamil" className="bg-white">Omar Jamil (PK-10296)</option>
                              </select>
                           </div>
                        </div>
                     </div>
                     <div className="mt-20 flex justify-end">
                        <button onClick={handleNext} className="px-12 py-5 bg-black text-white font-black text-[11px] uppercase tracking-[0.4em] rounded-xl shadow-xl hover:bg-[var(--desert-gold)] hover:text-black transition-all flex items-center gap-4">
                           Proceed to Inventory <ArrowRight size={18} strokeWidth={3} />
                        </button>
                     </div>
                  </div>
               )}

               {step === 2 && (
                  <div className="bg-white rounded-xl p-14 border border-slate-200 animate-in slide-in-from-right duration-700 shadow-sm">
                     <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em] mb-16 flex items-center gap-4">
                        <Package className="text-[var(--desert-gold)]" size={20} /> Phase 02: Inventory Synthesis
                     </h3>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {['Premium Hajj v1', 'Ramadan Umrah Platinum', 'Standard Umrah Premium'].map((pkg) => (
                           <button
                              key={pkg}
                              onClick={() => setFormData({ ...formData, packageId: pkg })}
                              className={`p-10 rounded-xl text-left border-2 transition-all group relative overflow-hidden ${formData.packageId === pkg
                                    ? 'bg-slate-50 border-[var(--desert-gold)] shadow-sm'
                                    : 'bg-white border-slate-100 hover:border-slate-300'
                                 }`}
                           >
                              <div className="flex justify-between items-start mb-6">
                                 <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em]">Package Node</span>
                                 {formData.packageId === pkg && <div className="w-2 h-2 rounded-full bg-[var(--desert-gold)] shadow-[0_0_10px_var(--desert-gold)]"></div>}
                              </div>
                              <h4 className="text-md font-manrope font-black text-slate-900 mb-2">{pkg}</h4>
                              <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Base Valuation: $1,299</p>
                           </button>
                        ))}
                     </div>
                     <div className="mt-20 flex justify-between items-center">
                        <button onClick={handlePrev} className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] hover:text-black transition-all">Back to Identity</button>
                        <button onClick={handleNext} className="px-12 py-5 bg-black text-white font-black text-[11px] uppercase tracking-[0.4em] rounded-xl shadow-xl hover:bg-[var(--desert-gold)] hover:text-black transition-all flex items-center gap-4">
                           Proceed to Aviation <ArrowRight size={18} strokeWidth={3} />
                        </button>
                     </div>
                  </div>
               )}

               {step === 3 && (
                  <div className="bg-white rounded-xl p-14 border border-slate-200 animate-in slide-in-from-right duration-700 shadow-sm">
                     <div className="flex items-center justify-between mb-16">
                        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em] flex items-center gap-4">
                           <Plane className="text-[var(--desert-gold)]" size={20} /> Phase 03: Aviation Registry
                        </h3>
                        <div className="px-6 py-2 bg-[var(--sacred-emerald)]/10 text-[var(--sacred-emerald)] rounded-full text-[9px] font-black uppercase tracking-[0.4em] border border-[var(--sacred-emerald)]/20 animate-pulse">Live API Syncing</div>
                     </div>

                     <div className="space-y-6">
                        {['Saudia SV-724', 'Emirates EK-601', 'PIA PK-701'].map((flight) => (
                           <div
                              key={flight}
                              onClick={() => setFormData({ ...formData, flightApi: flight })}
                              className={`p-10 bg-slate-50 border-2 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-10 group transition-all cursor-pointer ${formData.flightApi === flight ? 'border-[var(--desert-gold)] bg-white' : 'border-slate-100 hover:border-slate-300'
                                 }`}
                           >
                              <div className="flex items-center gap-8">
                                 <div className="w-20 h-20 rounded-xl bg-white flex items-center justify-center border border-slate-100 shadow-sm">
                                    <Plane className="text-slate-400 group-hover:text-[var(--desert-gold)] transition-all" size={28} />
                                 </div>
                                 <div className="space-y-1">
                                    <h4 className="text-xl font-manrope font-black text-slate-900 tracking-tight">{flight}</h4>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">JFK → JED | 14:30 </p>
                                 </div>
                              </div>
                              <div className="flex items-center gap-10">
                                 <div className="text-right space-y-1">
                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Live Dynamic Val</p>
                                    <p className="text-2xl font-manrope font-black text-slate-900 tracking-tighter">$845.00</p>
                                 </div>
                                 <div className={`px-6 py-3 rounded-xl text-[9px] font-black uppercase tracking-[0.4em] transition-all ${formData.flightApi === flight ? 'bg-[var(--desert-gold)] text-black' : 'bg-slate-200 text-slate-400'
                                    }`}>
                                    {formData.flightApi === flight ? 'ed' : 'Secure Node'}
                                 </div>
                              </div>
                           </div>
                        ))}
                     </div>
                     <div className="mt-20 flex justify-between items-center">
                        <button onClick={handlePrev} className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] hover:text-black transition-all">Back to Inventory</button>
                        <button onClick={handleNext} className="px-12 py-5 bg-black text-white font-black text-[11px] uppercase tracking-[0.4em] rounded-xl shadow-xl hover:bg-[var(--desert-gold)] hover:text-black transition-all flex items-center gap-4">
                           Proceed to Hospitality <ArrowRight size={18} strokeWidth={3} />
                        </button>
                     </div>
                  </div>
               )}

               {step === 4 && (
                  <div className="bg-white rounded-xl p-14 border border-slate-200 animate-in slide-in-from-right duration-700 shadow-sm text-slate-900">
                     <div className="flex items-center justify-between mb-16">
                        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em] flex items-center gap-4">
                           <Hotel className="text-[var(--desert-gold)]" size={20} /> Phase 04: Hospitality Registry
                        </h3>
                        <div className="px-6 py-2 bg-[var(--desert-gold)]/10 text-[var(--desert-gold)] rounded-full text-[9px] font-black uppercase tracking-[0.4em] border border-[var(--desert-gold)]/20">LIVE API v5.2</div>
                     </div>

                     <div className="space-y-10">
                        <div className="group">
                           <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-6 block">Select Verified Hospitality node</label>
                           <div className="relative border-b-2 border-slate-100 group-focus-within:border-[var(--desert-gold)] transition-all pb-6 flex items-center gap-5">
                              <Hotel className="text-slate-300 group-focus-within:text-[var(--desert-gold)]" size={24} />
                              <select
                                 className="w-full bg-transparent text-xl font-manrope font-black text-slate-900 outline-none cursor-pointer appearance-none"
                                 onChange={(e) => setFormData({ ...formData, hotelApi: e.target.value })}
                              >
                                 <option value="" className="bg-white">Query Hospitality API...</option>
                                 <option value="Clock Tower Fairmont" className="bg-white">Fairmont Makkah Clock Royal Tower</option>
                                 <option value="Pullman ZamZam" className="bg-white">Pullman ZamZam Makkah</option>
                                 <option value="Hyatt Regency" className="bg-white">Hyatt Regency Jabal Omar</option>
                                 <option value="Movenpick Enwar" className="bg-white">Anwar Al Madinah Mövenpick</option>
                              </select>
                           </div>
                        </div>

                        <div className="p-10 bg-slate-50 border border-slate-200 rounded-xl flex items-start gap-6">
                           <AlertCircle className="text-[var(--desert-gold)] shrink-0" size={24} />
                           <div>
                              <p className="text-[10px] font-black text-slate-900 uppercase tracking-[0.3em] mb-2 leading-relaxed">System Recommendation</p>
                              <p className="text-slate-500 text-xs font-medium leading-relaxed">Based on your selected aviation , Fairmont Makkah offers the highest synchronization efficiency for transit logistics.</p>
                           </div>
                        </div>
                     </div>
                     <div className="mt-20 flex justify-between items-center">
                        <button onClick={handlePrev} className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] hover:text-black transition-all">Back to Aviation</button>
                        <button onClick={handleNext} className="px-12 py-5 bg-black text-white font-black text-[11px] uppercase tracking-[0.4em] rounded-xl shadow-xl hover:bg-[var(--desert-gold)] hover:text-black transition-all flex items-center gap-4">
                           Proceed to Logistics <ArrowRight size={18} strokeWidth={3} />
                        </button>
                     </div>
                  </div>
               )}

               {step === 5 && (
                  <div className="bg-white rounded-xl p-14 border border-slate-200 animate-in slide-in-from-right duration-700 shadow-sm text-slate-900">
                     <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em] mb-16 flex items-center gap-4">
                        <Car className="text-[var(--desert-gold)]" size={20} /> Phase 05: Logistics & Temporal Registry
                     </h3>

                     <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-16">
                        <div className="group">
                           <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-6 block">Transit Protocol</label>
                           <div className="relative border-b-2 border-slate-100 group-focus-within:border-[var(--desert-gold)] transition-all pb-6 flex items-center gap-5">
                              <Car className="text-slate-300 group-focus-within:text-[var(--desert-gold)]" size={24} />
                              <select
                                 className="w-full bg-transparent text-xl font-manrope font-black text-slate-900 outline-none cursor-pointer appearance-none"
                                 value={formData.transportMode}
                                 onChange={(e) => setFormData({ ...formData, transportMode: e.target.value })}
                              >
                                 <option className="bg-white">VIP Private GMC</option>
                                 <option className="bg-white">Premium Bus </option>
                                 <option className="bg-white">Standard Logistics</option>
                              </select>
                           </div>
                        </div>

                        <div className="group">
                           <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-6 block">Inventory Dispatch Date</label>
                           <div className="relative border-b-2 border-slate-100 group-focus-within:border-[var(--desert-gold)] transition-all pb-6 flex items-center gap-5">
                              <Calendar className="text-slate-300 group-focus-within:text-[var(--desert-gold)]" size={24} />
                              <input
                                 type="date"
                                 className="w-full bg-transparent text-xl font-manrope font-black text-slate-900 outline-none"
                                 value={formData.startDate}
                                 onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                              />
                           </div>
                        </div>

                        <div className="group">
                           <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-6 block"> Expiry Date</label>
                           <div className="relative border-b-2 border-slate-100 group-focus-within:border-[var(--desert-gold)] transition-all pb-6 flex items-center gap-5">
                              <Calendar className="text-slate-300 group-focus-within:text-[var(--desert-gold)]" size={24} />
                              <input
                                 type="date"
                                 className="w-full bg-transparent text-xl font-manrope font-black text-slate-900 outline-none"
                                 value={formData.endDate}
                                 onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                              />
                           </div>
                        </div>
                     </div>

                     <div className="mt-20 flex justify-between items-center">
                        <button onClick={handlePrev} className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] hover:text-black transition-all">Back to Hospitality</button>
                        <div className="flex items-center gap-6 text-[10px] font-black text-[var(--sacred-emerald)] uppercase tracking-widest animate-pulse">
                           <ShieldCheck size={18} strokeWidth={3} /> Ready for Authorization
                        </div>
                     </div>
                  </div>
               )}
            </div>

            {/* Live Workflow Summary (4 Columns) */}
            <div className="lg:col-span-4 space-y-10">
               <div className="bg-gradient-to-br from-[#020617] via-[#0f172a] to-black rounded-xl p-14 text-white shadow-[0_30px_60px_rgba(0,0,0,0.6)] border border-white/5 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-80 h-80 bg-[var(--desert-gold)]/5 rounded-bl-[10rem] group-hover:scale-125 transition-all duration-1000 blur-3xl opacity-20"></div>

                  <h4 className="text-[10px] font-black text-white/30 uppercase tracking-[0.5em] mb-16 flex items-center gap-3">
                     <Clock size={16} className="text-[var(--desert-gold)]" /> Protocol
                  </h4>

                  <div className="space-y-12 relative z-10">
                     <div className="flex flex-col gap-3 group/item transition-all hover:translate-x-2">
                        <span className="text-[9px] font-black text-white/20 uppercase tracking-[0.4em]">Verified Pilgrim</span>
                        <span className="text-sm font-manrope font-black text-white uppercase tracking-tight">{formData.customerId || 'No Selection'}</span>
                     </div>
                     <div className="flex flex-col gap-3 group/item transition-all hover:translate-x-2">
                        <span className="text-[9px] font-black text-white/20 uppercase tracking-[0.4em]">Inventory Node</span>
                        <span className="text-sm font-manrope font-black text-white uppercase tracking-tight">{formData.packageId || ' Pending'}</span>
                     </div>
                     <div className="grid grid-cols-2 gap-8">
                        <div className="flex flex-col gap-2">
                           <span className="text-[8px] font-black text-white/10 uppercase tracking-widest">Aviation</span>
                           <span className="text-[10px] font-bold text-white/60">{formData.flightApi || 'PENDING'}</span>
                        </div>
                        <div className="flex flex-col gap-2">
                           <span className="text-[8px] font-black text-white/10 uppercase tracking-widest">Hospitality</span>
                           <span className="text-[10px] font-bold text-white/60">{formData.hotelApi || 'PENDING'}</span>
                        </div>
                     </div>

                     <div className="pt-20 mt-10 border-t border-white/5 text-center relative">
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#020617] text-[8px] font-black text-white/10 uppercase tracking-[0.4em] border border-white/5 rounded-full">
                           Aggregated Floor
                        </div>
                        <p className="text-[10px] text-white/20 font-black uppercase tracking-[0.4em] mb-6">Estimated  valuation</p>
                        <p className="text-5xl font-manrope font-black text-white tracking-tighter drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                           $2,139.00
                        </p>
                     </div>
                  </div>
               </div>

               <div className="bg-white rounded-xl p-12 border border-slate-200 shadow-sm">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em] mb-12 flex items-center gap-3">
                     <ShieldCheck size={18} className="text-[var(--sacred-emerald)]" /> Integrity Verifier
                  </h4>
                  <div className="space-y-8">
                     {[
                        { label: 'Visa Quota Sync', active: true },
                        { label: 'Passport  Match', active: true },
                        { label: 'Health Protocol Protocol', active: false }
                     ].map(v => (
                        <div key={v.label} className="flex items-center justify-between group">
                           <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] group-hover:text-slate-600 transition-all">{v.label}</span>
                           <div className={`w-3 h-3 rounded-md transition-all ${v.active ? 'bg-[var(--sacred-emerald)] shadow-[0_0_12px_var(--sacred-emerald)]' : 'bg-slate-100'}`}></div>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default LiveBooking;
