import React from 'react';
import {
   CreditCard, DollarSign, ArrowUpRight,
   Filter, Download, MoreHorizontal,
   CheckCircle2, Clock, AlertCircle, Search,
   BookOpen, TrendingUp, Calendar
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Bookings = () => {
   const bookings = [
      { id: 'BK-1001', customer: 'Ahmed Raza', package: 'Umrah 15-Day Premium', amount: 5400, paid: 5400, status: 'Confirmed', date: 'Mar 15, 2024' },
      { id: 'BK-1002', customer: 'Fatima Zahra', package: 'Hajj 2024 Economy', amount: 12000, paid: 4500, status: 'Partial', date: 'Mar 12, 2024' },
      { id: 'BK-1003', customer: 'Zubair Ahmed', package: 'Umrah Luxury (Ramadan)', amount: 8200, paid: 0, status: 'Pending', date: 'Mar 10, 2024' },
   ];

   return (
      <div className="space-y-12 animate-in fade-in duration-1000 font-inter">
         {/* Editorial Header */}
         <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-4">
            <div>
               <h1 className="text-[2.5rem] font-manrope font-extrabold text-[var(--on-surface)] tracking-tight">Financial <span className="text-[var(--on-surface-variant)]/30 italic font-light">Ledger</span></h1>
               <p className="mt-2 text-sm font-medium text-[var(--on-surface-variant)] tracking-wide">Tracking sacred investments and operational liquidity.</p>
            </div>
            <div className="flex items-center gap-4">
               <button className="flex items-center gap-2 px-6 py-4 bg-[var(--surface-container-lowest)] border border-[var(--outline-variant)] rounded-2xl text-[10px] font-bold text-[var(--on-surface-variant)] uppercase   hover:text-[var(--on-surface)] transition-all group shadow-sm">
                  <Download size={16} strokeWidth={2} />
                  Journal Export
               </button>
               <Link
                  to="/bookings/add"
                  className="btn-midnight flex items-center gap-2 px-8 py-4 text-[10px] font-extrabold uppercase tracking-[0.25em] shadow-xl shadow-black/10 hover:shadow-2xl transition-all rounded-2xl"
               >
                  <BookOpen size={18} strokeWidth={2.5} />
                  New Booking
               </Link>
            </div>
         </div>

         {/* Financial Bento Matrix */}
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Gross Revenue */}
            <div className="bg-[var(--surface-container-lowest)] rounded-[2.5rem] p-10 border border-[var(--outline-variant)] shadow-sm relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--surface)] rounded-bl-[5rem] translate-x-12 -translate-y-12 group-hover:translate-x-6 group-hover:-translate-y-6 transition-transform"></div>
               <p className="text-[10px] font-extrabold text-[var(--on-surface-variant)] uppercase tracking-[0.25em] mb-10 relative z-10">Inflow Aggregate</p>
               <div className="flex items-end justify-between relative z-10">
                  <div>
                     <h3 className="text-5xl font-manrope font-extrabold text-[var(--on-surface)] tracking-tighter">$284.5k</h3>
                     <p className="text-[10px] font-bold text-[var(--sacred-emerald)] flex items-center gap-1 mt-2 uppercase tracking-widest">
                        <TrendingUp size={14} /> +12% Efficiency
                     </p>
                  </div>
                  <div className="p-4 bg-[var(--surface)] rounded-2xl group-hover:bg-white group-hover:shadow-lg transition-all">
                     <DollarSign size={24} className="text-[var(--on-surface)]" />
                  </div>
               </div>
            </div>

            {/* Pending Collection */}
            <div className="bg-[var(--surface-container-lowest)] rounded-[2.5rem] p-10 border border-[var(--outline-variant)] shadow-sm relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-bl-[5rem] translate-x-12 -translate-y-12 group-hover:translate-x-6 group-hover:-translate-y-6 transition-transform"></div>
               <p className="text-[10px] font-extrabold text-[var(--on-surface-variant)] uppercase tracking-[0.25em] mb-10 relative z-10">Outflow Risk</p>
               <div className="flex items-end justify-between relative z-10">
                  <div>
                     <h3 className="text-5xl font-manrope font-extrabold text-[var(--on-surface)] tracking-tighter">$42.3k</h3>
                     <p className="text-[10px] font-bold text-red-500 flex items-center gap-1 mt-2 uppercase tracking-widest">
                        <AlertCircle size={14} /> Critical Collection
                     </p>
                  </div>
                  <div className="p-4 bg-red-500/5 rounded-2xl group-hover:bg-white group-hover:shadow-lg transition-all text-red-400">
                     <CreditCard size={24} />
                  </div>
               </div>
            </div>

            {/* Conversion Metrics */}
            <div className="bg-[var(--grad-black)] rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-[5rem] translate-x-12 -translate-y-12 group-hover:translate-x-6 group-hover:-translate-y-6 transition-transform"></div>
               <p className="text-[10px] font-extrabold text-white/40 uppercase tracking-[0.25em] mb-10 relative z-10">Engagement Yield</p>
               <div className="flex items-center justify-between relative z-10">
                  <div>
                     <h3 className="text-5xl font-manrope font-extrabold tracking-tighter">68.4%</h3>
                     <p className="text-[10px] font-bold text-green-400 mt-2 uppercase tracking-widest">Optimized Conversion</p>
                  </div>
                  <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center border border-white/10">
                     <TrendingUp size={24} />
                  </div>
               </div>
               <div className="w-full bg-white/10 h-1.5 rounded-full mt-8 overflow-hidden">
                  <div className="bg-green-400 h-full rounded-full" style={{ width: '68.4%' }}></div>
               </div>
            </div>
         </div>

         {/* Transaction Ledger */}
         <div className="bg-[var(--surface-container-lowest)] rounded-[3rem] shadow-sm border border-[var(--outline-variant)] overflow-hidden">
            <div className="p-10 border-b border-[var(--outline-variant)] flex flex-col lg:flex-row items-center justify-between gap-6">
               <div className="relative w-full lg:w-[480px] group">
                  <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-[var(--on-surface-variant)] group-focus-within:text-[var(--on-surface)] transition-colors" size={20} />
                  <input
                     type="text"
                     placeholder="Search transaction ID, customer or package..."
                     className="w-full pl-9 pr-4 py-3 bg-transparent border-b border-[var(--outline-variant)] rounded-none text-sm outline-none focus:border-[var(--on-surface)] text-[var(--on-surface)] transition-all font-medium placeholder-[var(--on-surface-variant)]"
                  />
               </div>
               <div className="flex items-center gap-4">
                  <button className="flex items-center gap-2 px-6 py-3 bg-[var(--surface-container-low)]   rounded-xl text-[10px] font-bold text-[var(--on-surface-variant)] uppercase tracking-widest hover:bg-[var(--surface-container-high)] transition-all">
                     <Filter size={14} />
                     Journal Type
                  </button>
                  <button className="flex items-center gap-2 px-6 py-3 bg-[var(--surface-container-low)]   rounded-xl text-[10px] font-bold text-[var(--on-surface-variant)] uppercase tracking-widest hover:bg-[var(--surface-container-high)] transition-all">
                     Financial Year
                  </button>
               </div>
            </div>

            <div className="overflow-x-auto">
               <table className="w-full text-left border-collapse">
                  <thead>
                     <tr className="bg-[var(--surface)]">
                        <th className="px-10 py-6 text-[10px] font-manrope font-extrabold text-[var(--on-surface-variant)] uppercase tracking-[0.25em]">Transaction Narrative</th>
                        <th className="px-10 py-6 text-[10px] font-manrope font-extrabold text-[var(--on-surface-variant)] uppercase tracking-[0.25em]">Service Level</th>
                        <th className="px-10 py-6 text-[10px] font-manrope font-extrabold text-[var(--on-surface-variant)] uppercase tracking-[0.25em]">Liquidity Status</th>
                        <th className="px-10 py-6 text-[10px] font-manrope font-extrabold text-[var(--on-surface-variant)] uppercase tracking-[0.25em]">Aggregate Value</th>
                        <th className="px-10 py-6 text-[10px] font-manrope font-extrabold text-[var(--on-surface-variant)] uppercase tracking-[0.25em] text-right">Reference Date</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-transparent">
                     {bookings.map((booking) => (
                        <tr key={booking.id} className="group hover:bg-[var(--surface-container-high)] transition-all cursor-pointer">
                           <td className="px-10 py-8">
                              <div>
                                 <p className="text-sm font-manrope font-extrabold text-[var(--on-surface)] tracking-tight">{booking.customer}</p>
                                 <p className="text-[10px] text-[var(--on-surface-variant)] font-bold uppercase tracking-widest mt-1.5 font-inter">{booking.id}</p>
                              </div>
                           </td>
                           <td className="px-10 py-8">
                              <span className="text-[10px] font-extrabold text-[var(--on-surface-variant)] bg-[var(--surface)] px-3 py-1.5   rounded-xl border border-[var(--outline-variant)] group-hover:bg-white uppercase tracking-widest">
                                 {booking.package}
                              </span>
                           </td>
                           <td className="px-10 py-8">
                              <div className="flex items-center gap-3">
                                 {booking.status === 'Confirmed' ? (
                                    <div className="w-2.5 h-2.5 rounded-full bg-[var(--sacred-emerald)] shadow-lg shadow-emerald-500/20" />
                                 ) : booking.status === 'Partial' ? (
                                    <div className="w-2.5 h-2.5 rounded-full bg-[var(--desert-gold)] shadow-lg shadow-gold-500/20" />
                                 ) : (
                                    <div className="w-2.5 h-2.5 rounded-full bg-red-400 shadow-lg shadow-red-400/20" />
                                 )}
                                 <span className="text-[10px] font-extrabold text-[var(--on-surface)] uppercase tracking-widest">{booking.status}</span>
                              </div>
                           </td>
                           <td className="px-10 py-8">
                              <div>
                                 <p className="text-base font-manrope font-extrabold text-[var(--on-surface)] tracking-tight">${booking.amount.toLocaleString()}</p>
                                 <div className="w-32 bg-[var(--surface-container-low)] h-1 rounded-full mt-2.5 overflow-hidden group-hover:bg-white transition-colors">
                                    <div
                                       className={`${booking.status === 'Confirmed' ? 'bg-[var(--sacred-emerald)]' : 'bg-[var(--desert-gold)]'} h-full rounded-full`}
                                       style={{ width: `${(booking.paid / booking.amount) * 100}%` }}
                                    ></div>
                                 </div>
                              </div>
                           </td>
                           <td className="px-10 py-8 text-right">
                              <p className="text-[10px] font-bold text-[var(--on-surface-variant)] uppercase tracking-widest">{booking.date}</p>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>

            {/* Narrative Footer */}
            <div className="px-10 py-10 bg-[var(--surface)] border-t border-[var(--outline-variant)] text-center">
               <button className="px-12 py-4 bg-[var(--surface-container-lowest)] border border-[var(--outline-variant)] rounded-2xl text-[10px] font-extrabold text-[var(--on-surface-variant)] uppercase tracking-[0.25em] hover:text-[var(--on-surface)] hover:shadow-xl transition-all shadow-sm active:scale-95">
                  Illuminate Full Financial History
               </button>
            </div>
         </div>
      </div>
   );
};

export default Bookings;
