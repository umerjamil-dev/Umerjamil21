import React, { useEffect, useState } from 'react';
import {
  ShieldCheck, Hotel, Plane, MapPin,
  ChevronRight, Search, Filter,
  CalendarDays, MoreHorizontal,
  Clock, CheckCircle2, AlertCircle,
  Wand2, Shapes, Tag, Trash2, Eye,
  SlidersHorizontal, TrendingUp, Plus
} from 'lucide-react';
import { Link } from 'react-router-dom';
import useBookingStore from '../store/useBookingStore';

const Reservations = () => {
  const { bookings: reservations, fetchBookings, isLoading } = useBookingStore();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);
  console.log(reservations);

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Visa':      return { icon: ShieldCheck, color: '#059669', bg: '#ecfdf5', border: '#a7f3d0' };
      case 'Hotel':     return { icon: Hotel,       color: '#d97706', bg: '#fffbeb', border: '#fde68a' };
      case 'Flight':    return { icon: Plane,        color: '#2563eb', bg: '#eff6ff', border: '#bfdbfe' };
      case 'Transport': return { icon: MapPin,       color: '#7c3aed', bg: '#f5f3ff', border: '#ddd6fe' };
      default:          return { icon: ShieldCheck,  color: '#64748b', bg: '#f8fafc', border: '#e2e8f0' };
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Confirmed': return { bg: '#f0fdf4', text: '#15803d', border: '#bbf7d0', dot: '#22c55e' };
      case 'Partial':   return { bg: '#fefce8', text: '#a16207', border: '#fef08a', dot: '#eab308' };
      case 'Pending':   return { bg: '#f8fafc', text: '#64748b', border: '#e2e8f0', dot: '#94a3b8' };
      default:          return { bg: '#f8fafc', text: '#64748b', border: '#e2e8f0', dot: '#94a3b8' };
    }
  };

  const getCustomerName = (c, name) => {
    if (!c && !name) return 'Guest';
    if (typeof c === 'string') return c;
    if (c && typeof c === 'object') return c.firstName || c.first_name || c.name || `ID: ${c.id}`;
    return name || 'Guest';
  };

  const getPackageName = (p) => {
    if (!p) return 'Standard Package';
    if (typeof p === 'string') return p;
    return p.title || p.name || `ID: ${p.id}`;
  };

  const reservationsToShow = Array.isArray(reservations)
    ? reservations
    : Object.values(reservations || {});

  const filtered = reservationsToShow.filter((r) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      String(r.id).toLowerCase().includes(q) ||
      getCustomerName(r.customer, r.customer_name).toLowerCase().includes(q) ||
      getPackageName(r.package).toLowerCase().includes(q)
    );
  });

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }} className="pb-20">

      {/* ── Header ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: '#94a3b8' }}>
            Management
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Reservations
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            All active bookings, visas, and travel protocols.
          </p>
        </div>
        <Link
          to="/reservations/add"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-95"
          style={{ background: '#0f172a', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }}
        >
          <Plus size={16} strokeWidth={2.5} />
          New Reservation
        </Link>
      </div>

      {/* ── Stats Row ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total', value: reservationsToShow.length, color: '#0f172a' },
          { label: 'Confirmed', value: reservationsToShow.filter(r => r.status === 'Confirmed').length, color: '#15803d' },
          { label: 'Partial', value: reservationsToShow.filter(r => r.status === 'Partial').length, color: '#a16207' },
          { label: 'Pending', value: reservationsToShow.filter(r => !r.status || r.status === 'Pending').length, color: '#64748b' },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl p-4"
            style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}
          >
            <p className="text-xs font-medium text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
            <p className="text-2xl font-bold" style={{ color: stat.color }}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* ── Search & Filter Bar ── */}
      <div
        className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-6 p-4 rounded-xl"
        style={{ background: '#ffffff', border: '1px solid #e2e8f0' }}
      >
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
            style={{ color: '#94a3b8' }}
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by ID, pilgrim name, or package..."
            className="w-full pl-9 pr-4 py-2.5 text-sm rounded-lg outline-none transition-all"
            style={{
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              color: '#0f172a',
            }}
            onFocus={e => { e.target.style.borderColor = '#94a3b8'; }}
            onBlur={e => { e.target.style.borderColor = '#e2e8f0'; }}
          />
        </div>
        <div className="flex gap-3">
          <button
            className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg transition-all hover:bg-slate-100"
            style={{ background: '#f8fafc', border: '1px solid #e2e8f0', color: '#475569' }}
          >
            <SlidersHorizontal size={15} strokeWidth={2} />
            Filter
          </button>
          <button
            className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg transition-all hover:bg-slate-100"
            style={{ background: '#f8fafc', border: '1px solid #e2e8f0', color: '#475569' }}
          >
            <CalendarDays size={15} strokeWidth={2} />
            Date Range
          </button>
        </div>
      </div>

      {/* ── Table ── */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{ background: '#ffffff', border: '1px solid #e2e8f0' }}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                {['Guest', 'Package', 'Dates', 'Amount', ''].map((h) => (
                  <th
                    key={h}
                    className="px-6 py-4 text-xs font-semibold uppercase tracking-wider"
                    style={{ color: '#94a3b8' }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan="5" className="px-6 py-16 text-center text-sm text-slate-400">
                    Loading reservations...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-16 text-center text-sm text-slate-400">
                    {searchQuery ? 'No results found.' : 'No reservations yet.'}
                  </td>
                </tr>
              ) : filtered.map((res, idx) => {
                const typeInfo = getTypeIcon(res.type || 'Visa');
                const statusStyle = getStatusStyle(res.status);
                const TypeIcon = typeInfo.icon;
                const isLast = idx === filtered.length - 1;

                return (
                  <tr
                    key={res.id}
                    className="group transition-colors hover:bg-slate-50"
                    style={{ borderBottom: isLast ? 'none' : '1px solid #f1f5f9' }}
                  >
                    {/* Guest */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{ background: typeInfo.bg, border: `1px solid ${typeInfo.border}` }}
                        >
                          <TypeIcon size={18} strokeWidth={1.8} style={{ color: typeInfo.color }} />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-900">
                            {getCustomerName(res.customer, res.customer_name)}
                          </p>
                          <p className="text-xs text-slate-400 mt-0.5">#{res.id}</p>
                        </div>
                      </div>
                    </td>

                    {/* Package */}
                    <td className="px-6 py-4">
                      <span
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium"
                        style={{ background: '#f8fafc', border: '1px solid #e2e8f0', color: '#475569' }}
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full"
                          style={{
                            background: res.visaStatus === 'Approved' ? '#22c55e' : '#cbd5e1',
                          }}
                        />
                        {getPackageName(res.package)}
                      </span>
                    </td>

                    {/* Dates */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <CalendarDays size={14} strokeWidth={1.8} style={{ color: '#94a3b8' }} />
                        {res.
travel_date || '—'}
                      </div>
                    </td>

                    {/* Amount */}
                    <td className="px-6 py-4">
                      <p className="text-sm font-semibold text-slate-900">
                        ${(parseFloat(res.amount || res.total_amount) || 0).toLocaleString()}
                      </p>
                      <span
                        className="inline-flex items-center gap-1.5 mt-1 px-2 py-0.5 rounded-full text-xs font-medium"
                        style={{
                          background: statusStyle.bg,
                          color: statusStyle.text,
                          border: `1px solid ${statusStyle.border}`,
                        }}
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ background: statusStyle.dot }}
                        />
                        {res.status || 'Pending'}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 text-right">
                      <Link
                        to={`/bookings/${res.booking_id || res.id}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all  hover:bg-slate-100"
                        style={{
                          background: '#f8fafc',
                          border: '1px solid #e2e8f0',
                          color: '#475569',
                        }}
                        title="View Details"
                      >
                        <Eye size={13} strokeWidth={2} />
                        View
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        {filtered.length > 0 && (
          <div
            className="px-6 py-3 flex items-center justify-between"
            style={{ borderTop: '1px solid #f1f5f9', background: '#fafafa' }}
          >
            <p className="text-xs text-slate-400">
              Showing {filtered.length} of {reservationsToShow.length} reservations
            </p>
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs text-slate-400">Live sync</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reservations;