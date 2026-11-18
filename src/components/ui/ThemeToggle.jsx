import React, { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

const read = () =>
  typeof document !== 'undefined' && document.documentElement.classList.contains('light') ? 'light' : 'dark';

export const setTheme = (theme) => {
  const root = document.documentElement;
  root.classList.add('theme-transition');
  root.classList.toggle('light', theme === 'light');
  try {
    localStorage.setItem('theme', theme);
  } catch (e) {
    /* storage unavailable */
  }
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'light' ? '#f7f6f3' : '#0d0d0e');
  window.dispatchEvent(new CustomEvent('themechange', { detail: theme }));
  window.setTimeout(() => root.classList.remove('theme-transition'), 400);
};

export const toggleTheme = () => setTheme(read() === 'light' ? 'dark' : 'light');

export const useTheme = () => {
  const [theme, set] = useState(read);
  useEffect(() => {
    const on = (e) => set(e.detail);
    window.addEventListener('themechange', on);
    return () => window.removeEventListener('themechange', on);
  }, []);
  return theme;
};

const ThemeToggle = ({ className = '' }) => {
  const theme = useTheme();
  const isLight = theme === 'light';

  return (
    <button
      onClick={toggleTheme}
      aria-label={isLight ? 'Dark mode' : 'Light mode'}
      title={isLight ? 'Dark mode' : 'Light mode'}
      className={`flex h-8 w-8 items-center justify-center rounded-full border border-ink-line text-ink-muted transition-colors hover:border-ink-line-strong hover:text-ink-text ${className}`}
    >
      {isLight ? <Moon className="h-3.5 w-3.5" /> : <Sun className="h-3.5 w-3.5" />}
    </button>
  );
};

export default ThemeToggle;
