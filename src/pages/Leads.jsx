import React, { useState, useEffect } from 'react';
import {
  Search, Plus, Download, ListFilter, Calendar, SlidersHorizontal,
  Phone, MessageCircle, Eye,
  Mail
} from 'lucide-react';
import { Link } from 'react-router-dom';
import useLeadStore from '../store/useLeadStore';
import useMasterTypeStore from '../store/useMasterTypeStore';
import usePagination from '../hooks/usePagination';
import Pagination from '../components/Pagination';

// Helper functions
const getInitials = (name = '') =>
  name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase() || 'NA';

const formatDate = (raw) =>
  raw ? new Date(raw).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '—';

const getStatusStyle = (status = '') => {
  const s = status.toLowerCase();
  if (s === 'new') return 'bg-blue-50 text-blue-700 border-blue-200';
  if (s === 'follow up' || s === 'follow-up') return 'bg-amber-50 text-amber-700 border-amber-200';
  if (s === 'converted') return 'bg-emerald-50 text-emerald-700 border-emerald-200';
  return 'bg-slate-100 text-slate-600 border-slate-200';
};

const getStatusDot = (status = '') => {
  const s = status.toLowerCase();
  if (s === 'new') return 'bg-blue-500';
  if (s === 'follow up' || s === 'follow-up') return 'bg-amber-500';
  if (s === 'converted') return 'bg-emerald-500';
  return 'bg-slate-400';
};

// Stat Card Component
const StatCard = ({ label, value, color }) => (
  <div className="bg-white rounded-xl border border-slate-200 p-4 relative overflow-hidden group hover:shadow-md transition-all">
    <div className={`absolute top-0 left-0 h-1 w-full ${color}`} />
    <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">{label}</div>
    <div className="font-syne text-2xl font-extrabold text-slate-800">{value}</div>
  </div>
);

// Filter Button Component
const FilterButton = ({ icon: Icon, label }) => (
  <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-500 text-xs font-medium hover:bg-slate-50 hover:border-slate-300 transition-all">
    <Icon size={12} />
    {label}
  </button>
);

