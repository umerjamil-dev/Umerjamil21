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
      set({ bookings: response.data, isLoading: false });
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
  }
}));

export default useBookingStore;
