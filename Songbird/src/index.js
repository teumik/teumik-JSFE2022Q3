import './index.scss';
import langs from './libs/langs';
import birdsData from './libs/birds';
// import din from './assets/sound/din.mp3';

const app = document.querySelector('#app');

function allowTransition() {
  app.classList.remove('prevent-transition');
}

globalThis.addEventListener('load', allowTransition);

console.log(birdsData);
console.log(langs);

// function play() {
//   const audio = new Audio(din);
//   audio.play();
// }

// const restart = document.querySelector('.result__button');

// restart.addEventListener('click', play);
