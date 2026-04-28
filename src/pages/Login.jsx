import React, { useState } from 'react';
import { Mail, Lock, LogIn, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import useAuthStore from '../store/useAuthStore';

const MosqueIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 2L12 2" />
    <path d="M12 2C9.5 2 7 4.5 7 7V9H17V7C17 4.5 14.5 2 12 2Z" />
    <path d="M4 22V11C4 9.9 4.9 9 6 9H18C19.1 9 20 9.9 20 11V22" />
    <path d="M2 22H22" />
    <path d="M12 15V22" />
    <path d="M8 18H8.01" />
    <path d="M16 18H16.01" />
  </svg>
);

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login, isLoading, error } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Identification protocols required.');
      return;
    }

    const success = await login({ email, password });
    if (success) {
      toast.success('Authentication Protocol Initialized.');

      // Get the freshest state
      const user = useAuthStore.getState().user;

      // If user is a Customer (non-admin) and has a calculation_id, redirect there
      if (!user?.is_admin && user?.calculation_id) {
        navigate(`/customer-profile/${user.calculation_id}`);
      } else {
        navigate('/');
      }
    } else {
      toast.error(error || 'Authentication Failed.');
    }
  };

  return (
    <>
      <div className="min-h-screen bg-[var(--surface)] flex flex-col items-center justify-center p-6 font-inter">


        {/* Login Card */}
        <div className="bg-[var(--surface-container-lowest)]  rounded-xl shadow-2xl shadow-black/5 border border-[var(--outline-variant)] p-12 max-w-[480px] w-full mb-16 animate-in zoom-in-95 duration-700 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32  bg-[var(--surface)] rounded-bl-[5rem] translate-x-12 -translate-y-12"></div>

          {/* Card Icon */}
          <div className="flex justify-center mb-4 relative z-10  ">
            <div className="bg-[var(--surface)] p-6 rounded-xl  inline-block leading-none border border-[var(--outline-variant)]">
              <MosqueIcon className="w-12 h-12 text-[var(--on-surface)]" />
            </div>
          </div>

          <h1 className="text-4xl text-center font-manrope font-medium text-[var(--on-surface)] mb-4 tracking-tighter leading-none relative z-10">Welcome Back.</h1>
          <p className="text-[var(--on-surface-variant)] text-center text-sm font-medium mb-6 leading-relaxed tracking-wide relative z-10">
            Secure authentication for the elevated pilgrimage management suite.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            <div className="relative group">
              <Mail className="absolute left-2 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--on-surface)] group-focus-within:text-[var(--on-surface)] transition-colors" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Operational Email"
                className="w-full pl-9 py-5 border-b border-[var(--outline-variant)] bg-transparent text-[var(--on-surface)] font-manrope font-medium text-sm outline-none placeholder-[var(--on-surface-variant)]/50 transition-all focus:border-[var(--on-surface)]"
              />
            </div>

            <div className="relative group">
              <Lock className="absolute left-2 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--on-surface)] group-focus-within:text-[var(--on-surface)] transition-colors" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Access Key"
                className="w-full pl-9 pr-4 py-5 border-b border-[var(--outline-variant)] bg-transparent text-[var(--on-surface)] font-manrope font-medium text-sm outline-none placeholder-[var(--on-surface-variant)]/50 transition-all focus:border-[var(--on-surface)]"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 rounded-xl bg-[var(--surface)] border-[var(--outline-variant)] text-[var(--on-surface)] focus:ring-0 cursor-pointer" />
                <span className="text-[10px] uppercase font-medium text-[var(--on-surface-variant)] group-hover:text-[var(--on-surface)] transition-all tracking-[0.1em]">Persist Session</span>
              </label>
              <button type="button" className="text-[10px] uppercase font-medium text-[var(--on-surface-variant)] hover:text-[var(--on-surface)] transition-all tracking-[0.1em]">Recovery</button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full py-5 rounded-xl font-medium text-[10px] uppercase tracking-[0.3em] shadow-2xl shadow-black/20 transition-all duration-500 mt-6 flex items-center justify-center gap-3 group"
            >
              {isLoading ? 'Processing Protocol...' : 'Initiate Protocol'}
              {!isLoading && <LogIn size={18} strokeWidth={2.5} className="group-hover:translate-x-1 transition-transform" />}
            </button>

            <div className="pt-4 text-center">
              <p className="text-[9px] font-medium tracking-wider text-[var(--on-surface-variant)] uppercase   opacity-50">
                Administrative Access Restricted
              </p>
            </div>
          </form>
        </div>


      </div></>
  );
};

export default Login;

