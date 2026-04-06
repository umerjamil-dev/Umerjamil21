import { create } from 'zustand';
import api from '../api/axios';

const useTransportStore = create((set) => ({
  transports: [],
  isLoading: false,
  error: null,


  
  fetchTransports: async () => {
    set({ isLoading: true });
    try {
      const response = await api.get('/reservations/transport');
      // Normalize response data: Actual array is in response.data.data.data
      const transportArray = response.data?.data?.data || response.data?.data || (Array.isArray(response.data) ? response.data : []);
      set({ transports: Array.isArray(transportArray) ? transportArray : [], isLoading: false });
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
  },

  addTransport: async (data) => {
    set({ isLoading: true });
    try {
      const response = await api.post('/reservations/transport', data);
      // Prepend the new transport, ensuring we extract it correctly
      const newTransport = response.data?.data || response.data || data;
      
      set((state) => ({ 
        transports: [newTransport, ...(Array.isArray(state.transports) ? state.transports : [])], 
        isLoading: false 
      }));
      return newTransport;
    } catch (err) {
      set({ error: err.message, isLoading: false });
      throw err;
    }
  },

  getTransport: async (id) => {
    try {
      const response = await api.get(`/reservations/transport/${id}`);
      const data = response.data?.data || response.data;
      return Array.isArray(data) ? data[0] : data;
    } catch (err) {
      console.error('Error fetching transport:', err);
      throw err;
    }
  }
}));

export default useTransportStore;
