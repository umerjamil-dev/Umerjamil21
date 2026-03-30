import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
    ArrowLeft, Edit3, Trash2, Package, 
    Hotel, Calendar, DollarSign, ShieldCheck,
    MapPin, Star, Info, ChevronRight,
    TrendingUp, Workflow, Award, Clock
} from 'lucide-react';
import usePackageStore from '../store/usePackageStore';
import toast from 'react-hot-toast';

const PackageDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { getPackage, deletePackage, isLoading } = usePackageStore();
    const [pkg, setPkg] = useState(null);

    useEffect(() => {
        const fetchPkg = async () => {
            try {
                const data = await getPackage(id);
                setPkg(data);
            } catch (err) {
                toast.error("Failed to retrieve package dossier");
            }
        };
        fetchPkg();
    }, [id, getPackage]);

    const handleDelete = async () => {
        if (window.confirm("Are you certain you wish to decommission this package? This action is irreversible.")) {
            try {
                await deletePackage(id);
                toast.success("Package decommissioned successfully");
                navigate('/packages');
            } catch (err) {
                toast.error("Decommissioning failed");
            }
        }
    };

    if (isLoading || !pkg) {
        return (
            <div className="h-[60vh] flex flex-col items-center justify-center space-y-6">
                <div className="w-16 h-16 border-4 border-[var(--outline-variant)] border-t-[var(--primary)] rounded-full animate-spin"></div>
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--on-surface-variant)] animate-pulse">Decrypting Package Manifest...</p>
            </div>
        );
    }

    return (
        <div className="font-inter space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000 pb-24">
            {/* Header Navigation */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div className="space-y-2">
                    <Link to="/packages" className="flex items-center gap-2 text-[var(--on-surface-variant)] hover:text-[var(--primary)] transition-colors group mb-4">
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Back to Inventory</span>
                    </Link>
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-[var(--surface-container-high)] flex items-center justify-center border border-[var(--outline-variant)] shadow-inner">
                            <Package size={28} className="text-[var(--primary)]" strokeWidth={1.5} />
                        </div>
                        <div>
                            <h1 className="text-4xl font-manrope font-extrabold text-[var(--on-surface)] tracking-tighter">
                                {pkg.title}
                            </h1>
                            <div className="flex items-center gap-3 mt-3">
                                <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                                    pkg.active_status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-500'
                                }`}>
                                    {pkg.active_status === 'Active' ? 'Active' : 'Inactive'}
                                </span>
                                <span className="text-[10px] font-bold text-[var(--on-surface-variant)] opacity-40 uppercase tracking-widest">
                                    ID: {pkg.id}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <button 
                        onClick={handleDelete}
                        className="p-4 bg-[var(--surface-container-lowest)] border border-red-100/50 rounded-xl text-red-500 hover:bg-red-50 transition-all shadow-sm group"
                    >
                        <Trash2 size={20} strokeWidth={2} />
                    </button>
                    <Link 
                        to={`/packages/${id}/edit`}
                        className="btn-primary px-8 py-4 rounded-xl text-white text-[10px] font-black uppercase tracking-[0.3em] shadow-2xl flex items-center gap-3 active:scale-95 transition-all"
                    >
                        <Edit3 size={18} strokeWidth={2.5} />
                        Refine Configuration
                    </Link>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Core Specifications */}
                <div className="lg:col-span-8 space-y-10">
                    {/* Stay Distribution */}
                    <div className="bg-[var(--surface-container-lowest)] rounded-3xl p-10 border border-[var(--outline-variant)] shadow-sm relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--surface)] rounded-bl-[8rem] translate-x-32 -translate-y-32 transition-transform group-hover:translate-x-16 group-hover:-translate-y-16"></div>
                        
                        <h3 className="text-[10px] font-black text-[var(--on-surface-variant)] uppercase tracking-[0.4em] mb-12 flex items-center gap-3 relative z-10">
                            <Workflow size={18} strokeWidth={2.5} className="text-[var(--on-surface)]" />
                            Lodging Protocol
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10">
                            <div className="p-8 bg-[var(--surface)] rounded-2xl border border-[var(--outline-variant)] hover:bg-white transition-all group/card">
                                <div className="flex items-center justify-between mb-8">
                                    <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center border border-[var(--outline-variant)] shadow-sm">
                                        <Hotel size={24} className="text-[var(--primary)]" strokeWidth={1.5} />
                                    </div>
                                    <div className="text-right">
                                        <span className="text-4xl font-manrope font-black text-[var(--on-surface)]">{pkg.nights_makkah}</span>
                                        <p className="text-[8px] font-black text-[var(--on-surface-variant)] uppercase tracking-widest">Nights</p>
                                    </div>
                                </div>
                                <p className="text-[9px] font-black text-[var(--on-surface-variant)] uppercase tracking-[0.3em] mb-2 opacity-50">Makkah Residency</p>
                                <h4 className="text-lg font-manrope font-extrabold text-[var(--on-surface)] group-hover/card:text-[var(--primary)] transition-colors lowercase first-letter:uppercase">
                                    {pkg.makkah_hotel || 'Standard Makkah Hospitality'}
                                </h4>
                            </div>

                            <div className="p-8 bg-[var(--surface)] rounded-2xl border border-[var(--outline-variant)] hover:bg-white transition-all group/card">
                                <div className="flex items-center justify-between mb-8">
                                    <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center border border-[var(--outline-variant)] shadow-sm">
                                        <Hotel size={24} className="text-[var(--primary)]" strokeWidth={1.5} />
                                    </div>
                                    <div className="text-right">
                                        <span className="text-4xl font-manrope font-black text-[var(--on-surface)]">{pkg.nights_madinah}</span>
                                        <p className="text-[8px] font-black text-[var(--on-surface-variant)] uppercase tracking-widest">Nights</p>
                                    </div>
                                </div>
                                <p className="text-[9px] font-black text-[var(--on-surface-variant)] uppercase tracking-[0.3em] mb-2 opacity-50">Madinah Residency</p>
                                <h4 className="text-lg font-manrope font-extrabold text-[var(--on-surface)] group-hover/card:text-[var(--primary)] transition-colors lowercase first-letter:uppercase">
                                    {pkg.madinah_hotel || 'Standard Madinah Hospitality'}
                                </h4>
                            </div>
                        </div>
                    </div>

                    {/* Commercial Valuation */}
                    <div className="bg-[var(--surface-container-lowest)] rounded-3xl p-10 border border-[var(--outline-variant)] shadow-sm">
                        <h3 className="text-[10px] font-black text-[var(--on-surface-variant)] uppercase tracking-[0.4em] mb-12 flex items-center gap-3">
                            <DollarSign size={18} strokeWidth={2.5} className="text-[var(--on-surface)]" />
                            Financial Appraisal
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="p-8 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col justify-between">
                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-4">Base Valuation (USD)</p>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-2xl font-manrope font-black text-slate-900">${Number(pkg.base_price)?.toLocaleString()}</span>
                                    <span className="text-[10px] font-bold text-slate-400 uppercase">Per Unit</span>
                                </div>
                            </div>
                            
                            <div className="md:col-span-2 p-8 bg-[var(--surface)] rounded-xl border border-[var(--outline-variant)] flex items-center gap-8">
                                <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center border border-emerald-100">
                                    <TrendingUp size={28} className="text-emerald-500" strokeWidth={1.5} />
                                </div>
                                <div>
                                    <h4 className="text-sm font-manrope font-extrabold text-[var(--on-surface)] mb-2">Market Positioning</h4>
                                    <p className="text-[11px] text-[var(--on-surface-variant)] font-medium leading-relaxed max-w-sm">
                                        This package is strategically priced for the <span className="font-bold text-[var(--on-surface)]">{pkg.category_name || '—'}</span> segment, offering optimized margins with verified hospitality nodes.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Authority Sidebar */}
                <div className="lg:col-span-4 space-y-8">
                    <div className="bg-[#0f172a] rounded-3xl p-10 text-white shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-[4rem] group-hover:scale-110 transition-transform duration-700"></div>
                        
                        <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mb-12 flex items-center gap-3">
                            <Award size={18} strokeWidth={2.5} className="text-[var(--desert-gold)]" />
                            Elite Verification
                        </h4>

                        <div className="space-y-8">
                            {[
                                { icon: Clock, label: 'Duration Protocol', value: `${(pkg.nights_makkah || 0) + (pkg.nights_madinah || 0)} Units (Nights)` },
                                { icon: MapPin, label: 'Geo Coverage', value: 'Double Sanctuary' },
                                { icon: ShieldCheck, label: 'Auth Status', value: pkg.active_status === 1 ? 'Active' : 'Inactive' }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/5 shrink-0">
                                        <item.icon size={18} className={item.label === 'Auth Status' ? (pkg.active_status === 'Active' ? 'text-emerald-400' : 'text-red-400') : 'text-white/40'} />
                                    </div>
                                    <div>
                                        <p className="text-[8px] font-black text-white/20 uppercase tracking-[0.2em] mb-1">{item.label}</p>
                                        <p className={`text-[12px] font-manrope font-bold ${item.label === 'Auth Status' ? (pkg.active_status === 'Active' ? 'text-emerald-400' : 'text-red-400') : 'text-white/80'}`}>{pkg.active_status}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-12 pt-10 border-t border-white/5">
                            <p className="text-[10px] font-medium text-slate-400 italic leading-relaxed">
                                "This configuration is synthesized and authorized for the upcoming pilgrimage cycle."
                            </p>
                        </div>
                    </div>

                    <div className="bg-[var(--surface-container-lowest)] rounded-3xl p-10 border border-[var(--outline-variant)] shadow-sm group">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 rounded-2xl bg-[var(--surface)] flex items-center justify-center border border-[var(--outline-variant)] group-hover:border-[var(--on-surface)] transition-all">
                                <Package size={22} className="text-[var(--on-surface-variant)]" />
                            </div>
                            <div>
                                <p className="text-[9px] font-black text-[var(--on-surface-variant)] uppercase tracking-[0.3em]">Module</p>
                                <p className="text-sm font-manrope font-black text-[var(--on-surface)] tracking-tight uppercase tracking-widest">Inventory Arch</p>
                            </div>
                        </div>
                        <button 
                            className="w-full py-4 bg-[var(--surface)] text-[var(--on-surface-variant)] rounded-xl border border-[var(--outline-variant)] text-[9px] font-black uppercase tracking-[0.2em] hover:bg-white hover:text-[var(--on-surface)] hover:border-[var(--on-surface)] transition-all flex items-center justify-center gap-3"
                        >
                            <Info size={14} />
                            Audit History
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PackageDetail;
