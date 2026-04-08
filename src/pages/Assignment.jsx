import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User, Calendar, Plane, Hotel, Car, CheckCircle,
  Plus, Search, Filter, Edit2, Trash2, X,
  Activity, Zap, Users, Briefcase, Info
} from 'lucide-react';
import useAssignmentStore from '../store/useAssignmentStore';
import useUserStore from '../store/useUserStore';
import useBookingStore from '../store/useBookingStore';
import useFlightStore from '../store/useFlightStore';
import useHotelStore from '../store/useHotelStore';
import useTransportStore from '../store/useTransportStore';
import useMasterTypeStore from '../store/useMasterTypeStore';
import toast from 'react-hot-toast';
import usePagination from '../hooks/usePagination';
import Pagination from '../components/Pagination';

/* ─── Constants ─────────────────────────────────────────────────────── */
const EASE = [0.22, 1, 0.36, 1];
const DEFAULT_FORM = {
  staff_id: '',
  booking_id: '',
  flight_id: '',
  hotel_id: '',
  transport_id: '',
  task_type_id: '',
  status_id: '1' ,
  task_detail:''
};

const STATUS_CONFIG = {
  '1': { label: 'Active',    dot: '#1a7a4a', bg: '#edf7f1', border: '#9fe1cb', text: '#1a7a4a' },
  '2': { label: 'Completed', dot: '#1a4a7a', bg: '#edf1f7', border: '#9fcbe1', text: '#1a4a7a' },
  '3': { label: 'Pending',   dot: '#ba7517', bg: '#faeeda', border: '#fac775', text: '#854f0b' },
  'default': { label: 'Draft', dot: '#78776f', bg: '#f5f4f0', border: '#e2e0d8', text: '#78776f' }
};

/* ════════════════════════════════════════════════════════════════════════
   Assignment Component
   ════════════════════════════════════════════════════════════════════════ */
