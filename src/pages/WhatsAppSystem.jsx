import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    MessageCircle, Send, X, Search, MoreVertical,
    Paperclip, Image as ImageIcon, FileText, ArrowLeft,
    Smile, Phone, Video, Check, CheckCheck, User,
    ChevronDown, Download
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import useLeadStore from '../store/useLeadStore';
import useWhatsAppStore from '../store/useWhatsAppStore';
import useAuthStore from '../store/useAuthStore';
import toast from 'react-hot-toast';

const WhatsAppSystem = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { getLead } = useLeadStore();
    const { user } = useAuthStore();
    const {
        messages, templates, fetchMessages, fetchTemplates,
        sendMessage, isLoading: isWhatsAppLoading
    } = useWhatsAppStore();

    const [lead, setLead] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [messageText, setMessageText] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [showTemplates, setShowTemplates] = useState(false);
    const [attachments, setAttachments] = useState([]);

    const messagesEndRef = useRef(null);
    const fileInputRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        const fetchLead = async () => {
            setIsLoading(true);
            try {
                const leadData = await getLead(id);
                setLead(leadData);
            } catch (err) {
                console.error('WhatsAppSystem Fetch Error:', err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchLead();
    }, [id, getLead]);

    useEffect(() => {
        fetchMessages(id);
        fetchTemplates();
    }, [id, fetchMessages, fetchTemplates]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!messageText.trim() && !selectedTemplate && attachments.length === 0) return;

        try {
            await sendMessage({
                lead_id: id,
                user_id: user?.id,
                message: messageText,
                template_id: selectedTemplate?.id,
                attachments: attachments.map(a => ({
                    name: a.name,
                    type: a.type,
                    base64: a.base64
                }))
            });
            setMessageText('');
            setSelectedTemplate(null);
            setAttachments([]);
            toast.success('Message sent');
        } catch (err) {
            toast.error('Failed to send message');
        }
    };

    const handleFileChange = (e) => {
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

        Promise.all(filePromises).then(newAttachments => {
            setAttachments(prev => [...prev, ...newAttachments]);
        });
        e.target.value = null;
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center p-20 text-emerald-500">
                <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="flex h-[calc(100vh-140px)] rounded-3xl mx-auto overflow-hidden border border-gray-200 bg-white shadow-2xl">

            {/* ── Sidebar: Info & Contacts ── */}
            <aside className="w-80 flex-shrink-0 bg-gray-50 border-r border-gray-100 flex flex-col">
                <div className="p-6 bg-white border-b border-gray-100">
                    <div className="flex items-center gap-4 mb-6">
                        <button
                            onClick={() => navigate(`/leads/${id}`)}
                            className="w-10 h-10 flex items-center justify-center bg-gray-100 text-gray-600 hover:bg-[#111827] hover:text-white rounded-xl transition-all group"
                        >
                            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                        </button>
                        <h1 className="text-xl font-bold text-gray-900 font-manrope">WhatsApp</h1>
                    </div>

                    <div className="relative">
                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search messages..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-gray-100 border-transparent rounded-2xl text-sm outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500/20 transition-all font-medium"
                        />
                    </div>
                </div>


            </aside>

            {/* ── Chat Area ── */}
            <main className="flex-1 flex flex-col bg-[#f0f2f5] relative overflow-hidden">
                {/* Background Decoration */}
                <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://branditechture.agency/brand-logos/wp-content/uploads/wp-whatsapp-patterns-background6.jpg')] bg-repeat" />

                {/* Chat Header */}
                <header className="px-6 py-4 bg-white border-b border-gray-100 flex items-center justify-between relative z-10 shadow-sm">
                    <div className="flex items-center gap-4">
                        {/* <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white shadow-lg shadow-emerald-200">
                            <span className="text-lg font-black">{lead?.lead_name?.[0] || 'L'}</span>
                        </div> */}
                        <div>
                            <h2 className="text-base font-bold text-gray-900">{lead?.lead_name}</h2>
                            <div className="flex items-center gap-1.5">
                                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                <span className="text-[11px] font-bold text-emerald-500 uppercase tracking-wider">{lead?.phone}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-gray-100 text-gray-500 transition-colors">
                            <Phone size={18} />
                        </button>
                        <button className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-gray-100 text-gray-500 transition-colors">
                            <Search size={18} />
                        </button>
                        <button className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-gray-100 text-gray-500 transition-colors">
                            <MoreVertical size={18} />
                        </button>
                    </div>
                </header>

                {/* Messages Container */}
                <div className="flex-1 overflow-y-auto p-8 relative z-10 space-y-6">
                    {messages.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center opacity-30 gap-4">
                            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                                <MessageCircle size={40} />
                            </div>
                            <p className="text-sm font-bold uppercase tracking-widest">No messages yet</p>
                        </div>
                    ) : (
                        messages.map((m, idx) => {
                            const isMe = m.type === 'outgoing';
                            return (
                                <motion.div
                                    key={m.id || idx}
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`max-w-[70%] group relative ${isMe ? 'items-end' : 'items-start'}`}>
                                        <div className={`
                                            px-5 py-3.5 rounded-3xl shadow-sm text-sm font-medium leading-relaxed
                                            ${isMe
                                                ? 'bg-emerald-500 text-white rounded-tr-none'
                                                : 'bg-white text-gray-800 rounded-tl-none border border-gray-100'
                                            }
                                        `}>
                                            {m.body}
                                            <div className="flex items-center justify-end gap-1.5 mt-2">
                                                <span className={`text-[10px] font-bold uppercase tracking-tighter opacity-60`}>
                                                    {m.time || 'now'}
                                                </span>
                                                {isMe && <CheckCheck size={12} className="opacity-80" />}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Message Input Area */}
                <footer className="p-6 bg-white border-t border-gray-100 relative z-20">
                    {attachments.length > 0 && (
                        <div className="mb-4 flex flex-wrap gap-2 animate-in fade-in slide-in-from-bottom-2">
                            {attachments.map(file => (
                                <div key={file.id} className="flex items-center gap-2 bg-emerald-50 border border-emerald-100 px-3 py-2 rounded-2xl group">
                                    <FileText size={14} className="text-emerald-500" />
                                    <div className="flex flex-col">
                                        <span className="text-[11px] font-bold text-gray-700 truncate max-w-[150px]">{file.name}</span>
                                        <span className="text-[9px] text-emerald-500 font-black uppercase tracking-tighter">{file.size}</span>
                                    </div>
                                    <button
                                        onClick={() => setAttachments(prev => prev.filter(a => a.id !== file.id))}
                                        className="p-1 text-gray-300 hover:text-red-500 rounded-full transition-colors"
                                    >
                                        <X size={12} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    <form onSubmit={handleSendMessage} className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                            <button
                                type="button"
                                className="w-12 h-12 flex items-center justify-center rounded-2xl hover:bg-gray-100 text-gray-400 transition-colors"
                            >
                                <Smile size={24} />
                            </button>
                            <button
                                type="button"
                                onClick={() => fileInputRef.current.click()}
                                className="w-12 h-12 flex items-center justify-center rounded-2xl hover:bg-gray-100 text-gray-400 transition-colors"
                            >
                                <Paperclip size={24} />
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    multiple
                                    className="hidden"
                                    onChange={handleFileChange}
                                />
                            </button>
                        </div>

                        <div className="flex-1 relative">
                            <input
                                type="text"
                                placeholder="Type a message..."
                                value={messageText}
                                onChange={(e) => setMessageText(e.target.value)}
                                className="w-full px-6 py-4 bg-gray-50 border-transparent rounded-2xl text-sm outline-none focus:bg-white focus:ring-4 focus:ring-emerald-500/10 transition-all font-medium placeholder:text-gray-400"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isWhatsAppLoading || (!messageText.trim() && attachments.length === 0)}
                            className="w-14 h-14 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl flex items-center justify-center shadow-xl shadow-emerald-200 transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100"
                        >
                            <Send size={24} className="ml-1" />
                        </button>
                    </form>
                </footer>
            </main>
        </div>
    );
};
export default WhatsAppSystem;
