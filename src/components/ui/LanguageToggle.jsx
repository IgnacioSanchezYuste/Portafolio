import React from 'react';
import { Languages } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const LanguageToggle = ({ className = '' }) => {
  const { lang, toggle } = useLanguage();

  return (
    <button
      onClick={toggle}
      aria-label={lang === 'es' ? 'Switch to English' : 'Cambiar a Español'}
      className={`group relative flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/15 hover:bg-white/10 hover:border-purple-300/40 text-white text-sm font-medium transition-all backdrop-blur-sm ${className}`}
    >
      <Languages className="w-4 h-4 text-purple-300 group-hover:rotate-[20deg] transition-transform" />
      <span className={`transition-colors ${lang === 'es' ? 'text-white font-bold' : 'text-white/40'}`}>ES</span>
      <span className="text-white/30 text-xs">/</span>
      <span className={`transition-colors ${lang === 'en' ? 'text-white font-bold' : 'text-white/40'}`}>EN</span>
    </button>
  );
};

export default LanguageToggle;