const Assignment = () => {
  const [isAdding,    setIsAdding]    = useState(false);
  const [isEditing,   setIsEditing]   = useState(false);
  const [editingId,   setEditingId]   = useState(null);
  const [search,      setSearch]      = useState('');
  const [form,        setForm]        = useState(DEFAULT_FORM);

  const { assignments, fetchAssignments, addAssignment, updateAssignment, deleteAssignment, isLoading: assignmentsLoading } = useAssignmentStore();
  const { users, fetchUsers } = useUserStore();
  const { bookings, fetchBookings } = useBookingStore();
  const { flights, fetchFlights } = useFlightStore();
  const { hotels, fetchHotels } = useHotelStore();
  const { transports, fetchTransports } = useTransportStore();
  const { masterData, fetchMasterData, loading: masterLoading } = useMasterTypeStore();
  

  const isLoading = assignmentsLoading || masterLoading;

  useEffect(() => {
    fetchAssignments();
    fetchUsers();
    fetchBookings();
    fetchFlights();
    fetchHotels();
    fetchTransports();
    fetchMasterData();
  }, []);
  // console.log(transports);
  

  const patchForm = (key, val) => setForm(prev => ({ ...prev, [key]: val }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      const res = await updateAssignment(editingId, form);
      if (res.success) { toast.success('Assignment updated.'); setIsEditing(false); setForm(DEFAULT_FORM); await fetchAssignments(); }
      else toast.error(res.error);
    } else {
      const res = await addAssignment(form);
      if (res.success) { toast.success('Staff assigned successfully.'); setIsAdding(false); setForm(DEFAULT_FORM); await fetchAssignments(); }
      else toast.error(res.error);
    }
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setIsEditing(true);
    setIsAdding(false);
    setForm({
      staff_id: item.staff_id || '',
      booking_id: item.booking_id || '',
      flight_id: item.flight_id || '',
      hotel_id: item.hotel_id || '',
      transport_id: item.transport_id || '',
      task_type_id: item.task_type_id || '',
      status_id: item.status_id?.toString() || '1'
    });
  };

  const filtered = useMemo(() => 
    assignments.filter(a => {
      const staff = users.find(u => u.id === a.staff_id)?.name || '';
      return staff.toLowerCase().includes(search.toLowerCase());
    }), [assignments, users, search]);

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
    <div className="min-h-screen bg-[#f5f4f0] px-8 py-14 lg:px-20" style={{ fontFamily: "'DM Mono', monospace" }}>
      
      {/* HEADER */}
      <div className="flex flex-wrap items-end gap-6 mb-14">
        <div className="flex-1 min-w-[250px] space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm text-[9px] font-bold uppercase tracking-[0.18em] text-white bg-[#1a1916]">
            <Zap size={10} strokeWidth={3} /> Operations Command
          </div>
          <h1 className="text-5xl lg:text-6xl font-extrabold text-[#1a1916] leading-none" style={{ fontFamily: "'Sora', sans-serif", letterSpacing: '-0.03em' }}>
            Assignments
          </h1>
          <p className="text-[12px] text-[#78776f] font-normal leading-relaxed" style={{ fontFamily: "'Sora', sans-serif" }}>
            Delegate tasks to field staff and track operational progress.
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => { setIsAdding(!isAdding); if(isEditing) setIsEditing(false); setForm(DEFAULT_FORM); }}
          className="h-12 px-8 rounded-lg text-[10px] font-bold uppercase tracking-[0.15em] flex items-center gap-2.5 transition-all cursor-pointer"
          style={isAdding || isEditing ? { background: '#ffffff', color: '#78776f', border: '1.5px solid #e2e0d8' } : { background: '#1a1916', color: '#ffffff', border: '1.5px solid #1a1916' }}
        >
          {isAdding || isEditing ? <X size={14} /> : <Plus size={14} />}
          {isAdding || isEditing ? 'Cancel' : 'New Assignment'}
        </motion.button>
      </div>

      <AnimatePresence mode="wait">
        {(isAdding || isEditing) && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-white rounded-2xl border-[1.5px] border-[#e2e0d8] overflow-hidden mb-8 shadow-sm"
          >
            <div className="px-8 py-6 border-b-[1.5px] border-[#e2e0d8]">
              <h3 className="text-[14px] font-bold text-[#1a1916]" style={{ fontFamily: "'Sora', sans-serif" }}>
                {isEditing ? 'Modify Duty Assignment' : 'Create New Mission'}
              </h3>
            </div>
            
            <form onSubmit={handleSubmit} className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              
              {/* Staff Selection */}
              <FormField label="Field Personnel" icon={<Users size={14} />}>
                <select value={form.staff_id} onChange={e => patchForm('staff_id', e.target.value)} required className="w-full bg-transparent border-none outline-none text-[12px] font-medium appearance-none cursor-pointer">
                  <option value="">Select Staff...</option>
                  {users.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
                </select>
              </FormField>

              {/* Task Type */}
              <FormField label="Mission Type" icon={<Briefcase size={14} />}>
                <select value={form.task_type_id} onChange={e => patchForm('task_type_id', e.target.value)} required className="w-full bg-transparent border-none outline-none text-[12px] font-medium appearance-none cursor-pointer">
                  <option value="">Select Task...</option>
                  {(masterData.task_type || []).map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                </select>
              </FormField>

              {/* Status */}
              <FormField label="Initial Status" icon={<Activity size={14} />}>
                <select value={form.status_id} onChange={e => patchForm('status_id', e.target.value)} required className="w-full bg-transparent border-none outline-none text-[12px] font-medium appearance-none cursor-pointer">
                  {(masterData.status_assignment
                     || []).map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                </select>
              </FormField>

              {/* References Section */}
              <div className="lg:col-span-3 border-t border-[#f0efe9] pt-8 mt-2">
                <h4 className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#b0aea5] mb-6">Linked References (Optional)</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  <FormField label="Booking" icon={<Calendar size={14} />}>
                    <select value={form.booking_id} onChange={e => patchForm('booking_id', e.target.value)} className="w-full bg-transparent border-none outline-none text-[12px] font-medium appearance-none cursor-pointer">
                      <option value="">None</option>
                      {bookings.map(b => <option key={b.id} value={b.id}>#{b.id} - {b.lead?.name || 'Booking'}</option>)}
                    </select>
                  </FormField>
                  <FormField label="Flight" icon={<Plane size={14} />}>
                    <select value={form.flight_id} onChange={e => patchForm('flight_id', e.target.value)} className="w-full bg-transparent border-none outline-none text-[12px] font-medium appearance-none cursor-pointer">
                      <option value="">None</option>
                      {flights.map(f => <option key={f.id} value={f.id}>{f.airline} </option>)}
                    </select>
                  </FormField>
                  <FormField label="Hotel" icon={<Hotel size={14} />}>
                    <select value={form.hotel_id} onChange={e => patchForm('hotel_id', e.target.value)} className="w-full bg-transparent border-none outline-none text-[12px] font-medium appearance-none cursor-pointer">
                      <option value="">None</option>
                      {hotels.map(h => <option key={h.id} value={h.id}>{h.hotel_name}</option>)}
                    </select>
                  </FormField>
                  <FormField label="Driver Name" icon={<Car size={14} />}>       
                    <select value={form.transport_id} onChange={e => patchForm('transport_id', e.target.value)} className="w-full bg-transparent border-none outline-none text-[12px] font-medium appearance-none cursor-pointer">
                      <option value="">None</option>
                      {transports.map(t => <option key={t.id} value={t.id}>{t.driver} </option>)}
                    </select>
                  </FormField>
                  <FormField label="Task Detail" icon={<Info size={14} />}>
                    <textarea value={form.task_detail} onChange={e => patchForm('task_detail', e.target.value)} className="w-full bg-transparent border-none outline-none text-[12px] font-medium appearance-none cursor-pointer"></textarea>
                  </FormField>
                </div>
              </div>

              <div className="lg:col-span-3 flex justify-end gap-3 mt-4">
                <button type="submit" disabled={isLoading} className="h-12 px-10 rounded-lg bg-[#1a1916] text-white text-[10px] font-bold uppercase tracking-[0.15em] transition-all hover:scale-[1.02] disabled:opacity-50">
                   {isEditing ? 'Confirm Update' : 'Finalize Assignment'}
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {!(isAdding || isEditing) && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-2xl border-[1.5px] border-[#e2e0d8] overflow-hidden">
            <div className="p-7 border-b-[1.5px] border-[#e2e0d8] flex items-center justify-between">
              <div className="relative max-w-sm w-full">
                <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#b0aea5]" />
                <input
                  type="text"
                  placeholder="Search by personnel..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full bg-[#f5f4f0] border-[1.5px] border-[#e2e0d8] rounded-xl pl-12 pr-4 py-2.5 text-[12px] outline-none focus:border-[#1a1916] transition-all"
                />
              </div>
              <div className="text-[10px] font-bold text-[#78776f] uppercase tracking-widest bg-[#f5f4f0] px-4 py-2 rounded-lg border border-[#e2e0d8]">
                {filtered.length} active duties
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-[#f5f4f0]">
                    {['Personnel', 'Task Type', 'Assigned For', 'Status', 'Actions'].map((h, idx) => (
                      <th key={h} className={`px-8 py-5 text-[9px] font-bold uppercase tracking-[0.15em] text-[#78776f] border-b-[1.5px] border-[#e2e0d8] ${idx === 4 ? 'text-right' : ''}`}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f0efe9]">
                  {paginatedData.length > 0 ? paginatedData.map((a) => {
                    const staff = users.find(u => u.id === a.staff_id) || { name: 'Unknown' };
                    const task = (masterData.task_type || []).find(t => t.id === a.task_type_id) || { name: 'Field Duty' };
                    const status = STATUS_CONFIG[a.status_id] || STATUS_CONFIG.default;
                    
                    return (
                      <tr key={a.id} className="hover:bg-[#fcfbf9] transition-colors group">
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-[#1a1916] flex items-center justify-center text-white text-[11px] font-bold">
                              {staff.name.charAt(0)}
                            </div>
                            <div>
                              <div className="text-[12px] font-bold text-[#1a1916]" style={{ fontFamily: "'Sora', sans-serif" }}>{staff.name}</div>
                              <div className="text-[9px] text-[#b0aea5] uppercase tracking-tighter">Staff ID: {staff.id || 'N/A'}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#f5f4f0] border border-[#e2e0d8]">
                            <Briefcase size={10} className="text-[#78776f]" />
                            <span className="text-[9px] font-bold uppercase tracking-wider text-[#1a1916]">{task.name}</span>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <div className="flex flex-wrap gap-2">
                             {a.booking_id && <RefBadge icon={<Calendar size={8}/>} label={`BK#${a.booking_id}`} />}
                             {a.flight_id && <RefBadge icon={<Plane size={8}/>} label={`FL#${a.flight_id}`} />}
                             {a.hotel_id && <RefBadge icon={<Hotel size={8}/>} label={`HT#${a.hotel_id}`} />}
                             {a.transport_id && <RefBadge icon={<Car size={8}/>} label={`TR#${a.transport_id}`} />}
                             {!a.booking_id && !a.flight_id && !a.hotel_id && !a.transport_id && <span className="text-[11px] text-[#b0aea5]">General Assignment</span>}
                          </div>
                        </td>
                        <td className="px-8 py-6">
                           <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[9px] font-bold uppercase tracking-wider" style={{ background: status.bg, color: status.text, border: `1.5px solid ${status.border}` }}>
                             <div className="w-1.5 h-1.5 rounded-full" style={{ background: status.dot }} />
                             {status.label}
                           </span>
                        </td>
                        <td className="px-8 py-6 text-right">
                           <div className="flex items-center justify-end gap-2.5">
                             <button onClick={() => handleEdit(a)} className="w-8 h-8 rounded-lg border-[1.5px] border-[#e2e0d8] flex items-center justify-center text-[#78776f] hover:border-[#1a1916] hover:text-[#1a1916] transition-all cursor-pointer">
                               <Edit2 size={12} />
                             </button>
                             <button onClick={() => { if(window.confirm('Delete assignment?')) deleteAssignment(a.id); }} className="w-8 h-8 rounded-lg border-[1.5px] border-[#e2e0d8] flex items-center justify-center text-[#78776f] hover:border-[#c23b2e] hover:text-[#c23b2e] transition-all cursor-pointer">
                               <Trash2 size={12} />
                             </button>
                           </div>
                        </td>
                      </tr>
                    );
                  }) : (
                    <tr>
                      <td colSpan={5} className="py-20 text-center">
                        <Info size={32} className="mx-auto text-[#e2e0d8] mb-4" strokeWidth={1} />
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#c5c2b8]">Zero missions dispatched</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <Pagination 
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={goToPage}
              startIndex={startIndex}
              endIndex={endIndex}
              totalItems={totalItems}
            />
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

/* ─── Helpers ───────────────────────────────────────────────────────── */
const FormField = ({ label, icon, children }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#78776f] ml-1">{label}</label>
    <div className="flex items-center gap-3 bg-[#f5f4f0] border-[1.5px] border-[#e2e0d8] rounded-xl px-4 py-3 focus-within:border-[#1a1916] focus-within:bg-white transition-all">
      <div className="text-[#b0aea5]">{icon}</div>
      {children}
    </div>
  </div>
);

const RefBadge = ({ icon, label }) => (
  <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-[#ffffff] border border-[#e2e0d8] shadow-sm">
    <div className="text-[#b0aea5]">{icon}</div>
    <span className="text-[9px] font-bold text-[#78776f]">{label}</span>
  </div>
);

export default Assignment;
