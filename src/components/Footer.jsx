import React from 'react';
import { Code, ExternalLink } from 'lucide-react';
import { Button } from './ui/button';
import { useLanguage } from '../context/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();
  const githubUrl = 'https://github.com/IgnacioSanchezYuste';

  return (
    <footer className="relative border-t border-white/10 py-8 mt-16 backdrop-blur-sm bg-slate-950/40">
      <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4 max-w-6xl">
        <p className="text-purple-300/80 text-sm text-center sm:text-left">
          © {new Date().getFullYear()} Ignacio Sánchez Yuste. {t.footer.rights}.
        </p>
        <Button
          onClick={() => window.open(githubUrl, '_blank', 'noopener,noreferrer')}
          variant="outline"
          className="bg-transparent border-purple-400/50 text-purple-200 hover:bg-purple-400/10 hover:text-white hover:border-purple-300 transition-colors"
        >
          <Code className="w-4 h-4 mr-2" />
          {t.footer.github}
          <ExternalLink className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </footer>
  );
};

export default Footer;
