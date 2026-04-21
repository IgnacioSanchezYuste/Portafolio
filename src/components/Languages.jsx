import React from 'react';
import { Globe } from 'lucide-react';
import { useInView } from '../hooks/useInView';
import { useLanguage } from '../context/LanguageContext';

const englishCert = 'https://certificates.trinitycollege.com/e7b381f2-96c7-48c7-a6a5-2134ae454d95?key=492b318abeecc88efb07e568965547a0973673b164ac94a4271b0d3e17fd5142';

const Languages = () => {
  const [ref, inView] = useInView();
  const { t } = useLanguage();

  return (
    <div
      ref={ref}
      className={`section-card bg-gradient-to-br from-emerald-800/15 via-teal-800/10 to-transparent backdrop-blur-md p-8 md:p-10 border border-white/10 shadow-2xl reveal-left${inView ? ' in-view' : ''}`}
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl shadow-lg shadow-emerald-500/30">
          <Globe className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-white">{t.languages.title}</h2>
      </div>

      <div className="space-y-3">
        {t.languages.items.map((language, index) => {
          const content = (
            <div className="bg-white/[0.04] backdrop-blur-sm rounded-xl p-5 border border-white/10 hover:border-white/25 hover:bg-white/[0.07] transition-all">
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <span className="text-xl font-semibold text-white">{language.name}</span>
                <span className="px-4 py-1.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full font-medium text-sm shadow-lg shadow-emerald-500/20">
                  {language.level}
                </span>
              </div>
            </div>
          );

          return index === 0 ? (
            <a key={index} target="_blank" rel="noopener noreferrer" href={englishCert} className="block">
              {content}
            </a>
          ) : (
            <div key={index}>{content}</div>
          );
        })}
      </div>
    </div>
  );
};

export default Languages;
