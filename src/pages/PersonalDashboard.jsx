import React from 'react';
import { PieChart, LineChart } from '@mui/x-charts';
import { motion } from 'framer-motion';
import {
  User,
  Target,
  Zap,
  TrendingUp,
  Briefcase,
  Award,
  Activity,
  Clock,
  CheckCircle2,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import useAuthStore from '../store/useAuthStore';

const PersonalDashboard = () => {
  const { user } = useAuthStore();

  const personalStats = {
    totalLeads: 42,
    conversionRate: '18%',
    activeTasks: 12,
    achievements: 4,
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
    { id: 0, value: 45, label: 'Umrah', color: '#D4AF37' },
    { id: 1, value: 25, label: 'Hajj', color: '#111827' },
    { id: 2, value: 20, label: 'Transport', color: '#10B981' },
    { id: 3, value: 10, label: 'Other', color: '#3B82F6' },
  ];

  const timeline = [
    { id: 1, action: 'Quote Generated', target: 'Ali Hamza (Umrah)', time: '12m ago', type: 'success' },
    { id: 2, action: 'Lead Follow-up', target: 'Fatima Zaid', time: '1h ago', type: 'warning' },
    { id: 3, action: 'Booking Confirmed', target: 'Oman Group #12', time: '4h ago', type: 'success' },
    { id: 4, action: 'Task Completed', target: 'Visa Verification', time: '6h ago', type: 'info' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };

  const itemVariants = {
    hidden: { y: 16, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.45, ease: 'easeOut' } },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="mx-auto max-w-[1600px] space-y-8 px-4 sm:px-6 pb-16 pt-6 font-inter"
    >
      {/* Header */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between"
      >
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-[#D4AF37] text-[10px] font-extrabold uppercase tracking-[0.35em]">
            <Sparkles size={14} strokeWidth={2.5} />
            Personal Nexus
          </div>

          <div>
            <h1 className="text-4xl md:text-5xl font-manrope font-extrabold text-[#111827] tracking-tight leading-none">
              Salam,{' '}
              <span className="text-[#D4AF37]">
                {user?.name?.split(' ')[0] || 'Member'}
              </span>
            </h1>
            <p className="mt-2 text-sm font-medium text-gray-500">
              Your operational momentum is currently{' '}
              <span className="text-[#10B981] font-semibold">Peak</span>.
            </p>
          </div>
        </div>

        <div className="inline-flex items-center gap-4 rounded-2xl border border-gray-200 bg-white px-5 py-4 shadow-sm">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FFF8E1] text-[#D4AF37]">
            <Award size={20} />
          </div>
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-gray-400">
              Rank
            </p>
            <p className="text-sm font-extrabold uppercase tracking-tight text-[#111827]">
              Gold Affiliate
            </p>
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        {[
          { label: 'My Leads', val: personalStats.totalLeads, icon: Target, color: '#111827', sub: '+5 this week' },
          { label: 'Win Rate', val: personalStats.conversionRate, icon: TrendingUp, color: '#10B981', sub: 'Top 5% of Team' },
          { label: 'Queue', val: personalStats.activeTasks, icon: Briefcase, color: '#D4AF37', sub: 'Next: Verification' },
          { label: 'Pulse', val: personalStats.achievements, icon: Zap, color: '#3B82F6', sub: 'Streak: 12 Days' },
        ].map((stat, i) => (
          <motion.div
            key={i}
            variants={itemVariants}
            whileHover={{ y: -4 }}
            className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all"
          >
            <div className="mb-5 flex items-start justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-50 border border-gray-100">
                <stat.icon size={22} style={{ color: stat.color }} />
              </div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                {stat.sub}
              </span>
            </div>

            <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-gray-400 mb-1">
              {stat.label}
            </p>
            <h3 className="text-3xl font-manrope font-extrabold tracking-tight text-[#111827]">
              {stat.val}
            </h3>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Momentum */}
        <motion.div
          variants={itemVariants}
          className="xl:col-span-2 rounded-3xl border border-gray-200 bg-white p-6 md:p-8 shadow-sm"
        >
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-2xl font-manrope font-extrabold tracking-tight text-[#111827]">
                My Momentum
              </h3>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mt-1">
                Monthly Operational Flow
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-full bg-gray-50 px-4 py-2 text-[10px] font-extrabold uppercase tracking-widest text-[#111827]">
              <Activity size={14} className="text-[#D4AF37]" />
              Live Track
            </div>
          </div>

          <div className="w-full min-h-[300px]">
            <LineChart
              xAxis={[
                {
                  data: momentumData.map((d) => d.month),
                  scaleType: 'point',
                  tickLabelStyle: {
                    fontSize: 11,
                    fontWeight: 700,
                    fill: '#9CA3AF',
                    fontFamily: 'Inter',
                  },
                },
              ]}
              series={[
                {
                  data: momentumData.map((d) => d.velocity),
                  area: true,
                  color: '#D4AF37',
                  showMark: true,
                },
              ]}
              height={300}
              margin={{ top: 20, bottom: 35, left: 25, right: 20 }}
              sx={{
                '& .MuiAreaElement-root': {
                  fillOpacity: 0.12,
                },
                '& .MuiLineElement-root': {
                  strokeWidth: 3.5,
                  strokeLinecap: 'round',
                },
              }}
            />
          </div>
        </motion.div>

        {/* Portfolio */}
        <motion.div
          variants={itemVariants}
          className="rounded-3xl border border-gray-200 bg-white p-6 md:p-8 shadow-sm"
        >
          <div className="mb-8">
            <h3 className="text-2xl font-manrope font-extrabold tracking-tight text-[#111827] text-center">
              Portfolio Mix
            </h3>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 text-center mt-1">
              Lead Volume by Category
            </p>
          </div>

          <div className="flex flex-col items-center gap-8">
            <div className="w-full h-[220px] relative">
              <PieChart
                series={[
                  {
                    data: taskDistribution,
                    innerRadius: 75,
                    outerRadius: 95,
                    paddingAngle: 4,
                    cornerRadius: 8,
                    cx: '50%',
                    cy: '50%',
                  },
                ]}
                margin={{ top: 0, bottom: 0, left: 0, right: 0 }}
                slotProps={{ legend: { hidden: true } }}
              />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                <p className="text-2xl font-manrope font-extrabold text-[#111827]">70%</p>
                <p className="text-[9px] font-extrabold text-gray-400 uppercase tracking-widest">
                  Efficiency
                </p>
              </div>
            </div>

            <div className="w-full grid grid-cols-2 gap-3">
              {taskDistribution.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 rounded-xl bg-gray-50 px-3 py-3"
                >
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-[10px] font-extrabold text-gray-600 uppercase tracking-wider">
                    {item.label}
                  </span>
                  <span className="text-xs font-bold text-[#111827] ml-auto">
                    {item.value}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Timeline + Quick Access */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Timeline */}
        <motion.div
          variants={itemVariants}
          className="rounded-3xl border border-gray-200 bg-white p-6 md:p-8 shadow-sm"
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-2xl font-manrope font-extrabold tracking-tight text-[#111827]">
                My System Pulse
              </h3>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mt-1">
                Timeline of your latest operations
              </p>
            </div>
            <div className="w-11 h-11 rounded-xl bg-gray-50 flex items-center justify-center text-[#111827]">
              <Clock size={20} />
            </div>
          </div>

          <div className="space-y-4">
            {timeline.map((act) => (
              <div
                key={act.id}
                className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-gray-50/70 p-4 transition-all hover:bg-white hover:shadow-sm"
              >
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                    act.type === 'success'
                      ? 'bg-[#10B981]/10 text-[#10B981]'
                      : act.type === 'warning'
                      ? 'bg-orange-100 text-orange-600'
                      : 'bg-blue-100 text-blue-600'
                  }`}
                >
                  {act.type === 'success' ? (
                    <CheckCircle2 size={20} />
                  ) : (
                    <Activity size={20} />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-extrabold text-[#D4AF37] uppercase tracking-[0.2em] mb-1">
                    {act.time}
                  </p>
                  <h4 className="text-sm font-extrabold text-[#111827] tracking-tight truncate">
                    {act.action}
                  </h4>
                  <p className="text-xs text-gray-500 font-medium truncate">
                    {act.target}
                  </p>
                </div>

                <ChevronRight size={16} className="text-gray-300" />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quick Access */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-2 gap-4"
        >
          {[
            { title: 'My Profile', icon: User, color: '#111827', path: '/settings/profile' },
            { title: 'Lead Target', icon: Target, color: '#D4AF37', path: '/leads' },
            { title: 'Task Queue', icon: Briefcase, color: '#10B981', path: '/operations' },
            { title: 'System Feed', icon: Activity, color: '#3B82F6', path: '/reports' },
          ].map((item, idx) => (
            <div
              key={idx}
              className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm flex flex-col items-center justify-center gap-4 hover:shadow-md transition-all cursor-pointer"
            >
              <div className="w-14 h-14 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center">
                <item.icon size={24} style={{ color: item.color }} />
              </div>
              <h4 className="text-xs font-extrabold text-[#111827] uppercase tracking-[0.18em] text-center">
                {item.title}
              </h4>
            </div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PersonalDashboard;

