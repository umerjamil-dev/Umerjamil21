import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User, Mail, Smartphone, ShieldCheck,
  Plus, Search, Filter,
  Edit2, Trash2, X,
  Activity, ShieldAlert, Zap, Users, Lock,
  PhoneCall, FileText, Camera
} from 'lucide-react';
import useUserStore from '../store/useUserStore';
import useSettingsStore from '../store/useSettingsStore';
import toast from 'react-hot-toast';

/* ─── Constants ─────────────────────────────────────────────────────── */
const EASE = [0.22, 1, 0.36, 1];
const DEFAULT_FORM = {
  name: '', email: '', phone: '', password: '',
  is_admin: '0', role_id: '', status_id: '1',
  emergency_contact: '', passport_visa: '', profile_photo: null
};

const STATUS_MAP = {
  '1': { label: 'Active', dot: '#1a7a4a', bg: '#edf7f1', border: '#9fe1cb', text: '#1a7a4a' },
  '2': { label: 'Suspended', dot: '#c23b2e', bg: '#fff1f0', border: '#f7c1c1', text: '#c23b2e' },
  '5': { label: 'Pending', dot: '#ba7517', bg: '#faeeda', border: '#fac775', text: '#854f0b' },
  'default': { label: 'Unknown', dot: '#b0aea5', bg: '#f5f4f0', border: '#e2e0d8', text: '#78776f' },
};

const FORM_FIELDS = [
  { label: 'Full Name', key: 'name', type: 'text', placeholder: 'Umar Jamil', Icon: User },
  { label: 'Email', key: 'email', type: 'email', placeholder: 'umar@albayan.com', Icon: Mail },
  { label: 'Phone', key: 'phone', type: 'text', placeholder: '+971 50 000 0000', Icon: Smartphone },
  { label: 'Emergency Contact', key: 'emergency_contact', type: 'text', placeholder: 'Name (+971...)', Icon: PhoneCall },
  { label: 'Password', key: 'password', type: 'password', placeholder: '••••••••', Icon: Lock },
];

/* ════════════════════════════════════════════════════════════════════════
   ManageUsers
   ════════════════════════════════════════════════════════════════════════ */
