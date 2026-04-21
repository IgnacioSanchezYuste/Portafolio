import React from 'react';
import { Briefcase, Calendar, CheckCircle } from 'lucide-react';
import { useInView } from '../hooks/useInView';
import { useLanguage } from '../context/LanguageContext';

const Experience = () => {
  const [ref, inView] = useInView();
  const { t } = useLanguage();

  return (
    <div ref={ref} className={`relative reveal-up${inView ? ' in-view' : ''}`}>
      <div className="section-card bg-gradient-to-br from-purple-800/15 via-pink-800/10 to-transparent backdrop-blur-md p-8 md:p-10 border border-white/10 shadow-2xl">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl shadow-lg shadow-pink-500/30">
            <Briefcase className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white">{t.experience.title}</h2>
        </div>

        <div className="space-y-8">
          {t.experience.items.map((exp, index) => (
            <div
              key={index}
              className={`relative pl-8 border-l-2 border-pink-400/40 reveal-left${inView ? ' in-view' : ''}`}
              style={{ transitionDelay: inView ? `${index * 150}ms` : '0ms' }}
            >
              <div className="absolute -left-2 top-3 w-4 h-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full shadow-[0_0_15px_rgba(244,114,182,0.6)]"></div>
              <div className="bg-white/[0.04] backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-white/25 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                  <h3 className="text-xl font-bold text-white">{exp.title}</h3>
                  {exp.future && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-500/15 text-blue-300 border border-blue-500/30">
                      {t.experience.upcoming}
                    </span>
                  )}
                </div>
                <p className="text-purple-200 font-medium mb-2">{exp.company}</p>
                <div className="flex items-center gap-2 text-pink-300 mb-4 text-sm">
                  <Calendar className="w-4 h-4" />
                  <span>{exp.period}</span>
                </div>
                <div className="space-y-2">
                  {exp.tasks.map((task, taskIndex) => (
                    <div key={taskIndex} className="flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                      <span className="text-purple-100">{task}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Experience;
