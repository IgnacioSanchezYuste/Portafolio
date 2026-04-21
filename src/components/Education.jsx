import React from 'react';
import { GraduationCap, Calendar } from 'lucide-react';
import { useInView } from '../hooks/useInView';
import { useLanguage } from '../context/LanguageContext';

const Education = () => {
  const [ref, inView] = useInView();
  const { t } = useLanguage();

  return (
    <div ref={ref} className={`relative reveal-up${inView ? ' in-view' : ''}`}>
      <div className="section-card bg-gradient-to-br from-indigo-800/15 via-purple-800/10 to-transparent backdrop-blur-md p-8 md:p-10 border border-white/10 shadow-2xl">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl shadow-lg shadow-indigo-500/30">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white">{t.education.title}</h2>
        </div>

        <div className="space-y-6">
          {t.education.items.map((edu, index) => (
            <div
              key={index}
              className={`relative pl-8 border-l-2 border-indigo-400/40 reveal-left${inView ? ' in-view' : ''}`}
              style={{ transitionDelay: inView ? `${index * 150}ms` : '0ms' }}
            >
              <div className="absolute -left-2 top-3 w-4 h-4 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full shadow-[0_0_15px_rgba(129,140,248,0.6)]"></div>
              <div className="bg-white/[0.04] backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-white/25 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                  <h3 className="text-xl font-bold text-white">{edu.title}</h3>
                  {edu.current && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-green-500/15 text-green-300 border border-green-500/30">
                      <span className="pulse-dot" style={{ width: 6, height: 6 }} />
                      {t.education.ongoing}
                    </span>
                  )}
                </div>
                <p className="text-indigo-200 font-medium mb-2">{edu.institution}</p>
                <div className="flex items-center gap-2 text-purple-300 text-sm">
                  <Calendar className="w-4 h-4" />
                  <span>{edu.period}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Education;
