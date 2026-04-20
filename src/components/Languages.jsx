import React from 'react';
import { Globe } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const Languages = () => {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={`bg-gradient-to-r from-emerald-800/20 to-teal-800/20 backdrop-blur-sm rounded-3xl p-8 border border-white/10 shadow-2xl reveal-left${inView ? ' in-view' : ''}`}
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl">
          <Globe className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-white">Idiomas</h2>
      </div>

      <a target="_blank" rel="noopener noreferrer" href="https://certificates.trinitycollege.com/e7b381f2-96c7-48c7-a6a5-2134ae454d95?key=492b318abeecc88efb07e568965547a0973673b164ac94a4271b0d3e17fd5142">
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 m-2 hover:bg-white/10 transition-colors duration-200">
          <div className="flex items-center justify-between">
            <span className="text-xl font-semibold text-white">Inglés</span>
            <span className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full font-medium">
              Nivel B2 (Trinity)
            </span>
          </div>
        </div>
      </a>
      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 m-2">
        <div className="flex items-center justify-between">
          <span className="text-xl font-semibold text-white">Español</span>
          <span className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full font-medium">
            Nativo
          </span>
        </div>
      </div>
    </div>
  );
};

export default Languages;
