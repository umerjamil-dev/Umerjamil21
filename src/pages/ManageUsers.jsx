import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User, Mail, Smartphone, ShieldCheck,
  Plus, Search, Filter,
  Edit2, Trash2, X,
  Activity, ShieldAlert, Zap, Users, Lock
} from 'lucide-react';
import useUserStore from '../store/useUserStore';
import useSettingsStore from '../store/useSettingsStore';
import toast from 'react-hot-toast';

/* ─── Constants ──────────────────────────────────────────────────────── */
const EASE = [0.22, 1, 0.36, 1];
const DEFAULT_FORM = { name: '', email: '', phone: '', password: '', is_admin: '0', role_id: '', status_id: '1' };

const STATUS_MAP = {
  '1': { label: 'Active',    dot: 'bg-green-500', cls: 'bg-green-50 text-green-700' },
  '2': { label: 'Suspended', dot: 'bg-red-500',   cls: 'bg-red-50 text-red-700' },
  '5': { label: 'Pending',   dot: 'bg-amber-500', cls: 'bg-amber-50 text-amber-700' },
  'default': { label: 'Unknown', dot: 'bg-gray-300', cls: 'bg-gray-50 text-gray-500' }
};

const FORM_FIELDS = [
  { label: 'Full Name', key: 'name',  type: 'text',  placeholder: 'Umar Jamil',      Icon: User },
  { label: 'Email',     key: 'email', type: 'email', placeholder: 'umar@albayan.com', Icon: Mail },
  { label: 'Phone',     key: 'phone', type: 'text',  placeholder: '+971 50 000 0000', Icon: Smartphone },
  { label: 'Password',  key: 'password', type: 'password', placeholder: '••••••••', Icon: Lock },
];

/* ════════════════════════════════════════════════════════════════════════
   ManageUsers
   ════════════════════════════════════════════════════════════════════════ */
