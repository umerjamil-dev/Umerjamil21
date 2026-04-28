import React, { useEffect, useMemo, useState } from 'react';
import {
  Users, Search, Filter,
  MapPin, Phone, FileText,
  ChevronRight, ShieldCheck,
  Plane, Hotel, Star,
  Download, Plus, Globe
} from 'lucide-react';
import { Link } from 'react-router-dom';
// Make sure to import your custom hooks/store
import useCustomerStore from '../store/useCustomerStore';
import usePagination from '../hooks/usePagination';
import Pagination from '../components/Pagination';

const Customers = () => {
  const { customers, fetchCustomers, isLoading } = useCustomerStore();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  // Filter Logic
  const filtered = useMemo(() => {
    return (customers || []).filter(c => {
      const name = `${c.firstName || ''} ${c.lastName || ''}`.trim() || c.name || '';
      return name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.passportNo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.id?.toString().includes(searchTerm);
    });
  }, [customers, searchTerm]);

  // Pagination Logic
  const {
    paginatedData,
    currentPage,
    totalPages,
    goToPage,
    startIndex,
    endIndex,
    totalItems
  } = usePagination(filtered, 10);

  // Mock Stats Data (You can calculate these dynamically if backend supports)
  const stats = [
    { label: 'Total Pilgrims', value: customers.length, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50', shadow: 'shadow-blue-100' },
    { label: 'Visa Approved', value: Math.floor(customers.length * 0.75), icon: ShieldCheck, color: 'text-emerald-600', bg: 'bg-emerald-50', shadow: 'shadow-emerald-100' },
    { label: 'Flight Booked', value: Math.floor(customers.length * 0.45), icon: Plane, color: 'text-[#0A2A5C]', bg: 'bg-indigo-50', shadow: 'shadow-indigo-100' },
    { label: 'Hotel Booked', value: Math.floor(customers.length * 0.85), icon: Hotel, color: 'text-orange-600', bg: 'bg-orange-50', shadow: 'shadow-orange-100' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Completed': return 'bg-slate-100 text-slate-700 border-slate-200';
      case 'Pending': return 'bg-amber-50 text-amber-700 border-amber-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 p-6 lg:p-10 font-inter text-slate-800 selection:bg-indigo-100 selection:text-indigo-800">

      {/* Main Container */}
      <div className=" space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl font-manrope font-bold text-slate-900 tracking-tight leading-[1.1]">
              Customer Registry
            </h1>
            <p className="mt-2.5 text-base font-medium text-slate-500">
              Manage pilgrim data, visa status, and travel logistics.
            </p>
          </div>

          <Link
            to="/customers/add"
            className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-slate-900 text-white text-sm font-semibold rounded-xl hover:bg-slate-800 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 shadow-lg shadow-slate-900/10"
          >
            <Plus size={18} strokeWidth={2.5} />
            <span>New Pilgrim</span>
          </Link>
        </div>

        {/* Stats Grid - Bento Style */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="group relative bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
            >
              <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-20 -mr-10 -mt-10 transition-opacity group-hover:opacity-30 ${stat.bg}`}></div>

              <div className="relative z-10 flex flex-col h-full justify-between">
                <div className={`w-12 h-12 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-300`}>
                  <stat.icon size={20} strokeWidth={2} />
                </div>

                <div>
                  <h3 className="text-3xl font-manrope font-bold text-slate-900 tracking-tight">{stat.value}</h3>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mt-1">{stat.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Content Area: Search & Table */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">

          {/* Toolbar */}
          <div className="p-6 border-b border-slate-100 flex flex-col lg:flex-row items-center justify-between gap-4">

            {/* Search Input */}
            <div className="relative w-full lg:w-96 group">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-slate-400 group-focus-within:text-[#0A2A5C] transition-colors" />
              </div>
              <input
                type="text"
                placeholder="Search by name, passport, or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl leading-5 bg-slate-50/50 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 text-sm font-medium text-slate-700"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 w-full lg:w-auto">
              <button className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2.5 border border-slate-200 rounded-xl text-slate-600 text-xs font-bold uppercase tracking-wider hover:bg-slate-50 hover:border-slate-300 transition-colors">
                <Filter size={14} />
                Filters
              </button>
              <button className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2.5 border border-slate-200 rounded-xl text-slate-600 text-xs font-bold uppercase tracking-wider hover:bg-slate-50 hover:border-slate-300 transition-colors">
                <Download size={14} />
                Export
              </button>
            </div>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-100">
                  <th className="px-6 lg:px-8 py-4 text-[10px] font-manrope font-bold text-slate-400 uppercase tracking-widest">Pilgrim Info</th>
                  <th className="px-6 lg:px-8 py-4 text-[10px] font-manrope font-bold text-slate-400 uppercase tracking-widest">Passport</th>
                  <th className="px-6 lg:px-8 py-4 text-[10px] font-manrope font-bold text-slate-400 uppercase tracking-widest">Status</th>
                  <th className="px-6 lg:px-8 py-4 text-[10px] font-manrope font-bold text-slate-400 uppercase tracking-widest">Location</th>
                  <th className="px-6 lg:px-8 py-4 text-[10px] font-manrope font-bold text-slate-400 uppercase tracking-widest text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {isLoading ? (
                  <tr>
                    <td colSpan="5" className="py-20 text-center">
                      <div className="flex flex-col items-center justify-center gap-3">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-300"></div>
                        <p className="text-sm font-medium text-slate-400 animate-pulse">Loading Registry...</p>
                      </div>
                    </td>
                  </tr>
                ) : paginatedData.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="py-20 text-center">
                      <div className="flex flex-col items-center justify-center text-slate-400">
                        <Search size={48} className="mb-3 opacity-20" />
                        <p className="text-sm font-medium">No pilgrims found matching your search.</p>
                      </div>
                    </td>
                  </tr>
                ) : paginatedData.map((customer, idx) => {
                  const fullName = `${customer.firstName || ''} ${customer.lastName || ''}`.trim() || customer.name || 'Unknown';
                  const initials = fullName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

                  return (
                    <tr
                      key={customer.id || idx}
                      className="group hover:bg-slate-50/50 transition-colors duration-200"
                    >
                      {/* Customer Info */}
                      <td className="px-6 lg:px-8 py-5">
                        <div className="flex items-center gap-4">
                          <div className="relative">
                            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 text-slate-500 flex items-center justify-center font-manrope font-bold text-sm border border-white shadow-sm">
                              {customer.photo ? (
                                <img src={customer.photo} alt="" className="w-full h-full object-cover rounded-full" />
                              ) : initials}
                            </div>
                            {/* Status Indicator Ring */}
                            {customer.status === 'Active' && (
                              <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>
                            )}
                          </div>
                          <div>
                            <Link
                              to={`/customers/${customer.id}`}
                              className="block text-sm font-bold text-slate-800 group-hover:text-[#0A2A5C] transition-colors"
                            >
                              {fullName}
                            </Link>
                            <div className="flex items-center gap-3 mt-0.5">
                              <span className="text-xs text-slate-400 font-medium">ID: {customer.id}</span>
                              <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                              <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                                <Phone size={10} />
                                {customer.phone || 'N/A'}
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Passport */}
                      <td className="px-6 lg:px-8 py-5">
                        <div className="flex items-center gap-2 bg-slate-50 w-fit px-3 py-1.5 rounded-lg border border-slate-100">
                          <ShieldCheck size={13} className="text-indigo-500" strokeWidth={2.5} />
                          <span className="text-xs font-bold text-slate-700 font-mono tracking-wide">
                            {customer.passportNo || 'N/A'}
                          </span>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-6 lg:px-8 py-5">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getStatusColor(customer.status)}`}>
                          {customer.status || 'Active'}
                        </span>
                      </td>

                      {/* Location */}
                      <td className="px-6 lg:px-8 py-5">
                        <div className="flex items-center gap-1.5 text-slate-500">
                          <MapPin size={14} strokeWidth={2} className="opacity-60" />
                          <span className="text-xs font-medium">{customer.city || 'Unknown'}</span>
                        </div>
                      </td>

                      {/* Action */}
                      <td className="px-6 lg:px-8 py-5 text-right">
                        <Link
                          to={`/customers/${customer.id}`}
                          className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-slate-200 text-white bg-slate-900 hover:border-slate-900 transition-all duration-200"
                        >
                          <ChevronRight size={18} />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/30 flex items-center justify-between">
            {/* Assuming your Pagination component handles rendering, passing props to it */}
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
      </div>
    </div>
  );
};

export default Customers;