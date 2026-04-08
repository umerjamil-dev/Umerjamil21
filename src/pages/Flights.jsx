import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Cloud, Navigation, ShieldCheck, Eye,
  Plane,
  Search,
  Filter,
  Clock
} from 'lucide-react';
import useFlightStore from '../store/useFlightStore';
import usePagination from '../hooks/usePagination';
import Pagination from '../components/Pagination';

const Flights = () => {
  const { flights, fetchFlights, isLoading } = useFlightStore();
  const [searchTerm, setSearchTerm] = React.useState('');

  useEffect(() => {
    fetchFlights();
  }, [fetchFlights]);

  const flightData = Array.isArray(flights) ? flights : [];

  const filtered = React.useMemo(() => {
    return flightData.filter(f => 
      f.airline?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.ticket_number?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.departure?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.arrival?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [flightData, searchTerm]);

  const {
    paginatedData,
    currentPage,
    totalPages,
    goToPage,
    startIndex,
    endIndex,
    totalItems
  } = usePagination(filtered, 10);


  return (
    <div className="space-y-12 animate-in fade-in duration-1000 font-inter pb-20">
      {/* Premium Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 pb-8 border-b border-slate-200">
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-[var(--desert-gold)] uppercase tracking-[0.4em] text-[9px] font-black opacity-80">
            <Plane size={14} strokeWidth={3} />
            Aerospace Logistics
          </div>
          <h1 className="text-5xl font-manrope font-extrabold text-slate-900 tracking-tighter leading-tight">
            Flight 
          </h1>
          <p className="text-slate-500 text-sm font-medium max-w-xl leading-relaxed">
            International airspace tracking, ticketing s, and airline synchronization protocols.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-6 py-5 bg-white border border-slate-200 rounded-xl text-[10px] font-black text-slate-600 uppercase tracking-widest hover:border-black transition-all">
            <Cloud size={16} /> Live Radar View
          </button>
          <button
            className="px-10 py-5 bg-black text-white rounded-xl text-[10px] font-black uppercase tracking-[0.4em] shadow-xl hover:bg-[var(--desert-gold)] hover:text-black transition-all flex items-center gap-3"
          >
            <Plane size={18} strokeWidth={3} />
            Procure E-Tickets
          </button>
        </div>
      </div>

      {/*  Ledger */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden relative">
        <div className="p-8 border-b border-slate-100 flex flex-wrap gap-4 items-center justify-between bg-slate-50/50">
          <div className="relative w-full md:w-[400px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Search by passenger, ticket, airline..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 text-sm outline-none focus:border-black transition-all placeholder-slate-400 font-medium bg-white" 
            />
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-xl text-[10px] font-black text-slate-600 uppercase tracking-widest hover:border-black transition-all">
              <Filter size={14} /> Filter Routes
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white border-b border-slate-100">
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] w-1/5">Carrier Node</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] w-1/5">Passenger Quota</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] w-1/4">Departure/Arrival Vector</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] w-1/5">E-Ticket Ledger</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr><td colSpan="5" className="py-20 text-center text-sm font-bold uppercase tracking-widest text-slate-400 opacity-50">Auditing Flight Manifest...</td></tr>
              ) : paginatedData.length === 0 ? (
                <tr><td colSpan="5" className="py-20 text-center text-sm font-bold uppercase tracking-widest text-slate-400 opacity-50">No flight records found in current cycle.</td></tr>
              ) : paginatedData.map((item) => (
                <tr key={item.id} className="group hover:bg-slate-50 transition-all cursor-pointer">
                  <td className="px-8 py-6 text-black">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-xl flex items-center justify-center border border-blue-100 group-hover:border-blue-300 transition-all">
                        <Plane size={20} strokeWidth={2} />
                      </div>
                      <p className="text-base font-manrope font-black text-slate-900 tracking-tight leading-none mb-1">{item.airline}</p>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-black">
                    <p className="text-sm font-black text-slate-900 leading-none">
                      {item.pilgrim_quota || 'System Registry Placeholder'}
                    </p>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2 text-[10px] font-black text-slate-600 uppercase tracking-widest px-2 py-1 rounded inline-flex w-fit bg-slate-50 border border-slate-200">
                        <Navigation size={10} className="transform rotate-45 text-[var(--desert-gold)]" />
                        A: {item.departure}
                      </div>
                      <div className="flex items-center gap-2 text-[10px] font-black text-black uppercase tracking-widest px-2 py-1 rounded inline-flex w-fit bg-slate-50 border border-slate-200">
                        <Navigation size={10} className="transform rotate-135 text-[var(--sacred-emerald)]" />
                        D: {item.arrival}
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex flex-col gap-1.5 text-black">
                      <span className="text-xs font-mono font-bold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200 inline-block w-fit">
                        {item.ticket_number}
                      </span>
                      <span className={`text-[9px] font-black uppercase tracking-[0.2em] inline-flex items-center gap-1.5 ${item.status === 'Ticketed' ? 'text-[var(--sacred-emerald)]' :
                          'text-[var(--desert-gold)]'
                        }`}>
                        {/* {item.status === 'Ticketed' ? <ShieldCheck size={12} strokeWidth={3} /> : <Clock size={12} strokeWidth={3} />} */}
                        {item.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <Link 
                      to={`/reservations/flights/${item.id}`}
                      className="p-2.5 bg-slate-50 text-slate-400 hover:bg-black hover:text-white rounded-xl transition-all border border-slate-100 inline-flex items-center justify-center group/btn shadow-sm hover:shadow-md"
                    >
                      <Eye size={18} className="group-hover/btn:scale-110 transition-transform" />
                    </Link>
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

export default Flights;
