import { create } from 'zustand';
import api from '../api/axios';

const useEmailStore = create((set, get) => ({
  sentEmails: [],
  sourceEmails: [],
  inboxEmails: [],
  trashEmails: [],
  isLoading: false,
  error: null,

  sourceEmailFetch: async () => {
    set({ isLoading: true });
    try {
      const response = await api.get('/emails/accounts');
      const emails = response.data?.data || response.data || [];

      set({ sourceEmails: Array.isArray(emails) ? emails : [], isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
      console.error("failed to get source email", error);
    }
  },


  fetchSentEmails: async (leadId, userId) => {
    if (!leadId || !userId) return;
    set({ isLoading: true });
    try {
      const response = await api.get(`/emails/${leadId}/sent/${userId}`);
      const emails = response.data?.data || response.data || [];
      set({ sentEmails: Array.isArray(emails) ? emails : [], isLoading: false });
    } catch (err) {
      set({ error: err.message, isLoading: false });
      console.error('Fetch Sent Emails Error:', err);
    }
  },


fetchInboxEmails: async (leadId, userId) => {
  if (!leadId || !userId) return;
  set({ isLoading: true });
  try {
    const response = await api.get(`/emails/${leadId}/inbox/${userId}`);
    const emails = response.data?.data || response.data || [];
    set({ inboxEmails: Array.isArray(emails) ? emails : [], isLoading: false });
  } catch (err) {
    set({ error: err.message, isLoading: false });
    console.error('Fetch Inbox Emails Error:', err);
  }
},
fetchTrashEmails: async (leadId, userId) => {
  if (!leadId || !userId) return;
  set({ isLoading: true });
  try {
    const response = await api.get(`/emails/${leadId}/trash/${userId}`);
    const emails = response.data?.data || response.data || [];
    set({ trashEmails: Array.isArray(emails) ? emails : [], isLoading: false });
  } catch (err) {
    set({ error: err.message, isLoading: false });
    console.error('Fetch Trash Emails Error:', err);
  }
},


  sendEmail: async (emailData) => {
    set({ isLoading: true });
    try {
      const response = await api.post('/emails/send', emailData);
      const newEmail = response.data?.data || response.data;
      
      // Update sent emails local state if successful
      set((state) => ({ 
        sentEmails: [newEmail, ...state.sentEmails], 
        isLoading: false 
      }));
      
      return response.data;
    } catch (err) {
      set({ error: err.message, isLoading: false });
      console.error('Send Email Error:', err);
      throw err;
    }
  }
}));

export default useEmailStore;
