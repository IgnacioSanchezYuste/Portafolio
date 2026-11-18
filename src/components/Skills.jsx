import React from 'react';
import Section from './ui/Section';
import SkillsPhysics from './effects/SkillsPhysics';
import { useLanguage } from '../context/LanguageContext';

const Skills = () => {
  const { t } = useLanguage();
  const playground = t.skills.categories
    .filter((c) => !['Sistemas', 'Systems'].includes(c.title))
    .flatMap((c) => c.skills);

  return (
    <Section id="skills" index="06" label={t.skills.title}>
      <SkillsPhysics skills={playground} hint={t.skills.hint} />

      <dl className="mt-10 border-b border-ink-line">
        {t.skills.categories.map((category) => (
          <div
            key={category.title}
            className="grid gap-x-8 gap-y-2 border-t border-ink-line py-4 sm:grid-cols-[170px_1fr]"
          >
            <dt className="text-sm text-ink-muted">{category.title}</dt>
            <dd className="text-sm leading-relaxed text-ink-text">{category.skills.join(' · ')}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
};

export default Skills;
