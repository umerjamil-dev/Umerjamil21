import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Car, Search, Filter,
  Truck, Navigation, MoreHorizontal,
  MapPin, Clock, ShieldCheck,
  UserCheck, Eye, Trash2
} from 'lucide-react';
import useTransportStore from '../store/useTransportStore';
import usePagination from '../hooks/usePagination';
import Pagination from '../components/Pagination';

const Transport = () => {
  const { transports, fetchTransports, isLoading } = useTransportStore();
  const [searchTerm, setSearchTerm] = React.useState('');

  useEffect(() => {
    fetchTransports();
  }, [fetchTransports]);

  const transportData = Array.isArray(transports) ? transports : [];

  const filtered = React.useMemo(() => {
    return transportData.filter(t => 
      // t.type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.customer_full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.vehicle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.driver?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [transportData, searchTerm]);

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
   <>
    <div className="space-y-12 animate-in fade-in duration-1000 font-inter pb-20">
      {/* Premium Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 pb-8 border-b border-slate-200">
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-[var(--desert-gold)] uppercase tracking-[0.4em] text-[9px] font-black opacity-80">
            <Truck size={14} strokeWidth={3} />
            Ground Logistics Network
          </div>
          <h1 className="text-5xl font-manrope font-extrabold text-slate-900 tracking-tighter leading-tight">
            Transport
          </h1>
          <p className="text-slate-500 text-sm font-medium max-w-xl leading-relaxed">
            Dispatching airport transfers, inter-city mobility, and guided Ziyarat caravans.
          </p>
        </div>
        <button
          className="px-10 py-5 bg-black text-white rounded-xl text-[10px] font-black uppercase tracking-[0.4em] shadow-xl hover:bg-[var(--desert-gold)] hover:text-black transition-all flex items-center gap-3"
        >
          <Car size={18} strokeWidth={3} />
          Dispatch Vehicle Protocol
        </button>
      </div>

      {/*  Ledger */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden relative">
        <div className="p-8 border-b border-slate-100 flex flex-wrap gap-4 items-center justify-between bg-slate-50/50">
          <div className="relative w-full md:w-[400px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Search by occupant, driver, vehicle..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 text-sm outline-none focus:border-black transition-all placeholder-slate-400 font-medium bg-white" 
            />
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-xl text-[10px] font-black text-slate-600 uppercase tracking-widest hover:border-black transition-all">
              <Filter size={14} /> Matrix Filter
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white border-b border-slate-100">
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] w-1/4">Transit Node & Vector</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] w-1/5">Occupant Entity</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] w-1/4">Vehicle & Captain Index</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] w-1/5">Temporal Sync</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] text-right">Protocol Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr><td colSpan="5" className="py-20 text-center text-sm font-bold uppercase tracking-widest text-slate-400 opacity-50">Auditing Logistics Manifest...</td></tr>
              ) : paginatedData.length === 0 ? (
                <tr><td colSpan="5" className="py-20 text-center text-sm font-bold uppercase tracking-widest text-slate-400 opacity-50">No transport records found for current cycle.</td></tr>
              ) : paginatedData.map((item) => (
                <tr key={item.id} className="group hover:bg-slate-50 transition-all cursor-pointer">
                  <td className="px-8 py-6 text-black">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center border border-slate-200 text-slate-600 group-hover:border-black group-hover:bg-black group-hover:text-white transition-all shadow-sm">
                        <Car size={20} strokeWidth={2.5} />
                      </div>
                      <div>
                        <p className="text-[12px] font-black text-slate-900 uppercase tracking-widest leading-relaxed">{item.type}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] flex items-center gap-1.5 mt-1">
                          <MapPin size={10} /> Route Protocol Active
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-black">
                    <p className="text-sm font-black text-slate-900 leading-none">
                      {item.customer_full_name || 'Occupant Entity Placeholder'}
                    </p>
                  </td>
                  <td className="px-8 py-6 text-black">
                    <div className="flex flex-col gap-2">
                      <span className="text-xs font-bold text-slate-700 bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-xl inline-block w-fit">
                        {item.vehicle}
                      </span>
                      <span className="text-[10px] font-black uppercase tracking-[0.1em] text-slate-500 flex items-center gap-2">
                        <UserCheck size={12} className="text-slate-400" />
                        {item.driver}
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-black">
                    <div className="flex flex-col gap-1.5">
                      <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest flex items-center gap-2">
                        <Clock size={12} className="text-[var(--desert-gold)]" strokeWidth={3} />
                        {item.date}
                      </span>
                      <span className={`px-2 py-1 rounded inline-flex w-fit text-[9px] font-black uppercase tracking-[0.2em] border ${item.status === 'Confirmed' ? 'bg-[var(--sacred-emerald)]/10 text-[var(--sacred-emerald)] border-[var(--sacred-emerald)]/20' :
                        item.status === 'Scheduled' ? 'bg-blue-50 text-blue-600 border-blue-200' :
                          'bg-slate-50 text-slate-400 border-slate-200'
                        }`}>
                        {item.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <Link 
                      to={`/reservations/transport/${item.id}`}
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
        <Pagination 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={goToPage}
          startIndex={startIndex}
          endIndex={endIndex}
          totalItems={totalItems}
        />
      </div>
    </div>
   
   </>
  );
};

export default Transport;
