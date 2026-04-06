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
      // Normalize response data: Hotel response is an object with numeric keys inside data.data
      const hotelData = response.data?.data;
      const hotelArray = hotelData ? Object.values(hotelData) : [];
      set({ hotels: Array.isArray(hotelArray) ? hotelArray : [], isLoading: false });
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
  },

  addHotel: async (data) => {
    set({ isLoading: true });
    try {
      const response = await api.post('/reservations/hotels', data);
      // Prepend the new hotel, ensuring we extract it correctly
      const newHotel = response.data?.data || response.data || data;
      
      set((state) => ({ 
        hotels: [newHotel, ...(Array.isArray(state.hotels) ? state.hotels : [])], 
        isLoading: false 
      }));
      return newHotel;
    } catch (err) {
      set({ error: err.message, isLoading: false });
      throw err;
    }
  },

  getHotel: async (id) => {
    try {
      const response = await api.get(`/reservations/hotels/${id}`);
      const data = response.data?.data || response.data;
      return Array.isArray(data) ? data[0] : data;
    } catch (err) {
      console.error('Error fetching hotel:', err);
      throw err;
    }
  }
}));

export default useHotelStore;
