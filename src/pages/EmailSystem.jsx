import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Mail, Inbox, Send, Trash2, X, Search, Star,
    MoreVertical, Reply, Paperclip, FileText,
    Image as ImageIcon, ArrowLeft, Plus, ChevronDown, Download,
    MailIcon,
    InboxIcon,
    MailsIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import useLeadStore from '../store/useLeadStore';
import useEmailStore from '../store/useEmailStore';
import useAuthStore from '../store/useAuthStore';

const EmailSystem = () => {
    const { id, folder } = useParams();
    const navigate = useNavigate();
    const { getLead } = useLeadStore();
    const { user } = useAuthStore();
    const { deleteEmail } = useEmailStore();
    const {
        sentEmails, inboxEmails, trashEmails, sourceEmails,
        fetchSentEmails, fetchInboxEmails, fetchTrashEmails,
        sendEmail, sourceEmailFetch, moveToTrash, isLoading: isEmailLoading
    } = useEmailStore();

    const handleDelete = async () => {
        if (!selectedEmail) return;
        if (!window.confirm('Are you sure you want to move this email to trash?')) return;

        try {
            await deleteEmail(selectedEmail.id);
            setSelectedEmail(null);
        } catch (err) {
            alert('Delete failed: ' + err.message);
        }
    };

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
    const [attachments, setAttachments] = useState([]);
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
        if (activeFolder === 'sent') fetchSentEmails(id, user?.id);
        if (activeFolder === 'inbox') fetchInboxEmails(id, user?.id);
        if (activeFolder === 'trash') fetchTrashEmails(id, user?.id);
    }, [activeFolder, id, user?.id, fetchSentEmails, fetchInboxEmails, fetchTrashEmails]);

    useEffect(() => {
        sourceEmailFetch();
    }, [sourceEmailFetch]);

    useEffect(() => {
        if (isComposeOpen && quillRef.current && !editorInstance.current) {
            // Register custom attachment icon
            const icons = Quill.import('ui/icons');
            icons['attachment'] = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.51a2 2 0 0 1-2.83-2.83l8.49-8.48"></path></svg>';

            editorInstance.current = new Quill(quillRef.current, {
                theme: 'snow',
                placeholder: 'Write your message...',
                modules: {
                    toolbar: {
                        container: [
                            [{ header: [1, 2, false] }],
                            ['bold', 'italic', 'underline'],
                            ['link', 'attachment'],
                            [{ list: 'ordered' }, { list: 'bullet' }],
                            ['clean'],
                        ],
                        handlers: {
                            attachment: function () {
                                document.getElementById('composer-file-input').click();
                            }
                        }
                    },
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

    const handleFileChange = async (e) => {
        const files = Array.from(e.target.files);

        const filePromises = files.map(file => {
            return new Promise((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    resolve({
                        id: Math.random().toString(36).substr(2, 9),
                        name: file.name,
                        size: (file.size / 1024).toFixed(1) + ' KB',
                        type: file.type,
                        base64: reader.result.split(',')[1],
                    });
                };
                reader.readAsDataURL(file);
            });
        });

        const newAttachments = await Promise.all(filePromises);
        setAttachments(prev => [...prev, ...newAttachments]);
        e.target.value = null; // Reset input
    };

    const removeAttachment = (id) => {
        setAttachments(prev => prev.filter(a => a.id !== id));
    };

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
            <div className="flex h-[calc(100vh-140px)] rounded-2xl mx-auto overflow-hidden border border-gray-200 bg-white shadow-sm">

                {/* ── Sidebar ── */}
                <aside className="w-56 flex-shrink-0 bg-[#0c1527] flex flex-col px-4 py-5">

                    {/* Logo */}
                    <div className="flex items-center gap-2.5 mb-7">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                            <Mail size={15} color="#fff" strokeWidth={2} />
                        </div>
                        <span className="text-white font-semibold text-[15px] tracking-tight">Mailer</span>
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
                                    className={`flex items-center justify-between px-3 py-2 rounded-lg w-full text-left transition-all ${active
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
                                <InboxIcon size={22} className="text-gray-300" />
                                <span className="text-[13px] text-gray-400">No messages</span>
                            </div>
                        ) : (
                            filtered.map((email) => {
                                const isSelected = selectedEmail?.id === email.id;
                                return (
                                    <div
                                        key={email.id}
                                        onClick={() => setSelectedEmail(email)}
                                        className={`p-3 rounded-xl cursor-pointer border mb-1 transition-all ${isSelected
                                            ? 'bg-blue-50 border-blue-100'
                                            : 'border-transparent hover:bg-gray-50'
                                            }`}
                                    >
                                        <div className="flex gap-2.5 items-start">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-medium flex-shrink-0 ${email.avatarBg} ${email.avatarText}`}>
                                                <MailsIcon />
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
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-[13px] font-medium flex-shrink-0 ${selectedEmail.avatarBg} ${selectedEmail.avatarText}`}>
                                            <MailIcon />
                                        </div>
                                        <div>
                                            <p className="text-[14px] font-semibold text-gray-900">{selectedEmail.sender}</p>
                                            <p className="text-[11px] text-gray-400">{lead?.email}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1">

                                        <button
                                            onClick={() => { setSubject(`Re: ${selectedEmail.subject}`); setIsComposeOpen(true); }}
                                            className="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors"
                                        >
                                            <Reply size={15} className="text-blue-600" strokeWidth={2} />
                                        </button>
                                        <button
                                            onClick={handleDelete}
                                            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
                                        >
                                            <Trash2 size={15} strokeWidth={2} />
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
            {/* Compose Modal */}
            <AnimatePresence>
                {isComposeOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
                        onClick={() => setIsComposeOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.96, opacity: 0, y: 14 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.96, opacity: 0, y: 14 }}
                            transition={{ duration: 0.18 }}
                            className="bg-white w-full max-w-xl rounded-3xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] border border-gray-100 flex flex-col overflow-hidden max-h-[90vh]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Modal Header */}
                            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-50 bg-white">
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
                                        <Mail size={16} color="#fff" strokeWidth={2.5} />
                                    </div>
                                    <div>
                                        <h3 className="text-[15px] font-medium text-gray-900 leading-none">New Message</h3>
                                        <p className="text-[10px] text-gray-400 font-medium uppercase tracking-widest mt-1">Compose Draft</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsComposeOpen(false)}
                                    className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-50 text-gray-400 hover:text-gray-900 transition-all border border-transparent hover:border-gray-100"
                                >
                                    <X size={16} strokeWidth={2.5} />
                                </button>
                            </div>

                            {/* Modal Body */}
                            <div className="p-0 overflow-y-auto">
                                <div className="p-6 pb-2 space-y-4">
                                    {/* From Selector */}
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-[9px] font-medium text-gray-400 uppercase tracking-widest ml-1">From</label>
                                        <div className="relative">
                                            <select
                                                value={fromEmail}
                                                onChange={(e) => setFromEmail(e.target.value)}
                                                className="w-full appearance-none bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 pr-10 text-[13px] text-gray-800 outline-none focus:border-blue-400 focus:bg-white transition-all cursor-pointer font-medium"
                                            >
                                                {sourceEmails.length > 0
                                                    ? sourceEmails.map((e) => (
                                                        <option key={e.id} value={e.id}>{e.email}</option>
                                                    ))
                                                    : <option value="info@mailorbit.com">info@mailorbit.com</option>
                                                }
                                            </select>
                                            <div className="absolute inset-y-0 right-3.5 flex items-center pointer-events-none text-gray-400">
                                                <ChevronDown size={14} />
                                            </div>
                                        </div>
                                    </div>

                                    {/* To / CC / BCC */}
                                    <div className="space-y-4">
                                        <div className="relative flex flex-col gap-1.5">
                                            <label className="text-[9px] font-medium text-gray-400 uppercase tracking-widest ml-1">Recipient</label>
                                            <div className="relative">
                                                <input
                                                    type="email"
                                                    value={toEmail}
                                                    onChange={(e) => setToEmail(e.target.value)}
                                                    placeholder="To"
                                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 pr-20 text-[13px] font-semibold text-gray-800 outline-none focus:border-blue-400 focus:bg-white transition-all placeholder:text-gray-300"
                                                />
                                                <button
                                                    onClick={() => setShowCcBcc(!showCcBcc)}
                                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[9px] font-medium text-blue-500 hover:text-blue-600 uppercase tracking-widest px-2 py-1 rounded-md bg-blue-50/50 transition-all border border-blue-100/50"
                                                >
                                                    {showCcBcc ? 'Hide' : 'CC/BCC'}
                                                </button>
                                            </div>
                                        </div>

                                        {showCcBcc && (
                                            <div className="grid grid-cols-2 gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
                                                <div className="flex flex-col gap-1.5">
                                                    <input
                                                        type="email"
                                                        value={ccEmail}
                                                        onChange={(e) => setCcEmail(e.target.value)}
                                                        placeholder="Cc"
                                                        className="w-full bg-gray-50/50 border border-gray-100 rounded-xl px-4 py-2 text-[12px] font-medium text-gray-600 outline-none focus:border-blue-200 focus:bg-white transition-all"
                                                    />
                                                </div>
                                                <div className="flex flex-col gap-1.5">
                                                    <input
                                                        type="email"
                                                        value={bccEmail}
                                                        onChange={(e) => setBccEmail(e.target.value)}
                                                        placeholder="Bcc"
                                                        className="w-full bg-gray-50/50 border border-gray-100 rounded-xl px-4 py-2 text-[12px] font-medium text-gray-600 outline-none focus:border-blue-200 focus:bg-white transition-all"
                                                    />
                                                </div>
                                            </div>
                                        )}

                                        <div className="flex flex-col gap-1.5">
                                            <label className="text-[9px] font-medium text-gray-400 uppercase tracking-widest ml-1">Topic</label>
                                            <input
                                                type="text"
                                                value={subject}
                                                onChange={(e) => setSubject(e.target.value)}
                                                placeholder="Subject"
                                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-[13px] font-semibold text-gray-800 outline-none focus:border-blue-400 focus:bg-white transition-all placeholder:text-gray-300"
                                            />
                                        </div>
                                    </div>

                                    {/* Editor Wrap */}
                                    <div className="relative bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                                        <div ref={quillRef} style={{ height: '300px', border: 'none' }} />
                                    </div>

                                    {/* Attachments Display */}
                                    {attachments.length > 0 && (
                                        <div className="flex flex-wrap gap-2 pt-2">
                                            {attachments.map(file => (
                                                <div key={file.id} className="flex items-center gap-2 bg-blue-50/30 border border-blue-100/50 px-3 py-1.5 rounded-xl group hover:bg-white hover:border-blue-200 transition-all">
                                                    <FileText size={12} className="text-blue-500" />
                                                    <div className="flex flex-col">
                                                        <span className="text-[11px] font-medium text-gray-700 truncate max-w-[120px]">{file.name}</span>
                                                        <span className="text-[9px] text-gray-400 font-medium uppercase tracking-tighter">{file.size}</span>
                                                    </div>
                                                    <button
                                                        onClick={() => removeAttachment(file.id)}
                                                        className="p-1 text-gray-300 hover:text-red-500 rounded-full hover:bg-red-50 transition-all"
                                                    >
                                                        <X size={10} />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* Hidden File Input */}
                                    <input
                                        id="composer-file-input"
                                        type="file"
                                        multiple
                                        accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg"
                                        className="hidden"
                                        onChange={handleFileChange}
                                    />
                                </div>
                            </div>

                            {/* Modal Footer */}
                            <div className="flex items-center justify-between px-6 py-4 border-t border-gray-50 bg-gray-50/30">
                                <div className="flex gap-1">

                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => setIsComposeOpen(false)}
                                        className="px-4 py-2 text-[12px] font-medium text-gray-400 hover:text-red-500 transition-colors uppercase tracking-widest text-[10px]"
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
                                                    user_id: user?.id,
                                                    subject: subject,
                                                    body: editorContent,
                                                    attachments: attachments.map(a => ({
                                                        name: a.name,
                                                        type: a.type,
                                                        base64: a.base64
                                                    }))
                                                });
                                                setAttachments([]);
                                                setIsComposeOpen(false);
                                            } catch (err) {
                                                alert('Send failed: ' + (err.response?.data?.message || err.message));
                                            }
                                        }}
                                        className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-[12px] font-medium rounded-xl transition-all shadow-lg shadow-blue-200 active:scale-95 disabled:opacity-50 disabled:active:scale-100"
                                    >
                                        {isEmailLoading ? 'Sending...' : 'Send Message'}
                                        <Send size={14} strokeWidth={2.5} />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
            {/* {Compose Modal End Here} */}
        </>
    );
};

export default EmailSystem;