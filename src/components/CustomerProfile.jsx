import React, { useRef } from 'react';
import {
  X, Download, CheckCircle2, XCircle,
  User, Mail, Phone, Users, Hotel,
  MapPin, Plane, ShieldCheck, DollarSign,
  Calendar, Package
} from 'lucide-react';

const BASE_URL = 'https://hajjumrahbackend.processiqtech.com/';

const Row = ({ icon: Icon, label, value, accent }) => (
  <div className="flex items-center justify-between py-4 border-b border-[var(--outline-variant)] last:border-0">
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-lg bg-[var(--surface)] border border-[var(--outline-variant)] flex items-center justify-center shrink-0">
        <Icon size={14} className="text-[var(--on-surface-variant)]" strokeWidth={2} />
      </div>
      <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-[var(--on-surface-variant)]">
        {label}
      </span>
    </div>
    <span className={`text-sm font-manrope font-medium ${accent ? 'text-[var(--sacred-emerald,#10b981)]' : 'text-[var(--on-surface)]'}`}>
      {value ?? '—'}
    </span>
  </div>
);

const CustomerProfile = ({ open, onClose, onConfirm, customer, inputs, results }) => {
  const printRef = useRef(null);

  if (!open) return null;

  const totalDays = (inputs?.makkahNights ?? 0) + (inputs?.madinahNights ?? 0);

  // PDF download via browser print (print-to-PDF)
  const handleDownload = () => {
    const printContent = printRef.current?.innerHTML;
    if (!printContent) return;

    const win = window.open('', '_blank');
    win.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Customer Profile - ${customer?.firstName ?? ''} ${customer?.lastName ?? ''}</title>
          <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;700;800;900&family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet"/>
          <style>
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body { font-family: 'Inter', sans-serif; background: #fff; color: #111; padding: 40px; }
            .print-root { max-width: 700px; margin: 0 auto; }
          </style>
        </head>
        <body>
          <div class="print-root">${printContent}</div>
          <script>window.onload = () => { window.print(); window.close(); }<\/script>
        </body>
      </html>
    `);
    win.document.close();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(6px)' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="relative bg-[var(--surface-container-lowest)] rounded-2xl border border-[var(--outline-variant)] shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-in fade-in slide-in-from-bottom-4 duration-300"
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-10 w-9 h-9 rounded-xl bg-[var(--surface)] border border-[var(--outline-variant)] flex items-center justify-center hover:bg-red-50 hover:border-red-200 hover:text-red-500 transition-all"
        >
          <X size={16} strokeWidth={2.5} />
        </button>

        {/* Printable Content */}
        <div ref={printRef} className="p-10">
          {/* Header banner */}
          <div className="bg-[#0f172a] rounded-xl p-8 mb-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-bl-[5rem]" />
            <p className="text-[9px] font-medium text-white/30 uppercase tracking-[0.4em] mb-5">
              Customer Profile
            </p>

            {/* Customer identity */}
            <div className="flex items-center gap-6 relative z-10">
              <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-white/10 bg-white/5 flex items-center justify-center shrink-0">
                {customer?.customer_image ? (
                  <img
                    src={BASE_URL + customer.customer_image}
                    alt="profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User size={28} className="text-white/40" />
                )}
              </div>
              <div>
                <h2 className="text-2xl font-manrope font-medium text-white tracking-tight leading-tight">
                  {customer?.firstName ?? ''} {customer?.lastName ?? ''}
                </h2>
                <div className="flex flex-wrap items-center gap-4 mt-2">
                  {customer?.email && (
                    <span className="flex items-center gap-1.5 text-[11px] text-white/50 font-medium">
                      <Mail size={12} className="text-white/30" />
                      {customer.email}
                    </span>
                  )}
                  {customer?.phone && (
                    <span className="flex items-center gap-1.5 text-[11px] text-white/50 font-medium">
                      <Phone size={12} className="text-white/30" />
                      {customer.phone}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Package Details */}
          <div>
            <h3 className="text-[10px] font-medium text-[var(--on-surface-variant)] uppercase tracking-[0.35em] mb-5 flex items-center gap-2">
              <Package size={14} strokeWidth={2.5} />
              Package Details
            </h3>

            <div className="bg-[var(--surface)] rounded-xl border border-[var(--outline-variant)] px-6">
              <Row icon={Users} label="Pilgrim Quota" value={inputs?.persons} />
              <Row icon={Hotel} label="Hospitality Grade" value={inputs?.hotelCategory} />
              <Row icon={MapPin} label="Makkah Residency (Nights)" value={inputs?.makkahNights} />
              <Row icon={MapPin} label="Madinah Residency (Nights)" value={inputs?.madinahNights} />
              <Row icon={Calendar} label="Total Days" value={totalDays} />
              <Row icon={Plane} label="Aviation Cost (Unit)" value={inputs?.flightCost ? `$${Number(inputs.flightCost).toLocaleString()}` : '—'} />
              <Row icon={ShieldCheck} label="Visa Allotment (Unit)" value={inputs?.visaCost ? `$${Number(inputs.visaCost).toLocaleString()}` : '—'} />
              <Row
                icon={DollarSign}
                label="Total Price"
                value={results?.finalPrice ? `$${Number(results.finalPrice).toLocaleString()}` : '—'}
                accent
              />
            </div>
          </div>
        </div>

        {/* Action footer  */}
        <div className="px-10 pb-10 flex flex-col sm:flex-row gap-4">
          {/* Download PDF */}
          <button
            onClick={handleDownload}
            className="flex-1 flex items-center justify-center gap-2.5 py-4 bg-[var(--surface)] border border-[var(--outline-variant)] rounded-xl text-[10px] font-medium uppercase tracking-[0.25em] text-[var(--on-surface)] hover:shadow-md hover:-translate-y-0.5 transition-all"
          >
            <Download size={16} strokeWidth={2.5} />
            Download PDF
          </button>

          {/* Cancel */}
          <button
            onClick={onClose}
            className="flex-1 flex items-center justify-center gap-2.5 py-4 bg-red-50 border border-red-200 rounded-xl text-[10px] font-medium uppercase tracking-[0.25em] text-red-600 hover:bg-red-100 hover:-translate-y-0.5 transition-all"
          >
            <XCircle size={16} strokeWidth={2.5} />
            Cancel
          </button>

          {/* Confirm */}
          <button
            onClick={onConfirm}
            className="flex-1 flex items-center justify-center gap-2.5 py-4 btn-primary rounded-xl text-[10px] font-medium uppercase tracking-[0.25em] text-white hover:-translate-y-0.5 transition-all shadow-xl shadow-emerald-900/20"
          >
            <CheckCircle2 size={16} strokeWidth={2.5} />
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerProfile;
