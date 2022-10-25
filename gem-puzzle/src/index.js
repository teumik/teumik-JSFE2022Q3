alert('Доброго времени суток! Спасибо, что тратишь свое время на проверку моей работы! Если у тебя есть возможно, я попрошу проверить мою работу ближе к концу срока. Я очень хочу завершить ее и обещаю, что завтра будет доделана уже! Время 04:59 25.10. Всегда на связи: Discord teumik#1795, Telegram и GitHub: teumik ')

import './index.html';
import './index.scss';
import clickCells from './assets/audio/click_cells.mp3';
import misclick from './assets/audio/misclick.mp3';
import menuClick from './assets/audio/click_menu.mp3';
import menuSound from './assets/audio/menu.mp3';
import winSound from './assets/audio/win.mp3';

import { BasicNode } from './modules/basicNode';
export { BasicNode };
import { allert } from './modules/allert';
export { allert };
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
import { overlayRestart } from './modules/overlayRestart';
export { overlayRestart };

import { header } from './modules/header';
import { makeField } from './modules/field';
import { footer } from './modules/footer';
import _ from 'lodash';

// VARIABLE

let isGameStart = false;

let settings = {
  load: false,
  field: 4,
  count: 0,
  time: {
    min: 0,
    sec: 0,
  },
  matrix: [],
  sound: true,
  scores: [],
}

// PRELOAD

// MAKE DOM

const wrapper = new BasicNode('div', 'wrapper', undefined);
wrapper.append(header, makeField(settings.field), footer);
document.body.append(wrapper);

document.body.append(allert);
document.body.append(overlayRestart);

// GET DOM

const field = document.querySelector('.field');
let items = document.querySelectorAll('.field__item');
const menuButton = document.querySelector('.buttons__item');
const count = document.querySelector('.moves__count');
const timeContent = document.querySelector('.time__content');
const options = document.querySelector('.options');
const fieldSize = document.querySelector('.size');
const overlaySecond = document.querySelector('.overlay_restart');
const restart = document.querySelector('.restart');

// LISTENERS

globalThis.addEventListener('resize', resize);
field.addEventListener('click', detectCell);
menuButton.addEventListener('click', openMenu);
menu.addEventListener('click', methodTrigger);
restart.addEventListener('click', setRestart)

// VARIABLE

let matrix = makeMatrix(Array.from(items).map(item => Number(item.dataset.id)));
let reference = JSON.parse(JSON.stringify(matrix));

// BEFORELOAD

fieldSize.innerHTML = `${settings.field}x${settings.field}`;
timeContent.innerHTML = 'Practice'

// TIMER

let stopwatch;

class Timer {
  constructor() {
    this.timer = {
      min: 0,
      sec: 0,
    }
    this.isTimerOn = false;
  }

  start() {
    this.refresh();
    this.isTimerOn = true;
    this.interval = setInterval(() => {
      if (this.timer.sec >= 59) {
        this.timer.min++;
        this.timer.sec = 0;
      } else {
        this.timer.sec++;
      }
      this.refresh();
    }, 1000);
  }

  stop() {
    clearInterval(this.interval);
    this.isTimerOn = false;
  }

  refresh() {
    // console.log('refresh');
    // console.log(stopwatch);
    timeContent.innerHTML = `${String(this.timer.min).padStart(2, '0')}:${String(this.timer.sec).padStart(2, '0')}`;
    // settings.time.min = this.timer.min;
    // settings.time.sec = this.timer.sec;
  }

  reset() {
    // console.log('reset');
    clearInterval(this.interval);
    this.interval = null;
    if (!settings.load) {
      timeContent.innerHTML = '00:00';
    }
  }
}

// SOUND

function playSound(src) {
  if (settings.sound) {
    let audio = new Audio(src);
    audio.play();
  } else {
    // console.log('Sound turn off');
  }
}

// CHANGE STYLE


// GAME

class Game {
  continue() {
    openMenu();
    options.classList.remove('options_open');
  }

  newGame() {
    isGameStart = true;
    // console.log('new game');
    // console.log(settings);
    if (!settings.load) {
      matrix = makeMatrix(Array.from(items).map(item => Number(item.dataset.id)));
      flatter(matrix);
      reference = JSON.parse(JSON.stringify(matrix));
    } else {
      setPositionItem(matrix);
      reference = JSON.parse(JSON.stringify(matrix));
    }
    openMenu();
    reset(settings);
    stopwatch = new Timer();
    if (settings.load) {
      stopwatch.timer.min = settings.time.min;
      stopwatch.timer.sec = settings.time.sec;
    }
    stopwatch.start();
  }
  size() {
    // console.log('size');
    options.classList.toggle('options_open');
    options.addEventListener('click', setField);
  }
  save() {
    // console.log('save');
    settings.matrix = matrix;
    settings.time.min = stopwatch.timer.min;
    settings.time.sec = stopwatch.timer.sec;
    localStorage.game = JSON.stringify(settings);
  }
  load() {
    // console.log('load');
    settings = JSON.parse(localStorage.game);
    // console.log(settings, 'load');
    setField('load');
  }
  scores() {
    console.log('scores');
  }
  sound() {
    // console.log('sound');
    settings.sound = !settings.sound;
  }
}

