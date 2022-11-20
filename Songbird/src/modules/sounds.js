import correctSound from '../assets/sound/correct.mp3';
import incorrectSound from '../assets/sound/incorrect.mp3';
import clickSound from '../assets/sound/click.mp3';
import winSound from '../assets/sound/win.mp3';

function soundLoader(src) {
  const audio = new Audio(src);
  return audio;
}

export function playCorrectSound() {
  soundLoader(correctSound).play();
}

export function playIncorrectSound() {
  soundLoader(incorrectSound).play();
}

export function playClickSound() {
  soundLoader(clickSound).play();
}

export function playWinSound() {
  soundLoader(winSound).play();
}

export default soundLoader;
