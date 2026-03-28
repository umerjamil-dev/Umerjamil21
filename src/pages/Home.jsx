import React, { useState } from 'react';
import { BarChart, PieChart } from '@mui/x-charts';
import {
    Users, DollarSign, Calendar, TrendingUp,
    Plane, Plus, Calculator, Activity, ArrowUpRight, ArrowDownRight, Globe,
    ShieldCheck
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
    const [timeFilter, setTimeFilter] = useState('Yearly');

    const chartData = {
        Weekly: {
            categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            umrah: [15, 22, 18, 30, 45, 50, 40],
            hajj: [2, 5, 3, 8, 12, 10, 5]
        },
        Monthly: {
            categories: ['1-5', '6-10', '11-15', '16-20', '21-25', '26-30'],
            umrah: [120, 150, 140, 180, 200, 250],
            hajj: [10, 15, 25, 40, 50, 80]
        },
        Yearly: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            umrah: [1200, 1500, 1800, 2200, 2600, 3100, 3400, 3800, 4100, 4000, 4200, 4500],
            hajj: [40, 60, 45, 90, 120, 160, 300, 500, 800, 1200, 1500, 1800]
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-700 font-inter mx-auto pb-12">

            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-manrope font-extrabold text-gray-900 tracking-tight">Admin Dashboard</h1>
                    <p className="mt-2 text-sm font-medium text-gray-500 tracking-wide">Orchestrating premium pilgrimage operations worldwide.</p>
                </div>
                <div className="flex items-center gap-4 bg-white px-5 py-2.5 rounded-2xl border border-gray-200 shadow-sm">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                        <span className="text-xs font-bold text-gray-700 uppercase tracking-widest">Live Sync</span>
                    </div>
                    <div className="w-px h-4 bg-gray-200"></div>
                    <p className="text-xs font-semibold text-gray-500">Last updated: Just now</p>
                </div>
            </div>

            {/* Premium Metrics Row */}
            <div className="grid gap-6 md:grid-cols-3">
                {/* Metric 1 - Dark Premium */}
                <div className="bg-[#0B0F19] rounded-3xl p-8 text-white shadow-xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-white/10 to-transparent rounded-bl-full pointer-events-none transition-transform duration-700 group-hover:scale-110"></div>

                    <div className="flex justify-between items-start mb-10 relative z-10">
                        <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center border border-white/10 backdrop-blur-md">
                            <Users size={24} className="text-white" />
                        </div>
                        <div className="px-3 py-1.5 bg-[var(--desert-gold)]/20 text-[var(--desert-gold)] text-[10px] font-bold uppercase tracking-widest rounded-lg flex items-center gap-1 border border-[var(--desert-gold)]/20">
                            <ArrowUpRight size={14} /> 12.5%
                        </div>
                    </div>

                    <div className="relative z-10">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-2">Active Inquiries</p>
                        <h2 className="text-5xl font-manrope font-black tracking-tighter">1,245</h2>
                    </div>
                </div>

                {/* Metric 2 - Light Elevated */}
                <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 relative overflow-hidden group hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-10">
                        <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center border border-gray-100 group-hover:bg-blue-50 transition-colors">
                            <DollarSign size={24} className="text-blue-600" />
                        </div>
                        <div className="px-3 py-1.5 bg-[var(--desert-gold)]/10 text-[var(--desert-gold)] text-[10px] font-bold uppercase tracking-widest rounded-lg flex items-center gap-1">
                            <ArrowUpRight size={14} /> 8.2%
                        </div>
                    </div>

                    <div>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-2">Revenue Captured</p>
                        <h2 className="text-5xl font-manrope font-black text-gray-900 tracking-tighter">$84.5k</h2>
                    </div>
                </div>

                {/* Metric 3 - Light Elevated */}
                <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 relative overflow-hidden group hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-10">
                        <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center border border-gray-100 group-hover:bg-indigo-50 transition-colors">
                            <Plane size={24} className="text-indigo-600" />
                        </div>
                        <div className="px-3 py-1.5 bg-gray-100 text-gray-600 text-[10px] font-bold uppercase tracking-widest rounded-lg flex items-center gap-1">
                            Stable
                        </div>
                    </div>

                    <div>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-2">Live s</p>
                        <h2 className="text-5xl font-manrope font-black text-gray-900 tracking-tighter">142</h2>
                    </div>
                </div>
            </div>

            {/* Main Analytical Section */}
            <div className="grid gap-6 md:grid-cols-1 xl:grid-cols-3">
                {/* Revenue & Bookings Trend (Grouped Bar Chart) */}
                <div className="xl:col-span-2 bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                        <div>
                            <h3 className="text-xl font-manrope font-extrabold text-gray-900 mb-1">Performance Matrix</h3>
                            <p className="text-xs font-medium text-gray-500 tracking-wide">Comparative volume of Hajj & Umrah bookings over time.</p>
                        </div>
                        <div className="flex items-center gap-6">
                            {/* Time Horizon Toggle */}
                            <div className="flex p-1 bg-gray-50 rounded-lg border border-gray-200">
                                {['Weekly', 'Monthly', 'Yearly'].map(filter => (
                                    <button
                                        key={filter}
                                        onClick={() => setTimeFilter(filter)}
                                        className={`px-4 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-widest transition-all ${timeFilter === filter
                                            ? 'bg-white text-gray-900 shadow-sm border border-gray-200/50'
                                            : 'text-gray-400 hover:text-gray-900'
                                            }`}
                                    >
                                        {filter}
                                    </button>
                                ))}
                            </div>

                            <div className="hidden lg:flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-2.5 h-2.5 rounded-full bg-[#CA9323]"></div>
                                    <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">Umrah</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2.5 h-2.5 rounded-full bg-[#111827]"></div>
                                    <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">Hajj</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 w-full ">
                        <BarChart
                            series={[
                                { data: chartData[timeFilter].umrah, label: 'Umrah', color: '#CA9323' },
                                { data: chartData[timeFilter].hajj, label: 'Hajj', color: '#111827' },
                            ]}
                            xAxis={[{
                                data: chartData[timeFilter].categories,
                                scaleType: 'band',
                                categoryGapRatio: 0.4,
                                barGapRatio: 0.1
                            }]}
                            margin={{ top: 20, bottom: 30, left: 40, right: 20 }}
                            slotProps={{ legend: { hidden: true } }}
                            borderRadius={6}
                        />
                    </div>
                </div>

                {/* Conversion Funnel / Source (Donut Chart) */}
                <div className="xl:col-span-1 bg-white rounded-[2rem] p-10 shadow-[0_20px_60px_rgba(0,0,0,0.03)] border border-gray-100 flex flex-col relative overflow-hidden group hover:shadow-[0_40px_80px_rgba(0,0,0,0.06)] transition-all duration-700">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--desert-gold)] opacity-[0.03] rounded-bl-[5rem] translate-x-8 -translate-y-8"></div>

                    <div className="mb-10 relative z-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-50 border border-slate-100 rounded-full text-[9px] font-black text-slate-400 uppercase tracking-widest mb-4">
                            <ShieldCheck size={12} className="text-[var(--desert-gold)]" /> Intelligence Source
                        </div>
                        <h3 className="text-2xl font-manrope font-black text-gray-900 tracking-tighter leading-none mb-2">Acquisition</h3>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Global Entry Vector Analytics</p>
                    </div>

                    <div className="flex-1 flex flex-col items-center justify-center relative ">
                        <div className="relative w-full h-[220px]  flex justify-center items-center scale-110 ">
                            <PieChart
                                series={[
                                    {
                                        data: [
                                            { id: 0, value: 45, label: 'Direct', color: '#CA9323' },
                                            { id: 1, value: 30, label: 'B2B', color: '#111827' },
                                            { id: 2, value: 15, label: 'Digital', color: '#3B82F6' },
                                            { id: 3, value: 10, label: 'Referral', color: '#10B981' },
                                        ],
                                        innerRadius: 85,
                                        outerRadius: 110,
                                        paddingAngle: 8,
                                        cornerRadius: 15,
                                        strokeWidth: 0,
                                        highlightScope: { faded: 'global', highlighted: 'item' },
                                        faded: { innerRadius: 85, additionalRadius: -5, color: 'gray' },
                                    },
                                ]}
                                margin={{ top: 0, bottom: 0, left: 0, right: 0 }}
                                slotProps={{ legend: { hidden: true } }}
                            />
                            {/* Inner Label - High Luxury */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                <span className="text-4xl font-manrope font-black text-gray-900 tracking-tighter leading-none">92%</span>
                                <span className="text-[8px] font-black text-[var(--desert-gold)] uppercase tracking-[0.3em] mt-3">Efficiency</span>
                            </div>
                        </div>

                        {/* Custom Legend - Premium Matrix Style */}
                        <div className="w-full grid grid-cols-2 gap-y-6 gap-x-8 pt-8  relative z-10">
                            {[
                                { label: 'Direct Entry', val: '45%', color: 'bg-[#CA9323]', desc: 'Organic' },
                                { label: 'B2B Matrix', val: '30%', color: 'bg-[#111827]', desc: 'Agents' },
                                { label: 'Digital Ads', val: '15%', color: 'bg-[#3B82F6]', desc: 'Social' },
                                { label: 'Referral Net', val: '10%', color: 'bg-[#10B981]', desc: 'Partners' }
                            ].map(item => (
                                <div key={item.label} className="flex flex-col gap-1 transition-all hover:translate-x-1 cursor-default">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-1.5 h-1.5 rounded-full ${item.color} shadow-[0_0_8px_rgba(0,0,0,0.1)]`}></div>
                                            <span className="text-[10px] font-black text-gray-900 uppercase tracking-widest">{item.label}</span>
                                        </div>
                                        <span className="text-xs font-black text-[var(--desert-gold)]">{item.val}</span>
                                    </div>
                                    <p className="pl-3.5 text-[8px] font-bold text-gray-400 uppercase tracking-widest opacity-60">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>

            {/* System Actions Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: 'Register Lead', desc: 'Add new inquiry', icon: Plus },
                    { label: 'Generate Quote', desc: 'Pricing calculator', icon: Calculator },
                    { label: 'New Booking', desc: ' creation', icon: Calendar },
                    { label: 'Global Map', desc: 'Tracking matrix', icon: Globe }
                ].map((action, idx) => (
                    <Link
                        key={idx}
                        to="#"
                        className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-[var(--desert-gold)]/50 hover:shadow-[0_4px_20px_rgba(212,175,55,0.1)] hover:-translate-y-1 transition-all group flex items-start gap-4"
                    >
                        <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-[#0B0F19] text-white group-hover:text-[var(--desert-gold)] transition-colors shrink-0">
                            <action.icon size={20} className="group-hover:scale-110 transition-transform" />
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-gray-900 mb-1">{action.label}</h4>
                            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">{action.desc}</p>
                        </div>
                    </Link>
                ))}
            </div>

        </div>
    );
};

export default Home;