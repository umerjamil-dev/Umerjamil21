import { create } from 'zustand';
import api from '../api/axios';

const useUserStore = create((set) => ({
  users: [],
  isLoading: false,
  error: null,

  fetchUsers: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.get('/users');
      set({ 
        users: Array.isArray(response.data) ? response.data : (response.data.data || []), 
        isLoading: false 
      });
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
  },

  addUser: async (userData) => {
    set({ isLoading: true, error: null });
    
    try {
      const response = await api.post('/users', userData);
      set((state) => ({ 
        users: [response.data, ...state.users], 
        isLoading: false 
      }));
      return { success: true, data: response.data };
    } catch (err) {
      set({ error: err.response?.data?.message || err.message, isLoading: false });
      return { success: false, error: err.response?.data?.message || err.message };
    }
  },

  updateUser: async (id, userData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.put(`/users/${id}`, userData);
      set((state) => ({
        users: state.users.map((u) => (u.id === id ? response.data : u)),
        isLoading: false,
      }));
      return { success: true };
    } catch (err) {
      set({ error: err.message, isLoading: false });
      return { success: false, error: err.message };
    }
  },

  deleteUser: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await api.delete(`/users/${id}`);
      set((state) => ({
        users: state.users.filter((u) => u.id !== id),
        isLoading: false,
      }));
      return { success: true };
    } catch (err) {
      set({ error: err.message, isLoading: false });
      return { success: false, error: err.message };
    }
  },
}));

export default useUserStore;
