import React, { useState, useEffect } from 'react';
import {
  Search, Plus, Phone, MessageSquare, ChevronRight,
  Download, ListFilter, Calendar,
  Wand2, Shapes, Tag, Trash2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import useLeadStore from '../store/useLeadStore';

const Leads = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { leads, fetchLeads, isLoading, error } = useLeadStore();

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  // Fallback for demo if API returns empty but we want to show something initially
  const leadsToShow = (leads && leads.length > 0) ? leads : [
    { id: 'LD-1024', name: 'Ahmed Raza', phone: '+92 300 1234567', source: 'Facebook', status: 'New', date: '2024-03-27', agent: 'Zaid Khan' },
    { id: 'LD-1025', name: 'Fatima Zahra', phone: '+92 321 7654321', source: 'WhatsApp', status: 'Follow Up', date: '2024-03-26', agent: 'Sana Malik' },
    { id: 'LD-1026', name: 'Zubair Ahmed', phone: '+92 333 4567890', source: 'Referral', status: 'Converted', date: '2024-03-25', agent: 'Zaid Khan' },
    { id: 'LD-1027', name: 'Ayesha Bibi', phone: '+92 345 0987654', source: 'Direct', status: 'No Response', date: '2024-03-25', agent: 'Omar Farooq' },
    { id: 'LD-1028', name: 'Bilal Siddiqui', phone: '+92 301 2233445', source: 'Instagram', status: 'Lost', date: '2024-03-24', agent: 'Sana Malik' },
    { id: 'LD-1029', name: 'Hina Pervez', phone: '+92 312 9988776', source: 'Facebook', status: 'New', date: '2024-03-24', agent: 'Zaid Khan' },
  ];

  const myArray =[
    {
      name: 'll',
      age:12,

    }
  ]   
  console.log(myArray);

  const getStatusStyle = (status) => {
    switch (status) {
      case 'New': return 'bg-[var(--grad-primary)] text-white';
      case 'Follow Up': return 'bg-[var(--grad-secondary)] text-white';
      case 'Converted': return 'bg-[var(--grad-tertiary)] text-white';
      case 'Lost': return 'bg-[var(--surface-container-high)] text-[var(--on-surface-variant)]';
      default: return 'bg-[var(--surface-container-low)] text-[var(--on-surface-variant)]';
    }
  };

  return (
    <div className="animate-in fade-in duration-1000">
      {/* Header Section - Editorial */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <h1 className="text-[2.5rem] font-manrope font-extrabold text-[var(--on-surface)] tracking-tight">Leads</h1>
          <p className="text-[var(--on-surface-variant)] text-sm mt-2 font-medium">Orchestrating every touchpoint of the professional journey.</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-6 py-3.5 bg-[var(--surface-container-lowest)] border border-[var(--outline-variant)] rounded-xl text-[10px] font-bold text-[var(--on-surface-variant)] uppercase   hover:text-[var(--on-surface)] transition-all group">
            <Download size={16} strokeWidth={2} />
            Export Data
          </button>
          <Link
            to="/leads/add"
            className="btn-primary flex items-center gap-2 px-8 py-4 text-[10px] font-extrabold uppercase tracking-[0.25em] shadow-xl shadow-black/10 hover:shadow-2xl transition-all rounded-xl"
          >
            <Plus size={18} strokeWidth={2.5} />
            Capture Inquiry
          </Link>
        </div>
      </div>

      {/* Tonal Search Bar */}
      <div className="bg-gray-200   rounded-xl p-5 mb-10 flex flex-col lg:flex-row items-center justify-between gap-6 px-8">
        <div className="relative w-full lg:w-[400px] group">
          <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-[var(--on-surface-variant)] group-focus-within:text-[var(--on-surface)] transition-colors" size={18} />
          <input
            type="text"
            placeholder="Identity, contact or source..."
            className="w-full pl-9 pr-4 py-3 bg-transparent border-b border-[var(--outline-variant)] rounded-none text-sm outline-none focus:border-[var(--primary)] text-[var(--on-surface)] transition-all font-medium placeholder-[var(--on-surface-variant)]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-4 shrink-0 ">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-white/50   rounded-xl text-[10px] font-bold text-[var(--on-surface-variant)] uppercase tracking-widest hover:bg-white transition-all shadow-sm">
            <ListFilter size={14} />
            Refine Status
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-white/50   rounded-xl text-[10px] font-bold text-[var(--on-surface-variant)] uppercase tracking-widest hover:bg-white transition-all shadow-sm">
            <Calendar size={14} />
            Timeline
          </button>
        </div>
      </div>

      {/* Ledger Table - No Line Philosophy */}
      <div className="bg-[var(--surface-container-lowest)] rounded-xl shadow-sm border border-[var(--outline-variant)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[var(--surface)] border-b border-[var(--outline-variant)]">
                <th className="px-10 py-6 text-[10px] font-manrope font-extrabold text-[var(--on-surface-variant)] uppercase tracking-[0.25em]">Inquiry Identification</th>
                <th className="px-10 py-6 text-[10px] font-manrope font-extrabold text-[var(--on-surface-variant)] uppercase tracking-[0.25em]">Provenance</th>
                <th className="px-10 py-6 text-[10px] font-manrope font-extrabold text-[var(--on-surface-variant)] uppercase tracking-[0.25em]">Disposition</th>
                <th className="px-10 py-6 text-[10px] font-manrope font-extrabold text-[var(--on-surface-variant)] uppercase tracking-[0.25em]">Controller</th>
                <th className="px-10 py-6 text-[10px] font-manrope font-extrabold text-[var(--on-surface-variant)] uppercase tracking-[0.25em] text-right">Cadence</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isLoading ? (
                <tr><td colSpan="5" className="px-10 py-10 text-center text-sm text-gray-500 font-medium">Fetching inquiries from server...</td></tr>
              ) : leadsToShow.length === 0 ? (
                <tr><td colSpan="5" className="px-10 py-10 text-center text-sm text-gray-500 font-medium">No inquiries found in the archive.</td></tr>
              ) : leadsToShow.map((lead) => (
                <tr key={lead.id} className="group hover:bg-gray-50/50 transition-all cursor-pointer">
                  <td className="px-10 py-6">
                    <div className="flex items-center gap-5">
                      <div className="w-12 h-12 rounded-xl bg-[#111827] text-white flex items-center justify-center font-bold text-sm shadow-sm group-hover:shadow-md transition-all">
                        {lead.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <Link to={`/leads/${lead.id}`} className="block text-sm font-manrope font-extrabold text-gray-900 group-hover:text-[#111827] transition-colors tracking-tight">
                          {lead.name}
                        </Link>
                        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1.5">{lead.id} <span className="mx-1 text-gray-300">•</span> {lead.phone}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-10 py-6">
                    <span className="text-[10px] font-bold text-gray-600 bg-white px-3 py-1.5 rounded-xl border border-gray-200 shadow-sm uppercase tracking-widest group-hover:border-gray-300 transition-colors">
                      {lead.source}
                    </span>
                  </td>
                  <td className="px-10 py-6">
                    <span className={`text-[9px] font-black uppercase tracking-widest px-4 py-1.5 rounded-xl border ${
                        lead.status === 'New' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                        lead.status === 'Contacted' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                        lead.status === 'Qualified' ? 'bg-purple-50 text-purple-600 border-purple-100' :
                        lead.status === 'Converted' ? 'bg-green-50 text-green-600 border-green-100' :
                        'bg-gray-50 text-gray-600 border-gray-100'
                    }`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-10 py-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-gray-100 text-[#111827] border border-gray-200 flex items-center justify-center text-[10px] font-bold">
                        {lead.agent.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="text-xs font-bold text-gray-700">{lead.agent}</span>
                    </div>
                  </td>
                  <td className="px-10 py-6 text-right">
                    <div className="flex flex-col items-end gap-2">
                       <div className="flex items-center justify-end gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300">
                         <button className="w-8 h-8 flex items-center justify-center bg-[#616B7B] rounded-xl text-white shadow-sm hover:brightness-110 transition-all" title="Edit">
                           <Wand2 size={14} strokeWidth={2.5} />
                         </button>
                         <button className="w-8 h-8 flex items-center justify-center bg-[#636569] rounded-xl text-white shadow-sm hover:brightness-110 transition-all" title="Categories">
                           <Shapes size={14} strokeWidth={2.5} />
                         </button>
                         <button className="w-8 h-8 flex items-center justify-center bg-[#726888] rounded-xl text-white shadow-sm hover:brightness-110 transition-all" title="Tag">
                           <Tag size={14} strokeWidth={2.5} />
                         </button>
                         <button className="w-8 h-8 flex items-center justify-center bg-[#A5413D] rounded-xl text-white shadow-sm hover:brightness-110 transition-all" title="Delete">
                           <Trash2 size={14} strokeWidth={2.5} />
                         </button>
                       </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Cinematic Pagination */}
        <div className="px-10 py-8 bg-[var(--surface)] flex items-center justify-between border-t border-[var(--outline-variant)]">
          <div>
            <p className="text-[10px] text-[var(--on-surface-variant)] font-bold uppercase  ">Inventory Visualization</p>
            <p className="text-xs font-bold text-[var(--on-surface-variant)] mt-1">Showing 6 of 1,245 operational leads</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="px-6 py-3 bg-[var(--surface-container-low)] rounded-xl text-[10px] font-bold text-[var(--on-surface-variant)] uppercase tracking-widest hover:text-[var(--primary)] transition-all shadow-sm">Decrement</button>
            <button className="px-8 py-3 btn-primary rounded-xl text-[10px] font-extrabold text-white uppercase   shadow-lg shadow-black/10 hover:shadow-xl transition-all">Increment</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leads;
