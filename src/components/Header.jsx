import React from 'react';
import { MapPin, Mail, Phone, Github, Twitter } from 'lucide-react';

const Header = () => {
  return (
    <header className="anim-slide-down relative overflow-hidden bg-gradient-to-r from-purple-800/20 to-indigo-800/20 backdrop-blur-sm border-b border-white/10">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row items-center gap-8">

          {/* Profile Image */}
          <div className="anim-scale-in anim-delay-300 relative">
            <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-gradient-to-r from-purple-400 to-indigo-400 shadow-2xl">
              <img
                src="/img/yo.jpg"
                alt="Ignacio Sánchez Yuste - Desarrollador de aplicaciones multiplataforma"
                width={192}
                height={192}
                className="w-full h-full object-cover"
                fetchpriority="high"
              />
            </div>
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-full blur opacity-30 animate-pulse -z-10"></div>
          </div>

          {/* Header Info */}
          <div className="flex-1 text-center lg:text-left">
            <h1 className="anim-slide-left anim-delay-400 text-4xl lg:text-6xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent mb-4">
              Ignacio Sánchez Yuste
            </h1>

            <p className="anim-slide-left anim-delay-500 text-xl lg:text-2xl text-purple-200 mb-6 font-medium">
              Desarrollador de Aplicaciones Multiplataforma
              <span className="block text-lg text-purple-300 mt-1">(en formación)</span>
            </p>

            {/* Contact Info */}
            <div className="anim-slide-up anim-delay-600 flex flex-wrap justify-center lg:justify-start gap-4 text-purple-200">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <MapPin className="w-4 h-4" />
                <span>Madridejos (Toledo)</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <Mail className="w-4 h-4" />
                <span>Ignaciosanchezyuste@gmail.com</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <Phone className="w-4 h-4" />
                <span>626 050 258</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="anim-slide-up anim-delay-700 flex justify-center lg:justify-start gap-4 mt-4">
              <a href="https://x.com/IgnacioSanchezY">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                  <Twitter className="w-4 h-4" />
                  <span>@IgnacioSanchezY</span>
                </div>
              </a>
              <a href="https://github.com/IgnacioSanchezYuste">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                  <Github className="w-4 h-4" />
                  <span>Portfolio/GitHub</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
