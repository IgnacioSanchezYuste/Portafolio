import React from 'react';
import { User } from 'lucide-react';
import { useInView } from '../hooks/useInView';
import { useLanguage } from '../context/LanguageContext';

const About = () => {
  const [ref, inView] = useInView();
  const { t } = useLanguage();

  return (
    <div ref={ref} className={`relative reveal-up${inView ? ' in-view' : ''}`}>
      <div className="section-card bg-gradient-to-br from-purple-800/15 via-indigo-800/10 to-transparent backdrop-blur-md p-8 md:p-10 border border-white/10 shadow-2xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-xl shadow-lg shadow-purple-500/30">
            <User className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white">{t.about.title}</h2>
        </div>

        <p className="text-lg text-purple-100 leading-relaxed">
          {t.about.intro}{' '}
          <span className="text-purple-300 font-semibold">{t.about.highlight1}</span>
          {t.about.middle1}{' '}
          <span className="text-purple-300 font-semibold">{t.about.highlight2}</span>{' '}
          {t.about.middle2}{' '}
          <span className="text-purple-300 font-semibold">{t.about.highlight3}</span>{' '}
          {t.about.outro}
        </p>
      </div>
    </div>
  );
};

export default About;
