import { createContext, useContext, useEffect, useState } from 'react';
import { translations } from '../i18n/translations';

const LanguageContext = createContext(null);

const getInitialLang = () => {
  if (typeof window === 'undefined') return 'es';
  try {
    const saved = localStorage.getItem('lang');
    if (saved === 'en' || saved === 'es') return saved;
  } catch (e) {
    /* storage unavailable */
  }
  const browser = navigator.language?.slice(0, 2).toLowerCase();
  // Spanish only for Spanish browsers; everyone else gets English.
  return browser === 'es' ? 'es' : 'en';
};

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(getInitialLang);

  useEffect(() => {
    try {
      localStorage.setItem('lang', lang);
    } catch (e) {
      /* storage unavailable */
    }
    document.documentElement.lang = lang;
  }, [lang]);

  const toggle = () => setLang((l) => (l === 'es' ? 'en' : 'es'));
  const value = { lang, setLang, toggle, t: translations[lang] };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
