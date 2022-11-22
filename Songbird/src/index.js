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

alert('Привет! Поздравляю с финальным таском этапа! Если найдешь ошибки в моей работе, пожалуйста, напиши мне. Всегда на связи, оперативно отвечу и исправлю. Спасибо тебе! \nDiscord: teumik#1795\nTelegram: teumik\nТак же прошу обратить внимание на данную фразу в ТЗ:\nСтраница с результатами.\n1. Отображается после завершения викторины, содержит набранные в ходе игры баллы\nВ ТЗ нет информации, что должна быть отдельная страница в меню и также нет информации, что там должны быть резульататы прошлых игр.');
