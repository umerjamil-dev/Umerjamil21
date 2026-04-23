import React, { useState, useEffect, useCallback } from 'react';
import {
    ArrowLeft, User, Phone, Mail,
    MapPin, Fingerprint, ShieldCheck,
    FileText, Save, Globe, CreditCard,
    Calendar, Plane, Hotel, Star,
    MessageSquare, Trash2, Edit3,
    ChevronRight, History, Activity,
    Plus
} from 'lucide-react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import useCustomerStore from '../store/useCustomerStore';
import toast from 'react-hot-toast';

const CustomerDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { getCustomer, deleteCustomer, isLoading } = useCustomerStore();
    const [customer, setCustomer] = useState(null);
    const [activeTab, setActiveTab] = useState('profile');

    const fetchCustomer = useCallback(async () => {
        try {
            const data = await getCustomer(id);
            setCustomer(data);
        } catch (err) {
            toast.error('Failed to retrieve pilgrim records.');
        }
    }, [id, getCustomer]);

    useEffect(() => {
        fetchCustomer();
    }, [fetchCustomer]);

    const handleDelete = async () => {
        if (window.confirm('Are you certain you wish to purge this pilgrim from the active registry?')) {
            try {
                await deleteCustomer(id);
                toast.success('Pilgrim profile successfully archived.');
                navigate('/customers');
            } catch (err) {
                toast.error('De-registration failure.');
            }
        }
    };

    if (isLoading && !customer) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-[var(--outline-variant)] border-t-[var(--on-surface)] rounded-full animate-spin"></div>
                    <p className="text-[10px] font-extrabold uppercase tracking-widest text-[var(--on-surface-variant)]">Querying Sacred Registry...</p>
                </div>
            </div>
        );
    }

    if (!customer) return null;

    const fullName = `${customer.firstName || ''} ${customer.lastName || ''}`.trim() || customer.name || 'Unnamed Pilgrim';
    const imgBaseUrl = 'http://192.168.5.111:8000/'

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 font-inter pb-20">
            {/* Editorial Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                <div className="flex items-center gap-6">
                    <Link to="/customers" className="p-4 bg-[var(--surface-container-lowest)] rounded-2xl border border-[var(--outline-variant)] hover:shadow-xl transition-all group">
                        <ArrowLeft size={20} className="text-[var(--on-surface-variant)] group-hover:text-[var(--on-surface)]" />
                    </Link>
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <span className="px-3 py-1 text-black bg-[var(--grad-black)]  text-[10px] font-black uppercase tracking-widest rounded-lg">Verified Pilgrim</span>
                            <span className="text-[10px] font-bold text-[var(--on-surface-variant)] opacity-40">/</span>
                            <span className="text-[10px] font-bold text-[var(--on-surface-variant)]">{customer.id}</span>
                        </div>
                        <h1 className="text-4xl font-manrope font-black text-[var(--on-surface)] tracking-tighter">{fullName}</h1>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={() => navigate(`/customers/${id}/edit`)}
                        className="flex items-center gap-2 px-6 py-4 bg-[var(--surface-container-low)] border border-[var(--outline-variant)] rounded-xl text-[10px] font-extrabold uppercase tracking-widest hover:bg-[var(--surface-container-high)] transition-all"
                    >
                        <Edit3 size={14} />
                        Refine Profile
                    </button>
                    <button
                        onClick={handleDelete}
                        className="flex items-center gap-2 px-6 py-4 bg-red-50 border border-red-100 rounded-xl text-[10px] font-extrabold uppercase tracking-widest text-red-600 hover:bg-red-100 transition-all"
                    >
                        <Trash2 size={14} />
                        Purge Record
                    </button>
                </div>
            </div>

            {/* Main Bento Core */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* Identity & Status Sidebar */}
                <div className="lg:col-span-4 space-y-8">

                    <div className="bg-[var(--surface-container-lowest)] rounded-3xl p-10 border border-[var(--outline-variant)] shadow-sm relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--surface)] rounded-bl-[5rem] translate-x-8 -translate-y-8 group-hover:translate-x-4 group-hover:-translate-y-4 transition-transform opacity-30"></div>

                        <div className="relative z-10 flex flex-col items-center mb-10">
                            <div className="w-32 h-32 bg-[var(--surface)] rounded-[2.5rem] border-2 border-[var(--outline-variant)] p-1 mb-6 transition-all">
                                <div className="w-full h-full rounded-[2.2rem] bg-[var(--surface-container-high)] flex items-center justify-center text-[var(--on-surface-variant)] overflow-hidden">
                                    {customer.customer_image ? (
                                        <img src={imgBaseUrl + customer.customer_image} alt="customer photo " className="w-full h-full object-cover" />
                                    ) : (
                                        <User size={48} strokeWidth={1} />
                                    )}
                                </div>
                            </div>
                            <h3 className="text-xl font-manrope font-extrabold text-[var(--on-surface)] text-center">{fullName}</h3>
                            <p className="text-[10px] font-bold text-[var(--on-surface-variant)] uppercase tracking-widest mt-2">{customer.city}, {customer.nationality || 'Pakistani'}</p>
                        </div>

                        <div className="space-y-4 relative z-10">
                            {[
                                { label: 'Primary Contact', value: customer.phone, icon: Phone },
                                { label: 'Passport Index', value: customer.passport_no, icon: ShieldCheck },
                                { label: 'Citizen Registry', value: customer.cnic, icon: Fingerprint },
                                { label: 'Email Archive', value: customer.email, icon: Mail },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center justify-between p-4 bg-[var(--surface)] rounded-2xl border border-[var(--outline-variant)] hover:bg-white transition-all group/item">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-[var(--surface-container-low)] rounded-lg text-[var(--on-surface-variant)] group-hover/item:text-[var(--on-surface)] transition-colors">
                                            <item.icon size={14} />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[8px] font-bold text-[var(--on-surface-variant)] uppercase tracking-widest">{item.label}</span>
                                            <span className="text-[11px] font-extrabold text-[var(--on-surface)]">{item.value || 'Not Disclosed'}</span>
                                        </div>
                                    </div>
                                    <ChevronRight size={12} className="text-[var(--on-surface-variant)] opacity-0 group-hover/item:opacity-100 -translate-x-2 group-hover/item:translate-x-0 transition-all" />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-[#111827] rounded-3xl p-10 text-black relative overflow-hidden group">
                        <div className="absolute bottom-0 right-0 w-40 h-40 rounded-tl-[6rem] group-hover:scale-110 transition-transform"></div>
                        <ShieldCheck className="text-[var(--sacred-emerald)] mb-8" size={32} strokeWidth={2.5} />
                        <h4 className="text-xs font-extrabold uppercase text-white tracking-widest mb-4">Compliance Status</h4>
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest">Visa Eligibility</span>
                                <span className="px-2 py-1 bg-[var(--sacred-emerald)]/20 text-[var(--sacred-emerald)] text-[8px] font-black uppercase rounded">Authorized</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest">Passport Validity</span>
                                <span className="text-[10px] text-white font-extrabold">Active</span>
                            </div>
                            <div className="pt-4 border-t border-white/10">
                                <p className="text-[9px] text-white/40 leading-relaxed italic">External biometric verification last synced 12 minutes ago.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Area */}
                <div className="lg:col-span-8 space-y-8">

                    {/* Navigation Tabs */}
                    <div className="flex items-center gap-2 p-2 bg-[var(--surface-container-low)] rounded-2xl border border-[var(--outline-variant)] w-fit">
                        {[
                            { id: 'profile', label: 'Pilgrim Dossier', icon: User },
                            { id: 'travel', label: 'Logistics Matrix', icon: Plane },
                            { id: 'documents', label: 'Document Archive', icon: FileText },
                            { id: 'timeline', label: 'Interaction Log', icon: History },
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-3 px-6 py-3 rounded-xl text-[10px] font-extrabold uppercase tracking-widest transition-all ${activeTab === tab.id
                                    ? 'bg-white text-[var(--on-surface)] shadow-lg'
                                    : 'text-[var(--on-surface-variant)] hover:bg-white/50'
                                    }`}
                            >
                                <tab.icon size={14} />
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Tab Content */}
                    <div className="bg-[var(--surface-container-lowest)] rounded-3xl p-10 lg:p-12 border border-[var(--outline-variant)] shadow-sm min-h-[500px]">
                        {activeTab === 'profile' && (
                            <div className="space-y-12 animate-in fade-in duration-500">
                                <section>
                                    <h4 className="text-[10px] font-extrabold text-[var(--on-surface-variant)] uppercase tracking-[0.3em] mb-10 flex items-center gap-3">
                                        <Fingerprint size={16} /> Identity Registry
                                    </h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                        {[
                                            { label: 'Legal Surname', value: customer.lastName },
                                            { label: 'Given Nomenclature', value: customer.firstName },
                                            { label: 'Sovereign Nationality', value: customer.nationality || 'Pakistani' },
                                            { label: 'Biometric Reference', value: customer.passportNo },
                                        ].map((item, i) => (
                                            <div key={i} className="group">
                                                <p className="text-[9px] font-bold text-[var(--on-surface-variant)] tracking-widest uppercase mb-2 opacity-50 group-hover:opacity-100 transition-opacity">{item.label}</p>
                                                <p className="text-lg font-manrope font-extrabold text-[var(--on-surface)] border-b-2 border-transparent group-hover:border-[var(--outline-variant)] transition-all pb-2 truncate">{item.value || 'Unregistered'}</p>
                                            </div>
                                        ))}
                                    </div>
                                </section>

                                <section>
                                    <h4 className="text-[10px] font-extrabold text-[var(--on-surface-variant)] uppercase tracking-[0.3em] mb-10 flex items-center gap-3">
                                        <MapPin size={16} /> Geographical Residency
                                    </h4>
                                    <div className="p-8 bg-[var(--surface)] rounded-2xl border border-[var(--outline-variant)] group hover:bg-white transition-all">
                                        <p className="text-[9px] font-bold text-[var(--on-surface-variant)] tracking-widest uppercase mb-3 opacity-50">Permanent Address File</p>
                                        <p className="text-lg font-manrope font-extrabold text-[var(--on-surface)] leading-relaxed">
                                            {customer.address || 'No detailed address in registry.'}
                                        </p>
                                        <p className="mt-4 text-xs font-bold text-[var(--on-surface-variant)] flex items-center gap-2">
                                            <Globe size={14} /> {customer.city}, {customer.nationality || 'Pakistan'}
                                        </p>
                                    </div>
                                </section>
                            </div>
                        )}

                        {activeTab === 'timeline' && (
                            <div className="space-y-10 animate-in fade-in duration-500">
                                <div className="space-y-6">
                                    <h4 className="text-[10px] font-extrabold text-[var(--on-surface-variant)] uppercase tracking-[0.3em] flex items-center gap-3">
                                        <History size={16} /> Registry Timeline
                                    </h4>
                                    <div className="relative pl-8 border-l border-[var(--outline-variant)] space-y-12 py-4">
                                        {[
                                            { date: 'Today, 14:02', title: 'Profile Synchronized', desc: 'Registry data updated via administrative terminal.', icon: Activity },
                                            { date: 'Yesterday, 09:12', title: 'Visa Document Uploaded', desc: 'Electronic visa certificate attached to profile.', icon: FileText },
                                            { date: 'Mar 28, 2024', title: 'Pilgrim Initialized', desc: 'Record created in central database.', icon: Plus }
                                        ].map((item, i) => (
                                            <div key={i} className="relative group">
                                                <div className="absolute -left-[41px] top-0 w-4 h-4 bg-white border-2 border-[var(--on-surface)] rounded-full group-hover:scale-125 transition-transform"></div>
                                                <span className="text-[8px] font-black uppercase text-[var(--on-surface-variant)] tracking-widest opacity-40">{item.date}</span>
                                                <h5 className="text-sm font-manrope font-extrabold text-[var(--on-surface)] mt-1">{item.title}</h5>
                                                <p className="text-[11px] text-[var(--on-surface-variant)] mt-2 leading-relaxed">{item.desc}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="pt-10 border-t border-[var(--outline-variant)]">
                                    <label className="text-[10px] font-extrabold text-[var(--on-surface-variant)] uppercase tracking-widest mb-4 block">Official Internal Comment</label>
                                    <div className="relative bg-[var(--surface)] border border-[var(--outline-variant)] rounded-2xl p-6 focus-within:border-[var(--on-surface)] transition-all">
                                        <textarea
                                            placeholder="Append internal intelligence..."
                                            className="w-full bg-transparent text-sm font-medium outline-none h-24 resize-none placeholder-[var(--on-surface-variant)]/30"
                                        ></textarea>
                                        <div className="flex justify-end mt-4">
                                            <button className="px-6 py-2 bg-[var(--on-surface)] text-white text-[9px] font-black uppercase tracking-widest rounded-xl hover:scale-105 transition-all">
                                                Commit Note
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'travel' && (
                            <div className="space-y-10 animate-in fade-in duration-500">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="p-8 bg-[var(--surface-container-low)] rounded-3xl border border-[var(--outline-variant)] flex flex-col justify-between group">
                                        <div className="flex justify-between items-start mb-10">
                                            <div className="p-3 bg-white rounded-2xl shadow-sm text-blue-600 group-hover:scale-110 transition-transform">
                                                <Plane size={24} />
                                            </div>
                                            <span className="px-3 py-1 bg-white/50 text-[8px] font-black uppercase rounded-lg border border-[var(--outline-variant)]">Aviation Intelligence</span>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-extrabold text-[var(--on-surface-variant)] uppercase tracking-widest mb-1">Departure Vector</p>
                                            <h4 className="text-2xl font-manrope font-black text-[var(--on-surface)] tracking-tighter">Querying GDS...</h4>
                                        </div>
                                    </div>

                                    <div className="p-8 bg-[var(--surface-container-low)] rounded-3xl border border-[var(--outline-variant)] flex flex-col justify-between group">
                                        <div className="flex justify-between items-start mb-10">
                                            <div className="p-3 bg-white rounded-2xl shadow-sm text-amber-600 group-hover:scale-110 transition-transform">
                                                <Hotel size={24} />
                                            </div>
                                            <span className="px-3 py-1 bg-white/50 text-[8px] font-black uppercase rounded-lg border border-[var(--outline-variant)]">Hospitality Index</span>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-extrabold text-[var(--on-surface-variant)] uppercase tracking-widest mb-1">Stay Duration</p>
                                            <h4 className="text-2xl font-manrope font-black text-[var(--on-surface)] tracking-tighter">15 Days (Umrah)</h4>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-[var(--surface)] rounded-3xl p-10 border border-[var(--outline-variant)]">
                                    <h5 className="text-[10px] font-black uppercase tracking-widest text-[var(--on-surface-variant)] mb-8 flex items-center gap-3">
                                        <Activity size={16} /> Operational Progress
                                    </h5>
                                    <div className="relative pt-2">
                                        <div className="absolute left-0 top-0 h-1 bg-[var(--surface-container-high)] w-full rounded-full overflow-hidden">
                                            <div className="h-full bg-[var(--sacred-emerald)] w-[65%] shadow-[0_0_12px_var(--sacred-emerald)]"></div>
                                        </div>
                                        <div className="flex justify-between mt-6">
                                            {['Enrollment', 'Visa Issued', 'Hotels Locked', 'Flight Ready'].map((step, i) => (
                                                <div key={i} className="flex flex-col items-center gap-2">
                                                    <div className={`w-3 h-3 rounded-full border-2 border-white ${i <= 2 ? 'bg-[var(--sacred-emerald)]' : 'bg-gray-300'}`}></div>
                                                    <span className="text-[9px] font-black uppercase tracking-tighter opacity-60">{step}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'documents' && (
                            <div className="space-y-8 animate-in fade-in duration-500">
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                    {[
                                        { name: 'Passport Main', type: 'JPG', size: '1.2MB' },
                                        { name: 'Visa Approval', type: 'PDF', size: '450KB' },
                                        { name: 'Ticket E-File', type: 'PDF', size: '890KB' },
                                        { name: 'Vax Certificate', type: 'JPG', size: '2.1MB' },
                                    ].map((doc, i) => (
                                        <div key={i} className="p-6 bg-white border border-[var(--outline-variant)] rounded-2xl hover:shadow-xl transition-all cursor-pointer group">
                                            <div className="w-12 h-12 bg-[var(--surface-container-low)] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                                <FileText size={20} className="text-[var(--on-surface-variant)]" />
                                            </div>
                                            <h6 className="text-[10px] font-black uppercase tracking-tighter mb-1 truncate">{doc.name}</h6>
                                            <p className="text-[8px] font-bold text-[var(--on-surface-variant)] uppercase">{doc.type} • {doc.size}</p>
                                        </div>
                                    ))}
                                    <button className="p-6 bg-transparent border-2 border-dashed border-[var(--outline-variant)] rounded-2xl flex flex-col items-center justify-center gap-4 text-[var(--on-surface-variant)] hover:border-[var(--on-surface)] transition-all group">
                                        <div className="w-10 h-10 rounded-full bg-[var(--surface)] flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <Save size={16} />
                                        </div>
                                        <span className="text-[9px] font-black uppercase">Import Doc</span>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomerDetail;
