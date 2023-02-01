import birdsData from '../libs/birds';
import { getLang } from './langSettings';
import { AudioComponent } from './sounds';

let allPlayers = [];

function stopAllPlayers(players) {
  function stopPlayers(event) {
    const menuItem = event.target.closest('.menu__item');

    if (!menuItem) return;

    players.forEach((el) => {
      if (el.isPlay) {
        el.playSound();
      }
    });
  }

  globalThis.addEventListener('click', stopPlayers);
}

function insertCorrectAnswers(node, bird) {
  allPlayers = [];
  for (const el in node) {
    if (el === 'image') {
      node[el].src = bird[el];
    } else if (el === 'wrap') {
      const { audio, name, id } = bird;
      node.audio = new AudioComponent(audio, name, id, node[el]);
      const elem = node.audio;
      allPlayers.push(elem);
    } else {
      node[el].innerHTML = bird[el];
    }
  }
  stopAllPlayers(allPlayers);
}

function initNodesDefault(node) {
  return {
    name: node.querySelector('.caption__header'),
    image: node.querySelector('.description__image'),
    species: node.querySelector('.caption__subheader'),
    description: node.querySelector('.description__text'),
    wrap: node.querySelector('.player'),
  };
}

function getAnswerNode() {
  const templateNode = document.querySelector('#answer')
    .content.cloneNode(true)
    .querySelector('.game__description');
  return templateNode;
}

function makeGalleryitem(levels) {
  const filledNodes = [];

  for (const birds of levels) {
    for (const bird of birds) {
      const templateNode = getAnswerNode();
      templateNode.classList.add('birds__item');
      const nodes = initNodesDefault(templateNode);
      insertCorrectAnswers(nodes, bird);
      filledNodes.push(templateNode);
    }
  }

  return filledNodes;
}

function setGallery() {
  const mainNode = document.querySelector('.main');
  const target = mainNode.querySelector('.gallery__birds');
  if (!target) return;
  const result = makeGalleryitem(birdsData[getLang()]);
  target.replaceChildren(...result);
}

export default setGallery;
