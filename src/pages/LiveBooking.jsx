import React from 'react';
import { Plane, Search, Loader2, Clock, ArrowRight, Calendar } from 'lucide-react';
import useFlightStore from '../store/useFlightStore';

const LiveBooking = () => {
   const {
      searchParams,
      searchedFlights,
      isSearching,
      selectedFlight,
      updateSearchParams,
      searchFlights,
      selectFlight
   } = useFlightStore();

   const handleAirportAdd = (airport) => {
      if (airport && !searchParams.from.includes(airport)) {
         updateSearchParams({ from: [...searchParams.from, airport] });
      }
   };

   const handleAirportRemove = (index) => {
      const updatedFrom = searchParams.from.filter((_, i) => i !== index);
      updateSearchParams({ from: updatedFrom });
   };

   const formatDuration = (minutes) => {
      if (!minutes) return 'N/A';
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      return `${hours}h ${mins}m`;
   };

   return (
      <div className="font-inter space-y-8 animate-in fade-in duration-1000 pb-24">
         {/* Header */}
         <div className="flex items-center justify-between pb-6 border-b-2 border-slate-200">
            <div>
               <h1 className="text-4xl font-black text-slate-900 tracking-tight flex items-center gap-4">
                  <Plane className="text-[var(--desert-gold)]" size={40} />
                  Live Flight Search
               </h1>
               <p className="text-slate-500 text-sm font-medium mt-2">Search and compare real-time flight prices</p>
            </div>
         </div>

         {/* Search Form */}
         <div className="bg-white rounded-2xl p-8 border-2 border-slate-200 shadow-lg space-y-8">
            {/* From/To Section */}
            <div>
               <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-4">Route</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                     <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2 block">From Airports</label>
                     <div className="flex gap-2 mb-2">
                        <input
                           id="airport-input"
                           type="text"
                           onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                 handleAirportAdd(e.target.value.toUpperCase());
                                 e.target.value = '';
                              }
                           }}
                           className="flex-1 p-4 bg-slate-50 border-2 border-slate-200 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-[var(--desert-gold)] transition-all"
                           placeholder="Add airport (e.g., KHI)"
                        />
                        <button
                           onClick={() => {
                              const input = document.getElementById('airport-input');
                              if (input && input.value) {
                                 handleAirportAdd(input.value.toUpperCase());
                                 input.value = '';
                              }
                           }}
                           className="px-6 py-4 bg-[var(--desert-gold)] text-black font-black text-xs uppercase rounded-xl hover:bg-[var(--sacred-emerald)] hover:text-white transition-all"
                        >
                           Add
                        </button>
                     </div>
                     <div className="flex flex-wrap gap-2">
                        {searchParams.from.map((airport, idx) => (
                           <span key={idx} className="px-4 py-2 bg-[var(--desert-gold)]/10 text-[var(--desert-gold)] rounded-lg text-xs font-bold flex items-center gap-2">
                              {airport}
                              <button 
                                 onClick={() => handleAirportRemove(idx)}
                                 className="hover:text-red-500"
                              >
                                 ×
                              </button>
                           </span>
                        ))}
                     </div>
                  </div>
                  <div>
                     <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2 block">To Airport</label>
                     <input
                        type="text"
                        value={searchParams.to}
                        onChange={(e) => updateSearchParams({ to: e.target.value.toUpperCase() })}
                        className="w-full p-4 bg-slate-50 border-2 border-slate-200 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-[var(--desert-gold)] transition-all"
                        placeholder="JED"
                     />
                  </div>
               </div>
            </div>

            {/* Dates & Trip Type */}
            <div>
               <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-4">Dates & Trip Type</h3>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                     <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2 block">Trip Type</label>
                     <select
                        value={searchParams.trip_type}
                        onChange={(e) => updateSearchParams({ trip_type: e.target.value })}
                        className="w-full p-4 bg-slate-50 border-2 border-slate-200 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-[var(--desert-gold)] transition-all"
                     >
                        <option value="round">Round Trip</option>
                        <option value="one">One Way</option>
                     </select>
                  </div>
                  <div>
                     <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2 block">Departure Date</label>
                     <input
                        type="date"
                        value={searchParams.departure_date}
                        onChange={(e) => updateSearchParams({ departure_date: e.target.value })}
                        className="w-full p-4 bg-slate-50 border-2 border-slate-200 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-[var(--desert-gold)] transition-all"
                     />
                  </div>
                  <div>
                     <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2 block">Return Date</label>
                     <input
                        type="date"
                        value={searchParams.return_date}
                        onChange={(e) => updateSearchParams({ return_date: e.target.value })}
                        className="w-full p-4 bg-slate-50 border-2 border-slate-200 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-[var(--desert-gold)] transition-all"
                        disabled={searchParams.trip_type === 'one'}
                     />
                  </div>
               </div>
            </div>

            {/* Passengers */}
            <div>
               <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-4">Passengers</h3>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                     <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2 block">Adults</label>
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
                  <div>
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
                  </div>
                  <div>
                     <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2 block">Infants</label>
                     <div className="flex items-center gap-4">
                        <button 
                           onClick={() => updateSearchParams({ infants: Math.max(0, searchParams.infants - 1) })}
                           className="w-12 h-12 rounded-xl bg-slate-100 hover:bg-[var(--desert-gold)] hover:text-white font-black text-xl transition-all"
                        >
                           -
                        </button>
                        <input
                           type="number"
                           value={searchParams.infants}
                           onChange={(e) => updateSearchParams({ infants: parseInt(e.target.value) || 0 })}
                           className="flex-1 p-4 bg-slate-50 border-2 border-slate-200 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-[var(--desert-gold)] transition-all text-center"
                           min="0"
                        />
                        <button 
                           onClick={() => updateSearchParams({ infants: searchParams.infants + 1 })}
                           className="w-12 h-12 rounded-xl bg-slate-100 hover:bg-[var(--desert-gold)] hover:text-white font-black text-xl transition-all"
                        >
                           +
                        </button>
                     </div>
                  </div>
               </div>
            </div>

            {/* Preferences */}
            <div>
               <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-4">Preferences</h3>
               <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div>
                     <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2 block">Cabin Class</label>
                     <select
                        value={searchParams.cabin_class}
                        onChange={(e) => updateSearchParams({ cabin_class: e.target.value })}
                        className="w-full p-4 bg-slate-50 border-2 border-slate-200 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-[var(--desert-gold)] transition-all"
                     >
                        <option value="economy">Economy</option>
                        <option value="premium_economy">Premium Economy</option>
                        <option value="business">Business</option>
                        <option value="first">First Class</option>
                     </select>
                  </div>
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
                  <div>
                     <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2 block">Sort By</label>
                     <select
                        value={searchParams.sort}
                        onChange={(e) => updateSearchParams({ sort: e.target.value })}
                        className="w-full p-4 bg-slate-50 border-2 border-slate-200 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-[var(--desert-gold)] transition-all"
                     >
                        <option value="price">Price (Low to High)</option>
                        <option value="duration">Duration (Shortest)</option>
                     </select>
                  </div>
                  <div>
                     <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2 block">Max Price</label>
                     <input
                        type="number"
                        value={searchParams.max_price || ''}
                        onChange={(e) => updateSearchParams({ max_price: e.target.value ? parseFloat(e.target.value) : null })}
                        className="w-full p-4 bg-slate-50 border-2 border-slate-200 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-[var(--desert-gold)] transition-all"
                        placeholder="No limit"
                     />
                  </div>
               </div>
               <div className="mt-6">
                  <label className="flex items-center gap-3 cursor-pointer">
                     <input
                        type="checkbox"
                        checked={searchParams.non_stop}
                        onChange={(e) => updateSearchParams({ non_stop: e.target.checked })}
                        className="w-6 h-6 rounded border-2 border-slate-300 text-[var(--desert-gold)] focus:ring-[var(--desert-gold)]"
                     />
                     <span className="text-sm font-black text-slate-900">Non-stop flights only</span>
                  </label>
               </div>
            </div>

            {/* Search Button */}
            <div className="flex justify-end">
               <button
                  onClick={searchFlights}
                  disabled={isSearching}
                  className="px-12 py-5 bg-[var(--desert-gold)] text-black font-black text-[12px] uppercase tracking-[0.2em] rounded-xl hover:bg-[var(--sacred-emerald)] hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3 shadow-lg"
               >
                  {isSearching ? (
                     <>
                        <Loader2 size={20} className="animate-spin" />
                        Searching Flights...
                     </>
                  ) : (
                     <>
                        <Search size={20} />
                        Search Flights
                     </>
                  )}
               </button>
            </div>
         </div>

         {/* Flight Results */}
         {isSearching && (
            <div className="text-center py-20">
               <Loader2 size={64} className="mx-auto text-[var(--desert-gold)] animate-spin mb-6" />
               <p className="text-slate-500 font-bold text-lg">Searching for the best flights...</p>
            </div>
         )}

         {!isSearching && searchedFlights.length > 0 && (
            <div className="space-y-6">
               <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-black text-slate-900">{searchedFlights.length} Flights Found</h2>
               </div>

               {searchedFlights.map((flight, index) => {
                  const price = flight.price || 0;
                  const firstFlight = flight.flights?.[0] || {};
                  const lastFlight = flight.flights?.[flight.flights.length - 1] || {};
                  
                  const airline = firstFlight.airline || 'Unknown';
                  const airlineLogo = firstFlight.airline_logo || flight.airline_logo || '';
                  const departure = firstFlight.departure_airport?.id || '';
                  const arrival = lastFlight.arrival_airport?.id || '';
                  const duration = formatDuration(flight.total_duration);
                  const departureTime = firstFlight.departure_airport?.time || '';
                  const arrivalTime = lastFlight.arrival_airport?.time || '';
                  const stops = flight.layovers?.length || 0;
                  const travelClass = firstFlight.travel_class || '';
                  const flightNumber = firstFlight.flight_number || '';
                  const airplane = firstFlight.airplane || '';
                  
                  return (
                     <div
                        key={index}
                        onClick={() => selectFlight(flight)}
                        className={`bg-white rounded-2xl border-2 transition-all cursor-pointer shadow-lg hover:shadow-2xl ${
                           selectedFlight === flight 
                              ? 'border-[var(--desert-gold)] ring-4 ring-[var(--desert-gold)]/20' 
                              : 'border-slate-200 hover:border-[var(--desert-gold)]'
                        }`}
                     >
                        <div className="p-8">
                           <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                              {/* Airline & Flight Info */}
                              <div className="flex items-center gap-6 flex-1">
                                 {airlineLogo ? (
                                    <img src={airlineLogo} alt={airline} className="w-24 h-24 rounded-xl object-contain bg-white border-2 border-slate-100 shadow-lg" />
                                 ) : (
                                    <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-[var(--desert-gold)] to-[var(--sacred-emerald)] flex items-center justify-center shadow-lg">
                                       <Plane className="text-white" size={40} />
                                    </div>
                                 )}
                                 <div className="space-y-2">
                                    <h3 className="text-xl font-black text-slate-900">{airline}</h3>
                                    <p className="text-sm font-bold text-slate-500">
                                       {departure} → {arrival}
                                    </p>
                                    <div className="flex items-center gap-4 text-xs font-bold text-slate-400">
                                       <span className="flex items-center gap-2">
                                          <Clock size={14} />
                                          {duration}
                                       </span>
                                       {flightNumber && (
                                          <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg">
                                             {flightNumber}
                                          </span>
                                       )}
                                       {stops > 0 && (
                                          <span className="px-3 py-1 bg-orange-100 text-orange-600 rounded-lg">
                                             {stops} Stop{stops > 1 ? 's' : ''}
                                          </span>
                                       )}
                                    </div>
                                 </div>
                              </div>

                              {/* Time & Price */}
                              <div className="flex items-center gap-12">
                                 <div className="text-center space-y-2">
                                    <p className="text-3xl font-black text-slate-900">
                                       {departureTime ? new Date(departureTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }) : 'N/A'}
                                    </p>
                                    <p className="text-xs font-bold text-slate-400">{departure}</p>
                                 </div>
                                 
                                 <div className="flex flex-col items-center">
                                    <ArrowRight className="text-[var(--desert-gold)]" size={32} />
                                    <p className="text-xs font-bold text-slate-400 mt-1">{duration}</p>
                                 </div>

                                 <div className="text-center space-y-2">
                                    <p className="text-3xl font-black text-slate-900">
                                       {arrivalTime ? new Date(arrivalTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }) : 'N/A'}
                                    </p>
                                    <p className="text-xs font-bold text-slate-400">{arrival}</p>
                                 </div>

                                 <div className="text-right pl-8 border-l-2 border-slate-200">
                                    <p className="text-xs font-black text-slate-400 uppercase tracking-wider mb-2">Total Price</p>
                                    <p className="text-3xl font-black text-[var(--desert-gold)]">
                                       {searchParams.currency === 'USD' ? '$' : searchParams.currency === 'EUR' ? '€' : searchParams.currency === 'PKR' ? '₨' : '﷼'}{price.toLocaleString()}
                                    </p>
                                    <p className="text-xs font-bold text-slate-400 mt-1">{travelClass}</p>
                                 </div>
                              </div>
                           </div>
                        </div>   
                        

                        {/* Expanded Details */}
                        {selectedFlight === flight && (
                           <div className="border-t-2 border-slate-200 p-8 bg-slate-50">
                              <h4 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-6">Flight Details</h4>
                              
                              {/* Flight Legs */}
                              <div className="space-y-6 mb-8">
                                 {flight.flights.map((leg, legIdx) => (
                                    <div key={legIdx} className="bg-white p-6 rounded-xl border-2 border-slate-200">
                                       <div className="flex items-start justify-between mb-4">
                                          <div className="flex items-center gap-4">
                                             {leg.airline_logo && (
                                                <img src={leg.airline_logo} alt={leg.airline} className="w-12 h-12 rounded-lg object-contain" />
                                             )}
                                             <div>
                                                <p className="font-black text-slate-900">{leg.airline}</p>
                                                <p className="text-xs font-bold text-slate-500">{leg.flight_number} • {leg.airplane}</p>
                                             </div>
                                          </div>
                                          <span className="px-4 py-2 bg-[var(--desert-gold)]/10 text-[var(--desert-gold)] rounded-lg text-xs font-black">
                                             {leg.travel_class}
                                          </span>
                                       </div>
                                       
                                       <div className="grid grid-cols-2 gap-4">
                                          <div>
                                             <p className="text-xs font-bold text-slate-400 mb-1">Departure</p>
                                             <p className="text-lg font-black text-slate-900">
                                                {leg.departure_airport?.time ? new Date(leg.departure_airport.time).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }) : 'N/A'}
                                             </p>
                                             <p className="text-sm font-bold text-slate-500">{leg.departure_airport?.name}</p>
                                          </div>
                                          <div>
                                             <p className="text-xs font-bold text-slate-400 mb-1">Arrival</p>
                                             <p className="text-lg font-black text-slate-900">
                                                {leg.arrival_airport?.time ? new Date(leg.arrival_airport.time).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }) : 'N/A'}
                                             </p>
                                             <p className="text-sm font-bold text-slate-500">{leg.arrival_airport?.name}</p>
                                          </div>
                                       </div>
                                       
                                       <div className="mt-4 flex flex-wrap gap-2">
                                          <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold">
                                             Duration: {formatDuration(leg.duration)}
                                          </span>
                                          {leg.legroom && (
                                             <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold">
                                                Legroom: {leg.legroom}
                                             </span>
                                          )}
                                          {leg.extensions?.map((ext, idx) => (
                                             <span key={idx} className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold">
                                                {ext}
                                             </span>
                                          ))}
                                       </div>
                                    </div>
                                 ))}
                              </div>

                              {/* Layovers */}
                              {flight.layovers && flight.layovers.length > 0 && (
                                 <div className="bg-white p-6 rounded-xl border-2 border-slate-200 mb-6">
                                    <h5 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-4">Layovers</h5>
                                    <div className="space-y-4">
                                       {flight.layovers.map((layover, idx) => (
                                          <div key={idx} className="flex items-center gap-4 p-4 bg-orange-50 rounded-lg border-2 border-orange-200">
                                             <Calendar className="text-orange-500" size={20} />
                                             <div>
                                                <p className="font-bold text-slate-900">{layover.name}</p>
                                                <p className="text-sm text-slate-500">Duration: {formatDuration(layover.duration)}</p>
                                                {layover.overnight && (
                                                   <span className="text-xs font-black text-orange-600">Overnight layover</span>
                                                )}
                                             </div>
                                          </div>
                                       ))}
                                    </div>
                                 </div>
                              )}

                              {/* Carbon Emissions & Summary */}
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                 <div className="bg-white p-6 rounded-xl border-2 border-slate-200">
                                    <p className="text-xs font-bold text-slate-400 mb-2">Flight Duration</p>
                                    <p className="text-lg font-black text-slate-900">{duration}</p>
                                 </div>
                                 <div className="bg-white p-6 rounded-xl border-2 border-slate-200">
                                    <p className="text-xs font-bold text-slate-400 mb-2">Price per Person</p>
                                    <p className="text-lg font-black text-[var(--desert-gold)]">
                                       {searchParams.currency === 'USD' ? '$' : searchParams.currency === 'EUR' ? '€' : searchParams.currency === 'PKR' ? '₨' : '﷼'}{price.toLocaleString()}
                                    </p>
                                 </div>
                                 <div className="bg-white p-6 rounded-xl border-2 border-slate-200">
                                    <p className="text-xs font-bold text-slate-400 mb-2">Carbon Emissions</p>
                                    <p className="text-lg font-black text-slate-900">
                                       {flight.carbon_emissions ? `${(flight.carbon_emissions.this_flight / 1000).toFixed(0)} kg` : 'N/A'}
                                    </p>
                                    {flight.carbon_emissions && (
                                       <p className="text-xs font-bold text-green-600 mt-1">
                                          {flight.carbon_emissions.difference_percent}% vs average
                                       </p>
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

.
         {!isSearching && searchedFlights.length === 0 && (
            <div className="text-center py-20 bg-white rounded-2xl border-2 border-slate-200">
               <Plane className="mx-auto text-slate-300 mb-6" size={80} />
               <p className="text-slate-400 font-bold text-lg mb-2">No flights searched yet</p>
               <p className="text-slate-400 text-sm">Enter your travel details and click "Search" to find flights</p>
            </div>
         )}
      </div>
   );
};

export default LiveBooking;
