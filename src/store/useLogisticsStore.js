import { create } from 'zustand';
import api from '../api/axios';

const useLogisticsStore = create((set) => ({
  logistics: [],
  isLoading: false,
  error: null,

  fetchLogistics: async (id = null) => {
    set({ isLoading: true, error: null });
    try {
      const url = id ? `/operations/logistics/${id}` : '/operations/logistics';
      const response = await api.get(url);
      // Normalize data based on the provided sample structure
      const feedData = response.data?.data || response.data || [];
      set({ 
        logistics: Array.isArray(feedData) ? feedData : [], 
        isLoading: false 
      });
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
  }
}));

export default useLogisticsStore;
