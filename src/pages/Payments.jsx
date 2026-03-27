import React from 'react';
import {
   CreditCard, DollarSign, ArrowUpRight,
   ArrowDownLeft, Filter, Download,
   Search, MoreHorizontal, Calendar,
   Wallet, Landmark, Receipt, Plus,
   TrendingUp,
   AlertCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Payments = () => {
   const transactions = [
      { id: 'TRX-9001', customer: 'Ahmed Raza', method: 'Bank Transfer', amount: 5400, type: 'Credit', date: 'Mar 25, 2024', status: 'Verified' },
      { id: 'TRX-9002', customer: 'Fatima Zahra', method: 'Cash', amount: 4500, type: 'Credit', date: 'Mar 22, 2024', status: 'Processing' },
      { id: 'TRX-9003', customer: 'Vendor: Saudi Aviation', method: 'Online Payment', amount: 12000, type: 'Debit', date: 'Mar 20, 2024', status: 'Completed' },
      { id: 'TRX-9004', customer: 'Zubair Ahmed', method: 'Bank Transfer', amount: 2000, type: 'Credit', date: 'Mar 18, 2024', status: 'Verified' },
   ];

   return (
      <div className="space-y-12 animate-in fade-in duration-1000 font-inter pb-20">
         {/* Premium Header */}
         <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 pb-8 border-b border-slate-200">
            <div className="space-y-4">
               <div className="flex items-center gap-3 text-[var(--desert-gold)] uppercase tracking-[0.4em] text-[9px] font-black opacity-80">
                  <Landmark size={14} strokeWidth={3} />
                  Treasury Reconciliation: Phase III
               </div>
               <h1 className="text-5xl font-manrope font-extrabold text-slate-900 tracking-tighter leading-tight">
                  Multi-Ledger <span className="text-slate-300 italic font-light font-manrope">Verification</span>
               </h1>
               <p className="text-slate-500 text-sm font-medium max-w-xl leading-relaxed">
                  Real-time reconciliation of pilgrim credits, operational debits, and global vendor settlements across the Al Bayan network.
               </p>
            </div>
            <div className="flex items-center gap-4">
               <button className="flex items-center gap-3 px-8 py-5 bg-white border border-slate-200 rounded-xl text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-black hover:border-slate-300 transition-all group shadow-sm">
                  <Receipt size={18} strokeWidth={3} /> Treasury Export
               </button>
               <Link
                  to="/payments/add"
                  className="px-10 py-5 bg-black text-white rounded-xl text-[10px] font-black uppercase tracking-[0.4em] shadow-xl hover:bg-[var(--desert-gold)] hover:text-black transition-all flex items-center gap-3"
               >
                  <Plus size={18} strokeWidth={3} />
                  Record Entry
               </Link>
            </div>
         </div>

         {/* Balance Bento Matrix */}
         <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Net Position */}
            <div className="bg-white rounded-xl p-10 border border-slate-200 shadow-sm relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-[5rem] translate-x-12 -translate-y-12 group-hover:translate-x-6 group-hover:-translate-y-6 transition-all duration-700"></div>
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-12 relative z-10 font-inter">Net Cash Position</p>
               <div className="flex items-end justify-between relative z-10">
                  <div>
                     <h3 className="text-5xl font-manrope font-extrabold text-slate-900 tracking-tighter leading-none">$142.8k</h3>
                     <p className="text-[9px] font-black text-slate-400 mt-4 uppercase tracking-[0.2em] bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100 w-fit">
                        Verified Liquidity
                     </p>
                  </div>
                  <div className="w-16 h-16 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-100 group-hover:bg-black group-hover:text-white transition-all shadow-sm">
                     <Wallet size={28} strokeWidth={2} />
                  </div>
               </div>
            </div>

            {/* Monthly Credits */}
            <div className="bg-white rounded-xl p-10 border border-slate-200 shadow-sm relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-[5rem] translate-x-12 -translate-y-12 transition-transform duration-700"></div>
               <p className="text-[10px] font-black text-[var(--sacred-emerald)] uppercase tracking-[0.4em] mb-12 relative z-10 font-inter">Inbound Receipts</p>
               <div className="flex items-end justify-between relative z-10">
                  <div>
                     <h3 className="text-5xl font-manrope font-extrabold text-slate-900 tracking-tighter leading-none">$28.4k</h3>
                     <p className="text-[9px] font-black text-[var(--sacred-emerald)] flex items-center gap-2 mt-4 uppercase tracking-[0.2em] bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100 w-fit">
                        <TrendingUp size={12} strokeWidth={3} /> +8% Velocity
                     </p>
                  </div>
                  <div className="w-16 h-16 bg-emerald-50 rounded-xl flex items-center justify-center border border-emerald-100 text-[var(--sacred-emerald)] transition-all shadow-sm">
                     <ArrowDownLeft size={28} strokeWidth={2.5} />
                  </div>
               </div>
            </div>

            {/* Monthly Debits */}
            <div className="bg-white rounded-xl p-10 border border-slate-200 shadow-sm relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-red-50 rounded-bl-[5rem] translate-x-12 -translate-y-12 transition-transform duration-700"></div>
               <p className="text-[10px] font-black text-red-400 uppercase tracking-[0.4em] mb-12 relative z-10 font-inter">Outbound Debits</p>
               <div className="flex items-end justify-between relative z-10">
                  <div>
                     <h3 className="text-5xl font-manrope font-extrabold text-slate-900 tracking-tighter leading-none">$12.2k</h3>
                     <p className="text-[9px] font-black text-red-500 flex items-center gap-2 mt-4 uppercase tracking-[0.2em] bg-red-50 px-3 py-1.5 rounded-full border border-red-100 w-fit">
                        <AlertCircle size={12} strokeWidth={3} /> Pending Audit
                     </p>
                  </div>
                  <div className="w-16 h-16 bg-red-50 rounded-xl flex items-center justify-center border border-red-100 text-red-400 transition-all shadow-sm">
                     <ArrowUpRight size={28} strokeWidth={2.5} />
                  </div>
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
                     placeholder="Search transaction, entity or amount..."
                     className="w-full pl-9 pr-4 py-4 bg-transparent border-b-2 border-slate-100 rounded-none text-sm outline-none focus:border-black text-black transition-all font-black placeholder-slate-300 uppercase tracking-widest"
                  />
               </div>
               <div className="flex items-center gap-4 w-full lg:w-auto">
                  <button className="flex-1 lg:flex-none flex items-center justify-center gap-3 px-8 py-4 bg-white border border-slate-200 rounded-xl text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-black hover:bg-slate-50 transition-all">
                     <Calendar size={16} strokeWidth={3} /> Execution Date
                  </button>
                  <button className="flex-1 lg:flex-none flex items-center justify-center gap-3 px-8 py-4 bg-white border border-slate-200 rounded-xl text-[10px] font-black text-slate-900 uppercase tracking-widest hover:bg-slate-50 transition-all shadow-sm">
                     <Filter size={16} strokeWidth={3} /> Journal Class
                  </button>
               </div>
            </div>

            <div className="overflow-x-auto">
               <table className="w-full text-left border-collapse">
                  <thead>
                     <tr className="bg-slate-50 border-b border-slate-100">
                        <th className="px-10 py-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Transaction Narrative</th>
                        <th className="px-10 py-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Methodology</th>
                        <th className="px-10 py-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Flow Class</th>
                        <th className="px-10 py-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Aggregate Value</th>
                        <th className="px-10 py-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] text-right">Verification</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                     {transactions.map((trx) => (
                        <tr key={trx.id} className="group hover:bg-slate-50 transition-all cursor-pointer">
                           <td className="px-10 py-10">
                              <div>
                                 <p className="text-xl font-manrope font-black text-slate-900 tracking-tight leading-none mb-3">{trx.customer}</p>
                                 <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.3em] flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-slate-200"></span> ID: {trx.id}
                                 </p>
                              </div>
                           </td>
                           <td className="px-10 py-10">
                              <div className="flex items-center gap-4">
                                 <Landmark size={18} className="text-slate-300 group-hover:text-black transition-colors" strokeWidth={2.5} />
                                 <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">{trx.method}</span>
                              </div>
                           </td>
                           <td className="px-10 py-10">
                              <span className={`text-[9px] font-black uppercase tracking-[0.2em] px-5 py-2 rounded-xl shadow-sm border ${
                                 trx.type === 'Credit' ? 'bg-emerald-50 text-[var(--sacred-emerald)] border-emerald-100' : 'bg-red-50 text-red-500 border-red-100'
                              }`}>
                                 {trx.type} Entry
                              </span>
                           </td>
                           <td className="px-10 py-10">
                              <p className={`text-2xl font-manrope font-black tracking-tighter leading-none ${trx.type === 'Credit' ? 'text-[var(--sacred-emerald)]' : 'text-red-500'}`}>
                                 {trx.type === 'Credit' ? '+' : '-'}${trx.amount.toLocaleString()}
                              </p>
                           </td>
                           <td className="px-10 py-10 text-right">
                              <div className="flex flex-col items-end gap-3">
                                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">{trx.date}</p>
                                 <div className="flex items-center gap-3 bg-white px-3 py-1.5 rounded-full border border-slate-100 shadow-sm">
                                    <div className={`w-2 h-2 rounded-full ${trx.status === 'Verified' ? 'bg-[var(--sacred-emerald)]' : trx.status === 'Processing' ? 'bg-amber-400' : 'bg-slate-900 shadow-[0_0_8px_black]'}`}></div>
                                    <span className="text-[10px] font-black text-slate-900 uppercase tracking-[0.1em]">{trx.status}</span>
                                 </div>
                              </div>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>

            {/* Pagination/Load Footer */}
            <div className="px-10 py-12 bg-slate-50/50 border-t border-slate-100 text-center relative overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/30 pointer-events-none"></div>
               <button className="px-14 py-5 bg-white border border-slate-200 rounded-xl text-[10px] font-black text-slate-900 uppercase tracking-[0.4em] hover:text-[var(--desert-gold)] hover:border-[var(--desert-gold)] hover:shadow-2xl transition-all shadow-sm active:scale-95 relative z-10">
                  Reveal Historical Journal Entries
               </button>
            </div>
         </div>
      </div>
   );
};

export default Payments;
