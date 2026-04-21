import React, { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import LanguageToggle from './ui/LanguageToggle';

const Navbar = () => {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 120);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const items = [
    { id: 'about', label: t.nav.about },
    { id: 'education', label: t.nav.education },
    { id: 'experience', label: t.nav.experience },
    { id: 'skills', label: t.nav.skills },
    { id: 'projects', label: t.nav.projects },
    { id: 'contact', label: t.nav.contact },
  ];

  const handleClick = (id) => (e) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <nav className="fixed top-3 inset-x-0 z-50 flex justify-center px-3 pointer-events-none">
      <div
        className={`pointer-events-auto flex items-center gap-1 rounded-full border shadow-2xl backdrop-blur-xl transition-all duration-300 ${
          scrolled
            ? 'bg-slate-900/70 border-white/15 px-2 py-1.5'
            : 'bg-white/[0.04] border-white/10 px-2 py-1.5'
        }`}
      >
        <div className="hidden md:flex items-center gap-0.5 pr-1">
          {items.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={handleClick(item.id)}
              className="px-3 py-1.5 text-xs font-medium text-purple-100/80 hover:text-white hover:bg-white/10 rounded-full transition-colors"
            >
              {item.label}
            </a>
          ))}
        </div>
        <div className="md:pl-1 md:border-l md:border-white/10">
          <LanguageToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