const ManageUsers = () => {
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [search, setSearch] = useState('');
  const [form, setForm] = useState(DEFAULT_FORM);

  const { users, fetchUsers, addUser, updateUser, deleteUser, isLoading: usersLoading } = useUserStore();
  const { roles, fetchSettings, isLoading: settingsLoading } = useSettingsStore();
  const isLoading = usersLoading || settingsLoading;

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      patchForm('profile_photo', file);
    }
  };

  const getPhotoPreview = (photo) => {
    if (!photo) return null;
    if (photo instanceof File || photo instanceof Blob) return URL.createObjectURL(photo);
    return resolveImageUrl(photo);
  };

  const resolveImageUrl = (path) => {
    if (!path) return null;
    if (path.startsWith('data:') || path.startsWith('blob:') || path.startsWith('http')) return path;
    return `http://192.168.5.111:8000/storage/${path}`;

  };

  useEffect(() => { fetchUsers(); fetchSettings(); }, [fetchUsers, fetchSettings]);

  const filtered = useMemo(() =>
    users.filter(u =>
      u.name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase())
    ), [users, search]);

  const handleReset = () => { setIsAdding(false); setIsEditing(false); setEditingUser(null); setForm(DEFAULT_FORM); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing && editingUser) {
      const result = await updateUser(editingUser.id, form);
      if (result.success) { toast.success('User updated successfully.'); await fetchUsers(); handleReset(); }
      else toast.error('Update failed: ' + result.error);
    } else {
      const result = await addUser(form);
      if (result.success) { toast.success('User enrolled successfully.'); await fetchUsers(); handleReset(); }
      else toast.error('Failed: ' + result.error);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user); setIsEditing(true); setIsAdding(false);
    setForm({
      name: user.name || '',
      email: user.email || '',
      phone: user.phone || '',
      role_id: user.role_id || '',
      status_id: user.status_id || '1',
      is_admin: user.is_admin ?? '0',
      password: '',
      emergency_contact: user.emergency_contact || '',
      passport_visa: user.passport_visa || '',
      profile_photo: user.profile_photo || null
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Remove this user permanently?')) {
      const result = await deleteUser(id);
      result.success ? toast.success('User removed.') : toast.error('Delete failed.');
    }
  };

  const patchForm = (key, val) => setForm(prev => ({ ...prev, [key]: val }));
  const activeCount = users.filter(u => u.status_id === '1').length;

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
            <Zap size={10} strokeWidth={3} />
            Personnel Management
          </div>
          <h1
            className="text-5xl lg:text-6xl font-extrabold text-[#1a1916] leading-none"
            style={{ fontFamily: "'Sora', sans-serif", letterSpacing: '-0.03em' }}
          >
            Users
          </h1>
          <p className="text-[12px] text-[#78776f] font-normal leading-relaxed" style={{ fontFamily: "'Sora', sans-serif" }}>
            Manage access, roles, and system-level permissions.
          </p>
        </div>

        {/* Stat pills */}
        <div className="flex items-center gap-2.5 flex-shrink-0">
          {[
            { label: 'Total', val: users.length, Icon: Users },
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

        {/* CTA */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => { if (isEditing || isAdding) handleReset(); else setIsAdding(true); }}
          className="h-12 px-8 rounded-lg text-[10px] font-bold uppercase tracking-[0.15em] flex items-center gap-2.5 transition-all cursor-pointer flex-shrink-0"
          style={
            isAdding || isEditing
              ? { background: '#ffffff', color: '#78776f', border: '1.5px solid #c5c2b8' }
              : { background: '#1a1916', color: '#ffffff', border: '1.5px solid #1a1916' }
          }
        >
          {isAdding || isEditing ? <X size={14} strokeWidth={2.5} /> : <Plus size={14} strokeWidth={2.5} />}
          {isAdding || isEditing ? 'Cancel' : 'Add User'}
        </motion.button>
      </motion.div>

      <AnimatePresence mode="wait">

        {/* ── ADD / EDIT FORM ── */}
        {(isAdding || isEditing) && (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.28, ease: EASE }}
            className="bg-white rounded-2xl overflow-hidden mb-3"
            style={{ border: '1.5px solid #e2e0d8' }}
          >
            <div className="px-8 pt-8 pb-6 flex items-center justify-between" style={{ borderBottom: '1.5px solid #e2e0d8' }}>
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#78776f] mb-1">
                  {isEditing ? 'Edit Personnel' : 'New Personnel'}
                </p>
                <h2
                  className="text-xl font-extrabold text-[#1a1916]"
                  style={{ fontFamily: "'Sora', sans-serif", letterSpacing: '-0.02em' }}
                >
                  {isEditing ? 'Modify Personnel Details' : 'Enroll New Identity'}
                </h2>
              </div>

              {/* Profile Photo Upload */}
              <div className="relative group/photo">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center overflow-hidden border-2 border-dashed border-[#e2e0d8] group-hover/photo:border-[#1a1916] transition-all"
                  style={{ background: '#f5f4f0' }}
                >
                  {form.profile_photo ? (
                    <img src={getPhotoPreview(form.profile_photo)} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <Camera size={20} style={{ color: '#b0aea5' }} />
                  )}
                </div>
                <label className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#1a1916] text-white rounded-lg flex items-center justify-center cursor-pointer hover:scale-110 transition-all shadow-lg">
                  <Plus size={12} strokeWidth={3} />
                  <input type="file" className="hidden" accept="image/*" onChange={handlePhotoChange} />
                </label>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-7 px-8 py-8">

              {FORM_FIELDS.map(({ label, key, type, placeholder, Icon }) => (
                <div key={key} className="flex flex-col gap-1.5 group">
                  <label className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#78776f]">{label}</label>
                  <div
                    className="flex items-center gap-3 rounded-lg px-4 py-3 transition-all"
                    style={{ background: '#f5f4f0', border: '1.5px solid #e2e0d8' }}
                    onFocusCapture={e => { e.currentTarget.style.borderColor = '#1a1916'; e.currentTarget.style.background = '#ffffff'; }}
                    onBlurCapture={e => { e.currentTarget.style.borderColor = '#e2e0d8'; e.currentTarget.style.background = '#f5f4f0'; }}
                  >
                    <Icon size={14} style={{ color: '#b0aea5', flexShrink: 0 }} />
                    <input
                      required
                      type={type}
                      placeholder={placeholder}
                      value={form[key]}
                      onChange={e => patchForm(key, e.target.value)}
                      className="flex-1 bg-transparent border-none outline-none text-[12px] font-medium text-[#1a1916] placeholder:text-[#c5c2b8]"
                    />
                  </div>
                </div>
              ))}

              {/* Access Role */}
              <SelectField label="Access Role" icon={<ShieldCheck size={14} style={{ color: '#b0aea5' }} />}
                value={form.role_id} onChange={v => patchForm('role_id', v)} required>
                <option value="">Select role…</option>
                {roles.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
              </SelectField>

              {/* Is Admin */}
              <SelectField label="Is Admin" icon={<ShieldCheck size={14} style={{ color: '#b0aea5' }} />}
                value={form.is_admin} onChange={v => patchForm('is_admin', v)} required>
                <option value="">Select…</option>
                <option value={1}>Yes</option>
                <option value={0}>No</option>
              </SelectField>

              {/* Passport / Visa Info */}
              <div className="md:col-span-2 lg:col-span-3 flex flex-col gap-1.5 group">
                <label className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#78776f]">Passport / Visa Info</label>
                <div
                  className="flex items-start gap-3 rounded-lg px-4 py-3 transition-all"
                  style={{ background: '#f5f4f0', border: '1.5px solid #e2e0d8' }}
                  onFocusCapture={e => { e.currentTarget.style.borderColor = '#1a1916'; e.currentTarget.style.background = '#ffffff'; }}
                  onBlurCapture={e => { e.currentTarget.style.borderColor = '#e2e0d8'; e.currentTarget.style.background = '#f5f4f0'; }}
                >
                  <FileText size={14} style={{ color: '#b0aea5', flexShrink: 0, marginTop: '2px' }} />
                  <textarea
                    placeholder="Passport details, Visa status, Expiry dates..."
                    value={form.passport_visa}
                    onChange={e => patchForm('passport_visa', e.target.value)}
                    className="flex-1 bg-transparent border-none outline-none text-[12px] font-medium text-[#1a1916] placeholder:text-[#c5c2b8] min-h-[80px] resize-none"
                  />
                </div>
              </div>

              {/* Status */}
              <SelectField label="Status" icon={<Activity size={14} style={{ color: '#b0aea5' }} />}
                value={form.status_id} onChange={v => patchForm('status_id', v)}>
                <option value="1">Active</option>
                <option value="2">Suspended</option>
                <option value="5">Pending</option>
              </SelectField>

              {/* Submit */}
              <div className="md:col-span-2 lg:col-span-3 flex justify-end pt-2">
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="h-12 px-10 rounded-lg text-[10px] font-bold uppercase tracking-[0.15em] text-white transition-all disabled:opacity-50 cursor-pointer"
                  style={{ background: '#1a1916' }}
                >
                  {isLoading
                    ? (isEditing ? 'Updating…' : 'Enrolling…')
                    : (isEditing ? 'Save Changes' : 'Confirm Enrollment')}
                </motion.button>
              </div>
            </form>
          </motion.div>
        )}

        {/* ── TABLE ── */}
        {!(isAdding || isEditing) && (
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
                  placeholder="Search users…"
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
                {filtered.length} users
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr style={{ background: '#f5f4f0' }}>
                    {['User', 'Contact', 'Role', 'Status', 'Joined', 'Actions'].map((h, i) => (
                      <th
                        key={h}
                        className="px-7 py-4"
                        style={{
                          fontSize: '9px', fontWeight: 700, textTransform: 'uppercase',
                          letterSpacing: '0.15em', color: '#78776f',
                          borderBottom: '1.5px solid #e2e0d8',
                          textAlign: i === 5 ? 'right' : 'left',
                        }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {filtered.length > 0 ? filtered.map((u, i) => {
                    const role = roles.find(r => r.id?.toString() === u.role_id?.toString()) || { name: 'Personnel' };
                    const status = STATUS_MAP[u.status_id] || STATUS_MAP['default'];

                    return (
                      <motion.tr
                        key={u.id || i}
                        initial={{ opacity: 0, x: -6 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.03, ease: EASE }}
                        className="group transition-colors"
                        style={{ borderBottom: '1.5px solid #f0efe9' }}
                        onMouseEnter={e => { e.currentTarget.style.background = '#f5f4f0'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
                      >
                        <td className="px-7 py-4">
                          <div className="flex items-center gap-3.5">
                            <div className="relative flex-shrink-0">
                              {u.profile_photo || u.photo ? (
                                <div className="w-10 h-10 rounded-xl overflow-hidden border border-[#e2e0d8]">
                                  <img src={resolveImageUrl(u.profile_photo || u.photo)} alt="" className="w-full h-full object-cover" />
                                </div>
                              ) : (
                                <div
                                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-bold"
                                  style={{ background: '#1a1916' }}
                                >
                                  {u.name?.charAt(0).toUpperCase()}
                                </div>
                              )}
                              <span
                                className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-white"
                                style={{ background: status.dot }}
                              />
                            </div>
                            <div>
                              <div className="text-[12px] font-bold text-[#1a1916]" style={{ fontFamily: "'Sora', sans-serif" }}>
                                {u.name || 'Incognito User'}
                              </div>
                              <div className="text-[10px] text-[#b0aea5] mt-0.5">{u.email || '—'}</div>
                            </div>
                          </div>
                        </td>

                        {/* Contact */}
                        <td className="px-7 py-4 min-w-[200px]">
                          <div className="flex flex-col gap-1">
                            <span className="text-[11px] font-medium text-[#78776f]">{u.phone || '—'}</span>
                            {u.emergency_contact && (
                              <span className="text-[9px] font-bold text-[#b0aea5] flex items-center gap-1">
                                <PhoneCall size={10} /> {u.emergency_contact}
                              </span>
                            )}
                          </div>
                        </td>

                        {/* Role */}
                        <td className="px-7 py-4">
                          <span
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[9px] font-bold uppercase tracking-[0.08em]"
                            style={
                              u.is_admin
                                ? { background: '#1a1916', color: '#ffffff', border: '1.5px solid #1a1916' }
                                : { background: '#f5f4f0', color: '#78776f', border: '1.5px solid #e2e0d8' }
                            }
                          >
                            <ShieldCheck size={10} />
                            {u.permission_status || 'Unassigned'}
                          </span>
                        </td>

                        {/* Status */}
                        <td className="px-7 py-4">
                          <span
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[9px] font-bold uppercase tracking-[0.08em]"
                            style={{ background: status.bg, color: status.text, border: `1.5px solid ${status.border}` }}
                          >
                            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: status.dot }} />
                            {u.status_name || status.label}
                          </span>
                        </td>

                        {/* Joined */}
                        <td className="px-7 py-4">
                          <span className="text-[10px] font-medium text-[#b0aea5]">
                            {u.created_at
                              ? new Date(u.created_at).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })
                              : '—'}
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="px-7 py-4 text-right">
                          <div className="flex items-center gap-2 justify-end">
                            <ActionBtn icon={Edit2} title="Edit" onClick={() => handleEdit(u)} />
                            <ActionBtn icon={Trash2} title="Delete" onClick={() => handleDelete(u.id)} danger />
                          </div>
                        </td>
                      </motion.tr>
                    );
                  }) : (
                    <tr>
                      <td colSpan={6} className="py-24 text-center">
                        <div className="flex flex-col items-center gap-3">
                          <ShieldAlert size={36} style={{ color: '#e2e0d8' }} strokeWidth={1.2} />
                          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#c5c2b8]">No users found</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ─── Select Field ───────────────────────────────────────────────────── */
const SelectField = ({ label, icon, value, onChange, children, required }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#78776f]">{label}</label>
    <div
      className="flex items-center gap-3 rounded-lg px-4 py-3 transition-all"
      style={{ background: '#f5f4f0', border: '1.5px solid #e2e0d8' }}
      onFocusCapture={e => { e.currentTarget.style.borderColor = '#1a1916'; e.currentTarget.style.background = '#ffffff'; }}
      onBlurCapture={e => { e.currentTarget.style.borderColor = '#e2e0d8'; e.currentTarget.style.background = '#f5f4f0'; }}
    >
      {icon}
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        required={required}
        className="flex-1 bg-transparent border-none outline-none text-[12px] font-medium text-[#1a1916] cursor-pointer appearance-none"
        style={{ fontFamily: "'DM Mono', monospace" }}
      >
        {children}
      </select>
    </div>
  </div>
);

/* ─── Action Button ──────────────────────────────────────────────────── */
const ActionBtn = ({ icon: Icon, title, onClick, danger }) => (
  <motion.button
    title={title}
    onClick={onClick}
    whileHover={{ scale: 1.08 }}
    whileTap={{ scale: 0.94 }}
    className="flex items-center justify-center w-8 h-8 rounded-lg cursor-pointer transition-all"
    style={{ background: '#ffffff', border: '1.5px solid #e2e0d8' }}
    onMouseEnter={e => {
      e.currentTarget.style.background = danger ? '#fff1f0' : '#f5f4f0';
      e.currentTarget.style.borderColor = danger ? '#f7c1c1' : '#c5c2b8';
    }}
    onMouseLeave={e => {
      e.currentTarget.style.background = '#ffffff';
      e.currentTarget.style.borderColor = '#e2e0d8';
    }}
  >
    <Icon size={13} style={{ color: danger ? '#c23b2e' : '#78776f' }} />
  </motion.button>
);

export default ManageUsers;