import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import Section from './ui/Section';
import { useLanguage } from '../context/LanguageContext';

const englishCert =
  'https://certificates.trinitycollege.com/e7b381f2-96c7-48c7-a6a5-2134ae454d95?key=492b318abeecc88efb07e568965547a0973673b164ac94a4271b0d3e17fd5142';

const Heading = ({ children }) => (
  <h3 className="mb-4 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-faint">{children}</h3>
);

const Extras = () => {
  const { t } = useLanguage();

  return (
    <Section id="extras" index="07" label={t.otherData.section}>
      <div className="grid gap-12 lg:grid-cols-2">
        <div>
          <Heading>{t.otherData.title}</Heading>
          <ul className="border-b border-ink-line">
            {t.otherData.items.map((item) => (
              <li key={item.title} className="border-t border-ink-line py-4">
                <p className="text-ink-text">{item.title}</p>
                <p className="mt-0.5 text-sm text-ink-muted">{item.description}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-12">
          <div>
            <Heading>{t.languages.title}</Heading>
            <ul className="border-b border-ink-line">
              {t.languages.items.map((language, i) => (
                <li key={language.name} className="flex items-baseline justify-between gap-4 border-t border-ink-line py-4">
                  <span className="text-ink-text">{language.name}</span>
                  {i === 0 ? (
                    <a
                      href={englishCert}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-1 text-sm text-ink-muted hover:text-ink-text"
                    >
                      <span className="link-underline">{language.level}</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  ) : (
                    <span className="text-sm text-ink-muted">{language.level}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <Heading>{t.softSkills.title}</Heading>
            <ul className="border-b border-ink-line">
              {t.softSkills.items.map((skill) => (
                <li key={skill} className="border-t border-ink-line py-3 text-[15px] text-ink-muted">
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <figure className="mt-16">
        <div className="overflow-hidden rounded-lg border border-ink-line bg-ink-surface">
          <img
            src="/img/proyecto.jpg"
            alt={t.otherData.competitionTitle}
            width={1414}
            height={1010}
            loading="lazy"
            className="h-auto w-full object-cover"
          />
        </div>
        <figcaption className="mt-4 grid gap-2 sm:grid-cols-[170px_1fr] sm:gap-8">
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-faint">
            {t.otherData.competitionTitle}
          </span>
          <span className="text-sm leading-relaxed text-ink-muted">{t.otherData.competitionText}</span>
        </figcaption>
      </figure>
    </Section>
  );
};

export default Extras;
