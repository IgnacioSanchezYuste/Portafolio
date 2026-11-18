import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import Section from './ui/Section';
import Media from './ui/Media';
import { useLanguage } from '../context/LanguageContext';
import { spotlightHandler } from '../hooks/useSpotlight';

const HighlightCard = ({ data, media, links, prs }) => (
  <article onMouseMove={spotlightHandler} className="spotlight group grid overflow-hidden rounded-xl border border-ink-line bg-ink-surface transition-colors hover:border-ink-line-strong md:grid-cols-5">
    <Media
      src={media.src}
      alt={data.title}
      mark={media.mark}
      label={media.label}
      hue={media.hue}
      logo={media.logo}
      className={`${media.dark ? 'dark-tile ' : ''}aspect-[16/10] md:col-span-2 md:aspect-auto md:min-h-full md:border-r md:border-ink-line`}
    />

    <div className="flex flex-col p-6 md:col-span-3 md:p-8">
      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-accent">{data.badge}</p>
      <h3 className="mt-4 text-2xl font-medium tracking-[-0.02em] text-ink-text md:text-[1.75rem]">{data.title}</h3>
      <p className="mt-1 text-sm text-ink-muted">{data.subtitle}</p>
      <p className="mt-5 leading-relaxed text-ink-muted">{data.description}</p>
      {data.role && <p className="mt-3 leading-relaxed text-ink-text">{data.role}</p>}
      {prs && (
        <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-ink-muted">
          <span className="uppercase tracking-[0.14em] text-ink-faint">{data.prs}</span>
          {prs.map((pr) => (
            <a
              key={pr.n}
              href={`https://github.com/midudev/la-velada-web-oficial/pull/${pr.n}`}
              target="_blank"
              rel="noopener noreferrer"
              title={pr.title}
              className="rounded-full border border-ink-line px-2 py-0.5 transition-colors hover:border-ink-accent hover:text-ink-accent"
            >
              #{pr.n}
            </a>
          ))}
        </p>
      )}

      <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-1 font-mono text-xs text-ink-text">
        {data.stats.map((s) => (
          <li key={s} className="flex items-center gap-2">
            <span className="h-1 w-1 bg-ink-accent" aria-hidden="true" />
            {s}
          </li>
        ))}
      </ul>

      <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 pt-1 md:mt-auto">
        {links.map((l) => (
          <a
            key={l.url}
            href={l.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group/link inline-flex items-center gap-1.5 text-sm text-ink-text"
          >
            <span className="link-underline">{l.label}</span>
            <ArrowUpRight className="h-4 w-4 text-ink-muted transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
          </a>
        ))}
      </div>
    </div>
  </article>
);

const Highlights = () => {
  const { t } = useLanguage();
  const h = t.highlights;

  return (
    <Section id="highlights" index="02" label={h.title}>
      <div className="space-y-6">
        <HighlightCard
          data={h.velada}
          media={{ src: '/img/velada.webp', mark: 'La Velada VI', label: 'infolavelada.com', hue: '#d4a73a' }}
          links={[
            { url: 'https://infolavelada.com', label: h.velada.cta },
            { url: 'https://github.com/midudev/la-velada-web-oficial', label: h.velada.repo },
          ]}
          prs={[
            { n: 1510, title: 'Página de pronósticos (maquetación UI)' },
            { n: 1580, title: 'fix(boxers): fechas de nacimiento + guarda ISODate' },
            { n: 1581, title: 'feat(boxeadores): fecha de nacimiento en la ficha' },
          ]}
        />
        <HighlightCard
          data={h.hyperfocus}
          media={{ mark: 'Hyperfocus', label: 'hyperfocus.es', hue: '#4FD6FF', logo: '/img/brands/hyperfocus.svg', dark: true }}
          links={[{ url: 'https://hyperfocus.es', label: h.hyperfocus.cta }]}
        />
      </div>
    </Section>
  );
};

export default Highlights;
