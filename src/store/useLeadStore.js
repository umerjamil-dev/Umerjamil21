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
      // Normalize response data: look for nested 'data' or 'requested_names' property
      const leadsArray = Array.isArray(response.data) 
        ? response.data 
        : (response.data?.data || response.data?.requested_names || []);
      set({ leads: Array.isArray(leadsArray) ? leadsArray : [], isLoading: false });
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
  },

  addLead: async (leadData) => {
    set({ isLoading: true });
    try {
      console.log(leadData);
      
      const response = await api.post('/leads', leadData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      // Prepend the new lead, ensuring we extract it correctly from potential wrapper
      const newLead = response.data?.data || response.data || leadData;
      
      set((state) => ({ 
        leads: [newLead, ...(Array.isArray(state.leads) ? state.leads : [])], 
        isLoading: false 
      }));
      return newLead;
    } catch (err) {
      set({ error: err.message, isLoading: false });
      throw err;
    }
  },

  updateLead: async (id, updateData) => {
    set({ isLoading: true });
    try {
      const response = await api.patch(`/leads/${id}`, updateData);
      const updatedLead = response.data?.data || response.data;

      set((state) => ({
        leads: (Array.isArray(state.leads) ? state.leads : []).map((l) => (l.id === id ? updatedLead : l)),
        isLoading: false
      }));
      return updatedLead;
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
        leads: (Array.isArray(state.leads) ? state.leads : []).filter((l) => l.id !== id),
        isLoading: false
      }));
    } catch (err) {
      set({ error: err.message, isLoading: false });
      throw err;
    }
  },

  getLead: async (id) => {
    set({ isLoading: true });
    try {
      const response = await api.get(`/leads/${id}`);
      const lead = response.data?.data || response.data;
      set({ isLoading: false });
      return lead;
    } catch (err) {
      set({ error: err.message, isLoading: false });
      throw err;
    }
  },


  addLeadNote: async (id, noteText) => {
    set({ isLoading: true });
    try {
      const response = await api.post(`/leads/${id}/comment`, { comment: noteText });
      const newNote = response.data?.data || response.data;
      set({ isLoading: false });
      return newNote;
    } catch (err) {
      set({ error: err.message, isLoading: false });
      throw err;
    }
  }
}));


export default useLeadStore;
