import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  User, Mail, Smartphone, Key, 
  Save, ShieldCheck, BadgeCheck, Zap,
  Camera, Lock, Eye, EyeOff, ChevronRight,
  Activity, Globe,
  ActivityIcon
} from 'lucide-react';
import useSettingsStore from '../../store/useSettingsStore';
import toast from 'react-hot-toast';

const EASE = [0.22, 1, 0.36, 1];

const Profile = () => {
  const { settings, fetchSettings, updateSettings, isLoading } = useSettingsStore();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  useEffect(() => {
    if (settings?.profile) {
      setFormData({
        name: settings.profile.name || '',
        email: settings.profile.email || '',
        phone: settings.profile.phone || '',
        password: '' 
      });
    }
  }, [settings]);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await updateSettings({ profile: formData });
      toast.success('Identity profile synchronized.');
    } catch (err) {
      toast.error('Sync failure: ' + err.message);
    }
  };

  const inputCls = "w-full bg-transparent border-none outline-none text-md font-manrope font-black text-slate-900 placeholder:text-slate-500 py-4";
  const labelCls = "text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-2 block ml-1";

  return (
    <div className="min-h-screen bg-[#f8f9fa] px-8 py-12 lg:px-20 font-inter ">
      {/* ── HEADER: THE SILENT CONCIERGE ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EASE }}
        className="mb-20 space-y-4"
      >
        <div className="inline-flex items-center gap-3 text-[var(--desert-gold)] uppercase tracking-[0.4em] text-[10px] font-black opacity-80">
          <ShieldCheck size={14} strokeWidth={3} />
          Security Protocol
        </div>
        <h1 className="text-7xl font-manrope font-extrabold text-slate-900 tracking-tighter leading-none">
          Identity 
        </h1>
        <p className="text-slate-500 text-sm font-medium max-w-xl leading-relaxed uppercase tracking-wider">
          Manage your administrative identifiers and secure access credentials within the Al Bayan matrix.
        </p>
      </motion.div>

      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* ── AVATAR MONOLITH ── */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: EASE }}
          className="lg:col-span-4 space-y-10"
        >
          <div className="relative group w-fit mx-auto lg:mx-0">
             <div className="w-56 h-56 rounded-[3rem] bg-white shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] flex items-center justify-center border border-slate-100 overflow-hidden group-hover:scale-[1.02] transition-transform duration-700">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-transparent opacity-50" />
                <span className="text-7xl font-manrope font-black text-slate-900 relative z-10 uppercase">{formData.name?.charAt(0) || 'A'}</span>
             </div>
             <motion.button 
               whileHover={{ scale: 1.1 }}
               whileTap={{ scale: 0.9 }}
               type="button"
               className="absolute -bottom-4 -right-4 w-16 h-16 bg-black text-white rounded-2xl flex items-center justify-center shadow-2xl border border-white/10 hover:bg-[var(--desert-gold)] hover:text-black transition-colors"
             >
                <Camera size={24} strokeWidth={2.5} />
             </motion.button>
          </div>
          
          <div className="space-y-2 text-center lg:text-left">
            <h3 className="text-2xl font-manrope font-black text-slate-900 tracking-tight uppercase">{formData.name || 'Admin Zeal'}</h3>
            <p className="text-[10px] font-black text-[var(--desert-gold)] uppercase tracking-[0.3em]">Prime Controller</p>
          </div>

          <div className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm space-y-6">
             <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                   <Zap size={18} />
                </div>
                <div>
                   <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Last Sync</p>
                   <p className="text-xs font-bold text-slate-900 uppercase tracking-wider">Today, 18:42</p>
                </div>
             </div>
             <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                   <ActivityIcon size={18} />
                </div>
                <div>
                   <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Global Access</p>
                   <p className="text-xs font-bold text-emerald-500 uppercase tracking-wider">Lvl 1 - Tier Alpha</p>
                </div>
             </div>
          </div>
        </motion.div>

        {/* ── FORM FIELDS ── */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.8, ease: EASE }}
          className="lg:col-span-8 space-y-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              { label: 'Full Legal Name', key: 'name', type: 'text', icon: User, placeholder: 'Abdullah Ahmed' },
              { label: 'Network Email', key: 'email', type: 'email', icon: Mail, placeholder: 'abdullah@silentconcierge.com' },
              { label: 'Direct Frequency', key: 'phone', type: 'text', icon: Smartphone, placeholder: '+966 50 882 1122' },
            ].map((field) => (
              <div key={field.key} className="group">
                <label className={labelCls}>{field.label}</label>
                <div className="flex items-center gap-4 border-b-2 border-slate-100 group-focus-within:border-black transition-all duration-500">
                  <input
                    type={field.type}
                    value={formData[field.key]}
                    onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                    placeholder={field.placeholder}
                    className={inputCls}
                  />
                  <field.icon size={20} className="text-slate-400 group-hover:text-black transition-colors duration-500" />
                </div>
              </div>
            ))}

            <div className="group">
              <label className={labelCls}>Access Protocol</label>
              <div className="flex items-center gap-4 border-b-2 border-slate-100 group-focus-within:border-black transition-all duration-500">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="Update identity code"
                  className={inputCls}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-slate-400 hover:text-black transition-colors duration-500"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-10 pt-10 border-t border-slate-100">
             <div className="flex items-center gap-4">
                <BadgeCheck size={20} className="text-emerald-500" />
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] leading-relaxed">
                   Synchronizing changes will update <br/> session tokens across all active nodes.
                </p>
             </div>
             <motion.button
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
               disabled={isLoading}
               className="px-12 py-6 bg-gradient-to-r from-[#111827] via-[#000000] to-[#1f2937] text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.4em] shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] hover:shadow-black/40 transition-all flex items-center justify-center gap-4 disabled:opacity-50"
             >
                <Save size={18} strokeWidth={3} />
                {isLoading ? 'Syncing...' : 'Save Changes'}
             </motion.button>
          </div>
        </motion.div>
      </form>

      {/* ── SECURITY FOOTER ── */}
      <div className="mt-32 pt-10 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-8 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-3">
            <Lock size={14} className="text-slate-400" />
            <span className="text-[9px] font-black tracking-[0.3em] uppercase text-slate-600">AES-256 Encryption Secured</span>
          </div>
          <div className="flex items-center gap-3">
            <Globe size={14} className="text-slate-400" />
            <span className="text-[9px] font-black tracking-[0.3em] uppercase text-slate-600">Access Node: Al-Khobar</span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-slate-400">
           Identity Index: <span className="text-slate-900">#PX-91283746</span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
