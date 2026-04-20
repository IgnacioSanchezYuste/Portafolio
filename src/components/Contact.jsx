import React from 'react';
import { Mail, Phone } from 'lucide-react';
import { Button } from './ui/button';
import { useToast } from './ui/use-toast';
import { useInView } from '../hooks/useInView';

const Contact = () => {
  const { toast } = useToast();
  const [ref, inView] = useInView();

  const handleContact = (method) => {
    toast({
      title: "¡Contacto disponible!",
      description: `El ${method} se ha copiado al portapapeles.`,
      duration: 5000,
    });
  };

  function copiarTexto(id) {
    const texto = document.getElementById(id).innerText;
    navigator.clipboard.writeText(texto)
      .catch(err => console.error("Error al copiar:", err));
  }

  return (
    <section ref={ref} className={`relative reveal-up${inView ? ' in-view' : ''}`}>
      <div className="bg-gradient-to-r from-violet-800/20 to-purple-800/20 backdrop-blur-sm rounded-3xl p-8 border border-white/10 shadow-2xl">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent mb-4">
            ¡Conectemos!
          </h2>
          <p className="text-lg text-violet-200">
            Estoy disponible para nuevas oportunidades y colaboraciones
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-4">
          <Button
            onClick={() => { handleContact('email'); copiarTexto('texto'); }}
            className="w-full h-auto p-6 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 border-0 rounded-xl flex flex-col items-center gap-3 text-white shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Mail className="w-8 h-8" />
            <div className="text-center">
              <div className="font-semibold">Email</div>
              <div id="texto" className="text-xs opacity-90">ignaciosanchezyuste@gmail.com</div>
            </div>
          </Button>

          <Button
            onClick={() => { handleContact('teléfono'); copiarTexto('texto1'); }}
            className="w-full h-auto p-6 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 border-0 rounded-xl flex flex-col items-center gap-3 text-white shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Phone className="w-8 h-8" />
            <div className="text-center">
              <div className="font-semibold">Teléfono</div>
              <div id="texto1" className="text-xs opacity-90">626050258</div>
            </div>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Contact;
