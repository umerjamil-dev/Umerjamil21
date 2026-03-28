import React from 'react';
import {
    ArrowLeft, Phone, Mail, MapPin,
    Calendar, Clock, User, MessageSquare,
    Save, Trash2, CheckCircle, AlertCircle,
    History, Plus, ExternalLink, Activity, Target
} from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

const LeadDetail = () => {
    const { id } = useParams();
    
    // State for the status dropdown
    const [currentStatus, setCurrentStatus] = React.useState('Contacted');

    // Mock data based on requirements
    const lead = {
        id: id || 'LD-1024',
        name: 'Ahmed Raza',
        phone: '+92 300 1234567',
        email: 'ahmed.raza@example.com',
        source: 'WhatsApp', // (Facebook / Website / WhatsApp / Email)
        status: 'Contacted', // (New, Contacted, Qualified, Converted, Lost)
        assignedTo: 'Zaid Khan',
        followUpDate: '2024-03-29',
        createdDate: '2024-03-27',
        message: 'Interested in 15-day Umrah package for 4 persons. Looking for 5-star hotels near Haram.',
        notes: [
            { id: 1, text: 'Sent package details via WhatsApp.', date: '2 hrs ago', user: 'Zaid Khan' },
            { id: 2, text: 'Customer requested a quote for VIP transport.', date: 'Yesterday', user: 'Zaid Khan' }
        ]
    };

    const getStatusColor = (status) => {
        switch(status.toLowerCase()) {
            case 'new': return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
            case 'contacted': return 'bg-amber-500/10 text-amber-600 border-amber-500/20';
            case 'qualified': return 'bg-purple-500/10 text-purple-600 border-purple-500/20';
            case 'converted': return 'bg-green-500/10 text-green-600 border-green-500/20';
            case 'lost': return 'bg-red-500/10 text-red-600 border-red-500/20';
            default: return 'bg-gray-500/10 text-gray-600 border-gray-500/20';
        }
    };

    return (
        <div className="font-inter space-y-8 animate-in fade-in duration-700 pb-12 mx-auto">
            
            {/* Top Navigation & Actions */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                <div className="flex items-center gap-6">
                    <Link to="/leads" className="w-12 h-12 flex items-center justify-center bg-gray-50 text-gray-600 hover:bg-[#111827] hover:text-white rounded-xl transition-all group">
                        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    </Link>
                    <div>
                        <div className="flex items-center gap-3 mb-1">
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Lead Profile</span>
                            <div className="w-1 h-1 rounded-full bg-gray-300"></div>
                            <span className="text-xs font-black text-gray-900">{lead.id}</span>
                        </div>
                        <h1 className="text-2xl font-manrope font-extrabold text-gray-900">{lead.name}</h1>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <button className="px-5 py-2.5 bg-red-50 text-red-600 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-red-100 transition-colors flex items-center gap-2">
                        <Trash2 size={16} /> Delete
                    </button>
                    <button className="px-8 py-3 bg-[#111827] text-white rounded-xl text-xs font-bold uppercase tracking-widest shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center gap-2">
                        <Save size={16} /> Update Details
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                
                {/* Left Column: Core Details */}
                <div className="xl:col-span-2 space-y-8">
                    
                    {/* Primary Info Card - Premium Bento Design */}
                    <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-gray-50 to-transparent rounded-bl-full pointer-events-none"></div>

                        <div className="flex items-center justify-between mb-8 relative z-10">
                            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest flex items-center gap-2">
                                <User size={18} className="text-gray-400" /> Contact Information
                            </h2>
                            <div className="relative group">
                                <select 
                                    value={currentStatus}
                                    onChange={(e) => setCurrentStatus(e.target.value)}
                                    className={`appearance-none px-4 py-1.5 pr-8 rounded-xl text-[10px] font-black uppercase tracking-widest border outline-none cursor-pointer hover:shadow-md transition-all ${getStatusColor(currentStatus)}`}
                                >
                                    <option value="New" className="text-gray-900 font-bold bg-white">New</option>
                                    <option value="Contacted" className="text-gray-900 font-bold bg-white">Contacted</option>
                                    <option value="Qualified" className="text-gray-900 font-bold bg-white">Qualified</option>
                                    <option value="Converted" className="text-gray-900 font-bold bg-white">Converted</option>
                                    <option value="Lost" className="text-gray-900 font-bold bg-white">Lost</option>
                                </select>
                                <div className={`pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 transition-colors ${getStatusColor(currentStatus).split(' ')[1]}`}>
                                    <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7"></path></svg>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                            <div className="space-y-6">
                                <div className="group">
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                                        <Phone size={14} /> Contact Number
                                    </p>
                                    <p className="text-lg font-black text-gray-900 group-hover:text-blue-600 transition-colors cursor-pointer">{lead.phone}</p>
                                </div>
                                <div className="group">
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                                        <Mail size={14} /> Email Address
                                    </p>
                                    <p className="text-lg font-black text-gray-900 group-hover:text-blue-600 transition-colors cursor-pointer truncate">{lead.email}</p>
                                </div>
                            </div>
                            
                            <div className="space-y-6">
                                <div>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                                        <Target size={14} /> Acquisition Source
                                    </p>
                                    <div className="inline-flex py-1.5 px-4 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold text-gray-900 shadow-sm">
                                        {lead.source}
                                    </div>
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                                        <Activity size={14} /> Assigned Representative
                                    </p>
                                    <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-xl border border-gray-100 w-max pr-4">
                                        <div className="w-8 h-8 rounded-xl bg-[#111827] text-white flex items-center justify-center text-xs font-bold">
                                            {lead.assignedTo.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        <p className="text-sm font-bold text-gray-900">{lead.assignedTo}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Quick Contact Actions */}
                        <div className="mt-8 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center gap-4 relative z-10">
                            <button className="w-full sm:flex-1 py-4 bg-gray-50 hover:bg-[#111827] text-gray-700 hover:text-white rounded-xl text-[11px] font-extrabold uppercase tracking-widest transition-all shadow-sm hover:shadow-md hover:-translate-y-1 flex items-center justify-center gap-2 group border border-gray-200 hover:border-[#111827]">
                                <Phone size={18} className="group-hover:scale-110 transition-transform" /> Call Lead
                            </button>
                            <button className="w-full sm:flex-1 py-4 bg-emerald-50 hover:bg-emerald-500 text-emerald-700 hover:text-white rounded-xl text-[11px] font-extrabold uppercase tracking-widest transition-all shadow-sm hover:shadow-md hover:-translate-y-1 flex items-center justify-center gap-2 group border border-emerald-100 hover:border-emerald-500">
                                <MessageSquare size={18} className="group-hover:scale-110 transition-transform" /> WhatsApp
                            </button>
                            <button className="w-full sm:flex-1 py-4 bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white rounded-xl text-[11px] font-extrabold uppercase tracking-widest transition-all shadow-sm hover:shadow-md hover:-translate-y-1 flex items-center justify-center gap-2 group border border-blue-100 hover:border-blue-600">
                                <Mail size={18} className="group-hover:scale-110 transition-transform" /> Email
                            </button>
                        </div>

                        {/* Message Box */}
                        <div className="mt-8 pt-8 border-t border-gray-100 relative z-10">
                            <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                                <MessageSquare size={14} /> Original Inquiry Message
                            </h3>
                            <div className="p-6 bg-gray-50 rounded-xl border-l-4 border-[#111827] text-gray-700 text-sm font-medium leading-relaxed">
                                "{lead.message}"
                            </div>
                        </div>
                    </div>

                </div>

                {/* Right Column: Timeline & Action */}
                <div className="space-y-8">
                    
                    {/* Follow up Action Card */}
                    <div className="bg-[#111827] rounded-xl p-8 text-white shadow-xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/10 to-transparent rounded-bl-full pointer-events-none transition-transform group-hover:scale-110"></div>
                        
                        <div className="flex items-center gap-3 mb-6 relative z-10 text-gray-400">
                            <Clock size={16} />
                            <h3 className="text-[10px] font-bold uppercase tracking-widest">Next Action</h3>
                        </div>

                        <div className="relative z-10 mb-8">
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Scheduled Follow-up</p>
                            <h2 className="text-3xl font-manrope font-black tracking-tighter text-white">{lead.followUpDate}</h2>
                        </div>

                        <button className="w-full py-4 bg-white text-[#111827] rounded-xl text-xs font-extrabold uppercase tracking-widest hover:bg-gray-100 transition-colors shadow-lg relative z-10">
                            Mark as Completed
                        </button>
                    </div>

                    {/* Timeline Log */}
                    <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest flex items-center gap-2">
                                <History size={18} className="text-gray-400" /> Activity Log
                            </h3>
                            <button className="w-8 h-8 rounded-xl bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-[#111827] hover:text-white transition-colors">
                                <Plus size={16} />
                            </button>
                        </div>

                        <div className="space-y-8 relative">
                            <div className="absolute left-[15px] top-2 bottom-2 w-px bg-gray-100"></div>

                            {lead.notes.map((note) => (
                                <div key={note.id} className="relative pl-12 group">
                                    <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center text-gray-400 group-hover:border-[#111827] group-hover:text-[#111827] transition-colors z-10">
                                        <MessageSquare size={12} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-900 mb-1">{note.text}</p>
                                        <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                                            <span>{note.date}</span>
                                            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                            <span>{note.user}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            <div className="relative pl-12 opacity-50">
                                <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center text-gray-400 z-10">
                                    <CheckCircle size={12} />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-gray-800 mb-1">Lead Created in System</p>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{lead.createdDate}</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-gray-100">
                            <textarea
                                placeholder="Add a new note..."
                                className="w-full p-4 bg-gray-50 rounded-xl border border-transparent focus:border-gray-200 text-sm font-medium outline-none resize-none h-24 placeholder-gray-400"
                            ></textarea>
                            <button className="w-full mt-4 py-3 bg-gray-900 text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-black transition-colors">
                                Save Note
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default LeadDetail;
