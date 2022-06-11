// PACKAGES IMPORT
import 'regenerator-runtime';

// SCRIPTS IMPORT
import { $ } from './utils/querySelector-helper.js';
import App from './views/app.js';
import swRegister from './utils/sw-register.js';

// STYLES IMPORT
import '../styles/index.css';
import '../styles/icons.css';

const content = $('main.content');
const app = new App({ content });

window.addEventListener('DOMContentLoaded', () => {
  swRegister();
  app.renderPage();
});

window.addEventListener('hashchange', () => {
  app.renderPage();
});