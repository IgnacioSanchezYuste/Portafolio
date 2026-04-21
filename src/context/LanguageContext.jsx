import { createContext, useContext, useEffect, useState } from 'react';
import { translations } from '../i18n/translations';

const LanguageContext = createContext(null);

const getInitialLang = () => {
  if (typeof window === 'undefined') return 'es';
  const saved = localStorage.getItem('lang');
  if (saved === 'en' || saved === 'es') return saved;
  const browser = navigator.language?.slice(0, 2).toLowerCase();
  return browser === 'en' ? 'en' : 'es';
};

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(getInitialLang);

  useEffect(() => {
    localStorage.setItem('lang', lang);
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
