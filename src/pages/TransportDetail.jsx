import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, MapPin, User, Calendar, 
  Clock, Phone, Info, History, 
  Trash2, Edit3, Navigation, Car
} from 'lucide-react';
import useTransportStore from '../store/useTransportStore';
import toast from 'react-hot-toast';

const TransportDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getTransport } = useTransportStore();
  
  const [transport, setTransport] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTransportData = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getTransport(id);
      setTransport(data);
    } catch (err) {
      toast.error('Failed to retrieve transport duty');
      navigate('/reservations/transport');
    } finally {
      setIsLoading(false);
    }
  }, [id, getTransport, navigate]);

  useEffect(() => {
    fetchTransportData();
  }, [fetchTransportData]);

  if (isLoading) {
    return (
      <div className="p-20 text-center font-manrope font-extrabold text-slate-400 animate-pulse tracking-widest uppercase text-xs">
        Dispatching Logistics Intel...
      </div>
    );
  }

  if (!transport) return null;

  const customerName = transport.customer_full_name || 'Unknown Passenger';

  return (
    <>
    <div className="font-inter space-y-8 animate-in fade-in duration-700 pb-20">
      {/* Header Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
        <div className="flex items-center gap-6">
          <Link to="/reservations/transport" className="w-12 h-12 flex items-center justify-center bg-slate-50 text-slate-500 hover:bg-black hover:text-white rounded-xl transition-all group">
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          </Link>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Transit Duty</span>
              <div className="w-1.5 h-1.5 rounded-full bg-slate-900"></div>
              <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">UNIT: {transport.id}</span>
            </div>
            <h1 className="text-2xl font-manrope font-black text-slate-900 tracking-tight">Vehicle Protocol: {transport.vehicle || 'Unassigned'}</h1>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:bg-red-50 hover:text-red-500 transition-all border border-transparent hover:border-red-100">
            <Trash2 size={18} />
          </button>
          <button className="px-6 py-3 bg-black text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg hover:bg-[var(--desert-gold)] hover:text-black transition-all flex items-center gap-2">
            <Edit3 size={16} /> Update Logistics
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Transport Main Card */}
          <div className="bg-white rounded-2xl p-10 shadow-sm border border-slate-100 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-bl-full -mr-20 -mt-20 transition-transform group-hover:scale-110"></div>
            
            <div className="flex items-center justify-between mb-12 relative z-10">
              <h2 className="text-xs font-black text-slate-900 uppercase tracking-[0.3em] flex items-center gap-3">
                <Navigation size={18} strokeWidth={2.5} className="text-slate-900" /> Ground Operations
              </h2>
              <span className="px-4 py-1.5 bg-slate-900 text-white rounded-full text-[10px] font-black uppercase tracking-widest border border-slate-800 uppercase italic">
                {transport.transaction_type_name || 'Registry Sync'}
              </span>
            </div>
                
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
              <div className="space-y-8">
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                     <Car size={14} /> Plate Number
                  </p>
                  <p className="text-xl font-mono font-bold text-slate-900 tracking-tighter bg-black text-white px-5 py-2.5 rounded-xl inline-block uppercase italic">
                    {transport.plate_number || 'TBA'}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Service Date</p>
                    <p className="text-sm font-black text-slate-900">{transport.date_of_issue || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Registry Time</p>
                    <p className="text-sm font-black text-slate-900">{transport.time || 'N/A'}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <User size={14} /> Assigned Driver
                  </p>
                  <p className="text-lg font-manrope font-black text-slate-900">{transport.driver || 'Verification Pending'}</p>
                  <div className="flex items-center gap-2 text-slate-500 mt-2">
                    <Phone size={12} />
                    <p className="text-[11px] font-bold tracking-widest uppercase italic">{transport.driver_phone || 'No Contact'}</p>
                  </div>
                </div>
                <div>
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Principal Passenger</p>
                   <p className="text-sm font-black text-slate-900 italic underline decoration-slate-200 decoration-2 underline-offset-4">{customerName}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Logistics Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm flex flex-col justify-between">
                <div>
                   <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                      <Info size={16} /> Service Authorization
                   </h3>
                   <p className="text-xs font-black text-slate-900 mb-2 uppercase tracking-tight">{transport.package_title || 'Custom Arrangement'}</p>
                   <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Financial Index: PKR {parseFloat(transport.total_amount || 0).toLocaleString()}</p>
                </div>
                <Link to={`/bookings/${transport.booking_id}`} className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-black transition-colors mt-4 italic underline underline-offset-2">
                   View Master Record →
                </Link>
             </div>
             <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm">
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                   <Clock size={16} /> Temporal Window
                </h3>
                <div className="space-y-3">
                   <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Issue Metadata</p>
                      <p className="text-xs font-bold text-slate-700">{transport.date_of_issue || 'Pending Validation'}</p>
                   </div>
                </div>
             </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          <div className="bg-slate-900 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden group">
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/5 rounded-tl-[4rem] translate-x-8 translate-y-8"></div>
            <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.4em] mb-8 relative z-10 leading-none">Logistics Audit</p>
            <div className="space-y-6 relative z-10">
              <div>
                <div className="flex items-center gap-3 text-white/40 mb-2">
                  <Clock size={14} /> <span className="text-[9px] font-black uppercase tracking-[0.2em]">Initiated At</span>
                </div>
                <p className="text-xs font-bold text-white/80">{new Date(transport.created_at).toLocaleString()}</p>
              </div>
              <div className="pt-6 border-t border-white/10">
                <div className="flex items-center gap-3 text-white/40 mb-2">
                  <History size={14} /> <span className="text-[9px] font-black uppercase tracking-[0.2em]">Last Dispatch Sync</span>
                </div>
                <p className="text-xs font-bold text-white/80">{new Date(transport.updated_at).toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm">
            <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-widest mb-6 flex items-center gap-2">
              <Info size={16} className="text-slate-400" /> Operational Notes
            </h3>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 italic text-slate-500 text-xs leading-relaxed">
              {transport.notes || "No specific ground operational instructions documented for this transit unit."}
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default TransportDetail;
