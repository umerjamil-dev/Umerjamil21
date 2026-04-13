import React, { useState, useEffect } from 'react';
import {
   ArrowLeft, Plane, Hotel,
   MapPin, ShieldCheck, Clock,
   Save, Info, LayoutDashboard,
   Calendar, CheckCircle2,
   ArrowRight, Plus
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import useBookingStore from '../store/useBookingStore';
import useHotelStore from '../store/useHotelStore';
import useVisaStore from '../store/useVisaStore';
import useFlightStore from '../store/useFlightStore';
import useTransportStore from '../store/useTransportStore';
import useMasterTypeStore from '../store/useMasterTypeStore';
import toast from 'react-hot-toast';

/* ── tiny helpers ── */
const inputCls =
   'w-full bg-transparent text-sm font-medium text-slate-900 outline-none placeholder-slate-300 py-2.5';
const selectCls =
   'w-full bg-transparent text-sm font-medium text-slate-900 outline-none appearance-none cursor-pointer py-2.5';

const Field = ({ label, children, span2 = false }) => (
   <div className={span2 ? 'md:col-span-2' : ''}>
      <label
         style={{
            display: 'block',
            fontSize: '11px',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: '#94a3b8',
            marginBottom: '6px',
         }}
      >
         {label}
      </label>
      <div
         style={{
            borderBottom: '1.5px solid #e2e8f0',
            transition: 'border-color 0.15s',
         }}
         onFocusCapture={e => (e.currentTarget.style.borderBottomColor = '#0f172a')}
         onBlurCapture={e => (e.currentTarget.style.borderBottomColor = '#e2e8f0')}
      >
         {children}
      </div>
   </div>
);

const types = [
   { id: 'Hotel',     icon: Hotel,       label: 'Hotel',     accent: '#d97706', accentBg: '#fffbeb' },
   { id: 'Visa',      icon: ShieldCheck, label: 'Visa',      accent: '#059669', accentBg: '#ecfdf5' },
   { id: 'Flight',    icon: Plane,       label: 'Flight',    accent: '#2563eb', accentBg: '#eff6ff' },
   { id: 'Transport', icon: MapPin,      label: 'Transport', accent: '#7c3aed', accentBg: '#f5f3ff' },
];

const AddReservation = () => {
   const navigate = useNavigate();
   const { bookings, fetchBookings } = useBookingStore();
   const { addHotel }     = useHotelStore();
   const { addVisa }      = useVisaStore();
   const { addFlight }    = useFlightStore();
   const { addTransport } = useTransportStore();
   const { masterData, fetchMasterData } = useMasterTypeStore();

   const [formData, setFormData] = useState({
      type: 'Hotel',
      bookingId: '',
      provider: '',
      checkIn: '',
      checkOut: '',
      referenceNumber: '',
      status: null,
      hotelName: '',
      city: 'Makkah',
      roomType: '',
      visaNumber: '',
      airline: '',
      ticketNumber: '',
      departure: '',
      departureTime: '',
      arrival: '',
      arrivalTime: '',
      vehicle: '',
      driver: '',
      driverPhone: '',
      plateNumber: '',
      dateOfIssue: '',
      time: '',
      vehicleType: '',
      notes: '',
      transportType: 'Pickup (Airport)',
   });

   useEffect(() => {
      fetchBookings();
      fetchMasterData();
   }, [fetchBookings, fetchMasterData]);

   const set = (key, val) => setFormData(p => ({ ...p, [key]: val }));

   const handleSubmit = async () => {
      if (!formData.bookingId) {
         toast.error('Please select a parent booking.');
         return;
      }
      try {
         if (formData.type === 'Hotel') {
            await addHotel({
               booking_id: formData.bookingId,
               hotel_name: formData.hotelName,
               city: formData.city,
               check_in: formData.checkIn,
               check_out: formData.checkOut,
               rooms: formData.roomType,
               status: formData.status,
            });
         } else if (formData.type === 'Visa') {
            await addVisa({
               booking_id: formData.bookingId,
               visa_number: formData.visaNumber,
               status: formData.status,
               notes: formData.notes,
            });
         } else if (formData.type === 'Flight') {
            await addFlight({
               booking_id: formData.bookingId,
               airline: formData.airline,
               ticket_number: formData.ticketNumber,
               departure: formData.departureTime ? `${formData.departure} @ ${formData.departureTime}` : formData.departure,
               arrival: formData.arrivalTime ? `${formData.arrival} @ ${formData.arrivalTime}` : formData.arrival,
               status: formData.status,
            });
         } else if (formData.type === 'Transport') {
            await addTransport({
               booking_id: formData.bookingId,
               type: formData.transportType,
               vehicle: formData.vehicle,
               driver: formData.driver,
               driver_phone: formData.driverPhone,
               plate_number: formData.plateNumber,
               date_of_issue: formData.dateOfIssue,
               time: formData.time,
               notes: formData.notes,
               vehicle_type: formData.vehicleType,
            });
         }
         toast.success(`${formData.type} reservation saved.`);
         navigate('/reservations');
      } catch (err) {
         toast.error('Error: ' + err.message);
      }
   };

   const bookingsArr = Array.isArray(bookings) ? bookings : Object.values(bookings || {});
   const activeType = types.find(t => t.id === formData.type);

   return (
     <>
      <div style={{ fontFamily: "'Inter', sans-serif" }} className="pb-20">

         {/* ── Header ── */}
         <div
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6"
            style={{ borderBottom: '1px solid #e2e8f0' }}
         >
            <div className="flex items-center gap-4">
               <Link
                  to="/reservations"
                  className="flex items-center justify-center w-9 h-9 rounded-xl transition-all hover:bg-slate-100"
                  style={{ border: '1px solid #e2e8f0', color: '#64748b' }}
               >
                  <ArrowLeft size={16} strokeWidth={2.5} />
               </Link>
               <div>
                  <p className="text-xs font-semibold uppercase tracking-widest mb-0.5" style={{ color: '#94a3b8' }}>
                     Reservations
                  </p>
                  <h1 className="text-2xl font-bold tracking-tight text-slate-900">Add Reservation</h1>
               </div>
            </div>
            <button
               onClick={handleSubmit}
               className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-95"
               style={{ background: '#0f172a', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }}
            >
               <Save size={15} strokeWidth={2.5} />
               Save Reservation
            </button>
         </div>

         {/* ── Type Selector ── */}
         <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
            {types.map((t) => {
               const active = formData.type === t.id;
               return (
                  <button
                     key={t.id}
                     onClick={() => set('type', t.id)}
                     className="flex flex-col items-start p-4 rounded-xl text-left transition-all"
                     style={{
                        background: active ? '#ffffff' : '#f8fafc',
                        border: active ? `1.5px solid ${t.accent}` : '1.5px solid #e2e8f0',
                        boxShadow: active ? `0 0 0 3px ${t.accentBg}` : 'none',
                     }}
                  >
                     <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center mb-3"
                        style={{
                           background: active ? t.accentBg : '#f1f5f9',
                           color: active ? t.accent : '#94a3b8',
                        }}
                     >
                        <t.icon size={17} strokeWidth={2} />
                     </div>
                     <p
                        className="text-sm font-semibold"
                        style={{ color: active ? '#0f172a' : '#64748b' }}
                     >
                        {t.label}
                     </p>
                     {active && (
                        <p className="text-xs mt-0.5" style={{ color: t.accent }}>Selected</p>
                     )}
                  </button>
               );
            })}
         </div>

         {/* ── Main Body ── */}
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

            {/* Sidebar */}
            <div className="lg:col-span-4">
               <div
                  className="rounded-xl p-6 h-full"
                  style={{ background: '#0f172a', border: '1px solid #1e293b' }}
               >
                  <div
                     className="w-10 h-10 rounded-xl flex items-center justify-center mb-5"
                     style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)' }}
                  >
                     {activeType && (
                        <activeType.icon size={18} strokeWidth={2} style={{ color: activeType.accent }} />
                     )}
                  </div>
                  <h3 className="text-base font-semibold text-white mb-2">
                     {activeType?.label} Details
                  </h3>
                  <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.4)' }}>
                     Fill in the required fields for this reservation segment. All entries are synced in real-time.
                  </p>

                  <div className="mt-8 space-y-3">
                     {[
                        { icon: Clock,       label: 'Real-time sync active' },
                        { icon: ShieldCheck, label: 'GDS uplink verified' },
                     ].map(({ icon: Icon, label }) => (
                        <div key={label} className="flex items-center gap-3">
                           <Icon size={14} strokeWidth={2} style={{ color: 'rgba(255,255,255,0.25)' }} />
                           <span className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>{label}</span>
                        </div>
                     ))}
                  </div>

                  {/* Booking selector in sidebar */}
                  <div className="mt-8 pt-6" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                     <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: 'rgba(255,255,255,0.3)' }}>
                        Parent Booking
                     </p>
                     <select
                        className="w-full text-sm font-medium rounded-lg px-3 py-2.5 outline-none cursor-pointer"
                        style={{
                           background: 'rgba(255,255,255,0.06)',
                           border: '1px solid rgba(255,255,255,0.12)',
                           color: formData.bookingId ? '#ffffff' : 'rgba(255,255,255,0.4)',
                        }}
                        value={formData.bookingId}
                        onChange={(e) => set('bookingId', e.target.value)}
                     >
                        <option value="" style={{ background: '#1e293b' }}>Select booking...</option>
                        {bookingsArr.map(b => (
                           <option key={b.id} value={b.id} style={{ background: '#1e293b' }}>
                              {b.customer_name || b.customer?.firstName || 'N/A'} — #{b.id}
                           </option>
                        ))}
                     </select>
                  </div>
               </div>
            </div>

            {/* Form Card */}
            <div
               className="lg:col-span-8 rounded-xl p-8"
               style={{ background: '#ffffff', border: '1px solid #e2e8f0' }}
            >
               <p className="text-xs font-semibold uppercase tracking-widest mb-6" style={{ color: '#94a3b8' }}>
                  {activeType?.label} Information
               </p>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">

                  {/* ── VISA ── */}
                  {formData.type === 'Visa' && (
                     <>
                        <Field label="Visa Number">
                           <input type="text" placeholder="E-VISA #82934" className={inputCls}
                              value={formData.visaNumber} onChange={e => set('visaNumber', e.target.value)} />
                        </Field>
                        <Field label="Visa Status">
                           <select className={selectCls} value={formData.status || ''}
                              onChange={e => set('status', e.target.value)}>
                              <option value="">Select status...</option>
                              {(masterData?.statusvisa || []).map(s => (
                                 <option key={s.id} value={s.id}>{s.name}</option>
                              ))}
                           </select>
                        </Field>
                        <Field label="Internal Notes" span2>
                           <input type="text" placeholder="MOFA verification pending..." className={inputCls}
                              value={formData.notes} onChange={e => set('notes', e.target.value)} />
                        </Field>
                     </>
                  )}

                  {/* ── HOTEL ── */}
                  {formData.type === 'Hotel' && (
                     <>
                        <Field label="Hotel Name">
                           <input type="text" placeholder="Fairmont Makkah..." className={inputCls}
                              value={formData.hotelName} onChange={e => set('hotelName', e.target.value)} />
                        </Field>
                        <Field label="City">
                           <select className={selectCls} value={formData.city} onChange={e => set('city', e.target.value)}>
                              <option>Makkah</option>
                              <option>Madinah</option>
                              <option>Jeddah</option>
                           </select>
                        </Field>
                        <Field label="Check-in">
                           <input type="date" className={inputCls}
                              value={formData.checkIn} onChange={e => set('checkIn', e.target.value)} />
                        </Field>
                        <Field label="Check-out">
                           <input type="date" className={inputCls}
                              value={formData.checkOut} onChange={e => set('checkOut', e.target.value)} />
                        </Field>
                        <Field label="Room">
                           <input type="text" placeholder="Double, Triple, Quad..." className={inputCls}
                              value={formData.roomType} onChange={e => set('roomType', e.target.value)} />
                              
                        </Field>
                     </>
                  )}

                  {/* ── FLIGHT ── */}
                  {formData.type === 'Flight' && (
                     <>
                        <Field label="Airline">
                           <input type="text" placeholder="Saudi Airlines (SV-001)..." className={inputCls}
                              value={formData.airline} onChange={e => set('airline', e.target.value)} />
                        </Field>
                        <Field label="Ticket Number">
                           <input type="text" placeholder="TKT-#029384756" className={inputCls}
                              value={formData.ticketNumber} onChange={e => set('ticketNumber', e.target.value)} />
                        </Field>
                        <Field label="Departure Time">
                           <input type="time" className={inputCls}
                              value={formData.departureTime} onChange={e => set('departureTime', e.target.value)} />
                        </Field>
                        <Field label="Arrival Time">
                           <input type="time" className={inputCls}
                              value={formData.arrivalTime} onChange={e => set('arrivalTime', e.target.value)} />
                        </Field>
                     </>
                  )}

                  {/* ── TRANSPORT ── */}
                  {formData.type === 'Transport' && (
                     <>
                        <Field label="Transport Type">
                           <select className={selectCls} value={formData.transportType} onChange={e => set('transportType', e.target.value)}>
                              <option value="">Select type...</option>
                              {(masterData?.transport_type?.length > 0
                                 ? masterData.transport_type
                                 : [
                                      { id: 'Pickup (Airport)', name: 'Pickup (Airport)' },
                                      { id: 'Drop (Airport)',   name: 'Drop (Airport)' },
                                      { id: 'Ziyarat (Makkah)',  name: 'Ziyarat (Makkah)' },
                                      { id: 'Ziyarat (Madinah)', name: 'Ziyarat (Madinah)' },
                                      { id: 'Inter-city Transit', name: 'Inter-city Transit' },
                                   ]
                              ).map((t, i) => (
                                 <option key={i} value={t.id || t}>{t.name || t}</option>
                              ))}
                           </select>
                        </Field>
                        <Field label="Vehicle">
                           {masterData?.vehicle?.length > 0 ? (
                              <select className={selectCls} value={formData.vehicle} onChange={e => set('vehicle', e.target.value)}>
                                 <option value="">Select vehicle...</option>
                                 {masterData.vehicle.map((v, i) => (
                                    <option key={i} value={v.id || v}>{v.name || v}</option>
                                 ))}
                              </select>
                           ) : (
                              <input type="text" placeholder="GMC Yukon / Bus-50..." className={inputCls}
                                 value={formData.vehicle} onChange={e => set('vehicle', e.target.value)} />
                           )}
                        </Field>
                        <Field label="Driver Name" span2>
                           <input type="text" placeholder="Muhammad Ali" className={inputCls}
                              value={formData.driver} onChange={e => set('driver', e.target.value)} />
                        </Field>
                        <Field label="Driver Phone">
                           <input type="text" placeholder="+966 5X XXX XXXX" className={inputCls}
                              value={formData.driverPhone} onChange={e => set('driverPhone', e.target.value)} />
                        </Field>
                        <Field label="Plate Number">
                           <input type="text" placeholder="ABC-1234" className={inputCls}
                              value={formData.plateNumber} onChange={e => set('plateNumber', e.target.value)} />
                        </Field>
                        <Field label="Vehicle Type">
                           <input type="text" placeholder="Bus / SUV / Van..." className={inputCls}
                              value={formData.vehicleType} onChange={e => set('vehicleType', e.target.value)} />
                        </Field>
                        <Field label="Date of Issue">
                           <input type="date" className={inputCls}
                              value={formData.dateOfIssue} onChange={e => set('dateOfIssue', e.target.value)} />
                        </Field>
                        <Field label="Time">
                           <input type="time" className={inputCls}
                              value={formData.time} onChange={e => set('time', e.target.value)} />
                        </Field>
                        <Field label="Notes" span2>
                           <input type="text" placeholder="Additional notes..." className={inputCls}
                              value={formData.notes} onChange={e => set('notes', e.target.value)} />
                        </Field>
                     </>
                  )}
               </div>

               {/* Submit Row */}
               <div
                  className="flex justify-end mt-8 pt-6"
                  style={{ borderTop: '1px solid #f1f5f9' }}
               >
                  <button
                     onClick={handleSubmit}
                     className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-95"
                     style={{ background: '#0f172a' }}
                  >
                     <Save size={15} strokeWidth={2.5} />
                     Save {activeType?.label}
                  </button>
               </div>
            </div>
         </div>
      </div>
     
     </>
   );
};

export default AddReservation;