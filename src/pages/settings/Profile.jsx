import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  User, Mail, Smartphone, Key,
  Save, ShieldCheck, BadgeCheck, Zap,
  Lock, Eye, EyeOff, Globe, ActivityIcon
} from 'lucide-react';
import useSettingsStore from '../../store/useSettingsStore';
import toast from 'react-hot-toast';

const EASE = [0.22, 1, 0.36, 1];

const Profile = () => {
  const { profile, fetchSettings, updateProfile, isLoading } = useSettingsStore();
  const [formData, setFormData]     = useState({ name: '', email: '', phone: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => { fetchSettings(); }, [fetchSettings]);

  useEffect(() => {
    if (profile) {
      setFormData({
        name:     profile.name  || '',
        email:    profile.email || '',
        phone:    profile.phone || '',
        password: '',
      });
    }
  }, [profile]);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(formData);
      toast.success('Identity profile synchronized.');
    } catch (err) {
      toast.error('Sync failure: ' + err.message);
    }
  };

  const patch = (key, val) => setFormData(prev => ({ ...prev, [key]: val }));

  return (
  <>
    <div className="min-h-screen bg-[#f5f4f0] px-8 py-14 lg:px-20" style={{ fontFamily: "'DM Mono', monospace" }}>

      {/* ── HEADER ── */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-14"
      >
        <div className="space-y-3">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm text-[9px] font-bold uppercase tracking-[0.18em] text-white"
            style={{ background: '#1a1916' }}
          >
            <ShieldCheck size={10} strokeWidth={3} />
            Security Protocol
          </div>
          <h1
            className="text-5xl lg:text-6xl font-extrabold text-[#1a1916] leading-none"
            style={{ fontFamily: "'Sora', sans-serif", letterSpacing: '-0.03em' }}
          >
            Identity Vault
          </h1>
          <p className="text-[12px] text-[#78776f] font-normal max-w-xs leading-relaxed" style={{ fontFamily: "'Sora', sans-serif" }}>
            Manage your administrative identifiers and secure access credentials.
          </p>
        </div>

        <motion.button
          type="submit"
          form="profile-form"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          disabled={isLoading}
          className="h-12 px-8 rounded-lg text-[10px] font-bold uppercase tracking-[0.15em] flex items-center gap-2.5 transition-all cursor-pointer shrink-0 disabled:opacity-50"
          style={{ background: '#1a1916', color: '#ffffff', border: '1.5px solid #1a1916' }}
          onMouseEnter={e => { if (!isLoading) e.currentTarget.style.opacity = '0.85'; }}
          onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
        >
          <Save size={14} strokeWidth={2.5} />
          {isLoading ? 'Saving…' : 'Secure Identity'}
        </motion.button>
      </motion.div>

      <form id="profile-form" onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-12 gap-4">

        {/* ── LEFT — Avatar + Meta ── */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15, duration: 0.5, ease: EASE }}
          className="lg:col-span-4 flex flex-col gap-3"
        >
          {/* Avatar card */}
          <div
            className="bg-white rounded-2xl p-8 flex flex-col items-center lg:items-start gap-6"
            style={{ border: '1.5px solid #e2e0d8' }}
          >
            <div className="relative">
              <div
                className="w-24 h-24 rounded-2xl flex items-center justify-center text-white text-4xl font-bold select-none"
                style={{ background: '#1a1916', fontFamily: "'Sora', sans-serif" }}
              >
                {formData.name?.charAt(0).toUpperCase() || 'A'}
              </div>
            </div>
            <div className="text-center lg:text-left">
              <h3
                className="text-[16px] font-bold text-[#1a1916] leading-tight"
                style={{ fontFamily: "'Sora', sans-serif" }}
              >
                {formData.name || 'Admin'}
              </h3>
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#78776f] mt-1">
                Prime Controller
              </p>
            </div>
          </div>

          {/* Meta info card */}
          <div
            className="bg-white rounded-2xl overflow-hidden"
            style={{ border: '1.5px solid #e2e0d8' }}
          >
            {[
              { Icon: Zap,          label: 'Last Sync',     value: 'Today',                     valueColor: '#1a1916' },
              { Icon: ActivityIcon, label: 'Access Role',    value: profile?.role || 'Admin',    valueColor: '#1a7a4a' },
            ].map(({ Icon, label, value, valueColor }, i) => (
              <div
                key={label}
                className="flex items-center gap-4 px-6 py-5 transition-colors"
                style={{ borderBottom: i === 0 ? '1.5px solid #e2e0d8' : 'none', background: '#ffffff' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#f5f4f0'; }}
                onMouseLeave={e => { e.currentTarget.style.background = '#ffffff'; }}
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: '#f5f4f0', border: '1.5px solid #e2e0d8' }}
                >
                  <Icon size={14} style={{ color: '#78776f' }} />
                </div>
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#b0aea5]">{label}</p>
                  <p className="text-[11px] font-bold mt-0.5" style={{ color: valueColor }}>{value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Security footer pills */}
          <div className="flex flex-col gap-2">
            {[
              { Icon: Lock,  text: 'AES-256 Encryption Secured' },
              { Icon: Globe, text: 'Access Node: Al-Khobar' },
            ].map(({ Icon, text }) => (
              <div
                key={text}
                className="flex items-center gap-3 px-4 py-3 rounded-lg"
                style={{ background: '#ffffff', border: '1.5px solid #e2e0d8' }}
              >
                <Icon size={12} style={{ color: '#78776f', flexShrink: 0 }} />
                <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#b0aea5]">{text}</span>
              </div>
            ))}
            <div
              className="flex items-center justify-between px-4 py-3 rounded-lg"
              style={{ background: '#ffffff', border: '1.5px solid #e2e0d8' }}
            >
              <span className="text-[9px] font-bold uppercase tracking-[0.12em] text-[#b0aea5]">Identity Index</span>
              <span className="text-[9px] font-bold text-[#1a1916]">#PX-91283746</span>
            </div>
          </div>
        </motion.div>

        {/* ── RIGHT — Form ── */}
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.25, duration: 0.5, ease: EASE }}
          className="lg:col-span-8"
        >
          <div
            className="bg-white rounded-2xl overflow-hidden"
            style={{ border: '1.5px solid #e2e0d8' }}
          >
            {/* Form header */}
            <div className="px-8 py-6" style={{ borderBottom: '1.5px solid #e2e0d8' }}>
              <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#78776f] mb-1">Credentials</p>
              <h2
                className="text-[18px] font-extrabold text-[#1a1916]"
                style={{ fontFamily: "'Sora', sans-serif", letterSpacing: '-0.02em' }}
              >
                Personal Information
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-8 py-8">
              {/* Text fields */}
              {[
                { label: 'Full Legal Name',    key: 'name',  type: 'text',  placeholder: 'Abdullah Ahmed',             Icon: User },
                { label: 'Network Email',      key: 'email', type: 'email', placeholder: 'abdullah@albayan.com',        Icon: Mail },
                { label: 'Direct Frequency',   key: 'phone', type: 'text',  placeholder: '+966 50 882 1122',            Icon: Smartphone },
              ].map(({ label, key, type, placeholder, Icon }) => (
                <div key={key} className="flex flex-col gap-2">
                  <label className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#78776f]">{label}</label>
                  <div
                    className="flex items-center gap-3 rounded-lg px-4 py-3 transition-all"
                    style={{ background: '#f5f4f0', border: '1.5px solid #e2e0d8' }}
                    onFocusCapture={e => { e.currentTarget.style.borderColor = '#1a1916'; e.currentTarget.style.background = '#ffffff'; }}
                    onBlurCapture={e =>  { e.currentTarget.style.borderColor = '#e2e0d8'; e.currentTarget.style.background = '#f5f4f0'; }}
                  >
                    <Icon size={14} style={{ color: '#b0aea5', flexShrink: 0 }} />
                    <input
                      type={type}
                      value={formData[key]}
                      onChange={e => patch(key, e.target.value)}
                      placeholder={placeholder}
                      className="flex-1 bg-transparent border-none outline-none text-[12px] font-medium text-[#1a1916] placeholder:text-[#c5c2b8]"
                    />
                  </div>
                </div>
              ))}

              {/* Password field */}
              <div className="flex flex-col gap-2">
                <label className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#78776f]">Access Protocol</label>
                <div
                  className="flex items-center gap-3 rounded-lg px-4 py-3 transition-all"
                  style={{ background: '#f5f4f0', border: '1.5px solid #e2e0d8' }}
                  onFocusCapture={e => { e.currentTarget.style.borderColor = '#1a1916'; e.currentTarget.style.background = '#ffffff'; }}
                  onBlurCapture={e =>  { e.currentTarget.style.borderColor = '#e2e0d8'; e.currentTarget.style.background = '#f5f4f0'; }}
                >
                  <Key size={14} style={{ color: '#b0aea5', flexShrink: 0 }} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={e => patch('password', e.target.value)}
                    placeholder="Update identity code"
                    className="flex-1 bg-transparent border-none outline-none text-[12px] font-medium text-[#1a1916] placeholder:text-[#c5c2b8]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(v => !v)}
                    className="cursor-pointer transition-colors flex-shrink-0"
                    style={{ color: '#b0aea5' }}
                    onMouseEnter={e => { e.currentTarget.style.color = '#1a1916'; }}
                    onMouseLeave={e => { e.currentTarget.style.color = '#b0aea5'; }}
                  >
                    {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>
            </div>

            {/* Footer notice */}
            <div
              className="flex flex-col md:flex-row md:items-center gap-4 px-8 py-5"
              style={{ borderTop: '1.5px solid #e2e0d8', background: '#f5f4f0' }}
            >
              <BadgeCheck size={16} style={{ color: '#1a7a4a', flexShrink: 0 }} />
              <p className="text-[10px] font-medium text-[#78776f] leading-relaxed flex-1">
                Synchronizing changes will update session tokens across all active network nodes.
              </p>
            </div>
          </div>
        </motion.div>
      </form>
    </div>
  
  </>
  );
};

export default Profile;