import { create } from 'zustand';
import api from '../api/axios';

const useOperationsStore = create((set) => ({
  staff: [],
  liveTasks: [],
  sectorSaturation: [],
  overview: null,
  assignments: [],
  assignmentsLoading: false,
  isLoading: false,
  error: null,

  fetchOperationsData: async () => {
    set({ isLoading: true, error: null });

    try {
      const [staffRes, tasksRes, saturationRes, overviewRes] = await Promise.allSettled([
        api.get('/operations/staff'),
        api.get('/operations/tasks'),
        api.get('/operations/saturation'),
        api.get('/dashboard/overview')
      ]);

      const overviewData = overviewRes.status === 'fulfilled' ? overviewRes.value.data : null;

      // Console logs for debugging as requested by user
      // console.log('📦 Operations Data Fetched:');
      // console.log('• Staff:', staffRes.status === 'fulfilled' ? staffRes.value.data : 'FAILED');
      console.log('• overview:', overviewData);

      const staffData = staffRes.status === 'fulfilled' ? staffRes.value.data : null;
      const staffList = staffData?.data ?? (Array.isArray(staffData) ? staffData : []);

      set({
        staff: staffList,
        liveTasks: tasksRes.status === 'fulfilled' ? (tasksRes.value.data || []) : [],
        sectorSaturation: saturationRes.status === 'fulfilled' ? (saturationRes.value.data || []) : [],
        overview: overviewData,
        isLoading: false
      });

    } catch (err) {
      console.error('❌ Fetch operations error:', err);
      set({
        error: err.response?.data?.message || err.message || 'Something went wrong',
        isLoading: false
      });
    }
  },

  fetchAssignments: async (userId) => {
    if (!userId) {
      console.warn('⚠️ fetchAssignments called without userId');
      return;
    }
    set({ assignmentsLoading: true });

    try {
      console.log(`📡 Fetching dispatch list for User ID: ${userId}...`);
      const res = await api.get(`/dashboard/dispatchList/${userId}`);
      const data = res.data;

      // Log the actual data coming from API
      console.log('📋 Dispatch List API Response:', data);

      // Handle expected data_abx key or generic data/array
      let list = [];
      if (data?.data_abx && Array.isArray(data.data_abx)) {
        list = data.data_abx;
      } else if (Array.isArray(data)) {
        list = data;
      } else if (data?.data && Array.isArray(data.data)) {
        list = data.data;
      }
      

      set({ assignments: list, assignmentsLoading: false });
    } catch (err) {
      console.error('❌ Fetch assignments error:', err);
      set({ assignments: [], assignmentsLoading: false });
    }
  },

  dispatchTask: async (taskData) => {
    set({ isLoading: true, error: null });

    try {
      const response = await api.post('/operations/tasks', taskData);

      set((state) => ({
        liveTasks: [response.data, ...state.liveTasks],
        isLoading: false
      }));

      return response.data;
    } catch (err) {
      console.error('❌ Dispatch task error:', err);
      set({
        error: err.response?.data?.message || err.message,
        isLoading: false
      });
      throw err;
    }
  }
}));

export default useOperationsStore;