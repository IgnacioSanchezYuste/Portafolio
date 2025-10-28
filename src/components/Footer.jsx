import React from 'react';
import { motion } from 'framer-motion';
import { Code, ExternalLink } from 'lucide-react';
import { Button } from './ui/button';

const Footer = () => {
  const githubUrl = "https://github.com/IgnacioSanchezYuste";

  const handleSourceCodeClick = () => {
    window.open(githubUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.footer
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="bg-slate-900/50 backdrop-blur-sm border-t border-white/10 py-6 mt-16"
    >
      <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-purple-300 text-sm">
          © {new Date().getFullYear()} Ignacio Sánchez Yuste. Todos los derechos reservados.
        </p>
        <Button
          onClick={handleSourceCodeClick}
          variant="outline"
          className="bg-transparent border-purple-400 text-purple-300 hover:bg-purple-400/20 hover:text-white transition-colors duration-300"
        >
          <Code className="w-4 h-4 mr-2" />
          Ver Código en GitHub
          <ExternalLink className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </motion.footer>
  );
};

export default Footer;