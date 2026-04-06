import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, Hotel, User, Calendar, 
  MapPin, Clock, Info, History, 
  Trash2, Edit3, Navigation, Bed
} from 'lucide-react';
import useHotelStore from '../store/useHotelStore';
import toast from 'react-hot-toast';

const HotelDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getHotel } = useHotelStore();
  
  const [hotel, setHotel] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchHotelData = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getHotel(id);
      setHotel(data);
    } catch (err) {
      toast.error('Failed to retrieve hotel record');
      navigate('/reservations/hotels');
    } finally {
      setIsLoading(false);
    }
  }, [id, getHotel, navigate]);

  useEffect(() => {
    fetchHotelData();
  }, [fetchHotelData]);

  if (isLoading) {
    return (
      <div className="p-20 text-center font-manrope font-extrabold text-slate-400 animate-pulse tracking-widest uppercase text-xs">
        Accessing Hospitality Registry...
      </div>
    );
  }

  if (!hotel) return null;

  const customerName = hotel.customer_full_name || 'Unknown Guest';

  return (
    <div className="font-inter space-y-8 animate-in fade-in duration-700 pb-20">
      {/* Header Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
        <div className="flex items-center gap-6">
          <Link to="/reservations/hotels" className="w-12 h-12 flex items-center justify-center bg-slate-50 text-slate-500 hover:bg-black hover:text-white rounded-xl transition-all group">
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          </Link>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Hospitality Hook</span>
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--desert-gold)]"></div>
              <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">RECORD: {hotel.id}</span>
            </div>
            <h1 className="text-2xl font-manrope font-black text-slate-900 tracking-tight">{hotel.hotel_name}</h1>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:bg-red-50 hover:text-red-500 transition-all border border-transparent hover:border-red-100">
            <Trash2 size={18} />
          </button>
          <button className="px-6 py-3 bg-black text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg hover:bg-[var(--desert-gold)] hover:text-black transition-all flex items-center gap-2">
            <Edit3 size={16} /> Update Stay
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Hotel Main Card */}
          <div className="bg-white rounded-2xl p-10 shadow-sm border border-slate-100 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-bl-full -mr-20 -mt-20 transition-transform group-hover:scale-110"></div>
            
            <div className="flex items-center justify-between mb-12 relative z-10">
              <h2 className="text-xs font-black text-slate-900 uppercase tracking-[0.3em] flex items-center gap-3">
                <Hotel size={18} strokeWidth={2.5} className="text-[var(--desert-gold)]" /> Accommodation Details
              </h2>
              <div className="flex items-center gap-2 px-4 py-1.5 bg-slate-50 text-slate-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-slate-200">
                <MapPin size={10} /> {hotel.city}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
              <div className="space-y-8">
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                     <Calendar size={14} /> Stay Period
                  </p>
                  <div className="flex items-center gap-4">
                     <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                        <p className="text-[9px] font-black text-emerald-600 uppercase tracking-widest mb-1">Check-In</p>
                        <p className="text-sm font-black text-slate-900">{hotel.check_in}</p>
                     </div>
                     <Navigation size={14} className="text-slate-300" />
                     <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Check-Out</p>
                        <p className="text-sm font-black text-slate-900">{hotel.check_out}</p>
                     </div>
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <Bed size={14} /> Room Configuration
                  </p>
                  <p className="text-lg font-manrope font-black text-slate-900 uppercase tracking-widest">{hotel.rooms || 'Standard Room'}</p>
                </div>
              </div>

              <div className="space-y-8">
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <User size={14} /> Registered Guest
                  </p>
                  <p className="text-lg font-manrope font-black text-slate-900">{customerName}</p>
                  <div className="flex items-center gap-2 text-slate-400 mt-2">
                     <span className="text-[9px] font-black uppercase tracking-[0.2em]">Transaction: {hotel.transaction_type_name || 'Registry Sync'}</span>
                  </div>
                </div>
                <div>
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Master Booking</p>
                   <Link to={`/bookings/${hotel.booking_id}`} className="text-sm font-black text-black hover:text-[var(--desert-gold)] transition-colors underline decoration-slate-200 decoration-2 underline-offset-4">
                      BK-{hotel.booking_id} Ledger Protocol
                   </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Context Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm flex flex-col justify-between">
                <div>
                   <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                      <Info size={16} /> Package Association
                   </h3>
                   <p className="text-xs font-black text-slate-900 mb-2 uppercase tracking-tight">{hotel.package_title || 'Custom Arrangement'}</p>
                </div>
                <div className="px-3 py-1 bg-slate-50 text-[9px] font-black text-slate-500 rounded-lg border border-slate-200 uppercase tracking-tighter w-fit">
                   Financial Status: PKR {parseFloat(hotel.total_amount || 0).toLocaleString()}
                </div>
             </div>
             <div className="bg-[#1e293b] rounded-2xl p-8 shadow-xl text-white">
                <h3 className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-6 flex items-center gap-2">
                   <Clock size={16} /> Night Log
                </h3>
                <div className="flex items-center gap-3">
                   <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center border border-white/10">
                      <Bed size={20} className="text-[var(--desert-gold)]" />
                   </div>
                   <div>
                      <p className="text-2xl font-manrope font-black tracking-tighter">Stay Active</p>
                      <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Registry Verified</p>
                   </div>
                </div>
             </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          <div className="bg-[#020617] rounded-2xl p-8 text-white shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-bl-[4rem] translate-x-8 -translate-y-8"></div>
            <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.4em] mb-8 relative z-10 leading-none">Registry Audit</p>
            <div className="space-y-6 relative z-10">
              <div>
                <div className="flex items-center gap-3 text-white/40 mb-2">
                  <Clock size={14} /> <span className="text-[9px] font-black uppercase tracking-[0.2em]">Initial Hook</span>
                </div>
                <p className="text-xs font-bold text-white/80">{new Date(hotel.created_at).toLocaleString()}</p>
              </div>
              <div className="pt-6 border-t border-white/10">
                <div className="flex items-center gap-3 text-white/40 mb-2">
                  <History size={14} /> <span className="text-[9px] font-black uppercase tracking-[0.2em]">Last Reconciliation</span>
                </div>
                <p className="text-xs font-bold text-white/80">{new Date(hotel.updated_at).toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm">
            <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-widest mb-6 flex items-center gap-2">
              <Info size={16} className="text-slate-400" /> Operational Context
            </h3>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 italic text-slate-500 text-xs leading-relaxed">
              {hotel.notes || "No specific hospitality constraints or internal annotations documented for this stay segment."}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelDetail;
