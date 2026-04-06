import { create } from 'zustand';
import api from '../api/axios';

const useFlightStore = create((set) => ({
  flights: [],
  isLoading: false,
  error: null,

   fetchFlights: async () => {
    set({ isLoading: true });
    try {
      const response = await api.get('/reservations/flights');
      // Normalize response data: The actual array is in response.data.data.data for paginated responses
      const flightArray = response.data?.data?.data || response.data?.data || (Array.isArray(response.data) ? response.data : []);
      set({ flights: Array.isArray(flightArray) ? flightArray : [], isLoading: false });
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
  },

  addFlight: async (data) => {
    set({ isLoading: true });
    try {
      const response = await api.post('/reservations/flights', data);
      // Prepend the new flight, ensuring we extract it correctly
      const newFlight = response.data?.data || response.data || data;
      
      set((state) => ({ 
        flights: [newFlight, ...(Array.isArray(state.flights) ? state.flights : [])], 
        isLoading: false 
      }));
      return newFlight;
    } catch (err) {
      set({ error: err.message, isLoading: false });
      throw err;
    }
  },

  getFlight: async (id) => {
    try {
      const response = await api.get(`/reservations/flights/${id}`);
      const data = response.data?.data || response.data;
      return Array.isArray(data) ? data[0] : data;
    } catch (err) {
      console.error('Error fetching flight:', err);
      throw err;
    }
  }
}));

export default useFlightStore;
