import React, { Suspense, lazy, useEffect, useRef } from 'react';
import { ArrowUpRight, MoveRight } from 'lucide-react';
import { container } from './ui/Section';
import { useLanguage } from '../context/LanguageContext';
import { spotlightHandler } from '../hooks/useSpotlight';
import { useNearView } from '../hooks/useNearView';

const Phone3D = lazy(() => import('./effects/Phone3D'));

// Keyed by project title (same in both languages). Drop a screenshot at `image` and it replaces the cover.
const projectsMeta = {
  'La Velada del Año VI': {
    url: 'https://infolavelada.com',
    repo: 'https://github.com/midudev/la-velada-web-oficial',
    image: '/img/velada.webp',
    hue: '#d4a73a',
  },
  ChillPocket: {
    url: 'https://github.com/IgnacioSanchezYuste/ChillPocket',
    image: '/img/projects/chillpocket.webp',
    phone: '/img/projects/chillpocket-screen.webp',
    hue: '#38bdf8',
    label: 'React Native · Expo',
  },
  HyperNews: { url: 'https://github.com/IgnacioSanchezYuste/hypernews', hue: '#a78bfa', label: 'Next.js 16' },
  Inventra: {
    url: 'https://ignaciosanchezyuste.es/Inventra',
    repo: 'https://github.com/IgnacioSanchezYuste/Inventra',
    image: '/img/projects/inventra.webp',
    hue: '#6366f1',
  },
  'Spreadsheet-vue': { url: 'https://ignaciosanchezyuste.es/spreadsheet-vue/', image: '/img/projects/spreadsheet.webp', hue: '#6366f1' },
  PadelMaster: { url: 'https://ignaciosanchezyuste.es/PadelMaster/', hue: '#22c55e' },
  BowLeague: { url: 'https://ignaciosanchezyuste.es/BowLeague/', hue: '#ef4444' },
  BarCodeScanner: { url: 'https://github.com/IgnacioSanchezYuste/BarCodesScaner', hue: '#f59e0b' },
  ChistesJPA: { url: 'https://github.com/IgnacioSanchezYuste/ChistesJPA', hue: '#14b8a6' },
};

const Cover = ({ title, hue, label }) => (
  <div className="media-placeholder relative flex h-full w-full items-center justify-center overflow-hidden">
    <span className="cover-orb -left-[10%] -top-[30%]" style={{ background: hue }} aria-hidden="true" />
    <span className="cover-orb -bottom-[40%] -right-[15%] opacity-30" style={{ background: hue }} aria-hidden="true" />
    <span className="relative px-6 text-center font-serif text-4xl italic leading-none text-ink-text md:text-5xl">
      {title}
    </span>
    {label && (
      <span className="absolute bottom-3 left-4 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-faint">
        {label}
      </span>
    )}
  </div>
);

const Thumb = ({ src, alt, hue, label }) => {
  const [ok, setOk] = React.useState(Boolean(src));
  return ok ? (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setOk(false)}
      className="h-full w-full object-cover object-left-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
    />
  ) : (
    <Cover title={alt} hue={hue} label={label} />
  );
};

// Interactive 3D phone, loaded only when the card gets close to the viewport.
const PhoneSlot = ({ meta, title }) => {
  const [ref, near] = useNearView('400px');
  const [visible, setVisible] = React.useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, [ref]);
  const webgl = useRef(null);
  if (webgl.current === null && typeof window !== 'undefined') {
    try {
      webgl.current = Boolean(document.createElement('canvas').getContext('webgl2'));
    } catch (e) {
      webgl.current = false;
    }
  }
  const fallback = <Thumb src={meta.image} alt={title} hue={meta.hue} />;

  return (
    <div
      ref={ref}
      className="relative h-full w-full"
      style={{
        background:
          'radial-gradient(70% 70% at 25% 20%, rgba(91,92,240,.75), transparent 70%), radial-gradient(60% 60% at 85% 90%, rgba(56,189,248,.5), transparent 70%), #0f1020',
      }}
    >
      {near && webgl.current ? <Suspense fallback={fallback}><Phone3D screen={meta.phone} active={visible} /></Suspense> : fallback}
    </div>
  );
};

