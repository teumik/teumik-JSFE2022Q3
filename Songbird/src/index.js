import './index.scss';
import './modules/menu';
import './modules/playerControls';
import './modules/langSettings';
import './modules/toggle';
import './modules/localStorage';

const app = document.querySelector('#app');

function allowTransition() {
  app.classList.remove('prevent-transition');
}

globalThis.addEventListener('load', allowTransition);
