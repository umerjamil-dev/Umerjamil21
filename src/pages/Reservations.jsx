import React from 'react';
import {
  ShieldCheck, Hotel, Plane, MapPin,
  ChevronRight, Search, Filter,
  CalendarDays, MoreHorizontal,
  Clock, CheckCircle2, AlertCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Reservations = () => {
   const reservations = [
    {
      id: 'RES-9012',
      customer: 'Ahmed Raza',
      package: 'Premium Ramadan Umrah',
      dates: 'Apr 10 - Apr 25',
      amount: 4500,
      status: 'Confirmed',
      visaStatus: 'Approved',
      type: 'Visa'
    },
    {
      id: 'RES-9013',
      customer: 'Fatima Zahra',
      package: 'Executive Hajj 2024',
      dates: 'Jun 05 - Jun 25',
      amount: 15800,
      status: 'Partial',
      visaStatus: 'Processing',
      type: 'Hotel'
    },
    {
      id: 'RES-9014',
      customer: 'Zubair Ahmed',
      package: 'Economy Umrah Plus',
      dates: 'May 02 - May 16',
      amount: 2100,
      status: 'Pending',
      visaStatus: 'Not Started',
      type: 'Flight'
    },
    {
      id: 'RES-9015',
      customer: 'Omar Jamil',
      package: 'VIP Ziyarat Express',
      dates: 'Jul 12 - Jul 18',
      amount: 3200,
      status: 'Confirmed',
      visaStatus: 'Approved',
      type: 'Transport'
    }
  ];

  const getTypeIcon = (type) => {
    switch(type) {
      case 'Visa': return { icon: ShieldCheck, bg: 'bg-emerald-50 text-emerald-600' };
      case 'Hotel': return { icon: Hotel, bg: 'bg-amber-50 text-amber-600' };
      case 'Flight': return { icon: Plane, bg: 'bg-blue-50 text-blue-600' };
      case 'Transport': return { icon: MapPin, bg: 'bg-indigo-50 text-indigo-600' };
      default: return { icon: ShieldCheck, bg: 'bg-slate-50 text-slate-600' };
    }
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-1000 font-inter pb-20">
      {/* Premium Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 pb-8 border-b border-slate-200">
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-[var(--desert-gold)] uppercase tracking-[0.4em] text-[9px] font-black opacity-80">
            <Clock size={14} strokeWidth={3} />
            Live Sync: 14:55 Manifest
          </div>
          <h1 className="text-5xl font-manrope font-extrabold text-slate-900 tracking-tighter leading-tight">
            Logistics <span className="text-slate-300 italic font-light font-manrope">Manifest</span>
          </h1>
          <p className="text-slate-500 text-sm font-medium max-w-xl leading-relaxed">
            Orchestrating visa cycles, hospitality nodes, and global transit authorizations in real-time synchronization.
          </p>
        </div>
        <Link
          to="/reservations/add"
          className="px-10 py-5 bg-black text-white rounded-xl text-[10px] font-black uppercase tracking-[0.4em] shadow-xl hover:bg-[var(--desert-gold)] hover:text-black transition-all flex items-center gap-3"
        >
          <Plane size={18} strokeWidth={3} />
          Initiate New Protocol
        </Link>
      </div>

      {/* Search & Filter Matrix */}
      <div className="bg-white rounded-xl p-8 border border-slate-200 shadow-sm relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-bl-[8rem] translate-x-32 -translate-y-32 transition-all duration-700"></div>
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
          <div className="relative w-full lg:w-[500px] group">
            <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-black transition-colors" size={20} />
            <input
              type="text"
              placeholder="Search manifest by ID, pilgrim or package..."
              className="w-full pl-10 pr-4 py-4 bg-transparent border-b-2 border-slate-100 rounded-none text-sm outline-none focus:border-black text-black transition-all font-black placeholder-slate-300 uppercase tracking-widest"
            />
          </div>
          <div className="flex items-center gap-4 w-full lg:w-auto">
            <button className="flex-1 lg:flex-none flex items-center justify-center gap-3 px-8 py-4 bg-slate-50 rounded-xl text-[10px] font-black text-slate-400 uppercase tracking-widest hover:bg-slate-100 transition-all border border-slate-200">
              <Filter size={14} strokeWidth={3} /> Status Protocol
            </button>
            <button className="flex-1 lg:flex-none flex items-center justify-center gap-3 px-8 py-4 bg-slate-50 rounded-xl text-[10px] font-black text-slate-900 uppercase tracking-widest hover:bg-slate-100 transition-all border border-slate-200">
              Temporal Range
            </button>
          </div>
        </div>
      </div>

      {/* Manifest Ledger */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden relative">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-10 py-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Reservation Narrative</th>
                <th className="px-10 py-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Manifest Node</th>
                <th className="px-10 py-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Temporal Window</th>
                <th className="px-10 py-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Floor Valuation</th>
                <th className="px-10 py-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] text-right">Protocol</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {reservations.map((res) => {
                const typeInfo = getTypeIcon(res.type);
                return (
                  <tr key={res.id} className="group hover:bg-slate-50 transition-all cursor-pointer">
                    <td className="px-10 py-10">
                      <div className="flex items-center gap-8">
                        <div className={`w-16 h-16 rounded-xl flex items-center justify-center transition-all ${typeInfo.bg} shadow-sm group-hover:shadow-md border border-white`}>
                          <typeInfo.icon size={28} strokeWidth={2} />
                        </div>
                        <div>
                          <p className="text-xl font-manrope font-black text-slate-900 tracking-tight leading-none mb-2">{res.customer}</p>
                          <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.3em] flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-slate-200"></span> ID: {res.id}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-10 py-10">
                      <div className="inline-flex items-center gap-3 px-5 py-3 bg-white rounded-xl border border-slate-100 shadow-sm group-hover:border-slate-300 transition-all">
                        <div className={`w-2 h-2 rounded-full ${res.visaStatus === 'Approved' ? 'bg-[var(--sacred-emerald)]' : 'bg-slate-200 animate-pulse'}`}></div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-900">{res.package}</span>
                      </div>
                    </td>
                    <td className="px-10 py-10">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-3 text-slate-400">
                          <CalendarDays size={16} strokeWidth={3} />
                          <span className="text-[10px] font-black uppercase tracking-[0.2em]">{res.dates}</span>
                        </div>
                        <p className="text-[9px] text-slate-300 font-bold uppercase tracking-widest ml-7">System Estimated</p>
                      </div>
                    </td>
                    <td className="px-10 py-10">
                      <div>
                        <p className="text-2xl font-manrope font-black text-slate-900 tracking-tighter">${res.amount.toLocaleString()}</p>
                        <div className="flex items-center gap-3 mt-3">
                          <span className={`px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-[0.3em] ${
                            res.status === 'Confirmed' ? 'bg-[var(--sacred-emerald)]/10 text-[var(--sacred-emerald)] border border-[var(--sacred-emerald)]/20' : 
                            res.status === 'Partial' ? 'bg-[var(--desert-gold)]/10 text-[var(--desert-gold)] border border-[var(--desert-gold)]/20' : 
                            'bg-slate-100 text-slate-400 border border-slate-200'
                          }`}>
                            {res.status} Protocol
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-10 py-10 text-right">
                      <button className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-300 group-hover:text-black group-hover:bg-white border border-transparent group-hover:border-slate-200 shadow-sm group-hover:shadow-md transition-all">
                        <ChevronRight size={24} strokeWidth={3} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--desert-gold)] via-[var(--sacred-emerald)] to-blue-500 opacity-20"></div>
      </div>
    </div>
  );
};

export default Reservations;
