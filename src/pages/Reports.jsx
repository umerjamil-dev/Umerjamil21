import React, { useState, useEffect } from 'react';
import {
    Calendar, Download, Filter, ArrowUpRight, ArrowDownRight,
    Users, DollarSign, Briefcase, Award, Zap,
    BookOpen, CreditCard, UserCircle, Target,
    MoreHorizontal, MapPin
} from 'lucide-react';
import useReportStore from '../store/useReportStore';
import useBookingStore from '../store/useBookingStore';
import usePaymentStore from '../store/usePaymentStore';
import useCustomerStore from '../store/useCustomerStore';
import useLeadStore from '../store/useLeadStore';

const Reports = () => {
    const [activeReport, setActiveReport] = useState('Booking');
    const { 
        bookingReports, paymentReports, salesReports, customerReports, 
        fetchReports, isLoading 
    } = useReportStore();

    const { bookings, fetchBookings } = useBookingStore();
    const { payments, fetchPayments } = usePaymentStore();
    const { customers, fetchCustomers } = useCustomerStore();
    const { leads, fetchLeads } = useLeadStore();

    useEffect(() => {
        fetchReports(activeReport.toLowerCase());
        fetchBookings();
        fetchPayments();
        fetchCustomers();
        fetchLeads();
    }, [activeReport, fetchReports, fetchBookings, fetchPayments, fetchCustomers, fetchLeads]);

    const totalRevenue = payments.reduce((acc, curr) => acc + (curr.amount || 0), 0);
    const activeBookingCount = bookings.filter(b => b.status === 'Confirmed' || b.status === 'Active').length;
    const customerCount = customers.length;
    const leadCount = leads.length;

    // Safe-accessors for nested API objects
    const getCustomerName = (row) => {
        if (!row.customer) return '—';
        if (typeof row.customer === 'string') return row.customer;
        return `${row.customer.firstName || ''} ${row.customer.lastName || ''}`.trim() || row.customer.name || '—';
    };

    const getPackageName = (row) => {
        if (!row.package) return '—';
        if (typeof row.package === 'string') return row.package;
        return row.package.title || row.package.name || '—';
    };

    const stats = [
        { label: 'Gross Revenue', value: `$${totalRevenue.toLocaleString()}`, growth: '+12.5%', icon: DollarSign, color: 'text-emerald-500', trend: 'up' },
        { label: 'Active Bookings', value: activeBookingCount.toString(), growth: '+5.2%', icon: Briefcase, color: 'text-blue-500', trend: 'up' },
        { label: 'Total Clients', value: customerCount.toString(), growth: '+3.1%', icon: Users, color: 'text-indigo-500', trend: 'up' },
        { label: 'Sales Velocity', value: `${leadCount} Leads`, growth: '+8.1%', icon: Target, color: 'text-[var(--desert-gold)]', trend: 'up' },
    ];


    const reportsList = [
        { id: 'Booking', title: 'Booking Report', icon: BookOpen },
        { id: 'Payment', title: 'Payment Report', icon: CreditCard },
        { id: 'Sales', title: 'Sales Report', icon: Target },
        { id: 'Customer', title: 'Customer Report', icon: UserCircle },
    ];

    // Normalized Data from Store
    const bookingData = bookingReports;
    const paymentData = paymentReports;
    const salesData = salesReports;
    const customerData = customerReports;


    return (
        <div className="space-y-12 animate-in fade-in duration-1000 font-inter pb-20">
            {/* Premium Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 pb-8 border-b border-slate-200">
                <div className="space-y-4">
                    <div className="flex items-center gap-3 text-[var(--desert-gold)] uppercase tracking-[0.4em] text-[11px] font-black opacity-80">
                        <Zap size={14} strokeWidth={3} />
                        Analytical Engine v4.0
                    </div>
                    <h1 className="text-5xl font-manrope font-extrabold text-slate-900 tracking-tighter leading-tight">
                        Business 
                    </h1>
                    <p className="text-slate-500 text-sm font-medium max-w-xl leading-relaxed">
                        High-fidelity analytical insights derived from real-time global operations, financial s, and sales velocities.
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    <button className="flex items-center gap-3 px-8 py-5 bg-white border border-slate-200 rounded-xl text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-black hover:border-slate-300 transition-all group shadow-sm">
                        <Calendar size={18} strokeWidth={3} /> Temporal Filter
                    </button>
                    <button className="px-10 py-5 bg-black text-white rounded-xl text-[10px] font-black uppercase tracking-[0.4em] shadow-xl hover:bg-[var(--desert-gold)] hover:text-black transition-all flex items-center gap-3">
                        <Download size={18} strokeWidth={3} />
                        Export Ledger
                    </button>
                </div>
            </div>

            {/* Macro Metrics Matrix */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                {stats.map((stat, idx) => (
                    <div key={idx} className="bg-white rounded-xl p-8 border border-slate-200 shadow-sm relative overflow-hidden group hover:shadow-xl transition-all duration-500">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-slate-50 rounded-bl-[4rem] translate-x-12 -translate-y-12 group-hover:translate-x-6 group-hover:-translate-y-6 transition-all"></div>
                        <div className="flex items-center justify-between mb-8 relative z-10">
                            <div className={`p-4 rounded-xl bg-slate-50 border border-slate-100 group-hover:bg-white transition-all ${stat.color}`}>
                                <stat.icon size={20} strokeWidth={2.5} />
                            </div>
                            <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${stat.trend === 'up' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-red-50 text-red-600 border border-red-100'
                                }`}>
                                {stat.trend === 'up' ? <ArrowUpRight size={10} strokeWidth={4} /> : <ArrowDownRight size={10} strokeWidth={4} />}
                                {stat.growth}
                            </div>
                        </div>
                        <div className="relative z-10">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-2">{stat.label}</p>
                            <h4 className="text-3xl font-manrope font-black text-slate-900 tracking-tighter">{stat.value}</h4>
                        </div>
                    </div>
                ))}
            </div>

            {/* Reporting Tab System */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden relative">
                <div className="border-b border-slate-200 bg-slate-50 p-2 flex space-x-2 overflow-x-auto">
                    {reportsList.map(r => (
                        <button
                            key={r.id}
                            onClick={() => setActiveReport(r.id)}
                            className={`flex items-center gap-3 px-8 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeReport === r.id
                                ? 'bg-white shadow-md text-black border border-slate-200'
                                : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100 border border-transparent'
                                }`}
                        >
                            <r.icon size={16} strokeWidth={activeReport === r.id ? 2.5 : 2} />
                            {r.title}
                        </button>
                    ))}
                    <div className="flex-grow"></div>
                    <div className="px-4 py-4 opacity-50">
                        <Filter size={20} className="text-slate-400" />
                    </div>
                </div>

                <div className="p-0">
                    {/* 1. BOOKING REPORT */}
                    {activeReport === 'Booking' && (
                        <div className="overflow-x-auto animate-in fade-in slide-in-from-bottom-2 duration-500">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-white border-b border-slate-100">
                                        <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Booking / Customer</th>
                                        <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Package Detail</th>
                                        <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Travel Window</th>
                                        <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Valuation</th>
                                        <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Protocol Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {isLoading ? (
                                        <tr><td colSpan="5" className="py-20 text-center text-sm font-bold uppercase tracking-widest text-slate-400 opacity-50">Compiling Booking Intelligence...</td></tr>
                                    ) : bookingData.length === 0 ? (
                                        <tr><td colSpan="5" className="py-20 text-center text-sm font-bold uppercase tracking-widest text-slate-400 opacity-50">No booking records in current data cycle.</td></tr>
                                    ) : bookingData.map((row) => (

                                        <tr key={row.id} className="group hover:bg-slate-50 transition-all">
                                            <td className="px-8 py-6">
                                                <p className="text-sm font-manrope font-black text-slate-900 tracking-tight">
                                                    {getCustomerName(row)}
                                                </p>
                                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.1em]">{row.id}</p>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-[10px] font-bold text-slate-600 uppercase tracking-widest leading-none">
                                                    {getPackageName(row)}
                                                </div>
                                            </td>
                                            <td className="px-8 py-6 text-[11px] font-bold text-slate-600 uppercase tracking-widest">{row.date}</td>
                                            <td className="px-8 py-6 text-base font-manrope font-black text-slate-900">
                                                ${parseFloat(row.amount || 0).toLocaleString()}
                                            </td>
                                            <td className="px-8 py-6">
                                                <span className={`px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] inline-flex items-center gap-1.5 ${row.status === 'Confirmed' ? 'bg-[var(--sacred-emerald)]/10 text-[var(--sacred-emerald)]' :
                                                    row.status === 'Pending' ? 'bg-[var(--desert-gold)]/10 text-[var(--desert-gold)]' :
                                                        'bg-red-50 text-red-600'
                                                    }`}>
                                                    {row.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* 2. PAYMENT REPORT */}
                    {activeReport === 'Payment' && (
                        <div className="overflow-x-auto animate-in fade-in slide-in-from-bottom-2 duration-500">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-white border-b border-slate-100">
                                        <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Reference Node</th>
                                        <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Booking Link</th>
                                        <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Capital Dispersed</th>
                                        <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Temporal Marker</th>
                                        <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Protocol Type</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {paymentData.map((row) => (
                                        <tr key={row.ref} className="group hover:bg-slate-50 transition-all">
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-3 text-slate-900 font-mono tracking-widest text-xs bg-slate-100 px-3 py-1.5 rounded-xl inline-flex border border-slate-200">
                                                    {row.ref}
                                                </div>
                                            </td>
                                            <td className="px-8 py-6 text-[11px] font-bold text-slate-600 uppercase tracking-widest">{row.bookingId}</td>
                                            <td className="px-8 py-6 text-base font-manrope font-black text-emerald-600">
                                                ${parseFloat(row.amount || 0).toLocaleString()}
                                            </td>
                                            <td className="px-8 py-6 text-[11px] font-medium text-slate-500">{row.date}</td>
                                            <td className="px-8 py-6">
                                                <span className="px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] bg-blue-50 text-blue-600 border border-blue-100 inline-block">
                                                    {row.method}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* 3. SALES REPORT */}
                    {activeReport === 'Sales' && (
                        <div className="overflow-x-auto animate-in fade-in slide-in-from-bottom-2 duration-500">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-white border-b border-slate-100">
                                        <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Fiscal Epoch</th>
                                        <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Lead Velocity</th>
                                        <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Conversion Node</th>
                                        <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Gross Yield</th>
                                        <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Apex Product</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {salesData.map((row) => (
                                        <tr key={row.period} className="group hover:bg-slate-50 transition-all">
                                            <td className="px-8 py-6 text-[12px] font-black text-slate-900 uppercase tracking-widest">{row.period}</td>
                                            <td className="px-8 py-6 text-sm font-bold text-slate-600">{row.leads} Output</td>
                                            <td className="px-8 py-6">
                                                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 text-slate-700 font-black text-xs border border-slate-200">
                                                    {row.conversions}
                                                </div>
                                            </td>
                                            <td className="px-8 py-6 text-base font-manrope font-black text-slate-900">{row.revenue}</td>
                                            <td className="px-8 py-6 text-[10px] font-bold text-slate-500 uppercase tracking-widest">{row.topPackage}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* 4. CUSTOMER REPORT */}
                    {activeReport === 'Customer' && (
                        <div className="overflow-x-auto animate-in fade-in slide-in-from-bottom-2 duration-500">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-white border-b border-slate-100">
                                        <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Client Topology</th>
                                        <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Contact Vector</th>
                                        <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Booking Count</th>
                                        <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Lifetime Yield</th>
                                        <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] text-right">Loyalty Index</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {customerData.map((row) => (
                                        <tr key={row.id} className="group hover:bg-slate-50 transition-all">
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 font-black text-xs border border-slate-200 uppercase">
                                                        {row.name.substring(0, 2)}
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-manrope font-black text-slate-900 tracking-tight leading-none mb-1">{row.name}</p>
                                                        <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">{row.id}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6 text-[11px] font-medium text-slate-500">{row.email}</td>
                                            <td className="px-8 py-6 text-sm font-black text-slate-700">{row.bookings} Active</td>
                                            <td className="px-8 py-6 text-base font-manrope font-black text-[var(--desert-gold)]">{row.spend}</td>
                                            <td className="px-8 py-6 text-right">
                                                <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] inline-block ${row.status === 'VIP' ? 'bg-black text-[var(--desert-gold)] shadow-[0_4px_10px_rgba(212,175,55,0.2)]' :
                                                    row.status === 'Loyal' ? 'bg-[var(--sacred-emerald)]/10 text-[var(--sacred-emerald)]' :
                                                        'bg-slate-100 text-slate-500'
                                                    }`}>
                                                    {row.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
                <div className="bg-slate-50 border-t border-slate-100 p-6 flex justify-center">
                    <button className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-black transition-all">
                        Load More Intelligence
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Reports;
