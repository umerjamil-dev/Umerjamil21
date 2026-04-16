import { useLocation, useNavigate, Link, useParams } from 'react-router-dom';
import {
  ArrowLeft, Download, CheckCircle2, XCircle,
  User, Mail, Phone, Users, Hotel,
  MapPin, Plane, ShieldCheck, DollarSign,
  Calendar, Package, Star,
  Eye
} from 'lucide-react';
import toast from 'react-hot-toast';
import useCalculatorStore from '../store/useCalculatorStore';
import useCustomerStore from '../store/useCustomerStore';
import { useRef, useEffect, useState } from 'react';

const BASE_URL = 'http://192.168.5.111:8000/';

/* ─── small reusable row ─────────────────────────────────────────────────── */
const DetailRow = ({ icon: Icon, label, value, accent }) => (
  <div className="flex items-center justify-between py-5 border-b border-[var(--outline-variant)] last:border-0">
    <div className="flex items-center gap-4">
      <div className="w-9 h-9 rounded-xl bg-[var(--surface)] border border-[var(--outline-variant)] flex items-center justify-center shrink-0">
        <Icon size={15} className="text-[var(--on-surface-variant)]" strokeWidth={2} />
      </div>
      <span className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-[var(--on-surface-variant)]">
        {label}
      </span>
    </div>
    <span
      className={`text-sm font-manrope font-extrabold ${accent ? 'text-[var(--sacred-emerald,#10b981)]' : 'text-[var(--on-surface)]'
        }`}
    >
      {value ?? '—'}
    </span>
  </div>
);

/* ─── stat card in header ────────────────────────────────────────────────── */
const StatCard = ({ label, value }) => (
  <div className="flex flex-col items-center gap-1 px-8 border-r border-white/10 last:border-0">
    <span className="text-2xl font-manrope font-black text-white">{value}</span>
    <span className="text-[9px] font-black text-white/30 uppercase tracking-[0.25em]">{label}</span>
  </div>
);

