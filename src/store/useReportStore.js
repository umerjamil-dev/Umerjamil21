import { create } from 'zustand';
import api from '../api/axios';

const useReportStore = create((set) => ({
  bookingReports: [],
  paymentReports: [],
  salesReports: [],
  customerReports: [],
  isLoading: false,
  error: null,

  fetchReports: async (type) => {
    set({ isLoading: true });
    try {
      const response = await api.get(`/reports/${type}`);
      const key = `${type}Reports`;
      set({ [key]: response.data, isLoading: false });
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
  }
}));

export default useReportStore;
