import { create } from 'zustand';
import api from '../api/axios';

const useVisaStore = create((set) => ({
  visas: [],
  isLoading: false,
  error: null,

  fetchVisas: async () => {
    set({ isLoading: true });
    try {
      const response = await api.get('/reservations/visas');
      // Normalize response data: Actual array is in response.data.data.data
      const visaArray = response.data?.data?.data || response.data?.data || (Array.isArray(response.data) ? response.data : []);
      set({ visas: Array.isArray(visaArray) ? visaArray : [], isLoading: false });
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
  },

  addVisa: async (data) => {
    set({ isLoading: true });
    try {
      const response = await api.post('/reservations/visas', data);
      // Prepend the new visa, ensuring we extract it correctly
      const newVisa = response.data?.data || response.data || data;
      
      set((state) => ({ 
        visas: [newVisa, ...(Array.isArray(state.visas) ? state.visas : [])], 
        isLoading: false 
      }));
      return newVisa;
    } catch (err) {
      set({ error: err.message, isLoading: false });
      throw err;
    }
  },

  getVisa: async (id) => {
    try {
      const response = await api.get(`/reservations/visas/${id}`);
      const data = response.data?.data || response.data;
      return Array.isArray(data) ? data[0] : data;
    } catch (err) {
      console.error('Error fetching visa:', err);
      throw err;
    }
  }
}));

export default useVisaStore;
