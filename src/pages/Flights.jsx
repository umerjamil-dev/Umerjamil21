import React, { useEffect } from 'react';
import {
  Plane, Search, Filter,
  Clock, CheckCircle2, MoreHorizontal,
  Cloud, Navigation, ShieldCheck
} from 'lucide-react';
import useFlightStore from '../store/useFlightStore';

const Flights = () => {
  const { flights, fetchFlights, isLoading } = useFlightStore();

  useEffect(() => {
    fetchFlights();
  }, [fetchFlights]);

  const flightData = flights && flights.length > 0 ? flights : [
    {
      id: 'FLT-101',
      customer: 'Ahmed Raza',
      airline: 'Saudia',
      departure: '10 Apr 2024, 08:30 AM',
      arrival: '10 Apr 2024, 01:15 PM',
      ticketNumber: '065-8910293845',
      status: 'Ticketed'
    },
    {
      id: 'FLT-102',
      customer: 'Ahmed Raza',
      airline: 'Saudia',
      departure: '25 Apr 2024, 09:40 PM',
      arrival: '26 Apr 2024, 02:00 AM',
      ticketNumber: '065-8910293846',
      status: 'Ticketed'
    },
    {
      id: 'FLT-103',
      customer: 'Fatima Zahra',
      airline: 'Qatar Airways',
      departure: '05 Jun 2024, 11:20 AM',
      arrival: '05 Jun 2024, 06:10 PM',
      ticketNumber: 'Pending Queue',
      status: 'Processing'
    },
    {
      id: 'FLT-104',
      customer: 'Zubair Ahmed',
      airline: 'Emirates',
      departure: '02 May 2024, 04:00 AM',
      arrival: '02 May 2024, 08:30 AM',
      ticketNumber: '176-9921238472',
      status: 'Ticketed'
    }
  ];


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
            <input type="text" placeholder="Search by passenger, ticket, airline..." className="w-full pl-12 pr-4 py-3 rounded-lg border border-slate-200 text-sm outline-none focus:border-black transition-all placeholder-slate-400 font-medium bg-white" />
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-lg text-[10px] font-black text-slate-600 uppercase tracking-widest hover:border-black transition-all">
              <Filter size={14} /> Filter Routes
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white border-b border-slate-100">
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] w-1/5">Carrier Node</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] w-1/5">Passenger</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] w-1/4">Departure/Arrival Vector</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] w-1/5">E-Ticket Ledger</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr><td colSpan="5" className="py-20 text-center text-sm font-bold uppercase tracking-widest text-slate-400 opacity-50">Auditing Flight Manifest...</td></tr>
              ) : flightData.length === 0 ? (
                <tr><td colSpan="5" className="py-20 text-center text-sm font-bold uppercase tracking-widest text-slate-400 opacity-50">No flight records found in current cycle.</td></tr>
              ) : flightData.map((item) => (
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
                    <p className="text-sm font-black text-slate-900 leading-none">{item.customer}</p>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2 text-[10px] font-black text-slate-600 uppercase tracking-widest px-2 py-1 rounded inline-flex w-fit bg-slate-50 border border-slate-200">
                        <Navigation size={10} className="transform rotate-45 text-[var(--desert-gold)]" />
                        A: {item.departure}
                      </div>
                      <div className="flex items-center gap-2 text-[10px] font-black text-slate-600 uppercase tracking-widest px-2 py-1 rounded inline-flex w-fit bg-slate-50 border border-slate-200">
                        <Navigation size={10} className="transform rotate-135 text-[var(--sacred-emerald)]" />
                        D: {item.arrival}
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex flex-col gap-1.5 text-black">
                      <span className="text-xs font-mono font-bold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 inline-block w-fit">
                        {item.ticketNumber}
                      </span>
                      <span className={`text-[9px] font-black uppercase tracking-[0.2em] inline-flex items-center gap-1.5 ${item.status === 'Ticketed' ? 'text-[var(--sacred-emerald)]' :
                          'text-[var(--desert-gold)]'
                        }`}>
                        {item.status === 'Ticketed' ? <ShieldCheck size={12} strokeWidth={3} /> : <Clock size={12} strokeWidth={3} />}
                        {item.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button className="p-2 text-slate-300 hover:text-black hover:bg-white rounded-lg transition-all shadow-sm border border-transparent hover:border-slate-200">
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

export default Flights;
