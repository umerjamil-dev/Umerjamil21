import { create } from 'zustand';
import api from '../api/axios';

const useCalculatorStore = create((set) => ({
  packages: [],
  isLoading: false,
  error: null,

  fetchPackages: async () => {
    set({ isLoading: true });
    try {
      const response = await api.get('/packages');
      const pkgs = response.data?.data || response.data || [];
      set({ packages: Array.isArray(pkgs) ? pkgs : [], isLoading: false });
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
  },
}));

export default useCalculatorStore;