const LinkOut = ({ href, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="group/link inline-flex items-center gap-1.5 text-sm text-ink-text"
  >
    <span className="link-underline">{children}</span>
    <ArrowUpRight className="h-4 w-4 text-ink-muted transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
  </a>
);

const Featured = ({ project, meta, index, total, labels }) => (
  <article
    onMouseMove={spotlightHandler}
    className="project-card spotlight group grid shrink-0 gap-6 rounded-xl border border-ink-line bg-ink-bg p-5 transition-colors hover:border-ink-line-strong md:grid-cols-2 md:gap-8 md:p-6 lg:w-[min(1040px,80vw)]"
  >
    <div className="aspect-[16/10] overflow-hidden rounded-md border border-ink-line bg-ink-surface md:aspect-auto md:min-h-[360px]">
      {meta.phone ? (
        <PhoneSlot meta={meta} title={project.title} />
      ) : (
        <a href={meta.url} target="_blank" rel="noopener noreferrer" className="block h-full">
          <Thumb src={meta.image} alt={project.title} hue={meta.hue} label={meta.label} />
        </a>
      )}
    </div>
    <div className="flex flex-col">
      <span className="font-mono text-xs text-ink-faint">
        {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </span>
      <h3 className="mt-3 text-2xl font-medium tracking-[-0.02em] text-ink-text">{project.title}</h3>
      <p className="mt-2 text-[15px] leading-relaxed text-ink-muted">{project.description}</p>

      <dl className="mt-5 space-y-3 border-l border-ink-line pl-4 text-sm leading-relaxed">
        {['problem', 'decisions', 'result'].map((k) => (
          <div key={k}>
            <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-accent">{labels[k]}</dt>
            <dd className="mt-0.5 text-ink-muted">{project.case[k]}</dd>
          </div>
        ))}
      </dl>

      <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.1em] text-ink-faint">{project.tags.join(' / ')}</p>
      <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 md:mt-auto md:pt-5">
        <LinkOut href={meta.url}>{labels.view}</LinkOut>
        {meta.repo && <LinkOut href={meta.repo}>GitHub</LinkOut>}
      </div>
    </div>
  </article>
);

const Projects = () => {
  const { t } = useLanguage();
  const p = t.projects;
  const featured = p.items.filter((i) => i.featured);
  const rest = p.items.filter((i) => !i.featured);
  const pinRef = useRef(null);
  const trackRef = useRef(null);
  const barRef = useRef(null);

  // Desktop: pin the section and scroll the featured cards horizontally.
  useEffect(() => {
    let mm;
    let disposed = false;
    Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([{ gsap }, { ScrollTrigger }]) => {
      if (disposed) return;
      gsap.registerPlugin(ScrollTrigger);
      mm = gsap.matchMedia();
      mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
        const track = trackRef.current;
        const distance = () => Math.max(track.scrollWidth - window.innerWidth, 0);
        const scroller = gsap.to(track, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: pinRef.current,
            start: 'center center',
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.7,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (barRef.current) barRef.current.style.transform = `scaleX(${self.progress})`;
            },
          },
        });
        // Cards ease in slightly as they slide into view.
        track.querySelectorAll('.project-card').forEach((card, i) => {
          if (i === 0) return;
          gsap.from(card, {
            opacity: 0.35,
            scale: 0.94,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              containerAnimation: scroller,
              start: 'left 95%',
              end: 'left 55%',
              scrub: true,
            },
          });
        });
      });
    });
    return () => {
      disposed = true;
      mm?.revert();
    };
  }, [t]);

  return (
    <section id="projects" className="border-t border-ink-line">
      <div className={`${container} flex items-end justify-between gap-6 pt-20 md:pt-28`}>
        <div>
          <p className="font-mono text-xs text-ink-accent">05</p>
          <h2 className="mt-2 text-2xl font-medium tracking-[-0.02em] text-ink-text">{p.title}</h2>
        </div>
        <p className="hidden items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-faint lg:flex">
          {p.scrollHint} <MoveRight className="h-4 w-4" />
        </p>
      </div>

      <div ref={pinRef} className="overflow-hidden py-10 lg:py-12">
        <div
          ref={trackRef}
          className="mx-auto flex max-w-6xl flex-col gap-6 px-5 md:px-8 lg:mx-0 lg:w-max lg:max-w-none lg:flex-row lg:items-stretch lg:gap-8 lg:pl-[max(2rem,calc((100vw-72rem)/2+2rem))] lg:pr-[max(2rem,calc((100vw-72rem)/2+2rem))]"
        >
          {featured.map((project, i) => (
            <Featured
              key={project.title}
              project={project}
              meta={projectsMeta[project.title]}
              index={i}
              total={featured.length}
              labels={p}
            />
          ))}
        </div>
        <div className={`${container} mt-8 hidden lg:block`}>
          <div className="h-px w-full bg-ink-line">
            <div ref={barRef} className="h-px w-full origin-left scale-x-0 bg-ink-accent" />
          </div>
        </div>
      </div>

      <div className={`${container} pb-20 md:pb-28`}>
        <h3 className="mb-2 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-faint">{p.more}</h3>
        <ul className="border-b border-ink-line">
          {rest.map((project) => {
            const meta = projectsMeta[project.title];
            return (
              <li key={project.title}>
                <a
                  href={meta.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group grid gap-x-6 gap-y-1 border-t border-ink-line py-5 transition-colors hover:bg-ink-surface sm:grid-cols-[180px_1fr_auto] sm:px-2"
                >
                  <span className="flex items-center gap-2.5 font-medium text-ink-text">
                    <span className="h-2 w-2 rounded-full" style={{ background: meta.hue }} aria-hidden="true" />
                    {project.title}
                  </span>
                  <span className="text-sm leading-relaxed text-ink-muted">{project.description}</span>
                  <ArrowUpRight className="hidden h-4 w-4 text-ink-faint transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink-accent sm:block" />
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default Projects;
