import React from 'react';
import { Brain, Users, Zap, MessageCircle, Clock } from 'lucide-react';
import { useInView } from '../hooks/useInView';
import { useLanguage } from '../context/LanguageContext';

const icons = [Brain, Users, Zap, MessageCircle, Clock];

const SoftSkills = () => {
  const [ref, inView] = useInView();
  const { t } = useLanguage();

  return (
    <div
      ref={ref}
      className={`section-card bg-gradient-to-br from-rose-800/15 via-pink-800/10 to-transparent backdrop-blur-md p-8 md:p-10 border border-white/10 shadow-2xl reveal-right${inView ? ' in-view' : ''}`}
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-gradient-to-br from-rose-500 to-pink-500 rounded-xl shadow-lg shadow-rose-500/30">
          <Brain className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-white">{t.softSkills.title}</h2>
      </div>

      <div className="space-y-2.5">
        {t.softSkills.items.map((skill, index) => {
          const Icon = icons[index] || Brain;
          return (
            <div
              key={index}
              className="flex items-center gap-3 bg-white/[0.04] backdrop-blur-sm rounded-lg p-3 border border-white/10 hover:border-white/25 hover:translate-x-1 transition-all"
            >
              <Icon className="w-5 h-5 text-rose-400 flex-shrink-0" />
              <span className="text-white">{skill}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SoftSkills;
