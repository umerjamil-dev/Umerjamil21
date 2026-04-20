import { create } from 'zustand';
import api from '../api/axios';
import toast from 'react-hot-toast';

const useFlightStore = create((set, get) => ({
  // State for existing flights CRUD
  flights: [],
  isLoading: false,
  error: null,
  
  // State for live flight search
  searchParams: {
    from: ['LHE'],
    to: 'JED',
    departure_date: '2026-05-01',
    return_date: '2026-05-15',
    trip_type: 'round',
    adults: 2,
    children: 1,
    infants: 0,
    cabin_class: 'economy',
    currency: 'PKR',
    non_stop: false,
    max_price: null,
    sort: 'price'
  },
  searchedFlights: [],
  isSearching: false,
  selectedFlight: null,

  // Update search params
  updateSearchParams: (params) => {
    set((state) => ({
      searchParams: { ...state.searchParams, ...params }
    }));
  },

  // Search live flights
  searchFlights: async () => {
    const { searchParams } = get();
    set({ isSearching: true, searchedFlights: [] });
    
    try {
      const requestBody = {
        from: searchParams.from,
        to: searchParams.to,
        departure_date: searchParams.departure_date,
        return_date: searchParams.return_date,
        trip_type: searchParams.trip_type,
        adults: searchParams.adults,
        children: searchParams.children,
        infants: searchParams.infants,
        cabin_class: searchParams.cabin_class,
        currency: searchParams.currency,
        non_stop: searchParams.non_stop,
        max_price: searchParams.max_price,
        sort: searchParams.sort
      };

      const response = await api.get('/flights/search', { params: requestBody });
      const data = response.data;
      
      const flightsData = data.data || data;
      
      if (flightsData.best_flights || flightsData.other_flights) {
        const allFlights = [
          ...(flightsData.best_flights || []),
          ...(flightsData.other_flights || [])
        ];
        
        // Filter based on non_stop preference
        let filteredFlights = searchParams.non_stop 
          ? allFlights.filter(f => !f.layovers || f.layovers.length === 0)
          : allFlights;
        
        // Filter based on max_price
        if (searchParams.max_price) {
          filteredFlights = filteredFlights.filter(f => f.price <= searchParams.max_price);
        }
        
        // Sort flights
        if (searchParams.sort === 'price') {
          filteredFlights.sort((a, b) => a.price - b.price);
        } else if (searchParams.sort === 'duration') {
          filteredFlights.sort((a, b) => (a.total_duration || 0) - (b.total_duration || 0));
        }
        
        set({ searchedFlights: filteredFlights, isSearching: false });
        toast.success(`Found ${filteredFlights.length} flights!`);
      } else {
        toast.error('No flights found. Try different dates or airports.');
        set({ searchedFlights: [], isSearching: false });
      }
    } catch (error) {
      console.error('Error fetching flights:', error);
      toast.error(error.response?.data?.message || 'Failed to fetch flights. Please try again.');
      set({ searchedFlights: [], isSearching: false });
    }
  },

  // Select/deselect flight
  selectFlight: (flight) => {
    set((state) => ({
      selectedFlight: state.selectedFlight === flight ? null : flight
    }));
  },

  // Clear search results
  clearSearch: () => {
    set({ searchedFlights: [], selectedFlight: null });
  },

  // Existing CRUD operations
  fetchFlights: async () => {
    set({ isLoading: true });
    try {
      const response = await api.get('/reservations/flights');
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
