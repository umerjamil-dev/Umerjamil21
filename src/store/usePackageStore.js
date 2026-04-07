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
      const packagesArray = response.data?.data || response.data || [];
      set({ packages: Array.isArray(packagesArray) ? packagesArray : [], isLoading: false });
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
  },

  getPackage: async (id) => {
    set({ isLoading: true });
    try {
      const response = await api.get(`/packages/${id}`);
      const pkg = response.data?.data || response.data;
      set({ isLoading: false });
      return pkg;
    } catch (err) {
      set({ error: err.message, isLoading: false });
      throw err;
    }
  },

  addPackage: async (data) => {
    set({ isLoading: true });
    try {
      const payload = {
        title: data.title,
        makkah_hotel: data.makkahHotel,
        madinah_hotel: data.madinahHotel,
        nights_makkah: data.nightsMakkah,
        nights_madinah: data.nightsMadinah,
        base_price: data.basePrice,
        category: data.category,
        package_type: data.package_type,
        status_id: data.status_id,
      };
      const response = await api.post('/packages', payload);
      const newPkg = response.data?.data || response.data;
      set((state) => ({ 
        packages: [newPkg, ...(Array.isArray(state.packages) ? state.packages : [])], 
        isLoading: false 
      }));
      return newPkg;
    } catch (err) {
      set({ error: err.message, isLoading: false });
      throw err;
    }
  },

  updatePackage: async (id, data) => {
    set({ isLoading: true });
    try {
      // Use method spoofing if needed, but standard JSON update for now
      const response = await api.patch(`/packages/${id}`, data);
      const updatedPkg = response.data?.data || response.data;
      set((state) => ({
        packages: (Array.isArray(state.packages) ? state.packages : []).map((p) => (p.id === id ? updatedPkg : p)),
        isLoading: false
      }));
      return updatedPkg;
    } catch (err) {
      set({ error: err.message, isLoading: false });
      throw err;
    }
  },

  deletePackage: async (id) => {
    set({ isLoading: true });
    try {
      await api.delete(`/packages/${id}`);
      set((state) => ({
        packages: (Array.isArray(state.packages) ? state.packages : []).filter((p) => p.id !== id),
        isLoading: false
      }));
    } catch (err) {
      set({ error: err.message, isLoading: false });
      throw err;
    }
  }
}));

export default usePackageStore;
