import './index.scss';

const app = document.querySelector('#app');

function allowTransition() {
  app.classList.remove('prevent-transition');
}

globalThis.addEventListener('load', allowTransition);
