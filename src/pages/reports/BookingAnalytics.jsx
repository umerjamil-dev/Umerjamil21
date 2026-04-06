import React, { useEffect, useState } from 'react';
import { 
  BarChart3, Calendar, User, Package, Hash, 
  Download, RefreshCw 
} from 'lucide-react';
import useReportStore from '../../store/useReportStore';
import useCustomerStore from '../../store/useCustomerStore';
import usePackageStore from '../../store/usePackageStore';
import useBookingStore from '../../store/useBookingStore';
import { toast } from 'react-hot-toast';

const BookingAnalytics = () => {
  const { fetchPdfReport, isLoading } = useReportStore();
  const { customers, fetchCustomers } = useCustomerStore();
  const { packages, fetchPackages } = usePackageStore();
  const { bookings, fetchBookings } = useBookingStore();

  const [filters, setFilters] = useState({
    from_date: '',
    to_date: '',
    customer_id: '',
    package_id: '',
    booking_id: ''
  });

  const [pdfUrl, setPdfUrl] = useState('');

  const loadPdf = async (currentFilters) => {
    const dataUri = await fetchPdfReport('booking-analytics', currentFilters);
    if (dataUri) {
      setPdfUrl(dataUri);
    } else {
      toast.error("Failed to generate report PDF");
    }
  };

  useEffect(() => {
    fetchCustomers();
    fetchPackages();
    fetchBookings();
    loadPdf(filters);
  }, []);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const applyFilters = () => {
    loadPdf(filters);
  };

  const resetFilters = () => {
    const cleared = { from_date: '', to_date: '', customer_id: '', package_id: '', booking_id: '' };
    setFilters(cleared);
    loadPdf(cleared);
  };

  const bookingsToShow = Array.isArray(bookings) ? bookings : Object.values(bookings || {});

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-20 font-inter">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-[var(--desert-gold)] uppercase tracking-[0.3em] text-[10px] font-black mb-2">
            <BarChart3 size={14} /> Analytics Hub
          </div>
          <h1 className="text-4xl font-manrope font-black text-slate-900 tracking-tight">Booking Analytics</h1>
          <p className="text-slate-500 text-sm mt-1">Deep-dive into reservation trends and inventory performance.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-4 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-black transition-all">
            <Download size={20} />
          </button>
          <button 
            onClick={applyFilters}
            disabled={isLoading}
            className="px-8 py-4 bg-black text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[var(--desert-gold)] hover:text-black transition-all shadow-xl disabled:opacity-50"
          >
            {isLoading ? 'Generating...' : 'Update Analytics'}
          </button>
        </div>
      </div>

      {/* Filter Matrix */}
      <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <Calendar size={12} /> From Date
            </label>
            <input 
              type="date"
              name="from_date"
              value={filters.from_date}
              onChange={handleFilterChange}
              className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-bold outline-none focus:border-black transition-all"
            />
          </div>
          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <Calendar size={12} /> To Date
            </label>
            <input 
              type="date"
              name="to_date"
              value={filters.to_date}
              onChange={handleFilterChange}
              className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-bold outline-none focus:border-black transition-all"
            />
          </div>
          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <User size={12} /> Client
            </label>
            <select 
              name="customer_id"
              value={filters.customer_id}
              onChange={handleFilterChange}
              className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-bold outline-none focus:border-black transition-all"
            >
              <option value="">All Clients</option>
              {customers.map(c => (
                <option key={c.id} value={c.id}>{c.firstName} {c.lastName}</option>
              ))}
            </select>
          </div>
          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <Package size={12} /> Package
            </label>
            <select 
              name="package_id"
              value={filters.package_id}
              onChange={handleFilterChange}
              className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-bold outline-none focus:border-black transition-all"
            >
              <option value="">All Packages</option>
              {packages.map(p => (
                <option key={p.id} value={p.id}>{p.name || p.title}</option>
              ))}
            </select>
          </div>
          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <Hash size={12} /> Booking ID
            </label>
            <select 
              name="booking_id"
              value={filters.booking_id}
              onChange={handleFilterChange}
              className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-bold outline-none focus:border-black transition-all"
            >
              <option value="">Search IDs...</option>
              {bookingsToShow.map(b => (
                <option key={b.id} value={b.id}>#{b.id}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-slate-50">
          <button 
            onClick={resetFilters}
            className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-black transition-all"
          >
            <RefreshCw size={14} /> Reset Filters
          </button>
        </div>
      </div>

      {/* Content Area - PDF Viewer */}
      <div className="bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-800 h-[800px] animate-in zoom-in-95 duration-500 relative">
         {isLoading && (
           <div className="absolute inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center">
             <div className="flex flex-col items-center gap-4">
               <RefreshCw className="animate-spin text-[var(--desert-gold)]" size={40} />
               <span className="text-[10px] font-black text-white uppercase tracking-widest">Generating Base64 Ledger...</span>
             </div>
           </div>
         )}
         
         <div className="h-full w-full flex flex-col">
            <div className="p-4 bg-slate-800 border-b border-slate-700 flex items-center justify-between">
               <div className="flex items-center gap-4">
                  <div className="flex gap-1.5">
                     <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                     <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                     <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                  </div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Protocol PDF Generator v1.0</span>
               </div>
               <a 
                  href={pdfUrl} 
                  download="booking-report.pdf"
                  className="flex items-center gap-2 text-[10px] font-black text-blue-400 hover:text-blue-300 uppercase tracking-widest transition-all"
               >
                  <Download size={14} /> Export Native File
               </a>
            </div>
            {pdfUrl ? (
              <iframe 
                src={pdfUrl} 
                className="w-full h-full bg-white border-none"
                title="Booking Report PDF"
              />
            ) : (
              <div className="flex-1 flex items-center justify-center text-slate-500 italic text-sm">
                Awaiting report parameters...
              </div>
            )}
         </div>
      </div>
    </div>
  );
};

export default BookingAnalytics;
