import React, { useState, useEffect, useRef } from 'react';
import { Plane, Search, Loader2, Clock, ArrowRight, Calendar } from 'lucide-react';
import useFlightStore from '../store/useFlightStore';
import axios from '../api/axios';
import toast from 'react-hot-toast';

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

   // Safely get arrays (in case store has old string format)
   const fromAirports = Array.isArray(searchParams.from) ? searchParams.from : [];
   const toAirports = Array.isArray(searchParams.to) ? searchParams.to : [];

   // Autocomplete states
   const [fromSuggestions, setFromSuggestions] = useState([]);
   const [toSuggestions, setToSuggestions] = useState([]);
   const [showFromDropdown, setShowFromDropdown] = useState(false);
   const [showToDropdown, setShowToDropdown] = useState(false);
   const [fromInput, setFromInput] = useState('');
   const [toInput, setToInput] = useState('');
   const fromDropdownRef = useRef(null);
   const toDropdownRef = useRef(null);
   const skipFetchFrom = useRef(false);
   const skipFetchTo = useRef(false);

   // Helper: flatten API response into an array of airports
   const flattenAirports = (apiData) => {
      const airports = [];
      const seenIds = new Set();
      for (const item of apiData) {
         if (item.airports && Array.isArray(item.airports)) {
            for (const airport of item.airports) {
               if (!seenIds.has(airport.id)) {
                  seenIds.add(airport.id);
                  airports.push({
                     id: airport.id,
                     name: airport.name,
                  });
               }
            }
         }
      }
      return airports;
   };

   // Fetch autocomplete suggestions
   const fetchSuggestions = async (query, type) => {
      if (!query || query.length < 2) {
         if (type === 'from') {
            setFromSuggestions([]);
            setShowFromDropdown(false);
         } else {
            setToSuggestions([]);
            setShowToDropdown(false);
         }
         return;
      }

      try {
         const response = await axios.get(`/flights/autocomplete?q=${encodeURIComponent(query)}`);
         if (response.data.success && Array.isArray(response.data.data)) {
            const airports = flattenAirports(response.data.data);
            if (type === 'from') {
               setFromSuggestions(airports);
               setShowFromDropdown(airports.length > 0);
            } else {
               setToSuggestions(airports);
               setShowToDropdown(airports.length > 0);
            }
         }
      } catch (error) {
         console.error('Autocomplete error:', error);
      }
   };

   // Debounce autocomplete
   useEffect(() => {
      const timer = setTimeout(() => {
         if (fromInput) {
            if (skipFetchFrom.current) {
               skipFetchFrom.current = false;
               return;
            }
            fetchSuggestions(fromInput, 'from');
         } else {
            setFromSuggestions([]);
            setShowFromDropdown(false);
         }
      }, 300);
      return () => clearTimeout(timer);
   }, [fromInput]);

   useEffect(() => {
      const timer = setTimeout(() => {
         if (toInput) {
            if (skipFetchTo.current) {
               skipFetchTo.current = false;
               return;
            }
            fetchSuggestions(toInput, 'to');
         } else {
            setToSuggestions([]);
            setShowToDropdown(false);
         }
      }, 300);
      return () => clearTimeout(timer);
   }, [toInput]);

   // Close dropdowns when clicking outside
   useEffect(() => {
      const handleClickOutside = (event) => {
         if (fromDropdownRef.current && !fromDropdownRef.current.contains(event.target)) {
            setShowFromDropdown(false);
         }
         if (toDropdownRef.current && !toDropdownRef.current.contains(event.target)) {
            setShowToDropdown(false);
         }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
   }, []);

   // Handle adding airport to "from" list
   const handleFromAirportAdd = (airportId, airportName) => {
      if (!airportId) return;
      if (fromAirports.includes(airportId)) {
         toast.info(`${airportId} is already added to departure airports`);
         return;
      }
      const newFrom = [...fromAirports, airportId];
      updateSearchParams({ from: newFrom });
      toast.success(`Added ${airportName} (${airportId}) to departure`);
   };

   const handleFromAirportRemove = (index) => {
      const updatedFrom = fromAirports.filter((_, i) => i !== index);
      updateSearchParams({ from: updatedFrom });
   };

   // Handle adding airport to "to" list (multiple)
   const handleToAirportAdd = (airportId, airportName) => {
      if (!airportId) return;
      if (toAirports.includes(airportId)) {
         toast.info(`${airportId} is already added to destination airports`);
         return;
      }
      const newTo = [...toAirports, airportId];
      updateSearchParams({ to: newTo });
      toast.success(`Added ${airportName} (${airportId}) to destination`);
   };

   const handleToAirportRemove = (index) => {
      const updatedTo = toAirports.filter((_, i) => i !== index);
      updateSearchParams({ to: updatedTo });
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
               <h1 className="text-4xl font-medium text-slate-900 tracking-tight flex items-center gap-4">
                  <Plane className="text-black" size={40} />
                  Live Flight Search
               </h1>
               <p className="text-slate-500 text-sm font-medium mt-2">Search and compare real-time flight prices</p>
            </div>
         </div>

         {/* Search Form */}
         <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-md space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

               {/* FROM (multiple airports) */}
               <div ref={fromDropdownRef}>
                  <label className="text-[10px] font-medium text-slate-500 uppercase tracking-wide block mb-1">From Airports</label>
                  <div className="relative">
                     <input
                        type="text"
                        value={fromInput}
                        onChange={(e) => setFromInput(e.target.value)}
                        onFocus={() => setFromInput('')}
                        onKeyDown={(e) => {
                           if (e.key === 'Enter' && fromSuggestions.length > 0) {
                              const selected = fromSuggestions[0];
                              handleFromAirportAdd(selected.id, selected.name);
                              skipFetchFrom.current = true;
                              setFromInput(selected.name);
                              setShowFromDropdown(false);
                           }
                        }}
                        className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium text-slate-900 outline-none focus:border-black h-11"
                        placeholder="Search airport..."
                     />
                     {showFromDropdown && fromSuggestions.length > 0 && (
                        <div
                           className="absolute z-50 mt-1 w-full bg-white border border-slate-200 rounded-lg shadow-lg max-h-48 overflow-y-auto"
                           onClick={(e) => e.stopPropagation()}
                        >
                           {fromSuggestions.map((airport, idx) => (
                              <div
                                 key={idx}
                                 onClick={() => {
                                    handleFromAirportAdd(airport.id, airport.name);
                                    skipFetchFrom.current = true;
                                    setFromInput(airport.name);
                                    setShowFromDropdown(false);
                                 }}
                                 className="p-2 hover:bg-slate-50 cursor-pointer border-b border-slate-100 text-sm"
                              >
                                 <div className="flex justify-between">
                                    <span className="font-medium">{airport.name}</span>
                                    <span className="text-black text-xs">{airport.id}</span>
                                 </div>
                              </div>
                           ))}
                        </div>
                     )}
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                     {fromAirports.map((airportId, idx) => (
                        <span key={idx} className="px-2 py-1 bg-black/10 text-black rounded text-xs font-medium flex items-center gap-1">
                           {airportId}
                           <button onClick={() => handleFromAirportRemove(idx)} className="hover:text-red-500">×</button>
                        </span>
                     ))}
                  </div>
               </div>

               {/* TO (multiple airports) */}
               <div ref={toDropdownRef}>
                  <label className="text-[10px] font-medium text-slate-500 uppercase tracking-wide block mb-1">To Airports</label>
                  <div className="relative">
                     <input
                        type="text"
                        value={toInput}
                        onChange={(e) => setToInput(e.target.value)}
                        onFocus={() => setToInput('')}
                        onKeyDown={(e) => {
                           if (e.key === 'Enter' && toSuggestions.length > 0) {
                              const selected = toSuggestions[0];
                              handleToAirportAdd(selected.id, selected.name);
                              skipFetchTo.current = true;
                              setToInput(selected.name);
                              setShowToDropdown(false);
                           }
                        }}
                        className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium text-slate-900 outline-none focus:border-black h-11"
                        placeholder="Search airport..."
                     />
                     {showToDropdown && toSuggestions.length > 0 && (
                        <div
                           className="absolute z-50 mt-1 w-full bg-white border border-slate-200 rounded-lg shadow-lg max-h-48 overflow-y-auto"
                           onClick={(e) => e.stopPropagation()}
                        >
                           {toSuggestions.map((airport, idx) => (
                              <div
                                 key={idx}
                                 onClick={() => {
                                    handleToAirportAdd(airport.id, airport.name);
                                    skipFetchTo.current = true;
                                    setToInput(airport.name);
                                    setShowToDropdown(false);
                                 }}
                                 className="p-2 hover:bg-slate-50 cursor-pointer border-b border-slate-100 text-sm"
                              >
                                 <div className="flex justify-between">
                                    <span className="font-medium">{airport.name}</span>
                                    <span className="text-black text-xs">{airport.id}</span>
                                 </div>
                              </div>
                           ))}
                        </div>
                     )}
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                     {toAirports.map((airportId, idx) => (
                        <span key={idx} className="px-2 py-1 bg-[var(--sacred-emerald)]/10 text-[var(--sacred-emerald)] rounded text-xs font-medium flex items-center gap-1">
                           {airportId}
                           <button onClick={() => handleToAirportRemove(idx)} className="hover:text-red-500">×</button>
                        </span>
                     ))}
                  </div>
               </div>

               <div>
                  <label className="text-[10px] font-medium text-slate-500 uppercase tracking-wide block mb-1">Departure Date</label>
                  <input
                     type="date"
                     value={searchParams.departure_date}
                     onChange={(e) => updateSearchParams({ departure_date: e.target.value })}
                     className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium h-11 outline-none focus:border-black"
                  />
               </div>

               <div>
                  <label className="text-[10px] font-medium text-slate-500 uppercase tracking-wide block mb-1">Return Date</label>
                  <input
                     type="date"
                     value={searchParams.return_date}
                     onChange={(e) => updateSearchParams({ return_date: e.target.value })}
                     disabled={searchParams.trip_type === 'one'}
                     className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium h-11 outline-none focus:border-black disabled:opacity-50"
                  />
               </div>

               <div>
                  <label className="text-[10px] font-medium text-slate-500 uppercase tracking-wide block mb-1">Trip Type</label>
                  <select
                     value={searchParams.trip_type}
                     onChange={(e) => updateSearchParams({ trip_type: e.target.value })}
                     className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium h-11 outline-none focus:border-black"
                  >
                     <option value="round">Round Trip</option>
                     <option value="one">One Way</option>
                  </select>
               </div>

               {[
                  { label: 'Adults', key: 'adults', min: 1 },
                  { label: 'Children', key: 'children', min: 0 },
                  { label: 'Infants', key: 'infants', min: 0 },
               ].map(({ label, key, min }) => (
                  <div key={key}>
                     <label className="text-[10px] font-medium text-slate-500 uppercase tracking-wide block mb-1">{label}</label>
                     <div className="flex items-center gap-2">
                        <button
                           onClick={() => updateSearchParams({ [key]: Math.max(min, searchParams[key] - 1) })}
                           className="w-10 h-11 rounded-lg bg-slate-100 hover:bg-black hover:text-white font-medium text-lg transition-all flex items-center justify-center pb-1"
                        >
                           -
                        </button>
                        <input
                           type="number"
                           value={searchParams[key]}
                           onChange={(e) => updateSearchParams({ [key]: parseInt(e.target.value) || min })}
                           className="flex-1 p-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium outline-none focus:border-black text-center h-11"
                           min={min}
                        />
                        <button
                           onClick={() => updateSearchParams({ [key]: searchParams[key] + 1 })}
                           className="w-10 h-11 rounded-lg bg-slate-100 hover:bg-black hover:text-white font-medium text-lg transition-all flex items-center justify-center pb-1"
                        >
                           +
                        </button>
                     </div>
                  </div>
               ))}

               <div>
                  <label className="text-[10px] font-medium text-slate-500 uppercase tracking-wide block mb-1">Cabin Class</label>
                  <select
                     value={searchParams.cabin_class}
                     onChange={(e) => updateSearchParams({ cabin_class: e.target.value })}
                     className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium h-11 outline-none focus:border-black"
                  >
                     <option value="economy">Economy</option>
                     <option value="premium_economy">Premium Economy</option>
                     <option value="business">Business</option>
                     <option value="first">First Class</option>
                  </select>
               </div>

               <div>
                  <label className="text-[10px] font-medium text-slate-500 uppercase tracking-wide block mb-1">Currency</label>
                  <select
                     value={searchParams.currency}
                     onChange={(e) => updateSearchParams({ currency: e.target.value })}
                     className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium h-11 outline-none focus:border-black"
                  >
                     <option value="PKR">PKR (₨)</option>
                     <option value="USD">USD ($)</option>
                     <option value="EUR">EUR (€)</option>
                     <option value="SAR">SAR (﷼)</option>
                  </select>
               </div>

               <div>
                  <label className="text-[10px] font-medium text-slate-500 uppercase tracking-wide block mb-1">Sort By</label>
                  <select
                     value={searchParams.sort}
                     onChange={(e) => updateSearchParams({ sort: e.target.value })}
                     className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium h-11 outline-none focus:border-black"
                  >
                     <option value="price">Price (Low)</option>
                     <option value="duration">Duration (Shortest)</option>
                  </select>
               </div>

               <div>
                  <label className="text-[10px] font-medium text-slate-500 uppercase tracking-wide block mb-1">Max Price</label>
                  <input
                     type="number"
                     value={searchParams.max_price || ''}
                     onChange={(e) => updateSearchParams({ max_price: e.target.value ? parseFloat(e.target.value) : null })}
                     className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium outline-none focus:border-black h-11"
                     placeholder="No limit"
                  />
               </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-col sm:flex-row justify-between items-center pt-2 gap-4">
               <label className="flex items-center gap-3 cursor-pointer">
                  <input
                     type="checkbox"
                     checked={searchParams.non_stop}
                     onChange={(e) => updateSearchParams({ non_stop: e.target.checked })}
                     className="w-5 h-5 rounded border-2 border-slate-300 text-black focus:ring-black"
                  />
                  <span className="text-sm font-medium text-slate-900">Non-stop flights only</span>
               </label>

               <button
                  onClick={searchFlights}
                  disabled={isSearching}
                  className="px-8 py-3 bg-black text-white font-medium text-[12px] uppercase tracking-wide rounded-lg hover:bg-[var(--sacred-emerald)] hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3 shadow-lg"
               >
                  {isSearching ? (
                     <>
                        <Loader2 size={16} className="animate-spin" />
                        Searching...
                     </>
                  ) : (
                     <>
                        <Search size={16} />
                        Search Flights
                     </>
                  )}
               </button>
            </div>
         </div>

         {/* Loading State */}
         {isSearching && (
            <div className="text-center py-20">
               <Loader2 size={64} className="mx-auto text-black animate-spin mb-6" />
               <p className="text-slate-500 font-medium text-lg">Searching for the best flights...</p>
            </div>
         )}

         {/* Flight Results - unchanged except using safe arrays */}
         {!isSearching && searchedFlights.length > 0 && (
            <div className="space-y-6">
               <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-medium text-slate-900">{searchedFlights.length} Flights Found</h2>
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

                  const currencySymbol =
                     searchParams.currency === 'USD' ? '$' :
                        searchParams.currency === 'EUR' ? '€' :
                           searchParams.currency === 'PKR' ? '₨' : '﷼';

                  return (
                     <div
                        key={index}
                        onClick={() => selectFlight(flight)}
                        className={`bg-white rounded-2xl border-2 transition-all cursor-pointer shadow-lg hover:shadow-2xl ${selectedFlight === flight
                           ? 'border-black ring-4 ring-black/20'
                           : 'border-slate-200 hover:border-black'
                           }`}
                     >
                        <div className="p-8">
                           <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                              {/* Airline & Flight Info */}
                              <div className="flex items-center gap-6 flex-1">
                                 {airlineLogo ? (
                                    <img src={airlineLogo} alt={airline} className="w-24 h-24 rounded-xl object-contain bg-white border-2 border-slate-100 shadow-lg" />
                                 ) : (
                                    <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-black to-[var(--sacred-emerald)] flex items-center justify-center shadow-lg">
                                       <Plane className="text-white" size={40} />
                                    </div>
                                 )}
                                 <div className="space-y-2">
                                    <h3 className="text-xl font-medium text-slate-900">{airline}</h3>
                                    <p className="text-sm font-medium text-slate-500">{departure} → {arrival}</p>
                                    <div className="flex items-center gap-4 text-xs font-medium text-slate-400">
                                       <span className="flex items-center gap-2">
                                          <Clock size={14} />
                                          {duration}
                                       </span>
                                       {flightNumber && (
                                          <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg">{flightNumber}</span>
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
                                    <p className="text-3xl font-medium text-slate-900">
                                       {departureTime ? new Date(departureTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }) : 'N/A'}
                                    </p>
                                    <p className="text-xs font-medium text-slate-400">{departure}</p>
                                 </div>

                                 <div className="flex flex-col items-center">
                                    <ArrowRight className="text-black" size={32} />
                                    <p className="text-xs font-medium text-slate-400 mt-1">{duration}</p>
                                 </div>

                                 <div className="text-center space-y-2">
                                    <p className="text-3xl font-medium text-slate-900">
                                       {arrivalTime ? new Date(arrivalTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }) : 'N/A'}
                                    </p>
                                    <p className="text-xs font-medium text-slate-400">{arrival}</p>
                                 </div>

                                 <div className="text-right pl-8 border-l-2 border-slate-200">
                                    <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">Total Price</p>
                                    <p className="text-3xl font-medium text-black">
                                       {currencySymbol}{price.toLocaleString()}
                                    </p>
                                    <p className="text-xs font-medium text-slate-400 mt-1">{travelClass}</p>
                                 </div>
                              </div>
                           </div>
                        </div>

                        {/* Expanded Details */}
                        {selectedFlight === flight && (
                           <div className="border-t-2 border-slate-200 p-8 bg-slate-50">
                              <h4 className="text-sm font-medium text-slate-900 uppercase tracking-wider mb-6">Flight Details</h4>
                              <div className="space-y-6 mb-8">
                                 {flight.flights.map((leg, legIdx) => (
                                    <div key={legIdx} className="bg-white p-6 rounded-xl border-2 border-slate-200">
                                       <div className="flex items-start justify-between mb-4">
                                          <div className="flex items-center gap-4">
                                             {leg.airline_logo && (
                                                <img src={leg.airline_logo} alt={leg.airline} className="w-12 h-12 rounded-lg object-contain" />
                                             )}
                                             <div>
                                                <p className="font-medium text-slate-900">{leg.airline}</p>
                                                <p className="text-xs font-medium text-slate-500">{leg.flight_number} • {leg.airplane}</p>
                                             </div>
                                          </div>
                                          <span className="px-4 py-2 bg-black/10 text-black rounded-lg text-xs font-medium">
                                             {leg.travel_class}
                                          </span>
                                       </div>
                                       <div className="grid grid-cols-2 gap-4">
                                          <div>
                                             <p className="text-xs font-medium text-slate-400 mb-1">Departure</p>
                                             <p className="text-lg font-medium text-slate-900">
                                                {leg.departure_airport?.time ? new Date(leg.departure_airport.time).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }) : 'N/A'}
                                             </p>
                                             <p className="text-sm font-medium text-slate-500">{leg.departure_airport?.name}</p>
                                          </div>
                                          <div>
                                             <p className="text-xs font-medium text-slate-400 mb-1">Arrival</p>
                                             <p className="text-lg font-medium text-slate-900">
                                                {leg.arrival_airport?.time ? new Date(leg.arrival_airport.time).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }) : 'N/A'}
                                             </p>
                                             <p className="text-sm font-medium text-slate-500">{leg.arrival_airport?.name}</p>
                                          </div>
                                       </div>
                                       <div className="mt-4 flex flex-wrap gap-2">
                                          <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-medium">
                                             Duration: {formatDuration(leg.duration)}
                                          </span>
                                          {leg.legroom && (
                                             <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-medium">
                                                Legroom: {leg.legroom}
                                             </span>
                                          )}
                                          {leg.extensions?.map((ext, extIdx) => (
                                             <span key={extIdx} className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-medium">
                                                {ext}
                                             </span>
                                          ))}
                                       </div>
                                    </div>
                                 ))}
                              </div>
                              {flight.layovers && flight.layovers.length > 0 && (
                                 <div className="bg-white p-6 rounded-xl border-2 border-slate-200 mb-6">
                                    <h5 className="text-sm font-medium text-slate-900 uppercase tracking-wider mb-4">Layovers</h5>
                                    <div className="space-y-4">
                                       {flight.layovers.map((layover, idx) => (
                                          <div key={idx} className="flex items-center gap-4 p-4 bg-orange-50 rounded-lg border-2 border-orange-200">
                                             <Calendar className="text-orange-500" size={20} />
                                             <div>
                                                <p className="font-medium text-slate-900">{layover.name}</p>
                                                <p className="text-sm text-slate-500">Duration: {formatDuration(layover.duration)}</p>
                                                {layover.overnight && (
                                                   <span className="text-xs font-medium text-orange-600">Overnight layover</span>
                                                )}
                                             </div>
                                          </div>
                                       ))}
                                    </div>
                                 </div>
                              )}
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                 <div className="bg-white p-6 rounded-xl border-2 border-slate-200">
                                    <p className="text-xs font-medium text-slate-400 mb-2">Flight Duration</p>
                                    <p className="text-lg font-medium text-slate-900">{duration}</p>
                                 </div>
                                 <div className="bg-white p-6 rounded-xl border-2 border-slate-200">
                                    <p className="text-xs font-medium text-slate-400 mb-2">Price per Person</p>
                                    <p className="text-lg font-medium text-black">
                                       {currencySymbol}{price.toLocaleString()}
                                    </p>
                                 </div>
                                 <div className="bg-white p-6 rounded-xl border-2 border-slate-200">
                                    <p className="text-xs font-medium text-slate-400 mb-2">Carbon Emissions</p>
                                    <p className="text-lg font-medium text-slate-900">
                                       {flight.carbon_emissions ? `${(flight.carbon_emissions.this_flight / 1000).toFixed(0)} kg` : 'N/A'}
                                    </p>
                                    {flight.carbon_emissions && (
                                       <p className="text-xs font-medium text-green-600 mt-1">
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

         {/* Empty State */}
         {!isSearching && searchedFlights.length === 0 && (
            <div className="text-center py-20 bg-white rounded-2xl border-2 border-slate-200">
               <Plane className="mx-auto text-slate-300 mb-6" size={80} />
               <p className="text-slate-400 font-medium text-lg mb-2">No flights searched yet</p>
               <p className="text-slate-400 text-sm">Enter your travel details and click "Search" to find flights</p>
            </div>
         )}
      </div>
   );
};

export default LiveBooking;