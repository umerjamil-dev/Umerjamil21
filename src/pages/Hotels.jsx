import React, { useEffect } from 'react';
import {
  Hotel, Search, Filter,
  MapPin, CheckCircle2, Navigation,
  MoreHorizontal, BedDouble, CalendarDays
} from 'lucide-react';
import useHotelStore from '../store/useHotelStore';

const Hotels = () => {
  const { hotels, fetchHotels, isLoading } = useHotelStore();

  useEffect(() => {
    fetchHotels();
  }, [fetchHotels]);

  const hotelData = hotels && hotels.length > 0 ? hotels : [
    {
      id: 'HTL-901',
      customer: 'Ahmed Raza',
      hotelName: 'Swissôtel Makkah',
      city: 'Makkah',
      checkIn: '10 Apr 2024',
      checkOut: '17 Apr 2024',
      rooms: '2 Double, 1 Suite',
      status: 'Confirmed'
    },
    {
      id: 'HTL-902',
      customer: 'Ahmed Raza',
      hotelName: 'Pullman Zamzam',
      city: 'Madinah',
      checkIn: '17 Apr 2024',
      checkOut: '25 Apr 2024',
      rooms: '2 Double, 1 Suite',
      status: 'Confirmed'
    },
    {
      id: 'HTL-903',
      customer: 'Fatima Zahra',
      hotelName: 'Fairmont Makkah Clock Royal',
      city: 'Makkah',
      checkIn: '05 Jun 2024',
      checkOut: '15 Jun 2024',
      rooms: '1 Executive Suite',
      status: 'Awaiting Voucher'
    },
    {
      id: 'HTL-904',
      customer: 'Zubair Ahmed',
      hotelName: 'Dar Al Taqwa',
      city: 'Madinah',
      checkIn: '02 May 2024',
      checkOut: '09 May 2024',
      rooms: '1 Triple Room',
      status: 'Pending'
    }
  ];


  return (
    <div className="space-y-12 animate-in fade-in duration-1000 font-inter pb-20">
      {/* Premium Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 pb-8 border-b border-slate-200">
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-[var(--desert-gold)] uppercase tracking-[0.4em] text-[9px] font-black opacity-80">
            <BedDouble size={14} strokeWidth={3} />
            Hospitality Grid
          </div>
          <h1 className="text-5xl font-manrope font-extrabold text-slate-900 tracking-tighter leading-tight">
            Hotel
          </h1>
          <p className="text-slate-500 text-sm font-medium max-w-xl leading-relaxed">
            Centralized orchestration of luxury accommodations across Makkah and Madinah hospitality sectors.
          </p>
        </div>
        <button
          className="px-10 py-5 bg-black text-white rounded-xl text-[10px] font-black uppercase tracking-[0.4em] shadow-xl hover:bg-[var(--desert-gold)] hover:text-black transition-all flex items-center gap-3"
        >
          <Hotel size={18} strokeWidth={3} />
          Procure New Block
        </button>
      </div>

      {/*  Ledger */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden relative">
        <div className="p-8 border-b border-slate-100 flex flex-wrap gap-4 items-center justify-between bg-slate-50/50">
          <div className="relative w-full md:w-[400px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input type="text" placeholder="Search by pilgrim name, hotel brand..." className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 text-sm outline-none focus:border-black transition-all placeholder-slate-400 font-medium bg-white" />
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-xl text-[10px] font-black text-slate-600 uppercase tracking-widest hover:border-black transition-all">
              <MapPin size={14} /> Makkah Sectors
            </button>
            <button className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-xl text-[10px] font-black text-slate-600 uppercase tracking-widest hover:border-black transition-all">
              <MapPin size={14} /> Madinah Sectors
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white border-b border-slate-100">
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] w-1/4">Hospitality Node</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] w-1/5">Occupant</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] w-1/5">Temporal Window</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] w-1/5">Inventory Configuration</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] text-right">Protocol Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr><td colSpan="5" className="py-20 text-center text-sm font-bold uppercase tracking-widest text-slate-400 opacity-50">Querying Hospitality Ledger...</td></tr>
              ) : hotelData.length === 0 ? (
                <tr><td colSpan="5" className="py-20 text-center text-sm font-bold uppercase tracking-widest text-slate-400 opacity-50">No hospitality records found.</td></tr>
              ) : hotelData.map((item) => (
                <tr key={item.id} className="group hover:bg-slate-50 transition-all cursor-pointer">
                  <td className="px-8 py-6 text-black">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center border border-slate-200 text-slate-400 group-hover:text-black group-hover:border-black transition-all">
                        <Hotel size={20} strokeWidth={2} />
                      </div>
                      <div>
                        <p className="text-base font-manrope font-black text-slate-900 tracking-tight leading-none mb-1">{item.hotelName}</p>
                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest flex items-center gap-1.5 mt-1.5">
                          <MapPin size={10} /> {item.city}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-black">
                    <p className="text-sm font-black text-slate-900 leading-none">{item.customer}</p>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-2 text-[10px] font-black text-slate-600 uppercase tracking-widest bg-emerald-50 text-emerald-700 px-2 py-1 rounded inline-flex w-fit">
                        <Navigation size={10} className="transform rotate-90" />
                        IN: {item.checkIn}
                      </div>
                      <div className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest bg-slate-100 text-slate-600 px-2 py-1 rounded inline-flex w-fit">
                        <Navigation size={10} className="transform -rotate-90" />
                        OUT: {item.checkOut}
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-black">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-[10px] font-bold text-slate-600">
                      <BedDouble size={14} /> {item.rooms}
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-4 text-black">
                      <span className={`px-4 py-1.5 rounded-full text-[8.5px] font-black uppercase tracking-[0.2em] inline-flex items-center gap-2 ${item.status === 'Confirmed' ? 'bg-[var(--sacred-emerald)]/10 text-[var(--sacred-emerald)]' :
                        'bg-orange-50 text-orange-600'
                        }`}>
                        {item.status}
                      </span>
                      <button className="p-2 text-slate-300 hover:text-black hover:bg-white rounded-xl transition-all shadow-sm border border-transparent hover:border-slate-200">
                        <MoreHorizontal size={20} />
                      </button>
                    </div>
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

export default Hotels;
