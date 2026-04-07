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
      const formData = new FormData();
      Object.keys(userData).forEach(key => {
        if (userData[key] !== null && userData[key] !== undefined) {
          formData.append(key, userData[key]);
        }
      });

      const response = await api.post('/users', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      const newUser = response.data?.data || response.data;
      set((state) => ({ 
        users: [newUser, ...state.users], 
        isLoading: false 
      }));
      return { success: true, data: newUser };
    } catch (err) {
      set({ error: err.response?.data?.message || err.message, isLoading: false });
      return { success: false, error: err.response?.data?.message || err.message };
    }
  },

  updateUser: async (id, userData) => {
    set({ isLoading: true, error: null });
    try {
      const formData = new FormData();
      Object.keys(userData).forEach(key => {
        if (userData[key] !== null && userData[key] !== undefined) {
          formData.append(key, userData[key]);
        }
      });
      formData.append('_method', 'PUT');

      const response = await api.post(`/users/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      const updatedUser = response.data?.data || response.data;
      set((state) => ({
        users: state.users.map((u) => (u.id === id ? updatedUser : u)),
        isLoading: false,
      }));
      return { success: true, data: updatedUser };
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