let game = new Game();

// NEW FIELD

function setField(event) {
  if (event && event !== 'load') {
    if (event.target.classList.contains('options__item')) {
      const value = event.target.dataset.value;
      settings.field = Number(value);

      field.replaceChildren(...makeField(settings.field).children);
      items = document.querySelectorAll('.field__item');

      options.classList.toggle('options_open');
      fieldSize.innerHTML = `${value}x${value}`;

      game = new Game();
      game.newGame();
    }
  } else if (event === 'load') {
    field.replaceChildren(...makeField(settings.field).children);
    items = document.querySelectorAll('.field__item');

    fieldSize.innerHTML = `${settings.field}x${settings.field}`;

    matrix = settings.matrix;

    if (!settings.sound) {
      document.querySelector('[data-id="sound"]').classList.add('menu__item_nosound');
    }

    if (stopwatch) {
      stopwatch.reset();
    }

    settings.load = true;
    game = new Game();
    game.newGame();
    settings.load = false;
  }
}

// TRIGGER

function methodTrigger(event) {
  if (event.target.classList.contains('menu__item')) {
    playSound(menuClick);
  }
  if (event.target.dataset.id) {
    game[event.target.dataset.id]();
    if (event.target.dataset.id === 'sound') {
      event.target.classList.toggle('menu__item_nosound');
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

  let isMatrix = isMatrixCompete(matrix);

  if (isMatrix && isGameStart) {
    stopwatch.stop();
    allert.firstElementChild.innerHTML = `Hooray! You solved the puzzle in ${stopwatch.timer.min + ':' + stopwatch.timer.sec} and ${settings.count + 1} moves`;
    allert.classList.add('allert_open');
    overlaySecond.classList.add('overlay_restart_open');

    let data = prepareScore(settings.field, settings.count + 1, `${stopwatch.timer.min + ':' + stopwatch.timer.sec}`);
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
  options.classList.remove('options_open');

  overlay.addEventListener('click', openMenu);

  if (stopwatch) {
    if (stopwatch.isTimerOn) {
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
  if (!settings.load) {
    settings.count = 0;
  }
  count.innerHTML = settings.count;
  if (stopwatch) {
    stopwatch.reset();
  }
}

// WIN

function isMatrixCompete(m) {
  reference = reference.flat().sort((a, b) => a - b)
  console.log(...reference);
  console.log(...matrix.flat());
  console.log(JSON.stringify(reference) === JSON.stringify(matrix.flat()));
  return JSON.stringify(reference) === JSON.stringify(matrix.flat());
}

// RESTART

function setRestart() {
  allert.classList.remove('allert_open');
  overlaySecond.classList.remove('overlay_restart_open');

  game = new Game();
  game.newGame();
  stopwatch.stop();
}

// LOCAL STORAGE

localStorage.clear();

const score = prepareScore(3, 42, `${'12' + ':' + '12'}`, new Date);
const score2 = prepareScore(3, 42, `${'12' + ':' + '11'}`, new Date);
const score3 = prepareScore(4, 22, `${'18' + ':' + '12'}`, new Date);
const score4 = prepareScore(4, 22, `${'18' + ':' + '11'}`, new Date);
setLocalStorage(score);
setLocalStorage(score2);
setLocalStorage(score3);
setLocalStorage(score4);

function prepareScore(size, count, time, date) {
  const day = String(date.getDate()).padStart(2, 0);
  const month = date.getMonth() + 1;
  const year = String(date.getFullYear()).slice(-2);
  const fullDate = day + '.' + month + '.' + year;
  const arr = [size, count, time, fullDate]
  return arr;
}

function setLocalStorage(data) {
  let value;
  if (!localStorage.getItem('scores')) {
    value = [];
    value.push(data);
  } else {
    value = JSON.parse(localStorage.getItem('scores'));
    value.push(data);
    const sort = sortStorage(value);
    value = sort;
    if (value.length >= 10) {
      value.pop();
    }
  }
  value = JSON.stringify(value);
  localStorage.setItem('scores', value)
}

function sortStorage(value) {
  let arr = value.sort((a, b) => {
    if (b[0] === a[0]) {
      if (a[1] === b[1]) {
        if (parseInt(a[2]) === parseInt(b[2])) {
          return parseInt(a[2].slice(-2)) - parseInt(b[2].slice(-2));
        }
        return parseInt(a[2]) - parseInt(b[2]);
      }
      return a[1] - b[1];
    }
    return b[0] - a[0];
  })
  return arr;
}
