import React, { useEffect } from 'react';
import {
  Users, Search, Filter,
  MapPin, Phone, FileText,
  ChevronRight, ShieldCheck,
  Plane, Hotel, Star,
  Download,
  Plus,
  Globe
} from 'lucide-react';
import { Link } from 'react-router-dom';
import useCustomerStore from '../store/useCustomerStore';
import usePagination from '../hooks/usePagination';
import Pagination from '../components/Pagination';

const Customers = () => {
  const { customers, fetchCustomers, isLoading } = useCustomerStore();
  const [searchTerm, setSearchTerm] = React.useState('');

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  const customersToShow = customers;
  
  const filtered = React.useMemo(() => {
    return (customersToShow || []).filter(c => {
      const name = `${c.firstName || ''} ${c.lastName || ''}`.trim() || c.name || '';
      return name.toLowerCase().includes(searchTerm.toLowerCase()) || 
             c.passportNo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
             c.id?.toString().includes(searchTerm);
    });
  }, [customersToShow, searchTerm]);

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
    <div  className="space-y-12 animate-in fade-in duration-1000 font-inter">
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-4">
        <div>
          <h1 className="text-[2.5rem] font-manrope font-extrabold text-[var(--on-surface)] tracking-tight">Customers </h1>
          <p className="mt-2 text-sm font-medium text-[var(--on-surface-variant)] tracking-wide">The definitive collective of sacred travelers.</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-6 py-4 bg-[var(--surface-container-lowest)] border border-[var(--outline-variant)] rounded-xl text-[10px] font-bold text-[var(--on-surface-variant)] uppercase   hover:text-[var(--on-surface)] transition-all group">
            <Download size={16} strokeWidth={2} />
            Analytics Export
          </button>
          
          <Link
            to="/customers/add"
            className="btn-primary flex items-center gap-2 px-8 py-4 text-[10px] font-extrabold uppercase tracking-[0.25em] shadow-xl shadow-black/10 hover:shadow-2xl transition-all rounded-xl"
          >
            <Plus size={18} strokeWidth={2.5} />
            Register Customer
          </Link>
        </div>
      </div>

      {/* Stats Summary - Bento No-Line Style */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Registries', value: customers.length, icon: Users, bg: '#616B7B' },
          { label: 'Visa Approved', value: Math.floor(customers.length * 0.7), icon: ShieldCheck, bg: '#636569' },
          { label: 'Flight Ready', value: Math.floor(customers.length * 0.4), icon: Plane, bg: '#726888' },
          { label: 'Hospitality', value: Math.floor(customers.length * 0.9), icon: Hotel, bg: '#A5413D' },
        ].map((stat, i) => (
          <div key={i} className="bg-[var(--surface-container-lowest)] rounded-xl p-8 border border-[var(--outline-variant)] shadow-sm flex flex-col gap-6 group hover:bg-[var(--surface-container-high)] transition-all cursor-default relative overflow-hidden">
            <div 
               className="w-12 h-12 rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-all relative z-10 shadow-lg"
               style={{ backgroundColor: stat.bg }}
            >
              <stat.icon size={20} className="text-white" />
            </div>
            <div className="relative z-10">
              <p className="text-3xl font-manrope font-extrabold text-[var(--on-surface)] tracking-tighter">{stat.value}</p>
              <p className="text-[10px] font-extrabold text-[var(--on-surface-variant)] uppercase tracking-widest mt-1.5">{stat.label}</p>
            </div>
            <div className="absolute top-0 right-0 w-24 h-24 opacity-5 pointer-events-none" style={{ backgroundColor: stat.bg }}></div>
          </div>
        ))}
      </div>

      {/* Database Container */}
      <div className="space-y-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="relative w-full lg:w-[480px] group">
            <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-[var(--on-surface-variant)] group-focus-within:text-[var(--on-surface)] transition-colors" size={20} />
            <input
              type="text"
              placeholder="Passport, identification or nomenclature..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-4 bg-transparent border-b border-[var(--outline-variant)] rounded-none text-sm outline-none focus:border-[var(--on-surface)] text-[var(--on-surface)] transition-all font-medium placeholder-[var(--on-surface-variant)]"
            />
          </div>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-5 py-3 bg-[var(--surface-container-low)]   rounded-xl text-[10px] font-bold text-[var(--on-surface-variant)] uppercase tracking-widest hover:bg-[var(--surface-container-high)] transition-all">
              <Filter size={14} />
              Filters
            </button>
            <button className="flex items-center gap-2 px-5 py-3 bg-[var(--surface-container-low)]   rounded-xl text-[10px] font-bold text-[var(--on-surface-variant)] uppercase tracking-widest hover:bg-[var(--surface-container-high)] transition-all">
              Group Logic
            </button>
          </div>
        </div>

        {/* Ledger Table - No Line Philosophy */}
        <div className="bg-[var(--surface-container-lowest)] rounded-3xl shadow-sm border border-[var(--outline-variant)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[var(--surface)] border-b border-[var(--outline-variant)]">
                  <th className="px-10 py-6 text-[10px] font-manrope font-extrabold text-[var(--on-surface-variant)] uppercase tracking-[0.25em]">Pilgrim Nomenclature</th>
                  <th className="px-10 py-6 text-[10px] font-manrope font-extrabold text-[var(--on-surface-variant)] uppercase tracking-[0.25em]">Passport Registry</th>
                  <th className="px-10 py-6 text-[10px] font-manrope font-extrabold text-[var(--on-surface-variant)] uppercase tracking-[0.25em]">Status Index</th>
                  <th className="px-10 py-6 text-[10px] font-manrope font-extrabold text-[var(--on-surface-variant)] uppercase tracking-[0.25em]">Residency</th>
                  <th className="px-10 py-6 text-[10px] font-manrope font-extrabold text-[var(--on-surface-variant)] uppercase tracking-[0.25em] text-right">Operation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--outline-variant)]/30">
                {isLoading ? (
                  <tr>
                    <td colSpan="5" className="px-10 py-20 text-center text-sm font-bold uppercase tracking-widest text-[var(--on-surface-variant)] opacity-50 italic">
                      Querying Customer Registry...
                    </td>
                  </tr>
                ) : paginatedData.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-10 py-20 text-center text-sm font-bold uppercase tracking-widest text-[var(--on-surface-variant)] opacity-50 italic">
                      No pilgrims found in the current cycle.
                    </td>
                  </tr>
                ) : paginatedData.map((customer) => {
                  const fullName = `${customer.firstName || ''} ${customer.lastName || ''}`.trim() || customer.name || 'Unnamed Pilgrim';
                  const initials = fullName.split(' ').map(n => n[0]).join('').slice(0, 2);

                  return (
                    <tr key={customer.id} className="group hover:bg-[var(--surface-container-high)] transition-all cursor-pointer">
                      <td className="px-10 py-6">
                        <div className="flex items-center gap-5">
                          <div className="w-12 h-12 rounded-xl bg-[#111827] text-white flex items-center justify-center font-manrope font-extrabold text-base border border-[var(--outline-variant)] overflow-hidden">
                            {customer.photo ? (
                              <img src={customer.photo} alt="" className="w-full h-full object-cover" />
                            ) : initials}
                          </div>
                          <div>
                            <Link to={`/customers/${customer.id}`} className="block text-[13px] font-manrope font-extrabold text-[var(--on-surface)] group-hover:text-[var(--primary)] transition-colors tracking-tight">
                              {fullName}
                            </Link>
                            <p className="text-[9px] font-bold text-[var(--on-surface-variant)] uppercase tracking-widest mt-1.5 opacity-60">ID: {customer.id} <span className="mx-1 opacity-20">•</span> {customer.phone}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-10 py-6">
                        <div className="flex items-center gap-2">
                           <ShieldCheck size={12} className="text-[var(--sacred-emerald)]" />
                           <span className="text-[11px] font-extrabold text-[var(--on-surface)] tracking-widest uppercase">{customer.passportNo || 'Required'}</span>
                        </div>
                      </td>
                      <td className="px-10 py-6">
                        <span className={`px-4 py-1.5 rounded-xl text-[8px] font-black uppercase tracking-widest border shadow-sm ${
                          customer.status === 'Active' ? 'bg-[var(--grad-green)] text-black border-green-200' :
                          customer.status === 'Completed' ? 'bg-[var(--grad-black)] text-black border-black/10' : 
                          'bg-[var(--grad-gold)] text-black border-amber-200'
                        }`}>
                          {customer.status || 'Active'}
                        </span>
                      </td>
                      <td className="px-10 py-6">
                        <div className="flex items-center gap-2">
                           <MapPin size={12} className="text-[var(--on-surface-variant)]" />
                           <span className="text-[10px] font-extrabold text-[var(--on-surface-variant)] uppercase tracking-widest">{customer.city || 'Pending'}</span>
                        </div>
                      </td>
                      <td className="px-10 py-6 text-right">
                        <div className="flex items-center justify-end">
                           <Link 
                            to={`/customers/${customer.id}`}
                            className="w-10 h-10 rounded-xl bg-[var(--surface-container-low)] border border-[var(--outline-variant)] flex items-center justify-center text-[var(--on-surface)] group-hover:bg-[#111827] group-hover:text-white transition-all shadow-sm"
                          >
                            <ChevronRight size={16} />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
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
  );
};

export default Customers;
