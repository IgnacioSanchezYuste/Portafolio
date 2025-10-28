import React from 'react';
import { motion } from 'framer-motion';
import { Code, Database, Monitor, Settings } from 'lucide-react';

const Skills = () => {
  const skillCategories = [
    {
      title: "Lenguajes",
      icon: Code,
      skills: ["Java", "Kotlin", "C#", "JavaScript", "SQL", "XML", "JSON", "XSL"],
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Entornos",
      icon: Monitor,
      skills: ["Android Studio", "Visual Studio", "Eclipse"],
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Bases de datos",
      icon: Database,
      skills: ["MySQL", "PostgreSQL", "Relacionales"],
      color: "from-purple-500 to-violet-500"
    },
    {
      title: "Sistemas",
      icon: Settings,
      skills: ["Windows", "Linux (Ubuntu, Kali)", "Hardware y software"],
      color: "from-orange-500 to-red-500"
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
      <div className="bg-gradient-to-r from-indigo-800/20 to-cyan-800/20 backdrop-blur-sm rounded-3xl p-8 border border-white/10 shadow-2xl">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-xl">
            <Code className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white">Competencias Técnicas</h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2 bg-gradient-to-r ${category.color} rounded-lg`}>
                  <category.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">{category.title}</h3>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <motion.span
                    key={skillIndex}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: (index * 0.1) + (skillIndex * 0.05), duration: 0.3 }}
                    viewport={{ once: true }}
                    className={`px-3 py-1 bg-gradient-to-r ${category.color} bg-opacity-20 text-white rounded-full text-sm font-medium border border-white/20`}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Skills;