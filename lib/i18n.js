'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';

// ─── Supported Languages ───────────────────────────────────────────────────
export const LANGUAGES = [
  { code: 'en', label: 'English',  flag: '🇬🇧', dir: 'ltr' },
  { code: 'ja', label: '日本語',    flag: '🇯🇵', dir: 'ltr' },
  { code: 'es', label: 'Español',  flag: '🇪🇸', dir: 'ltr' },
  { code: 'ar', label: 'العربية',  flag: '🇸🇦', dir: 'rtl' },
  { code: 'fr', label: 'Français', flag: '🇫🇷', dir: 'ltr' },
  { code: 'de', label: 'Deutsch',  flag: '🇩🇪', dir: 'ltr' },
  { code: 'hi', label: 'हिन्दी',    flag: '🇮🇳', dir: 'ltr' },
  { code: 'zh', label: '中文',      flag: '🇨🇳', dir: 'ltr' },
];

// ─── Context ────────────────────────────────────────────────────────────────
const I18nContext = createContext(null);

// ─── Deep-get helper: t('hero.title1') ─────────────────────────────────────
function deepGet(obj, path) {
  return path.split('.').reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : null), obj);
}

// ─── Provider ───────────────────────────────────────────────────────────────
export function I18nProvider({ children }) {
  const [locale, setLocaleState] = useState('en');
  const [messages, setMessages] = useState({});
  const [loading, setLoading] = useState(false);

  // Load messages for a given locale
  const loadMessages = useCallback(async (code) => {
    try {
      setLoading(true);
      const mod = await import(`@/messages/${code}.json`);
      setMessages(mod.default || mod);
    } catch (e) {
      console.warn(`[i18n] Could not load messages for "${code}", falling back to en`);
      const fallback = await import(`@/messages/en.json`);
      setMessages(fallback.default || fallback);
    } finally {
      setLoading(false);
    }
  }, []);

  // On mount: read saved preference or detect browser language
  useEffect(() => {
    const saved = localStorage.getItem('preferred-lang');
    const supported = LANGUAGES.map((l) => l.code);
    let initial = 'en';

    if (saved && supported.includes(saved)) {
      initial = saved;
    } else {
      const browserLang = navigator.language?.split('-')[0];
      if (browserLang && supported.includes(browserLang)) {
        initial = browserLang;
      }
    }

    setLocaleState(initial);
    loadMessages(initial);
  }, [loadMessages]);

  // Apply dir attribute to <html> for RTL support (Arabic)
  useEffect(() => {
    const lang = LANGUAGES.find((l) => l.code === locale);
    if (lang) {
      document.documentElement.setAttribute('dir', lang.dir);
      document.documentElement.setAttribute('lang', locale);
    }
  }, [locale]);

  const setLocale = useCallback(
    (code) => {
      setLocaleState(code);
      localStorage.setItem('preferred-lang', code);
      loadMessages(code);
    },
    [loadMessages]
  );

  // Translation function — supports dot-notation keys
  const t = useCallback(
    (key, fallback = key) => {
      const val = deepGet(messages, key);
      return val !== null ? val : fallback;
    },
    [messages]
  );

  const currentLang = LANGUAGES.find((l) => l.code === locale) || LANGUAGES[0];

  return (
    <I18nContext.Provider value={{ locale, setLocale, t, loading, currentLang, LANGUAGES }}>
      {children}
    </I18nContext.Provider>
  );
}

// ─── Hook ────────────────────────────────────────────────────────────────────
export function useTranslation() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useTranslation must be used within I18nProvider');
  return ctx;
}
