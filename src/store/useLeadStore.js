import { create } from 'zustand';
import api from '../api/axios';

const useLeadStore = create((set, get) => ({
  leads: [],
  isLoading: false,
  error: null,

  fetchLeads: async () => {
    set({ isLoading: true });
    try {
      const response = await api.get('/leads');
      set({ leads: response.data, isLoading: false });
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
  },

  addLead: async (leadData) => {
    set({ isLoading: true });
    try {
      const response = await api.post('/leads', leadData);
      set((state) => ({ 
        leads: [response.data, ...state.leads], 
        isLoading: false 
      }));
      return response.data;
    } catch (err) {
      set({ error: err.message, isLoading: false });
      throw err;
    }
  },

  updateLead: async (id, updateData) => {
    set({ isLoading: true });
    try {
      const response = await api.patch(`/leads/${id}`, updateData);
      set((state) => ({
        leads: state.leads.map((l) => (l.id === id ? response.data : l)),
        isLoading: false
      }));
      return response.data;
    } catch (err) {
      set({ error: err.message, isLoading: false });
      throw err;
    }
  },

  deleteLead: async (id) => {
    set({ isLoading: true });
    try {
      await api.delete(`/leads/${id}`);
      set((state) => ({
        leads: state.leads.filter((l) => l.id !== id),
        isLoading: false
      }));
    } catch (err) {
      set({ error: err.message, isLoading: false });
      throw err;
    }
  }
}));

export default useLeadStore;
