import React from 'react';
import { Building2, Search, Loader2, Calendar, Star, MapPin, Wifi, Car, Coffee } from 'lucide-react';
import useHotelStore from '../store/useHotelStore';

const LiveHotelBooking = () => {
   const {
      searchParams,
      searchedHotels,
      isSearching,
      selectedHotel,
      updateSearchParams,
      searchHotels,
      selectHotel
   } = useHotelStore();

   const handleAmenityToggle = (amenity) => {
      const currentAmenities = searchParams.amenities || [];
      if (currentAmenities.includes(amenity)) {
         updateSearchParams({ 
            amenities: currentAmenities.filter(a => a !== amenity) 
         });
      } else {
         updateSearchParams({ 
            amenities: [...currentAmenities, amenity] 
         });
      }
   };

   const formatPrice = (price) => {
      if (!price) return 'N/A';
      const currencySymbols = {
         'PKR': '₨',
         'USD': '$',
         'EUR': '€',
         'SAR': '﷼'
      };
      const symbol = currencySymbols[searchParams.currency] || searchParams.currency;
      return `${symbol}${price.toLocaleString()}`;
   };

   const renderStars = (rating) => {
      if (!rating) return null;
      return (
         <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
               <Star
                  key={i}
                  size={16}
                  className={i < rating ? 'fill-[var(--desert-gold)] text-[var(--desert-gold)]' : 'text-slate-300'}
               />
            ))}
         </div>
      );
   };

   return (
      <div className="font-inter space-y-8 animate-in fade-in duration-1000 pb-24">
         {/* Header */}
         <div className="flex items-center justify-between pb-6 border-b-2 border-slate-200">
            <div>
               <h1 className="text-4xl font-black text-slate-900 tracking-tight flex items-center gap-4">
                  <Building2 className="text-[var(--desert-gold)]" size={40} />
                  Live Hotel Search
               </h1>
               <p className="text-slate-500 text-sm font-medium mt-2">Search and compare real-time hotel prices in Makkah & Madinah</p>
            </div>
         </div>

         {/* Search Form */}
         <div className="bg-white rounded-2xl p-8 border-2 border-slate-200 shadow-lg space-y-8">
            {/* Location & Dates */}
            <div>
               <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-4">Location & Dates</h3>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                     <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2 block">City</label>
                     <input
                        type="text"
                        value={searchParams.city}
                        onChange={(e) => updateSearchParams({ city: e.target.value })}
                        className="w-full p-4 bg-slate-50 border-2 border-slate-200 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-[var(--desert-gold)] transition-all"
                        placeholder="Makkah Hotels"
                     />
                  </div>
                  <div>
                     <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2 block">Check-in Date</label>
                     <input
                        type="date"
                        value={searchParams.check_in}
                        onChange={(e) => updateSearchParams({ check_in: e.target.value })}
                        className="w-full p-4 bg-slate-50 border-2 border-slate-200 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-[var(--desert-gold)] transition-all"
                     />
                  </div>
                  <div>
                     <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2 block">Check-out Date</label>
                     <input
                        type="date"
                        value={searchParams.check_out}
                        onChange={(e) => updateSearchParams({ check_out: e.target.value })}
                        className="w-full p-4 bg-slate-50 border-2 border-slate-200 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-[var(--desert-gold)] transition-all"
                     />
                  </div>
               </div>
            </div>

            {/* Guests & Currency */}
            <div>
               <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-4">Guests & Currency</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                     <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2 block">Peo ple</label>
                     <div className="flex items-center gap-4">
                        <button 
                           onClick={() => updateSearchParams({ adults: Math.max(1, searchParams.adults - 1) })}
                           className="w-12 h-12 rounded-xl bg-slate-100 hover:bg-[var(--desert-gold)] hover:text-white font-black text-xl transition-all"
                        >
                           -
                        </button>
                        <input
                           type="number"
                           value={searchParams.adults}
                           onChange={(e) => updateSearchParams({ adults: parseInt(e.target.value) || 1 })}
                           className="flex-1 p-4 bg-slate-50 border-2 border-slate-200 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-[var(--desert-gold)] transition-all text-center"
                           min="1"
                        />
                        <button 
                           onClick={() => updateSearchParams({ adults: searchParams.adults + 1 })}
                           className="w-12 h-12 rounded-xl bg-slate-100 hover:bg-[var(--desert-gold)] hover:text-white font-black text-xl transition-all"
                        >
                           +
                        </button>
                     </div>
                  </div>
                  {/* <div>
                     <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2 block">Children</label>
                     <div className="flex items-center gap-4">
                        <button 
                           onClick={() => updateSearchParams({ children: Math.max(0, searchParams.children - 1) })}
                           className="w-12 h-12 rounded-xl bg-slate-100 hover:bg-[var(--desert-gold)] hover:text-white font-black text-xl transition-all"
                        >
                           -
                        </button>
                        <input
                           type="number"
                           value={searchParams.children}
                           onChange={(e) => updateSearchParams({ children: parseInt(e.target.value) || 0 })}
                           className="flex-1 p-4 bg-slate-50 border-2 border-slate-200 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-[var(--desert-gold)] transition-all text-center"
                           min="0"
                        />
                        <button 
                           onClick={() => updateSearchParams({ children: searchParams.children + 1 })}
                           className="w-12 h-12 rounded-xl bg-slate-100 hover:bg-[var(--desert-gold)] hover:text-white font-black text-xl transition-all"
                        >
                           +
                        </button>
                     </div>
                  </div> */}
                  <div>
                     <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2 block">Currency</label>
                     <select
                        value={searchParams.currency}
                        onChange={(e) => updateSearchParams({ currency: e.target.value })}
                        className="w-full p-4 bg-slate-50 border-2 border-slate-200 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-[var(--desert-gold)] transition-all"
                     >
                        <option value="PKR">PKR (₨)</option>
                        <option value="USD">USD ($)</option>
                        <option value="EUR">EUR (€)</option>
                        <option value="SAR">SAR (﷼)</option>
                     </select>
                  </div>
               </div>
            </div>

            {/* Search Button */}
            <div className="flex justify-end">
               <button
                  onClick={searchHotels}
                  disabled={isSearching}
                  className="px-12 py-5 bg-[var(--desert-gold)] text-black font-black text-[12px] uppercase tracking-[0.2em] rounded-xl hover:bg-[var(--sacred-emerald)] hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3 shadow-lg"
               >
                  {isSearching ? (
                     <>
                        <Loader2 size={20} className="animate-spin" />
                        Searching Hotels...
                     </>
                  ) : (
                     <>
                        <Search size={20} />
                        Search Hotels
                     </>
                  )}
               </button>
            </div>
         </div>

         {/* Hotel Results */}
         {isSearching && (
            <div className="text-center py-20">
               <Loader2 size={64} className="mx-auto text-[var(--desert-gold)] animate-spin mb-6" />
               <p className="text-slate-500 font-bold text-lg">Searching for the best hotels...</p>
            </div>
         )}

         {!isSearching && searchedHotels.length > 0 && (
            <div className="space-y-6">
               <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-black text-slate-900">{searchedHotels.length} Hotels Found</h2>
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
                        className={`bg-white rounded-2xl border-2 transition-all cursor-pointer shadow-lg hover:shadow-2xl ${
                           selectedHotel === hotel 
                              ? 'border-[var(--desert-gold)] ring-4 ring-[var(--desert-gold)]/20' 
                              : 'border-slate-200 hover:border-[var(--desert-gold)]'
                        }`}
                     >
                        <div className="p-8">
                           <div className="flex flex-col lg:flex-row gap-8">
                              {/* Hotel Image & Info */}
                              <div className="flex gap-6 flex-1">
                                 {hotel.thumbnail ? (
                                    <img 
                                       src={hotel.thumbnail} 
                                       alt={hotel.name} 
                                       className="w-48 h-36 rounded-xl object-cover bg-slate-100 border-2 border-slate-200 shadow-lg" 
                                    />
                                 ) : (
                                    <div className="w-48 h-36 rounded-xl bg-gradient-to-br from-[var(--desert-gold)] to-[var(--sacred-emerald)] flex items-center justify-center shadow-lg">
                                       <Building2 className="text-white" size={48} />
                                    </div>
                                 )}
                                 <div className="space-y-3 flex-1">
                                    <h3 className="text-xl font-black text-slate-900">{hotel.name}</h3>
                                    <div className="flex items-center gap-4">
                                       {renderStars(hotelClass)}
                                       {rating > 0 && (
                                          <span className="flex items-center gap-2 text-sm font-bold text-slate-600">
                                             <Star size={16} className="fill-[var(--desert-gold)] text-[var(--desert-gold)]" />
                                             {rating} ({reviews.toLocaleString()} reviews)
                                          </span>
                                       )}
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                       {amenities.slice(0, 5).map((amenity, idx) => (
                                          <span key={idx} className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold">
                                             {amenity}
                                          </span>
                                       ))}
                                       {amenities.length > 5 && (
                                          <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold">
                                             +{amenities.length - 5} more
                                          </span>
                                       )}
                                    </div>
                                    {freeCancellation && (
                                       <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-lg text-xs font-bold">
                                          Free Cancellation
                                       </span>
                                    )}
                                 </div>
                              </div>

                              {/* Price & Booking Source */}
                              <div className="flex flex-col items-end justify-between min-w-[200px]">
                                 <div className="text-right space-y-2">
                                    <p className="text-xs font-bold text-slate-400">Starting from</p>
                                    <p className="text-4xl font-black text-[var(--desert-gold)]">
                                       {formatPrice(price)}
                                    </p>
                                    <p className="text-xs font-bold text-slate-400">per night</p>
                                 </div>
                                 <div className="text-right space-y-2">
                                    <p className="text-xs font-bold text-slate-400">Booked via</p>
                                    <p className="text-sm font-black text-slate-900">{hotel.source || 'N/A'}</p>
                                 </div>
                              </div>
                           </div>
                        </div>   

                        {/* Expanded Details */}
                        {selectedHotel === hotel && (
                           <div className="border-t-2 border-slate-200 p-8 bg-slate-50">
                              <h4 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-6">Hotel Details</h4>
                              
                              {/* GPS Coordinates */}
                              {hotel.gps_coordinates && (
                                 <div className="bg-white p-6 rounded-xl border-2 border-slate-200 mb-6">
                                    <div className="flex items-center gap-3 mb-3">
                                       <MapPin className="text-[var(--desert-gold)]" size={20} />
                                       <h5 className="text-sm font-black text-slate-900">Location</h5>
                                    </div>
                                    <p className="text-sm font-bold text-slate-600">
                                       Latitude: {hotel.gps_coordinates.latitude} | Longitude: {hotel.gps_coordinates.longitude}
                                    </p>
                                 </div>
                              )}

                              {/* All Amenities */}
                              {amenities.length > 0 && (
                                 <div className="bg-white p-6 rounded-xl border-2 border-slate-200 mb-6">
                                    <h5 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-4">All Amenities</h5>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                       {amenities.map((amenity, idx) => (
                                          <div key={idx} className="flex items-center gap-2 p-3 bg-slate-50 rounded-lg">
                                             <div className="w-2 h-2 rounded-full bg-[var(--desert-gold)]"></div>
                                             <span className="text-sm font-bold text-slate-700">{amenity}</span>
                                          </div>
                                       ))}
                                    </div>
                                 </div>
                              )}

                              {/* Summary */}
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                 <div className="bg-white p-6 rounded-xl border-2 border-slate-200">
                                    <p className="text-xs font-bold text-slate-400 mb-2">Hotel Class</p>
                                    <div className="flex items-center gap-2">
                                       {renderStars(hotelClass)}
                                       <span className="text-lg font-black text-slate-900">{hotelClass}-Star</span>
                                    </div>
                                 </div>
                                 <div className="bg-white p-6 rounded-xl border-2 border-slate-200">
                                    <p className="text-xs font-bold text-slate-400 mb-2">Guest Rating</p>
                                    <p className="text-lg font-black text-[var(--desert-gold)]">
                                       {rating}/5.0
                                    </p>
                                    <p className="text-xs font-bold text-slate-500 mt-1">{reviews.toLocaleString()} reviews</p>
                                 </div>
                                 <div className="bg-white p-6 rounded-xl border-2 border-slate-200">
                                    <p className="text-xs font-bold text-slate-400 mb-2">Price per Night</p>
                                    <p className="text-lg font-black text-[var(--desert-gold)]">
                                       {formatPrice(price)}
                                    </p>
                                    {freeCancellation && (
                                       <p className="text-xs font-bold text-green-600 mt-1">Free cancellation available</p>
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
            <div className="text-center py-20 bg-white rounded-2xl border-2 border-slate-200">
               <Building2 className="mx-auto text-slate-300 mb-6" size={80} />
               <p className="text-slate-400 font-bold text-lg mb-2">No hotels searched yet</p>
               <p className="text-slate-400 text-sm">Enter your travel details and click "Search" to find hotels</p>
            </div>
         )}
      </div>
   );
};

export default LiveHotelBooking;
