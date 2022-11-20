import setGallery from './gallery';
import { setLang, getLang } from './langSettings';
import {
  getLevel,
  getBirdId,
  getCurrentBird,
  getDefaultBird,
} from './quiz';
import birdsData from '../libs/birds';

function insertCorrectAnswers(current, bird) {
  for (const prop in current) {
    if (prop !== 'audio') {
      if (prop === 'image') {
        current[prop].src = bird[prop];
      } else if (prop === 'id') {
        current[prop] = bird[prop];
      } else {
        current[prop].innerHTML = bird[prop];
      }
    }
  }
}

function translateOptions(choices, guessLevel) {
  if (choices) {
    [...choices.children].forEach((node, i) => {
      node.lastElementChild.innerHTML = guessLevel[i].name;
    });
  }
}

function translateHelper() {
  const choices = document.querySelector('.game__choices');
  const guessLevel = birdsData[getLang()][getLevel()];
  const guessBird = guessLevel[getBirdId()];
  if (getDefaultBird()) {
    if (getDefaultBird().isGuess) {
      getDefaultBird().name.innerHTML = guessBird.name;
    }
    if (getCurrentBird().id) {
      insertCorrectAnswers(getCurrentBird(), guessLevel[getCurrentBird().id - 1]);
    }
  }
  // if (getDefaultBird().isGuess) {
  //   getDefaultBird().name.innerHTML = guessBird.name;
  // }
  // if (getCurrentBird().id) {
  //   insertCorrectAnswers(getCurrentBird(), guessLevel[getCurrentBird().id - 1]);
  // }
  translateOptions(choices, guessLevel);
}

function toggleLang(event) {
  const toggle = event.target.closest('.toggle');
  if (toggle) {
    toggle.classList.toggle('toggle_active');
    [...toggle.children].forEach((node) => {
      if (!node.classList.contains('toggle__lang_active')) {
        setLang(node.dataset.langId);
      }
      node.classList.toggle('toggle__lang_active');
    });
    setGallery();

    translateHelper();
  }
}

globalThis.addEventListener('click', toggleLang);
