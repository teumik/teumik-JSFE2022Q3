import { playClickSound } from './sounds';

function checkLink(event) {
  const isLogoLink = event.target.closest('.logo__link');
  const isGitLink = event.target.closest('.git');
  const isRssLink = event.target.closest('.rss');
  if (isLogoLink || isGitLink || isRssLink) {
    playClickSound();
  }
}

globalThis.addEventListener('click', checkLink);
