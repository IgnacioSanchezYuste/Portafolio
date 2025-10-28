import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Users, Zap, MessageCircle, Clock } from 'lucide-react';

const SoftSkills = () => {
  const skills = [
    { text: "Pensamiento crítico y resolución de problemas", icon: Brain },
    { text: "Trabajo en equipo en entornos multidisciplinares", icon: Users },
    { text: "Adaptabilidad y aprendizaje continuo", icon: Zap },
    { text: "Comunicación clara y orientación a resultados", icon: MessageCircle },
    { text: "Gestión del tiempo y organización en proyectos", icon: Clock }
  ];

  return (
    <motion.div
      initial={{ x: 50, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="bg-gradient-to-r from-rose-800/20 to-pink-800/20 backdrop-blur-sm rounded-3xl p-8 border border-white/10 shadow-2xl"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-gradient-to-r from-rose-500 to-pink-500 rounded-xl">
          <Brain className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-white">Soft Skills</h2>
      </div>
      
      <div className="space-y-3">
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 bg-white/5 backdrop-blur-sm rounded-lg p-3 border border-white/10"
          >
            <skill.icon className="w-5 h-5 text-rose-400 flex-shrink-0" />
            <span className="text-white">{skill.text}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default SoftSkills;