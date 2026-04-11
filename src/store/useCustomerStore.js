import { create } from 'zustand';
import api from '../api/axios';
import axios from 'axios';

const useCustomerStore = create((set) => ({
  customers: [],
  isLoading: false,
  error: null,

  fetchCustomers: async () => {
    set({ isLoading: true });
    try {
      const response = await api.get('/customers');
      const customersArray = response.data?.data || response.data || [];
      set({ customers: Array.isArray(customersArray) ? customersArray : [], isLoading: false });
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
  },

  getCustomer: async (id) => {
    set({ isLoading: true });
    try {
      const response = await api.get(`/customers/${id}`);
      const customer = response.data?.data || response.data;
      set({ isLoading: false });
      return customer;
    } catch (err) {
      set({ error: err.message, isLoading: false });
      throw err;
    }
  },

  addCustomer: async (data) => {
    set({ isLoading: true });
    try {
      const formData = new FormData();
      Object.keys(data).forEach(key => {
        if (data[key] !== null && data[key] !== undefined) {
          formData.append(key, data[key]);
        }
      });

      const response = await api.post('/customers', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const newCustomer = response.data?.data || response.data;
      set((state) => ({
        customers: [newCustomer, ...(Array.isArray(state.customers) ? state.customers : [])],
        isLoading: false
      }));
      return newCustomer;
    } catch (err) {
      set({ error: err.message, isLoading: false });
      throw err;
    }
  },

  updateCustomer: async (id, data) => {
    set({ isLoading: true });
    try {
      const formData = new FormData();
      Object.keys(data).forEach(key => {
        // If it's the image, only append if it's a new File/Blob
        if (key === 'customer_image') {
          if (data[key] instanceof Blob) {
            formData.append(key, data[key]);
          }
        } else if (data[key] !== null && data[key] !== undefined) {
          formData.append(key, data[key]);
        }
      });
      // Method spoofing for Laravel PATCH with multipart/form-data
      formData.append('_method', 'PATCH');

      const response = await api.post(`/customers/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const updatedCustomer = response.data?.data || response.data;
      set((state) => ({
        customers: (Array.isArray(state.customers) ? state.customers : []).map((c) => (c.id === id ? updatedCustomer : c)),
        isLoading: false
      }));
      return updatedCustomer;
    } catch (err) {
      set({ error: err.message, isLoading: false });
      throw err;
    }
  },

  deleteCustomer: async (id) => {
    set({ isLoading: true });
    try {
      await api.delete(`/customers/${id}`);
      set((state) => ({
        customers: (Array.isArray(state.customers) ? state.customers : []).filter((c) => (c.id !== id)),
        isLoading: false
      }));
    } catch (err) {
      set({ error: err.message, isLoading: false });
      throw err;
    }
  },
  showActionButton: async (id) => {
    try {
      const response = await api.get(`/confirm/${id}`);
      const data = response.data?.data || response.data || [];
      console.log(response);

      let matchFound = false;
      if (Array.isArray(data)) {
        matchFound = data.some(item => String(item.customer_id) === String(id) || String(item.id) === String(id)
          || String(item.customer_id) === String(id) || String(item.id) === String(id)
        ); 
      } else if (data && typeof data === 'object') {
        matchFound = String(data.customer_id) === String(id) || String(data.id) === String(id);
      }
      return matchFound;
    } catch (err) {
      console.error(err);
      return false;
    }
  }
}));

export default useCustomerStore;
