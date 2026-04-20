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
    destination: 'Makkah, Saudi Arabia',
    check_in_date: '2026-04-30',
    check_out_date: '2026-05-05',
    adults: 2,
    children: 0,
    currency: 'PKR',
    max_distance: null,
    max_price: null,
    min_rating: 0,
    sort: 'price',
    amenities: []
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
        q: searchParams.destination,
        check_in_date: searchParams.check_in_date,
        check_out_date: searchParams.check_out_date,
        adults: searchParams.adults,
        children: searchParams.children,
        currency: searchParams.currency,
        max_distance: searchParams.max_distance,
        max_price: searchParams.max_price,
        min_rating: searchParams.min_rating,
        sort: searchParams.sort,
        amenities: searchParams.amenities
      };

      const response = await api.get('/hotels/search', { params: requestBody });
      const data = response.data;
      
      const hotelsData = data.data || data;
      
      if (hotelsData && Array.isArray(hotelsData)) {
        let filteredHotels = hotelsData;
        
        // Filter based on max_price
        if (searchParams.max_price) {
          filteredHotels = filteredHotels.filter(h => (h.extracted_price || h.price || 0) <= searchParams.max_price);
        }
        
        // Filter based on min_rating
        if (searchParams.min_rating > 0) {
          filteredHotels = filteredHotels.filter(h => (h.overall_rating || 0) >= searchParams.min_rating);
        }
        
        // Filter based on amenities
        if (searchParams.amenities && searchParams.amenities.length > 0) {
          filteredHotels = filteredHotels.filter(h => {
            const hotelAmenities = h.amenities || [];
            return searchParams.amenities.every(amenity => hotelAmenities.includes(amenity));
          });
        }
        
        // Sort hotels
        if (searchParams.sort === 'price') {
          filteredHotels.sort((a, b) => (a.extracted_price || a.price || 0) - (b.extracted_price || b.price || 0));
        } else if (searchParams.sort === 'rating') {
          filteredHotels.sort((a, b) => (b.overall_rating || 0) - (a.overall_rating || 0));
        } else if (searchParams.sort === 'distance') {
          filteredHotels.sort((a, b) => {
            const distA = a.distance_from_haram || 0;
            const distB = b.distance_from_haram || 0;
            return distA - distB;
          });
        }
        
        set({ searchedHotels: filteredHotels, isSearching: false });
        toast.success(`Found ${filteredHotels.length} hotels!`);
      } else {
        toast.error('No hotels found. Try different dates or location.');
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
