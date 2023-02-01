import birdsData from '../libs/birds';
import { getLang } from './langSettings';
import langsDictionary from '../libs/langs';
import shuffle from './shuffle';
import showResult from './result';
import defaultImage from '../assets/image/unknown.jpg';
import setQuestion from './question';
import {
  playClickSound,
  playWinSound,
  playIncorrectSound,
  playCorrectSound,
  AudioComponent,
} from './sounds';

const nodesData = {};

class Game {
  constructor() {
    this.birdId = 0;
    this.levelCount = 0;
    this.isWin = false;
    this.totalScore = 0;
    this.levelPoints = 5;
  }

  decreasePoints() {
    if (this.levelPoints !== 0) {
      this.levelPoints -= 1;
    }
  }

  refreshState() {
    const questionsCount = document.querySelector('.questions__count');
    questionsCount.innerHTML = this.totalScore;
    const nextButton = document.querySelector('.quiz__button');
    nextButton.disabled = !nextButton.disabled;
  }

  win() {
    this.isWin = true;
    this.totalScore += this.levelPoints;
    this.refreshState();
  }

  startRound() {
    this.isWin = false;
    this.levelCount += 1;
    this.levelPoints = 5;
  }
}

let game = new Game();

function setOptions(choices) {
  [...choices.children].forEach((el, i) => {
    el.dataset.answer = i + 1;
    el.firstElementChild.classList.remove('choices__input_correct');
    el.classList.remove('choices__option_correct');
    el.firstElementChild.classList.remove('choices__input_incorrect');
    el.classList.remove('choices__option_incorrect');
    el.lastElementChild.innerHTML = birdsData[getLang()][game.levelCount][i].name;
  });
}

function initNodesAnswer(answer) {
  return {
    id: null,
    audio: answer.querySelector('.audio'),
    name: answer.querySelector('.caption__header'),
    image: answer.querySelector('.description__image'),
    species: answer.querySelector('.caption__subheader'),
    description: answer.querySelector('.description__text'),
  };
}

function initNodesDefault(main) {
  return {
    id: null,
    audio: main.querySelector('.audio'),
    name: main.querySelector('.caption__header'),
    image: main.querySelector('.unknown__image'),
  };
}

function insertCorrectAnswers(elems, answer) {
  for (const el in elems) {
    if (typeof elems[el] !== 'boolean') {
      if (el === 'image') {
        elems[el].src = answer[el];
      } else if (el === 'id') {
        elems[el] = answer[el];
      } else if (el === 'audio') {
      } else if (el !== 'player') {
        elems[el].innerHTML = answer[el];
      }
    }
  }
}

function setGuessBird(answer) {
  const defaultPlayer = nodesData.mainNode.querySelector('.unknown__caption .player');
  const { audio, name, id } = answer;
  nodesData.elemsDefault.player = new AudioComponent(audio, name, id, defaultPlayer);
  nodesData.elemsDefault.id = answer.id;
  nodesData.elemsDefault.isGuess = false;
  game.birdId = answer.id;
}

function getAnswerNode() {
  const answerNode = document.querySelector('#answer')
    .content.cloneNode(true)
    .querySelector('.game__description');
  const mainNode = document.querySelector('.main');
  const choices = mainNode.querySelector('.choices');
  return { answerNode, mainNode, choices };
}

function startGame() {
  game = new Game();

  const { answerNode, mainNode, choices } = getAnswerNode();
  setOptions(choices);

  const answer = shuffle(birdsData[getLang()][game.levelCount]).pop();

  const elemsAnswer = initNodesAnswer(answerNode);
  const elemsDefault = initNodesDefault(mainNode);
  const target = mainNode.querySelector('.game__description');
  target.firstChild.innerHTML = langsDictionary[getLang()].quiz.defaultMessage;

  nodesData.answerNode = answerNode;
  nodesData.mainNode = mainNode;
  nodesData.elemsAnswer = elemsAnswer;
  nodesData.elemsDefault = elemsDefault;
  nodesData.answer = answer;
  nodesData.target = target;
  nodesData.choices = choices;

  setGuessBird(answer);

  setQuestion(nodesData.mainNode, game.levelCount);
}

