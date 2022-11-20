function togglePlay() {
  this.classList.toggle('play_pause');
}

function toggleVolume() {
  this.classList.toggle('volume_mute');
}

function changePlayerState(event) {
  const playButton = event.target.closest('.play');
  const volumeButton = event.target.closest('.volume');

  if (playButton) {
    togglePlay.call(playButton);
  }

  if (volumeButton) {
    toggleVolume.call(volumeButton);
  }
}

globalThis.addEventListener('click', changePlayerState);
