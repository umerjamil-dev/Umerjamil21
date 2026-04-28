import React, { useState, useEffect } from 'react';
import {
   Truck, Users, MapPin,
   Clock, CheckCircle2, AlertCircle,
   Phone, Filter,
   Plus, Navigation,
   UserCheck, Radio, Briefcase, Plane, Hotel,
   ChevronDown, ChevronUp, Car, ShieldCheck,
   Package, User2, CalendarDays, Hash, Edit3, Loader2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import useOperationsStore from '../store/useOperationsStore';
import useAuthStore from '../store/useAuthStore';

// ─── Status config ─────────────────────────────────────────────────────────────
const statusConfig = {
   'Pending': { dot: 'bg-amber-400', badge: 'bg-amber-50 text-amber-700 border-amber-200', icon: <Clock size={11} strokeWidth={3} /> },
   'In Progress': { dot: 'bg-blue-400', badge: 'bg-blue-50 text-blue-700 border-blue-200', icon: <Radio size={11} className="animate-pulse" /> },
   'Completed': { dot: 'bg-emerald-400', badge: 'bg-emerald-50 text-emerald-700 border-emerald-200', icon: <CheckCircle2 size={11} strokeWidth={3} /> },
};

const taskTypeIcon = {
   'Guide': <Users size={18} strokeWidth={2} />,
   'Pickup': <Truck size={18} strokeWidth={2} />,
   'Hotel Check-in': <Hotel size={18} strokeWidth={2} />,
};

// ─── Info Chip helper ──────────────────────────────────────────────────────────
const InfoPill = ({ label, value, colorClass = 'text-slate-700' }) => (
   <div className="flex flex-col gap-0.5">
      <span className="text-[8px] font-medium uppercase tracking-[0.25em] text-slate-400">{label}</span>
      <span className={`text-[11px] font-medium ${colorClass}`}>{value || '—'}</span>
   </div>
);

// ─── Assignment Row ────────────────────────────────────────────────────────────
const AssignmentRow = ({ a }) => {
   const [open, setOpen] = useState(false);
   const sc = statusConfig[a.status] || statusConfig['Pending'];

   return (
      <div className="border border-slate-100 rounded-2xl overflow-hidden transition-all hover:border-slate-300 hover:shadow-md">
         {/* ── Summary row ─────────────────────────────────── */}
         <button
            onClick={() => setOpen(o => !o)}
            className="w-full text-left p-6 flex flex-col sm:flex-row sm:items-center gap-5 group bg-white hover:bg-slate-50/60 transition-colors"
         >
            {/* Task type icon */}
            <div className="shrink-0 w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 group-hover:bg-black group-hover:text-white group-hover:border-black transition-all">
               {taskTypeIcon[a.task_type] || <Briefcase size={18} />}
            </div>

            {/* Core info */}
            <div className="flex-1 min-w-0 grid grid-cols-2 sm:grid-cols-5 gap-4">
               <InfoPill label="ID" value={`#${a.assignment_id || a.id}`} colorClass="text-slate-900 font-medium" />
               <InfoPill label="Task Type" value={a.task_type || a.service} />
               <InfoPill label="Customer" value={a.booking?.customer_name || a.customer?.name || a.customer || '—'} />
               <InfoPill label="Staff" value={a.staff?.name || a.staff || '—'} />
               <InfoPill label="Travel Date" value={a.booking?.travel_date || a.travel_date || '—'} />
            </div>

            {/* Status badge */}
            <div className="shrink-0 flex items-center gap-3">
               <span className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-[9px] font-medium uppercase tracking-widest ${sc.badge}`}>
                  {sc.icon} {a.status}
               </span>
               <span className="text-slate-300 group-hover:text-slate-500 transition-colors">
                  {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
               </span>
            </div>
         </button>

         {/* ── Expanded detail panel ────────────────────────── */}
         {open && (
            <div className="border-t border-slate-100 bg-slate-50/40 p-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 animate-in fade-in slide-in-from-top-2 duration-200">

               {/* Flight */}
               <div className="bg-white rounded-xl border border-slate-100 p-5 space-y-4">
                  <div className="flex items-center gap-2 mb-3">
                     <Plane size={14} className="text-blue-500" strokeWidth={2.5} />
                     <span className="text-[9px] font-medium uppercase tracking-[0.3em] text-blue-500">Flight Info</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                     <InfoPill label="Airline" value={a.flight?.airline} />
                     <InfoPill label="Ticket No." value={a.flight?.ticket_number} />
                     <InfoPill label="Departure" value={a.flight?.departure} />
                     <InfoPill label="Arrival" value={a.flight?.arrival} />
                  </div>
               </div>

               {/* Hotel */}
               <div className="bg-white rounded-xl border border-slate-100 p-5 space-y-4">
                  <div className="flex items-center gap-2 mb-3">
                     <Hotel size={14} className="text-indigo-500" strokeWidth={2.5} />
                     <span className="text-[9px] font-medium uppercase tracking-[0.3em] text-indigo-500">Hotel Info</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                     <InfoPill label="Hotel" value={a.hotel?.name} />
                     <InfoPill label="City" value={a.hotel?.city} />
                     <InfoPill label="Check-in" value={a.hotel?.check_in} />
                     <InfoPill label="Check-out" value={a.hotel?.check_out} />
                     <InfoPill label="Rooms" value={a.hotel?.rooms} />
                  </div>
               </div>

               {/* Transport */}
               <div className="bg-white rounded-xl border border-slate-100 p-5 space-y-4">
                  <div className="flex items-center gap-2 mb-3">
                     <Car size={14} className="text-purple-500" strokeWidth={2.5} />
                     <span className="text-[9px] font-medium uppercase tracking-[0.3em] text-purple-500">Transport</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                     <InfoPill label="Type" value={a.transport?.type} />
                     <InfoPill label="Vehicle" value={a.transport?.vehicle} />
                     <InfoPill label="Driver" value={a.transport?.driver} />
                     <InfoPill label="Plate" value={a.transport?.plate_number} />
                     <div className="col-span-2">
                        <InfoPill label="Notes" value={a.transport?.notes} />
                     </div>
                  </div>
               </div>

               {/* Visas */}
               <div className="bg-white rounded-xl border border-slate-100 p-5">
                  <div className="flex items-center gap-2 mb-4">
                     <ShieldCheck size={14} className="text-emerald-500" strokeWidth={2.5} />
                     <span className="text-[9px] font-medium uppercase tracking-[0.3em] text-emerald-500">Visas</span>
                  </div>
                  <div className="space-y-3">
                     {(a.visas || []).length > 0 ? a.visas.map(v => (
                        <div key={v.id} className="flex items-center justify-between">
                           <InfoPill label="Visa No." value={v.visa_number} />
                           <span className={`text-[9px] font-medium px-2.5 py-1 rounded-full border uppercase tracking-widest ${v.status === 'Approved'
                              ? 'bg-emerald-50 text-emerald-600 border-emerald-200'
                              : 'bg-amber-50 text-amber-600 border-amber-200'
                              }`}>{v.status}</span>
                        </div>
                     )) : <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest">No Visas Linked</p>}
                  </div>
               </div>

               {/* Packages */}
               {(a.packages || []).length > 0 ? a.packages.map(pkg => (
                  <div key={pkg.id} className="bg-white rounded-xl border border-slate-100 p-5">
                     <div className="flex items-center gap-2 mb-4">
                        <Package size={14} className="text-[var(--desert-gold)]" strokeWidth={2.5} />
                        <span className="text-[9px] font-medium uppercase tracking-[0.3em] text-[var(--desert-gold)]">Package</span>
                     </div>
                     <p className="text-sm font-medium text-slate-900 mb-4 leading-tight">{pkg.title}</p>
                     <div className="grid grid-cols-2 gap-3">
                        <InfoPill label="Makkah Hotel" value={pkg.makkah_hotel} />
                        <InfoPill label="Madinah Hotel" value={pkg.madinah_hotel} />
                        <InfoPill label="Makkah Nights" value={pkg.nights_makkah} />
                        <InfoPill label="Madinah Nights" value={pkg.nights_madinah} />
                        <InfoPill label="Total Days" value={`${pkg.total_days} days`} />
                        <InfoPill label="Price" value={`$${pkg.final_price?.toLocaleString()}`} colorClass="text-emerald-600 font-medium" />
                     </div>
                  </div>
               )) : (
                  <div className="bg-white rounded-xl border border-slate-100 p-5 flex flex-col items-center justify-center opacity-40">
                     <Package size={24} className="text-slate-300 mb-2" />
                     <p className="text-[9px] font-medium uppercase tracking-widest text-slate-400">No Package Details</p>
                  </div>
               )}

               {/* Meta — created / updated by */}
               <div className="bg-white rounded-xl border border-slate-100 p-5">
                  <div className="flex items-center gap-2 mb-4">
                     <Edit3 size={14} className="text-slate-400" strokeWidth={2.5} />
                     <span className="text-[9px] font-medium uppercase tracking-[0.3em] text-slate-400">Audit Trail</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                     <InfoPill label="Booking ID" value={a.booking?.id ? `#${a.booking.id}` : '—'} />
                     <InfoPill label="Created By" value={a.created_by} />
                     <InfoPill label="Updated By" value={a.updated_by} />
                  </div>
               </div>

            </div>
         )}
      </div>
   );
};

