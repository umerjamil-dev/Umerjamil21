import React, { useEffect, useState } from 'react';
import { 
  CreditCard, Calendar, User, Download, 
  RefreshCw
} from 'lucide-react';
import useReportStore from '../../store/useReportStore';
import useCustomerStore from '../../store/useCustomerStore';
import { toast } from 'react-hot-toast';

const PaymentReports = () => {
  const { fetchPdfReport, isLoading } = useReportStore();
  const { customers, fetchCustomers } = useCustomerStore();

  const [filters, setFilters] = useState({
    from_date: '',
    to_date: '',
    customer_id: ''
  });

  const [pdfUrl, setPdfUrl] = useState('');

  const loadPdf = async (currentFilters) => {
    const dataUri = await fetchPdfReport('payment-reports', currentFilters);
    if (dataUri) {
      setPdfUrl(dataUri);
    } else {
      toast.error("Failed to generate payment report");
    }
  };

  useEffect(() => {
    fetchCustomers();
    loadPdf(filters);
  }, []);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const applyFilters = () => {
    loadPdf(filters);
  };

  const resetFilters = () => {
    const cleared = { from_date: '', to_date: '', customer_id: '' };
    setFilters(cleared);
    loadPdf(cleared);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-20 font-inter">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-[var(--sacred-emerald)] uppercase tracking-[0.3em] text-[10px] font-black mb-2">
            <CreditCard size={14} /> Treasury Intelligence
          </div>
          <h1 className="text-4xl font-manrope font-black text-slate-900 tracking-tight">Payment Reports</h1>
          <p className="text-slate-500 text-sm mt-1">Consolidated ledger of all financial inflows and settlements.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-4 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-black transition-all">
            <Download size={20} />
          </button>
          <button 
            onClick={applyFilters}
            disabled={isLoading}
            className="px-8 py-4 bg-black text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[var(--sacred-emerald)] hover:text-white transition-all shadow-xl disabled:opacity-50"
          >
            {isLoading ? 'Generating...' : 'Fetch Ledger'}
          </button>
        </div>
      </div>

      {/* Filter Matrix */}
      <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
              <User size={12} /> Client Entity
            </label>
            <select 
              name="customer_id"
              value={filters.customer_id}
              onChange={handleFilterChange}
              className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-bold outline-none focus:border-black transition-all"
            >
              <option value="">Global Filter</option>
              {customers.map(c => (
                <option key={c.id} value={c.id}>{c.firstName} {c.lastName}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-slate-50">
          <button 
            onClick={resetFilters}
            className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-black transition-all"
          >
            <RefreshCw size={14} /> Clear Parameters
          </button>
        </div>
      </div>

      {/* Content Area - PDF Viewer */}
      <div className="bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-800 h-[800px] animate-in zoom-in-95 duration-500 relative">
        {isLoading && (
          <div className="absolute inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              <RefreshCw className="animate-spin text-[var(--sacred-emerald)]" size={40} />
              <span className="text-[10px] font-black text-white uppercase tracking-widest">Compiling Treasury PDF...</span>
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
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Treasury Report Viewer v1.0</span>
            </div>
            <a 
              href={pdfUrl} 
              download="payment-report.pdf"
              className="flex items-center gap-2 text-[10px] font-black text-emerald-400 hover:text-emerald-300 uppercase tracking-widest transition-all"
            >
              <Download size={14} /> Download PDF
            </a>
          </div>
          {pdfUrl ? (
            <iframe 
              src={pdfUrl} 
              className="w-full h-full bg-white border-none"
              title="Payment Report PDF"
            />
          ) : (
             <div className="flex-1 flex items-center justify-center text-slate-500 italic text-sm">
                Establishing financial parameters...
              </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentReports;
