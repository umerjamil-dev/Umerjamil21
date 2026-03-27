import React, { useState, useEffect } from 'react';
import {
  Calculator as CalcIcon, DollarSign, Users,
  Hotel, Plane, ShieldCheck, MapPin,
  RefreshCw, Save, ArrowRight, Info, TrendingUp
} from 'lucide-react';

const Calculator = () => {
  const [inputs, setInputs] = useState({
    persons: 1,
    makkahNights: 7,
    madinahNights: 7,
    hotelCategory: '4-star',
    flightCost: 1200,
    visaCost: 150,
    transportCost: 100,
    markup: 15
  });

  const [results, setResults] = useState({
    hotelTotal: 0,
    totalCost: 0,
    profit: 0,
    finalPrice: 0
  });

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

  useEffect(() => {
    calculate();
  }, [inputs]);

  return (
    <div className="space-y-12 animate-in fade-in duration-1000 font-inter">
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-4">
        <div>
          <h1 className="text-[2.5rem] font-manrope font-extrabold text-[var(--on-surface)] tracking-tight">Package <span className="text-[var(--on-surface-variant)]/30 italic font-light">Synthesizer</span></h1>
          <p className="mt-2 text-sm font-medium text-[var(--on-surface-variant)] tracking-wide">Algorithmic precision for sacred travel quotations.</p>
        </div>
        <button
          className="btn-primary flex items-center gap-2 px-8 py-4 text-[10px] font-extrabold uppercase tracking-[0.25em] shadow-xl shadow-black/10 hover:shadow-2xl transition-all rounded-2xl"
        >
          <Save size={18} strokeWidth={2.5} />
          Archive Quotation
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
        {/* Configuration Matrix - 8 Columns */}
        <div className="xl:col-span-8 space-y-10">
          <div className="bg-[var(--surface-container-lowest)]  rounded-xl p-12 border border-[var(--outline-variant)] shadow-sm relative overflow-hidden group">
            <h3 className="text-[10px] font-extrabold text-[var(--on-surface-variant)] uppercase tracking-[0.3em] mb-12 flex items-center gap-3">
              <CalcIcon size={16} strokeWidth={2} /> Operational Variables
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
              {/* Persons */}
              <div className="group">
                <label className="text-[10px] font-extrabold text-[var(--on-surface-variant)] uppercase   mb-3 block">Pilgrim Quota</label>
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
                <label className="text-[10px] font-extrabold text-[var(--on-surface-variant)] uppercase   mb-3 block">Hospitality Grade</label>
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
                <label className="text-[10px] font-extrabold text-[var(--on-surface-variant)] uppercase   mb-3 block">Makkah Residency (Nights)</label>
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
                <label className="text-[10px] font-extrabold text-[var(--on-surface-variant)] uppercase   mb-3 block">Madinah Residency (Nights)</label>
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

              {/* Flight Cost */}
              <div className="group">
                <label className="text-[10px] font-extrabold text-[var(--on-surface-variant)] uppercase   mb-3 block">Aviation Cost (Unit)</label>
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
                <label className="text-[10px] font-extrabold text-[var(--on-surface-variant)] uppercase   mb-3 block">Visa Allotment (Unit)</label>
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
            </div>
          </div>

          {/* Revenue Optimization Map */}
          <div className="bg-[var(--surface-container-lowest)]  rounded-xl p-12 shadow-sm border border-[var(--outline-variant)] group">
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
              <div className="w-28 h-28 rounded-3xl bg-[var(--surface)] border border-[var(--outline-variant)] flex items-center justify-center text-center group-hover:btn-primary group-hover:text-white transition-all shadow-sm">
                <p className="text-3xl font-manrope font-extrabold tracking-tighter">{inputs.markup}%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Monolithic Result Engine - 4 Columns */}
        <div className="xl:col-span-4 space-y-12">
          {/* Synthesized Estimation with Black Gradient */}
          <div className="bg-gradient-to-br from-[#020617] via-[#0f172a] to-black rounded-[2.5rem] p-14 text-white shadow-[0_30px_60px_rgba(0,0,0,0.6)] border border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-bl-[8rem] translate-x-16 -translate-y-16 group-hover:translate-x-8 group-hover:-translate-y-8 transition-all duration-700"></div>

            <h3 className="text-[10px] font-black text-white/30 uppercase tracking-[0.5em] mb-16 relative z-10">Synthesized Estimation</h3>

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

            <button className="w-full mt-12 py-5 bg-white text-[var(--on-surface)]    rounded-xl font-extrabold text-[10px] uppercase tracking-[0.3em] hover:bg-gray-100 transition-all shadow-xl flex items-center justify-center gap-3">
              Generate PDF Protocol <ArrowRight size={18} strokeWidth={2.5} />
            </button>
          </div>

          {/* Granular Allotment Data */}
          <div className="bg-[var(--surface-container-lowest)]  rounded-xl p-10 border border-[var(--outline-variant)] shadow-sm group">
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
            <div className="mt-10 p-5 bg-[var(--surface)] border border-[var(--outline-variant)] rounded-2xl flex items-center justify-center gap-3 text-[10px] font-extrabold text-[var(--on-surface)] uppercase tracking-widest group-hover:btn-primary group-hover:text-white transition-all">
              <RefreshCw size={16} strokeWidth={2.5} className="text-[var(--on-surface-variant)] group-hover:text-white" />
              Algorithmic Sync Active
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
