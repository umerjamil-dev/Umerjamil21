import { create } from 'zustand';
import api from '../api/axios';

const useTransportStore = create((set) => ({
  transportList: [],
  isLoading: false,
  error: null,

  fetchTransport: async () => {
    set({ isLoading: true });
    try {
      const response = await api.get('/reservations/transport');
      set({ transportList: response.data, isLoading: false });
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
  },

  addTransport: async (data) => {
    set({ isLoading: true });
    try {
      const response = await api.post('/reservations/transport', data);
      set((state) => ({ transportList: [response.data, ...state.transportList], isLoading: false }));
      return response.data;
    } catch (err) {
      set({ error: err.message, isLoading: false });
      throw err;
    }
  }
}));

export default useTransportStore;
