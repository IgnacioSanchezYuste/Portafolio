import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Header from './components/Header';
import About from './components/About';
import Highlights from './components/Highlights';
import Experience from './components/Experience';
import Education from './components/Education';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Extras from './components/Extras';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { Toaster } from './components/ui/toaster';
import { useLanguage } from './context/LanguageContext';

function App() {
  const { lang } = useLanguage();

  useEffect(() => {
    document.title =
      lang === 'es'
        ? 'Ignacio Sánchez Yuste — Desarrollador FullStack'
        : 'Ignacio Sánchez Yuste — FullStack Developer';

    const description =
      lang === 'es'
        ? 'Portfolio de Ignacio Sánchez Yuste, desarrollador FullStack y co-fundador de Hyperfocus. Desarrollador de la web oficial de La Velada del Año VI. Apps, APIs, IA y automatización.'
        : 'Portfolio of Ignacio Sánchez Yuste, FullStack developer and co-founder of Hyperfocus. Developer of the official La Velada del Año VI website. Apps, APIs, AI and automation.';

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
      <div className="grain" aria-hidden="true" />
      <Navbar />
      <main>
        <Header />
        <About />
        <Highlights />
        <Experience />
        <Education />
        <Projects />
        <Skills />
        <Extras />
        <Contact />
      </main>
      <Footer />
      <Toaster />
    </>
  );
}

export default App;
