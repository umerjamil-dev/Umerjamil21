import { create } from 'zustand';
import api from '../api/axios';

const useWhatsAppStore = create((set, get) => ({
  messages: [],
  templates: [],
  isLoading: false,
  error: null,

  fetchMessages: async (leadId) => {
    if (!leadId) return;
    set({ isLoading: true });
    try {
      const response = await api.get(`/whatsapp/${leadId}/messages`);
      const messages = response.data?.data || response.data || [];
      set({ messages: Array.isArray(messages) ? messages : [], isLoading: false });
    } catch (err) {
      set({ error: err.message, isLoading: false });
      console.error('Fetch WhatsApp Messages Error:', err);
    }
  },

  fetchTemplates: async () => {
    set({ isLoading: true });
    try {
      const response = await api.get('/whatsapp/templates');
      const templates = response.data?.data || response.data || [];
      set({ templates: Array.isArray(templates) ? templates : [], isLoading: false });
    } catch (err) {
      set({ error: err.message, isLoading: false });
      console.error('Fetch WhatsApp Templates Error:', err);
    }
  },

  sendMessage: async (messageData) => {
    set({ isLoading: true });
    try {
      const response = await api.post('/whatsapp/send', messageData);
      const newMessage = response.data?.data || response.data;
      
      set((state) => ({ 
        messages: [...state.messages, newMessage], 
        isLoading: false 
      }));
      
      return response.data;
    } catch (err) {
      set({ error: err.message, isLoading: false });
      console.error('Send WhatsApp Message Error:', err);
      throw err;
    }
  }
}));

export default useWhatsAppStore;
