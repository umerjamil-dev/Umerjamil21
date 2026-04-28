import React, { useEffect, useState } from 'react';
import {
  Calendar, Download, RefreshCw,
  ClipboardList, Users
} from 'lucide-react';
import useReportStore from '../../store/useReportStore';
import useCustomerStore from '../../store/useCustomerStore';
import { toast } from 'react-hot-toast';

const ServiceStatusReport = () => {
  const { fetchPdfReport, isLoading } = useReportStore();
  const { customers, fetchCustomers } = useCustomerStore();

  const [filters, setFilters] = useState({
    from_date: '',
    to_date: '',
    customer_id: ''
  });

  const [pdfUrl, setPdfUrl] = useState('');

  const loadPdf = async (currentFilters) => {
    const dataUri = await fetchPdfReport('service-status', currentFilters);
    if (dataUri) {
      setPdfUrl(dataUri);
    } else {
      toast.error("Failed to generate service status report");
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
    <>

      <div className="space-y-8 animate-in fade-in duration-700 pb-20 font-inter">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-blue-600 uppercase tracking-[0.3em] text-[10px] font-medium mb-2">
              <ClipboardList size={14} /> Operational Insights
            </div>
            <h1 className="text-4xl font-manrope font-medium text-slate-900 tracking-tight">Service Status Report</h1>
            <p className="text-slate-500 text-sm mt-1">Detailed tracking of service fulfillment and customer status.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-4 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-black transition-all">
              <Download size={20} />
            </button>
            <button
              onClick={applyFilters}
              disabled={isLoading}
              className="px-8 py-4 bg-black text-white rounded-xl text-[10px] font-medium uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all shadow-xl disabled:opacity-50"
            >
              {isLoading ? 'Wait...' : 'Refresh Metrics'}
            </button>
          </div>
        </div>

        {/* Temporal Contraints & Customer Selection */}
        <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm flex flex-col md:flex-row gap-8 items-end">
          <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            {/* Customer Dropdown */}
            <div className="space-y-3">
              <label className="text-[10px] font-medium text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <Users size={12} /> Select Customer
              </label>
              <select
                name="customer_id"
                value={filters.customer_id}
                onChange={handleFilterChange}
                className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:border-black transition-all appearance-none cursor-pointer"
              >
                <option value="">All Customers</option>
                {customers.map(customer => (
                  <option key={customer.id} value={customer.id}>
                    {customer.full_name || customer.name || `Customer #${customer.id}`}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-medium text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <Calendar size={12} /> Start Window
              </label>
              <input
                type="date"
                name="from_date"
                value={filters.from_date}
                onChange={handleFilterChange}
                className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:border-black transition-all"
              />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-medium text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <Calendar size={12} /> End Window
              </label>
              <input
                type="date"
                name="to_date"
                value={filters.to_date}
                onChange={handleFilterChange}
                className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:border-black transition-all"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <button
              onClick={resetFilters}
              className="px-6 py-3 border border-slate-100 rounded-xl text-[10px] font-medium text-slate-400 uppercase tracking-widest hover:text-black transition-all"
            >
              Reset
            </button>
            <button
              onClick={applyFilters}
              disabled={isLoading}
              className="px-6 py-3 bg-slate-900 text-white rounded-xl text-[10px] font-medium uppercase tracking-widest hover:bg-black transition-all shadow-sm disabled:opacity-50"
            >
              {isLoading ? 'Processing...' : 'Fetch Report'}
            </button>
          </div>
        </div>

        {/* Content Area - PDF Viewer */}
        <div className="bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-800 h-[800px] animate-in zoom-in-95 duration-500 relative">
          {isLoading && (
            <div className="absolute inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center">
              <div className="flex flex-col items-center gap-4">
                <RefreshCw className="animate-spin text-blue-500" size={40} />
                <span className="text-[10px] font-medium text-white uppercase tracking-widest">Aggregating Report Data...</span>
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
                <span className="text-[10px] font-medium text-slate-400 uppercase tracking-widest">Service Status PDF Viewer</span>
              </div>
              <a
                href={pdfUrl}
                download="service-status-report.pdf"
                className="flex items-center gap-2 text-[10px] font-medium text-blue-400 hover:text-blue-300 uppercase tracking-widest transition-all"
              >
                <Download size={14} /> Download PDF
              </a>
            </div>
            {pdfUrl ? (
              <iframe
                src={pdfUrl}
                className="w-full h-full bg-white border-none"
                title="Service Status PDF"
              />
            ) : (
              <div className="flex-1 flex items-center justify-center text-slate-500 italic text-sm">
                Awaiting report generation...
              </div>
            )}
          </div>
        </div>
      </div>



    </>
  );
};

export default ServiceStatusReport;
