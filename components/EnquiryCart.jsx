'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getCartWALink, getCartWithDetailsWALink } from '@/lib/whatsapp';
import { useTranslation } from '@/lib/i18n';

const EnquiryCartContext = createContext(null);

export function EnquiryCartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [mounted, setMounted] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('enquiry-cart');
      if (stored) setCart(JSON.parse(stored));
    } catch {}
    setMounted(true);
  }, []);

  // Persist to localStorage whenever cart changes
  useEffect(() => {
    if (mounted) {
      localStorage.setItem('enquiry-cart', JSON.stringify(cart));
    }
  }, [cart, mounted]);

  const addToCart = useCallback((product) => {
    const pid = product.id || product._id;
    setCart((prev) => {
      if (prev.find((p) => (p.id || p._id) === pid)) return prev;
      // Ensure the stored item always has a consistent `id` field
      return [...prev, { ...product, id: pid }];
    });
  }, []);

  const removeFromCart = useCallback((id) => {
    setCart((prev) => prev.filter((p) => (p.id || p._id) !== id));
  }, []);

  const isInCart = useCallback(
    (id) => cart.some((p) => (p.id || p._id) === id),
    [cart]
  );

  const clearCart = useCallback(() => setCart([]), []);

  const toggleCart = useCallback(() => setIsCartOpen(prev => !prev), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);
  const openCart = useCallback(() => setIsCartOpen(true), []);

  return (
    <EnquiryCartContext.Provider value={{ 
      cart, addToCart, removeFromCart, isInCart, clearCart, mounted,
      isCartOpen, toggleCart, closeCart, openCart 
    }}>
      {children}
    </EnquiryCartContext.Provider>
  );
}

export function useEnquiryCart() {
  const ctx = useContext(EnquiryCartContext);
  if (!ctx) throw new Error('useEnquiryCart must be used within EnquiryCartProvider');
  return ctx;
}

