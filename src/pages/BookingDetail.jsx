import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, Plane, Hotel, MapPin, 
  ShieldCheck, Clock, Info, User,
  CalendarDays, CreditCard, ChevronRight,
  ClipboardList, Navigation
} from 'lucide-react';
import useBookingStore from '../store/useBookingStore';
import toast from 'react-hot-toast';

const BookingDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchBooking } = useBookingStore();
  
  const [booking, setBooking] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await fetchBooking(id);
      setBooking(data);
    } catch (err) {
      toast.error('Failed to retrieve booking protocol');
      navigate('/bookings');
    } finally {
      setIsLoading(false);
    }
  }, [id, fetchBooking, navigate]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  if (isLoading) {
    return (
      <div className="p-20 text-center font-manrope font-extrabold text-slate-400 animate-pulse tracking-widest uppercase text-xs">
        Synchronizing Booking Artifacts...
      </div>
    );
  }

  if (!booking) return null;

  const customerName = booking.customer?.firstName || booking.customer_name || 'Guest Entity';
  const packageName = booking.package?.title || booking.package_name || 'Custom Protocol';

  return (
    <div className="font-inter space-y-10 animate-in fade-in duration-700 pb-20">
      {/* Premium Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-8 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-[4rem] translate-x-12 -translate-y-12"></div>
        <div className="flex items-center gap-6 relative z-10">
          <Link to="/reservations" className="w-12 h-12 flex items-center justify-center bg-slate-50 text-slate-500 hover:bg-black hover:text-white rounded-xl transition-all group">
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          </Link>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Master Protocol</span>
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--desert-gold)]"></div>
              <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">ID: {booking.id}</span>
            </div>
            <h1 className="text-3xl font-manrope font-black text-slate-900 tracking-tight">
               {customerName}
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-4 relative z-10">
          <div className={`px-5 py-2 rounded-xl border text-[10px] font-black uppercase tracking-widest ${
            booking.status === 'Confirmed' ? 'bg-emerald-50 text-[var(--sacred-emerald)] border-emerald-100' :
            booking.status === 'Partial' ? 'bg-amber-50 text-[var(--desert-gold)] border-amber-100' :
            'bg-slate-50 text-slate-400 border-slate-200'
          }`}>
            Status: {booking.status || 'Pending'}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Main Content Area */}
        <div className="lg:col-span-8 space-y-10">
          {/* Summary Card */}
          <div className="bg-white rounded-2xl p-10 shadow-sm border border-slate-100 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-bl-full -mr-20 -mt-20 group-hover:scale-105 transition-transform"></div>
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12">
               <div className="space-y-6">
                  <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] flex items-center gap-3">
                     <User size={18} className="text-[var(--desert-gold)]" strokeWidth={2.5} /> Customer Intelligence
                  </h2>
                  <div>
                     <p className="text-2xl font-manrope font-black text-slate-900 tracking-tight">{customerName}</p>
                     <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-widest">Client Primary Contact</p>
                  </div>
                  <div className="pt-6 border-t border-slate-50">
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Package Allocation</p>
                     <p className="text-sm font-black text-slate-900 flex items-center gap-2 italic">
                        <ClipboardList size={14} className="text-[var(--desert-gold)]" /> {packageName}
                     </p>
                  </div>
               </div>
               <div className="space-y-6">
                  <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] flex items-center gap-3">
                     <CreditCard size={18} className="text-[var(--sacred-emerald)]" strokeWidth={2.5} /> Financial Audit
                  </h2>
                  <div>
                     <p className="text-4xl font-manrope font-black text-slate-900 tracking-tighter leading-none">${parseFloat(booking.total_amount || 0).toLocaleString()}</p>
                     <p className="text-[9px] font-black text-slate-400 mt-4 uppercase tracking-[0.2em]">Total Value Registry</p>
                  </div>
                  <div className="flex gap-10 pt-6 border-t border-slate-50">
                     <div>
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Paid</p>
                        <p className="text-md font-black text-[var(--sacred-emerald)]">${parseFloat(booking.paid_amount || 0).toLocaleString()}</p>
                     </div>
                     <div>
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Remaining</p>
                        <p className="text-md font-black text-red-500">${(parseFloat(booking.total_amount || 0) - parseFloat(booking.paid_amount || 0)).toLocaleString()}</p>
                     </div>
                  </div>
               </div>
            </div>
          </div>

          {/* Logistics Matrix (Segments) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Flight Segment */}
            <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:border-slate-300 transition-all group">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-8 flex items-center gap-3">
                <Plane size={18} className="text-blue-500" strokeWidth={2.5} /> Flight Segment
              </h3>
              {booking.flight_details && booking.flight_details.length > 0 ? (
                booking.flight_details.map((f, i) => (
                  <div key={i} className="space-y-4">
                    <div>
                      <p className="text-xs font-black text-slate-900 mb-1">{f.airline}</p>
                      <p className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest">TKT: {f.ticket_number}</p>
                    </div>
                    <div className="flex items-center gap-4 py-3 border-y border-slate-50">
                      <div className="text-center flex-1">
                        <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Departure</p>
                        <p className="text-[10px] font-black text-slate-900">{f.departure?.split('@')[1] || f.departure}</p>
                      </div>
                      <ChevronRight size={14} className="text-slate-200" />
                      <div className="text-center flex-1">
                        <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Arrival</p>
                        <p className="text-[10px] font-black text-slate-900">{f.arrival?.split('@')[1] || f.arrival}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest italic py-4 text-center border-2 border-dashed border-slate-50 rounded-xl">No Flight Registry found</p>
              )}
            </div>

            {/* Visa Segment */}
            <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:border-slate-300 transition-all group">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-8 flex items-center gap-3">
                <ShieldCheck size={18} className="text-emerald-500" strokeWidth={2.5} /> Visa Segment
              </h3>
              {booking.visa_details && booking.visa_details.length > 0 ? (
                booking.visa_details.map((v, i) => (
                  <div key={i} className="space-y-4">
                    <div>
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">E-Visa Protocol</p>
                      <p className="text-xs font-black text-slate-900">{v.visa_number}</p>
                    </div>
                    <div className="flex items-center justify-between py-3 border-t border-slate-50">
                       <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">{v.status_name || 'Verified'}</span>
                       <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]"></div>
                    </div>
                    {v.notes && <p className="text-[9px] text-slate-400 italic">Note: {v.notes}</p>}
                  </div>
                ))
              ) : (
                <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest italic py-4 text-center border-2 border-dashed border-slate-50 rounded-xl">No Visa Registry identified</p>
              )}
            </div>

            {/* Hotel Segment */}
            <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:border-slate-300 transition-all group">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-8 flex items-center gap-3">
                <Hotel size={18} className="text-amber-500" strokeWidth={2.5} /> Hospitality Node
              </h3>
              {booking.hotel_details && booking.hotel_details.length > 0 ? (
                booking.hotel_details.map((h, i) => (
                  <div key={i} className="space-y-4">
                    <div>
                      <p className="text-xs font-black text-slate-900 mb-1">{h.hotel_name}</p>
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <MapPin size={10} /> {h.city}
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 py-3 border-y border-slate-50">
                       <div>
                          <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Check-In</p>
                          <p className="text-[10px] font-black text-slate-900">{h.check_in}</p>
                       </div>
                       <div>
                          <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Check-Out</p>
                          <p className="text-[10px] font-black text-slate-900">{h.check_out}</p>
                       </div>
                    </div>
                    <p className="text-[9px] font-black text-slate-900 uppercase tracking-wider bg-slate-50 px-3 py-1.5 rounded-lg w-fit">Room: {h.rooms}</p>
                  </div>
                ))
              ) : (
                <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest italic py-4 text-center border-2 border-dashed border-slate-50 rounded-xl">No Hospitality Node registered</p>
              )}
            </div>

            {/* Transport Segment */}
            <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:border-slate-300 transition-all group">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-8 flex items-center gap-3">
                <Navigation size={18} className="text-indigo-500" strokeWidth={2.5} /> Transit Logistics
              </h3>
              {booking.transport_details && booking.transport_details.length > 0 ? (
                booking.transport_details.map((t, i) => (
                  <div key={i} className="space-y-4">
                    <div className="flex justify-between items-start">
                       <div>
                          <p className="text-xs font-black text-slate-900 mb-1">{t.type}</p>
                          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest italic">{t.vehicle}</p>
                       </div>
                       <div className="px-2 py-1 bg-slate-900 text-white text-[8px] font-black rounded uppercase tracking-tighter">
                          {t.plate_number}
                       </div>
                    </div>
                    <div className="py-3 border-t border-slate-50 space-y-2">
                       <p className="text-[10px] font-black text-slate-900 flex items-center gap-2">
                          <User size={12} className="text-slate-400" /> {t.driver}
                       </p>
                       <p className="text-[9px] font-bold text-slate-400 flex items-center gap-2 ml-5 tracking-widest">
                          {t.driver_phone}
                       </p>
                    </div>
                    <div className="flex items-center gap-3 pt-2">
                        <CalendarDays size={12} className="text-slate-300" />
                        <span className="text-[9px] font-black text-slate-900 uppercase tracking-widest">{t.date_of_issue} @ {t.time}</span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest italic py-4 text-center border-2 border-dashed border-slate-50 rounded-xl">No Transit Logistics identified</p>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar / Context */}
        <div className="lg:col-span-4 space-y-10">
          <div className="bg-[#0f172a] rounded-2xl p-10 text-white shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-[4rem] translate-x-8 -translate-y-8 transition-transform group-hover:translate-x-4 group-hover:-translate-y-4"></div>
            <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.4em] mb-10 relative z-10 font-manrope">System Synchronization</p>
            
            <div className="space-y-8 relative z-10">
              <div className="flex items-start gap-5">
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--desert-gold)] mt-2 shadow-[0_0_8px_var(--desert-gold)]"></div>
                <div>
                  <p className="text-[9px] font-black text-white/40 uppercase tracking-widest mb-2">Registry Finalized</p>
                  <p className="text-xs font-bold text-white/90">{new Date(booking.created_at).toLocaleString()}</p>
                </div>
              </div>
              <div className="flex items-start gap-5 pt-8 border-t border-white/5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shadow-[0_0_8px_rgba(52,211,153,0.4)]"></div>
                <div>
                  <p className="text-[9px] font-black text-white/40 uppercase tracking-widest mb-2">Last Integrity Check</p>
                  <p className="text-xs font-bold text-white/90">{new Date(booking.updated_at).toLocaleString()}</p>
                </div>
              </div>
              <div className="pt-10">
                 <div className="p-5 bg-white/5 rounded-xl border border-white/10 italic text-[10px] text-white/40 leading-relaxed font-medium">
                    "This protocol represents a unified logistics state including visa clearances, hospitality nodes, and transit authorizations synchronized across the global network."
                 </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm overflow-hidden relative">
             <div className="absolute top-0 right-0 w-20 h-20 bg-slate-50 rounded-bl-full -mr-10 -mt-10"></div>
             <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-widest mb-6 flex items-center gap-3">
               <Info size={16} className="text-[var(--desert-gold)]" strokeWidth={2.5} /> Node Intelligence
             </h3>
             <div className="space-y-6">
                <div>
                   <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-2 italic">Parent Package Index</p>
                   <p className="text-xs font-bold text-slate-700">{booking.package?.name || 'Standard Distribution'}</p>
                </div>
                <div className="pt-6 border-t border-slate-50">
                   <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-2 italic">Operational Status</p>
                   <div className="flex items-center gap-3">
                      <div className="px-3 py-1 bg-slate-900 text-white text-[9px] font-black rounded-lg uppercase tracking-widest">
                         {booking.is_active == 1 ? 'Live' : 'Archived'}
                      </div>
                      <div className={`w-2 h-2 rounded-full ${booking.is_active == 1 ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'}`}></div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetail;
