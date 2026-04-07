import React, { useState, useEffect } from 'react';
import { BarChart, PieChart } from '@mui/x-charts';
import { motion } from 'framer-motion';
import {
    Users, DollarSign, Calendar, TrendingUp,
    Plane, Plus, Calculator, Activity, ArrowUpRight, ArrowDownRight, Globe,
    ShieldCheck, MapPin, Clock, CheckCircle2, AlertCircle, ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import useDashboardStore from '../store/useDashboardStore';


const Home = () => {
    const [timeFilter, setTimeFilter] = useState('Yearly');
// here's the char data will appear 
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

    // Data fallbacks/merging for charts
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
// here the container variants will appear 
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };
// here the item variants will appear 
    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    };
 
    return (

        <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8 font-inter mx-auto pb-12"
        >
            {/* Header Section */}
            <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-manrope font-extrabold text-[#111827] tracking-tight">Executive Dashboard</h1>
                    <p className="mt-2 text-sm font-medium text-gray-500 tracking-wide underline decoration-[#D4AF37]/30">Premium Pilgrimage Operations Management</p>
                </div>
                <div className="flex items-center gap-4 bg-white px-5 py-2.5 rounded-xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
                    <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                        <span className="text-xs font-black text-gray-700 uppercase tracking-widest">Global Ops Online</span>
                    </div>
                </div>
            </motion.div>

            {/* Majestic Metrics Row */}
            <div className="grid gap-6 md:grid-cols-3">
                {/* Metric 1 - Midnight Gold */}
                <motion.div 
                    variants={itemVariants}
                    whileHover={{ y: -5 }}
                    className="bg-[#0B0F19]  rounded-xl p-8 text-white shadow-2xl relative overflow-hidden group border border-white/5"
                >
                    <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-[#D4AF37]/20 to-transparent rounded-bl-full pointer-events-none transition-transform duration-1000 group-hover:scale-125"></div>
                    
                    <div className="flex justify-between items-start mb-10 relative z-10">
                        <div className="w-14 h-14 bg-[#616B7B] rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                            <Users size={28} className="text-white" />
                        </div>
                        <div className="px-3 py-1.5 bg-[#D4AF37]/20 text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.2em] rounded-full border border-[#D4AF37]/20">
                            +12.5% Growth
                        </div>
                    </div>

                    <div className="relative z-10">
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-[0.3em] mb-2">Active Inquiries</p>
                        <h2 className="text-6xl font-manrope font-black tracking-tighter text-[#D4AF37]">{metrics?.activeInquiries || '0'}</h2>
                    </div>
                </motion.div>

                {/* Metric 2 - Sacred Emerald */}
                <motion.div 
                    variants={itemVariants}
                    whileHover={{ y: -5 }}
                    className="bg-white  rounded-xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-[#10B981]/10 relative overflow-hidden group"
                >
                    <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-[#10B981]/10 to-transparent rounded-bl-full pointer-events-none group-hover:scale-125 transition-transform duration-1000"></div>
                    
                    <div className="flex justify-between items-start mb-10 relative z-10">
                        <div className="w-14 h-14 bg-[#636569] rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                            <DollarSign size={28} className="text-white" />
                        </div>
                        <div className="px-3 py-1.5 bg-[#10B981]/10 text-[#10B981] text-[10px] font-black uppercase tracking-[0.2em] rounded-full border border-[#10B981]/20">
                            +8.2% Revenue
                        </div>
                    </div>

                    <div className="relative z-10">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.3em] mb-2 text-emerald-900/40">Total Secured</p>
                        <h2 className="text-6xl font-manrope font-black tracking-tighter text-[#111827] group-hover:text-[#10B981] transition-colors">{metrics?.revenue || '$0'}</h2>
                    </div>
                </motion.div>

                {/* Metric 3 - Royal Blue */}
                <motion.div 
                    variants={itemVariants}
                    whileHover={{ y: -5 }}
                    className="bg-white  rounded-xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-[#3B82F6]/10 relative overflow-hidden group"
                >
                    <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-[#3B82F6]/10 to-transparent rounded-bl-full pointer-events-none group-hover:scale-125 transition-transform duration-1000"></div>
                    
                    <div className="flex justify-between items-start mb-10 relative z-10">
                        <div className="w-14 h-14 bg-[#726888] rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                            <Plane size={28} className="text-white" />
                        </div>
                        <div className="px-3 py-1.5 bg-[#3B82F6]/10 text-[#3B82F6] text-[10px] font-black uppercase tracking-[0.2em] rounded-full">
                            Stable Ops
                        </div>
                    </div>

                    <div className="relative z-10">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.3em] mb-2 text-blue-900/40">Live Flights</p>
                        <h2 className="text-6xl font-manrope font-black tracking-tighter text-[#111827] group-hover:text-[#3B82F6] transition-colors">{metrics?.liveFlights || '0'}</h2>
                    </div>
                </motion.div>
            </div>

            {/* Main Analytical Section */}
            <div className="grid gap-6 md:grid-cols-1 xl:grid-cols-3">
                {/* Performance Matrix */}
                <motion.div variants={itemVariants} className="xl:col-span-2 bg-white  rounded-xl p-8 shadow-sm border border-gray-100 flex flex-col">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                        <div>
                            <h3 className="text-2xl font-manrope font-black text-[#111827] tracking-tighter leading-none mb-2">Performance Matrix</h3>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Global Hajj & Umrah Booking Flow</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex p-1 bg-gray-50 rounded-xl border border-gray-200">
                                {['Weekly', 'Monthly', 'Yearly'].map(filter => (
                                    <button
                                        key={filter}
                                        onClick={() => setTimeFilter(filter)}
                                        className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${timeFilter === filter
                                            ? 'bg-white text-[#111827] shadow-xl border border-gray-100'
                                            : 'text-gray-400 hover:text-[#111827]'
                                            }`}
                                    >
                                        {filter}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 w-full mt-2">
                        <BarChart
                            series={[
                                { data: chartData[timeFilter].umrah, label: 'Premium Umrah', color: '#D4AF37' },
                                { data: chartData[timeFilter].hajj, label: 'Standard Hajj', color: '#111827' },
                            ]}
                            xAxis={[{
                                data: chartData[timeFilter].categories,
                                scaleType: 'band',
                                categoryGapRatio: 0.35,
                                barGapRatio: 0.1
                            }]}
                            height={350}
                            grid={{ horizontal: true }}
                            margin={{ top: 50, bottom: 25, left: 40, right: 20 }}
                            slotProps={{ 
                                legend: { 
                                    direction: 'row',
                                    position: { vertical: 'top', horizontal: 'right' },
                                    itemMarkWidth: 12,
                                    itemMarkHeight: 12,
                                    markGap: 8,
                                    itemGap: 24,
                                    labelStyle: { fontSize: 13, fontWeight: 700, fill: '#374151' }
                                }
                            }}
                            sx={{
                                '& .MuiChartsAxis-bottom .MuiChartsAxis-line': { stroke: '#E5E7EB', strokeWidth: 1.5 },
                                '& .MuiChartsAxis-bottom .MuiChartsAxis-tick': { stroke: '#E5E7EB' },
                                '& .MuiChartsAxis-bottom .MuiChartsAxis-tickLabel': { fill: '#6B7280', fontFamily: 'Inter', fontSize: 11, fontWeight: 600 },
                                '& .MuiChartsAxis-left .MuiChartsAxis-line': { stroke: 'transparent' },
                                '& .MuiChartsAxis-left .MuiChartsAxis-tick': { stroke: 'transparent' },
                                '& .MuiChartsAxis-left .MuiChartsAxis-tickLabel': { fill: '#9CA3AF', fontFamily: 'Inter', fontSize: 11, fontWeight: 600 },
                                '& .MuiChartsGrid-line': { stroke: '#F3F4F6', strokeDasharray: '4 4', strokeWidth: 1.5 },
                                '& .MuiBarElement-root': { transition: 'all 0.3s ease', cursor: 'pointer', rx: 4 },
                                '& .MuiBarElement-root:hover': { filter: 'brightness(1.15)', transform: 'translateY(-2px)' },
                            }}
                        />
                    </div>
                </motion.div>

                {/* Sources Matrix - PIE CHART */}
                <motion.div variants={itemVariants} className="xl:col-span-1 bg-white  rounded-xl p-8 shadow-sm border border-gray-100 flex flex-col relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/5 rounded-bl-[4rem] group-hover:scale-110 transition-transform duration-1000"></div>
                    
                    <div className="mb-8 relative z-10">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gray-50 border border-gray-100 rounded-full text-[9px] font-black text-[#D4AF37] uppercase tracking-widest mb-6">
                            <ShieldCheck size={14} /> Global Entry Matrix
                        </div>
                        <h3 className="text-3xl font-manrope font-black tracking-tighter leading-none mb-3 text-[#111827]">Acquisition</h3>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Inquiry Source Distribution</p>
                    </div>

                    <div className="flex-1 w-full flex flex-col items-center justify-center relative z-10">
                        <div className="w-full h-[220px] relative mt-4">
                            <PieChart
                                series={[
                                    {
                                        data: pieData,
                                    },
                                ]}
                                margin={{ top: 0, bottom: 0, left: 0, right: 0 }}
                                slotProps={{ legend: { hidden: true } }}
                            />
                        </div>

                        {/* Custom Legend */}
                        <div className="w-full grid grid-cols-2 gap-y-4 gap-x-6 pt-10 px-2">
                            {pieData.map((item) => (
                                <div key={item.label} className="flex flex-col gap-1 transition-all hover:translate-x-1">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.color }}></div>
                                            <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">{item.label}</span>
                                        </div>
                                        <span className="text-xs font-black text-[#D4AF37]">{item.value}%</span>
                                    </div>
                                    <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                                        <div className="h-full rounded-full" style={{ width: `${item.value}%`, backgroundColor: item.color, opacity: 0.8 }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Regional & Activity Hub */}
            <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-5">
                {/* Regional Progress */}
                <motion.div variants={itemVariants} className="lg:col-span-2 bg-white  rounded-xl p-10 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-10">
                        <div>
                            <h3 className="text-2xl font-manrope font-black text-[#111827] tracking-tighter leading-none mb-2">Regional Dominance</h3>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Operation volume by key centers</p>
                        </div>
                        <MapPin size={28} className="text-[#D4AF37]/20" />
                    </div>

                    <div className="space-y-8">
                        {regions.map((region, idx) => (
                            <div key={idx} className="space-y-3">
                                <div className="flex justify-between items-end">
                                    <div className="flex items-center gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: region.color }}></div>
                                        <span className="text-sm font-black text-gray-800 uppercase tracking-wider">{region.name}</span>
                                    </div>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-lg font-manrope font-black text-[#111827]">{region.leads}</span>
                                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Leads</span>
                                    </div>
                                </div>
                                <div className="h-3 w-full bg-gray-50 rounded-full overflow-hidden border border-gray-100">
                                    <motion.div 
                                        initial={{ width: 0 }}
                                        animate={{ width: `${region.value}%` }}
                                        transition={{ duration: 1.5, ease: "circOut" }}
                                        className="h-full rounded-full shadow-[0_0_15px_rgba(0,0,0,0.1)]"
                                        style={{ backgroundColor: region.color }}
                                    ></motion.div>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* System Pulse Feed */}
                <motion.div variants={itemVariants} className="lg:col-span-3 bg-white  rounded-xl p-10 shadow-sm border border-gray-100 flex flex-col">
                    <div className="flex items-center justify-between mb-10">
                        <div>
                            <h3 className="text-2xl font-manrope font-black text-[#111827] tracking-tighter leading-none mb-2">System Pulse</h3>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Real-time operational updates</p>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 bg-[#10B981]/5 rounded-full border border-[#10B981]/10">
                            <span className="w-2 h-2 bg-[#10B981] rounded-full animate-ping"></span>
                            <span className="text-[10px] font-black text-[#10B981] uppercase tracking-[0.2em]">Live Stream</span>
                        </div>
                    </div>

                    <div className="flex-1 space-y-6 max-h-[350px] overflow-y-auto pr-4 custom-scrollbar">
                        {isLoading ? (
                            <div className="flex flex-col items-center justify-center h-full py-10 opacity-50">
                                <Activity className="animate-spin text-[#D4AF37] mb-4" size={40} />
                                <p className="text-xs font-black uppercase tracking-widest text-gray-400">Fetching operations...</p>
                            </div>
                        ) : activities.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full py-10 opacity-50">
                                <Activity className="text-gray-300 mb-4" size={40} />
                                <p className="text-xs font-black uppercase tracking-widest text-gray-400">No recent activities</p>
                            </div>
                        ) : (
                            activities.map((act) => (
                                <div key={act.id} className="flex items-start gap-6 p-5  rounded-xl hover:bg-gray-50 transition-all border border-transparent hover:border-gray-100 group cursor-default">
                                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${act.status === 'success' ? 'bg-[#10B981]/5 text-[#10B981]' :
                                        act.status === 'warning' ? 'bg-orange-50 text-orange-600' : 'bg-blue-50 text-blue-600'
                                        }`}>
                                        {act.status === 'success' ? <CheckCircle2 size={24} /> :
                                            act.status === 'warning' ? <AlertCircle size={24} /> : <Activity size={24} />}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-base font-black text-[#111827] tracking-tight mb-1">{act.title}</h4>
                                        <p className="text-sm text-gray-500 font-medium">{act.desc}</p>
                                    </div>
                                    <div className="text-right shrink-0">
                                        <p className="text-[10px] font-black text-[#D4AF37] uppercase tracking-[0.2em] mb-1">{act.time}</p>
                                        <Clock size={14} className="ml-auto text-gray-300" />
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </motion.div>
            </div>

            {/* Global Actions */}
            {/* <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: 'Register Lead', desc: 'New operational inquiry', icon: Plus, color: '#D4AF37' },
                    { label: 'Generate Quote', desc: 'Pricing & package matrix', icon: Calculator, color: '#111827' },
                    { label: 'Booking Matrix', desc: 'Inventory orchestration', icon: Calendar, color: '#10B981' },
                    { label: 'Global Network', desc: 'Agent & partner matrix', icon: Globe, color: '#3B82F6' }
                ].map((action, idx) => (
                    <Link
                        key={idx}
                        to="#"
                        className="bg-white p-8  rounded-xl border border-gray-100 shadow-sm hover:shadow-2xl hover:border-transparent transition-all group relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-24 h-24 bg-gray-50 rounded-bl-[4rem] -translate-x-2 -translate-y-2 group-hover:bg-[#111827] group-hover:scale-110 transition-all duration-500"></div>
                        <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-[#A5413D] text-white group-hover:scale-110 transition-all duration-500 relative z-10 shadow-lg">
                            <action.icon size={28} />
                        </div>
                        <div className="mt-6 relative z-10">
                            <h4 className="text-lg font-black text-[#111827] group-hover:text-[#D4AF37] transition-colors mb-2 tracking-tight">{action.label}</h4>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-relaxed">{action.desc}</p>
                        </div>
                    </Link>
                ))}
            </motion.div> */}

        </motion.div>
    );
};

export default Home;

