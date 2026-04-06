import { create } from 'zustand';
import api from '../api/axios';

const useReportStore = create((set) => ({
  bookingReports: [],
  paymentReports: [],
  salesReports: [],
  customerReports: [],
  isLoading: false,
  error: null,

  fetchReports: async (type, params = {}) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.get(`/reports/${type}`, { params });
      const data = response.data?.data || response.data || [];
      const key = `${type}Reports`;
      set({ [key]: Array.isArray(data) ? data : [], isLoading: false });
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
  },

  fetchPdfReport: async (type, params = {}) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.get(`/reports/${type}`, { 
        params: { ...params, pdf: 'true' } 
      });
      
      if (response.data && response.data.status) {
        const pdfBase64 = response.data.data.pdf_base64;
        set({ isLoading: false });
        return `data:application/pdf;base64,${pdfBase64}`;
      }
      throw new Error(response.data?.message || 'Failed to fetch PDF');
    } catch (err) {
      set({ error: err.message, isLoading: false });
      return null;
    }
  },

  clearReports: (type) => {
    const key = `${type}Reports`;
    set({ [key]: [], error: null });
  }
}));

export default useReportStore;
