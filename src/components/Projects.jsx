import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import Section from './ui/Section';
import { useLanguage } from '../context/LanguageContext';

// Same order as t.projects.items. Drop a screenshot at `image` and it shows up on the card.
const projectsMeta = [
  { url: 'https://infolavelada.com', image: '/img/projects/velada.webp' },
  { url: 'https://github.com/IgnacioSanchezYuste/ChillPocket', image: '/img/projects/chillpocket.webp' },
  { url: 'https://github.com/IgnacioSanchezYuste/hypernews', image: '/img/projects/hypernews.webp' },
  { url: 'https://ignaciosanchezyuste.es/Inventra', image: '/img/projects/inventra.webp' },
  { url: 'https://ignaciosanchezyuste.es/spreadsheet-vue/', image: '/img/projects/spreadsheet.webp' },
  { url: 'https://ignaciosanchezyuste.es/PadelMaster/' },
  { url: 'https://ignaciosanchezyuste.es/BowLeague/' },
  { url: 'https://github.com/IgnacioSanchezYuste/BarCodesScaner' },
  { url: 'https://github.com/IgnacioSanchezYuste/ChistesJPA' },
];

const Thumb = ({ src, alt }) => {
  const [ok, setOk] = React.useState(true);
  if (!src || !ok) return null;
  return (
    <div className="mb-6 aspect-[16/10] overflow-hidden rounded-md border border-ink-line bg-ink-surface">
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onError={() => setOk(false)}
        className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.02]"
      />
    </div>
  );
};

const Projects = () => {
  const { t } = useLanguage();
  const items = t.projects.items;

  return (
    <Section id="projects" index="05" label={t.projects.title}>
      <div className="grid gap-px overflow-hidden rounded-xl border border-ink-line bg-ink-line sm:grid-cols-2">
        {items.map((project, i) => {
          const meta = projectsMeta[i];
          const lastOdd = i === items.length - 1 && items.length % 2 === 1;
          return (
            <a
              key={project.title}
              href={meta.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group flex flex-col bg-ink-bg p-6 transition-colors hover:bg-ink-surface md:p-7 ${
                lastOdd ? 'sm:col-span-2' : ''
              }`}
            >
              <Thumb src={meta.image} alt={project.title} />
              <div className="flex items-start justify-between gap-4">
                <span className="font-mono text-xs text-ink-faint">{String(i + 1).padStart(2, '0')}</span>
                <ArrowUpRight className="h-5 w-5 text-ink-faint transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink-accent" />
              </div>
              <h3 className="mt-6 text-xl font-medium tracking-[-0.015em] text-ink-text">{project.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-muted">{project.description}</p>
              <p className="mt-6 pt-1 font-mono text-[11px] uppercase tracking-[0.1em] text-ink-faint md:mt-auto">
                {project.tags.join(' / ')}
              </p>
            </a>
          );
        })}
      </div>
    </Section>
  );
};

export default Projects;
