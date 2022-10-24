import './index.html';
import './index.scss';
import clickCells from './assets/audio/click_cells.mp3';
import misclick from './assets/audio/misclick.mp3';
import menuClick from './assets/audio/click_menu.mp3';
import menuSound from './assets/audio/menu.mp3';
import winSound from './assets/audio/win.mp3';

import { BasicNode } from './modules/basicNode';
export { BasicNode };
import { settings } from './modules/settings';
export { settings };
import { buttonsWrapper } from './modules/buttons';
export { buttonsWrapper };
import { moves } from './modules/moves';
export { moves };
import { time } from './modules/time';
export { time };
import { fieldInfo, size } from './modules/fieldInfo';
export { fieldInfo, size };
import { menu } from './modules/menu';
export { menu };
import { overlay } from './modules/overlay';
export { overlay };

import { header } from './modules/header';
import { makeField } from './modules/field';
import { footer } from './modules/footer';
import _ from 'lodash';

// MAKE DOM

const wrapper = new BasicNode('div', 'wrapper', undefined);
wrapper.append(header, makeField(settings.field), footer);
document.body.append(wrapper);

// GET DOM

const items = document.querySelectorAll('.field__item');
const field = document.querySelector('.field');
const menuButton = document.querySelector('.buttons__item');
const count = document.querySelector('.moves__count');
// const min = document.querySelector('.time__minutes');
// const sec = document.querySelector('.time__seconds');
const timeContent = document.querySelector('.time__content');

// VARIABLE

let matrix = makeMatrix(Array.from(items).map(item => Number(item.dataset.id)));

// LISTENERS

globalThis.addEventListener('resize', resize);
field.addEventListener('click', detectCell);
menuButton.addEventListener('click', openMenu);
menu.addEventListener('click', methodTrigger);

// TIMER

let stopwatch;

class Timer {
  constructor() {
    this.timer = {
      min: 0,
      sec: 0,
    }
    this.isGo = false;
  }

  start() {
    this.interval = setInterval(() => {
      console.log(this.timer);
      if (this.timer.sec >= 59) {
        this.timer.min++;
        this.timer.sec = 0;
      } else {
        this.timer.sec++;
      }
      this.refresh();
      this.isGo = true;
    }, 1000);
  }

  stop() {
    clearInterval(this.interval);
    this.isGo = false;
  }

  refresh() {
    timeContent.innerHTML = `${String(this.timer.min).padStart(2, '0')}:${String(this.timer.sec).padStart(2, '0')}`;
  }

  reset() {
    clearInterval(this.interval);
    this.interval = null;
    timeContent.innerHTML = '00:00';
  }
}

// SOUND

function playSound(src) {
  if (settings.sound) {
    let audio = new Audio(src);
    audio.play();
  } else {
    console.log('Sound turn off');
    return;
  }
}

// GAME

class Game {
  newGame() {
    console.log('new game');
    matrix = makeMatrix(Array.from(items).map(item => Number(item.dataset.id)));
    flatter(matrix);
    openMenu();
    reset(settings);
    stopwatch = new Timer();
    stopwatch.start();
  }
  size() {
    console.log('size');
  }
  save() {
    console.log('save');
  }
  load() {
    console.log('load');
  }
  scores() {
    console.log('scores');
  }
  sound() {
    console.log('sound');
    settings.sound = !settings.sound;
    // console.log(settings.sound);
    // console.log(this);
  }
}

const game = new Game();

function methodTrigger(event) {
  if (event.target.classList.contains('menu__item')) {
    playSound(menuClick);
  }
  if (event.target.dataset.id) {
    game[event.target.dataset.id]();
    if (event.target.dataset.id === 'sound') {
      event.target.classList.toggle('menu__item_nosound')
    }
  }
}

// RESIZE

function resize(event) {
  if (field.offsetHeight !== field.offsetWidth) {
    field.style.width = field.offsetHeight + 'px';
  }
}

resize();

// MATRIX FROM ITEMS

function makeMatrix(items) {
  const size = Math.sqrt(items.length);
  let m = [];
  for (let i = 0; i < size; i++) {
    m.push([]);
  }
  let x = 0;
  let y = 0;
  for (let i = 0; i < items.length; i++) {
    if (x >= size) {
      x = 0;
      y++;
    }
    m[y][x] = items[i];
    x++;
  }
  return m;
}

// SET POSITION

setPositionItem(matrix);

function setPositionItem(m) {
  for (let y = 0; y < m.length; y++) {
    for (let x = 0; x < m[y].length; x++) {
      const v = m[y][x];
      const node = items[v - 1];
      setNodesStyle(node, x, y)
    }
  }
}

// SET STYLE

function setNodesStyle(node, x, y) {
  const shift = 100 / settings.field;
  node.style.top = y * shift + '%';
  node.style.left = x * shift + '%';
}

// FLATTER

function flatter(m) {
  matrix = makeMatrix(_.shuffle(m.flat()));
  setPositionItem(matrix);
}

// CLICK ON CELL

function detectCell(event) {
  const item = event.target.closest('.field__item');
  if (!item) return;
  if (item.classList.contains('field__item_blank')) return;

  const target = Number(item.dataset.id);
  const blank = Number(this.children.length);

  const buttonCoords = detectMatrixPosition(target, matrix);
  const blankCoords = detectMatrixPosition(blank, matrix);

  const isValid = validateSwap(buttonCoords, blankCoords);

  if (isValid) {
    swapMatrixItem(buttonCoords, blankCoords, matrix);
    setPositionItem(matrix);
    settings.count++;
    refreshStats(settings);
    playSound(clickCells);
  } else {
    playSound(misclick);
  }
}

// MATRIX POSITION

function detectMatrixPosition(item, m) {
  const coords = {};
  for (let y = 0; y < m.length; y++) {
    for (let x = 0; x < m[y].length; x++) {
      if (m[y][x] === item) {
        coords.y = y;
        coords.x = x;
        return coords;
      }
    }
  }
}

// VALIDATION

function validateSwap(buttonCoords, blankCoords) {
  const diffX = Math.abs(buttonCoords.x - blankCoords.x);
  const diffY = Math.abs(buttonCoords.y - blankCoords.y);
  if ((diffX === 1 || diffY === 1) && (buttonCoords.x === blankCoords.x || buttonCoords.y === blankCoords.y)) {
    return true;
  } else {
    return false;
  }
}

// SWAP

function swapMatrixItem(buttonCoords, blankCoords, m) {
  [matrix[buttonCoords.y][buttonCoords.x], matrix[blankCoords.y][blankCoords.x]] = [matrix[blankCoords.y][blankCoords.x], matrix[buttonCoords.y][buttonCoords.x]];
}

// MENU

function openMenu(event) {
  const menu = document.querySelector('.menu');
  const overlay = document.querySelector('.overlay');

  menu.classList.toggle('menu_open');

  if (menu.classList.contains('menu_open')) {
    playSound(menuSound);
  } else {
    playSound(menuClick);
  }

  overlay.classList.toggle('overlay_open');
  field.classList.toggle('field_open');

  overlay.addEventListener('click', openMenu);

  if (stopwatch) {
    if (stopwatch.isGo) {
      stopwatch.stop();
    } else {
      stopwatch.start();
    }
  }
}

// REFRESH

function refreshStats(settings) {
  count.innerHTML = settings.count;

}

// RESET

function reset(settings) {
  count.innerHTML = 0;
  settings.count = 0;
  if (stopwatch) {
    stopwatch.reset();
  }
}

// SOMETHINGSHIT
