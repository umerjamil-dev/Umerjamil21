import { create } from 'zustand';
import api from '../api/axios';

const useOperationsStore = create((set) => ({
  staff: [],
  liveTasks: [],
  sectorSaturation: [],
  overview: null,
  isLoading: false,
  error: null,

  fetchOperationsData: async () => {
    set({ isLoading: true });
    try {
      const [staff, tasks, saturation, overview] = await Promise.all([
        api.get('/operations/staff'),
        api.get('/operations/tasks'),
        api.get('/operations/saturation'),
        api.get('/dashboard/overview')
      ]);
      set({ 
        staff: staff.data,
        liveTasks: tasks.data,
        sectorSaturation: saturation.data,
        overview: overview.data,
        isLoading: false 
      });
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
  },

  dispatchTask: async (taskData) => {
    set({ isLoading: true });
    try {
      const response = await api.post('/operations/tasks', taskData);
      set(state => ({ 
        liveTasks: [response.data, ...state.liveTasks],
        isLoading: false 
      }));
      return response.data;
    } catch (err) {
      set({ error: err.message, isLoading: false });
      throw err;
    }
  }
}));

export default useOperationsStore;
