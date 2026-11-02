import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

const LanguageToggle = ({ className = '' }) => {
  const { lang, toggle } = useLanguage();

  return (
    <button
      onClick={toggle}
      aria-label={lang === 'es' ? 'Switch to English' : 'Cambiar a Español'}
      className={`flex h-8 items-center gap-1.5 rounded-full border border-ink-line px-3 font-mono text-xs transition-colors hover:border-ink-line-strong ${className}`}
    >
      <span className={lang === 'es' ? 'text-ink-text' : 'text-ink-faint'}>ES</span>
      <span className="text-ink-faint">/</span>
      <span className={lang === 'en' ? 'text-ink-text' : 'text-ink-faint'}>EN</span>
    </button>
  );
};

export default LanguageToggle;
