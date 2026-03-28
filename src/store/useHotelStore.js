import { create } from 'zustand';
import api from '../api/axios';

const useHotelStore = create((set) => ({
  hotels: [],
  isLoading: false,
  error: null,

  fetchHotels: async () => {
    set({ isLoading: true });
    try {
      const response = await api.get('/reservations/hotels');
      set({ hotels: response.data, isLoading: false });
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
  },

  addHotel: async (data) => {
    set({ isLoading: true });
    try {
      const response = await api.post('/reservations/hotels', data);
      set((state) => ({ hotels: [response.data, ...state.hotels], isLoading: false }));
      return response.data;
    } catch (err) {
      set({ error: err.message, isLoading: false });
      throw err;
    }
  }
}));

export default useHotelStore;