const ManageUsers = () => {
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [search,   setSearch]   = useState('');
  const [form,     setForm]     = useState(DEFAULT_FORM);

  const { users, fetchUsers, addUser, updateUser, deleteUser, isLoading: usersLoading } = useUserStore();
  const { roles, fetchSettings, isLoading: settingsLoading } = useSettingsStore();

  const isLoading = usersLoading || settingsLoading;

  useEffect(() => { 
    fetchUsers(); 
    fetchSettings();
  }, [fetchUsers, fetchSettings]);

  const filtered = useMemo(() =>
    users.filter(u =>
      u.name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase())
    ), [users, search]);

  const handleReset = () => {
    setIsAdding(false);
    setIsEditing(false);
    setEditingUser(null);
    setForm(DEFAULT_FORM);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isEditing && editingUser) {
      const result = await updateUser(editingUser.id, form);
      if (result.success) {
        toast.success('User updated successfully.');
        await fetchUsers(); // Ensure UI is perfect with backend data
        handleReset();
      } else {
        toast.error('Update failed: ' + result.error);
      }
    } else {
      const result = await addUser(form);
      if (result.success) {
        toast.success('User enrolled successfully.');
        await fetchUsers(); // Get backend-generated fields (like permission_status)
        handleReset();
      } else {
        toast.error('Failed: ' + result.error);
      }
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setIsEditing(true);
    setIsAdding(false); // Close add form if open
    setForm({
      name: user.name || '',
      email: user.email || '',
      phone: user.phone || '',
      role_id: user.role_id || '',
      status_id: user.status_id || '1',
      is_admin: user.is_admin ?? '0',
      password: '' // Don't pre-populate password for security
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Remove this user permanently?')) {
      const result = await deleteUser(id);
      result.success ? toast.success('User removed.') : toast.error('Delete failed.');
    }
  };

  const patchForm = (key, val) => setForm(prev => ({ ...prev, [key]: val }));

  const activeCount    = users.filter(u => u.status_id === '1').length;
  const suspendedCount = users.filter(u => u.status_id === '2').length;

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10 lg:px-12 ">

      {/* ════════ HEADER ════════ */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: EASE }}
        className="flex flex-wrap items-end gap-6 mb-8"
      >
        {/* Title */}
        <div className="flex-1 min-w-[220px]">
          <div className="inline-flex items-center gap-1.5 bg-gray-200 text-gray-600 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3">
            <Zap size={11} strokeWidth={2.5} />
            Personnel Management
          </div>
          <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight leading-none mb-2">
            User 
          </h1>
          <p className="text-sm text-gray-400">
            Manage access, roles, and system-level permissions.
          </p>
        </div>

        {/* Stat pills */}
        <div className="flex items-center gap-3 flex-shrink-0">
          {[
            { label: 'Total Users ',     val: users.length,   Icon: Users,       valCls: 'text-gray-900'   },
            { label: 'Active Users',    val: activeCount,    Icon: Activity,    valCls: 'text-gray-700' },
            // { label: 'Suspended', val: suspendedCount, Icon: ShieldAlert, valCls: 'text-gray-400'    },
          ].map(({ label, val, Icon, valCls }) => (
            <div key={label} className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-2.5 shadow-sm">
              <Icon size={15} className={valCls} />
              <span className={`text-lg font-extrabold tracking-tight ${valCls}`}>{val}</span>
              <span className="text-[11px] text-gray-400 font-medium">{label}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => {
            if (isEditing || isAdding) handleReset();
            else setIsAdding(true);
          }}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold flex-shrink-0 transition-all duration-200 cursor-pointer ${
            isAdding || isEditing
              ? 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-100'
              : 'bg-gray-900 text-white border border-transparent hover:bg-gray-700'
          }`}
        >
          {isAdding || isEditing ? <X size={16} strokeWidth={2.5} /> : <Plus size={16} strokeWidth={2.5} />}
          {isAdding || isEditing ? 'Cancel' : 'Add User'}
        </motion.button>
      </motion.div>

      {/* ════════ BODY ════════ */}
      <AnimatePresence mode="wait">

        {/* ── ADD/EDIT FORM ── */}
        {(isAdding || isEditing) && (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0,  scale: 1   }}
            exit={{   opacity: 0, y: 14, scale: 0.97  }}
            transition={{ duration: 0.35, ease: EASE }}
            className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden"
          >
            <div className="px-9 pt-8 mb-7">
              <h2 className="text-xl font-extrabold text-gray-900 tracking-tight">
                {isEditing ? 'Modify Personnel Details' : 'Enroll New Identity'}
              </h2>
              <div className="mt-2 w-9 h-[3px] bg-gray-900 rounded-full" />
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-8 px-9 pb-9">

              {FORM_FIELDS.map(({ label, key, type, placeholder, Icon }) => (
                <div key={key} className="flex flex-col gap-1.5 group">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{label}</label>
                  <div className="flex items-center gap-2.5 pb-2">
                    <Icon size={16} className="text-gray-300 group-focus-within:text-gray-700 transition-colors flex-shrink-0" />
                    <input
                      required
                      type={type}
                      placeholder={placeholder}
                      value={form[key]}
                      onChange={e => patchForm(key, e.target.value)}
                      className="flex-1 bg-transparent border-none outline-none text-[15px] font-semibold text-gray-900 placeholder:text-gray-300"
                    />
                  </div>
                  <div className="h-px bg-gray-200 group-focus-within:bg-gray-900 transition-colors rounded-full" />
                </div>
              ))}

              {/* Role */}
              <div className="flex flex-col gap-1.5 group">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Access Role</label>
                <div className="flex items-center gap-2.5 pb-2">
                  <ShieldCheck size={16} className="text-gray-300 group-focus-within:text-gray-700 transition-colors flex-shrink-0" />
                  <select
                    value={form.role_id}
                    onChange={e => patchForm('role_id', e.target.value)}
                    className="flex-1 bg-transparent border-none outline-none text-[15px] font-semibold text-gray-900 cursor-pointer appearance-none"
                    required
                  >
                    <option value="">Select Role Hierarchy...</option>
                    {roles.map(role => (
                      <option key={role.id} value={role.id}>{role.name}</option>
                    ))}
                  </select>
                </div>
                <div className="h-px bg-gray-200 group-focus-within:bg-gray-900 transition-colors rounded-full" />
              </div>

              {/* Role */}
              <div className="flex flex-col gap-1.5 group">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">isAdmin</label>
                <div className="flex items-center gap-2.5 pb-2">
                  <ShieldCheck size={16} className="text-gray-300 group-focus-within:text-gray-700 transition-colors flex-shrink-0" />
                  <select
                    value={form.is_admin}
                    onChange={e => patchForm('is_admin', e.target.value)}
                    className="flex-1 bg-transparent border-none outline-none text-[15px] font-semibold text-gray-900 cursor-pointer appearance-none"
                    required
                  >
                    <option value="">Select Role Hierarchy...</option>
                    <option value={1}>Yes</option>
                    <option value={0}>No</option>
                  </select>
                </div>
                <div className="h-px bg-gray-200 group-focus-within:bg-gray-900 transition-colors rounded-full" />
              </div>

              {/* Status */}
              <div className="flex flex-col gap-1.5 group">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status</label>
                <div className="flex items-center gap-2.5 pb-2">
                  <Activity size={16} className="text-gray-300 group-focus-within:text-gray-700 transition-colors flex-shrink-0" />
                  <select
                    value={form.status_id}
                    onChange={e => patchForm('status_id', e.target.value)}
                    className="flex-1 bg-transparent border-none outline-none text-[15px] font-semibold text-gray-900 cursor-pointer appearance-none"
                  >
                    <option value="1">Active</option>
                    <option value="2">Suspended</option>
                    <option value="5">Pending</option>
                  </select>
                </div>
                <div className="h-px bg-gray-200 group-focus-within:bg-gray-900 transition-colors rounded-full" />
              </div>

              {/* Submit */}
              <div className="md:col-span-2 lg:col-span-3 flex justify-end pt-2">
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="bg-gray-900 text-white px-8 py-3.5 rounded-xl text-[13px] font-bold tracking-tight hover:bg-gray-700 transition-colors disabled:opacity-50 cursor-pointer"
                >
                  {isLoading ? (isEditing ? 'Updating…' : 'Enrolling…') : (isEditing ? 'Save Changes' : 'Confirm Enrollment')}
                </motion.button>
              </div>
            </form>
          </motion.div>
        )}

        {/* ── TABLE ── */}
        {!(isAdding || isEditing) && (
          <motion.div
            key="table"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0  }}
            exit={{   opacity: 0, y: -14 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden"
          >
            {/* Toolbar */}
            <div className="flex items-center gap-3 px-7 py-5 border-b border-gray-100 flex-wrap">
              <div className="flex items-center gap-2.5 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 flex-1 max-w-sm">
                <Search size={15} className="text-gray-300 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Search users…"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none text-[13px] font-medium text-gray-800 placeholder:text-gray-300"
                />
              </div>
              <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-[12px] font-semibold text-gray-400 hover:border-gray-400 hover:text-gray-700 transition-all cursor-pointer">
                <Filter size={14} />
                Filter
              </button>
              <span className="ml-auto text-[11px] font-semibold text-gray-300 uppercase tracking-widest">
                {filtered.length} users
              </span>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    {['User', 'Contact', 'Role', 'Status', 'Joined', 'Actions'].map((h, i) => (
                      <th
                        key={h}
                        className={`px-7 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 ${i === 5 ? 'text-right' : ''}`}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-50">
                  {filtered.length > 0 ? filtered.map((u, i) => {
                    const role   = roles.find(r => r.id?.toString() === u.role_id?.toString()) || { name: 'Personnel' };
                    const status = STATUS_MAP[u.status_id] || STATUS_MAP['default'];

                    return (
                      <motion.tr
                        key={u.id || i}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.04, ease: EASE }}
                        className="group hover:bg-gray-50 transition-colors"
                      >
                        {/* User */}
                        <td className="px-7 py-5">
                          <div className="flex items-center gap-4">
                            <div className="relative flex-shrink-0">
                              <div className="w-11 h-11 rounded-[14px] bg-gray-900 flex items-center justify-center text-white text-base font-extrabold shadow-sm group-hover:scale-105 transition-transform duration-300">
                                {u.name?.charAt(0).toUpperCase()}
                              </div>
                              <span className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full ${status.dot} border-2 border-white`} />
                            </div>
                            <div>
                              <div className="text-sm font-bold text-gray-900 tracking-tight group-hover:text-gray-600 transition-colors">
                                {u.name || 'Incognito User'}
                              </div>
                              <div className="text-[11px] text-gray-400 mt-0.5 lowercase">{u.email || 'no-email@domain.com'}</div>
                            </div>
                          </div>
                        </td>

                        {/* Contact */}
                        <td className="px-7 py-5">
                          <div className="flex flex-col">
                             <span className="text-[12px] font-bold text-gray-700">{u.phone || 'N/A'}</span>
                             {u.whatsapp && <span className="text-[9px] text-green-500 font-bold uppercase tracking-widest mt-1">WhatsApp Verified</span>}
                          </div>
                        </td>

                        {/* Role */}
                        <td className="px-7 py-5">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold ${
                            u.is_admin ? 'bg-gray-900 text-white border border-gray-900' : 'bg-white text-gray-500 border border-gray-200'
                          }`}>
                            <ShieldCheck size={12} />
                            {u.permission_status || 'Unassigned'}
                          </span>
                        </td>

                        {/* Status */}
                        <td className="px-7 py-5">
                          <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-bold ${status.cls}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${status.dot} flex-shrink-0`} />
                            {u.status_name}
                          </span>
                        </td>

                        {/* Joined At */}
                        <td className="px-7 py-5">
                          <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-tight">
                            {u.created_at ? new Date(u.created_at).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' }) : 'Unknown'}
                          </div>
                        </td>

                        {/* Actions */}
                        <td className="px-7 py-5 text-right">
                          <div className="flex items-center gap-2 justify-end text-black translate-x-2 group-hover:translate-x-0 transition-all duration-200">
                            <ActionBtn icon={Edit2}  title="Edit"   onClick={() => handleEdit(u)} />
                            <ActionBtn icon={Trash2} title="Delete" onClick={() => handleDelete(u.id)} danger />
                          </div>
                        </td>
                      </motion.tr>
                    );
                  }) : (
                    <tr>
                      <td colSpan={4} className="py-24 text-center">
                        <div className="flex flex-col items-center gap-3">
                          <ShieldAlert size={48} className="text-gray-200" strokeWidth={1.2} />
                          <p className="text-sm font-bold text-gray-300">No users found</p>
                          <p className="text-xs text-gray-300">Add a new user to get started</p>
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

/* ─── Action Button ──────────────────────────────────────────────────── */
const ActionBtn = ({ icon: Icon, title, onClick, danger }) => (
  <motion.button
    title={title}
    onClick={onClick}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.92 }}
    className={`flex items-center justify-center w-9 h-9 rounded-xl border cursor-pointer transition-colors ${
      danger
        ? 'border-gray-200 bg-white text-gray-400 hover:bg-gray-900 hover:text-white hover:border-gray-900'
        : 'border-gray-200 bg-white text-gray-400 hover:bg-gray-100 hover:border-gray-300'
    }`}
  >
    <Icon size={14} />
  </motion.button>
);

export default ManageUsers;
