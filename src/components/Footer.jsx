import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { container } from './ui/Section';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-ink-line">
      <div
        className={`${container} flex flex-col gap-4 py-10 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-faint sm:flex-row sm:items-center sm:justify-between`}
      >
        <p>
          © {new Date().getFullYear()} — {t.footer.built}
        </p>
        <div className="flex gap-6">
          <a
            href="https://github.com/IgnacioSanchezYuste/Portafolio"
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline transition-colors hover:text-ink-text"
          >
            {t.footer.github}
          </a>
          <a href="#top" className="link-underline transition-colors hover:text-ink-text">
            {t.footer.top} ↑
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
