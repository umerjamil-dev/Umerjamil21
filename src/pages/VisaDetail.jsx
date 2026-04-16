import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, ShieldCheck, User, Calendar, 
  MapPin, Clock, FileText, Info,
  History, Trash2, Edit3, CheckCircle2
} from 'lucide-react';
import useVisaStore from '../store/useVisaStore';
import toast from 'react-hot-toast';

const VisaDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getVisa } = useVisaStore();
  
  const [visa, setVisa] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchVisaData = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getVisa(id);
      setVisa(data);
    } catch (err) {
      toast.error('Failed to retrieve visa data');
      navigate('/reservations/visa');
    } finally {
      setIsLoading(false);
    }
  }, [id, getVisa, navigate]);

  useEffect(() => {
    fetchVisaData();
  }, [fetchVisaData]);

  if (isLoading) {
    return (
      <div className="p-20 text-center font-manrope font-extrabold text-slate-400 animate-pulse tracking-widest uppercase text-xs">
        Securing Visa Registry...
      </div>
    );
  }

  if (!visa) return null;

  const customerName = visa.customer_full_name || 'Unknown Applicant';

  return (
    <>
    <div className="font-inter space-y-8 animate-in fade-in duration-700 pb-20">
      {/* Header Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
        <div className="flex items-center gap-6">
          <Link to="/reservations/visa" className="w-12 h-12 flex items-center justify-center bg-slate-50 text-slate-500 hover:bg-black hover:text-white rounded-xl transition-all group">
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          </Link>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Visa Protocol</span>
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--sacred-emerald)]"></div>
              <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">REG: {visa.id}</span>
            </div>
            <h1 className="text-2xl font-manrope font-black text-slate-900 tracking-tight">Visa Verification Node</h1>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:bg-red-50 hover:text-red-500 transition-all border border-transparent hover:border-red-100">
            <Trash2 size={18} />
          </button>
          <button className="px-6 py-3 bg-black text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg hover:bg-[var(--desert-gold)] hover:text-black transition-all flex items-center gap-2">
            <Edit3 size={16} /> Update Protocol
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Details */}
        <div className="lg:col-span-2 space-y-8">
          {/* Visa Card */}
          <div className="bg-white rounded-2xl p-10 shadow-sm border border-slate-100 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-bl-full -mr-20 -mt-20 transition-transform group-hover:scale-110"></div>
            
            <div className="flex items-center justify-between mb-12 relative z-10">
              <h2 className="text-xs font-black text-slate-900 uppercase tracking-[0.3em] flex items-center gap-3">
                <ShieldCheck size={18} strokeWidth={2.5} className="text-[var(--sacred-emerald)]" /> Entry Authorization
              </h2>
              <span className="px-4 py-1.5 bg-emerald-50 text-[var(--sacred-emerald)] rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-100 uppercase italic">
                {visa.transaction_type_name || 'Verified Status'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
              <div className="space-y-8">
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                     <FileText size={14} /> Visa Number
                  </p>
                  <p className="text-xl font-mono font-bold text-slate-900 tracking-tighter bg-slate-50 px-4 py-2 rounded-xl border border-slate-100 w-fit uppercase tracking-[0.1em]">
                    {visa.visa_number}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Operational Registry</p>
                  <p className="text-xs font-black text-slate-900 px-4 py-2 bg-slate-50 rounded-xl border border-slate-100 w-fit uppercase tracking-widest">
                    ID: {visa.id}
                  </p>
                </div>
              </div>

              <div className="space-y-8">
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <User size={14} /> Applicant Entity
                  </p>
                  <p className="text-lg font-manrope font-black text-slate-900">{customerName}</p>
                  <p className="text-[9px] font-black text-slate-400 mt-1 tracking-widest uppercase">Master Sync: PKR {parseFloat(visa.total_amount || 0).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Booking Link</p>
                  <Link to={`/bookings/${visa.booking_id}`} className="text-sm font-black text-black hover:text-[var(--desert-gold)] transition-colors underline decoration-slate-200">
                    TRANS-BK-{visa.booking_id}
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Segments */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm flex flex-col justify-between">
                <div>
                   <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                      <Info size={16} /> Operational Context
                   </h3>
                   <p className="text-xs font-black text-slate-900 mb-2 uppercase tracking-tight">{visa.package_title || 'Custom Arrangement'}</p>
                </div>
                <div className="flex items-center gap-3 mt-4">
                   <div className="px-3 py-1 bg-slate-50 text-[10px] font-black text-slate-500 rounded-lg border border-slate-200 uppercase tracking-tighter">
                      Financial Sync: COMPLETE
                   </div>
                </div>
             </div>
             <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm flex flex-col justify-between">
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                   <CheckCircle2 size={16} /> Validation
                </h3>
                <p className="text-[11px] font-black text-emerald-600 uppercase tracking-[0.2em] bg-emerald-50 px-4 py-3 rounded-xl border border-emerald-100 w-fit">
                   Registry Metadata Verified
                </p>
             </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          <div className="bg-[#020617] rounded-2xl p-8 text-white shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-bl-[4rem] translate-x-8 -translate-y-8"></div>
            <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.4em] mb-8 relative z-10 leading-none">Registry Audit</p>
            <div className="space-y-6 relative z-10">
              <div>
                <div className="flex items-center gap-3 text-white/40 mb-2">
                  <Clock size={14} /> <span className="text-[9px] font-black uppercase tracking-[0.2em]">Initial Entry</span>
                </div>
                <p className="text-xs font-bold text-white/80">{new Date(visa.created_at).toLocaleString()}</p>
              </div>
              <div className="pt-6 border-t border-white/10">
                <div className="flex items-center gap-3 text-white/40 mb-2">
                  <History size={14} /> <span className="text-[9px] font-black uppercase tracking-[0.2em]">Last Verification</span>
                </div>
                <p className="text-xs font-bold text-white/80">{new Date(visa.updated_at).toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm">
            <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-widest mb-6 flex items-center gap-2">
              <Info size={16} className="text-[var(--sacred-emerald)]" /> Internal Notes
            </h3>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 italic text-slate-500 text-xs leading-relaxed">
              {visa.notes || "No internal annotations documented for this visa protocol segment."}
            </div>
          </div>
        </div>
      </div>
    </div>  
    
    </>
  );
};

export default VisaDetail;
