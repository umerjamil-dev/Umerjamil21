import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Loader2, Sparkles } from 'lucide-react';
import axios from '../api/axios';
import { toast } from 'react-hot-toast';

const AIChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Assalamu Alaikum! How can I help you today with Hajj CRM?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      // Pass the entire history to the backend for context
      const history = [...messages, userMessage].map(m => ({ role: m.role, content: m.content }));
      
      const response = await axios.post('/ai/chat', { messages: history });
      
      if (response.data && response.data.reply) {
        setMessages(prev => [...prev, { role: 'assistant', content: response.data.reply }]);
      } else {
        throw new Error('Invalid response from AI');
      }
    } catch (error) {
      console.error('AI Chat Error:', error);
      toast.error('Failed to get a response from the AI assistant.');
      // Optional: Add an error message to the chat
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I encountered an error connecting to the intelligence core. Please try again.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-14 h-14 rounded-full flex items-center justify-center text-white shadow-xl transition-all duration-300 transform hover:scale-105 ${
            isOpen 
              ? 'bg-red-500 hover:bg-red-600 rotate-90' 
              : 'bg-gradient-to-r from-[var(--primary)] to-[var(--tertiary)] hover:from-[var(--tertiary)] hover:to-[var(--primary)]'
          }`}
        >
          {isOpen ? <X size={24} /> : <div className="relative"><MessageSquare size={24} /><div className="absolute -top-1 -right-1 w-3 h-3 bg-[var(--desert-gold)] rounded-full animate-pulse border-2 border-transparent"></div></div>}
        </button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-[360px] md:w-[420px] h-[550px] bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50 border border-[var(--primary)]/10 animate-in slide-in-from-bottom-5 fade-in duration-300">
          {/* Header */}
          <div className="h-16 bg-gradient-to-r from-[var(--primary)] to-[var(--tertiary)] flex items-center px-5 justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center border border-white/30 text-white">
                <Sparkles size={20} />
              </div>
              <div>
                <h3 className="text-white font-bold text-sm leading-tight text-left">CRM Assistant</h3>
                <p className="text-white/70 text-[11px] font-medium text-left">Powered by Ling-2.6</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/70 hover:text-white transition-colors p-1">
              <X size={20} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} w-full`}>
                <div className={`flex gap-2 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  
                  {/* Avatar */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-auto shadow-sm ${
                    msg.role === 'user' 
                      ? 'bg-[var(--desert-gold)] text-white' 
                      : 'bg-white border border-[var(--primary)]/10 text-[var(--primary)]'
                  }`}>
                    {msg.role === 'user' ? <User size={14} /> : <Bot size={16} />}
                  </div>

                  {/* Bubble */}
                  <div className={`px-4 py-2.5 rounded-[20px] text-[13px] leading-relaxed relative ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-br from-[var(--primary)] to-[var(--tertiary)] text-white rounded-br-sm shadow-md shadow-[var(--primary)]/20'
                      : 'bg-white text-gray-700 rounded-bl-sm border border-gray-100 shadow-sm'
                  }`}>
                    <p className="whitespace-pre-wrap">{msg.content}</p>
                  </div>
                </div>
              </div>
            ))}
            
            {loading && (
              <div className="flex justify-start w-full">
                <div className="flex gap-2 max-w-[85%]">
                  <div className="w-8 h-8 rounded-full bg-white border border-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center shrink-0 mt-auto shadow-sm">
                    <Bot size={16} />
                  </div>
                  <div className="px-4 py-3 rounded-[20px] rounded-bl-sm bg-white border border-gray-100 shadow-sm flex items-center gap-1.5 h-10 w-16">
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 bg-white border-t border-[var(--primary)]/5 shrink-0">
            <form onSubmit={handleSubmit} className="flex items-end gap-2 bg-gray-50 border border-gray-200 rounded-[20px] p-1.5 focus-within:bg-white focus-within:border-[var(--primary)]/30 focus-within:ring-2 focus-within:ring-[var(--primary)]/10 transition-all">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about leads or data..."
                className="w-full bg-transparent border-none focus:ring-0 resize-none text-[13px] py-2 px-3 text-gray-700 placeholder-gray-400 rounded-2xl min-h-[40px] max-h-[120px] block"
                rows={1}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
              />
              <button 
                type="submit" 
                disabled={!input.trim() || loading}
                className="w-9 h-9 shrink-0 flex items-center justify-center rounded-full bg-[var(--primary)] text-white hover:bg-[var(--tertiary)] disabled:bg-gray-300 disabled:text-gray-500 transition-colors m-0.5"
              >
                {loading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} className="ml-0.5" />}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChat;
