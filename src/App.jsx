import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import Header from './components/Header';
import About from './components/About';
import Education from './components/Education';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Languages from './components/Languages';
import SoftSkills from './components/SoftSkills';
import OtherData from './components/OtherData';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { Toaster } from './components/ui/toaster';
import ChatWidgetWrapper from './components/ChatWidget';


function App() {
  return (
    
    <>
    
      <Helmet>
        <title>Ignacio Sánchez Yuste - Desarrollador DAM</title>
        <meta name="description" content="Portfolio digital de Ignacio Sánchez Yuste, desarrollador de aplicaciones multiplataforma en formación. Especializado en Java, Kotlin, C# y desarrollo móvil." />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 flex flex-col">
        <div className="relative flex-grow">
          {/* Background Pattern */}
          <div 
            className="absolute inset-0 opacity-20"
            style={{ backgroundImage: `url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')` }}
          ></div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative z-10"
          >
            <Header />
            <main className="container mx-auto px-4 py-8 space-y-16">
              <About />
              <Education />
              <Experience />
              <Skills />
              <div className="grid md:grid-cols-2 gap-8">
                <Languages />
                <SoftSkills />
              </div>
              <OtherData />
              <Contact />
            </main>
          </motion.div>
        </div>
        <Footer />
        <Toaster />
        <ChatWidgetWrapper />
      </div>
    </>
  );
}

export default App;