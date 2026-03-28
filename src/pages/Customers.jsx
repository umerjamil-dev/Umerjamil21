import React, { useEffect } from 'react';
import {
  Users, Search, Filter,
  MapPin, Phone, FileText,
  ChevronRight, ShieldCheck,
  Plane, Hotel, Star,
  Download,
  Plus
} from 'lucide-react';
import { Link } from 'react-router-dom';
import useCustomerStore from '../store/useCustomerStore';

const Customers = () => {
  const { customers, fetchCustomers, isLoading } = useCustomerStore();

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  const customersToShow = customers && customers.length > 0 ? customers : [
    { id: 'CID-5001', name: 'Zaid bin Harith', location: 'Lahore, PK', group: 'Hajj 2024 (Group A)', status: 'Active', phone: '+92 312 0000000', travelDate: '2024-06-12', docs: 4 },
    { id: 'CID-5002', name: 'Mariam Ali', location: 'Islamabad, PK', group: 'Umrah Premium', status: 'Completed', phone: '+92 333 1111111', travelDate: '2024-02-15', docs: 3 },
    { id: 'CID-5003', name: 'Omar Farooq', location: 'Karachi, PK', group: 'Hajj 2024 (Group B)', status: 'Active', phone: '+92 301 2222222', travelDate: '2024-06-15', docs: 5 },
    { id: 'CID-5004', name: 'Ayesha Siddiqa', location: 'Peshawar, PK', group: 'Umrah Standard', status: 'Processing', phone: '+92 345 3333333', travelDate: '2024-04-10', docs: 2 },
  ];


  return (
    <div className="space-y-12 animate-in fade-in duration-1000 font-inter">
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-4">
        <div>
          <h1 className="text-[2.5rem] font-manrope font-extrabold text-[var(--on-surface)] tracking-tight">Customers </h1>
          <p className="mt-2 text-sm font-medium text-[var(--on-surface-variant)] tracking-wide">The definitive collective of sacred travelers.</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-6 py-4 bg-[var(--surface-container-lowest)] border border-[var(--outline-variant)] rounded-2xl text-[10px] font-bold text-[var(--on-surface-variant)] uppercase   hover:text-[var(--on-surface)] transition-all group">
            <Download size={16} strokeWidth={2} />
            Analytics Export
          </button>
          <Link
            to="/customers/add"
            className="btn-primary flex items-center gap-2 px-8 py-4 text-[10px] font-extrabold uppercase tracking-[0.25em] shadow-xl shadow-black/10 hover:shadow-2xl transition-all rounded-2xl"
          >
            <Plus size={18} strokeWidth={2.5} />
            Register Customer
          </Link>
        </div>
      </div>

      {/* Stats Summary - Bento No-Line Style */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Customers', value: '1,245', icon: Users, grad: 'var(--grad-black)' },
          { label: 'Visa Approved', value: '890', icon: ShieldCheck, grad: 'var(--grad-green)' },
          { label: 'Flight Ready', value: '450', icon: Plane, grad: 'var(--grad-black)' },
          { label: 'Hospitality', value: '1,120', icon: Hotel, grad: 'var(--grad-gold)' },
        ].map((stat, i) => (
          <div key={i} className="bg-[var(--surface-container-lowest)]    rounded-xl p-8 border border-[var(--outline-variant)] shadow-sm flex flex-col gap-6 group hover:bg-[var(--surface-container-high)] transition-all cursor-default relative overflow-hidden">
            <div className="w-12 h-12 rounded-2xl bg-[var(--surface)] flex items-center justify-center text-[var(--on-surface)] group-hover:bg-white group-hover:shadow-lg transition-all relative z-10">
              <stat.icon size={20} strokeWidth={1.5} style={{ color: 'var(--on-surface)' }} />
            </div>
            <div className="relative z-10">
              <p className="text-3xl font-manrope font-extrabold text-[var(--on-surface)] tracking-tighter">{stat.value}</p>
              <p className="text-[10px] font-extrabold text-[var(--on-surface-variant)] uppercase tracking-widest mt-1.5">{stat.label}</p>
            </div>
            <div className="absolute top-0 right-0 w-24 h-24 opacity-5 pointer-events-none" style={{ background: stat.grad }}></div>
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            <div className="col-span-full py-20 text-center text-sm font-bold uppercase tracking-widest text-[var(--on-surface-variant)] opacity-50">Querying Customer Registry...</div>
          ) : customersToShow.length === 0 ? (
            <div className="col-span-full py-20 text-center text-sm font-bold uppercase tracking-widest text-[var(--on-surface-variant)] opacity-50">No pilgrims found in the current cycle.</div>
          ) : customersToShow.map((customer) => (
            <div key={customer.id} className="group bg-[var(--surface-container-lowest)] hover:bg-[var(--surface-container-high)] rounded-xl p-8 border border-[var(--outline-variant)] shadow-sm transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between h-full">
              <div className="relative z-10 flex flex-col h-full uppercase tracking-widest">
                <div className="flex justify-between items-start mb-8">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[var(--surface)] flex items-center justify-center text-[var(--on-surface)] font-manrope font-extrabold text-base group-hover:bg-white group-hover:shadow-lg transition-all border border-[var(--outline-variant)]">
                      {customer.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h4 className="text-sm font-manrope font-extrabold text-[var(--on-surface)] tracking-tight leading-none mb-1.5">{customer.name}</h4>
                      <p className="text-[9px] font-bold text-[var(--on-surface-variant)] opacity-60 italic">{customer.id}</p>
                    </div>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-[8px] font-black shadow-sm ${customer.status === 'Active' ? 'bg-[var(--grad-green)] text-black' :
                    customer.status === 'Completed' ? 'bg-[var(--grad-black)] text-black' : 'bg-[var(--grad-gold)] text-black'
                    }`}>
                    {customer.status}
                  </span>
                </div>

                <div className="space-y-6 flex-grow">
                  <div className="flex items-center gap-2">
                    <MapPin size={10} className="text-[var(--on-surface-variant)]" />
                    <span className="text-[9px] font-bold text-[var(--on-surface-variant)]">{customer.location}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 py-6 border-y border-[var(--outline-variant)] group-hover:border-white/20 transition-colors">
                    <div>
                      <p className="text-[8px] font-bold text-[var(--on-surface-variant)] mb-1 opacity-50"></p>
                      <div className="flex items-center gap-1.5 text-[10px] font-extrabold text-[var(--on-surface)] truncate">
                        <Star size={10} className="text-[var(--desert-gold)]" />
                        {customer.group.split('(')[0]}
                      </div>
                    </div>
                    <div>
                      <p className="text-[8px] font-bold text-[var(--on-surface-variant)] mb-1 opacity-50">Departure</p>
                      <p className="text-[10px] font-extrabold text-[var(--on-surface)] truncate">{customer.travelDate}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-8">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5 text-[8px] font-bold text-[var(--on-surface-variant)]">
                      <FileText size={12} strokeWidth={2} />
                      <span>{customer.docs}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[8px] font-bold text-[var(--on-surface-variant)]">
                      <Phone size={12} strokeWidth={2} />
                      <span>{customer.phone.slice(-4)}</span>
                    </div>
                  </div>
                  <button className="w-10 h-10 rounded-xl bg-[var(--surface-container-low)] border border-[var(--outline-variant)] flex items-center justify-center text-[var(--on-surface)] group-hover:btn-midnight transition-all">
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-10 flex justify-center">
          <button className="px-12 py-4 bg-[var(--surface-container-lowest)] border border-[var(--outline-variant)] rounded-2xl text-[10px] font-extrabold text-[var(--on-surface-variant)] uppercase tracking-[0.25em] hover:text-[var(--on-surface)] hover:shadow-xl transition-all shadow-sm active:scale-95">
            Load Historical Database
          </button>
        </div>
      </div>
    </div>
  );
};

export default Customers;
