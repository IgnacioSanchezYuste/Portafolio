import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, CheckCircle } from 'lucide-react';

const Experience = () => {
  const experiences = [
    {
      title: "Prácticas FP (300h)",
      company: "-",
      period: "Mar 2026 – May 2026",
      tasks: [
        "Desarrollo y mantenimiento de aplicaciones multiplataforma.",
        "Colaboración en entornos ágiles con metodologías SCRUM.",
        "Resolución de incidencias técnicas."
      ],
      future: true
    },
    {
      title: "Prácticas FP (100h)",
      company: "Kanzan Tech",
      period: "May 2025",
      tasks: [
        "Apoyo en proyectos de desarrollo web y móvil.",
        "Análisis y documentación de aplicaciones.",
        "Optimización de procesos internos."
      ],
      future: false
    }
  ];

  return (
    <motion.section
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="relative"
    >
      <div className="bg-gradient-to-r from-purple-800/20 to-pink-800/20 backdrop-blur-sm rounded-3xl p-8 border border-white/10 shadow-2xl">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
            <Briefcase className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white">Experiencia</h2>
        </div>
        
        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              className="relative pl-8 border-l-2 border-gradient-to-b from-purple-400 to-pink-400"
            >
              <div className="absolute -left-2 top-2 w-4 h-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
              
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                  <h3 className="text-xl font-bold text-white">{exp.title}</h3>
                  {exp.future && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-300 border border-blue-500/30">
                      Próximamente
                    </span>
                  )}
                </div>
                <p className="text-purple-200 font-medium mb-2">{exp.company}</p>
                <div className="flex items-center gap-2 text-pink-300 mb-4">
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
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Experience;