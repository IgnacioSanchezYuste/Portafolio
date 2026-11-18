import React, { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import LanguageToggle from './ui/LanguageToggle';
import ThemeToggle from './ui/ThemeToggle';
import { container } from './ui/Section';

const Navbar = () => {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const items = [
    { id: 'about', label: t.nav.about },
    { id: 'highlights', label: t.nav.highlights },
    { id: 'experience', label: t.nav.experience },
    { id: 'projects', label: t.nav.projects },
    { id: 'skills', label: t.nav.skills },
    { id: 'contact', label: t.nav.contact },
  ];

  const handleClick = (id) => (e) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        scrolled ? 'border-ink-line bg-[var(--nav-bg)] backdrop-blur-md' : 'border-transparent'
      }`}
    >
      <div className={`${container} flex h-16 items-center justify-between gap-6`}>
        <a
          href="#top"
          onClick={handleClick('top')}
          className="flex items-center gap-2.5 text-[15px] font-medium tracking-tight text-ink-text"
        >
          <span className="inline-block h-2 w-2 bg-ink-accent" aria-hidden="true" />
          Ignacio Sánchez Yuste
        </a>

        <nav className="hidden items-center gap-7 lg:flex">
          {items.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={handleClick(item.id)}
              className="text-sm text-ink-muted transition-colors hover:text-ink-text"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <LanguageToggle />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
