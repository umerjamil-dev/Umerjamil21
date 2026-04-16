import React, { useState, useEffect } from 'react';
import {
  ArrowLeft, Package, User,
  Calendar, CreditCard,
  Save, ShieldCheck,
  DollarSign, ChevronDown, Check
} from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import useBookingStore from '../store/useBookingStore';
import useCustomerStore from '../store/useCustomerStore';
import usePackageStore from '../store/usePackageStore';
import useMasterTypeStore from '../store/useMasterTypeStore';
import toast from 'react-hot-toast';

/* ─────────────────────────────────────────────
   Reusable UnderlineSelect
   ───────────────────────────────────────────── */
const UnderlineSelect = ({ label, value, onChange, children, accentColor = 'black' }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 pl-0.5">
      {label}
    </label>
    <div
      className="relative flex items-center border-b-2 border-slate-100 pb-3 transition-all duration-200"
      style={{ '--accent': accentColor }}
    >
      <select
        value={value}
        onChange={onChange}
        className="w-full bg-transparent text-base font-bold text-slate-900 outline-none appearance-none cursor-pointer pr-7 leading-snug"
        style={{ fontFamily: 'inherit' }}
        onFocus={e => e.currentTarget.closest('.relative').style.borderBottomColor = accentColor}
        onBlur={e => e.currentTarget.closest('.relative').style.borderBottomColor = '#f1f5f9'}
      >
        {children}
      </select>
      <ChevronDown
        size={15}
        strokeWidth={2.5}
        className="absolute right-0 pointer-events-none text-slate-300 flex-shrink-0"
      />
    </div>
  </div>
);

/* ─────────────────────────────────────────────
   Reusable UnderlineInput
   ───────────────────────────────────────────── */
