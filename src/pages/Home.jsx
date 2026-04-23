// import statement will be here 
import React, { useState, useEffect } from 'react';
import { BarChart, PieChart } from '@mui/x-charts';
import { motion } from 'framer-motion';
import {
    Users, DollarSign, Calendar, TrendingUp,
    Plane, Plus, Calculator, Activity, ArrowUpRight, ArrowDownRight, Globe,
    ShieldCheck, MapPin, Clock, CheckCircle2, AlertCircle, ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
// useDashboardData will be there in the store
import useDashboardStore from '../store/useDashboardStore';

// home page will be here
const Home = () => {
    const [timeFilter, setTimeFilter] = useState('Yearly');

    const {
        metrics,
        performanceData: storePerformanceData,
        acquisitionData: storeAcquisitionData,
        regionsData: storeRegionsData,
        activities: storeActivities,
        fetchDashboardData,
        isLoading
    } = useDashboardStore();

    useEffect(() => {
        fetchDashboardData();
    }, [fetchDashboardData]);

    const chartData = storePerformanceData && storePerformanceData[timeFilter]
        ? storePerformanceData
        : {
            Weekly: { categories: [], umrah: [], hajj: [] },
            Monthly: { categories: [], umrah: [], hajj: [] },
            Yearly: { categories: [], umrah: [], hajj: [] }
        };

    const pieData = storeAcquisitionData && storeAcquisitionData.length > 0
        ? storeAcquisitionData
        : [];

    const activities = storeActivities && storeActivities.length > 0 ? storeActivities : [];
    const regions = storeRegionsData && storeRegionsData.length > 0 ? storeRegionsData : [];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
    };

    const itemVariants = {
        hidden: { y: 24, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8 pb-16"
        >
            {/* ── Header ─────────────────────────────────────────────────────── */}
            <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row sm:items-end justify-between gap-4"
            >
                <div>
                    <p className="text-[10px] font-black text-[var(--desert-gold)] uppercase tracking-[0.3em] mb-1">
                        Al-Amin Travel Group
                    </p>
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[var(--on-surface)] tracking-tight leading-none">
                        Executive Dashboard
                    </h1>
                    <p className="mt-2 text-xs font-semibold text-gray-400 uppercase tracking-widest">
                        Premium Pilgrimage Operations
                    </p>
                </div>

                <div className="flex items-center gap-3 self-start sm:self-auto">
                    <div className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-xl border border-gray-100 shadow-sm">
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#10B981]"></span>
                        </span>
                        <span className="text-[10px] font-black text-gray-700 uppercase tracking-widest whitespace-nowrap">
                            Global Ops Online
                        </span>
                    </div>
                </div>
            </motion.div>

            {/* ── KPI Metrics ────────────────────────────────────────────────── */}
       <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-3">

    {/* Metric 1 — Gold / Dark Theme Compatible */}
    <motion.div
        variants={itemVariants}
        whileHover={{ y: -4, transition: { duration: 0.2 } }}
        className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 relative overflow-hidden group hover:shadow-lg transition-all duration-300"
    >
        {/* Hover Glow Effect (Subtle) */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--desert-gold)]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-[var(--desert-gold)]/5 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-500 pointer-events-none" />

        <div className="relative z-10 flex justify-between items-start mb-8">
            {/* Icon Box - Light Gray/White style */}
            <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center border border-gray-100">
                <Users size={22} className="text-black" />
            </div>
            <span className="px-3 py-1 bg-[var(--desert-gold)]/10 text-[var(--desert-gold)] text-[10px] font-black uppercase tracking-widest rounded-full border border-[var(--desert-gold)]/10">
                {metrics?.active_inquiries?.growth || '0%'} Growth
            </span>
        </div>

        <div className="relative z-10">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.25em] mb-2">
                Active Inquiries
            </p>
            {/* Main Value - Dark Black Text */}
            <h2 className="text-5xl sm:text-6xl font-black tracking-tighter text-gray-900 leading-none">
                {metrics?.active_inquiries?.value || '0'}
            </h2>
        </div>
    </motion.div>

    {/* Metric 2 — Emerald */}
    <motion.div
        variants={itemVariants}
        whileHover={{ y: -4, transition: { duration: 0.2 } }}
        className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 relative overflow-hidden group hover:shadow-lg transition-all duration-300"
    >
        {/* Hover Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#10B981]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#10B981]/5 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-500 pointer-events-none" />

        <div className="relative z-10 flex justify-between items-start mb-8">
            <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center border border-gray-100">
                <DollarSign size={22} className="text-[#10B981]" />
            </div>
            <span className="px-3 py-1 bg-[#10B981]/10 text-[#10B981] text-[10px] font-black uppercase tracking-widest rounded-full border border-[#10B981]/10">
                {metrics?.total_secured?.growth || '0%'} Revenue
            </span>
        </div>

        <div className="relative z-10">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.25em] mb-2">
                Total Secured
            </p>
            <h2 className="text-5xl sm:text-6xl font-black tracking-tighter text-gray-900 leading-none">
                {metrics?.total_secured?.value ? `$${metrics.total_secured.value}` : '$0'}
            </h2>
        </div>
    </motion.div>

    {/* Metric 3 — Blue */}
    <motion.div
        variants={itemVariants}
        whileHover={{ y: -4, transition: { duration: 0.2 } }}
        className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 border border-gray-100 relative overflow-hidden group hover:shadow-lg transition-all duration-300"
    >
        {/* Hover Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#3B82F6]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#3B82F6]/5 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-500 pointer-events-none" />

        <div className="relative z-10 flex justify-between items-start mb-8">
            <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center border border-gray-100">
                <Plane size={22} className="text-[#3B82F6]" />
            </div>
            <span className="px-3 py-1 bg-[#3B82F6]/10 text-[#3B82F6] text-[10px] font-black uppercase tracking-widest rounded-full border border-[#3B82F6]/10">
                {metrics?.live_flights?.status || 'Stable Ops'}
            </span>
        </div>

        <div className="relative z-10">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.25em] mb-2">
                Live Flights
            </p>
            <h2 className="text-5xl sm:text-6xl font-black tracking-tighter text-gray-900 leading-none">
                {metrics?.live_flights?.value || '0'}
            </h2>
        </div>
    </motion.div>

</div> 

            {/* ── Charts Row ─────────────────────────────────────────────────── */}
            <div className="grid gap-4 sm:gap-6 grid-cols-1 xl:grid-cols-3">

                {/* Bar Chart — Performance Matrix */}
                <motion.div
                    variants={itemVariants}
                    className="xl:col-span-2 bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 flex flex-col min-h-[420px]"
                >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
                        <div>
                            <h3 className="text-xl sm:text-2xl font-black text-[#111827] tracking-tighter leading-none mb-1.5">
                                Performance Matrix
                            </h3>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                Global Hajj & Umrah Booking Flow
                            </p>
                        </div>

                        <div className="flex p-1 bg-gray-50 rounded-xl border border-gray-200 self-start shrink-0">
                            {['Weekly', 'Monthly', 'Yearly'].map(filter => (
                                <button
                                    key={filter}
                                    onClick={() => setTimeFilter(filter)}
                                    className={`px-3 sm:px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all ${timeFilter === filter
                                        ? 'bg-white text-[var(--on-surface)] shadow border border-gray-100'
                                        : 'text-gray-400 hover:text-[var(--on-surface)]'
                                        }`}
                                >
                                    {filter}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex-1 w-full overflow-hidden">
                        <BarChart
                            series={[
                                { data: chartData[timeFilter].umrah, label: 'Premium Umrah', color: '#0E3E81' },
                                { data: chartData[timeFilter].hajj, label: 'Standard Hajj', color: '#2E5892' },
                            ]}
                            xAxis={[{
                                data: chartData[timeFilter].categories,
                                scaleType: 'band',
                                categoryGapRatio: 0.35,
                                barGapRatio: 0.1
                            }]}
                            height={320}
                            grid={{ horizontal: true }}
                            margin={{ top: 50, bottom: 25, left: 40, right: 20 }}
                            slotProps={{
                                legend: {
                                    direction: 'row',
                                    position: { vertical: 'top', horizontal: 'right' },
                                    itemMarkWidth: 10,
                                    itemMarkHeight: 10,
                                    markGap: 6,
                                    itemGap: 20,
                                    labelStyle: { fontSize: 12, fontWeight: 700, fill: '#374151' }
                                }
                            }}
                            sx={{
                                '& .MuiChartsAxis-bottom .MuiChartsAxis-line': { stroke: '#E5E7EB', strokeWidth: 1 },
                                '& .MuiChartsAxis-bottom .MuiChartsAxis-tick': { stroke: '#E5E7EB' },
                                '& .MuiChartsAxis-bottom .MuiChartsAxis-tickLabel': { fill: '#6B7280', fontFamily: 'Inter', fontSize: 11, fontWeight: 600 },
                                '& .MuiChartsAxis-left .MuiChartsAxis-line': { stroke: 'transparent' },
                                '& .MuiChartsAxis-left .MuiChartsAxis-tick': { stroke: 'transparent' },
                                '& .MuiChartsAxis-left .MuiChartsAxis-tickLabel': { fill: '#9CA3AF', fontFamily: 'Inter', fontSize: 11, fontWeight: 600 },
                                '& .MuiChartsGrid-line': { stroke: '#F3F4F6', strokeDasharray: '4 4', strokeWidth: 1 },
                                '& .MuiBarElement-root': { rx: 4, cursor: 'pointer', transition: 'filter 0.2s' },
                                '& .MuiBarElement-root:hover': { filter: 'brightness(1.15)' },
                            }}
                        />
                    </div>
                </motion.div>
                {/* Pie Chart — Acquisition */}
                <motion.div
                    variants={itemVariants}
                    className="xl:col-span-1 bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 flex flex-col"
                >
                    <div className="mb-6">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[var(--desert-gold)]/8 border border-[var(--desert-gold)]/20 rounded-full text-[9px] font-black text-[var(--desert-gold)] uppercase tracking-widest mb-4">
                            <ShieldCheck size={11} /> Global Entry Matrix
                        </div>
                        <h3 className="text-xl sm:text-2xl font-black tracking-tighter leading-none mb-1.5 text-[var(--on-surface)]">
                            Acquisition
                        </h3>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                            Inquiry Source Distribution
                        </p>
                    </div>

                    <div className="flex-1 flex flex-col items-center justify-center">
                        <div className="w-full h-[200px]">
                            <PieChart
                                series={[{ data: pieData }]}
                                margin={{ top: 0, bottom: 0, left: 0, right: 0 }}
                                slotProps={{ legend: { hidden: true } }}
                            />
                        </div>

                        {/* Legend */}
                        <div className="w-full grid grid-cols-2 gap-x-4 gap-y-3 pt-6">
                            {pieData.map((item) => (
                                <div key={item.label} className="flex flex-col gap-1 group cursor-default">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-1.5">
                                            <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                                            <span className="text-[10px] font-black text-gray-500 uppercase tracking-wide truncate">
                                                {item.label}
                                            </span>
                                        </div>
                                        <span className="text-[11px] font-black text-[var(--desert-gold)] ml-1">{item.value}%</span>
                                    </div>
                                    <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                                        <div
                                            className="h-full rounded-full transition-all duration-500"
                                            style={{ width: `${item.value}%`, backgroundColor: item.color, opacity: 0.75 }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* ── Regional + Activity ─────────────────────────────────────────── */}
            <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-5">

                {/* Regional Dominance */}
                <motion.div
                    variants={itemVariants}
                    className="lg:col-span-2 bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100"
                >
                    <div className="flex items-start justify-between mb-8">
                        <div>
                            <h3 className="text-xl sm:text-2xl font-black text-[var(--on-surface)] tracking-tighter leading-none mb-1.5">
                                Regional Dominance
                            </h3>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                Volume by key operation centers
                            </p>
                        </div>
                        <div className="w-10 h-10 bg-[var(--desert-gold)]/8 rounded-xl flex items-center justify-center shrink-0">
                            <MapPin size={18} className="text-[var(--desert-gold)]" />
                        </div>
                    </div>

                    <div className="space-y-6">
                        {regions.map((region, idx) => (
                            <div key={idx} className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-2.5">
                                        <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: region.color }} />
                                        <span className="text-sm font-black text-gray-800 uppercase tracking-wide">
                                            {region.name}
                                        </span>
                                    </div>
                                    <div className="flex items-baseline gap-1.5">
                                        <span className="text-base font-black text-[var(--on-surface)]">{region.leads}</span>
                                        <span className="text-[10px] font-bold text-gray-400 uppercase">Leads</span>
                                    </div>
                                </div>
                                <div className="h-2.5 w-full bg-gray-100 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${region.value}%` }}
                                        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: idx * 0.1 }}
                                        className="h-full rounded-full"
                                        style={{ backgroundColor: region.color }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* System Pulse */}
                <motion.div
                    variants={itemVariants}
                    className="lg:col-span-3 bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 flex flex-col"
                >
                    <div className="flex items-start justify-between mb-8">
                        <div>
                            <h3 className="text-xl sm:text-2xl font-black text-[#111827] tracking-tighter leading-none mb-1.5">
                                System Pulse
                            </h3>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                Real-time operational updates
                            </p>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-[#10B981]/8 rounded-full border border-[#10B981]/15 shrink-0">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]" />
                            </span>
                            <span className="text-[10px] font-black text-[#10B981] uppercase tracking-widest">
                                Live
                            </span>
                        </div>
                    </div>

                    <div className="flex-1 space-y-2 max-h-[380px] overflow-y-auto pr-1 -mr-1"
                        style={{ scrollbarWidth: 'thin', scrollbarColor: '#E5E7EB transparent' }}>
                        {isLoading ? (
                            <div className="flex flex-col items-center justify-center py-16 text-gray-300">
                                <Activity className="animate-spin text-[var(--desert-gold)] mb-4" size={36} />
                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                                    Fetching operations...
                                </p>
                            </div>
                        ) : activities.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-16 text-gray-300">
                                <Activity size={36} className="mb-4" />
                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                                    No recent activities
                                </p>
                            </div>
                        ) : (
                            activities.map((act) => (
                                <div
                                    key={act.id}
                                    className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50/80 transition-all border border-transparent hover:border-gray-100 cursor-default group"
                                >
                                    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 ${
                                        act.status === 'success'
                                            ? 'bg-[#10B981]/8 text-[#10B981]'
                                            : act.status === 'warning'
                                            ? 'bg-orange-50 text-orange-500'
                                            : 'bg-blue-50 text-blue-500'
                                    }`}>
                                        {act.status === 'success'
                                            ? <CheckCircle2 size={20} />
                                            : act.status === 'warning'
                                            ? <AlertCircle size={20} />
                                            : <Activity size={20} />}
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-sm font-black text-[var(--on-surface)] tracking-tight mb-0.5 truncate">
                                            {act.title}
                                        </h4>
                                        <p className="text-xs text-gray-500 font-medium line-clamp-1">
                                            {act.desc}
                                        </p>
                                    </div>

                                    <div className="text-right shrink-0 ml-2">
                                        <p className="text-[10px] font-black text-[var(--desert-gold)] uppercase tracking-wider mb-1">
                                            {act.time}
                                        </p>
                                        <Clock size={12} className="ml-auto text-gray-300" />
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};
// home page export will be here 
export default Home;