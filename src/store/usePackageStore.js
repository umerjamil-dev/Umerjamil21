import { create } from 'zustand';
import api from '../api/axios';

const usePackageStore = create((set) => ({
  packages: [],
  isLoading: false,
  error: null,

  fetchPackages: async () => {
    set({ isLoading: true });
    try {
      const response = await api.get('/packages');
      set({ packages: response.data, isLoading: false });
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
  },

  addPackage: async (data) => {
    set({ isLoading: true });
    try {
      const response = await api.post('/packages', data);
      set((state) => ({ packages: [response.data, ...state.packages], isLoading: false }));
      return response.data;
    } catch (err) {
      set({ error: err.message, isLoading: false });
      throw err;
    }
  }
}));

export default usePackageStore;
