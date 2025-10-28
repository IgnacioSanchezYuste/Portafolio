import React from 'react';
import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';

const Languages = () => {
  return (
    <motion.div
      initial={{ x: -50, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="bg-gradient-to-r from-emerald-800/20 to-teal-800/20 backdrop-blur-sm rounded-3xl p-8 border border-white/10 shadow-2xl"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl">
          <Globe className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-white">Idiomas</h2>
      </div>
      
      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 m-2">
        <div className="flex items-center justify-between">
          <span className="text-xl font-semibold text-white">Inglés</span>
          <span className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full font-medium">
            Nivel B2 (Trinity)
          </span>
        </div>
      </div>
      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 m-2">
        <div className="flex items-center justify-between">
          <span className="text-xl font-semibold text-white">Español</span>
          <span className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full font-medium">
            Nativo
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default Languages;