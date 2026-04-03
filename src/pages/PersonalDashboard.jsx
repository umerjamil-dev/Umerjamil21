import React, { useMemo } from 'react';
import { BarChart, PieChart, LineChart } from '@mui/x-charts';
import { motion } from 'framer-motion';
import {
    User, Target, Zap, TrendingUp,
    MessageSquare, Briefcase, Award, Activity, 
    ArrowUpRight, Clock, CheckCircle2, ChevronRight,
    Star, Gem, Sparkles
} from 'lucide-react';
import useAuthStore from '../store/useAuthStore';

const PersonalDashboard = () => {
    const { user } = useAuthStore();

    // Personal performance data (Mock placeholders - actual data would come from store)
    const personalStats = {
        totalLeads: 42,
        conversionRate: '18%',
        activeTasks: 12,
        achievements: 4
    };

    const momentumData = [
        { month: 'Jan', velocity: 12 },
        { month: 'Feb', velocity: 15 },
        { month: 'Mar', velocity: 22 },
        { month: 'Apr', velocity: 18 },
        { month: 'May', velocity: 28 },
        { month: 'Jun', velocity: 35 },
    ];

    const taskDistribution = [
        { id: 0, value: 45, label: 'Umrah', color: '#D4AF37' }, // Premium Gold
        { id: 1, value: 25, label: 'Hajj', color: '#111827' }, // Midnight
        { id: 2, value: 20, label: 'Transport', color: '#10B981' }, // Emerald
        { id: 3, value: 10, label: 'Other', color: '#3B82F6' }, // Blue
    ];

    const timeline = [
        { id: 1, action: 'Quote Generated', target: 'Ali Hamza (Umrah)', time: '12m ago', type: 'success' },
        { id: 2, action: 'Lead Follow-up', target: 'Fatima Zaid', time: '1h ago', type: 'warning' },
        { id: 3, action: 'Booking Confirmed', target: 'Oman Group #12', time: '4h ago', type: 'success' },
        { id: 4, action: 'Task Completed', target: 'Visa Verification', time: '6h ago', type: 'info' },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } }
    };

    return (
        <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-10 font-inter mx-auto pb-20 pt-6"
        >
            {/* Minimalist Welcome Header */}
            <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.4em] mb-2">
                       <Sparkles size={14} strokeWidth={2.5} />
                       Personal Nexus
                    </div>
                    <h1 className="text-5xl font-manrope font-extrabold text-[#111827] tracking-tight leading-none">
                        Salam, <span className="text-[#D4AF37]">{user?.name?.split(' ')[0] || 'Member'}</span>
                    </h1>
                    <p className="text-gray-400 text-sm font-medium tracking-wide">
                        Your operational momentum is currently <span className="text-[#10B981] font-bold">Peak</span>. 
                    </p>
                </div>
                
                <div className="flex items-center gap-4">
                    <div className="px-6 py-3 bg-white border border-gray-100 rounded-2xl shadow-sm flex items-center gap-4 group cursor-pointer hover:border-[#D4AF37] transition-all">
                        <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-[#D4AF37] group-hover:bg-[#111827] transition-colors">
                            <Award size={20} />
                        </div>
                        <div className="pr-4">
                            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Rank</p>
                            <p className="text-sm font-black text-[#111827] uppercase tracking-tighter">Gold Affiliate</p>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Micro-Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: 'My Leads', val: personalStats.totalLeads, icon: Target, color: '#111827', sub: '+5 this week' },
                    { label: 'Win Rate', val: personalStats.conversionRate, icon: TrendingUp, color: '#10B981', sub: 'Top 5% of Team' },
                    { label: 'Queue', val: personalStats.activeTasks, icon: Briefcase, color: '#D4AF37', sub: 'Next: Verification' },
                    { label: 'Pulse', val: personalStats.achievements, icon: Zap, color: '#3B82F6', sub: 'Streak: 12 Days' },
                ].map((stat, i) => (
                    <motion.div 
                        key={i}
                        variants={itemVariants}
                        whileHover={{ y: -6 }}
                        className="bg-white p-7 rounded-2xl border border-gray-100 shadow-[0_4px_25px_rgba(0,0,0,0.02)] group transition-all relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-24 h-24 bg-gray-50 translate-x-12 -translate-y-12 rotate-45 group-hover:bg-[#111827]/5 transition-colors"></div>
                        <div className="flex justify-between items-start mb-6 relative z-10">
                            <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-sm border border-gray-50 bg-white group-hover:scale-110 transition-transform">
                                <stat.icon size={22} style={{ color: stat.color }} />
                            </div>
                            <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{stat.sub}</div>
                        </div>
                        <div className="relative z-10">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">{stat.label}</p>
                            <h3 className="text-3xl font-manrope font-black text-[#111827] tracking-tighter group-hover:text-[#D4AF37] transition-colors">{stat.val}</h3>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Personal Analytical Core */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* My Momentum Chart */}
                <motion.div variants={itemVariants} className="xl:col-span-2 bg-white rounded-3xl p-10 border border-gray-100 shadow-sm flex flex-col relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-gray-50/50 rounded-bl-full pointer-events-none"></div>
                    <div className="flex justify-between items-start mb-10 relative z-10">
                        <div>
                            <h3 className="text-2xl font-manrope font-black text-[#111827] tracking-tighter mb-1">My Momentum</h3>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Monthly Operational Flow</p>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full text-[10px] font-black text-[#111827] uppercase tracking-widest">
                            <Activity size={14} className="text-[#D4AF37]" /> Live Track
                        </div>
                    </div>
                    
                    <div className="flex-1 w-full min-h-[300px]">
                        <LineChart
                            xAxis={[{ 
                                data: momentumData.map(d => d.month), 
                                scaleType: 'point',
                                tickLabelStyle: { fontSize: 11, fontWeight: 700, fill: '#9CA3AF', fontFamily: 'Inter' }
                            }]}
                            series={[
                                {
                                    data: momentumData.map(d => d.velocity),
                                    area: true,
                                    color: '#D4AF37',
                                    showMark: true,
                                },
                            ]}
                            height={300}
                            margin={{ top: 20, bottom: 40, left: 30, right: 30 }}
                            sx={{
                                '& .MuiAreaElement-root': {
                                    fill: 'url(#momentumGradient)',
                                    fillOpacity: 0.2,
                                },
                                '& .MuiLineElement-root': {
                                    strokeWidth: 4,
                                    strokeLinecap: 'round',
                                },
                            }}
                        >
                            <defs>
                                <linearGradient id="momentumGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#D4AF37" />
                                    <stop offset="100%" stopColor="white" />
                                </linearGradient>
                            </defs>
                        </LineChart>
                    </div>
                </motion.div>

                {/* Portfolio Distribution */}
                <motion.div variants={itemVariants} className="xl:col-span-1 bg-white rounded-3xl p-10 border border-gray-100 shadow-sm flex flex-col group relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-32 h-32 bg-[#D4AF37]/5 rounded-br-full pointer-events-none"></div>
                    <div className="mb-10 relative z-10">
                        <h3 className="text-2xl font-manrope font-black text-[#111827] tracking-tighter mb-1 text-center">Portfolio Mix</h3>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] text-center">Lead Volume by Category</p>
                    </div>
                    
                    <div className="flex-1 flex flex-col items-center justify-center gap-10 relative z-10">
                        <div className="w-full h-[220px] relative">
                            <PieChart
                            className='relative'
                                series={[
                                    {
                                        data: taskDistribution,
                                        innerRadius: 80,
                                        outerRadius: 100,
                                        paddingAngle: 5,
                                        cornerRadius: 10,
                                        cx: '50%',
                                        cy: '50%',
                                    },
                                ]}
                                margin={{ top: 0, bottom: 0, left: 0, right: 0 }}
                                slotProps={{ legend: { hidden: true } }}
                            />
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  text-center pointer-events-none">
                                <p className="text-2xl font-manrope font-black text-[#111827]">70%</p>
                                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Efficiency</p>
                            </div>
                            {/* Center Summary */}
                        </div>

                        {/* Minimalist Legend */}
                        <div className="w-full grid grid-cols-2 gap-4">
                            {taskDistribution.map((item, idx) => (
                                <div key={idx} className="flex items-center gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.color }}></div>
                                    <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">{item.label}</span>
                                    <span className="text-xs font-bold text-[#D4AF37] ml-auto">{item.value}%</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* System Pulse - Timeline */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <motion.div variants={itemVariants} className="bg-white rounded-3xl p-10 border border-gray-100 shadow-sm flex flex-col">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-2xl font-manrope font-black text-[#111827] tracking-tighter leading-none mb-1">My System Pulse</h3>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Timeline of your latest operations</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-[#111827]">
                            <Clock size={20} />
                        </div>
                    </div>

                    <div className="space-y-4">
                        {timeline.map((act) => (
                            <div key={act.id} className="flex items-center gap-6 p-4 rounded-2xl hover:bg-gray-50 transition-all border border-transparent hover:border-gray-100 group">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${
                                    act.type === 'success' ? 'bg-[#10B981]/5 text-[#10B981]' : 
                                    act.type === 'warning' ? 'bg-orange-50 text-orange-600' : 'bg-blue-50 text-blue-600'
                                }`}>
                                    {act.type === 'success' ? <CheckCircle2 size={20} /> : <Activity size={20} />}
                                </div>
                                <div className="flex-1">
                                    <p className="text-[10px] font-black text-[#D4AF37] uppercase tracking-[0.2em] mb-1">{act.time}</p>
                                    <h4 className="text-sm font-black text-[#111827] tracking-tight">{act.action}: {act.target}</h4>
                                </div>
                                <ChevronRight size={16} className="text-gray-300 group-hover:text-[#D4AF37] transition-all group-hover:translate-x-1" />
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Quick Access Grid */}
                <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
                    {[
                        { title: 'My Profile', icon: User, color: '#111827', path: '/settings/profile' },
                        { title: 'Lead Target', icon: Target, color: '#D4AF37', path: '/leads' },
                        { title: 'Task Queue', icon: Briefcase, color: '#10B981', path: '/operations' },
                        { title: 'System Feed', icon: Activity, color: '#3B82F6', path: '/reports' }
                    ].map((item, idx) => (
                        <div key={idx} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center justify-center gap-6 hover:shadow-xl hover:border-[#D4AF37]/50 transition-all cursor-pointer group group relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-16 h-16 bg-gray-50 rounded-bl-3xl group-hover:bg-[#111827]/5 transition-colors"></div>
                            <div className="w-14 h-14 rounded-2xl flex items-center justify-center border border-gray-50 shadow-sm bg-white group-hover:scale-110 transition-transform">
                                <item.icon size={26} style={{ color: item.color }} />
                            </div>
                            <h4 className="text-xs font-black text-[#111827] uppercase tracking-[0.2em] group-hover:text-[#D4AF37] transition-colors">{item.title}</h4>
                        </div>
                    ))}
                </motion.div>
            </div>
        </motion.div>
    );
};

export default PersonalDashboard;
