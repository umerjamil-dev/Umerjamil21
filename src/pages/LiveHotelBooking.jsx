import React, { useState, useEffect, useRef } from 'react';
import { Building2, Search, Loader2, Star, MapPin } from 'lucide-react';
import useHotelStore from '../store/useHotelStore';

const LiveHotelBooking = () => {
  const {
    searchParams,
    searchedHotels,
    isSearching,
    selectedHotel,
    updateSearchParams,
    searchHotels,
    selectHotel,
  } = useHotelStore();

  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const suggestionsRef = useRef(null);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!searchParams.city || searchParams.city.length < 2) {
        setSuggestions([]);
        return;
      }
      setIsLoadingSuggestions(true);
      try {
        const res = await fetch(`http://192.168.5.111:8000/api/hotels/autocomplete?q=${searchParams.city}`);
        const data = await res.json();
        if (data.success && data.data) {
          setSuggestions(data.data);
        } else {
          setSuggestions([]);
        }
      } catch (error) {
        console.error('Error fetching autocomplete suggestions:', error);
        setSuggestions([]);
      } finally {
        setIsLoadingSuggestions(false);
      }
    };

    const debounceTimeout = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounceTimeout);
  }, [searchParams.city]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const formatPrice = (price) => {
    if (!price) return 'N/A';
    const currencySymbols = {
      PKR: '₨',
      USD: '$',
      EUR: '€',
      SAR: '﷼',
    };
    const symbol = currencySymbols[searchParams.currency] || searchParams.currency;
    return `${symbol}${price.toLocaleString()}`;
  };

  const renderStars = (rating) => {
    if (!rating) return null;
    return (
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={14}
            className={i < rating ? 'fill-black text-black' : 'text-slate-300'}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="font-inter  px-4 py-6 space-y-6 animate-in fade-in duration-1000">
      {/* Header - more compact */}
      <div className="flex items-center gap-3 pb-4 border-b border-slate-200">
        <Building2 className="text-black" size={28} />
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Live Hotel Search</h1>
          <p className="text-slate-500 text-xs font-medium">Real-time prices in Makkah & Madinah</p>
        </div>
      </div>

      {/* Compact Search Form */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-5">
        {/* Row 1: City + Dates */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="relative" ref={suggestionsRef}>
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">City</label>
            <input
              type="text"
              value={searchParams.city}
              onChange={(e) => {
                updateSearchParams({ city: e.target.value });
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium text-slate-900 outline-none focus:border-black transition-all"
              placeholder="Enter city"
            />
            {showSuggestions && (suggestions.length > 0 || isLoadingSuggestions) && (
              <div className="absolute z-50 w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                {isLoadingSuggestions ? (
                  <div className="p-3 text-center text-xs font-bold text-slate-500 flex items-center justify-center gap-2">
                    <Loader2 size={14} className="animate-spin text-black" />
                    Loading...
                  </div>
                ) : (
                  suggestions.map((item, idx) => (
                    <div
                      key={idx}
                      onClick={() => {
                        updateSearchParams({ city: item.name });
                        setShowSuggestions(false);
                      }}
                      className="px-3 py-2 hover:bg-slate-50 cursor-pointer border-b border-slate-100 last:border-0"
                    >
                      <div className="text-sm font-bold text-slate-900">{item.name}</div>
                      {item.location && <div className="text-xs text-slate-500 truncate">{item.location}</div>}
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
          <div>
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Check-in</label>
            <input
              type="date"
              value={searchParams.check_in}
              onChange={(e) => updateSearchParams({ check_in: e.target.value })}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium text-slate-900 outline-none focus:border-black transition-all"
            />
          </div>
          <div>
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Check-out</label>
            <input
              type="date"
              value={searchParams.check_out}
              onChange={(e) => updateSearchParams({ check_out: e.target.value })}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium text-slate-900 outline-none focus:border-black transition-all"
            />
          </div>
        </div>

        {/* Row 2: Guests + Currency */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Guests</label>
            <div className="flex items-center gap-2">
              <button
                onClick={() => updateSearchParams({ adults: Math.max(1, searchParams.adults - 1) })}
                className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-black hover:text-white font-bold text-lg transition-colors"
              >
                −
              </button>
              <input
                type="number"
                value={searchParams.adults}
                onChange={(e) => updateSearchParams({ adults: parseInt(e.target.value) || 1 })}
                className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold text-center outline-none focus:border-black"
                min="1"
              />
              <button
                onClick={() => updateSearchParams({ adults: searchParams.adults + 1 })}
                className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-black hover:text-white font-bold text-lg transition-colors"
              >
                +
              </button>
            </div>
          </div>
          <div>
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Currency</label>
            <select
              value={searchParams.currency}
              onChange={(e) => updateSearchParams({ currency: e.target.value })}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium outline-none focus:border-black transition-all"
            >
              <option value="PKR">PKR (₨)</option>
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="SAR">SAR (﷼)</option>
            </select>
          </div>
        </div>

        {/* Search Button - smaller, right aligned */}
        <div className="flex justify-end pt-2">
          <button
            onClick={searchHotels}
            disabled={isSearching}
            className="px-6 py-2.5 bg-black text-black font-bold text-[11px] uppercase tracking-wider rounded-lg hover:bg-[var(--sacred-emerald)] hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-sm"
          >
            {isSearching ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Searching...
              </>
            ) : (
              <>
                <Search size={16} />
                Search Hotels
              </>
            )}
          </button>
        </div>
      </div>
        

      {/* Results Section - keep as is or slightly compact */}
      {isSearching && (
        <div className="text-center py-10">
          <Loader2 size={40} className="mx-auto text-black animate-spin mb-3" />
          <p className="text-slate-500 font-medium text-sm">Searching for the best hotels...</p>
        </div>
      )}

      {!isSearching && searchedHotels.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-black text-slate-900">{searchedHotels.length} Hotels Found</h2>
          </div>

          {searchedHotels.map((hotel, index) => {
            const price = hotel.extracted_price || hotel.price || 0;
            const rating = hotel.overall_rating || 0;
            const reviews = hotel.reviews || 0;
            const hotelClass = hotel.hotel_class || 0;
            const amenities = hotel.amenities || [];
            const freeCancellation = hotel.free_cancellation;

            return (
              <div
                key={index}
                onClick={() => selectHotel(hotel)}
                className={`bg-white rounded-xl border transition-all cursor-pointer shadow-sm hover:shadow-md ${
                  selectedHotel === hotel
                    ? 'border-black ring-2 ring-black/20'
                    : 'border-slate-200 hover:border-black'
                }`}
              >
                <div className="p-5">
                  <div className="flex flex-col md:flex-row gap-5">
                    {/* Image + Info */}
                    <div className="flex gap-4 flex-1">
                      {hotel.thumbnail ? (
                        <img
                          src={hotel.thumbnail}
                          alt={hotel.name}
                          className="w-32 h-24 rounded-lg object-cover bg-slate-100 border border-slate-200"
                        />
                      ) : (
                        <div className="w-32 h-24 rounded-lg bg-gradient-to-br from-black to-[var(--sacred-emerald)] flex items-center justify-center">
                          <Building2 className="text-white" size={32} />
                        </div>
                      )}
                      <div className="space-y-1.5 flex-1">
                        <h3 className="text-md font-black text-slate-900">{hotel.name}</h3>
                        <div className="flex items-center gap-3 flex-wrap">
                          {renderStars(hotelClass)}
                          {rating > 0 && (
                            <span className="flex items-center gap-1 text-xs font-bold text-slate-600">
                              <Star size={12} className="fill-black text-black" />
                              {rating} ({reviews.toLocaleString()} reviews)
                            </span>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {amenities.slice(0, 3).map((amenity, idx) => (
                            <span key={idx} className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md text-[10px] font-bold">
                              {amenity}
                            </span>
                          ))}
                          {amenities.length > 3 && (
                            <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md text-[10px] font-bold">
                              +{amenities.length - 3}
                            </span>
                          )}
                        </div>
                        {freeCancellation && (
                          <span className="inline-block px-2 py-0.5 bg-green-100 text-green-700 rounded-md text-[10px] font-bold">
                            Free Cancellation
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Price */}
                    <div className="flex flex-col items-end justify-between min-w-[140px]">
                      <div className="text-right">
                        <p className="text-[10px] font-bold text-slate-400">Starting from</p>
                        <p className="text-2xl font-black text-black">{formatPrice(price)}</p>
                        <p className="text-[10px] font-bold text-slate-400">per night</p>
                        <p className="text-[10px] font-bold text-slate-400 mt-1">via {hotel.source || 'N/A'}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expanded Details - Keep same but with compact styling */}
                {selectedHotel === hotel && (
                  <div className="border-t border-slate-200 p-5 bg-slate-50 rounded-b-xl">
                    <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider mb-4">Hotel Details</h4>
                    {hotel.gps_coordinates && (
                      <div className="bg-white p-4 rounded-lg border border-slate-200 mb-4">
                        <div className="flex items-center gap-2 mb-2">
                          <MapPin size={16} className="text-black" />
                          <h5 className="text-xs font-black text-slate-900">Location</h5>
                        </div>
                        <p className="text-xs font-medium text-slate-600">
                          Lat: {hotel.gps_coordinates.latitude} | Lng: {hotel.gps_coordinates.longitude}
                        </p>
                      </div>
                    )}
                    {amenities.length > 0 && (
                      <div className="bg-white p-4 rounded-lg border border-slate-200 mb-4">
                        <h5 className="text-xs font-black text-slate-900 uppercase tracking-wider mb-3">All Amenities</h5>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                          {amenities.map((amenity, idx) => (
                            <div key={idx} className="flex items-center gap-2 p-2 bg-slate-50 rounded-md">
                              <div className="w-1.5 h-1.5 rounded-full bg-black"></div>
                              <span className="text-xs font-medium text-slate-700">{amenity}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div className="bg-white p-4 rounded-lg border border-slate-200">
                        <p className="text-[10px] font-bold text-slate-400 mb-1">Hotel Class</p>
                        <div className="flex items-center gap-2">
                          {renderStars(hotelClass)}
                          <span className="text-sm font-black text-slate-900">{hotelClass}-Star</span>
                        </div>
                      </div>
                      <div className="bg-white p-4 rounded-lg border border-slate-200">
                        <p className="text-[10px] font-bold text-slate-400 mb-1">Guest Rating</p>
                        <p className="text-lg font-black text-black">{rating}/5.0</p>
                        <p className="text-[10px] font-bold text-slate-500 mt-0.5">{reviews.toLocaleString()} reviews</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border border-slate-200">
                        <p className="text-[10px] font-bold text-slate-400 mb-1">Price per Night</p>
                        <p className="text-lg font-black text-black">{formatPrice(price)}</p>
                        {freeCancellation && (
                          <p className="text-[10px] font-bold text-green-600 mt-0.5">Free cancellation</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {!isSearching && searchedHotels.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
          <Building2 className="mx-auto text-slate-300 mb-4" size={48} />
          <p className="text-slate-400 font-bold text-sm mb-1">No hotels searched yet</p>
          <p className="text-slate-400 text-xs">Enter your travel details and click "Search"</p>
        </div>
      )}
    </div>
  );
};

export default LiveHotelBooking;