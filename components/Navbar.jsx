'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useEnquiryCart } from '@/components/EnquiryCart';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '@/lib/i18n';
import LanguageSwitcher from '@/components/LanguageSwitcher';

const WA_NUMBER = process.env.NEXT_PUBLIC_WA_NUMBER || '919999999999';

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { cart, toggleCart } = useEnquiryCart();
  const { t } = useTranslation();

  const NAV_LINKS = [
    { href: '/', label: t('nav.home') },
    { href: '/products', label: t('nav.products') },
    { href: '/contact', label: t('nav.contact') },
  ];

  return (
    <header className="bg-white dark:bg-[#121212] border-b border-slate-200 dark:border-white/10 sticky top-0 z-40 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between gap-4">
        {/* Logo + name */}
        <Link href="/" className="flex items-center gap-2 sm:gap-3 flex-shrink-0 group">
          {/* Steel beam icon with hover effect */}
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#10b981] rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform duration-300">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 sm:w-5 h-5 text-white dark:text-[#121212]">
              <rect x="2" y="3" width="20" height="4" rx="1" />
              <rect x="2" y="17" width="20" height="4" rx="1" />
              <rect x="10" y="7" width="4" height="10" rx="1" />
            </svg>
          </div>

          <div className="flex flex-col">
            <span className="text-foreground font-black text-xs sm:text-sm md:text-lg tracking-tight leading-none uppercase">
              <span className="text-[#10b981]">Jaishree Jagdambaa</span>
            </span>
            <span className="text-muted-foreground font-bold text-[8px] sm:text-[10px] tracking-[0.15em] uppercase mt-0.5 sm:mt-1">
              Trader LLP
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map(({ href, label }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-150 ${active
                    ? 'text-[#10b981]'
                    : 'text-slate-600 dark:text-slate-300 hover:text-[#10b981] dark:hover:text-[#10b981] hover:bg-slate-50 dark:hover:bg-white/5'
                  }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Right: Language + Theme Toggle + Cart + WA button + hamburger */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Language Switcher */}
          <LanguageSwitcher />

          <ThemeToggle />

          {/* Animated Cart Toggle */}
          <motion.button
            onClick={toggleCart}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            animate={cart.length > 0 ? {
              scale: [1, 1.05, 1],
              rotate: [0, -5, 5, 0]
            } : {}}
            transition={cart.length > 0 ? {
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            } : {}}
            className="relative p-2 text-slate-600 dark:text-slate-300 hover:text-[#10b981] dark:hover:text-[#10b981] transition-colors"
            aria-label="Toggle enquiry cart"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>

            <AnimatePresence>
              {cart.length > 0 && (
                <motion.span
                  key="cart-badge"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  className="absolute top-1 right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm"
                >
                  <motion.span
                    key={cart.length}
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="inline-block"
                  >
                    {cart.length}
                  </motion.span>
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>

          {/* WhatsApp CTA */}
          <a
            href={`https://wa.me/${WA_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:flex items-center gap-1.5 bg-[#10b981] hover:bg-[#059669] text-white dark:text-[#121212] text-xs font-bold px-3 py-2 rounded-lg transition-colors duration-150"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" className="w-4 h-4">
              <path d="M16.003 2.667C8.639 2.667 2.667 8.637 2.667 16c0 2.348.627 4.647 1.814 6.657L2.667 29.333l6.87-1.793A13.29 13.29 0 0 0 16.003 29.333c7.363 0 13.33-5.97 13.33-13.333 0-7.364-5.967-13.333-13.33-13.333zm0 24c-2.028 0-4.02-.549-5.755-1.587l-.413-.247-4.077 1.063 1.09-3.968-.269-.432A10.634 10.634 0 0 1 5.333 16c0-5.882 4.787-10.667 10.67-10.667S26.667 10.118 26.667 16c0 5.883-4.784 10.667-10.664 10.667zm5.858-7.986c-.32-.16-1.894-.933-2.188-1.04-.294-.106-.508-.16-.722.16s-.829 1.04-1.015 1.254c-.187.213-.374.24-.694.08-.32-.16-1.351-.498-2.573-1.587-.95-.847-1.59-1.893-1.777-2.213-.187-.32-.02-.493.14-.653.143-.144.32-.374.48-.56.16-.187.213-.32.32-.534.107-.213.053-.4-.027-.56-.08-.16-.72-1.733-.987-2.373-.26-.62-.524-.536-.72-.546l-.614-.01c-.213 0-.56.08-.853.4-.294.32-1.12 1.093-1.12 2.667s1.147 3.093 1.307 3.307c.16.213 2.254 3.44 5.46 4.827.764.33 1.36.527 1.824.674.766.242 1.465.208 2.017.127.615-.092 1.894-.773 2.16-1.52.267-.747.267-1.387.187-1.52-.08-.133-.294-.213-.614-.373z" />
            </svg>
            {t('nav.whatsapp')}
          </a>

          {/* Hamburger */}
          <button
            className="lg:hidden text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white p-2 rounded-md hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white dark:bg-[#121212] border-t border-slate-200 dark:border-white/10 px-4 py-3 flex flex-col gap-1 transition-colors duration-300">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              className={`px-4 py-2.5 rounded-md text-sm font-medium transition-colors ${pathname === href
                  ? 'bg-slate-50 dark:bg-white/10 text-[#10b981]'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/5'
                }`}
            >
              {label}
            </Link>
          ))}
          <a
            href={`https://wa.me/${WA_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 flex items-center justify-center gap-2 bg-[#10b981] hover:bg-[#059669] text-white dark:text-[#121212] text-sm font-bold px-4 py-2.5 rounded-md transition-colors"
          >
            💬 {t('nav.whatsapp')}
          </a>
        </div>
      )}
    </header>
  );
}
