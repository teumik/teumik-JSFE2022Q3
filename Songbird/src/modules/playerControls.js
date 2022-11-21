// import { getDefaultBird } from './quiz';
// import { birdSound } from './sounds';

// const audio = {};

// export function togglePlay() {
//   this.classList.toggle('play_pause');
//   const { src } = getDefaultBird().audio;
//   const { id } = getDefaultBird();
//   audio[id] = {};
//   audio[id].sound = birdSound(src);
//   audio[id].src = src;
//   audio[id].isPlay = true;
//   console.log(audio[id].sound);
//   audio.play();
// }

// export function toggleVolume() {
//   this.classList.toggle('volume_mute');
// }

// export default function changePlayerState(event) {
//   const playButton = event.target.closest('.play');
//   const volumeButton = event.target.closest('.volume');

//   if (playButton) {
//     togglePlay.call(playButton);
//   }

//   if (volumeButton) {
//     toggleVolume.call(volumeButton);
//   }
// }

// globalThis.addEventListener('click', changePlayerState);
