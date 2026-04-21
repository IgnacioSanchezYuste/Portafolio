import React from 'react';
import { Code2, Layers, Monitor, Database, Cpu } from 'lucide-react';
import { useInView } from '../hooks/useInView';
import { useLanguage } from '../context/LanguageContext';

const categoryStyles = [
  { icon: Code2, gradient: 'from-blue-500 to-cyan-400', glow: 'rgba(56,189,248,0.35)', wide: true },
  { icon: Layers, gradient: 'from-violet-500 to-fuchsia-500', glow: 'rgba(217,70,239,0.35)' },
  { icon: Monitor, gradient: 'from-emerald-500 to-teal-400', glow: 'rgba(45,212,191,0.35)' },
  { icon: Database, gradient: 'from-amber-500 to-orange-500', glow: 'rgba(251,146,60,0.35)' },
  { icon: Cpu, gradient: 'from-rose-500 to-pink-500', glow: 'rgba(244,114,182,0.35)' },
];

const skillMeta = {
  // Languages
  'Java': { slug: 'openjdk', hex: 'ED8B00' },
  'Kotlin': { slug: 'kotlin', hex: '7F52FF' },
  'C#': { slug: 'csharp', hex: '9B4F96' },
  'Python': { slug: 'python', hex: '3776AB' },
  'JavaScript': { slug: 'javascript', hex: 'F7DF1E' },
  'TypeScript': { slug: 'typescript', hex: '3178C6' },
  'HTML5': { slug: 'html5', hex: 'E34F26' },
  'CSS': { slug: 'css3', hex: '1572B6' },
  'SQL': { slug: 'mysql', hex: '4479A1' },
  'XML': { slug: 'xmldotcom', hex: '0060AC' },
  'JSON': { slug: 'json', hex: 'F5F5F5' },
  'XSL': { slug: 'w3c', hex: '005A9C' },
  // Frameworks
  '.NET': { slug: 'dotnet', hex: '512BD4' },
  'React': { slug: 'react', hex: '61DAFB' },
  'React Native': { slug: 'react', hex: '61DAFB' },
  // Environments
  'Android Studio': { slug: 'androidstudio', hex: '3DDC84' },
  'Visual Studio': { slug: 'visualstudio', hex: '5C2D91' },
  'VS Code': { slug: 'visualstudiocode', hex: '007ACC' },
  'Eclipse': { slug: 'eclipseide', hex: '2C2255' },
  // Databases
  'MySQL': { slug: 'mysql', hex: '4479A1' },
  'PostgreSQL': { slug: 'postgresql', hex: '4169E1' },
  'Relacionales': { hex: 'F59E0B' },
  'Relational DBs': { hex: 'F59E0B' },
  // Systems
  'Windows': { slug: 'windows11', hex: '0078D4' },
  'Linux (Ubuntu, Kali)': { slug: 'linux', hex: 'FCC624' },
  'Hardware y software': { hex: 'F472B6' },
  'Hardware & Software': { hex: 'F472B6' },
};

const Skills = () => {
  const [ref, inView] = useInView();
  const { t } = useLanguage();

  return (
    <div ref={ref} className={`relative reveal-up${inView ? ' in-view' : ''}`}>
      <div className="section-card bg-gradient-to-br from-indigo-800/15 via-cyan-800/10 to-transparent backdrop-blur-md p-8 md:p-10 border border-white/10 shadow-2xl">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-xl shadow-lg shadow-cyan-500/30">
            <Code2 className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white">{t.skills.title}</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {t.skills.categories.map((category, index) => {
            const style = categoryStyles[index] || categoryStyles[0];
            const Icon = style.icon;
            return (
              <div
                key={index}
                className={`group relative bg-white/[0.04] backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/25 transition-all overflow-hidden ${style.wide ? 'md:col-span-2' : ''}`}
              >
                <div
                  className={`absolute -inset-px bg-gradient-to-br ${style.gradient} opacity-0 group-hover:opacity-10 transition-opacity rounded-2xl pointer-events-none`}
                />
                <div
                  className="absolute -top-16 -right-16 w-40 h-40 rounded-full blur-3xl opacity-40 pointer-events-none"
                  style={{ background: style.glow }}
                />
                <div className="relative">
                  <div className="flex items-center gap-3 mb-5">
                    <div className={`p-2.5 bg-gradient-to-r ${style.gradient} rounded-lg shadow-lg`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white">{category.title}</h3>
                    <span className="ml-auto text-xs text-white/40 font-mono">
                      {String(category.skills.length).padStart(2, '0')}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, skillIndex) => {
                      const meta = skillMeta[skill] || { hex: 'A78BFA' };
                      return (
                        <span
                          key={skillIndex}
                          className="skill-badge"
                          style={{ '--skill-glow': `#${meta.hex}` }}
                        >
                          {meta.slug && (
                            <img
                              src={`https://cdn.simpleicons.org/${meta.slug}/${meta.hex}`}
                              alt=""
                              width={14}
                              height={14}
                              loading="lazy"
                              className="skill-badge-icon"
                              onError={(e) => { e.currentTarget.style.display = 'none'; }}
                            />
                          )}
                          <span>{skill}</span>
                        </span>
                      );
                    })}
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
