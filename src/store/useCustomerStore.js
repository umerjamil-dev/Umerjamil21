import { create } from 'zustand';
import api from '../api/axios';

const useCustomerStore = create((set) => ({
  customers: [],
  isLoading: false,
  error: null,

  fetchCustomers: async () => {
    set({ isLoading: true });
    try {
      const response = await api.get('/customers');
      set({ customers: response.data, isLoading: false });
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
  },

  updateCustomer: async (id, data) => {
    set({ isLoading: true });
    try {
      const response = await api.patch(`/customers/${id}`, data);
      set((state) => ({
        customers: state.customers.map((c) => (c.id === id ? response.data : c)),
        isLoading: false
      }));
    } catch (err) {
      set({ error: err.message, isLoading: false });
      throw err;
    }
  }
}));

export default useCustomerStore;
