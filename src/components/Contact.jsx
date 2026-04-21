import React from 'react';
import { Mail, Phone } from 'lucide-react';
import { Button } from './ui/button';
import { useToast } from './ui/use-toast';
import { useInView } from '../hooks/useInView';
import { useLanguage } from '../context/LanguageContext';

const Contact = () => {
  const { toast } = useToast();
  const [ref, inView] = useInView();
  const { t } = useLanguage();

  const copyAndToast = (text, description) => {
    navigator.clipboard.writeText(text).catch((err) => console.error('Clipboard error:', err));
    toast({
      title: t.contact.copied,
      description,
      duration: 4000,
    });
  };

  return (
    <div ref={ref} className={`relative reveal-up${inView ? ' in-view' : ''}`}>
      <div className="section-card bg-gradient-to-br from-violet-800/20 via-purple-800/15 to-transparent backdrop-blur-md p-8 md:p-12 border border-white/10 shadow-2xl">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-violet-300 via-purple-300 to-pink-300 bg-clip-text text-transparent mb-4 animate-gradient">
            {t.contact.title}
          </h2>
          <p className="text-lg text-violet-200">{t.contact.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
          <Button
            onClick={() => copyAndToast('ignaciosanchezyuste@gmail.com', t.contact.copiedEmail)}
            className="w-full h-auto p-6 bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 border-0 rounded-xl flex flex-col items-center gap-3 text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-[1.02] transition-all"
          >
            <Mail className="w-8 h-8" />
            <div className="text-center">
              <div className="font-semibold">{t.contact.email}</div>
              <div className="text-xs opacity-90">ignaciosanchezyuste@gmail.com</div>
            </div>
          </Button>

          <Button
            onClick={() => copyAndToast('626050258', t.contact.copiedPhone)}
            className="w-full h-auto p-6 bg-gradient-to-br from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 border-0 rounded-xl flex flex-col items-center gap-3 text-white shadow-lg shadow-green-500/30 hover:shadow-green-500/50 hover:scale-[1.02] transition-all"
          >
            <Phone className="w-8 h-8" />
            <div className="text-center">
              <div className="font-semibold">{t.contact.phone}</div>
              <div className="text-xs opacity-90">626 050 258</div>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
