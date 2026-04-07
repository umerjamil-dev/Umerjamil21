import { create } from 'zustand';
import api from '../api/axios';

const useAssignmentStore = create((set) => ({
  assignments: [],
  isLoading: false,
  error: null,

  fetchAssignments: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.get('/assignments');
      set({ 
        assignments: Array.isArray(response.data) ? response.data : (response.data.data || []), 
        isLoading: false 
      });
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
  },

  addAssignment: async (assignmentData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.post('/assignments', assignmentData);
      const newAssignment = response.data?.data || response.data;
      set((state) => ({ 
        assignments: [newAssignment, ...state.assignments], 
        isLoading: false 
      }));
      return { success: true, data: newAssignment };
    } catch (err) {
      set({ error: err.response?.data?.message || err.message, isLoading: false });
      return { success: false, error: err.response?.data?.message || err.message };
    }
  },

  updateAssignment: async (id, assignmentData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.put(`/assignments/${id}`, assignmentData);
      const updatedAssignment = response.data?.data || response.data;
      set((state) => ({
        assignments: state.assignments.map((a) => (a.id === id ? updatedAssignment : a)),
        isLoading: false,
      }));
      return { success: true, data: updatedAssignment };
    } catch (err) {
      set({ error: err.message, isLoading: false });
      return { success: false, error: err.message };
    }
  },

  deleteAssignment: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await api.delete(`/assignments/${id}`);
      set((state) => ({
        assignments: state.assignments.filter((a) => a.id !== id),
        isLoading: false,
      }));
      return { success: true };
    } catch (err) {
      set({ error: err.message, isLoading: false });
      return { success: false, error: err.message };
    }
  },
}));

export default useAssignmentStore;
