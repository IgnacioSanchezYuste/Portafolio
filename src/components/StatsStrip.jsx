import React, { useEffect, useState } from 'react';
import { Rocket, Code2, Clock, Trophy } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useInView } from '../hooks/useInView';

const Counter = ({ value, active, duration = 1400, suffix = '' }) => {
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!active) return;
    let start = null;
    let raf;
    const tick = (ts) => {
      if (start === null) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setN(Math.floor(value * eased));
      if (progress < 1) raf = requestAnimationFrame(tick);
      else setN(value);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, value, duration]);

  return <>{n}{suffix}</>;
};

const StatsStrip = () => {
  const { t } = useLanguage();
  const [ref, inView] = useInView(0.25);

  const stats = [
    { value: 2, suffix: '+', label: t.stats.projects, icon: Rocket, color: 'from-emerald-400 to-teal-400' },
    { value: 8, suffix: '+', label: t.stats.languages, icon: Code2, color: 'from-blue-400 to-cyan-400' },
    { value: 400, suffix: 'h', label: t.stats.hours, icon: Clock, color: 'from-purple-400 to-pink-400' },
    { value: 1, suffix: '', label: t.stats.awards, icon: Trophy, color: 'from-amber-400 to-orange-400' },
  ];

  return (
    <div
      ref={ref}
      className={`grid grid-cols-2 md:grid-cols-4 gap-4 reveal-up${inView ? ' in-view' : ''}`}
    >
      {stats.map((s, i) => (
        <div
          key={i}
          className="relative group bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-2xl p-6 text-center overflow-hidden hover:border-white/25 transition-colors"
        >
          <div className={`absolute -inset-1 bg-gradient-to-r ${s.color} opacity-0 group-hover:opacity-20 blur-2xl transition-opacity`} />
          <div className="relative">
            <s.icon className="w-6 h-6 mx-auto mb-2 text-white/70" />
            <div className={`text-4xl lg:text-5xl font-extrabold bg-gradient-to-r ${s.color} bg-clip-text text-transparent tabular-nums`}>
              <Counter value={s.value} suffix={s.suffix} active={inView} />
            </div>
            <div className="text-xs md:text-sm text-purple-100/70 mt-1.5 uppercase tracking-wider font-medium">
              {s.label}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsStrip;
