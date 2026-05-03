'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getCartWALink } from '@/lib/whatsapp';

const EnquiryCartContext = createContext(null);

export function EnquiryCartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [mounted, setMounted] = useState(false);

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
    setCart((prev) => {
      if (prev.find((p) => p.id === product.id)) return prev;
      return [...prev, product];
    });
  }, []);

  const removeFromCart = useCallback((id) => {
    setCart((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const isInCart = useCallback(
    (id) => cart.some((p) => p.id === id),
    [cart]
  );

  const clearCart = useCallback(() => setCart([]), []);

  return (
    <EnquiryCartContext.Provider value={{ cart, addToCart, removeFromCart, isInCart, clearCart, mounted }}>
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
// Floating Cart UI
// ─────────────────────────────────────────
export default function EnquiryCart() {
  const { cart, removeFromCart, clearCart, mounted } = useEnquiryCart();
  const [open, setOpen] = useState(false);

  if (!mounted) return null;

  const waLink = cart.length > 0 ? getCartWALink(cart) : '#';

  return (
    <>
      {/* Floating toggle button */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Open enquiry cart"
        className="fixed bottom-24 right-4 z-50 bg-[#0f172a] hover:bg-[#1e3a5f] text-white w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-colors duration-200 border-2 border-[#2d5a8e]"
      >
        <span className="text-xl">🛒</span>
        {cart.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
            {cart.length}
          </span>
        )}
      </button>

      {/* Slide-up panel */}
      <div
        className={`fixed inset-x-0 bottom-0 z-50 bg-white rounded-t-2xl shadow-2xl border-t border-slate-200 transition-transform duration-300 ${
          open ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{ maxHeight: '70vh' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <div>
            <h2 className="font-bold text-slate-900 text-lg">Enquiry Cart</h2>
            <p className="text-xs text-slate-500">{cart.length} product{cart.length !== 1 ? 's' : ''} selected</p>
          </div>
          <div className="flex gap-2">
            {cart.length > 0 && (
              <button
                onClick={clearCart}
                className="text-xs text-red-500 hover:underline px-2 py-1"
              >
                Clear All
              </button>
            )}
            <button
              onClick={() => setOpen(false)}
              className="text-slate-400 hover:text-slate-700 text-xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Cart items */}
        <div className="overflow-y-auto flex-1 px-5 py-3" style={{ maxHeight: 'calc(70vh - 140px)' }}>
          {cart.length === 0 ? (
            <div className="text-center py-10 text-slate-400">
              <div className="text-4xl mb-3">🛒</div>
              <p className="text-sm">No products added yet.</p>
              <p className="text-xs mt-1">Click "Add to Enquiry" on any product.</p>
            </div>
          ) : (
            <ul className="divide-y divide-slate-100">
              {cart.map((item) => (
                <li key={item.id} className="flex items-center justify-between py-3 gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-800 text-sm truncate">{item.name}</p>
                    <p className="text-xs text-slate-500">
                      {item.dimension} · {item.type}
                    </p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-xs text-red-400 hover:text-red-600 hover:bg-red-50 px-2 py-1 rounded flex-shrink-0"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer action */}
        {cart.length > 0 && (
          <div className="px-5 py-4 border-t border-slate-100 bg-white">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5b] text-white font-semibold py-3 rounded-xl transition-colors duration-200 text-sm"
            >
              <span className="text-lg">💬</span>
              Send Enquiry on WhatsApp
            </a>
          </div>
        )}
      </div>

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}
