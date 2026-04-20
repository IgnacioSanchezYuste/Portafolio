import React from 'react';
import { Helmet } from 'react-helmet';
import Header from './components/Header';
import About from './components/About';
import Education from './components/Education';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Projects from './components/Projects';
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
          <div className="relative z-10 anim-fade-in">
            <Header />
            <main className="container mx-auto px-4 py-8 space-y-16">
              <About />
              <Education />
              <Experience />
              <Skills />
              <Projects />
              <div className="grid md:grid-cols-2 gap-8">
                <Languages />
                <SoftSkills />
              </div>
              <OtherData />
              <Contact />
            </main>
          </div>
        </div>
        <Footer />
        <Toaster />
        <ChatWidgetWrapper />
      </div>
    </>
  );
}

export default App;
