'use client';

import React, { useState } from 'react';

const WA_NUMBER = process.env.NEXT_PUBLIC_WA_NUMBER || '919999999999';

const WIRE_TYPES = ['Project Wires', 'Aluminium Service Wires', 'Others'];
const THICKNESS_OPTIONS = ['0.75 mm', '1 mm', '1.5 mm', '2.5 mm', '4 mm', '6 mm'];
const ROLL_OPTIONS = ['100 m', '200 m', '300 m'];

const INPUT_CLASS =
  'w-full px-4 py-3 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-[#007f5f] focus:border-[#007f5f] outline-none transition-all dark:text-white text-slate-900 placeholder:text-slate-400';

const LABEL_CLASS = 'block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5';

export default function WiresEnquiryForm({ compact = false }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    state: '',
    city: '',
    pincode: '',
    wireType: '',
    thickness: '',
    rollLength: '',
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

    const message = `*NEW WIRE ENQUIRY*
----------------------------
*Name:* ${formData.name}
*Phone:* ${formData.phone}
*Email:* ${formData.email || 'N/A'}

*Wire Specifications:*
*Wire Type:* ${formData.wireType}
*Thickness:* ${formData.thickness}
*Roll Length:* ${formData.rollLength}

*Description / Additional Details:*
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
          WhatsApp has been opened with your wire enquiry. Our team will get back to you shortly.
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
          <span className="text-3xl">🔌</span>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Wire Enquiry</h2>
        </div>
        <p className="text-slate-600 dark:text-slate-400 text-sm">
          Fill in your wire requirements below — our team will respond via WhatsApp instantly.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Wire Specs Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-5 bg-amber-50 dark:bg-amber-900/10 rounded-2xl border border-amber-200 dark:border-amber-800/30">
          <h3 className="md:col-span-2 text-sm font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wider flex items-center gap-2">
            <span>⚡</span> Wire Specifications
          </h3>

          {/* Wire Type */}
          <div className="md:col-span-2">
            <label className={LABEL_CLASS}>
              Wire Type <span className="text-red-500">*</span>
            </label>
            <select
              required
              name="wireType"
              value={formData.wireType}
              onChange={handleChange}
              className={INPUT_CLASS}
            >
              <option value="" disabled className="dark:bg-[#1e1e1e]">Select wire type</option>
              {WIRE_TYPES.map((t) => (
                <option key={t} value={t} className="dark:bg-[#1e1e1e]">{t}</option>
              ))}
            </select>
          </div>

          {/* Thickness */}
          <div>
            <label className={LABEL_CLASS}>
              Wire Thickness <span className="text-red-500">*</span>
            </label>
            <select
              required
              name="thickness"
              value={formData.thickness}
              onChange={handleChange}
              className={INPUT_CLASS}
            >
              <option value="" disabled className="dark:bg-[#1e1e1e]">Select thickness</option>
              {THICKNESS_OPTIONS.map((t) => (
                <option key={t} value={t} className="dark:bg-[#1e1e1e]">{t}</option>
              ))}
            </select>
          </div>

          {/* Roll Length */}
          <div>
            <label className={LABEL_CLASS}>
              Roll Length <span className="text-red-500">*</span>
            </label>
            <select
              required
              name="rollLength"
              value={formData.rollLength}
              onChange={handleChange}
              className={INPUT_CLASS}
            >
              <option value="" disabled className="dark:bg-[#1e1e1e]">Select roll length</option>
              {ROLL_OPTIONS.map((r) => (
                <option key={r} value={r} className="dark:bg-[#1e1e1e]">{r}</option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className={LABEL_CLASS}>
              Description / Additional Details
            </label>
            <textarea
              name="description"
              rows={3}
              value={formData.description}
              onChange={handleChange}
              placeholder="e.g. Copper conductor, FR grade, single core, FRLF insulation, ISI marked..."
              className={INPUT_CLASS + ' resize-none'}
            />
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
            <>💬 Send Wire Enquiry via WhatsApp</>
          )}
        </button>
        <p className="text-xs text-slate-400 text-center">
          Clicking send opens WhatsApp with your enquiry pre-filled. No data is stored on our servers.
        </p>
      </form>
    </div>
  );
}
