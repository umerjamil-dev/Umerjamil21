import React from 'react';
import {
   BarChart3, PieChart, TrendingUp,
   TrendingDown, Calendar, Download,
   Filter, ArrowUpRight, ArrowDownRight,
   Users, DollarSign, Briefcase, 
   Award, Globe, Zap,
   MapPin
} from 'lucide-react';

const Reports = () => {
   const stats = [
      { label: 'Gross Revenue', value: '$428,500', growth: '+12.5%', icon: DollarSign, color: 'text-emerald-500', trend: 'up' },
      { label: 'Active Bookings', value: '1,240', growth: '+5.2%', icon: Briefcase, color: 'text-blue-500', trend: 'up' },
      { label: 'Retention Rate', value: '94.2%', growth: '-0.4%', icon: Users, color: 'text-indigo-500', trend: 'down' },
      { label: 'Avg. Deal Value', value: '$3,450', growth: '+2.1%', icon: Award, color: 'text-[var(--desert-gold)]', trend: 'up' },
   ];

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
                  Operational <span className="text-slate-300 italic font-light font-manrope">Intelligence</span>
               </h1>
               <p className="text-slate-500 text-sm font-medium max-w-xl leading-relaxed">
                  High-fidelity analytical insights derived from real-time global operations, financial manifests, and pilgrim satisfaction indices.
               </p>
            </div>
            <div className="flex items-center gap-4">
               <button className="flex items-center gap-3 px-8 py-5 bg-white border border-slate-200 rounded-xl text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-black hover:border-slate-300 transition-all group shadow-sm">
                  <Calendar size={18} strokeWidth={3} /> Quarterly View
               </button>
               <button className="px-10 py-5 bg-black text-white rounded-xl text-[10px] font-black uppercase tracking-[0.4em] shadow-xl hover:bg-[var(--desert-gold)] hover:text-black transition-all flex items-center gap-3">
                  <Download size={18} strokeWidth={3} />
                  Export Intelligence
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
                     <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                        stat.trend === 'up' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-red-50 text-red-600 border border-red-100'
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

         {/* Deep Analysis Bento */}
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Sales Velocity Chart Placeholder */}
            <div className="lg:col-span-8 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden relative group">
               <div className="p-10 border-b border-slate-100 flex items-center justify-between bg-slate-50/20">
                  <div>
                     <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.4em] flex items-center gap-3 mb-2">
                        <TrendingUp size={16} strokeWidth={3} className="text-emerald-500" /> Revenue Trajectory
                     </h3>
                     <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-7">Monthly conversion delta: +14.2%</p>
                  </div>
                  <div className="flex items-center gap-3">
                     {['Volume', 'Yield'].map(t => (
                        <button key={t} className="px-5 py-2 rounded-full border border-slate-200 text-[8px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all">
                           {t}
                        </button>
                     ))}
                  </div>
               </div>
               
               <div className="h-[380px] p-10 flex items-end gap-3 relative">
                  <div className="absolute inset-0 bg-slate-50/30 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  {/* Mock Chart Bars */}
                  {[45, 62, 48, 75, 52, 88, 72, 95, 65, 82, 58, 70].map((h, i) => (
                     <div key={i} className="flex-1 group/bar relative">
                        <div 
                           className={`w-full rounded-t-lg transition-all duration-1000 group-hover/bar:bg-black ease-out relative z-10 ${
                              i === 7 ? 'bg-[var(--desert-gold)] shadow-[0_-10px_20px_rgba(212,175,55,0.2)]' : 'bg-slate-100'
                           }`}
                           style={{ height: `${h}%` }}
                        >
                           <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black text-white text-[8px] font-black px-2 py-1 rounded opacity-0 group-hover/bar:opacity-100 transition-opacity uppercase tracking-widest pointer-events-none">
                              {h}k
                           </div>
                        </div>
                        <div className="mt-4 text-[8px] font-black text-slate-300 text-center uppercase tracking-tighter">
                           {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i]}
                        </div>
                     </div>
                  ))}
               </div>
            </div>

            {/* Service Distribution */}
            <div className="lg:col-span-4 bg-black rounded-xl p-10 text-white shadow-2xl relative overflow-hidden flex flex-col justify-between group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-[5rem] group-hover:scale-110 transition-transform duration-700"></div>
               
               <div>
                  <h3 className="text-[11px] font-black text-white/30 uppercase tracking-[0.4em] mb-12 relative z-10 flex items-center gap-3">
                     <PieChart size={18} strokeWidth={3} className="text-[var(--desert-gold)]" /> Sector Allocation
                  </h3>
                  
                  <div className="space-y-8 relative z-10">
                     {[
                        { label: 'Umrah Premium', value: '42%', color: 'bg-[var(--desert-gold)]' },
                        { label: 'Hajj Institutional', value: '28%', color: 'bg-white' },
                        { label: 'Global Ticketing', value: '18%', color: 'bg-emerald-500' },
                        { label: 'Ground Logistics', value: '12%', color: 'bg-slate-700' }
                     ].map((item, idx) => (
                        <div key={idx} className="group/item cursor-pointer">
                           <div className="flex justify-between items-center mb-4">
                              <span className="text-[10px] font-black uppercase tracking-widest text-white/60 group-hover/item:text-white transition-colors">{item.label}</span>
                              <span className="text-sm font-black text-white">{item.value}</span>
                           </div>
                           <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                              <div className={`h-full ${item.color} rounded-full transition-all duration-1000`} style={{ width: item.value }}></div>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>

               <button className="w-full mt-12 py-5 bg-white/10 border border-white/10 rounded-xl text-[10px] font-black text-white uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all relative z-10">
                  Segmentation Audit
               </button>
            </div>
         </div>

         {/* Service KPIs */}
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {[
               { title: 'Visa Efficiency', value: '98.8%', desc: 'Avg. processing latency: 18h', icon: Globe },
               { title: 'Hotel Occupancy', value: '84.2%', desc: 'Projected Mar load: 92%', icon: MapPin },
               { title: 'Staff Performance', value: '4.9/5', desc: 'Based on 840 pilgrim reviews', icon: Award }
            ].map((kpi, idx) => (
               <div key={idx} className="bg-white rounded-xl p-10 border border-slate-200 shadow-sm group hover:border-black transition-all">
                  <div className="flex items-center gap-4 mb-8">
                     <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-100 text-slate-900 group-hover:bg-black group-hover:text-white transition-all">
                        <kpi.icon size={22} strokeWidth={2.5} />
                     </div>
                     <div>
                        <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest">{kpi.title}</h4>
                     </div>
                  </div>
                  <div className="space-y-2">
                     <p className="text-4xl font-manrope font-black text-slate-900 tracking-tighter">{kpi.value}</p>
                     <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> {kpi.desc}
                     </p>
                  </div>
               </div>
            ))}
         </div>
      </div>
   );
};

export default Reports;
