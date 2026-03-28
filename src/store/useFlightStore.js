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
      set({ flights: response.data, isLoading: false });
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
  },

  addFlight: async (data) => {
    set({ isLoading: true });
    try {
      const response = await api.post('/reservations/flights', data);
      set((state) => ({ flights: [response.data, ...state.flights], isLoading: false }));
      return response.data;
    } catch (err) {
      set({ error: err.message, isLoading: false });
      throw err;
    }
  }
}));

export default useFlightStore;