/* ─── main page ──────────────────────────────────────────────────────────── */
const CustomerProfile = () => {
  const { state } = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();
  const printRef = useRef(null);
  const {
    saveCalculation,
    getCalculation,
    confirmCalculation,
    isLoading: savingLoading
  } = useCalculatorStore();
  const { getCustomer, showActionButton } = useCustomerStore();
  const [isActionClicked, setIsActionClicked] = useState(false);
  const [hideActionButtons, setHideActionButtons] = useState(false);

  const [localData, setLocalData] = useState({
    customer: state?.customer ?? null,
    inputs: state?.inputs ?? {},
    results: state?.results ?? {},
    token: state?.token ?? null
  });

  const { customer, inputs, results, token } = localData;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const calc = await getCalculation(id);

        // Map from API response (provided by user) to component state
        const mappedInputs = {
          persons: calc.pilgrim_quota || 0,
          makkahNights: calc.makkahNights || 0,
          madinahNights: calc.madinahNights || 0,
          hotelCategory: calc.hotelCategory || '',
          flightCost: calc.flightCost || 0,
          visaCost: calc.visaCost || 0,
          transportCost: calc.transportCost || 0,
          markup: calc.markup || 0
        };

        const mappedResults = {
          hotelTotal: calc.hotel_total || 0,
          totalCost: calc.totalCost || 0,
          profit: calc.profit || 0,
          finalPrice: calc.totalCost || 0 // Assuming totalCost in API IS the final priced quoted
        };

        // If the calculation object already contains customer details, use them
        const mappedCustomer = {
          id: calc.customer_id,
          firstName: calc.firstName,
          lastName: calc.lastName,
          email: calc.email,
          phone: calc.phone,
          customer_image: calc.customer_image,
          pdf_view_url: calc.pdf_view_url
        };

        setLocalData(prev => ({
          ...prev,
          customer: mappedCustomer.firstName ? mappedCustomer : prev.customer,
          inputs: mappedInputs,
          results: mappedResults,
          token: calc.token
        }));

        // fallback if customer details are missing but ID exists
        if (calc.customer_id && !calc.firstName) {
          const cust = await getCustomer(calc.customer_id);
          setLocalData(prev => ({ ...prev, customer: cust }));
        }

        if (calc.customer_id) {
          const shouldHide = await showActionButton(id);
          setHideActionButtons(shouldHide);
        }
      } catch (err) {
        console.error('Fetch error:', err);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id, getCalculation, getCustomer]);

  const isLoading = savingLoading;
  const totalDays = (inputs.makkahNights ?? 0) + (inputs.madinahNights ?? 0);

  /* ── confirm: go back to calculator ───────────────────────────────────── */
  const handleConfirm = async () => {
    if (!token) {
      toast.error("Calculation token not found.");
      return;
    }
    if (isActionClicked) return;
    setIsActionClicked(true);
    try {
      await confirmCalculation(token, 'confirmed');
      toast.success('Confirmed successfully.');
      navigate('/');
    } catch (err) {
      toast.error('Failed to confirm calculation: ' + err.message);
      setIsActionClicked(false);
    }
  };

  const handleCancel = async () => {
    if (!token) {
      toast.error("Calculation token not found.");
      navigate('/');
      return;
    }
    if (isActionClicked) return;
    setIsActionClicked(true);
    try {
      await confirmCalculation(token, 'cancelled');
      toast.success('Cancelled successfully.');
      navigate('/');
    } catch (err) {
      toast.error('Failed to cancel calculation: ' + err.message);
      setIsActionClicked(false);
    }
  };

  /* ── no data guard ─────────────────────────────────────────────────────── */
  if (isLoading && !customer) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] gap-6 font-inter">
        <div className="w-16 h-16 rounded-full border-4 border-[var(--desert-gold)] border-t-transparent animate-spin" />
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--on-surface-variant)]">
          Retrieving Profile...
        </p>
      </div>
    );
  }

  if (!customer && !isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] gap-6 font-inter">
        <div className="w-16 h-16 rounded-2xl bg-[var(--surface-container-lowest)] border border-[var(--outline-variant)] flex items-center justify-center">
          <User size={28} className="text-[var(--on-surface-variant)]" strokeWidth={1.5} />
        </div>
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--on-surface-variant)]">
          No profile data found
        </p>
        <Link
          to="/calculator"
          className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-widest text-[var(--on-surface-variant)] hover:text-[var(--on-surface)] transition-colors"
        >
          <ArrowLeft size={14} /> Back to Calculator
        </Link>
      </div>
    );
  }

  const fullName = `${customer.firstName ?? ''} ${customer.lastName ?? ''}`.trim();
  const pdfUrl = customer.pdf_view_url;
  console.log(pdfUrl);


  return (
    <div className="font-inter space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-24">

      {/* ── Navigation bar ───────────────────────────────────────────────── */}
      <div className="flex items-center justify-between">
        <Link
          to="/calculator"
          className="flex items-center gap-3 text-[var(--on-surface-variant)] hover:text-[var(--on-surface)] transition-all group"
        >
          <div className="p-3 bg-[var(--surface-container-lowest)] rounded-xl border border-[var(--outline-variant)] group-hover:shadow-md transition-all">
            <ArrowLeft size={18} strokeWidth={2.5} />
          </div>
          <span className="text-[10px] font-extrabold uppercase tracking-[0.25em]">Calculator</span>
        </Link>

        <div className="text-center absolute left-1/2 -translate-x-1/2">
          <h1 className="text-2xl font-manrope font-extrabold text-[var(--on-surface)] tracking-tight uppercase">
            Customer Profile
          </h1>
          <p className="text-[10px] text-[var(--on-surface-variant)] font-extrabold uppercase tracking-[0.3em] mt-1">
            Quotation <span className="text-[var(--sacred-emerald,#10b981)] font-black">Ready</span>
          </p>
        </div>

        {/* Download button top-right */}
        <button
          onClick={() => window.open(pdfUrl, '_blank')}
          // onClick={handleDownload}
          className="flex cursor-pointer  items-center gap-2.5 px-7 py-4 bg-[var(--surface-container-lowest)] border border-[var(--outline-variant)] rounded-xl text-[10px] font-extrabold uppercase tracking-[0.25em] text-[var(--on-surface)] hover:shadow-lg hover:-translate-y-0.5 transition-all"
        >
          <Eye size={16} strokeWidth={2.5} />
          Preview PDF
        </button>
      </div>

      {/* ── Printable body ───────────────────────────────────────────────── */}
      <div ref={printRef}>

        {/* Hero card — dark banner */}
        <div className="bg-[#0f172a] rounded-2xl p-10 relative overflow-hidden mb-10">
          {/* decorative blobs */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-bl-[8rem] translate-x-20 -translate-y-20 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-emerald-500/5 rounded-tr-[5rem] pointer-events-none" />

          <p className="text-[9px] font-black text-white/25 uppercase tracking-[0.5em] mb-8">
            Pilgrim · Verified Profile
          </p>

          <div className="flex flex-col md:flex-row md:items-center gap-8 relative z-10">

            {/* Avatar */}
            <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-white/10 bg-white/5 flex items-center justify-center shrink-0 shadow-2xl">
              {customer.customer_image ? (
                <img
                  src={BASE_URL + customer.customer_image}
                  alt={fullName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <User size={36} className="text-white/30" />
              )}
            </div>

            {/* Name + contacts */}
            <div className="flex-1">
              <h2 className="text-3xl font-manrope font-extrabold text-white tracking-tight leading-tight">
                {fullName || 'Unnamed Pilgrim'}
              </h2>

              <div className="flex flex-wrap items-center gap-5 mt-4">
                {customer.email && (
                  <span className="flex items-center gap-2 text-[11px] text-white/45 font-medium">
                    <Mail size={13} className="text-white/25" />
                    {customer.email}
                  </span>
                )}
                {customer.phone && (
                  <span className="flex items-center gap-2 text-[11px] text-white/45 font-medium">
                    <Phone size={13} className="text-white/25" />
                    {customer.phone}
                  </span>
                )}
              </div>
            </div>

            {/* Mini stats */}
            <div className="flex items-center shrink-0 mt-4 md:mt-0">
              <StatCard label="Total Days" value={totalDays} />
              <StatCard label="Pilgrims" value={inputs.persons ?? '—'} />
              <StatCard
                label="Total Price"
                value={results.finalPrice ? `$${Number(results.finalPrice).toLocaleString()}` : '—'}
              />
            </div>

          </div>
        </div>

        {/* ── two-column layout ─────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* LEFT — customer info ───────────────────────────────────────── */}
          <div className="lg:col-span-4">
            <div className="bg-[var(--surface-container-lowest)] rounded-2xl border border-[var(--outline-variant)] p-8 shadow-sm h-full">
              <h3 className="text-[10px] font-extrabold text-[var(--on-surface-variant)] uppercase tracking-[0.35em] mb-6 flex items-center gap-2">
                <User size={14} strokeWidth={2.5} />
                Identity
              </h3>

              {/* Large avatar centre */}
              <div className="flex justify-center mb-8">
                <div className="w-28 h-28 rounded-3xl overflow-hidden border border-[var(--outline-variant)] bg-[var(--surface)] flex items-center justify-center shadow-md">
                  {customer.customer_image ? (
                    <img
                      src={BASE_URL + customer.customer_image}
                      alt={fullName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User size={42} className="text-[var(--on-surface-variant)]" strokeWidth={1.5} />
                  )}
                </div>
              </div>

              <div className="space-y-5 text-center mb-8">
                <div>
                  <p className="text-[10px] font-black text-[var(--on-surface-variant)] uppercase tracking-widest mb-1">Full Name</p>
                  <p className="text-lg font-manrope font-extrabold text-[var(--on-surface)]">
                    {fullName || '—'}
                  </p>
                </div>
              </div>

              <div className="bg-[var(--surface)] rounded-xl border border-[var(--outline-variant)] divide-y divide-[var(--outline-variant)]">
                {customer.email && (
                  <div className="flex items-center gap-3 px-5 py-4">
                    <Mail size={14} className="text-[var(--on-surface-variant)] shrink-0" />
                    <div>
                      <p className="text-[9px] font-black text-[var(--on-surface-variant)] uppercase tracking-widest mb-0.5">Email</p>
                      <p className="text-[12px] font-bold text-[var(--on-surface)] break-all">{customer.email}</p>
                    </div>
                  </div>
                )}
                {customer.phone && (
                  <div className="flex items-center gap-3 px-5 py-4">
                    <Phone size={14} className="text-[var(--on-surface-variant)] shrink-0" />
                    <div>
                      <p className="text-[9px] font-black text-[var(--on-surface-variant)] uppercase tracking-widest mb-0.5">Phone</p>
                      <p className="text-[12px] font-bold text-[var(--on-surface)]">{customer.phone}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* status badge */}
              <div className="mt-6 flex justify-center">
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-100 text-emerald-700 rounded-full text-[9px] font-black uppercase tracking-widest">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />
                  Profile Verified
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT — package detail ──────────────────────────────────────── */}
          <div className="lg:col-span-8">
            <div className="bg-[var(--surface-container-lowest)] rounded-2xl border border-[var(--outline-variant)] p-8 shadow-sm">
              <h3 className="text-[10px] font-extrabold text-[var(--on-surface-variant)] uppercase tracking-[0.35em] mb-6 flex items-center gap-2">
                <Package size={14} strokeWidth={2.5} />
                Package Details
              </h3>

              <div className="bg-[var(--surface)] rounded-xl border border-[var(--outline-variant)] px-6">
                <DetailRow
                  icon={Users}
                  label="Pilgrim Quota"
                  value={inputs.persons}
                />
                <DetailRow
                  icon={Hotel}
                  label="Hospitality Grade"
                  value={inputs.hotelCategory}
                />
                <DetailRow
                  icon={MapPin}
                  label="Makkah Residency (Nights)"
                  value={inputs.makkahNights}
                />
                <DetailRow
                  icon={MapPin}
                  label="Madinah Residency (Nights)"
                  value={inputs.madinahNights}
                />
                <DetailRow
                  icon={Calendar}
                  label="Total Days"
                  value={totalDays}
                />
                <DetailRow
                  icon={Plane}
                  label="Aviation Cost (Unit)"
                  value={inputs.flightCost != null ? `$${Number(inputs.flightCost).toLocaleString()}` : '—'}
                />
                <DetailRow
                  icon={ShieldCheck}
                  label="Visa Allotment (Unit)"
                  value={inputs.visaCost != null ? `$${Number(inputs.visaCost).toLocaleString()}` : '—'}
                />
                <DetailRow
                  icon={DollarSign}
                  label="Total Price"
                  value={results.finalPrice ? `$${Number(results.finalPrice).toLocaleString()}` : '—'}
                  accent
                />
              </div>

              {/* dark total strip */}
              <div className="mt-6 bg-[#0f172a] rounded-xl p-6 flex items-center justify-between">
                <div>
                  <p className="text-[9px] font-black text-white/25 uppercase tracking-[0.4em] mb-1">Official Quoted Value</p>
                  <p className="text-3xl font-manrope font-extrabold text-white tracking-tight">
                    {results.finalPrice ? `$${Number(results.finalPrice).toLocaleString()}` : '—'}
                  </p>
                </div>
                {/* <div className="text-right">
                  <p className="text-[9px] font-black text-white/25 uppercase tracking-[0.3em] mb-1">Markup Applied</p>
                  <p className="text-2xl font-manrope font-extrabold text-emerald-400">
                    {inputs.markup ?? 0}%
                  </p>
                </div> */}
              </div>
            </div>
          </div>
        </div>

      </div>{/* end printRef */}

      {/* ── Action buttons ────────────────────────────────────────────────── */}
      {!hideActionButtons && (
        <div className="flex flex-col sm:flex-row gap-4 pt-4 max-w-5xl mx-auto">


          <button
            onClick={handleCancel}
            disabled={savingLoading || isActionClicked}
            className={`flex-1 flex items-center justify-center gap-3 py-5 bg-red-50 border border-red-200 rounded-2xl text-[10px] font-extrabold uppercase tracking-[0.25em] text-red-600 hover:bg-red-100 hover:-translate-y-0.5 transition-all ${savingLoading || isActionClicked ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <XCircle size={18} strokeWidth={2.5} />
            {savingLoading || isActionClicked ? 'Processing...' : 'Cancel'}
          </button>

          <button
            onClick={handleConfirm}
            disabled={savingLoading || isActionClicked}
            className={`flex-1 flex items-center justify-center gap-3 py-5 btn-primary rounded-2xl text-[10px] font-extrabold uppercase tracking-[0.25em] text-white hover:-translate-y-0.5 transition-all shadow-xl shadow-emerald-900/20 ${savingLoading || isActionClicked ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <CheckCircle2 size={18} strokeWidth={2.5} />
            {savingLoading || isActionClicked ? 'Processing...' : 'Confirm'}
          </button>
        </div>
      )}
    </div>
  );
};

export default CustomerProfile;
