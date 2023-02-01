import correctSound from '../assets/sound/correct.mp3';
import incorrectSound from '../assets/sound/incorrect.mp3';
import clickSound from '../assets/sound/click.mp3';
import winSound from '../assets/sound/win.mp3';

function soundLoader(src) {
  const audio = new Audio(src);
  audio.preload = 'metadata';
  return audio;
}

export class AudioComponent {
  constructor(src, name, id, target) {
    const player = document.querySelector('#player')
      .content.cloneNode(true)
      .querySelector('.player');
    this.playButton = player.querySelector('.play');
    this.volumeButton = player.querySelector('.volume');
    this.duration = player.querySelector('.line_duration');
    this.volume = player.querySelector('.line_volume');
    this.durationThumb = this.duration.querySelector('.line__thumb');
    this.durationWidth = this.duration.firstElementChild;
    this.volumeThumb = this.volume.querySelector('.line__thumb');
    this.volumeWidth = this.volume.firstElementChild;
    this.currentTime = player.querySelector('.player__duration_current');
    this.durationTime = player.querySelector('.player__duration_total');

    this.id = id;
    this.name = name;
    this.isPlay = false;
    this.isMute = false;
    this.volumeState = 0.5;
    this.currentDurationState = 0;
    this.totalDurationState = 0;
    this.audio = new Audio(src);
    this.audio.preload = 'metadata';

    this.refreshVolumeState();

    const context = this;

    this.player = player;
    this.playButton.onclick = this.playSound.bind(context);
    this.volumeButton.onclick = this.muteSound.bind(context);
    this.audio.onloadedmetadata = this.getDurationTime.bind(context);
    this.audio.onended = this.playSound.bind(context);
    this.volumeThumb.onmousedown = this.volumeThumbMove.bind(context);
    this.volumeThumb.ondragstart = () => false;
    this.durationThumb.onmousedown = this.durationThumbMove.bind(context);
    this.durationThumb.ondragstart = () => false;

    this.timeUpdateEventHandler = this.setCurrentDurationWidth.bind(context);
    this.audio.ontimeupdate = this.timeUpdateEventHandler;

    target.replaceWith(this.player);
  }

  durationThumbMove(event) {
    this.audio.ontimeupdate = null;
    const context = this;
    this.hub(context, event, context.durationThumb);
  }

  volumeThumbMove(event) {
    const context = this;
    this.hub(context, event, context.volumeThumb);
  }

  hub(context, event, node) {
    const thumbWidth = node.getBoundingClientRect().width / 2;
    const thumbPageX = node.getBoundingClientRect().left;
    const parentWidth = node
      .parentElement
      .parentElement
      .getBoundingClientRect().width;
    const parentPageX = node
      .parentElement
      .parentElement
      .getBoundingClientRect().left;

    const shiftX = event.clientX - thumbPageX;

    const nodeParent = node.parentElement.parentElement;

    function onGrab(pageX) {
      let width = ((pageX - parentPageX - shiftX + thumbWidth) / parentWidth) * 100;
      if (width <= 0) {
        width = 0;
      }
      if (width >= 100) {
        width = 100;
      }
      node.parentElement.style.width = `${width}%`;

      if (nodeParent.classList.contains('line_volume')) {
        if (width <= 7) {
          width = 0;
        }
        if (width >= 93) {
          width = 100;
        }
        context.volumeState = width / 100;
        context.refreshVolumeState();
      }

      if (nodeParent.classList.contains('line_duration')) {
        const playback = (context.totalDurationState * width) / 100;
        context.currentDurationState = playback;
        context.insertTime(Math.floor(playback), context.currentTime);
      }
    }

    function onSlide(alsoEvent) {
      onGrab(alsoEvent.pageX);
    }

    onGrab(event.pageX);

    document.addEventListener('mousemove', onSlide);

    node.onmouseup = () => {
      if (nodeParent.classList.contains('line_duration')) {
        context.refreshPlayState();
      }
      context.audio.ontimeupdate = this.timeUpdateEventHandler;
      document.removeEventListener('mousemove', onSlide);
      node.onmouseup = null;
    };

    document.onmouseup = () => {
      if (nodeParent.classList.contains('line_duration')) {
        context.refreshPlayState();
      }
      context.audio.ontimeupdate = this.timeUpdateEventHandler;
      document.removeEventListener('mousemove', onSlide);
      node.onmouseup = null;
    };
  }

  convertTime(d) {
    const min = Math.floor(d / 60);
    const sec = d % 60;
    const mm = min.toString().padStart(2, 0);
    const ss = sec.toString().padStart(2, 0);
    return `${mm}:${ss}`;
  }

  insertTime(duration, node) {
    const time = this.convertTime(duration);
    if (node.classList.contains('player__duration_total')) {
      node.classList.remove('player__duration_spin');
    }
    node.innerHTML = time;
  }

  getDurationTime() {
    const duration = Math.floor(this.audio.duration);
    this.insertTime.call(this, duration, this.durationTime);
    this.totalDurationState = duration;
    return duration;
  }

  getCurrentTime() {
    const current = Math.floor(this.audio.currentTime);
    this.insertTime.call(this, current, this.currentTime);
    return current;
  }

  refreshVolumeState() {
    this.audio.volume = this.volumeState;
    this.volumeWidth.style.width = `${this.audio.volume * 100}%`;
    if (this.volumeState === 0) {
      this.volumeButton.classList.add('volume_mute');
      this.isMute = true;
    } else {
      this.volumeButton.classList.remove('volume_mute');
      this.isMute = false;
    }
  }

  setCurrentDurationWidth() {
    this.getCurrentTime();
    this.currentDurationState = this.audio.currentTime;
    this.durationWidth.style.width = `${(this.audio.currentTime * 100) / this.audio.duration}%`;
  }

  refreshPlayState() {
    this.audio.currentTime = this.currentDurationState;
    this.durationWidth.style.width = `${(this.audio.currentTime * 100) / this.audio.duration}%`;
  }

  muteSound() {
    if (this.isMute) {
      this.volumeState = 0.5;
      this.isMute = false;
    } else {
      this.volumeState = 0;
      this.isMute = true;
    }
    this.refreshVolumeState();
  }

  playSound(event) {
    if (event) {
      if (event.type === 'ended') {
        this.currentDurationState = 0;
        this.refreshPlayState();
      }
    }
    if (this.isPlay) {
      this.audio.pause();
      this.isPlay = false;
      this.playButton.classList.remove('play_pause');
    } else {
      this.audio.play();
      this.isPlay = true;
      this.playButton.classList.add('play_pause');
    }
  }
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

export function birdSound(src) {
  return soundLoader(src);
}

export default soundLoader;
