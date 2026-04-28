import React, { useEffect, useState } from 'react';
import {
   ArrowLeft, Save, Package,
   Hotel, MapPin, Calendar,
   DollarSign, Info, ShieldCheck,
   ChevronRight, Star,
   Layers,
   Workflow
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import useMasterTypeStore from '../store/useMasterTypeStore';
import usePackageStore from '../store/usePackageStore';
import toast from 'react-hot-toast';
import { selectClasses } from '@mui/material/Select';

const AddPackage = () => {
   const navigate = useNavigate();
   const { masterData, fetchMasterData } = useMasterTypeStore();
   const { addPackage, isLoading } = usePackageStore();

   const [formData, setFormData] = useState({
      title: '',
      makkahHotel: '',
      madinahHotel: '',
      nightsMakkah: 7,
      nightsMadinah: 7,
      basePrice: '',
      category: '',
      package_type: '',
      status_id: 1
   });

   useEffect(() => {
      fetchMasterData();
   }, [fetchMasterData]);

   const handleSubmit = async () => {
      if (!formData.title || !formData.basePrice) {
         toast.error('Designation and Valuation are mandatory.');
         return;
      }
      try {
         await addPackage(formData);
         toast.success('Package successfully authorized and archived.');
         navigate('/packages');
      } catch (err) {
         toast.error('Failed to archive package: ' + err.message);
      }
   };
   return (
      <>
         <div className="font-inter space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000 pb-24">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-4">
               <div className="space-y-2">
                  <div className="flex items-center gap-3 text-[var(--on-surface-variant)] uppercase tracking-[0.3em] text-[10px] font-medium">
                     <Package size={14} className="text-[var(--desert-gold)]" />
                     Inventory Forge
                  </div>
                  <h1 className="text-4xl font-manrope font-medium text-[var(--on-surface)] tracking-tighter">Add Packages </h1>
                  <p className="text-[var(--on-surface-variant)] text-sm font-medium max-w-lg">Archiving a new travel  for the upcoming pilgrimage season with verified hospitality and transit nodes.</p>
               </div>
               <div className="flex items-center gap-4">
                  <Link
                     to="/packages"
                     className="px-8 py-4 bg-[var(--surface-container-lowest)] border border-[var(--outline-variant)] rounded-xl text-[10px] font-medium text-[var(--on-surface-variant)] uppercase tracking-[0.2em] hover:bg-white hover:text-[var(--on-surface)] transition-all flex items-center gap-3 shadow-sm"
                  >
                     Discard
                  </Link>
                  <button
                     onClick={handleSubmit}
                     disabled={isLoading}
                     className={`btn-primary px-10 py-4 rounded-xl text-white text-[10px] font-medium uppercase tracking-[0.3em] shadow-2xl flex items-center gap-3 active:scale-95 transition-all ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                     <Save size={18} strokeWidth={2.5} />
                     {isLoading ? 'Archiving...' : 'Authorize & Archive'}
                  </button>
               </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
               {/* Main Form (8/12) */}
               <div className="lg:col-span-8 space-y-10">
                  <div className="bg-[var(--surface-container-lowest)]  rounded-xl p-12 shadow-sm border border-[var(--outline-variant)] relative overflow-hidden group">
                     <div className="absolute top-0 right-0 w-48 h-48 bg-[var(--surface)] rounded-bl-[6rem] translate-x-12 -translate-y-12 transition-transform group-hover:translate-x-6 group-hover:-translate-y-6"></div>

                     <h3 className="text-[10px] font-medium text-[var(--on-surface-variant)] uppercase tracking-[0.4em] mb-16 flex items-center gap-3 relative z-10">
                        <Layers size={18} strokeWidth={2.5} className="text-[var(--on-surface)]" />
                        Structural Blueprint
                     </h3>

                     <div className="space-y-16 relative z-10">
                        <div className="group">
                           <label className="text-[10px] font-medium text-[var(--on-surface-variant)] uppercase tracking-widest mb-6 block ml-1 opacity-70"> Designation (Title)</label>
                           <div className="relative border-b-2 border-[var(--outline-variant)] group-focus-within:border-[var(--on-surface)] transition-all pb-6">
                              <input
                                 type="text"
                                 placeholder="e.g. PLATINUM RAMADAN UMRAH 2024"
                                 className="w-full bg-transparent text-2xl font-manrope font-medium text-[var(--on-surface)] outline-none placeholder-[var(--on-surface-variant)]/20 uppercase tracking-tight"
                                 value={formData.title}
                                 onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                              />
                           </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                           <div className="group">
                              <label className="text-[10px] font-medium text-[var(--on-surface-variant)] uppercase tracking-widest mb-6 block ml-1 opacity-70">Makkah Residency</label>
                              <div className="relative border-b-2 border-[var(--outline-variant)] group-focus-within:border-[var(--on-surface)] transition-all pb-4 flex items-center gap-4">
                                 <Hotel className="text-[var(--on-surface-variant)] group-focus-within:text-[var(--on-surface)] transition-colors" size={20} strokeWidth={2} />
                                 <input
                                    type="text"
                                    placeholder="Select Luxury Hospitality..."
                                    className="w-full bg-transparent text-sm font-manrope font-medium text-[var(--on-surface)] outline-none placeholder-[var(--on-surface-variant)]/30"
                                    value={formData.makkahHotel}
                                    onChange={(e) => setFormData({ ...formData, makkahHotel: e.target.value })}
                                 />
                              </div>
                           </div>
                           <div className="group">
                              <label className="text-[10px] font-medium text-[var(--on-surface-variant)] uppercase tracking-widest mb-6 block ml-1 opacity-70">Madinah Residency</label>
                              <div className="relative border-b-2 border-[var(--outline-variant)] group-focus-within:border-[var(--on-surface)] transition-all pb-4 flex items-center gap-4">
                                 <Hotel className="text-[var(--on-surface-variant)] group-focus-within:text-[var(--on-surface)] transition-colors" size={20} strokeWidth={2} />
                                 <input
                                    type="text"
                                    placeholder="Select Hospitality Node..."
                                    className="w-full bg-transparent text-sm font-manrope font-medium text-[var(--on-surface)] outline-none placeholder-[var(--on-surface-variant)]/30"
                                    value={formData.madinahHotel}
                                    onChange={(e) => setFormData({ ...formData, madinahHotel: e.target.value })}
                                 />
                              </div>
                           </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                           <div className="p-10 bg-[var(--surface)]  rounded-xl border border-[var(--outline-variant)] group/slider hover:bg-white transition-all shadow-sm">
                              <div className="flex items-center justify-between mb-8">
                                 <p className="text-[9px] font-medium text-[var(--on-surface-variant)] uppercase tracking-[0.3em]">Temporal Stay (Makkah)</p>
                                 <Calendar size={18} className="text-[var(--on-surface-variant)]" strokeWidth={2.5} />
                              </div>
                              <div className="flex items-center gap-8">
                                 <input
                                    type="range"
                                    min="1"
                                    max="30"
                                    className="flex-1 h-2 bg-[var(--surface-container-low)] rounded-full appearance-none accent-[var(--on-surface)] cursor-pointer"
                                    value={formData.nightsMakkah}
                                    onChange={(e) => setFormData({ ...formData, nightsMakkah: parseInt(e.target.value) })}
                                 />
                                 <div className="text-right">
                                    <span className="text-4xl font-manrope font-medium text-[var(--on-surface)]">{formData.nightsMakkah}</span>
                                    <p className="text-[8px] uppercase font-medium text-[var(--on-surface-variant)] tracking-widest">Nights</p>
                                 </div>
                              </div>
                           </div>
                           <div className="p-10 bg-[var(--surface)]  rounded-xl border border-[var(--outline-variant)] group/slider hover:bg-white transition-all shadow-sm">
                              <div className="flex items-center justify-between mb-8">
                                 <p className="text-[9px] font-medium text-[var(--on-surface-variant)] uppercase tracking-[0.3em]">Temporal Stay (Madinah)</p>
                                 <Calendar size={18} className="text-[var(--on-surface-variant)]" strokeWidth={2.5} />
                              </div>
                              <div className="flex items-center gap-8">
                                 <input
                                    type="range"
                                    min="1"
                                    max="30"
                                    className="flex-1 h-2 bg-[var(--surface-container-low)] rounded-full appearance-none accent-[var(--on-surface)] cursor-pointer"
                                    value={formData.nightsMadinah}
                                    onChange={(e) => setFormData({ ...formData, nightsMadinah: parseInt(e.target.value) })}
                                 />
                                 <div className="text-right">
                                    <span className="text-4xl font-manrope font-medium text-[var(--on-surface)]">{formData.nightsMadinah}</span>
                                    <p className="text-[8px] uppercase font-medium text-[var(--on-surface-variant)] tracking-widest">Nights</p>
                                 </div>
                              </div>
                           </div>
                           <div className="   p-10 bg-[var(--surface)] rounded-xl border border-[var(--outline-variant)] group/slider hover:bg-white transition-all shadow-sm col-span-1 md:col-span-2">
                              <div className="flex items-center justify-between mb-8">
                                 <p className="text-[9px] font-medium text-[var(--on-surface-variant)] uppercase tracking-[0.3em]">Operational Status</p>
                                 <ShieldCheck size={18} className="text-[var(--on-surface-variant)]" strokeWidth={2.5} />
                              </div>
                              <div className="flex gap-4">
                                 {[{ label: 'Active', value: 1 }, { label: 'Inactive', value: 0 }].map((opt) => (
                                    <button
                                       key={opt.value}
                                       type="button"
                                       onClick={() => setFormData({ ...formData, status_id: opt.value })}
                                       className={`flex-1 py-4 rounded-xl text-[9px] font-medium uppercase tracking-[0.3em] transition-all border ${formData.status_id === opt.value
                                          ? opt.value === 1
                                             ? 'bg-emerald-600 text-white border-transparent shadow-lg'
                                             : 'bg-[var(--on-surface)] text-white border-transparent shadow-lg'
                                          : 'bg-[var(--surface-container-lowest)] text-[var(--on-surface-variant)] border-[var(--outline-variant)] hover:bg-white hover:border-[var(--on-surface)]'
                                          }`}
                                    >
                                       {opt.label}
                                    </button>
                                 ))}
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>

                  <div className="bg-[var(--surface-container-lowest)]  rounded-xl p-12 shadow-sm border border-[var(--outline-variant)]">
                     <h3 className="text-[10px] font-medium text-[var(--on-surface-variant)] uppercase tracking-[0.4em] mb-12 flex items-center gap-3">
                        <DollarSign size={18} strokeWidth={2.5} className="text-[var(--on-surface)]" />
                        Equity Calibration
                     </h3>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
                        <div className="group">
                           <label className="text-[10px] font-medium text-[var(--on-surface-variant)] uppercase tracking-widest mb-6 block ml-1 opacity-70">Standard Valuation (per unit)</label>
                           <div className="relative border-b-2 border-[var(--outline-variant)] group-focus-within:border-[var(--on-surface)] transition-all pb-6 flex items-center gap-3">
                              <span className="text-2xl font-medium text-[var(--on-surface-variant)] group-focus-within:text-[var(--on-surface)]">$</span>
                              <input
                                 type="number"
                                 placeholder="0,000"
                                 className="w-full bg-transparent text-4xl font-manrope font-medium text-[var(--on-surface)] outline-none placeholder-[var(--on-surface-variant)]/10"
                                 value={formData.basePrice}
                                 onChange={(e) => setFormData({ ...formData, basePrice: e.target.value })}
                              />
                           </div>
                        </div>
                        <div className="group">
                           <label className="text-[10px] font-medium text-[var(--on-surface-variant)] uppercase tracking-widest mb-6 block ml-1 opacity-70">Package Class</label>
                           <div className="grid grid-cols-2 gap-3">
                              {(masterData.package_type || []).map((type) => {
                                 const label = type.name || type;
                                 const value = type.id || type;
                                 return (
                                    <button
                                       key={value}
                                       onClick={() => setFormData({ ...formData, package_type: value })}
                                       className={`py-4 rounded-xl text-[9px] font-medium uppercase tracking-[0.2em] transition-all border ${formData.package_type === value
                                          ? 'bg-[var(--on-surface)] text-white border-transparent shadow-xl -translate-y-1'
                                          : 'bg-[var(--surface)] text-[var(--on-surface-variant)] border-[var(--outline-variant)] hover:bg-white hover:border-[var(--on-surface)]'
                                          }`}
                                    >
                                       {label}
                                    </button>
                                 );
                              })}
                           </div>
                        </div>
                        <div className="group">
                           <label className="text-[10px] font-medium text-[var(--on-surface-variant)] uppercase tracking-widest mb-6 block ml-1 opacity-70">Strategic Categorization</label>
                           <div className="grid grid-cols-3 gap-3">
                              {(masterData.strategiccategorization || []).map((cat) => {
                                 const label = cat.name || cat;
                                 const value = cat.id || cat;
                                 return (
                                    <button
                                       key={value}
                                       onClick={() => setFormData({ ...formData, category: value })}
                                       className={`py-4 rounded-xl text-[9px] font-medium uppercase tracking-[0.2em] transition-all border ${formData.category === value
                                          ? 'bg-[var(--on-surface)] text-white border-transparent shadow-xl -translate-y-1'
                                          : 'bg-[var(--surface)] text-[var(--on-surface-variant)] border-[var(--outline-variant)] hover:bg-white hover:border-[var(--on-surface)]'
                                          }`}
                                    >
                                       {label}
                                    </button>
                                 );
                              })}
                           </div>
                        </div>
                     </div>
                  </div>
               </div>

               {/* Sidebar Metadata (4/12) */}
               <div className="lg:col-span-4 space-y-10">
                  <div className="relative  rounded-xl p-12 text-white shadow-2xl overflow-hidden group min-h-[440px] flex flex-col justify-between" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)' }}>
                     <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-bl-[6rem] group-hover:scale-125 transition-transform duration-700"></div>
                     <div className="relative z-10">
                        <div className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center border border-white/10 mb-10 group-hover:rotate-12 transition-transform">
                           <Workflow className="text-[var(--desert-gold)]" size={32} strokeWidth={1.5} />
                        </div>
                        <div className='text-3xl font-medium italic evenly '></div>
                        <h4 className="text-3xl font-manrope font-medium tracking-tighter mb-6 leading-tight">Operational <br /><span className="italic font-light opacity-50">Guarantee</span></h4>
                        <p className="text-[12px] font-medium text-white/40 leading-relaxed mb-10 max-w-[24ch]">
                           This  configuration will be globally active and available for quotation synthesis once authorized.
                        </p>
                     </div>

                     <div className="space-y-6 relative z-10 pt-10 border-t border-white/5">
                        {[
                           { label: 'Hospitality Verified', ready: true },
                           { label: 'Logistics Protocol', ready: true },
                           { label: 'Valuation Sealed', ready: true }
                        ].map(item => (
                           <div key={item.label} className="flex items-center gap-4 text-[10px] font-medium uppercase tracking-[0.3em] text-white/30">
                              <div className={`w-2 h-2 rounded-full ${item.ready ? 'bg-[var(--sacred-emerald)] shadow-[0_0_12px_rgba(16,185,129,0.5)]' : 'bg-white/10'}`}></div>
                              {item.label}
                           </div>
                        ))}
                     </div>
                  </div>

                  <div className="bg-[var(--surface-container-lowest)]  rounded-xl p-12 border border-[var(--outline-variant)] shadow-sm group">
                     <h4 className="text-[10px] font-medium text-[var(--on-surface-variant)] uppercase tracking-[0.4em] mb-12 flex items-center gap-3">
                        <ShieldCheck size={18} className="text-[var(--on-surface)]" /> Security
                     </h4>
                     <div className="flex items-center gap-5 mb-10">
                        <div className="w-16 h-16 rounded-[1.5rem] bg-[var(--surface)] flex items-center justify-center border border-[var(--outline-variant)] group-hover:bg-white transition-all overflow-hidden relative">
                           <img
                              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Umar"
                              alt="Admin User"
                              className="w-full h-full object-cover p-2"
                           />
                        </div>
                        <div>
                           <p className="text-sm font-manrope font-medium text-[var(--on-surface)] tracking-tight">Admin User</p>
                           <p className="text-[10px] font-medium text-[var(--on-surface-variant)] uppercase tracking-widest opacity-60">Executive Authority</p>
                        </div>
                     </div>
                     <div className="p-6 bg-[var(--surface)] rounded-xl italic text-[11px] font-medium text-[var(--on-surface-variant)]/60 leading-relaxed border-l-4 border-[var(--on-surface)]">
                        "Ensure all hospitality allotments are synchronized with the KSA global hospitality  before commitment."
                     </div>
                  </div>

               </div>
            </div>
         </div>
      </>
   );
};

export default AddPackage;

