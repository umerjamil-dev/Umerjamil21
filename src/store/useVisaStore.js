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
      set({ visas: response.data, isLoading: false });
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
  },

  addVisa: async (data) => {
    set({ isLoading: true });
    try {
      const response = await api.post('/reservations/visas', data);
      set((state) => ({ visas: [response.data, ...state.visas], isLoading: false }));
      return response.data;
    } catch (err) {
      set({ error: err.message, isLoading: false });
      throw err;
    }
  }
}));

export default useVisaStore;
