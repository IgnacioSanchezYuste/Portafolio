import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
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
import StatsStrip from './components/StatsStrip';
import AuroraBackground from './components/ui/AuroraBackground';
import ScrollProgress from './components/ui/ScrollProgress';
import { Toaster } from './components/ui/toaster';
import ChatWidgetWrapper from './components/ChatWidget';
import { useLanguage } from './context/LanguageContext';

function App() {
  const { lang } = useLanguage();

  useEffect(() => {
    document.title =
      lang === 'es'
        ? 'Ignacio Sánchez Yuste — Desarrollador DAM'
        : 'Ignacio Sánchez Yuste — DAM Developer';

    const description =
      lang === 'es'
        ? 'Portfolio digital de Ignacio Sánchez Yuste, desarrollador de aplicaciones multiplataforma en formación. Especializado en Java, Kotlin, C# y desarrollo móvil.'
        : 'Digital portfolio of Ignacio Sánchez Yuste, multi-platform application developer in training. Specialized in Java, Kotlin, C# and mobile development.';

    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    meta.content = description;
  }, [lang]);

  return (
    <>
      <AuroraBackground />
      <ScrollProgress />
      <Navbar />

      <div className="min-h-screen flex flex-col relative">
        <div className="relative flex-grow anim-fade-in">
          <Header />
          <main className="container mx-auto px-4 py-8 space-y-16 md:space-y-20 max-w-6xl">
            <section id="stats" className="pt-4">
              <StatsStrip />
            </section>
            <section id="about"><About /></section>
            <section id="education"><Education /></section>
            <section id="experience"><Experience /></section>
            <section id="skills"><Skills /></section>
            <section id="projects"><Projects /></section>
            <div className="grid md:grid-cols-2 gap-8">
              <Languages />
              <SoftSkills />
            </div>
            <OtherData />
            <section id="contact"><Contact /></section>
          </main>
        </div>
        <Footer />
        <Toaster />
        <ChatWidgetWrapper />
      </div>
    </>
  );
}

export default App;
