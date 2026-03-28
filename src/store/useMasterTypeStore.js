import { create } from 'zustand';
import api from '../api/axios';

const useMasterTypeStore = create((set, get) => ({
  masterTypes: [],
  leadSources: [],
  leadStatuses: [],
  paymentMethods: [],
  roles: [],
  userStatuses: [],
  isLoading: false,
  error: null,

  // Fetch specific types based on flag and optional filter
  fetchMasterTypes: async (typeFlag, forParam = null) => {
    set({ isLoading: true });
    try {
      let url = `/master-types/${typeFlag}`;
      if (forParam) {
        url += `?for=${forParam}`;
      }
      
      const response = await api.get(url);
      const data = response.data.requested_names || response.data; // Handle success wrapper if needed

      // Map response to specific collections based on 'for' or 'typeFlag'
      const target = forParam || typeFlag;
      
      switch (target.toLowerCase()) {
        case 'lead':
          set({ leadStatuses: data, isLoading: false });
          break;
        case 'leadsource':
          set({ leadSources: data, isLoading: false });
          break;
        case 'payment_method':
          set({ paymentMethods: data, isLoading: false });
          break;
        case 'role':
          set({ roles: data, isLoading: false });
          break;
        case 'user':
          set({ userStatuses: data, isLoading: false });
          break;
        default:
          set({ masterTypes: data, isLoading: false });
      }
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
  },

  // Generic add method (adjusting to URL segment pattern if needed)
  addMasterType: async (typeFlag, data) => {
    set({ isLoading: true });
    try {
      const response = await api.post(`/master-types/${typeFlag}`, data);
      await get().fetchMasterTypes(typeFlag); // Refresh
      return response.data;
    } catch (err) {
      set({ error: err.message, isLoading: false });
      throw err;
    }
  },

  // Update
  updateMasterType: async (typeFlag, id, data) => {
    set({ isLoading: true });
    try {
      const response = await api.patch(`/master-types/${typeFlag}/${id}`, data);
      await get().fetchMasterTypes(typeFlag); // Refresh
      return response.data;
    } catch (err) {
      set({ error: err.message, isLoading: false });
      throw err;
    }
  },

  // Delete
  deleteMasterType: async (typeFlag, id) => {
    set({ isLoading: true });
    try {
      await api.delete(`/master-types/${typeFlag}/${id}`);
      await get().fetchMasterTypes(typeFlag); // Refresh
    } catch (err) {
      set({ error: err.message, isLoading: false });
      throw err;
    }
  }
}));

export default useMasterTypeStore;
