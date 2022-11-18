import './index.scss';
import langs from './libs/langs';
import birdsData from './libs/birds';
// import din from './assets/sound/din.mp3';

const app = document.querySelector('#app');

function allowTransition() {
  app.classList.remove('prevent-transition');
}

globalThis.addEventListener('load', allowTransition);

console.log(birdsData.en[4][5]);
console.log(langs);

// function play() {
//   const audio = new Audio(din);
//   audio.play();
// }

// const restart = document.querySelector('.result__button');

// restart.addEventListener('click', play);

const playButton = document.querySelector('.play');
const volumeButton = document.querySelector('.volume');

function startSound() {
  this.classList.toggle('play_pause');
}

function setVolume() {
  this.classList.toggle('volume_mute');
}

playButton.addEventListener('click', startSound);
volumeButton.addEventListener('click', setVolume);
