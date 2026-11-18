import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, ArrowDown, Download, GitCommitHorizontal } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { container } from './ui/Section';
import CountUp from './ui/CountUp';
import HeroGradient from './effects/HeroGradient';
import { prefersReducedMotion } from '../hooks/useNearView';
import { useGithubActivity, timeAgo } from '../hooks/useGithubActivity';

export const cvPath = (lang) => `/cv/CV-Ignacio-Sanchez-Yuste-${lang.toUpperCase()}.pdf`;

// Only show the CV button once the PDF actually exists in /public/cv.
export const useCvAvailable = (lang) => {
  const [ok, setOk] = useState(false);
  useEffect(() => {
    let alive = true;
    fetch(cvPath(lang), { method: 'HEAD' })
      .then((r) => alive && setOk(r.ok && (r.headers.get('content-type') || '').includes('pdf')))
      .catch(() => alive && setOk(false));
    return () => {
      alive = false;
    };
  }, [lang]);
  return ok;
};

const socials = [
  { label: 'LinkedIn', url: 'https://www.linkedin.com/in/ignacio-s%C3%A1nchez-yuste-646661384/' },
  { label: 'GitHub', url: 'https://github.com/IgnacioSanchezYuste' },
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
    { value: <CountUp to={30000} format={fmt} suffix="+" />, label: t.stats.candidates },
    { value: <CountUp to={1} suffix="M+" duration={900} />, label: t.stats.visits },
    { value: <CountUp to={t.projects.items.length} />, label: t.stats.projects },
    { value: <CountUp to={2} duration={900} />, label: t.stats.awards },
  ];
  const cvOk = useCvAvailable(lang);
  const titleRef = useRef(null);

  // Headline assembles letter by letter (GSAP SplitText). Keyed by lang so React remounts it.
  useEffect(() => {
    const el = titleRef.current;
    if (!el || prefersReducedMotion()) return undefined;
    let split;
    let tween;
    let disposed = false;
    el.style.visibility = 'hidden';
    Promise.all([import('gsap'), import('gsap/SplitText'), document.fonts?.ready]).then(([{ gsap }, { SplitText }]) => {
      if (disposed) return;
      gsap.registerPlugin(SplitText);
      split = SplitText.create(el, { type: 'words,chars', mask: 'words' });
      el.style.visibility = 'visible';
      tween = gsap.from(split.chars, {
        yPercent: 115,
        rotate: 6,
        duration: 1.1,
        ease: 'expo.out',
        stagger: 0.018,
        delay: 0.15,
      });
    });
    return () => {
      disposed = true;
      tween?.kill();
      split?.revert();
      el.style.visibility = '';
    };
  }, [lang]);
  const gh = useGithubActivity();

  return (
    <section id="top" className="relative isolate overflow-hidden pt-32 md:pt-40">
      <HeroGradient />
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

            <h1
              key={lang}
              ref={titleRef}
              className="mt-8 text-[2.6rem] font-medium leading-[1.02] tracking-[-0.035em] text-ink-text sm:text-6xl lg:text-[4.25rem]">
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
              {cvOk && (
                <a
                  href={cvPath(lang)}
                  download
                  className="group inline-flex h-12 items-center gap-2 rounded-full border border-ink-line-strong px-5 text-[15px] text-ink-text transition-colors hover:border-ink-text"
                >
                  <Download className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
                  {t.common.cv} ({lang.toUpperCase()})
                </a>
              )}
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

            {gh && (
              <a
                href={gh.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rise mt-6 inline-flex max-w-full items-center gap-2.5 rounded-full border border-ink-line px-3 py-1.5 font-mono text-[11px] text-ink-muted transition-colors hover:border-ink-line-strong hover:text-ink-text"
              >
                <GitCommitHorizontal className="h-3.5 w-3.5 shrink-0 text-ink-accent" />
                <span className="shrink-0 uppercase tracking-[0.14em] text-ink-faint">{t.common.lastCommit}</span>
                <span className="truncate">
                  {gh.repo}
                  {gh.message ? ` · ${gh.message}` : ''}
                </span>
                <span className="shrink-0 text-ink-faint">{timeAgo(gh.date, lang)}</span>
              </a>
            )}
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
