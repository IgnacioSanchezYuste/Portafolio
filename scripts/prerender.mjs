// Injects the server-rendered app into dist/index.html after `vite build`.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ssrDir = path.join(root, '.ssr');
const indexPath = path.join(root, 'dist', 'index.html');

const { render } = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href);
const appHtml = render();

const template = fs.readFileSync(indexPath, 'utf8');
if (!template.includes('<div id="root"></div>')) {
  throw new Error('Could not find <div id="root"></div> in dist/index.html');
}
fs.writeFileSync(indexPath, template.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`));
fs.rmSync(ssrDir, { recursive: true, force: true });

console.log(`Prerendered dist/index.html (${(appHtml.length / 1024).toFixed(1)} kB of HTML)`);
