import React from 'react';
import Section from './ui/Section';
import { useLanguage } from '../context/LanguageContext';

const Skills = () => {
  const { t } = useLanguage();

  return (
    <Section id="skills" index="06" label={t.skills.title}>
      <dl className="border-b border-ink-line">
        {t.skills.categories.map((category) => (
          <div
            key={category.title}
            className="grid gap-x-8 gap-y-3 border-t border-ink-line py-6 sm:grid-cols-[170px_1fr]"
          >
            <dt className="pt-1 text-sm text-ink-muted">{category.title}</dt>
            <dd className="flex flex-wrap gap-2">
              {category.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-md border border-ink-line bg-ink-surface px-2.5 py-1 text-sm text-ink-text"
                >
                  {skill}
                </span>
              ))}
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
};

export default Skills;
