import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Search, Filter, Calendar, Plane, Hotel, Car, 
  ShieldCheck, Package, Info, Activity, User, Hash
} from 'lucide-react'; 
import useLogisticsStore from '../store/useLogisticsStore';
import useAuthStore from '../store/useAuthStore';

/* ─── Constants ─────────────────────────────────────────────────────── */
const STATUS_STYLES = {
  active:    { bg: '#edf7f1', text: '#1a7a4a', border: '#9fe1cb', dot: '#1a7a4a' },
  pending:   { bg: '#faeeda', text: '#854f0b', border: '#fac775', dot: '#ba7517' },
  completed: { bg: '#edf1f7', text: '#1a4a7a', border: '#9fcbe1', dot: '#1a4a7a' },
  default:   { bg: '#f5f4f0', text: '#78776f', border: '#e2e0d8', dot: '#78776f' }
};

/* ════════════════════════════════════════════════════════════════════════
   LogisticsFeed Component
   ════════════════════════════════════════════════════════════════════════ */
const LogisticsFeed = () => {
  const { id } = useParams();
  const { user } = useAuthStore();
  const { logistics, fetchLogistics, isLoading } = useLogisticsStore();
  const [search, setSearch] = useState('');

  useEffect(() => {
    // If no ID in URL, use the current logged-in user's ID
    const targetId = id || user?.id;
    fetchLogistics(targetId);
  }, [fetchLogistics, id, user?.id]);

  const filtered = logistics.filter(item => 
    item.booking?.customer_name?.toLowerCase().includes(search.toLowerCase()) ||
    item.assignment_id?.toString().includes(search)
  );

  return (
    <div className="min-h-screen bg-[#f5f4f0] px-6 py-12 lg:px-12" style={{ fontFamily: "'DM Mono', monospace" }}>
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm text-[10px] font-bold uppercase tracking-[0.2em] text-white bg-[#1a1916]">
            <Activity size={12} strokeWidth={3} /> Logistics Command Center
          </div>
          <h1 className="text-4xl lg:text-5xl font-extrabold text-[#1a1916] leading-none" style={{ fontFamily: "'Sora', sans-serif", letterSpacing: '-0.03em' }}>
            Unified Logistics Feed
          </h1>
          <p className="text-[13px] text-[#78776f] max-w-xl" style={{ fontFamily: "'Sora', sans-serif" }}>
            Real-time monitoring of all field operations, customer travel, and logistics dependencies.
          </p>
        </div>

        <div className="relative w-full md:w-80">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#b0aea5]" />
          <input
            type="text"
            placeholder="Search by ID or Customer..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-white border-[1.5px] border-[#e2e0d8] rounded-xl pl-12 pr-4 py-3 text-[12px] outline-none focus:border-[#1a1916] transition-all shadow-sm"
          />
        </div>
      </div>

      {/* TABLE SECTION */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl border-[1.5px] border-[#e2e0d8] overflow-hidden shadow-sm overflow-x-auto"
      >
        <table className="w-full text-left min-w-[1400px]">
          <thead>
            <tr className="bg-[#fcfbf9] border-b-[1.5px] border-[#e2e0d8]">
              <TableHead label="Assignment ID" icon={<Hash size={10}/>} />
              <TableHead label="Task Type" icon={<Activity size={10}/>} />
              <TableHead label="Status" />
              <TableHead label="Customer Name" icon={<User size={10}/>} />
              <TableHead label="Travel Date" icon={<Calendar size={10}/>} />
              <TableHead label="Flight Info" icon={<Plane size={10}/>} />
              <TableHead label="Hotel Info" icon={<Hotel size={10}/>} />
              <TableHead label="Transport Info" icon={<Car size={10}/>} />
              <TableHead label="Visa" icon={<ShieldCheck size={10}/>} />
              <TableHead label="Package" icon={<Package size={10}/>} />
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f0efe9]">
            {filtered.length > 0 ? filtered.map((item) => (
              <tr key={item.assignment_id} className="hover:bg-[#fcfbf9] transition-colors group">
                {/* ID & TYPE */}
                <td className="px-6 py-5">
                   <div className="text-[12px] font-bold text-[#1a1916]">#{item.assignment_id}</div>
                </td>
                <td className="px-6 py-5">
                   <span className="text-[10px] font-bold uppercase tracking-wider text-[#78776f] bg-[#f5f4f0] px-2 py-1 rounded border border-[#e2e0d8]">
                     {item.task_type}
                   </span>
                </td>

                {/* STATUS */}
                <td className="px-6 py-5">
                   <StatusBadge status={item.status} />
                </td>

                {/* CUSTOMER */}
                <td className="px-6 py-5">
                   <div className="text-[12px] font-bold text-[#1a1916]" style={{ fontFamily: "'Sora', sans-serif" }}>
                     {item.booking?.customer_name}
                   </div>
                </td>

                {/* TRAVEL DATE */}
                <td className="px-6 py-5">
                   <div className="text-[11px] text-[#78776f] flex items-center gap-1.5 uppercase font-medium">
                     <Calendar size={12} className="text-[#b0aea5]" /> {item.booking?.travel_date}
                   </div>
                </td>

                {/* FLIGHT */}
                <td className="px-6 py-5 max-w-[200px]">
                   <InfoCell 
                     title={item.flight?.airline} 
                     subtitle={`${item.flight?.departure} → ${item.flight?.arrival}`} 
                     small={`Ticket: ${item.flight?.ticket_number}`} 
                   />
                </td>

                {/* HOTEL */}
                <td className="px-6 py-5 max-w-[200px]">
                   <InfoCell 
                     title={item.hotel?.name} 
                     subtitle={`${item.hotel?.city} | ${item.hotel?.rooms} Rooms`} 
                     small={`${item.hotel?.check_in} / ${item.hotel?.check_out}`} 
                   />
                </td>

                {/* TRANSPORT */}
                <td className="px-6 py-5 max-w-[200px]">
                   <InfoCell 
                     title={item.transport?.vehicle} 
                     subtitle={`Driver: ${item.transport?.driver}`} 
                     small={`${item.transport?.type} | ${item.transport?.plate_number}`} 
                   />
                </td>

                {/* VISA */}
                <td className="px-6 py-5">
                  <div className="space-y-1">
                    {item.visas?.map(v => (
                       <div key={v.id} className="text-[10px] font-bold text-[#1a1916] flex items-center gap-1">
                         <ShieldCheck size={10} className="text-[#1a7a4a]" /> {v.visa_number}
                       </div>
                    ))}
                    {!item.visas?.length && <span className="text-[10px] text-[#b0aea5]">N/A</span>}
                  </div>
                </td>

                {/* PACKAGE */}
                <td className="px-6 py-5 max-w-[200px]">
                   {item.packages?.map(p => (
                      <div key={p.id} className="space-y-0.5">
                        <div className="text-[11px] font-bold text-[#1a1916] truncate">{p.title}</div>
                        <div className="text-[9px] text-[#b0aea5] uppercase font-bold">{p.total_days} Days | ${p.final_price}</div>
                      </div>
                   ))}
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={10} className="py-24 text-center">
                   {isLoading ? (
                     <div className="flex flex-col items-center gap-2">
                       <Activity className="animate-pulse text-[#b0aea5]" size={32} />
                       <span className="text-[10px] font-bold uppercase tracking-widest text-[#b0aea5]">Retrieving Terminal Data...</span>
                     </div>
                   ) : (
                     <div className="flex flex-col items-center gap-2">
                       <Info size={32} className="text-[#e2e0d8]" />
                       <span className="text-[10px] font-bold uppercase tracking-widest text-[#b0aea5]">No synchronization found</span>
                     </div>
                   )}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
};

/* ─── Components ───────────────────────────────────────────────────── */

const TableHead = ({ label, icon }) => (
  <th className="px-6 py-5 text-[9px] font-bold uppercase tracking-[0.2em] text-[#78776f]">
    <div className="flex items-center gap-2">
      {icon} {label}
    </div>
  </th>
);

const StatusBadge = ({ status }) => {
  const norm = status?.toLowerCase() || 'default';
  const style = STATUS_STYLES[norm] || STATUS_STYLES.default;
  
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[9px] font-bold uppercase tracking-wider" style={{ background: style.bg, color: style.text, border: `1.5px solid ${style.border}` }}>
      <div className="w-1.5 h-1.5 rounded-full" style={{ background: style.dot }} />
      {status}
    </span>
  );
};

const InfoCell = ({ title, subtitle, small }) => (
  <div className="space-y-1">
    <div className="text-[11px] font-bold text-[#1a1916] truncate" style={{ fontFamily: "'Sora', sans-serif" }}>{title || 'N/A'}</div>
    <div className="text-[10px] text-[#78776f] truncate leading-none">{subtitle}</div>
    {small && <div className="text-[9px] text-[#b0aea5] font-bold uppercase tracking-tighter truncate">{small}</div>}
  </div>
);

export default LogisticsFeed;
