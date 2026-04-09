import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Mail, Inbox, Send, Trash2, X, Search, Star,
    MoreVertical, Reply, Paperclip, FileText,
    Image as ImageIcon, ArrowLeft, Plus, ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import useLeadStore from '../store/useLeadStore';
import useEmailStore from '../store/useEmailStore';

const EmailSystem = () => {
    const { id, folder } = useParams();
    const navigate = useNavigate();
    const { getLead } = useLeadStore();
    const { 
        sentEmails, inboxEmails, trashEmails, sourceEmails, 
        fetchSentEmails, fetchInboxEmails, fetchTrashEmails,
        sendEmail, sourceEmailFetch, isLoading: isEmailLoading 
    } = useEmailStore();

    const [lead, setLead] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [activeFolder, setActiveFolder] = useState(folder || 'inbox');
    const [selectedEmail, setSelectedEmail] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    const [fromEmail, setFromEmail] = useState('');
    const [toEmail, setToEmail] = useState('');
    const [ccEmail, setCcEmail] = useState('');
    const [bccEmail, setBccEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [editorContent, setEditorContent] = useState('');
    const [showCcBcc, setShowCcBcc] = useState(false);
    const [isComposeOpen, setIsComposeOpen] = useState(false);

    const quillRef = React.useRef(null);
    const editorInstance = React.useRef(null);

    useEffect(() => {
        if (sourceEmails.length > 0 && !fromEmail) {
            setFromEmail(sourceEmails[0].id);
        }
    }, [sourceEmails, fromEmail]);

    useEffect(() => {
        const fetchLead = async () => {
            setIsLoading(true);
            try {
                const leadData = await getLead(id);
                setLead(leadData);
                if (leadData?.email) setToEmail(leadData.email);
            } catch (err) {
                console.error('EmailSystem Fetch Error:', err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchLead();
    }, [id, getLead]);

    useEffect(() => {
        if (folder) setActiveFolder(folder);
    }, [folder]);

    useEffect(() => {
        if (activeFolder === 'sent') fetchSentEmails();
        if (activeFolder === 'inbox') fetchInboxEmails();
        if (activeFolder === 'trash') fetchTrashEmails();
    }, [activeFolder, fetchSentEmails, fetchInboxEmails, fetchTrashEmails]);

    useEffect(() => {
        sourceEmailFetch();
    }, [sourceEmailFetch]);

    useEffect(() => {
        if (isComposeOpen && quillRef.current && !editorInstance.current) {
            editorInstance.current = new Quill(quillRef.current, {
                theme: 'snow',
                placeholder: 'Write your message...',
                modules: {
                    toolbar: [
                        [{ header: [1, 2, false] }],
                        ['bold', 'italic', 'underline'],
                        ['link', 'image'],
                        [{ list: 'ordered' }, { list: 'bullet' }],
                        ['clean'],
                    ],
                },
            });
            editorInstance.current.on('text-change', () => {
                setEditorContent(editorInstance.current.root.innerHTML);
            });
        }
        if (!isComposeOpen) {
            editorInstance.current = null;
        }
    }, [isComposeOpen]);

    const handleFolderChange = (folderId) => {
        navigate(`/emails/${id}/${folderId}`);
        setActiveFolder(folderId);
        setSelectedEmail(null);
    };

    const folders = [
        { id: 'inbox', label: 'Inbox', icon: Inbox, count: 0 },
        { id: 'sent', label: 'Sent', icon: Send, count: 0 },
        { id: 'trash', label: 'Trash', icon: Trash2, count: 0 },
    ];

    const dummyEmails = {
        inbox: [
            {
                id: 1,
                sender: lead?.lead_name || 'Johni Walker',
                subject: 'Following up on my proposal',
                preview: 'Dear Andre, I am following up on the proposal that I sent you on the 12th...',
                time: '13:00',
                initials: 'JW',
                avatarBg: 'bg-blue-100',
                avatarText: 'text-blue-700',
                content: `Dear William Johni,\n\nI hope this email finds you well.\n\nI am writing to request a meeting to discuss the latest updates on our project. It has been a while since our last discussion, and I believe it would be beneficial to review our progress, address any challenges, and plan the next steps.\n\nPlease let me know your availability for a meeting this week or early next week. I am flexible and can adjust to fit your schedule.\n\nLooking forward to your response.\n\nBest regards,\nJohni Walker\nManager\njohniwlkr@gmail.com`,
                attachments: [
                    { name: 'Report projects.pdf', size: '3.2 MB', type: 'pdf' },
                    { name: 'Projects 1.png', size: '2.3 MB', type: 'image' },
                    { name: 'Brief product.pdf', size: '3.2 MB', type: 'pdf' },
                ],
            },
            {
                id: 2,
                sender: 'William Johni',
                subject: 'Meeting Request for Project Update',
                preview: 'Hi Andrew, thank you for signing up for the free consultation call...',
                time: '12:45',
                initials: 'WJ',
                avatarBg: 'bg-green-100',
                avatarText: 'text-green-700',
                content: `Hi Andrew,\n\nThank you for signing up for the free consultation call. I wanted to follow up and confirm our meeting scheduled for next Tuesday at 3 PM.\n\nLooking forward to speaking with you.\n\nBest,\nWilliam`,
            },
        ],
        sent: [],
        trash: [],
    };

    const emails = activeFolder === 'sent' 
        ? sentEmails 
        : activeFolder === 'inbox' 
            ? inboxEmails 
            : activeFolder === 'trash'
                ? trashEmails
                : (dummyEmails[activeFolder] || []);
    const filtered = emails.filter(
        (e) =>
            e.subject?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            e.sender?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (isLoading) {
        return (
            <div className="flex items-center justify-center gap-3 p-20 text-gray-400">
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
                <span className="text-sm font-medium">Loading...</span>
            </div>
        );
    }

    return (
        <>
            <style>{`
                .ql-toolbar.ql-snow {
                    border: none !important;
                    background: #f9fafb;
                    border-radius: 8px;
                    padding: 8px !important;
                    margin-bottom: 8px;
                }
                .ql-container.ql-snow {
                    border: none !important;
                    font-size: 14px;
                    min-height: 150px;
                }
                .ql-editor {
                    padding: 4px 8px !important;
                    min-height: 140px;
                }
                .ql-editor.ql-blank::before {
                    color: #d1d5db;
                    font-style: normal;
                    left: 8px !important;
                }
            `}</style>

            {/* Shell */}
            <div className="flex h-[calc(100vh-140px)] rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-sm">

                {/* ── Sidebar ── */}
                <aside className="w-56 flex-shrink-0 bg-[#0c1527] flex flex-col px-4 py-5">

                    {/* Logo */}
                    <div className="flex items-center gap-2.5 mb-7">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                            <Mail size={15} color="#fff" strokeWidth={2} />
                        </div>
                        <span className="text-white font-semibold text-[15px] tracking-tight">MailOrbit</span>
                    </div>

                    {/* Nav */}
                    <p className="text-[9px] font-semibold text-gray-600 uppercase tracking-widest mb-2 pl-1">Folders</p>
                    <nav className="flex flex-col gap-0.5">
                        {folders.map((f) => {
                            const active = activeFolder === f.id;
                            return (
                                <button
                                    key={f.id}
                                    onClick={() => handleFolderChange(f.id)}
                                    className={`flex items-center justify-between px-3 py-2 rounded-lg w-full text-left transition-all ${
                                        active
                                            ? 'bg-blue-600/20 border border-blue-600/30'
                                            : 'border border-transparent hover:bg-white/5'
                                    }`}
                                >
                                    <div className="flex items-center gap-2.5">
                                        <f.icon
                                            size={14}
                                            strokeWidth={active ? 2.5 : 2}
                                            color={active ? '#60a5fa' : '#6b7280'}
                                        />
                                        <span className={`text-[13px] font-medium ${active ? 'text-blue-400' : 'text-gray-400'}`}>
                                            {f.label}
                                        </span>
                                    </div>
                                    {f.count > 0 && (
                                        <span className="text-[10px] bg-white/10 text-gray-400 px-2 py-0.5 rounded-full font-semibold">
                                            {f.count}
                                        </span>
                                    )}
                                </button>
                            );
                        })}
                    </nav>

                    {/* Compose */}
                    <button
                        onClick={() => { setSubject(''); setEditorContent(''); setIsComposeOpen(true); }}
                        className="mt-4 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-[12px] font-semibold rounded-xl py-2.5 w-full transition-colors"
                    >
                        <Plus size={14} strokeWidth={2.5} />
                        Compose
                    </button>

                    {/* Footer */}
                    <div className="mt-auto pt-4 border-t border-white/[0.06] flex flex-col gap-2.5">
                        <button
                            onClick={() => navigate(`/leads/${id}`)}
                            className="flex items-center gap-2 px-3 py-2 rounded-lg border border-dashed border-white/10 text-gray-500 hover:text-gray-300 text-[12px] font-medium w-full transition-colors"
                        >
                            <ArrowLeft size={13} strokeWidth={2} />
                            Back to lead
                        </button>
                        {lead && (
                            <div className="bg-blue-600/10 border border-blue-600/20 rounded-xl px-3 py-2.5">
                                <p className="text-[9px] font-semibold text-blue-400 uppercase tracking-widest mb-1">Lead</p>
                                <p className="text-[11px] text-gray-400 font-medium truncate">{lead.lead_name}</p>
                                {lead.email && (
                                    <p className="text-[10px] text-gray-600 truncate mt-0.5">{lead.email}</p>
                                )}
                            </div>
                        )}
                    </div>
                </aside>

                {/* ── Email List ── */}
                <div className="w-72 flex-shrink-0 border-r border-gray-100 flex flex-col bg-white">
                    <div className="px-4 pt-5 pb-3 border-b border-gray-100">
                        <h1 className="text-base font-semibold text-gray-900 mb-3">Communications</h1>
                        <div className="relative">
                            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                className="w-full pl-8 pr-3 py-2 bg-gray-50 border border-gray-100 rounded-lg text-[13px] text-gray-700 outline-none focus:border-blue-300 focus:bg-white transition-all"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-2">
                        {filtered.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-12 gap-2">
                                <Inbox size={22} className="text-gray-300" />
                                <span className="text-[13px] text-gray-400">No messages</span>
                            </div>
                        ) : (
                            filtered.map((email) => {
                                const isSelected = selectedEmail?.id === email.id;
                                return (
                                    <div
                                        key={email.id}
                                        onClick={() => setSelectedEmail(email)}
                                        className={`p-3 rounded-xl cursor-pointer border mb-1 transition-all ${
                                            isSelected
                                                ? 'bg-blue-50 border-blue-100'
                                                : 'border-transparent hover:bg-gray-50'
                                        }`}
                                    >
                                        <div className="flex gap-2.5 items-start">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold flex-shrink-0 ${email.avatarBg} ${email.avatarText}`}>
                                                {email.initials}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex justify-between items-center mb-0.5">
                                                    <span className="text-[13px] font-semibold text-gray-900">{email.sender}</span>
                                                    <span className="text-[10px] text-gray-400 font-medium flex-shrink-0 ml-2">{email.time}</span>
                                                </div>
                                                <p className="text-[12px] font-semibold text-gray-700 truncate mb-0.5">{email.subject}</p>
                                                <p className="text-[11px] text-gray-400 line-clamp-2 leading-relaxed">{email.preview}</p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>

                {/* ── Detail Pane ── */}
                <div className="flex-1 flex flex-col overflow-hidden bg-white">
                    <AnimatePresence mode="wait">
                        {selectedEmail ? (
                            <motion.div
                                key={selectedEmail.id}
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.18 }}
                                className="flex flex-col h-full"
                            >
                                {/* Detail Header */}
                                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/70">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-[13px] font-bold flex-shrink-0 ${selectedEmail.avatarBg} ${selectedEmail.avatarText}`}>
                                            {selectedEmail.initials}
                                        </div>
                                        <div>
                                            <p className="text-[14px] font-semibold text-gray-900">{selectedEmail.sender}</p>
                                            <p className="text-[11px] text-gray-400">{lead?.email}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors">
                                            <Star size={15} className="text-gray-400" strokeWidth={2} />
                                        </button>
                                        <button
                                            onClick={() => { setSubject(`Re: ${selectedEmail.subject}`); setIsComposeOpen(true); }}
                                            className="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors"
                                        >
                                            <Reply size={15} className="text-blue-600" strokeWidth={2} />
                                        </button>
                                        <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors">
                                            <MoreVertical size={15} className="text-gray-400" strokeWidth={2} />
                                        </button>
                                    </div>
                                </div>

                                {/* Detail Body */}
                                <div className="flex-1 overflow-y-auto p-6">
                                    <h2 className="text-[15px] font-semibold text-gray-900 border-l-[3px] border-blue-600 pl-3 mb-5 leading-snug">
                                        {selectedEmail.subject}
                                    </h2>
                                    <div className="text-[13px] text-gray-700 leading-relaxed whitespace-pre-wrap bg-gray-50 px-5 py-4 rounded-xl border border-gray-100">
                                        {selectedEmail.body}
                                    </div>

                                    {selectedEmail.attachments && (
                                        <div className="mt-5 pt-5 border-t border-gray-100">
                                            <p className="flex items-center gap-1.5 text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-3">
                                                <Paperclip size={11} strokeWidth={2} />
                                                Attachments ({selectedEmail.attachments.length})
                                            </p>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                                                {selectedEmail.attachments.map((file, idx) => (
                                                    <div
                                                        key={idx}
                                                        className="flex items-center gap-3 px-3 py-2.5 bg-gray-50 border border-gray-100 rounded-lg hover:bg-white hover:border-gray-200 cursor-pointer transition-all"
                                                    >
                                                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${file.type === 'pdf' ? 'bg-red-50' : 'bg-amber-50'}`}>
                                                            {file.type === 'pdf'
                                                                ? <FileText size={13} className="text-red-500" strokeWidth={2} />
                                                                : <ImageIcon size={13} className="text-amber-500" strokeWidth={2} />
                                                            }
                                                        </div>
                                                        <div className="min-w-0">
                                                            <p className="text-[11px] font-semibold text-gray-800 truncate">{file.name}</p>
                                                            <p className="text-[10px] text-gray-400">{file.size}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="empty"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex-1 flex flex-col items-center justify-center gap-3 p-10 h-full"
                            >
                                <div className="w-14 h-14 bg-blue-50 border border-blue-100 rounded-2xl flex items-center justify-center">
                                    <Mail size={26} className="text-blue-600" strokeWidth={1.5} />
                                </div>
                                <p className="text-[14px] font-semibold text-gray-700">Select a message</p>
                                <p className="text-[12px] text-gray-400 text-center max-w-[200px] leading-relaxed">
                                    Choose an email from the list to read it here
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* ── Compose Modal ── */}
            <AnimatePresence>
                {isComposeOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm"
                        onClick={() => setIsComposeOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.96, opacity: 0, y: 14 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.96, opacity: 0, y: 14 }}
                            transition={{ duration: 0.18 }}
                            className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden max-h-[88vh]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Modal Header */}
                            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 bg-gray-50/80">
                                <div className="flex items-center gap-2.5">
                                    <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
                                        <Mail size={14} color="#fff" strokeWidth={2} />
                                    </div>
                                    <span className="text-[14px] font-semibold text-gray-900">New Message</span>
                                </div>
                                <button
                                    onClick={() => setIsComposeOpen(false)}
                                    className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
                                >
                                    <X size={15} className="text-gray-500" strokeWidth={2} />
                                </button>
                            </div>

                            {/* Modal Body */}
                            <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-4">
                                {/* From / To */}
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest">From</label>
                                        <div className="relative">
                                            <select
                                                value={fromEmail}
                                                onChange={(e) => setFromEmail(e.target.value) }
                                                className="w-full appearance-none bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 pr-8 text-[13px] text-gray-800 outline-none focus:border-blue-400 transition-colors cursor-pointer"
                                            >
                                                {sourceEmails.length > 0
                                                    ? sourceEmails.map((e) => (
                                                        <option key={e.id} value={e.id}>{e.email}</option>
                                                    ))
                                                    : <option value="info@mailorbit.com">info@mailorbit.com</option>
                                                }
                                            </select>
                                            <ChevronDown size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-1.5">
                                        <div className="flex justify-between items-center">
                                            <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest">To</label>
                                            <button
                                                onClick={() => setShowCcBcc(!showCcBcc)}
                                                className="text-[10px] font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                                            >
                                                {showCcBcc ? 'Hide CC/BCC' : '+ CC/BCC'}
                                            </button>
                                        </div>
                                        <input
                                            type="email"
                                            value={toEmail}
                                            onChange={(e) => setToEmail(e.target.value)}
                                            placeholder="recipient@example.com"
                                            className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-[13px] text-gray-800 outline-none focus:border-blue-400 transition-colors"
                                        />
                                    </div>
                                </div>

                                {/* CC / BCC */}
                                <AnimatePresence>
                                    {showCcBcc && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="grid grid-cols-2 gap-3">
                                                <div className="flex flex-col gap-1.5">
                                                    <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest">CC</label>
                                                    <input
                                                        type="text"
                                                        value={ccEmail}
                                                        onChange={(e) => setCcEmail(e.target.value)}
                                                        placeholder="cc@example.com"
                                                        className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-[13px] text-gray-800 outline-none focus:border-blue-400 transition-colors"
                                                    />
                                                </div>
                                                <div className="flex flex-col gap-1.5">
                                                    <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest">BCC</label>
                                                    <input
                                                        type="text"
                                                        value={bccEmail}
                                                        onChange={(e) => setBccEmail(e.target.value)}
                                                        placeholder="bcc@example.com"
                                                        className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-[13px] text-gray-800 outline-none focus:border-blue-400 transition-colors"
                                                    />
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Subject */}
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest">Subject</label>
                                    <input
                                        type="text"
                                        value={subject}
                                        onChange={(e) => setSubject(e.target.value)}
                                        placeholder="Subject heading..."
                                        className="bg-transparent border-0 border-b border-gray-200 focus:border-blue-500 pb-2 text-[17px] font-semibold text-gray-900 outline-none transition-colors placeholder-gray-300"
                                    />
                                </div>

                                {/* Quill Editor */}
                                <div className="flex-1">
                                    <div ref={quillRef} />
                                </div>
                            </div>

                            {/* Modal Footer */}
                            <div className="flex items-center justify-between px-5 py-3.5 border-t border-gray-100 bg-gray-50/80">
                                <div className="flex gap-1">
                                    <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-[11px] text-gray-500 font-medium hover:bg-gray-100 transition-colors">
                                        <Paperclip size={13} strokeWidth={2} />
                                        Attach
                                    </button>
                                    <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-[11px] text-gray-500 font-medium hover:bg-gray-100 transition-colors">
                                        <ImageIcon size={13} strokeWidth={2} />
                                        Image
                                    </button>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => setIsComposeOpen(false)}
                                        className="px-4 py-2 text-[12px] font-medium text-gray-500 hover:text-red-500 rounded-lg transition-colors"
                                    >
                                        Discard
                                    </button>
                                    <button
                                        disabled={isEmailLoading}
                                        onClick={async () => {
                                            try {
                                                await sendEmail({
                                                    from: sourceEmails.find(e => e.id == fromEmail)?.email || '',
                                                    to: toEmail,
                                                    cc: ccEmail,
                                                    bcc: bccEmail,
                                                    account_id: fromEmail,
                                                    lead_id: id,
                                                    subject : subject,
                                                    body: editorContent,
                                                });
                                                setIsComposeOpen(false);
                                            } catch (err) {
                                                alert('Send failed: ' + (err.response?.data?.message || err.message));
                                            }
                                        }}
                                        className="flex items-center gap-2 px-5 py-2 bg-gray-900 hover:bg-black text-white text-[12px] font-semibold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isEmailLoading ? 'Sending...' : 'Send'}
                                        <Send size={13} strokeWidth={2} />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default EmailSystem;