import './index.scss';
import './modules/menu';
import './modules/langSettings';
import './modules/toggle';
import './modules/localStorage';
import './modules/clickLinks';

const app = document.querySelector('#app');

function allowTransition() {
  app.classList.remove('prevent-transition');
}

globalThis.addEventListener('load', allowTransition);