// ─────────────────────────────────────────
// Side Drawer Cart UI (Amazon/Myntra Style)
// ─────────────────────────────────────────
export default function EnquiryCart() {
  const { cart, removeFromCart, clearCart, mounted, isCartOpen, closeCart } = useEnquiryCart();
  const [step, setStep] = useState('cart'); // 'cart' or 'checkout'
  const [formData, setFormData] = useState({ name: '', phone: '', email: '' });
  const { t } = useTranslation();

  // Reset to cart step when cart opens/closes
  useEffect(() => {
    if (!isCartOpen) {
      setTimeout(() => setStep('cart'), 300); // reset after animation
    }
  }, [isCartOpen]);

  if (!mounted) return null;

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    const link = getCartWithDetailsWALink(cart, formData);
    window.open(link, '_blank');
    closeCart();
  };

  return (
    <>
      {/* Side Drawer Overlay */}
      <div
        className={`fixed inset-0 z-50 transition-opacity duration-300 ${
          isCartOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={closeCart}
        />

        {/* Drawer Panel */}
        <div
          className={`absolute top-0 right-0 rtl:right-auto rtl:left-0 h-full w-full sm:max-w-md bg-white dark:bg-[#121212] shadow-2xl transition-transform duration-300 ease-out flex flex-col ${
            isCartOpen ? 'translate-x-0' : 'translate-x-full rtl:-translate-x-full'
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 dark:border-white/5">
            <div>
              <div className="flex items-center gap-2">
                {step === 'checkout' && (
                  <button 
                    onClick={() => setStep('cart')}
                    className="p-1 -ml-2 rtl:-mr-2 rtl:ml-0 text-slate-500 hover:text-slate-900 dark:hover:text-white"
                    title="Back to Cart"
                  >
                    <svg className="w-5 h-5 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
                  </button>
                )}
                <h2 className="font-bold text-slate-900 dark:text-white text-xl flex items-center gap-2">
                  {step === 'cart' ? t('cart.title') : t('cart.your_details')}
                  {step === 'cart' && (
                    <span className="bg-[#10b981]/10 text-[#10b981] text-xs px-2 py-0.5 rounded-full font-bold">
                      {cart.length}
                    </span>
                  )}
                </h2>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {step === 'cart' ? t('cart.selected_materials') : t('cart.details_subtitle')}
              </p>
            </div>
            <button
              onClick={closeCart}
              className="p-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-full transition-colors text-slate-400 hover:text-slate-900 dark:hover:text-white"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto px-6 py-4 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-white/10">
            {step === 'cart' ? (
              // --- CART VIEW ---
              cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
                  <div className="text-6xl mb-4">🛒</div>
                  <h3 className="text-lg font-bold">{t('cart.empty')}</h3>
                  <p className="text-sm max-w-[200px] mt-1">{t('cart.empty_desc')}</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-2">
                    <span className="text-sm font-semibold text-slate-500">{t('cart.selected_items')}</span>
                    <button
                      onClick={clearCart}
                      className="text-xs font-bold text-red-500 hover:text-red-600 transition-colors"
                    >
                      {t('cart.clear_all')}
                    </button>
                  </div>
                  <div className="divide-y divide-slate-100 dark:divide-white/5 border-y border-slate-100 dark:border-white/5">
                    {cart.map((item) => (
                      <div key={item.id} className="py-4 flex gap-4 group">
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-slate-900 dark:text-white text-sm truncate leading-tight group-hover:text-[#10b981] transition-colors">
                            {item.name}
                          </h4>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[10px] uppercase font-bold text-slate-400 bg-slate-100 dark:bg-white/5 px-1.5 py-0.5 rounded">
                              {item.dimension}
                            </span>
                            <span className="text-[10px] uppercase font-bold text-slate-400">
                              {item.type}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-slate-300 hover:text-red-500 transition-colors p-1"
                          title="Remove item"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )
            ) : (
              // --- CHECKOUT FORM VIEW ---
              <form id="enquiry-form" onSubmit={handleCheckoutSubmit} className="space-y-5 animate-in slide-in-from-right-8 rtl:slide-in-from-left-8 duration-300">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                    {t('cart.name_label')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder={t('cart.name_placeholder')}
                    className="px-4 py-3 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-[#10b981] outline-none transition-all text-sm"
                  />
                </div>
                
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                    {t('cart.phone_label')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    required
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder={t('cart.phone_placeholder')}
                    className="px-4 py-3 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-[#10b981] outline-none transition-all text-sm"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                    {t('cart.email_label')} <span className="text-slate-400 font-normal lowercase">{t('cart.optional')}</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder={t('cart.email_placeholder')}
                    className="px-4 py-3 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-[#10b981] outline-none transition-all text-sm"
                  />
                </div>
                
                <div className="bg-slate-50 dark:bg-white/5 p-4 rounded-xl border border-slate-100 dark:border-white/5 mt-4">
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    {t('cart.quote_note')} <strong className="text-slate-900 dark:text-white">{cart.length} {cart.length > 1 ? t('cart.items') : t('cart.item')}</strong>. 
                    {t('cart.redirect_note')}
                  </p>
                </div>
              </form>
            )}
          </div>

          {/* Footer action */}
          {cart.length > 0 && (
            <div className="px-6 py-6 border-t border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-[#18181b]/50">
              {step === 'cart' ? (
                <button
                  onClick={() => setStep('checkout')}
                  className="w-full flex items-center justify-center gap-2 bg-[#10b981] hover:bg-[#059669] text-white font-bold py-4 rounded-xl transition-all duration-300 shadow-lg shadow-emerald-500/20 active:scale-[0.98]"
                >
                  {t('cart.proceed')}
                </button>
              ) : (
                <button
                  type="submit"
                  form="enquiry-form"
                  className="w-full flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#1ebe5b] text-[#121212] font-bold py-4 rounded-xl transition-all duration-300 shadow-lg shadow-[#25D366]/20 active:scale-[0.98]"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" className="w-5 h-5">
                    <path d="M16.003 2.667C8.639 2.667 2.667 8.637 2.667 16c0 2.348.627 4.647 1.814 6.657L2.667 29.333l6.87-1.793A13.29 13.29 0 0 0 16.003 29.333c7.363 0 13.33-5.97 13.33-13.333 0-7.364-5.967-13.333-13.33-13.333zm0 24c-2.028 0-4.02-.549-5.755-1.587l-.413-.247-4.077 1.063 1.09-3.968-.269-.432A10.634 10.634 0 0 1 5.333 16c0-5.882 4.787-10.667 10.67-10.667S26.667 10.118 26.667 16c0 5.883-4.784 10.667-10.664 10.667zm5.858-7.986c-.32-.16-1.894-.933-2.188-1.04-.294-.106-.508-.16-.722.16s-.829 1.04-1.015 1.254c-.187.213-.374.24-.694.08-.32-.16-1.351-.498-2.573-1.587-.95-.847-1.59-1.893-1.777-2.213-.187-.32-.02-.493.14-.653.143-.144.32-.374.48-.56.16-.187.213-.32.32-.534.107-.213.053-.4-.027-.56-.08-.16-.72-1.733-.987-2.373-.26-.62-.524-.536-.72-.546l-.614-.01c-.213 0-.56.08-.853.4-.294.32-1.12 1.093-1.12 2.667s1.147 3.093 1.307 3.307c.16.213 2.254 3.44 5.46 4.827.764.33 1.36.527 1.824.674.766.242 1.465.208 2.017.127.615-.092 1.894-.773 2.16-1.52.267-.747.267-1.387.187-1.52-.08-.133-.294-.213-.614-.373z"/>
                  </svg>
                  {t('cart.send_whatsapp')}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
