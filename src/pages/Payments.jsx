import React from 'react';
import {
   CreditCard, DollarSign, ArrowUpRight,
   ArrowDownLeft, Filter, Download,
   Search, MoreHorizontal, Calendar,
   Wallet, Landmark, Receipt, Plus
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
      <div className="space-y-12 animate-in fade-in duration-1000 font-inter">
         {/* Editorial Header */}
         <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-4">
            <div>
               <h1 className="text-[2.5rem] font-manrope font-extrabold text-[var(--on-surface)] tracking-tight">Multi-Ledger <span className="text-[var(--on-surface-variant)]/30 italic font-light">Verification</span></h1>
               <p className="mt-2 text-sm font-medium text-[var(--on-surface-variant)] tracking-wide">Real-time reconciliation of credits, debits, and vendor settlements.</p>
            </div>
            <div className="flex items-center gap-4">
               <button className="flex items-center gap-2 px-6 py-4 bg-[var(--surface-container-lowest)] border border-[var(--outline-variant)] rounded-2xl text-[10px] font-bold text-[var(--on-surface-variant)] uppercase   hover:text-[var(--on-surface)] transition-all group shadow-sm">
                  <Receipt size={16} strokeWidth={2} />
                  Treasury Export
               </button>
               <button
                  className="btn-midnight flex items-center gap-2 px-8 py-4 text-[10px] font-extrabold uppercase tracking-[0.25em] shadow-xl shadow-black/10 hover:shadow-2xl transition-all rounded-2xl"
               >
                  <Plus size={18} strokeWidth={2.5} />
                  Record Transaction
               </button>
            </div>
         </div>

         {/* Balance Bento Matrix */}
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Net Position */}
            <div className="bg-[var(--surface-container-lowest)] rounded-[2.5rem] p-10 border border-[var(--outline-variant)] shadow-sm relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--surface)] rounded-bl-[5rem] translate-x-12 -translate-y-12 group-hover:translate-x-6 group-hover:-translate-y-6 transition-transform"></div>
               <p className="text-[10px] font-extrabold text-[var(--on-surface-variant)] uppercase tracking-[0.25em] mb-10 relative z-10">Net Cash Position</p>
               <div className="flex items-end justify-between relative z-10">
                  <h3 className="text-5xl font-manrope font-extrabold text-[var(--on-surface)] tracking-tighter">$142.8k</h3>
                  <div className="p-4 bg-[var(--surface)] rounded-2xl group-hover:bg-white group-hover:shadow-lg transition-all text-[var(--on-surface)]">
                     <Wallet size={24} strokeWidth={1.5} />
                  </div>
               </div>
            </div>

            {/* Monthly Credits */}
            <div className="bg-[var(--surface-container-lowest)] rounded-[2.5rem] p-10 border border-[var(--outline-variant)] shadow-sm relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--sacred-emerald)]/5 rounded-bl-[5rem] translate-x-12 -translate-y-12 group-hover:translate-x-6 group-hover:-translate-y-6 transition-transform"></div>
               <p className="text-[10px] font-extrabold text-[var(--sacred-emerald)] uppercase tracking-[0.25em] mb-10 relative z-10 font-bold">Monthly Credits</p>
               <div className="flex items-end justify-between relative z-10">
                  <h3 className="text-5xl font-manrope font-extrabold text-[var(--on-surface)] tracking-tighter">$28.4k</h3>
                  <div className="p-4 bg-[var(--sacred-emerald)]/5 text-[var(--sacred-emerald)] rounded-2xl group-hover:bg-white group-hover:shadow-lg transition-all">
                     <ArrowDownLeft size={24} strokeWidth={1.5} />
                  </div>
               </div>
            </div>

            {/* Monthly Debits */}
            <div className="bg-[var(--surface-container-lowest)] rounded-[2.5rem] p-10 border border-[var(--outline-variant)] shadow-sm relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-red-50 rounded-bl-[5rem] translate-x-12 -translate-y-12 group-hover:translate-x-6 group-hover:-translate-y-6 transition-transform"></div>
               <p className="text-[10px] font-extrabold text-red-400 uppercase tracking-[0.25em] mb-10 relative z-10 font-bold">Monthly Debits</p>
               <div className="flex items-end justify-between relative z-10">
                  <h3 className="text-5xl font-manrope font-extrabold text-[var(--on-surface)] tracking-tighter">$12.2k</h3>
                  <div className="p-4 bg-red-50 text-red-500 rounded-2xl group-hover:bg-white group-hover:shadow-lg transition-all">
                     <ArrowUpRight size={24} strokeWidth={1.5} />
                  </div>
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
                     placeholder="Search transaction, entity or amount..."
                     className="w-full pl-9 pr-4 py-3 bg-transparent border-b border-[var(--outline-variant)] rounded-none text-sm outline-none focus:border-[var(--on-surface)] text-[var(--on-surface)] transition-all font-medium placeholder-[var(--on-surface-variant)]"
                  />
               </div>
               <div className="flex items-center gap-4">
                  <button className="flex items-center gap-2 px-6 py-3 bg-[var(--surface-container-low)]   rounded-xl text-[10px] font-bold text-[var(--on-surface-variant)] uppercase tracking-widest hover:bg-[var(--surface-container-high)] transition-all">
                     <Calendar size={14} />
                     Timeline Filter
                  </button>
                  <button className="flex items-center gap-2 px-6 py-3 bg-[var(--surface-container-low)]   rounded-xl text-[10px] font-bold text-[var(--on-surface-variant)] uppercase tracking-widest hover:bg-[var(--surface-container-high)] transition-all">
                     <Filter size={14} />
                     Journal Type
                  </button>
               </div>
            </div>

            <div className="overflow-x-auto">
               <table className="w-full text-left border-collapse">
                  <thead>
                     <tr className="bg-[var(--surface)]">
                        <th className="px-10 py-6 text-[10px] font-manrope font-extrabold text-[var(--on-surface-variant)] uppercase tracking-[0.25em]">Transaction Narrative</th>
                        <th className="px-10 py-6 text-[10px] font-manrope font-extrabold text-[var(--on-surface-variant)] uppercase tracking-[0.25em]">Methodology</th>
                        <th className="px-10 py-6 text-[10px] font-manrope font-extrabold text-[var(--on-surface-variant)] uppercase tracking-[0.25em]">Flow Class</th>
                        <th className="px-10 py-6 text-[10px] font-manrope font-extrabold text-[var(--on-surface-variant)] uppercase tracking-[0.25em]">Aggregate Value</th>
                        <th className="px-10 py-6 text-[10px] font-manrope font-extrabold text-[var(--on-surface-variant)] uppercase tracking-[0.25em] text-right">Cadence Status</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-transparent">
                     {transactions.map((trx) => (
                        <tr key={trx.id} className="group hover:bg-[var(--surface-container-high)] transition-all cursor-pointer">
                           <td className="px-10 py-8">
                              <div>
                                 <p className="text-sm font-manrope font-extrabold text-[var(--on-surface)] tracking-tight">{trx.customer}</p>
                                 <p className="text-[10px] text-[var(--on-surface-variant)] font-bold uppercase tracking-widest mt-1.5 font-inter">{trx.id}</p>
                              </div>
                           </td>
                           <td className="px-10 py-8">
                              <div className="flex items-center gap-3">
                                 <Landmark size={14} className="text-[var(--on-surface-variant)]" />
                                 <span className="text-[10px] font-extrabold text-[var(--on-surface-variant)] uppercase tracking-widest">{trx.method}</span>
                              </div>
                           </td>
                           <td className="px-10 py-8">
                              <span className={`text-[9px] font-extrabold uppercase tracking-[0.15em] px-4 py-2 rounded-full shadow-sm ${trx.type === 'Credit' ? 'bg-[var(--grad-green)] text-white' : 'bg-red-500 text-white'}`}>
                                 {trx.type}
                              </span>
                           </td>
                           <td className="px-10 py-8">
                              <p className={`text-base font-manrope font-extrabold tracking-tight ${trx.type === 'Credit' ? 'text-[var(--sacred-emerald)]' : 'text-red-600'}`}>
                                 {trx.type === 'Credit' ? '+' : '-'}${trx.amount.toLocaleString()}
                              </p>
                           </td>
                           <td className="px-10 py-8 text-right">
                              <div className="flex flex-col items-end gap-1.5">
                                 <p className="text-[10px] font-bold text-[var(--on-surface-variant)] uppercase tracking-widest">{trx.date}</p>
                                 <div className="flex items-center gap-2">
                                    <div className={`w-1.5 h-1.5 rounded-full ${trx.status === 'Verified' ? 'bg-[var(--sacred-emerald)]' : trx.status === 'Processing' ? 'bg-[var(--desert-gold)]' : 'bg-[var(--on-surface)]'}`}></div>
                                    <span className="text-[9px] font-extrabold text-[var(--on-surface-variant)] uppercase tracking-widest">{trx.status}</span>
                                 </div>
                              </div>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>

            {/* Pagination/Load Footer */}
            <div className="px-10 py-10 bg-[var(--surface)] border-t border-[var(--outline-variant)] text-center">
               <button className="px-12 py-4 bg-[var(--surface-container-lowest)] border border-[var(--outline-variant)] rounded-2xl text-[10px] font-extrabold text-[var(--on-surface-variant)] uppercase tracking-[0.25em] hover:text-[var(--on-surface)] hover:shadow-xl transition-all shadow-sm active:scale-95">
                  Reveal Historical Journal
               </button>
            </div>
         </div>
      </div>
   );
};

export default Payments;
