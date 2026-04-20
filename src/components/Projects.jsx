import React from 'react';
import { Rocket, ExternalLink, Gamepad2, Trophy } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const projects = [
  {
    title: "PadelMaster",
    description:
      "Aplicación movil (adaptada a web) de gestión de productos de pádel. Explora y gestiona información detallada.",
    url: "https://ignaciosanchezyuste.es/PadelMaster/",
    icon: Gamepad2,
    gradient: "from-emerald-500 to-teal-500",
    bgGradient: "from-emerald-800/20 to-teal-800/20",
    tags: ["Gestión", "Pádel", "Web App"],
  },
  {
    title: "BowLeague",
    description:
      "Aplicación Movil (adaptada a web) para administrar ligas de bolos. Organiza, gestiona y sigue el progreso de ligas y torneos de bolos con estadísticas en tiempo real.",
    url: "https://ignaciosanchezyuste.es/BowLeague/",
    icon: Trophy,
    gradient: "from-amber-500 to-orange-500",
    bgGradient: "from-amber-800/20 to-orange-800/20",
    tags: ["Administración", "Bolos", "Ligas"],
  },
];

const Projects = () => {
  const [ref, inView] = useInView();
  return (
    <section ref={ref} className={`relative reveal-up${inView ? ' in-view' : ''}`}>
      <div className="bg-gradient-to-r from-violet-800/20 to-fuchsia-800/20 backdrop-blur-sm rounded-3xl p-8 border border-white/10 shadow-2xl">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-xl">
            <Rocket className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white">Mis Proyectos</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <a
              key={index}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 hover:scale-[1.02] hover:-translate-y-1 active:scale-[0.98] transition-all duration-200 cursor-pointer overflow-hidden"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-r ${project.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl`}
              ></div>

              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-4">
                  <div className={`p-3 bg-gradient-to-r ${project.gradient} rounded-xl shadow-lg`}>
                    <project.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-300 group-hover:to-pink-300 transition-all duration-300">
                      {project.title}
                    </h3>
                  </div>
                  <ExternalLink className="w-5 h-5 text-purple-300 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-0 -translate-x-2" />
                </div>

                <p className="text-purple-200/80 text-sm leading-relaxed mb-5">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-5">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className={`px-3 py-1 bg-gradient-to-r ${project.gradient} bg-opacity-20 text-white rounded-full text-xs font-medium border border-white/20`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className={`inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r ${project.gradient} rounded-xl text-white text-sm font-semibold shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                  Ver Proyecto
                  <ExternalLink className="w-4 h-4" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
