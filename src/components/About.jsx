import React from 'react';
import { User } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const About = () => {
  const [ref, inView] = useInView();
  return (
    <section ref={ref} className={`relative reveal-up${inView ? ' in-view' : ''}`}>
      <div className="bg-gradient-to-r from-purple-800/20 to-indigo-800/20 backdrop-blur-sm rounded-3xl p-8 border border-white/10 shadow-2xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl">
            <User className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white">Perfil Profesional</h2>
        </div>
        <p className="text-lg text-purple-100 leading-relaxed">
          Apasionado por el desarrollo de aplicaciones multiplataforma. Me defino por mi capacidad de
          <span className="text-purple-300 font-semibold"> aprendizaje rápido</span>,
          <span className="text-purple-300 font-semibold"> mentalidad analítica</span> y
          <span className="text-purple-300 font-semibold"> orientación al trabajo en equipo</span> en entornos ágiles.
          Busco aportar valor en proyectos tecnológicos innovadores.
        </p>
      </div>
    </section>
  );
};

export default About;
