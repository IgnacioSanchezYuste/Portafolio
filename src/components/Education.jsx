import React from 'react';
import Section from './ui/Section';
import { Timeline } from './Experience';
import { useLanguage } from '../context/LanguageContext';

const Education = () => {
  const { t } = useLanguage();

  return (
    <Section id="education" index="04" label={t.education.title}>
      <Timeline items={t.education.items} currentLabel={t.education.ongoing} />
    </Section>
  );
};

export default Education;
