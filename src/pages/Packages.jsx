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

   const packages = storePackages && storePackages.length > 0 ? storePackages : [
      {
         id: 1,
         title: "Premium 5-Star Executive Hajj",
         makkahHotel: "Fairmont Makkah Clock Royal Tower",
         madinahHotel: "Anwar Al Madinah Movenpick",
         nightsMakkah: 10,
         nightsMadinah: 5,
         price: 15499,
         category: "Platinum",
         rating: 5
      },
      {
         id: 2,
         title: "Economy Plus Ramadan Umrah",
         makkahHotel: "Ibis Styles Makkah",
         madinahHotel: "Saja Al Madinah",
         nightsMakkah: 7,
         nightsMadinah: 7,
         price: 2199,
         category: "Economy",
         rating: 3
      },
      {
         id: 3,
         title: "Standard Family Umrah Package",
         makkahHotel: "Pullman ZamZam Makkah",
         madinahHotel: "Al Aqeeq Madinah Hotel",
         nightsMakkah: 5,
         nightsMadinah: 5,
         price: 3450,
         category: "Standard",
         rating: 4
      }
   ];


   return (
      <div className="space-y-10 animate-in fade-in duration-700">
         {/* Header */}
         <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
               <h1 className="text-3xl font-manrope font-extrabold text-[var(--on-surface)] tracking-tight">Package Inventory</h1>
               <p className="text-[var(--on-surface-variant)] text-sm mt-1 font-medium">Managing the collection of sacred travel s.</p>
            </div>
            <Link
               to="/packages/add"
               className="btn-primary px-8 py-3 rounded-xl text-white text-[11px] font-extrabold uppercase tracking-widest shadow-xl hover:-translate-y-0.5 transition-all flex items-center gap-2 w-fit"
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
               <button className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-[var(--surface-container-lowest)] border border-[var(--outline-variant)] rounded-xl text-[10px] font-extrabold uppercase tracking-widest text-[var(--on-surface-variant)] hover:bg-[var(--surface-container-high)] transition-all">
                  <Filter size={16} /> Filter
               </button>
               <button className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-[var(--surface-container-lowest)] border border-[var(--outline-variant)] rounded-xl text-[10px] font-extrabold uppercase tracking-widest text-[var(--on-surface-variant)] hover:bg-[var(--surface-container-high)] transition-all">
                  Category
               </button>
            </div>
         </div>

         {/* Packages Grid */}
         <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {isLoading ? (
               <div className="col-span-full py-32 text-center text-sm font-bold uppercase tracking-widest text-slate-400 opacity-50">Auditing Package Manifest...</div>
            ) : packages.map((pkg) => (
               <div key={pkg.id} className="bg-[var(--surface-container-lowest)] rounded-xl border border-[var(--outline-variant)] overflow-hidden group hover:shadow-2xl hover:shadow-black/5 transition-all duration-500 flex flex-col">
                  {/* Card Premium Header */}
                  <div className="p-8 pb-0 flex justify-between items-start text-black">
                     <div className="w-12 h-12 rounded-xl bg-[var(--surface)] flex items-center justify-center border border-[var(--outline-variant)]">
                        <Package size={24} className="text-[var(--on-surface)]" strokeWidth={1.5} />
                     </div>
                     <div className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${pkg.category === 'Platinum' ? 'bg-amber-100 text-amber-700' :
                           pkg.category === 'Economy' ? 'bg-emerald-100 text-emerald-700' :
                               'bg-blue-100 text-blue-700'
                        }`}>
                        {pkg.category}
                     </div>
                  </div>

                  <div className="p-8 flex-1">
                     <h3 className="text-xl font-manrope font-extrabold text-[var(--on-surface)] mb-6 leading-tight group-hover:text-[var(--primary)] transition-colors">{pkg.title}</h3>

                     <div className="space-y-4">
                        <div className="flex items-center gap-3">
                           <div className="w-8 h-8 rounded-xl bg-[var(--surface)] flex items-center justify-center text-[var(--on-surface-variant)] text-black">
                              <Hotel size={14} />
                           </div>
                           <div className="flex-1 min-w-0">
                              <p className="text-[9px] font-extrabold text-[var(--on-surface-variant)] uppercase tracking-widest mb-0.5">Makkah Residency</p>
                              <p className="text-xs font-bold text-[var(--on-surface)] truncate">{pkg.makkahHotel}</p>
                           </div>
                        </div>
                        <div className="flex items-center gap-3">
                           <div className="w-8 h-8 rounded-xl bg-[var(--surface)] flex items-center justify-center text-[var(--on-surface-variant)] text-black">
                              <Hotel size={14} />
                           </div>
                           <div className="flex-1 min-w-0">
                              <p className="text-[9px] font-extrabold text-[var(--on-surface-variant)] uppercase tracking-widest mb-0.5">Madinah Residency</p>
                              <p className="text-xs font-bold text-[var(--on-surface)] truncate">{pkg.madinahHotel}</p>
                           </div>
                        </div>
                        <div className="flex items-center gap-3 pt-2">
                           <div className="flex-1 bg-[var(--surface)] p-3 rounded-xl border border-[var(--outline-variant)]">
                              <p className="text-[9px] font-extrabold text-[var(--on-surface-variant)] uppercase tracking-widest mb-1">Makkah</p>
                              <p className="text-sm font-manrope font-black">{pkg.nightsMakkah} <span className="text-[10px] font-medium opacity-40 uppercase">Nights</span></p>
                           </div>
                           <div className="flex-1 bg-[var(--surface)] p-3 rounded-xl border border-[var(--outline-variant)]">
                              <p className="text-[9px] font-extrabold text-[var(--on-surface-variant)] uppercase tracking-widest mb-1">Madinah</p>
                              <p className="text-sm font-manrope font-black">{pkg.nightsMadinah} <span className="text-[10px] font-medium opacity-40 uppercase">Nights</span></p>
                           </div>
                        </div>
                     </div>
                  </div>

                  {/* Card Footer */}
                  <div className="p-8 pt-0 mt-auto text-black">
                     <div className="h-px bg-[var(--outline-variant)] mb-8 opacity-50 text-black"></div>
                     <div className="flex items-center justify-between">
                        <div>
                           <p className="text-[10px] font-extrabold text-[var(--on-surface-variant)] uppercase tracking-[0.2em] mb-1">Base Valuation</p>
                           <p className="text-2xl font-manrope font-extrabold text-[var(--on-surface)] tracking-tighter">${pkg.price.toLocaleString()}</p>
                        </div>
                        <button className="w-12 h-12 rounded-xl bg-[var(--on-surface)] text-white flex items-center justify-center hover:bg-[var(--primary)] transition-all group-hover:translate-x-1">
                           <ChevronRight size={20} />
                        </button>
                     </div>
                  </div>
               </div>
            ))}


            {/* Empty State / Add New Card */}
            <Link to="/packages/add" className="bg-[var(--surface-container-lowest)] rounded-xl border-2 border-dashed border-[var(--outline-variant)] p-8 flex flex-col items-center justify-center text-center group hover:border-[var(--on-surface)] transition-all min-h-[400px]">
               <div className="w-16 h-16 rounded-[2rem] bg-[var(--surface)] flex items-center justify-center text-[var(--on-surface-variant)] mb-6 group-hover:scale-110 transition-transform border border-[var(--outline-variant)]">
                  <Plus size={32} strokeWidth={1} />
               </div>
               <h3 className="text-sm font-extrabold text-[var(--on-surface)] uppercase tracking-[0.2em]">Craft New Experience</h3>
               <p className="text-[10px] text-[var(--on-surface-variant)] mt-4 font-medium max-w-[180px] leading-relaxed">Design and authorize a new pilgrimage  for the season.</p>
            </Link>
         </div>
      </div>
   );
};

export default Packages;
