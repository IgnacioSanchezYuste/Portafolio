import React from 'react';
import { Brain, Users, Zap, MessageCircle, Clock } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const skills = [
  { text: "Pensamiento crítico y resolución de problemas", icon: Brain },
  { text: "Trabajo en equipo en entornos multidisciplinares", icon: Users },
  { text: "Adaptabilidad y aprendizaje continuo", icon: Zap },
  { text: "Comunicación clara y orientación a resultados", icon: MessageCircle },
  { text: "Gestión del tiempo y organización en proyectos", icon: Clock },
];

const SoftSkills = () => {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={`bg-gradient-to-r from-rose-800/20 to-pink-800/20 backdrop-blur-sm rounded-3xl p-8 border border-white/10 shadow-2xl reveal-right${inView ? ' in-view' : ''}`}
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-gradient-to-r from-rose-500 to-pink-500 rounded-xl">
          <Brain className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-white">Soft Skills</h2>
      </div>

      <div className="space-y-3">
        {skills.map((skill, index) => (
          <div
            key={index}
            className="flex items-center gap-3 bg-white/5 backdrop-blur-sm rounded-lg p-3 border border-white/10"
          >
            <skill.icon className="w-5 h-5 text-rose-400 flex-shrink-0" />
            <span className="text-white">{skill.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SoftSkills;
