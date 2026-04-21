import React from 'react';
import { Rocket, ExternalLink, Gamepad2, Trophy, ScanLine, Laugh } from 'lucide-react';
import { useInView } from '../hooks/useInView';
import { useTilt } from '../hooks/useTilt';
import { useLanguage } from '../context/LanguageContext';

const projectsMeta = [
  {
    url: 'https://ignaciosanchezyuste.es/PadelMaster/',
    icon: Gamepad2,
    gradient: 'from-emerald-500 to-teal-500',
  },
  {
    url: 'https://ignaciosanchezyuste.es/BowLeague/',
    icon: Trophy,
    gradient: 'from-amber-500 to-orange-500',
  },
  {
    url: 'https://github.com/IgnacioSanchezYuste/BarCodesScaner',
    icon: ScanLine,
    gradient: 'from-cyan-500 to-blue-500',
  },
  {
    url: 'https://github.com/IgnacioSanchezYuste/ChistesJPA',
    icon: Laugh,
    gradient: 'from-pink-500 to-rose-500',
  },
];

const ProjectCard = ({ project, meta, t }) => {
  const tiltRef = useTilt(6);
  const Icon = meta.icon;
  return (
    <a
      ref={tiltRef}
      href={meta.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`tilt-card group relative bg-white/[0.04] backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-white/30 cursor-pointer overflow-hidden block`}
    >
      <div className={`absolute -inset-px bg-gradient-to-br ${meta.gradient} opacity-0 group-hover:opacity-20 rounded-2xl transition-opacity duration-500`} />
      <div className={`absolute -inset-20 bg-gradient-to-r ${meta.gradient} opacity-0 group-hover:opacity-30 blur-3xl transition-opacity duration-500 pointer-events-none`} />

      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-4">
          <div className={`p-3 bg-gradient-to-br ${meta.gradient} rounded-xl shadow-lg`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-300 group-hover:to-pink-300 transition-all duration-300">
              {project.title}
            </h3>
          </div>
          <ExternalLink className="w-5 h-5 text-purple-300 opacity-40 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
        </div>

        <p className="text-purple-100/80 text-sm leading-relaxed mb-5">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-5">
          {project.tags.map((tag, i) => (
            <span
              key={i}
              className={`px-3 py-1 bg-gradient-to-r ${meta.gradient} bg-opacity-20 text-white rounded-full text-xs font-medium border border-white/20`}
            >
              {tag}
            </span>
          ))}
        </div>

        <div className={`inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r ${meta.gradient} rounded-xl text-white text-sm font-semibold shadow-lg group-hover:shadow-xl transition-all`}>
          {t.projects.view}
          <ExternalLink className="w-4 h-4" />
        </div>
      </div>
    </a>
  );
};

const Projects = () => {
  const [ref, inView] = useInView();
  const { t } = useLanguage();

  return (
    <div ref={ref} className={`relative reveal-up${inView ? ' in-view' : ''}`}>
      <div className="section-card bg-gradient-to-br from-violet-800/15 via-fuchsia-800/10 to-transparent backdrop-blur-md p-8 md:p-10 border border-white/10 shadow-2xl">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-xl shadow-lg shadow-fuchsia-500/30">
            <Rocket className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white">{t.projects.title}</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {t.projects.items.map((project, index) => (
            <ProjectCard
              key={index}
              project={project}
              meta={projectsMeta[index]}
              t={t}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
