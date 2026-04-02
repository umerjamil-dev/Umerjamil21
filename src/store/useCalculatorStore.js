import { create } from 'zustand';
import api from '../api/axios';

const useCalculatorStore = create((set) => ({
  packages: [],
  isLoading: false,
  error: null,

  fetchPackages: async () => {
    set({ isLoading: true });
    try {
      const response = await api.get('/packagecalculater');
      const pkgs = response.data?.data || response.data || [];
      set({ packages: Array.isArray(pkgs) ? pkgs : [], isLoading: false });
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
  },

  saveCalculation: async (data) => {
    set({ isLoading: true });
    try {
      console.log(data);
      const response = await api.post('/packagecalculater', data);
      set({ isLoading: false });
      return response.data;
    } catch (err) {
      set({ error: err.message, isLoading: false });
      throw err;
    }
  },

  getCalculation: async (id) => {
    set({ isLoading: true });
    try {
      const response = await api.get(`/packagecalculater/${id}`);
      set({ isLoading: false });
      return response.data?.data || response.data;
    } catch (err) {
      set({ error: err.message, isLoading: false });
      throw err;
    }
  },

  

  confirmCalculation: async (token, status) => {
    set({ isLoading: true });
    try {
      const response = await api.post(`/packagecalculater/decision/${token}`, { status });
      set({ isLoading: false });
      return response.data;
    } catch (err) {
      set({ error: err.message, isLoading: false });
      throw err;
    }
  },
}));

export default useCalculatorStore;
