import React from 'react';
import { Code, Database, Monitor, Settings } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const skillCategories = [
  {
    title: "Lenguajes",
    icon: Code,
    skills: ["Java", "Kotlin", "C#", "JavaScript", "SQL", "XML", "JSON", "XSL"],
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Entornos",
    icon: Monitor,
    skills: ["Android Studio", "Visual Studio", "Eclipse"],
    color: "from-green-500 to-emerald-500",
  },
  {
    title: "Bases de datos",
    icon: Database,
    skills: ["MySQL", "PostgreSQL", "Relacionales"],
    color: "from-purple-500 to-violet-500",
  },
  {
    title: "Sistemas",
    icon: Settings,
    skills: ["Windows", "Linux (Ubuntu, Kali)", "Hardware y software"],
    color: "from-orange-500 to-red-500",
  },
];

const Skills = () => {
  const [ref, inView] = useInView();
  return (
    <section ref={ref} className={`relative reveal-up${inView ? ' in-view' : ''}`}>
      <div className="bg-gradient-to-r from-indigo-800/20 to-cyan-800/20 backdrop-blur-sm rounded-3xl p-8 border border-white/10 shadow-2xl">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-xl">
            <Code className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white">Competencias Técnicas</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {skillCategories.map((category, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-colors duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2 bg-gradient-to-r ${category.color} rounded-lg`}>
                  <category.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">{category.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className={`px-3 py-1 bg-gradient-to-r ${category.color} bg-opacity-20 text-white rounded-full text-sm font-medium border border-white/20`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
