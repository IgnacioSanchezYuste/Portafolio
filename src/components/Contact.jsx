import React, { useEffect, useState } from 'react';
import { ArrowUpRight, Copy, Download } from 'lucide-react';
import { cvPath, useCvAvailable } from './Header';
import Globe from './effects/Globe';
import { useNearView } from '../hooks/useNearView';
import Section from './ui/Section';
import { useToast } from './ui/use-toast';
import { useLanguage } from '../context/LanguageContext';

const email = 'ignaciosanchezyuste@gmail.com';

const useMadridTime = (lang) => {
  const fmt = () =>
    new Intl.DateTimeFormat(lang === 'es' ? 'es-ES' : 'en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Europe/Madrid',
    }).format(new Date());
  const [time, setTime] = useState(null);
  useEffect(() => {
    setTime(fmt());
    const id = setInterval(() => setTime(fmt()), 30000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);
  return time;
};

const Contact = () => {
  const { toast } = useToast();
  const { t, lang } = useLanguage();
  const cvOk = useCvAvailable(lang);
  const time = useMadridTime(lang);
  const [globeRef, globeNear] = useNearView('200px');

  const copyAndToast = (text, description) => {
    navigator.clipboard.writeText(text).catch((err) => console.error('Clipboard error:', err));
    toast({ title: t.contact.copied, description, duration: 3000 });
  };

  const rows = [
    { label: t.contact.phone, value: '626 050 258', copy: '626050258', copied: t.contact.copiedPhone },
    { label: 'LinkedIn', value: 'ignacio-sánchez-yuste', url: 'https://www.linkedin.com/in/ignacio-s%C3%A1nchez-yuste-646661384/' },
    { label: 'GitHub', value: 'IgnacioSanchezYuste', url: 'https://github.com/IgnacioSanchezYuste' },
  ];

  return (
    <Section id="contact" index="08" label={t.contact.title}>
      <div className="grid items-center gap-10 lg:grid-cols-[1fr_320px]">
      <div>
      <h2 className="text-4xl font-medium leading-[1.05] tracking-[-0.03em] text-ink-text md:text-6xl">
        {t.contact.heading}
      </h2>
      <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-muted">{t.contact.subtitle}</p>
      {time && (
        <p className="mt-4 flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.14em] text-ink-faint">
          <span className="status-dot" />
          {time} {t.common.localTime} · CET
        </p>
      )}
      </div>
      <figure ref={globeRef} className="mx-auto w-full max-w-[320px]">
        {globeNear ? <Globe /> : <div className="aspect-square w-full" />}
        <figcaption className="mt-2 text-center font-mono text-[10px] uppercase tracking-[0.14em] text-ink-faint">
          {t.contact.globe}
        </figcaption>
      </figure>
      </div>

      <div className="mt-12 flex flex-wrap items-center gap-x-5 gap-y-3">
        <a
          href={`mailto:${email}`}
          className="link-underline break-all font-serif text-3xl italic text-ink-accent md:text-5xl"
        >
          {email}
        </a>
        <button
          onClick={() => copyAndToast(email, t.contact.copiedEmail)}
          className="inline-flex h-9 items-center gap-2 rounded-full border border-ink-line px-4 font-mono text-xs uppercase tracking-[0.14em] text-ink-muted transition-colors hover:border-ink-line-strong hover:text-ink-text"
        >
          <Copy className="h-3.5 w-3.5" />
          {t.contact.copy}
        </button>
        {cvOk && (
          <a
            href={cvPath(lang)}
            download
            className="inline-flex h-9 items-center gap-2 rounded-full border border-ink-line px-4 font-mono text-xs uppercase tracking-[0.14em] text-ink-muted transition-colors hover:border-ink-line-strong hover:text-ink-text"
          >
            <Download className="h-3.5 w-3.5" />
            {t.common.cv}
          </a>
        )}
      </div>

      <ul className="mt-14 border-b border-ink-line">
        {rows.map((row) => {
          const inner = (
            <>
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-faint">{row.label}</span>
              <span className="flex items-center gap-2 text-ink-text">
                {row.value}
                {row.url ? (
                  <ArrowUpRight className="h-4 w-4 text-ink-faint transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink-accent" />
                ) : (
                  <Copy className="h-3.5 w-3.5 text-ink-faint transition-colors group-hover:text-ink-accent" />
                )}
              </span>
            </>
          );
          const cls =
            'group flex w-full items-center justify-between gap-4 border-t border-ink-line py-5 text-left transition-colors hover:bg-ink-surface sm:px-2';
          return (
            <li key={row.label}>
              {row.url ? (
                <a href={row.url} target="_blank" rel="noopener noreferrer" className={cls}>
                  {inner}
                </a>
              ) : (
                <button onClick={() => copyAndToast(row.copy, row.copied)} className={cls}>
                  {inner}
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </Section>
  );
};

export default Contact;
