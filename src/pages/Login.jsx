import React from 'react';
import { Mail, Lock, LogIn } from 'lucide-react';

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
  return (
    <div className="min-h-screen bg-[var(--surface)] flex flex-col items-center justify-center p-6 font-inter">
      {/* Brand Header */}
      <div className="flex items-center gap-3 mb-12 animate-in fade-in slide-in-from-top-4 duration-700">
        <div className="bg-[var(--on-surface)] p-2 rounded-lg text-white">
          <MosqueIcon className="w-6 h-6" />
        </div>
        <span className="text-2xl font-manrope font-extrabold text-[var(--on-surface)] tracking-tighter uppercase">The Silent Concierge</span>
      </div>

      {/* Login Card */}
      <div className="bg-[var(--surface-container-lowest)] rounded-[3rem] shadow-2xl shadow-black/5 border border-[var(--outline-variant)] p-12 max-w-[480px] w-full mb-16 animate-in zoom-in-95 duration-700 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--surface)] rounded-bl-[5rem] translate-x-12 -translate-y-12"></div>

        {/* Card Icon */}
        <div className="flex justify-start mb-10 relative z-10">
          <div className="bg-[var(--surface)] p-6 rounded-3xl inline-block leading-none border border-[var(--outline-variant)]">
            <MosqueIcon className="w-12 h-12 text-[var(--on-surface)]" />
          </div>
        </div>

        <h1 className="text-5xl font-manrope font-extrabold text-[var(--on-surface)] mb-4 tracking-tighter leading-none relative z-10">Welcome <br />Back.</h1>
        <p className="text-[var(--on-surface-variant)] text-sm font-medium mb-12 leading-relaxed tracking-wide relative z-10">
          Secure authentication for the elevated pilgrimage management suite.
        </p>

        <form className="space-y-8 relative z-10">
          <div className="relative group">
            <Mail className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--on-surface-variant)] group-focus-within:text-[var(--on-surface)] transition-colors" />
            <input
              type="email"
              placeholder="Operational Email"
              className="w-full pl-9 pr-4 py-5 border-b border-[var(--outline-variant)] bg-transparent text-[var(--on-surface)] font-manrope font-bold text-sm outline-none placeholder-[var(--on-surface-variant)]/50 transition-all focus:border-[var(--on-surface)]"
            />
          </div>

          <div className="relative group">
            <Lock className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--on-surface-variant)] group-focus-within:text-[var(--on-surface)] transition-colors" />
            <input
              type="password"
              placeholder="Access Key"
              className="w-full pl-9 pr-4 py-5 border-b border-[var(--outline-variant)] bg-transparent text-[var(--on-surface)] font-manrope font-bold text-sm outline-none placeholder-[var(--on-surface-variant)]/50 transition-all focus:border-[var(--on-surface)]"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <label className="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" className="w-4 h-4 rounded-lg bg-[var(--surface)] border-[var(--outline-variant)] text-[var(--on-surface)] focus:ring-0 cursor-pointer" />
              <span className="text-[10px] uppercase font-extrabold text-[var(--on-surface-variant)] group-hover:text-[var(--on-surface)] transition-all tracking-[0.1em]">Persist Session</span>
            </label>
            <button type="button" className="text-[10px] uppercase font-extrabold text-[var(--on-surface-variant)] hover:text-[var(--on-surface)] transition-all tracking-[0.1em]">Recovery</button>
          </div>

          <button
            type="button"
            className="btn-midnight w-full py-5 rounded-2xl font-extrabold text-[10px] uppercase tracking-[0.3em] shadow-2xl shadow-black/20 transition-all duration-500 mt-6 flex items-center justify-center gap-3 group"
          >
            Initiate Protocol <LogIn size={18} strokeWidth={2.5} className="group-hover:translate-x-1 transition-transform" />
          </button>

          <div className="pt-10 text-center">
            <p className="text-[9px] font-extrabold text-[var(--on-surface-variant)] uppercase   opacity-50">
              Administrative Access Restricted
            </p>
          </div>
        </form>
      </div>

      {/* Page Footer */}
      <footer className="text-center space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
        <p className="text-xs font-extrabold text-[var(--on-surface-variant)] uppercase tracking-[0.4em] opacity-40">The Elevated Pilgrimage</p>
        <div className="flex items-center justify-center gap-8 text-[var(--on-surface-variant)]/50 text-[10px] font-extrabold uppercase  ">
          <a href="#" className="hover:text-[var(--on-surface)] transition-all">Privacy</a>
          <span className="w-1 h-1 rounded-full bg-[var(--outline-variant)]"></span>
          <a href="#" className="hover:text-[var(--on-surface)] transition-all">Terms</a>
          <span className="w-1 h-1 rounded-full bg-[var(--outline-variant)]"></span>
          <a href="#" className="hover:text-[var(--on-surface)] transition-all">Support</a>
        </div>
      </footer>
    </div>
  );
};

export default Login;
