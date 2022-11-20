import birdsData from '../libs/birds';
import { getLang } from './langSettings';

// const birdsMatrix = birdsData[getLang()];

function insertCorrectAnswers(node, bird) {
  for (const el in node) {
    if (el === 'image') {
      node[el].src = bird[el];
    } else if (el === 'audio') {
      node[el].src = bird[el];
    } else {
      node[el].innerHTML = bird[el];
    }
  }
}

function initNodesDefault(node) {
  return {
    audio: node.querySelector('.audio'),
    name: node.querySelector('.caption__header'),
    image: node.querySelector('.description__image'),
    species: node.querySelector('.caption__subheader'),
    description: node.querySelector('.description__text'),
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
  const result = makeGalleryitem(birdsData[getLang()]);
  target.append(...result);
}

export default setGallery;
