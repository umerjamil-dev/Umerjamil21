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
  isLoading: false,
  error: null,

  fetchDashboardData: async () => {
    set({ isLoading: true });
    try {
      const [metrics, perf, acq] = await Promise.all([
        api.get('/dashboard/metrics'),
        api.get('/dashboard/performance'),
        api.get('/dashboard/acquisition')
      ]);
      set({ 
        metrics: metrics.data,
        performanceData: perf.data,
        acquisitionData: acq.data,
        isLoading: false 
      });
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
  }
}));

export default useDashboardStore;
