import React, { useState, useEffect } from 'react';
import {
  Calculator as CalcIcon, DollarSign, Users,
  Hotel, Plane, ShieldCheck, MapPin,
  RefreshCw, Save, ArrowRight, Info, TrendingUp, Package, UserCheck, Mail, Phone
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useCalculatorStore from '../store/useCalculatorStore';
import useMasterTypeStore from '../store/useMasterTypeStore';
import useCustomerStore from '../store/useCustomerStore';
import toast from 'react-hot-toast';

const Calculator = () => {
  const navigate = useNavigate();
  const { packages, fetchPackages, saveCalculation, isLoading: savingLoading } = useCalculatorStore();
  const { customers, fetchCustomers, isLoading: custsLoading } = useCustomerStore();
  const { masterData, fetchMasterData } = useMasterTypeStore();
  const [selectedPkgId, setSelectedPkgId] = useState('');
  const [selectedCustomerId, setSelectedCustomerId] = useState('');
  const selectedCustomer = customers.find((c) => String(c.id) === String(selectedCustomerId)) || null;

  const [inputs, setInputs] = useState({
    persons: 1,
    makkahNights: 7,
    madinahNights: 7,
    makkahHotel: '',
    madinahHotel: '',
    hotelCategory: '4-star',
    flightCost: 1200,
    visaCost: 150,
    transportCost: 100,
    markup: 15,
    packageType: ''
  });

  const [results, setResults] = useState({
    hotelTotal: 0,
    totalCost: 0,
    profit: 0,
    finalPrice: 0
  });

  useEffect(() => {
    fetchPackages();
    fetchCustomers();
    fetchMasterData();
  }, [fetchPackages, fetchCustomers, fetchMasterData]);
  const handlePackageSelect = (pkgId) => {
    setSelectedPkgId(pkgId);
    if (!pkgId) return;
    const pkg = packages.find((p) => String(p.id) === String(pkgId));
    if (!pkg) return;
    setInputs((prev) => ({
      ...prev,
      makkahNights: pkg.nights_makkah || prev.makkahNights,
      madinahNights: pkg.nights_madinah || prev.madinahNights,
      makkahHotel: pkg.makkah_hotel || prev.makkahHotel,
      madinahHotel: pkg.madinah_hotel || prev.madinahHotel,
      flightCost: pkg.base_price ? Number(pkg.base_price) : prev.flightCost,
      packageType: pkg.package_type || prev.packageType
    }));
  };

  const calculate = () => {
    const hotelRate = inputs.hotelCategory === '5-star' ? 150 : inputs.hotelCategory === '4-star' ? 100 : 60;
    const hotelTotal = (inputs.makkahNights + inputs.madinahNights) * hotelRate * inputs.persons;
    const baseCost = hotelTotal + (inputs.flightCost + inputs.visaCost + inputs.transportCost) * inputs.persons;
    const profit = (baseCost * inputs.markup) / 100;

    setResults({
      hotelTotal,
      totalCost: baseCost,
      profit,
      finalPrice: baseCost + profit
    });
  };

  const handleSave = async () => {
    try {
      const payload = {
        customer_id: selectedCustomerId,
        persons: inputs.persons,
        makkah_nights: inputs.makkahNights,
        madinah_nights: inputs.madinahNights,
        makkah_hotel: inputs.makkahHotel,
        madinah_hotel: inputs.madinahHotel,
        hotel_category: inputs.hotelCategory,
        flight_cost: inputs.flightCost,
        visa_cost: inputs.visaCost,
        transport_cost: inputs.transportCost,
        markup: inputs.markup,
        package_type: inputs.packageType,
        hotel_total: results.hotelTotal,
        total_cost: results.totalCost,
        profit: results.profit,
        final_price: results.finalPrice
      };

      const response = await saveCalculation(payload);
      toast.success('Quotation archived successfully!');
      return response;
    } catch (err) {
      toast.error('Failed to archive: ' + err.message);
      return null;
    }
  };

  useEffect(() => {
    calculate();
  }, [inputs]);
  const baseUrl = "http://localhost:8000/"

  return (
    <>
      <div className="space-y-12 animate-in fade-in duration-1000 font-inter">
        {/* Editorial Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-4">
          <div>
            <h1 className="text-[2.5rem] font-manrope font-extrabold text-[var(--on-surface)] tracking-tight">Packages Calculator</h1>
            <p className="mt-2 text-sm font-medium text-[var(--on-surface-variant)] tracking-wide">Algorithmic precision for sacred travel quotations.</p>
          </div>
          <button
            onClick={handleSave}
            disabled={savingLoading}
            className={`btn-primary flex items-center gap-2 px-8 py-4 text-[10px] font-extrabold uppercase tracking-[0.25em] shadow-xl shadow-black/10 hover:shadow-2xl transition-all rounded-xl ${savingLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <Save size={18} strokeWidth={2.5} />
            {savingLoading ? 'Archiving...' : 'Archive Quotation'}
          </button>
        </div>

        {/* Selector Bar — Package + Customer */}
        <div className="bg-[var(--surface-container-lowest)] rounded-xl border border-[var(--outline-variant)] shadow-sm divide-y divide-[var(--outline-variant)]">


          {/* Customer Row */}
          <div className="p-8">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="flex items-center gap-3 shrink-0">
                <div className="w-10 h-10 rounded-xl bg-[var(--surface)] border border-[var(--outline-variant)] flex items-center justify-center">
                  <UserCheck size={18} className="text-[var(--on-surface-variant)]" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-[9px] font-black text-[var(--on-surface-variant)] uppercase tracking-[0.3em]">Assign Customer</p>
                  <p className="text-[11px] font-bold text-[var(--on-surface)] opacity-60">Link quotation to a registered pilgrim</p>
                </div>
              </div>
              <div className="flex-1 relative border-b-2 border-[var(--outline-variant)] focus-within:border-[var(--on-surface)] transition-all pb-2">
                <select
                  className="w-full bg-transparent text-sm font-manrope font-extrabold text-[var(--on-surface)] outline-none appearance-none cursor-pointer pr-4"
                  value={selectedCustomerId}
                  onChange={(e) => setSelectedCustomerId(e.target.value)}
                  disabled={custsLoading}
                >
                  <option value="">{custsLoading ? 'Loading customers...' : '— Select a customer —'}</option>
                  {customers.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.firstName || c.lastName}
                    </option>
                  ))}
                </select>
              </div>
              {selectedCustomerId && (
                <button
                  onClick={() => setSelectedCustomerId('')}
                  className="shrink-0 px-5 py-2.5 border border-[var(--outline-variant)] rounded-xl text-[9px] font-black uppercase tracking-widest text-[var(--on-surface-variant)] hover:bg-white transition-all"
                >
                  Clear
                </button>
              )}
            </div>
            {/* Selected customer badge */}
            {selectedCustomer && (
              <div className="mt-5 p-4 bg-[var(--surface)] rounded-xl border border-[var(--outline-variant)]">

                <table className="w-full text-left">
                  <tbody>

                    <tr className="border-b border-[var(--outline-variant)]">

                      {/* Image */}
                      <td className="py-2">
                        <div className="w-10 h-10 rounded-full overflow-hidden border border-[var(--outline-variant)] flex items-center justify-center">
                          {selectedCustomer?.customer_image ? (
                            <img
                              src={baseUrl + selectedCustomer.customer_image}
                              alt="customer"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <UserCheck size={16} className="text-[var(--on-surface-variant)]" />
                          )}
                        </div>
                      </td>

                      {/* Name */}
                      <td className="py-2 font-bold">
                        {selectedCustomer
                          ? `${selectedCustomer.firstName || ''} ${selectedCustomer.lastName || ''}`
                          : 'No Name'}
                      </td>

                      {/* Contact (Phone + Email) */}
                      <td className="py-2 text-xs space-y-1">

                        {/* Phone */}
                        <div className="flex items-center gap-2">
                          <Phone size={12} className="text-green-600" />
                          <span>
                            {selectedCustomer?.phone || 'No Phone'}
                          </span>
                        </div>

                        {/* Email */}
                        <div className="flex items-center gap-2">
                          <Mail size={12} className="text-blue-600" />
                          <span className="truncate">
                            {selectedCustomer?.email || 'No Email'}
                          </span>
                        </div>

                      </td>

                      {/* Status */}
                      <td className="py-2">
                        <span className="text-[10px] font-black uppercase px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full">
                          Linked
                        </span>
                      </td>

                    </tr>

                  </tbody>
                </table>

              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
          {/* Configuration Matrix - 8 Columns */}
          <div className="xl:col-span-8 space-y-10">
            <div className="bg-[var(--surface-container-lowest)] rounded-xl p-12 border border-[var(--outline-variant)] shadow-sm relative overflow-hidden group">
              <h3 className="text-[10px] font-extrabold text-[var(--on-surface-variant)] uppercase tracking-[0.3em] mb-12 flex items-center gap-3">
                <CalcIcon size={16} strokeWidth={2} /> Operational Variables
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
                {/* Persons */}
                <div className="group">
                  <label className="text-[10px] font-extrabold text-[var(--on-surface-variant)] uppercase mb-3 block">Pilgrim Quota</label>
                  <div className="relative border-b border-[var(--outline-variant)] group-focus-within:border-[var(--on-surface)] transition-all pb-3">
                    <Users className="absolute left-0 top-1/2 -translate-y-1/2 text-[var(--on-surface-variant)] group-focus-within:text-[var(--on-surface)] transition-colors" size={20} />
                    <input
                      type="number"
                      className="w-full bg-transparent pl-9 pr-4 text-sm font-manrope font-extrabold text-[var(--on-surface)] outline-none placeholder-[var(--on-surface-variant)]"
                      value={inputs.persons}
                      onChange={(e) => setInputs({ ...inputs, persons: parseInt(e.target.value) || 0 })}
                    />
                  </div>
                </div>

                {/* Hotel Category */}
                <div className="group">
                  <label className="text-[10px] font-extrabold text-[var(--on-surface-variant)] uppercase mb-3 block">Hospitality Grade</label>
                  <div className="relative border-b border-[var(--outline-variant)] group-focus-within:border-[var(--on-surface)] transition-all pb-3">
                    <Hotel className="absolute left-0 top-1/2 -translate-y-1/2 text-[var(--on-surface-variant)] group-focus-within:text-[var(--on-surface)] transition-colors" size={20} />
                    <select
                      className="w-full bg-transparent pl-9 pr-4 text-sm font-manrope font-extrabold text-[var(--on-surface)] outline-none appearance-none cursor-pointer"
                      value={inputs.hotelCategory}
                      onChange={(e) => setInputs({ ...inputs, hotelCategory: e.target.value })}
                    >
                      <option value="5-star">5 Star Platinum</option>
                      <option value="4-star">4 Star Premium</option>
                      <option value="3-star">3 Star Standard</option>
                    </select>
                  </div>
                </div>

                {/* Makkah Nights */}
                <div className="group">
                  <label className="text-[10px] font-extrabold text-[var(--on-surface-variant)] uppercase mb-3 block">Makkah Residency (Nights)</label>
                  <div className="relative border-b border-[var(--outline-variant)] group-focus-within:border-[var(--on-surface)] transition-all pb-3">
                    <MapPin className="absolute left-0 top-1/2 -translate-y-1/2 text-[var(--on-surface-variant)] group-focus-within:text-[var(--on-surface)] transition-colors" size={20} />
                    <input
                      type="number"
                      className="w-full bg-transparent pl-9 pr-4 text-sm font-manrope font-extrabold text-[var(--on-surface)] outline-none placeholder-[var(--on-surface-variant)]"
                      value={inputs.makkahNights}
                      onChange={(e) => setInputs({ ...inputs, makkahNights: parseInt(e.target.value) || 0 })}
                    />
                  </div>
                </div>

                {/* Madinah Nights */}
                <div className="group">
                  <label className="text-[10px] font-extrabold text-[var(--on-surface-variant)] uppercase mb-3 block">Madinah Residency (Nights)</label>
                  <div className="relative border-b border-[var(--outline-variant)] group-focus-within:border-[var(--on-surface)] transition-all pb-3">
                    <MapPin className="absolute left-0 top-1/2 -translate-y-1/2 text-[var(--on-surface-variant)] group-focus-within:text-[var(--on-surface)] transition-colors" size={20} />
                    <input
                      type="number"
                      className="w-full bg-transparent pl-9 pr-4 text-sm font-manrope font-extrabold text-[var(--on-surface)] outline-none placeholder-[var(--on-surface-variant)]"
                      value={inputs.madinahNights}
                      onChange={(e) => setInputs({ ...inputs, madinahNights: parseInt(e.target.value) || 0 })}
                    />
                  </div>
                </div>

                {/* Makkah Hotel */}
                <div className="group">
                  <label className="text-[10px] font-extrabold text-[var(--on-surface-variant)] uppercase mb-3 block">Makkah Residency (Hotel)</label>
                  <div className="relative border-b border-[var(--outline-variant)] group-focus-within:border-[var(--on-surface)] transition-all pb-3">
                    <Hotel className="absolute left-0 top-1/2 -translate-y-1/2 text-[var(--on-surface-variant)] group-focus-within:text-[var(--on-surface)] transition-colors" size={20} />
                    <input
                      type="text"
                      placeholder="E.g., Fairmont Makkah"
                      className="w-full bg-transparent pl-9 pr-4 text-sm font-manrope font-extrabold text-[var(--on-surface)] outline-none placeholder-[var(--on-surface-variant)]"
                      value={inputs.makkahHotel}
                      onChange={(e) => setInputs({ ...inputs, makkahHotel: e.target.value })}
                    />
                  </div>
                </div>

                {/* Madinah Hotel */}
                <div className="group">
                  <label className="text-[10px] font-extrabold text-[var(--on-surface-variant)] uppercase mb-3 block">Madinah Residency (Hotel)</label>
                  <div className="relative border-b border-[var(--outline-variant)] group-focus-within:border-[var(--on-surface)] transition-all pb-3">
                    <Hotel className="absolute left-0 top-1/2 -translate-y-1/2 text-[var(--on-surface-variant)] group-focus-within:text-[var(--on-surface)] transition-colors" size={20} />
                    <input
                      type="text"
                      placeholder="E.g., Pullman Zamzam"
                      className="w-full bg-transparent pl-9 pr-4 text-sm font-manrope font-extrabold text-[var(--on-surface)] outline-none placeholder-[var(--on-surface-variant)]"
                      value={inputs.madinahHotel}
                      onChange={(e) => setInputs({ ...inputs, madinahHotel: e.target.value })}
                    />
                  </div>
                </div>

                {/* Flight Cost */}
                <div className="group">
                  <label className="text-[10px] font-extrabold text-[var(--on-surface-variant)] uppercase mb-3 block">Aviation Cost (Unit)</label>
                  <div className="relative border-b border-[var(--outline-variant)] group-focus-within:border-[var(--on-surface)] transition-all pb-3">
                    <Plane className="absolute left-0 top-1/2 -translate-y-1/2 text-[var(--on-surface-variant)] group-focus-within:text-[var(--on-surface)] transition-colors" size={20} />
                    <input
                      type="number"
                      className="w-full bg-transparent pl-9 pr-4 text-sm font-manrope font-extrabold text-[var(--on-surface)] outline-none placeholder-[var(--on-surface-variant)]"
                      value={inputs.flightCost}
                      onChange={(e) => setInputs({ ...inputs, flightCost: parseInt(e.target.value) || 0 })}
                    />
                  </div>
                </div>

                {/* Visa Cost */}
                <div className="group">
                  <label className="text-[10px] font-extrabold text-[var(--on-surface-variant)] uppercase mb-3 block">Visa Allotment (Unit)</label>
                  <div className="relative border-b border-[var(--outline-variant)] group-focus-within:border-[var(--on-surface)] transition-all pb-3">
                    <ShieldCheck className="absolute left-0 top-1/2 -translate-y-1/2 text-[var(--on-surface-variant)] group-focus-within:text-[var(--on-surface)] transition-colors" size={20} />
                    <input
                      type="number"
                      className="w-full bg-transparent pl-9 pr-4 text-sm font-manrope font-extrabold text-[var(--on-surface)] outline-none placeholder-[var(--on-surface-variant)]"
                      value={inputs.visaCost}
                      onChange={(e) => setInputs({ ...inputs, visaCost: parseInt(e.target.value) || 0 })}
                    />
                  </div>
                </div>

                {/* Package Type */}
                <div className="group">
                  <label className="text-[10px] font-extrabold text-[var(--on-surface-variant)] uppercase mb-3 block">Package Class</label>
                  <div className="relative border-b border-[var(--outline-variant)] group-focus-within:border-[var(--on-surface)] transition-all pb-3">
                    <Package className="absolute left-0 top-1/2 -translate-y-1/2 text-[var(--on-surface-variant)] group-focus-within:text-[var(--on-surface)] transition-colors" size={20} />
                    <select
                      className="w-full bg-transparent pl-9 pr-4 text-sm font-manrope font-extrabold text-[var(--on-surface)] outline-none appearance-none cursor-pointer"
                      value={inputs.packageType}
                      onChange={(e) => setInputs({ ...inputs, packageType: e.target.value })}
                    >
                      <option value="">— Select Package Type —</option>
                      {(masterData.package_type || []).map((type) => (
                        <option key={type.id || type} value={type.id || type}>
                          {type.name || type}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Revenue Optimization Map */}
            <div className="bg-[var(--surface-container-lowest)] rounded-xl p-12 shadow-sm border border-[var(--outline-variant)]">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
                <h3 className="text-[10px] font-extrabold text-[var(--on-surface-variant)] uppercase tracking-[0.3em]">Revenue Yield Strategy</h3>
                <div className="px-4 py-2 bg-[var(--tertiary)]/5 text-[var(--tertiary)] text-[9px] font-extrabold uppercase tracking-widest rounded-full border border-[var(--tertiary)]/10">
                  Real-time Yield Analysis
                </div>
              </div>
              <div className="flex flex-col md:flex-row items-center gap-10">
                <div className="flex-1 w-full">
                  <input
                    type="range"
                    min="5"
                    max="50"
                    className="w-full h-2 bg-[var(--surface-container-low)] rounded-full appearance-none cursor-pointer accent-[var(--primary)]"
                    value={inputs.markup}
                    onChange={(e) => setInputs({ ...inputs, markup: parseInt(e.target.value) })}
                  />
                  <div className="flex justify-between mt-4 text-[9px] font-extrabold text-[var(--on-surface-variant)] uppercase tracking-widest">
                    <span>5% Minimum</span>
                    <span className="text-[var(--on-surface)] font-bold">{inputs.markup}% Yield Selected</span>
                    <span>50% Premium</span>
                  </div>
                </div>
                <div className="w-28 h-28 rounded-xl bg-[var(--surface)] border border-[var(--outline-variant)] flex items-center justify-center text-center transition-all shadow-sm">
                  <p className="text-3xl font-manrope font-extrabold tracking-tighter">{inputs.markup}%</p>
                </div>
              </div>
            </div>
          </div>

          {/* Monolithic Result Engine - 4 Columns */}
          <div className="xl:col-span-4 space-y-12">
            {/* Synthesized Estimation */}
            <div className="bg-gradient-to-br from-[#020617] via-[#0f172a] to-black rounded-[2.5rem] p-14 text-white shadow-[0_30px_60px_rgba(0,0,0,0.6)] border border-white/5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-bl-[8rem] translate-x-16 -translate-y-16 group-hover:translate-x-8 group-hover:-translate-y-8 transition-all duration-700"></div>

              <h3 className="text-[10px] font-black text-white/30 uppercase tracking-[0.5em] mb-16 relative z-10">Synthesized Estimation</h3>

              {selectedPkgId && (
                <p className="text-[9px] font-black text-[var(--desert-gold,#f59e0b)] uppercase tracking-widest mb-6 relative z-10 opacity-70">
                  ↑ Loaded from package
                </p>
              )}
              {selectedCustomer && (
                <div className="mb-6 relative z-10 flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
                  <UserCheck size={14} className="text-white/40 shrink-0" />
                  <div className="min-w-0">
                    <p className="text-[9px] font-black text-white/30 uppercase tracking-widest mb-0.5">Customer</p>
                    <p className="text-xs font-manrope font-extrabold text-white/70 truncate">{selectedCustomer.name || selectedCustomer.full_name}</p>
                  </div>
                </div>
              )}

              <div className="space-y-8 relative z-10">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-400">Net Operational Cost</span>
                  <span className="text-xl font-manrope font-extrabold tracking-tight">${results.totalCost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-400">Projected Yield</span>
                  <span className="text-xl font-manrope font-extrabold text-blue-400 tracking-tight">+ ${results.profit.toLocaleString()}</span>
                </div>
                <div className="pt-10 mt-2 border-t border-white/10 text-center">
                  <p className="text-[10px] text-gray-500 font-extrabold uppercase tracking-[0.25em] mb-4">Official Quoted Value</p>
                  <p className="text-6xl font-manrope font-extrabold tracking-tighter shadow-sm text-white">
                    ${results.finalPrice.toLocaleString()}
                  </p>
                </div>
              </div>

              <button
                onClick={async () => {
                  const res = await handleSave();
                  const newId = res?.data?.id || res?.id;
                  if (newId) {
                    navigate(`/customer-profile/${newId}`, {
                      state: { customer: selectedCustomer, inputs, results }
                    });
                  } else {
                    console.error('No ID found in save response');
                  }
                }}
                disabled={savingLoading}
                className={`w-full mt-12 py-5 bg-white text-[var(--on-surface)] rounded-xl font-extrabold text-[10px] uppercase tracking-[0.3em] hover:bg-gray-100 transition-all shadow-xl flex items-center justify-center gap-3 ${savingLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {savingLoading ? 'Archiving...' : 'Save & View Profile'} <ArrowRight size={18} strokeWidth={2.5} />
              </button>
            </div>

            {/* Granular Allotment Data */}
            <div className="bg-[var(--surface-container-lowest)] rounded-xl p-10 border border-[var(--outline-variant)] shadow-sm group">
              <h3 className="text-[10px] font-extrabold text-[var(--on-surface-variant)] uppercase tracking-[0.3em] mb-8 flex items-center gap-3">
                <Info size={16} strokeWidth={2} /> Expenditure Allotment
              </h3>
              <div className="space-y-6">
                <div className="flex justify-between items-center text-xs font-bold text-[var(--on-surface-variant)]">
                  <span className="uppercase tracking-widest text-[9px] text-[var(--on-surface-variant)]">Hospitality Aggregate</span>
                  <span className="text-[var(--on-surface)] font-manrope">${results.hotelTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-xs font-bold text-[var(--on-surface-variant)]">
                  <span className="uppercase tracking-widest text-[9px] text-[var(--on-surface-variant)]">Administrative Fees</span>
                  <span className="text-[var(--on-surface)] font-manrope">${(inputs.visaCost * inputs.persons).toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-xs font-bold text-[var(--on-surface-variant)]">
                  <span className="uppercase tracking-widest text-[9px] text-[var(--on-surface-variant)]">Transit Logistics</span>
                  <span className="text-[var(--on-surface)] font-manrope">${(inputs.transportCost * inputs.persons).toLocaleString()}</span>
                </div>
              </div>
              <div className="mt-10 p-5 bg-[var(--surface)] border border-[var(--outline-variant)] rounded-xl flex items-center justify-center gap-3 text-[10px] font-extrabold text-[var(--on-surface)] uppercase tracking-widest transition-all">
                <RefreshCw size={16} strokeWidth={2.5} className="text-[var(--on-surface-variant)]" />
                Algorithmic Sync Active
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Calculator;
