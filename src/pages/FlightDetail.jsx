import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft, Plane, User, Calendar,
  MapPin, Clock, FileText, Info,
  History, Trash2, Edit3, ShieldCheck
} from 'lucide-react';
import useFlightStore from '../store/useFlightStore';
import toast from 'react-hot-toast';

const FlightDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getFlight } = useFlightStore();

  const [flight, setFlight] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchFlightData = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getFlight(id);
      setFlight(data);
    } catch (err) {
      toast.error('Failed to retrieve flight data');
      navigate('/reservations/flights');
    } finally {
      setIsLoading(false);
    }
  }, [id, getFlight, navigate]);

  useEffect(() => {
    fetchFlightData();
  }, [fetchFlightData]);

  if (isLoading) {
    return (
      <div className="p-20 text-center font-manrope font-medium text-slate-400 animate-pulse tracking-widest uppercase text-xs">
        Auditing Flight Manifest...
      </div>
    );
  }

  if (!flight) return null;

  const customerName = flight.customer_full_name || 'Unknown Passenger';

  return (
    <div className="font-inter space-y-8 animate-in fade-in duration-700 pb-20">
      {/* Header Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
        <div className="flex items-center gap-6">
          <Link to="/reservations/flights" className="w-12 h-12 flex items-center justify-center bg-slate-50 text-slate-500 hover:bg-black hover:text-white rounded-xl transition-all group">
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          </Link>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="text-[10px] font-medium text-slate-400 uppercase tracking-[0.3em]">Flight Record</span>
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--desert-gold)]"></div>
              <span className="text-[10px] font-medium text-slate-900 uppercase tracking-widest">ID: {flight.id}</span>
            </div>
            <h1 className="text-2xl font-manrope font-medium text-slate-900 tracking-tight">Airline Node: {flight.airline}</h1>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:bg-red-50 hover:text-red-500 transition-all border border-transparent hover:border-red-100">
            <Trash2 size={18} />
          </button>
          <button className="px-6 py-3 bg-black text-white rounded-xl text-[10px] font-medium uppercase tracking-widest shadow-lg hover:bg-[var(--desert-gold)] hover:text-black transition-all flex items-center gap-2">
            <Edit3 size={16} /> Update Details
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Details */}
        <div className="lg:col-span-2 space-y-8">
          {/* Flight Card */}
          <div className="bg-white rounded-2xl p-10 shadow-sm border border-slate-100 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-bl-full -mr-20 -mt-20 transition-transform group-hover:scale-110"></div>

            <div className="flex items-center justify-between mb-12 relative z-10">
              <h2 className="text-xs font-medium text-slate-900 uppercase tracking-[0.3em] flex items-center gap-3">
                <Plane size={18} strokeWidth={2.5} className="text-[var(--desert-gold)]" /> Operational Logistics
              </h2>
              <span className="px-4 py-1.5 bg-emerald-50 text-[var(--sacred-emerald)] rounded-full text-[10px] font-medium uppercase tracking-widest border border-emerald-100">
                {flight.transaction_type_name || 'System Registry'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
              <div className="space-y-8">
                <div>
                  <p className="text-[10px] font-medium text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <FileText size={14} /> Ticket Number
                  </p>
                  <p className="text-xl font-mono font-medium text-slate-900 tracking-tighter bg-slate-50 px-4 py-2 rounded-xl border border-slate-100 w-fit">
                    {flight.ticket_number}
                  </p>
                </div>
                <div className="flex gap-12">
                  <div>
                    <p className="text-[10px] font-medium text-slate-400 uppercase tracking-widest mb-3">Departure</p>
                    <p className="text-sm font-medium text-slate-900">{flight.departure?.split('@')[1] || flight.departure || 'TBA'}</p>
                    <p className="text-[10px] font-medium text-slate-400 mt-1 uppercase tracking-widest">{flight.departure?.split('@')[0] || ''}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-medium text-slate-400 uppercase tracking-widest mb-3">Arrival</p>
                    <p className="text-sm font-medium text-slate-900">{flight.arrival?.split('@')[1] || flight.arrival || 'TBA'}</p>
                    <p className="text-[10px] font-medium text-slate-400 mt-1 uppercase tracking-widest">{flight.arrival?.split('@')[0] || ''}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[10px] font-medium text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                      <User size={14} /> Passenger Entity
                    </p>
                    <p className="text-lg font-manrope font-medium text-slate-900">{customerName}</p>
                    <p className="text-[9px] font-medium text-slate-400 mt-1 tracking-widest uppercase italic">Quota: {flight.pilgrim_quota} Units</p>
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-medium text-slate-400 uppercase tracking-widest mb-3">Master Booking Reference</p>
                  <Link to={`/bookings/${flight.booking_id}`} className="text-sm font-medium text-black hover:text-[var(--desert-gold)] transition-colors underline decoration-slate-200">
                    BK-{flight.booking_id}
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Secondary Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="text-[10px] font-medium text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                  <Info size={16} /> Package Association
                </h3>
                <p className="text-xs font-medium text-slate-900 mb-2 uppercase tracking-tight">{flight.package_title || 'Custom Arrangement'}</p>
              </div>
              <div className="flex items-center gap-3 mt-4">
                <div className="px-3 py-1 bg-slate-50 text-[10px] font-medium text-slate-500 rounded-lg border border-slate-200 uppercase tracking-tighter">
                  Index Type: {flight.transaction_type}
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm">
              <h3 className="text-[10px] font-medium text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                <ShieldCheck size={16} /> Financial Ledger
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-[9px] font-medium text-slate-400 uppercase tracking-[0.2em] mb-1">Registry Amount</p>
                  <p className="text-xl font-manrope font-medium text-slate-900 tracking-tighter">PKR {parseFloat(flight.total_amount || 0).toLocaleString()}</p>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-50">
                  <div>
                    <p className="text-[8px] font-medium text-slate-400 uppercase tracking-[0.2em] mb-1">Paid</p>
                    <p className="text-sm font-medium text-[var(--sacred-emerald)]">{parseFloat(flight.paid_amount || 0).toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-[8px] font-medium text-slate-400 uppercase tracking-[0.2em] mb-1">Remaining</p>
                    <p className="text-sm font-medium text-red-500">{parseFloat(flight.remaining_amount || 0).toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar: History & Meta */}
        <div className="space-y-8">
          <div className="bg-[#0f172a] rounded-2xl p-8 text-white shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-[4rem] translate-x-8 -translate-y-8 transition-transform group-hover:translate-x-4 group-hover:-translate-y-4"></div>
            <p className="text-[10px] font-medium text-white/30 uppercase tracking-[0.4em] mb-8 relative z-10 leading-none">System Audit</p>
            <div className="space-y-6 relative z-10">
              <div>
                <div className="flex items-center gap-3 text-white/40 mb-2">
                  <Clock size={14} /> <span className="text-[9px] font-medium uppercase tracking-[0.2em]">Generated At</span>
                </div>
                <p className="text-xs font-medium text-white/80">{new Date(flight.created_at).toLocaleString()}</p>
              </div>
              <div className="pt-6 border-t border-white/10">
                <div className="flex items-center gap-3 text-white/40 mb-2">
                  <History size={14} /> <span className="text-[9px] font-medium uppercase tracking-[0.2em]">Last Sync</span>
                </div>
                <p className="text-xs font-medium text-white/80">{new Date(flight.updated_at).toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm">
            <h3 className="text-[10px] font-medium text-slate-900 uppercase tracking-widest mb-6 flex items-center gap-2">
              <Info size={16} className="text-[var(--desert-gold)]" /> Operational Notes
            </h3>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 italic text-slate-500 text-xs leading-relaxed">
              {flight.notes || "No special operational constraints documented for this transit segment."}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightDetail;
