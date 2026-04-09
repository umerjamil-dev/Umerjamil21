import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
    Mail, Inbox, Send, Trash2, X, Search, Star, 
    MoreVertical, Reply, Forward, Printer, ExternalLink,
    Paperclip, Image as ImageIcon, FileText, ChevronRight,
    ArrowLeft
} from 'lucide-react';
import useLeadStore from '../store/useLeadStore';

const EmailSystem = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { getLead } = useLeadStore();
    
    const [lead, setLead] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [activeFolder, setActiveFolder] = useState('inbox');
    const [selectedEmail, setSelectedEmail] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchLead = async () => {
            setIsLoading(true);
            try {
                const leadData = await getLead(id);
                setLead(leadData);
            } catch (err) {
                console.error('EmailSystem Fetch Error:', err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchLead();
    }, [id, getLead]);

    const folders = [
        { id: 'inbox', label: 'Mail inbox', icon: Inbox, count: 123 },
        { id: 'sent', label: 'Send', icon: Send, count: 0 },
        { id: 'trash', label: 'Trash', icon: Trash2, count: 0 },
    ];

    // Dummy data for demonstrate
    const dummyEmails = {
        inbox: [
            { 
                id: 1, 
                sender: lead?.lead_name || 'Johni Walker', 
                subject: 'Following up on my proposal', 
                preview: 'Dear Andre, I am following up on the proposal that i sent you on 12...', 
                time: '13:00 AM',
                initials: 'JW',
                content: `Dear ${lead?.lead_name || 'William Johni'},

I hope this email finds you well.
I am writing to request a meeting to discuss the latest updates on our project.
It has been a while since our last discussion, and I believe it would be beneficial to review our progress, address any challenges, and plan the next steps.

Please let me know your availability for a meeting this week or early next week.
I am flexible and can adjust to fit your schedule.
Looking forward to your response.

Best regards,
Johni walker
Manager
johniwlkr@gmail.com`,
                attachments: [
                    { name: 'Report rojects.pdf', size: '3.2 MB', type: 'pdf' },
                    { name: 'Projects 1.png', size: '2.3 MB', type: 'image' },
                    { name: 'Brief product.pdf', size: '3.2 MB', type: 'pdf' }
                ]
            },
            { 
                id: 2, 
                sender: 'William Johni', 
                subject: 'Meeting Request for Project Update', 
                preview: 'Hi Andrew, thank you for signing up for the free consultation...', 
                time: '12:45 AM',
                initials: 'WJ',
                content: 'Meeting content here...'
            },
        ],
        sent: [],
        trash: []
    };

    const emails = dummyEmails[activeFolder] || [];

    if (isLoading) return <div className="p-20 text-center font-manrope font-extrabold text-gray-400 animate-pulse tracking-widest uppercase text-xs">Accessing Satellite Feeds...</div>;

    return (
        <div className="h-[calc(100vh-140px)] bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row border border-gray-100 animate-in fade-in slide-in-from-bottom-4 duration-700">
            
            {/* Sidebar */}
            <div className="w-full md:w-64 bg-[#071022] text-white flex flex-col p-6 space-y-8 h-full">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                            <Mail size={18} />
                        </div>
                        <span className="font-manrope font-extrabold text-lg tracking-tight">MailOrbit</span>
                    </div>
                </div>

                <div className="space-y-6 flex-1 overflow-y-auto custom-scrollbar">
                    <div>
                        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4">Communication Hub</p>
                        <nav className="space-y-2">
                            {folders.map((folder) => (
                                <button
                                    key={folder.id}
                                    onClick={() => setActiveFolder(folder.id)}
                                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all group ${
                                        activeFolder === folder.id 
                                        ? 'bg-blue-600/20 text-blue-400 border border-blue-600/30' 
                                        : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                    }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <folder.icon size={18} />
                                        <span className="text-sm font-semibold">{folder.label}</span>
                                    </div>
                                    {folder.count > 0 && (
                                        <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded-full font-bold">
                                            {folder.count}
                                        </span>
                                    )}
                                </button>
                            ))}
                        </nav>
                    </div>

                    <div>
                        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4">Classification</p>
                        <div className="space-y-3 px-4 text-sm font-medium text-gray-400">
                            <div className="flex items-center gap-3 hover:text-white cursor-pointer transition-colors">
                                <div className="w-2 h-2 rounded-full bg-blue-500"></div> Strategic
                            </div>
                            <div className="flex items-center gap-3 hover:text-white cursor-pointer transition-colors">
                                <div className="w-2 h-2 rounded-full bg-amber-500"></div> Intelligence
                            </div>
                            <div className="flex items-center gap-3 hover:text-white cursor-pointer transition-colors">
                                <div className="w-2 h-2 rounded-full bg-emerald-500"></div> Asset
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-auto pt-6 border-t border-white/5">
                    <button 
                        onClick={() => navigate(`/leads/${id}`)}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-white/5 hover:text-white transition-all group border border-dashed border-white/10"
                    >
                        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="text-sm font-bold">Back to Asset</span>
                    </button>
                    <div className="mt-4 bg-blue-600/10 rounded-2xl p-4 border border-blue-600/20">
                        <p className="text-[10px] font-bold text-white mb-1 uppercase tracking-widest">Lead Intelligence</p>
                        <p className="text-[9px] text-gray-400 leading-relaxed font-bold">{lead.lead_name}</p>
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 bg-[#F9FAFB] flex flex-col md:flex-row overflow-hidden relative">
                
                {/* Message List */}
                <div className="w-full md:w-[380px] border-r border-gray-200 flex flex-col bg-white">
                    <div className="p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h1 className="text-xl font-manrope font-extrabold text-[#111827]">Communications</h1>
                            <span className="text-[10px] font-bold text-gray-400">Target Feed Active</span>
                        </div>

                        <div className="relative mb-6 group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-blue-600" size={16} />
                            <input 
                                type="text" 
                                placeholder="Search Intel..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm outline-none focus:bg-white focus:border-blue-200 focus:ring-4 ring-blue-500/5 transition-all"
                            />
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto px-4 space-y-1 pb-6 custom-scrollbar">
                        {emails.map((email) => (
                            <div 
                                key={email.id}
                                onClick={() => setSelectedEmail(email)}
                                className={`p-4 rounded-2xl cursor-pointer transition-all border ${
                                    selectedEmail?.id === email.id 
                                    ? 'bg-blue-50 border-blue-100 shadow-sm' 
                                    : 'bg-transparent border-transparent hover:bg-gray-50'
                                }`}
                            >
                                <div className="flex items-center justify-between mb-1">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xs font-black">
                                            {email.initials}
                                        </div>
                                        <span className="text-sm font-bold text-[#111827]">{email.sender}</span>
                                    </div>
                                    <span className="text-[10px] font-bold text-gray-400">{email.time}</span>
                                </div>
                                <div className="pl-11">
                                    <h4 className="text-[13px] font-extrabold text-[#111827] mb-1 line-clamp-1 italic">{email.subject}</h4>
                                    <p className="text-[11px] text-gray-500 line-clamp-2 leading-relaxed">{email.preview}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Email Detail / Placeholder */}
                <div className="flex-1 flex flex-col bg-white overflow-hidden">
                    {selectedEmail ? (
                        <div className="h-full flex flex-col animate-in slide-in-from-right-4 duration-500">
                            {/* Detail Header */}
                            <div className="p-8 border-b border-gray-100 flex items-center justify-between bg-[#F9FAFB]/50 backdrop-blur-md sticky top-0 z-10">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 text-lg font-black border-2 border-white shadow-sm">
                                        {selectedEmail.initials}
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-manrope font-extrabold text-[#111827]">{selectedEmail.sender}</h2>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Satellite Feed: {lead.email}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button className="p-2.5 text-gray-400 hover:text-[#111827] hover:bg-gray-100 rounded-xl transition-all"><Star size={18} /></button>
                                    <button className="p-2.5 text-gray-400 hover:text-[#111827] hover:bg-gray-100 rounded-xl transition-all"><Reply size={18} /></button>
                                    <button className="p-2.5 text-gray-400 hover:text-[#111827] hover:bg-gray-100 rounded-xl transition-all"><MoreVertical size={18} /></button>
                                </div>
                            </div>

                            {/* Body */}
                            <div className="flex-1 overflow-y-auto p-12 custom-scrollbar">
                                <div className="mb-10">
                                    <h3 className="text-xl font-manrope font-black text-[#111827] mb-6 tracking-tight leading-tight uppercase border-l-4 border-blue-600 pl-4">{selectedEmail.subject}</h3>
                                    <div className="text-sm text-gray-700 leading-relaxed font-medium space-y-4 whitespace-pre-wrap bg-gray-50/50 p-8 rounded-3xl border border-gray-100 shadow-sm">
                                        {selectedEmail.content}
                                    </div>
                                </div>

                                {/* Attachments */}
                                {selectedEmail.attachments && (
                                    <div className="pt-10 border-t border-gray-100">
                                        <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                                            <Paperclip size={14} /> Intelligence Assets
                                        </h4>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                            {selectedEmail.attachments.map((file, idx) => (
                                                <div key={idx} className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex items-center gap-4 group hover:bg-white hover:border-blue-100 hover:shadow-md transition-all cursor-pointer">
                                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${file.type === 'pdf' ? 'bg-red-50 text-red-500' : 'bg-amber-50 text-amber-500'}`}>
                                                        {file.type === 'pdf' ? <FileText size={20} /> : <ImageIcon size={20} />}
                                                    </div>
                                                    <div className="flex-1 overflow-hidden">
                                                        <p className="text-[11px] font-bold text-[#111827] truncate group-hover:text-blue-600 transition-colors uppercase tracking-tight">{file.name}</p>
                                                        <p className="text-[9px] font-black text-gray-400 tracking-widest">{file.size}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Reply Box */}
                            <div className="p-8 bg-gray-50/50 border-t border-gray-100">
                                <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100 group focus-within:ring-8 ring-blue-500/5 transition-all">
                                    <textarea 
                                        placeholder="Draft strategic response..."
                                        className="w-full bg-transparent border-none outline-none text-sm font-medium min-h-[120px] resize-none text-gray-800 placeholder-gray-400"
                                    ></textarea>
                                    <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-50 font-manrope">
                                        <div className="flex items-center gap-2">
                                            <button className="p-2.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"><Paperclip size={20} /></button>
                                            <button className="p-2.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"><ImageIcon size={20} /></button>
                                            <div className="h-6 w-px bg-gray-200 mx-3"></div>
                                            <button className="px-8 py-3 bg-[#111827] hover:bg-black text-white rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] transition-all shadow-xl hover:-translate-y-0.5 flex items-center gap-3">
                                                Initialize Send <Send size={16} />
                                            </button>
                                        </div>
                                        <button className="p-2.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"><Trash2 size={20} /></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center p-12 text-center bg-gray-50/20">
                            <div className="w-32 h-32 bg-white rounded-[40px] shadow-2xl flex items-center justify-center mb-10 relative group hover:scale-110 transition-transform duration-500">
                                <Mail size={56} className="text-blue-600 transition-colors" />
                                <div className="absolute inset-0 bg-blue-500/10 rounded-[40px] animate-pulse"></div>
                            </div>
                            <h3 className="text-3xl font-manrope font-black text-[#111827] mb-4 tracking-tighter uppercase">Intelligence Dossier</h3>
                            <p className="text-sm text-gray-400 font-bold uppercase tracking-[0.2em] max-w-sm leading-relaxed">
                                Decrypt a transmission from the dashboard to review communication history with this asset.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EmailSystem;
