import React, { useState, useEffect } from 'react';
import {
   Truck, Users, MapPin,
   Clock, CheckCircle2, AlertCircle,
   Phone, Search, Filter,
   MoreHorizontal, Plus, Navigation,
   UserCheck, Calendar, Radio, Briefcase, Plane, Hotel
} from 'lucide-react';
import useOperationsStore from '../store/useOperationsStore';

const Operations = () => {
   const [activeTab, setActiveTab] = useState('Overview');
   const { staff, liveTasks, sectorSaturation, overview, fetchOperationsData, isLoading: opsLoading } = useOperationsStore();

   useEffect(() => {
      fetchOperationsData();
   }, [fetchOperationsData]);

    const staffData = staff || [];
    const taskData = liveTasks || [];
    const saturationData = sectorSaturation || [];
    const isLoading = opsLoading;

    const flightsToday = overview?.flights_today || 0;
    const hotelsToday = overview?.hotels_today || 0;
    const transportsToday = overview?.transports_today || 0;
    const staffActive = overview?.staff_active || 0;
    const pendingTasks = overview?.pending_tasks || 0;
    const completedTasks = overview?.completed_tasks || 0;
    const totalAssignments = overview?.total_assignments || 0;

    // Safe-accessors for nested API objects
    const getCustomerName = (t) => {
       if (!t.customer) return '—';
       if (typeof t.customer === 'string') return t.customer;
       return `${t.customer.firstName || ''} ${t.customer.lastName || ''}`.trim() || '—';
    };

    const getStaffName = (t) => {
       if (!t.staff) return 'Unassigned';
       if (typeof t.staff === 'string') return t.staff;
       return t.staff.name || '—';
    };


   return (
   <>
   
      <div className="space-y-12 animate-in fade-in duration-1000 font-inter pb-20">
         {/* Premium Header */}
         <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 pb-8 border-b border-slate-200">
            <div className="space-y-4">
               <div className="flex items-center gap-3 text-[var(--desert-gold)] uppercase tracking-[0.4em] text-[9px] font-black opacity-80">
                  <Navigation size={14} strokeWidth={3} />
                  KSA Ground Orchestration
               </div>
               <h1 className="text-5xl font-manrope font-extrabold text-slate-900 tracking-tighter leading-tight">
                  Abroad
               </h1>
               <p className="text-slate-500 text-sm font-medium max-w-xl leading-relaxed">
                  Real-time synchronization of ground staff, logistics, and pilgrim movements across the Saudi Arabian sectors.
               </p>
            </div>
            <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-xl border border-slate-100">
               {['Overview', 'Staff', 'Logistics'].map((tab) => (
                  <button
                     key={tab}
                     onClick={() => setActiveTab(tab)}
                     className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab
                           ? 'bg-black text-white shadow-lg'
                           : 'text-slate-400 hover:text-black'
                        }`}
                  >
                     {tab}
                  </button>
               ))}
               <button className="ml-4 px-6 py-3 bg-[var(--desert-gold)] text-black rounded-xl text-[10px] font-black uppercase tracking-widest shadow-md hover:shadow-xl transition-all flex items-center gap-2">
                  <Plus size={16} strokeWidth={3} /> Dispatch
               </button>
            </div>
         </div>

         {/* 1. Overview Section */}
         <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            <MetricCard title="Total Assignments" value={totalAssignments} icon={<Briefcase size={16}/>} />
            <MetricCard title="Pending Tasks" value={pendingTasks} icon={<Clock size={16}/>} color="text-amber-500" bg="bg-amber-50" border="border-amber-100" />
            <MetricCard title="Completed Tasks" value={completedTasks} icon={<CheckCircle2 size={16}/>} color="text-emerald-500" bg="bg-emerald-50" border="border-emerald-100" />
            <MetricCard title="Flights Today" value={flightsToday} icon={<Plane size={16}/>} color="text-blue-500" bg="bg-blue-50" border="border-blue-100" />
            <MetricCard title="Hotels Today" value={hotelsToday} icon={<Hotel size={16}/>} color="text-indigo-500" bg="bg-indigo-50" border="border-indigo-100" />
            <MetricCard title="Transports Today" value={transportsToday} icon={<Truck size={16}/>} color="text-purple-500" bg="bg-purple-50" border="border-purple-100" />
            <MetricCard title="Staff Active" value={staffActive} icon={<UserCheck size={16}/>} color="text-[var(--desert-gold)]" bg="bg-[var(--desert-gold)]/10" border="border-[var(--desert-gold)]/20" />
         </div>

         {/* Operational Bento Grid */}
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Live Movement Feed */}
            <div className="lg:col-span-8 space-y-10">
               <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                  <div className="p-10 border-b border-slate-100 bg-slate-50/30 flex items-center justify-between">
                     <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.4em] flex items-center gap-3">
                        <Radio size={18} className="text-red-500 animate-pulse" /> Live Deployment Feed
                     </h3>
                     <div className="flex items-center gap-4">
                        <span className="flex items-center gap-2 text-[9px] font-black text-slate-400 uppercase tracking-widest">
                           <span className="w-2 h-2 rounded-full bg-emerald-500"></span> 12 Active
                        </span>
                        <button className="p-3 bg-white border border-slate-200 rounded-xl hover:border-black transition-all">
                           <Filter size={14} />
                        </button>
                     </div>
                  </div>

                  <div className="divide-y divide-slate-100">
                     {isLoading ? (
                        <div className="p-20 text-center text-sm font-bold uppercase tracking-widest text-slate-400 opacity-50 text-black">Synchronizing Deployment Vectors...</div>
                     ) : taskData.length === 0 ? (
                        <div className="p-20 text-center text-sm font-bold uppercase tracking-widest text-slate-400 opacity-50 text-black">No active deployments detected.</div>
                     ) : taskData.map((task) => (
                        <div key={task.id} className="p-10 group hover:bg-slate-50 transition-all cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-8">
                           <div className="flex items-center gap-8">
                              <div className={`w-16 h-16 rounded-xl flex items-center justify-center border transition-all ${task.status === 'In Transit' ? 'bg-blue-50 border-blue-100 text-blue-500' :
                                    task.status === 'Completed' ? 'bg-emerald-50 border-emerald-100 text-emerald-500' :
                                       'bg-red-50 border-red-100 text-red-500'
                                 }`}>
                                 {task.service.includes('Pickup') ? <Truck size={28} strokeWidth={2} /> :
                                    task.service.includes('Ziyarat') ? <Users size={28} strokeWidth={2} /> :
                                       <MapPin size={28} strokeWidth={2} />}
                              </div>
                              <div>
                                 <p className="text-xl font-manrope font-black text-slate-900 tracking-tight leading-none mb-2">
                                    {getCustomerName(task)}
                                 </p>
                                 <div className="flex items-center gap-4 text-[10px] text-slate-400 font-black uppercase tracking-widest">
                                    <span className="text-black">{task.service || 'Operational task'}</span>
                                    <span>•</span>
                                    <span>{task.id}</span>
                                 </div>
                              </div>
                           </div>

                           <div className="flex items-center gap-12">
                              <div className="text-right hidden md:block">
                                 <p className="text-[10px] font-black text-slate-900 uppercase tracking-widest mb-1">
                                    {getStaffName(task)}
                                 </p>
                                 <p className="text-[9px] text-slate-400 uppercase tracking-widest">Assigned Staff</p>
                              </div>
                              <div className="min-w-[140px]">
                                 <div className={`flex items-center justify-center gap-3 px-5 py-3 rounded-full border text-[9px] font-black uppercase tracking-widest ${task.status === 'In Transit' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                                       task.status === 'Completed' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                                          'bg-red-50 text-red-600 border-red-100 shadow-[0_4px_12px_rgba(239,68,68,0.1)] font-black'
                                    }`}>
                                    {task.status === 'In Transit' ? <Clock size={12} strokeWidth={3} /> :
                                       task.status === 'Completed' ? <CheckCircle2 size={12} strokeWidth={3} /> :
                                          <AlertCircle size={12} strokeWidth={3} />}
                                    {task.status}
                                 </div>
                                 <p className="text-right text-[8px] font-black text-slate-300 uppercase tracking-widest mt-2">{task.time}</p>
                              </div>
                           </div>
                        </div>
                     ))}
                  </div>


                  <div className="p-8 bg-slate-50 border-t border-slate-100 text-center">
                     <button className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] hover:text-black transition-all">
                        Load Historical Dispatches
                     </button>
                  </div>
               </div>
            </div>

            {/* Staff Performance & Availability */}
            <div className="lg:col-span-4 space-y-10">
               <div className="bg-black rounded-xl p-10 text-white shadow-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-[5rem] group-hover:scale-110 transition-transform"></div>
                  <h3 className="text-[10px] font-black text-white/30 uppercase tracking-[0.4em] mb-12 relative z-10">Staff </h3>

                  <div className="space-y-8 relative z-10">
                     {isLoading ? (
                        <div className="py-10 text-center text-[10px] font-black text-white/20 uppercase tracking-[0.2em] leading-relaxed">Auditing Ground Personnel...</div>
                     ) : staffData.map((member) => (
                        <div key={member.id} className="group/item cursor-pointer">
                           <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center gap-4 text-white">
                                 <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center border border-white/10 group-hover/item:border-white/30 transition-all font-black text-xs">
                                    {member.name.charAt(0)}
                                 </div>
                                 <div>
                                    <p className="text-xs font-black tracking-tight text-white mb-1 uppercase">{member.name}</p>
                                    <p className="text-[9px] text-white/40 uppercase tracking-widest font-black">{member.role} • {member.location}</p>
                                 </div>
                              </div>
                              <div className={`w-2 h-2 rounded-full ${member.status === 'Available' ? 'bg-emerald-500 shadow-[0_0_10px_#10b981]' :
                                    member.status === 'On Task' ? 'bg-blue-500' : 'bg-slate-600'
                                 }`}></div>
                           </div>
                           <div className="flex items-center justify-between pl-16">
                              <span className="text-[9px] font-black text-white/20 uppercase tracking-[0.2em]">{member.status}</span>
                              <button className="p-2 hover:bg-white/10 rounded-xl transition-all text-white/40 hover:text-white">
                                 <Phone size={14} />
                              </button>
                           </div>
                        </div>
                     ))}
                  </div>


                  <button className="w-full mt-12 py-4 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black text-white/40 uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all">
                     Recruit Global Staff
                  </button>
               </div>

               {/* Sector Summary */}
               <div className="bg-white rounded-xl p-10 border border-slate-200 shadow-sm relative overflow-hidden">
                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-10">Sector Saturation</h3>
                  <div className="space-y-8">
                     {saturationData.map((sector) => (
                        <div key={sector.sector}>
                           <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-3">
                              <span className="text-slate-900">{sector.sector}</span>
                              <span className="text-slate-400">{sector.value}</span>
                           </div>
                           <div className="h-2 bg-slate-50 rounded-full overflow-hidden border border-slate-100 text-black">
                              <div className={`h-full ${sector.color} transition-all duration-1000`} style={{ width: sector.value }}></div>
                           </div>
                        </div>
                     ))}
                  </div>

               </div>
            </div>
         </div>
      </div>
   </>
   );
};

const MetricCard = ({ title, value, icon, color = "text-slate-600", bg = "bg-slate-100", border = "border-slate-200" }) => (
   <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between group hover:shadow-md transition-all">
      <div className="space-y-1">
         <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-tight">{title}</p>
         <p className="text-2xl font-manrope font-black tracking-tighter text-slate-900">{value}</p>
      </div>
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${bg} ${border} ${color} group-hover:scale-110 transition-transform`}>
         {icon}
      </div>
   </div>
);

export default Operations;
