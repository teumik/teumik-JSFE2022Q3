import { changeLang } from './langSettings';

function replaceWith(elem) {
  const main = document.querySelector('.main');
  main.replaceWith(elem);
}

function searchTemplate(dataName) {
  const template = document.querySelector(`#${dataName}`);
  const elem = template.content.cloneNode(true);

  return elem;
}

function setData(node, score, n) {
  const main = node.querySelector('.main');
  const scorePoints = node.querySelector('.result__point');

  scorePoints.innerHTML = score;

  if (score === n * (n - 1)) {
    main.classList.add('result_win');
  }
}

function showResult(score, n) {
  const elem = searchTemplate('result');
  setData(elem, score, n);
  replaceWith(elem);
  changeLang();
}

export default showResult;
