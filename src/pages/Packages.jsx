import React, { useEffect } from 'react';
import {
   Plus, Search, Filter,
   Package, Hotel, Calendar,
   ChevronRight, Star, Tag,
   MapPin, Users
} from 'lucide-react';
import { Link } from 'react-router-dom';
import usePackageStore from '../store/usePackageStore';

const Packages = () => {
   const { packages: storePackages, fetchPackages, isLoading } = usePackageStore();

   useEffect(() => {
      fetchPackages();
   }, [fetchPackages]);

   const packages = storePackages && storePackages.length > 0 ? storePackages : [];

   return (
      <div className="space-y-10 animate-in fade-in duration-700">
         {/* Header */}
         <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
               <h1 className="text-3xl font-manrope font-medium text-[var(--on-surface)] tracking-tight">Package Inventory</h1>
               <p className="text-[var(--on-surface-variant)] text-sm mt-1 font-medium italic opacity-60">Architecting and managing sacred travel clusters.</p>
            </div>
            <Link
               to="/packages/add"
               className="btn-primary px-8 py-3 rounded-xl text-white text-[11px] font-medium uppercase tracking-widest shadow-xl hover:-translate-y-0.5 transition-all flex items-center gap-2 w-fit"
            >
               <Plus size={18} strokeWidth={2.5} />
               Assemble New Package
            </Link>
         </div>

         {/* Filters & Search */}
         <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-8 relative group">
               <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-[var(--on-surface-variant)] group-focus-within:text-[var(--on-surface)] transition-colors" size={18} />
               <input
                  type="text"
                  placeholder="Query package catalogue..."
                  className="w-full pl-14 pr-6 py-4 bg-[var(--surface-container-lowest)] border border-[var(--outline-variant)] rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-[var(--surface-container-low)] transition-all"
               />
            </div>
            <div className="md:col-span-4 flex gap-4">
               <button className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-[var(--surface-container-lowest)] border border-[var(--outline-variant)] rounded-xl text-[10px] font-medium uppercase tracking-widest text-[var(--on-surface-variant)] hover:bg-[var(--surface-container-high)] transition-all">
                  <Filter size={16} /> Filter
               </button>
               <button className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-[var(--surface-container-lowest)] border border-[var(--outline-variant)] rounded-xl text-[10px] font-medium uppercase tracking-widest text-[var(--on-surface-variant)] hover:bg-[var(--surface-container-high)] transition-all">
                  Category
               </button>
            </div>
         </div>

         {/* Packages Grid */}
         <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
            {isLoading ? (
               <div className="col-span-full py-20 text-center text-sm font-medium uppercase tracking-widest text-slate-400 opacity-50 italic">Auditing Package Manifest...</div>
            ) : packages.map((pkg) => (
               <Link key={pkg.id} to={`/packages/${pkg.id}`} className="bg-white rounded-xl border border-[var(--outline-variant)] overflow-hidden group hover:shadow-2xl hover:shadow-black/5 transition-all duration-500 flex flex-col">
                  {/* Card Premium Header */}
                  <div className="p-6 pb-0 flex justify-between items-start">
                     <div className="w-10 h-10 rounded-xl bg-[var(--surface)] flex items-center justify-center border border-[var(--outline-variant)] group-hover:bg-white transition-all">
                        <Package size={20} className="text-[var(--on-surface)]" strokeWidth={1.5} />
                     </div>
                     <div className={`px-2.5 py-1 rounded-full text-[8px] font-medium uppercase tracking-widest ${pkg.category_name === 'Elite' ? 'bg-amber-100 text-amber-700' :
                        pkg.category_name === 'Market' ? 'bg-blue-100 text-blue-700' :
                           'bg-emerald-100 text-emerald-700'
                        }`}>
                        {pkg.category_name}
                     </div>
                  </div>

                  <div className="p-6 flex-1">
                     <h3 className="text-lg font-manrope font-medium text-[var(--on-surface)] mb-5 leading-tight group-hover:text-[var(--primary)] transition-colors">{pkg.title}</h3>

                     <div className="space-y-3.5">
                        <div className="flex items-center gap-2.5">
                           <div className="w-7 h-7 rounded-lg bg-[var(--surface)] flex items-center justify-center text-[var(--on-surface-variant)] group-hover:bg-white transition-all">
                              <Hotel size={12} />
                           </div>
                           <div className="flex-1 min-w-0">
                              <p className="text-[8px] font-medium text-[var(--on-surface-variant)] uppercase tracking-widest mb-0.5 opacity-50">Makkah</p>
                              <p className="text-[11px] font-medium text-[var(--on-surface)] truncate">{pkg.makkah_hotel}</p>
                           </div>
                        </div>
                        <div className="flex items-center gap-2.5">
                           <div className="w-7 h-7 rounded-lg bg-[var(--surface)] flex items-center justify-center text-[var(--on-surface-variant)] group-hover:bg-white transition-all">
                              <Hotel size={12} />
                           </div>
                           <div className="flex-1 min-w-0">
                              <p className="text-[8px] font-medium text-[var(--on-surface-variant)] uppercase tracking-widest mb-0.5 opacity-50">Madinah</p>
                              <p className="text-[11px] font-medium text-[var(--on-surface)] truncate">{pkg.madinah_hotel}</p>
                           </div>
                        </div>
                        <div className="flex items-center gap-2.5 pt-1.5 font-manrope">
                           <div className="flex-1 bg-[var(--surface)] p-2.5 rounded-lg border border-[var(--outline-variant)]">
                              <p className="text-[8px] font-medium text-[var(--on-surface-variant)] uppercase tracking-widest mb-0.5">Makkah</p>
                              <p className="text-xs font-medium">{pkg.nights_makkah} <span className="text-[9px] pl-2 font-medium opacity-80 uppercase">nights</span></p>
                           </div>
                           <div className="flex-1 bg-[var(--surface)] p-2.5 rounded-lg border border-[var(--outline-variant)]">
                              <p className="text-[8px] font-medium text-[var(--on-surface-variant)] uppercase tracking-widest mb-0.5">Madinah</p>
                              <p className="text-xs font-medium">{pkg.nights_madinah} <span className="text-[9px] pl-2 font-medium opacity-80 uppercase">nights</span></p>
                           </div>
                        </div>
                     </div>
                  </div>

                  {/* Card Footer */}
                  <div className="p-6 pt-0 mt-auto">
                     <div className="h-px bg-[var(--outline-variant)] mb-6 opacity-30"></div>
                     <div className="flex items-center justify-between">
                        <div>
                           <p className="text-[8px] font-medium text-[var(--on-surface-variant)] uppercase tracking-[0.2em] mb-0.5">Base Valuation</p>
                           <p className="text-xl font-manrope font-medium text-[var(--on-surface)] tracking-tighter">${(pkg.base_price || pkg.base_price)?.toLocaleString() || '0'}</p>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-[var(--on-surface)] text-white flex items-center justify-center group-hover:bg-[var(--primary)] transition-all group-hover:translate-x-1 shadow-md">
                           <ChevronRight size={18} />
                        </div>
                     </div>
                  </div>
               </Link>
            ))}


            {/* Empty State / Add New Card */}
            <Link to="/packages/add" className="bg-[var(--surface-container-lowest)] rounded-xl border-2 border-dashed border-[var(--outline-variant)] p-6 flex flex-col items-center justify-center text-center group hover:border-[var(--on-surface)] transition-all min-h-[320px]">
               <div className="w-12 h-12 rounded-[1.5rem] bg-[var(--surface)] flex items-center justify-center text-[var(--on-surface-variant)] mb-4 group-hover:scale-110 transition-transform border border-[var(--outline-variant)] shadow-sm">
                  <Plus size={24} strokeWidth={1.5} />
               </div>
               <h3 className="text-xs font-medium text-[var(--on-surface)] uppercase tracking-[0.2em]">Craft New</h3>
               <p className="text-[9px] text-[var(--on-surface-variant)] mt-3 font-medium max-w-[150px] leading-relaxed opacity-60">Design and authorize a new pilgrimage for the season.</p>
            </Link>
         </div>



      </div>
   );
};

export default Packages;