const UnderlineInput = ({
  label, type = 'text', placeholder, value, onChange,
  icon: Icon, large = false, accentColor = 'black', iconColor = '#cbd5e1'
}) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 pl-0.5">
      {label}
    </label>
    <div
      className="relative flex items-center border-b-2 border-slate-100 pb-3 transition-all duration-200"
      onFocus={e => e.currentTarget.style.borderBottomColor = accentColor}
      onBlur={e => e.currentTarget.style.borderBottomColor = '#f1f5f9'}
    >
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full bg-transparent outline-none font-black text-slate-900 placeholder-slate-200 tracking-tight leading-none pr-7`}
        style={{
          fontSize: large ? '26px' : '15px',
          color: accentColor === 'black' ? undefined : accentColor,
        }}
        onFocus={e => e.currentTarget.closest('.relative').style.borderBottomColor = accentColor}
        onBlur={e => e.currentTarget.closest('.relative').style.borderBottomColor = '#f1f5f9'}
      />
      {Icon && (
        <Icon
          size={large ? 20 : 16}
          strokeWidth={2.5}
          className="absolute right-0 flex-shrink-0 pointer-events-none"
          style={{ color: iconColor }}
        />
      )}
    </div>
  </div>
);

/* ─────────────────────────────────────────────
   Main Component
   ───────────────────────────────────────────── */
const UpdateBooking = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { updateBooking, fetchBookings, bookings, isLoading: isBookingLoading } = useBookingStore();
  const { customers, fetchCustomers } = useCustomerStore();
  const { packages, fetchPackages } = usePackageStore();
  const { masterData, fetchMasterData } = useMasterTypeStore();

  const [formData, setFormData] = useState({
    customerId: '',
    packageId: '',
    travelDate: '',
    totalAmount: '',
    paidAmount: '',
    paymentMethod: '',
  });

  useEffect(() => {
    fetchCustomers();
    fetchPackages();
    fetchMasterData();
    if (bookings.length === 0) fetchBookings();
  }, [fetchCustomers, fetchPackages, fetchMasterData, fetchBookings, bookings.length]);

  const existing = bookings.find(b => String(b.id) === String(id));

  useEffect(() => {
    if (existing) {
      setFormData({
        customerId: existing.customer_id || existing.customer?.id || '',
        packageId: existing.package_id || existing.package?.id || '',
        travelDate: existing.travel_date || '',
        totalAmount: existing.total_amount || '',
        paidAmount: existing.paid_amount || '',
        paymentMethod: existing.transaction_type?.id || existing.transaction_type || '', 
      });
    }
  }, [id, bookings, existing]);

  const remaining = (parseFloat(formData.totalAmount) || 0) - (parseFloat(formData.paidAmount) || 0);
  const selectedPackage = packages.find(p => p.id == formData.packageId);
  
  const handleSubmit = async () => {
    if (!formData.customerId || !formData.packageId || !formData.totalAmount) {
      toast.error('Customer, Package and Total Amount are required.');
      return;
    }
    try {
      console.log('Submission Payload (UpdateBooking):', formData);
      const payload = {
        customer_id: formData.customerId,
        package_id: formData.packageId,
        total_amount: parseFloat(formData.totalAmount),
        paid_amount: parseFloat(formData.paidAmount) || 0,
        remaining_amount: remaining,
        travel_date: formData.travelDate,
        transaction_type: formData.paymentMethod,
      };
      await updateBooking(id, payload);
      toast.success('Booking successfully updated.');
      navigate('/bookings');
    } catch (err) {
      toast.error('Error: ' + err.message);
    }
  };

  return (
  <>
  
  
    <div className="font-sans space-y-10 pb-24 px-4 md:px-0 animate-in slide-in-from-bottom-6 duration-700">

      {/* ── Header ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-100 pb-7 pt-2">
        <Link
          to="/bookings"
          className="flex items-center gap-3 text-slate-400 hover:text-slate-900 transition-all group w-fit"
        >
          <div className="w-10 h-10 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-center group-hover:shadow-md group-hover:bg-white transition-all">
            <ArrowLeft size={16} strokeWidth={2.5} />
          </div>
          <span className="text-[9px] font-black uppercase tracking-[0.25em]">Back to Audit</span>
        </Link>

        <div className="text-center">
          <h1 className="text-2xl font-black text-slate-900 tracking-tight uppercase">
            Update Booking 
          </h1>
        </div>

        <button  
          onClick={handleSubmit}
          disabled={isBookingLoading}
          className={`flex items-center gap-2.5 px-8 py-4 rounded-xl text-[9px] font-black uppercase tracking-[0.25em] shadow-lg transition-all duration-200
            ${isBookingLoading
              ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
              : 'bg-black text-white hover:bg-[#C9A84C] hover:text-black'
            }`}
        >
          <Save size={15} strokeWidth={2.5} />
          {isBookingLoading ? 'Processing...' : 'Update & Save'}
        </button>
      </div>

      {/* ── Body Grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* ── Sidebar ── */}
        <div className="lg:col-span-4 flex flex-col gap-6">

          {/* Summary Card */}
          <div className="bg-[#020617] rounded-2xl p-8 text-white shadow-2xl relative overflow-hidden">
            {/* Decorative blob */}
            <div className="absolute top-0 right-0 w-28 h-28 rounded-bl-[4rem] bg-white/5 pointer-events-none" />

            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/25 mb-8 relative z-10">
              Synthesis
            </p>

            <div className="space-y-5 relative z-10">
              <div className="flex items-end justify-between">
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/35">
                  Total Amount
                </span>
                <span className="text-xl font-black tracking-tight">
                  ${(parseFloat(formData.totalAmount) || 0).toLocaleString()}
                </span>
              </div>

              <div className="flex items-end justify-between">
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/35">
                  Residual Debt
                </span>
                <span className="text-xl font-black tracking-tight text-[#C9A84C]">
                  ${Math.max(0, remaining).toLocaleString()}
                </span>
              </div>

              <div className="h-px bg-white/10 my-2" />

              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center text-[#C9A84C] flex-shrink-0">
                  <Package size={20} strokeWidth={2} />
                </div>
                <div>
                  <p className="text-[9px] font-black uppercase tracking-[0.2em] text-white/25 mb-0.5">
                    Assigned Protocol
                  </p>
                  <p className="text-sm font-black text-white leading-snug">
                    {selectedPackage ? (selectedPackage.title || selectedPackage.name) : '—'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Shield Card */}
          <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm">
            <div className="w-11 h-11 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-6">
              <ShieldCheck size={22} strokeWidth={2} className="text-slate-700" />
            </div>
            <h4 className="text-[9px] font-black text-slate-900 mb-3 uppercase tracking-[0.25em]">
              Mandate Protocol
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-6">
              Updates to operationalized bookings will be reflected across VIP segments.
            </p>
            <button className="text-[9px] font-black uppercase tracking-[0.25em] text-slate-900 border-b-2 border-slate-100 hover:border-black transition-all pb-0.5">
              Review Mandate Terms
            </button>
          </div>
        </div>

        {/* ── Form Area ── */}
        <div className="lg:col-span-8 flex flex-col gap-6">

          {/* Section: Customer & Package */}
          <div className="bg-white rounded-2xl p-10 border border-slate-100 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-28 h-28 bg-slate-50 rounded-bl-[4rem] translate-x-10 -translate-y-10 pointer-events-none" />

            <h3 className="text-[9px] font-black text-slate-400 uppercase tracking-[0.35em] mb-9 flex items-center gap-2.5 relative z-10">
              <User size={14} strokeWidth={3} className="text-[#C9A84C]" />
              Link Pilgrim &amp; Segment
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10">
              <UnderlineSelect
                label="Customer"
                value={formData.customerId}
                onChange={e => setFormData({ ...formData, customerId: e.target.value })}
              >
                <option value="">Query Registry...</option>
                {customers.map(c => (
                  <option key={c.id} value={c.id}>
                    {c.firstName} {c.lastName}
                  </option>
                ))}
                {customers.length === 0 && (
                  <option value="" disabled>No customers found</option>
                )}
              </UnderlineSelect>

              <UnderlineSelect
                label="Package"
                value={formData.packageId}
                onChange={e => {
                  const pkg = packages.find(p => p.id == e.target.value);
                  setFormData({
                    ...formData,
                    packageId: e.target.value,
                    totalAmount: pkg ? pkg.base_price : formData.totalAmount,
                  });
                }}
              >
                <option value="">Catalogue Entry...</option>
                {packages.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.title || p.name}
                  </option>
                ))}
                {packages.length === 0 && (
                  <>
                    <option value="1">Executive Hajj 2025</option>
                    <option value="2">Premium Umrah Economy+</option>
                  </>
                )}
              </UnderlineSelect>
            </div>
          </div>    
          {/* Section: Financial Settlement */}
          <div className="bg-white rounded-2xl p-10 border border-slate-100 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-28 h-28 bg-slate-50 rounded-bl-[4rem] translate-x-10 -translate-y-10 pointer-events-none" />

            <h3 className="text-[9px] font-black text-slate-400 uppercase tracking-[0.35em] mb-9 flex items-center gap-2.5 relative z-10">
              <CreditCard size={14} strokeWidth={3} className="text-[#C9A84C]" />
              Financial Settlement
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10 relative z-10">
              <UnderlineInput
                label="Travel Date"
                type="date"
                value={formData.travelDate}
                onChange={e => setFormData({ ...formData, travelDate: e.target.value })}
              />

              <UnderlineSelect
                label="Transaction Type"
                value={formData.paymentMethod}
                onChange={e => setFormData({ ...formData, paymentMethod: e.target.value })}
              >
                <option value="">Select Type...</option>
                {masterData?.billingpaymentstatus?.map((item, idx) => (
                  <option key={idx} value={item.id || item}>
                    {item.name || item}
                  </option>
                ))}
                {(!masterData?.billingpaymentstatus || masterData.billingpaymentstatus.length === 0) && (
                  <>
                    <option value="Bank Transfer">Bank Transfer</option>
                    <option value="Cash">Cash</option>
                    <option value="Cheque">Cheque</option>
                    <option value="Online">Online Payment</option>
                  </>
                )}
              </UnderlineSelect>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10">
              <UnderlineInput
                label="Total Value"
                type="number"
                placeholder="0,000"
                value={formData.totalAmount}
                onChange={e => setFormData({ ...formData, totalAmount: e.target.value })}
                icon={DollarSign}
                large
              />

              <UnderlineInput
                label="Paid Amount"
                type="number"
                placeholder="0,000"
                value={formData.paidAmount}
                onChange={e => setFormData({ ...formData, paidAmount: e.target.value })}
                icon={CreditCard}
                large
                accentColor="#1a7a52"
                iconColor="#1a7a52"
              />
            </div>

            {/* Remaining Amount Display */}
            {(formData.totalAmount || formData.paidAmount) && (
              <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between relative z-10">
                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">
                  Remaining Balance
                </span>
                <span
                  className={`text-2xl font-black tracking-tight ${
                    remaining > 0 ? 'text-amber-500' : 'text-emerald-600'
                  }`}
                >
                  ${Math.max(0, remaining).toLocaleString()}
                  {remaining <= 0 && (
                    <Check size={20} strokeWidth={3} className="inline ml-2 text-emerald-500" />
                  )}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  </>
  );
};

export default UpdateBooking;
