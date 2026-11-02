import React from 'react';
import { ArrowRight, ArrowDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { container } from './ui/Section';

const socials = [
  { label: 'LinkedIn', url: 'https://www.linkedin.com/in/ignacio-s%C3%A1nchez-yuste-646661384/' },
  { label: 'GitHub', url: 'https://github.com/IgnacioSanchezYuste' },
  { label: 'X', url: 'https://x.com/IgnacioSanchezY' },
];

const Header = () => {
  const { t, lang } = useLanguage();

  const scrollTo = (id) => (e) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const fmt = (n) => n.toLocaleString(lang === 'es' ? 'es-ES' : 'en-US');
  const stats = [
    { value: `${fmt(30000)}+`, label: t.stats.candidates },
    { value: '1M+', label: t.stats.visits },
    { value: '9', label: t.stats.projects },
    { value: '2', label: t.stats.awards },
  ];

  return (
    <section id="top" className="pt-32 md:pt-40">
      <div className={container}>
        <div className="grid items-end gap-12 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-8">
            <p className="rise flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs uppercase tracking-[0.14em] text-ink-muted">
              <span className="flex items-center gap-2.5 text-ink-text">
                <span className="status-dot" />
                {t.common.available}
              </span>
              <span className="hidden text-ink-faint sm:inline">/</span>
              <span>{t.header.role}</span>
            </p>

            <h1 className="rise rise-1 mt-8 text-[2.6rem] font-medium leading-[1.02] tracking-[-0.035em] text-ink-text sm:text-6xl lg:text-[4.25rem]">
              {t.header.headlineA}{' '}
              <span className="font-serif font-normal italic tracking-[-0.01em] text-ink-accent">
                {t.header.headlineEm}
              </span>{' '}
              {t.header.headlineB}
            </h1>

            <p className="rise rise-2 mt-8 max-w-xl text-lg leading-relaxed text-ink-muted">
              {t.header.intro}
            </p>

            <div className="rise rise-3 mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              <a
                href="#contact"
                onClick={scrollTo('contact')}
                className="group inline-flex h-12 items-center gap-2 rounded-full bg-ink-accent px-6 text-[15px] font-medium text-ink-accent-ink transition-transform hover:-translate-y-0.5"
              >
                {t.header.ctaContact}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href="#projects"
                onClick={scrollTo('projects')}
                className="group inline-flex items-center gap-2 text-[15px] text-ink-text"
              >
                <span className="link-underline">{t.header.ctaProjects}</span>
                <ArrowDown className="h-4 w-4 text-ink-muted transition-transform group-hover:translate-y-0.5" />
              </a>
            </div>

            <ul className="rise rise-4 mt-10 flex gap-6 font-mono text-xs uppercase tracking-[0.14em]">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline text-ink-muted transition-colors hover:text-ink-text"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <figure className="rise rise-2 md:col-span-4">
            <div className="group aspect-[4/5] w-full max-w-sm overflow-hidden rounded-lg bg-ink-surface md:ml-auto">
              <img
                src="/img/yo.jpg"
                alt="Ignacio Sánchez Yuste"
                width={480}
                height={600}
                fetchpriority="high"
                className="h-full w-full object-cover grayscale transition-[filter] duration-700 group-hover:grayscale-0"
              />
            </div>
            <figcaption className="mt-3 flex max-w-sm justify-between font-mono text-[11px] uppercase tracking-[0.14em] text-ink-faint md:ml-auto">
              <span>Ignacio Sánchez Yuste</span>
              <span>{t.header.photoCaption}</span>
            </figcaption>
          </figure>
        </div>

        <dl className="rise rise-5 mt-20 grid grid-cols-2 gap-px border-t border-ink-line bg-ink-line md:mt-28 md:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="flex flex-col-reverse bg-ink-bg py-8 pr-4 even:pl-6 md:[&:not(:first-child)]:pl-6"
            >
              <dt className="mt-2 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-muted">{s.label}</dt>
              <dd className="text-4xl font-medium tracking-[-0.03em] text-ink-text md:text-5xl">{s.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};

export default Header;
