import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Filter, Activity, Users, ShieldCheck, 
  MapPin, PhoneCall, Mail
} from 'lucide-react';
import useOperationsStore from '../store/useOperationsStore';

/* ─── Constants ─────────────────────────────────────────────────────── */
const EASE = [0.22, 1, 0.36, 1];

const STATUS_MAP = {
  'active':    { label: 'Active',    dot: '#1a7a4a', bg: '#edf7f1', border: '#9fe1cb', text: '#1a7a4a' },
  'on_leave':  { label: 'On Leave',  dot: '#ba7517', bg: '#faeeda', border: '#fac775', text: '#854f0b' },
  'suspended': { label: 'Suspended', dot: '#c23b2e', bg: '#fff1f0', border: '#f7c1c1', text: '#c23b2e' },
  'default':   { label: 'Unknown',   dot: '#b0aea5', bg: '#f5f4f0', border: '#e2e0d8', text: '#78776f' },
};

const StaffManagement = () => {
  const [search, setSearch] = useState('');
  
  const { staff, fetchOperationsData, isLoading } = useOperationsStore();

  useEffect(() => {
    fetchOperationsData();
  }, [fetchOperationsData]);

  // Use useMemo to filter staff based on search input
  const filtered = useMemo(() => {
    const staffArray = Array.isArray(staff) ? staff : [];
    return staffArray.filter(s =>
      s.name?.toLowerCase().includes(search.toLowerCase()) ||
      s.email?.toLowerCase().includes(search.toLowerCase()) ||
      s.contact_number?.toLowerCase().includes(search.toLowerCase()) ||
      s.role?.toLowerCase().includes(search.toLowerCase())
    );
  }, [staff, search]);

  const activeCount = Array.isArray(staff) ? staff.filter(s => s.status === 'active' || s.is_active || s.status_id === '1' || s.status_id === 1).length : 0;
  
  // Resolve image URL (similar to ManageUsers)
  const resolveImageUrl = (path) => {
    if (!path) return null;
    if (path.startsWith('data:') || path.startsWith('blob:') || path.startsWith('http')) return path;
    return `http://192.168.5.178:8000/storage/${path}`;
  };

  return (
    <div className="min-h-screen bg-[#f5f4f0] px-8 py-14 lg:px-20" style={{ fontFamily: "'DM Mono', monospace" }}>
      {/* ── HEADER ── */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="flex flex-wrap items-end gap-6 mb-14"
      >
        <div className="flex-1 min-w-[220px] space-y-3">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm text-[9px] font-bold uppercase tracking-[0.18em] text-white"
            style={{ background: '#1a1916' }}
          >
            <ShieldCheck size={10} strokeWidth={3} />
            Operations Division
          </div>
          <h1
            className="text-5xl lg:text-6xl font-extrabold text-[#1a1916] leading-none"
            style={{ fontFamily: "'Sora', sans-serif", letterSpacing: '-0.03em' }}
          >
            Staff Management
          </h1>
          <p className="text-[12px] text-[#78776f] font-normal leading-relaxed" style={{ fontFamily: "'Sora', sans-serif" }}>
            Monitor and coordinate operational staff across all sectors.
          </p>
        </div>

        {/* Stat pills */}
        <div className="flex items-center gap-2.5 flex-shrink-0">
          {[
            { label: 'Total Staff', val: Array.isArray(staff) ? staff.length : 0, Icon: Users },
            { label: 'Active', val: activeCount, Icon: Activity },
          ].map(({ label, val, Icon }) => (
            <div
              key={label}
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-lg"
              style={{ background: '#ffffff', border: '1.5px solid #e2e0d8' }}
            >
              <Icon size={13} style={{ color: '#78776f' }} />
              <span className="text-[15px] font-bold text-[#1a1916]">{val}</span>
              <span className="text-[9px] font-bold uppercase tracking-[0.12em] text-[#b0aea5]">{label}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ── TABLE ── */}
      <AnimatePresence>
        <motion.div
          key="table"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.28, ease: EASE }}
          className="bg-white rounded-2xl overflow-hidden"
          style={{ border: '1.5px solid #e2e0d8' }}
        >
          {/* Toolbar */}
          <div
            className="flex items-center gap-3 px-7 py-5 flex-wrap"
            style={{ borderBottom: '1.5px solid #e2e0d8' }}
          >
            <div
              className="flex items-center gap-3 rounded-lg px-4 py-2.5 flex-1 max-w-sm"
              style={{ background: '#f5f4f0', border: '1.5px solid #e2e0d8' }}
            >
              <Search size={13} style={{ color: '#b0aea5', flexShrink: 0 }} />
              <input
                type="text"
                placeholder="Search staff by name, email, or role..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none text-[12px] font-medium text-[#1a1916] placeholder:text-[#c5c2b8]"
              />
            </div>
            <button
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-[10px] font-bold uppercase tracking-[0.12em] transition-all cursor-pointer"
              style={{ background: '#ffffff', border: '1.5px solid #e2e0d8', color: '#78776f' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#1a1916'; e.currentTarget.style.color = '#1a1916'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#e2e0d8'; e.currentTarget.style.color = '#78776f'; }}
            >
              <Filter size={12} />
              Filter
            </button>
            <div
              className="ml-auto px-3 py-1.5 rounded text-[9px] font-bold uppercase tracking-[0.12em]"
              style={{ background: '#f5f4f0', border: '1.5px solid #e2e0d8', color: '#78776f' }}
            >
              {filtered.length} staff members
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr style={{ background: '#f5f4f0' }}>
                  {['Personnel', 'Role', 'Actions'].map((h, i) => (
                    <th
                      key={h}
                      className="px-7 py-4"
                      style={{
                        fontSize: '9px', fontWeight: 700, textTransform: 'uppercase',
                        letterSpacing: '0.15em', color: '#78776f',
                        borderBottom: '1.5px solid #e2e0d8'
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={3} className="py-24 text-center">
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#c5c2b8]">Synchronizing Ground Data...</p>
                    </td>
                  </tr>
                ) : filtered.length > 0 ? filtered.map((s, i) => {
                  const roleName = s.role || 'Staff';

                  return (
                    <motion.tr
                      key={s.id || i}
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.03, ease: EASE }}
                      className="group transition-colors"
                      style={{ borderBottom: '1.5px solid #f0efe9' }}
                      onMouseEnter={e => { e.currentTarget.style.background = '#f5f4f0'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
                    >
                      {/* Personnel */}
                      <td className="px-7 py-4">
                        <div className="flex items-center gap-3.5">
                          <div
                              className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-bold"
                              style={{ background: '#1a1916' }}
                          >
                              {s.name?.charAt(0).toUpperCase() || '?'}
                          </div>
                          <div>
                              <div className="text-[12px] font-bold text-[#1a1916]" style={{ fontFamily: "'Sora', sans-serif" }}>
                              {s.name || 'Incognito Staff'}
                              </div>
                              <div className="flex items-center gap-1 text-[10px] text-[#b0aea5] mt-0.5">
                                <Mail size={9} />
                                {s.email || '—'}
                              </div>
                          </div>
                        </div>
                      </td>

                      {/* Sector / Role */}
                      <td className="px-7 py-4">
                        <span
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[9px] font-bold uppercase tracking-[0.08em]"
                          style={{ background: '#f5f4f0', color: '#78776f', border: '1.5px solid #e2e0d8' }}
                        >
                          <ShieldCheck size={10} />
                          {roleName}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-7 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#1a7a4a]" />
                          <span className="text-[9px] font-bold uppercase tracking-[0.08em] text-[#1a7a4a]">Online</span>
                        </div>
                      </td>
                      
                    </motion.tr>
                  );
                }) : (
                  <tr>
                    <td colSpan={5} className="py-24 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <Users size={36} style={{ color: '#e2e0d8' }} strokeWidth={1.2} />
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#c5c2b8]">No staff records found</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default StaffManagement;
