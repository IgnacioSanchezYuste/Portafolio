import React from 'react';
import Section from './ui/Section';
import { useLanguage } from '../context/LanguageContext';

const About = () => {
  const { t } = useLanguage();
  const [lead, ...rest] = t.about.paragraphs;

  return (
    <Section id="about" index="01" label={t.about.title}>
      <p className="max-w-3xl text-2xl leading-snug tracking-[-0.015em] text-ink-text md:text-[1.9rem]">
        {lead}
      </p>
      <div className="mt-8 max-w-2xl space-y-5 text-lg leading-relaxed text-ink-muted">
        {rest.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </Section>
  );
};

export default About;
