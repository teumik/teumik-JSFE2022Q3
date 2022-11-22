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

alert('Привет! Поздравляю с финальным таском этапа! Если найдешь ошибки в моей работе, пожалуйста, напиши мне. Всегда на связи, оперативно отвечу и исправлю. Спасибо тебе! \nDiscord: teumik#1795\nTelegram: teumik')
