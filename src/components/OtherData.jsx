import React from 'react';
import { Award, Shield, Car, Trophy } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const achievements = [
  {
    icon: Shield,
    title: "Curso PRL (30h)",
    description: "Prevención de Riesgos Laborales",
  },
  {
    icon: Car,
    title: "Permiso de conducir B1",
    description: "Licencia de conducción",
  },
  {
    icon: Trophy,
    title: "Ganador provincial de Automatización UCLM",
    description: "Concurso de automatización 2023",
  },
];

const OtherData = () => {
  const [ref, inView] = useInView();
  return (
    <section ref={ref} className={`relative reveal-up${inView ? ' in-view' : ''}`}>
      <div className="bg-gradient-to-r from-amber-800/20 to-orange-800/20 backdrop-blur-sm rounded-3xl p-8 border border-white/10 shadow-2xl">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl">
            <Award className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white">Otros Datos</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-colors duration-300"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg">
                  <achievement.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white">{achievement.title}</h3>
              </div>
              <p className="text-amber-200">{achievement.description}</p>
            </div>
          ))}
        </div>

        {/* Competition Image */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-400" />
            Concurso de Automatización UCLM 2023
          </h3>
          <div className="rounded-xl overflow-hidden shadow-2xl">
            <img
              src="/img/proyecto.jpg"
              alt="Concurso de Automatización UCLM 2023 - Proyecto ganador"
              width={1414}
              height={1010}
              className="w-full h-auto object-cover"
              loading="lazy"
            />
          </div>
          <p className="text-amber-200 mt-4">
            Proyecto ganador del concurso provincial de automatización, demostrando habilidades en
            desarrollo de sistemas automatizados y resolución de problemas técnicos complejos.
          </p>
        </div>
      </div>
    </section>
  );
};

export default OtherData;
