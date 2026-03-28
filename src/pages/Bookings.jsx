import React, { useEffect } from 'react';
import {
   CreditCard, DollarSign, ArrowUpRight,
   Filter, Download, MoreHorizontal,
   CheckCircle2, Clock, AlertCircle, Search,
   BookOpen, TrendingUp, Calendar
} from 'lucide-react';
import { Link } from 'react-router-dom';
import useBookingStore from '../store/useBookingStore';

const Bookings = () => {
   const { bookings, fetchBookings, isLoading } = useBookingStore();

   useEffect(() => {
      fetchBookings();
   }, [fetchBookings]);

   const bookingsToShow = bookings && bookings.length > 0 ? bookings : [
      { id: 'BK-1001', customer: 'Ahmed Raza', package: 'Umrah 15-Day Premium', amount: 5400, paid: 5400, status: 'Confirmed', date: 'Mar 15, 2024' },
      { id: 'BK-1002', customer: 'Fatima Zahra', package: 'Hajj 2024 Economy', amount: 12000, paid: 4500, status: 'Partial', date: 'Mar 12, 2024' },
      { id: 'BK-1003', customer: 'Zubair Ahmed', package: 'Umrah Luxury (Ramadan)', amount: 8200, paid: 0, status: 'Pending', date: 'Mar 10, 2024' },
   ];


   return (
      <div className="space-y-12 animate-in fade-in duration-1000 font-inter pb-20">
         {/* Premium Header */}
         <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 pb-8 border-b border-slate-200">
            <div className="space-y-4">
               <div className="flex items-center gap-3 text-[var(--desert-gold)] uppercase tracking-[0.4em] text-[9px] font-black opacity-80">
                  <TrendingUp size={14} strokeWidth={3} />
                  Revenue Analysis: Q1 2024
               </div>
               <h1 className="text-5xl font-manrope font-extrabold text-slate-900 tracking-tighter leading-tight">
                  Financial 
               </h1>
               <p className="text-slate-500 text-sm font-medium max-w-xl leading-relaxed">
                  Tracking sacred investments and operational liquidity cycles across the global Al Bayan network.
               </p>
            </div>
            <div className="flex items-center gap-4">
               <button className="flex items-center gap-3 px-8 py-5 bg-white border border-slate-200 rounded-xl text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-black hover:border-slate-300 transition-all group shadow-sm">
                  <Download size={18} strokeWidth={3} /> Journal Export
               </button>
               <Link
                  to="/bookings/add"
                  className="px-10 py-5 bg-black text-white rounded-xl text-[10px] font-black uppercase tracking-[0.4em] shadow-xl hover:bg-[var(--desert-gold)] hover:text-black transition-all flex items-center gap-3"
               >
                  <BookOpen size={18} strokeWidth={3} />
                  Create Entry
               </Link>
            </div>
         </div>

         {/* Financial Bento Matrix */}
         <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Inflow Aggregate */}
            <div className="bg-white rounded-xl p-10 border border-slate-200 shadow-sm relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-[5rem] translate-x-12 -translate-y-12 group-hover:translate-x-6 group-hover:-translate-y-6 transition-all duration-700"></div>
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-12 relative z-10 font-inter">Inflow Aggregate</p>
               <div className="flex items-end justify-between relative z-10">
                  <div>
                     <h3 className="text-5xl font-manrope font-extrabold text-slate-900 tracking-tighter leading-none">$284.5k</h3>
                     <p className="text-[9px] font-black text-[var(--sacred-emerald)] flex items-center gap-2 mt-4 uppercase tracking-[0.2em] bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100 w-fit">
                        <TrendingUp size={12} strokeWidth={3} /> +12% Efficiency
                     </p>
                  </div>
                  <div className="w-16 h-16 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-100 group-hover:bg-black group-hover:text-white transition-all shadow-sm">
                     <DollarSign size={28} strokeWidth={2.5} />
                  </div>
               </div>
            </div>

            {/* Outflow Risk */}
            <div className="bg-white rounded-xl p-10 border border-slate-200 shadow-sm relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-red-50/50 rounded-bl-[5rem] translate-x-12 -translate-y-12 transition-transform duration-700"></div>
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-12 relative z-10 font-inter">Outflow Risk</p>
               <div className="flex items-end justify-between relative z-10">
                  <div>
                     <h3 className="text-5xl font-manrope font-extrabold text-slate-900 tracking-tighter leading-none">$42.3k</h3>
                     <p className="text-[9px] font-black text-red-500 flex items-center gap-2 mt-4 uppercase tracking-[0.2em] bg-red-50 px-3 py-1.5 rounded-full border border-red-100 w-fit leading-none">
                        <AlertCircle size={12} strokeWidth={3} /> 3 Critical Nodes
                     </p>
                  </div>
                  <div className="w-16 h-16 bg-red-50 rounded-xl flex items-center justify-center border border-red-100 text-red-400 transition-all shadow-sm">
                     <CreditCard size={28} strokeWidth={2.5} />
                  </div>
               </div>
            </div>

            {/* Engagement Yield */}
            <div className="bg-gradient-to-br from-[#020617] via-[#0f172a] to-black rounded-xl p-10 text-white shadow-2xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-bl-[8rem] translate-x-20 -translate-y-20 group-hover:translate-x-10 group-hover:-translate-y-10 transition-all duration-700"></div>
               <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.4em] mb-12 relative z-10 font-inter">Engagement Yield</p>
               <div className="flex items-center justify-between relative z-10">
                  <div>
                     <h3 className="text-5xl font-manrope font-extrabold tracking-tighter text-white">68.4%</h3>
                     <p className="text-[10px] font-black text-[var(--desert-gold)] mt-4 uppercase tracking-[0.3em]">Optimized Cycle</p>
                  </div>
                  <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center border border-white/10 shadow-inner group-hover:scale-110 transition-transform">
                     <TrendingUp size={32} strokeWidth={2} />
                  </div>
               </div>
               <div className="w-full bg-white/10 h-2 rounded-full mt-10 overflow-hidden border border-white/5 shadow-inner">
                  <div className="bg-gradient-to-r from-[var(--desert-gold)] to-amber-300 h-full rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(255,191,0,0.4)]" style={{ width: '68.4%' }}></div>
               </div>
            </div>
         </div>

         {/* Transaction Ledger */}
         <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden relative">
            <div className="p-10 border-b border-slate-100 flex flex-col lg:flex-row items-center justify-between gap-8 bg-slate-50/30">
               <div className="relative w-full lg:w-[480px] group">
                  <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-black transition-colors" size={20} strokeWidth={3} />
                  <input
                     type="text"
                     placeholder="Search transaction ID, customer or package..."
                     className="w-full pl-9 pr-4 py-4 bg-transparent border-b-2 border-slate-100 rounded-none text-sm outline-none focus:border-black text-black transition-all font-black placeholder-slate-300 uppercase tracking-widest"
                  />
               </div>
               <div className="flex items-center gap-4 w-full lg:w-auto">
                  <button className="flex-1 lg:flex-none flex items-center justify-center gap-3 px-8 py-4 bg-white border border-slate-200 rounded-xl text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-black hover:bg-slate-50 transition-all">
                     <Filter size={16} strokeWidth={3} /> Protocol Type
                  </button>
                  <button className="flex-1 lg:flex-none flex items-center justify-center gap-3 px-8 py-4 bg-white border border-slate-200 rounded-xl text-[10px] font-black text-slate-900 uppercase tracking-widest hover:bg-slate-50 transition-all shadow-sm">
                     Fiscal Cycle: 2024
                  </button>
               </div>
            </div>

            <div className="overflow-x-auto">
               <table className="w-full text-left border-collapse">
                  <thead>
                     <tr className="bg-slate-50 border-b border-slate-100">
                        <th className="px-10 py-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Transaction Narrative</th>
                        <th className="px-10 py-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Service Level</th>
                        <th className="px-10 py-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Liquidity Status</th>
                        <th className="px-10 py-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Aggregate Value</th>
                        <th className="px-10 py-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] text-right">Registry Date</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                     {isLoading ? (
                        <tr><td colSpan="5" className="px-10 py-10 text-center text-xs font-black uppercase tracking-widest text-slate-400">Synchronizing Ledger...</td></tr>
                     ) : bookingsToShow.length === 0 ? (
                        <tr><td colSpan="5" className="px-10 py-10 text-center text-xs font-black uppercase tracking-widest text-slate-400">No active protocols found.</td></tr>
                     ) : bookingsToShow.map((booking) => (
                        <tr key={booking.id} className="group hover:bg-slate-50 transition-all cursor-pointer">
                           <td className="px-10 py-10">
                              <div>
                                 <p className="text-xl font-manrope font-black text-slate-900 tracking-tight leading-none mb-3">{booking.customer}</p>
                                 <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.3em] flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-slate-200"></span> ID: {booking.id}
                                 </p>
                              </div>
                           </td>
                           <td className="px-10 py-10">
                              <span className="text-[10px] font-black text-slate-900 bg-white px-5 py-2.5 rounded-xl border border-slate-100 shadow-sm group-hover:border-slate-300 uppercase tracking-widest transition-all">
                                 {booking.package}
                              </span>
                           </td>
                           <td className="px-10 py-10">
                              <div className="flex items-center gap-4">
                                 <div className={`w-3 h-3 rounded-full ${
                                    booking.status === 'Confirmed' ? 'bg-[var(--sacred-emerald)] shadow-[0_0_10px_var(--sacred-emerald)]' : 
                                    booking.status === 'Partial' ? 'bg-[var(--desert-gold)] shadow-[0_0_10px_var(--desert-gold)]' : 
                                    'bg-red-400'
                                 } transition-all`} />
                                 <span className="text-[10px] font-black text-slate-900 uppercase tracking-[0.25em]">{booking.status} Protocol</span>
                              </div>
                           </td>
                           <td className="px-10 py-10">
                              <div className="space-y-3">
                                 <p className="text-2xl font-manrope font-black text-slate-900 tracking-tighter leading-none">${booking.amount.toLocaleString()}</p>
                                 <div className="w-36 bg-slate-100 h-2 rounded-full overflow-hidden border border-slate-200/50">
                                    <div
                                       className={`${booking.status === 'Confirmed' ? 'bg-[var(--sacred-emerald)]' : 'bg-[var(--desert-gold)]'} h-full rounded-full shadow-sm transition-all duration-1000`}
                                       style={{ width: `${(booking.paid / booking.amount) * 100}%` }}
                                    ></div>
                                 </div>
                              </div>
                           </td>
                           <td className="px-10 py-10 text-right">
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-1">{booking.date}</p>
                              <div className="flex items-center justify-end gap-2 text-[var(--desert-gold)] opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0">
                                 <span className="text-[8px] font-black uppercase tracking-widest">View Portfolio</span>
                                 <ArrowUpRight size={12} strokeWidth={3} />
                              </div>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>

            {/* Narrative Footer */}
            <div className="px-10 py-12 bg-slate-50/50 border-t border-slate-100 text-center relative overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/30 pointer-events-none"></div>
               <button className="px-14 py-5 bg-white border border-slate-200 rounded-xl text-[10px] font-black text-slate-900 uppercase tracking-[0.4em] hover:text-[var(--desert-gold)] hover:border-[var(--desert-gold)] hover:shadow-2xl transition-all shadow-sm active:scale-95 relative z-10">
                  Access Full Ledger History
               </button>
            </div>
         </div>
      </div>
   );
};

export default Bookings;
