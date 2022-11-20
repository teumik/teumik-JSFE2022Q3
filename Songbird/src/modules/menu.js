import startGame from './quiz';
import setGallery from './gallery';
import { changeLang } from './langSettings';

function changeMenuStatus(dataName) {
  const menuItems = document.querySelectorAll('.menu__item');
  menuItems.forEach((el) => {
    el.classList.remove('menu__item_active');
    if (el.firstElementChild.dataset.name === dataName) {
      el.classList.add('menu__item_active');
    }
  });
}

function replaceWith(elem, dataName) {
  const main = document.querySelector('.main');
  main.replaceWith(elem);

  if (dataName === 'quiz') {
    startGame();
  }

  if (dataName === 'gallery') {
    setGallery();
  }

  return main;
}

function searchTemplate(dataName) {
  const template = document.querySelector(`#${dataName}`);
  const elem = template.content.cloneNode(true);

  return elem;
}

function showPage(dataName) {
  const elem = searchTemplate(dataName);
  replaceWith(elem, dataName);
  changeLang();
  changeMenuStatus(dataName);
}

function checkPage(event) {
  const dataName = event.target.dataset.name;
  if (dataName) {
    showPage(dataName);
  }
}

showPage('welcome');
// showPage('gallery');
// showPage('quiz');

globalThis.addEventListener('click', checkPage);