function createArticleNode() {
  const article = document.createElement('article');
  article.classList.add('game__description', 'description');
  const p = document.createElement('p');
  p.dataset.lang = 'defaultMessage';
  p.innerHTML = langsDictionary[getLang()].quiz.defaultMessage;
  article.append(p);
  return article;
}

function replaceArticleNode() {
  const articleNode = createArticleNode();
  const target = document.querySelector('.game__description');
  target.replaceWith(articleNode);
  nodesData.target = articleNode;
}

function resetDefaultNode() {
  nodesData.elemsDefault.name.innerHTML = '***';
  nodesData.elemsDefault.image.src = defaultImage;
}

function next() {
  playClickSound();

  if (!game.isWin) return;

  if (game.isWin && (game.levelCount === (birdsData[getLang()].length - 1))) {
    showResult(game.totalScore, birdsData[getLang()].length);

    playWinSound();

    game = new Game();
    return;
  }

  if (game.levelCount === (birdsData[getLang()].length - 1)) return;

  replaceArticleNode();
  resetDefaultNode();

  game.startRound();
  setOptions(nodesData.choices);
  nodesData.answer = shuffle(birdsData[getLang()][game.levelCount]).pop();
  setGuessBird(nodesData.answer);

  setQuestion(nodesData.mainNode, game.levelCount);

  game.refreshState();
}

function checkAnswer(event) {
  if (event.target.dataset.id === 'next') {
    if (nodesData.currentPlayer) {
      if (nodesData.currentPlayer.isPlay) {
        nodesData.currentPlayer.playSound();
      }
    }

    if (nodesData.elemsDefault.player.isPlay) {
      nodesData.elemsDefault.player.playSound();
    }

    next();

    return;
  }

  const close = event.target.closest('.choices__option');

  if (!close) {
    return;
  }

  if (nodesData.currentPlayer) {
    if (nodesData.currentPlayer.isPlay) {
      nodesData.currentPlayer.playSound();
    }
  }

  const datasetAnswer = close.dataset.answer;
  const index = birdsData[getLang()][game.levelCount][datasetAnswer - 1];
  const replacer = nodesData.answerNode.querySelector('.player');

  const { audio, name, id } = index;
  nodesData.currentPlayer = new AudioComponent(audio, name, id, replacer);

  insertCorrectAnswers(nodesData.elemsAnswer, index);
  nodesData.target.replaceWith(nodesData.answerNode);

  if (datasetAnswer && !game.isWin) {
    if (Number(datasetAnswer) === game.birdId) {
      close.classList.add('choices__option_correct');
      close.firstElementChild.classList.add('choices__input_correct');
      insertCorrectAnswers(nodesData.elemsDefault, index);
      nodesData.elemsDefault.isGuess = true;
      game.win();
      playCorrectSound();

      if (nodesData.elemsDefault.player.isPlay) {
        nodesData.elemsDefault.player.playSound();
      }
    } else {
      if (close.classList.contains('choices__option_incorrect')) return;

      playIncorrectSound();

      close.classList.add('choices__option_incorrect');
      close.firstElementChild.classList.add('choices__input_incorrect');
      game.decreasePoints();
    }
  }
}

globalThis.addEventListener('click', checkAnswer);

function getLevel() {
  return game.levelCount;
}

function getBirdId() {
  return game.birdId - 1;
}

function getCurrentBird() {
  return nodesData.elemsAnswer;
}

function getDefaultBird() {
  return nodesData.elemsDefault;
}

export default startGame;
export {
  getLevel,
  getBirdId,
  getCurrentBird,
  getDefaultBird,
};
