import React from 'react';
import Section from './ui/Section';
import { useLanguage } from '../context/LanguageContext';

const logos = {
  'M2M Aplicaciones': { src: '/img/brands/m2m.webp', bg: '#ffffff' },
  Hyperfocus: { src: '/img/brands/hyperfocus.svg', bg: '#0d0d0e' },
  'Kanzan Tech': { src: '/img/brands/kanzan.webp', bg: '#ffffff' },
  'Synergie España · InfoJobs × midudev': { src: '/img/brands/midudev.webp', bg: '#ffffff' },
};

export const Timeline = ({ items, currentLabel, renderBody }) => (
  <ol className="border-b border-ink-line">
    {items.map((item, i) => {
      const [dates, place] = item.period.split(' · ');
      return (
        <li key={i} className="grid gap-x-8 gap-y-3 border-t border-ink-line py-8 sm:grid-cols-[170px_1fr]">
          <div className="font-mono text-xs leading-relaxed text-ink-muted">
            <p className="text-ink-text">{dates}</p>
            {place && <p>{place}</p>}
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <h3 className="text-lg font-medium tracking-[-0.01em] text-ink-text">{item.title}</h3>
              {item.current && (
                <span className="inline-flex items-center gap-2 rounded-full border border-ink-line px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-muted">
                  <span className="status-dot" style={{ width: 5, height: 5 }} />
                  {currentLabel}
                </span>
              )}
            </div>
            <p className="mt-1 flex items-center gap-2.5 text-ink-muted">
              {logos[item.company] && (
                <span
                  className="flex h-6 w-6 shrink-0 items-center justify-center overflow-hidden rounded-md border border-ink-line"
                  style={{ background: logos[item.company].bg }}
                >
                  <img src={logos[item.company].src} alt="" className="h-4 w-4 object-contain" loading="lazy" />
                </span>
              )}
              {item.company || item.institution}
            </p>
            {renderBody && renderBody(item)}
          </div>
        </li>
      );
    })}
  </ol>
);

const Experience = () => {
  const { t } = useLanguage();

  return (
    <Section id="experience" index="03" label={t.experience.title}>
      <Timeline
        items={t.experience.items}
        currentLabel={t.experience.current}
        renderBody={(exp) => (
          <ul className="mt-4 space-y-2 text-[15px] leading-relaxed text-ink-muted">
            {exp.tasks.map((task, i) => (
              <li key={i} className="flex gap-3">
                <span className="mt-[0.7em] h-px w-3 shrink-0 bg-ink-faint" aria-hidden="true" />
                <span>{task}</span>
              </li>
            ))}
          </ul>
        )}
      />
    </Section>
  );
};

export default Experience;
