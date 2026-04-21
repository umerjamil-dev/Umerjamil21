import { create } from 'zustand';
import api from '../api/axios';
import toast from 'react-hot-toast';

const useHotelStore = create((set, get) => ({
  // State for existing hotels CRUD
  hotels: [],
  isLoading: false,
  error: null,

  // State for live hotel search
  searchParams: {
    city: 'Makkah Hotels',
    check_in: '2026-05-01',
    check_out: '2026-05-05',
    adults: 2,
    children: 1,
    currency: 'PKR'
  },
  searchedHotels: [],
  isSearching: false,
  selectedHotel: null,

  // Update search params
  updateSearchParams: (params) => {
    set((state) => ({
      searchParams: { ...state.searchParams, ...params }
    }));
  },

  // Search live hotels
  searchHotels: async () => {
    const { searchParams } = get();
    set({ isSearching: true, searchedHotels: [] });
    
    try {
      const requestBody = {
        city: searchParams.city,
        check_in: searchParams.check_in,
        check_out: searchParams.check_out,
        adults: searchParams.adults,
        currency: searchParams.currency
      };

      const response = await api.get('/hotels/search', { params: requestBody });
      const data = response.data;
      
      const hotelsData = data.ads || data;
      
      if (hotelsData && Array.isArray(hotelsData)) {
        set({ searchedHotels: hotelsData, isSearching: false });
        toast.success(`Found ${hotelsData.length} hotels!`);
      } else {
        toast.error(data.error || 'No hotels found. Try different dates or location.');
        set({ searchedHotels: [], isSearching: false });
      }
    } catch (error) {
      console.error('Error fetching hotels:', error);
      toast.error(error.response?.data?.message || 'Failed to fetch hotels. Please try again.');
      set({ searchedHotels: [], isSearching: false });
    }
  },

  // Select/deselect hotel
  selectHotel: (hotel) => {
    set((state) => ({
      selectedHotel: state.selectedHotel === hotel ? null : hotel
    }));
  },

  // Clear search results
  clearSearch: () => {
    set({ searchedHotels: [], selectedHotel: null });
  },

  // Existing CRUD operations

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
