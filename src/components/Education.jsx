import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Calendar } from 'lucide-react';

const Education = () => {
  const education = [
    {
      title: "FP Grado Superior DAM",
      institution: "I.E.S. Azarquiel, Toledo",
      period: "2024 – 2026",
      current: true
    },
    {
      title: "Bachillerato Tecnológico",
      institution: "I.E.S. Valdehierro, Madridejos",
      period: "2022 – 2024",
      current: false
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
      <div className="bg-gradient-to-r from-indigo-800/20 to-purple-800/20 backdrop-blur-sm rounded-3xl p-8 border border-white/10 shadow-2xl">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white">Formación Académica</h2>
        </div>
        
        <div className="space-y-6">
          {education.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              className="relative pl-8 border-l-2 border-gradient-to-b from-indigo-400 to-purple-400"
            >
              <div className="absolute -left-2 top-2 w-4 h-4 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full"></div>
              
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                  <h3 className="text-xl font-bold text-white">{edu.title}</h3>
                  {edu.current && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-300 border border-green-500/30">
                      En curso
                    </span>
                  )}
                </div>
                <p className="text-indigo-200 font-medium mb-2">{edu.institution}</p>
                <div className="flex items-center gap-2 text-purple-300">
                  <Calendar className="w-4 h-4" />
                  <span>{edu.period}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Education;