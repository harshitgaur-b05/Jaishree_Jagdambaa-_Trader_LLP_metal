'use client';

import React, { useState } from 'react';

const WA_NUMBER = process.env.NEXT_PUBLIC_WA_NUMBER || '919999999999';

const CABLE_TYPES = [
  'Single Core Flexible Cables',
  'Multicore Flexible Cables',
  'Single Core XLPE Unarmoured/Armoured Cables',
  'Solar Cables',
  'BMS Cables',
  'Braided Cables',
  'Steel Braided Cables',
  'Welding Cables',
  'Festoon Cables',
  'Uninyvin Cable',
  'Aluminium Armoured / Unarmoured Cables',
  'Copper Armoured / Unarmoured Cables',
  'HT Cables 1.9 KV / 3.3 KV Cables for Solar',
  'Instrumentation Cables',
  'Rubber Cables',
  'JFTC Unarmoured/Armoured Cables & Telephone Dry Armoured Cables',
  'RS 485 Cables',
  'Fire Survival Cables',
  'FS Aluminium Cables',
];

const INPUT_CLASS =
  'w-full px-4 py-3 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-[#007f5f] focus:border-[#007f5f] outline-none transition-all dark:text-white text-slate-900 placeholder:text-slate-400';

const LABEL_CLASS = 'block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5';

export default function CablesEnquiryForm({ compact = false }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    state: '',
    city: '',
    pincode: '',
    cableType: '',
    quantity: '',
    description: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const message = `*NEW CABLE ENQUIRY*
----------------------------
*Name:* ${formData.name}
*Phone:* ${formData.phone}
*Email:* ${formData.email || 'N/A'}

*Cable Requirements:*
*Cable Type:* ${formData.cableType}
*Quantity:* ${formData.quantity}

*Description / Exact Specifications:*
${formData.description || 'N/A'}

*Delivery Location:*
*State:* ${formData.state}
*City:* ${formData.city}
*Pincode:* ${formData.pincode}
----------------------------
Sent from: Industrial Solutions Portal`;

    const waUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');

    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-white dark:bg-[#1e1e1e] p-8 rounded-2xl border border-slate-200 dark:border-white/10 text-center shadow-xl max-w-2xl mx-auto">
        <div className="text-5xl mb-4">✅</div>
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Enquiry Sent!</h3>
        <p className="text-slate-600 dark:text-slate-400 mb-6">
          WhatsApp has been opened with your cable enquiry. Our team will respond shortly.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="px-6 py-2 bg-[#007f5f] hover:bg-[#005f47] text-white rounded-full font-semibold transition-colors"
        >
          Submit Another Enquiry
        </button>
      </div>
    );
  }

  return (
    <div className={`bg-white dark:bg-[#1e1e1e] ${compact ? 'p-6' : 'p-6 md:p-10'} rounded-2xl border border-slate-200 dark:border-white/10 shadow-xl max-w-3xl mx-auto`}>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">🔋</span>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Cable Enquiry</h2>
        </div>
        <p className="text-slate-600 dark:text-slate-400 text-sm">
          Select your cable type, specify the quantity, and describe your exact requirements — we&apos;ll get back to you on WhatsApp.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Cable Specs Section */}
        <div className="grid grid-cols-1 gap-6 p-5 bg-blue-50 dark:bg-blue-900/10 rounded-2xl border border-blue-200 dark:border-blue-800/30">
          <h3 className="text-sm font-bold text-blue-800 dark:text-blue-300 uppercase tracking-wider flex items-center gap-2">
            <span>⚡</span> Cable Specifications
          </h3>

          {/* Cable Type */}
          <div>
            <label className={LABEL_CLASS}>
              Cable Type <span className="text-red-500">*</span>
            </label>
            <select
              required
              name="cableType"
              value={formData.cableType}
              onChange={handleChange}
              className={INPUT_CLASS}
            >
              <option value="" disabled className="dark:bg-[#1e1e1e]">Select cable type…</option>
              {CABLE_TYPES.map((type) => (
                <option key={type} value={type} className="dark:bg-[#1e1e1e]">{type}</option>
              ))}
            </select>
          </div>

          {/* Quantity */}
          <div>
            <label className={LABEL_CLASS}>
              Quantity (metres / coils) <span className="text-red-500">*</span>
            </label>
            <input
              required
              type="text"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              placeholder="e.g. 500 m, 10 coils, 2 drums…"
              className={INPUT_CLASS}
            />
          </div>

          {/* Description */}
          <div>
            <label className={LABEL_CLASS}>
              Describe Exact Requirements
            </label>
            <textarea
              name="description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
              placeholder="Please describe the exact cable details — e.g. number of cores, conductor size (sq mm), voltage rating, armoured or unarmoured, insulation type (XLPE/PVC), brand preference, application (solar, panel wiring, underground, etc.), delivery timeline…"
              className={INPUT_CLASS + ' resize-none'}
            />
            <p className="mt-2 text-xs text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/30 rounded-lg px-3 py-2">
              💡 <strong>Tip:</strong> The more details you provide (cores, sq mm, voltage rating, armoured/unarmoured, brand, application), the faster we can give you an accurate quote.
            </p>
          </div>
        </div>

        {/* Contact Details */}
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4 uppercase tracking-wider flex items-center gap-2">
            <span>👤</span> Contact Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={LABEL_CLASS}>Full Name <span className="text-red-500">*</span></label>
              <input
                required
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className={INPUT_CLASS}
              />
            </div>
            <div>
              <label className={LABEL_CLASS}>Phone / WhatsApp <span className="text-red-500">*</span></label>
              <input
                required
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 XXXXX XXXXX"
                className={INPUT_CLASS}
              />
            </div>
            <div>
              <label className={LABEL_CLASS}>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@mail.com"
                className={INPUT_CLASS}
              />
            </div>
          </div>
        </div>

        {/* Delivery Location */}
        <div className="pt-4 border-t border-slate-100 dark:border-white/5">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4 uppercase tracking-wider flex items-center gap-2">
            <span>📍</span> Delivery Location
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="text-xs font-semibold text-slate-500 uppercase block mb-1.5">State <span className="text-red-500">*</span></label>
              <input
                required
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="State"
                className={INPUT_CLASS}
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-500 uppercase block mb-1.5">City <span className="text-red-500">*</span></label>
              <input
                required
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="City"
                className={INPUT_CLASS}
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-500 uppercase block mb-1.5">Pincode <span className="text-red-500">*</span></label>
              <input
                required
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                placeholder="Pincode"
                className={INPUT_CLASS}
              />
            </div>
          </div>
        </div>

        <button
          disabled={isSubmitting}
          type="submit"
          className="w-full py-4 bg-[#25D366] hover:bg-[#20b858] text-white font-bold rounded-xl transition-all shadow-lg shadow-green-900/20 disabled:opacity-50 flex items-center justify-center gap-2 text-base"
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Sending…
            </>
          ) : (
            <>💬 Send Cable Enquiry via WhatsApp</>
          )}
        </button>
        <p className="text-xs text-slate-400 text-center">
          Clicking send opens WhatsApp with your enquiry pre-filled. No data is stored on our servers.
        </p>
      </form>
    </div>
  );
}