// Main Component
const Leads = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { leads, fetchLeads, isLoading } = useLeadStore();
  const { fetchMasterData } = useMasterTypeStore();

  useEffect(() => {
    fetchLeads();
    fetchMasterData();
  }, [fetchLeads, fetchMasterData]);
  // Mock data fallback (same as your original)
  const leadsToShow = leads?.length > 0 ? leads : [
    { id: 1024, lead_name: 'Ahmed Raza', phone: '+92 300 1234567', source_name: 'Facebook', status_name: 'New', created_at: '2024-03-27' },
    { id: 1025, lead_name: 'Fatima Zahra', phone: '+92 321 7654321', source_name: 'WhatsApp', status_name: 'Follow up', created_at: '2024-03-26' },
    { id: 1026, lead_name: 'Zubair Ahmed', phone: '+92 333 4567890', source_name: 'Referral', status_name: 'Converted', created_at: '2024-03-25' },
    { id: 1027, lead_name: 'Sara Noor', phone: '+92 312 9876543', source_name: 'Instagram', status_name: 'New', created_at: '2024-03-24' },
    { id: 1028, lead_name: 'Ali Hassan', phone: '+92 345 1122334', source_name: 'Website', status_name: 'Lost', created_at: '2024-03-23' },
    { id: 1029, lead_name: 'Hina Malik', phone: '+92 301 5544332', source_name: 'Facebook', status_name: 'Follow up', created_at: '2024-03-22' },
    { id: 1030, lead_name: 'Usman Tariq', phone: '+92 311 9988776', source_name: 'Referral', status_name: 'Converted', created_at: '2024-03-21' },
    { id: 1031, lead_name: 'Ayesha Siddiqui', phone: '+92 333 2233445', source_name: 'WhatsApp', status_name: 'New', created_at: '2024-03-20' },
    { id: 1032, lead_name: 'Bilal Sheikh', phone: '+92 300 8877665', source_name: 'Google', status_name: 'Lost', created_at: '2024-03-19' },
    { id: 1033, lead_name: 'Nida Hussain', phone: '+92 321 1122448', source_name: 'Instagram', status_name: 'New', created_at: '2024-03-18' },
  ];

  const filtered = leadsToShow.filter(l =>
    l.lead_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    String(l.id).includes(searchTerm) ||
    l.phone?.includes(searchTerm)
  );

  const { paginatedData, currentPage, totalPages, goToPage, startIndex, endIndex, totalItems } =
    usePagination(filtered, 10);

  const total = leadsToShow.length;
  const newCount = leadsToShow.filter(l => l.status_name === 'New').length;
  const followCount = leadsToShow.filter(l => l.status_name === 'Follow up').length;
  const convertedCount = leadsToShow.filter(l => l.status_name === 'Converted').length;

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-8 font-sans text-slate-800">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="font-syne text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 to-indigo-600 bg-clip-text text-transparent">
            Leads
          </h1>
          <p className="text-slate-500 text-sm mt-1 flex items-center gap-2">
            Track and manage every inquiry in one place.
            <span className="bg-slate-100 px-2 py-0.5 rounded-full text-xs text-slate-600">
              {total} total
            </span>
          </p>
        </div>
        <div className="flex gap-3">
          <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 text-sm font-medium hover:border-indigo-300 hover:text-indigo-600 transition-all shadow-sm">
            <Download size={14} /> Export
          </button>
          <Link to="/leads/add" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-indigo-700 transition-all shadow-md hover:shadow-lg">
            <Plus size={14} strokeWidth={2.5} /> Add lead
          </Link>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard label="Total leads" value={total} color="bg-slate-700" />
        <StatCard label="New" value={newCount} color="bg-indigo-500" />
        <StatCard label="Follow up" value={followCount} color="bg-amber-500" />
        <StatCard label="Converted" value={convertedCount} color="bg-emerald-500" />
      </div>

      {/* Toolbar */}
      <div className="bg-white rounded-xl border border-slate-200 p-3 flex flex-wrap items-center gap-3 mb-5 shadow-sm">
        <div className="flex items-center gap-2 flex-1 min-w-[200px] bg-slate-50 rounded-lg px-3 py-2 border border-slate-200">
          <Search size={14} className="text-slate-400" />
          <input
            type="text"
            placeholder="Search by name, ID or phone..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="bg-transparent outline-none text-sm w-full placeholder:text-slate-400"
          />
        </div>
        <div className="hidden md:block w-px h-6 bg-slate-200" />
        <FilterButton icon={SlidersHorizontal} label="Status" />
        <FilterButton icon={Calendar} label="Date" />
        <FilterButton icon={ListFilter} label="Assigned" />
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <colgroup>
              <col className="w-[35%]" />
              <col className="w-[15%]" />
              <col className="w-[17%]" />
              <col className="w-[14%]" />
              <col className="w-[19%]" />
            </colgroup>
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Lead</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Source</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Date</th>
                <th className="px-5 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="px-5 py-16 text-center text-slate-400">
                    <div className="flex justify-center items-center gap-2">
                      <div className="w-5 h-5 border-2 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
                      Loading leads...
                    </div>
                  </td>
                </tr>
              ) : paginatedData.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-5 py-16 text-center text-slate-400">
                    No leads found. Try adjusting your search.
                  </td>
                </tr>
              ) : (
                paginatedData.map(lead => (
                  <tr key={lead.id} className="group hover:bg-slate-50/80 transition-colors">
                    {/* Lead Info */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-slate-800 text-white flex items-center justify-center font-syne text-xs font-bold shadow-sm">
                          {getInitials(lead.lead_name)}
                        </div>
                        <div className="min-w-0 flex-1">
                          <Link to={`/leads/${lead.id}`} className="font-semibold text-slate-800 hover:text-indigo-600 transition text-sm block truncate">
                            {lead.lead_name || 'Unnamed'}
                          </Link>
                          <div className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                            <span>#{lead.id}</span>
                            <span className="w-1 h-1 rounded-full bg-slate-300" />
                            <span>{lead.phone}</span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Source */}
                    <td className="px-5 py-4">
                      <span className="inline-block px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 text-xs font-medium border border-slate-200">
                        {lead.source_name || '—'}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${getStatusStyle(lead.status_name)}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${getStatusDot(lead.status_name)}`} />
                        {lead.status_name || '—'}
                      </span>
                    </td>

                    {/* Date */}
                    <td className="px-5 py-4 text-sm text-slate-500">
                      {formatDate(lead.follow_up_date)}
                    </td>
                    {/* AI Tag */}
                    {/* <td className="px-5 py-4 text-sm text-slate-500">
                      {lead.ai_tag || '—'}
                    </td> */}
                    {/* Actions */}
                    <td className="px-5 py-4 text-right">

                      <div className="flex items-center justify-end gap-1 group-hover:opacity-100 transition-opacity">
                        <a href={`tel:${lead.phone}`} className="p-2 rounded-lg border border-slate-200 bg-white text-slate-500 hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-600 transition-all" title="Call">
                          <Phone size={13} />
                        </a>
                        <a href={`sms:${lead.phone}`} className="p-2 rounded-lg border border-slate-200 bg-white text-slate-500 hover:bg-purple-50 hover:border-purple-200 hover:text-purple-600 transition-all" title="SMS">
                          <Mail size={13} />
                        </a>
                        <Link to={`/whatsapp/${lead.id}`} className="p-2 rounded-lg border border-slate-200 bg-white text-slate-500 hover:bg-emerald-50 hover:border-emerald-200 hover:text-emerald-600 transition-all" title="WhatsApp">
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                          </svg>
                        </Link>
                        <Link to={`/leads/${lead.id}`} className="p-2 rounded-lg border border-slate-200 bg-white text-slate-500 hover:bg-slate-100 hover:border-slate-300 hover:text-slate-700 transition-all" title="View lead">
                          <Eye size={13} />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              )}

            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="border-t border-slate-200 px-5 py-4 bg-white">
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
  );
};
export default Leads;