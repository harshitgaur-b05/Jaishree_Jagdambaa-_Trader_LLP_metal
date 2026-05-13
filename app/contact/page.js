'use client';

import { useState } from 'react';
import { getContactFormWALink } from '@/lib/whatsapp';
import { useTranslation } from '@/lib/i18n';

const PHONE = process.env.NEXT_PUBLIC_COMPANY_PHONE || '+91 99999 99999';
const EMAIL = process.env.NEXT_PUBLIC_COMPANY_EMAIL || 'info@steelmart.in';
const WA_NUMBER = process.env.NEXT_PUBLIC_WA_NUMBER || '919999999999';
const MAPS_URL = process.env.NEXT_PUBLIC_MAPS_EMBED_URL || 'https://maps.google.com/maps?q=Delhi,India&output=embed';

function ContactForm({ t }) {
  const [form, setForm] = useState({ name: '', phone: '', message: '' });
  const [error, setError] = useState('');

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.phone || !form.message) {
      setError(t('contact.required'));
      return;
    }
    const link = getContactFormWALink(form);
    window.open(link, '_blank', 'noopener,noreferrer');
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
          {t('contact.name')} <span className="text-red-500">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          placeholder={t('contact.name_placeholder')}
          className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent"
        />
      </div>
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1">
          {t('contact.phone')} <span className="text-red-500">*</span>
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          value={form.phone}
          onChange={handleChange}
          placeholder={t('contact.phone_placeholder')}
          className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent"
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">
          {t('contact.message')} <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={form.message}
          onChange={handleChange}
          placeholder={t('contact.message_placeholder')}
          className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent resize-none"
        />
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button
        type="submit"
        className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5b] text-white font-semibold py-3 rounded-xl transition-colors text-sm"
      >
        💬 {t('contact.send_button')}
      </button>
      <p className="text-xs text-slate-400 text-center">
        {t('contact.no_data')}
      </p>
    </form>
  );
}

export default function ContactPage() {
  const { t } = useTranslation();

  const INFO_ITEMS = [
    {
      icon: '📞',
      label: 'Phone',
      value: PHONE,
      href: `tel:${PHONE}`,
    },
    {
      icon: '✉️',
      label: 'Email',
      value: EMAIL,
      href: `mailto:${EMAIL}`,
    },
    {
      icon: '💬',
      label: 'WhatsApp',
      value: `wa.me/${WA_NUMBER}`,
      href: `https://wa.me/${WA_NUMBER}`,
      external: true,
    },
    {
      icon: '📍',
      label: 'Address',
      value: t('contact.address'),
      href: null,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#121212] transition-colors duration-300">
      {/* Header */}
      <div className="bg-[#0f172a] dark:bg-black py-12 px-4 md:px-8 border-b border-white/5">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">{t('contact.title')}</h1>
          <p className="text-slate-400 max-w-lg mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Contact Info + Map */}
          <div className="flex flex-col gap-6">
            <div className="bg-white dark:bg-[#18181b] rounded-2xl border border-slate-200 dark:border-white/10 p-6 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-5">{t('contact.get_in_touch')}</h2>
              <ul className="flex flex-col gap-4">
                {INFO_ITEMS.map(({ icon, label, value, href, external }) => (
                  <li key={label} className="flex items-start gap-4">
                    <span className="text-2xl flex-shrink-0 mt-0.5">{icon}</span>
                    <div>
                      <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">{label}</p>
                      {href ? (
                        <a
                          href={href}
                          {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                          className="text-sm text-[#0f172a] dark:text-white font-semibold hover:text-[#3b82f6] dark:hover:text-[#3b82f6] transition-colors"
                        >
                          {value}
                        </a>
                      ) : (
                        <p className="text-sm text-[#0f172a] dark:text-slate-300 font-semibold">{value}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Map embed */}
            <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 h-64 bg-slate-100 dark:bg-[#1a1a1a]">
              <iframe
                src={MAPS_URL}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Our Location on Google Maps"
                className="dark:opacity-80 dark:invert-[.9] dark:hue-rotate-180"
              />
            </div>

            {/* Direct WA CTA */}
            <a
              href={`https://wa.me/${WA_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#1ebe5b] text-[#121212] font-bold py-4 rounded-2xl transition-colors text-sm shadow"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" className="w-5 h-5">
                <path d="M16.003 2.667C8.639 2.667 2.667 8.637 2.667 16c0 2.348.627 4.647 1.814 6.657L2.667 29.333l6.87-1.793A13.29 13.29 0 0 0 16.003 29.333c7.363 0 13.33-5.97 13.33-13.333 0-7.364-5.967-13.333-13.33-13.333zm0 24c-2.028 0-4.02-.549-5.755-1.587l-.413-.247-4.077 1.063 1.09-3.968-.269-.432A10.634 10.634 0 0 1 5.333 16c0-5.882 4.787-10.667 10.67-10.667S26.667 10.118 26.667 16c0 5.883-4.784 10.667-10.664 10.667zm5.858-7.986c-.32-.16-1.894-.933-2.188-1.04-.294-.106-.508-.16-.722.16s-.829 1.04-1.015 1.254c-.187.213-.374.24-.694.08-.32-.16-1.351-.498-2.573-1.587-.95-.847-1.59-1.893-1.777-2.213-.187-.32-.02-.493.14-.653.143-.144.32-.374.48-.56.16-.187.213-.32.32-.534.107-.213.053-.4-.027-.56-.08-.16-.72-1.733-.987-2.373-.26-.62-.524-.536-.72-.546l-.614-.01c-.213 0-.56.08-.853.4-.294.32-1.12 1.093-1.12 2.667s1.147 3.093 1.307 3.307c.16.213 2.254 3.44 5.46 4.827.764.33 1.36.527 1.824.674.766.242 1.465.208 2.017.127.615-.092 1.894-.773 2.16-1.52.267-.747.267-1.387.187-1.52-.08-.133-.294-.213-.614-.373z"/>
              </svg>
              {t('contact.chat_direct')}
            </a>
          </div>

          {/* Contact form */}
          <div className="bg-white dark:bg-[#18181b] rounded-2xl border border-slate-200 dark:border-white/10 p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{t('contact.send_enquiry')}</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
              {t('contact.form_subtitle')}
            </p>
            <ContactForm t={t} />
          </div>
        </div>
      </div>
    </div>
  );
}
