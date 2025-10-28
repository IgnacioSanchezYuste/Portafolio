import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react';
import { Button } from './ui/button';
import { useToast } from './ui/use-toast';

const Contact = () => {
  const { toast } = useToast();

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
    <motion.section
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="relative"
    >
      <div className="bg-gradient-to-r from-violet-800/20 to-purple-800/20 backdrop-blur-sm rounded-3xl p-8 border border-white/10 shadow-2xl">
        <div className="text-center mb-8">
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl font-bold bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent mb-4"
          >
            ¡Conectemos!
          </motion.h2>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
            className="text-lg text-violet-200"
          >
            Estoy disponible para nuevas oportunidades y colaboraciones
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            viewport={{ once: true }}
          >
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
          </motion.div>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
          >
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
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default Contact;