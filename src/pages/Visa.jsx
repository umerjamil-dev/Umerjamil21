import React, { useEffect } from 'react';
import {
  ShieldCheck, Search, Filter,
  CheckCircle2, AlertCircle, Clock,
  MoreHorizontal, Download, Globe,
  FileText
} from 'lucide-react';
import { Link } from 'react-router-dom';
import useVisaStore from '../store/useVisaStore';

const Visa = () => {
  const { visas, fetchVisas, isLoading } = useVisaStore();

  useEffect(() => {
    fetchVisas();
  }, [fetchVisas]);

  const visaData = visas;

  const stats = {
    total: visaData.length,
    approved: visaData.filter(v => v.status === 'Approved').length,
    processing: visaData.filter(v => v.status === 'Processing').length,
    exceptions: visaData.filter(v => v.status === 'Rejected' || v.status === 'Not Started').length
  };


  return (
    <div className="space-y-12 animate-in fade-in duration-1000 font-inter pb-20">
      {/* Premium Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 pb-8 border-b border-slate-200">
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-[var(--desert-gold)] uppercase tracking-[0.4em] text-[9px] font-black opacity-80">
            <Globe size={14} strokeWidth={3} />
            MOFA Sync Protocol
          </div>
          <h1 className="text-5xl font-manrope font-extrabold text-slate-900 tracking-tighter leading-tight">
            Visa
          </h1>
          <p className="text-slate-500 text-sm font-medium max-w-xl leading-relaxed">
            Global visa application monitoring, bio-metrics tracking, and government authorization synchronizations.
          </p>
        </div>
        <button
          className="px-10 py-5 bg-black text-white rounded-xl text-[10px] font-black uppercase tracking-[0.4em] shadow-xl hover:bg-[var(--desert-gold)] hover:text-black transition-all flex items-center gap-3"
        >
          <ShieldCheck size={18} strokeWidth={3} />
          Sync MOFA Status
        </button>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Applications', value: stats.total.toString(), color: 'text-slate-900' },
          { label: 'Approved Visas', value: stats.approved.toString(), color: 'text-[var(--sacred-emerald)]' },
          { label: 'In Processing', value: stats.processing.toString(), color: 'text-[var(--desert-gold)]' },
          { label: 'Exceptions / Rejected', value: stats.exceptions.toString(), color: 'text-red-500' }
        ].map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-2 relative overflow-hidden group hover:shadow-md transition-all">
            <div className="absolute -right-4 -bottom-4 w-16 h-16 bg-slate-50 rounded-full group-hover:scale-150 transition-transform duration-500 z-0"></div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest relative z-10">{stat.label}</p>
            <h4 className={`text-3xl font-manrope font-black tracking-tighter relative z-10 ${stat.color}`}>{stat.value}</h4>
          </div>
        ))}
      </div>

      {/*  Ledger */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden relative">
        <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="relative w-[400px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input type="text" placeholder="Search applicant by name, visa number..." className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 text-sm outline-none focus:border-black transition-all placeholder-slate-400 font-medium" />
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-xl text-[10px] font-black text-slate-600 uppercase tracking-widest hover:border-black transition-all">
            <Filter size={14} /> Filter Queue
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white border-b border-slate-100">
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] w-1/4">Applicant Narrative</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] w-1/4">Visa Credential</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] w-1/4">Clearance Status</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Log Notes</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr><td colSpan="5" className="py-20 text-center text-sm font-bold uppercase tracking-widest text-slate-400 opacity-50">Synchronizing with MOFA Gateway...</td></tr>
              ) : visaData.length === 0 ? (
                <tr><td colSpan="5" className="py-20 text-center text-sm font-bold uppercase tracking-widest text-slate-400 opacity-50">No applications found in active cycle.</td></tr>
              ) : visaData.map((item) => (
                <tr key={item.id} className="group hover:bg-slate-50 transition-all cursor-pointer">
                  <td className="px-8 py-6 text-black">
                    <div>
                      <p className="text-base font-manrope font-black text-slate-900 tracking-tight leading-none mb-1.5">{item.customer}</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{item.package}</p>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3 text-slate-900 font-mono tracking-widest text-sm bg-slate-100 px-3 py-1.5 rounded-xl inline-flex">
                      <FileText size={14} className="text-slate-400" />
                      {item.visaNumber}
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-[0.2em] inline-flex items-center gap-2 ${item.status === 'Approved' ? 'bg-[var(--sacred-emerald)]/10 text-[var(--sacred-emerald)] border border-[var(--sacred-emerald)]/20' :
                      item.status === 'Processing' ? 'bg-[var(--desert-gold)]/10 text-[var(--desert-gold)] border border-[var(--desert-gold)]/20' :
                        'bg-slate-100 text-slate-400 border border-slate-200'
                      }`}>
                      {item.status === 'Approved' ? <CheckCircle2 size={12} strokeWidth={3} /> :
                        item.status === 'Processing' ? <Clock size={12} strokeWidth={3} /> :
                          <AlertCircle size={12} strokeWidth={3} />}
                      {item.status}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <p className="text-[11px] font-medium text-slate-600 max-w-[200px] truncate">{item.notes}</p>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button className="p-2 text-slate-300 hover:text-black hover:bg-white rounded-xl transition-all shadow-sm border border-transparent hover:border-slate-200">
                      <MoreHorizontal size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default Visa;
