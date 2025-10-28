import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mail, Phone, Github, Twitter } from 'lucide-react';

const Header = () => {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative overflow-hidden bg-gradient-to-r from-purple-800/20 to-indigo-800/20 backdrop-blur-sm border-b border-white/10"
    >
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          {/* Profile Image */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="relative"
          >
            <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-gradient-to-r from-purple-400 to-indigo-400 shadow-2xl">
              <img 
                src="/img/yo.jpg"
                alt="Ignacio Sánchez Yuste - Desarrollador de aplicaciones multiplataforma"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-full blur opacity-30 animate-pulse"></div>
          </motion.div>

          {/* Header Info */}
          <div className="flex-1 text-center lg:text-left">
            <motion.h1
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent mb-4"
            >
              Ignacio Sánchez Yuste
            </motion.h1>
            
            <motion.p
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-xl lg:text-2xl text-purple-200 mb-6 font-medium"
            >
              Desarrollador de Aplicaciones Multiplataforma
              <span className="block text-lg text-purple-300 mt-1">(en formación)</span>
            </motion.p>

            {/* Contact Info */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-wrap justify-center lg:justify-start gap-4 text-purple-200"
            >
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
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="flex justify-center lg:justify-start gap-4 mt-4"
            >
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <Twitter className="w-4 h-4" />
                <span>@nachonsen06</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <Github className="w-4 h-4" />
                <span>Portfolio/GitHub</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;