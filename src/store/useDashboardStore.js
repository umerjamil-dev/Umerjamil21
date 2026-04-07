import { create } from 'zustand';
import api from '../api/axios';

const useDashboardStore = create((set) => ({
  metrics: {
    active_inquiries: { value: 0, growth: '0%', trend: 'up' },
    total_secured: { value: 0, growth: '0%', trend: 'up' },
    live_flights: { value: 0, status: 'Stable Ops' }
  },
  performanceData: {
    Weekly: { categories: [], umrah: [], hajj: [] },
    Monthly: { categories: [], umrah: [], hajj: [] },
    Yearly: { categories: [], umrah: [], hajj: [] }
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
        metrics: metrics.data?.data || metrics.data,
        performanceData: perf.data?.data || perf.data,
        acquisitionData: acq.data?.data || acq.data,
        activities: activities.data?.data || activities.data,
        regionsData: regions.data?.data || regions.data,
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
      set({ activities: response.data?.data || response.data, isLoading: false });
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
  }
}));

export default useDashboardStore;
