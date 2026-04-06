import React, { useState, useEffect } from 'react';
import {
   ArrowLeft, CreditCard, DollarSign,
   Calendar, Landmark, Receipt,
   Save, Info, History, User,
   CheckCircle2, Clock
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import usePaymentStore from '../store/usePaymentStore';
import useBookingStore from '../store/useBookingStore';
import useMasterTypeStore from '../store/useMasterTypeStore';
import toast from 'react-hot-toast';

const AddPayment = () => {
   const navigate = useNavigate();
   const { addPayment, isLoading } = usePaymentStore();
   const { bookings, fetchBookings } = useBookingStore();
   const { masterData, fetchMasterData } = useMasterTypeStore();
   
   const [formData, setFormData] = useState({
      booking_id: '',
      amount: '',
      payment_method: '',
      payment_date: new Date().toISOString().split('T')[0],
      reference: '',
      notes: ''
   });

   useEffect(() => {
      fetchBookings();
      fetchMasterData();
   }, [fetchBookings, fetchMasterData]);

   const handleSubmit = async () => {
      if (!formData.booking_id || !formData.amount) {
         toast.error('Booking reference and aggregate value are mandatory.');
         return;
      }

      try {
         console.log('Submission Payload (AddPayment):', formData);
         await addPayment(formData);
         toast.success('Treasury entry officialized.');
         navigate('/payments');
      } catch (err) {
         toast.error('Ledger failure: ' + err.message);
      }
   };


   const paymentHistory = [
      { date: 'Mar 15, 2024', amount: 2500, method: 'Cash', status: 'Verified' },
      { date: 'Feb 28, 2024', amount: 1500, method: 'Bank Transfer', status: 'Verified' },
   ];

   return (
      <div className="font-inter  space-y-12 animate-in slide-in-from-bottom-8 duration-1000 pb-20">
         {/* Premium Header */}
         <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 border-b border-slate-200 pb-8">
            <Link to="/payments" className="flex items-center gap-3 text-slate-400 hover:text-slate-900 transition-all group">
               <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 group-hover:shadow-md transition-all">
                  <ArrowLeft size={18} strokeWidth={2.5} />
               </div>
               <span className="text-[10px] font-black uppercase tracking-[0.25em]">Audit Treasury</span>
            </Link>
            <div className="text-center">
               <h1 className="text-3xl font-manrope font-extrabold text-slate-900 tracking-tighter uppercase">Revenue </h1>
               <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.3em] mt-2 italic opacity-60">Al Bayan Financial Protocol v2.4</p>
            </div>
            <button
               onClick={handleSubmit}
               disabled={isLoading}
               className={`px-10 py-5 bg-black text-white rounded-xl font-black text-[10px] uppercase tracking-[0.3em] shadow-xl hover:bg-[var(--desert-gold)] hover:text-black transition-all flex items-center gap-3 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
               <Save size={18} strokeWidth={2.5} />
               {isLoading ? 'Officializing...' : 'Confirm Receipt'}
            </button>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Sidebar: Financial Context */}
            <div className="lg:col-span-4 space-y-10">
               {/* Ledger Balance Card */}
               <div className="bg-gradient-to-br from-[#020617] via-[#0f172a] to-black rounded-xl p-10 text-white shadow-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-[5rem] group-hover:scale-110 transition-transform"></div>
                  <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em] mb-12 relative z-10">Real-time Balance</p>

                  {(() => {
                     const selectedBooking = bookings?.find((b) => b.id.toString() === formData.booking_id);
                     const inflowTotal = selectedBooking ? parseFloat(selectedBooking.paid_amount || 0) : 0;
                     const totalAmount = selectedBooking ? parseFloat(selectedBooking.total_amount || selectedBooking.amount || 0) : 0;
                     const outstanding = Math.max(0, totalAmount - inflowTotal);

                     let customerDisplay = 'No Selection';
                     if (selectedBooking) {
                        const c = selectedBooking.customer;
                        const name = c && typeof c === 'object' ? (c.firstName || c.first_name || c.name || 'Customer') : (c || 'Customer');
                        customerDisplay = `${name} (BK-${selectedBooking.id})`;
                     }

                     return (
                        <div className="space-y-10 relative z-10">
                           <div className="flex items-center justify-between">
                              <span className="text-xs font-medium text-white/40 uppercase tracking-widest">Outstanding</span>
                              <span className="text-2xl font-manrope font-black tracking-tight text-white">${outstanding.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                           </div>
                           <div className="flex items-center justify-between">
                              <span className="text-xs font-medium text-white/40 uppercase tracking-widest">Inflow Total</span>
                              <span className="text-2xl font-manrope font-black text-[var(--sacred-emerald)] tracking-tight">${inflowTotal.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                           </div>
                           <div className="h-px bg-white/10 my-6"></div>
                           <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center border border-white/10 text-[var(--desert-gold)]">
                                 <User size={20} strokeWidth={2.5} />
                              </div>
                              <div>
                                 <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 mb-1">For Account</p>
                                 <p className="text-xs font-black text-white tracking-tight uppercase">{customerDisplay}</p>
                              </div>
                           </div>
                        </div>
                     );
                  })()}
               </div>

               {/* Historical Feed */}
               <div className="bg-white rounded-xl p-10 border border-slate-200 shadow-sm relative overflow-hidden group">
                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-10 flex items-center gap-3">
                     <History size={16} strokeWidth={3} className="text-black" /> Payment History
                  </h3>
                  <div className="space-y-8">
                     {paymentHistory.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-start border-l-2 border-slate-100 pl-6 group/item hover:border-black transition-all">
                           <div>
                              <p className="text-xs font-black text-slate-900 leading-none">${item.amount.toLocaleString()}</p>
                              <p className="text-[9px] text-slate-400 uppercase tracking-widest mt-2">{item.date}</p>
                           </div>
                           <div className="flex items-center gap-2">
                              {item.status === 'Verified' ? (
                                 <CheckCircle2 size={12} className="text-[var(--sacred-emerald)]" />
                              ) : (
                                 <Clock size={12} className="text-amber-500" />
                              )}
                              <span className="text-[8px] font-black text-slate-300 uppercase tracking-tighter">{item.method}</span>
                           </div>
                        </div>
                     ))}
                  </div>
                  <button className="w-full mt-10 py-4 bg-slate-50 border border-slate-100 rounded-xl text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] hover:bg-black hover:text-white transition-all shadow-sm">
                     View All Ledger Entries
                  </button>
               </div>
            </div>

            {/* Entry Form */}
            <div className="lg:col-span-8 space-y-10">
               {/* Primary Attributes */}
               <div className="bg-white rounded-xl p-12 shadow-sm border border-slate-200 group relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-[5rem] translate-x-12 -translate-y-12"></div>
                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-12 flex items-center gap-3 relative z-10">
                     <Landmark size={18} strokeWidth={3} className="text-[var(--desert-gold)]" /> Allocation Details
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-16 relative z-10">
                     <div className="group">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 block ml-1">Registry Selection (Booking)</label>
                        <div className="relative border-b-2 border-slate-100 group-focus-within:border-black transition-all pb-4">
                           <select
                              className="w-full bg-transparent text-lg font-manrope font-black text-slate-900 outline-none appearance-none cursor-pointer"
                              value={formData.booking_id}
                              onChange={(e) => setFormData({ ...formData, booking_id: e.target.value })}
                           >
                              <option value="" className="bg-white">Query Booking ...</option>
                               {(() => {
                                 const bookingsToShow = Array.isArray(bookings) ? bookings : Object.values(bookings || {});
                                 return bookingsToShow.map((booking) => {
                                    const customerName = typeof booking.customer === 'object' 
                                       ? (booking.customer?.firstName || booking.customer?.first_name || booking.customer?.name || 'Customer') 
                                       : (booking.customer || 'Customer');
                                    return (
                                       <option key={booking.id} value={booking.id} className="bg-white">
                                          BK-{booking.id} ({customerName})
                                       </option>
                                    );
                                 });
                              })()}
                           </select>
                        </div>
                     </div>
                     <div className="group">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 block ml-1">Liquidity Conduit</label>
                        <div className="relative border-b-2 border-slate-100 group-focus-within:border-black transition-all pb-4">
                           <select
                              className="w-full bg-transparent text-lg font-manrope font-black text-slate-900 outline-none appearance-none cursor-pointer"
                              value={formData.payment_method}
                              onChange={(e) => setFormData({ ...formData, payment_method: e.target.value })}
                           >
                              <option value="" className="bg-white">Select Conduit ...</option>
                              {(masterData?.billingpaymentstatus || []).map((method) => {
                                 const label = method.name || method;
                                 const value = method.id || method;
                                 return (
                                    <option key={value} value={value} className="bg-white">
                                       {label}
                                    </option>
                                 );
                              })}
                           </select>
                        </div>
                     </div>
                  </div>
               </div>

               {/* Financial Attributes */}
               <div className="bg-white rounded-xl p-12 shadow-sm border border-slate-200 group relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-[5rem] translate-x-12 -translate-y-12"></div>
                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-12 flex items-center gap-3 relative z-10">
                     <DollarSign size={18} strokeWidth={3} className="text-[var(--desert-gold)]" /> Inflow Capital
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-16 relative z-10">
                     <div className="group">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 block ml-1">Receipt Valuation</label>
                        <div className="relative border-b-2 border-slate-100 group-focus-within:border-[var(--sacred-emerald)] transition-all pb-4 flex items-center justify-between">
                           <input
                              type="number"
                              placeholder="0,000.00"
                              className="w-full bg-transparent text-3xl font-manrope font-black text-[var(--sacred-emerald)] outline-none tracking-tighter"
                              value={formData.amount}
                              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                           />
                           <DollarSign size={24} className="text-[var(--sacred-emerald)]" strokeWidth={3} />
                        </div>
                     </div>
                     <div className="group">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 block ml-1">Execution Date</label>
                        <div className="relative border-b-2 border-slate-100 group-focus-within:border-black transition-all pb-4 flex items-center justify-between">
                           <input
                              type="date"
                              className="w-full bg-transparent text-lg font-manrope font-black text-slate-900 outline-none"
                              value={formData.payment_date}
                              onChange={(e) => setFormData({ ...formData, payment_date: e.target.value })}
                           />
                        </div>
                     </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-16 relative z-10">
                     <div className="group">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 block ml-1">Reference Index (Check/TX ID)</label>
                        <div className="relative border-b-2 border-slate-100 group-focus-within:border-black transition-all pb-4">
                           <input
                              type="text"
                              placeholder="TX-00912883..."
                              className="w-full bg-transparent text-sm font-manrope font-black text-slate-900 outline-none placeholder-slate-200 uppercase tracking-widest"
                              value={formData.reference}
                              onChange={(e) => setFormData({ ...formData, reference: e.target.value })}
                           />
                        </div>
                     </div>
                     <div className="group">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 block ml-1">Ledger Annotations (Notes)</label>
                        <div className="relative border-b-2 border-slate-100 group-focus-within:border-black transition-all pb-4">
                           <input
                              type="text"
                              placeholder="Deposit for Ramadan segment..."
                              className="w-full bg-transparent text-sm font-manrope font-black text-slate-900 outline-none placeholder-slate-200"
                              value={formData.notes}
                              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                           />
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default AddPayment;
