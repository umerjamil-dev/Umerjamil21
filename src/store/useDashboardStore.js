import { create } from 'zustand';
import api from '../api/axios';

const useDashboardStore = create((set) => ({
  metrics: null,
  performanceData: {
    Weekly: null,
    Monthly: null,
    Yearly: null
  },
  acquisitionData: [],
  regionsData: [],
  activities: [],
  isLoading: false,
  error: null,

  fetchDashboardData: async () => {
    set({ isLoading: true, error: null });
    try {
      const [metrics, perf, acq, activities, regions] = await Promise.all([
        api.get('/dashboard/metrics'),
        api.get('/dashboard/performance'),
        api.get('/dashboard/acquisition'),
        api.get('/dashboard/activities'),
        api.get('/dashboard/regions')
      ]);
      set({ 
        metrics: metrics.data,
        performanceData: perf.data,
        acquisitionData: acq.data,
        activities: activities.data,
        regionsData: regions.data,
        isLoading: false 
      });
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
  },

  fetchActivities: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.get('/dashboard/activities');
      set({ activities: response.data, isLoading: false });
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
  }
}));

export default useDashboardStore;
