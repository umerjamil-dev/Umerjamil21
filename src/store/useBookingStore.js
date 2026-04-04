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
    set({ bookings: response.data.data || [], isLoading: false });
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
  },

  createBooking: async (bookingData) => {
    set({ isLoading: true });
    try {
      const response = await api.post('/bookings', bookingData);
      set((state) => ({ 
        bookings: [response.data, ...state.bookings], 
        isLoading: false 
      }));
      return response.data;
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
  }
}));

export default useBookingStore;
