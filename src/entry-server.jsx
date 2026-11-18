import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';
import { LanguageProvider } from './context/LanguageContext';

// Used at build time by scripts/prerender.mjs so crawlers and CV parsers get real HTML.
export const render = () =>
  renderToString(
    <LanguageProvider>
      <App />
    </LanguageProvider>
  );