// ─── Main Operations Component ─────────────────────────────────────────────────
const Operations = () => {
   const [dispatchSearch, setDispatchSearch] = useState('');
   const [dispatchFilter, setDispatchFilter] = useState('All');

   const { user } = useAuthStore();
   const {
      staff,
      liveTasks,
      sectorSaturation,
      overview,
      assignments,
      assignmentsLoading,
      fetchOperationsData,
      fetchAssignments,
      isLoading: opsLoading
   } = useOperationsStore();

   // Initial data fetch
   useEffect(() => {
      fetchOperationsData();
   }, [fetchOperationsData]);

   // Fetch assignments based on user ID
   useEffect(() => {
      if (user?.id) {
         fetchAssignments(user.id);
      }
   }, [user?.id, fetchAssignments]);

   const staffData = staff || [];
   const taskData = liveTasks || [];
   const saturationData = sectorSaturation || [];
   const isLoading = opsLoading;

   const totalAssignments = overview?.total_assignments || 0;
   const pendingTasks = overview?.pending_tasks || 0;
   const completedTasks = overview?.completed_tasks || 0;
   const flightsToday = overview?.flights_today || 0;
   const hotelsToday = overview?.hotels_today || 0;
   const transportsToday = overview?.transports_today || 0;
   const staffActive = overview?.staff_active || 0;

   const getCustomerName = (t) => {
      if (!t.customer) return '—';
      if (typeof t.customer === 'string') return t.customer;
      return `${t.customer.firstName || ''} ${t.customer.lastName || ''}`.trim() || '—';
   };

   const getStaffName = (t) => {
      if (!t.staff) return 'Unassigned';
      if (typeof t.staff === 'string') return t.staff;
      return t.staff.name || '—';
   };

   // ── Dispatch filter logic ──────────────────────────────────────────────────
   const STATUS_FILTERS = ['All', 'Pending', 'In Progress', 'Completed'];

   const filteredAssignments = (assignments || []).filter(a => {
      const status = a.status || 'Pending';
      const type = a.task_type || a.service || '';
      const customer = a.booking?.customer_name || a.customer?.name || a.customer || '';
      const staffName = a.staff?.name || a.staff || '';

      const matchesStatus = dispatchFilter === 'All' || status === dispatchFilter;
      const q = dispatchSearch.toLowerCase();

      const matchesSearch = !q
         || customer.toLowerCase().includes(q)
         || staffName.toLowerCase().includes(q)
         || type.toLowerCase().includes(q)
         || String(a.assignment_id || a.id).includes(q);

      return matchesStatus && matchesSearch;
   });

   return (
      <>
         <div className="space-y-14 animate-in fade-in duration-1000 font-inter pb-24">

            {/* ── Premium Header ─────────────────────────────────────────────── */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 pb-8 border-b border-slate-200">
               <div className="space-y-4">
                  <div className="flex items-center gap-3 text-[var(--desert-gold)] uppercase tracking-[0.4em] text-[9px] font-medium opacity-80">
                     <Navigation size={14} strokeWidth={3} />
                     KSA Ground Orchestration
                  </div>
                  <h1 className="text-5xl font-manrope font-medium text-slate-900 tracking-tighter leading-tight">
                     Abroad
                  </h1>
                  <p className="text-slate-500 text-sm font-medium max-w-xl leading-relaxed">
                     Real-time synchronization of ground staff, logistics, and pilgrim movements across the Saudi Arabian sectors.
                  </p>
               </div>
            </div>

            {/* ── Section 1 — Overview Metrics ───────────────────────────────── */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
               <MetricCard title="Total Assignments" value={totalAssignments} icon={<Briefcase size={16} />} />
               <MetricCard title="Pending Tasks" value={pendingTasks} icon={<Clock size={16} />} color="text-amber-500" bg="bg-amber-50" border="border-amber-100" />
               <MetricCard title="Completed Tasks" value={completedTasks} icon={<CheckCircle2 size={16} />} color="text-emerald-500" bg="bg-emerald-50" border="border-emerald-100" />
               <MetricCard title="Flights Today" value={flightsToday} icon={<Plane size={16} />} color="text-blue-500" bg="bg-blue-50" border="border-blue-100" />
               <MetricCard title="Hotels Today" value={hotelsToday} icon={<Hotel size={16} />} color="text-indigo-500" bg="bg-indigo-50" border="border-indigo-100" />
               <MetricCard title="Transports Today" value={transportsToday} icon={<Truck size={16} />} color="text-purple-500" bg="bg-purple-50" border="border-purple-100" />
               <MetricCard title="Staff Active" value={staffActive} icon={<UserCheck size={16} />} color="text-[var(--desert-gold)]" bg="bg-[var(--desert-gold)]/10" border="border-[var(--desert-gold)]/20" />
            </div>



            {/* ══════════════════════════════════════════════════════════════════
                Section 2 — Dispatch Assignments
            ══════════════════════════════════════════════════════════════════ */}
            <div className="space-y-6">

               {/* Section header */}
               <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 pb-6 border-b border-slate-200">
                  <div className="space-y-1">
                     <div className="flex items-center gap-2 text-[var(--desert-gold)] text-[9px] font-medium uppercase tracking-[0.4em]">
                        <Briefcase size={12} strokeWidth={3} /> Section 2
                     </div>
                     <h2 className="text-3xl font-manrope font-medium text-slate-900 tracking-tight">
                        Dispatch Assignments
                     </h2>
                     <p className="text-slate-400 text-sm">Full operational details per assignment — flight, hotel, transport, visa & package.</p>
                  </div>
                  <Link to="/operations/assignment?add=true" className="shrink-0 flex items-center gap-2 px-5 py-3 bg-black text-white rounded-xl text-[10px] font-medium uppercase tracking-widest hover:bg-[var(--desert-gold)] hover:text-black transition-all">
                     <Plus size={14} strokeWidth={3} /> New Assignment
                  </Link>
               </div>

               {/* Filter bar */}
               <div className="flex flex-col sm:flex-row gap-3">
                  {/* Search */}
                  <div className="relative flex-1 max-w-xs">
                     <User2 size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                     <input
                        type="text"
                        placeholder="Search by name, staff, task…"
                        value={dispatchSearch}
                        onChange={e => setDispatchSearch(e.target.value)}
                        className="w-full pl-9 pr-4 py-2.5 text-xs border border-slate-200 rounded-xl bg-white focus:outline-none focus:border-slate-400 font-medium text-slate-700 placeholder:text-slate-300"
                     />
                  </div>
                  {/* Status pills */}
                  <div className="flex items-center gap-2 flex-wrap">
                     {STATUS_FILTERS.map(f => (
                        <button
                           key={f}
                           onClick={() => setDispatchFilter(f)}
                           className={`px-4 py-2 rounded-xl text-[9px] font-medium uppercase tracking-widest border transition-all ${dispatchFilter === f
                              ? 'bg-black text-white border-black'
                              : 'bg-white text-slate-400 border-slate-200 hover:border-slate-400 hover:text-slate-600'
                              }`}
                        >
                           {f}
                        </button>
                     ))}
                  </div>
                  {/* Count */}
                  <span className="self-center ml-auto text-[10px] font-medium text-slate-400 uppercase tracking-widest whitespace-nowrap">
                     {filteredAssignments.length} Result{filteredAssignments.length !== 1 ? 's' : ''}
                  </span>
               </div>

               {/* Assignment list */}
               <div className="space-y-3 min-h-[300px]">
                  {assignmentsLoading ? (
                     <div className="py-20 flex flex-col items-center justify-center text-slate-400 space-y-4">
                        <Loader2 size={32} className="animate-spin text-[var(--desert-gold)]" />
                        <p className="text-[10px] font-medium uppercase tracking-[0.3em]">Synchronizing Dispatch Data...</p>
                     </div>
                  ) : filteredAssignments.length === 0 ? (
                     <div className="py-20 text-center text-sm font-medium uppercase tracking-widest text-slate-300 border border-dashed border-slate-200 rounded-2xl">
                        No assignments match your filters.
                     </div>
                  ) : (
                     filteredAssignments.map(a => (
                        <AssignmentRow key={a.assignment_id || a.id} a={a} />
                     ))
                  )}
               </div>
            </div>

         </div>
      </>
   );
};

// ─── Metric Card Component ────────────────────────────────────────────────────
const MetricCard = ({ title, value, icon, color = 'text-slate-600', bg = 'bg-slate-100', border = 'border-slate-200' }) => (
   <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between group hover:shadow-md transition-all">
      <div className="space-y-1">
         <p className="text-[9px] font-medium text-slate-400 uppercase tracking-widest leading-tight">{title}</p>
         <p className="text-2xl font-manrope font-medium tracking-tighter text-slate-900">{value}</p>
      </div>
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${bg} ${border} ${color} group-hover:scale-110 transition-transform`}>
         {icon}
      </div>
   </div>
);

export default Operations;