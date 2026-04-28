import React, { useEffect, useState, useMemo } from 'react';
import {
   Plus, Search, Filter, ChevronDown,
   Package, Hotel, Calendar,
   ChevronRight, Star, Tag,
   MapPin, Users, Clock
} from 'lucide-react';
import { Link } from 'react-router-dom';
import usePackageStore from '../store/usePackageStore';

const Packages = () => {
   const { packages: storePackages, fetchPackages, isLoading } = usePackageStore();

   // State for Search and Category Filtering
   const [searchTerm, setSearchTerm] = useState('');
   const [selectedCategory, setSelectedCategory] = useState('All');

   useEffect(() => {
      fetchPackages();
   }, [fetchPackages]);

   // Unique categories extraction for the dropdown filter
   const categories = useMemo(() => {
      const cats = new Set(storePackages?.map(p => p.category_name).filter(Boolean));
      return ['All', ...Array.from(cats)];
   }, [storePackages]);

   // Filtering Logic: Search + Category
   const filteredPackages = useMemo(() => {
      return (storePackages || []).filter(pkg => {
         const matchesSearch = pkg.title?.toLowerCase().includes(searchTerm.toLowerCase());
         const matchesCategory = selectedCategory === 'All' || pkg.category_name === selectedCategory;
         return matchesSearch && matchesCategory;
      });
   }, [storePackages, searchTerm, selectedCategory]);

   // Helper for Category Badge Styles
   const getCategoryStyle = (cat) => {
      switch (cat) {
         case 'Elite': return 'bg-amber-50 text-amber-700 border-amber-100';
         case 'Market': return 'bg-blue-50 text-blue-700 border-blue-100';
         case 'Economy': return 'bg-emerald-50 text-emerald-700 border-emerald-100';
         default: return 'bg-slate-50 text-slate-700 border-slate-100';
      }
   };

   return (
      <div className="min-h-screen bg-slate-50/50 p-6 lg:p-10 font-inter text-slate-800">
         <div className=" space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">

            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
               <div>
                  <h1 className="text-4xl font-manrope  font-medium text-slate-900 tracking-tight leading-[1.1]">
                     Package Inventory
                  </h1>
                  <p className="mt-2.5 text-base font-medium text-slate-500">
                     Manage sacred travel clusters, itineraries, and pricing.
                  </p>
               </div>

               <Link
                  to="/packages/add"
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-slate-900 text-white text-sm  font-medium rounded-xl hover:bg-slate-800 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 shadow-lg shadow-slate-900/10"
               >
                  <Plus size={18} strokeWidth={2.5} />
                  <span>Create Package</span>
               </Link>
            </div>

            {/* Controls: Search & Functional Category Filter */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
               {/* Search Bar */}
               <div className="md:col-span-8 relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                     <Search className="h-4 w-4 text-slate-400 group-focus-within:text-[#0A2A5C] transition-colors" />
                  </div>
                  <input
                     type="text"
                     placeholder="Search by package name, hotel, or city..."
                     value={searchTerm}
                     onChange={(e) => setSearchTerm(e.target.value)}
                     className="block w-full pl-11 pr-4 py-3.5 border border-slate-200 rounded-xl leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 text-sm font-medium text-slate-700"
                  />
               </div>

               {/* Category Filter Dropdown */}
               <div className="md:col-span-4 relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                     <Tag size={16} className="text-slate-400" />
                  </div>
                  <select
                     value={selectedCategory}
                     onChange={(e) => setSelectedCategory(e.target.value)}
                     className="w-full pl-10 pr-10 py-3.5 appearance-none bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 cursor-pointer hover:bg-slate-50 transition-all"
                  >
                     {categories.map(cat => (
                        <option key={cat} value={cat}>{cat === 'All' ? 'All Categories' : cat}</option>
                     ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-400">
                     <ChevronDown size={16} />
                  </div>
               </div>
            </div>

            {/* Packages Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
               {isLoading ? (
                  // Loading Skeleton / State
                  <div className="col-span-full py-24 flex flex-col items-center justify-center text-slate-400">
                     <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-slate-300 mb-4"></div>
                     <p className="text-sm font-medium uppercase tracking-widest animate-pulse">Auditing Package Manifest...</p>
                  </div>
               ) : filteredPackages.length === 0 ? (
                  // Empty State
                  <div className="col-span-full py-20 flex flex-col items-center justify-center text-slate-400 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/30">
                     <Package size={48} className="mb-3 opacity-20" />
                     <p className="text-sm font-medium">No packages found matching your criteria.</p>
                     <button
                        onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }}
                        className="mt-4 text-xs  font-medium text-[#0A2A5C] hover:text-indigo-700 uppercase tracking-wider"
                     >
                        Clear Filters
                     </button>
                  </div>
               ) : (
                  // Package Cards
                  filteredPackages.map((pkg) => (
                     <Link
                        key={pkg.id}
                        to={`/packages/${pkg.id}`}
                        className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden"
                     >
                        {/* Card Header */}
                        <div className="p-6 pb-2 flex justify-between items-start">
                           <div className="w-11 h-11 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100 group-hover:bg-indigo-50 group-hover:text-[#0A2A5C] transition-colors">
                              <Package size={20} strokeWidth={1.5} />
                           </div>
                           <span className={`px-3 py-1 rounded-full text-[10px]  font-medium uppercase tracking-wider border ${getCategoryStyle(pkg.category_name)}`}>
                              {pkg.category_name}
                           </span>
                        </div>

                        {/* Card Body */}
                        <div className="p-6 flex-1 flex flex-col gap-5">
                           <div>
                              <h3 className="text-lg font-manrope  font-medium text-slate-900 leading-snug group-hover:text-[#0A2A5C] transition-colors line-clamp-2 h-[3.5rem]">
                                 {pkg.title}
                              </h3>
                           </div>

                           {/* Hotel Details */}
                           <div className="space-y-3">
                              <div className="flex items-start gap-3">
                                 <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center shrink-0 mt-0.5">
                                    <Hotel size={14} className="text-slate-400" />
                                 </div>
                                 <div className="flex-1 min-w-0">
                                    <p className="text-[9px]  font-medium text-slate-400 uppercase tracking-widest">Makkah</p>
                                    <p className="text-xs  font-medium text-slate-700 truncate">{pkg.makkah_hotel || 'Standard Hotel'}</p>
                                 </div>
                              </div>
                              <div className="flex items-start gap-3">
                                 <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center shrink-0 mt-0.5">
                                    <Hotel size={14} className="text-slate-400" />
                                 </div>
                                 <div className="flex-1 min-w-0">
                                    <p className="text-[9px]  font-medium text-slate-400 uppercase tracking-widest">Madinah</p>
                                    <p className="text-xs  font-medium text-slate-700 truncate">{pkg.madinah_hotel || 'Standard Hotel'}</p>
                                 </div>
                              </div>
                           </div>

                           {/* Nights Counter */}
                           <div className="flex items-center gap-2 bg-slate-50/50 p-2 rounded-xl border border-slate-100">
                              <div className="flex-1 text-center border-r border-slate-200/50">
                                 <p className="text-lg  font-medium text-slate-900 leading-none">{pkg.nights_makkah || 0}</p>
                                 <p className="text-[9px] uppercase text-slate-400  font-medium tracking-wider mt-1">Makkah</p>
                              </div>
                              <div className="flex-1 text-center">
                                 <p className="text-lg  font-medium text-slate-900 leading-none">{pkg.nights_madinah || 0}</p>
                                 <p className="text-[9px] uppercase text-slate-400  font-medium tracking-wider mt-1">Madinah</p>
                              </div>
                           </div>
                        </div>

                        {/* Card Footer */}
                        <div className="p-6 pt-2 mt-auto flex items-center justify-between border-t border-slate-50">
                           <div>
                              <p className="text-[9px]  font-medium text-slate-400 uppercase tracking-widest mb-1">Starting Price</p>
                              <div className="flex items-baseline gap-1">
                                 <span className="text-sm  font-medium text-slate-900">$</span>
                                 <span className="text-2xl font-manrope  font-medium text-slate-900 tracking-tight">
                                    {(pkg.base_price || 0).toLocaleString()}
                                 </span>
                              </div>
                           </div>
                           <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center group-hover:bg-[#0A2A5C] group-hover:scale-110 transition-all shadow-md">
                              <ChevronRight size={18} />
                           </div>
                        </div>
                     </Link>
                  ))
               )}

               {/* "Create New" Empty Card - Always visible at end */}
               {!isLoading && (
                  <Link
                     to="/packages/add"
                     className="group bg-slate-50/50 border-2 border-dashed border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center text-center min-h-[420px] hover:bg-indigo-50/30 hover:border-indigo-200 transition-all duration-300"
                  >
                     <div className="w-16 h-16 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-300 group-hover:text-indigo-500 group-hover:scale-110 group-hover:shadow-lg transition-all duration-300 mb-5">
                        <Plus size={28} strokeWidth={1.5} />
                     </div>
                     <h3 className="text-sm  font-medium text-slate-600 uppercase tracking-wider group-hover:text-indigo-700 transition-colors">Create New</h3>
                     <p className="text-xs text-slate-400 mt-2 leading-relaxed max-w-[160px]">
                        Build a new itinerary, add hotels, and set pricing.
                     </p>
                  </Link>
               )}

            </div>
         </div>
      </div>
   );
};

export default Packages;