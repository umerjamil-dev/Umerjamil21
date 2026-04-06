import { create } from 'zustand';
import api from '../api/axios';

const usePaymentStore = create((set) => ({
  payments: [],
  isLoading: false,
  error: null,

  fetchPayments: async () => {
    set({ isLoading: true });
    try {
      const response = await api.get('/payments');
      const data = response.data?.data || response.data || [];
      set({ payments: Array.isArray(data) ? data : [], isLoading: false });
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
  },

  addPayment: async (paymentData) => {
    set({ isLoading: true });
    try {
      const response = await api.post('/payments', paymentData);
      set((state) => ({
        payments: [response.data, ...state.payments],
        isLoading: false
      }));
      return response.data;
    } catch (err) {
      set({ error: err.message, isLoading: false });
      throw err;
    }
  }
}));

export default usePaymentStore;
