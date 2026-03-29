import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  User, Mail, Smartphone, Key, 
  Save, ShieldCheck, BadgeCheck, Zap,
  Camera, Lock, Eye, EyeOff, Globe,
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

  const inputCls = "w-full bg-gray-50 text-[#111827] text-lg font-inter font-medium px-5 py-4 pl-14 rounded-xl outline-none focus:ring-0 peer placeholder-gray-400 border border-gray-100 transition-all duration-300 focus:border-[#D4AF37] focus:bg-white focus:shadow-sm";
  const labelCls = "text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3 block";

  return (
    <div className="min-h-screen bg-[#f8f9fa] md:px-8 py-12 md:py-20 lg:px-20 font-inter text-[#111827] animate-in fade-in duration-1000">
      {/* ── HEADER: THE SILENT CONCIERGE ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EASE }}
        className="mb-20 space-y-5 border-b border-gray-200 pb-12"
      >
        <div className="inline-flex items-center gap-3 text-[#D4AF37] uppercase tracking-[0.4em] text-[10px] font-black">
          <ShieldCheck size={14} strokeWidth={2.5} />
          Security Protocol
        </div>
        <h1 className="text-5xl md:text-7xl font-manrope font-extrabold text-[#111827] tracking-tighter leading-none">
          Identity Vault
        </h1>
        <p className="text-gray-500 text-sm md:text-base font-medium max-w-xl leading-relaxed">
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
             <div className="w-56 h-56 rounded-[3rem] bg-gray-50 shadow-xl flex items-center justify-center border border-gray-100 overflow-hidden group-hover:scale-[1.02] transition-transform duration-700 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-white to-transparent opacity-80" />
                <span className="text-7xl font-manrope font-black text-[#111827] relative z-10 uppercase drop-shadow-sm">
                   {formData.name?.charAt(0) || 'A'}
                </span>
             </div>
             <motion.button 
               whileHover={{ scale: 1.1 }}
               whileTap={{ scale: 0.9 }}
               type="button"
               className="absolute -bottom-4 -right-4 w-16 h-16 bg-[#111827] text-white rounded-xl flex items-center justify-center shadow-lg border-2 border-white hover:bg-[#D4AF37] hover:text-[#111827] hover:border-[#D4AF37] transition-all"
             >
                <Camera size={24} strokeWidth={2.5} />
             </motion.button>
          </div>
          
          <div className="space-y-2 text-center lg:text-left">
            <h3 className="text-3xl font-manrope font-bold text-[#111827] tracking-tight uppercase">{formData.name || 'Admin Zeal'}</h3>
            <p className="text-[11px] font-black text-[#D4AF37] uppercase tracking-[0.3em]">Prime Controller</p>
          </div>

          <div className="p-8 bg-white rounded-2xl border border-gray-100 shadow-sm space-y-8">
             <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-500 shadow-sm">
                   <Zap size={20} className="text-[#D4AF37]" />
                </div>
                <div>
                   <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Last Sync</p>
                   <p className="text-sm font-bold text-[#111827] uppercase tracking-wider mt-1">Today, 18:42</p>
                </div>
             </div>
             <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-500 shadow-sm">
                   <ActivityIcon size={20} className="text-emerald-500" />
                </div>
                <div>
                   <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Global Access</p>
                   <p className="text-sm font-bold text-emerald-600 uppercase tracking-wider mt-1">Lvl 1 - Tier Alpha</p>
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
          <div className="bg-white rounded-2xl p-8 md:p-12 h-full flex flex-col justify-between gap-12 border border-gray-100 shadow-sm">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
               {[
                 { label: 'Full Legal Name', key: 'name', type: 'text', icon: User, placeholder: 'Abdullah Ahmed' },
                 { label: 'Network Email', key: 'email', type: 'email', icon: Mail, placeholder: 'abdullah@silentconcierge.com' },
                 { label: 'Direct Frequency', key: 'phone', type: 'text', icon: Smartphone, placeholder: '+966 50 882 1122' },
               ].map((field) => (
                 <div key={field.key} className="group flex flex-col relative">
                   <label className={labelCls}>{field.label}</label>
                   <div className="relative">
                     <input
                       type={field.type}
                       value={formData[field.key]}
                       onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                       placeholder={field.placeholder}
                       className={inputCls}
                     />
                     <field.icon size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 peer-focus:text-[#D4AF37] transition-colors duration-500" />
                   </div>
                 </div>
               ))}

               <div className="group flex flex-col relative">
                 <label className={labelCls}>Access Protocol</label>
                 <div className="relative">
                   <input
                     type={showPassword ? 'text' : 'password'}
                     value={formData.password}
                     onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                     placeholder="Update identity code"
                     className={inputCls}
                   />
                   <Key size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 peer-focus:text-[#D4AF37] transition-colors duration-500" />
                   <button
                     type="button"
                     onClick={() => setShowPassword(!showPassword)}
                     className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#D4AF37] transition-colors duration-500"
                   >
                     {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                   </button>
                 </div>
               </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-10 pt-10 border-t border-gray-100">
               <div className="flex items-center gap-4">
                  <BadgeCheck size={24} className="text-emerald-500 shrink-0" />
                  <p className="text-[10px] sm:text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em] leading-relaxed">
                     Synchronizing changes will physically update <br className="hidden sm:block"/> session tokens across all active network nodes.
                  </p>
               </div>
               <motion.button
                 whileHover={{ scale: 1.05 }}
                 whileTap={{ scale: 0.95 }}
                 disabled={isLoading}
                 className="px-12 py-6 rounded-full text-[11px] font-black uppercase tracking-[0.3em] shadow-lg transition-all flex items-center justify-center gap-3 shrink-0 bg-[#111827] text-white hover:bg-[#D4AF37] hover:text-[#111827] disabled:opacity-50 disabled:bg-gray-100 disabled:text-gray-400 disabled:shadow-none border border-transparent"
               >
                  <Save size={18} strokeWidth={2.5} />
                  {isLoading ? 'Encrypting...' : 'Secure Identity'}
               </motion.button>
            </div>
          </div>
        </motion.div>
      </form>

      {/* ── SECURITY FOOTER ── */}
      <div className="mt-32 pt-10 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-8 opacity-60 hover:opacity-100 transition-all duration-700">
        <div className="flex items-center gap-10 flex-wrap justify-center">
          <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm">
            <Lock size={14} className="text-[#D4AF37]" />
            <span className="text-[9px] font-black tracking-[0.3em] uppercase text-gray-500">AES-256 Encryption Secured</span>
          </div>
          <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm">
            <Globe size={14} className="text-[#D4AF37]" />
            <span className="text-[9px] font-black tracking-[0.3em] uppercase text-gray-500">Access Node: Al-Khobar</span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-gray-400">
           Identity Index: <span className="text-[#111827]">#PX-91283746</span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
