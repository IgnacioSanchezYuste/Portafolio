import React from 'react';
import { MapPin, Mail, Phone, Github, Twitter, ArrowRight, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import TypingText from './ui/TypingText';

const Header = () => {
  const { t } = useLanguage();

  const scrollTo = (id) => (e) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="relative overflow-hidden pt-24 pb-12 md:pt-32 md:pb-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-10 lg:gap-16">

          {/* Left column — text */}
          <div className="flex-1 text-center lg:text-left">
            {/* Availability badge */}
            <div className="anim-slide-down inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/30 text-green-300 text-xs font-medium mb-6 backdrop-blur-sm">
              <span className="pulse-dot" />
              {t.common.available}
            </div>

            {/* Greeting */}
            <p className="anim-slide-left anim-delay-100 text-lg text-purple-200/80 mb-2">
              <Sparkles className="inline w-4 h-4 mr-1 text-purple-300" />
              {t.common.greeting} 👋 {t.common.iAm}
            </p>

            {/* Name */}
            <h1 className="anim-slide-left anim-delay-200 text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight mb-4 leading-[1.05]">
              <span className="block bg-gradient-to-r from-white via-purple-100 to-white bg-clip-text text-transparent animate-gradient">
                Ignacio Sánchez
              </span>
              <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent animate-gradient">
                Yuste
              </span>
            </h1>

            {/* Typing subtitle */}
            <p className="anim-slide-left anim-delay-300 text-xl lg:text-2xl text-purple-100 font-medium mb-2 min-h-[1.8em]">
              <TypingText phrases={t.header.typing} />
            </p>
            <p className="anim-slide-left anim-delay-400 text-sm text-purple-300/70 mb-8">
              {t.header.role} <span className="opacity-70">({t.header.subtitle})</span>
            </p>

            {/* Contact pills */}
            <div className="anim-slide-up anim-delay-500 flex flex-wrap justify-center lg:justify-start gap-2.5 text-sm text-purple-100 mb-6">
              <span className="flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-3.5 py-1.5">
                <MapPin className="w-3.5 h-3.5 text-purple-300" />
                {t.common.location}
              </span>
              <span className="flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-3.5 py-1.5">
                <Mail className="w-3.5 h-3.5 text-purple-300" />
                Ignaciosanchezyuste@gmail.com
              </span>
              <span className="flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-3.5 py-1.5">
                <Phone className="w-3.5 h-3.5 text-purple-300" />
                626 050 258
              </span>
            </div>

            {/* CTA buttons */}
            <div className="anim-slide-up anim-delay-600 flex flex-wrap justify-center lg:justify-start gap-3 mb-6">
              <a
                href="#contact"
                onClick={scrollTo('contact')}
                className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-[1.03] transition-all"
              >
                {t.header.ctaContact}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#projects"
                onClick={scrollTo('projects')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/15 text-white font-semibold hover:bg-white/10 hover:border-white/30 transition-all"
              >
                {t.header.ctaProjects}
              </a>
            </div>

            {/* Social links */}
            <div className="anim-slide-up anim-delay-700 flex justify-center lg:justify-start gap-3">
              <a
                href="https://x.com/IgnacioSanchezY"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter/X"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-purple-300/40 text-purple-200 hover:text-white transition-all"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://github.com/IgnacioSanchezYuste"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-purple-300/40 text-purple-200 hover:text-white transition-all"
              >
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right column — profile image */}
          <div className="anim-scale-in anim-delay-300 relative shrink-0">
            <div className="relative anim-float">
              <div className="absolute -inset-6 bg-gradient-to-r from-purple-500/40 via-pink-500/40 to-indigo-500/40 rounded-full blur-2xl opacity-70"></div>
              <div className="relative w-52 h-52 md:w-60 md:h-60 lg:w-72 lg:h-72 rounded-full overflow-hidden border-2 border-white/20 shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-transparent z-10 pointer-events-none"></div>
                <img
                  src="/img/yo.jpg"
                  alt="Ignacio Sánchez Yuste"
                  width={288}
                  height={288}
                  className="w-full h-full object-cover"
                  fetchpriority="high"
                />
              </div>
              {/* Decorative ring */}
              <div className="absolute -inset-2 rounded-full border border-white/10 pointer-events-none"></div>
              <div className="absolute -inset-6 rounded-full border border-purple-400/20 pointer-events-none"></div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
