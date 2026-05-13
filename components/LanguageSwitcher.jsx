'use client';

import { useState, useRef, useEffect } from 'react';
import { useTranslation, LANGUAGES } from '@/lib/i18n';
import { AnimatePresence, motion } from 'framer-motion';

export default function LanguageSwitcher() {
  const { locale, setLocale, currentLang } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Close on outside click
  useEffect(() => {
    function handler(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      {/* Trigger Button */}
      <button
        id="language-switcher-btn"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 hover:border-[#10b981] dark:hover:border-[#10b981] text-slate-700 dark:text-slate-300 hover:text-[#10b981] dark:hover:text-[#10b981] transition-all duration-200 text-xs font-semibold"
        aria-label="Select Language"
      >
        <span className="text-base leading-none">{currentLang.flag}</span>
        <span className="hidden sm:inline max-w-[52px] truncate">{currentLang.label}</span>
        <svg
          className={`w-3 h-3 flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute right-0 top-full mt-2 w-44 bg-white dark:bg-[#1a1a1a] border border-slate-200 dark:border-white/10 rounded-xl shadow-xl shadow-black/10 dark:shadow-black/40 z-50 overflow-hidden py-1"
          >
            {LANGUAGES.map((lang) => {
              const isActive = lang.code === locale;
              return (
                <button
                  key={lang.code}
                  onClick={() => { setLocale(lang.code); setOpen(false); }}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 text-sm font-medium transition-colors duration-150 ${
                    isActive
                      ? 'bg-[#10b981]/10 text-[#10b981]'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-[#10b981] dark:hover:text-[#10b981]'
                  }`}
                >
                  <span className="text-lg leading-none">{lang.flag}</span>
                  <span>{lang.label}</span>
                  {isActive && (
                    <svg className="w-3.5 h-3.5 ml-auto flex-shrink-0 text-[#10b981]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  )}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
