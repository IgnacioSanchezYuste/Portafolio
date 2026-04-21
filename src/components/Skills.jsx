import React from 'react';
import { Code, Database, Monitor, Settings } from 'lucide-react';
import { useInView } from '../hooks/useInView';
import { useLanguage } from '../context/LanguageContext';

const icons = [Code, Monitor, Database, Settings];
const colors = [
  'from-blue-500 to-cyan-500',
  'from-green-500 to-emerald-500',
  'from-purple-500 to-violet-500',
  'from-orange-500 to-red-500',
];

const Skills = () => {
  const [ref, inView] = useInView();
  const { t } = useLanguage();

  return (
    <div ref={ref} className={`relative reveal-up${inView ? ' in-view' : ''}`}>
      <div className="section-card bg-gradient-to-br from-indigo-800/15 via-cyan-800/10 to-transparent backdrop-blur-md p-8 md:p-10 border border-white/10 shadow-2xl">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-xl shadow-lg shadow-cyan-500/30">
            <Code className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white">{t.skills.title}</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {t.skills.categories.map((category, index) => {
            const Icon = icons[index] || Code;
            const color = colors[index] || colors[0];
            return (
              <div
                key={index}
                className="group relative bg-white/[0.04] backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/25 transition-all overflow-hidden"
              >
                <div className={`absolute -inset-px bg-gradient-to-br ${color} opacity-0 group-hover:opacity-10 transition-opacity rounded-2xl`} />
                <div className="relative">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-2 bg-gradient-to-r ${color} rounded-lg shadow-lg`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white">{category.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className={`px-3 py-1 bg-gradient-to-r ${color} bg-opacity-20 text-white rounded-full text-sm font-medium border border-white/20 hover:scale-105 transition-transform cursor-default`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Skills;
