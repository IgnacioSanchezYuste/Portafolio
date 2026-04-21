import React from 'react';
import { Award, Shield, Car, Trophy } from 'lucide-react';
import { useInView } from '../hooks/useInView';
import { useLanguage } from '../context/LanguageContext';

const icons = [Shield, Car, Trophy];

const OtherData = () => {
  const [ref, inView] = useInView();
  const { t } = useLanguage();

  return (
    <div ref={ref} className={`relative reveal-up${inView ? ' in-view' : ''}`}>
      <div className="section-card bg-gradient-to-br from-amber-800/15 via-orange-800/10 to-transparent backdrop-blur-md p-8 md:p-10 border border-white/10 shadow-2xl">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl shadow-lg shadow-amber-500/30">
            <Award className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white">{t.otherData.title}</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {t.otherData.items.map((achievement, index) => {
            const Icon = icons[index] || Award;
            return (
              <div
                key={index}
                className="group relative bg-white/[0.04] backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-white/25 hover:-translate-y-1 transition-all overflow-hidden"
              >
                <div className="absolute -inset-10 bg-gradient-to-br from-amber-500/30 to-orange-500/30 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity" />
                <div className="relative">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg shadow-lg">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-base font-bold text-white">{achievement.title}</h3>
                  </div>
                  <p className="text-amber-200/90 text-sm">{achievement.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Competition image */}
        <div className="bg-white/[0.04] backdrop-blur-sm rounded-xl p-6 border border-white/10">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-400" />
            {t.otherData.competitionTitle}
          </h3>
          <div className="rounded-xl overflow-hidden shadow-2xl ring-1 ring-white/10">
            <img
              src="/img/proyecto.jpg"
              alt={t.otherData.competitionTitle}
              width={1414}
              height={1010}
              className="w-full h-auto object-cover"
              loading="lazy"
            />
          </div>
          <p className="text-amber-100/90 mt-4">
            {t.otherData.competitionText}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OtherData;
