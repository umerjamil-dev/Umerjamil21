import { create } from 'zustand';
import api from '../api/axios';

const useBookingStore = create((set) => ({
  bookings: [],
  isLoading: false,
  error: null,

  fetchBookings: async () => {
    set({ isLoading: true });
    try {
      const response = await api.get('/bookings');
      
      // Normalize response data: support paginated array or indexed object
      let data = response.data?.data?.data || response.data?.data || response.data;
      
      const bookingArray = Array.isArray(data) 
        ? data 
        : (typeof data === 'object' && data !== null ? Object.values(data) : []);

      set({ bookings: bookingArray, isLoading: false });
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
  },

  createBooking: async (bookingData) => {
    set({ isLoading: true });
    try {
      const response = await api.post('/bookings', bookingData);
      // Prepend the new booking, ensuring we extract it correctly
      const newBooking = response.data?.data || response.data || bookingData;
      
      set((state) => ({ 
        bookings: [newBooking, ...(Array.isArray(state.bookings) ? state.bookings : [])], 
        isLoading: false 
      }));
      return newBooking;
    } catch (err) {
      set({ error: err.message, isLoading: false });
      throw err;
    }
  },

  updateBooking: async (id, bookingData) => {
    set({ isLoading: true });
    try {
      const response = await api.put(`/bookings/${id}`, bookingData);
      set((state) => ({
        bookings: state.bookings.map((b) => (b.id == id ? (response.data.data || response.data) : b)),
        isLoading: false
      }));
      return response.data;
    } catch (err) {
      set({ error: err.message, isLoading: false });
      throw err;
    }
  },

  deleteBooking: async (id) => {
    set({ isLoading: true });
    try {
      await api.delete(`/bookings/${id}`);
      set((state) => ({
        bookings: state.bookings.filter((b) => b.id !== id),
        isLoading: false
      }));
    } catch (err) {
      set({ error: err.message, isLoading: false });
      throw err;
    }
  },

  fetchBooking: async (id) => {
    set({ isLoading: true });
    try {
      const response = await api.get(`/bookings/${id}`);
      set({ isLoading: false });
      return response.data?.data || response.data;
    } catch (err) {
      set({ error: err.message, isLoading: false });
      throw err;
    }
  }
}));

export default useBookingStore;
