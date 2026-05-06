'use client';

import React, { useState } from 'react';

const CATEGORIES = [
  'MS Steel',
  'Structured Steel',
  'TMT',
  'Copper',
  'Aluminium',
  'Other'
];

const WA_NUMBER = process.env.NEXT_PUBLIC_WA_NUMBER || '919999999999';

export default function ScrapForm() {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    quantity: '',
    phone: '',
    email: '',
    state: '',
    city: '',
    pincode: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Construct WhatsApp message
    const message = `*NEW SCRAP SALE ENQUIRY*
----------------------------
*Name:* ${formData.name}
*Category:* ${formData.category}
*Quantity:* ${formData.quantity} KG
*Phone:* ${formData.phone}
*Email:* ${formData.email || 'N/A'}

*Pickup Location:*
*State:* ${formData.state}
*City:* ${formData.city}
*Pincode:* ${formData.pincode}
----------------------------
Sent from: Industrial Solutions Portal`;

    const waUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
    
    // Open WhatsApp synchronously to prevent browser popup blockers
    window.open(waUrl, '_blank');
    
    // Simulate a brief delay for UX
    await new Promise(resolve => setTimeout(resolve, 800));
    
    setIsSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-white dark:bg-[#1e1e1e] p-8 rounded-2xl border border-slate-200 dark:border-white/10 text-center shadow-xl max-w-2xl mx-auto">
        <div className="text-5xl mb-4">✅</div>
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Request Submitted!</h3>
        <p className="text-slate-600 dark:text-slate-400 mb-6">
          Thank you for reaching out. Our team will contact you shortly to discuss your scrap sale.
        </p>
        <button 
          onClick={() => setSubmitted(false)}
          className="px-6 py-2 bg-[#007f5f] hover:bg-[#005f47] text-white rounded-full transition-colors"
        >
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-[#1e1e1e] p-6 md:p-10 rounded-2xl border border-slate-200 dark:border-white/10 shadow-xl max-w-3xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Sell Your Scrap</h2>
        <p className="text-slate-600 dark:text-slate-400">
          Fill out the form below and we'll provide you with the best market rates for your scrap materials.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              Company / Individual Name <span className="text-red-500">*</span>
            </label>
            <input
              required
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter name"
              className="px-4 py-2.5 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-[#007f5f] outline-none transition-all dark:text-white"
            />
          </div>

          {/* Category */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              Scrap Category <span className="text-red-500">*</span>
            </label>
            <select
              required
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="px-4 py-2.5 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-[#007f5f] outline-none transition-all dark:text-white"
            >
              <option value="" disabled className="dark:bg-[#1e1e1e] dark:text-white text-slate-900">Select Category</option>
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat} className="dark:bg-[#1e1e1e] dark:text-white text-slate-900">{cat}</option>
              ))}
            </select>
          </div>

          {/* Quantity */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              Estimated Quantity (KG) <span className="text-red-500">*</span>
            </label>
            <input
              required
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              placeholder="e.g. 500"
              className="px-4 py-2.5 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-[#007f5f] outline-none transition-all dark:text-white"
            />
          </div>

          {/* Phone */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              required
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Mobile number"
              className="px-4 py-2.5 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-[#007f5f] outline-none transition-all dark:text-white"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              Email Address (Optional)
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@mail.com"
              className="px-4 py-2.5 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-[#007f5f] outline-none transition-all dark:text-white"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 dark:border-white/5">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4 uppercase tracking-wider">Pickup Location</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-slate-500 uppercase">State</label>
              <input
                required
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="State"
                className="px-4 py-2.5 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-[#007f5f] outline-none transition-all dark:text-white"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-slate-500 uppercase">City</label>
              <input
                required
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="City"
                className="px-4 py-2.5 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-[#007f5f] outline-none transition-all dark:text-white"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-slate-500 uppercase">Pincode</label>
              <input
                required
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                placeholder="Pincode"
                className="px-4 py-2.5 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-[#007f5f] outline-none transition-all dark:text-white"
              />
            </div>
          </div>
        </div>

        <button
          disabled={isSubmitting}
          type="submit"
          className="w-full py-4 bg-[#007f5f] hover:bg-[#005f47] text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-emerald-900/20 disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              Processing...
            </>
          ) : 'Submit Scrap Sale Request'}
        </button>
      </form>
    </div>
  );
}
